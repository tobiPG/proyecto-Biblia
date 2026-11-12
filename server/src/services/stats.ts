import { BADGES, CATEGORY_IDS, type BadgeStats } from "../data/catalog";
import { db } from "../db";
import type { CategoryId } from "../types";
import { getQuestion, totalByCategory } from "./questionBank";

export function levelFor(points: number): { level: number; current: number; next: number } {
  const level = Math.floor(points / 500) + 1;
  return { level, current: points % 500, next: 500 };
}

interface StatsRow {
  total_points: number;
  total_correct: number;
  total_wrong: number;
  total_games: number;
  best_streak: number;
  perfect_games: number;
  expert_correct: number;
  fast_answers: number;
  daily_streak: number;
  daily_best_streak: number;
  last_daily_date: string | null;
  daily_completed: number;
  challenges_won: number;
}

export function getStatsRow(userId: number): StatsRow {
  return db.prepare("SELECT * FROM user_stats WHERE user_id = ?").get(userId) as StatsRow;
}

function categoriesCompleted(userId: number): string[] {
  const seen = db.prepare("SELECT question_id FROM user_seen_questions WHERE user_id = ?").all(userId) as {
    question_id: number;
  }[];
  const counts = new Map<CategoryId, number>();
  for (const { question_id } of seen) {
    const q = getQuestion(question_id);
    if (q) counts.set(q.category, (counts.get(q.category) || 0) + 1);
  }
  return CATEGORY_IDS.filter((c) => {
    const total = totalByCategory(c);
    return total > 0 && (counts.get(c) || 0) >= total;
  });
}

export function badgeStats(userId: number): BadgeStats {
  const s = getStatsRow(userId);
  const played = db
    .prepare("SELECT COUNT(*) AS n FROM user_category_stats WHERE user_id = ? AND games > 0")
    .get(userId) as { n: number };
  return {
    totalPoints: s.total_points,
    totalCorrect: s.total_correct,
    totalAnswered: s.total_correct + s.total_wrong,
    totalGames: s.total_games,
    bestStreak: s.best_streak,
    perfectGames: s.perfect_games,
    expertCorrect: s.expert_correct,
    fastAnswers: s.fast_answers,
    dailyStreak: s.daily_streak,
    dailyCompleted: s.daily_completed,
    challengesWon: s.challenges_won,
    categoriesPlayed: played.n,
    categoriesCompleted: categoriesCompleted(userId),
  };
}

/** Evalúa insignias y guarda las nuevas. Devuelve las recién ganadas. */
export function awardBadges(userId: number): { id: string; name: string; icon: string; description: string }[] {
  const stats = badgeStats(userId);
  const owned = new Set(
    (db.prepare("SELECT badge_id FROM user_badges WHERE user_id = ?").all(userId) as { badge_id: string }[]).map(
      (r) => r.badge_id
    )
  );
  const insert = db.prepare("INSERT OR IGNORE INTO user_badges (user_id, badge_id) VALUES (?, ?)");
  const earned = BADGES.filter((b) => !owned.has(b.id) && b.condition(stats));
  for (const b of earned) insert.run(userId, b.id);
  return earned.map(({ id, name, icon, description }) => ({ id, name, icon, description }));
}
