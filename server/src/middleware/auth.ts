import type { NextFunction, Request, Response } from "express";
import { db } from "../db";
import { SESSION_COOKIE, userFromSession } from "../services/auth";
import type { AuthUser } from "../types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

/** Exige sesión válida (cookie httpOnly). */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[SESSION_COOKIE];
  const user = typeof token === "string" ? userFromSession(token) : null;
  if (!user) return res.status(401).json({ error: "Inicia sesión para continuar" });
  req.user = user;
  db.prepare("UPDATE users SET last_active_at = datetime('now') WHERE id = ?").run(user.id);
  next();
}

/** Atajo tipado: solo usar en rutas protegidas por requireAuth. */
export const currentUser = (req: Request): AuthUser => req.user as AuthUser;
