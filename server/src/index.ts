import "./db";
import { createApp } from "./app";
import { config } from "./config";
import { purgeExpiredSessions } from "./services/auth";
import { expireChallenges } from "./services/challenges";
import { logger } from "./utils/logger";

const app = createApp();

app.listen(config.port, () => {
  logger.info(`BibliaQuiz API escuchando en http://localhost:${config.port}`);
});

// Mantenimiento cada hora: sesiones vencidas y retos caducados.
const HOUR = 60 * 60 * 1000;
setInterval(() => {
  try {
    const n = purgeExpiredSessions();
    expireChallenges();
    if (n) logger.info(`Sesiones vencidas eliminadas: ${n}`);
  } catch (err) {
    logger.error("Error en mantenimiento", err);
  }
}, HOUR).unref();
