import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { config } from "../config";
import { logger } from "../utils/logger";

if (config.dbPath !== ":memory:") {
  const dbDir = path.dirname(config.dbPath);
  if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(config.dbPath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.pragma("busy_timeout = 5000");

/**
 * Migraciones versionadas con PRAGMA user_version.
 * Nunca edites una migración ya publicada: añade una nueva al final.
 */
const MIGRATIONS: string[] = [
  // 1 — esquema inicial
  `
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    display_name TEXT NOT NULL,
    avatar TEXT NOT NULL DEFAULT '',
    friend_code TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_active_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE sessions (
    token_hash TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX idx_sessions_user ON sessions(user_id);

  -- Estadísticas acumuladas (las escribe solo el servidor al terminar una partida)
  CREATE TABLE user_stats (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    total_points INTEGER NOT NULL DEFAULT 0,
    total_correct INTEGER NOT NULL DEFAULT 0,
    total_wrong INTEGER NOT NULL DEFAULT 0,
    total_games INTEGER NOT NULL DEFAULT 0,
    best_streak INTEGER NOT NULL DEFAULT 0,
    perfect_games INTEGER NOT NULL DEFAULT 0,
    expert_correct INTEGER NOT NULL DEFAULT 0,
    fast_answers INTEGER NOT NULL DEFAULT 0,
    daily_streak INTEGER NOT NULL DEFAULT 0,
    daily_best_streak INTEGER NOT NULL DEFAULT 0,
    last_daily_date TEXT,
    daily_completed INTEGER NOT NULL DEFAULT 0,
    challenges_won INTEGER NOT NULL DEFAULT 0,
    chronology_perfect INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE user_category_stats (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    correct INTEGER NOT NULL DEFAULT 0,
    wrong INTEGER NOT NULL DEFAULT 0,
    games INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (user_id, category)
  );

  CREATE TABLE user_badges (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id TEXT NOT NULL,
    earned_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, badge_id)
  );

  -- Preguntas ya vistas por el usuario (para no repetir)
  CREATE TABLE user_seen_questions (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, question_id)
  ) WITHOUT ROWID;

  CREATE TABLE user_favorite_verses (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    verse_ref TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, verse_ref)
  );

  -- Amistades: una fila por par. status = pending | accepted
  CREATE TABLE friendships (
    requester_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    addressee_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','accepted')),
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (requester_id, addressee_id),
    CHECK (requester_id <> addressee_id)
  );
  CREATE INDEX idx_friendships_addressee ON friendships(addressee_id);

  -- Retos 1 vs 1 entre amigos (asíncronos: cada uno juega las mismas preguntas)
  CREATE TABLE challenges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    creator_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    opponent_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    question_ids TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
      CHECK (status IN ('pending','active','completed','declined','expired')),
    winner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    expires_at TEXT NOT NULL,
    completed_at TEXT
  );
  CREATE INDEX idx_challenges_creator ON challenges(creator_id, status);
  CREATE INDEX idx_challenges_opponent ON challenges(opponent_id, status);

  -- Partidas. El servidor guarda el orden de opciones y corrige cada respuesta.
  CREATE TABLE games (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mode TEXT NOT NULL CHECK (mode IN ('solo','daily','challenge','campaign')),
    category TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    challenge_id INTEGER REFERENCES challenges(id) ON DELETE CASCADE,
    daily_date TEXT,
    chapter_id TEXT,                   -- capítulo de campaña
    questions TEXT NOT NULL,           -- JSON: [{ id, order: [índices originales] }]
    total INTEGER NOT NULL,
    current_index INTEGER NOT NULL DEFAULT 0,
    score INTEGER NOT NULL DEFAULT 0,
    correct_count INTEGER NOT NULL DEFAULT 0,
    current_streak INTEGER NOT NULL DEFAULT 0,
    best_streak INTEGER NOT NULL DEFAULT 0,
    total_time_ms INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','finished','abandoned')),
    question_started_at INTEGER NOT NULL,  -- epoch ms
    started_at TEXT NOT NULL DEFAULT (datetime('now')),
    finished_at TEXT
  );
  CREATE INDEX idx_games_user ON games(user_id, status);
  CREATE INDEX idx_games_finished ON games(status, finished_at);
  CREATE UNIQUE INDEX idx_games_daily_once ON games(user_id, daily_date) WHERE daily_date IS NOT NULL;
  CREATE UNIQUE INDEX idx_games_challenge_once ON games(user_id, challenge_id) WHERE challenge_id IS NOT NULL;

  CREATE TABLE game_answers (
    game_id TEXT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    question_index INTEGER NOT NULL,
    question_id INTEGER NOT NULL,
    chosen INTEGER NOT NULL,           -- -1 = se acabó el tiempo
    is_correct INTEGER NOT NULL,
    time_ms INTEGER NOT NULL,
    points INTEGER NOT NULL,
    PRIMARY KEY (game_id, question_index)
  );

  -- Campaña: mejor resultado por capítulo
  CREATE TABLE campaign_progress (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    chapter_id TEXT NOT NULL,
    stars INTEGER NOT NULL DEFAULT 0 CHECK (stars BETWEEN 0 AND 3),
    best_score INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    PRIMARY KEY (user_id, chapter_id)
  );

  -- Cronología: partidas de ordenar eventos (sin reloj)
  CREATE TABLE chronology_games (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    puzzles TEXT NOT NULL,             -- JSON: [{ id, shown: [índices originales en el orden mostrado] }]
    total INTEGER NOT NULL,
    current_index INTEGER NOT NULL DEFAULT 0,
    score INTEGER NOT NULL DEFAULT 0,
    perfect_count INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','finished','abandoned')),
    started_at TEXT NOT NULL DEFAULT (datetime('now')),
    finished_at TEXT
  );
  CREATE INDEX idx_chrono_user ON chronology_games(user_id, status);
  `,
];

export function migrate(): void {
  const current = db.pragma("user_version", { simple: true }) as number;
  for (let v = current; v < MIGRATIONS.length; v++) {
    db.transaction(() => {
      db.exec(MIGRATIONS[v]);
      db.pragma(`user_version = ${v + 1}`);
    })();
    logger.info(`Migración ${v + 1} aplicada`);
  }
}

migrate();
