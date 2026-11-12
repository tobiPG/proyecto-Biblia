import { CATEGORY_IDS, DIFFICULTY_IDS, type CategoryOrRandom } from "../data/catalog";
import { QUESTIONS } from "../data/questions";
import type { CategoryId, Difficulty, PublicQuestion, Question } from "../types";
import { logger } from "../utils/logger";
import { shuffle } from "../utils/random";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .trim();

/** Carga y valida el banco una sola vez; descarta preguntas rotas o duplicadas. */
function buildBank(): Map<number, Question> {
  const byId = new Map<number, Question>();
  const seenText = new Set<string>();
  let invalid = 0;
  let duplicated = 0;

  for (const q of QUESTIONS) {
    const valid =
      Number.isInteger(q.id) &&
      CATEGORY_IDS.includes(q.category) &&
      DIFFICULTY_IDS.includes(q.difficulty) &&
      typeof q.question === "string" &&
      Array.isArray(q.options) &&
      q.options.length >= 2 &&
      new Set(q.options).size === q.options.length &&
      Number.isInteger(q.correct) &&
      q.correct >= 0 &&
      q.correct < q.options.length;
    if (!valid || byId.has(q.id)) {
      invalid++;
      continue;
    }
    const key = `${q.difficulty}|${normalize(q.question)}`;
    if (seenText.has(key)) {
      duplicated++;
      continue;
    }
    seenText.add(key);
    byId.set(q.id, q);
  }

  logger.info(`Banco de preguntas: ${byId.size} válidas (${invalid} inválidas, ${duplicated} duplicadas descartadas)`);
  return byId;
}

const BANK = buildBank();
const ALL = [...BANK.values()];

export function getQuestion(id: number): Question | undefined {
  return BANK.get(id);
}

export function poolFor(category: CategoryOrRandom, difficulty?: Difficulty): Question[] {
  return ALL.filter(
    (q) => (category === "aleatorio" || q.category === category) && (!difficulty || q.difficulty === difficulty)
  );
}

/**
 * Elige `count` preguntas priorizando las que el usuario aún no ha visto.
 * `rand` permite una selección determinista (desafío diario).
 */
export function pickQuestions(
  pool: Question[],
  count: number,
  seen: Set<number> = new Set(),
  rand?: (max: number) => number
): Question[] {
  const unseen = pool.filter((q) => !seen.has(q.id));
  const rest = pool.filter((q) => seen.has(q.id));
  const ordered = [...shuffle(unseen, rand), ...shuffle(rest, rand)];
  return ordered.slice(0, count);
}

/** Orden aleatorio de opciones para una partida: order[i] = índice original de la opción mostrada en i. */
export function randomOptionOrder(q: Question): number[] {
  return shuffle(q.options.map((_, i) => i));
}

export function toPublic(q: Question, order: number[]): PublicQuestion {
  return {
    id: q.id,
    category: q.category,
    difficulty: q.difficulty,
    question: q.question,
    options: order.map((i) => q.options[i]),
  };
}

export function countsByCategory(): Record<string, Record<string, number>> {
  const out: Record<string, Record<string, number>> = {};
  for (const q of ALL) {
    out[q.category] ??= {};
    out[q.category][q.difficulty] = (out[q.category][q.difficulty] || 0) + 1;
  }
  return out;
}

export function totalByCategory(category: CategoryId): number {
  return ALL.filter((q) => q.category === category).length;
}

export function questionCount(): number {
  return ALL.length;
}
