// =============================================
// SISTEMA DE RANKED - Clasificación por Copas
// =============================================

// Definición de rangos (500 trofeos por rango)
const RANKS = [
  { id: 'bronce3', name: 'Bronce III', icon: '🥉', minTrophies: 0, maxTrophies: 500, color: '#CD7F32' },
  { id: 'bronce2', name: 'Bronce II', icon: '🥉', minTrophies: 500, maxTrophies: 1000, color: '#CD7F32' },
  { id: 'bronce1', name: 'Bronce I', icon: '🥉', minTrophies: 1000, maxTrophies: 1500, color: '#CD7F32' },
  { id: 'plata3', name: 'Plata III', icon: '🥈', minTrophies: 1500, maxTrophies: 2000, color: '#C0C0C0' },
  { id: 'plata2', name: 'Plata II', icon: '🥈', minTrophies: 2000, maxTrophies: 2500, color: '#C0C0C0' },
  { id: 'plata1', name: 'Plata I', icon: '🥈', minTrophies: 2500, maxTrophies: 3000, color: '#C0C0C0' },
  { id: 'oro3', name: 'Oro III', icon: '🥇', minTrophies: 3000, maxTrophies: 3500, color: '#FFD700' },
  { id: 'oro2', name: 'Oro II', icon: '🥇', minTrophies: 3500, maxTrophies: 4000, color: '#FFD700' },
  { id: 'oro1', name: 'Oro I', icon: '🥇', minTrophies: 4000, maxTrophies: 4500, color: '#FFD700' },
  { id: 'platino3', name: 'Platino III', icon: '💎', minTrophies: 4500, maxTrophies: 5000, color: '#00CED1' },
  { id: 'platino2', name: 'Platino II', icon: '💎', minTrophies: 5000, maxTrophies: 5500, color: '#00CED1' },
  { id: 'platino1', name: 'Platino I', icon: '💎', minTrophies: 5500, maxTrophies: 6000, color: '#00CED1' },
  { id: 'diamante3', name: 'Diamante III', icon: '💠', minTrophies: 6000, maxTrophies: 6500, color: '#B9F2FF' },
  { id: 'diamante2', name: 'Diamante II', icon: '💠', minTrophies: 6500, maxTrophies: 7000, color: '#B9F2FF' },
  { id: 'diamante1', name: 'Diamante I', icon: '💠', minTrophies: 7000, maxTrophies: 7500, color: '#B9F2FF' },
  { id: 'maestro', name: 'Maestro', icon: '👑', minTrophies: 7500, maxTrophies: 8000, color: '#9400D3' },
  { id: 'granmaestro', name: 'Gran Maestro', icon: '🏆', minTrophies: 8000, maxTrophies: Infinity, color: '#FF4500' }
];

// Categorías rankeadas
const RANKED_CATEGORIES = [
  { id: 'aleatorio', name: 'Aleatorio', icon: '🎲' },
  { id: 'personajes', name: 'Personajes', icon: '👤' },
  { id: 'lugares', name: 'Lugares', icon: '🏛️' },
  { id: 'eventos', name: 'Eventos', icon: '📜' },
  { id: 'profetas', name: 'Profetas', icon: '🔮' },
  { id: 'reyes', name: 'Reyes', icon: '👑' },
  { id: 'milagros', name: 'Milagros', icon: '✨' },
  { id: 'parabolas', name: 'Parábolas', icon: '📖' },
  { id: 'salmos-proverbios', name: 'Salmos', icon: '🎵' }
];

// Configuración del sistema
const RANKED_CONFIG = {
  trophiesWin: 30,
  trophiesLose: 20,
  trophiesLoseProtected: 5,        // Pérdida reducida para <200 trofeos
  protectionThreshold: 200,        // Umbral de protección de trofeos
  trophiesTie: 5,
  questionsPerMatch: 10,
  questionTime: 8,                 // 8 segundos por pregunta en ranked
  matchmakingInitialRange: 100,    // ±100 copas inicial
  matchmakingExpandInterval: 10000, // Expandir cada 10 segundos
  matchmakingExpandAmount: 100,     // Expandir ±100 cada vez
  matchmakingMaxRange: 500,         // Máximo ±500 copas
  matchmakingTimeout: 60000         // Timeout de búsqueda: 60s
};

// Exportar configuración globalmente
window.RANKED_CONFIG = RANKED_CONFIG;

// Módulo principal de Ranked
window.Ranked = {
  currentQueue: null,
  matchmakingInterval: null,
  queueListener: null,
  searchStartTime: null,
  currentRange: RANKED_CONFIG.matchmakingInitialRange,

  // ============================================
  // FUNCIONES DE RANGO
  // ============================================
  
  // Obtener rango por trofeos
  getRankByTrophies(trophies) {
    for (const rank of RANKS) {
      if (trophies >= rank.minTrophies && trophies < rank.maxTrophies) {
        return rank;
      }
    }
    return RANKS[RANKS.length - 1]; // Gran Maestro si sobrepasa
  },

  // Obtener progreso dentro del rango (0-100%)
  getRankProgress(trophies) {
    const rank = this.getRankByTrophies(trophies);
    if (rank.maxTrophies === Infinity) return 100;
    const rangeSize = rank.maxTrophies - rank.minTrophies;
    const progress = trophies - rank.minTrophies;
    return Math.round((progress / rangeSize) * 100);
  },

  // ============================================
  // ESTADÍSTICAS DEL JUGADOR
  // ============================================

  // Obtener estadísticas de todas las categorías
  async getMyRankings() {
    if (!window.Firebase?.currentUser) return {};
    
    try {
      const userId = window.Firebase.currentUser.uid;
      const rankingsRef = window.Firebase.db.collection('users').doc(userId).collection('rankings');
      const snapshot = await rankingsRef.get();
      
      const rankings = {};
      snapshot.forEach(doc => {
        rankings[doc.id] = doc.data();
      });
      
      return rankings;
    } catch (error) {
      console.error('[Ranked] Error obteniendo rankings:', error);
      return {};
    }
  },

  // Obtener estadísticas de una categoría
  async getCategoryRanking(category) {
    if (!window.Firebase?.currentUser) return null;
    
    try {
      const userId = window.Firebase.currentUser.uid;
      const doc = await window.Firebase.db
        .collection('users').doc(userId)
        .collection('rankings').doc(category)
        .get();
      
      if (doc.exists) {
        return doc.data();
      }
      
      // Crear ranking inicial si no existe
      const initialRanking = {
        trophies: 0,
        wins: 0,
        losses: 0,
        ties: 0,
        highestTrophies: 0,
        gamesPlayed: 0
      };
      
      await window.Firebase.db
        .collection('users').doc(userId)
        .collection('rankings').doc(category)
        .set(initialRanking);
      
      return initialRanking;
    } catch (error) {
      console.error('[Ranked] Error obteniendo ranking de categoría:', error);
      return null;
    }
  },

  // ============================================
  // SISTEMA DE MATCHMAKING
  // ============================================

  // Buscar partida ranked
  async searchMatch(category) {
    if (!window.Firebase?.currentUser) {
      this.showToast('Debes iniciar sesión para jugar ranked', 'error');
      return false;
    }

    console.log('[Ranked] Buscando partida en categoría:', category);
    
    // Obtener mis trofeos en esta categoría
    const myRanking = await this.getCategoryRanking(category);
    const myTrophies = myRanking?.trophies || 0;
    const myRank = this.getRankByTrophies(myTrophies);
    
    // Mostrar UI de búsqueda
    this.showSearchingUI(category, myRank, myTrophies);
    
    // Resetear rango de búsqueda
    this.currentRange = RANKED_CONFIG.matchmakingInitialRange;
    this.searchStartTime = Date.now();
    
    try {
      // Añadirme a la cola de matchmaking
      const queueRef = await window.Firebase.db.collection('matchmaking_queue').add({
        userId: window.Firebase.currentUser.uid,
        userName: window.Firebase.userProfile?.name || 'Jugador',
        category: category,
        trophies: myTrophies,
        rankId: myRank.id, // Añadir rango para facilitar matchmaking
        status: 'searching',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        matchedWith: null
      });
      
      this.currentQueue = queueRef.id;
      console.log('[Ranked] Añadido a cola:', this.currentQueue);
      
      // Buscar oponente inmediatamente
      await this.findOpponent(category, myTrophies);
      
      // Configurar búsqueda periódica con expansión de rango
      this.matchmakingInterval = setInterval(async () => {
        // Verificar timeout
        if (Date.now() - this.searchStartTime > RANKED_CONFIG.matchmakingTimeout) {
          this.cancelSearch();
          this.showToast('No se encontró oponente. Intenta de nuevo.', 'info');
          return;
        }
        
        // Expandir rango
        if (this.currentRange < RANKED_CONFIG.matchmakingMaxRange) {
          this.currentRange += RANKED_CONFIG.matchmakingExpandAmount;
          console.log('[Ranked] Expandiendo rango a ±' + this.currentRange);
          this.updateSearchUI();
        }
        
        // Buscar de nuevo
        await this.findOpponent(category, myTrophies);
      }, RANKED_CONFIG.matchmakingExpandInterval);
      
      // Escuchar cambios en mi entrada de cola (por si alguien me encuentra)
      this.queueListener = queueRef.onSnapshot(async (doc) => {
        if (!doc.exists) return;
        
        const data = doc.data();
        if (data.status === 'matched' && data.matchedWith) {
          console.log('[Ranked] ¡Emparejado por otro jugador!', data);
          this.onMatchFound(data.matchedWith, category);
        }
      });
      
      return true;
    } catch (error) {
      console.error('[Ranked] Error en matchmaking:', error);
      this.cancelSearch();
      this.showToast('Error buscando partida', 'error');
      return false;
    }
  },

  // Buscar oponente en la cola
  async findOpponent(category, myTrophies) {
    if (!this.currentQueue) return;
    
    try {
      const minTrophies = Math.max(0, myTrophies - this.currentRange);
      const maxTrophies = myTrophies + this.currentRange;
      const myRank = this.getRankByTrophies(myTrophies);
      
      console.log('[Ranked] Buscando oponentes - Rango:', myRank.name, 'Trofeos:', minTrophies, '-', maxTrophies);
      
      // Buscar jugadores en la cola de la misma categoría
      // Simplificamos la query para evitar problemas de índice compuesto
      const snapshot = await window.Firebase.db.collection('matchmaking_queue')
        .where('category', '==', category)
        .where('status', '==', 'searching')
        .limit(50)
        .get();
      
      // Filtrar en JavaScript: no soy yo + (mismo rango O trofeos en rango)
      const candidates = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (doc.id !== this.currentQueue && data.userId !== window.Firebase.currentUser.uid) {
          // Aceptar si: mismo rango O trofeos dentro del rango expandido
          const sameRank = data.rankId === myRank.id;
          const inTrophyRange = data.trophies >= minTrophies && data.trophies <= maxTrophies;
          
          if (sameRank || inTrophyRange) {
            candidates.push({ id: doc.id, ...data, sameRank });
          }
        }
      });
      
      if (candidates.length > 0) {
        // Priorizar: 1) mismo rango, 2) más cercano en trofeos
        candidates.sort((a, b) => {
          // Primero los del mismo rango
          if (a.sameRank && !b.sameRank) return -1;
          if (!a.sameRank && b.sameRank) return 1;
          // Luego por cercanía en trofeos
          return Math.abs(a.trophies - myTrophies) - Math.abs(b.trophies - myTrophies);
        });
        const opponent = candidates[0];
        console.log('[Ranked] Candidatos encontrados:', candidates.length, '- Eligiendo:', opponent.userName, '(' + opponent.trophies + ' trofeos)');
        
        console.log('[Ranked] ¡Oponente encontrado!', opponent);
        
        // Marcar ambos como emparejados
        const batch = window.Firebase.db.batch();
        
        batch.update(window.Firebase.db.collection('matchmaking_queue').doc(this.currentQueue), {
          status: 'matched',
          matchedWith: opponent.userId
        });
        
        batch.update(window.Firebase.db.collection('matchmaking_queue').doc(opponent.id), {
          status: 'matched',
          matchedWith: window.Firebase.currentUser.uid
        });
        
        await batch.commit();
        
        // Crear la partida ranked
        this.onMatchFound(opponent.userId, category, opponent);
      }
    } catch (error) {
      console.error('[Ranked] Error buscando oponente:', error);
    }
  },

  // Cuando se encuentra un oponente
  async onMatchFound(opponentId, category, opponentData = null) {
    console.log('[Ranked] ¡Partida encontrada!');
    
    // Limpiar matchmaking
    this.cleanupMatchmaking();
    
    // Obtener datos del oponente si no los tenemos
    if (!opponentData) {
      const opponentProfile = await window.Firebase.db.collection('users').doc(opponentId).get();
      opponentData = opponentProfile.exists ? opponentProfile.data() : { name: 'Oponente' };
    }
    
    // Determinar quién es el "host" (el de menor UID crea la partida)
    const iAmHost = window.Firebase.currentUser.uid < opponentId;
    
    if (iAmHost) {
      // Crear partida ranked
      const matchData = await this.createRankedMatch(category, opponentId, opponentData);
      if (matchData) {
        this.hideSearchingUI();
        this.startRankedGame(matchData);
      }
    } else {
      // Esperar a que el host cree la partida
      console.log('[Ranked] Esperando que el host cree la partida...');
      this.waitForMatch(category, opponentId);
    }
  },

  // Crear partida ranked en Firebase
  async createRankedMatch(category, opponentId, opponentData) {
    try {
      const myRanking = await this.getCategoryRanking(category);
      const myTrophies = myRanking?.trophies || 0;
      
      // Generar preguntas basadas en el rango (dificultad automática)
      const questions = this.generateRankedQuestions(category, myTrophies);
      
      const matchRef = await window.Firebase.db.collection('ranked_matches').add({
        category: category,
        questionsCount: RANKED_CONFIG.questionsPerMatch,
        questionIds: questions.map(q => q.id),
        
        player1Id: window.Firebase.currentUser.uid,
        player1Name: window.Firebase.userProfile?.name || 'Jugador',
        player1Trophies: myTrophies,
        player1Score: null,
        player1Time: null,
        player1Correct: null,
        
        player2Id: opponentId,
        player2Name: opponentData.userName || opponentData.name || 'Oponente',
        player2Trophies: opponentData.trophies || 0,
        player2Score: null,
        player2Time: null,
        player2Correct: null,
        
        status: 'active',
        winner: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      console.log('[Ranked] Partida creada:', matchRef.id);
      
      return {
        id: matchRef.id,
        category: category,
        questionIds: questions.map(q => q.id),
        opponent: opponentData
      };
    } catch (error) {
      console.error('[Ranked] Error creando partida:', error);
      this.showToast('Error creando partida', 'error');
      return null;
    }
  },

  // Esperar a que el host cree la partida
  waitForMatch(category, hostId) {
    const timeout = setTimeout(() => {
      if (this.matchWaitListener) {
        this.matchWaitListener();
        this.matchWaitListener = null;
      }
      this.hideSearchingUI();
      this.showToast('Error conectando con el oponente', 'error');
    }, 15000);
    
    // Escuchar partidas donde soy player2 (query simplificada para evitar índice compuesto)
    this.matchWaitListener = window.Firebase.db.collection('ranked_matches')
      .where('player2Id', '==', window.Firebase.currentUser.uid)
      .where('status', '==', 'active')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const data = change.doc.data();
            // Filtrar por hostId en JavaScript
            if (data.player1Id !== hostId) return;
            
            clearTimeout(timeout);
            if (this.matchWaitListener) {
              this.matchWaitListener();
              this.matchWaitListener = null;
            }
            
            const match = { id: change.doc.id, ...data };
            console.log('[Ranked] Partida encontrada:', match);
            
            this.hideSearchingUI();
            this.startRankedGame({
              id: match.id,
              category: match.category,
              questionIds: match.questionIds,
              opponent: {
                userId: match.player1Id,
                userName: match.player1Name,
                trophies: match.player1Trophies
              }
            });
          }
        });
      });
  },

  // Obtener dificultades permitidas según trofeos
  getDifficultyByTrophies(trophies) {
    // Bronce III, II, I (0-300): Solo fácil
    if (trophies < 300) {
      return { easy: 100, medium: 0, hard: 0 };
    }
    // Plata III, II, I (300-800): 70% fácil, 30% intermedia
    if (trophies < 800) {
      return { easy: 70, medium: 30, hard: 0 };
    }
    // Oro III, II, I (800-1500): 30% fácil, 70% intermedia
    if (trophies < 1500) {
      return { easy: 30, medium: 70, hard: 0 };
    }
    // Platino III, II, I (1500-2500): 50% intermedia, 50% difícil
    if (trophies < 2500) {
      return { easy: 0, medium: 50, hard: 50 };
    }
    // Diamante III, II, I (2500-4000): 50% intermedia, 50% difícil
    if (trophies < 4000) {
      return { easy: 0, medium: 50, hard: 50 };
    }
    // Maestro/Gran Maestro (4000+): 20% intermedia, 80% difícil (el más duro)
    return { easy: 0, medium: 20, hard: 80 };
  },

  // Generar preguntas para partida ranked
  generateRankedQuestions(category, trophies = 0) {
    if (!window.QUESTIONS_DB) {
      console.error('[Ranked] QUESTIONS_DB no disponible');
      return [];
    }
    
    // Obtener distribución de dificultad según trofeos
    const diffDist = this.getDifficultyByTrophies(trophies);
    console.log('[Ranked] Distribución dificultad para', trophies, 'trofeos:', diffDist);
    
    // Filtrar por categoría (aleatorio = todas)
    let pool;
    if (category === 'aleatorio') {
      pool = [...window.QUESTIONS_DB];
    } else {
      pool = window.QUESTIONS_DB.filter(q => q.category === category);
    }
    
    // Si no hay suficientes preguntas, usar todas
    if (pool.length < RANKED_CONFIG.questionsPerMatch) {
      pool = [...window.QUESTIONS_DB];
    }
    
    // Separar por dificultad
    const easyQuestions = pool.filter(q => q.difficulty === 'easy' || !q.difficulty);
    const mediumQuestions = pool.filter(q => q.difficulty === 'medium');
    const hardQuestions = pool.filter(q => q.difficulty === 'hard');
    
    // Calcular cuántas de cada dificultad
    const total = RANKED_CONFIG.questionsPerMatch;
    let numEasy = Math.round(total * diffDist.easy / 100);
    let numMedium = Math.round(total * diffDist.medium / 100);
    let numHard = total - numEasy - numMedium;
    
    // Ajustar si no hay suficientes de alguna dificultad
    const shuffle = arr => arr.sort(() => Math.random() - 0.5);
    
    const selectedEasy = shuffle([...easyQuestions]).slice(0, numEasy);
    const selectedMedium = shuffle([...mediumQuestions]).slice(0, numMedium);
    const selectedHard = shuffle([...hardQuestions]).slice(0, numHard);
    
    let questions = [...selectedEasy, ...selectedMedium, ...selectedHard];
    
    // Si faltan preguntas, completar con las que haya
    if (questions.length < total) {
      const remaining = total - questions.length;
      const usedIds = new Set(questions.map(q => q.id));
      const extras = shuffle(pool.filter(q => !usedIds.has(q.id))).slice(0, remaining);
      questions = [...questions, ...extras];
    }
    
    // Mezclar el orden final
    return shuffle(questions).slice(0, total);
  },

  // Iniciar juego ranked
  startRankedGame(matchData) {
    console.log('[Ranked] Iniciando partida ranked:', matchData);
    
    if (window.App) {
      window.App.startRankedMode(matchData);
    } else {
      console.error('[Ranked] App no disponible');
      this.showToast('Error iniciando partida', 'error');
    }
  },

  // ============================================
  // ENVIAR RESULTADO
  // ============================================

  async submitResult(matchId, score, timeSpent, correctAnswers) {
    if (!window.Firebase?.currentUser) return { success: false };
    
    try {
      const matchRef = window.Firebase.db.collection('ranked_matches').doc(matchId);
      const matchSnap = await matchRef.get();
      
      if (!matchSnap.exists) {
        return { success: false, error: 'Partida no encontrada' };
      }
      
      const match = matchSnap.data();
      const isPlayer1 = match.player1Id === window.Firebase.currentUser.uid;
      
      const updateData = isPlayer1 
        ? { player1Score: score, player1Time: timeSpent, player1Correct: correctAnswers }
        : { player2Score: score, player2Time: timeSpent, player2Correct: correctAnswers };
      
      // Verificar si el otro jugador ya terminó
      const otherScore = isPlayer1 ? match.player2Score : match.player1Score;
      let resultData = { success: true, completed: false };
      
      if (otherScore !== null) {
        // Determinar ganador
        let winner = null;
        if (score > otherScore) {
          winner = window.Firebase.currentUser.uid;
        } else if (otherScore > score) {
          winner = isPlayer1 ? match.player2Id : match.player1Id;
        } else {
          winner = 'tie';
        }
        
        updateData.status = 'completed';
        updateData.winner = winner;
        updateData.completedAt = firebase.firestore.FieldValue.serverTimestamp();
        
        // Actualizar trofeos
        await this.updateTrophies(match.category, winner, isPlayer1, match);
        
        resultData = {
          success: true,
          completed: true,
          winner: winner,
          myScore: score,
          opponentScore: otherScore,
          myTime: timeSpent,
          opponentTime: isPlayer1 ? match.player2Time : match.player1Time
        };
      }
      
      await matchRef.update(updateData);
      
      return resultData;
    } catch (error) {
      console.error('[Ranked] Error enviando resultado:', error);
      return { success: false, error: error.message };
    }
  },

  // Actualizar trofeos después de la partida
  async updateTrophies(category, winner, isPlayer1, match) {
    const myId = window.Firebase.currentUser.uid;
    const iWon = winner === myId;
    const isTie = winner === 'tie';
    
    // Obtener trofeos actuales para calcular protección
    const currentRankingSnap = await window.Firebase.db
      .collection('users').doc(myId)
      .collection('rankings').doc(category).get();
    const currentData = currentRankingSnap.exists ? currentRankingSnap.data() : { trophies: 0 };
    const currentTrophies = currentData.trophies || 0;
    
    let trophyChange = 0;
    if (iWon) {
      trophyChange = RANKED_CONFIG.trophiesWin;
    } else if (isTie) {
      trophyChange = RANKED_CONFIG.trophiesTie;
    } else {
      // Protección para jugadores con menos de 200 trofeos
      if (currentTrophies < RANKED_CONFIG.protectionThreshold) {
        trophyChange = -RANKED_CONFIG.trophiesLoseProtected; // Solo -5
      } else {
        trophyChange = -RANKED_CONFIG.trophiesLose; // -20 normal
      }
    }
    
    try {
      const rankingRef = window.Firebase.db
        .collection('users').doc(myId)
        .collection('rankings').doc(category);
      
      const data = currentData.gamesPlayed !== undefined ? currentData : {
        trophies: 0, wins: 0, losses: 0, ties: 0, highestTrophies: 0, gamesPlayed: 0
      };
      
      const newTrophies = Math.max(0, data.trophies + trophyChange);
      
      await rankingRef.set({
        trophies: newTrophies,
        wins: data.wins + (iWon ? 1 : 0),
        losses: data.losses + (!iWon && !isTie ? 1 : 0),
        ties: data.ties + (isTie ? 1 : 0),
        highestTrophies: Math.max(data.highestTrophies, newTrophies),
        gamesPlayed: data.gamesPlayed + 1
      }, { merge: true });
      
      console.log('[Ranked] Trofeos actualizados:', trophyChange, '→', newTrophies);
      
      return { oldTrophies: data.trophies, newTrophies, change: trophyChange };
    } catch (error) {
      console.error('[Ranked] Error actualizando trofeos:', error);
    }
  },

  // ============================================
  // LEADERBOARD
  // ============================================

  async getLeaderboard(category, limit = 1000) {
    try {
      const myUserId = window.Firebase?.currentUser?.uid;
      let myTrophies = 0;
      
      // Lista de todas las categorías específicas
      const allCategories = ['personajes', 'lugares', 'eventos', 'profetas', 'reyes', 'milagros', 'parabolas', 'salmos-proverbios'];
      
      // Si es aleatorio, sumar trofeos de todas las categorías
      if (category === 'aleatorio') {
        // Obtener trofeos totales del usuario actual
        if (myUserId) {
          for (const cat of allCategories) {
            const doc = await window.Firebase.db
              .collection('users').doc(myUserId)
              .collection('rankings').doc(cat).get();
            if (doc.exists) {
              myTrophies += doc.data().trophies || 0;
            }
          }
        }
        
        const myRank = this.getRankByTrophies(myTrophies);
        
        // Buscar totales de todos los usuarios
        const leaderboard = [];
        const usersRef = await window.Firebase.db.collection('users').get();
        
        for (const userDoc of usersRef.docs) {
          const userData = userDoc.data();
          let totalTrophies = 0;
          let totalWins = 0;
          let totalLosses = 0;
          
          // Sumar todas las categorías
          for (const cat of allCategories) {
            const rankingDoc = await userDoc.ref.collection('rankings').doc(cat).get();
            if (rankingDoc.exists) {
              const data = rankingDoc.data();
              totalTrophies += data.trophies || 0;
              totalWins += data.wins || 0;
              totalLosses += data.losses || 0;
            }
          }
          
          // Filtrar por rango del usuario actual
          if (totalTrophies >= myRank.minTrophies && totalTrophies < myRank.maxTrophies) {
            leaderboard.push({
              userId: userDoc.id,
              name: userData.name || 'Jugador',
              trophies: totalTrophies,
              wins: totalWins,
              losses: totalLosses
            });
          }
        }
        
        leaderboard.sort((a, b) => b.trophies - a.trophies);
        return leaderboard.slice(0, limit);
        
      } else {
        // Categoría específica
        if (myUserId) {
          const myRankingDoc = await window.Firebase.db
            .collection('users').doc(myUserId)
            .collection('rankings').doc(category).get();
          if (myRankingDoc.exists) {
            myTrophies = myRankingDoc.data().trophies || 0;
          }
        }
        
        const myRank = this.getRankByTrophies(myTrophies);
        
        const leaderboard = [];
        const usersRef = await window.Firebase.db.collection('users').get();
        
        for (const userDoc of usersRef.docs) {
          const rankingDoc = await userDoc.ref.collection('rankings').doc(category).get();
          
          if (rankingDoc.exists) {
            const userData = userDoc.data();
            const rankingData = rankingDoc.data();
            const playerTrophies = rankingData.trophies || 0;
            
            // Filtrar por rango del usuario actual
            if (playerTrophies >= myRank.minTrophies && playerTrophies < myRank.maxTrophies) {
              leaderboard.push({
                userId: userDoc.id,
                name: userData.name || 'Jugador',
                trophies: playerTrophies,
                wins: rankingData.wins || 0,
                losses: rankingData.losses || 0
              });
            }
          }
        }
        
        leaderboard.sort((a, b) => b.trophies - a.trophies);
        return leaderboard.slice(0, limit);
      }
    } catch (error) {
      console.error('[Ranked] Error obteniendo leaderboard:', error);
      return [];
    }
  },

  // ============================================
  // CANCELAR BÚSQUEDA
  // ============================================

  async cancelSearch() {
    console.log('[Ranked] Cancelando búsqueda...');
    this.cleanupMatchmaking();
    this.hideSearchingUI();
  },

  cleanupMatchmaking() {
    // Limpiar intervalo
    if (this.matchmakingInterval) {
      clearInterval(this.matchmakingInterval);
      this.matchmakingInterval = null;
    }
    
    // Limpiar listener de cola
    if (this.queueListener) {
      this.queueListener();
      this.queueListener = null;
    }
    
    // Limpiar listener de espera
    if (this.matchWaitListener) {
      this.matchWaitListener();
      this.matchWaitListener = null;
    }
    
    // Eliminar de la cola
    if (this.currentQueue && window.Firebase?.db) {
      window.Firebase.db.collection('matchmaking_queue').doc(this.currentQueue).delete()
        .catch(err => console.warn('[Ranked] Error eliminando de cola:', err));
    }
    
    this.currentQueue = null;
    this.searchStartTime = null;
  },

  // ============================================
  // UI DE BÚSQUEDA
  // ============================================

  showSearchingUI(category, rank, trophies) {
    const overlay = document.getElementById('ranked-search-overlay');
    if (!overlay) return;
    
    document.getElementById('ranked-search-rank').textContent = `${rank.icon} ${rank.name}`;
    document.getElementById('ranked-search-rank').style.color = rank.color;
    document.getElementById('ranked-search-trophies').textContent = `${trophies} 🏆`;
    document.getElementById('ranked-search-range').textContent = `±${this.currentRange} trofeos`;
    document.getElementById('ranked-search-time').textContent = '0s';
    
    overlay.classList.remove('hidden');
    
    // Timer visual
    this.searchTimerInterval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - this.searchStartTime) / 1000);
      document.getElementById('ranked-search-time').textContent = `${elapsed}s`;
    }, 1000);
  },

  updateSearchUI() {
    const rangeEl = document.getElementById('ranked-search-range');
    if (rangeEl) {
      rangeEl.textContent = `±${this.currentRange} trofeos`;
    }
  },

  hideSearchingUI() {
    const overlay = document.getElementById('ranked-search-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
    
    if (this.searchTimerInterval) {
      clearInterval(this.searchTimerInterval);
      this.searchTimerInterval = null;
    }
  },

  // ============================================
  // UTILIDADES
  // ============================================

  showToast(message, type = 'info') {
    if (window.App?.showToast) {
      window.App.showToast(message, type);
    } else {
      console.log('[Ranked]', message);
    }
  },

  // Suscribirse a un match para ver actualizaciones
  subscribeToMatch(matchId, callback) {
    return window.Firebase.db.collection('ranked_matches').doc(matchId).onSnapshot((doc) => {
      if (doc.exists) {
        callback({ id: doc.id, ...doc.data() });
      }
    });
  }
};

// Exponer constantes
window.RANKS = RANKS;
window.RANKED_CATEGORIES = RANKED_CATEGORIES;
window.RANKED_CONFIG = RANKED_CONFIG;

console.log('[Ranked] Sistema de clasificación cargado');
