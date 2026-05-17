// =============================================
// SISTEMA DE RANKED - Clasificación por Copas
// Con Socket.io para matchmaking en tiempo real
// =============================================

const RANKS = [
  { id: 'bronce3',    name: 'Bronce III',    icon: '🥉', minTrophies: 0,    maxTrophies: 500,      color: '#CD7F32' },
  { id: 'bronce2',    name: 'Bronce II',     icon: '🥉', minTrophies: 500,  maxTrophies: 1000,     color: '#CD7F32' },
  { id: 'bronce1',    name: 'Bronce I',      icon: '🥉', minTrophies: 1000, maxTrophies: 1500,     color: '#CD7F32' },
  { id: 'plata3',     name: 'Plata III',     icon: '🥈', minTrophies: 1500, maxTrophies: 2000,     color: '#C0C0C0' },
  { id: 'plata2',     name: 'Plata II',      icon: '🥈', minTrophies: 2000, maxTrophies: 2500,     color: '#C0C0C0' },
  { id: 'plata1',     name: 'Plata I',       icon: '🥈', minTrophies: 2500, maxTrophies: 3000,     color: '#C0C0C0' },
  { id: 'oro3',       name: 'Oro III',       icon: '🥇', minTrophies: 3000, maxTrophies: 3500,     color: '#FFD700' },
  { id: 'oro2',       name: 'Oro II',        icon: '🥇', minTrophies: 3500, maxTrophies: 4000,     color: '#FFD700' },
  { id: 'oro1',       name: 'Oro I',         icon: '🥇', minTrophies: 4000, maxTrophies: 4500,     color: '#FFD700' },
  { id: 'platino3',   name: 'Platino III',   icon: '💎', minTrophies: 4500, maxTrophies: 5000,     color: '#00CED1' },
  { id: 'platino2',   name: 'Platino II',    icon: '💎', minTrophies: 5000, maxTrophies: 5500,     color: '#00CED1' },
  { id: 'platino1',   name: 'Platino I',     icon: '💎', minTrophies: 5500, maxTrophies: 6000,     color: '#00CED1' },
  { id: 'diamante3',  name: 'Diamante III',  icon: '💠', minTrophies: 6000, maxTrophies: 6500,     color: '#B9F2FF' },
  { id: 'diamante2',  name: 'Diamante II',   icon: '💠', minTrophies: 6500, maxTrophies: 7000,     color: '#B9F2FF' },
  { id: 'diamante1',  name: 'Diamante I',    icon: '💠', minTrophies: 7000, maxTrophies: 7500,     color: '#B9F2FF' },
  { id: 'maestro',    name: 'Maestro',       icon: '👑', minTrophies: 7500, maxTrophies: 8000,     color: '#9400D3' },
  { id: 'granmaestro',name: 'Gran Maestro',  icon: '🏆', minTrophies: 8000, maxTrophies: Infinity,  color: '#FF4500' }
];

const RANKED_CATEGORIES = [
  { id: 'aleatorio',       name: 'Aleatorio',  icon: '🎲' },
  { id: 'personajes',      name: 'Personajes', icon: '👤' },
  { id: 'lugares',         name: 'Lugares',    icon: '🏛️' },
  { id: 'eventos',         name: 'Eventos',    icon: '📜' },
  { id: 'profetas',        name: 'Profetas',   icon: '🔮' },
  { id: 'reyes',           name: 'Reyes',      icon: '👑' },
  { id: 'milagros',        name: 'Milagros',   icon: '✨' },
  { id: 'parabolas',       name: 'Parábolas',  icon: '📖' },
  { id: 'salmos-proverbios', name: 'Salmos',   icon: '🎵' }
];

const RANKED_CONFIG = {
  trophiesWin: 30,
  trophiesLose: 20,
  trophiesLoseProtected: 5,
  protectionThreshold: 200,
  trophiesTie: 5,
  questionsPerMatch: 10,
  questionTime: 8,
  matchmakingInitialRange: 100,
  matchmakingExpandInterval: 10000,
  matchmakingExpandAmount: 100,
  matchmakingMaxRange: 500,
  matchmakingTimeout: 60000
};

window.RANKED_CONFIG = RANKED_CONFIG;

window.Ranked = {
  socket: null,
  currentMatchId: null,
  searchStartTime: null,
  searchTimerInterval: null,
  currentRange: RANKED_CONFIG.matchmakingInitialRange,
  isConnected: false,

  // ============================================
  // CONEXIÓN SOCKET
  // ============================================

  connectSocket() {
    if (this.socket?.connected) return Promise.resolve();

    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('backend_token');
      if (!token) return reject(new Error('Sin token'));

      const SOCKET_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:3001'
        : 'https://tu-backend.onrender.com'; // ← CAMBIAR: pegar URL del backend desplegado (sin /api, solo el dominio)

      this.socket = io(SOCKET_URL, {
        auth: { token },
        transports: ['websocket', 'polling'],
        timeout: 10000
      });

      this.socket.on('connect', () => {
        console.log('[Ranked] Socket conectado:', this.socket.id);
        this.isConnected = true;
        this._bindSocketEvents();
        resolve();
      });

      this.socket.on('connect_error', (err) => {
        console.error('[Ranked] Error de conexión:', err.message);
        this.isConnected = false;
        reject(err);
      });

      this.socket.on('disconnect', (reason) => {
        console.warn('[Ranked] Socket desconectado:', reason);
        this.isConnected = false;
      });
    });
  },

  disconnectSocket() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  },

  // ============================================
  // EVENTOS DE SOCKET
  // ============================================

  _bindSocketEvents() {
    if (!this.socket) return;

    // Oponente encontrado → servidor nos emparejó
    this.socket.on('match_found', (data) => {
      console.log('[Ranked] ¡Oponente encontrado!', data);
      this._stopSearchTimer();
      this.currentMatchId = data.matchId;
      this._onMatchFound(data);
    });

    // Actualización de rango de búsqueda
    this.socket.on('search_range_update', ({ range }) => {
      this.currentRange = range;
      this.updateSearchUI();
    });

    // Timeout de búsqueda
    this.socket.on('search_timeout', () => {
      this._stopSearchTimer();
      this.hideSearchingUI();
      this.showToast('No se encontró oponente. Intenta de nuevo.', 'info');
    });

    // El oponente confirmó que está listo
    this.socket.on('opponent_ready', () => {
      console.log('[Ranked] Oponente listo');
      this._showOpponentReady();
    });

    // Partida iniciada → ambos jugadores listos
    this.socket.on('game_start', (data) => {
      console.log('[Ranked] ¡Partida iniciando!', data);
      this._startGameCountdown(data);
    });

    // El oponente respondió una pregunta
    this.socket.on('opponent_answered', ({ questionIndex, answeredCorrectly }) => {
      this._updateOpponentProgress(questionIndex, answeredCorrectly);
    });

    // El oponente se desconectó durante la partida
    this.socket.on('opponent_disconnected', () => {
      this.showToast('El oponente se desconectó. ¡Ganaste!', 'success');
      if (window.App?.endRankedMatchByDisconnect) {
        window.App.endRankedMatchByDisconnect();
      }
    });

    // Resultado final de la partida
    this.socket.on('game_over', (result) => {
      console.log('[Ranked] Partida terminada:', result);
      this.currentMatchId = null;
      if (window.App?.showRankedResult) {
        window.App.showRankedResult(result);
      }
    });

    // Errores del servidor
    this.socket.on('error', ({ message }) => {
      this.showToast(message || 'Error del servidor', 'error');
    });
  },

  // ============================================
  // BUSCAR PARTIDA (reemplaza polling HTTP)
  // ============================================

  async searchMatch(category) {
    if (!window.BackendService?.token) {
      this.showToast('Debes iniciar sesión para jugar ranked', 'error');
      return false;
    }

    try {
      await this.connectSocket();
    } catch {
      this.showToast('Error conectando al servidor. Verifica tu conexión.', 'error');
      return false;
    }

    const myRanking = await this.getCategoryRanking(category);
    const myTrophies = myRanking?.trophies || 0;
    const myRank = this.getRankByTrophies(myTrophies);

    this.showSearchingUI(category, myRank, myTrophies);
    this.currentRange = RANKED_CONFIG.matchmakingInitialRange;
    this.searchStartTime = Date.now();

    // Emitir al servidor — el servidor busca oponente y responde con 'match_found'
    this.socket.emit('join_queue', {
      category,
      trophies: myTrophies,
      rankId: myRank.id
    });

    console.log('[Ranked] Buscando partida via socket:', category, myTrophies);
    return true;
  },

  // ============================================
  // CANCELAR BÚSQUEDA
  // ============================================

  async cancelSearch() {
    this._stopSearchTimer();
    if (this.socket?.connected) {
      this.socket.emit('leave_queue');
    }
    this.hideSearchingUI();
    console.log('[Ranked] Búsqueda cancelada');
  },

  // ============================================
  // CUANDO SE ENCONTRÓ OPONENTE
  // ============================================

  _onMatchFound({ matchId, questionIds, opponent }) {
    this.hideSearchingUI();

    // Mostrar pantalla de "oponente encontrado"
    this._showFoundScreen(opponent, () => {
      // Generar preguntas localmente según configuración del servidor
      const questions = this.generateRankedQuestionsFromConfig(questionIds);

      // Notificar al servidor que estamos listos
      this.socket.emit('player_ready', { matchId });

      // Mostrar "esperando al oponente..."
      this._showWaitingScreen();

      // Guardar datos para cuando llegue game_start
      this._pendingMatch = { matchId, questions, opponent };
    });
  },

  _startGameCountdown({ matchId, startTime, questions }) {
    const pending = this._pendingMatch || {};
    const matchQuestions = pending.questions || this.generateRankedQuestionsFromConfig(questions);
    const opponent = pending.opponent || {};

    const msUntilStart = Math.max(0, startTime - Date.now());
    this._hideWaitingScreen();

    setTimeout(() => {
      if (window.App?.startRankedMode) {
        window.App.startRankedMode({
          id: matchId,
          category: matchQuestions[0]?.category || 'aleatorio',
          questions: matchQuestions,
          opponent
        });
      }
      this._pendingMatch = null;
    }, msUntilStart);
  },

  // ============================================
  // ENVIAR RESPUESTA EN TIEMPO REAL
  // ============================================

  submitAnswer(questionIndex, answeredCorrectly, timeMs) {
    if (!this.socket?.connected || !this.currentMatchId) return;
    this.socket.emit('submit_answer', {
      matchId: this.currentMatchId,
      questionIndex,
      answeredCorrectly,
      timeMs
    });
  },

  // ============================================
  // ENVIAR RESULTADO FINAL
  // ============================================

  submitResult(matchId, score, timeSpent, correctAnswers) {
    if (!this.socket?.connected) return;
    this.socket.emit('game_finished', { matchId, score, correctAnswers, timeSpent });
    console.log('[Ranked] Resultado enviado via socket');
  },

  // ============================================
  // FUNCIONES DE RANGO
  // ============================================

  getRankByTrophies(trophies) {
    for (const rank of RANKS) {
      if (trophies >= rank.minTrophies && trophies < rank.maxTrophies) return rank;
    }
    return RANKS[RANKS.length - 1];
  },

  getRankProgress(trophies) {
    const rank = this.getRankByTrophies(trophies);
    if (rank.maxTrophies === Infinity) return 100;
    return Math.round(((trophies - rank.minTrophies) / (rank.maxTrophies - rank.minTrophies)) * 100);
  },

  // ============================================
  // ESTADÍSTICAS (vía BackendService REST)
  // ============================================

  async getMyRankings() {
    if (!window.BackendService?.token) return {};
    return await window.BackendService.getMyRankings();
  },

  async getCategoryRanking(category) {
    if (!window.BackendService?.token) return { trophies: 0, wins: 0, losses: 0, ties: 0, highestTrophies: 0, gamesPlayed: 0 };
    return await window.BackendService.getCategoryRanking(category);
  },

  async getLeaderboard(category, limit = 100) {
    return await window.BackendService.getRankedLeaderboard(category, limit);
  },

  // ============================================
  // GENERAR PREGUNTAS PARA LA PARTIDA
  // ============================================

  getDifficultyByTrophies(trophies) {
    if (trophies < 300)  return { easy: 100, medium: 0,  hard: 0  };
    if (trophies < 800)  return { easy: 70,  medium: 30, hard: 0  };
    if (trophies < 1500) return { easy: 30,  medium: 70, hard: 0  };
    if (trophies < 2500) return { easy: 0,   medium: 50, hard: 50 };
    if (trophies < 4000) return { easy: 0,   medium: 50, hard: 50 };
    return                      { easy: 0,   medium: 20, hard: 80 };
  },

  generateRankedQuestionsFromConfig(config) {
    // config puede ser { category, trophies, count } del servidor
    // o un array de IDs (legacy)
    if (!window.QUESTIONS_DB) return [];

    const category = config?.category || 'aleatorio';
    const trophies = config?.trophies || 0;
    const count = config?.count || RANKED_CONFIG.questionsPerMatch;

    return this.generateRankedQuestions(category, trophies, count);
  },

  generateRankedQuestions(category, trophies = 0, count = RANKED_CONFIG.questionsPerMatch) {
    if (!window.QUESTIONS_DB) return [];

    const diffDist = this.getDifficultyByTrophies(trophies);

    let pool = category === 'aleatorio'
      ? [...window.QUESTIONS_DB]
      : window.QUESTIONS_DB.filter(q => q.category === category);

    if (pool.length < count) pool = [...window.QUESTIONS_DB];

    const easy   = pool.filter(q => q.difficulty === 'facil');
    const medium = pool.filter(q => q.difficulty === 'intermedio');
    const hard   = pool.filter(q => q.difficulty === 'dificil' || q.difficulty === 'experto');

    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

    let numEasy   = Math.round(count * diffDist.easy / 100);
    let numMedium = Math.round(count * diffDist.medium / 100);
    let numHard   = count - numEasy - numMedium;

    let questions = [
      ...shuffle(easy).slice(0, numEasy),
      ...shuffle(medium).slice(0, numMedium),
      ...shuffle(hard).slice(0, numHard)
    ];

    if (questions.length < count) {
      const usedIds = new Set(questions.map(q => q.id));
      const extras = shuffle(pool.filter(q => !usedIds.has(q.id))).slice(0, count - questions.length);
      questions = [...questions, ...extras];
    }

    return shuffle(questions).slice(0, count);
  },

  // ============================================
  // UI — BÚSQUEDA
  // ============================================

  showSearchingUI(category, rank, trophies) {
    const overlay = document.getElementById('ranked-search-overlay');
    if (!overlay) return;

    const rankEl = document.getElementById('ranked-search-rank');
    if (rankEl) { rankEl.textContent = `${rank.icon} ${rank.name}`; rankEl.style.color = rank.color; }

    const trophEl = document.getElementById('ranked-search-trophies');
    if (trophEl) trophEl.textContent = `${trophies} 🏆`;

    this.updateSearchUI();
    overlay.classList.remove('hidden');

    this.searchTimerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.searchStartTime) / 1000);
      const timeEl = document.getElementById('ranked-search-time');
      if (timeEl) timeEl.textContent = `${elapsed}s`;
    }, 1000);
  },

  updateSearchUI() {
    const rangeEl = document.getElementById('ranked-search-range');
    if (rangeEl) rangeEl.textContent = `±${this.currentRange} trofeos`;
  },

  hideSearchingUI() {
    const overlay = document.getElementById('ranked-search-overlay');
    if (overlay) overlay.classList.add('hidden');
    this._stopSearchTimer();
  },

  _stopSearchTimer() {
    if (this.searchTimerInterval) {
      clearInterval(this.searchTimerInterval);
      this.searchTimerInterval = null;
    }
  },

  // ============================================
  // UI — PANTALLAS DE PARTIDA
  // ============================================

  _showFoundScreen(opponent, onReady) {
    const overlay = document.getElementById('ranked-found-overlay');
    if (overlay) {
      const nameEl = document.getElementById('ranked-found-opponent-name');
      const trophEl = document.getElementById('ranked-found-opponent-trophies');
      if (nameEl) nameEl.textContent = opponent.userName || 'Oponente';
      if (trophEl) trophEl.textContent = `${opponent.trophies || 0} 🏆`;
      overlay.classList.remove('hidden');

      let triggered = false;
      const go = () => {
        if (triggered) return;
        triggered = true;
        overlay.classList.add('hidden');
        onReady();
      };

      const readyBtn = document.getElementById('ranked-ready-btn');
      if (readyBtn) readyBtn.onclick = go;
      setTimeout(go, 3000);
    } else {
      onReady();
    }
  },

  _showWaitingScreen() {
    const el = document.getElementById('ranked-waiting-overlay');
    if (el) el.classList.remove('hidden');
  },

  _hideWaitingScreen() {
    const el = document.getElementById('ranked-waiting-overlay');
    if (el) el.classList.add('hidden');
  },

  _showOpponentReady() {
    const el = document.getElementById('ranked-opponent-ready-badge');
    if (el) { el.textContent = '✅ ¡Oponente listo!'; el.classList.remove('hidden'); }
    const textEl = document.getElementById('ranked-waiting-text');
    if (textEl) textEl.textContent = '¡Oponente listo! Iniciando...';
  },

  _updateOpponentProgress(questionIndex, answeredCorrectly) {
    const indicator = document.getElementById(`ranked-opp-q${questionIndex}`);
    if (indicator) {
      indicator.textContent = answeredCorrectly ? '✅' : '❌';
      indicator.dataset.answered = '1';
    }
    // Actualizar puntaje estimado del oponente en la barra
    if (!this._opponentCorrect) this._opponentCorrect = 0;
    if (answeredCorrectly) this._opponentCorrect++;
    const scoreEl = document.getElementById('ranked-opp-score-bar');
    if (scoreEl) scoreEl.textContent = `${this._opponentCorrect * 10} pts`;
  },

  // ============================================
  // UTILIDADES
  // ============================================

  showToast(message, type = 'info') {
    if (window.App?.showToast) window.App.showToast(message, type);
    else console.log('[Ranked]', message);
  }
};

window.RANKS = RANKS;
window.RANKED_CATEGORIES = RANKED_CATEGORIES;
window.RANKED_CONFIG = RANKED_CONFIG;

console.log('[Ranked] Sistema de clasificación con Socket.io cargado');
