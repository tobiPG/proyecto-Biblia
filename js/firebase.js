// Firebase Configuration - BibliaQuiz
// Configuración e inicialización de Firebase usando compat version

const firebaseConfig = {
  apiKey: "AIzaSyA06c1-_1rlF_vpGRdK1L91PHmp8E53P60",
  authDomain: "proyecto-biblia-e0489.firebaseapp.com",
  projectId: "proyecto-biblia-e0489",
  storageBucket: "proyecto-biblia-e0489.firebasestorage.app",
  messagingSenderId: "1041693792411",
  appId: "1:1041693792411:web:0b9b138ec8b3207d6e4e3e",
  measurementId: "G-PYDYNQ7H9J"
};

// Módulo de Firebase
window.FirebaseService = {
  app: null,
  auth: null,
  db: null,
  currentUser: null,
  userProfile: null,
  isReady: false,
  listeners: [],
  _initPromise: null,
  _authResolved: false,
  _initRetries: 0,
  MAX_RETRIES: 3,

  // Inicializar Firebase
  async init() {
    if (this._initPromise) return this._initPromise;
    
    this._initPromise = new Promise(async (resolve) => {
      try {
        console.log('[Firebase] Iniciando inicialización...');
        
        // Esperar a que los scripts de Firebase se carguen con timeout
        const scriptsLoaded = await Promise.race([
          this._loadFirebaseScripts(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout cargando scripts')), 10000))
        ]).catch(err => {
          console.error('[Firebase] Error cargando scripts:', err);
          return false;
        });
        
        if (scriptsLoaded === false) {
          console.error('[Firebase] No se pudieron cargar los scripts');
          resolve(false);
          return;
        }
        
        // Inicializar app
        if (!firebase.apps.length) {
          this.app = firebase.initializeApp(firebaseConfig);
        } else {
          this.app = firebase.apps[0];
        }
        
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        
        console.log('[Firebase] App y servicios inicializados');
        
        // Configurar Firestore para manejar mejor la persistencia
        try {
          await this.db.enablePersistence({ synchronizeTabs: false }).catch((err) => {
            if (err.code === 'failed-precondition') {
              console.warn('[Firebase] Múltiples tabs abiertas, persistencia deshabilitada');
            } else if (err.code === 'unimplemented') {
              console.warn('[Firebase] Navegador no soporta persistencia');
            }
          });
        } catch (e) {
          console.warn('[Firebase] Error en persistencia Firestore:', e);
        }
        
        // IMPORTANTE: Establecer persistencia LOCAL para mantener la sesión
        try {
          await this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          console.log('[Firebase] Persistencia LOCAL configurada');
        } catch (persistError) {
          console.warn('[Firebase] Error configurando persistencia:', persistError);
        }
        
        // Verificar si hay resultado de redirect pendiente (login con Google)
        try {
          const redirectResult = await this.auth.getRedirectResult();
          if (redirectResult && redirectResult.user) {
            console.log('[Firebase] Redirect completado, usuario:', redirectResult.user.email);
            this._pendingRedirectResult = redirectResult;
            // Marcar que necesitamos recargar el perfil
            this._needsProfileReload = true;
          }
        } catch (redirectError) {
          console.warn('[Firebase] Error procesando redirect:', redirectError);
          // Si es credential-already-in-use, guardarlo para manejarlo después
          if (redirectError.code === 'auth/credential-already-in-use') {
            this._redirectError = redirectError;
          }
        }
        
        // Timeout para auth - si no se resuelve en 15 segundos, algo está mal
        const authTimeout = setTimeout(() => {
          if (!this._authResolved) {
            console.warn('[Firebase] Timeout esperando auth, intentando login anónimo forzado...');
            this.auth.signInAnonymously().catch(e => {
              console.error('[Firebase] Error en login anónimo forzado:', e);
              this.isReady = true;
              resolve(false);
            });
          }
        }, 15000);
        
        // Escuchar cambios de auth
        this.auth.onAuthStateChanged(async (user) => {
          console.log('[Firebase] onAuthStateChanged:', user ? `UID: ${user.uid}, isAnonymous: ${user.isAnonymous}` : 'sin usuario');
          
          if (user) {
            clearTimeout(authTimeout);
            this._authResolved = true;
            this.currentUser = user;
            
            try {
              await this.loadOrCreateProfile();
              console.log('[Firebase] Perfil cargado:', this.userProfile?.displayName);
            } catch (profileError) {
              console.error('[Firebase] Error cargando perfil:', profileError);
            }
            
            this.isReady = true;
            this.notifyListeners('auth', { user: this.userProfile });
            resolve(true);
          } else {
            // Solo login anónimo si no hay usuario previo
            console.log('[Firebase] No hay usuario guardado, creando sesión anónima...');
            try {
              await this.auth.signInAnonymously();
              // onAuthStateChanged se disparará de nuevo con el nuevo usuario
            } catch (error) {
              clearTimeout(authTimeout);
              console.error('[Firebase] Error en auth anónimo:', error);
              this.isReady = true;
              resolve(false);
            }
          }
        });
        
      } catch (error) {
        console.error('[Firebase] Error inicializando Firebase:', error);
        this.isReady = true;
        resolve(false);
      }
    });
    
    return this._initPromise;
  },

  // Reinicializar Firebase (útil si algo falla)
  async reinitialize() {
    console.log('[Firebase] Reinicializando...');
    this._initPromise = null;
    this._authResolved = false;
    this.isReady = false;
    this.currentUser = null;
    this.userProfile = null;
    return await this.init();
  },

  // Verificar y reconectar si es necesario
  async ensureConnection() {
    if (!this.isReady || !this.currentUser) {
      console.log('[Firebase] ensureConnection: no está listo, reinicializando...');
      return await this.reinitialize();
    }
    
    // Verificar que el usuario sigue autenticado
    const currentUser = this.auth?.currentUser;
    if (!currentUser) {
      console.log('[Firebase] ensureConnection: usuario perdido, reconectando...');
      return await this.reinitialize();
    }
    
    // Verificar que el perfil existe
    if (!this.userProfile) {
      console.log('[Firebase] ensureConnection: perfil no cargado, recargando...');
      await this.loadOrCreateProfile();
    }
    
    return this.isReady;
  },

  // Cargar scripts de Firebase dinámicamente
  _loadFirebaseScripts() {
    return new Promise((resolve, reject) => {
      // Si ya está cargado
      if (typeof firebase !== 'undefined' && firebase.firestore && firebase.auth) {
        console.log('[Firebase] Scripts ya cargados');
        resolve(true);
        return;
      }
      
      console.log('[Firebase] Cargando scripts de Firebase...');
      
      const loadScript = (src) => {
        return new Promise((res, rej) => {
          // Verificar si ya existe el script
          if (document.querySelector(`script[src="${src}"]`)) {
            res();
            return;
          }
          const script = document.createElement('script');
          script.src = src;
          script.async = false; // Cargar en orden
          script.onload = () => {
            console.log('[Firebase] Script cargado:', src);
            res();
          };
          script.onerror = () => {
            console.error('[Firebase] Error cargando script:', src);
            rej(new Error(`Error cargando ${src}`));
          };
          document.head.appendChild(script);
        });
      };
      
      // Cargar scripts en orden - Firebase 7.24.0 (muy estable)
      loadScript('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js')
        .then(() => loadScript('https://www.gstatic.com/firebasejs/7.24.0/firebase-auth.js'))
        .then(() => loadScript('https://www.gstatic.com/firebasejs/7.24.0/firebase-firestore.js'))
        .then(() => {
          console.log('[Firebase] Todos los scripts cargados');
          resolve(true);
        })
        .catch((err) => {
          console.error('[Firebase] Error en carga de scripts:', err);
          reject(err);
        });
    });
  },

  // Cargar o crear perfil de usuario
  async loadOrCreateProfile(forceReload = false) {
    if (!this.currentUser) return null;
    
    // Si ya tenemos perfil y no es forzado, usarlo
    if (this.userProfile && this.userProfile.id === this.currentUser.uid && !forceReload) {
      console.log('[Firebase] Usando perfil en caché para:', this.currentUser.uid);
      return this.userProfile;
    }
    
    console.log('[Firebase] Cargando perfil para UID:', this.currentUser.uid, forceReload ? '(forzado)' : '');
    
    try {
      const userRef = this.db.collection('users').doc(this.currentUser.uid);
      // Forzar lectura del servidor si es recarga forzada
      const userSnap = forceReload 
        ? await userRef.get({ source: 'server' })
        : await userRef.get();
      
      if (userSnap.exists) {
        this.userProfile = { id: this.currentUser.uid, ...userSnap.data() };
        console.log('[Firebase] Perfil cargado - Amigos:', this.userProfile.friends?.length || 0, 'Monedas:', this.userProfile.coins || 0);
        // If name looks auto-generated, update with MongoDB backend name
        await this.syncDisplayNameFromBackend();
        // Sincronizar datos locales con Firebase (forzar si es recarga)
        await this.syncLocalDataFromCloud(forceReload);
      } else {
        // Crear nuevo perfil con datos locales existentes
        const localCoins = typeof Storage !== 'undefined' ? Storage.getCoins() : { total: 0, earned: 0, spent: 0, multiplier: 1 };
        const localStats = typeof Storage !== 'undefined' ? Storage.getStats() : {};
        const localPlayer = typeof Storage !== 'undefined' ? Storage.getPlayer() : {};
        const backendUserData = JSON.parse(localStorage.getItem('backend_user') || '{}');

        const newProfile = {
          displayName: this.currentUser.displayName || backendUserData.displayName || localPlayer.name || `Jugador${Math.floor(Math.random() * 9999)}`,
          photoURL: this.currentUser.photoURL || null,
          totalPoints: localStats.totalPoints || 0,
          totalCorrect: localStats.totalCorrect || 0,
          totalGames: localStats.totalGames || 0,
          bestStreak: localStats.bestStreak || 0,
          level: localPlayer.level || 1,
          xp: localPlayer.xp || 0,
          coins: localCoins.total || 0,
          coinsEarned: localCoins.earned || 0,
          coinsSpent: localCoins.spent || 0,
          coinMultiplier: localCoins.multiplier || 1,
          friendCode: this.generateFriendCode(),
          friends: [],
          friendRequests: [],
          sentRequests: [],
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          lastActive: firebase.firestore.FieldValue.serverTimestamp(),
          isAnonymous: this.currentUser.isAnonymous
        };
        await userRef.set(newProfile);
        this.userProfile = { id: this.currentUser.uid, ...newProfile };
      }
      
      return this.userProfile;
    } catch (error) {
      console.error('Error cargando perfil:', error);
      return null;
    }
  },
  
  // Sincronizar datos de la nube al local
  // forceFromCloud: true = siempre usar datos de la nube (después de login con Google)
  async syncLocalDataFromCloud(forceFromCloud = false) {
    if (!this.userProfile) return;
    
    try {
      console.log('[Firebase] Sincronizando datos desde la nube...', forceFromCloud ? '(forzado)' : '');
      console.log('[Firebase] Datos del perfil - Monedas:', this.userProfile.coins, 'Amigos:', this.userProfile.friends?.length || 0);
      
      // Si es login forzado (Google), cargar TODOS los datos de la nube
      if (forceFromCloud) {
        console.log('[Firebase] Login con Google detectado, cargando progreso completo...');
        await this.loadFullProgressFromCloud();
      }
      
      // Sincronizar monedas
      if (typeof Storage !== 'undefined') {
        const localCoins = Storage.getCoins();
        const cloudCoins = this.userProfile.coins || 0;
        
        // Si es forzado o la nube tiene más monedas, usar datos de la nube
        if (forceFromCloud || cloudCoins > localCoins.total) {
          console.log('[Firebase] Restaurando monedas desde nube:', cloudCoins, '(local tenía:', localCoins.total + ')');
          Storage.saveCoins({
            total: cloudCoins,
            earned: this.userProfile.coinsEarned || cloudCoins,
            spent: this.userProfile.coinsSpent || 0,
            multiplier: this.userProfile.coinMultiplier || 1,
            perfectStreakPhases: 0
          });
        } else if (localCoins.total > cloudCoins && !forceFromCloud) {
          // Si local tiene más (y no es forzado), guardar en la nube
          console.log('[Firebase] Guardando monedas locales en nube:', localCoins.total);
          await this.syncCoinsToCloud(localCoins);
        }
        
        // Sincronizar estadísticas y nivel
        const localPlayer = Storage.getPlayer();
        if (forceFromCloud || this.userProfile.level > localPlayer.level || this.userProfile.xp > localPlayer.xp) {
          localPlayer.level = this.userProfile.level || localPlayer.level || 1;
          localPlayer.xp = this.userProfile.xp || localPlayer.xp || 0;
          localPlayer.name = this.userProfile.displayName || localPlayer.name;
          Storage.savePlayer(localPlayer);
          console.log('[Firebase] Nivel/XP restaurado desde nube:', localPlayer.level, localPlayer.xp);
        }
      }
      
      console.log('[Firebase] Sincronización completada');
    } catch (error) {
      console.error('[Firebase] Error sincronizando datos:', error);
    }
  },
  
  // Guardar monedas en la nube
  async syncCoinsToCloud(coinsData) {
    if (!this.currentUser) return false;
    
    try {
      const userRef = this.db.collection('users').doc(this.currentUser.uid);
      await userRef.update({
        coins: coinsData.total || 0,
        coinsEarned: coinsData.earned || 0,
        coinsSpent: coinsData.spent || 0,
        coinMultiplier: coinsData.multiplier || 1,
        lastActive: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      // Actualizar perfil local
      this.userProfile.coins = coinsData.total;
      this.userProfile.coinsEarned = coinsData.earned;
      this.userProfile.coinsSpent = coinsData.spent;
      this.userProfile.coinMultiplier = coinsData.multiplier;
      
      console.log('[Firebase] Monedas sincronizadas:', coinsData.total);
      return true;
    } catch (error) {
      console.error('[Firebase] Error guardando monedas:', error);
      return false;
    }
  },
  
  // Sincronizar progreso general (nivel, XP, stats)
  async syncProgressToCloud() {
    if (!this.currentUser || typeof Storage === 'undefined') return false;
    
    try {
      const player = Storage.getPlayer();
      const stats = Storage.getStats();
      const coins = Storage.getCoins();
      
      const userRef = this.db.collection('users').doc(this.currentUser.uid);
      await userRef.update({
        level: player.level || 1,
        xp: player.xp || 0,
        totalPoints: stats.totalPoints || 0,
        totalCorrect: stats.totalCorrect || 0,
        totalGames: stats.totalGames || 0,
        bestStreak: stats.bestStreak || 0,
        coins: coins.total || 0,
        coinsEarned: coins.earned || 0,
        coinsSpent: coins.spent || 0,
        lastActive: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      console.log('[Firebase] Progreso sincronizado con la nube');
      return true;
    } catch (error) {
      console.error('[Firebase] Error sincronizando progreso:', error);
      return false;
    }
  },

  // Recargar perfil desde Firestore (forzado desde servidor)
  // forceSync: true = forzar sincronización de datos desde la nube
  async reloadProfile(forceSync = false) {
    if (!this.currentUser) return null;
    
    try {
      const userRef = this.db.collection('users').doc(this.currentUser.uid);
      // Forzar lectura desde servidor, no desde caché
      const userSnap = await userRef.get({ source: 'server' });
      
      if (userSnap.exists) {
        this.userProfile = { id: this.currentUser.uid, ...userSnap.data() };
        console.log('[Firebase] Perfil recargado desde servidor:', this.userProfile.displayName);
        console.log('[Firebase] Amigos:', this.userProfile.friends?.length || 0);
        console.log('[Firebase] Monedas:', this.userProfile.coins || 0);
        // Sincronizar datos locales
        await this.syncLocalDataFromCloud(forceSync);
      }
      
      return this.userProfile;
    } catch (error) {
      console.error('Error recargando perfil:', error);
      // Intentar desde caché si falla el servidor
      try {
        const userSnap = await this.db.collection('users').doc(this.currentUser.uid).get();
        if (userSnap.exists) {
          this.userProfile = { id: this.currentUser.uid, ...userSnap.data() };
          await this.syncLocalDataFromCloud(forceSync);
        }
      } catch (e) {}
      return this.userProfile;
    }
  },

  // Sync displayName from MongoDB backend if current name is auto-generated
  async syncDisplayNameFromBackend() {
    if (!this.currentUser || !this.userProfile) return;
    try {
      const backendUser = JSON.parse(localStorage.getItem('backend_user') || '{}');
      if (!backendUser.displayName) return;
      const current = this.userProfile.displayName || '';
      const isAutoGenerated = !current || /^Jugador\d+$/.test(current);
      if (isAutoGenerated && backendUser.displayName !== current) {
        const userRef = this.db.collection('users').doc(this.currentUser.uid);
        await userRef.update({ displayName: backendUser.displayName });
        this.userProfile.displayName = backendUser.displayName;
        console.log('[Firebase] Nombre actualizado desde backend:', backendUser.displayName);
      }
    } catch (e) {
      console.warn('[Firebase] Error sincronizando nombre:', e);
    }
  },

  // Generar código de amigo único
  generateFriendCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  },

  // Vincular cuenta anónima con Google
  async linkWithGoogle() {
    if (!this.currentUser) return { success: false, error: 'No hay usuario' };
    
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      
      // Guardar que estamos en proceso de vincular
      localStorage.setItem('firebase_linking', 'true');
      
      // Usar redirect en lugar de popup para evitar errores COOP
      await this.auth.currentUser.linkWithRedirect(provider);
      
      // Esta línea no se ejecutará porque la página se recargará
      return { success: true, pending: true };
    } catch (error) {
      localStorage.removeItem('firebase_linking');
      console.error('[Firebase] Error iniciando vinculación:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Procesar resultado de vincular después del redirect
  async processLinkResult() {
    const wasLinking = localStorage.getItem('firebase_linking');
    localStorage.removeItem('firebase_linking');
    
    if (!wasLinking) return null;
    
    // Verificar si hubo error de credencial ya en uso
    if (this._redirectError && this._redirectError.code === 'auth/credential-already-in-use') {
      console.log('[Firebase] Cuenta ya existe, intentando login directo...');
      try {
        const credential = this._redirectError.credential;
        if (credential) {
          const result = await this.auth.signInWithCredential(credential);
          await this.loadOrCreateProfile(true); // Forzar recarga
          return { 
            success: true, 
            user: result.user, 
            message: 'Sesión iniciada con tu cuenta de Google existente'
          };
        }
      } catch (signInError) {
        console.error('[Firebase] Error en login tras vincular:', signInError);
      }
      return { success: false, error: 'Esta cuenta de Google ya está registrada. Usa "Iniciar sesión con Google" en lugar de vincular.' };
    }
    
    // Si el redirect fue exitoso, el usuario ya está actualizado
    if (this.currentUser && !this.currentUser.isAnonymous) {
      // Actualizar perfil en Firestore
      try {
        const userRef = this.db.collection('users').doc(this.currentUser.uid);
        await userRef.update({
          displayName: this.currentUser.displayName,
          photoURL: this.currentUser.photoURL,
          isAnonymous: false,
          email: this.currentUser.email || null
        });
        
        // Forzar recarga del perfil completo
        await this.loadOrCreateProfile(true);
        
        // Notificar a todos los listeners que el usuario cambió
        this.notifyListeners('auth', { user: this.userProfile });
        
        console.log('[Firebase] Cuenta vinculada exitosamente');
        return { success: true, user: this.currentUser };
      } catch (e) {
        console.error('[Firebase] Error actualizando perfil:', e);
      }
    }
    
    return null;
  },

  // Login directo con Google (para usuarios que ya tienen cuenta)
  async signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      // Forzar selección de cuenta para evitar problemas
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      
      // Guardar que estamos en proceso de login
      localStorage.setItem('firebase_signing_in', 'true');
      
      // Usar redirect en lugar de popup para evitar errores COOP
      await this.auth.signInWithRedirect(provider);
      
      // Esta línea no se ejecutará porque la página se recargará
      return { success: true, pending: true };
    } catch (error) {
      localStorage.removeItem('firebase_signing_in');
      console.error('[Firebase] Error iniciando login con Google:', error);
      return { success: false, error: error.message };
    }
  },
  
  // Procesar resultado de login después del redirect  
  async processSignInResult() {
    const wasSigningIn = localStorage.getItem('firebase_signing_in');
    localStorage.removeItem('firebase_signing_in');
    
    if (!wasSigningIn) return null;
    
    // Si hay usuario después del redirect, el login fue exitoso
    if (this.currentUser) {
      console.log('[Firebase] Procesando login con Google, usuario:', this.currentUser.email || this.currentUser.uid);
      
      // IMPORTANTE: Forzar recarga del perfil desde Firestore
      // para obtener los datos correctos de la cuenta de Google
      try {
        await this.loadOrCreateProfile(true); // true = forzar recarga
        console.log('[Firebase] Perfil recargado:', this.userProfile);
        
        // Notificar a todos los listeners que el usuario cambió
        this.notifyListeners('auth', { user: this.userProfile });
      } catch (e) {
        console.error('[Firebase] Error recargando perfil:', e);
      }
      
      return { success: true, user: this.currentUser, profile: this.userProfile };
    }
    
    return null;
  },

  // Actualizar nombre de usuario
  async updateDisplayName(newName) {
    if (!this.currentUser || !newName.trim()) return false;
    
    try {
      const userRef = this.db.collection('users').doc(this.currentUser.uid);
      await userRef.update({ displayName: newName.trim() });
      this.userProfile.displayName = newName.trim();
      return true;
    } catch (error) {
      console.error('Error actualizando nombre:', error);
      return false;
    }
  },

  // Actualizar estadísticas del usuario
  async updateStats(stats) {
    if (!this.currentUser) return false;
    
    try {
      const userRef = this.db.collection('users').doc(this.currentUser.uid);
      
      const newTotalPoints = (this.userProfile.totalPoints || 0) + (stats.points || 0);
      const newLevel = Math.floor(newTotalPoints / 500) + 1;
      
      await userRef.update({
        totalPoints: firebase.firestore.FieldValue.increment(stats.points || 0),
        totalCorrect: firebase.firestore.FieldValue.increment(stats.totalCorrect || 0),
        totalGames: firebase.firestore.FieldValue.increment(stats.totalGames || 0),
        bestStreak: Math.max(this.userProfile.bestStreak || 0, stats.streak || 0),
        level: newLevel,
        lastActive: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      this.userProfile.totalPoints = newTotalPoints;
      this.userProfile.totalCorrect = (this.userProfile.totalCorrect || 0) + (stats.totalCorrect || 0);
      this.userProfile.totalGames = (this.userProfile.totalGames || 0) + (stats.totalGames || 0);
      this.userProfile.level = newLevel;
      
      return true;
    } catch (error) {
      console.error('Error actualizando stats:', error);
      return false;
    }
  },

  // Obtener tabla de clasificación global
  async getLeaderboard(limitCount = 50) {
    console.log('[Firebase] getLeaderboard llamado');
    try {
      // Traemos extra para deduplicar nombres repetidos
      const snapshot = await this.db.collection('users')
        .orderBy('totalPoints', 'desc')
        .limit(limitCount * 3)
        .get();

      console.log('[Firebase] snapshot obtenido, size:', snapshot.size);

      // Deduplicar por displayName: si hay dos cuentas con el mismo nombre
      // (ej: anónima del cel + real del PC), conservar la de mayor puntuación
      const seen = new Map();
      snapshot.forEach((doc) => {
        const data = doc.data();
        const name = (data.displayName || '').trim();
        if (!name) return; // ignorar cuentas sin nombre
        const existing = seen.get(name);
        if (!existing || (data.totalPoints || 0) > (existing.totalPoints || 0)) {
          seen.set(name, { id: doc.id, ...data });
        }
      });

      return Array.from(seen.values())
        .sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0))
        .slice(0, limitCount);
    } catch (error) {
      console.error('[Firebase] Error obteniendo leaderboard:', error);
      return [];
    }
  },

  // Buscar usuario por código de amigo
  async findUserByCode(code) {
    try {
      const snapshot = await this.db.collection('users')
        .where('friendCode', '==', code.toUpperCase())
        .get();
      
      if (snapshot.empty) return null;
      
      const userDoc = snapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() };
    } catch (error) {
      console.error('Error buscando usuario:', error);
      return null;
    }
  },

  // Enviar solicitud de amistad
  async sendFriendRequest(targetUserId) {
    if (!this.currentUser || targetUserId === this.currentUser.uid) return false;
    
    try {
      // Verificar si ya son amigos
      if (this.userProfile.friends?.includes(targetUserId)) {
        return { success: false, error: 'Ya son amigos' };
      }
      
      // Verificar si ya hay solicitud pendiente
      if (this.userProfile.sentRequests?.includes(targetUserId)) {
        return { success: false, error: 'Solicitud ya enviada' };
      }
      
      const targetRef = this.db.collection('users').doc(targetUserId);
      const myRef = this.db.collection('users').doc(this.currentUser.uid);
      
      // Agregar solicitud al destinatario
      await targetRef.update({
        friendRequests: firebase.firestore.FieldValue.arrayUnion(this.currentUser.uid)
      });
      
      // Registrar solicitud enviada
      await myRef.update({
        sentRequests: firebase.firestore.FieldValue.arrayUnion(targetUserId)
      });
      
      this.userProfile.sentRequests = [...(this.userProfile.sentRequests || []), targetUserId];
      
      return { success: true };
    } catch (error) {
      console.error('Error enviando solicitud:', error);
      return { success: false, error: error.message };
    }
  },

  // Aceptar solicitud de amistad
  async acceptFriendRequest(fromUserId) {
    if (!this.currentUser) return false;
    
    try {
      const myRef = this.db.collection('users').doc(this.currentUser.uid);
      const fromRef = this.db.collection('users').doc(fromUserId);
      
      // Agregar a amigos mutuamente
      await myRef.update({
        friends: firebase.firestore.FieldValue.arrayUnion(fromUserId),
        friendRequests: firebase.firestore.FieldValue.arrayRemove(fromUserId)
      });
      
      await fromRef.update({
        friends: firebase.firestore.FieldValue.arrayUnion(this.currentUser.uid),
        sentRequests: firebase.firestore.FieldValue.arrayRemove(this.currentUser.uid)
      });
      
      this.userProfile.friends = [...(this.userProfile.friends || []), fromUserId];
      this.userProfile.friendRequests = (this.userProfile.friendRequests || []).filter(id => id !== fromUserId);
      
      return { success: true };
    } catch (error) {
      console.error('Error aceptando solicitud:', error);
      return { success: false, error: error.message };
    }
  },

  // Rechazar solicitud de amistad
  async rejectFriendRequest(fromUserId) {
    if (!this.currentUser) return false;
    
    try {
      const myRef = this.db.collection('users').doc(this.currentUser.uid);
      const fromRef = this.db.collection('users').doc(fromUserId);
      
      await myRef.update({
        friendRequests: firebase.firestore.FieldValue.arrayRemove(fromUserId)
      });
      
      await fromRef.update({
        sentRequests: firebase.firestore.FieldValue.arrayRemove(this.currentUser.uid)
      });
      
      this.userProfile.friendRequests = (this.userProfile.friendRequests || []).filter(id => id !== fromUserId);
      
      return { success: true };
    } catch (error) {
      console.error('Error rechazando solicitud:', error);
      return { success: false, error: error.message };
    }
  },

  // Eliminar amigo
  async removeFriend(friendId) {
    if (!this.currentUser) return false;
    
    try {
      const myRef = this.db.collection('users').doc(this.currentUser.uid);
      const friendRef = this.db.collection('users').doc(friendId);
      
      await myRef.update({
        friends: firebase.firestore.FieldValue.arrayRemove(friendId)
      });
      
      await friendRef.update({
        friends: firebase.firestore.FieldValue.arrayRemove(this.currentUser.uid)
      });
      
      this.userProfile.friends = (this.userProfile.friends || []).filter(id => id !== friendId);
      
      return { success: true };
    } catch (error) {
      console.error('Error eliminando amigo:', error);
      return { success: false, error: error.message };
    }
  },

  // Obtener lista de amigos con datos
  async getFriendsList() {
    if (!this.currentUser || !this.userProfile || !this.userProfile.friends?.length) return [];
    
    try {
      const friends = [];
      for (const friendId of this.userProfile.friends) {
        const friendSnap = await this.db.collection('users').doc(friendId).get();
        if (friendSnap.exists) {
          friends.push({ id: friendId, ...friendSnap.data() });
        }
      }
      return friends.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
    } catch (error) {
      console.error('Error obteniendo amigos:', error);
      return [];
    }
  },

  // Obtener solicitudes de amistad pendientes
  async getPendingRequests() {
    if (!this.currentUser || !this.userProfile || !this.userProfile.friendRequests?.length) return [];
    
    try {
      const requests = [];
      for (const requesterId of this.userProfile.friendRequests) {
        const requesterSnap = await this.db.collection('users').doc(requesterId).get();
        if (requesterSnap.exists) {
          requests.push({ id: requesterId, ...requesterSnap.data() });
        }
      }
      return requests;
    } catch (error) {
      console.error('Error obteniendo solicitudes:', error);
      return [];
    }
  },

  // Crear un reto
  async createChallenge(friendId, category = 'random', difficulty = 'random', questionsCount = 10) {
    if (!this.currentUser) return { success: false, error: 'No autenticado' };
    
    try {
      // Obtener nombre del oponente
      const opponentDoc = await this.db.collection('users').doc(friendId).get();
      const opponentName = opponentDoc.exists ? opponentDoc.data().displayName : 'Jugador';
      
      // ============================================
      // GENERAR PREGUNTAS PARA EL RETO
      // Ambos jugadores contestarán las mismas preguntas
      // ============================================
      let questionIds = [];
      
      if (typeof QUESTIONS_DB !== 'undefined' && QUESTIONS_DB.length > 0) {
        console.log('[Firebase] QUESTIONS_DB disponible con', QUESTIONS_DB.length, 'preguntas');
        let pool = [...QUESTIONS_DB];
        
        // Filtrar por categoría
        if (category && category !== 'random') {
          const catFilter = category === 'aleatorio' ? null : category;
          if (catFilter) {
            pool = pool.filter(q => q.category === catFilter);
          }
        }
        
        // Filtrar por dificultad
        if (difficulty && difficulty !== 'random') {
          pool = pool.filter(q => q.difficulty === difficulty);
        }
        
        // Si no hay suficientes preguntas, expandir el pool
        if (pool.length < questionsCount) {
          pool = [...QUESTIONS_DB];
          if (category && category !== 'random' && category !== 'aleatorio') {
            pool = pool.filter(q => q.category === category);
          }
        }
        
        // Mezclar aleatoriamente
        pool = pool.sort(() => Math.random() - 0.5);
        
        // Tomar los IDs de las preguntas seleccionadas
        questionIds = pool.slice(0, questionsCount).map(q => q.id);
        console.log('[Firebase] Preguntas generadas para reto:', questionIds);
      } else {
        console.warn('[Firebase] QUESTIONS_DB no disponible, el reto no tendrá preguntas predefinidas');
      }
      
      const challengeRef = this.db.collection('challenges').doc();
      const challenge = {
        id: challengeRef.id,
        creatorId: this.currentUser.uid,
        creatorName: this.userProfile.displayName,
        opponentId: friendId,
        opponentName: opponentName,
        category,
        difficulty,
        questionsCount,
        questionIds, // <-- IDs de las preguntas que ambos contestarán
        status: 'pending',
        creatorScore: null,
        opponentScore: null,
        creatorTime: null,
        opponentTime: null,
        creatorCorrect: null,
        opponentCorrect: null,
        winner: null,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      };
      
      await challengeRef.set(challenge);
      
      return { success: true, challengeId: challengeRef.id };
    } catch (error) {
      console.error('Error creando reto:', error);
      return { success: false, error: error.message };
    }
  },

  // Obtener retos pendientes
  async getPendingChallenges() {
    if (!this.currentUser) return [];
    
    try {
      const snapshot = await this.db.collection('challenges')
        .where('opponentId', '==', this.currentUser.uid)
        .where('status', '==', 'pending')
        .get();
      
      const challenges = [];
      snapshot.forEach((doc) => {
        challenges.push({ id: doc.id, ...doc.data() });
      });
      return challenges;
    } catch (error) {
      console.error('Error obteniendo retos:', error);
      return [];
    }
  },

  // Obtener mis retos activos (enviados)
  async getMyChallenges() {
    if (!this.currentUser) return [];
    
    try {
      const snapshot = await this.db.collection('challenges')
        .where('creatorId', '==', this.currentUser.uid)
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get();
      
      const challenges = [];
      snapshot.forEach((doc) => {
        challenges.push({ id: doc.id, ...doc.data() });
      });
      return challenges;
    } catch (error) {
      console.error('Error obteniendo mis retos:', error);
      return [];
    }
  },

  // Obtener retos activos donde soy oponente (ya acepté, pendiente de jugar)
  async getActiveReceivedChallenges() {
    if (!this.currentUser) return [];
    
    try {
      // Hacer dos consultas separadas para evitar índice compuesto
      const [activeSnapshot, completedSnapshot] = await Promise.all([
        this.db.collection('challenges')
          .where('opponentId', '==', this.currentUser.uid)
          .where('status', '==', 'active')
          .get(),
        this.db.collection('challenges')
          .where('opponentId', '==', this.currentUser.uid)
          .where('status', '==', 'completed')
          .get()
      ]);
      
      const challenges = [];
      activeSnapshot.forEach((doc) => {
        challenges.push({ id: doc.id, ...doc.data() });
      });
      completedSnapshot.forEach((doc) => {
        challenges.push({ id: doc.id, ...doc.data() });
      });
      
      // Ordenar por fecha en JavaScript
      return challenges.sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(0);
        const dateB = b.createdAt?.toDate?.() || new Date(0);
        return dateB - dateA;
      }).slice(0, 20);
    } catch (error) {
      console.error('Error obteniendo retos recibidos activos:', error);
      return [];
    }
  },

  // Aceptar reto
  async acceptChallenge(challengeId) {
    try {
      await this.db.collection('challenges').doc(challengeId).update({
        status: 'active'
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Rechazar reto
  async rejectChallenge(challengeId) {
    try {
      await this.db.collection('challenges').doc(challengeId).delete();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Enviar resultado de reto
  async submitChallengeResult(challengeId, score, timeSpent, correctAnswers = 0) {
    if (!this.currentUser) return { success: false };
    
    try {
      const challengeRef = this.db.collection('challenges').doc(challengeId);
      const challengeSnap = await challengeRef.get();
      
      if (!challengeSnap.exists) {
        return { success: false, error: 'Reto no encontrado' };
      }
      
      const challenge = challengeSnap.data();
      const isCreator = challenge.creatorId === this.currentUser.uid;
      
      const updateData = isCreator 
        ? { creatorScore: score, creatorTime: timeSpent, creatorCorrect: correctAnswers }
        : { opponentScore: score, opponentTime: timeSpent, opponentCorrect: correctAnswers };
      
      // Verificar si ambos han jugado
      const otherScore = isCreator ? challenge.opponentScore : challenge.creatorScore;
      let resultData = { success: true, completed: false };
      
      if (otherScore !== null) {
        let winner = null;
        const myScore = score;
        
        if (myScore > otherScore) {
          winner = this.currentUser.uid;
        } else if (otherScore > myScore) {
          winner = isCreator ? challenge.opponentId : challenge.creatorId;
        } else {
          // Empate por puntos = EMPATE (sin desempate por tiempo)
          winner = 'tie';
        }
        
        updateData.status = 'completed';
        updateData.winner = winner;
        updateData.completedAt = firebase.firestore.FieldValue.serverTimestamp();
        
        // Preparar datos de resultado para mostrar
        resultData = {
          success: true,
          completed: true,
          winner: winner,
          myScore: score,
          opponentScore: otherScore,
          myTime: timeSpent,
          opponentTime: isCreator ? challenge.opponentTime : challenge.creatorTime,
          category: challenge.category,
          difficulty: challenge.difficulty,
          questionsCount: challenge.questionsCount
        };
      }
      
      await challengeRef.update(updateData);
      
      return resultData;
    } catch (error) {
      console.error('Error enviando resultado:', error);
      return { success: false, error: error.message };
    }
  },

  // Obtener un reto específico
  async getChallenge(challengeId) {
    try {
      const challengeSnap = await this.db.collection('challenges').doc(challengeId).get();
      if (challengeSnap.exists) {
        return { id: challengeId, ...challengeSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error obteniendo reto:', error);
      return null;
    }
  },

  // Escuchar cambios en un reto
  subscribeToChallenge(challengeId, callback) {
    return this.db.collection('challenges').doc(challengeId).onSnapshot((doc) => {
      if (doc.exists) {
        callback({ id: doc.id, ...doc.data() });
      }
    });
  },

  // Agregar listener de eventos
  onEvent(event, callback) {
    this.listeners.push({ event, callback });
  },

  // Notificar listeners
  notifyListeners(event, data) {
    this.listeners
      .filter(l => l.event === event)
      .forEach(l => l.callback(data));
  },

  // ============================================
  // LISTENERS EN TIEMPO REAL PARA RETOS
  // ============================================
  
  challengeListeners: [],
  
  // Iniciar escucha de retos en tiempo real
  startChallengeListeners() {
    if (!this.currentUser) return;
    
    // Limpiar listeners anteriores
    this.stopChallengeListeners();
    
    console.log('[Firebase] Iniciando listeners de retos en tiempo real...');
    
    // 1. Listener para RETOS RECIBIDOS (soy el oponente)
    const incomingListener = this.db.collection('challenges')
      .where('opponentId', '==', this.currentUser.uid)
      .where('status', '==', 'pending')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const challenge = { id: change.doc.id, ...change.doc.data() };
            console.log('[Firebase] ¡Nuevo reto recibido!', challenge);
            this.notifyListeners('newChallenge', challenge);
          }
        });
      }, (error) => {
        console.error('[Firebase] Error en listener de retos:', error);
      });
    
    this.challengeListeners.push(incomingListener);
    
    // 2. Listener para MIS RETOS ENVIADOS que fueron aceptados
    const acceptedListener = this.db.collection('challenges')
      .where('creatorId', '==', this.currentUser.uid)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'modified') {
            const challenge = { id: change.doc.id, ...change.doc.data() };
            // Si el reto cambió a 'active', el oponente lo aceptó
            if (challenge.status === 'active') {
              console.log('[Firebase] ¡Tu reto fue aceptado!', challenge);
              this.notifyListeners('challengeAccepted', challenge);
            }
            // Si el oponente ya jugó
            if (challenge.status === 'active' && challenge.opponentScore !== null && challenge.creatorScore === null) {
              console.log('[Firebase] ¡El oponente ya jugó! Tu turno.', challenge);
              this.notifyListeners('opponentPlayed', challenge);
            }
            // Si el reto está completado
            if (challenge.status === 'completed') {
              console.log('[Firebase] ¡Reto completado!', challenge);
              this.notifyListeners('challengeCompleted', challenge);
            }
          }
        });
      }, (error) => {
        console.error('[Firebase] Error en listener de retos enviados:', error);
      });
    
    this.challengeListeners.push(acceptedListener);
    
    // 3. Listener para retos donde soy oponente y cambian de estado
    const receivedChangesListener = this.db.collection('challenges')
      .where('opponentId', '==', this.currentUser.uid)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'modified') {
            const challenge = { id: change.doc.id, ...change.doc.data() };
            // Si el creador ya jugó y yo no
            if (challenge.status === 'active' && challenge.creatorScore !== null && challenge.opponentScore === null) {
              console.log('[Firebase] ¡El creador ya jugó! Tu turno.', challenge);
              this.notifyListeners('creatorPlayed', challenge);
            }
            // Si el reto está completado
            if (challenge.status === 'completed') {
              console.log('[Firebase] ¡Reto completado!', challenge);
              this.notifyListeners('challengeCompleted', challenge);
            }
          }
        });
      }, (error) => {
        console.error('[Firebase] Error en listener de retos recibidos:', error);
      });
    
    this.challengeListeners.push(receivedChangesListener);
  },
  
  // Detener listeners de retos
  stopChallengeListeners() {
    this.challengeListeners.forEach(unsubscribe => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    });
    this.challengeListeners = [];
  },

  // ============================================
  // SINCRONIZACIÓN COMPLETA DEL PROGRESO
  // ============================================

  // Guardar TODO el progreso del usuario en Firebase
  async saveFullProgressToCloud() {
    if (!this.currentUser || typeof Storage === 'undefined') {
      console.log('[Firebase] No se puede guardar progreso: sin usuario o Storage');
      return false;
    }
    
    try {
      console.log('[Firebase] Guardando progreso completo en la nube...');
      
      // Recopilar todos los datos locales
      const fullProgress = {
        // Datos del jugador
        player: Storage.getPlayer(),
        stats: Storage.getStats(),
        coins: Storage.getCoins(),
        
        // Historial y preguntas
        history: Storage.getHistory(),
        answered: Storage.getAnswered(),
        wrong: Storage.getWrongAnswers(),
        
        // Rachas y desafíos
        dailyStreak: Storage.getDailyStreak(),
        dailyChallenge: Storage.getDailyChallenge(),
        challengeRecords: Storage.getChallengeRecords(),
        
        // Estadísticas detalladas
        categoryStats: Storage.getCategoryStats(),
        speedStats: Storage.getSpeedStats(),
        categoryComplete: Storage.getCategoryComplete(),
        
        // Insignias y configuraciones
        badges: Storage.getBadges(),
        settings: Storage.getSettings(),
        
        // Versículos favoritos
        favoriteVerses: Storage.getFavoriteVerses(),
        
        // Vidas
        lives: Storage.getLives(),
        
        // Metadata
        lastSaved: new Date().toISOString(),
        version: 1
      };
      
      // Guardar en subcolección del usuario
      const progressRef = this.db.collection('users').doc(this.currentUser.uid)
                             .collection('progress').doc('fullData');
      
      await progressRef.set(fullProgress, { merge: true });
      
      console.log('[Firebase] Progreso completo guardado exitosamente');
      console.log('[Firebase] - Preguntas respondidas:', fullProgress.answered?.length || 0);
      console.log('[Firebase] - Insignias:', fullProgress.badges?.length || 0);
      console.log('[Firebase] - Racha días:', fullProgress.dailyStreak?.days || 0);
      
      return true;
    } catch (error) {
      console.error('[Firebase] Error guardando progreso completo:', error);
      return false;
    }
  },

  // Cargar TODO el progreso desde Firebase
  async loadFullProgressFromCloud() {
    if (!this.currentUser || typeof Storage === 'undefined') {
      console.log('[Firebase] No se puede cargar progreso: sin usuario o Storage');
      return false;
    }
    
    try {
      console.log('[Firebase] Cargando progreso completo desde la nube...');
      
      const progressRef = this.db.collection('users').doc(this.currentUser.uid)
                             .collection('progress').doc('fullData');
      
      const progressSnap = await progressRef.get({ source: 'server' });
      
      if (!progressSnap.exists) {
        console.log('[Firebase] No hay progreso guardado en la nube');
        return false;
      }
      
      const cloudData = progressSnap.data();
      console.log('[Firebase] Progreso encontrado, última sincronización:', cloudData.lastSaved);
      
      // Restaurar datos locales con los de la nube
      // Solo sobrescribir si hay datos válidos
      
      if (cloudData.player) {
        const currentPlayer = Storage.getPlayer();
        // Combinar datos, priorizando nube pero manteniendo lo que no existe
        Storage.savePlayer({ ...currentPlayer, ...cloudData.player });
      }
      
      if (cloudData.stats) {
        const currentStats = Storage.getStats();
        // Usar el mayor valor para estadísticas
        Storage.saveStats({
          totalPoints: Math.max(currentStats.totalPoints || 0, cloudData.stats.totalPoints || 0),
          totalCorrect: Math.max(currentStats.totalCorrect || 0, cloudData.stats.totalCorrect || 0),
          totalWrong: Math.max(currentStats.totalWrong || 0, cloudData.stats.totalWrong || 0),
          totalAnswered: Math.max(currentStats.totalAnswered || 0, cloudData.stats.totalAnswered || 0),
          totalGames: Math.max(currentStats.totalGames || 0, cloudData.stats.totalGames || 0),
          bestStreak: Math.max(currentStats.bestStreak || 0, cloudData.stats.bestStreak || 0),
          perfectGames: Math.max(currentStats.perfectGames || 0, cloudData.stats.perfectGames || 0),
          expertCorrect: Math.max(currentStats.expertCorrect || 0, cloudData.stats.expertCorrect || 0),
          categoriesPlayed: Math.max(currentStats.categoriesPlayed || 0, cloudData.stats.categoriesPlayed || 0),
          categoriesSet: cloudData.stats.categoriesSet || currentStats.categoriesSet || []
        });
      }
      
      if (cloudData.coins) {
        const currentCoins = Storage.getCoins();
        // Usar el mayor total de monedas
        if ((cloudData.coins.total || 0) >= (currentCoins.total || 0)) {
          Storage.saveCoins(cloudData.coins);
        }
      }
      
      // Historial: combinar sin duplicar
      if (cloudData.history && Array.isArray(cloudData.history)) {
        const currentHistory = Storage.getHistory();
        const combined = [...cloudData.history];
        currentHistory.forEach(local => {
          const exists = combined.some(cloud => 
            cloud.date === local.date && cloud.points === local.points
          );
          if (!exists) combined.push(local);
        });
        combined.sort((a, b) => new Date(b.date) - new Date(a.date));
        Storage.saveHistory(combined.slice(0, 50));
      }
      
      // Preguntas respondidas: combinar arrays
      if (cloudData.answered && Array.isArray(cloudData.answered)) {
        const currentAnswered = Storage.getAnswered();
        const combined = [...new Set([...cloudData.answered, ...currentAnswered])];
        Storage.saveAnswered(combined);
        console.log('[Firebase] Preguntas respondidas restauradas:', combined.length);
      }
      
      // Respuestas incorrectas
      if (cloudData.wrong && Array.isArray(cloudData.wrong)) {
        Storage.saveWrongAnswers(cloudData.wrong);
      }
      
      // Racha diaria
      if (cloudData.dailyStreak) {
        const currentStreak = Storage.getDailyStreak();
        // Usar la racha más alta
        if ((cloudData.dailyStreak.days || 0) >= (currentStreak.days || 0)) {
          Storage.saveDailyStreak(cloudData.dailyStreak);
        }
      }
      
      // Desafío diario
      if (cloudData.dailyChallenge) {
        Storage.saveDailyChallenge(cloudData.dailyChallenge);
      }
      
      // Récords de contrarreloj
      if (cloudData.challengeRecords) {
        const currentRecords = Storage.getChallengeRecords();
        const combined = { ...currentRecords };
        // Combinar, manteniendo el mejor récord de cada tipo
        Object.keys(cloudData.challengeRecords).forEach(key => {
          if (!combined[key] || 
              cloudData.challengeRecords[key].correct > combined[key].correct ||
              (cloudData.challengeRecords[key].correct === combined[key].correct && 
               cloudData.challengeRecords[key].points > combined[key].points)) {
            combined[key] = cloudData.challengeRecords[key];
          }
        });
        Storage.saveChallengeRecords(combined);
      }
      
      // Estadísticas por categoría
      if (cloudData.categoryStats) {
        const currentCatStats = Storage.getCategoryStats();
        const combined = { ...currentCatStats };
        Object.keys(cloudData.categoryStats).forEach(cat => {
          if (!combined[cat]) {
            combined[cat] = cloudData.categoryStats[cat];
          } else {
            combined[cat] = {
              correct: Math.max(combined[cat].correct || 0, cloudData.categoryStats[cat].correct || 0),
              wrong: Math.max(combined[cat].wrong || 0, cloudData.categoryStats[cat].wrong || 0),
              total: Math.max(combined[cat].total || 0, cloudData.categoryStats[cat].total || 0)
            };
          }
        });
        Storage.saveCategoryStats(combined);
      }
      
      // Estadísticas de velocidad
      if (cloudData.speedStats) {
        Storage.saveSpeedStats(cloudData.speedStats);
      }
      
      // Categorías completadas
      if (cloudData.categoryComplete) {
        Storage.saveCategoryComplete(cloudData.categoryComplete);
      }
      
      // Insignias: combinar sin duplicar
      if (cloudData.badges && Array.isArray(cloudData.badges)) {
        const currentBadges = Storage.getBadges();
        const combined = [...new Set([...cloudData.badges, ...currentBadges])];
        Storage.saveBadges(combined);
        console.log('[Firebase] Insignias restauradas:', combined.length);
      }
      
      // Configuraciones
      if (cloudData.settings) {
        Storage.saveSettings(cloudData.settings);
      }
      
      // Versículos favoritos
      if (cloudData.favoriteVerses && Array.isArray(cloudData.favoriteVerses)) {
        Storage.saveFavoriteVerses(cloudData.favoriteVerses);
        console.log('[Firebase] Versículos favoritos restaurados:', cloudData.favoriteVerses.length);
      }
      
      // Vidas: no sobrescribir si tiene más localmente
      if (cloudData.lives) {
        const currentLives = Storage.getLives();
        if ((cloudData.lives.lives || 0) > (currentLives.lives || 0)) {
          Storage.saveLives(cloudData.lives);
        }
      }
      
      console.log('[Firebase] Progreso completo restaurado exitosamente');
      return true;
    } catch (error) {
      console.error('[Firebase] Error cargando progreso completo:', error);
      return false;
    }
  },

  // Auto-guardar progreso (llamar periódicamente o después de partidas)
  _autoSaveTimeout: null,
  scheduleProgressSave() {
    // Debounce: esperar 5 segundos antes de guardar
    if (this._autoSaveTimeout) {
      clearTimeout(this._autoSaveTimeout);
    }
    this._autoSaveTimeout = setTimeout(() => {
      this.saveFullProgressToCloud();
    }, 5000);
  }
};

// Auto-inicializar cuando se cargue
document.addEventListener('DOMContentLoaded', () => {
  FirebaseService.init().then((success) => {
    if (success) {
      console.log('Firebase inicializado correctamente');
      // Iniciar listeners de retos en tiempo real
      FirebaseService.startChallengeListeners();
    } else {
      console.warn('Firebase no pudo inicializarse');
    }
  });
});

// Alias para compatibilidad
window.Firebase = window.FirebaseService;
