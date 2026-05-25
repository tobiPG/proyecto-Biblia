// =============================================
// SOCKET.IO — Lógica de partidas 1v1 en tiempo real
// =============================================

import jwt from 'jsonwebtoken';
import MatchmakingQueue from '../models/MatchmakingQueue.js';
import RankedMatch from '../models/RankedMatch.js';
import User from '../models/User.js';

const RANKED_CONFIG = {
  trophiesWin: 30,
  trophiesLose: 20,
  trophiesLoseProtected: 5,
  protectionThreshold: 200,
  trophiesTie: 5,
  questionsPerMatch: 10,
  matchmakingInitialRange: 200,
  matchmakingExpandAmount: 100,
  matchmakingMaxRange: 500,
  matchmakingTimeout: 60000
};

// Sala activa por matchId → { player1: socketId, player2: socketId, answers: {}, finished: {} }
const activeMatches = new Map();
// socketId → { userId, userName, trophies, matchId }
const connectedPlayers = new Map();
// userId → socketId (para buscar socket de un usuario)
const userSockets = new Map();

export function initSocket(io) {

  // Middleware: verificar JWT en cada conexión
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Token requerido'));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
      socket.user = decoded;
      next();
    } catch {
      next(new Error('Token inválido'));
    }
  });

  io.on('connection', (socket) => {
    const user = socket.user;
    console.log(`[Socket] Conectado: ${user.displayName || user.uid} (${socket.id})`);

    // Registrar socket del usuario
    userSockets.set(user.uid, socket.id);
    connectedPlayers.set(socket.id, { userId: user.uid, userName: user.displayName || 'Jugador' });

    // ------------------------------------------
    // UNIRSE A COLA DE MATCHMAKING
    // ------------------------------------------
    socket.on('join_queue', async ({ category, trophies, rankId }) => {
      try {
        const myId = user.uid;
        const userName = user.displayName || 'Jugador';

        // Limpiar entrada previa
        await MatchmakingQueue.deleteOne({ userId: myId });

        // Guardar en BD
        const entry = new MatchmakingQueue({
          userId: myId,
          userName,
          category,
          trophies: trophies || 0,
          rankId: rankId || 'bronce3',
          status: 'searching'
        });
        await entry.save();

        connectedPlayers.set(socket.id, { userId: myId, userName, trophies, matchId: null });
        console.log(`[Socket] ${userName} buscando partida en ${category} (${trophies} trofeos)`);

        // Emitir conteo de jugadores buscando en esta categoría
        const queueCount = await MatchmakingQueue.countDocuments({ category, status: 'searching' });
        socket.emit('queue_update', { count: queueCount });

        // Buscar oponente inmediatamente
        await tryMatchmaking(io, socket, myId, category, trophies, RANKED_CONFIG.matchmakingInitialRange);

        // Si no encontró, expandir rango cada 10s
        let currentRange = RANKED_CONFIG.matchmakingInitialRange;
        const searchStart = Date.now();

        const searchInterval = setInterval(async () => {
          // Verificar si ya fue emparejado
          const current = connectedPlayers.get(socket.id);
          if (!current || current.matchId) {
            clearInterval(searchInterval);
            return;
          }

          if (Date.now() - searchStart > RANKED_CONFIG.matchmakingTimeout) {
            clearInterval(searchInterval);
            await MatchmakingQueue.deleteOne({ userId: myId });
            socket.emit('search_timeout');
            return;
          }

          if (currentRange < RANKED_CONFIG.matchmakingMaxRange) {
            currentRange += RANKED_CONFIG.matchmakingExpandAmount;
            socket.emit('search_range_update', { range: currentRange });
          }

          await tryMatchmaking(io, socket, myId, category, trophies, currentRange);
        }, 10000);

        // Guardar intervalo para cancelarlo si desconecta
        socket._searchInterval = searchInterval;

      } catch (err) {
        console.error('[Socket] Error en join_queue:', err);
        socket.emit('error', { message: 'Error al unirse a la cola' });
      }
    });

    // ------------------------------------------
    // SALIR DE LA COLA
    // ------------------------------------------
    socket.on('leave_queue', async () => {
      if (socket._searchInterval) clearInterval(socket._searchInterval);
      await MatchmakingQueue.deleteOne({ userId: user.uid });
      const player = connectedPlayers.get(socket.id);
      if (player) player.matchId = null;
      console.log(`[Socket] ${user.displayName} salió de la cola`);
    });

    // ------------------------------------------
    // JUGADOR LISTO PARA EMPEZAR
    // ------------------------------------------
    socket.on('player_ready', async ({ matchId }) => {
      const matchState = activeMatches.get(matchId);
      if (!matchState) return;

      matchState.ready = matchState.ready || {};
      matchState.ready[user.uid] = true;

      // Notificar al oponente que estamos listos
      const opponentSocketId = matchState.player1.userId === user.uid
        ? userSockets.get(matchState.player2.userId)
        : userSockets.get(matchState.player1.userId);

      if (opponentSocketId) {
        io.to(opponentSocketId).emit('opponent_ready');
      }

      // Si ambos listos → iniciar partida
      if (matchState.ready[matchState.player1.userId] && matchState.ready[matchState.player2.userId]) {
        const startTime = Date.now() + 3000; // 3s de cuenta regresiva
        io.to(matchState.player1.socketId).emit('game_start', { matchId, startTime, questions: matchState.questions });
        io.to(matchState.player2.socketId).emit('game_start', { matchId, startTime, questions: matchState.questions });
        console.log(`[Socket] Partida ${matchId} iniciada`);
      }
    });

    // ------------------------------------------
    // RESPUESTA DE UNA PREGUNTA
    // ------------------------------------------
    socket.on('submit_answer', ({ matchId, questionIndex, answeredCorrectly, timeMs }) => {
      const matchState = activeMatches.get(matchId);
      if (!matchState) return;

      matchState.answers = matchState.answers || {};
      matchState.answers[user.uid] = matchState.answers[user.uid] || [];
      matchState.answers[user.uid].push({ questionIndex, answeredCorrectly, timeMs });

      // Notificar al oponente en tiempo real
      const opponentSocketId = matchState.player1.userId === user.uid
        ? userSockets.get(matchState.player2.userId)
        : userSockets.get(matchState.player1.userId);

      if (opponentSocketId) {
        io.to(opponentSocketId).emit('opponent_answered', {
          questionIndex,
          answeredCorrectly
        });
      }
    });

    // ------------------------------------------
    // JUGADOR TERMINÓ EL JUEGO
    // ------------------------------------------
    socket.on('game_finished', async ({ matchId, score, correctAnswers, timeSpent }) => {
      const matchState = activeMatches.get(matchId);
      if (!matchState) return;

      matchState.finished = matchState.finished || {};
      matchState.finished[user.uid] = { score, correctAnswers, timeSpent };

      console.log(`[Socket] ${user.displayName} terminó partida ${matchId}: ${score} pts`);

      // Esperar al otro jugador (máx 30s)
      if (!matchState.finishTimeout) {
        matchState.finishTimeout = setTimeout(() => {
          // Si uno no terminó, el que terminó gana
          finalizeMatch(io, matchId, matchState);
        }, 30000);
      }

      // Si ambos terminaron → calcular resultado
      if (matchState.finished[matchState.player1.userId] && matchState.finished[matchState.player2.userId]) {
        clearTimeout(matchState.finishTimeout);
        await finalizeMatch(io, matchId, matchState);
      }
    });

    // ------------------------------------------
    // DESCONEXIÓN
    // ------------------------------------------
    socket.on('disconnect', async () => {
      if (socket._searchInterval) clearInterval(socket._searchInterval);
      await MatchmakingQueue.deleteOne({ userId: user.uid });

      const player = connectedPlayers.get(socket.id);
      if (player?.matchId) {
        // Notificar abandono al oponente
        const matchState = activeMatches.get(player.matchId);
        if (matchState && !matchState.completed) {
          const opponentUserId = matchState.player1.userId === user.uid
            ? matchState.player2.userId
            : matchState.player1.userId;
          const opponentSocketId = userSockets.get(opponentUserId);
          if (opponentSocketId) {
            io.to(opponentSocketId).emit('opponent_disconnected');
          }
        }
      }

      connectedPlayers.delete(socket.id);
      userSockets.delete(user.uid);
      console.log(`[Socket] Desconectado: ${user.displayName}`);
    });
  });
}

// ------------------------------------------
// LÓGICA DE MATCHMAKING
// ------------------------------------------
async function tryMatchmaking(io, socket, myId, category, myTrophies, range) {
  const minT = Math.max(0, myTrophies - range);
  const maxT = myTrophies + range;

  // Buscar oponente en BD
  const candidates = await MatchmakingQueue.find({
    userId: { $ne: myId },
    category,
    status: 'searching',
    trophies: { $gte: minT, $lte: maxT }
  }).sort({ createdAt: 1 }).limit(10);

  if (candidates.length === 0) return;

  // Elegir el más cercano en trofeos
  candidates.sort((a, b) => Math.abs(a.trophies - myTrophies) - Math.abs(b.trophies - myTrophies));
  const opponent = candidates[0];

  // Verificar que el oponente sigue conectado por socket
  const opponentSocketId = userSockets.get(opponent.userId);
  if (!opponentSocketId) {
    // Oponente no conectado por socket, eliminar de cola
    await MatchmakingQueue.deleteOne({ userId: opponent.userId });
    return;
  }

  // Marcar ambos como emparejados en BD
  await MatchmakingQueue.updateOne({ userId: myId }, { status: 'matched', matchedWith: opponent.userId });
  await MatchmakingQueue.updateOne({ userId: opponent.userId }, { status: 'matched', matchedWith: myId });

  // Generar preguntas en el servidor (usando IDs de preguntas)
  const questionIds = generateServerQuestions(category, myTrophies, 10);

  // Crear partida en BD
  const match = new RankedMatch({
    category,
    questionsCount: 10,
    questionIds,
    player1Id: myId,
    player1Name: socket.user.displayName || 'Jugador',
    player1Trophies: myTrophies,
    player2Id: opponent.userId,
    player2Name: opponent.userName,
    player2Trophies: opponent.trophies,
    status: 'active'
  });
  await match.save();
  const matchId = match._id.toString();

  // Estado en memoria
  const matchState = {
    matchId,
    player1: { userId: myId, socketId: socket.id, trophies: myTrophies },
    player2: { userId: opponent.userId, socketId: opponentSocketId, trophies: opponent.trophies },
    questions: questionIds,
    answers: {},
    ready: {},
    finished: {},
    completed: false
  };
  activeMatches.set(matchId, matchState);

  // Actualizar estado de jugadores en memoria
  const myState = connectedPlayers.get(socket.id);
  if (myState) myState.matchId = matchId;
  const oppState = connectedPlayers.get(opponentSocketId);
  if (oppState) oppState.matchId = matchId;

  // Limpiar cola
  await MatchmakingQueue.deleteMany({ userId: { $in: [myId, opponent.userId] } });

  // Detener búsqueda del jugador 1
  if (socket._searchInterval) {
    clearInterval(socket._searchInterval);
    socket._searchInterval = null;
  }

  // Notificar a ambos jugadores
  const matchInfo = {
    matchId,
    questionIds,
    opponent: { userId: opponent.userId, userName: opponent.userName, trophies: opponent.trophies }
  };

  socket.emit('match_found', {
    ...matchInfo,
    opponent: { userId: opponent.userId, userName: opponent.userName, trophies: opponent.trophies }
  });

  io.to(opponentSocketId).emit('match_found', {
    matchId,
    questionIds,
    opponent: { userId: myId, userName: socket.user.displayName || 'Jugador', trophies: myTrophies }
  });

  console.log(`[Socket] ¡Partida creada! ${match.player1Name} vs ${match.player2Name} | matchId: ${matchId}`);
}

// ------------------------------------------
// FINALIZAR PARTIDA Y CALCULAR TROFEOS
// ------------------------------------------
async function finalizeMatch(io, matchId, matchState) {
  if (matchState.completed) return;
  matchState.completed = true;

  const p1Id = matchState.player1.userId;
  const p2Id = matchState.player2.userId;
  const p1Result = matchState.finished[p1Id] || { score: 0, correctAnswers: 0, timeSpent: 999999 };
  const p2Result = matchState.finished[p2Id] || { score: 0, correctAnswers: 0, timeSpent: 999999 };

  // Determinar ganador por score, en empate por tiempo
  let winner = null;
  if (p1Result.score > p2Result.score) winner = p1Id;
  else if (p2Result.score > p1Result.score) winner = p2Id;
  else if (p1Result.timeSpent < p2Result.timeSpent) winner = p1Id;
  else if (p2Result.timeSpent < p1Result.timeSpent) winner = p2Id;
  // si todo igual → empate

  const isTie = winner === null;

  // Calcular cambio de trofeos
  const calcTrophies = (userId, currentTrophies, isWinner, isTie) => {
    if (isTie) return RANKED_CONFIG.trophiesTie;
    if (isWinner) return RANKED_CONFIG.trophiesWin;
    return currentTrophies < RANKED_CONFIG.protectionThreshold
      ? -RANKED_CONFIG.trophiesLoseProtected
      : -RANKED_CONFIG.trophiesLose;
  };

  const p1Change = calcTrophies(p1Id, matchState.player1.trophies, winner === p1Id, isTie);
  const p2Change = calcTrophies(p2Id, matchState.player2.trophies, winner === p2Id, isTie);

  // Actualizar trofeos en BD
  try {
    const match = await RankedMatch.findById(matchId);
    if (match) {
      match.player1Score = p1Result.score;
      match.player2Score = p2Result.score;
      match.player1Time = p1Result.timeSpent;
      match.player2Time = p2Result.timeSpent;
      match.winner = winner;
      match.status = 'completed';
      await match.save();
    }

    await updateUserTrophies(p1Id, matchState.matchId ? match?.category : 'aleatorio', winner === p1Id, isTie, p1Change, matchState.player1.trophies);
    await updateUserTrophies(p2Id, matchState.matchId ? match?.category : 'aleatorio', winner === p2Id, isTie, p2Change, matchState.player2.trophies);
  } catch (err) {
    console.error('[Socket] Error guardando resultado:', err);
  }

  // Enviar resultado a ambos jugadores
  const gameOverData = (myId, myResult, myChange, myTrophies, oppId, oppResult) => ({
    winner,
    isTie,
    isWinner: winner === myId,
    myScore: myResult.score,
    opponentScore: oppResult.score,
    myCorrect: myResult.correctAnswers,
    opponentCorrect: oppResult.correctAnswers,
    trophyChange: myChange,
    newTrophies: Math.max(0, myTrophies + myChange)
  });

  const p1SocketId = userSockets.get(p1Id);
  const p2SocketId = userSockets.get(p2Id);

  if (p1SocketId) {
    io.to(p1SocketId).emit('game_over', gameOverData(p1Id, p1Result, p1Change, matchState.player1.trophies, p2Id, p2Result));
  }
  if (p2SocketId) {
    io.to(p2SocketId).emit('game_over', gameOverData(p2Id, p2Result, p2Change, matchState.player2.trophies, p1Id, p1Result));
  }

  // Limpiar partida de memoria tras 60s
  setTimeout(() => activeMatches.delete(matchId), 60000);
  console.log(`[Socket] Partida ${matchId} finalizada. Ganador: ${winner || 'empate'}`);
}

// ------------------------------------------
// ACTUALIZAR TROFEOS EN MONGODB
// ------------------------------------------
async function updateUserTrophies(userId, category, won, tied, change, currentTrophies) {
  try {
    const user = await User.findOne({ uid: userId });
    if (!user) return;
    const rankings = user.rankings || {};
    const current = rankings[category] || { trophies: currentTrophies, wins: 0, losses: 0, ties: 0, highestTrophies: 0, gamesPlayed: 0 };
    const newTrophies = Math.max(0, current.trophies + change);
    rankings[category] = {
      trophies: newTrophies,
      wins: current.wins + (won ? 1 : 0),
      losses: current.losses + (!won && !tied ? 1 : 0),
      ties: current.ties + (tied ? 1 : 0),
      highestTrophies: Math.max(current.highestTrophies || 0, newTrophies),
      gamesPlayed: (current.gamesPlayed || 0) + 1
    };
    await User.findOneAndUpdate({ uid: userId }, { rankings });
  } catch (err) {
    console.error('[Socket] Error actualizando trofeos:', err);
  }
}

// ------------------------------------------
// GENERAR IDs DE PREGUNTAS EN SERVIDOR
// ------------------------------------------
function generateServerQuestions(category, trophies, count) {
  // El servidor envía una semilla aleatoria para que ambos clientes
  // generen exactamente las mismas preguntas de forma determinista
  const seed = Math.floor(Math.random() * 2147483647);
  return { category, trophies, count, seed };
}
