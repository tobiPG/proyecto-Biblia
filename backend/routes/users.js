import express from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Obtener perfil del usuario
router.get('/me', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    res.json({
      id: req.user.uid,
      displayName: req.user.displayName,
      photoURL: req.user.photoURL,
      email: req.user.email,
      level: req.user.level,
      xp: req.user.xp,
      totalPoints: req.user.totalPoints,
      totalCorrect: req.user.totalCorrect,
      totalGames: req.user.totalGames,
      bestStreak: req.user.bestStreak,
      coins: req.user.coins,
      friendCode: req.user.friendCode,
      friends: req.user.friends || [],
      friendRequests: req.user.friendRequests || [],
      isAnonymous: req.user.isAnonymous,
      avatar: req.user.avatar || '',
      avatarColor: req.user.avatarColor || 'indigo'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar perfil
router.put('/me', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const { displayName, photoURL, avatar, avatarColor } = req.body;

    const user = await User.findOneAndUpdate(
      { uid: req.user.uid },
      {
        ...(displayName && { displayName }),
        ...(photoURL && { photoURL }),
        ...(avatar !== undefined && { avatar }),
        ...(avatarColor !== undefined && { avatarColor }),
        updatedAt: new Date()
      },
      { new: true }
    );

    res.json({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      avatar: user.avatar,
      avatarColor: user.avatarColor,
      email: user.email,
      level: user.level,
      xp: user.xp,
      coins: user.coins
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar estadísticas
router.put('/me/stats', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const { points, correct, games, streak } = req.body;
    
    const newTotalPoints = (req.user.totalPoints || 0) + (points || 0);
    const newLevel = Math.floor(newTotalPoints / 500) + 1;
    
    const user = await User.findOneAndUpdate(
      { uid: req.user.uid },
      {
        $inc: {
          totalPoints: points || 0,
          totalCorrect: correct || 0,
          totalGames: games || 0
        },
        bestStreak: Math.max(req.user.bestStreak || 0, streak || 0),
        level: newLevel,
        updatedAt: new Date()
      },
      { new: true }
    );
    
    res.json({
      level: user.level,
      xp: user.xp,
      totalPoints: user.totalPoints,
      totalCorrect: user.totalCorrect,
      totalGames: user.totalGames,
      bestStreak: user.bestStreak
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar monedas
router.put('/me/coins', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const { total, earned, spent, multiplier } = req.body;
    
    const user = await User.findOneAndUpdate(
      { uid: req.user.uid },
      {
        coins: total || req.user.coins,
        coinsEarned: earned || req.user.coinsEarned,
        coinsSpent: spent || req.user.coinsSpent,
        coinMultiplier: multiplier || req.user.coinMultiplier,
        updatedAt: new Date()
      },
      { new: true }
    );
    
    res.json({
      coins: user.coins,
      coinsEarned: user.coinsEarned,
      coinsSpent: user.coinsSpent,
      coinMultiplier: user.coinMultiplier
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener avatares por lista de UIDs (para enriquecer datos de Firebase)
router.post('/avatars', async (req, res) => {
  try {
    const { uids } = req.body;
    if (!Array.isArray(uids) || uids.length === 0) return res.json([]);
    const users = await User.find({ uid: { $in: uids.slice(0, 100) } })
      .select('uid avatar avatarColor photoURL');
    res.json(users.map(u => ({
      id: u.uid,
      avatar: u.avatar || '',
      avatarColor: u.avatarColor || 'indigo',
      photoURL: (u.photoURL && u.photoURL.startsWith('http')) ? u.photoURL : null
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener tabla de clasificación
router.get('/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    
    const leaderboard = await User.find()
      .select('uid displayName totalPoints level photoURL totalGames avatar avatarColor')
      .sort({ totalPoints: -1 })
      .limit(limit);

    res.json(leaderboard.map(u => ({
      id: u.uid,
      displayName: u.displayName,
      totalPoints: u.totalPoints,
      level: u.level,
      photoURL: u.photoURL,
      totalGames: u.totalGames,
      avatar: u.avatar || '',
      avatarColor: u.avatarColor || 'indigo'
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar usuario por código de amigo
router.get('/find/:code', async (req, res) => {
  try {
    const user = await User.findOne({ friendCode: req.params.code.toUpperCase() });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      avatar: user.avatar || '',
      avatarColor: user.avatarColor || 'indigo',
      level: user.level,
      totalPoints: user.totalPoints,
      friendCode: user.friendCode
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Enviar solicitud de amistad
router.post('/friend-request/:targetUserId', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const { targetUserId } = req.params;
    const myUid = req.user.uid;
    
    if (targetUserId === myUid) {
      return res.status(400).json({ error: 'No puedes enviarte solicitud a ti mismo' });
    }
    
    // Verificar que el usuario destino existe
    const targetUser = await User.findOne({ uid: targetUserId });
    if (!targetUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Verificar si ya son amigos
    if (req.user.friends?.includes(targetUserId)) {
      return res.status(400).json({ error: 'Ya son amigos' });
    }
    
    // Verificar si ya hay solicitud pendiente
    if (req.user.sentRequests?.includes(targetUserId)) {
      return res.status(400).json({ error: 'Solicitud ya enviada' });
    }
    
    // Agregar solicitud al destinatario
    await User.updateOne(
      { uid: targetUserId },
      {
        $addToSet: { friendRequests: myUid }
      }
    );
    
    // Registrar solicitud enviada
    await User.updateOne(
      { uid: myUid },
      {
        $addToSet: { sentRequests: targetUserId }
      }
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Aceptar solicitud de amistad
router.post('/friend-request/:fromUserId/accept', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const fromUserId = req.params.fromUserId;
    const myUid = req.user.uid;
    
    // Agregar a amigos mutuamente
    await User.updateOne(
      { uid: myUid },
      {
        $addToSet: { friends: fromUserId },
        $pull: { friendRequests: fromUserId }
      }
    );
    
    await User.updateOne(
      { uid: fromUserId },
      {
        $addToSet: { friends: myUid },
        $pull: { sentRequests: myUid }
      }
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rechazar solicitud de amistad
router.post('/friend-request/:fromUserId/reject', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const fromUserId = req.params.fromUserId;
    const myUid = req.user.uid;
    
    await User.updateOne(
      { uid: myUid },
      {
        $pull: { friendRequests: fromUserId }
      }
    );
    
    await User.updateOne(
      { uid: fromUserId },
      {
        $pull: { sentRequests: myUid }
      }
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener lista de amigos
router.get('/friends', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const friends = await User.find({ uid: { $in: req.user.friends || [] } })
      .select('uid displayName photoURL avatar avatarColor totalPoints level totalGames friendCode');

    const mappedFriends = friends
      .sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0))
      .map(f => ({
        id: f.uid,
        displayName: f.displayName,
        photoURL: f.photoURL,
        avatar: f.avatar || '',
        avatarColor: f.avatarColor || 'indigo',
        totalPoints: f.totalPoints,
        level: f.level,
        totalGames: f.totalGames,
        friendCode: f.friendCode
      }));
    
    res.json(mappedFriends);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener solicitudes de amistad pendientes
router.get('/friend-requests', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const requesters = await User.find({ uid: { $in: req.user.friendRequests || [] } })
      .select('uid displayName photoURL avatar avatarColor totalPoints level friendCode');

    const mappedRequesters = requesters.map(r => ({
      id: r.uid,
      displayName: r.displayName,
      photoURL: r.photoURL,
      avatar: r.avatar || '',
      avatarColor: r.avatarColor || 'indigo',
      totalPoints: r.totalPoints,
      level: r.level,
      friendCode: r.friendCode
    }));
    
    res.json(mappedRequesters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar amigo
router.delete('/friends/:friendId', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    
    const friendId = req.params.friendId;
    const myUid = req.user.uid;
    
    await User.updateOne(
      { uid: myUid },
      { $pull: { friends: friendId } }
    );
    
    await User.updateOne(
      { uid: friendId },
      { $pull: { friends: myUid } }
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🆕 Endpoint para sincronizar TODO el progreso del usuario (guardar)
router.post('/me/progress/sync', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    const {
      // Perfil
      displayName, photoURL, avatar, avatarColor,
      // Progresión
      level, xp, xpToNext, totalPoints, totalCorrect, totalWrong, totalAnswered,
      totalGames, bestStreak, perfectGames, expertCorrect, categoriesPlayed,
      // Monedas
      coins, coinsEarned, coinsSpent, coinMultiplier,
      // Insignias
      badges,
      // Preguntas
      answeredQuestions, wrongAnswers,
      // Historial
      gameHistory,
      // Estadísticas por categoría
      categoryStats,
      // Récords de contrarreloj
      challengeRecords,
      // Racha diaria
      dailyStreak,
      // Desafío diario
      dailyChallenge,
      // Categorías completadas
      categoryComplete,
      // Estadísticas de velocidad
      speedStats,
      // Configuración
      settings,
      // Versículos favoritos
      favoriteVerses
    } = req.body;

    // Construir objeto de actualización (incluir valores aunque sean 0)
    const updateData = {
      updatedAt: new Date(),
      lastActive: new Date()
    };
    
    // Perfil
    if (displayName) updateData.displayName = displayName;
    if (photoURL && photoURL.startsWith('http')) updateData.photoURL = photoURL;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (avatarColor !== undefined) updateData.avatarColor = avatarColor;
    
    // Progresión
    if (level !== undefined) updateData.level = level;
    if (xp !== undefined) updateData.xp = xp;
    if (xpToNext !== undefined) updateData.xpToNext = xpToNext;
    if (totalPoints !== undefined) updateData.totalPoints = totalPoints;
    if (totalCorrect !== undefined) updateData.totalCorrect = totalCorrect;
    if (totalWrong !== undefined) updateData.totalWrong = totalWrong;
    if (totalAnswered !== undefined) updateData.totalAnswered = totalAnswered;
    if (totalGames !== undefined) updateData.totalGames = totalGames;
    if (bestStreak !== undefined) updateData.bestStreak = bestStreak;
    if (perfectGames !== undefined) updateData.perfectGames = perfectGames;
    if (expertCorrect !== undefined) updateData.expertCorrect = expertCorrect;
    if (categoriesPlayed !== undefined) updateData.categoriesPlayed = categoriesPlayed;
    
    // Monedas
    if (coins !== undefined) updateData.coins = coins;
    if (coinsEarned !== undefined) updateData.coinsEarned = coinsEarned;
    if (coinsSpent !== undefined) updateData.coinsSpent = coinsSpent;
    if (coinMultiplier !== undefined) updateData.coinMultiplier = coinMultiplier;
    
    // Insignias
    if (badges !== undefined) updateData.badges = badges;
    
    // Preguntas
    if (answeredQuestions !== undefined) updateData.answeredQuestions = answeredQuestions;
    if (wrongAnswers !== undefined) updateData.wrongAnswers = wrongAnswers;
    
    // Historial (limitar a últimas 50 partidas)
    if (gameHistory !== undefined) {
      updateData.gameHistory = Array.isArray(gameHistory) ? gameHistory.slice(0, 50) : gameHistory;
    }
    
    // Estadísticas por categoría
    if (categoryStats !== undefined) updateData.categoryStats = categoryStats;
    
    // Récords de contrarreloj
    if (challengeRecords !== undefined) updateData.challengeRecords = challengeRecords;
    
    // Racha diaria
    if (dailyStreak !== undefined) updateData.dailyStreak = dailyStreak;
    
    // Desafío diario
    if (dailyChallenge !== undefined) updateData.dailyChallenge = dailyChallenge;
    
    // Categorías completadas
    if (categoryComplete !== undefined) updateData.categoryComplete = categoryComplete;
    
    // Estadísticas de velocidad
    if (speedStats !== undefined) updateData.speedStats = speedStats;
    
    // Configuración
    if (settings !== undefined) updateData.settings = settings;
    
    // Versículos favoritos
    if (favoriteVerses !== undefined) updateData.favoriteVerses = favoriteVerses;

    // Actualizar usuario con todos los datos
    const user = await User.findOneAndUpdate(
      { uid: req.user.uid },
      updateData,
      { new: true }
    );

    console.log(`[SYNC] ✅ Progreso COMPLETO sincronizado para ${user.displayName} - Nivel: ${user.level}, Puntos: ${user.totalPoints}, Monedas: ${user.coins}, Insignias: ${user.badges?.length || 0}`);

    res.json({
      id: user.uid,
      level: user.level,
      xp: user.xp,
      totalPoints: user.totalPoints,
      totalCorrect: user.totalCorrect,
      totalGames: user.totalGames,
      bestStreak: user.bestStreak,
      coins: user.coins,
      badges: user.badges,
      synced: true,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error sincronizando progreso:', error);
    res.status(500).json({ error: error.message });
  }
});

// 🆕 Endpoint para obtener TODO el progreso del usuario (cargar)
router.get('/me/progress', authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    const user = req.user;

    // Devolver TODOS los datos de progreso
    res.json({
      id: user.uid,
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      avatar: user.avatar || '',
      avatarColor: user.avatarColor || 'indigo',
      email: user.email,
      isAnonymous: user.isAnonymous,
      
      // Progresión
      level: user.level || 1,
      xp: user.xp || 0,
      xpToNext: user.xpToNext || 100,
      totalPoints: user.totalPoints || 0,
      totalCorrect: user.totalCorrect || 0,
      totalWrong: user.totalWrong || 0,
      totalAnswered: user.totalAnswered || 0,
      totalGames: user.totalGames || 0,
      bestStreak: user.bestStreak || 0,
      perfectGames: user.perfectGames || 0,
      expertCorrect: user.expertCorrect || 0,
      categoriesPlayed: user.categoriesPlayed || 0,
      
      // Monedas
      coins: user.coins || 0,
      coinsEarned: user.coinsEarned || 0,
      coinsSpent: user.coinsSpent || 0,
      coinMultiplier: user.coinMultiplier || 1,
      
      // Insignias
      badges: user.badges || [],
      
      // Preguntas contestadas
      answeredQuestions: user.answeredQuestions || [],
      wrongAnswers: user.wrongAnswers || [],
      
      // Historial de partidas
      gameHistory: user.gameHistory || [],
      
      // Estadísticas por categoría
      categoryStats: user.categoryStats || {},
      
      // Récords de contrarreloj
      challengeRecords: user.challengeRecords || {},
      
      // Racha diaria
      dailyStreak: user.dailyStreak || { current: 0, best: 0, lastDate: null },
      
      // Desafío diario
      dailyChallenge: user.dailyChallenge || {},
      
      // Categorías completadas
      categoryComplete: user.categoryComplete || {},
      
      // Estadísticas de velocidad
      speedStats: user.speedStats || {},
      
      // Configuración
      settings: user.settings || { sound: true, notifications: true, darkMode: false, vibration: true, theme: 'blue' },
      
      // Versículos favoritos
      favoriteVerses: user.favoriteVerses || [],
      
      // Sistema de amigos
      friendCode: user.friendCode,
      friends: user.friends || [],
      friendRequests: user.friendRequests || [],
      sentRequests: user.sentRequests || [],
      
      // Metadata
      createdAt: user.createdAt,
      lastActive: user.lastActive,
      updatedAt: user.updatedAt,
      
      // Flag de éxito
      loaded: true,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error cargando progreso:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============================================
// ENDPOINTS ADMIN — requieren X-Admin-Password
// ============================================
const ADMIN_PASSWORD = '20053010';

function requireAdmin(req, res, next) {
  const pw = req.headers['x-admin-password'];
  if (!pw || pw !== ADMIN_PASSWORD) return res.status(403).json({ error: 'No autorizado' });
  next();
}

// Listar todos los usuarios (para gestión)
router.get('/admin/users', requireAdmin, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const users = await User.find()
      .select('uid displayName email totalPoints totalGames level isAnonymous createdAt lastActive')
      .sort({ totalPoints: -1 })
      .limit(limit);
    res.json(users.map(u => ({
      id: u.uid,
      displayName: u.displayName,
      email: u.email || null,
      totalPoints: u.totalPoints,
      totalGames: u.totalGames,
      level: u.level,
      isAnonymous: u.isAnonymous,
      createdAt: u.createdAt,
      lastActive: u.lastActive
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Renombrar usuario por displayName actual
router.put('/admin/users/rename', requireAdmin, async (req, res) => {
  try {
    const { currentName, newName } = req.body;
    if (!currentName || !newName) {
      return res.status(400).json({ error: 'Se requieren currentName y newName' });
    }
    const user = await User.findOneAndUpdate(
      { displayName: currentName },
      { displayName: newName.trim(), updatedAt: new Date() },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: `Usuario '${currentName}' no encontrado` });
    res.json({ success: true, message: `Renombrado de '${currentName}' a '${newName}'`, uid: user.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar usuario por displayName (lo quita del leaderboard)
router.delete('/admin/users/by-name', requireAdmin, async (req, res) => {
  try {
    const { displayName } = req.body;
    if (!displayName) return res.status(400).json({ error: 'Se requiere displayName' });
    const result = await User.deleteOne({ displayName });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: `Usuario '${displayName}' no encontrado` });
    }
    res.json({ success: true, message: `Usuario '${displayName}' eliminado` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
