import crypto from "crypto";
import {
  DIFFICULTIES,
  FAST_ANSWER_MS,
  QUESTIONS_PER_GAME,
  QUESTION_SECONDS,
  type CategoryOrRandom,
} from "../data/catalog";
import { db } from "../db";
import type { Difficulty, GameMode, PublicQuestion } from "../types";
import { HttpError } from "../utils/http";
import { seededRandInt, todayKey } from "../utils/random";
import { resolveChallengeIfDone } from "./challenges";
import { getQuestion, pickQuestions, poolFor, randomOptionOrder, toPublic } from "./questionBank";
import { awardBadges, getStatsRow, levelFor } from "./stats";

/** Margen extra (ms) para la latencia de red antes de dar una respuesta por fuera de tiempo. */
const LATENCY_GRACE_MS = 3000;

interface StoredQuestion {
  id: number;
  order: number[];
}

interface GameRow {
  id: string;
  user_id: number;
  mode: GameMode;
  category: string;
  difficulty: string;
  challenge_id: number | null;
  daily_date: string | null;
  questions: string;
  total: number;
  current_index: number;
  score: number;
  correct_count: number;
  current_streak: number;
  best_streak: number;
  total_time_ms: number;
  status: "active" | "finished" | "abandoned";
  question_started_at: number;
}

export interface PublicGame {
  id: string;
  mode: GameMode;
  category: string;
  difficulty: string;
  challengeId: number | null;
  total: number;
  currentIndex: number;
  score: number;
  correctCount: number;
  streak: number;
  status: GameRow["status"];
  secondsPerQuestion: number;
  /** Segundos que le quedan a la pregunta actual (útil al reanudar). */
  secondsLeft: number;
  questions: PublicQuestion[];
}

export function pointsFor(difficulty: Difficulty, timeMs: number): number {
  const base = DIFFICULTIES[difficulty].points;
  if (timeMs < 5000) return Math.floor(base * 1.5);
  if (timeMs < 10000) return Math.floor(base * 1.25);
  return base;
}

function toPublicGame(g: GameRow): PublicGame {
  const stored = JSON.parse(g.questions) as StoredQuestion[];
  const elapsed = Date.now() - g.question_started_at;
  return {
    id: g.id,
    mode: g.mode,
    category: g.category,
    difficulty: g.difficulty,
    challengeId: g.challenge_id,
    total: g.total,
    currentIndex: g.current_index,
    score: g.score,
    correctCount: g.correct_count,
    streak: g.current_streak,
    status: g.status,
    secondsPerQuestion: QUESTION_SECONDS,
    secondsLeft: Math.max(0, Math.ceil((QUESTION_SECONDS * 1000 - elapsed) / 1000)),
    questions: stored.map((s) => toPublic(getQuestion(s.id)!, s.order)),
  };
}

function loadGame(gameId: string, userId: number): GameRow {
  const g = db.prepare("SELECT * FROM games WHERE id = ?").get(gameId) as GameRow | undefined;
  if (!g || g.user_id !== userId) throw new HttpError(404, "Partida no encontrada");
  return g;
}

export function getGame(gameId: string, userId: number): PublicGame {
  return toPublicGame(loadGame(gameId, userId));
}

function seenSet(userId: number): Set<number> {
  const rows = db.prepare("SELECT question_id FROM user_seen_questions WHERE user_id = ?").all(userId) as {
    question_id: number;
  }[];
  return new Set(rows.map((r) => r.question_id));
}

function insertGame(params: {
  userId: number;
  mode: GameMode;
  category: string;
  difficulty: string;
  questionIds: number[];
  challengeId?: number;
  dailyDate?: string;
}): GameRow {
  const stored: StoredQuestion[] = params.questionIds.map((id) => {
    const q = getQuestion(id);
    if (!q) throw new HttpError(500, `Pregunta ${id} no disponible`);
    return { id, order: randomOptionOrder(q) };
  });
  if (stored.length === 0) throw new HttpError(400, "No hay preguntas disponibles para esa combinación");

  const id = crypto.randomUUID();
  db.prepare(
    `INSERT INTO games (id, user_id, mode, category, difficulty, challenge_id, daily_date, questions, total, question_started_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    params.userId,
    params.mode,
    params.category,
    params.difficulty,
    params.challengeId ?? null,
    params.dailyDate ?? null,
    JSON.stringify(stored),
    stored.length,
    Date.now()
  );
  return db.prepare("SELECT * FROM games WHERE id = ?").get(id) as GameRow;
}

/** Abandona partidas sueltas (solo) que quedaron a medias; las de reto y diario se pueden reanudar. */
function abandonStaleSoloGames(userId: number) {
  db.prepare("UPDATE games SET status = 'abandoned' WHERE user_id = ? AND status = 'active' AND mode = 'solo'").run(
    userId
  );
}

export function startSoloGame(userId: number, category: CategoryOrRandom, difficulty: Difficulty): PublicGame {
  abandonStaleSoloGames(userId);
  const picked = pickQuestions(poolFor(category, difficulty), QUESTIONS_PER_GAME, seenSet(userId));
  return toPublicGame(
    insertGame({ userId, mode: "solo", category, difficulty, questionIds: picked.map((q) => q.id) })
  );
}

/** Las mismas 10 preguntas para todos los jugadores en el mismo día (UTC). */
export function dailyQuestionIds(date: string): number[] {
  const rand = seededRandInt(`daily-${date}`);
  return pickQuestions(poolFor("aleatorio"), QUESTIONS_PER_GAME, new Set(), rand).map((q) => q.id);
}

export function startDailyGame(userId: number): PublicGame {
  const date = todayKey();
  const existing = db.prepare("SELECT * FROM games WHERE user_id = ? AND daily_date = ?").get(userId, date) as
    | GameRow
    | undefined;
  if (existing) {
    if (existing.status === "active") return toPublicGame(existing);
    throw new HttpError(409, "Ya completaste el desafío de hoy. ¡Vuelve mañana!");
  }
  return toPublicGame(
    insertGame({
      userId,
      mode: "daily",
      category: "aleatorio",
      difficulty: "mixto",
      questionIds: dailyQuestionIds(date),
      dailyDate: date,
    })
  );
}

/** Crea (o reanuda) la partida de un jugador dentro de un reto. */
export function startChallengeGame(
  userId: number,
  challenge: { id: number; category: string; difficulty: string; question_ids: string }
): PublicGame {
  const existing = db
    .prepare("SELECT * FROM games WHERE user_id = ? AND challenge_id = ?")
    .get(userId, challenge.id) as GameRow | undefined;
  if (existing) {
    if (existing.status === "active") return toPublicGame(existing);
    throw new HttpError(409, "Ya jugaste este reto");
  }
  return toPublicGame(
    insertGame({
      userId,
      mode: "challenge",
      category: challenge.category,
      difficulty: challenge.difficulty,
      questionIds: JSON.parse(challenge.question_ids) as number[],
      challengeId: challenge.id,
    })
  );
}

export interface AnswerResult {
  questionIndex: number;
  correct: boolean;
  timedOut: boolean;
  correctIndex: number;
  points: number;
  explanation: string;
  reference: string;
  score: number;
  streak: number;
  finished: boolean;
  summary?: GameSummary;
}

export interface GameSummary {
  gameId: string;
  mode: GameMode;
  score: number;
  correct: number;
  total: number;
  bestStreak: number;
  totalTimeMs: number;
  level: number;
  totalPoints: number;
  newBadges: { id: string; name: string; icon: string; description: string }[];
  challengeId: number | null;
}

/**
 * Corrige una respuesta en el servidor. El tiempo lo mide el servidor:
 * si llega fuera de plazo cuenta como fallo.
 */
export function answerQuestion(userId: number, gameId: string, questionIndex: number, chosen: number): AnswerResult {
  return db.transaction((): AnswerResult => {
    const g = loadGame(gameId, userId);
    const stored = JSON.parse(g.questions) as StoredQuestion[];

    // Reintento idempotente (p. ej. la red se cortó tras enviar): devolver lo ya guardado.
    const prev = db
      .prepare("SELECT * FROM game_answers WHERE game_id = ? AND question_index = ?")
      .get(gameId, questionIndex) as { chosen: number; is_correct: number; points: number } | undefined;
    if (prev) {
      const q = getQuestion(stored[questionIndex].id)!;
      return {
        questionIndex,
        correct: Boolean(prev.is_correct),
        timedOut: prev.chosen === -1,
        correctIndex: stored[questionIndex].order.indexOf(q.correct),
        points: prev.points,
        explanation: q.explanation,
        reference: q.reference,
        score: g.score,
        streak: g.current_streak,
        finished: g.status === "finished",
      };
    }

    if (g.status !== "active") throw new HttpError(409, "La partida ya terminó");
    if (questionIndex !== g.current_index) throw new HttpError(409, "Esa no es la pregunta actual");

    const { id, order } = stored[questionIndex];
    const q = getQuestion(id)!;
    if (!Number.isInteger(chosen) || chosen < -1 || chosen >= order.length) {
      throw new HttpError(400, "Opción inválida");
    }

    const now = Date.now();
    const timeMs = Math.max(0, now - g.question_started_at);
    const timedOut = chosen === -1 || timeMs > QUESTION_SECONDS * 1000 + LATENCY_GRACE_MS;
    const effectiveChosen = timedOut ? -1 : chosen;
    const correct = !timedOut && order[chosen] === q.correct;
    const points = correct ? pointsFor(q.difficulty, timeMs) : 0;
    const countedTime = Math.min(timeMs, QUESTION_SECONDS * 1000);

    db.prepare(
      `INSERT INTO game_answers (game_id, question_index, question_id, chosen, is_correct, time_ms, points)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(gameId, questionIndex, id, effectiveChosen, correct ? 1 : 0, countedTime, points);

    const streak = correct ? g.current_streak + 1 : 0;
    const finished = questionIndex + 1 >= g.total;
    db.prepare(
      `UPDATE games SET current_index = ?, score = score + ?, correct_count = correct_count + ?,
         current_streak = ?, best_streak = MAX(best_streak, ?), total_time_ms = total_time_ms + ?,
         question_started_at = ?
       WHERE id = ?`
    ).run(questionIndex + 1, points, correct ? 1 : 0, streak, streak, countedTime, now, gameId);

    const result: AnswerResult = {
      questionIndex,
      correct,
      timedOut,
      correctIndex: order.indexOf(q.correct),
      points,
      explanation: q.explanation,
      reference: q.reference,
      score: g.score + points,
      streak,
      finished,
    };
    if (finished) result.summary = finishGame(gameId);
    return result;
  })();
}

function yesterdayKey(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return todayKey(d);
}

/** Cierra la partida y aplica estadísticas, racha diaria, insignias y retos. Llamar dentro de una transacción. */
function finishGame(gameId: string): GameSummary {
  db.prepare("UPDATE games SET status = 'finished', finished_at = datetime('now') WHERE id = ?").run(gameId);
  const g = db.prepare("SELECT * FROM games WHERE id = ?").get(gameId) as GameRow;
  const answers = db
    .prepare("SELECT question_id, is_correct, time_ms FROM game_answers WHERE game_id = ?")
    .all(gameId) as { question_id: number; is_correct: number; time_ms: number }[];

  const wrong = g.total - g.correct_count;
  let expertCorrect = 0;
  let fast = 0;
  const perCategory = new Map<string, { correct: number; wrong: number }>();
  const markSeen = db.prepare("INSERT OR IGNORE INTO user_seen_questions (user_id, question_id) VALUES (?, ?)");

  for (const a of answers) {
    const q = getQuestion(a.question_id)!;
    markSeen.run(g.user_id, q.id);
    const c = perCategory.get(q.category) ?? { correct: 0, wrong: 0 };
    if (a.is_correct) {
      c.correct++;
      if (q.difficulty === "experto") expertCorrect++;
      if (a.time_ms < FAST_ANSWER_MS) fast++;
    } else c.wrong++;
    perCategory.set(q.category, c);
  }

  db.prepare(
    `UPDATE user_stats SET total_points = total_points + ?, total_correct = total_correct + ?,
       total_wrong = total_wrong + ?, total_games = total_games + 1, best_streak = MAX(best_streak, ?),
       perfect_games = perfect_games + ?, expert_correct = expert_correct + ?, fast_answers = fast_answers + ?
     WHERE user_id = ?`
  ).run(
    g.score,
    g.correct_count,
    wrong,
    g.best_streak,
    g.correct_count === g.total ? 1 : 0,
    expertCorrect,
    fast,
    g.user_id
  );

  const upsertCat = db.prepare(
    `INSERT INTO user_category_stats (user_id, category, correct, wrong, games) VALUES (?, ?, ?, ?, 1)
     ON CONFLICT(user_id, category) DO UPDATE SET correct = correct + excluded.correct,
       wrong = wrong + excluded.wrong, games = games + 1`
  );
  for (const [category, c] of perCategory) upsertCat.run(g.user_id, category, c.correct, c.wrong);

  if (g.mode === "daily" && g.daily_date) {
    const s = getStatsRow(g.user_id);
    const streak = s.last_daily_date === yesterdayKey(g.daily_date) ? s.daily_streak + 1 : 1;
    db.prepare(
      `UPDATE user_stats SET daily_streak = ?, daily_best_streak = MAX(daily_best_streak, ?),
         last_daily_date = ?, daily_completed = daily_completed + 1 WHERE user_id = ?`
    ).run(streak, streak, g.daily_date, g.user_id);
  }

  if (g.challenge_id) resolveChallengeIfDone(g.challenge_id);

  const newBadges = awardBadges(g.user_id);
  const stats = getStatsRow(g.user_id);
  return {
    gameId,
    mode: g.mode,
    score: g.score,
    correct: g.correct_count,
    total: g.total,
    bestStreak: g.best_streak,
    totalTimeMs: g.total_time_ms,
    level: levelFor(stats.total_points).level,
    totalPoints: stats.total_points,
    newBadges,
    challengeId: g.challenge_id,
  };
}
