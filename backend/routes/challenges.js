import express from 'express';
import Challenge from '../models/Challenge.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Crear un reto
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const { friendId, category, difficulty, questionsCount, questionIds } = req.body;
    
    const opponentDoc = await User.findOne({ uid: friendId });
    if (!opponentDoc) {
      return res.status(404).json({ error: 'Oponente no encontrado' });
    }
    
    const challenge = new Challenge({
      creatorId: req.user.uid,
      creatorName: req.user.displayName,
      opponentId: friendId,
      opponentName: opponentDoc.displayName,
      category,
      difficulty,
      questionsCount: questionsCount || 10,
      questionIds: questionIds || [],
      status: 'pending',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
    });
    
    await challenge.save();
    
    res.json({
      id: challenge.id,
      creatorId: challenge.creatorId,
      opponentId: challenge.opponentId,
      status: challenge.status,
      createdAt: challenge.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener retos pendientes (para aceptar)
router.get('/pending', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const challenges = await Challenge.find({
      opponentId: req.user.uid,
      status: 'pending'
    }).sort({ createdAt: -1 });
    
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener mis retos enviados
router.get('/sent', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const challenges = await Challenge.find({
      creatorId: req.user.uid
    }).sort({ createdAt: -1 }).limit(20);
    
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener retos activos
router.get('/active', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const challenges = await Challenge.find({
      $or: [
        { opponentId: req.user.uid, status: { $in: ['active', 'completed'] } },
        { creatorId: req.user.uid, status: { $in: ['active', 'completed'] } }
      ]
    }).sort({ createdAt: -1 }).limit(20);
    
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un reto específico
router.get('/:challengeId', authMiddleware, async (req, res) => {
  try {
    const challenge = await Challenge.findOne({ id: req.params.challengeId });
    
    if (!challenge) {
      return res.status(404).json({ error: 'Reto no encontrado' });
    }
    
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Aceptar reto
router.put('/:challengeId/accept', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const challenge = await Challenge.findOneAndUpdate(
      { 
        id: req.params.challengeId,
        opponentId: req.user.uid,
        status: 'pending'
      },
      { status: 'active' },
      { new: true }
    );
    
    if (!challenge) {
      return res.status(404).json({ error: 'Reto no encontrado o no es pendiente' });
    }
    
    res.json({ success: true, challenge });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rechazar reto
router.delete('/:challengeId/reject', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const challenge = await Challenge.findOneAndDelete({
      id: req.params.challengeId,
      opponentId: req.user.uid,
      status: 'pending'
    });
    
    if (!challenge) {
      return res.status(404).json({ error: 'Reto no encontrado' });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Enviar resultado del reto
router.put('/:challengeId/result', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const { score, timeSpent, correct } = req.body;
    const challengeId = req.params.challengeId;
    
    const challenge = await Challenge.findOne({ id: challengeId });
    
    if (!challenge) {
      return res.status(404).json({ error: 'Reto no encontrado' });
    }
    
    const isCreator = challenge.creatorId === req.user.uid;
    
    const updateData = isCreator 
      ? { creatorScore: score, creatorTime: timeSpent, creatorCorrect: correct }
      : { opponentScore: score, opponentTime: timeSpent, opponentCorrect: correct };
    
    let resultData = { success: true, completed: false };
    
    // Verificar si el otro jugador ya jugó
    const otherScore = isCreator ? challenge.opponentScore : challenge.creatorScore;
    
    if (otherScore !== null) {
      let winner = null;
      
      if (score > otherScore) {
        winner = req.user.uid;
      } else if (otherScore > score) {
        winner = isCreator ? challenge.opponentId : challenge.creatorId;
      } else {
        winner = 'tie';
      }
      
      updateData.status = 'completed';
      updateData.winner = winner;
      updateData.completedAt = new Date();
      
      resultData = {
        success: true,
        completed: true,
        winner: winner,
        myScore: score,
        opponentScore: otherScore,
        myTime: timeSpent,
        opponentTime: isCreator ? challenge.opponentTime : challenge.creatorTime,
        category: challenge.category,
        difficulty: challenge.difficulty,
        questionsCount: challenge.questionsCount
      };
    }
    
    const updated = await Challenge.findOneAndUpdate(
      { id: challengeId },
      updateData,
      { new: true }
    );
    
    res.json(resultData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
