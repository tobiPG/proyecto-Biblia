import cookieParser from "cookie-parser";
import express, { type NextFunction, type Request, type Response } from "express";
import fs from "fs";
import helmet from "helmet";
import path from "path";
import { config } from "./config";
import { authRouter } from "./routes/auth";
import { catalogRouter } from "./routes/catalog";
import { clansRouter } from "./routes/clans";
import { gamesRouter } from "./routes/games";
import { meRouter } from "./routes/me";
import { socialRouter } from "./routes/social";
import { HttpError } from "./utils/http";
import { logger } from "./utils/logger";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");
  if (config.isProduction) app.set("trust proxy", 1); // Railway/Fly ponen un proxy delante

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          "default-src": ["'self'"],
          "img-src": ["'self'", "data:"],
          "style-src": ["'self'", "'unsafe-inline'"],
          "script-src": ["'self'"],
          "connect-src": ["'self'"],
        },
      },
    })
  );
  app.use(express.json({ limit: "100kb" }));
  app.use(cookieParser());

  // El API solo lo usa el propio frontend (mismo origen): bloquear peticiones de otros orígenes.
  app.use("/api", (req, res, next) => {
    const origin = req.get("origin");
    if (req.method !== "GET" && origin && new URL(origin).host !== req.get("host")) {
      return res.status(403).json({ error: "Origen no permitido" });
    }
    next();
  });

  app.get("/api/health", (_req, res) => res.json({ ok: true }));
  app.use("/api", authRouter);
  app.use("/api", catalogRouter);
  app.use("/api", meRouter);
  app.use("/api", gamesRouter);
  app.use("/api", socialRouter);
  app.use("/api", clansRouter);
  app.use("/api", (_req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

  // En producción el mismo servidor entrega el frontend compilado (web/dist).
  if (fs.existsSync(config.webDist)) {
    app.use(express.static(config.webDist, { index: false, maxAge: "1h" }));
    app.get("*", (_req, res) => res.sendFile(path.join(config.webDist, "index.html")));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof HttpError) return res.status(err.status).json({ error: err.message });
    if (err instanceof SyntaxError) return res.status(400).json({ error: "JSON inválido" });
    logger.error(err);
    res.status(500).json({ error: "Error interno del servidor" }); // sin filtrar detalles internos
  });

  return app;
}
