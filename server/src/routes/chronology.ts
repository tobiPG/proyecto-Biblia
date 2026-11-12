import { Router } from "express";
import { z } from "zod";
import { currentUser, requireAuth } from "../middleware/auth";
import { answerChronology, getChronology, startChronology } from "../services/chronology";
import { parseBody } from "../utils/http";

export const chronologyRouter = Router();
chronologyRouter.use("/chronology", requireAuth);

chronologyRouter.post("/chronology", (req, res) => {
  res.status(201).json({ game: startChronology(currentUser(req).id) });
});

chronologyRouter.get("/chronology/:id", (req, res) => {
  res.json({ game: getChronology(req.params.id, currentUser(req).id) });
});

chronologyRouter.post("/chronology/:id/answers", (req, res) => {
  const body = parseBody(
    z.object({ index: z.number().int().min(0), order: z.array(z.number().int()).min(2).max(8) }),
    req.body
  );
  res.json(answerChronology(currentUser(req).id, req.params.id, body.index, body.order));
});
