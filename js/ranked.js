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
  questionTime: 13,
  matchmakingInitialRange: 100,
  matchmakingExpandInterval: 10000,
  matchmakingExpandAmount: 100,
  matchmakingMaxRange: 500,
  matchmakingTimeout: 60000
};

window.RANKED_CONFIG = RANKED_CONFIG;

const BOT_PERSONALITIES = [
  { id: 'equilibrado', accuracyMod: 0.00, baseMs: 3000, jitterMs: 3000 },
  { id: 'rapido',      accuracyMod: 0.00, baseMs: 2000, jitterMs: 2000 },
  { id: 'agresivo',    accuracyMod:-0.08, baseMs: 1500, jitterMs: 2500 },
  { id: 'experto',     accuracyMod: 0.12, baseMs: 4500, jitterMs: 4000 },
  { id: 'novato',      accuracyMod:-0.15, baseMs: 3500, jitterMs: 5000 }
];

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

  async connectSocket() {
    if (this.socket?.connected) return Promise.resolve();

    const token = localStorage.getItem('backend_token');
    if (!token) return Promise.reject(new Error('Sin token'));

    const SOCKET_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'http://localhost:3001'
      : 'https://bibliaquiz-api.onrender.com';

    // Ping para despertar el servidor (Render free tier duerme tras 15 min)
    let wakeTimer = null;
    try {
      wakeTimer = setTimeout(() => {
        this.showToast('Despertando servidor... espera unos segundos ⏳', 'info');
      }, 3000);
      await fetch(`${SOCKET_URL}/api/health`, { signal: AbortSignal.timeout(50000) });
      clearTimeout(wakeTimer);
    } catch {
      clearTimeout(wakeTimer);
      // continuar igual, el socket intentará conectar
    }

    return new Promise((resolve, reject) => {
      this.socket = io(SOCKET_URL, {
        auth: { token },
        transports: ['websocket', 'polling'],
        timeout: 45000
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

    // Oponente encontrado → servidor nos emparejó (jugador real tiene prioridad)
    this.socket.on('match_found', (data) => {
      console.log('[Ranked] ¡Oponente real encontrado!', data);
      this._realPlayerMatched = true;
      if (this._botSearchTimeout) { clearTimeout(this._botSearchTimeout); this._botSearchTimeout = null; }
      this._stopSearchTimer();
      this.currentMatchId = data.matchId;
      this._onMatchFound(data);
    });

    // Actualización de rango de búsqueda
    this.socket.on('search_range_update', ({ range }) => {
      this.currentRange = range;
      this.updateSearchUI();
    });

    // Cantidad de jugadores buscando en esta categoría
    this.socket.on('queue_update', ({ count }) => {
      this._queueCount = count;
      this.updateSearchUI();
    });

    // Timeout de búsqueda del servidor → lanzar bot como fallback
    this.socket.on('search_timeout', () => {
      if (this._realPlayerMatched) return;
      this._stopSearchTimer();
      if (this._botSearchTimeout) { clearTimeout(this._botSearchTimeout); this._botSearchTimeout = null; }
      const category = this._currentSearchCategory;
      if (category) {
        const myTrophies = this.getLocalTrophies(category);
        const bot = this.generateBot(myTrophies);
        this._launchBotMatch(category, bot, myTrophies);
      } else {
        this.hideSearchingUI();
      }
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
  // TROFEOS LOCALES (modo offline / bots)
  // ============================================

  getLocalTrophies(category) {
    return parseInt(localStorage.getItem(`rtroph_${category}`) || '0', 10);
  },
  saveLocalTrophies(category, trophies) {
    localStorage.setItem(`rtroph_${category}`, Math.max(0, trophies).toString());
  },
  getLocalAllTrophies() {
    const result = {};
    for (const cat of RANKED_CATEGORIES) {
      result[cat.id] = { trophies: this.getLocalTrophies(cat.id) };
    }
    return result;
  },

  // ============================================
  // ESTADÍSTICAS (vía BackendService REST, con fallback local)
  // ============================================

  async getMyRankings() {
    const local = this.getLocalAllTrophies();
    if (!window.BackendService?.token) return local;
    try {
      const backend = await window.BackendService.getMyRankings();
      // Merge local and backend: take max trophies per category so bot matches are always visible
      const merged = {};
      for (const cat of RANKED_CATEGORIES) {
        const localT = local[cat.id]?.trophies || 0;
        const be = backend[cat.id] || {};
        merged[cat.id] = { wins: 0, losses: 0, ties: 0, gamesPlayed: 0, ...be, trophies: Math.max(localT, be.trophies || 0) };
      }
      return merged;
    } catch {
      return local;
    }
  },

  async getCategoryRanking(category) {
    if (!window.BackendService?.token) {
      return { trophies: this.getLocalTrophies(category), wins: 0, losses: 0, ties: 0, highestTrophies: 0, gamesPlayed: 0 };
    }
    return await window.BackendService.getCategoryRanking(category);
  },

  async getLeaderboard(category, limit = 100) {
    // Firestore siempre disponible — usar como fuente primaria
    if (window.FirebaseService?.db) {
      const result = await window.FirebaseService.getRankedLeaderboard(category, Math.min(limit, 50));
      if (result && result.length > 0) {
        // Marcar al usuario actual
        const myUid = window.FirebaseService.currentUser?.uid;
        return result.map(p => ({
          ...p,
          name: p.userId === myUid ? `★ ${p.name}` : p.name
        }));
      }
    }
    // Fallback: backend MongoDB
    if (window.BackendService?.token) {
      const result = await window.BackendService.getRankedLeaderboard(category, limit);
      if (result && result.length > 0) return result;
    }
    return this._generateLocalLeaderboard(category, limit);
  },

  _generateLocalLeaderboard(category, limit = 20) {
    const myTrophies = this.getLocalTrophies(category);
    const names = [...this.BOT_NAMES];
    for (let i = names.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [names[i], names[j]] = [names[j], names[i]];
    }
    const spread = Math.max(myTrophies * 0.6, 80);
    const players = names.slice(0, Math.min(19, limit - 1)).map(name => {
      const t = Math.max(0, myTrophies + Math.floor((Math.random() - 0.5) * spread));
      const wins = Math.floor(Math.random() * 25) + 3;
      const losses = Math.floor(Math.random() * 15) + 1;
      return { name: name.replace(/_/g, ' '), trophies: t, wins, losses, gamesPlayed: wins + losses };
    });
    players.push({ name: '★ Tú', trophies: myTrophies, wins: 0, losses: 0, gamesPlayed: 0, userId: 'local' });
    return players.sort((a, b) => b.trophies - a.trophies).slice(0, limit);
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

  // PRNG determinista — misma semilla = mismo resultado en ambos clientes
  _seededRng(seed) {
    let s = seed >>> 0;
    return function() {
      s = Math.imul(s, 1664525) + 1013904223 | 0;
      return (s >>> 0) / 0xFFFFFFFF;
    };
  },

  generateRankedQuestionsFromConfig(config) {
    if (!window.QUESTIONS_DB) return [];
    const category = config?.category || 'aleatorio';
    const trophies = config?.trophies || 0;
    const count    = config?.count    || RANKED_CONFIG.questionsPerMatch;
    const seed     = config?.seed     ?? Date.now();
    return this.generateRankedQuestions(category, trophies, count, seed);
  },

  // Fisher-Yates usando RNG determinista o Math.random
  _shuffle(arr, rng) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },

  // Historial de preguntas recientes por categoría (evita repetición)
  _getSeenIds(category) {
    try {
      return new Set(JSON.parse(localStorage.getItem(`ranked_seen_${category}`) || '[]'));
    } catch { return new Set(); }
  },
  _saveSeenIds(category, ids) {
    // Guardar solo los últimos 60 para no crecer indefinidamente
    const prev = JSON.parse(localStorage.getItem(`ranked_seen_${category}`) || '[]');
    const merged = [...new Set([...prev, ...ids])];
    localStorage.setItem(`ranked_seen_${category}`, JSON.stringify(merged.slice(-60)));
  },

  generateRankedQuestions(category, trophies = 0, count = RANKED_CONFIG.questionsPerMatch, seed = null) {
    if (!window.QUESTIONS_DB) return [];

    const categoryMap = { 'eventos': 'historias' };
    const qCategory = categoryMap[category] || category;

    const diffDist = this.getDifficultyByTrophies(trophies);
    const rng = seed !== null ? this._seededRng(seed) : () => Math.random();

    let fullPool = qCategory === 'aleatorio'
      ? [...window.QUESTIONS_DB]
      : window.QUESTIONS_DB.filter(q => q.category === qCategory);

    // Separar preguntas frescas (no vistas recientemente) de las ya vistas
    // Solo aplica en partidas sin seed (partidas locales/bot)
    let pool = fullPool;
    if (seed === null) {
      const seenIds = this._getSeenIds(qCategory === 'aleatorio' ? 'aleatorio' : category);
      const fresh = fullPool.filter(q => !seenIds.has(q.id));
      // Usar frescas si hay suficientes; si no, mezclar con vistas
      pool = fresh.length >= count ? fresh : fullPool;
    }

    const easy   = pool.filter(q => q.difficulty === 'facil');
    const medium = pool.filter(q => q.difficulty === 'intermedio');
    const hard   = pool.filter(q => q.difficulty === 'dificil' || q.difficulty === 'experto');

    let numEasy   = Math.round(count * diffDist.easy / 100);
    let numMedium = Math.round(count * diffDist.medium / 100);
    let numHard   = count - numEasy - numMedium;

    let questions = [
      ...this._shuffle(easy, rng).slice(0, numEasy),
      ...this._shuffle(medium, rng).slice(0, numMedium),
      ...this._shuffle(hard, rng).slice(0, numHard)
    ];

    // Completar si algún nivel de dificultad tenía pocas preguntas
    if (questions.length < count) {
      const usedIds = new Set(questions.map(q => q.id));
      const extras = this._shuffle(pool.filter(q => !usedIds.has(q.id)), rng)
        .slice(0, count - questions.length);
      questions = [...questions, ...extras];
    }

    const result = this._shuffle(questions, rng).slice(0, count);

    // Guardar IDs usados en historial (solo partidas sin seed = locales/bot)
    if (seed === null) {
      this._saveSeenIds(qCategory === 'aleatorio' ? 'aleatorio' : category, result.map(q => q.id));
    }

    return result;
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
    const countEl = document.getElementById('ranked-search-count');
    if (countEl) {
      const n = this._queueCount || 0;
      countEl.textContent = n > 1 ? `${n} jugadores buscando ahora` : 'Esperando jugadores...';
    }
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
  // SISTEMA DE BOTS
  // ============================================

  BOT_NAMES: [
    // Apóstoles y discípulos
    'Pedro_Pescador','JuanEvangelista','PabloTarso','TimoteoFiel',
    'SilasBible','BarnabasAyuda','FilipeEvan','AndresCalled',
    'BartolomeVerd','MateoPublicano','TomásGemelo','SimonZelote',
    'TadeoFiel','MatíasElegido','ApollosElocuente','PriscilaFiel',
    // Profetas
    'EliasProf','EliaseoSucesor','IsaiasVidente','JeremiasPro',
    'EzequielVis','DanielOrac','AmosPastor','OseasProfeta',
    'MiqueasJusto','NahumGuerra','HabacucFe','SofoniasDay',
    'ZacariasPro','HageoTemple','MalaquiasFinal','JoelRestaura',
    'AbdiasFiel','JonasMisionero',
    // Reyes y líderes
    'DavidSalmista','SalomonSabio','JosuaConq','NehemiasConst',
    'EsdrasMaestro','ZorobabelConst','JosiasRey','EzequiasRey',
    'AsaFiel','JosafatRey','CalebValiente','GideonFiel',
    'SansónFuerza','JeftéGuerra',
    // Patriarcas
    'AbrahHamFe','JacobIsrael','JoseBello','MoisesLibera',
    'IsaacPromesa','NoéFiel','HenochCamina','SetemLinaje',
    // Mujeres bíblicas
    'MariaMagdalena','RutFiel','DebOraJueza','EsterReina',
    'SaraPromet','RaquelAmada','LeaFiel','AnaOra',
    'MiriamCanta','AbigailSabia','NoemiFiel','JudithGuerra',
    // Otros
    'FilemonAmigo','TitoFiel','LucasMedico','MarcoEvan',
    'EstefanMartir','CornelioCent','LidiaVendedora','AquilaTent'
  ],

  generateBot(myTrophies) {
    const personality = BOT_PERSONALITIES[Math.floor(Math.random() * BOT_PERSONALITIES.length)];
    const name = this.BOT_NAMES[Math.floor(Math.random() * this.BOT_NAMES.length)];
    const spread = Math.max(60, Math.floor(myTrophies * 0.15));
    const offset = (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * spread);
    return {
      userName: name.replace(/_/g, ' '),
      trophies: Math.max(0, myTrophies + offset),
      isBot: true,
      personality: personality.id
    };
  },

  getBotAccuracy(trophies, personality = 'equilibrado') {
    const base =
      trophies < 300  ? 0.38 :
      trophies < 800  ? 0.52 :
      trophies < 1500 ? 0.63 :
      trophies < 2500 ? 0.72 :
      trophies < 4000 ? 0.80 : 0.88;
    const mod = BOT_PERSONALITIES.find(p => p.id === personality)?.accuracyMod ?? 0;
    return Math.max(0.15, Math.min(0.96, base + mod));
  },

  async searchMatchWithBot(category) {
    const myTrophies = this.getLocalTrophies(category);
    const myRank = this.getRankByTrophies(myTrophies);
    this._currentSearchCategory = category;
    this._realPlayerMatched = false;
    this.showSearchingUI(category, myRank, myTrophies);
    this.searchStartTime = Date.now();
    if (this._botSearchTimeout) clearTimeout(this._botSearchTimeout);

    // Si hay token: intentar jugador real primero, luego bot como fallback
    if (window.BackendService?.token) {
      try {
        // connectSocket incluye el wake-up ping — esperamos aquí antes de fijar el timeout
        await this.connectSocket();

        // Socket conectado → ahora sí iniciar el temporizador de bot (35s desde aquí)
        this._botSearchTimeout = setTimeout(() => {
          if (!this._realPlayerMatched) {
            if (this.socket?.connected) this.socket.emit('leave_queue');
            this._stopSearchTimer();
            const bot = this.generateBot(myTrophies);
            this._launchBotMatch(category, bot, myTrophies);
          }
        }, 35000);

        this.currentRange = RANKED_CONFIG.matchmakingInitialRange;
        this.socket.emit('join_queue', { category, trophies: myTrophies, rankId: myRank.id });
        console.log('[Ranked] Buscando jugador real (20s) luego bot...');
      } catch {
        // Sin conexión: bot directo
        setTimeout(() => {
          const bot = this.generateBot(myTrophies);
          this._launchBotMatch(category, bot, myTrophies);
        }, 2000 + Math.random() * 1500);
      }
      return true;
    }

    // Sin token: bot después de 2.5-4.5s
    this._botSearchTimeout = setTimeout(() => {
      this._stopSearchTimer();
      const bot = this.generateBot(myTrophies);
      this._launchBotMatch(category, bot, myTrophies);
    }, 2500 + Math.random() * 2000);
    return true;
  },

  cancelSearch() {
    this._stopSearchTimer();
    if (this._botSearchTimeout) { clearTimeout(this._botSearchTimeout); this._botSearchTimeout = null; }
    if (this.socket?.connected) this.socket.emit('leave_queue');
    this._realPlayerMatched = false;
    this._currentSearchCategory = null;
    this.hideSearchingUI();
  },

  _launchBotMatch(category, bot, myTrophies) {
    this.hideSearchingUI();
    this._showFoundScreen(bot, () => {
      const questions = this.generateRankedQuestions(category, myTrophies);
      const botAccuracy = this.getBotAccuracy(bot.trophies, bot.personality);
      this._botMatchData = { bot, botAccuracy, questions, category, myTrophies };
      this._showWaitingScreen();
      setTimeout(() => {
        this._hideWaitingScreen();
        if (window.App?.startRankedMode) {
          window.App.startRankedMode({ id: 'bot_' + Date.now(), category, questions, opponent: bot, isBot: true });
        }
        this._simulateBotAnswers(questions, botAccuracy, bot.personality);
      }, 1200);
    });
  },

  _simulateBotAnswers(questions, accuracy, personality = 'equilibrado') {
    if (this._botAnswerTimeouts) this._botAnswerTimeouts.forEach(clearTimeout);
    this._botAnswerTimeouts = [];
    this._botCorrectCount = 0;
    const p = BOT_PERSONALITIES.find(x => x.id === personality) || BOT_PERSONALITIES[0];
    questions.forEach((_, index) => {
      const cumulative = index * (p.baseMs + Math.random() * p.jitterMs);
      const delay = cumulative + 800 + Math.random() * 2000;
      const t = setTimeout(() => {
        const correct = Math.random() < accuracy;
        if (correct) this._botCorrectCount++;
        this._updateOpponentProgress(index, correct);
      }, delay);
      this._botAnswerTimeouts.push(t);
    });
  },

  cancelBotSimulation() {
    if (this._botAnswerTimeouts) { this._botAnswerTimeouts.forEach(clearTimeout); this._botAnswerTimeouts = []; }
  },

  finalizeBotMatch(myScore, category) {
    const data = this._botMatchData;
    this.cancelBotSimulation();
    const botScore = (this._botCorrectCount || 0) * 10;
    const isWinner = myScore > botScore;
    const isTie = myScore === botScore;

    if (!data) {
      // _botMatchData se perdió (carrera o error previo) — mostrar resultado sin cambio de trofeos
      if (window.App?.showRankedResult) {
        window.App.showRankedResult({ isWinner, isTie, opponentScore: botScore, newTrophies: 0, trophyChange: 0 });
      }
      return;
    }

    let trophyChange;
    if (isTie)         trophyChange = RANKED_CONFIG.trophiesTie;
    else if (isWinner) trophyChange = RANKED_CONFIG.trophiesWin;
    else               trophyChange = data.myTrophies <= RANKED_CONFIG.protectionThreshold
                         ? -RANKED_CONFIG.trophiesLoseProtected
                         : -RANKED_CONFIG.trophiesLose;
    const newTrophies = Math.max(0, data.myTrophies + trophyChange);
    this.saveLocalTrophies(category, newTrophies);
    // Guardar trofeos en Firestore para el leaderboard global
    window.FirebaseService?.updateRankedTrophies?.(category, newTrophies);
    // Misiones de temporada para partidas con bot
    if (typeof SeasonSystem !== 'undefined') {
      SeasonSystem.addBattlePassXP?.(75);
      SeasonSystem.updateMissionProgress?.('ranked', 1);
      if (isWinner) SeasonSystem.updateMissionProgress?.('ranked_wins', 1);
      SeasonSystem.updateMissionProgress?.('trophies_max', newTrophies);
    }
    // Sincronizar trofeos al backend
    if (window.BackendService?.token) {
      window.BackendService.updateRankedResult(category, { won: isWinner, tied: isTie })
        .then(result => {
          if (result?.trophies !== undefined) {
            this.saveLocalTrophies(category, result.trophies);
            window.FirebaseService?.updateRankedTrophies?.(category, result.trophies);
          }
        }).catch(() => {});
    }
    if (window.App?.showRankedResult) {
      window.App.showRankedResult({ isWinner, isTie, opponentScore: botScore, newTrophies, trophyChange });
    }
    this._botMatchData = null;
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
