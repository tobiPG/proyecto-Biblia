import dotenv from "dotenv";
import path from "path";

dotenv.config();

function num(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const config = {
  port: num(process.env.PORT, 4000),
  isProduction: process.env.NODE_ENV === "production",
  dbPath:
    process.env.DB_PATH === ":memory:"
      ? ":memory:"
      : path.resolve(process.cwd(), process.env.DB_PATH || "./data/bibliaquiz.db"),
  sessionDays: num(process.env.SESSION_DAYS, 30),
  webDist: path.resolve(process.cwd(), process.env.WEB_DIST || "../web/dist"),
};
