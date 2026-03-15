import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const sessionSchema = new mongoose.Schema({
  token: {
    type: String,
    unique: true,
    default: uuidv4
  },
  userId: String,
  expiresAt: Date,
  createdAt: { type: Date, default: Date.now }
});

// Auto-eliminar sesiones expiradas
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Session', sessionSchema);
