export interface User {
  id: number;
  email: string;
  displayName: string;
  avatar: string;
  friendCode: string;
}

export interface Level {
  level: number;
  current: number;
  next: number;
}

export interface MeResponse {
  user: User;
  level: Level;
  totalPoints: number;
  dailyStreak: number;
  dailyDoneToday: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface DifficultyDef {
  id: string;
  name: string;
  icon: string;
  points: number;
}

export interface BadgeDef {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Catalog {
  categories: Category[];
  difficulties: DifficultyDef[];
  badges: BadgeDef[];
  counts: Record<string, Record<string, number>>;
  totalQuestions: number;
  questionsPerGame: number;
  secondsPerQuestion: number;
}

export interface PublicQuestion {
  id: number;
  category: string;
  difficulty: string;
  question: string;
  options: string[];
  image?: string;
}

export type GameMode = "solo" | "daily" | "challenge" | "campaign";

export interface Game {
  id: string;
  mode: GameMode;
  category: string;
  difficulty: string;
  challengeId: number | null;
  chapter: { id: string; name: string; worldName: string } | null;
  total: number;
  currentIndex: number;
  score: number;
  correctCount: number;
  streak: number;
  status: "active" | "finished" | "abandoned";
  secondsPerQuestion: number;
  questionStarted: boolean;
  secondsLeft: number;
  question: PublicQuestion | null;
}

export interface GameSummary {
  gameId: string;
  mode: GameMode;
  score: number;
  correct: number;
  total: number;
  bestStreak: number;
  totalTimeMs: number;
  level: number;
  totalPoints: number;
  newBadges: BadgeDef[];
  challengeId: number | null;
  stars: number | null;
  chapter: { id: string; name: string; worldName: string } | null;
}

export interface AnswerResult {
  questionIndex: number;
  correct: boolean;
  timedOut: boolean;
  correctIndex: number;
  points: number;
  explanation: string;
  reference: string;
  score: number;
  streak: number;
  finished: boolean;
  summary?: GameSummary;
}

export interface Player {
  id: number;
  displayName: string;
  avatar: string;
  level: number;
  totalPoints: number;
}

export interface PlayerResult {
  score: number;
  correct: number;
  total: number;
  timeMs: number;
  finished: boolean;
}

export interface Challenge {
  id: number;
  category: string;
  difficulty: string;
  status: "pending" | "active" | "completed" | "declined" | "expired";
  createdAt: string;
  expiresAt: string;
  isCreator: boolean;
  opponent: { id: number; displayName: string; avatar: string };
  me: PlayerResult | null;
  them: PlayerResult | null;
  outcome: "me" | "them" | "tie" | null;
  canPlay: boolean;
  canRespond: boolean;
}

export interface StatsResponse {
  level: Level;
  stats: {
    totalPoints: number;
    totalCorrect: number;
    totalWrong: number;
    totalGames: number;
    bestStreak: number;
    perfectGames: number;
    dailyStreak: number;
    dailyBestStreak: number;
    challengesWon: number;
  };
  categories: { category: string; correct: number; wrong: number; games: number }[];
  badges: (BadgeDef & { earnedAt: string | null })[];
  recentGames: {
    id: string;
    mode: GameMode;
    category: string;
    difficulty: string;
    score: number;
    correct: number;
    total: number;
    finishedAt: string;
  }[];
}

export interface Verse {
  text: string;
  ref: string;
}

export interface StudyQuestion {
  id: number;
  category: string;
  difficulty: string;
  question: string;
  answer: string;
  reference: string;
  explanation: string;
}

export interface CampaignChapter {
  id: string;
  name: string;
  difficulty: string;
  categories: string[];
  stars: number;
  bestScore: number;
  unlocked: boolean;
}

export interface CampaignWorld {
  id: string;
  name: string;
  icon: string;
  subtitle: string;
  requiredStars: number;
  unlocked: boolean;
  chapters: CampaignChapter[];
}

export interface Campaign {
  totalStars: number;
  maxStars: number;
  worlds: CampaignWorld[];
}

export interface ChronologyGame {
  id: string;
  total: number;
  currentIndex: number;
  score: number;
  status: "active" | "finished" | "abandoned";
  puzzle: { question: string; items: string[] } | null;
}

export interface ChronologyAnswer {
  perfect: boolean;
  positionsRight: number;
  points: number;
  correctOrder: number[];
  score: number;
  finished: boolean;
  summary?: {
    score: number;
    perfect: number;
    total: number;
    level: number;
    totalPoints: number;
    newBadges: BadgeDef[];
  };
}
