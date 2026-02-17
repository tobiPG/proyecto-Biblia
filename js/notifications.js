// ============================================================
// BibliaQuiz - Sistema de Notificaciones Push
// ============================================================

const PushNotifications = {
  // === CONFIGURACIÓN ===
  config: {
    // Recordatorios predeterminados
    dailyReminder: {
      enabled: false,
      hour: 9,
      minute: 0,
      title: '📖 ¡Hora de aprender!',
      body: 'Tu desafío diario te espera. ¿Cuánto sabes de la Biblia hoy?'
    },
    streakReminder: {
      enabled: true,
      hour: 20,
      minute: 0,
      title: '🔥 ¡No pierdas tu racha!',
      body: 'Juega hoy para mantener tu racha de {days} días.'
    },
    // VAPID key para Web Push (generar con web-push generate-vapid-keys)
    vapidPublicKey: 'YOUR_VAPID_PUBLIC_KEY_HERE'
  },

  // === ESTADO ===
  initialized: false,
  permission: 'default',
  subscription: null,
  scheduledNotifications: [],

  // === STORAGE KEYS ===
  STORAGE_KEYS: {
    PERMISSION: 'bibliaquiz_notif_permission',
    SETTINGS: 'bibliaquiz_notif_settings',
    SUBSCRIPTION: 'bibliaquiz_push_subscription'
  },

  // === INICIALIZACIÓN ===
  async init() {
    if (this.initialized) return;

    console.log('[Push] Inicializando sistema de notificaciones...');

    // Verificar soporte
    if (!this.isSupported()) {
      console.log('[Push] Notificaciones no soportadas en este navegador');
      return;
    }

    // Cargar configuración guardada
    this.loadSettings();

    // Verificar permiso actual
    this.permission = Notification.permission;

    // Si ya tiene permiso, configurar notificaciones
    if (this.permission === 'granted') {
      await this.setupNotifications();
    }

    this.initialized = true;
    console.log('[Push] Sistema inicializado. Permiso:', this.permission);
  },

  // === VERIFICAR SOPORTE ===
  isSupported() {
    return 'Notification' in window && 'serviceWorker' in navigator;
  },

  // === CARGAR/GUARDAR CONFIGURACIÓN ===
  loadSettings() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEYS.SETTINGS);
      if (saved) {
        const settings = JSON.parse(saved);
        this.config.dailyReminder = { ...this.config.dailyReminder, ...settings.dailyReminder };
        this.config.streakReminder = { ...this.config.streakReminder, ...settings.streakReminder };
      }
    } catch (e) {
      console.error('[Push] Error cargando configuración:', e);
    }
  },

  saveSettings() {
    try {
      const settings = {
        dailyReminder: this.config.dailyReminder,
        streakReminder: this.config.streakReminder
      };
      localStorage.setItem(this.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('[Push] Error guardando configuración:', e);
    }
  },

  // === SOLICITAR PERMISO ===
  async requestPermission() {
    if (!this.isSupported()) {
      return { success: false, error: 'No soportado' };
    }

    try {
      const permission = await Notification.requestPermission();
      this.permission = permission;

      if (permission === 'granted') {
        await this.setupNotifications();
        return { success: true, permission };
      } else {
        return { success: false, error: 'Permiso denegado', permission };
      }
    } catch (e) {
      console.error('[Push] Error solicitando permiso:', e);
      return { success: false, error: e.message };
    }
  },

  // === CONFIGURAR NOTIFICACIONES ===
  async setupNotifications() {
    // Registrar en Service Worker para push
    try {
      const registration = await navigator.serviceWorker.ready;
      
      // Suscribirse a push (si hay backend configurado)
      if (this.config.vapidPublicKey && this.config.vapidPublicKey !== 'YOUR_VAPID_PUBLIC_KEY_HERE') {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: this.urlBase64ToUint8Array(this.config.vapidPublicKey)
        });
        
        this.subscription = subscription;
        localStorage.setItem(this.STORAGE_KEYS.SUBSCRIPTION, JSON.stringify(subscription));
        
        console.log('[Push] Suscripción creada:', subscription.endpoint);
      }

      // Configurar recordatorios locales
      this.scheduleLocalReminders();

    } catch (e) {
      console.error('[Push] Error configurando notificaciones:', e);
    }
  },

  // === NOTIFICACIONES LOCALES ===
  async showLocalNotification(title, options = {}) {
    if (this.permission !== 'granted') {
      console.log('[Push] Sin permiso para notificaciones');
      return false;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      
      const defaultOptions = {
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-96.png',
        vibrate: [200, 100, 200],
        tag: 'bibliaquiz-notification',
        renotify: true,
        data: {
          url: window.location.origin
        },
        actions: [
          { action: 'open', title: '🎮 Jugar' },
          { action: 'dismiss', title: '❌ Cerrar' }
        ]
      };

      await registration.showNotification(title, { ...defaultOptions, ...options });
      
      console.log('[Push] Notificación mostrada:', title);
      return true;
    } catch (e) {
      console.error('[Push] Error mostrando notificación:', e);
      return false;
    }
  },

  // === PROGRAMAR RECORDATORIOS ===
  scheduleLocalReminders() {
    // Limpiar recordatorios anteriores
    this.clearScheduledNotifications();

    // Programar recordatorio diario
    if (this.config.dailyReminder.enabled) {
      this.scheduleDailyReminder();
    }

    // Programar recordatorio de racha
    if (this.config.streakReminder.enabled) {
      this.scheduleStreakReminder();
    }
  },

  scheduleDailyReminder() {
    const { hour, minute, title, body } = this.config.dailyReminder;
    
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hour, minute, 0, 0);

    // Si ya pasó la hora hoy, programar para mañana
    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const delay = scheduledTime - now;
    
    const timeoutId = setTimeout(() => {
      this.showLocalNotification(title, { body });
      // Reprogramar para el día siguiente
      this.scheduleDailyReminder();
    }, delay);

    this.scheduledNotifications.push(timeoutId);
    
    console.log('[Push] Recordatorio diario programado para:', scheduledTime.toLocaleString());
  },

  scheduleStreakReminder() {
    const { hour, minute, title, body } = this.config.streakReminder;
    
    // Obtener días de racha actual
    let streakDays = 0;
    if (typeof Storage !== 'undefined') {
      const streak = Storage.getDailyStreak();
      streakDays = streak.days || 0;
    }

    // Solo mostrar si tiene racha activa
    if (streakDays === 0) return;

    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(hour, minute, 0, 0);

    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const delay = scheduledTime - now;
    
    const timeoutId = setTimeout(() => {
      const finalBody = body.replace('{days}', streakDays);
      this.showLocalNotification(title, { body: finalBody });
      this.scheduleStreakReminder();
    }, delay);

    this.scheduledNotifications.push(timeoutId);
    
    console.log('[Push] Recordatorio de racha programado para:', scheduledTime.toLocaleString());
  },

  clearScheduledNotifications() {
    this.scheduledNotifications.forEach(id => clearTimeout(id));
    this.scheduledNotifications = [];
  },

  // === CONFIGURACIÓN DE RECORDATORIOS ===
  setDailyReminder(enabled, hour = 9, minute = 0) {
    this.config.dailyReminder.enabled = enabled;
    this.config.dailyReminder.hour = hour;
    this.config.dailyReminder.minute = minute;
    this.saveSettings();
    this.scheduleLocalReminders();
    
    return { success: true, enabled, time: `${hour}:${String(minute).padStart(2, '0')}` };
  },

  setStreakReminder(enabled, hour = 20, minute = 0) {
    this.config.streakReminder.enabled = enabled;
    this.config.streakReminder.hour = hour;
    this.config.streakReminder.minute = minute;
    this.saveSettings();
    this.scheduleLocalReminders();
    
    return { success: true, enabled, time: `${hour}:${String(minute).padStart(2, '0')}` };
  },

  // === NOTIFICACIONES ESPECÍFICAS ===
  async notifyDailyChallenge() {
    return this.showLocalNotification('🎯 ¡Nuevo Desafío Diario!', {
      body: 'Tu desafío de hoy está listo. ¿Podrás conseguir los 10 puntos?',
      tag: 'daily-challenge'
    });
  },

  async notifyStreakAtRisk() {
    const streak = typeof Storage !== 'undefined' ? Storage.getDailyStreak() : { days: 0 };
    return this.showLocalNotification('⚠️ ¡Tu racha está en riesgo!', {
      body: `Tienes una racha de ${streak.days} días. ¡Juega antes de medianoche!`,
      tag: 'streak-risk'
    });
  },

  async notifyNewBadge(badgeName, badgeIcon) {
    return this.showLocalNotification('🎖️ ¡Nueva Insignia!', {
      body: `Has desbloqueado: ${badgeIcon} ${badgeName}`,
      tag: 'new-badge'
    });
  },

  async notifyLevelUp(level) {
    return this.showLocalNotification('⬆️ ¡Subiste de Nivel!', {
      body: `¡Felicidades! Ahora eres nivel ${level}`,
      tag: 'level-up'
    });
  },

  async notifyLivesRestored() {
    return this.showLocalNotification('❤️ ¡Vidas Restauradas!', {
      body: 'Tus vidas se han regenerado. ¡Hora de jugar!',
      tag: 'lives-restored'
    });
  },

  // === UTILIDADES ===
  urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },

  // === ESTADO ===
  getStatus() {
    return {
      supported: this.isSupported(),
      permission: this.permission,
      initialized: this.initialized,
      dailyReminder: this.config.dailyReminder,
      streakReminder: this.config.streakReminder,
      hasSubscription: !!this.subscription
    };
  }
};

// Manejar clicks en notificaciones desde Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'notification-click') {
      const action = event.data.action;
      if (action === 'open') {
        window.focus();
        // Abrir modo juego
        if (typeof App !== 'undefined') {
          App.showScreen('home');
        }
      }
    }
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  PushNotifications.init();
});

console.log('[BibliaQuiz] Módulo de notificaciones cargado');
