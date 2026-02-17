// ============================================================
// BibliaQuiz - Sistema de Anuncios (AdMob + Web Fallback)
// ============================================================

const AdsManager = {
  // === CONFIGURACIÓN ===
  config: {
    // IDs de AdMob (reemplazar con tus IDs reales de producción)
    admob: {
      appId: 'ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY',
      bannerId: 'ca-app-pub-XXXXXXXXXXXXXXXX/ZZZZZZZZZZ',
      interstitialId: 'ca-app-pub-XXXXXXXXXXXXXXXX/AAAAAAAAAA',
      rewardedId: 'ca-app-pub-XXXXXXXXXXXXXXXX/BBBBBBBBBB'
    },
    // IDs de prueba de AdMob (usar durante desarrollo)
    admobTest: {
      appId: 'ca-app-pub-3940256099942544~3347511713',
      bannerId: 'ca-app-pub-3940256099942544/6300978111',
      interstitialId: 'ca-app-pub-3940256099942544/1033173712',
      rewardedId: 'ca-app-pub-3940256099942544/5224354917'
    },
    // Configuración de frecuencia
    interstitialFrequency: 2, // Mostrar cada N fases completadas
    minTimeBetweenAds: 60000, // 60 segundos mínimo entre anuncios
    testMode: true // Cambiar a false en producción
  },

  // === ESTADO ===
  initialized: false,
  platform: 'web',
  lastAdTime: 0,
  interstitialReady: false,
  rewardedReady: false,
  adsLoaded: 0,

  // === INICIALIZACIÓN ===
  async init() {
    if (this.initialized) return;

    console.log('[Ads] Inicializando sistema de anuncios...');

    // Verificar si el usuario es premium
    if (typeof Billing !== 'undefined' && !Billing.canShowAds()) {
      console.log('[Ads] Usuario premium - anuncios desactivados');
      this.initialized = true;
      return;
    }

    // Detectar plataforma
    this.detectPlatform();

    // Inicializar según plataforma
    if (this.platform === 'capacitor' || this.platform === 'cordova') {
      await this.initAdMob();
    } else {
      await this.initWebAds();
    }

    this.initialized = true;
    console.log('[Ads] Sistema inicializado en plataforma:', this.platform);
  },

  detectPlatform() {
    if (window.Capacitor) {
      this.platform = 'capacitor';
    } else if (window.cordova) {
      this.platform = 'cordova';
    } else {
      this.platform = 'web';
    }
  },

  // === ADMOB (Capacitor/Cordova) ===
  async initAdMob() {
    try {
      // Para Capacitor con @capacitor-community/admob
      if (window.Capacitor && window.AdMob) {
        const config = this.config.testMode ? this.config.admobTest : this.config.admob;
        
        await window.AdMob.initialize({
          requestTrackingAuthorization: true,
          testingDevices: this.config.testMode ? ['YOUR_DEVICE_ID'] : [],
          initializeForTesting: this.config.testMode
        });

        // Preparar intersticial
        await this.prepareInterstitial();
        
        // Preparar rewarded
        await this.prepareRewarded();

        console.log('[Ads] AdMob inicializado correctamente');
      }
    } catch (e) {
      console.error('[Ads] Error inicializando AdMob:', e);
    }
  },

  async prepareInterstitial() {
    if (this.platform !== 'capacitor' && this.platform !== 'cordova') return;
    
    try {
      const config = this.config.testMode ? this.config.admobTest : this.config.admob;
      
      if (window.AdMob) {
        await window.AdMob.prepareInterstitial({
          adId: config.interstitialId,
          isTesting: this.config.testMode
        });
        this.interstitialReady = true;
        console.log('[Ads] Intersticial preparado');
      }
    } catch (e) {
      console.error('[Ads] Error preparando intersticial:', e);
    }
  },

  async prepareRewarded() {
    if (this.platform !== 'capacitor' && this.platform !== 'cordova') return;
    
    try {
      const config = this.config.testMode ? this.config.admobTest : this.config.admob;
      
      if (window.AdMob) {
        await window.AdMob.prepareRewardVideoAd({
          adId: config.rewardedId,
          isTesting: this.config.testMode
        });
        this.rewardedReady = true;
        console.log('[Ads] Rewarded preparado');
      }
    } catch (e) {
      console.error('[Ads] Error preparando rewarded:', e);
    }
  },

  // === WEB ADS (Fallback) ===
  async initWebAds() {
    // Para web, usamos el sistema de anuncios simulados existente
    // En producción, aquí se integraría Google AdSense o similar
    console.log('[Ads] Modo web - usando anuncios simulados');
  },

  // === VERIFICAR SI SE PUEDE MOSTRAR ===
  canShowAd() {
    // Verificar premium
    if (typeof Billing !== 'undefined' && !Billing.canShowAds()) {
      return false;
    }

    // Verificar tiempo mínimo entre anuncios
    const now = Date.now();
    if (now - this.lastAdTime < this.config.minTimeBetweenAds) {
      return false;
    }

    return true;
  },

  // === MOSTRAR INTERSTICIAL ===
  async showInterstitial(onComplete) {
    if (!this.canShowAd()) {
      if (onComplete) onComplete(false);
      return;
    }

    console.log('[Ads] Mostrando intersticial...');

    if (this.platform === 'capacitor' || this.platform === 'cordova') {
      try {
        if (window.AdMob && this.interstitialReady) {
          await window.AdMob.showInterstitial();
          this.lastAdTime = Date.now();
          this.interstitialReady = false;
          
          // Preparar el siguiente
          this.prepareInterstitial();
          
          if (onComplete) onComplete(true);
        } else {
          // No hay anuncio listo
          if (onComplete) onComplete(false);
        }
      } catch (e) {
        console.error('[Ads] Error mostrando intersticial:', e);
        if (onComplete) onComplete(false);
      }
    } else {
      // Web - usar sistema simulado
      this.showWebInterstitial(onComplete);
    }
  },

  // === MOSTRAR REWARDED (Video por recompensa) ===
  async showRewarded(onComplete, onReward) {
    if (!this.canShowAd()) {
      if (onComplete) onComplete(false);
      return;
    }

    console.log('[Ads] Mostrando rewarded...');

    if (this.platform === 'capacitor' || this.platform === 'cordova') {
      try {
        if (window.AdMob && this.rewardedReady) {
          // Listener para recompensa
          const rewardListener = window.AdMob.addListener('onRewardedVideoAdReward', (reward) => {
            console.log('[Ads] Recompensa recibida:', reward);
            if (onReward) onReward(reward);
            rewardListener.remove();
          });

          await window.AdMob.showRewardVideoAd();
          this.lastAdTime = Date.now();
          this.rewardedReady = false;
          
          // Preparar el siguiente
          this.prepareRewarded();
          
          if (onComplete) onComplete(true);
        } else {
          if (onComplete) onComplete(false);
        }
      } catch (e) {
        console.error('[Ads] Error mostrando rewarded:', e);
        if (onComplete) onComplete(false);
      }
    } else {
      // Web - usar sistema simulado
      this.showWebRewarded(onComplete, onReward);
    }
  },

  // === ANUNCIOS WEB SIMULADOS ===
  showWebInterstitial(onComplete) {
    // Usar el overlay existente de la app
    if (typeof App !== 'undefined' && App.showAdOverlay) {
      App.showAdOverlay(() => {
        this.lastAdTime = Date.now();
        if (onComplete) onComplete(true);
      });
    } else {
      if (onComplete) onComplete(false);
    }
  },

  showWebRewarded(onComplete, onReward) {
    // Simular video rewarded con countdown más largo
    const overlay = document.createElement('div');
    overlay.className = 'rewarded-overlay';
    overlay.innerHTML = `
      <div class="rewarded-content">
        <div class="rewarded-icon">🎬</div>
        <h3>Video Recompensa</h3>
        <p>Mira este video para obtener tu recompensa</p>
        <div class="rewarded-video">
          <div class="rewarded-placeholder">
            <span>📺 Anuncio</span>
          </div>
        </div>
        <div class="rewarded-countdown">
          <span id="rewarded-timer">15</span> segundos
        </div>
        <button id="rewarded-skip" class="rewarded-skip hidden" disabled>
          Obtener Recompensa →
        </button>
      </div>
    `;

    document.body.appendChild(overlay);
    
    // Animación de entrada
    requestAnimationFrame(() => {
      overlay.classList.add('active');
    });

    let seconds = 15;
    const timerEl = overlay.querySelector('#rewarded-timer');
    const skipBtn = overlay.querySelector('#rewarded-skip');

    const interval = setInterval(() => {
      seconds--;
      timerEl.textContent = seconds;
      
      if (seconds <= 0) {
        clearInterval(interval);
        skipBtn.classList.remove('hidden');
        skipBtn.disabled = false;
      }
    }, 1000);

    skipBtn.onclick = () => {
      overlay.classList.remove('active');
      setTimeout(() => {
        overlay.remove();
      }, 300);
      
      this.lastAdTime = Date.now();
      
      // Dar recompensa
      if (onReward) onReward({ type: 'life', amount: 1 });
      if (onComplete) onComplete(true);
    };
  },

  // === BANNER ADS ===
  async showBanner(position = 'bottom') {
    if (!this.canShowAd()) return;

    if (this.platform === 'capacitor' || this.platform === 'cordova') {
      try {
        const config = this.config.testMode ? this.config.admobTest : this.config.admob;
        
        if (window.AdMob) {
          await window.AdMob.showBanner({
            adId: config.bannerId,
            adSize: 'SMART_BANNER',
            position: position === 'top' ? 'TOP_CENTER' : 'BOTTOM_CENTER',
            isTesting: this.config.testMode
          });
          console.log('[Ads] Banner mostrado');
        }
      } catch (e) {
        console.error('[Ads] Error mostrando banner:', e);
      }
    }
  },

  async hideBanner() {
    if (this.platform === 'capacitor' || this.platform === 'cordova') {
      try {
        if (window.AdMob) {
          await window.AdMob.hideBanner();
        }
      } catch (e) {
        console.error('[Ads] Error ocultando banner:', e);
      }
    }
  },

  // === ESTADÍSTICAS ===
  getStats() {
    return {
      platform: this.platform,
      initialized: this.initialized,
      adsLoaded: this.adsLoaded,
      lastAdTime: this.lastAdTime,
      interstitialReady: this.interstitialReady,
      rewardedReady: this.rewardedReady
    };
  }
};

// Estilos para rewarded web
const rewardedStyles = document.createElement('style');
rewardedStyles.textContent = `
  .rewarded-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
  }
  .rewarded-overlay.active {
    opacity: 1;
    visibility: visible;
  }
  .rewarded-content {
    text-align: center;
    padding: 30px;
    max-width: 350px;
  }
  .rewarded-icon {
    font-size: 4rem;
    margin-bottom: 16px;
  }
  .rewarded-content h3 {
    color: #fff;
    font-size: 1.4rem;
    margin: 0 0 8px;
  }
  .rewarded-content p {
    color: #aaa;
    font-size: 0.9rem;
    margin: 0 0 20px;
  }
  .rewarded-video {
    background: #222;
    border-radius: 12px;
    padding: 40px;
    margin-bottom: 20px;
  }
  .rewarded-placeholder {
    color: #666;
    font-size: 1.2rem;
  }
  .rewarded-countdown {
    color: #fff;
    font-size: 1.1rem;
    margin-bottom: 20px;
  }
  #rewarded-timer {
    font-weight: 800;
    font-size: 1.5rem;
    color: #FFD93D;
  }
  .rewarded-skip {
    background: #4CAF50;
    color: #fff;
    border: none;
    padding: 14px 28px;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  .rewarded-skip:hover:not(:disabled) {
    filter: brightness(1.1);
    transform: scale(1.02);
  }
  .rewarded-skip:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
document.head.appendChild(rewardedStyles);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  AdsManager.init();
});

console.log('[BibliaQuiz] Módulo de anuncios cargado');
