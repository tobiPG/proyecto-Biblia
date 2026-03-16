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
      status: 'pending', // Pendiente hasta que el oponente acepte
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas
    });
    
    await challenge.save();
    
    // Devolver el challenge completo para que el creador pueda jugar
    res.json({
      id: challenge.id,
      creatorId: challenge.creatorId,
      creatorName: challenge.creatorName,
      opponentId: challenge.opponentId,
      opponentName: challenge.opponentName,
      category: challenge.category,
      difficulty: challenge.difficulty,
      questionsCount: challenge.questionsCount,
      questionIds: challenge.questionIds,
      status: challenge.status,
      createdAt: challenge.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener retos pendientes (recibidos, esperando que yo acepte)
router.get('/pending', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    // Retos donde soy el oponente y están pendientes de aceptar
    const challenges = await Challenge.find({
      opponentId: req.user.uid,
      status: 'pending'
    }).sort({ createdAt: -1 });
    
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener retos aceptados (oponente aceptó, esperando que creador inicie)
router.get('/accepted', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    // Retos donde soy el creador y el oponente ya aceptó
    const challenges = await Challenge.find({
      creatorId: req.user.uid,
      status: 'accepted'
    }).sort({ createdAt: -1 });
    
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener retos listos para jugar (activos donde aún no he jugado)
router.get('/ready', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    // Retos activos donde soy creador y no he jugado, O soy oponente y no he jugado
    const challenges = await Challenge.find({
      status: 'active',
      $or: [
        { creatorId: req.user.uid, creatorScore: null },
        { opponentId: req.user.uid, opponentScore: null }
      ]
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
    
    console.log(`[Challenge GET] ${req.params.challengeId} - status: ${challenge?.status}, creatorScore: ${challenge?.creatorScore}, opponentScore: ${challenge?.opponentScore}`);
    
    if (!challenge) {
      return res.status(404).json({ error: 'Reto no encontrado' });
    }
    
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Aceptar reto (oponente acepta, queda esperando que creador inicie)
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
      { status: 'accepted' }, // Aceptado, esperando que creador inicie
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

// Iniciar reto (creador confirma, ambos pueden jugar)
router.put('/:challengeId/start', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const challenge = await Challenge.findOneAndUpdate(
      { 
        id: req.params.challengeId,
        creatorId: req.user.uid,
        status: 'accepted'
      },
      { status: 'active', startedAt: new Date() },
      { new: true }
    );
    
    if (!challenge) {
      return res.status(404).json({ error: 'Reto no encontrado o no está aceptado' });
    }
    
    res.json({ success: true, challenge });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verificar si el reto ya inició (para polling del oponente)
router.get('/:challengeId/status', authMiddleware, async (req, res) => {
  try {
    const challenge = await Challenge.findOne({ id: req.params.challengeId });
    
    if (!challenge) {
      return res.status(404).json({ error: 'Reto no encontrado' });
    }
    
    res.json({ 
      status: challenge.status,
      canPlay: challenge.status === 'active'
    });
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
    
    if (otherScore !== null && otherScore !== undefined) {
      // Determinar ganador
      let iWon = false;
      let isTie = false;
      let winnerUid = null;
      
      if (score > otherScore) {
        iWon = true;
        winnerUid = req.user.uid;
      } else if (otherScore > score) {
        iWon = false;
        winnerUid = isCreator ? challenge.opponentId : challenge.creatorId;
      } else {
        isTie = true;
        winnerUid = 'tie';
      }
      
      updateData.status = 'completed';
      updateData.winner = winnerUid;
      updateData.completedAt = new Date();
      
      console.log(`[Challenge Result] User ${req.user.uid} scored ${score}, other scored ${otherScore}`);
      console.log(`[Challenge Result] iWon: ${iWon}, isTie: ${isTie}, winner: ${winnerUid}`);
      
      resultData = {
        success: true,
        completed: true,
        iWon: iWon,
        isTie: isTie,
        winner: winnerUid,
        myScore: score,
        opponentScore: otherScore,
        opponentName: isCreator ? challenge.opponentName : challenge.creatorName,
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
