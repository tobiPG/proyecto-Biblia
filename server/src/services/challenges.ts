import { QUESTIONS_PER_GAME, type CategoryOrRandom } from "../data/catalog";
import { db } from "../db";
import type { Difficulty } from "../types";
import { HttpError } from "../utils/http";
import { areFriends } from "./friends";
import { pickQuestions, poolFor } from "./questionBank";
import { awardBadges } from "./stats";

/** Horas que tiene el rival para jugar un reto. */
export const CHALLENGE_TTL_HOURS = 48;

export interface ChallengeRow {
  id: number;
  creator_id: number;
  opponent_id: number;
  category: string;
  difficulty: string;
  question_ids: string;
  status: "pending" | "active" | "completed" | "declined" | "expired";
  winner_id: number | null;
  created_at: string;
  expires_at: string;
  completed_at: string | null;
}

interface PlayerResult {
  score: number;
  correct: number;
  total: number;
  timeMs: number;
  finished: boolean;
}

export interface PublicChallenge {
  id: number;
  category: string;
  difficulty: string;
  status: ChallengeRow["status"];
  createdAt: string;
  expiresAt: string;
  isCreator: boolean;
  opponent: { id: number; displayName: string; avatar: string };
  me: PlayerResult | null;
  them: PlayerResult | null;
  /** "me" | "them" | "tie" | null (sin decidir) */
  outcome: "me" | "them" | "tie" | null;
  canPlay: boolean;
  canRespond: boolean;
}

export function getChallenge(id: number): ChallengeRow {
  const c = db.prepare("SELECT * FROM challenges WHERE id = ?").get(id) as ChallengeRow | undefined;
  if (!c) throw new HttpError(404, "Reto no encontrado");
  return c;
}

function playerResult(challengeId: number, userId: number): PlayerResult | null {
  const g = db
    .prepare(
      "SELECT score, correct_count, total, total_time_ms, status FROM games WHERE challenge_id = ? AND user_id = ?"
    )
    .get(challengeId, userId) as
    | { score: number; correct_count: number; total: number; total_time_ms: number; status: string }
    | undefined;
  if (!g) return null;
  return {
    score: g.score,
    correct: g.correct_count,
    total: g.total,
    timeMs: g.total_time_ms,
    finished: g.status === "finished",
  };
}

export function createChallenge(
  creatorId: number,
  opponentId: number,
  category: CategoryOrRandom,
  difficulty: Difficulty
): ChallengeRow {
  if (creatorId === opponentId) throw new HttpError(400, "No puedes retarte a ti mismo");
  if (!areFriends(creatorId, opponentId)) throw new HttpError(403, "Solo puedes retar a tus amigos");

  const open = db
    .prepare(
      `SELECT COUNT(*) AS n FROM challenges WHERE creator_id = ? AND opponent_id = ? AND status IN ('pending','active')`
    )
    .get(creatorId, opponentId) as { n: number };
  if (open.n >= 3) throw new HttpError(429, "Ya tienes 3 retos abiertos con este amigo");

  const ids = pickQuestions(poolFor(category, difficulty), QUESTIONS_PER_GAME).map((q) => q.id);
  if (ids.length < 3) throw new HttpError(400, "No hay suficientes preguntas para esa combinación");

  const expiresAt = new Date(Date.now() + CHALLENGE_TTL_HOURS * 3600 * 1000).toISOString();
  const info = db
    .prepare(
      `INSERT INTO challenges (creator_id, opponent_id, category, difficulty, question_ids, expires_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(creatorId, opponentId, category, difficulty, JSON.stringify(ids), expiresAt);
  return getChallenge(Number(info.lastInsertRowid));
}

export function respondToChallenge(userId: number, challengeId: number, accept: boolean): ChallengeRow {
  const c = getChallenge(challengeId);
  if (c.opponent_id !== userId) throw new HttpError(403, "Este reto no es para ti");
  if (c.status !== "pending") throw new HttpError(409, "El reto ya no está pendiente");
  db.prepare("UPDATE challenges SET status = ? WHERE id = ?").run(accept ? "active" : "declined", challengeId);
  return getChallenge(challengeId);
}

/** Comprueba que el usuario puede jugar el reto ahora mismo. */
export function assertCanPlay(userId: number, c: ChallengeRow): void {
  if (c.creator_id !== userId && c.opponent_id !== userId) throw new HttpError(403, "No participas en este reto");
  if (c.opponent_id === userId && c.status === "pending") {
    throw new HttpError(409, "Acepta el reto antes de jugar");
  }
  if (!["pending", "active"].includes(c.status)) throw new HttpError(409, "El reto ya está cerrado");
  if (new Date(c.expires_at) < new Date()) throw new HttpError(409, "El reto expiró");
}

function decideWinner(c: ChallengeRow, a: PlayerResult, b: PlayerResult): number | null {
  if (a.score !== b.score) return a.score > b.score ? c.creator_id : c.opponent_id;
  if (a.timeMs !== b.timeMs) return a.timeMs < b.timeMs ? c.creator_id : c.opponent_id;
  return null; // empate total
}

/** Si ambos jugadores terminaron, cierra el reto y premia al ganador. */
export function resolveChallengeIfDone(challengeId: number): void {
  const c = getChallenge(challengeId);
  if (c.status === "completed") return;
  const a = playerResult(c.id, c.creator_id);
  const b = playerResult(c.id, c.opponent_id);
  if (!a?.finished || !b?.finished) return;
  closeChallenge(c, decideWinner(c, a, b));
}

function closeChallenge(c: ChallengeRow, winnerId: number | null) {
  db.prepare("UPDATE challenges SET status = 'completed', winner_id = ?, completed_at = datetime('now') WHERE id = ?").run(
    winnerId,
    c.id
  );
  if (winnerId) {
    db.prepare("UPDATE user_stats SET challenges_won = challenges_won + 1 WHERE user_id = ?").run(winnerId);
    awardBadges(winnerId);
  }
}

/**
 * Retos vencidos: si solo uno jugó, gana ese jugador; si nadie terminó, el reto expira.
 */
export function expireChallenges(): void {
  const now = new Date().toISOString();
  const due = db
    .prepare("SELECT * FROM challenges WHERE status IN ('pending','active') AND expires_at <= ?")
    .all(now) as ChallengeRow[];
  db.transaction(() => {
    for (const c of due) {
      const a = playerResult(c.id, c.creator_id);
      const b = playerResult(c.id, c.opponent_id);
      if (a?.finished && !b?.finished) closeChallenge(c, c.creator_id);
      else if (b?.finished && !a?.finished) closeChallenge(c, c.opponent_id);
      else db.prepare("UPDATE challenges SET status = 'expired' WHERE id = ?").run(c.id);
    }
  })();
}

export function toPublicChallenge(c: ChallengeRow, userId: number): PublicChallenge {
  const isCreator = c.creator_id === userId;
  const otherId = isCreator ? c.opponent_id : c.creator_id;
  const other = db.prepare("SELECT id, display_name, avatar FROM users WHERE id = ?").get(otherId) as {
    id: number;
    display_name: string;
    avatar: string;
  };
  const me = playerResult(c.id, userId);
  const them = playerResult(c.id, otherId);
  const open = ["pending", "active"].includes(c.status) && new Date(c.expires_at) > new Date();
  return {
    id: c.id,
    category: c.category,
    difficulty: c.difficulty,
    status: c.status,
    createdAt: c.created_at,
    expiresAt: c.expires_at,
    isCreator,
    opponent: { id: other.id, displayName: other.display_name, avatar: other.avatar },
    me,
    // No revelar la puntuación del rival hasta que yo haya terminado.
    them: me?.finished || c.status === "completed" ? them : them ? { ...them, score: 0, correct: 0, timeMs: 0 } : null,
    outcome:
      c.status !== "completed" ? null : c.winner_id === null ? "tie" : c.winner_id === userId ? "me" : "them",
    canPlay: open && !me?.finished && (isCreator || c.status === "active"),
    canRespond: !isCreator && c.status === "pending" && open,
  };
}

export function listChallenges(userId: number): PublicChallenge[] {
  expireChallenges();
  const rows = db
    .prepare(
      `SELECT * FROM challenges WHERE (creator_id = ? OR opponent_id = ?)
       AND (status IN ('pending','active') OR created_at > datetime('now', '-30 days'))
       ORDER BY created_at DESC LIMIT 50`
    )
    .all(userId, userId) as ChallengeRow[];
  return rows.map((c) => toPublicChallenge(c, userId));
}
