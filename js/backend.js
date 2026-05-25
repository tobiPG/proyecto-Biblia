// Backend Service - Reemplaza Firebase
// Conecta el frontend con el servidor Node.js + MongoDB

// ============================================
// 🔧 CONFIGURACIÓN DE ENTORNO
// ============================================
// Detecta automáticamente si estamos en producción o desarrollo
// Para producción: cambiar PRODUCTION_API_URL a tu dominio real

const PRODUCTION_API_URL = 'https://bibliaquiz-api.onrender.com/api';
const DEVELOPMENT_API_URL = 'http://localhost:3001/api';

// Detectar entorno automáticamente
const isProduction = window.location.hostname !== 'localhost' && 
                     window.location.hostname !== '127.0.0.1' &&
                     !window.location.hostname.includes('192.168.');

const API_BASE_URL = isProduction ? PRODUCTION_API_URL : DEVELOPMENT_API_URL;
window.API_BASE_URL = API_BASE_URL;

console.log(`[Config] Entorno: ${isProduction ? 'PRODUCCIÓN' : 'DESARROLLO'}`);
console.log(`[Config] API URL: ${API_BASE_URL}`);

window.BackendService = {
  token: null,
  currentUser: null,
  userProfile: null,
  isReady: false,
  listeners: [],
  _initPromise: null,

  // Verificar si el usuario está autenticado
  isAuthenticated() {
    return !!(this.token && this.currentUser);
  },

  // Inicializar servicio
  async init() {
    if (this._initPromise) return this._initPromise;
    
    this._initPromise = new Promise(async (resolve) => {
      try {
        console.log('[Backend] Inicializando...');
        
        // Cargar token guardado
        const savedToken = localStorage.getItem('backend_token');
        if (savedToken) {
          this.token = savedToken;
          const valid = await this.validateToken();
          if (valid) {
            console.log('[Backend] Token válido, usuario recuperado -', this.currentUser?.displayName);
            
            // ✅ NUEVA: Cargar TODO el progreso desde MongoDB
            await this.loadFullProgress();
            
            this.isReady = true;
            resolve(true);
            return;
          }
        }
        
        // Crear sesión anónima
        const anon = await this.createAnonymousSession();
        if (anon) {
          console.log('[Backend] Sesión anónima creada');
          this.isReady = true;
          resolve(true);
        } else {
          console.error('[Backend] No se pudo crear sesión anónima');
          this.isReady = true;
          resolve(false);
        }
      } catch (error) {
        console.error('[Backend] Error inicializando:', error);
        this.isReady = true;
        resolve(false);
      }
    });
    
    return this._initPromise;
  },

  // Crear sesión anónima
  async createAnonymousSession() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/anonymous`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      if (!response.ok) throw new Error('Error de respuesta');
      
      const data = await response.json();
      this.token = data.token;
      this.currentUser = data.user;
      this.userProfile = data.user;
      
      localStorage.setItem('backend_token', this.token);
      this.notifyListeners('auth', { user: this.userProfile });
      
      return true;
    } catch (error) {
      console.error('[Backend] Error creando sesión anónima:', error);
      return false;
    }
  },

  // Registrarse con email y contraseña
  async register(email, password, displayName) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, displayName })
      });
      
      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error };
      }
      
      const data = await response.json();
      this.token = data.token;
      this.currentUser = data.user;
      this.userProfile = data.user;
      
      localStorage.setItem('backend_token', this.token);
      this.notifyListeners('auth', { user: this.userProfile });
      window.logGA?.('sign_up', { method: 'email' });
      // ✅ NUEVA: Cargar progreso completo después de register
      await this.loadFullProgress();
      
      // 🆕 Iniciar auto-sync después de registro
      this.startAutoSync(5 * 60 * 1000);
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('[Backend] Error en registro:', error);
      return { success: false, error: error.message };
    }
  },

  // Vincular email/contraseña a cuenta existente
  async linkEmail(email, password) {
    try {
      if (!this.token) {
        return { success: false, error: 'No hay sesión activa' };
      }
      
      const response = await fetch(`${API_BASE_URL}/auth/link-email`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error };
      }
      
      const data = await response.json();
      
      // Actualizar usuario local
      if (this.currentUser) {
        this.currentUser.email = data.user.email;
        this.currentUser.isAnonymous = false;
      }
      
      this.notifyListeners('auth', { user: this.currentUser });
      
      return { success: true, message: data.message };
    } catch (error) {
      console.error('[Backend] Error vinculando email:', error);
      return { success: false, error: error.message };
    }
  },

  // Login con email y contraseña
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error };
      }
      
      const data = await response.json();
      this.token = data.token;
      this.currentUser = data.user;
      this.userProfile = data.user;
      
      localStorage.setItem('backend_token', this.token);
      this.notifyListeners('auth', { user: this.userProfile });
      window.logGA?.('login', { method: 'email' });
      // ✅ NUEVA: Cargar progreso completo después de login
      await this.loadFullProgress();
      
      // 🆕 Iniciar auto-sync después de login
      this.startAutoSync(5 * 60 * 1000);
      
      return { success: true, user: data.user };
    } catch (error) {
      console.error('[Backend] Error en login:', error);
      return { success: false, error: error.message };
    }
  },

  // Login con Google (mantener para compatibilidad)
  async signInWithGoogle() {
    try {
      // Redirigir a formulario de email/password
      return { success: false, error: 'Usar login con email' };
    } catch (error) {
      console.error('[Backend] Error en login Google:', error);
      return { success: false, error: error.message };
    }
  },

  // Cambiar contraseña
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      
      if (!response.ok) throw new Error('Error cambiando contraseña');
      
      return { success: true };
    } catch (error) {
      console.error('[Backend] Error cambiando contraseña:', error);
      return { success: false, error: error.message };
    }
  },

  // Validar token
  async validateToken() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/validate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        this.currentUser = data.user;
        this.userProfile = data.user;
        return true;
      }
      return false;
    } catch (error) {
      console.error('[Backend] Error validando token:', error);
      return false;
    }
  },

  // Obtener perfil actual
  async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error obteniendo perfil');
      
      const user = await response.json();
      this.userProfile = user;
      return user;
    } catch (error) {
      console.error('[Backend] Error obteniendo perfil:', error);
      return null;
    }
  },

  // Actualizar nombre de usuario
  async updateDisplayName(newName) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({ displayName: newName })
      });
      
      if (!response.ok) throw new Error('Error actualizando nombre');
      
      const user = await response.json();
      this.userProfile = user;
      return true;
    } catch (error) {
      console.error('[Backend] Error actualizando nombre:', error);
      return false;
    }
  },

  // Actualizar estadísticas
  async updateStats(stats) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me/stats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          points: stats.points || 0,
          correct: stats.correct || 0,
          games: stats.games || 0,
          streak: stats.streak || 0
        })
      });
      
      if (!response.ok) throw new Error('Error actualizando stats');
      
      const result = await response.json();
      this.userProfile.level = result.level;
      this.userProfile.totalPoints = result.totalPoints;
      this.userProfile.totalCorrect = result.totalCorrect;
      this.userProfile.totalGames = result.totalGames;
      
      // ✅ NUEVA: Sincronizar TODO el progreso después de actualizar stats
      await this.syncFullProgress();
      
      return true;
    } catch (error) {
      console.error('[Backend] Error actualizando stats:', error);
      return false;
    }
  },

  // Sincronizar monedas
  async syncCoinsToCloud(coinsData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me/coins`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          total: coinsData.total || 0,
          earned: coinsData.earned || 0,
          spent: coinsData.spent || 0,
          multiplier: coinsData.multiplier || 1
        })
      });
      
      if (!response.ok) throw new Error('Error sincronizando monedas');
      
      const result = await response.json();
      this.userProfile.coins = result.coins;
      
      // ✅ NUEVA: Sincronizar TODO el progreso después de actualizar monedas
      await this.syncFullProgress();
      
      return true;
    } catch (error) {
      console.error('[Backend] Error sincronizando monedas:', error);
      return false;
    }
  },

  // Obtener tabla de clasificación
  async getLeaderboard(limitCount = 50) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/leaderboard?limit=${limitCount}`);
      
      if (!response.ok) throw new Error('Error obteniendo leaderboard');
      
      return await response.json();
    } catch (error) {
      console.error('[Backend] Error obteniendo leaderboard:', error);
      return [];
    }
  },

  // Buscar usuario por código de amigo
  async findUserByCode(code) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/find/${code.toUpperCase()}`);
      
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Error buscando usuario');
      }
      
      return await response.json();
    } catch (error) {
      console.error('[Backend] Error buscando usuario:', error);
      return null;
    }
  },

  // Enviar solicitud de amistad
  async sendFriendRequest(targetUserId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/friend-request/${targetUserId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error };
      }
      
      return { success: true };
    } catch (error) {
      console.error('[Backend] Error enviando solicitud:', error);
      return { success: false, error: error.message };
    }
  },

  // Aceptar solicitud de amistad
  async acceptFriendRequest(fromUserId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/friend-request/${fromUserId}/accept`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error aceptando solicitud');
      
      return { success: true };
    } catch (error) {
      console.error('[Backend] Error aceptando solicitud:', error);
      return { success: false, error: error.message };
    }
  },

  // Rechazar solicitud de amistad
  async rejectFriendRequest(fromUserId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/friend-request/${fromUserId}/reject`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error rechazando solicitud');
      
      return { success: true };
    } catch (error) {
      console.error('[Backend] Error rechazando solicitud:', error);
      return { success: false, error: error.message };
    }
  },

  // Obtener lista de amigos
  async getFriendsList() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/friends`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error obteniendo amigos');
      
      return await response.json();
    } catch (error) {
      console.error('[Backend] Error obteniendo amigos:', error);
      return [];
    }
  },

  // Obtener solicitudes pendientes
  async getPendingRequests() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/friend-requests`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error obteniendo solicitudes');
      
      return await response.json();
    } catch (error) {
      console.error('[Backend] Error obteniendo solicitudes:', error);
      return [];
    }
  },

  // Eliminar amigo
  async removeFriend(friendId) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/friends/${friendId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error eliminando amigo');
      
      return { success: true };
    } catch (error) {
      console.error('[Backend] Error eliminando amigo:', error);
      return { success: false, error: error.message };
    }
  },

  // Crear un reto (genera questionIds automáticamente para que ambos jugadores tengan las mismas preguntas)
  async createChallenge(friendId, category, difficulty, questionsCount, questionIds) {
    try {
      // Si no se proporcionan questionIds, generarlos automáticamente
      let finalQuestionIds = questionIds || [];
      
      if (finalQuestionIds.length === 0 && window.QUESTIONS_DB) {
        const numQuestions = questionsCount || 10;
        let pool = [...QUESTIONS_DB];
        
        // Filtrar por categoría si no es aleatorio
        if (category && category !== 'random' && category !== 'aleatorio') {
          pool = pool.filter(q => q.category === category);
        }
        
        // Filtrar por dificultad si no es aleatorio
        if (difficulty && difficulty !== 'random') {
          pool = pool.filter(q => q.difficulty === difficulty);
        }
        
        // Si no hay suficientes preguntas con esos filtros, usar todas
        if (pool.length < numQuestions) {
          pool = [...QUESTIONS_DB];
        }
        
        // Seleccionar preguntas aleatorias
        const shuffled = pool.sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, numQuestions);
        finalQuestionIds = selected.map(q => q.id);
        
        console.log(`[Backend] Generados ${finalQuestionIds.length} questionIds para el reto`);
      }
      
      const response = await fetch(`${API_BASE_URL}/challenges`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          friendId,
          category,
          difficulty,
          questionsCount: questionsCount || 10,
          questionIds: finalQuestionIds
        })
      });
      
      if (!response.ok) throw new Error('Error creando reto');
      
      const data = await response.json();
      // Devolver el challenge completo para que el creador pueda jugar
      return { success: true, challengeId: data.id, challenge: data };
    } catch (error) {
      console.error('[Backend] Error creando reto:', error);
      return { success: false, error: error.message };
    }
  },

  // Obtener retos pendientes (esperando aceptación)
  async getPendingChallenges() {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/pending`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error obteniendo retos');
      
      return await response.json();
    } catch (error) {
      console.error('[Backend] Error obteniendo retos:', error);
      return [];
    }
  },

  // Obtener retos listos para jugar (activos donde aún no he jugado)
  async getReadyChallenges() {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/ready`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error obteniendo retos listos');
      
      return await response.json();
    } catch (error) {
      console.error('[Backend] Error obteniendo retos listos:', error);
      return [];
    }
  },

  // Obtener mis retos enviados
  async getMyChallenges() {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/sent`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error obteniendo mis retos');
      
      return await response.json();
    } catch (error) {
      console.error('[Backend] Error obteniendo mis retos:', error);
      return [];
    }
  },

  // Obtener retos activos
  async getActiveReceivedChallenges() {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/active`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error obteniendo retos activos');
      
      return await response.json();
    } catch (error) {
      console.error('[Backend] Error obteniendo retos activos:', error);
      return [];
    }
  },

  // Obtener reto específico
  async getChallenge(challengeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) return null;
      
      return await response.json();
    } catch (error) {
      console.error('[Backend] Error obteniendo reto:', error);
      return null;
    }
  },

  // Aceptar reto (oponente acepta, queda esperando)
  async acceptChallenge(challengeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/accept`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error aceptando reto');
      
      const data = await response.json();
      return { success: true, challenge: data.challenge };
    } catch (error) {
      console.error('[Backend] Error aceptando reto:', error);
      return { success: false, error: error.message };
    }
  },

  // Iniciar reto (creador confirma, ambos pueden jugar)
  async startChallenge(challengeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/start`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error iniciando reto');
      
      const data = await response.json();
      return { success: true, challenge: data.challenge };
    } catch (error) {
      console.error('[Backend] Error iniciando reto:', error);
      return { success: false, error: error.message };
    }
  },

  // Obtener retos aceptados (esperando que yo inicie)
  async getAcceptedChallenges() {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/accepted`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error obteniendo retos aceptados');
      
      return await response.json();
    } catch (error) {
      console.error('[Backend] Error obteniendo retos aceptados:', error);
      return [];
    }
  },

  // Verificar estado del reto (para polling)
  async getChallengeStatus(challengeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/status`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) return null;
      
      return await response.json();
    } catch (error) {
      console.error('[Backend] Error verificando estado:', error);
      return null;
    }
  },

  // Rechazar reto
  async rejectChallenge(challengeId) {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/reject`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error rechazando reto');
      
      return { success: true };
    } catch (error) {
      console.error('[Backend] Error rechazando reto:', error);
      return { success: false, error: error.message };
    }
  },

  // Enviar resultado del reto
  async submitChallengeResult(challengeId, score, timeSpent, correctAnswers) {
    try {
      const response = await fetch(`${API_BASE_URL}/challenges/${challengeId}/result`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          score,
          timeSpent,
          correct: correctAnswers
        })
      });
      
      if (!response.ok) throw new Error('Error enviando resultado');
      
      return await response.json();
    } catch (error) {
      console.error('[Backend] Error enviando resultado:', error);
      return { success: false, error: error.message };
    }
  },

  // Listeners y notificaciones
  onEvent(event, callback) {
    this.listeners.push({ event, callback });
  },

  notifyListeners(event, data) {
    this.listeners
      .filter(l => l.event === event)
      .forEach(l => l.callback(data));
  },

  // Para compatibilidad con Firebase
  startChallengeListeners() {
    // Los listeners en tiempo real se manejarían con polling o WebSocket aquí
    console.log('[Backend] Listeners iniciados');
  },

  stopChallengeListeners() {
    console.log('[Backend] Listeners detenidos');
  },

  // Logout
  async logout() {
    try {
      // 🆕 Detener sincronización automática
      this.stopAutoSync();
      
      // ✅ GUARDAR PROGRESO ANTES DE LOGOUT
      await this.syncFullProgress();
      
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      this.token = null;
      this.currentUser = null;
      this.userProfile = null;
      localStorage.removeItem('backend_token');
      
      return true;
    } catch (error) {
      console.error('[Backend] Error en logout:', error);
      return false;
    }
  },

  // 🆕 Cargar TODO el progreso del usuario desde MongoDB
  async loadFullProgress() {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me/progress`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      
      if (!response.ok) throw new Error('Error cargando progreso');
      
      const progress = await response.json();
      this.userProfile = progress;
      this.currentUser = progress;
      
      console.log('[Backend] 📥 Datos COMPLETOS recibidos de MongoDB:', progress);
      
      // === SINCRONIZAR TODO CON LOCALSTORAGE ===
      
      // 1. Player (perfil básico)
      const currentPlayer = Storage.getPlayer();
      Storage.savePlayer({
        ...currentPlayer,
        name: progress.displayName || currentPlayer.name,
        avatar: progress.photoURL || currentPlayer.avatar,
        email: progress.email,
        level: progress.level || currentPlayer.level || 1,
        xp: progress.xp || currentPlayer.xp || 0,
        xpToNext: progress.xpToNext || currentPlayer.xpToNext || 100,
        registered: true,
        registeredAt: progress.createdAt
      });
      
      // 2. Stats (estadísticas completas)
      const currentStats = Storage.getStats();
      Storage.saveStats({
        ...currentStats,
        totalPoints: progress.totalPoints || currentStats.totalPoints || 0,
        totalCorrect: progress.totalCorrect || currentStats.totalCorrect || 0,
        totalWrong: progress.totalWrong || currentStats.totalWrong || 0,
        totalAnswered: progress.totalAnswered || currentStats.totalAnswered || 0,
        totalGames: progress.totalGames || currentStats.totalGames || 0,
        bestStreak: progress.bestStreak || currentStats.bestStreak || 0,
        perfectGames: progress.perfectGames || currentStats.perfectGames || 0,
        expertCorrect: progress.expertCorrect || currentStats.expertCorrect || 0,
        categoriesPlayed: progress.categoriesPlayed || currentStats.categoriesPlayed || 0,
        dailyStreak: progress.dailyStreak || currentStats.dailyStreak,
        categoryComplete: progress.categoryComplete || currentStats.categoryComplete,
        speedStats: progress.speedStats || currentStats.speedStats
      });
      
      // 3. Coins (monedas)
      const currentCoins = Storage.getCoins();
      Storage.saveCoins({
        ...currentCoins,
        total: progress.coins || currentCoins.total || 0,
        earned: progress.coinsEarned || currentCoins.earned || 0,
        spent: progress.coinsSpent || currentCoins.spent || 0,
        multiplier: progress.coinMultiplier || currentCoins.multiplier || 1
      });
      
      // 4. Badges (insignias)
      if (progress.badges && progress.badges.length > 0) {
        const currentBadges = Storage.getBadges();
        // Combinar sin duplicados
        const mergedBadges = [...new Set([...currentBadges, ...progress.badges])];
        Storage.saveBadges(mergedBadges);
        console.log(`[Backend] 🏆 Insignias cargadas: ${mergedBadges.length}`);
      }
      
      // 5. Answered Questions (preguntas contestadas)
      if (progress.answeredQuestions && progress.answeredQuestions.length > 0) {
        const currentAnswered = Storage.getAnswered();
        const mergedAnswered = [...new Set([...currentAnswered, ...progress.answeredQuestions])];
        Storage.saveAnswered(mergedAnswered);
      }
      
      // 6. Wrong Answers (respuestas incorrectas)
      if (progress.wrongAnswers && progress.wrongAnswers.length > 0) {
        Storage.saveWrongAnswers(progress.wrongAnswers);
      }
      
      // 7. Game History (historial de partidas)
      if (progress.gameHistory && progress.gameHistory.length > 0) {
        const currentHistory = Storage.getHistory();
        // Combinar y mantener el historial más reciente (máximo 50)
        const mergedHistory = [...progress.gameHistory, ...currentHistory]
          .filter((game, index, self) => 
            index === self.findIndex(g => g.date === game.date && g.points === game.points)
          )
          .slice(0, 50);
        Storage.saveHistory(mergedHistory);
        console.log(`[Backend] 📊 Historial cargado: ${mergedHistory.length} partidas`);
      }
      
      // 8. Category Stats (estadísticas por categoría)
      if (progress.categoryStats && Object.keys(progress.categoryStats).length > 0) {
        Storage.saveCategoryStats(progress.categoryStats);
      }
      
      // 9. Challenge Records (récords de contrarreloj)
      if (progress.challengeRecords && Object.keys(progress.challengeRecords).length > 0) {
        Storage.saveChallengeRecords(progress.challengeRecords);
      }
      
      // 10. Settings (configuración)
      if (progress.settings && Object.keys(progress.settings).length > 0) {
        const currentSettings = Storage.getSettings();
        Storage.saveSettings({
          ...currentSettings,
          ...progress.settings
        });
      }
      
      console.log(`[Backend] ✅ Progreso COMPLETO cargado desde MongoDB - ${progress.displayName} | Nivel: ${progress.level} | Puntos: ${progress.totalPoints} | Monedas: ${progress.coins} | Insignias: ${progress.badges?.length || 0}`);
      return progress;
    } catch (error) {
      console.error('[Backend] Error cargando progreso completo:', error);
      return null;
    }
  },

  // 🆕 Sincronizar TODO el progreso del usuario a MongoDB
  async syncFullProgress() {
    try {
      // Obtener TODOS los datos actuales del frontend
      const player = Storage.getPlayer();
      const stats = Storage.getStats();
      const coins = Storage.getCoins();
      const badges = Storage.getBadges();
      const answered = Storage.getAnswered();
      const wrongAnswers = Storage.getWrongAnswers();
      const history = Storage.getHistory();
      const categoryStats = Storage.getCategoryStats();
      const challengeRecords = Storage.getChallengeRecords();
      const settings = Storage.getSettings();
      
      if (!this.token) return false;
      
      // Enviar TODO al backend
      const response = await fetch(`${API_BASE_URL}/users/me/progress/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          // Perfil
          displayName: player.name,
          photoURL: player.avatar,
          
          // Progresión
          level: player.level || 1,
          xp: player.xp || 0,
          xpToNext: player.xpToNext || 100,
          totalPoints: stats.totalPoints || 0,
          totalCorrect: stats.totalCorrect || 0,
          totalWrong: stats.totalWrong || 0,
          totalAnswered: stats.totalAnswered || 0,
          totalGames: stats.totalGames || 0,
          bestStreak: stats.bestStreak || 0,
          perfectGames: stats.perfectGames || 0,
          expertCorrect: stats.expertCorrect || 0,
          categoriesPlayed: stats.categoriesPlayed || 0,
          
          // Monedas
          coins: coins.total || 0,
          coinsEarned: coins.earned || 0,
          coinsSpent: coins.spent || 0,
          coinMultiplier: coins.multiplier || 1,
          
          // Insignias
          badges: badges || [],
          
          // Preguntas contestadas
          answeredQuestions: answered || [],
          wrongAnswers: wrongAnswers || [],
          
          // Historial (enviar últimas 50 partidas)
          gameHistory: (history || []).slice(0, 50),
          
          // Estadísticas por categoría
          categoryStats: categoryStats || {},
          
          // Récords de contrarreloj
          challengeRecords: challengeRecords || {},
          
          // Racha diaria (si existe)
          dailyStreak: stats.dailyStreak || { current: 0, best: 0, lastDate: null },
          
          // Categorías completadas (si existe)
          categoryComplete: stats.categoryComplete || {},
          
          // Estadísticas de velocidad (si existe)
          speedStats: stats.speedStats || {},
          
          // Configuración
          settings: settings || {}
        })
      });
      
      if (!response.ok) throw new Error('Error sincronizando progreso');
      
      const result = await response.json();
      console.log(`[Backend] ✅ Progreso COMPLETO sincronizado - Insignias: ${badges?.length || 0}, Historial: ${history?.length || 0}`, result.timestamp);
      return true;
    } catch (error) {
      console.error('[Backend] Error sincronizando progreso completo:', error);
      return false;
    }
  },

  loadOrCreateProfile() {
    return this.getProfile();
  },

  reloadProfile() {
    return this.getProfile();
  },

  syncProgressToCloud() {
    // Ahora sincroniza TODO el progreso
    return this.syncFullProgress();
  },

  // 🆕 ID del intervalo de sincronización automática
  _autoSyncInterval: null,

  // 🆕 Iniciar sincronización automática cada 5 minutos
  startAutoSync(intervalMs = 5 * 60 * 1000) {
    if (this._autoSyncInterval) {
      console.log('[Backend] Auto-sync ya activo');
      return;
    }

    console.log(`[Backend] 🔄 Iniciando auto-sync cada ${intervalMs / 1000 / 60} minutos`);
    
    // Sincronizar inmediatamente
    this.syncFullProgress().catch(err => 
      console.warn('[Backend] Error en sincronización inicial:', err)
    );

    // Luego cada 5 minutos
    this._autoSyncInterval = setInterval(() => {
      if (this.token && this.currentUser) {
        this.syncFullProgress()
          .then(success => {
            if (success) {
              console.log(`[Backend] ✅ Auto-sync completado - ${new Date().toLocaleTimeString()}`);
            }
          })
          .catch(err => console.warn('[Backend] Error en auto-sync:', err));
      }
    }, intervalMs);
  },

  // 🆕 Detener sincronización automática
  stopAutoSync() {
    if (this._autoSyncInterval) {
      clearInterval(this._autoSyncInterval);
      this._autoSyncInterval = null;
      console.log('[Backend] 🛑 Auto-sync detenido');
    }
  },

  // ============================================
  // RANKED - métodos para compatibilidad con ranked.js
  // ============================================

  async getCategoryRanking(category) {
    try {
      const response = await fetch(`${API_BASE_URL}/ranked/rankings/${category}`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      if (!response.ok) return { trophies: 0, wins: 0, losses: 0, ties: 0, highestTrophies: 0, gamesPlayed: 0 };
      return await response.json();
    } catch (e) {
      return { trophies: 0, wins: 0, losses: 0, ties: 0, highestTrophies: 0, gamesPlayed: 0 };
    }
  },

  async getMyRankings() {
    try {
      const response = await fetch(`${API_BASE_URL}/ranked/rankings`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      if (!response.ok) return {};
      return await response.json();
    } catch (e) {
      return {};
    }
  },

  async updateRankedResult(category, { won, tied }) {
    try {
      const response = await fetch(`${API_BASE_URL}/ranked/rankings/${category}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${this.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ won, tied })
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (e) {
      return null;
    }
  },

  async getRankedLeaderboard(category, limit = 100) {
    try {
      const response = await fetch(`${API_BASE_URL}/ranked/leaderboard/${category}?limit=${limit}`);
      if (!response.ok) return [];
      return await response.json();
    } catch (e) {
      return [];
    }
  },

  async joinMatchmakingQueue(category, trophies, rankId) {
    try {
      const response = await fetch(`${API_BASE_URL}/ranked/queue`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` },
        body: JSON.stringify({ category, trophies, rankId, userName: this.userProfile?.displayName || 'Jugador' })
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (e) {
      return null;
    }
  },

  async leaveMatchmakingQueue() {
    try {
      await fetch(`${API_BASE_URL}/ranked/queue`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
    } catch (e) {}
  },

  async getQueueStatus() {
    try {
      const response = await fetch(`${API_BASE_URL}/ranked/queue/status`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      if (!response.ok) return { status: 'not_in_queue' };
      return await response.json();
    } catch (e) {
      return { status: 'not_in_queue' };
    }
  },

  async findRankedOpponent(category, trophies, range) {
    try {
      const response = await fetch(`${API_BASE_URL}/ranked/queue/find`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` },
        body: JSON.stringify({ category, trophies, range })
      });
      if (!response.ok) return { matched: false };
      return await response.json();
    } catch (e) {
      return { matched: false };
    }
  },

  async createRankedMatch(category, questionIds, myTrophies, opponent) {
    try {
      const response = await fetch(`${API_BASE_URL}/ranked/matches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` },
        body: JSON.stringify({ category, questionIds, myTrophies, opponent })
      });
      if (!response.ok) return null;
      return await response.json();
    } catch (e) {
      return null;
    }
  },

  async waitForRankedMatch() {
    try {
      const response = await fetch(`${API_BASE_URL}/ranked/matches/waiting`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      if (!response.ok) return { found: false };
      return await response.json();
    } catch (e) {
      return { found: false };
    }
  },

  async getRankedMatch(matchId) {
    try {
      const response = await fetch(`${API_BASE_URL}/ranked/matches/${matchId}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (e) {
      return null;
    }
  },

  async submitRankedResult(matchId, score, timeSpent, correctAnswers) {
    try {
      const response = await fetch(`${API_BASE_URL}/ranked/matches/${matchId}/result`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.token}` },
        body: JSON.stringify({ score, timeSpent, correctAnswers })
      });
      if (!response.ok) return { success: false };
      return await response.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => {
  BackendService.init().then((success) => {
    if (success) {
      console.log('[Backend] ✅ Backend inicializado correctamente');
      BackendService.startChallengeListeners();
      
      // 🆕 Iniciar sincronización automática cada 5 minutos
      BackendService.startAutoSync(5 * 60 * 1000);
      
      // 🆕 VERIFICACIÓN DE AUTENTICACIÓN - Se ejecuta DESPUÉS de que BackendService esté listo
      if (typeof App !== 'undefined' && App.checkAuthenticationRequired) {
        setTimeout(() => {
          App.checkAuthenticationRequired();
        }, 100);
      }
    } else {
      console.warn('[Backend] ⚠️ Backend no pudo inicializarse');
      // Si BackendService falla, también verificamos autenticación
      if (typeof App !== 'undefined' && App.checkAuthenticationRequired) {
        setTimeout(() => {
          App.checkAuthenticationRequired();
        }, 100);
      }
    }
  });
});

// Alias para compatibilidad
window.Firebase = window.BackendService;
