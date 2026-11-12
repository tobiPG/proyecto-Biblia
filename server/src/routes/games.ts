import { Router } from "express";
import { z } from "zod";
import { CATEGORY_IDS, DIFFICULTY_IDS } from "../data/catalog";
import { currentUser, requireAuth } from "../middleware/auth";
import { answerQuestion, getGame, startDailyGame, startSoloGame } from "../services/games";
import type { Difficulty } from "../types";
import { asyncHandler, parseBody } from "../utils/http";

export const gamesRouter = Router();
gamesRouter.use("/games", requireAuth);

const categorySchema = z.enum(["aleatorio", ...CATEGORY_IDS] as [string, ...string[]]);
const difficultySchema = z.enum(DIFFICULTY_IDS as [Difficulty, ...Difficulty[]]);

gamesRouter.post(
  "/games",
  asyncHandler((req, res) => {
    const body = parseBody(
      z.discriminatedUnion("mode", [
        z.object({ mode: z.literal("solo"), category: categorySchema, difficulty: difficultySchema }),
        z.object({ mode: z.literal("daily") }),
      ]),
      req.body
    );
    const userId = currentUser(req).id;
    const game =
      body.mode === "daily"
        ? startDailyGame(userId)
        : startSoloGame(userId, body.category as never, body.difficulty);
    res.status(201).json({ game });
  })
);

gamesRouter.get(
  "/games/:id",
  asyncHandler((req, res) => {
    res.json({ game: getGame(req.params.id, currentUser(req).id) });
  })
);

gamesRouter.post(
  "/games/:id/answers",
  asyncHandler((req, res) => {
    const body = parseBody(
      z.object({ questionIndex: z.number().int().min(0), chosen: z.number().int().min(-1) }),
      req.body
    );
    res.json(answerQuestion(currentUser(req).id, req.params.id, body.questionIndex, body.chosen));
  })
);
