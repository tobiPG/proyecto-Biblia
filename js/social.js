// Social Features - BibliaQuiz
// Manejo de UI para clasificación, amigos y retos

function _renderAvatarHtml(avatarKey, avatarColor, photoURL, cssClass) {
  const sz = 40;
  if (photoURL && photoURL.startsWith('http')) {
    return `<img src="${photoURL}" alt="" style="width:${sz}px;height:${sz}px;border-radius:50%;object-fit:cover;display:block;">`;
  }
  const chars = window.AVATAR_CHARACTERS || [];
  const ch = chars.find(c => c.key === avatarKey);
  if (ch) {
    const base = window.DICEBEAR_BASE || 'https://api.dicebear.com/9.x/adventurer/svg?seed=';
    return `<img src="${base}${ch.seed}${ch.p||''}" alt="" style="width:${sz}px;height:${sz}px;border-radius:50%;object-fit:cover;display:block;">`;
  }
  const colors = window.AVATAR_COLORS || {};
  const grad = (colors[avatarColor] || colors.indigo || {}).grad || 'linear-gradient(135deg,#6366f1,#8b5cf6)';
  const initial = avatarKey ? avatarKey[0].toUpperCase() : '?';
  return `<span style="width:${sz}px;height:${sz}px;border-radius:50%;background:${grad};display:flex;align-items:center;justify-content:center;font-weight:900;color:#fff;font-size:16px;flex-shrink:0;">${initial}</span>`;
}

window.Social = {
  isInitialized: false,
  currentTab: 'leaderboard',
  cachedLeaderboard: [],
  cachedFriends: [],
  currentChallenge: null,
  pendingChallengeTarget: null, // {friendId, friendName} para modal de config
  lastChallengeOpponent: null, // Para revancha
  
  // Notificación en tiempo real
  pendingNotification: null,
  notificationTimeout: null,
  notificationTimerInterval: null,

  // Inicializar módulo social
  async init() {
    if (this.isInitialized) return;
    
    // Esperar a que Firebase esté listo con timeout
    const firebaseReady = await this.waitForFirebase();
    if (!firebaseReady) {
      console.warn('[Social] Inicializando sin Firebase completo');
    }
    
    this.setupEventListeners();
    this.setupRealtimeListeners(); // <-- Nuevo: escuchar eventos en tiempo real
    this.isInitialized = true;
    
    // Procesar resultados de redirect pendientes (login/vincular con Google)
    await this.processRedirectResults();
    
    // Actualizar notificaciones
    this.updateNotificationBadges();
    
    // Iniciar verificación periódica
    this.startNotificationPolling();
    
    // Mostrar/ocultar banner de login según estado
    this.updateLoginBanner();
    
    // Escuchar cambios de autenticación
    if (window.FirebaseService) {
      window.FirebaseService.onEvent('auth', (data) => {
        this.updateLoginBanner();
      });
    }
  },

  // ============================================
  // LISTENERS EN TIEMPO REAL (Estilo 8 Ball Pool)
  // ============================================
  
  setupRealtimeListeners() {
    if (!window.FirebaseService) return;
    
    // Cuando llega un NUEVO RETO
    window.FirebaseService.onEvent('newChallenge', (challenge) => {
      console.log('[Social] ¡Nuevo reto recibido!', challenge);
      this.showChallengeNotification(challenge);
      // Vibrar si es posible
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
      // Reproducir sonido si es posible
      this.playNotificationSound();
    });

    // Cuando MI RETO fue aceptado
    window.FirebaseService.onEvent('challengeAccepted', (challenge) => {
      console.log('[Social] ¡Tu reto fue aceptado!', challenge);

      // Si estoy en medio de un quiz, solo mostrar toast, no el prompt
      if (window.App && window.App.isSocialChallenge) {
        console.log('[Social] Estoy jugando un reto, solo mostrando toast');
        this.showToast('⚔️ ¡' + challenge.opponentName + ' aceptó tu reto!', 'success');
        return;
      }

      this.showToast('⚔️ ¡' + challenge.opponentName + ' aceptó tu reto!', 'success');
      // Mostrar opción para jugar
      this.showPlayPrompt(challenge, 'accepted');
    });

    // Cuando el OPONENTE ya jugó (soy el creador)
    window.FirebaseService.onEvent('opponentPlayed', (challenge) => {
      console.log('[Social] El oponente ya jugó. Mi turno.', challenge);

      // Si ya estoy jugando este reto ahora mismo, no interrumpir
      if (window.App && window.App.isSocialChallenge &&
          window.App.socialChallengeData?.id === challenge.id) return;

      // Si yo (creador) ya envié mi resultado, no mostrar "es tu turno"
      if (challenge.creatorScore !== null && challenge.creatorScore !== undefined) return;

      // Si el overlay de resultados ya está visible, ignorar
      const resultOverlay = document.getElementById('challenge-result-overlay');
      if (resultOverlay && !resultOverlay.classList.contains('hidden')) return;

      this.showToast('⚔️ ¡' + challenge.opponentName + ' ya jugó! Es tu turno.', 'info');
      this.showPlayPrompt(challenge, 'yourTurn');
    });

    // Cuando el CREADOR ya jugó (soy el oponente)
    window.FirebaseService.onEvent('creatorPlayed', (challenge) => {
      console.log('[Social] El creador ya jugó. Mi turno.', challenge);

      // Si ya estoy jugando este reto ahora mismo, no interrumpir
      if (window.App && window.App.isSocialChallenge &&
          window.App.socialChallengeData?.id === challenge.id) return;

      // Si yo (oponente) ya envié mi resultado, no mostrar "es tu turno"
      if (challenge.opponentScore !== null && challenge.opponentScore !== undefined) return;

      // Si el overlay de resultados ya está visible, ignorar
      const resultOverlay = document.getElementById('challenge-result-overlay');
      if (resultOverlay && !resultOverlay.classList.contains('hidden')) return;

      this.showToast('⚔️ ¡' + challenge.creatorName + ' ya jugó! Es tu turno.', 'info');
      this.showPlayPrompt(challenge, 'yourTurn');
    });

    // Cuando el RETO se completó
    window.FirebaseService.onEvent('challengeCompleted', (challenge) => {
      console.log('[Social] ¡Reto completado!', challenge);
      
      // IMPORTANTE: Si estoy en la pantalla de resultados del reto, no hacer nada extra
      // El overlay de resultados ya lo maneja
      const resultOverlay = document.getElementById('challenge-result-overlay');
      if (resultOverlay && !resultOverlay.classList.contains('hidden')) {
        console.log('[Social] Ya estoy viendo resultados, ignorando evento challengeCompleted');
        return;
      }
      
      // Mostrar resultados si no estamos ya en el modal
      const myId = window.FirebaseService?.currentUser?.uid;
      const isWinner = challenge.winner === myId;
      const isTie = challenge.winner === 'tie';
      
      let resultMsg = isTie ? '🤝 ¡Empate!' : (isWinner ? '🏆 ¡Ganaste!' : '😔 Perdiste');
      this.showToast(`${resultMsg} vs ${challenge.creatorId === myId ? challenge.opponentName : challenge.creatorName}`, isWinner ? 'success' : 'info');
      
      // Actualizar lista de retos si está visible
      if (this.currentTab === 'challenges') {
        this.loadChallenges();
      }
    });
  },
  
  // Mostrar notificación de reto en banner superior
  showChallengeNotification(challenge) {
    const banner = document.getElementById('challenge-notification');
    if (!banner) return;
    
    this.pendingNotification = challenge;
    
    // Actualizar contenido
    document.getElementById('challenge-notif-from').textContent = 
      `De: ${challenge.creatorName}`;
    
    const categoryNames = {
      'random': 'Aleatorio', 'aleatorio': 'Aleatorio',
      'antiguo-testamento': 'AT', 'nuevo-testamento': 'NT',
      'personajes': 'Personajes', 'lugares': 'Lugares',
      'milagros': 'Milagros', 'parabolas': 'Parábolas'
    };
    const catName = categoryNames[challenge.category] || challenge.category;
    document.getElementById('challenge-notif-details').textContent = 
      `${challenge.questionsCount}P • ${catName}`;
    
    // Mostrar banner con animación
    banner.classList.remove('hidden');
    setTimeout(() => banner.classList.add('visible'), 10);
    
    // Shake para llamar atención
    setTimeout(() => {
      banner.classList.add('shake');
      setTimeout(() => banner.classList.remove('shake'), 500);
    }, 500);
    
    // Timer de 30 segundos para responder
    this.startNotificationTimer(30);
    
    // Handlers de botones
    document.getElementById('btn-notif-accept').onclick = () => this.acceptNotificationChallenge();
    document.getElementById('btn-notif-reject').onclick = () => this.rejectNotificationChallenge();
  },
  
  // Timer visual en la notificación
  startNotificationTimer(seconds) {
    const timerBar = document.getElementById('challenge-notif-timer-bar');
    if (!timerBar) return;
    
    let remaining = seconds;
    timerBar.style.width = '100%';
    
    // Limpiar timer anterior
    if (this.notificationTimerInterval) {
      clearInterval(this.notificationTimerInterval);
    }
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
    
    this.notificationTimerInterval = setInterval(() => {
      remaining--;
      timerBar.style.width = `${(remaining / seconds) * 100}%`;
      
      if (remaining <= 0) {
        clearInterval(this.notificationTimerInterval);
      }
    }, 1000);
    
    // Auto-ocultar después del tiempo
    this.notificationTimeout = setTimeout(() => {
      this.hideChallengeNotification();
    }, seconds * 1000);
  },
  
  // Ocultar notificación
  hideChallengeNotification() {
    const banner = document.getElementById('challenge-notification');
    if (!banner) return;
    
    banner.classList.remove('visible');
    setTimeout(() => {
      banner.classList.add('hidden');
      this.pendingNotification = null;
    }, 400);
    
    if (this.notificationTimerInterval) {
      clearInterval(this.notificationTimerInterval);
    }
    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }
  },
  
  // Aceptar reto desde notificación
  async acceptNotificationChallenge() {
    if (!this.pendingNotification) return;
    
    const challenge = this.pendingNotification;
    this.hideChallengeNotification();
    
    this.showToast('⚔️ ¡Reto aceptado! Preparando partida...', 'success');
    
    // Aceptar el reto en Firebase
    if (!window.FirebaseService) return;
    const acceptResult = await window.FirebaseService.acceptChallenge(challenge.id);
    console.log('[Social] Resultado de aceptar reto:', acceptResult);
    
    if (!acceptResult.success) {
      this.showToast('Error al aceptar reto', 'error');
      return;
    }
    
    // Actualizar el status localmente para no esperar a Firestore
    challenge.status = 'active';
    
    // Ir directamente a jugar usando el challenge que ya tenemos
    this.playDirectChallenge(challenge);
  },
  
  // Jugar directamente con un objeto challenge (sin buscar en Firestore)
  async playDirectChallenge(challenge) {
    console.log('[Social] ========== JUGAR RETO DIRECTO ==========');
    console.log('[Social] challenge:', challenge);
    
    if (!challenge) {
      console.error('[Social] Challenge es null');
      this.showToast('Error en el reto', 'error');
      return;
    }
    
    // Guardar el reto actual
    this.currentChallenge = challenge;
    
    // Verificar que tiene questionIds
    console.log('[Social] questionIds:', challenge.questionIds);

    // Guardar oponente para posible revancha
    const isCreator = challenge.creatorId === window.FirebaseService?.currentUser?.uid;
    this.lastChallengeOpponent = {
      friendId: isCreator ? challenge.opponentId : challenge.creatorId,
      friendName: isCreator ? challenge.opponentName : challenge.creatorName
    };
    console.log('[Social] isCreator:', isCreator);

    // Cerrar pantalla social si está abierta
    this.closeSocialScreen();
    
    // Iniciar partida en modo reto
    if (window.App) {
      console.log('[Social] Llamando a App.startChallengeMode...');
      App.startChallengeMode(challenge);
    } else {
      console.error('[Social] window.App no disponible');
      this.showToast('Error al iniciar partida', 'error');
    }
  },
  
  // Rechazar reto desde notificación
  async rejectNotificationChallenge() {
    if (!this.pendingNotification) return;
    
    const challenge = this.pendingNotification;
    this.hideChallengeNotification();
    
    // Solo rechazar en Firebase si es un reto NUEVO pendiente, no un "play prompt"
    if (!this.pendingPlayPrompt && challenge.status === 'pending') {
      if (window.FirebaseService) await window.FirebaseService.rejectChallenge(challenge.id);
      this.showToast('Reto rechazado', 'info');
    } else {
      this.showToast('Puedes jugar el reto más tarde', 'info');
    }
    this.pendingPlayPrompt = false;
  },
  
  // Mostrar prompt para jugar un reto (NO BLOQUEANTE)
  showPlayPrompt(challenge, reason) {
    const myId = window.FirebaseService?.currentUser?.uid;
    const isCreator = challenge.creatorId === myId;
    const opponentName = isCreator ? challenge.opponentName : challenge.creatorName;
    
    let message = '';
    if (reason === 'accepted') {
      message = `${opponentName} aceptó tu reto`;
    } else if (reason === 'yourTurn') {
      message = `${opponentName} ya jugó. ¡Es tu turno!`;
    }
    
    // Usar la notificación en lugar de confirm() bloqueante
    const banner = document.getElementById('challenge-notification');
    if (!banner) {
      // Fallback a confirm si no hay banner
      if (confirm(`⚔️ ${message} ¿Jugar ahora?`)) {
        this.playChallenge(challenge.id);
      }
      return;
    }
    
    this.pendingNotification = challenge;
    this.pendingPlayPrompt = true; // Marcar que es un prompt de jugar, no un nuevo reto
    
    // Actualizar contenido
    document.getElementById('challenge-notif-from').textContent = `⚔️ ${message}`;
    document.getElementById('challenge-notif-details').textContent = '¿Jugar ahora?';
    
    // Mostrar banner con animación
    banner.classList.remove('hidden');
    setTimeout(() => banner.classList.add('visible'), 10);
    
    // Timer de 15 segundos para responder
    this.startNotificationTimer(15);
    
    // Handlers de botones
    document.getElementById('btn-notif-accept').onclick = () => {
      this.hideChallengeNotification();
      this.pendingPlayPrompt = false;
      this.playChallenge(challenge.id);
    };
    document.getElementById('btn-notif-reject').onclick = () => {
      this.hideChallengeNotification();
      this.pendingPlayPrompt = false;
      this.showToast('Puedes jugar el reto más tarde', 'info');
    };
  },
  
  // Reproducir sonido de notificación
  playNotificationSound() {
    try {
      // Crear un sonido simple con Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.3;
      
      oscillator.start();
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Ignorar si no hay soporte de audio
    }
  },

  // Actualizar banner de login en pantalla principal
  updateLoginBanner() {
    const banner = document.getElementById('login-prompt-banner');
    if (!banner) return;

    // Users logged in via MongoDB backend don't need the "link with Google" banner
    const hasBackendAuth = !!localStorage.getItem('backend_token');
    if (hasBackendAuth) {
      banner.classList.add('hidden');
      return;
    }

    const FB = window.FirebaseService;
    if (!FB) return;
    const profile = FB.userProfile;
    if (profile && profile.isAnonymous) {
      banner.classList.remove('hidden');
    } else {
      banner.classList.add('hidden');
    }
  },

  // Esperar a que Firebase esté listo (con timeout y reintentos)
  async waitForFirebase(maxWaitMs = 20000) {
    const startTime = Date.now();
    
    return new Promise((resolve, reject) => {
      const check = async () => {
        // Verificar si Firebase está listo
        if (window.FirebaseService && window.FirebaseService?.isReady && window.FirebaseService?.currentUser) {
          console.log('[Social] Firebase listo');
          resolve(true);
          return;
        }
        
        // Verificar timeout
        if (Date.now() - startTime > maxWaitMs) {
          console.warn('[Social] Timeout esperando Firebase, intentando forzar conexión...');
          
          // Intentar reinicializar Firebase
          if (window.FirebaseService) {
            try {
              const success = await window.FirebaseService.ensureConnection();
              if (success) {
                console.log('[Social] Firebase reconectado exitosamente');
                resolve(true);
                return;
              }
            } catch (e) {
              console.error('[Social] Error reconectando Firebase:', e);
            }
          }
          
          console.error('[Social] No se pudo conectar a Firebase');
          resolve(false);
          return;
        }
        
        // Seguir esperando
        setTimeout(check, 200);
      };
      check();
    });
  },

  // Configurar event listeners
  setupEventListeners() {
    // Botón para abrir Social (agregar en home)
    const btnSocial = document.getElementById('btn-social');
    if (btnSocial) {
      btnSocial.addEventListener('click', () => this.openSocialScreen());
    }

    // Cerrar pantalla social
    const btnCloseSocial = document.getElementById('btn-close-social');
    if (btnCloseSocial) {
      btnCloseSocial.addEventListener('click', () => this.closeSocialScreen());
    }

    // Tabs
    document.querySelectorAll('.social-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = e.currentTarget.dataset.tab;
        this.switchTab(tabName);
      });
    });

    // Buscar amigo
    const btnSearchFriend = document.getElementById('btn-search-friend');
    if (btnSearchFriend) {
      btnSearchFriend.addEventListener('click', () => this.searchFriend());
    }

    // Enter en input de búsqueda
    const inputFriendCode = document.getElementById('input-friend-code');
    if (inputFriendCode) {
      inputFriendCode.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.searchFriend();
      });
    }

    // Copiar mi código
    const btnCopyCode = document.getElementById('btn-copy-code');
    if (btnCopyCode) {
      btnCopyCode.addEventListener('click', () => this.copyMyCode());
    }

    // Vincular con Google
    const btnLinkGoogle = document.getElementById('btn-link-google');
    if (btnLinkGoogle) {
      btnLinkGoogle.addEventListener('click', () => this.linkWithGoogle());
    }

    // Iniciar sesión con Google (para usuarios que ya tienen cuenta)
    const btnSignInGoogle = document.getElementById('btn-signin-google');
    if (btnSignInGoogle) {
      btnSignInGoogle.addEventListener('click', () => this.signInWithGoogle());
    }

    // Botón de inicio rápido en pantalla principal
    const btnQuickSignIn = document.getElementById('btn-quick-signin');
    if (btnQuickSignIn) {
      btnQuickSignIn.addEventListener('click', () => this.signInWithGoogle());
    }

    // Cambiar nombre
    const btnChangeName = document.getElementById('btn-change-name');
    if (btnChangeName) {
      btnChangeName.addEventListener('click', () => this.changeDisplayName());
    }

    // Modal Configurar Reto
    const btnCancelChallenge = document.getElementById('btn-cancel-challenge');
    if (btnCancelChallenge) {
      btnCancelChallenge.addEventListener('click', () => this.closeChallengeConfig());
    }

    const btnSendChallenge = document.getElementById('btn-send-challenge');
    if (btnSendChallenge) {
      btnSendChallenge.addEventListener('click', () => this.sendConfiguredChallenge());
    }

    // Modal Resultados Reto
    const btnRematch = document.getElementById('btn-rematch');
    if (btnRematch) {
      btnRematch.addEventListener('click', () => this.requestRematch());
    }

    const btnNewChallenge = document.getElementById('btn-new-challenge');
    if (btnNewChallenge) {
      btnNewChallenge.addEventListener('click', () => this.openNewChallengeConfig());
    }

    const btnCloseResults = document.getElementById('btn-close-results');
    if (btnCloseResults) {
      btnCloseResults.addEventListener('click', () => this.closeResultsModal());
    }
  },

  // Abrir pantalla social
  async openSocialScreen() {
    const screen = document.getElementById('social-screen');
    if (!screen) return;

    screen.classList.remove('hidden');
    
    // Esperar a que Firebase esté listo
    if (!window.FirebaseService?.isReady || !window.FirebaseService?.currentUser) {
      console.log('[Social] Esperando a Firebase...');
      const firebaseReady = await this.waitForFirebase();
      if (!firebaseReady) {
        this.showToast('Error de conexión. Intenta de nuevo.', 'error');
        return;
      }
    }
    
    // Forzar recarga del perfil desde Firestore para estar seguros
    try {
      if (window.FirebaseService?.currentUser) {
        await window.FirebaseService.reloadProfile();
        console.log('[Social] Perfil recargado:', window.FirebaseService?.userProfile);
      }
    } catch (e) {
      console.error('[Social] Error recargando perfil:', e);
    }
    
    // Actualizar info del usuario primero
    this.updateUserInfo();
    
    // Cargar datos del tab actual
    await this.loadTabData(this.currentTab);
  },

  // Cerrar pantalla social
  closeSocialScreen() {
    const screen = document.getElementById('social-screen');
    if (screen) {
      screen.classList.add('hidden');
    }
  },

  // Cambiar tab
  switchTab(tabName) {
    this.currentTab = tabName;
    
    // Actualizar UI de tabs
    document.querySelectorAll('.social-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    // Mostrar contenido del tab
    document.querySelectorAll('.social-tab-content').forEach(content => {
      content.classList.toggle('hidden', content.id !== `tab-${tabName}`);
    });
    
    // Cargar datos
    this.loadTabData(tabName);
  },

  // Cargar datos del tab
  async loadTabData(tabName) {
    switch (tabName) {
      case 'leaderboard':
        await this.loadLeaderboard();
        break;
      case 'friends':
        await this.loadFriends();
        break;
      case 'challenges':
        await this.loadChallenges();
        break;
    }
  },

  // Cargar tabla de clasificación
  async loadLeaderboard() {
    const container = document.getElementById('social-leaderboard-list');
    if (!container) return;

    container.innerHTML = '<div class="loading-spinner">Cargando...</div>';
    console.log('[Social] Cargando leaderboard...');

    try {
      // Usar BackendService si está disponible (MongoDB es la fuente de verdad para puntos)
      const service = (window.BackendService && window.BackendService.isReady)
        ? window.BackendService
        : window.FirebaseService;
      const leaderboard = await service.getLeaderboard(50);
      console.log('[Social] Leaderboard recibido:', leaderboard);

      // Parchar la entrada del usuario actual con datos locales frescos
      // (el sync al backend es async y puede no haber llegado todavía)
      const myId = (window.BackendService?.currentUser?.uid) || (window.FirebaseService?.currentUser?.uid);
      if (myId && typeof Storage !== 'undefined') {
        const localStats = Storage.getStats();
        const localPlayer = Storage.getPlayer();
        const myProfile = service.userProfile || {};
        const myEntry = {
          id: myId,
          displayName: myProfile.displayName || localPlayer.name || 'Jugador',
          totalPoints: localStats.totalPoints || 0,
          totalGames: localStats.totalGames || 0,
          level: localPlayer.level || 1,
          photoURL: myProfile.photoURL || null,
          avatar: localPlayer.avatar || myProfile.avatar || '',
          avatarColor: localPlayer.avatarColor || myProfile.avatarColor || 'indigo'
        };
        const myIndex = leaderboard.findIndex(u => u.id === myId);
        if (myIndex >= 0) {
          leaderboard[myIndex] = myEntry;
        } else if (myEntry.totalPoints > 0) {
          leaderboard.push(myEntry);
        }
        // Reordenar con la entrada actualizada
        leaderboard.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
        if (leaderboard.length > 50) leaderboard.length = 50;
      }

      this.cachedLeaderboard = leaderboard;

      if (leaderboard.length === 0) {
        container.innerHTML = '<p class="empty-state">No hay jugadores aún. ¡Juega para aparecer!</p>';
        return;
      }
      let myRank = leaderboard.findIndex(u => u.id === myId) + 1;

      const _localPlayer = window.Storage?.getPlayer?.() || {};
      container.innerHTML = leaderboard.map((user, index) => {
        const rank = index + 1;
        const isMe = user.id === myId;
        const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;
        const avatarKey = (isMe && _localPlayer.avatar) ? _localPlayer.avatar : (user.avatar || '');
        const avatarColor = (isMe && _localPlayer.avatarColor) ? _localPlayer.avatarColor : (user.avatarColor || 'indigo');

        return `
          <div class="leaderboard-item ${isMe ? 'is-me' : ''}" data-user-id="${user.id}">
            <span class="lb-rank ${rank <= 3 ? 'top-3' : ''}">${medal}</span>
            <div class="lb-avatar">
              ${_renderAvatarHtml(avatarKey, avatarColor, user.photoURL, 'lb-avatar')}
            </div>
            <div class="lb-info">
              <span class="lb-name">${this.escapeHtml(user.displayName || 'Jugador')}</span>
              <span class="lb-stats">Nivel ${user.level || 1} • ${user.totalGames || 0} partidas</span>
            </div>
            <div class="lb-points">
              <span class="lb-points-value">${(user.totalPoints || 0).toLocaleString()}</span>
              <span class="lb-points-label">puntos</span>
            </div>
          </div>
        `;
      }).join('');

      // Mostrar mi posición si no estoy en top 50
      if (myRank === 0 && myId) {
        const myUserInfo = document.getElementById('my-rank-info');
        if (myUserInfo) {
          myUserInfo.innerHTML = `Tu posición: calculando...`;
        }
      }

    } catch (error) {
      console.error('Error cargando leaderboard:', error);
      container.innerHTML = '<p class="error-state">Error al cargar clasificación</p>';
    }
  },

  // Cargar lista de amigos
  async loadFriends() {
    const container = document.getElementById('friends-list');
    const requestsContainer = document.getElementById('friend-requests-list');
    if (!container) return;

    container.innerHTML = '<div class="loading-spinner">Cargando...</div>';

    try {
      // Recargar perfil de Firebase si está disponible (para ver cambios recientes)
      if (window.FirebaseService?.isReady && window.FirebaseService?.userProfile) {
        await window.FirebaseService.reloadProfile();
      }
      console.log('[Social] Perfil recargado, amigos:', window.FirebaseService?.userProfile?.friends?.length || 0);

      // Cargar solicitudes pendientes (Firebase + MongoDB, sin duplicados)
      const [firebaseReqs, backendReqs] = await Promise.all([
        window.FirebaseService?.getPendingRequests?.().catch(() => []) || Promise.resolve([]),
        window.BackendService?.getPendingRequests?.() || Promise.resolve([])
      ]);
      const reqMap = new Map();
      [...firebaseReqs, ...backendReqs].forEach(u => reqMap.set(u.id, u));
      const pendingRequests = [...reqMap.values()];

      if (requestsContainer) {
        if (pendingRequests.length > 0) {
          requestsContainer.innerHTML = `
            <h4 class="requests-title">Solicitudes pendientes (${pendingRequests.length})</h4>
            ${pendingRequests.map(user => `
              <div class="friend-request-item" data-user-id="${user.id}">
                <div class="fr-avatar">
                  ${_renderAvatarHtml(user.avatar, user.avatarColor, user.photoURL, 'fr-avatar')}
                </div>
                <div class="fr-info">
                  <span class="fr-name">${this.escapeHtml(user.displayName || 'Jugador')}</span>
                  <span class="fr-code">Código: ${user.friendCode}</span>
                </div>
                <div class="fr-actions">
                  <button class="btn-accept-friend" onclick="Social.acceptFriendRequest('${user.id}')">✓</button>
                  <button class="btn-reject-friend" onclick="Social.rejectFriendRequest('${user.id}')">✕</button>
                </div>
              </div>
            `).join('')}
          `;
          requestsContainer.classList.remove('hidden');
        } else {
          requestsContainer.classList.add('hidden');
        }
      }

      // Cargar amigos de Firebase y MongoDB, combinar sin duplicados
      const [firebaseFriends, backendFriends] = await Promise.all([
        window.FirebaseService?.getFriendsList?.().catch(() => []) || Promise.resolve([]),
        window.BackendService?.getFriendsList?.().catch(() => []) || Promise.resolve([])
      ]);
      const friendMap = new Map();
      [...firebaseFriends, ...backendFriends].forEach(f => friendMap.set(f.id, f));
      const friends = [...friendMap.values()].sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));

      // Enriquecer con avatares de MongoDB si hace falta
      const needsAvatar = friends.filter(f => !f.avatar);
      if (needsAvatar.length > 0 && window.BackendService?.getAvatarsByUids) {
        const avatarData = await window.BackendService.getAvatarsByUids(needsAvatar.map(f => f.id));
        friends.forEach(f => {
          const av = avatarData.find(a => a.id === f.id);
          if (av) {
            f.avatar = av.avatar || f.avatar || '';
            f.avatarColor = av.avatarColor || f.avatarColor || 'indigo';
            if (av.photoURL) f.photoURL = av.photoURL;
          }
        });
      }
      this.cachedFriends = friends;

      if (friends.length === 0) {
        container.innerHTML = `
          <div class="empty-friends">
            <span class="empty-icon">👥</span>
            <p>No tienes amigos aún</p>
            <p class="empty-hint">Comparte tu código o busca el de tus amigos</p>
          </div>
        `;
        return;
      }

      container.innerHTML = friends.map((friend, index) => `
        <div class="friend-item" data-user-id="${friend.id}">
          <span class="friend-rank">#${index + 1}</span>
          <div class="friend-avatar">
            ${_renderAvatarHtml(friend.avatar, friend.avatarColor, friend.photoURL, 'friend-avatar')}
          </div>
          <div class="friend-info">
            <span class="friend-name">${this.escapeHtml(friend.displayName || 'Jugador')}</span>
            <span class="friend-stats">Nivel ${friend.level || 1} • ${(friend.totalPoints || 0).toLocaleString()} pts</span>
          </div>
          <div class="friend-actions">
            <button class="btn-challenge-friend" onclick="Social.startChallenge('${friend.id}', '${this.escapeHtml(friend.displayName || 'Jugador')}')">
              ⚔️ Retar
            </button>
            <button class="btn-remove-friend" onclick="Social.removeFriend('${friend.id}')" title="Eliminar amigo">
              🗑️
            </button>
          </div>
        </div>
      `).join('');

    } catch (error) {
      console.error('Error cargando amigos:', error);
      container.innerHTML = '<p class="error-state">Error al cargar amigos</p>';
    }
  },

  // Cargar retos
  async loadChallenges() {
    const pendingContainer = document.getElementById('pending-challenges');
    const myContainer = document.getElementById('my-challenges');
    
    if (!pendingContainer || !myContainer) return;

    // Verificar que Firebase esté listo
    if (!window.FirebaseService?.isReady || !window.FirebaseService?.currentUser) {
      pendingContainer.innerHTML = '<p class="empty-challenges">Cargando...</p>';
      return;
    }

    pendingContainer.innerHTML = '<div class="loading-spinner">Cargando...</div>';
    myContainer.innerHTML = '';

    const categoryNames = {
      'random': '🎲 Aleatorio',
      'antiguo-testamento': '📜 AT',
      'nuevo-testamento': '✝️ NT',
      'personajes': '👤 Personajes',
      'lugares': '🗺️ Lugares',
      'milagros': '✨ Milagros',
      'parabolas': '📖 Parábolas',
      'profetas': '🔮 Profetas',
      'reyes': '👑 Reyes',
      'salmos-proverbios': '🎵 Salmos'
    };
    const difficultyIcons = {
      'random': '🎲',
      'facil': '🟢',
      'intermedio': '🟡',
      'dificil': '🔴',
      'experto': '⚫'
    };

    try {
      // ====================================
      // 1. Retos recibidos pendientes de aceptar
      // ====================================
      const pendingChallenges = await window.FirebaseService.getPendingChallenges();

      // ====================================
      // 2. Retos recibidos activos (ya acepté, debo jugar o ver resultados)
      // ====================================
      const activeReceivedChallenges = await window.FirebaseService.getActiveReceivedChallenges();
      
      // Renderizar retos recibidos
      let pendingHTML = '';
      
      if (pendingChallenges.length > 0) {
        pendingHTML += `
          <h4 class="challenges-subtitle">🔔 Nuevos Retos</h4>
          ${pendingChallenges.map(challenge => {
            const catName = categoryNames[challenge.category] || challenge.category;
            const diffIcon = difficultyIcons[challenge.difficulty] || '🎲';
            return `
              <div class="challenge-item pending" data-challenge-id="${challenge.id}">
                <div class="challenge-info">
                  <span class="challenge-from">De: <strong>${this.escapeHtml(challenge.creatorName)}</strong></span>
                  <span class="challenge-details">${challenge.questionsCount}P • ${catName} • ${diffIcon}</span>
                </div>
                <div class="challenge-actions">
                  <button class="btn-accept-challenge" onclick="Social.acceptChallenge('${challenge.id}')">✓ Aceptar</button>
                  <button class="btn-reject-challenge" onclick="Social.rejectChallenge('${challenge.id}')">✕</button>
                </div>
              </div>
            `;
          }).join('')}
        `;
      }
      
      // Retos recibidos activos (donde debo jugar o ya jugué)
      const myActiveReceived = activeReceivedChallenges.filter(c => 
        c.status === 'active' && c.opponentScore === null
      );
      const myCompletedReceived = activeReceivedChallenges.filter(c => 
        c.status === 'completed' || (c.status === 'active' && c.opponentScore !== null)
      );
      
      if (myActiveReceived.length > 0) {
        pendingHTML += `
          <h4 class="challenges-subtitle">🎮 Por Jugar</h4>
          ${myActiveReceived.map(challenge => {
            const catName = categoryNames[challenge.category] || challenge.category;
            const diffIcon = difficultyIcons[challenge.difficulty] || '🎲';
            return `
              <div class="challenge-item active" data-challenge-id="${challenge.id}">
                <div class="challenge-info">
                  <span class="challenge-from">De: <strong>${this.escapeHtml(challenge.creatorName)}</strong></span>
                  <span class="challenge-details">${challenge.questionsCount}P • ${catName} • ${diffIcon}</span>
                  <span class="challenge-status">🎮 ¡Tu turno!</span>
                </div>
                <button class="btn-play-challenge" onclick="Social.playChallenge('${challenge.id}')">▶️ Jugar</button>
              </div>
            `;
          }).join('')}
        `;
      }
      
      if (pendingHTML === '') {
        pendingHTML = '<p class="empty-challenges">No tienes retos pendientes</p>';
      }
      pendingContainer.innerHTML = pendingHTML;

      // ====================================
      // 3. Mis retos enviados
      // ====================================
      const myChallenges = await window.FirebaseService.getMyChallenges();
      
      let myHTML = '';
      
      if (myChallenges.length > 0) {
        myHTML += `
          <h4 class="challenges-subtitle">📤 Mis Retos</h4>
          ${myChallenges.map(challenge => {
            const statusText = this.getChallengeStatus(challenge);
            const statusClass = challenge.status;
            const opponentName = this.getOpponentName(challenge);
            const catName = categoryNames[challenge.category] || challenge.category;
            const diffIcon = difficultyIcons[challenge.difficulty] || '🎲';
            const isTie = challenge.winner === 'tie';
            const isCreator = challenge.creatorId === window.FirebaseService?.currentUser?.uid;
            
            // Determinar si necesito jugar (soy creador y no he jugado)
            const needToPlay = challenge.status === 'active' && isCreator && challenge.creatorScore === null;
            
            return `
              <div class="challenge-item ${statusClass}" data-challenge-id="${challenge.id}">
                <div class="challenge-info">
                  <span class="challenge-opponent">vs <strong>${this.escapeHtml(opponentName)}</strong></span>
                  <span class="challenge-details">${challenge.questionsCount}P • ${catName} • ${diffIcon}</span>
                  <span class="challenge-status">${statusText}</span>
                </div>
                ${challenge.status === 'completed' ? `
                  <div class="challenge-result">
                    <span class="result-score">${challenge.creatorScore || 0} - ${challenge.opponentScore || 0}</span>
                    <span class="result-winner ${isTie ? 'tie' : (challenge.winner === window.FirebaseService?.currentUser?.uid ? 'won' : 'lost')}">
                      ${isTie ? '🤝 Empate' : (challenge.winner === window.FirebaseService?.currentUser?.uid ? '🏆 Ganaste' : '😔 Perdiste')}
                    </span>
                  </div>
                ` : needToPlay ? `
                  <button class="btn-play-challenge" onclick="Social.playChallenge('${challenge.id}')">▶️ Jugar</button>
                ` : ''}
              </div>
            `;
          }).join('')}
        `;
      }
      
      // También mostrar retos recibidos completados
      if (myCompletedReceived.length > 0) {
        myHTML += `
          <h4 class="challenges-subtitle">📥 Retos Recibidos</h4>
          ${myCompletedReceived.map(challenge => {
            const isTie = challenge.winner === 'tie';
            const catName = categoryNames[challenge.category] || challenge.category;
            const diffIcon = difficultyIcons[challenge.difficulty] || '🎲';
            const waitingOther = challenge.status === 'active' && challenge.creatorScore === null;
            
            return `
              <div class="challenge-item ${challenge.status}" data-challenge-id="${challenge.id}">
                <div class="challenge-info">
                  <span class="challenge-opponent">vs <strong>${this.escapeHtml(challenge.creatorName)}</strong></span>
                  <span class="challenge-details">${challenge.questionsCount}P • ${catName} • ${diffIcon}</span>
                  <span class="challenge-status">${waitingOther ? '⏳ Esperando oponente...' : '✅ Completado'}</span>
                </div>
                ${challenge.status === 'completed' ? `
                  <div class="challenge-result">
                    <span class="result-score">${challenge.creatorScore || 0} - ${challenge.opponentScore || 0}</span>
                    <span class="result-winner ${isTie ? 'tie' : (challenge.winner === window.FirebaseService?.currentUser?.uid ? 'won' : 'lost')}">
                      ${isTie ? '🤝 Empate' : (challenge.winner === window.FirebaseService?.currentUser?.uid ? '🏆 Ganaste' : '😔 Perdiste')}
                    </span>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        `;
      }
      
      myContainer.innerHTML = myHTML;

    } catch (error) {
      console.error('Error cargando retos:', error);
      pendingContainer.innerHTML = '<p class="error-state">Error al cargar retos</p>';
    }
  },

  // Obtener estado del reto
  getChallengeStatus(challenge) {
    const myId = window.FirebaseService?.currentUser?.uid;
    const isCreator = challenge.creatorId === myId;
    
    switch (challenge.status) {
      case 'pending':
        return '⏳ Esperando respuesta...';
      case 'active':
        if (isCreator && challenge.creatorScore !== null) {
          return '⏳ Esperando al oponente...';
        } else if (!isCreator && challenge.opponentScore !== null) {
          return '⏳ Esperando al creador...';
        }
        return '🎮 En progreso';
      case 'completed':
        return '✅ Completado';
      default:
        return challenge.status;
    }
  },

  // Obtener nombre del oponente
  getOpponentName(challenge) {
    // Usar opponentName si está disponible
    if (challenge.opponentName) {
      return challenge.opponentName;
    }
    // Fallback al ID
    return 'Jugador ' + challenge.opponentId.substring(0, 6);
  },

  // Buscar amigo por código
  async searchFriend() {
    const input = document.getElementById('input-friend-code');
    const resultContainer = document.getElementById('friend-search-result');
    
    if (!input || !resultContainer) return;

    const code = input.value.trim().toUpperCase();
    if (code.length !== 6) {
      this.showToast('El código debe tener 6 caracteres', 'error');
      return;
    }

    // Verificar que no sea mi propio código
    const myCode = window.FirebaseService?.userProfile?.friendCode || window.BackendService?.userProfile?.friendCode;
    if (code === myCode) {
      this.showToast('No puedes agregarte a ti mismo', 'error');
      return;
    }

    resultContainer.innerHTML = '<div class="loading-spinner">Buscando...</div>';
    resultContainer.classList.remove('hidden');

    try {
      // Buscar primero en Firebase, luego en MongoDB como fallback
      let user = window.FirebaseService ? await window.FirebaseService.findUserByCode(code) : null;
      let userSource = user ? 'firebase' : 'mongodb';
      if (!user && window.BackendService?.findUserByCode) {
        user = await window.BackendService.findUserByCode(code);
      }

      if (!user) {
        resultContainer.innerHTML = '<p class="search-error">No se encontró ningún usuario con ese código</p>';
        return;
      }

      // Verificar si ya es amigo (Firebase o backend)
      const isAlreadyFriend = window.FirebaseService?.userProfile?.friends?.includes(user.id)
        || (window.BackendService?.userProfile?.friends || []).includes(user.id);
      const hasPendingRequest = window.FirebaseService?.userProfile?.sentRequests?.includes(user.id)
        || (window.BackendService?.userProfile?.sentRequests || []).includes(user.id);

      resultContainer.innerHTML = `
        <div class="search-result-item">
          <div class="sr-avatar">
            ${_renderAvatarHtml(user.avatar, user.avatarColor, user.photoURL, 'sr-avatar')}
          </div>
          <div class="sr-info">
            <span class="sr-name">${this.escapeHtml(user.displayName || 'Jugador')}</span>
            <span class="sr-stats">Nivel ${user.level || 1} • ${(user.totalPoints || 0).toLocaleString()} pts</span>
          </div>
          ${isAlreadyFriend
            ? '<span class="sr-status already-friend">✓ Ya son amigos</span>'
            : hasPendingRequest
              ? '<span class="sr-status pending">⏳ Solicitud enviada</span>'
              : `<button class="btn-add-friend" onclick="Social.sendFriendRequest('${user.id}','${userSource}')">➕ Agregar</button>`
          }
        </div>
      `;

    } catch (error) {
      console.error('Error buscando usuario:', error);
      resultContainer.innerHTML = '<p class="search-error">Error al buscar usuario</p>';
    }
  },

  // Enviar solicitud de amistad
  async sendFriendRequest(userId, source = 'firebase') {
    let result;
    // Usar backend directamente si el usuario fue encontrado en MongoDB
    // o si no hay sesión Firebase activa
    const useBackend = source === 'mongodb' || !window.FirebaseService?.currentUser;
    if (!useBackend) {
      result = await window.FirebaseService.sendFriendRequest(userId);
    }
    // Fallback o uso directo del backend
    if (!result?.success && window.BackendService?.sendFriendRequest) {
      result = await window.BackendService.sendFriendRequest(userId);
    }
    
    if (result.success) {
      this.showToast('Solicitud enviada', 'success');
      // Actualizar UI
      const resultContainer = document.getElementById('friend-search-result');
      if (resultContainer) {
        const btn = resultContainer.querySelector('.btn-add-friend');
        if (btn) {
          btn.outerHTML = '<span class="sr-status pending">⏳ Solicitud enviada</span>';
        }
      }
    } else {
      this.showToast(result.error || 'Error al enviar solicitud', 'error');
    }
  },

  // Aceptar solicitud de amistad
  async acceptFriendRequest(userId) {
    let result = window.FirebaseService?.currentUser
      ? await window.FirebaseService.acceptFriendRequest(userId)
      : { success: false };
    if (!result?.success && window.BackendService?.acceptFriendRequest) {
      result = await window.BackendService.acceptFriendRequest(userId);
    }
    if (result?.success) {
      this.showToast('Amigo agregado', 'success');
      this.loadFriends();
      this.updateNotificationBadges();
    } else {
      this.showToast(result?.error || 'Error al aceptar solicitud', 'error');
    }
  },

  // Rechazar solicitud de amistad
  async rejectFriendRequest(userId) {
    let result = window.FirebaseService?.currentUser
      ? await window.FirebaseService.rejectFriendRequest(userId)
      : { success: false };
    if (!result?.success && window.BackendService?.rejectFriendRequest) {
      result = await window.BackendService.rejectFriendRequest(userId);
    }
    if (result?.success) {
      this.loadFriends();
      this.updateNotificationBadges();
    } else {
      this.showToast(result?.error || 'Error al rechazar solicitud', 'error');
    }
  },

  // Eliminar amigo
  async removeFriend(friendId) {
    if (!confirm('¿Estás seguro de eliminar a este amigo?')) return;
    
    if (!window.FirebaseService) return;
    const result = await window.FirebaseService.removeFriend(friendId);
    
    if (result.success) {
      this.showToast('Amigo eliminado', 'success');
      this.loadFriends();
    } else {
      this.showToast(result.error || 'Error al eliminar amigo', 'error');
    }
  },

  // Copiar mi código de amigo
  copyMyCode() {
    const code = window.FirebaseService?.userProfile?.friendCode;
    if (!code) return;

    navigator.clipboard.writeText(code).then(() => {
      this.showToast('Código copiado: ' + code, 'success');
    }).catch(() => {
      // Fallback
      const input = document.createElement('input');
      input.value = code;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      this.showToast('Código copiado: ' + code, 'success');
    });
  },

  // Vincular con Google
  async linkWithGoogle() {
    this.showToast('Guardando progreso antes de vincular...', 'info');
    
    // Guardar TODO el progreso antes de vincular para no perderlo
    if (window.FirebaseService?.isReady) {
      await window.FirebaseService.saveFullProgressToCloud();
    }

    this.showToast('Redirigiendo a Google...', 'info');
    if (!window.FirebaseService) return;
    const result = await window.FirebaseService.linkWithGoogle();
    
    // Con redirect, la página se recargará, este código solo se ejecuta si hay error
    if (!result.success && !result.pending) {
      this.showToast(result.error || 'Error al vincular cuenta', 'error');
    }
  },

  // Iniciar sesión con Google (para usuarios que ya tienen cuenta registrada)
  async signInWithGoogle() {
    this.showToast('Redirigiendo a Google...', 'info');
    if (!window.FirebaseService) return;
    const result = await window.FirebaseService.signInWithGoogle();
    
    // Con redirect, la página se recargará, este código solo se ejecuta si hay error
    if (!result.success && !result.pending) {
      this.showToast(result.error || 'Error al iniciar sesión', 'error');
    }
  },
  
  // Procesar resultados de redirect (login/vincular con Google)
  async processRedirectResults() {
    if (!window.FirebaseService) return;
    
    try {
      // Procesar resultado de vincular cuenta
      const linkResult = await window.FirebaseService.processLinkResult();
      if (linkResult) {
        if (linkResult.success) {
          this.showToast(linkResult.message || 'Cuenta vinculada con Google', 'success');

          // Recargar perfil y datos
          await window.FirebaseService.reloadProfile(true);
          
          this.updateUserInfo();
          await this.loadLeaderboard();
          await this.loadFriends();
          
          // Actualizar UI principal con los datos sincronizados
          if (window.App) {
            App.updateHomeUI();
          }
        } else {
          this.showToast(linkResult.error || 'Error al vincular cuenta', 'error');
        }
        return;
      }
      
      // Procesar resultado de login
      const signInResult = await window.FirebaseService.processSignInResult();
      if (signInResult) {
        if (signInResult.success) {
          this.showToast('¡Bienvenido de vuelta! Tu progreso ha sido restaurado.', 'success');

          // IMPORTANTE: Recargar perfil forzando sincronización desde la nube
          await window.FirebaseService.reloadProfile(true);
          
          this.updateUserInfo();
          await this.loadLeaderboard();
          await this.loadFriends();
          await this.loadChallenges();
          
          // Actualizar UI principal con los datos restaurados
          if (window.App) {
            App.updateHomeUI();
            // Mostrar resumen del progreso restaurado
            const stats = Storage.getStats();
            const badges = Storage.getBadges();
            const answered = Storage.getAnswered();
            console.log('[Social] Progreso restaurado:', {
              puntos: stats.totalPoints,
              partidas: stats.totalGames,
              insignias: badges.length,
              preguntasRespondidas: answered.length
            });
          }
        } else {
          this.showToast(signInResult.error || 'Error al iniciar sesión', 'error');
        }
      }
    } catch (e) {
      console.error('[Social] Error procesando redirect:', e);
    }
  },

  // Cambiar nombre de usuario
  async changeDisplayName() {
    const currentName = window.BackendService?.userProfile?.displayName
      || window.FirebaseService?.userProfile?.displayName
      || (typeof Storage !== 'undefined' ? Storage.getPlayer().name : '') || '';
    const newName = prompt('Ingresa tu nuevo nombre:', currentName);
    
    if (newName && newName.trim() && newName !== currentName) {
      if (!window.FirebaseService) return;
      const success = await window.FirebaseService.updateDisplayName(newName);
      
      if (success) {
        this.showToast('Nombre actualizado', 'success');
        this.updateUserInfo();
      } else {
        this.showToast('Error al actualizar nombre', 'error');
      }
    }
  },

  // Actualizar info del usuario en la UI
  updateUserInfo() {
    // Prioridad: BackendService (MongoDB) → Firebase → Storage local
    const backendProfile = window.BackendService?.userProfile;
    const firebaseProfile = window.FirebaseService?.userProfile;
    const localPlayer = typeof Storage !== 'undefined' ? Storage.getPlayer() : null;

    // Usar el perfil más completo disponible
    const profile = backendProfile || firebaseProfile;

    if (!profile && !localPlayer) {
      console.warn('[Social] No hay perfil disponible');
      return;
    }

    // Mi código (puede venir del perfil Firebase o backend)
    const myCodeEl = document.getElementById('my-friend-code');
    if (myCodeEl) {
      myCodeEl.textContent = profile?.friendCode || '------';
    }

    // Mi nombre — usa el nombre registrado, con fallback al nombre local
    const myNameEl = document.getElementById('my-display-name');
    if (myNameEl) {
      myNameEl.textContent = profile?.displayName || localPlayer?.name || 'Jugador';
    }

    // Mi avatar — reusa la misma función que funciona en configuración y progreso
    const myAvatarEl = document.getElementById('my-avatar');
    if (myAvatarEl && localPlayer) {
      if (window.App?.applyAvatarStyle) {
        window.App.applyAvatarStyle(myAvatarEl, localPlayer);
      } else {
        const displayName = profile?.displayName || localPlayer?.name || 'J';
        myAvatarEl.textContent = displayName[0].toUpperCase();
      }
    }

    // Hide Google auth buttons for MongoDB-authenticated users
    const linkGoogleBtn = document.getElementById('btn-link-google');
    const signInGoogleBtn = document.getElementById('btn-signin-google');
    const hasBackendAuth = !!localStorage.getItem('backend_token');

    if (linkGoogleBtn && signInGoogleBtn) {
      if (hasBackendAuth) {
        // MongoDB user — hide Google auth buttons
        linkGoogleBtn.classList.add('hidden');
        signInGoogleBtn.classList.add('hidden');
      } else if (!profile.isAnonymous) {
        linkGoogleBtn.textContent = '✓ Vinculado';
        linkGoogleBtn.disabled = true;
        linkGoogleBtn.classList.remove('hidden');
        signInGoogleBtn.classList.add('hidden');
      } else {
        linkGoogleBtn.textContent = '🔗 Vincular';
        linkGoogleBtn.disabled = false;
        linkGoogleBtn.classList.remove('hidden');
        signInGoogleBtn.classList.remove('hidden');
      }
    }
  },

  // Iniciar reto contra amigo - abre modal de configuración
  async startChallenge(friendId, friendName) {
    this.pendingChallengeTarget = { friendId, friendName };
    this.lastChallengeOpponent = { friendId, friendName };
    
    const modal = document.getElementById('challenge-config-modal');
    if (!modal) return;

    // Actualizar texto del oponente
    const opponentText = document.getElementById('challenge-opponent-text');
    if (opponentText) {
      opponentText.innerHTML = `Retar a: <strong>${this.escapeHtml(friendName)}</strong>`;
    }

    // Resetear opciones a valores por defecto
    document.getElementById('challenge-category').value = 'random';
    document.getElementById('challenge-difficulty').value = 'random';
    document.getElementById('challenge-questions-count').value = '10';

    // Mostrar modal
    modal.classList.remove('hidden');
  },

  // Cerrar modal de configuración
  closeChallengeConfig() {
    const modal = document.getElementById('challenge-config-modal');
    if (modal) modal.classList.add('hidden');
    this.pendingChallengeTarget = null;
  },

  // Enviar reto con configuración
  async sendConfiguredChallenge() {
    if (!this.pendingChallengeTarget) return;

    const { friendId, friendName } = this.pendingChallengeTarget;
    const category = document.getElementById('challenge-category').value;
    const difficulty = document.getElementById('challenge-difficulty').value;
    const questionsCount = parseInt(document.getElementById('challenge-questions-count').value);

    // Mostrar loading
    const btnSend = document.getElementById('btn-send-challenge');
    const originalText = btnSend.textContent;
    btnSend.textContent = 'Enviando...';
    btnSend.disabled = true;

    if (!window.FirebaseService) { btnSend.textContent = originalText; btnSend.disabled = false; return; }
    const result = await window.FirebaseService.createChallenge(friendId, category, difficulty, questionsCount);

    btnSend.textContent = originalText;
    btnSend.disabled = false;

    if (result.success) {
      this.showToast(`¡Reto enviado a ${friendName}!`, 'success');
      this.closeChallengeConfig();
      this.switchTab('challenges');
      this.loadChallenges();
    } else {
      this.showToast(result.error || 'Error al crear reto', 'error');
    }
  },

  // Aceptar reto
  async acceptChallenge(challengeId) {
    if (!window.FirebaseService) return;
    const result = await window.FirebaseService.acceptChallenge(challengeId);
    
    if (result.success) {
      this.showToast('Reto aceptado', 'success');
      // Iniciar partida del reto
      this.playChallenge(challengeId);
    } else {
      this.showToast(result.error || 'Error al aceptar reto', 'error');
    }
  },

  // Rechazar reto
  async rejectChallenge(challengeId) {
    if (!window.FirebaseService) return;
    const result = await window.FirebaseService.rejectChallenge(challengeId);
    
    if (result.success) {
      this.loadChallenges();
      this.updateNotificationBadges();
    } else {
      this.showToast(result.error || 'Error al rechazar reto', 'error');
    }
  },

  // Jugar reto
  async playChallenge(challengeId) {
    console.log('[Social] ========== JUGAR RETO ==========');
    console.log('[Social] challengeId:', challengeId);
    
    // Guardar el reto actual
    if (!window.FirebaseService) return;
    this.currentChallenge = await window.FirebaseService.getChallenge(challengeId);
    console.log('[Social] Challenge obtenido:', this.currentChallenge);
    
    if (!this.currentChallenge) {
      console.error('[Social] Reto no encontrado');
      this.showToast('Reto no encontrado', 'error');
      return;
    }
    
    // Verificar que tiene questionIds
    console.log('[Social] questionIds:', this.currentChallenge.questionIds);

    // Guardar oponente para posible revancha
    const isCreator = this.currentChallenge.creatorId === window.FirebaseService?.currentUser?.uid;
    this.lastChallengeOpponent = {
      friendId: isCreator ? this.currentChallenge.opponentId : this.currentChallenge.creatorId,
      friendName: isCreator ? this.currentChallenge.opponentName : this.currentChallenge.creatorName
    };
    console.log('[Social] isCreator:', isCreator);
    console.log('[Social] lastChallengeOpponent:', this.lastChallengeOpponent);

    // Cerrar pantalla social
    this.closeSocialScreen();
    
    // Iniciar partida en modo reto
    if (window.App) {
      console.log('[Social] Iniciando partida de reto...');
      App.startChallengeMode(this.currentChallenge);
    } else {
      console.error('[Social] App no disponible');
      this.showToast('Error al iniciar partida', 'error');
    }
  },

  // Finalizar reto y enviar resultado
  async finishChallenge(score, timeSpent, correctAnswers = 0) {
    if (!this.currentChallenge) return;

    if (!window.FirebaseService) return;
    const result = await window.FirebaseService.submitChallengeResult(
      this.currentChallenge.id,
      score,
      timeSpent,
      correctAnswers
    );

    if (result.success) {
      if (result.completed) {
        // Ambos jugadores completaron - mostrar resultados
        this.showChallengeResults(result);
      } else {
        this.showToast('✓ Resultado enviado. Esperando al oponente...', 'info');
      }
    }

    this.currentChallenge = null;
  },

  // Mostrar modal de resultados del reto
  showChallengeResults(result) {
    const modal = document.getElementById('challenge-results-modal');
    if (!modal) return;

    const isWinner = result.winner === window.FirebaseService?.currentUser?.uid;
    const isTie = result.winner === 'tie';
    
    // Banner del ganador
    const banner = document.getElementById('challenge-winner-banner');
    const winnerText = document.getElementById('challenge-winner-text');
    const winnerEmoji = banner.querySelector('.winner-emoji');
    
    banner.classList.remove('won', 'lost', 'tie');
    
    if (isTie) {
      banner.classList.add('tie');
      winnerEmoji.textContent = '🤝';
      winnerText.textContent = '¡Empate!';
    } else if (isWinner) {
      banner.classList.add('won');
      winnerEmoji.textContent = '🏆';
      winnerText.textContent = '¡Ganaste!';
    } else {
      banner.classList.add('lost');
      winnerEmoji.textContent = '😔';
      winnerText.textContent = 'Perdiste';
    }

    // Puntuaciones
    document.getElementById('result-my-score').textContent = result.myScore || 0;
    document.getElementById('result-opponent-score').textContent = result.opponentScore || 0;
    document.getElementById('result-opponent-name').textContent = this.lastChallengeOpponent?.friendName || 'Oponente';

    // Marcar ganador visualmente
    const myResult = document.querySelector('.result-me');
    const oppResult = document.querySelector('.result-opponent');
    myResult.classList.remove('winner');
    oppResult.classList.remove('winner');
    
    if (!isTie) {
      if (isWinner) {
        myResult.classList.add('winner');
      } else {
        oppResult.classList.add('winner');
      }
    }

    // Detalles
    const categoryNames = {
      'random': 'Aleatorio',
      'antiguo-testamento': 'Antiguo Testamento',
      'nuevo-testamento': 'Nuevo Testamento',
      'personajes': 'Personajes',
      'lugares': 'Lugares',
      'milagros': 'Milagros',
      'parabolas': 'Parábolas',
      'profetas': 'Profetas',
      'reyes': 'Reyes',
      'salmos-proverbios': 'Salmos y Proverbios'
    };
    const difficultyNames = {
      'random': 'Aleatorio',
      'facil': 'Fácil',
      'intermedio': 'Intermedio',
      'dificil': 'Difícil',
      'experto': 'Experto'
    };

    document.getElementById('result-category-text').textContent = 
      `Categoría: ${categoryNames[result.category] || result.category}`;
    document.getElementById('result-difficulty-text').textContent = 
      `Dificultad: ${difficultyNames[result.difficulty] || result.difficulty}`;

    // Mostrar modal
    modal.classList.remove('hidden');
  },

  // Cerrar modal de resultados
  closeResultsModal() {
    const modal = document.getElementById('challenge-results-modal');
    if (modal) modal.classList.add('hidden');
  },

  // Solicitar revancha (mismo config)
  async requestRematch() {
    if (!this.lastChallengeOpponent) {
      this.showToast('No hay oponente para revancha', 'error');
      return;
    }

    this.closeResultsModal();
    
    // Usar la misma configuración del último reto
    const { friendId, friendName } = this.lastChallengeOpponent;
    
    // Obtener configuración del último reto si está disponible
    const lastConfig = this.currentChallenge || {};
    const category = lastConfig.category || 'random';
    const difficulty = lastConfig.difficulty || 'random';
    const questionsCount = lastConfig.questionsCount || 10;

    if (!window.FirebaseService) return;
    const result = await window.FirebaseService.createChallenge(friendId, category, difficulty, questionsCount);

    if (result.success) {
      this.showToast(`¡Revancha enviada a ${friendName}!`, 'success');
    } else {
      this.showToast(result.error || 'Error al enviar revancha', 'error');
    }
  },

  // Abrir modal para nuevo reto con diferente configuración
  openNewChallengeConfig() {
    this.closeResultsModal();
    
    if (this.lastChallengeOpponent) {
      this.startChallenge(
        this.lastChallengeOpponent.friendId, 
        this.lastChallengeOpponent.friendName
      );
    }
  },

  // Actualizar badges de notificaciones
  async updateNotificationBadges() {
    const FB = window.FirebaseService;
    if (!FB) return;
    if (!FB.isReady) return;

    // Recargar perfil para obtener solicitudes actuales
    await FB.reloadProfile();

    const friendRequests = FB.userProfile?.friendRequests?.length || 0;
    
    // Badge en botón social principal (en home)
    const socialBadge = document.getElementById('social-notification-badge');
    if (socialBadge) {
      if (friendRequests > 0) {
        socialBadge.textContent = friendRequests;
        socialBadge.classList.remove('hidden');
      } else {
        socialBadge.classList.add('hidden');
      }
    }

    // Badge en pestaña de Amigos
    const friendsBadge = document.getElementById('friends-badge');
    if (friendsBadge) {
      if (friendRequests > 0) {
        friendsBadge.textContent = friendRequests;
        friendsBadge.classList.remove('hidden');
      } else {
        friendsBadge.classList.add('hidden');
      }
    }

    // Contar retos pendientes
    try {
      const pendingChallenges = await FB.getPendingChallenges();
      const challengeBadge = document.getElementById('challenges-badge');
      const totalPending = pendingChallenges.length;
      
      if (challengeBadge) {
        if (totalPending > 0) {
          challengeBadge.textContent = totalPending;
          challengeBadge.classList.remove('hidden');
        } else {
          challengeBadge.classList.add('hidden');
        }
      }
      
      // Actualizar badge principal con total
      const totalNotifications = friendRequests + totalPending;
      if (socialBadge) {
        if (totalNotifications > 0) {
          socialBadge.textContent = totalNotifications;
          socialBadge.classList.remove('hidden');
        } else {
          socialBadge.classList.add('hidden');
        }
      }
    } catch (e) {
      console.error('[Social] Error actualizando badges:', e);
    }
  },

  // Iniciar verificación periódica de notificaciones
  startNotificationPolling() {
    // Verificar cada 30 segundos
    setInterval(() => {
      this.updateNotificationBadges();
      
      // Si la pantalla social está abierta, también actualizar las listas
      const socialScreen = document.getElementById('social-screen');
      if (socialScreen && !socialScreen.classList.contains('hidden')) {
        console.log('[Social] Auto-actualizando datos...');
        // Actualizar según la pestaña activa
        if (this.currentTab === 'friends') {
          this.loadFriends();
        } else if (this.currentTab === 'challenges') {
          this.loadChallenges();
        } else if (this.currentTab === 'leaderboard') {
          this.loadLeaderboard();
        }
      }
    }, 30000);
  },

  // Mostrar toast
  showToast(message, type = 'info') {
    // Usar el sistema de toast existente si está disponible
    if (window.App && App.showToast) {
      App.showToast(message, type === 'error' ? 'danger' : type);
    } else {
      alert(message);
    }
  },

  // Escapar HTML para prevenir XSS
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Esperar un poco para que Firebase se inicialice primero
  setTimeout(() => {
    Social.init();
  }, 500);
});
