import { Router } from "express";
import { z } from "zod";
import { CATEGORY_IDS, DIFFICULTY_IDS } from "../data/catalog";
import { db } from "../db";
import { currentUser, requireAuth } from "../middleware/auth";
import {
  assertCanPlay,
  createChallenge,
  getChallenge,
  listChallenges,
  respondToChallenge,
  toPublicChallenge,
} from "../services/challenges";
import {
  findByFriendCode,
  listFriends,
  listRequests,
  removeFriend,
  respondRequest,
  sendRequest,
  toPlayer,
} from "../services/friends";
import { startChallengeGame } from "../services/games";
import type { Difficulty } from "../types";
import { asyncHandler, HttpError, parseBody, parseId } from "../utils/http";

export const socialRouter = Router();
socialRouter.use(["/friends", "/challenges", "/leaderboard"], requireAuth);

// ---------- Amigos ----------

socialRouter.get("/friends", (req, res) => {
  const userId = currentUser(req).id;
  res.json({ friends: listFriends(userId), ...listRequests(userId) });
});

socialRouter.post(
  "/friends/requests",
  asyncHandler((req, res) => {
    const { code } = parseBody(z.object({ code: z.string().trim().min(4).max(12) }), req.body);
    const target = findByFriendCode(code);
    if (!target) throw new HttpError(404, "No existe ningún jugador con ese código");
    const result = sendRequest(currentUser(req).id, target.id);
    res.status(201).json({ result, player: target });
  })
);

socialRouter.post("/friends/requests/:id/accept", (req, res) => {
  respondRequest(currentUser(req).id, parseId(req.params.id), true);
  res.status(204).end();
});

socialRouter.post("/friends/requests/:id/decline", (req, res) => {
  respondRequest(currentUser(req).id, parseId(req.params.id), false);
  res.status(204).end();
});

socialRouter.delete("/friends/:id", (req, res) => {
  removeFriend(currentUser(req).id, parseId(req.params.id));
  res.status(204).end();
});

// ---------- Retos 1 vs 1 ----------

socialRouter.get("/challenges", (req, res) => {
  res.json({ challenges: listChallenges(currentUser(req).id) });
});

socialRouter.post(
  "/challenges",
  asyncHandler((req, res) => {
    const body = parseBody(
      z.object({
        friendId: z.number().int().positive(),
        category: z.enum(["aleatorio", ...CATEGORY_IDS] as [string, ...string[]]),
        difficulty: z.enum(DIFFICULTY_IDS as [Difficulty, ...Difficulty[]]),
      }),
      req.body
    );
    const userId = currentUser(req).id;
    const c = createChallenge(userId, body.friendId, body.category as never, body.difficulty);
    res.status(201).json({ challenge: toPublicChallenge(c, userId) });
  })
);

socialRouter.post("/challenges/:id/accept", (req, res) => {
  const userId = currentUser(req).id;
  res.json({ challenge: toPublicChallenge(respondToChallenge(userId, parseId(req.params.id), true), userId) });
});

socialRouter.post("/challenges/:id/decline", (req, res) => {
  const userId = currentUser(req).id;
  res.json({ challenge: toPublicChallenge(respondToChallenge(userId, parseId(req.params.id), false), userId) });
});

/** Empieza o reanuda la partida del usuario en este reto. */
socialRouter.post("/challenges/:id/play", (req, res) => {
  const userId = currentUser(req).id;
  const c = getChallenge(parseId(req.params.id));
  assertCanPlay(userId, c);
  res.status(201).json({ game: startChallengeGame(userId, c) });
});

// ---------- Clasificación ----------

socialRouter.get("/leaderboard", (req, res) => {
  const { scope, period } = parseBody(
    z.object({
      scope: z.enum(["global", "friends"]).default("global"),
      period: z.enum(["all", "week"]).default("all"),
    }),
    req.query
  );
  const userId = currentUser(req).id;
  const friendFilter =
    scope === "friends"
      ? `AND u.id IN (SELECT ? UNION SELECT addressee_id FROM friendships WHERE requester_id = ? AND status='accepted'
           UNION SELECT requester_id FROM friendships WHERE addressee_id = ? AND status='accepted')`
      : "";
  const params = scope === "friends" ? [userId, userId, userId] : [];
  const pointsExpr =
    period === "week"
      ? `COALESCE((SELECT SUM(score) FROM games g WHERE g.user_id = u.id AND g.status='finished'
           AND g.finished_at > datetime('now','-7 days')), 0)`
      : "COALESCE(s.total_points, 0)";
  const rows = db
    .prepare(
      `SELECT u.id, u.display_name, u.avatar, ${pointsExpr} AS total_points
       FROM users u LEFT JOIN user_stats s ON s.user_id = u.id
       WHERE 1=1 ${friendFilter}
       ORDER BY total_points DESC, u.id LIMIT 100`
    )
    .all(...params) as Parameters<typeof toPlayer>[0][];
  const players = rows.map(toPlayer);
  res.json({ players, myRank: players.findIndex((p) => p.id === userId) + 1 || null });
});
