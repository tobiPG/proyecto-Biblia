import type {
  AnswerResult,
  Catalog,
  Campaign,
  Challenge,
  ChronologyAnswer,
  ChronologyGame,
  Game,
  MeResponse,
  Player,
  StatsResponse,
  StudyQuestion,
  User,
  Verse,
} from "./types";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api${path}`, {
    credentials: "same-origin",
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body.error || `Error ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

const post = <T>(path: string, body?: unknown) =>
  request<T>(path, { method: "POST", body: body === undefined ? undefined : JSON.stringify(body) });

export const api = {
  // Sesión
  register: (email: string, password: string, displayName: string) =>
    post<{ user: User }>("/auth/register", { email, password, displayName }),
  login: (email: string, password: string) => post<{ user: User }>("/auth/login", { email, password }),
  logout: () => post<void>("/auth/logout"),
  changePassword: (currentPassword: string, newPassword: string) =>
    post<void>("/auth/change-password", { currentPassword, newPassword }),

  // Perfil
  me: () => request<MeResponse>("/me"),
  updateMe: (data: { displayName?: string; avatar?: string }) =>
    request<{ user: User }>("/me", { method: "PATCH", body: JSON.stringify(data) }),
  deleteAccount: () => request<void>("/me", { method: "DELETE" }),
  stats: () => request<StatsResponse>("/me/stats"),
  favoriteVerses: () => request<{ refs: string[] }>("/me/favorite-verses"),
  setFavoriteVerse: (ref: string, fav: boolean) =>
    request<void>(`/me/favorite-verses/${encodeURIComponent(ref)}`, { method: fav ? "PUT" : "DELETE" }),

  // Catálogo
  catalog: () => request<Catalog>("/catalog"),
  verses: () => request<{ today: Verse; verses: Verse[] }>("/verses"),
  study: (category: string, page: number) =>
    request<{ total: number; page: number; pageSize: number; questions: StudyQuestion[] }>(
      `/study?category=${encodeURIComponent(category)}&page=${page}`
    ),

  // Partidas
  startSolo: (category: string, difficulty: string) =>
    post<{ game: Game }>("/games", { mode: "solo", category, difficulty }),
  startDaily: () => post<{ game: Game }>("/games", { mode: "daily" }),
  game: (id: string) => request<{ game: Game }>(`/games/${id}`),
  startQuestion: (id: string, index: number) => post<{ game: Game }>(`/games/${id}/questions/${index}/start`),
  answer: (id: string, questionIndex: number, chosen: number) =>
    post<AnswerResult>(`/games/${id}/answers`, { questionIndex, chosen }),

  // Amigos
  friends: () => request<{ friends: Player[]; incoming: Player[]; outgoing: Player[] }>("/friends"),
  addFriend: (code: string) => post<{ result: "sent" | "accepted"; player: Player }>("/friends/requests", { code }),
  acceptFriend: (id: number) => post<void>(`/friends/requests/${id}/accept`),
  declineFriend: (id: number) => post<void>(`/friends/requests/${id}/decline`),
  removeFriend: (id: number) => request<void>(`/friends/${id}`, { method: "DELETE" }),

  // Retos 1 vs 1
  challenges: () => request<{ challenges: Challenge[] }>("/challenges"),
  createChallenge: (friendId: number, category: string, difficulty: string) =>
    post<{ challenge: Challenge }>("/challenges", { friendId, category, difficulty }),
  acceptChallenge: (id: number) => post<{ challenge: Challenge }>(`/challenges/${id}/accept`),
  declineChallenge: (id: number) => post<{ challenge: Challenge }>(`/challenges/${id}/decline`),
  playChallenge: (id: number) => post<{ game: Game }>(`/challenges/${id}/play`),

  // Clasificación
  leaderboard: (scope: "global" | "friends", period: "all" | "week") =>
    request<{ players: Player[]; myRank: number | null }>(`/leaderboard?scope=${scope}&period=${period}`),

  // Campaña
  campaign: () => request<Campaign>("/campaign"),
  playChapter: (chapterId: string) => post<{ game: Game }>("/campaign/play", { chapterId }),

  // Cronología
  startChronology: () => post<{ game: ChronologyGame }>("/chronology"),
  chronology: (id: string) => request<{ game: ChronologyGame }>(`/chronology/${id}`),
  answerChronology: (id: string, index: number, order: number[]) =>
    post<ChronologyAnswer>(`/chronology/${id}/answers`, { index, order }),
};
