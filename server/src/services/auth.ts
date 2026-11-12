import bcrypt from "bcryptjs";
import { config } from "../config";
import { db } from "../db";
import type { AuthUser } from "../types";
import { HttpError } from "../utils/http";
import { randomCode, randomToken, sha256 } from "../utils/random";

export const SESSION_COOKIE = "bq_session";

interface UserRow {
  id: number;
  email: string;
  password_hash: string;
  display_name: string;
  avatar: string;
  friend_code: string;
}

export const toAuthUser = (u: UserRow): AuthUser => ({
  id: u.id,
  email: u.email,
  displayName: u.display_name,
  avatar: u.avatar,
  friendCode: u.friend_code,
});

function uniqueFriendCode(): string {
  const exists = db.prepare("SELECT 1 FROM users WHERE friend_code = ?");
  for (let i = 0; i < 20; i++) {
    const code = randomCode(6);
    if (!exists.get(code)) return code;
  }
  throw new Error("No se pudo generar un código de amigo único");
}

export async function registerUser(email: string, password: string, displayName: string): Promise<AuthUser> {
  if (db.prepare("SELECT 1 FROM users WHERE email = ?").get(email)) {
    throw new HttpError(409, "Ese email ya está registrado");
  }
  const hash = await bcrypt.hash(password, 12);
  const create = db.transaction(() => {
    const info = db
      .prepare("INSERT INTO users (email, password_hash, display_name, friend_code) VALUES (?, ?, ?, ?)")
      .run(email, hash, displayName, uniqueFriendCode());
    const id = Number(info.lastInsertRowid);
    db.prepare("INSERT INTO user_stats (user_id) VALUES (?)").run(id);
    return id;
  });
  const id = create();
  return toAuthUser(db.prepare("SELECT * FROM users WHERE id = ?").get(id) as UserRow);
}

// Hash ficticio para que el login tarde lo mismo exista o no el email (evita enumerar cuentas).
const DUMMY_HASH = bcrypt.hashSync("dummy-password-for-timing", 12);

export async function verifyLogin(email: string, password: string): Promise<AuthUser> {
  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as UserRow | undefined;
  const ok = await bcrypt.compare(password, row?.password_hash ?? DUMMY_HASH);
  if (!row || !ok) throw new HttpError(401, "Email o contraseña incorrectos");
  return toAuthUser(row);
}

export function createSession(userId: number): { token: string; expiresAt: Date } {
  const token = randomToken();
  const expiresAt = new Date(Date.now() + config.sessionDays * 24 * 60 * 60 * 1000);
  db.prepare("INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)").run(
    sha256(token),
    userId,
    expiresAt.toISOString()
  );
  return { token, expiresAt };
}

export function userFromSession(token: string): AuthUser | null {
  const row = db
    .prepare(
      `SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.token_hash = ? AND s.expires_at > ?`
    )
    .get(sha256(token), new Date().toISOString()) as UserRow | undefined;
  return row ? toAuthUser(row) : null;
}

export function deleteSession(token: string): void {
  db.prepare("DELETE FROM sessions WHERE token_hash = ?").run(sha256(token));
}

export async function changePassword(userId: number, current: string, next: string): Promise<void> {
  const row = db.prepare("SELECT password_hash FROM users WHERE id = ?").get(userId) as { password_hash: string };
  if (!(await bcrypt.compare(current, row.password_hash))) {
    throw new HttpError(401, "La contraseña actual no es correcta");
  }
  const hash = await bcrypt.hash(next, 12);
  db.transaction(() => {
    db.prepare("UPDATE users SET password_hash = ? WHERE id = ?").run(hash, userId);
    db.prepare("DELETE FROM sessions WHERE user_id = ?").run(userId); // cierra todas las sesiones
  })();
}

export function purgeExpiredSessions(): number {
  return db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(new Date().toISOString()).changes;
}
