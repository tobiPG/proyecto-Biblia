import { Router, type CookieOptions, type Response } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { config } from "../config";
import { currentUser, requireAuth } from "../middleware/auth";
import {
  changePassword,
  createSession,
  deleteSession,
  registerUser,
  SESSION_COOKIE,
  verifyLogin,
} from "../services/auth";
import { asyncHandler, parseBody } from "../utils/http";

export const authRouter = Router();

// Máx. 20 intentos cada 15 minutos por IP en login/registro.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Demasiados intentos. Espera unos minutos." },
});

const email = z.string().trim().toLowerCase().email("email inválido").max(254);
const password = z.string().min(8, "mínimo 8 caracteres").max(128);
export const displayNameSchema = z
  .string()
  .trim()
  .min(2, "mínimo 2 caracteres")
  .max(24, "máximo 24 caracteres")
  .regex(/^[\p{L}\p{N} _.-]+$/u, "solo letras, números, espacios y _ . -");

function cookieOptions(expires?: Date): CookieOptions {
  return { httpOnly: true, sameSite: "lax", secure: config.isProduction, path: "/", expires };
}

function startSession(res: Response, userId: number) {
  const { token, expiresAt } = createSession(userId);
  res.cookie(SESSION_COOKIE, token, cookieOptions(expiresAt));
}

authRouter.post(
  "/auth/register",
  authLimiter,
  asyncHandler(async (req, res) => {
    const body = parseBody(z.object({ email, password, displayName: displayNameSchema }), req.body);
    const user = await registerUser(body.email, body.password, body.displayName);
    startSession(res, user.id);
    res.status(201).json({ user });
  })
);

authRouter.post(
  "/auth/login",
  authLimiter,
  asyncHandler(async (req, res) => {
    const body = parseBody(z.object({ email, password: z.string().min(1).max(128) }), req.body);
    const user = await verifyLogin(body.email, body.password);
    startSession(res, user.id);
    res.json({ user });
  })
);

authRouter.post("/auth/logout", (req, res) => {
  const token = req.cookies?.[SESSION_COOKIE];
  if (typeof token === "string") deleteSession(token);
  res.clearCookie(SESSION_COOKIE, cookieOptions());
  res.status(204).end();
});

authRouter.post(
  "/auth/change-password",
  requireAuth,
  authLimiter,
  asyncHandler(async (req, res) => {
    const body = parseBody(z.object({ currentPassword: z.string().min(1), newPassword: password }), req.body);
    const user = currentUser(req);
    await changePassword(user.id, body.currentPassword, body.newPassword);
    startSession(res, user.id);
    res.status(204).end();
  })
);
