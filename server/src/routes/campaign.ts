import { Router } from "express";
import { z } from "zod";
import { currentUser, requireAuth } from "../middleware/auth";
import { getCampaign } from "../services/campaign";
import { startCampaignGame } from "../services/games";
import { parseBody } from "../utils/http";

export const campaignRouter = Router();
campaignRouter.use("/campaign", requireAuth);

campaignRouter.get("/campaign", (req, res) => {
  res.json(getCampaign(currentUser(req).id));
});

campaignRouter.post("/campaign/play", (req, res) => {
  const { chapterId } = parseBody(z.object({ chapterId: z.string().max(10) }), req.body);
  res.status(201).json({ game: startCampaignGame(currentUser(req).id, chapterId) });
});
