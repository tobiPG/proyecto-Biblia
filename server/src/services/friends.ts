import { db } from "../db";
import { HttpError } from "../utils/http";
import { levelFor } from "./stats";

export interface PublicPlayer {
  id: number;
  displayName: string;
  avatar: string;
  level: number;
  totalPoints: number;
}

const PLAYER_SELECT = `SELECT u.id, u.display_name, u.avatar, COALESCE(s.total_points, 0) AS total_points
  FROM users u LEFT JOIN user_stats s ON s.user_id = u.id`;

interface PlayerRow {
  id: number;
  display_name: string;
  avatar: string;
  total_points: number;
}

export const toPlayer = (r: PlayerRow): PublicPlayer => ({
  id: r.id,
  displayName: r.display_name,
  avatar: r.avatar,
  totalPoints: r.total_points,
  level: levelFor(r.total_points).level,
});

export function areFriends(a: number, b: number): boolean {
  return Boolean(
    db
      .prepare(
        `SELECT 1 FROM friendships WHERE status = 'accepted' AND
         ((requester_id = ? AND addressee_id = ?) OR (requester_id = ? AND addressee_id = ?))`
      )
      .get(a, b, b, a)
  );
}

export function listFriends(userId: number): PublicPlayer[] {
  const rows = db
    .prepare(
      `${PLAYER_SELECT} WHERE u.id IN (
         SELECT addressee_id FROM friendships WHERE requester_id = ? AND status = 'accepted'
         UNION SELECT requester_id FROM friendships WHERE addressee_id = ? AND status = 'accepted')
       ORDER BY total_points DESC`
    )
    .all(userId, userId) as PlayerRow[];
  return rows.map(toPlayer);
}

export function listRequests(userId: number): { incoming: PublicPlayer[]; outgoing: PublicPlayer[] } {
  const incoming = db
    .prepare(
      `${PLAYER_SELECT} WHERE u.id IN (SELECT requester_id FROM friendships WHERE addressee_id = ? AND status = 'pending')`
    )
    .all(userId) as PlayerRow[];
  const outgoing = db
    .prepare(
      `${PLAYER_SELECT} WHERE u.id IN (SELECT addressee_id FROM friendships WHERE requester_id = ? AND status = 'pending')`
    )
    .all(userId) as PlayerRow[];
  return { incoming: incoming.map(toPlayer), outgoing: outgoing.map(toPlayer) };
}

export function findByFriendCode(code: string): PublicPlayer | null {
  const row = db.prepare(`${PLAYER_SELECT} WHERE u.friend_code = ?`).get(code.trim().toUpperCase()) as
    | PlayerRow
    | undefined;
  return row ? toPlayer(row) : null;
}

/** Envía solicitud; si el otro ya me la había enviado, se aceptan ambas directamente. */
export function sendRequest(userId: number, targetId: number): "sent" | "accepted" {
  if (userId === targetId) throw new HttpError(400, "No puedes agregarte a ti mismo");
  if (!db.prepare("SELECT 1 FROM users WHERE id = ?").get(targetId)) throw new HttpError(404, "Jugador no encontrado");
  if (areFriends(userId, targetId)) throw new HttpError(409, "Ya son amigos");

  const reverse = db
    .prepare("SELECT status FROM friendships WHERE requester_id = ? AND addressee_id = ?")
    .get(targetId, userId) as { status: string } | undefined;
  if (reverse) {
    db.prepare("UPDATE friendships SET status = 'accepted' WHERE requester_id = ? AND addressee_id = ?").run(
      targetId,
      userId
    );
    return "accepted";
  }
  db.prepare("INSERT OR IGNORE INTO friendships (requester_id, addressee_id) VALUES (?, ?)").run(userId, targetId);
  return "sent";
}

export function respondRequest(userId: number, requesterId: number, accept: boolean): void {
  const stmt = accept
    ? "UPDATE friendships SET status = 'accepted' WHERE requester_id = ? AND addressee_id = ? AND status = 'pending'"
    : "DELETE FROM friendships WHERE requester_id = ? AND addressee_id = ? AND status = 'pending'";
  const { changes } = db.prepare(stmt).run(requesterId, userId);
  if (!changes) throw new HttpError(404, "Solicitud no encontrada");
}

export function removeFriend(userId: number, friendId: number): void {
  db.prepare(
    `DELETE FROM friendships WHERE (requester_id = ? AND addressee_id = ?) OR (requester_id = ? AND addressee_id = ?)`
  ).run(userId, friendId, friendId, userId);
}
