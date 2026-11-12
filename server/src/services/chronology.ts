import crypto from "crypto";
import { CHRONOLOGY } from "../data/chronology";
import { db } from "../db";
import { HttpError } from "../utils/http";
import { shuffle } from "../utils/random";
import { awardBadges, getStatsRow, levelFor } from "./stats";

export const CHRONOLOGY_PER_GAME = 10;
export const CHRONOLOGY_POINTS = { perfect: 20, partial: 10 } as const;

const BY_ID = new Map(CHRONOLOGY.map((p) => [p.id, p]));

interface StoredPuzzle {
  id: string;
  /** shown[i] = índice cronológico del elemento mostrado en la posición i */
  shown: number[];
}

interface ChronoRow {
  id: string;
  user_id: number;
  puzzles: string;
  total: number;
  current_index: number;
  score: number;
  perfect_count: number;
  status: "active" | "finished" | "abandoned";
}

export interface PublicChronologyGame {
  id: string;
  total: number;
  currentIndex: number;
  score: number;
  status: ChronoRow["status"];
  puzzle: { question: string; items: string[] } | null;
}

function toPublic(g: ChronoRow): PublicChronologyGame {
  const stored = JSON.parse(g.puzzles) as StoredPuzzle[];
  const current = g.status === "active" ? stored[g.current_index] : undefined;
  const p = current ? BY_ID.get(current.id)! : undefined;
  return {
    id: g.id,
    total: g.total,
    currentIndex: g.current_index,
    score: g.score,
    status: g.status,
    puzzle: p && current ? { question: p.question, items: current.shown.map((i) => p.items[i]) } : null,
  };
}

function load(gameId: string, userId: number): ChronoRow {
  const g = db.prepare("SELECT * FROM chronology_games WHERE id = ?").get(gameId) as ChronoRow | undefined;
  if (!g || g.user_id !== userId) throw new HttpError(404, "Partida no encontrada");
  return g;
}

/** Baraja los elementos asegurando que no aparezcan ya en el orden correcto. */
function shuffledOrder(n: number): number[] {
  const base = [...Array(n).keys()];
  for (let i = 0; i < 10; i++) {
    const s = shuffle(base);
    if (s.some((v, idx) => v !== idx)) return s;
  }
  return [...base].reverse();
}

export function startChronology(userId: number): PublicChronologyGame {
  db.prepare("UPDATE chronology_games SET status = 'abandoned' WHERE user_id = ? AND status = 'active'").run(userId);
  const puzzles: StoredPuzzle[] = shuffle(CHRONOLOGY)
    .slice(0, CHRONOLOGY_PER_GAME)
    .map((p) => ({ id: p.id, shown: shuffledOrder(p.items.length) }));
  const id = crypto.randomUUID();
  db.prepare("INSERT INTO chronology_games (id, user_id, puzzles, total) VALUES (?, ?, ?, ?)").run(
    id,
    userId,
    JSON.stringify(puzzles),
    puzzles.length
  );
  return toPublic(load(id, userId));
}

export function getChronology(gameId: string, userId: number): PublicChronologyGame {
  return toPublic(load(gameId, userId));
}

export interface ChronologyAnswer {
  perfect: boolean;
  positionsRight: number;
  points: number;
  /** Índices (en el orden mostrado) colocados en el orden correcto. */
  correctOrder: number[];
  score: number;
  finished: boolean;
  summary?: {
    score: number;
    perfect: number;
    total: number;
    level: number;
    totalPoints: number;
    newBadges: { id: string; name: string; icon: string; description: string }[];
  };
}

/** `order` = posiciones mostradas en el orden cronológico que eligió el jugador. */
export function answerChronology(userId: number, gameId: string, index: number, order: number[]): ChronologyAnswer {
  return db.transaction((): ChronologyAnswer => {
    const g = load(gameId, userId);
    if (g.status !== "active") throw new HttpError(409, "La partida ya terminó");
    if (index !== g.current_index) throw new HttpError(409, "Ese no es el puzle actual");

    const stored = (JSON.parse(g.puzzles) as StoredPuzzle[])[index];
    const n = stored.shown.length;
    const isPermutation = order.length === n && new Set(order).size === n && order.every((d) => d >= 0 && d < n);
    if (!isPermutation) throw new HttpError(400, "Debes ordenar todos los elementos");

    const chosenChrono = order.map((d) => stored.shown[d]);
    const positionsRight = chosenChrono.filter((v, i) => v === i).length;
    const perfect = positionsRight === n;
    const points = perfect ? CHRONOLOGY_POINTS.perfect : positionsRight >= 2 ? CHRONOLOGY_POINTS.partial : 0;
    const finished = index + 1 >= g.total;

    db.prepare(
      `UPDATE chronology_games SET current_index = ?, score = score + ?, perfect_count = perfect_count + ?,
         status = ?, finished_at = CASE WHEN ? THEN datetime('now') ELSE NULL END WHERE id = ?`
    ).run(index + 1, points, perfect ? 1 : 0, finished ? "finished" : "active", finished ? 1 : 0, gameId);

    const result: ChronologyAnswer = {
      perfect,
      positionsRight,
      points,
      correctOrder: [...Array(n).keys()].map((chrono) => stored.shown.indexOf(chrono)),
      score: g.score + points,
      finished,
    };

    if (finished) {
      const perfectTotal = g.perfect_count + (perfect ? 1 : 0);
      db.prepare(
        `UPDATE user_stats SET total_points = total_points + ?, total_games = total_games + 1,
           chronology_perfect = chronology_perfect + ? WHERE user_id = ?`
      ).run(result.score, perfectTotal, userId);
      const newBadges = awardBadges(userId);
      const stats = getStatsRow(userId);
      result.summary = {
        score: result.score,
        perfect: perfectTotal,
        total: g.total,
        level: levelFor(stats.total_points).level,
        totalPoints: stats.total_points,
        newBadges,
      };
    }
    return result;
  })();
}
