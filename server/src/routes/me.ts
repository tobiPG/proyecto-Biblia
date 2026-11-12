import { Router } from "express";
import { z } from "zod";
import { BADGES } from "../data/catalog";
import { VERSES } from "../data/verses";
import { db } from "../db";
import { currentUser, requireAuth } from "../middleware/auth";
import { SESSION_COOKIE } from "../services/auth";
import { getStatsRow, levelFor } from "../services/stats";
import { HttpError, parseBody } from "../utils/http";
import { todayKey } from "../utils/random";
import { displayNameSchema } from "./auth";

export const meRouter = Router();
meRouter.use("/me", requireAuth);

/** Avatares disponibles (emoji); el cliente no puede subir HTML ni URLs. */
export const AVATARS = ["", "🙂", "😇", "🦁", "🕊️", "🐑", "🌿", "⭐", "📖", "✝️", "👑", "🔥", "🌊", "🏔️", "🍇", "⚓"];

meRouter.get("/me", (req, res) => {
  const user = currentUser(req);
  const s = getStatsRow(user.id);
  res.json({
    user,
    level: levelFor(s.total_points),
    totalPoints: s.total_points,
    dailyStreak: s.daily_streak,
    dailyDoneToday: s.last_daily_date === todayKey(),
  });
});

meRouter.patch("/me", (req, res) => {
  const body = parseBody(
    z.object({ displayName: displayNameSchema.optional(), avatar: z.enum(AVATARS as [string, ...string[]]).optional() }),
    req.body
  );
  const user = currentUser(req);
  if (body.displayName !== undefined) {
    db.prepare("UPDATE users SET display_name = ? WHERE id = ?").run(body.displayName, user.id);
  }
  if (body.avatar !== undefined) db.prepare("UPDATE users SET avatar = ? WHERE id = ?").run(body.avatar, user.id);
  res.json({ user: { ...user, ...body } });
});

meRouter.get("/me/stats", (req, res) => {
  const userId = currentUser(req).id;
  const s = getStatsRow(userId);
  const categories = db
    .prepare("SELECT category, correct, wrong, games FROM user_category_stats WHERE user_id = ?")
    .all(userId);
  const earned = new Map(
    (db.prepare("SELECT badge_id, earned_at FROM user_badges WHERE user_id = ?").all(userId) as {
      badge_id: string;
      earned_at: string;
    }[]).map((b) => [b.badge_id, b.earned_at])
  );
  const recentGames = db
    .prepare(
      `SELECT id, mode, category, difficulty, score, correct_count AS correct, total, finished_at AS finishedAt
       FROM games WHERE user_id = ? AND status = 'finished' ORDER BY finished_at DESC LIMIT 20`
    )
    .all(userId);
  res.json({
    level: levelFor(s.total_points),
    stats: {
      totalPoints: s.total_points,
      totalCorrect: s.total_correct,
      totalWrong: s.total_wrong,
      totalGames: s.total_games,
      bestStreak: s.best_streak,
      perfectGames: s.perfect_games,
      dailyStreak: s.daily_streak,
      dailyBestStreak: s.daily_best_streak,
      challengesWon: s.challenges_won,
    },
    categories,
    badges: BADGES.map(({ id, name, icon, description }) => ({
      id,
      name,
      icon,
      description,
      earnedAt: earned.get(id) ?? null,
    })),
    recentGames,
  });
});

meRouter.get("/me/favorite-verses", (req, res) => {
  const rows = db
    .prepare("SELECT verse_ref FROM user_favorite_verses WHERE user_id = ? ORDER BY created_at DESC")
    .all(currentUser(req).id) as { verse_ref: string }[];
  res.json({ refs: rows.map((r) => r.verse_ref) });
});

meRouter.put("/me/favorite-verses/:ref", (req, res) => {
  const ref = req.params.ref;
  if (!VERSES.some((v) => v.ref === ref)) throw new HttpError(404, "Versículo no encontrado");
  db.prepare("INSERT OR IGNORE INTO user_favorite_verses (user_id, verse_ref) VALUES (?, ?)").run(currentUser(req).id, ref);
  res.status(204).end();
});

meRouter.delete("/me/favorite-verses/:ref", (req, res) => {
  db.prepare("DELETE FROM user_favorite_verses WHERE user_id = ? AND verse_ref = ?").run(
    currentUser(req).id,
    req.params.ref
  );
  res.status(204).end();
});

/** Borra la cuenta y todos sus datos (cascada en SQLite). */
meRouter.delete("/me", (req, res) => {
  const userId = currentUser(req).id;
  db.prepare("DELETE FROM users WHERE id = ?").run(userId);
  res.clearCookie(SESSION_COOKIE, { path: "/" });
  res.status(204).end();
});
