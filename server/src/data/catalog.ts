import type { CategoryId, Difficulty } from "../types";

export const CATEGORIES: Record<CategoryId, { name: string; icon: string; color: string }> = {
  personajes: { name: "Personajes", icon: "🧑‍🤝‍🧑", color: "#4CAF50" },
  libros: { name: "Libros", icon: "📚", color: "#2196F3" },
  historias: { name: "Historias", icon: "📜", color: "#FF9800" },
  reyes: { name: "Reyes", icon: "👑", color: "#9C27B0" },
  profetas: { name: "Profetas", icon: "🔮", color: "#F44336" },
  vida_jesus: { name: "Vida de Jesús", icon: "✝️", color: "#E91E63" },
  milagros: { name: "Milagros", icon: "✨", color: "#00BCD4" },
  cartas: { name: "Cartas", icon: "💌", color: "#795548" },
  lugares: { name: "Lugares", icon: "🗺️", color: "#3F51B5" },
  versiculos: { name: "Versículos", icon: "📖", color: "#8BC34A" },
  ensenanzas: { name: "Enseñanzas", icon: "📝", color: "#FF5722" },
  parabolas: { name: "Parábolas", icon: "🌾", color: "#009688" },
  "salmos-proverbios": { name: "Salmos y Proverbios", icon: "🎵", color: "#7E57C2" },
};

export const CATEGORY_IDS = Object.keys(CATEGORIES) as CategoryId[];

/** "aleatorio" mezcla todas las categorías. */
export type CategoryOrRandom = CategoryId | "aleatorio";

export const DIFFICULTIES: Record<Difficulty, { name: string; icon: string; points: number }> = {
  facil: { name: "Fácil", icon: "🌱", points: 10 },
  intermedio: { name: "Intermedio", icon: "📗", points: 20 },
  dificil: { name: "Difícil", icon: "🔥", points: 30 },
  experto: { name: "Experto", icon: "👑", points: 50 },
};

export const DIFFICULTY_IDS = Object.keys(DIFFICULTIES) as Difficulty[];

/** Segundos por pregunta. El servidor da un pequeño margen por latencia. */
export const QUESTION_SECONDS = 30;
export const QUESTIONS_PER_GAME = 10;
export const FAST_ANSWER_MS = 3000;

export interface BadgeStats {
  totalPoints: number;
  totalCorrect: number;
  totalAnswered: number;
  totalGames: number;
  bestStreak: number;
  perfectGames: number;
  expertCorrect: number;
  fastAnswers: number;
  dailyStreak: number;
  dailyCompleted: number;
  challengesWon: number;
  categoriesPlayed: number;
  /** Categorías con todas sus preguntas respondidas al menos una vez. */
  categoriesCompleted: string[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  condition: (s: BadgeStats) => boolean;
}

const categoryBadge = (id: CategoryId, name: string, icon: string): Badge => ({
  id: `category_${id}`,
  name,
  icon,
  description: `Responde todas las preguntas de ${CATEGORIES[id].name}`,
  condition: (s) => s.categoriesCompleted.includes(id),
});

export const BADGES: Badge[] = [
  { id: "first_win", name: "Primera Victoria", icon: "🏆", description: "Responde tu primera pregunta correctamente", condition: (s) => s.totalCorrect >= 1 },
  { id: "streak_5", name: "En Racha", icon: "🔥", description: "5 respuestas correctas seguidas", condition: (s) => s.bestStreak >= 5 },
  { id: "streak_10", name: "Imparable", icon: "⚡", description: "10 respuestas correctas seguidas", condition: (s) => s.bestStreak >= 10 },
  { id: "streak_20", name: "Leyenda Bíblica", icon: "💎", description: "20 respuestas correctas seguidas", condition: (s) => s.bestStreak >= 20 },
  { id: "super_streak", name: "Racha Legendaria", icon: "🌟", description: "50 respuestas correctas seguidas", condition: (s) => s.bestStreak >= 50 },
  { id: "points_100", name: "Centurión", icon: "🛡️", description: "Alcanza 100 puntos", condition: (s) => s.totalPoints >= 100 },
  { id: "points_500", name: "Guerrero de Fe", icon: "⚔️", description: "Alcanza 500 puntos", condition: (s) => s.totalPoints >= 500 },
  { id: "points_1000", name: "Campeón Bíblico", icon: "👑", description: "Alcanza 1.000 puntos", condition: (s) => s.totalPoints >= 1000 },
  { id: "points_5000", name: "Maestro Supremo", icon: "⭐", description: "Alcanza 5.000 puntos", condition: (s) => s.totalPoints >= 5000 },
  { id: "games_10", name: "Fiel Jugador", icon: "📖", description: "Juega 10 partidas", condition: (s) => s.totalGames >= 10 },
  { id: "games_50", name: "Devoto", icon: "🙏", description: "Juega 50 partidas", condition: (s) => s.totalGames >= 50 },
  { id: "perfect_game", name: "Perfección", icon: "🎯", description: "Acierta todas las preguntas de una partida", condition: (s) => s.perfectGames >= 1 },
  { id: "all_categories", name: "Explorador", icon: "🧭", description: "Juega en 8 categorías distintas", condition: (s) => s.categoriesPlayed >= 8 },
  { id: "expert_win", name: "Sabio", icon: "🦉", description: "Acierta 10 preguntas de nivel Experto", condition: (s) => s.expertCorrect >= 10 },
  { id: "total_100", name: "Estudioso", icon: "📚", description: "Responde 100 preguntas en total", condition: (s) => s.totalAnswered >= 100 },
  { id: "fast_5", name: "Rápido", icon: "⏱️", description: "Responde bien 5 preguntas en menos de 3 segundos", condition: (s) => s.fastAnswers >= 5 },
  { id: "fast_10", name: "Relámpago", icon: "🌩️", description: "Responde bien 10 preguntas en menos de 3 segundos", condition: (s) => s.fastAnswers >= 10 },
  { id: "daily_first", name: "Contrarreloj", icon: "📅", description: "Completa un desafío diario", condition: (s) => s.dailyCompleted >= 1 },
  { id: "streak_30", name: "Constante", icon: "🗓️", description: "Racha de 30 días seguidos con el desafío diario", condition: (s) => s.dailyStreak >= 30 },
  { id: "challenge_win", name: "Retador", icon: "🤝", description: "Gana un reto 1 vs 1 contra un amigo", condition: (s) => s.challengesWon >= 1 },
  { id: "challenge_10", name: "Invicto", icon: "🥇", description: "Gana 10 retos 1 vs 1", condition: (s) => s.challengesWon >= 10 },
  categoryBadge("personajes", "Maestro de Personajes", "🧑‍🤝‍🧑"),
  categoryBadge("libros", "Maestro de Libros", "📚"),
  categoryBadge("historias", "Maestro de Historias", "📜"),
  categoryBadge("reyes", "Maestro de Reyes", "👑"),
  categoryBadge("profetas", "Maestro de Profetas", "🔮"),
  categoryBadge("vida_jesus", "Maestro de Jesús", "✝️"),
  categoryBadge("milagros", "Maestro de Milagros", "✨"),
  categoryBadge("cartas", "Maestro de Cartas", "💌"),
];
