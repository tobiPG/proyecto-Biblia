import mongoose from 'mongoose';

const matchmakingQueueSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  userName: { type: String, default: 'Jugador' },
  category: { type: String, required: true },
  trophies: { type: Number, default: 0 },
  rankId: { type: String, default: 'bronce3' },
  status: { type: String, enum: ['searching', 'matched'], default: 'searching' },
  matchedWith: { type: String, default: null },
  matchId: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

// Auto-eliminar entradas de cola después de 5 minutos
matchmakingQueueSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export default mongoose.model('MatchmakingQueue', matchmakingQueueSchema);
