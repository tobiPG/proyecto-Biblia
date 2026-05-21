import express from 'express';
import Clan from '../models/Clan.js';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Helper: generate unique clan tag
async function generateUniqueTag() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let attempts = 0;
  while (attempts < 20) {
    let tag = '';
    for (let i = 0; i < 5; i++) tag += chars.charAt(Math.floor(Math.random() * chars.length));
    const existing = await Clan.findOne({ tag });
    if (!existing) return tag;
    attempts++;
  }
  throw new Error('No se pudo generar un tag único');
}

// POST /api/clans/create
router.post('/create', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });

    const { name, description, emoji, isOpen } = req.body;
    if (!name || name.trim().length < 2) return res.status(400).json({ error: 'El nombre debe tener al menos 2 caracteres' });

    // Check if user already in a clan
    const existingClan = await Clan.findOne({ 'members.uid': req.user.uid });
    if (existingClan) return res.status(400).json({ error: 'Ya perteneces a un clan' });

    const tag = await generateUniqueTag();
    const clan = new Clan({
      name: name.trim().substring(0, 30),
      tag,
      description: (description || '').substring(0, 150),
      emoji: emoji || '⛪',
      leader: req.user.uid,
      isOpen: isOpen !== false,
      members: [{
        uid: req.user.uid,
        displayName: req.user.displayName || 'Jugador',
        weeklyPoints: 0,
        joinedAt: new Date()
      }]
    });

    await clan.save();

    // Update user
    await User.updateOne({ uid: req.user.uid }, {
      clanId: clan._id,
      clanTag: clan.tag
    });

    res.json({ success: true, clan });
  } catch (error) {
    console.error('Error creating clan:', error);
    res.status(500).json({ error: 'Error al crear el clan' });
  }
});

// POST /api/clans/join/:tag
router.post('/join/:tag', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });

    const tag = req.params.tag.toUpperCase();
    const clan = await Clan.findOne({ tag });
    if (!clan) return res.status(404).json({ error: 'Clan no encontrado' });

    if (!clan.isOpen) return res.status(400).json({ error: 'Este clan está cerrado' });
    if (clan.members.length >= clan.maxMembers) return res.status(400).json({ error: 'El clan está lleno' });

    // Check if already in a clan
    const existingClan = await Clan.findOne({ 'members.uid': req.user.uid });
    if (existingClan) return res.status(400).json({ error: 'Ya perteneces a un clan' });

    clan.members.push({
      uid: req.user.uid,
      displayName: req.user.displayName || 'Jugador',
      weeklyPoints: 0,
      joinedAt: new Date()
    });
    await clan.save();

    await User.updateOne({ uid: req.user.uid }, {
      clanId: clan._id,
      clanTag: clan.tag
    });

    res.json({ success: true, clan });
  } catch (error) {
    console.error('Error joining clan:', error);
    res.status(500).json({ error: 'Error al unirse al clan' });
  }
});

// POST /api/clans/leave
router.post('/leave', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });

    const clan = await Clan.findOne({ 'members.uid': req.user.uid });
    if (!clan) return res.status(404).json({ error: 'No perteneces a ningún clan' });

    if (clan.leader === req.user.uid && clan.members.length > 1) {
      // Transfer leadership to first officer or first member
      const newLeader = clan.officers.find(o => o !== req.user.uid) ||
        clan.members.find(m => m.uid !== req.user.uid)?.uid;
      if (newLeader) {
        clan.leader = newLeader;
        clan.officers = clan.officers.filter(o => o !== req.user.uid);
      }
    }

    clan.members = clan.members.filter(m => m.uid !== req.user.uid);
    clan.officers = clan.officers.filter(o => o !== req.user.uid);

    if (clan.members.length === 0) {
      await Clan.deleteOne({ _id: clan._id });
    } else {
      await clan.save();
    }

    await User.updateOne({ uid: req.user.uid }, { clanId: null, clanTag: null, clanWeeklyPoints: 0 });

    res.json({ success: true });
  } catch (error) {
    console.error('Error leaving clan:', error);
    res.status(500).json({ error: 'Error al salir del clan' });
  }
});

// GET /api/clans/my
router.get('/my', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });

    const clan = await Clan.findOne({ 'members.uid': req.user.uid });
    if (!clan) return res.json({ clan: null });

    res.json({ clan });
  } catch (error) {
    console.error('Error getting user clan:', error);
    res.status(500).json({ error: 'Error al obtener tu clan' });
  }
});

// GET /api/clans/search?q=name
router.get('/search', async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (q.length < 2) return res.json({ clans: [] });

    const clans = await Clan.find({
      name: { $regex: q, $options: 'i' }
    }).limit(20).select('name tag emoji description members totalPoints weeklyPoints isOpen maxMembers');

    res.json({ clans });
  } catch (error) {
    console.error('Error searching clans:', error);
    res.status(500).json({ error: 'Error al buscar clanes' });
  }
});

// GET /api/clans/leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const clans = await Clan.find({})
      .sort({ weeklyPoints: -1 })
      .limit(50)
      .select('name tag emoji members totalPoints weeklyPoints wins');

    res.json({ clans });
  } catch (error) {
    console.error('Error getting clan leaderboard:', error);
    res.status(500).json({ error: 'Error al obtener el ranking' });
  }
});

// POST /api/clans/addPoints
router.post('/addPoints', authMiddleware, async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'No autenticado' });

    const { points } = req.body;
    if (!points || points < 0) return res.status(400).json({ error: 'Puntos inválidos' });

    const clan = await Clan.findOne({ 'members.uid': req.user.uid });
    if (!clan) return res.json({ success: false, message: 'No perteneces a ningún clan' });

    const memberIndex = clan.members.findIndex(m => m.uid === req.user.uid);
    if (memberIndex !== -1) {
      clan.members[memberIndex].weeklyPoints = (clan.members[memberIndex].weeklyPoints || 0) + points;
    }
    clan.weeklyPoints = (clan.weeklyPoints || 0) + points;
    clan.totalPoints = (clan.totalPoints || 0) + points;
    clan.markModified('members');
    await clan.save();

    // Update user weekly points
    await User.updateOne({ uid: req.user.uid }, {
      $inc: { clanWeeklyPoints: points }
    });

    res.json({ success: true, clan });
  } catch (error) {
    console.error('Error adding points to clan:', error);
    res.status(500).json({ error: 'Error al añadir puntos al clan' });
  }
});

// GET /api/clans/:tag
router.get('/:tag', async (req, res) => {
  try {
    const tag = req.params.tag.toUpperCase();
    const clan = await Clan.findOne({ tag });
    if (!clan) return res.status(404).json({ error: 'Clan no encontrado' });

    res.json({ clan });
  } catch (error) {
    console.error('Error getting clan:', error);
    res.status(500).json({ error: 'Error al obtener el clan' });
  }
});

export default router;
