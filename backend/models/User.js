import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    default: uuidv4
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // permite nulos
    lowercase: true
  },
  displayName: {
    type: String,
    default: 'Jugador'
  },
  photoURL: String,
  
  // Progresión
  level: { type: Number, default: 1 },
  xp: { type: Number, default: 0 },
  xpToNext: { type: Number, default: 100 },
  totalPoints: { type: Number, default: 0 },
  totalCorrect: { type: Number, default: 0 },
  totalWrong: { type: Number, default: 0 },
  totalAnswered: { type: Number, default: 0 },
  totalGames: { type: Number, default: 0 },
  bestStreak: { type: Number, default: 0 },
  perfectGames: { type: Number, default: 0 },
  expertCorrect: { type: Number, default: 0 },
  categoriesPlayed: { type: Number, default: 0 },
  
  // Monedas
  coins: { type: Number, default: 0 },
  coinsEarned: { type: Number, default: 0 },
  coinsSpent: { type: Number, default: 0 },
  coinMultiplier: { type: Number, default: 1 },
  
  // 🆕 Insignias ganadas
  badges: { type: [String], default: [] },
  
  // 🆕 Preguntas respondidas y falladas
  answeredQuestions: { type: [Number], default: [] },
  wrongAnswers: { type: mongoose.Schema.Types.Mixed, default: [] },
  
  // 🆕 Historial de partidas (últimas 50)
  gameHistory: { type: mongoose.Schema.Types.Mixed, default: [] },
  
  // 🆕 Estadísticas por categoría
  categoryStats: { type: mongoose.Schema.Types.Mixed, default: {} },
  
  // 🆕 Récords de modo contrarreloj
  challengeRecords: { type: mongoose.Schema.Types.Mixed, default: {} },

  // Rankings por categoría (ranked competitivo)
  // { personajes: { trophies, wins, losses, ties, highestTrophies, gamesPlayed }, ... }
  rankings: { type: mongoose.Schema.Types.Mixed, default: {} },
  
  // 🆕 Racha diaria
  dailyStreak: { type: mongoose.Schema.Types.Mixed, default: { current: 0, best: 0, lastDate: null } },
  
  // 🆕 Desafío diario
  dailyChallenge: { type: mongoose.Schema.Types.Mixed, default: {} },
  
  // 🆕 Categorías completadas
  categoryComplete: { type: mongoose.Schema.Types.Mixed, default: {} },
  
  // 🆕 Estadísticas de velocidad
  speedStats: { type: mongoose.Schema.Types.Mixed, default: {} },
  
  // 🆕 Configuración del usuario
  settings: { type: mongoose.Schema.Types.Mixed, default: {
    sound: true,
    vibration: true,
    questionsPerGame: 10,
    showVerse: true,
    timerSeconds: 30,
    noRepeat: true
  }},
  
  // 🆕 Versículos favoritos
  favoriteVerses: { type: mongoose.Schema.Types.Mixed, default: [] },
  
  // Clanes
  clanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clan', default: null },
  clanTag: { type: String, default: null },
  clanWeeklyPoints: { type: Number, default: 0 },

  // Progreso de campaña
  campaignProgress: { type: mongoose.Schema.Types.Mixed, default: {} },

  // Sistema de amigos
  friendCode: {
    type: String,
    unique: true,
    default: generateFriendCode
  },
  friends: [String], // Array de UIDs
  friendRequests: [String], // Solicitudes recibidas
  sentRequests: [String], // Solicitudes enviadas
  
  // Pagos / Premium
  isPremium: { type: Boolean, default: false },
  premiumExpiry: { type: Date, default: null },
  adsRemoved: { type: Boolean, default: false },
  infiniteLives: { type: Boolean, default: false },

  // Auth
  isAnonymous: { type: Boolean, default: true },
  password: String, // Para login local (si lo implementas)
  googleId: String, // Para OAuth con Google
  
  // Metadata
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Hook para actualizar lastActive
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

function generateFriendCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default mongoose.model('User', userSchema);
