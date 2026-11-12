export type Difficulty = "facil" | "intermedio" | "dificil" | "experto";

export type CategoryId =
  | "personajes"
  | "libros"
  | "historias"
  | "reyes"
  | "profetas"
  | "vida_jesus"
  | "milagros"
  | "cartas"
  | "lugares"
  | "versiculos"
  | "ensenanzas"
  | "parabolas"
  | "salmos-proverbios";

export interface Question {
  id: number;
  difficulty: Difficulty;
  category: CategoryId;
  question: string;
  options: string[];
  correct: number;
  reference: string;
  explanation: string;
  /** Imagen opcional (mapas), ruta relativa a web/public. */
  image?: string;
}

export interface Verse {
  text: string;
  ref: string;
}

/** Pregunta tal como se envía al cliente: sin la respuesta correcta. */
export interface PublicQuestion {
  id: number;
  category: CategoryId;
  difficulty: Difficulty;
  question: string;
  options: string[];
  image?: string;
}

export type GameMode = "solo" | "daily" | "challenge" | "campaign";

export interface AuthUser {
  id: number;
  email: string;
  displayName: string;
  avatar: string;
  friendCode: string;
}
