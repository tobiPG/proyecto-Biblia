import express from 'express';
import Tournament from '../models/Tournament.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

function getISOWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
  const week1 = new Date(d.getFullYear(), 0, 4);
  return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

async function getOrCreateCurrentTournament() {
  const now = new Date();
  const weekNumber = getISOWeek(now);
  const year = now.getFullYear();

  let tournament = await Tournament.findOne({ weekNumber, year, status: { $ne: 'completed' } });

  if (!tournament) {
    const startDate = new Date(now);
    const endDate = new Date(now);
    endDate.setDate(endDate.getDate() + 7);

    tournament = new Tournament({
      weekNumber,
      year,
      status: 'registration',
      participants: [],
      bracket: [],
      startDate,
      endDate
    });
    await tournament.save();
  }

  return tournament;
}

function buildBracket(participants) {
  const bracket = [];
  const count = participants.length;
  if (count < 2) return bracket;

  // Generate single-elimination bracket rounds
  let roundParticipants = [...participants];
  let round = 1;
  let matchIndex = 0;

  while (roundParticipants.length > 1) {
    const nextRound = [];
    for (let i = 0; i < roundParticipants.length; i += 2) {
      const p1 = roundParticipants[i];
      const p2 = roundParticipants[i + 1] || null;
      bracket.push({
        round,
        matchIndex: matchIndex++,
        player1Uid: p1.uid,
        player2Uid: p2 ? p2.uid : null,
        score1: 0,
        score2: 0,
        winner: p2 ? null : p1.uid, // bye
        status: p2 ? 'pending' : 'completed'
      });
      if (!p2) {
        nextRound.push(p1);
      } else {
        nextRound.push({ uid: `tbd_${matchIndex}` });
      }
    }
    roundParticipants = nextRound;
    round++;
  }

  return bracket;
}

// GET /api/tournaments/current
router.get('/current', async (req, res) => {
  try {
    const tournament = await getOrCreateCurrentTournament();
    res.json({ tournament });
  } catch (error) {
    console.error('Error getting tournament:', error);
    res.status(500).json({ error: 'Error al obtener el torneo' });
  }
});

// POST /api/tournaments/join
router.post('/join', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });

    const tournament = await getOrCreateCurrentTournament();

    if (tournament.status !== 'registration') {
      return res.status(400).json({ error: 'El torneo ya ha comenzado o terminado' });
    }

    if (tournament.participants.length >= tournament.maxParticipants) {
      return res.status(400).json({ error: 'El torneo está lleno' });
    }

    const alreadyJoined = tournament.participants.find(p => p.uid === req.user.uid);
    if (alreadyJoined) {
      return res.status(400).json({ error: 'Ya estás inscrito en este torneo' });
    }

    tournament.participants.push({
      uid: req.user.uid,
      displayName: req.user.displayName || 'Jugador',
      seed: tournament.participants.length + 1,
      eliminated: false
    });

    // If we've reached max participants, start the tournament and build bracket
    if (tournament.participants.length >= tournament.maxParticipants) {
      tournament.status = 'active';
      tournament.bracket = buildBracket(tournament.participants);
    }

    await tournament.save();

    res.json({ success: true, tournament });
  } catch (error) {
    console.error('Error joining tournament:', error);
    res.status(500).json({ error: 'Error al unirse al torneo' });
  }
});

// POST /api/tournaments/submit-match
router.post('/submit-match', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });

    const { tournamentId, matchIndex, score } = req.body;

    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) return res.status(404).json({ error: 'Torneo no encontrado' });
    if (tournament.status !== 'active') return res.status(400).json({ error: 'El torneo no está activo' });

    const match = tournament.bracket[matchIndex];
    if (!match) return res.status(404).json({ error: 'Partida no encontrada' });
    if (match.status === 'completed') return res.status(400).json({ error: 'Esta partida ya terminó' });

    const isPlayer1 = match.player1Uid === req.user.uid;
    const isPlayer2 = match.player2Uid === req.user.uid;
    if (!isPlayer1 && !isPlayer2) return res.status(403).json({ error: 'No eres parte de esta partida' });

    if (isPlayer1) match.score1 = score;
    if (isPlayer2) match.score2 = score;

    // If both scores submitted, determine winner
    if (match.score1 > 0 || match.score2 > 0) {
      match.winner = match.score1 >= match.score2 ? match.player1Uid : match.player2Uid;
      match.status = 'completed';

      // Check if tournament is over
      const pendingMatches = tournament.bracket.filter(m => m.status !== 'completed');
      if (pendingMatches.length === 0) {
        tournament.status = 'completed';
        const finalMatch = tournament.bracket[tournament.bracket.length - 1];
        tournament.champion = finalMatch?.winner;
      }
    }

    tournament.markModified('bracket');
    await tournament.save();

    res.json({ success: true, tournament });
  } catch (error) {
    console.error('Error submitting match:', error);
    res.status(500).json({ error: 'Error al enviar resultado' });
  }
});

// GET /api/tournaments/bracket/:id
router.get('/bracket/:id', async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) return res.status(404).json({ error: 'Torneo no encontrado' });

    res.json({ tournament });
  } catch (error) {
    console.error('Error getting bracket:', error);
    res.status(500).json({ error: 'Error al obtener el bracket' });
  }
});

export default router;
