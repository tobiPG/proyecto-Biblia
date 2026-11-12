import { CAMPAIGN_CHAPTERS, CAMPAIGN_WORLDS, type CampaignChapter, type CampaignWorld } from "../data/campaign";
import { QUESTIONS_PER_GAME } from "../data/catalog";
import { db } from "../db";
import type { Question } from "../types";
import { HttpError } from "../utils/http";
import { poolFor } from "./questionBank";

/** Mínimo de preguntas para que un capítulo sea jugable. */
const MIN_CHAPTER_QUESTIONS = 5;

export function starsFor(correct: number, total: number): number {
  const pct = total > 0 ? (correct / total) * 100 : 0;
  if (pct >= 100) return 3;
  if (pct >= 80) return 2;
  if (pct >= 60) return 1;
  return 0;
}

function progressMap(userId: number): Map<string, { stars: number; bestScore: number }> {
  const rows = db
    .prepare("SELECT chapter_id, stars, best_score FROM campaign_progress WHERE user_id = ?")
    .all(userId) as { chapter_id: string; stars: number; best_score: number }[];
  return new Map(rows.map((r) => [r.chapter_id, { stars: r.stars, bestScore: r.best_score }]));
}

function totalStars(progress: Map<string, { stars: number }>): number {
  let n = 0;
  for (const p of progress.values()) n += p.stars;
  return n;
}

/**
 * Reglas: el primer capítulo de un mundo se abre con las estrellas totales requeridas;
 * los demás, con al menos 1 estrella en el capítulo anterior.
 */
function isUnlocked(progress: Map<string, { stars: number }>, worldIndex: number, chapterIndex: number): boolean {
  const world = CAMPAIGN_WORLDS[worldIndex];
  if (chapterIndex === 0) return totalStars(progress) >= world.requiredStars;
  return (progress.get(world.chapters[chapterIndex - 1].id)?.stars ?? 0) >= 1;
}

/** Preguntas del capítulo: sus categorías y dificultad, priorizando los libros bíblicos del mundo. */
export function chapterPool(world: CampaignWorld, chapter: CampaignChapter): Question[] {
  const base = chapter.categories.flatMap((c) => poolFor(c, chapter.difficulty));
  const byBook = base.filter((q) => {
    const ref = q.reference.toLowerCase();
    return world.books.some((kw) => ref.includes(kw));
  });
  return byBook.length >= QUESTIONS_PER_GAME ? byBook : base;
}

export function getCampaign(userId: number) {
  const progress = progressMap(userId);
  return {
    totalStars: totalStars(progress),
    maxStars: CAMPAIGN_WORLDS.reduce((n, w) => n + w.chapters.length * 3, 0),
    worlds: CAMPAIGN_WORLDS.map((w, wi) => ({
      id: w.id,
      name: w.name,
      icon: w.icon,
      subtitle: w.subtitle,
      requiredStars: w.requiredStars,
      unlocked: isUnlocked(progress, wi, 0),
      chapters: w.chapters.map((c, ci) => ({
        id: c.id,
        name: c.name,
        difficulty: c.difficulty,
        categories: c.categories,
        stars: progress.get(c.id)?.stars ?? 0,
        bestScore: progress.get(c.id)?.bestScore ?? 0,
        unlocked: isUnlocked(progress, wi, ci),
      })),
    })),
  };
}

/** Valida que el capítulo existe, está abierto y tiene preguntas. */
export function resolvePlayableChapter(userId: number, chapterId: string) {
  const entry = CAMPAIGN_CHAPTERS.get(chapterId);
  if (!entry) throw new HttpError(404, "Capítulo no encontrado");
  if (!isUnlocked(progressMap(userId), entry.worldIndex, entry.chapterIndex)) {
    throw new HttpError(403, "Capítulo bloqueado: consigue más estrellas");
  }
  const pool = chapterPool(entry.world, entry.chapter);
  if (pool.length < MIN_CHAPTER_QUESTIONS) throw new HttpError(409, "Este capítulo aún no tiene suficientes preguntas");
  return { ...entry, pool };
}

/** Guarda el resultado conservando el mejor. Devuelve estrellas obtenidas en esta partida. */
export function recordChapterResult(userId: number, chapterId: string, correct: number, total: number, score: number) {
  const stars = starsFor(correct, total);
  db.prepare(
    `INSERT INTO campaign_progress (user_id, chapter_id, stars, best_score) VALUES (?, ?, ?, ?)
     ON CONFLICT(user_id, chapter_id) DO UPDATE SET stars = MAX(stars, excluded.stars),
       best_score = MAX(best_score, excluded.best_score), updated_at = datetime('now')`
  ).run(userId, chapterId, stars, score);
  return stars;
}

/** Para insignias: estrellas totales y mundos con todos los capítulos con al menos 1 estrella. */
export function campaignBadgeStats(userId: number): { stars: number; worldsCompleted: number } {
  const progress = progressMap(userId);
  const worldsCompleted = CAMPAIGN_WORLDS.filter((w) =>
    w.chapters.every((c) => (progress.get(c.id)?.stars ?? 0) >= 1)
  ).length;
  return { stars: totalStars(progress), worldsCompleted };
}
