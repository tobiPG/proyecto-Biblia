import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const challengeSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true
  },
  creatorId: String,
  creatorName: String,
  opponentId: String,
  opponentName: String,
  
  // Configuración del reto
  category: String,
  difficulty: String,
  questionsCount: { type: Number, default: 10 },
  questionIds: [String], // IDs de las preguntas
  
  // Estado
  status: {
    type: String,
    enum: ['pending', 'active', 'completed'],
    default: 'pending'
  },
  
  // Resultados
  creatorScore: Number,
  opponentScore: Number,
  creatorTime: Number,
  opponentTime: Number,
  creatorCorrect: Number,
  opponentCorrect: Number,
  winner: String, // UID del ganador o 'tie'
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  completedAt: Date
});

// Índices para búsquedas rápidas
challengeSchema.index({ opponentId: 1, status: 1 });
challengeSchema.index({ creatorId: 1 });
challengeSchema.index({ createdAt: -1 });

export default mongoose.model('Challenge', challengeSchema);
