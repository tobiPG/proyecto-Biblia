import express from 'express';
import User from '../models/User.js';
import RankedMatch from '../models/RankedMatch.js';
import MatchmakingQueue from '../models/MatchmakingQueue.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const RANKED_CONFIG = {
  trophiesWin: 30,
  trophiesLose: 20,
  trophiesLoseProtected: 5,
  protectionThreshold: 200,
  trophiesTie: 5
};

// GET /api/ranked/rankings — Todos los rankings del usuario
router.get('/rankings', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    const user = await User.findOne({ uid: req.user.uid });
    res.json(user?.rankings || {});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/ranked/rankings/:category — Ranking de una categoría
router.get('/rankings/:category', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    const user = await User.findOne({ uid: req.user.uid });
    const rankings = user?.rankings || {};
    const initial = { trophies: 0, wins: 0, losses: 0, ties: 0, highestTrophies: 0, gamesPlayed: 0 };
    res.json(rankings[req.params.category] || initial);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/ranked/rankings/:category — Actualizar trofeos después de una partida
router.put('/rankings/:category', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    const { won, tied } = req.body;
    const category = req.params.category;

    const user = await User.findOne({ uid: req.user.uid });
    const rankings = user?.rankings || {};
    const current = rankings[category] || { trophies: 0, wins: 0, losses: 0, ties: 0, highestTrophies: 0, gamesPlayed: 0 };

    let trophyChange = 0;
    if (won) {
      trophyChange = RANKED_CONFIG.trophiesWin;
    } else if (tied) {
      trophyChange = RANKED_CONFIG.trophiesTie;
    } else {
      trophyChange = current.trophies < RANKED_CONFIG.protectionThreshold
        ? -RANKED_CONFIG.trophiesLoseProtected
        : -RANKED_CONFIG.trophiesLose;
    }

    const newTrophies = Math.max(0, current.trophies + trophyChange);
    const updated = {
      trophies: newTrophies,
      wins: current.wins + (won ? 1 : 0),
      losses: current.losses + (!won && !tied ? 1 : 0),
      ties: current.ties + (tied ? 1 : 0),
      highestTrophies: Math.max(current.highestTrophies, newTrophies),
      gamesPlayed: current.gamesPlayed + 1
    };

    rankings[category] = updated;
    await User.findOneAndUpdate({ uid: req.user.uid }, { rankings });

    res.json({ ...updated, change: trophyChange });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/ranked/leaderboard/:category — Tabla de clasificación
router.get('/leaderboard/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const allCategories = ['personajes', 'lugares', 'eventos', 'profetas', 'reyes', 'milagros', 'parabolas', 'salmos-proverbios'];
    const limit = parseInt(req.query.limit) || 100;

    const users = await User.find({ isAnonymous: false }).select('uid displayName photoURL rankings').limit(500);

    let leaderboard = [];

    if (category === 'aleatorio') {
      leaderboard = users.map(u => {
        const rankings = u.rankings || {};
        let totalTrophies = 0, totalWins = 0, totalLosses = 0;
        for (const cat of allCategories) {
          const r = rankings[cat] || {};
          totalTrophies += r.trophies || 0;
          totalWins += r.wins || 0;
          totalLosses += r.losses || 0;
        }
        return { userId: u.uid, name: u.displayName, trophies: totalTrophies, wins: totalWins, losses: totalLosses };
      });
    } else {
      leaderboard = users
        .filter(u => u.rankings?.[category]?.gamesPlayed > 0)
        .map(u => {
          const r = u.rankings[category];
          return { userId: u.uid, name: u.displayName, trophies: r.trophies || 0, wins: r.wins || 0, losses: r.losses || 0 };
        });
    }

    leaderboard.sort((a, b) => b.trophies - a.trophies);
    res.json(leaderboard.slice(0, limit));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ============================================
// MATCHMAKING
// ============================================

// POST /api/ranked/queue — Unirse a la cola de matchmaking
router.post('/queue', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    const { category, trophies, rankId, userName } = req.body;

    // Eliminar entrada previa si existe
    await MatchmakingQueue.deleteOne({ userId: req.user.uid });

    const entry = new MatchmakingQueue({
      userId: req.user.uid,
      userName: userName || req.user.displayName || 'Jugador',
      category,
      trophies: trophies || 0,
      rankId: rankId || 'bronce3',
      status: 'searching'
    });
    await entry.save();

    res.json({ id: entry._id.toString(), status: 'searching' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/ranked/queue — Salir de la cola
router.delete('/queue', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    await MatchmakingQueue.deleteOne({ userId: req.user.uid });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/ranked/queue/status — Ver estado de mi entrada en la cola
router.get('/queue/status', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    const entry = await MatchmakingQueue.findOne({ userId: req.user.uid });
    if (!entry) return res.json({ status: 'not_in_queue' });
    res.json({ status: entry.status, matchedWith: entry.matchedWith, matchId: entry.matchId });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/ranked/queue/find — Buscar oponente y emparejar
router.post('/queue/find', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    const { category, trophies, range } = req.body;
    const myId = req.user.uid;

    const minT = Math.max(0, (trophies || 0) - (range || 100));
    const maxT = (trophies || 0) + (range || 100);

    // Buscar candidatos
    const candidates = await MatchmakingQueue.find({
      userId: { $ne: myId },
      category,
      status: 'searching',
      trophies: { $gte: minT, $lte: maxT }
    }).limit(20);

    if (candidates.length === 0) return res.json({ matched: false });

    // Elegir el más cercano en trofeos
    candidates.sort((a, b) => Math.abs(a.trophies - trophies) - Math.abs(b.trophies - trophies));
    const opponent = candidates[0];

    // Marcar ambos como emparejados
    await MatchmakingQueue.updateOne({ userId: myId }, { status: 'matched', matchedWith: opponent.userId });
    await MatchmakingQueue.updateOne({ userId: opponent.userId }, { status: 'matched', matchedWith: myId });

    res.json({
      matched: true,
      opponent: {
        userId: opponent.userId,
        userName: opponent.userName,
        trophies: opponent.trophies
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ============================================
// PARTIDAS RANKED
// ============================================

// POST /api/ranked/matches — Crear partida ranked
router.post('/matches', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    const { category, questionIds, opponent } = req.body;

    const match = new RankedMatch({
      category,
      questionsCount: questionIds?.length || 10,
      questionIds: questionIds || [],
      player1Id: req.user.uid,
      player1Name: req.user.displayName || 'Jugador',
      player1Trophies: req.body.myTrophies || 0,
      player2Id: opponent.userId,
      player2Name: opponent.userName || 'Jugador',
      player2Trophies: opponent.trophies || 0,
      status: 'active'
    });
    await match.save();

    // Actualizar entrada en cola con el matchId
    await MatchmakingQueue.updateMany(
      { userId: { $in: [req.user.uid, opponent.userId] } },
      { matchId: match._id.toString() }
    );

    res.json({ id: match._id.toString(), ...match.toObject() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/ranked/matches/waiting — Buscar partida donde soy player2
router.get('/matches/waiting', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });

    // Primero ver si mi entrada en cola ya tiene matchId
    const queueEntry = await MatchmakingQueue.findOne({ userId: req.user.uid });
    if (queueEntry?.matchId) {
      const match = await RankedMatch.findById(queueEntry.matchId);
      if (match) return res.json({ found: true, match: { id: match._id.toString(), ...match.toObject() } });
    }

    // Buscar directamente en RankedMatch
    const match = await RankedMatch.findOne({
      player2Id: req.user.uid,
      status: 'active'
    }).sort({ createdAt: -1 });

    if (!match) return res.json({ found: false });
    res.json({ found: true, match: { id: match._id.toString(), ...match.toObject() } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/ranked/matches/:id — Obtener partida por ID
router.get('/matches/:id', async (req, res) => {
  try {
    const match = await RankedMatch.findById(req.params.id);
    if (!match) return res.status(404).json({ error: 'Partida no encontrada' });
    res.json({ id: match._id.toString(), ...match.toObject() });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT /api/ranked/matches/:id/result — Enviar resultado de partida
router.put('/matches/:id/result', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });
    const { score, timeSpent, correctAnswers } = req.body;
    const myId = req.user.uid;

    const match = await RankedMatch.findById(req.params.id);
    if (!match) return res.status(404).json({ error: 'Partida no encontrada' });

    const isPlayer1 = match.player1Id === myId;
    if (isPlayer1) {
      match.player1Score = score;
      match.player1Time = timeSpent;
      match.player1Correct = correctAnswers;
    } else {
      match.player2Score = score;
      match.player2Time = timeSpent;
      match.player2Correct = correctAnswers;
    }

    const otherScore = isPlayer1 ? match.player2Score : match.player1Score;
    let resultData = { success: true, completed: false };

    if (otherScore !== null && otherScore !== undefined) {
      let winner = null;
      if (score > otherScore) winner = myId;
      else if (otherScore > score) winner = isPlayer1 ? match.player2Id : match.player1Id;
      else winner = 'tie';

      match.status = 'completed';
      match.winner = winner;
      match.completedAt = new Date();

      const iWon = winner === myId;
      const isTie = winner === 'tie';

      // Actualizar trofeos del ganador
      const myUser = await User.findOne({ uid: myId });
      const myRankings = myUser?.rankings || {};
      const category = match.category;
      const current = myRankings[category] || { trophies: 0, wins: 0, losses: 0, ties: 0, highestTrophies: 0, gamesPlayed: 0 };

      let trophyChange = 0;
      if (iWon) trophyChange = RANKED_CONFIG.trophiesWin;
      else if (isTie) trophyChange = RANKED_CONFIG.trophiesTie;
      else trophyChange = current.trophies < RANKED_CONFIG.protectionThreshold ? -RANKED_CONFIG.trophiesLoseProtected : -RANKED_CONFIG.trophiesLose;

      const newTrophies = Math.max(0, current.trophies + trophyChange);
      myRankings[category] = {
        trophies: newTrophies,
        wins: current.wins + (iWon ? 1 : 0),
        losses: current.losses + (!iWon && !isTie ? 1 : 0),
        ties: current.ties + (isTie ? 1 : 0),
        highestTrophies: Math.max(current.highestTrophies, newTrophies),
        gamesPlayed: current.gamesPlayed + 1
      };
      await User.findOneAndUpdate({ uid: myId }, { rankings: myRankings });

      resultData = {
        success: true,
        completed: true,
        winner,
        myScore: score,
        opponentScore: otherScore,
        myTime: timeSpent,
        opponentTime: isPlayer1 ? match.player2Time : match.player1Time,
        trophyChange
      };
    }

    await match.save();

    // Limpiar cola de matchmaking
    await MatchmakingQueue.deleteOne({ userId: myId });

    res.json(resultData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
