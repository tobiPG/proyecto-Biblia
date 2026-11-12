import { db } from "../db";
import { HttpError } from "../utils/http";
import { randomCode } from "../utils/random";
import { toPlayer, type PublicPlayer } from "./friends";

export const CLAN_MAX_MEMBERS = 30;

interface ClanRow {
  id: number;
  name: string;
  tag: string;
  emoji: string;
  description: string;
  is_open: number;
  leader_id: number;
  created_at: string;
}

export interface PublicClan {
  id: number;
  name: string;
  tag: string;
  emoji: string;
  description: string;
  isOpen: boolean;
  leaderId: number;
  memberCount: number;
  weeklyPoints: number;
}

/** Puntos de la semana = suma de partidas terminadas por los miembros en los últimos 7 días. */
const WEEKLY_POINTS_SQL = `COALESCE((SELECT SUM(g.score) FROM games g JOIN clan_members m2 ON m2.user_id = g.user_id
  WHERE m2.clan_id = c.id AND g.status = 'finished' AND g.finished_at > datetime('now','-7 days')), 0)`;

const CLAN_SELECT = `SELECT c.*, (SELECT COUNT(*) FROM clan_members m WHERE m.clan_id = c.id) AS member_count,
  ${WEEKLY_POINTS_SQL} AS weekly_points FROM clans c`;

const toClan = (r: ClanRow & { member_count: number; weekly_points: number }): PublicClan => ({
  id: r.id,
  name: r.name,
  tag: r.tag,
  emoji: r.emoji,
  description: r.description,
  isOpen: Boolean(r.is_open),
  leaderId: r.leader_id,
  memberCount: r.member_count,
  weeklyPoints: r.weekly_points,
});

export function clanOf(userId: number): (PublicClan & { members: (PublicPlayer & { weeklyPoints: number })[] }) | null {
  const membership = db.prepare("SELECT clan_id FROM clan_members WHERE user_id = ?").get(userId) as
    | { clan_id: number }
    | undefined;
  return membership ? clanDetail(membership.clan_id) : null;
}

export function clanDetail(clanId: number) {
  const row = db.prepare(`${CLAN_SELECT} WHERE c.id = ?`).get(clanId) as Parameters<typeof toClan>[0] | undefined;
  if (!row) throw new HttpError(404, "Clan no encontrado");
  const members = db
    .prepare(
      `SELECT u.id, u.display_name, u.avatar, COALESCE(s.total_points,0) AS total_points,
         COALESCE((SELECT SUM(score) FROM games g WHERE g.user_id = u.id AND g.status='finished'
           AND g.finished_at > datetime('now','-7 days')), 0) AS weekly_points
       FROM clan_members m JOIN users u ON u.id = m.user_id LEFT JOIN user_stats s ON s.user_id = u.id
       WHERE m.clan_id = ? ORDER BY weekly_points DESC`
    )
    .all(clanId) as { id: number; display_name: string; avatar: string; total_points: number; weekly_points: number }[];
  return { ...toClan(row), members: members.map((m) => ({ ...toPlayer(m), weeklyPoints: m.weekly_points })) };
}

function assertNoClan(userId: number) {
  if (db.prepare("SELECT 1 FROM clan_members WHERE user_id = ?").get(userId)) {
    throw new HttpError(409, "Ya perteneces a un clan");
  }
}

export function createClan(userId: number, data: { name: string; emoji: string; description: string; isOpen: boolean }) {
  assertNoClan(userId);
  if (db.prepare("SELECT 1 FROM clans WHERE name = ?").get(data.name)) throw new HttpError(409, "Ese nombre ya existe");
  let tag = randomCode(5);
  while (db.prepare("SELECT 1 FROM clans WHERE tag = ?").get(tag)) tag = randomCode(5);
  const id = db.transaction(() => {
    const info = db
      .prepare("INSERT INTO clans (name, tag, emoji, description, is_open, leader_id) VALUES (?, ?, ?, ?, ?, ?)")
      .run(data.name, tag, data.emoji, data.description, data.isOpen ? 1 : 0, userId);
    const clanId = Number(info.lastInsertRowid);
    db.prepare("INSERT INTO clan_members (clan_id, user_id) VALUES (?, ?)").run(clanId, userId);
    return clanId;
  })();
  return clanDetail(id);
}

export function joinClan(userId: number, tag: string) {
  assertNoClan(userId);
  const clan = db.prepare("SELECT * FROM clans WHERE tag = ?").get(tag.toUpperCase()) as ClanRow | undefined;
  if (!clan) throw new HttpError(404, "Clan no encontrado");
  if (!clan.is_open) throw new HttpError(403, "Este clan es cerrado");
  const { n } = db.prepare("SELECT COUNT(*) AS n FROM clan_members WHERE clan_id = ?").get(clan.id) as { n: number };
  if (n >= CLAN_MAX_MEMBERS) throw new HttpError(409, "El clan está lleno");
  db.prepare("INSERT INTO clan_members (clan_id, user_id) VALUES (?, ?)").run(clan.id, userId);
  return clanDetail(clan.id);
}

export function leaveClan(userId: number): void {
  db.transaction(() => {
    const m = db.prepare("SELECT clan_id FROM clan_members WHERE user_id = ?").get(userId) as
      | { clan_id: number }
      | undefined;
    if (!m) throw new HttpError(404, "No perteneces a ningún clan");
    db.prepare("DELETE FROM clan_members WHERE user_id = ?").run(userId);
    const next = db
      .prepare("SELECT user_id FROM clan_members WHERE clan_id = ? ORDER BY joined_at LIMIT 1")
      .get(m.clan_id) as { user_id: number } | undefined;
    if (!next) db.prepare("DELETE FROM clans WHERE id = ?").run(m.clan_id);
    else db.prepare("UPDATE clans SET leader_id = ? WHERE id = ? AND leader_id = ?").run(next.user_id, m.clan_id, userId);
  })();
}

export function searchClans(q: string): PublicClan[] {
  const rows = db
    .prepare(`${CLAN_SELECT} WHERE c.name LIKE ? ESCAPE '\\' OR c.tag = ? LIMIT 20`)
    .all(`%${q.replace(/[\\%_]/g, (m) => "\\" + m)}%`, q.toUpperCase()) as Parameters<typeof toClan>[0][];
  return rows.map(toClan);
}

export function clanLeaderboard(): PublicClan[] {
  const rows = db.prepare(`${CLAN_SELECT} ORDER BY weekly_points DESC, c.id LIMIT 50`).all() as Parameters<
    typeof toClan
  >[0][];
  return rows.map(toClan);
}
