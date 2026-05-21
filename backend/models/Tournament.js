import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema({
  weekNumber: Number, // ISO week
  year: Number,
  status: { type: String, enum: ['registration', 'active', 'completed'], default: 'registration' },
  participants: [{
    uid: String,
    displayName: String,
    seed: Number,
    eliminated: { type: Boolean, default: false }
  }],
  maxParticipants: { type: Number, default: 16 },
  bracket: [{
    round: Number, // 1=quarterfinal, 2=semifinal, 3=final
    matchIndex: Number,
    player1Uid: String,
    player2Uid: String,
    score1: { type: Number, default: 0 },
    score2: { type: Number, default: 0 },
    winner: String,
    status: { type: String, enum: ['pending', 'active', 'completed'], default: 'pending' }
  }],
  champion: String, // uid
  prizeCoins: { type: Number, default: 500 },
  startDate: Date,
  endDate: Date
}, { timestamps: true });

// Helper to get ISO week number
tournamentSchema.statics.getCurrentWeek = function() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.ceil(diff / oneWeek);
};

export default mongoose.model('Tournament', tournamentSchema);
