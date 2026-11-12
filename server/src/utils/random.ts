import crypto from "crypto";

/** Fisher-Yates con aleatoriedad criptográfica (sin el sesgo de sort(() => Math.random() - 0.5)). */
export function shuffle<T>(items: readonly T[], rand: (max: number) => number = crypto.randomInt): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** PRNG determinista (mulberry32) para el desafío diario: misma semilla => mismas preguntas. */
export function seededRandInt(seedText: string): (max: number) => number {
  let seed = 0;
  for (const ch of seedText) seed = (Math.imul(31, seed) + ch.charCodeAt(0)) | 0;
  return (max: number) => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    const r = ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    return Math.floor(r * max);
  };
}

export function randomToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString("base64url");
}

export function sha256(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin 0/O/1/I para evitar confusiones

export function randomCode(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) out += CODE_CHARS[crypto.randomInt(CODE_CHARS.length)];
  return out;
}

/** Fecha YYYY-MM-DD en UTC. */
export function todayKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}
