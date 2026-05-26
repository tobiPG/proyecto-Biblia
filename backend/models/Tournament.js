import mongoose from 'mongoose';

const tournamentSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true }, // sequential tournament number
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
  participants: [{
    uid: String,
    displayName: String,
    points: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 }
  }],
  prizes: {
    first:  { type: Number, default: 1000 },
    second: { type: Number, default: 500 },
    third:  { type: Number, default: 250 }
  },
  winners: [{
    place: Number,
    uid: String,
    displayName: String,
    coins: Number
  }],
  startDate: { type: Date, required: true },
  endDate:   { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('Tournament', tournamentSchema);
