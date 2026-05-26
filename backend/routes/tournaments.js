import express from 'express';
import Tournament from '../models/Tournament.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

const TOURNAMENT_DURATION_DAYS = 7;
const CYCLE_DAYS = 10; // 7 active + 3 rest before next

// Award coins to top 3 and save winners list
async function finalizeTournament(tournament) {
  if (tournament.status === 'completed') return;

  const sorted = [...tournament.participants].sort((a, b) => b.points - a.points);
  const prizes = [tournament.prizes.first, tournament.prizes.second, tournament.prizes.third];
  const winners = [];

  for (let i = 0; i < Math.min(3, sorted.length); i++) {
    const p = sorted[i];
    if (!p || !p.uid) continue;
    const coins = prizes[i] || 0;
    winners.push({ place: i + 1, uid: p.uid, displayName: p.displayName, coins });
    try {
      await User.findOneAndUpdate({ uid: p.uid }, { $inc: { coins, coinsEarned: coins } });
    } catch (e) {
      console.error('[Tournament] Error awarding coins to', p.uid, e.message);
    }
  }

  tournament.winners = winners;
  tournament.status = 'completed';
  await tournament.save();
  console.log('[Tournament] Finalizado #' + tournament.number + ' — ganadores:', winners.map(w => w.displayName).join(', '));
}

// Find current active tournament, finalizing expired ones and creating the next if enough time has passed
async function getCurrentTournament() {
  const now = new Date();

  // Look for active tournament
  let active = await Tournament.findOne({ status: 'active' }).sort({ number: -1 });

  if (active) {
    // If it has expired, finalize it
    if (now >= new Date(active.endDate)) {
      await finalizeTournament(active);
      active = null;
    } else {
      return active;
    }
  }

  // No active tournament — check if rest period is over
  const lastCompleted = await Tournament.findOne({ status: 'completed' }).sort({ number: -1 });

  let nextNumber = 1;
  if (lastCompleted) {
    const restEnd = new Date(lastCompleted.endDate);
    restEnd.setDate(restEnd.getDate() + (CYCLE_DAYS - TOURNAMENT_DURATION_DAYS));
    if (now < restEnd) {
      // Still in rest period, no tournament yet
      return { restUntil: restEnd, status: 'rest', number: lastCompleted.number + 1 };
    }
    nextNumber = lastCompleted.number + 1;
  }

  // Create new tournament
  const startDate = new Date(now);
  const endDate = new Date(now);
  endDate.setDate(endDate.getDate() + TOURNAMENT_DURATION_DAYS);

  const newTournament = new Tournament({
    number: nextNumber,
    status: 'active',
    participants: [],
    prizes: { first: 1000, second: 500, third: 250 },
    winners: [],
    startDate,
    endDate
  });
  await newTournament.save();
  console.log('[Tournament] Nuevo torneo creado #' + nextNumber);
  return newTournament;
}

// GET /api/tournaments/current
router.get('/current', async (req, res) => {
  try {
    const tournament = await getCurrentTournament();
    if (!tournament) return res.json({ tournament: null });

    // Sort leaderboard by points
    if (tournament.participants) {
      tournament.participants.sort((a, b) => b.points - a.points);
    }

    res.json({ tournament });
  } catch (error) {
    console.error('[Tournament] Error GET /current:', error);
    res.status(500).json({ error: 'Error al obtener el torneo' });
  }
});

// POST /api/tournaments/join
router.post('/join', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });

    const tournament = await getCurrentTournament();
    if (!tournament || tournament.status !== 'active') {
      return res.status(400).json({ error: 'No hay torneo activo en este momento' });
    }

    const alreadyJoined = tournament.participants.find(p => p.uid === req.user.uid);
    if (alreadyJoined) {
      return res.status(400).json({ error: 'Ya estás inscrito en este torneo' });
    }

    tournament.participants.push({
      uid: req.user.uid,
      displayName: req.user.displayName || 'Jugador',
      points: 0,
      gamesPlayed: 0
    });

    await tournament.save();
    res.json({ success: true, tournament });
  } catch (error) {
    console.error('[Tournament] Error POST /join:', error);
    res.status(500).json({ error: 'Error al unirse al torneo' });
  }
});

// POST /api/tournaments/submit-score
// Called after each game by enrolled participants
router.post('/submit-score', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });

    const { points } = req.body;
    if (typeof points !== 'number' || points < 0) {
      return res.status(400).json({ error: 'Puntos inválidos' });
    }

    const tournament = await getCurrentTournament();
    if (!tournament || tournament.status !== 'active') {
      return res.json({ success: false, reason: 'no_active_tournament' });
    }

    const participant = tournament.participants.find(p => p.uid === req.user.uid);
    if (!participant) {
      return res.json({ success: false, reason: 'not_enrolled' });
    }

    participant.points += points;
    participant.gamesPlayed += 1;
    tournament.markModified('participants');
    await tournament.save();

    // Return sorted leaderboard so client can update
    const leaderboard = [...tournament.participants].sort((a, b) => b.points - a.points);
    res.json({ success: true, totalPoints: participant.points, leaderboard });
  } catch (error) {
    console.error('[Tournament] Error POST /submit-score:', error);
    res.status(500).json({ error: 'Error al enviar puntuación' });
  }
});

export default router;
