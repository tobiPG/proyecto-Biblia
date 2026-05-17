import mongoose from 'mongoose';

const rankedMatchSchema = new mongoose.Schema({
  category: { type: String, required: true },
  questionsCount: { type: Number, default: 10 },
  questionIds: [Number],

  player1Id: { type: String, required: true },
  player1Name: { type: String, default: 'Jugador' },
  player1Trophies: { type: Number, default: 0 },
  player1Score: { type: Number, default: null },
  player1Time: { type: Number, default: null },
  player1Correct: { type: Number, default: null },

  player2Id: { type: String, required: true },
  player2Name: { type: String, default: 'Jugador' },
  player2Trophies: { type: Number, default: 0 },
  player2Score: { type: Number, default: null },
  player2Time: { type: Number, default: null },
  player2Correct: { type: Number, default: null },

  status: { type: String, enum: ['active', 'completed'], default: 'active' },
  winner: { type: String, default: null },
  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date, default: null }
});

// Auto-eliminar partidas completadas después de 7 días
rankedMatchSchema.index({ completedAt: 1 }, { expireAfterSeconds: 604800 });

export default mongoose.model('RankedMatch', rankedMatchSchema);
