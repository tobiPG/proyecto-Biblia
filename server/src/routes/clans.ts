import { Router } from "express";
import { z } from "zod";
import { currentUser, requireAuth } from "../middleware/auth";
import { clanDetail, clanLeaderboard, clanOf, createClan, joinClan, leaveClan, searchClans } from "../services/clans";
import { parseBody, parseId } from "../utils/http";

export const clansRouter = Router();
clansRouter.use("/clans", requireAuth);

const CLAN_EMOJIS = ["⛪", "✝️", "🕊️", "🦁", "🐑", "📖", "🔥", "⭐", "👑", "🌿", "⚓", "🏔️"] as const;

clansRouter.get("/clans/mine", (req, res) => {
  res.json({ clan: clanOf(currentUser(req).id) });
});

clansRouter.get("/clans/leaderboard", (_req, res) => {
  res.json({ clans: clanLeaderboard() });
});

clansRouter.get("/clans/search", (req, res) => {
  const { q } = parseBody(z.object({ q: z.string().trim().min(2).max(30) }), req.query);
  res.json({ clans: searchClans(q) });
});

clansRouter.get("/clans/:id", (req, res) => {
  res.json({ clan: clanDetail(parseId(req.params.id)) });
});

clansRouter.post("/clans", (req, res) => {
  const body = parseBody(
    z.object({
      name: z.string().trim().min(3).max(30).regex(/^[\p{L}\p{N} _.-]+$/u, "caracteres no permitidos"),
      emoji: z.enum(CLAN_EMOJIS).default("⛪"),
      description: z.string().trim().max(150).default(""),
      isOpen: z.boolean().default(true),
    }),
    req.body
  );
  res.status(201).json({ clan: createClan(currentUser(req).id, body) });
});

clansRouter.post("/clans/join", (req, res) => {
  const { tag } = parseBody(z.object({ tag: z.string().trim().length(5) }), req.body);
  res.json({ clan: joinClan(currentUser(req).id, tag) });
});

clansRouter.post("/clans/leave", (req, res) => {
  leaveClan(currentUser(req).id);
  res.status(204).end();
});
