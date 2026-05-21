import mongoose from 'mongoose';

function generateTag() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let tag = '';
  for (let i = 0; i < 5; i++) {
    tag += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return tag;
}

const clanSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 30 },
  tag: { type: String, unique: true, uppercase: true, maxlength: 6, default: generateTag },
  description: { type: String, maxlength: 150, default: '' },
  emoji: { type: String, default: '⛪' },
  leader: { type: String, required: true }, // user uid
  officers: [String], // user uids
  members: [{
    uid: String,
    displayName: String,
    weeklyPoints: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now }
  }],
  totalPoints: { type: Number, default: 0 },
  weeklyPoints: { type: Number, default: 0 },
  weeklyResetDate: { type: Date, default: Date.now },
  maxMembers: { type: Number, default: 50 },
  isOpen: { type: Boolean, default: true },
  minTrophies: { type: Number, default: 0 },
  wins: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Clan', clanSchema);
