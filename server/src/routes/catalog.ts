import { Router } from "express";
import { z } from "zod";
import { BADGES, CATEGORIES, CATEGORY_IDS, DIFFICULTIES, QUESTION_SECONDS, QUESTIONS_PER_GAME } from "../data/catalog";
import { VERSES } from "../data/verses";
import { requireAuth } from "../middleware/auth";
import { countsByCategory, poolFor, questionCount } from "../services/questionBank";
import { parseBody } from "../utils/http";
import { todayKey } from "../utils/random";

export const catalogRouter = Router();

catalogRouter.get("/catalog", (_req, res) => {
  res.json({
    categories: CATEGORY_IDS.map((id) => ({ id, ...CATEGORIES[id] })),
    difficulties: Object.entries(DIFFICULTIES).map(([id, d]) => ({ id, ...d })),
    badges: BADGES.map(({ id, name, icon, description }) => ({ id, name, icon, description })),
    counts: countsByCategory(),
    totalQuestions: questionCount(),
    questionsPerGame: QUESTIONS_PER_GAME,
    secondsPerQuestion: QUESTION_SECONDS,
  });
});

/** Versículo del día: el mismo para todos según la fecha. */
export function verseOfTheDay(date = todayKey()) {
  const dayNumber = Math.floor(new Date(`${date}T00:00:00Z`).getTime() / 86_400_000);
  return VERSES[dayNumber % VERSES.length];
}

catalogRouter.get("/verses", (_req, res) => {
  res.json({ today: verseOfTheDay(), verses: VERSES });
});

/** Modo estudio: preguntas con respuesta y explicación (no puntúa). */
catalogRouter.get("/study", requireAuth, (req, res) => {
  const q = parseBody(
    z.object({
      category: z.enum(["aleatorio", ...CATEGORY_IDS] as [string, ...string[]]).default("aleatorio"),
      page: z.coerce.number().int().min(0).default(0),
    }),
    req.query
  );
  const pageSize = 20;
  const pool = poolFor(q.category as never);
  res.json({
    total: pool.length,
    page: q.page,
    pageSize,
    questions: pool.slice(q.page * pageSize, (q.page + 1) * pageSize).map((x) => ({
      id: x.id,
      category: x.category,
      difficulty: x.difficulty,
      question: x.question,
      answer: x.options[x.correct],
      reference: x.reference,
      explanation: x.explanation,
    })),
  });
});
