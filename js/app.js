// --- Boton Acerca de ---
document.addEventListener('DOMContentLoaded', () => {
  const btnAbout = document.getElementById('btn-about');
  if (btnAbout) {
    btnAbout.addEventListener('click', () => App.showScreen('about'));
  }
  // Botón Política de Privacidad
  const btnPrivacy = document.getElementById('btn-privacy');
  if (btnPrivacy) {
    btnPrivacy.addEventListener('click', () => App.showScreen('privacy'));
  }
  // Botón Términos de Uso
  const btnTerms = document.getElementById('btn-terms');
  if (btnTerms) {
    btnTerms.addEventListener('click', () => App.showScreen('terms'));
  }
  // Botón Valorar App
  const btnRate = document.getElementById('btn-rate');
  if (btnRate) {
    btnRate.addEventListener('click', () => {
      // Abrir enlace de valoración (placeholder - cambiar por URL real de la tienda)
      App.showToast('🌟 ¡Gracias por tu apoyo!');
    });
  }
});
// --- Service Worker update banner ---
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // Ya hay un nuevo SW activo
    showUpdateBanner();
  });
  navigator.serviceWorker.getRegistration && navigator.serviceWorker.getRegistration().then(reg => {
    if (reg && reg.waiting) showUpdateBanner();
    reg && reg.addEventListener('updatefound', () => {
      if (reg.waiting) showUpdateBanner();
    });
  });
}
function showUpdateBanner() {
  const banner = document.getElementById('update-banner');
  if (banner) banner.classList.remove('hidden');
  const btn = document.getElementById('btn-update-reload');
  if (btn) btn.onclick = () => window.location.reload(true);
}
// ============================================================
// BibliaQuiz  Logica Principal de la Aplicacion
// ============================================================
// Utility: escape HTML to prevent XSS
function escapeHTML(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
// Polyfill: CanvasRenderingContext2D.roundRect (Safari < 16, older browsers)
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, radii) {
    const r = Array.isArray(radii) ? radii : [radii || 0];
    const tl = r[0] || 0, tr = r[1] !== undefined ? r[1] : tl;
    const br = r[2] !== undefined ? r[2] : tl, bl = r[3] !== undefined ? r[3] : tr;
    this.beginPath();
    this.moveTo(x + tl, y);
    this.lineTo(x + w - tr, y);
    this.quadraticCurveTo(x + w, y, x + w, y + tr);
    this.lineTo(x + w, y + h - br);
    this.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
    this.lineTo(x + bl, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - bl);
    this.lineTo(x, y + tl);
    this.quadraticCurveTo(x, y, x + tl, y);
    this.closePath();
  };
}
const App = {
  // --- Estado ---
  // Sistema de vidas
  lives: 5,
  maxLives: 5,
  infiniteLives: false,
  lifeRegenInterval: null,
  homeLivesTimerInterval: null,
  // Orden de dificultades para progresion
  difficultyOrder: ['facil', 'medio', 'dificil', 'experto'],
  // Estado del juego
  currentScreen: 'home',
  selectedCategory: null,
  selectedDifficulty: null,
  initialDifficulty: null,
  activeDifficulty: null,
  currentQuestions: [],
  currentQuestionIndex: 0,
  currentStreak: 0,
  sessionCorrect: 0,
  sessionWrong: 0,
  sessionPoints: 0,
  currentPhase: 1,
  phaseCorrect: 0,
  phaseWrong: 0,
  allUsedQuestionIds: [],
  categoryExhausted: false,
  diffCompletedInSession: [],
  answered: false,
  timerInterval: null,
  timerSeconds: 0,
  timerMax: 0,
  // Challenge mode
  challengeTime: 180,
  challengeDifficulty: 'dificil',
  challengeQuestions: [],
  challengeIndex: 0,
  challengeCorrect: 0,
  challengeWrong: 0,
  challengePoints: 0,
  challengeStreak: 0,
  challengeBestStreak: 0,
  challengeGlobalTimer: null,
  challengeSecondsLeft: 0,
  challengeAnswered: false,
  challengeAutoAdvance: null,
  challengeAnswerTimes: [],
  challengeQuestionStart: 0,
  duoPlayer1: 'Jugador 1',
  duoPlayer2: 'Jugador 2',
  duoQuestionsPerPlayer: 10,
  duoCategory: null,
  duoDifficulty: null,
  duoP1Questions: [],
  duoP2Questions: [],
  duoCurrentPlayer: 1,
  duoP1Index: 0,
  duoP2Index: 0,
  duoP1Correct: 0,
  duoP1Wrong: 0,
  duoP1Points: 0,
  duoP2Correct: 0,
  duoP2Wrong: 0,
  duoP2Points: 0,
  duoAnswered: false,
  duoTimerInterval: null,
  duoTimerSeconds: 0,
  duoTimerMax: 30,
  duoTurnMode: 'alternado', // 'alternado' o 'seguido',
  impostorPlayers: 0,
  impostorCategory: null,
  impostorWord: null,
  impostorImpostorIndex: -1,
  impostorCurrentPlayer: 0,
  impostorDiscussTimer: null,
  impostorDiscussSeconds: 120,
  audioCtx: null,
  questionStartTime: 0,
  sessionBestStreak: 0,
  isDailyChallenge: false,
  deferredInstallPrompt: null,
  // --- Metodos ---
  renderSettings() {
    const container = document.getElementById('settings-container');
    if (!container) return;
    container.innerHTML = '';
    // Tema
    const themeLabel = document.createElement('label');
    themeLabel.textContent = 'Tema:';
    const themeSelect = document.createElement('select');
    themeSelect.id = 'theme-select';
    ['auto', 'light', 'dark'].forEach(val => {
      const opt = document.createElement('option');
      opt.value = val;
      opt.textContent = val === 'auto' ? 'Automatico' : val === 'light' ? 'Claro' : 'Oscuro';
      themeSelect.appendChild(opt);
    });
    themeSelect.value = Storage.getTheme() || 'auto';
    themeSelect.onchange = () => {
      Storage.saveTheme(themeSelect.value);
      this.applyTheme(themeSelect.value);
    };
    container.appendChild(themeLabel);
    container.appendChild(themeSelect);
    // Sonido
    const soundLabel = document.createElement('label');
    soundLabel.textContent = 'Sonido:';
    const soundToggle = document.createElement('input');
    soundToggle.type = 'checkbox';
    soundToggle.id = 'sound-toggle';
    soundToggle.checked = Storage.getSettings().sound !== false;
    soundToggle.onchange = () => {
      const settings = Storage.getSettings();
      settings.sound = soundToggle.checked;
      Storage.saveSettings(settings);
    };
    container.appendChild(soundLabel);
    container.appendChild(soundToggle);
    // --- Notificaciones Push ---
    const pushBtn = document.createElement('button');
    pushBtn.textContent = 'Activar notificaciones';
    pushBtn.onclick = () => this.requestPushPermission();
    container.appendChild(pushBtn);
    // Borrar progreso
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Borrar progreso';
    resetBtn.className = 'danger-btn';
    resetBtn.onclick = () => {
      Storage.resetAll();
      this.showToast('Progreso borrado');
      this.renderSettings();
    };
    container.appendChild(resetBtn);
    // Politica de privacidad
    const privacyBtn = document.createElement('button');
    privacyBtn.textContent = 'Politica de privacidad';
    privacyBtn.onclick = () => this.showScreen('privacy');
    container.appendChild(privacyBtn);
  },
  // PWA install prompt
  deferredInstallPrompt: null,
  // --- Inicializacion ---
  init() {
    console.log('[BibliaQuiz] Init started');
    // --- Versionado/migracion de datos ---
    if (typeof Storage.initVersioning === 'function') {
      Storage.initVersioning();
    }
    this.bindEvents();
    console.log('[BibliaQuiz] Events bound');
    this.loadLives();
    this.loadInfiniteLives();
    this.startLifeRegen();
    this.startHomeLivesTimer();
    this.initTheme();
    this.checkRegistration();
    // Onboarding only after registration is complete
    if (Storage.isRegistered()) {
      this.showScreen('home');
      this.renderHome();
      this.loadSettings();
      this.initOnboarding();
    }
    this.initOfflineDetection();
    this.initKeyboard();
    this.initDailyStreak();
    this.renderDailyChallengeCard();
    this.initNotifications();
    this.initInstallPrompt();
    this.handleUrlShortcuts();
    this.hideSplash();
  },
  // === ONBOARDING ===
  initOnboarding() {
    if (localStorage.getItem('bibliaquiz_onboarded')) return;
    const overlay = document.getElementById('onboarding-overlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    let current = 0;
    const slides = overlay.querySelectorAll('.onboarding-slide');
    const dots = overlay.querySelectorAll('.onboarding-dot');
    const nextBtn = document.getElementById('onboarding-next');
    const skipBtn = document.getElementById('onboarding-skip');
    const goTo = (idx) => {
      slides.forEach(s => s.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      slides[idx].classList.add('active');
      dots[idx].classList.add('active');
      current = idx;
      nextBtn.textContent = idx === slides.length - 1 ? '¡Empezar!' : 'Siguiente ';
    };
    nextBtn.addEventListener('click', () => {
      if (current < slides.length - 1) {
        goTo(current + 1);
      } else {
        this.closeOnboarding(overlay);
      }
    });
    skipBtn.addEventListener('click', () => this.closeOnboarding(overlay));
    dots.forEach(d => d.addEventListener('click', () => {
      goTo(parseInt(d.dataset.dot));
    }));
  },
  closeOnboarding(overlay) {
    overlay.classList.add('hidden');
    localStorage.setItem('bibliaquiz_onboarded', 'true');
  },
  // === REGISTRO DE USUARIO ===
  checkRegistration() {
    if (Storage.isRegistered()) return;
    const overlay = document.getElementById('register-overlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    const submitBtn = document.getElementById('register-submit');
    const nameInput = document.getElementById('register-name');
    const emailInput = document.getElementById('register-email');
    const ageInput = document.getElementById('register-age');
    const genderSelect = document.getElementById('register-gender');
    const errorMsg = document.getElementById('register-error');
    submitBtn.addEventListener('click', () => {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const age = parseInt(ageInput.value);
      const gender = genderSelect.value;
      // Validate required: name, email, age
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name || !email || !emailRegex.test(email) || !age || age < 5 || age > 120) {
        errorMsg.textContent = !name ? 'Escribe tu nombre' :
          (!email || !emailRegex.test(email)) ? 'Escribe un correo valido' :
          'Escribe una edad valida (5-120)';
        errorMsg.classList.remove('hidden');
        if (!name) nameInput.focus();
        else if (!email || !emailRegex.test(email)) emailInput.focus();
        else ageInput.focus();
        return;
      }
      errorMsg.classList.add('hidden');
      // Save player data
      const player = Storage.getPlayer();
      player.name = name;
      player.email = email;
      player.age = age;
      player.gender = gender;
      player.registered = true;
      player.registeredAt = new Date().toISOString();
      Storage.savePlayer(player);
      // Close overlay with animation
      overlay.style.animation = 'fadeOut 0.4s ease forwards';
      setTimeout(() => {
        overlay.classList.add('hidden');
        overlay.style.animation = '';
        // Now show home and onboarding
        this.showScreen('home');
        this.renderHome();
        this.loadSettings();
        this.initOnboarding();
        this.showToast(`¡Bienvenido, ${name}! `);
      }, 400);
    });
    // Enter key support
    [nameInput, emailInput, ageInput].forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') submitBtn.click();
      });
    });
  },
  // === NAVEGACION ===
  showScreen(screenId) {
    const current = document.querySelector('.screen.active');
    const target = document.getElementById(screenId);
    if (!target) return;
    if (current && current.id !== screenId) {
      current.classList.remove('active');
      current.classList.add('screen-out');
      current.addEventListener('animationend', () => {
        current.classList.remove('screen-out');
      }, { once: true });
    } else if (current) {
      current.classList.remove('active');
    }
    target.classList.add('active');
    this.currentScreen = screenId;
    window.scrollTo(0, 0);
  },
  // === EVENTOS ===
  bindEvents() {
    // Menu buttons
    document.getElementById('btn-play').addEventListener('click', () => {
      this.renderCategories();
      this.showScreen('category-select');
    });
    document.getElementById('btn-progress').addEventListener('click', () => {
      this.renderProgress();
      this.showScreen('progress');
    });
    document.getElementById('btn-settings').addEventListener('click', () => {
      this.renderSettings();
      this.showScreen('settings');
    });
    document.getElementById('btn-verse').addEventListener('click', () => {
      this.renderVerses();
      this.showScreen('verses');
    });
    // Study mode
    document.getElementById('btn-study').addEventListener('click', () => {
      this.renderStudyMode();
      this.showScreen('study-mode');
    });
    // Challenge mode
    document.getElementById('btn-challenge').addEventListener('click', () => {
      this.renderChallengeSetup();
      this.showScreen('challenge-setup');
    });
    // Challenge time buttons
    document.querySelectorAll('.challenge-time-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.challenge-time-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.challengeTime = parseInt(btn.dataset.time);
        this.updateChallengeBest();
      });
    });
    // Challenge difficulty buttons
    document.querySelectorAll('.challenge-diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.challenge-diff-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.challengeDifficulty = btn.dataset.diff;
        this.updateChallengeBest();
      });
    });
    // Start challenge
    document.getElementById('btn-start-challenge').addEventListener('click', () => {
      this.startChallenge();
    });
    // Challenge results buttons
    document.getElementById('btn-challenge-again').addEventListener('click', () => {
      this.renderChallengeSetup();
      this.showScreen('challenge-setup');
    });
    document.getElementById('btn-challenge-home').addEventListener('click', () => {
      this.showScreen('home');
      this.renderHome();
    });
    // Study category filter
    document.getElementById('study-category-filter').addEventListener('change', () => {
      this.renderStudyCards();
    });
    // --- DUO MODE ---
    document.getElementById('btn-duo').addEventListener('click', () => {
      this.showScreen('duo-setup');
    });
    document.querySelectorAll('.duo-count-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.duo-count-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.duoQuestionsPerPlayer = parseInt(btn.dataset.count);
      });
    });
    document.querySelectorAll('.duo-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.duo-mode-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.duoTurnMode = btn.dataset.mode;
      });
    });
    document.getElementById('btn-duo-start-cat').addEventListener('click', () => {
      this.duoPlayer1 = document.getElementById('duo-name-1').value.trim() || 'Jugador 1';
      this.duoPlayer2 = document.getElementById('duo-name-2').value.trim() || 'Jugador 2';
      this.renderDuoCategories();
      this.showScreen('duo-category');
    });
    document.querySelectorAll('.duo-diff-card').forEach(card => {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
        this.duoDifficulty = card.dataset.difficulty;
        this.startDuo();
      });
    });
    document.getElementById('btn-duo-ready').addEventListener('click', () => {
      this.showScreen('duo-quiz');
      this.renderDuoQuestion();
    });
    document.getElementById('btn-duo-again').addEventListener('click', () => {
      // Restaurar estado visual de los botones de cantidad
      document.querySelectorAll('.duo-count-btn').forEach(b => {
        b.classList.remove('selected');
        if (parseInt(b.dataset.count) === this.duoQuestionsPerPlayer) {
          b.classList.add('selected');
        }
      });
      // Restaurar estado visual del modo de turno
      document.querySelectorAll('.duo-mode-btn').forEach(b => {
        b.classList.remove('selected');
        if (b.dataset.mode === this.duoTurnMode) {
          b.classList.add('selected');
        }
      });
      // Restaurar nombres
      document.getElementById('duo-name-1').value = this.duoPlayer1;
      document.getElementById('duo-name-2').value = this.duoPlayer2;
      this.showScreen('duo-setup');
    });
    document.getElementById('btn-duo-home').addEventListener('click', () => {
      this.showScreen('home');
      this.renderHome();
    });
    // --- IMPOSTOR MODE ---
    document.getElementById('btn-impostor').addEventListener('click', () => {
      // Reset input cada vez que se entra
      const input = document.getElementById('impostor-player-count');
      input.value = '';
      this.impostorPlayers = 0;
      document.getElementById('btn-impostor-category').disabled = true;
      this.showScreen('impostor-setup');
    });
    const impostorInput = document.getElementById('impostor-player-count');
    const impostorCatBtn = document.getElementById('btn-impostor-category');
    const updateImpostorInput = () => {
      const val = parseInt(impostorInput.value);
      if (val >= 3 && val <= 15) {
        this.impostorPlayers = val;
        impostorCatBtn.disabled = false;
      } else {
        this.impostorPlayers = 0;
        impostorCatBtn.disabled = true;
      }
    };
    impostorInput.addEventListener('input', updateImpostorInput);
    document.querySelector('.impostor-player-minus').addEventListener('click', () => {
      const current = parseInt(impostorInput.value) || 4;
      if (current > 3) {
        impostorInput.value = current - 1;
        updateImpostorInput();
      }
    });
    document.querySelector('.impostor-player-plus').addEventListener('click', () => {
      const current = parseInt(impostorInput.value) || 2;
      if (current < 15) {
        impostorInput.value = current + 1;
        updateImpostorInput();
      }
    });
    document.getElementById('btn-impostor-category').addEventListener('click', () => {
      this.renderImpostorCategories();
      this.showScreen('impostor-category');
    });
    document.getElementById('btn-impostor-reveal').addEventListener('click', () => {
      this.revealImpostor();
    });
    document.getElementById('btn-impostor-new').addEventListener('click', () => {
      this.startImpostorNewRound();
    });
    document.getElementById('btn-impostor-home').addEventListener('click', () => {
      this.clearImpostorTimer();
      this.showScreen('home');
      this.renderHome();
    });
    document.getElementById('btn-impostor-again').addEventListener('click', () => {
      this.startImpostorNewRound();
    });
    document.getElementById('btn-impostor-back').addEventListener('click', () => {
      this.showScreen('home');
      this.renderHome();
    });
    // Shop button
    document.getElementById('btn-shop').addEventListener('click', () => {
      this.renderShop();
      this.showScreen('shop');
    });
    // Shop buy buttons (delegación de eventos para botones dinámicos)
    document.querySelector('.shop-container').addEventListener('click', (e) => {
      const btn = e.target.closest('.shop-item-btn');
      if (btn) {
        const productId = btn.dataset.buy;
        this.handleShopBuy(productId);
      }
    });
    // Restaurar compras
    document.getElementById('btn-restore-purchases').addEventListener('click', () => {
      this.handleRestorePurchases();
    });
    // Gestionar suscripción
    document.getElementById('btn-manage-subscription').addEventListener('click', () => {
      this.handleManageSubscription();
    });
    // Escuchar eventos de compra
    window.addEventListener('billing:purchase', (e) => {
      this.onPurchaseComplete(e.detail);
    });
    // Back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget.dataset.target;
        const currentScreen = this.currentScreen;
        // Si estamos en el quiz, mostrar pausa en vez de salir directo
        if (currentScreen === 'quiz') {
          this.showPauseScreen();
          return;
        }
        // Si estamos en challenge-quiz, detener timer y volver al home
        if (currentScreen === 'challenge-quiz') {
          this.stopChallengeGlobalTimer();
          this.showScreen('home');
          this.renderHome();
          return;
        }
        // Si estamos en duo-quiz, volver al home
        if (currentScreen === 'duo-quiz') {
          this.showScreen('home');
          this.renderHome();
          return;
        }
        if (target === 'home') {
          this.showScreen('home');
          this.renderHome();
        } else {
          this.showScreen(target);
        }
      });
    });
    // Difficulty cards (solo los del modo normal, NO los de duo)
    const diffCards = document.querySelectorAll('#difficulty-select .difficulty-card');
    console.log('[BibliaQuiz] Difficulty cards found:', diffCards.length);
    diffCards.forEach(card => {
      const selectDiff = () => {
        this.selectedDifficulty = card.dataset.difficulty;
        this.startGame();
      };
      card.addEventListener('click', selectDiff);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectDiff();
        }
      });
    });
    // Next button
    document.getElementById('next-btn').addEventListener('click', () => {
      this.nextQuestion();
    });
    // Phase buttons
    document.getElementById('btn-phase-continue').addEventListener('click', () => {
      this.startNextPhase();
    });
    document.getElementById('btn-phase-end').addEventListener('click', () => {
      document.getElementById('phase-overlay').classList.add('hidden');
      this.cleanOverlayTraps();
      this.endGame();
    });
    // Game over buttons
    document.getElementById('btn-watch-ad').addEventListener('click', () => {
      this.watchAdForLife();
    });
    document.getElementById('btn-gameover-end').addEventListener('click', () => {
      document.getElementById('gameover-overlay').classList.add('hidden');
      this.cleanOverlayTraps();
      this.endGame();
    });
    // Ad close button
    const closeBtn = document.getElementById('btn-close-ad');
    closeBtn.addEventListener('click', (e) => {
      // Solo permitir cerrar si no esta deshabilitado
      if (closeBtn.disabled) {
        e.preventDefault();
        return;
      }
      this.closeAd();
    });
    // Category complete button
    document.getElementById('btn-catcomplete-ok').addEventListener('click', () => {
      document.getElementById('catcomplete-overlay').classList.add('hidden');
      this.cleanOverlayTraps();
    });
    // Results actions
    document.getElementById('btn-replay-category').addEventListener('click', () => {
      // Repetir misma categoria y dificultad
      this.startGame();
    });
    document.getElementById('btn-play-again').addEventListener('click', () => {
      this.renderCategories();
      this.showScreen('category-select');
    });
    document.getElementById('btn-back-home').addEventListener('click', () => {
      this.showScreen('home');
      this.renderHome();
    });
    // Pause screen actions
    document.getElementById('pause-continue').addEventListener('click', () => {
      this.showScreen('quiz');
      // Resume timer from where it was (don't restart)
      if (this.timerMax > 0 && this.timerSeconds > 0 && !this.answered) {
        this.resumeTimer();
      }
    });
    document.getElementById('pause-quit').addEventListener('click', () => {
      this.endGame();
    });
    // Share results
    document.getElementById('btn-share-results').addEventListener('click', () => {
      this.shareResults();
    });
    // Share as image
    document.getElementById('btn-share-image')?.addEventListener('click', () => {
      this.shareResultsAsImage();
    });
    // Export / Import
    document.getElementById('btn-export').addEventListener('click', () => {
      this.exportData();
    });
    document.getElementById('btn-import').addEventListener('click', () => {
      document.getElementById('import-file').click();
    });
    document.getElementById('import-file').addEventListener('change', (e) => {
      this.importData(e);
    });
    // Reset confirm
    document.getElementById('btn-reset').addEventListener('click', () => {
      document.getElementById('reset-modal').classList.remove('hidden');
    });
    document.getElementById('modal-cancel').addEventListener('click', () => {
      document.getElementById('reset-modal').classList.add('hidden');
    });
    document.getElementById('modal-confirm').addEventListener('click', () => {
      Storage.resetAll();
      document.getElementById('reset-modal').classList.add('hidden');
      this.renderSettings();
      this.showScreen('home');
      this.renderHome();
    });
    // Promo code redeem
    document.getElementById('btn-redeem-code')?.addEventListener('click', () => {
      this.redeemPromoCode();
    });
    document.getElementById('promo-code')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.redeemPromoCode();
    });
    // Settings changes
    document.getElementById('setting-name').addEventListener('change', (e) => {
      const player = Storage.getPlayer();
      player.name = e.target.value.trim() || 'Jugador';
      Storage.savePlayer(player);
    });
    document.getElementById('setting-age').addEventListener('change', (e) => {
      const player = Storage.getPlayer();
      const age = parseInt(e.target.value);
      if (age >= 5 && age <= 120) {
        player.age = age;
        Storage.savePlayer(player);
      }
    });
    document.getElementById('setting-email').addEventListener('change', (e) => {
      const player = Storage.getPlayer();
      player.email = e.target.value.trim();
      Storage.savePlayer(player);
    });
    document.getElementById('setting-gender').addEventListener('change', (e) => {
      const player = Storage.getPlayer();
      player.gender = e.target.value;
      Storage.savePlayer(player);
    });
    document.getElementById('setting-questions').addEventListener('change', (e) => {
      const settings = Storage.getSettings();
      settings.questionsPerGame = parseInt(e.target.value);
      Storage.saveSettings(settings);
    });
    document.getElementById('setting-sound').addEventListener('change', (e) => {
      const settings = Storage.getSettings();
      settings.sound = e.target.checked;
      Storage.saveSettings(settings);
    });
    document.getElementById('setting-vibration').addEventListener('change', (e) => {
      const settings = Storage.getSettings();
      settings.vibration = e.target.checked;
      Storage.saveSettings(settings);
    });
    document.getElementById('setting-verse').addEventListener('change', (e) => {
      const settings = Storage.getSettings();
      settings.showVerse = e.target.checked;
      Storage.saveSettings(settings);
    });
    document.getElementById('setting-timer').addEventListener('change', (e) => {
      const settings = Storage.getSettings();
      settings.timerSeconds = parseInt(e.target.value);
      Storage.saveSettings(settings);
    });
    document.getElementById('setting-no-repeat').addEventListener('change', (e) => {
      const settings = Storage.getSettings();
      settings.noRepeat = e.target.checked;
      Storage.saveSettings(settings);
    });
    // Theme selector (3-way: auto / dark / light)
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.themeVal;
        Storage.saveTheme(val);
        this.applyTheme(val);
        this.updateThemeButtons(val);
      });
    });
    // Avatar picker
    document.getElementById('btn-change-avatar').addEventListener('click', () => {
      document.getElementById('avatar-grid').classList.toggle('hidden');
    });
    document.querySelectorAll('.avatar-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const avatar = btn.dataset.avatar;
        const player = Storage.getPlayer();
        player.avatar = avatar;
        Storage.savePlayer(player);
        document.getElementById('avatar-preview').textContent = avatar;
        document.querySelectorAll('.avatar-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        document.getElementById('avatar-grid').classList.add('hidden');
      });
    });
    // Notification toggle
    document.getElementById('setting-notifications').addEventListener('change', (e) => {
      if (e.target.checked) {
        this.requestNotificationPermission();
      } else {
        Storage.saveNotifEnabled(false);
        document.getElementById('notif-time-setting').classList.add('hidden');
        if (typeof PushNotifications !== 'undefined') {
          PushNotifications.setDailyReminder(false);
        }
      }
    });
    // Notification time change
    const notifTimeInput = document.getElementById('setting-notif-time');
    if (notifTimeInput) {
      notifTimeInput.addEventListener('change', (e) => {
        const [hour, minute] = e.target.value.split(':').map(Number);
        if (typeof PushNotifications !== 'undefined') {
          PushNotifications.setDailyReminder(true, hour, minute);
        }
        this.showToast(`⏰ Recordatorio programado a las ${e.target.value}`);
      });
    }
    // Streak notification toggle
    const streakNotifToggle = document.getElementById('setting-streak-notif');
    if (streakNotifToggle) {
      streakNotifToggle.addEventListener('change', (e) => {
        if (typeof PushNotifications !== 'undefined') {
          PushNotifications.setStreakReminder(e.target.checked);
        }
        Storage.saveStreakNotifEnabled(e.target.checked);
      });
    }
    // Daily challenge
    document.getElementById('btn-daily-challenge').addEventListener('click', () => {
      this.startDailyChallenge();
    });
    // Verse favorite button
    document.getElementById('btn-verse-favorite')?.addEventListener('click', () => {
      this.toggleCurrentVerseFavorite();
    });
    // New verse button
    document.getElementById('btn-verse-new')?.addEventListener('click', () => {
      this.showNewVerse();
    });
    // View favorites button
    document.getElementById('btn-view-favorites')?.addEventListener('click', () => {
      this.showScreen('verses');
    });
  },
  // === HOME ===
  renderHome() {
    const settings = Storage.getSettings();
    const verseCard = document.getElementById('verse-card');
    if (settings.showVerse) {
      verseCard.style.display = 'block';
      this.showDailyVerse();
    } else {
      verseCard.style.display = 'none';
    }
    // Show player level on home
    const player = Storage.getPlayer();
    const subtitle = document.querySelector('.app-subtitle');
    if (subtitle) {
      subtitle.textContent = `!Hola, ${player.name}! · Nivel ${player.level}`;
    }
    // Update home lives card
    this.renderHomeLives();
  },
  showDailyVerse() {
    // Mostrar siempre el primer versiculo para evitar vacios
    const verse = DAILY_VERSES[0];
    this.currentVerse = verse;
    document.getElementById('verse-text').textContent = `"${verse.text}"`;
    document.getElementById('verse-ref').textContent = ` ${verse.ref}`;
    this.updateVerseFavoriteButton();
  },
  showNewVerse() {
    const verse = DAILY_VERSES[Math.floor(Math.random() * DAILY_VERSES.length)];
    this.currentVerse = verse;
    document.getElementById('verse-text').textContent = `"${verse.text}"`;
    document.getElementById('verse-ref').textContent = ` ${verse.ref}`;
    this.updateVerseFavoriteButton();
    const card = document.getElementById('verse-card');
    card.style.display = 'block';
    card.style.animation = 'none';
    card.offsetHeight; // trigger reflow
    card.style.animation = 'slideUp 0.4s ease';
  },
  updateVerseFavoriteButton() {
    const btn = document.getElementById('btn-verse-favorite');
    if (!btn || !this.currentVerse) return;
    const isFav = Storage.isFavoriteVerse(this.currentVerse.text);
    btn.textContent = isFav ? '❤️' : '🤍';
    btn.classList.toggle('is-favorite', isFav);
  },
  toggleCurrentVerseFavorite() {
    if (!this.currentVerse) return;
    
    const isFav = Storage.isFavoriteVerse(this.currentVerse.text);
    if (isFav) {
      Storage.removeFavoriteVerse(this.currentVerse.text);
      this.showToast('💔 Versículo eliminado de favoritos');
    } else {
      Storage.addFavoriteVerse(this.currentVerse);
      this.showToast('❤️ Versículo guardado en favoritos');
    }
    this.updateVerseFavoriteButton();
  },
  // === PANTALLA VERSÍCULOS ===
  versesFilter: 'all',
  renderVerses() {
    const container = document.getElementById('verses-list');
    const emptyState = document.getElementById('verses-empty');
    if (!container) return;
    
    // Bind filter buttons
    document.querySelectorAll('.verses-filter-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.verses-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.versesFilter = btn.dataset.filter;
        this.renderVersesList();
      };
    });
    
    this.renderVersesList();
  },
  renderVersesList() {
    const container = document.getElementById('verses-list');
    const emptyState = document.getElementById('verses-empty');
    const favorites = Storage.getFavoriteVerses();
    
    let versesToShow = [];
    
    if (this.versesFilter === 'all') {
      // Show all verses from DAILY_VERSES, marking favorites
      versesToShow = DAILY_VERSES.map(verse => {
        const fav = favorites.find(f => f.text === verse.text);
        return {
          ...verse,
          isFavorite: !!fav,
          memorized: fav?.memorized || false,
          savedAt: fav?.savedAt
        };
      });
    } else if (this.versesFilter === 'favorites') {
      versesToShow = favorites.map(f => ({
        ...f,
        isFavorite: true
      }));
    } else if (this.versesFilter === 'memorized') {
      versesToShow = favorites.filter(f => f.memorized).map(f => ({
        ...f,
        isFavorite: true
      }));
    }
    
    if (versesToShow.length === 0) {
      container.innerHTML = '';
      emptyState?.classList.remove('hidden');
      return;
    }
    
    emptyState?.classList.add('hidden');
    
    container.innerHTML = versesToShow.map((verse, idx) => `
      <div class="verse-item ${verse.memorized ? 'memorized' : ''}" data-idx="${idx}">
        <div class="verse-item-content">
          <p class="verse-item-text">"${escapeHTML(verse.text)}"</p>
          <p class="verse-item-ref">${escapeHTML(verse.ref)}</p>
        </div>
        <div class="verse-item-actions">
          <button class="verse-item-btn ${verse.isFavorite ? 'active' : ''}" data-action="favorite" data-text="${escapeHTML(verse.text)}" data-ref="${escapeHTML(verse.ref)}" aria-label="${verse.isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}">
            ${verse.isFavorite ? '❤️' : '🤍'}
          </button>
          ${verse.isFavorite ? `
            <button class="verse-item-btn ${verse.memorized ? 'active' : ''}" data-action="memorize" data-text="${escapeHTML(verse.text)}" aria-label="${verse.memorized ? 'Desmarcar memorizado' : 'Marcar como memorizado'}">
              ${verse.memorized ? '✅' : '📝'}
            </button>
          ` : ''}
          <button class="verse-item-btn" data-action="share" data-text="${escapeHTML(verse.text)}" data-ref="${escapeHTML(verse.ref)}" aria-label="Compartir versículo">
            📤
          </button>
        </div>
      </div>
    `).join('');
    
    // Bind actions
    container.querySelectorAll('.verse-item-btn').forEach(btn => {
      btn.onclick = () => {
        const action = btn.dataset.action;
        const text = btn.dataset.text;
        const ref = btn.dataset.ref;
        
        if (action === 'favorite') {
          const isFav = Storage.isFavoriteVerse(text);
          if (isFav) {
            Storage.removeFavoriteVerse(text);
            this.showToast('💔 Eliminado de favoritos');
          } else {
            Storage.addFavoriteVerse({ text, ref });
            this.showToast('❤️ Agregado a favoritos');
          }
          this.renderVersesList();
        } else if (action === 'memorize') {
          const isNowMemorized = Storage.toggleMemorizedVerse(text);
          this.showToast(isNowMemorized ? '✅ Marcado como memorizado' : '📝 Desmarcado');
          this.renderVersesList();
        } else if (action === 'share') {
          this.shareVerse(text, ref);
        }
      };
    });
  },
  shareVerse(text, ref) {
    const shareText = `"${text}" - ${ref}\n\n📖 BibliaQuiz App`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Versículo Bíblico',
        text: shareText
      }).catch(() => {});
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(shareText).then(() => {
        this.showToast('📋 Versículo copiado al portapapeles');
      }).catch(() => {
        this.showToast('No se pudo copiar', 'error');
      });
    }
  },
  // === CATEGORIAS ===
  renderCategories() {
    const grid = document.getElementById('category-grid');
    grid.innerHTML = '';
    Object.entries(CATEGORIES).forEach(([key, cat]) => {
      const card = document.createElement('div');
      card.className = `category-card ${key === 'aleatorio' ? 'random-card' : ''}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Categoria: ${cat.name}`);
      card.innerHTML = `
        <div class="cat-icon" style="background: ${cat.color}22">${cat.icon}</div>
        <span class="cat-name">${escapeHTML(cat.name)}</span>
      `;
      const selectCat = () => {
        this.selectedCategory = key;
        this.showScreen('difficulty-select');
      };
      card.addEventListener('click', selectCat);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCat();
        }
      });
      grid.appendChild(card);
    });
  },
  // === JUEGO ===
  startGame() {
    // Filter questions
    let pool = QUESTIONS_DB.filter(q => q.difficulty === this.selectedDifficulty);
    if (this.selectedCategory && this.selectedCategory !== 'aleatorio') {
      pool = pool.filter(q => q.category === this.selectedCategory);
    }
    // Filter out already-answered questions if noRepeat is enabled
    const settings = Storage.getSettings();
    if (settings.noRepeat) {
      const answered = Storage.getAnswered();
      const filtered = pool.filter(q => !answered.includes(q.id));
      // Only use filtered if we have enough questions left
      if (filtered.length >= 5) {
        pool = filtered;
      }
    }
    // If not enough questions in this combination, add from same difficulty
    if (pool.length < 5) {
      const extra = QUESTIONS_DB.filter(q => q.difficulty === this.selectedDifficulty && !pool.includes(q));
      pool = [...pool, ...extra];
    }
    // Shuffle
    pool = this.shuffle(pool);
    const numQuestions = Math.min(settings.questionsPerGame, pool.length);
    this.currentQuestions = pool.slice(0, numQuestions);
    this.currentQuestionIndex = 0;
    this.currentStreak = 0;
    this.sessionBestStreak = 0;
    this.sessionCorrect = 0;
    this.sessionWrong = 0;
    this.sessionPoints = 0;
    this.timerMax = settings.timerSeconds || 0;
    this.currentPhase = 1;
    this.phaseCorrect = 0;
    this.phaseWrong = 0;
    this.allUsedQuestionIds = pool.slice(0, numQuestions).map(q => q.id);
    this.initialDifficulty = this.selectedDifficulty;
    this.activeDifficulty = this.selectedDifficulty;
    this.categoryExhausted = false;
    this.diffCompletedInSession = [];
    // Cargar vidas
    this.loadLives();
    // Impedir jugar con 0 vidas (salvo infinitas)
    if (!this.infiniteLives && this.lives <= 0) {
      this.showScreen('quiz');
      this.renderLives();
      document.getElementById('gameover-overlay').classList.remove('hidden');
      this._gameoverTrap = this.trapFocus(document.getElementById('gameover-overlay'));
      this.announce('No tienes vidas. Espera a que se regeneren.');
      this.startGameOverRegenTimer();
      return;
    }
    // Track category
    Storage.updateCategoryPlayed(this.selectedCategory);
    // Ocultar overlays
    document.getElementById('phase-overlay').classList.add('hidden');
    document.getElementById('gameover-overlay').classList.add('hidden');
    document.getElementById('ad-overlay').classList.add('hidden');
    document.getElementById('catcomplete-overlay').classList.add('hidden');
    this.cleanOverlayTraps();
    this.showScreen('quiz');
    this.renderLives();
    this.renderQuestion();
  },
  renderQuestion() {
    const q = this.currentQuestions[this.currentQuestionIndex];
    if (!q) return;
    this.answered = false;
    // Scroll al tope para preguntas largas
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const total = this.currentQuestions.length;
    const current = this.currentQuestionIndex + 1;
    // Update top bar
    document.getElementById('question-counter').textContent = `${current}/${total}`;
    document.getElementById('quiz-points').textContent = ` ${this.sessionPoints}`;
    // Phase badge
    const diffInfo = DIFFICULTIES[this.activeDifficulty || this.selectedDifficulty];
    const phaseBadge = document.getElementById('quiz-phase-badge');
    if (phaseBadge) {
      phaseBadge.textContent = `F${this.currentPhase} ${diffInfo ? diffInfo.icon : ''}`;
      phaseBadge.style.background = diffInfo ? diffInfo.color + '33' : '';
      phaseBadge.style.color = diffInfo ? diffInfo.color : '';
    }
    const streakEl = document.getElementById('quiz-streak');
    if (this.currentStreak >= 3) {
      streakEl.textContent = ` ${this.currentStreak}`;
      streakEl.classList.remove('hidden');
    } else {
      streakEl.classList.add('hidden');
    }
    // Progress bar
    const percent = ((current - 1) / total) * 100;
    document.getElementById('progress-fill').style.width = `${percent}%`;
    // Category tag
    const cat = CATEGORIES[q.category] || { icon: '', name: q.category };
    document.getElementById('question-category-tag').innerHTML = `${cat.icon} ${cat.name}`;
    // Question text
    document.getElementById('question-text').textContent = q.question;
    // Options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-label', `Opcion ${letters[i]}: ${opt}`);
      btn.innerHTML = `
        <span class="option-letter" aria-hidden="true">${letters[i]}</span>
        <span class="option-text">${escapeHTML(opt)}</span>
      `;
      btn.addEventListener('click', () => this.selectAnswer(i, btn));
      optionsContainer.appendChild(btn);
    });
    optionsContainer.setAttribute('role', 'listbox');
    optionsContainer.setAttribute('aria-label', 'Opciones de respuesta');
    // Hide reference and next
    document.getElementById('reference-card').classList.add('hidden');
    document.getElementById('next-btn').classList.add('hidden');
    // Animation
    document.querySelector('.question-card').style.animation = 'none';
    document.querySelector('.question-card').offsetHeight;
    document.querySelector('.question-card').style.animation = 'slideUp 0.4s ease';
    // Track answer speed
    this.questionStartTime = performance.now();
    // Start timer
    this.startTimer();
  },
  // === TEMPORIZADOR ===
  startTimer() {
    this.stopTimer();
    const timerEl = document.getElementById('quiz-timer');
    const timerBar = document.getElementById('timer-bar-fill');
    const timerBarContainer = document.querySelector('.timer-bar-container');
    if (!this.timerMax || this.timerMax === 0) {
      timerEl.classList.add('hidden');
      timerBarContainer.classList.add('hidden');
      return;
    }
    timerEl.classList.remove('hidden');
    timerBarContainer.classList.remove('hidden');
    this.timerSeconds = this.timerMax;
    timerEl.textContent = `T: ${this.timerSeconds}`;
    timerEl.className = 'quiz-timer';
    timerBar.style.width = '100%';
    timerBar.className = 'timer-bar-fill';
    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      const percent = (this.timerSeconds / this.timerMax) * 100;
      timerEl.textContent = `T: ${this.timerSeconds}`;
      timerBar.style.width = `${percent}%`;
      // Color changes
      if (this.timerSeconds <= this.timerMax * 0.25) {
        timerEl.className = 'quiz-timer danger';
        timerBar.className = 'timer-bar-fill danger';
      } else if (this.timerSeconds <= this.timerMax * 0.5) {
        timerEl.className = 'quiz-timer warning';
        timerBar.className = 'timer-bar-fill warning';
      }
      if (this.timerSeconds <= 0) {
        this.stopTimer();
        this.timeUp();
      }
    }, 1000);
  },
  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },
  resumeTimer() {
    this.stopTimer();
    const timerEl = document.getElementById('quiz-timer');
    const timerBar = document.getElementById('timer-bar-fill');
    const timerBarContainer = document.querySelector('.timer-bar-container');
    if (!this.timerMax || this.timerMax === 0 || this.timerSeconds <= 0) return;
    timerEl.classList.remove('hidden');
    timerBarContainer.classList.remove('hidden');
    timerEl.textContent = `T: ${this.timerSeconds}`;
    const percent = (this.timerSeconds / this.timerMax) * 100;
    timerBar.style.width = `${percent}%`;
    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      const pct = (this.timerSeconds / this.timerMax) * 100;
      timerEl.textContent = `T: ${this.timerSeconds}`;
      timerBar.style.width = `${pct}%`;
      if (this.timerSeconds <= this.timerMax * 0.25) {
        timerEl.className = 'quiz-timer danger';
        timerBar.className = 'timer-bar-fill danger';
      } else if (this.timerSeconds <= this.timerMax * 0.5) {
        timerEl.className = 'quiz-timer warning';
        timerBar.className = 'timer-bar-fill warning';
      }
      if (this.timerSeconds <= 0) {
        this.stopTimer();
        this.timeUp();
      }
    }, 1000);
  },
  timeUp() {
    if (this.answered) return;
    this.answered = true;
    const q = this.currentQuestions[this.currentQuestionIndex];
    const allBtns = document.querySelectorAll('#options-container .option-btn');
    // Disable all buttons
    allBtns.forEach(b => b.classList.add('disabled'));
    // Mark correct answer
    allBtns[q.correct].classList.add('correct');
    // Count as wrong
    this.handleWrong();
    // Save wrong answer for study mode
    Storage.addWrongAnswer(q.id, -1);
    // Show time's up message
    const timerEl = document.getElementById('quiz-timer');
    timerEl.textContent = 'T: ¡Tiempo!';
    timerEl.className = 'quiz-timer danger';
    // Show reference
    document.getElementById('ref-text').innerHTML = `<strong>T: ¡Se acabó el tiempo!</strong>  ${q.reference}`;
    document.getElementById('reference-card').classList.remove('hidden');
    // Show next button
    const nextBtn = document.getElementById('next-btn');
    const isLast = this.currentQuestionIndex >= this.currentQuestions.length - 1;
    nextBtn.textContent = isLast ? 'Completar Fase ' : 'Siguiente ';
    nextBtn.classList.remove('hidden');
  },
  selectAnswer(index, btnEl) {
    if (this.answered) return;
    this.answered = true;
    this.stopTimer();
    // Track answer speed
    const answerTime = (performance.now() - this.questionStartTime) / 1000;
    this.recordAnswerSpeed(answerTime);
    const q = this.currentQuestions[this.currentQuestionIndex];
    const isCorrect = index === q.correct;
    const allBtns = document.querySelectorAll('#options-container .option-btn');
    // Disable all buttons
    allBtns.forEach(b => b.classList.add('disabled'));
    // Mark correct/wrong + ARIA
    allBtns.forEach(b => b.setAttribute('aria-disabled', 'true'));
    if (isCorrect) {
      btnEl.classList.add('correct');
      btnEl.setAttribute('aria-label', btnEl.getAttribute('aria-label') + '   Correcta');
      this.handleCorrect(q);
      // Save as answered for no-repeat
      const settings = Storage.getSettings();
      if (settings.noRepeat) {
        const answered = Storage.getAnswered();
        if (!answered.includes(q.id)) {
          answered.push(q.id);
          Storage.saveAnswered(answered);
        }
      }
      // Remove from wrong answers if previously wrong
      Storage.removeWrongAnswer(q.id);
    } else {
      btnEl.classList.add('wrong');
      btnEl.setAttribute('aria-label', btnEl.getAttribute('aria-label') + '  Incorrecta');
      allBtns[q.correct].classList.add('correct');
      allBtns[q.correct].setAttribute('aria-label', allBtns[q.correct].getAttribute('aria-label') + '   Respuesta correcta');
      this.handleWrong();
      // Save wrong answer for study mode
      Storage.addWrongAnswer(q.id, index);
    }
    // Show reference
    let refHtml = `<strong>${q.reference}</strong>`;
    if (q.explanation) {
      refHtml += `<br><span class="ref-explanation">${q.explanation}</span>`;
    }
    document.getElementById('ref-text').innerHTML = refHtml;
    document.getElementById('reference-card').classList.remove('hidden');
    // Show next button
    const nextBtn = document.getElementById('next-btn');
    const isLast = this.currentQuestionIndex >= this.currentQuestions.length - 1;
    nextBtn.textContent = isLast ? 'Completar Fase ' : 'Siguiente ';
    nextBtn.classList.remove('hidden');
  },
  handleCorrect(question) {
    const points = DIFFICULTIES[this.activeDifficulty || this.selectedDifficulty]?.points || 10;
    this.sessionCorrect++;
    this.phaseCorrect++;
    this.sessionPoints += points;
    this.currentStreak++;
    // Track session best streak
    if (this.currentStreak > this.sessionBestStreak) {
      this.sessionBestStreak = this.currentStreak;
    }
    // Speed bonus (if timer is active)
    let speedBonus = 0;
    if (this.timerMax > 0 && this.timerSeconds > 0) {
      const timeRatio = this.timerSeconds / this.timerMax;
      if (timeRatio > 0.7) {
        speedBonus = Math.floor(points * 0.5); // 50% bonus for very fast
      } else if (timeRatio > 0.4) {
        speedBonus = Math.floor(points * 0.25); // 25% bonus for fast
      }
      if (speedBonus > 0) {
        this.sessionPoints += speedBonus;
      }
    }
    let popupText = `+${points}`;
    if (speedBonus > 0) popupText += ` eedBonus}`;
    // Streak bonus
    if (this.currentStreak >= 5) {
      const bonus = Math.floor(points * 0.5);
      this.sessionPoints += bonus;
      popupText += ` bonus}`;
      // Mostrar popup de racha en multiplos de 5
      if (this.currentStreak % 5 === 0) {
        this.showStreakPopup(this.currentStreak);
      }
    }
    // Show point popup
    this.showPointPopup(popupText);
    // Update streak display
    const streakEl = document.getElementById('quiz-streak');
    if (this.currentStreak >= 3) {
      streakEl.textContent = ` ${this.currentStreak}`;
      streakEl.classList.remove('hidden');
    }
    document.getElementById('quiz-points').textContent = ` ${this.sessionPoints}`;
    // Sound & Vibrate (variable vibration based on streak)
    this.playSound('correct');
    if (this.currentStreak >= 10) {
      this.vibrate([30, 20, 30, 20, 60]); // epic
    } else if (this.currentStreak >= 5) {
      this.vibrate([30, 20, 50]); // strong
    } else {
      this.vibrate(50); // normal
    }
    this.announce(`!Correcto! +${points} puntos${this.currentStreak >= 5 ? `. Racha de ${this.currentStreak}` : ''}`);
  },
  handleWrong() {
    this.sessionWrong++;
    this.phaseWrong++;
    this.currentStreak = 0;
    document.getElementById('quiz-streak').classList.add('hidden');
    // Quitar una vida (salvo si tiene vidas infinitas)
    if (!this.infiniteLives) {
      this.lives--;
      if (this.lives < 0) this.lives = 0;
      this.saveLivesState();
    }
    this.renderLives();
    this.animateLifeLost();
    // Sound & Vibrate
    this.playSound('wrong');
    this.vibrate([100, 50, 100]);
    this.announce(`Incorrecto. ${this.infiniteLives ? 'Vidas infinitas activas.' : `Te quedan ${this.lives} vida${this.lives !== 1 ? 's' : ''}.`}`);
  },
  nextQuestion() {
    // Verificar si se acabaron las vidas (no aplica con infinitas)
    if (!this.infiniteLives && this.lives <= 0) {
      this.showGameOver();
      return;
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.currentQuestions.length) {
      // Fase completada  mostrar overlay de fase
      this.showPhaseComplete();
    } else {
      this.renderQuestion();
    }
  },
  // === FASE COMPLETADA ===
  showPhaseComplete() {
    this.stopTimer();
    this.playSound('phase');
    // If daily challenge, save completion and show different UI
    if (this.isDailyChallenge) {
      const today = new Date().toISOString().split('T')[0];
      Storage.saveDailyChallenge({
        date: today,
        completed: true,
        score: this.sessionPoints
      });
      this.isDailyChallenge = false;
      // Render daily card as completed
      this.renderDailyChallengeCard();
    }
    const percentage = this.currentQuestions.length > 0
      ? Math.round((this.phaseCorrect / this.currentQuestions.length) * 100) : 0;
    let icon;
    if (percentage === 100) icon = '🏆';
    else if (percentage >= 80) icon = '🌟';
    else if (percentage >= 60) icon = '😊';
    else if (percentage >= 40) icon = '📖';
    else icon = '💪';
    document.getElementById('phase-icon').textContent = icon;
    document.getElementById('phase-title').textContent = `Fase ${this.currentPhase} Completada`;
    document.getElementById('phase-correct').textContent = this.phaseCorrect;
    document.getElementById('phase-wrong').textContent = this.phaseWrong;
    document.getElementById('phase-points').textContent = this.sessionPoints;
    document.getElementById('phase-streak').textContent = this.currentStreak;
    // Determinar si la proxima fase sube de dificultad
    const nextPhase = this.currentPhase + 1;
    const nextDiff = this.getDifficultyForPhase(nextPhase);
    const subtitleEl = document.getElementById('phase-subtitle');
    const diffLabelEl = document.getElementById('phase-diff-label');
    if (nextDiff !== this.activeDifficulty && !this.categoryExhausted) {
      const diffInfo = DIFFICULTIES[nextDiff];
      subtitleEl.textContent = `!Aumento de Dificultad!`;
      diffLabelEl.textContent = `${diffInfo.icon} Siguiente: ${diffInfo.name}`;
      diffLabelEl.style.color = diffInfo.color;
      subtitleEl.classList.remove('hidden');
      diffLabelEl.classList.remove('hidden');
    } else if (this.categoryExhausted) {
      subtitleEl.textContent = '🎉 !Categoria completada!';
      diffLabelEl.textContent = 'Se mezclaran preguntas de todas las categorias';
      diffLabelEl.style.color = 'var(--accent)';
      subtitleEl.classList.remove('hidden');
      diffLabelEl.classList.remove('hidden');
    } else {
      subtitleEl.classList.add('hidden');
      diffLabelEl.classList.add('hidden');
    }
    document.getElementById('phase-overlay').classList.remove('hidden');
    this._phaseOverlayTrap = this.trapFocus(document.getElementById('phase-overlay'));
    this.announce(`Fase ${this.currentPhase} completada. ${this.phaseCorrect} correctas, ${this.phaseWrong} incorrectas.`);
    // Sumar 1 vida al completar fase (maximo 5)
    if (this.lives < this.maxLives) {
      this.lives++;
      this.saveLivesState();
      this.renderLives();
    }
    // Verificar si se completo alguna dificultad de la categoria
    this.checkCategoryCompletion();
  },
  // Determinar la dificultad segun la fase (cada 5 fases sube)
  getDifficultyForPhase(phase) {
    const startIdx = this.difficultyOrder.indexOf(this.initialDifficulty);
    const phasesPerDiff = 5;
    const diffOffset = Math.floor((phase - 1) / phasesPerDiff);
    const idx = Math.min(startIdx + diffOffset, this.difficultyOrder.length - 1);
    return this.difficultyOrder[idx];
  },
  startNextPhase() {
    // Mostrar anuncio cada 2 fases completadas (solo si no es premium)
    const canShowAds = typeof Billing === 'undefined' || Billing.canShowAds();
    if (this.currentPhase % 2 === 0 && canShowAds) {
      document.getElementById('phase-overlay').classList.add('hidden');
      this.showAdOverlay(() => {
        this._doStartNextPhase();
      });
      return;
    }
    this._doStartNextPhase();
  },
  _doStartNextPhase() {
    this.currentPhase++;
    this.phaseCorrect = 0;
    this.phaseWrong = 0;
    this.cleanOverlayTraps();
    // Determinar la dificultad para esta fase
    const newDiff = this.getDifficultyForPhase(this.currentPhase);
    if (newDiff !== this.activeDifficulty) {
      this.activeDifficulty = newDiff;
      this.selectedDifficulty = newDiff;
    }
    const settings = Storage.getSettings();
    const numQuestions = settings.questionsPerGame || 10;
    // Intentar cargar preguntas de la categoria + dificultad actual
    let pool = this.getPoolForPhase(this.activeDifficulty, this.selectedCategory);
    // Si no hay suficientes en la dificultad actual, buscar en dificultades superiores
    if (pool.length < 5) {
      const currentIdx = this.difficultyOrder.indexOf(this.activeDifficulty);
      for (let i = currentIdx + 1; i < this.difficultyOrder.length && pool.length < 5; i++) {
        const extraDiff = this.difficultyOrder[i];
        const extra = this.getPoolForPhase(extraDiff, this.selectedCategory);
        pool = [...pool, ...extra];
      }
    }
    // Si aun no hay suficientes  categoria agotada, mezclar todas las categorias
    if (pool.length < 5) {
      this.categoryExhausted = true;
      pool = QUESTIONS_DB.filter(q => !this.allUsedQuestionIds.includes(q.id));
      // Si todas las preguntas estan usadas, resetear
      if (pool.length < 5) {
        this.allUsedQuestionIds = [];
        pool = QUESTIONS_DB.slice();
      }
    }
    pool = this.shuffle(pool);
    const count = Math.min(numQuestions, pool.length);
    this.currentQuestions = pool.slice(0, count);
    this.allUsedQuestionIds.push(...this.currentQuestions.map(q => q.id));
    this.currentQuestionIndex = 0;
    // Ocultar overlay y mostrar siguiente pregunta
    document.getElementById('phase-overlay').classList.add('hidden');
    this.renderQuestion();
  },
  // Obtener preguntas disponibles para una dificultad y categoria
  getPoolForPhase(difficulty, category) {
    let pool = QUESTIONS_DB.filter(q => q.difficulty === difficulty);
    if (category && category !== 'aleatorio') {
      pool = pool.filter(q => q.category === category);
    }
    pool = pool.filter(q => !this.allUsedQuestionIds.includes(q.id));
    return pool;
  },
  // ========== SISTEMA DE VIDAS ==========
  loadLives() {
    const data = Storage.getLives();
    this.lives = typeof data.lives === 'number' && !isNaN(data.lives) ? data.lives : 5;
    // Regenerar vidas por tiempo transcurrido
    if (data.lastLostTime && this.lives < this.maxLives) {
      const elapsed = Date.now() - data.lastLostTime;
      const regenMs = 10 * 60 * 1000; // 10 minutos
      const livesGained = Math.floor(elapsed / regenMs);
      if (livesGained > 0) {
        this.lives = Math.min(this.maxLives, this.lives + livesGained);
        this.saveLivesState();
      }
    }
  },
  saveLivesState() {
    Storage.saveLives({
      lives: this.lives,
      lastLostTime: this.lives < this.maxLives ? Date.now() : null
    });
  },
  startLifeRegen() {
    // Verificar cada segundo si hay que regenerar
    if (this.lifeRegenInterval) clearInterval(this.lifeRegenInterval);
    this.lifeRegenInterval = setInterval(() => {
      if (this.lives >= this.maxLives) return; // No regenerar si ya esta lleno
      const data = Storage.getLives();
      if (data.lastLostTime) {
        const elapsed = Date.now() - data.lastLostTime;
        const regenMs = 10 * 60 * 1000;
        if (elapsed >= regenMs) {
          this.lives = Math.min(this.maxLives, this.lives + 1);
          this.saveLivesState();
          this.renderLives();
          // Actualizar timer de game over si esta visible
          if (!document.getElementById('gameover-overlay').classList.contains('hidden')) {
            if (this.lives > 0) {
              document.getElementById('gameover-overlay').classList.add('hidden');
            }
          }
        }
      }
    }, 1000);
  },
  renderLives() {
    const livesEl = document.getElementById('quiz-lives');
    if (!livesEl) return;
    if (this.infiniteLives) {
      livesEl.textContent = '';
      return;
    }
    let hearts = '';
    for (let i = 0; i < this.maxLives; i++) {
      hearts += i < this.lives ? '❤️' : '🖤';
    }
    livesEl.textContent = hearts;
  },
  animateLifeLost() {
    const livesEl = document.getElementById('quiz-lives');
    if (!livesEl) return;
    livesEl.classList.add('life-lost-shake');
    setTimeout(() => livesEl.classList.remove('life-lost-shake'), 600);
  },
  // ========== HOME LIVES DISPLAY + TIMER ==========
  loadInfiniteLives() {
    this.infiniteLives = localStorage.getItem('bq_infiniteLives') === 'true';
  },
  saveInfiniteLives() {
    localStorage.setItem('bq_infiniteLives', this.infiniteLives ? 'true' : 'false');
  },
  renderHomeLives() {
    const heartsEl = document.getElementById('home-lives-hearts');
    const countEl = document.getElementById('home-lives-count');
    const timerWrap = document.getElementById('home-lives-timer-wrap');
    const card = document.getElementById('home-lives-card');
    if (!heartsEl) return;
    if (this.infiniteLives) {
      heartsEl.textContent = '♾️';
      countEl.textContent = 'Infinitas';
      timerWrap.classList.add('hidden');
      card.classList.add('infinite-active');
      return;
    }
    card.classList.remove('infinite-active');
    let hearts = '';
    for (let i = 0; i < this.maxLives; i++) {
      hearts += i < this.lives ? '❤️' : '🖤';
    }
    heartsEl.textContent = hearts;
    countEl.textContent = `${this.lives}/${this.maxLives}`;
    // Show/hide timer
    if (this.lives < this.maxLives) {
      timerWrap.classList.remove('hidden');
      this.updateHomeLivesTimer();
    } else {
      timerWrap.classList.add('hidden');
    }
  },
  startHomeLivesTimer() {
    if (this.homeLivesTimerInterval) clearInterval(this.homeLivesTimerInterval);
    this.homeLivesTimerInterval = setInterval(() => {
      this.updateHomeLivesTimer();
    }, 1000);
  },
  updateHomeLivesTimer() {
    const timerEl = document.getElementById('home-lives-timer');
    const timerWrap = document.getElementById('home-lives-timer-wrap');
    if (!timerEl || !timerWrap) return;
    if (this.infiniteLives || this.lives >= this.maxLives) {
      timerWrap.classList.add('hidden');
      return;
    }
    const data = Storage.getLives();
    if (!data.lastLostTime) {
      timerWrap.classList.add('hidden');
      return;
    }
    const elapsed = Date.now() - data.lastLostTime;
    const regenMs = 10 * 60 * 1000;
    const remaining = Math.max(0, regenMs - elapsed);
    if (remaining <= 0) {
      timerWrap.classList.add('hidden');
      // Life regenerated  update
      this.loadLives();
      this.renderHomeLives();
      this.renderLives();
      return;
    }
    timerWrap.classList.remove('hidden');
    const mins = Math.floor(remaining / 60000);
    const secs = Math.floor((remaining % 60000) / 1000);
    timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  },
  // ========== TIENDA ==========
  renderShop() {
    // Update lives display
    const heartsEl = document.getElementById('shop-lives-hearts');
    const textEl = document.getElementById('shop-lives-text');
    if (this.infiniteLives) {
      heartsEl.textContent = '';
      textEl.textContent = 'Vidas infinitas activas';
    } else {
      let hearts = '';
      for (let i = 0; i < this.maxLives; i++) {
        hearts += i < this.lives ? '❤️' : '🖤';
      }
      heartsEl.textContent = hearts;
      textEl.textContent = `${this.lives}/${this.maxLives} vidas`;
    }
    // Update infinite button label
    const label = document.getElementById('infinite-lives-label');
    const btn = label ? label.closest('.shop-item-btn') : null;
    if (btn) {
      if (this.infiniteLives) {
        label.textContent = 'Desactivar';
        btn.classList.add('active');
      } else {
        label.textContent = 'Activar';
        btn.classList.remove('active');
      }
    }
  },
  handleShopBuy(action) {
    // Nueva lógica de compra usando Billing
    if (typeof Billing !== 'undefined') {
      this.handleShopBuyNew(action);
      return;
    }
    // Fallback legacy
    if (action === '1') {
      if (this.lives >= this.maxLives) {
        this.showToast('❤️ Ya tienes todas las vidas', 'info');
        return;
      }
      this.lives = Math.min(this.maxLives, this.lives + 1);
      this.saveLivesState();
      this.playSound('correct');
      this.showToast('❤️ +1 vida obtenida');
    } else if (action === 'full') {
      if (this.lives >= this.maxLives) {
        this.showToast('❤️ Ya tienes todas las vidas', 'info');
        return;
      }
      this.lives = this.maxLives;
      this.saveLivesState();
      this.playSound('correct');
      this.showToast('💕 ¡Vidas al máximo!');
    } else if (action === 'infinite') {
      this.infiniteLives = !this.infiniteLives;
      this.saveInfiniteLives();
      if (this.infiniteLives) {
        this.playSound('correct');
        this.showToast(' !Vidas infinitas activadas!');
      } else {
        this.showToast('Vidas infinitas desactivadas');
      }
    }
    this.renderShop();
    this.renderLives();
    this.renderHomeLives();
  },
  
  // === NUEVAS FUNCIONES DE BILLING ===
  async handleShopBuyNew(productId) {
    if (!productId) return;
    
    // Mapear IDs antiguos a nuevos
    const productMap = {
      '1': 'life_1',
      'full': 'life_full',
      'infinite': 'premium_monthly'
    };
    
    const mappedId = productMap[productId] || productId;
    
    // Verificar si ya tiene vidas completas para productos de vidas
    if (mappedId === 'life_1' || mappedId === 'life_full') {
      if (this.lives >= this.maxLives && !Billing.isPremium) {
        this.showToast('❤️ Ya tienes todas las vidas', 'info');
        return;
      }
    }
    
    // Iniciar compra
    this.showToast('🛒 Procesando...', 'info');
    
    const result = await Billing.purchase(mappedId);
    
    if (result.success) {
      console.log('[Shop] Compra exitosa:', result.purchase);
    } else if (result.error !== 'cancelled') {
      this.showToast('❌ Error: ' + result.error, 'error');
    }
  },
  
  onPurchaseComplete(purchase) {
    switch (purchase.productId) {
      case 'life_1':
        this.lives = Math.min(this.maxLives, this.lives + 1);
        this.saveLivesState();
        this.playSound('correct');
        this.showToast('❤️ +1 vida obtenida');
        break;
        
      case 'life_full':
        this.lives = this.maxLives;
        this.saveLivesState();
        this.playSound('correct');
        this.showToast('💕 ¡Vidas al máximo!');
        break;
        
      case 'premium_monthly':
      case 'premium_yearly':
        this.infiniteLives = true;
        this.saveInfiniteLives();
        this.playSound('complete');
        this.showToast('👑 ¡Bienvenido a Premium!');
        const stats = Storage.getStats();
        stats.isPremium = true;
        stats.premiumDate = new Date().toISOString();
        Storage.saveStats(stats);
        break;
        
      case 'remove_ads':
        this.playSound('complete');
        this.showToast('🚫 ¡Anuncios eliminados!');
        break;
    }
    
    this.renderShop();
    this.renderLives();
    this.renderHomeLives();
  },
  
  async handleRestorePurchases() {
    this.showToast('🔄 Restaurando compras...', 'info');
    
    try {
      const purchases = await Billing.restorePurchases();
      
      if (purchases.length > 0) {
        Billing.checkPremiumStatus();
        
        if (Billing.isPremium) {
          this.infiniteLives = true;
          this.saveInfiniteLives();
        }
        
        this.renderShop();
        this.showToast('✅ Compras restauradas: ' + purchases.length);
      } else {
        this.showToast('ℹ️ No hay compras para restaurar', 'info');
      }
    } catch (e) {
      this.showToast('❌ Error al restaurar', 'error');
    }
  },
  
  async handleManageSubscription() {
    const result = await this.showConfirmModal(
      '⚙️ Gestionar Suscripción',
      '¿Qué deseas hacer con tu suscripción Premium?',
      'Cancelar Suscripción',
      'Volver'
    );
    
    if (result) {
      const cancelResult = await Billing.cancelSubscription();
      if (cancelResult.success) {
        this.showToast('📋 ' + cancelResult.message);
        this.renderShop();
      } else {
        this.showToast('❌ ' + cancelResult.error, 'error');
      }
    }
  },
  
  showConfirmModal(title, message, confirmText, cancelText) {
    return new Promise((resolve) => {
      const modal = document.getElementById('reset-modal');
      const modalTitle = modal.querySelector('h3');
      const modalMsg = modal.querySelector('p');
      const confirmBtn = document.getElementById('modal-confirm');
      const cancelBtn = document.getElementById('modal-cancel');
      
      modalTitle.textContent = title;
      modalMsg.textContent = message;
      confirmBtn.textContent = confirmText;
      cancelBtn.textContent = cancelText;
      
      modal.classList.remove('hidden');
      
      const handleConfirm = () => {
        modal.classList.add('hidden');
        cleanup();
        resolve(true);
      };
      
      const handleCancel = () => {
        modal.classList.add('hidden');
        cleanup();
        resolve(false);
      };
      
      const cleanup = () => {
        confirmBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', handleCancel);
      };
      
      confirmBtn.addEventListener('click', handleConfirm);
      cancelBtn.addEventListener('click', handleCancel);
    });
  },
  
  showNoLivesScreen() {
    // Mostrar el game over overlay como pantalla de "sin vidas"
    document.getElementById('gameover-phase').textContent = '-';
    document.getElementById('gameover-correct').textContent = '-';
    document.getElementById('gameover-wrong').textContent = '-';
    document.getElementById('gameover-points').textContent = '-';
    document.getElementById('phase-overlay').classList.add('hidden');
    this.startGameOverRegenTimer();
    this.showScreen('quiz');
    document.getElementById('gameover-overlay').classList.remove('hidden');
    this._gameoverTrap = this.trapFocus(document.getElementById('gameover-overlay'));
    this.announce('Sin vidas. Espera a que se regeneren para continuar.');
  },
  // ========== GAME OVER ==========
  showGameOver() {
    this.stopTimer();
    document.getElementById('gameover-phase').textContent = this.currentPhase;
    document.getElementById('gameover-correct').textContent = this.sessionCorrect;
    document.getElementById('gameover-wrong').textContent = this.sessionWrong;
    document.getElementById('gameover-points').textContent = this.sessionPoints;
    // Iniciar countdown de regeneracion
    this.startGameOverRegenTimer();
    document.getElementById('gameover-overlay').classList.remove('hidden');
    this._gameoverTrap = this.trapFocus(document.getElementById('gameover-overlay'));
    this.announce(`Fin del juego. Fase ${this.currentPhase}. ${this.sessionCorrect} correctas, ${this.sessionWrong} incorrectas, ${this.sessionPoints} puntos.`);
  },
  startGameOverRegenTimer() {
    const timerEl = document.getElementById('gameover-regen-timer');
    if (this._gameoverRegenInterval) clearInterval(this._gameoverRegenInterval);
    this._gameoverRegenInterval = setInterval(() => {
      const data = Storage.getLives();
      if (!data.lastLostTime) {
        timerEl.textContent = '00:00';
        clearInterval(this._gameoverRegenInterval);
        return;
      }
      const elapsed = Date.now() - data.lastLostTime;
      const regenMs = 10 * 60 * 1000;
      const remaining = Math.max(0, regenMs - elapsed);
      if (remaining <= 0) {
        this.lives = Math.min(this.maxLives, this.lives + 1);
        this.saveLivesState();
        timerEl.textContent = '00:00';
        clearInterval(this._gameoverRegenInterval);
        // Habilitar continuar
        if (this.lives > 0) {
          document.getElementById('gameover-overlay').classList.add('hidden');
          this.cleanOverlayTraps();
          this.renderLives();
          // Avanzar a la siguiente pregunta (no repetir la actual)
          this.currentQuestionIndex++;
          if (this.currentQuestionIndex >= this.currentQuestions.length) {
            this.showPhaseComplete();
          } else {
            this.renderQuestion();
          }
        }
        return;
      }
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);
  },
  watchAdForLife() {
    // Simular ver un anuncio/video
    document.getElementById('gameover-overlay').classList.add('hidden');
    this.showAdOverlay(() => {
      // Dar una vida
      this.lives = Math.min(this.maxLives, this.lives + 1);
      this.saveLivesState();
      this.renderLives();
      // Avanzar a la siguiente pregunta (no repetir la actual)
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex >= this.currentQuestions.length) {
        this.showPhaseComplete();
      } else {
        this.renderQuestion();
      }
    });
  },
  // ========== ANUNCIOS ==========
  showAdOverlay(onComplete) {
    // Si el usuario es premium, no mostrar anuncios
    const canShowAds = typeof Billing === 'undefined' || Billing.canShowAds();
    if (!canShowAds) {
      if (onComplete) onComplete();
      return;
    }
    
    this._adCallback = onComplete;
    const overlay = document.getElementById('ad-overlay');
    const closeBtn = document.getElementById('btn-close-ad');
    const countdownEl = document.getElementById('ad-countdown');
    closeBtn.classList.add('hidden');
    closeBtn.disabled = true;
    closeBtn.setAttribute('aria-disabled', 'true');
    overlay.classList.remove('hidden');
    // Bloquear cierre con Escape o click fuera
    const blockClose = (e) => {
      if (e.key === 'Escape') e.preventDefault();
      if (e.type === 'mousedown' && !overlay.contains(e.target)) e.preventDefault();
    };
    document.addEventListener('keydown', blockClose, true);
    document.addEventListener('mousedown', blockClose, true);
    overlay._blockClose = blockClose;
    let seconds = 5;
    countdownEl.textContent = seconds;
    // Refuerzo: deshabilitar click y focus mientras este deshabilitado
    closeBtn.onclick = (e) => {
      if (closeBtn.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      this.closeAd();
    };
    closeBtn.addEventListener('keydown', (e) => {
      if (closeBtn.disabled) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    });
    if (this._adCountdownInterval) clearInterval(this._adCountdownInterval);
    this._adCountdownInterval = setInterval(() => {
      seconds--;
      countdownEl.textContent = seconds > 0 ? seconds : '';
      if (seconds <= 0) {
        clearInterval(this._adCountdownInterval);
        closeBtn.classList.remove('hidden');
        closeBtn.disabled = false;
        closeBtn.setAttribute('aria-disabled', 'false');
        closeBtn.focus();
      }
    }, 1000);
  },
  closeAd() {
    const overlay = document.getElementById('ad-overlay');
    overlay.classList.add('hidden');
    // Quitar bloqueo de cierre
    if (overlay._blockClose) {
      document.removeEventListener('keydown', overlay._blockClose, true);
      document.removeEventListener('mousedown', overlay._blockClose, true);
      overlay._blockClose = null;
    }
    if (this._adCallback) {
      this._adCallback();
      this._adCallback = null;
    }
  },
  // ========== TRACKING DE CATEGORIA COMPLETADA ==========
  checkCategoryCompletion() {
    if (!this.selectedCategory || this.selectedCategory === 'aleatorio') return;
    const cat = this.selectedCategory;
    const completedDiffs = [];
    // Verificar que dificultades ya estan agotadas para esta categoria
    for (const diff of this.difficultyOrder) {
      const totalInDb = QUESTIONS_DB.filter(q => q.category === cat && q.difficulty === diff).length;
      const usedInSession = this.allUsedQuestionIds.filter(id => {
        const q = QUESTIONS_DB.find(qq => qq.id === id);
        return q && q.category === cat && q.difficulty === diff;
      }).length;
      if (totalInDb > 0 && usedInSession >= totalInDb) {
        completedDiffs.push(diff);
      }
    }
    // Registrar nuevas dificultades completadas
    const newlyCompleted = completedDiffs.filter(d => !this.diffCompletedInSession.includes(d));
    if (newlyCompleted.length > 0) {
      this.diffCompletedInSession.push(...newlyCompleted);
      // Guardar en storage
      const catComplete = Storage.getCategoryComplete();
      if (!catComplete[cat]) catComplete[cat] = [];
      for (const d of newlyCompleted) {
        if (!catComplete[cat].includes(d)) catComplete[cat].push(d);
      }
      Storage.saveCategoryComplete(catComplete);
      // Mostrar overlay de categoria completada
      this.showCategoryComplete(cat, newlyCompleted, completedDiffs.length === 4);
    }
  },
  showCategoryComplete(category, newDiffs, allFour) {
    const catInfo = CATEGORIES[category];
    const titleEl = document.getElementById('catcomplete-title');
    const subtitleEl = document.getElementById('catcomplete-subtitle');
    const medalsEl = document.getElementById('catcomplete-medals');
    if (allFour) {
      titleEl.textContent = `  !${catInfo.name} Completado!`;
      subtitleEl.textContent = '!Has completado las 4 dificultades!';
    } else {
      titleEl.textContent = `${catInfo.icon} ${catInfo.name}`;
      subtitleEl.textContent = 'Dificultad completada:';
    }
    // Mostrar medallas
    medalsEl.innerHTML = '';
    const catComplete = Storage.getCategoryComplete();
    const allDone = catComplete[category] || [];
    for (const diff of this.difficultyOrder) {
      const diffInfo = DIFFICULTIES[diff];
      const isDone = allDone.includes(diff);
      const isNew = newDiffs.includes(diff);
      const medal = document.createElement('div');
      medal.className = `catcomplete-medal ${isDone ? 'earned' : 'locked'} ${isNew ? 'new-medal' : ''}`;
      medal.innerHTML = `
        <span class="medal-icon">${isDone ? '🏅' : '🔒'}</span>
        <span class="medal-name" style="color: ${isDone ? diffInfo.color : '#666'}">${diffInfo.icon} ${diffInfo.name}</span>
      `;
      medalsEl.appendChild(medal);
    }
    document.getElementById('catcomplete-overlay').classList.remove('hidden');
    this._catcompleteTrap = this.trapFocus(document.getElementById('catcomplete-overlay'));
    this.announce('!Nuevas dificultades desbloqueadas en esta categoria!');
  },
  // === PANTALLA DE PAUSA ===
  showPauseScreen() {
    this.stopTimer();
    const total = this.currentQuestions.length;
    const answered = this.currentQuestionIndex;
    const remaining = total - answered;
    const percentage = answered > 0 ? Math.round((this.sessionCorrect / answered) * 100) : 0;
    // Mensaje motivador
    let motivation, icon;
    if (percentage >= 90) {
      icon = '💯'; motivation = '!Increible! Vas como un verdadero sabio biblico.';
    } else if (percentage >= 70) {
      icon = '🌟'; motivation = '!Muy bien! Tu conocimiento brilla con fuerza.';
    } else if (percentage >= 50) {
      icon = '😊'; motivation = '!Sigue adelante! La Palabra de Dios te guia.';
    } else {
      icon = '💪'; motivation = '!No te rindas! Cada pregunta es una oportunidad de aprender.';
    }
    document.getElementById('pause-icon').textContent = icon;
    document.getElementById('pause-motivation').textContent = motivation;
    document.getElementById('pause-correct').textContent = this.sessionCorrect;
    document.getElementById('pause-wrong').textContent = this.sessionWrong;
    document.getElementById('pause-points').textContent = this.sessionPoints;
    document.getElementById('pause-remaining').textContent = remaining;
    document.getElementById('pause-streak-display').textContent = this.currentStreak > 0 ? ` Racha actual: ${this.currentStreak}` : '';
    // Versiculo de animo
    const verse = DAILY_VERSES[Math.floor(Math.random() * DAILY_VERSES.length)];
    document.getElementById('pause-verse').textContent = `"${verse.text}"`;
    document.getElementById('pause-verse-ref').textContent = ` ${verse.ref}`;
    this.showScreen('pause');
  },
  endGame() {
    this.stopTimer();
    // Clear gameover regen interval
    if (this._gameoverRegenInterval) {
      clearInterval(this._gameoverRegenInterval);
      this._gameoverRegenInterval = null;
    }
    // Reset daily challenge flag
    this.isDailyChallenge = false;
    // Si no se respondio ninguna pregunta, no contar como partida
    const totalAnswered = this.sessionCorrect + this.sessionWrong;
    if (totalAnswered === 0) {
      this.showScreen('home');
      this.renderHome();
      return;
    }
    // Update stats
    const stats = Storage.getStats();
    stats.totalPoints += this.sessionPoints;
    stats.totalCorrect += this.sessionCorrect;
    stats.totalWrong += this.sessionWrong;
    stats.totalAnswered += totalAnswered;
    stats.totalGames++;
    if (this.sessionBestStreak > stats.bestStreak) {
      stats.bestStreak = this.sessionBestStreak;
    }
    const totalQ = this.currentQuestions.length;
    if (this.sessionCorrect === totalQ && totalQ > 0) {
      stats.perfectGames++;
    }
    // Usar activeDifficulty para contar correctas en modo experto (incluye escalado)
    if (this.activeDifficulty === 'experto' || this.selectedDifficulty === 'experto') {
      stats.expertCorrect += this.sessionCorrect;
    }
    Storage.saveStats(stats);
    // Add to leaderboard
    const player = Storage.getPlayer();
    Storage.addLeaderboardEntry({
      name: player.name,
      avatar: player.avatar,
      points: this.sessionPoints,
      correct: this.sessionCorrect,
      total: this.currentQuestions.length,
      difficulty: this.selectedDifficulty,
      category: this.selectedCategory
    });
    // Update category stats
    Storage.updateCategoryStatsData(this.selectedCategory, this.sessionCorrect, this.sessionWrong);
    // Add XP
    Storage.addXP(this.sessionPoints);
    // Save to history
    Storage.addGameToHistory({
      difficulty: this.selectedDifficulty,
      category: this.selectedCategory,
      correct: this.sessionCorrect,
      wrong: this.sessionWrong,
      total: totalQ,
      points: this.sessionPoints,
      streak: this.currentStreak
    });
    // Check badges
    const newBadges = Storage.checkNewBadges();
    // Render results
    this.renderResults(newBadges);
    this.showScreen('results');
    // Confetti on good performance
    const percentage = (this.sessionCorrect / totalQ) * 100;
    if (percentage >= 80) {
      this.showConfetti();
    }
  },
  renderResults(newBadges) {
    const total = this.currentQuestions.length;
    const percentage = Math.round((this.sessionCorrect / total) * 100);
    const player = Storage.getPlayer();
    // Icon & title based on score
    let icon, title, subtitle;
    if (percentage === 100) {
      icon = '🎉'; title = '!PERFECTO!'; subtitle = '!No has fallado ninguna!';
    } else if (percentage >= 80) {
      icon = '🌟'; title = '!Excelente!'; subtitle = '!Conoces muy bien la Biblia!';
    } else if (percentage >= 60) {
      icon = '😊'; title = '!Bien hecho!'; subtitle = 'Sigue estudiando la Palabra';
    } else if (percentage >= 40) {
      icon = '📚'; title = 'Puedes mejorar'; subtitle = 'No te rindas, sigue aprendiendo';
    } else {
      icon = '📖'; title = 'A estudiar'; subtitle = 'La Palabra de Dios es tu guia';
    }
    document.getElementById('results-icon').textContent = icon;
    document.getElementById('results-title').textContent = title;
    document.getElementById('results-subtitle').textContent = subtitle;
    document.getElementById('stat-correct').textContent = this.sessionCorrect;
    document.getElementById('stat-wrong').textContent = this.sessionWrong;
    document.getElementById('stat-points').textContent = this.sessionPoints;
    document.getElementById('stat-level').textContent = `Nv. ${player.level}`;
    // New badges
    const badgesContainer = document.getElementById('new-badges');
    if (newBadges.length > 0) {
      badgesContainer.style.display = 'block';
      const list = badgesContainer.querySelector('.badge-list-horizontal');
      list.innerHTML = newBadges.map(b => `
        <div class="badge-pill">${b.icon} ${b.name}</div>
      `).join('');
    } else {
      badgesContainer.style.display = 'none';
    }
  },
  // === PROGRESO ===
  renderProgress() {
    const player = Storage.getPlayer();
    const stats = Storage.getStats();
    const history = Storage.getHistory();
    const earnedBadges = Storage.getBadges();
    // Player card
    document.getElementById('progress-avatar').textContent = player.avatar;
    document.getElementById('progress-name').textContent = player.name;
    document.getElementById('progress-email').textContent = player.email ? ` ${player.email}` : '';
    document.getElementById('progress-age').textContent = player.age ? ` ${player.age} anos` : '';
    document.getElementById('progress-level').textContent = `Nivel ${player.level}· ${this.getLevelTitle(player.level)}`;
    const xpPercent = player.xpToNext > 0 ? (player.xp / player.xpToNext) * 100 : 0;
    document.getElementById('progress-xp-fill').style.width = `${xpPercent}%`;
    document.getElementById('progress-xp-text').textContent = `${player.xp} / ${player.xpToNext} XP`;
    // Stats
    document.getElementById('stat-total-points').textContent = stats.totalPoints.toLocaleString();
    document.getElementById('stat-games-played').textContent = stats.totalGames;
    document.getElementById('stat-best-streak').textContent = ` ${stats.bestStreak}`;
    // Accuracy
    const accuracy = stats.totalAnswered > 0 ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100) : 0;
    const accuracyFill = document.getElementById('accuracy-fill');
    accuracyFill.style.width = `${accuracy}%`;
    accuracyFill.textContent = `${accuracy}%`;
    let accColor;
    if (accuracy >= 80) accColor = 'var(--success)';
    else if (accuracy >= 60) accColor = 'var(--warning)';
    else accColor = 'var(--danger)';
    accuracyFill.style.background = accColor;
    // Speed stats
    const speedStats = Storage.getSpeedStats();
    const avgSpeed = speedStats.totalAnswered > 0 ? (speedStats.totalTime / speedStats.totalAnswered).toFixed(1) : '';
    const fastSpeed = speedStats.fastest !== null ? speedStats.fastest.toFixed(1) : '';
    const slowSpeed = speedStats.slowest !== null ? speedStats.slowest.toFixed(1) : '';
    document.getElementById('stat-avg-speed').textContent = avgSpeed;
    document.getElementById('stat-fast-speed').textContent = fastSpeed;
    document.getElementById('stat-slow-speed').textContent = slowSpeed;
    // Badges
    const badgesGrid = document.getElementById('badges-grid');
    badgesGrid.innerHTML = BADGES.map(badge => {
      const isEarned = earnedBadges.includes(badge.id);
      return `
        <div class="badge-item ${isEarned ? 'earned' : 'locked'}" title="${badge.description}">
          <span class="badge-icon">${badge.icon}</span>
          <span class="badge-name">${badge.name}</span>
        </div>
      `;
    }).join('');
    // Category Stats
    this.renderCategoryStats();
    // Progress Chart
    this.renderProgressChart();
    // Leaderboard
    this.renderLeaderboard();
    // History
    const historyList = document.getElementById('history-list');
    if (history.length === 0) {
      historyList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">iv>
          <div class="empty-text">Aun no has jugado ninguna partida</div>
        </div>
      `;
    } else {
      historyList.innerHTML = history.slice(0, 20).map(h => {
        const diff = DIFFICULTIES[h.difficulty] || {};
        const cat = CATEGORIES[h.category] || {};
        const date = new Date(h.date);
        const dateStr = date.toLocaleDateString('es', { day: '2-digit', month: 'short' });
        return `
          <div class="history-item">
            <div class="hi-left">
              <span>${diff.icon || ''}</span>
              <span>${cat.icon || ''} ${h.correct}/${h.total}</span>
            </div>
            <span class="hi-score">+${h.points} pts</span>
            <span class="hi-date">${dateStr}</span>
          </div>
        `;
      }).join('');
    }
  },
  getLevelTitle(level) {
    if (level >= 50) return 'Apostol';
    if (level >= 40) return 'Profeta';
    if (level >= 30) return 'Sacerdote';
    if (level >= 20) return 'Maestro';
    if (level >= 15) return 'Estudioso';
    if (level >= 10) return 'Discipulo';
    if (level >= 5) return 'Explorador';
    return 'Aprendiz';
  },
  // === CONFIGURACION ===
  renderSettings() {
    const player = Storage.getPlayer();
    const settings = Storage.getSettings();
    document.getElementById('setting-name').value = player.name;
    document.getElementById('setting-email').value = player.email || '';
    document.getElementById('setting-age').value = player.age || '';
    document.getElementById('setting-gender').value = player.gender || '';
    document.getElementById('setting-questions').value = settings.questionsPerGame;
    document.getElementById('setting-timer').value = settings.timerSeconds !== undefined ? settings.timerSeconds : 30;
    document.getElementById('setting-no-repeat').checked = settings.noRepeat !== false;
    document.getElementById('setting-sound').checked = settings.sound;
    document.getElementById('setting-vibration').checked = settings.vibration;
    document.getElementById('setting-verse').checked = settings.showVerse;
    // Avatar
    document.getElementById('avatar-preview').textContent = player.avatar || '';
    document.querySelectorAll('.avatar-option').forEach(btn => {
      btn.classList.toggle('selected', btn.dataset.avatar === player.avatar);
    });
    document.getElementById('avatar-grid').classList.add('hidden');
    // Theme 3-way
    this.updateThemeButtons(Storage.getTheme());
    // Notifications
    const notifEnabled = Storage.getNotifEnabled();
    document.getElementById('setting-notifications').checked = notifEnabled;
    
    // Show/hide notification time input based on permission status
    const notifTimeSettingEl = document.getElementById('notif-time-setting');
    if (notifTimeSettingEl) {
      if (notifEnabled && Notification.permission === 'granted') {
        notifTimeSettingEl.classList.remove('hidden');
        document.getElementById('setting-notif-time').value = Storage.getNotifTime();
      } else {
        notifTimeSettingEl.classList.add('hidden');
      }
    }
    
    // Streak notification toggle
    const streakNotifToggle = document.getElementById('setting-streak-notif');
    if (streakNotifToggle) {
      streakNotifToggle.checked = Storage.getStreakNotifEnabled();
    }
  },
  loadSettings() {
    // Just ensure defaults exist
    Storage.getSettings();
    Storage.getPlayer();
  },
  // === UTILIDADES ===
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },
  showPointPopup(text) {
    const popup = document.createElement('div');
    popup.className = 'point-popup';
    popup.textContent = text;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1000);
  },
  showConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    const colors = ['#FFD93D', '#FF6584', '#6C63FF', '#4CAF50', '#FF9800', '#00BCD4'];
    for (let i = 0; i < 50; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 2 + 's';
      piece.style.animationDuration = (2 + Math.random() * 2) + 's';
      piece.style.width = (6 + Math.random() * 8) + 'px';
      piece.style.height = piece.style.width;
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      container.appendChild(piece);
    }
    setTimeout(() => container.remove(), 4000);
  },
  vibrate(pattern) {
    const settings = Storage.getSettings();
    if (settings.vibration && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  },
  // ============================================================
  // MODO ESTUDIO / REPASO
  // ============================================================
  renderStudyMode() {
    const wrongAnswers = Storage.getWrongAnswers();
    if (wrongAnswers.length === 0) {
      document.getElementById('study-empty').style.display = 'block';
      document.getElementById('study-filters').style.display = 'none';
      document.getElementById('study-cards-container').innerHTML = '';
      return;
    }
    document.getElementById('study-empty').style.display = 'none';
    document.getElementById('study-filters').style.display = 'block';
    // Populate category filter
    const select = document.getElementById('study-category-filter');
    const currentVal = select.value;
    select.innerHTML = '<option value="all">Todas las categorias</option>';
    const categories = new Set();
    wrongAnswers.forEach(w => {
      const q = QUESTIONS_DB.find(q => q.id === w.id);
      if (q) categories.add(q.category);
    });
    categories.forEach(cat => {
      const catInfo = CATEGORIES[cat];
      if (catInfo) {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = `${catInfo.icon} ${catInfo.name}`;
        select.appendChild(opt);
      }
    });
    // Restore filter if exists
    if (currentVal && select.querySelector(`option[value="${currentVal}"]`)) {
      select.value = currentVal;
    }
    this.renderStudyCards();
  },
  renderStudyCards() {
    const wrongAnswers = Storage.getWrongAnswers();
    const filter = document.getElementById('study-category-filter').value;
    const container = document.getElementById('study-cards-container');
    container.innerHTML = '';
    let cards = wrongAnswers.map(w => {
      const q = QUESTIONS_DB.find(q => q.id === w.id);
      return q ? { ...q, userAnswer: w.userAnswer } : null;
    }).filter(Boolean);
    if (filter !== 'all') {
      cards = cards.filter(c => c.category === filter);
    }
    document.getElementById('study-total-count').textContent = cards.length;
    if (cards.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">v>
          <div class="empty-text">No hay preguntas en esta categoria</div>
        </div>
      `;
      return;
    }
    cards.forEach(q => {
      const cat = CATEGORIES[q.category] || { icon: '', name: q.category };
      const diff = DIFFICULTIES[q.difficulty] || { name: q.difficulty };
      const correctAnswer = q.options[q.correct];
      const userWrongAnswer = q.userAnswer >= 0 ? q.options[q.userAnswer] : 'T: Tiempo agotado';
      const card = document.createElement('div');
      card.className = 'study-card';
      card.innerHTML = `
        <div class="study-card-header">
          <span class="study-card-cat">${cat.icon} ${escapeHTML(cat.name)}</span>
          <span class="study-card-diff">${escapeHTML(diff.name || '')}</span>
        </div>
        <div class="study-card-question">${escapeHTML(q.question)}</div>
        <div class="study-card-answer">
          <span class="sca-icon">✓</span>
          <span class="sca-text">${escapeHTML(correctAnswer)}</span>
        </div>
        <div class="study-card-wrong">
          <span class="scw-icon">✗</span>
          <span class="scw-text">Tu respuesta: ${escapeHTML(userWrongAnswer)}</span>
        </div>
        <div class="study-card-ref"> ${escapeHTML(q.reference)}</div>
        <button class="study-card-btn-remove" data-qid="${q.id}"> Ya lo aprendi</button>
      `;
      card.querySelector('.study-card-btn-remove').addEventListener('click', (e) => {
        Storage.removeWrongAnswer(q.id);
        card.style.animation = 'slideUp 0.3s ease reverse';
        setTimeout(() => {
          this.renderStudyMode();
        }, 300);
      });
      container.appendChild(card);
    });
  },
  // ============================================================
  // ESTADISTICAS POR CATEGORIA
  // ============================================================
  renderCategoryStats() {
    const catStats = Storage.getCategoryStats();
    const grid = document.getElementById('category-stats-grid');
    const catKeys = Object.keys(CATEGORIES).filter(k => k !== 'aleatorio');
    if (catKeys.every(k => !catStats[k])) {
      grid.innerHTML = `
        <div class="empty-state" style="padding:16px;">
          <div class="empty-icon"> </div>
          <div class="empty-text">Juega partidas para ver tus estadisticas por categoria</div>
        </div>
      `;
      return;
    }
    grid.innerHTML = catKeys.map(key => {
      const cat = CATEGORIES[key];
      const data = catStats[key] || { correct: 0, wrong: 0, total: 0 };
      const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
      let barColor, pctBg;
      if (pct >= 80) {
        barColor = 'var(--success)';
        pctBg = 'background: rgba(76,175,80,0.15); color: var(--success);';
      } else if (pct >= 60) {
        barColor = 'var(--warning)';
        pctBg = 'background: rgba(255,152,0,0.15); color: var(--warning);';
      } else if (pct >= 1) {
        barColor = 'var(--danger)';
        pctBg = 'background: rgba(244,67,54,0.15); color: var(--danger);';
      } else {
        barColor = 'var(--text-muted)';
        pctBg = 'background: rgba(255,255,255,0.05); color: var(--text-muted);';
      }
      return `
        <div class="cat-stat-item">
          <div class="cat-stat-top">
            <div class="cat-stat-name">
              <span class="csn-icon">${cat.icon}</span> ${cat.name}
            </div>
            <span class="cat-stat-pct" style="${pctBg}">${pct}%</span>
          </div>
          <div class="cat-stat-bar-bg">
            <div class="cat-stat-bar-fill" style="width:${pct}%; background:${barColor};"></div>
          </div>
          <div class="cat-stat-details">
            <span> ${data.correct} correctas</span>
            <span>${data.wrong} incorrectas</span>
            <span> ${data.total} total</span>
          </div>
        </div>
      `;
    }).join('');
  },
  // ============================================================
  // MODO CONTRARRELOJ
  // ============================================================
  renderChallengeSetup() {
    // Reset selections visually from defaults
    this.updateChallengeBest();
  },
  updateChallengeBest() {
    const records = Storage.getChallengeRecords();
    const key = `${this.challengeTime}_${this.challengeDifficulty}`;
    const record = records[key];
    const bestEl = document.getElementById('challenge-best');
    const bestText = document.getElementById('challenge-best-text');
    if (record) {
      bestEl.style.display = 'block';
      bestText.textContent = `Mejor: ${record.correct} correctas · ${record.points} pts`;
    } else {
      bestEl.style.display = 'none';
    }
  },
  startChallenge() {
    // Build question pool
    let pool;
    if (this.challengeDifficulty === 'mixed') {
      pool = [...QUESTIONS_DB];
    } else {
      pool = QUESTIONS_DB.filter(q => q.difficulty === this.challengeDifficulty);
    }
    pool = this.shuffle(pool);
    this.challengeQuestions = pool;
    this.challengeIndex = 0;
    this.challengeCorrect = 0;
    this.challengeWrong = 0;
    this.challengePoints = 0;
    this.challengeStreak = 0;
    this.challengeBestStreak = 0;
    this.challengeSecondsLeft = this.challengeTime;
    this.challengeAnswerTimes = [];
    this.challengeAnswered = false;
    this.showScreen('challenge-quiz');
    this.renderChallengeQuestion();
    this.startChallengeGlobalTimer();
  },
  startChallengeGlobalTimer() {
    this.stopChallengeGlobalTimer();
    const timerEl = document.getElementById('challenge-global-timer');
    const timerBar = document.getElementById('challenge-timer-bar');
    const totalTime = this.challengeTime;
    const updateDisplay = () => {
      const min = Math.floor(this.challengeSecondsLeft / 60);
      const sec = this.challengeSecondsLeft % 60;
      timerEl.textContent = `T: ${min}:${sec.toString().padStart(2, '0')}`;
      const pct = (this.challengeSecondsLeft / totalTime) * 100;
      timerBar.style.width = `${pct}%`;
      if (this.challengeSecondsLeft <= totalTime * 0.25) {
        timerEl.className = 'quiz-timer danger';
        timerBar.className = 'timer-bar-fill danger';
      } else if (this.challengeSecondsLeft <= totalTime * 0.5) {
        timerEl.className = 'quiz-timer warning';
        timerBar.className = 'timer-bar-fill warning';
      } else {
        timerEl.className = 'quiz-timer';
        timerBar.className = 'timer-bar-fill';
      }
    };
    updateDisplay();
    this.challengeGlobalTimer = setInterval(() => {
      this.challengeSecondsLeft--;
      updateDisplay();
      if (this.challengeSecondsLeft <= 0) {
        this.endChallenge();
      }
    }, 1000);
  },
  stopChallengeGlobalTimer() {
    if (this.challengeGlobalTimer) {
      clearInterval(this.challengeGlobalTimer);
      this.challengeGlobalTimer = null;
    }
    if (this.challengeAutoAdvance) {
      clearTimeout(this.challengeAutoAdvance);
      this.challengeAutoAdvance = null;
    }
  },
  renderChallengeQuestion() {
    if (this.challengeIndex >= this.challengeQuestions.length) {
      // Wrapped around - reshuffle
      this.challengeQuestions = this.shuffle(this.challengeQuestions);
      this.challengeIndex = 0;
    }
    const q = this.challengeQuestions[this.challengeIndex];
    this.challengeAnswered = false;
    this.challengeQuestionStart = Date.now();
    // Counter
    document.getElementById('challenge-counter').textContent = ` ${this.challengeCorrect + this.challengeWrong}`;
    // Points
    document.getElementById('challenge-points').textContent = ` ${this.challengePoints}`;
    // Streak
    const streakEl = document.getElementById('challenge-streak');
    if (this.challengeStreak >= 3) {
      streakEl.textContent = ` ${this.challengeStreak}`;
      streakEl.classList.remove('hidden');
    } else {
      streakEl.classList.add('hidden');
    }
    // Category tag
    const cat = CATEGORIES[q.category] || { icon: '', name: q.category };
    document.getElementById('challenge-category-tag').innerHTML = `${cat.icon} ${cat.name}`;
    // Question
    document.getElementById('challenge-question-text').textContent = q.question;
    // Options
    const optionsContainer = document.getElementById('challenge-options');
    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('aria-label', `Opcion ${letters[i]}: ${opt}`);
      btn.innerHTML = `
        <span class="option-letter">${letters[i]}</span>
        <span class="option-text">${escapeHTML(opt)}</span>
      `;
      btn.addEventListener('click', () => this.challengeSelectAnswer(i, btn));
      optionsContainer.appendChild(btn);
    });
    // Animate
    const qCard = document.querySelector('#challenge-quiz .question-card');
    if (qCard) {
      qCard.style.animation = 'none';
      qCard.offsetHeight;
      qCard.style.animation = 'slideUp 0.3s ease';
    }
  },
  challengeSelectAnswer(index, btnEl) {
    if (this.challengeAnswered) return;
    this.challengeAnswered = true;
    const q = this.challengeQuestions[this.challengeIndex];
    const isCorrect = index === q.correct;
    const allBtns = document.querySelectorAll('#challenge-options .option-btn');
    const answerTime = (Date.now() - this.challengeQuestionStart) / 1000;
    this.challengeAnswerTimes.push(answerTime);
    // Disable all
    allBtns.forEach(b => b.classList.add('disabled'));
    if (isCorrect) {
      btnEl.classList.add('correct');
      this.challengeCorrect++;
      this.challengeStreak++;
      if (this.challengeStreak > this.challengeBestStreak) {
        this.challengeBestStreak = this.challengeStreak;
      }
      // Points based on difficulty
      let points;
      if (this.challengeDifficulty === 'mixed') {
        points = DIFFICULTIES[q.difficulty]?.points || 10;
      } else {
        points = DIFFICULTIES[this.challengeDifficulty]?.points || 10;
      }
      // Speed bonus
      if (answerTime < 5) points = Math.floor(points * 1.5);
      else if (answerTime < 10) points = Math.floor(points * 1.25);
      // Streak bonus
      if (this.challengeStreak >= 5) points = Math.floor(points * 1.5);
      this.challengePoints += points;
      this.showPointPopup(`+${points}`);
      // Remove from wrong answers
      Storage.removeWrongAnswer(q.id);
    } else {
      btnEl.classList.add('wrong');
      allBtns[q.correct].classList.add('correct');
      this.challengeWrong++;
      this.challengeStreak = 0;
      // Save wrong answer
      Storage.addWrongAnswer(q.id, index);
    }
    // Update display
    document.getElementById('challenge-points').textContent = ` ${this.challengePoints}`;
    document.getElementById('challenge-counter').textContent = ` ${this.challengeCorrect + this.challengeWrong}`;
    const streakEl = document.getElementById('challenge-streak');
    if (this.challengeStreak >= 3) {
      streakEl.textContent = ` ${this.challengeStreak}`;
      streakEl.classList.remove('hidden');
    } else {
      streakEl.classList.add('hidden');
    }
    this.vibrate(isCorrect ? 50 : [100, 50, 100]);
    // Auto-advance after 1.2s
    this.challengeAutoAdvance = setTimeout(() => {
      if (this.challengeSecondsLeft <= 0) return;
      this.challengeIndex++;
      this.renderChallengeQuestion();
    }, 1200);
  },
  endChallenge() {
    this.stopChallengeGlobalTimer();
    // Calculate stats
    const avgSpeed = this.challengeAnswerTimes.length > 0
      ? (this.challengeAnswerTimes.reduce((a, b) => a + b, 0) / this.challengeAnswerTimes.length).toFixed(1)
      : 0;
    // Save record
    const isNewRecord = Storage.saveChallengeRecord(
      this.challengeTime,
      this.challengeDifficulty,
      this.challengeCorrect,
      this.challengePoints
    );
    // Update global stats
    const stats = Storage.getStats();
    stats.totalPoints += this.challengePoints;
    stats.totalCorrect += this.challengeCorrect;
    stats.totalWrong += this.challengeWrong;
    stats.totalAnswered += this.challengeCorrect + this.challengeWrong;
    stats.totalGames++;
    if (this.challengeBestStreak > stats.bestStreak) {
      stats.bestStreak = this.challengeBestStreak;
    }
    Storage.saveStats(stats);
    // Add XP
    Storage.addXP(this.challengePoints);
    // Save to history
    Storage.addGameToHistory({
      difficulty: this.challengeDifficulty,
      category: 'aleatorio',
      correct: this.challengeCorrect,
      wrong: this.challengeWrong,
      total: this.challengeCorrect + this.challengeWrong,
      points: this.challengePoints,
      streak: this.challengeBestStreak,
      mode: 'challenge'
    });
    // Check badges
    Storage.checkNewBadges();
    // Render results
    const total = this.challengeCorrect + this.challengeWrong;
    const pct = total > 0 ? Math.round((this.challengeCorrect / total) * 100) : 0;
    let icon, title, subtitle;
    if (this.challengeCorrect >= 20) {
      icon = '🏆'; title = '!INCREIBLE!'; subtitle = `${this.challengeCorrect} respuestas correctas  !Eres imparable!`;
    } else if (this.challengeCorrect >= 15) {
      icon = '🌟'; title = '!Excelente!'; subtitle = `${this.challengeCorrect} correctas  !Gran desempeno!`;
    } else if (this.challengeCorrect >= 10) {
      icon = '😊'; title = '!Bien hecho!'; subtitle = `${this.challengeCorrect} correctas  !Sigue mejorando!`;
    } else if (this.challengeCorrect >= 5) {
      icon = '💪'; title = '!Buen intento!'; subtitle = `${this.challengeCorrect} correctas  !Puedes mas!`;
    } else {
      icon = '📖'; title = 'A practicar'; subtitle = `${this.challengeCorrect} correctas  !No te rindas!`;
    }
    document.getElementById('cr-icon').textContent = icon;
    document.getElementById('cr-title').textContent = title;
    document.getElementById('cr-subtitle').textContent = subtitle;
    document.getElementById('cr-correct').textContent = this.challengeCorrect;
    document.getElementById('cr-wrong').textContent = this.challengeWrong;
    document.getElementById('cr-points').textContent = this.challengePoints;
    document.getElementById('cr-speed').textContent = `${avgSpeed}s`;
    const recordEl = document.getElementById('cr-new-record');
    recordEl.style.display = isNewRecord ? 'block' : 'none';
    this.showScreen('challenge-results');
    if (pct >= 80 || this.challengeCorrect >= 15) {
      this.showConfetti();
    }
  },
  // ============================================================
  // MODO 2 JUGADORES
  // ============================================================
  renderDuoCategories() {
    const grid = document.getElementById('duo-category-grid');
    grid.innerHTML = '';
    Object.entries(CATEGORIES).forEach(([key, cat]) => {
      const card = document.createElement('div');
      card.className = `category-card ${key === 'aleatorio' ? 'random-card' : ''}`;
      card.innerHTML = `
        <div class="cat-icon" style="background: ${cat.color}22">${cat.icon}</div>
        <span class="cat-name">${cat.name}</span>
      `;
      card.addEventListener('click', () => {
        this.duoCategory = key;
        this.showScreen('duo-difficulty');
      });
      grid.appendChild(card);
    });
  },
  startDuo() {
    // Build question pool - filtrar por dificultad
    let pool = QUESTIONS_DB.filter(q => q.difficulty === this.duoDifficulty);
    // Filtrar por categoria si no es aleatorio y hay categoria seleccionada
    if (this.duoCategory && this.duoCategory !== 'aleatorio') {
      pool = pool.filter(q => q.category === this.duoCategory);
    }
    // Necesitamos el doble de preguntas (diferentes para cada jugador)
    const needed = this.duoQuestionsPerPlayer * 2;
    // Fallback: si no hay suficientes preguntas en categoria+dificultad
    if (pool.length < needed && this.duoCategory && this.duoCategory !== 'aleatorio') {
      const extra = QUESTIONS_DB.filter(q =>
        q.category === this.duoCategory &&
        q.difficulty !== this.duoDifficulty &&
        !pool.includes(q)
      );
      pool = [...pool, ...extra];
    }
    if (pool.length < needed) {
      const extra = QUESTIONS_DB.filter(q =>
        q.difficulty === this.duoDifficulty && !pool.includes(q)
      );
      pool = [...pool, ...extra];
    }
    pool = this.shuffle(pool);
    // Dar preguntas DIFERENTES a cada jugador
    const count = Math.min(this.duoQuestionsPerPlayer, pool.length);
    if (pool.length >= count * 2) {
      // Hay suficientes para dar diferentes a cada uno
      this.duoP1Questions = pool.slice(0, count);
      this.duoP2Questions = pool.slice(count, count * 2);
    } else {
      // No hay suficientes para dar todas diferentes, repartir lo que haya
      this.duoP1Questions = pool.slice(0, count);
      // Rebarajar para que al menos el orden sea distinto
      this.duoP2Questions = this.shuffle([...pool]).slice(0, count);
    }
    console.log('[DUO] Categoria:', this.duoCategory, '| Dificultad:', this.duoDifficulty,
      '| Modo:', this.duoTurnMode,
      '| Preguntas P1:', this.duoP1Questions.length, '| Preguntas P2:', this.duoP2Questions.length);
    // Reset state
    this.duoCurrentPlayer = 1;
    this.duoP1Index = 0;
    this.duoP2Index = 0;
    this.duoP1Correct = 0;
    this.duoP1Wrong = 0;
    this.duoP1Points = 0;
    this.duoP2Correct = 0;
    this.duoP2Wrong = 0;
    this.duoP2Points = 0;
    const settings = Storage.getSettings();
    this.duoTimerMax = settings.timerSeconds || 0;
    // Show turn screen for Player 1
    this.showDuoTurn();
  },
  showDuoTurn() {
    const isP1 = this.duoCurrentPlayer === 1;
    const name = isP1 ? this.duoPlayer1 : this.duoPlayer2;
    const icon = isP1 ? '' : '';
    const idx = isP1 ? this.duoP1Index : this.duoP2Index;
    const total = isP1 ? this.duoP1Questions.length : this.duoP2Questions.length;
    document.getElementById('duo-turn-icon').textContent = icon;
    document.getElementById('duo-turn-title').textContent = 'Turno de';
    document.getElementById('duo-turn-name').textContent = name;
    // Mostrar progreso del jugador
    const hint = document.querySelector('.duo-turn-hint');
    if (hint) hint.textContent = `Pregunta ${idx + 1} de ${total}`;
    document.getElementById('duo-ts-p1-name').textContent = ` ${this.duoPlayer1}`;
    document.getElementById('duo-ts-p1-score').textContent = this.duoP1Points;
    document.getElementById('duo-ts-p2-name').textContent = ` ${this.duoPlayer2}`;
    document.getElementById('duo-ts-p2-score').textContent = this.duoP2Points;
    this.showScreen('duo-turn');
  },
  renderDuoQuestion() {
    const isP1 = this.duoCurrentPlayer === 1;
    const questions = isP1 ? this.duoP1Questions : this.duoP2Questions;
    const idx = isP1 ? this.duoP1Index : this.duoP2Index;
    const q = questions[idx];
    if (!q) return;
    this.duoAnswered = false;
    const total = questions.length;
    const current = idx + 1;
    // Player indicator
    const playerEl = document.getElementById('duo-quiz-player');
    playerEl.textContent = isP1 ? ` ${this.duoPlayer1}` : ` ${this.duoPlayer2}`;
    playerEl.className = isP1 ? 'duo-quiz-player' : 'duo-quiz-player p2';
    // Counter
    document.getElementById('duo-quiz-counter').textContent = `${current}/${total}`;
    // Scores
    document.getElementById('duo-quiz-p1').textContent = this.duoP1Points;
    document.getElementById('duo-quiz-p2').textContent = this.duoP2Points;
    // Progress bar
    const percent = ((current - 1) / total) * 100;
    document.getElementById('duo-progress-fill').style.width = `${percent}%`;
    // Category
    const cat = CATEGORIES[q.category] || { icon: '', name: q.category };
    document.getElementById('duo-question-cat').innerHTML = `${cat.icon} ${cat.name}`;
    // Question
    document.getElementById('duo-question-text').textContent = q.question;
    // Options
    const optionsContainer = document.getElementById('duo-options');
    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('aria-label', `Opcion ${letters[i]}: ${opt}`);
      btn.innerHTML = `
        <span class="option-letter">${letters[i]}</span>
        <span class="option-text">${escapeHTML(opt)}</span>
      `;
      btn.addEventListener('click', () => this.duoSelectAnswer(i, btn));
      optionsContainer.appendChild(btn);
    });
    // Hide reference
    document.getElementById('duo-ref-card').classList.add('hidden');
    // Animate
    const qCard = document.querySelector('#duo-quiz .question-card');
    if (qCard) {
      qCard.style.animation = 'none';
      qCard.offsetHeight;
      qCard.style.animation = 'slideUp 0.4s ease';
    }
    // Start timer
    this.startDuoTimer();
  },
  startDuoTimer() {
    this.stopDuoTimer();
    const timerEl = document.getElementById('duo-quiz-timer');
    const timerBar = document.getElementById('duo-timer-bar');
    const timerBarContainer = document.querySelector('#duo-quiz .timer-bar-container');
    if (!this.duoTimerMax || this.duoTimerMax === 0) {
      timerEl.classList.add('hidden');
      timerBarContainer.classList.add('hidden');
      return;
    }
    timerEl.classList.remove('hidden');
    timerBarContainer.classList.remove('hidden');
    this.duoTimerSeconds = this.duoTimerMax;
    timerEl.textContent = `T: ${this.duoTimerSeconds}`;
    timerEl.className = 'quiz-timer';
    timerBar.style.width = '100%';
    timerBar.className = 'timer-bar-fill';
    this.duoTimerInterval = setInterval(() => {
      this.duoTimerSeconds--;
      const pct = (this.duoTimerSeconds / this.duoTimerMax) * 100;
      timerEl.textContent = `T: ${this.duoTimerSeconds}`;
      timerBar.style.width = `${pct}%`;
      if (this.duoTimerSeconds <= this.duoTimerMax * 0.25) {
        timerEl.className = 'quiz-timer danger';
        timerBar.className = 'timer-bar-fill danger';
      } else if (this.duoTimerSeconds <= this.duoTimerMax * 0.5) {
        timerEl.className = 'quiz-timer warning';
        timerBar.className = 'timer-bar-fill warning';
      }
      if (this.duoTimerSeconds <= 0) {
        this.stopDuoTimer();
        this.duoTimeUp();
      }
    }, 1000);
  },
  stopDuoTimer() {
    if (this.duoTimerInterval) {
      clearInterval(this.duoTimerInterval);
      this.duoTimerInterval = null;
    }
  },
  duoTimeUp() {
    if (this.duoAnswered) return;
    this.duoAnswered = true;
    const isP1 = this.duoCurrentPlayer === 1;
    const questions = isP1 ? this.duoP1Questions : this.duoP2Questions;
    const idx = isP1 ? this.duoP1Index : this.duoP2Index;
    const q = questions[idx];
    const allBtns = document.querySelectorAll('#duo-options .option-btn');
    allBtns.forEach(b => b.classList.add('disabled'));
    allBtns[q.correct].classList.add('correct');
    // Count as wrong for current player
    if (this.duoCurrentPlayer === 1) {
      this.duoP1Wrong++;
    } else {
      this.duoP2Wrong++;
    }
    const timerEl = document.getElementById('duo-quiz-timer');
    timerEl.textContent = 'T: ¡Tiempo!';
    timerEl.className = 'quiz-timer danger';
    document.getElementById('duo-ref-text').innerHTML = `<strong>T: ¡Se acabó el tiempo!</strong>  ${q.reference}`;
    document.getElementById('duo-ref-card').classList.remove('hidden');
    this.vibrate([100, 50, 100]);
    // Auto-advance after 2 seconds
    setTimeout(() => this.duoAdvance(), 2000);
  },
  duoSelectAnswer(index, btnEl) {
    if (this.duoAnswered) return;
    this.duoAnswered = true;
    this.stopDuoTimer();
    const isP1 = this.duoCurrentPlayer === 1;
    const questions = isP1 ? this.duoP1Questions : this.duoP2Questions;
    const idx = isP1 ? this.duoP1Index : this.duoP2Index;
    const q = questions[idx];
    const isCorrect = index === q.correct;
    const allBtns = document.querySelectorAll('#duo-options .option-btn');
    allBtns.forEach(b => b.classList.add('disabled'));
    const points = DIFFICULTIES[this.duoDifficulty]?.points || 10;
    if (isCorrect) {
      btnEl.classList.add('correct');
      // Speed bonus
      let totalPoints = points;
      if (this.duoTimerMax > 0 && this.duoTimerSeconds > 0) {
        const timeRatio = this.duoTimerSeconds / this.duoTimerMax;
        if (timeRatio > 0.7) totalPoints = Math.floor(totalPoints * 1.5);
        else if (timeRatio > 0.4) totalPoints = Math.floor(totalPoints * 1.25);
      }
      if (isP1) {
        this.duoP1Correct++;
        this.duoP1Points += totalPoints;
      } else {
        this.duoP2Correct++;
        this.duoP2Points += totalPoints;
      }
      this.showPointPopup(`+${totalPoints}`);
      this.vibrate(50);
    } else {
      btnEl.classList.add('wrong');
      allBtns[q.correct].classList.add('correct');
      if (isP1) this.duoP1Wrong++;
      else this.duoP2Wrong++;
      this.vibrate([100, 50, 100]);
    }
    // Show reference
    document.getElementById('duo-ref-text').innerHTML = `<strong>${q.reference}</strong>`;
    document.getElementById('duo-ref-card').classList.remove('hidden');
    // Update scores in top bar
    document.getElementById('duo-quiz-p1').textContent = this.duoP1Points;
    document.getElementById('duo-quiz-p2').textContent = this.duoP2Points;
    // Auto-advance after 2 seconds
    setTimeout(() => this.duoAdvance(), 2000);
  },
  duoAdvance() {
    // Avanzar el indice del jugador actual
    if (this.duoCurrentPlayer === 1) {
      this.duoP1Index++;
    } else {
      this.duoP2Index++;
    }
    if (this.duoTurnMode === 'seguido') {
      // MODO SEGUIDO: P1 responde todas, luego P2 responde todas
      if (this.duoCurrentPlayer === 1) {
        if (this.duoP1Index >= this.duoP1Questions.length) {
          // P1 termino, cambiar a P2
          this.duoCurrentPlayer = 2;
          this.showDuoTurn();
        } else {
          // P1 sigue respondiendo
          this.showScreen('duo-quiz');
          this.renderDuoQuestion();
        }
      } else {
        if (this.duoP2Index >= this.duoP2Questions.length) {
          // P2 termino, fin del juego
          this.endDuo();
        } else {
          // P2 sigue respondiendo
          this.showScreen('duo-quiz');
          this.renderDuoQuestion();
        }
      }
    } else {
      // MODO ALTERNADO: P1, P2, P1, P2...
      if (this.duoCurrentPlayer === 1) {
        // Cambiar a P2
        this.duoCurrentPlayer = 2;
        this.showDuoTurn();
      } else {
        // Volver a P1
        this.duoCurrentPlayer = 1;
        // Verificar si ambos terminaron
        if (this.duoP1Index >= this.duoP1Questions.length && this.duoP2Index >= this.duoP2Questions.length) {
          this.endDuo();
        } else if (this.duoP1Index >= this.duoP1Questions.length) {
          // P1 ya termino, P2 sigue
          this.duoCurrentPlayer = 2;
          this.showDuoTurn();
        } else {
          this.showDuoTurn();
        }
      }
    }
  },
  endDuo() {
    this.stopDuoTimer();
    let icon, title, subtitle;
    if (this.duoP1Points > this.duoP2Points) {
      icon = 'Ââ ';
      title = `!${this.duoPlayer1} gana!`;
      subtitle = `${this.duoP1Points} vs ${this.duoP2Points} puntos`;
    } else if (this.duoP2Points > this.duoP1Points) {
      icon = 'Ââ ';
      title = `!${this.duoPlayer2} gana!`;
      subtitle = `${this.duoP2Points} vs ${this.duoP1Points} puntos`;
    } else {
      icon = '📖';
      title = '!Empate!';
      subtitle = `Ambos con ${this.duoP1Points} puntos`;
    }
    document.getElementById('duo-res-icon').textContent = icon;
    document.getElementById('duo-res-title').textContent = title;
    document.getElementById('duo-res-subtitle').textContent = subtitle;
    document.getElementById('duo-res-p1-name').textContent = this.duoPlayer1;
    document.getElementById('duo-res-p1-correct').textContent = `${this.duoP1Correct} correctas`;
    document.getElementById('duo-res-p1-score').textContent = `${this.duoP1Points} pts`;
    document.getElementById('duo-res-p2-name').textContent = this.duoPlayer2;
    document.getElementById('duo-res-p2-correct').textContent = `${this.duoP2Correct} correctas`;
    document.getElementById('duo-res-p2-score').textContent = `${this.duoP2Points} pts`;
    // Highlight winner
    const p1Card = document.getElementById('duo-res-p1');
    const p2Card = document.getElementById('duo-res-p2');
    p1Card.classList.remove('winner');
    p2Card.classList.remove('winner');
    if (this.duoP1Points > this.duoP2Points) {
      p1Card.classList.add('winner');
    } else if (this.duoP2Points > this.duoP1Points) {
      p2Card.classList.add('winner');
    } else {
      p1Card.classList.add('winner');
      p2Card.classList.add('winner');
    }
    this.showScreen('duo-results');
    this.showConfetti();
  },
  // ============================================================
  // SISTEMA DE SONIDO (Web Audio API)
  // ============================================================
  playSound(type) {
    const settings = Storage.getSettings();
    if (!settings.sound) return;
    try {
      if (!this.audioCtx) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = this.audioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, ctx.currentTime);       // C5
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'wrong') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.setValueAtTime(150, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'phase') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, ctx.currentTime);
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.12);
        osc.frequency.setValueAtTime(784, ctx.currentTime + 0.24);
        osc.frequency.setValueAtTime(1047, ctx.currentTime + 0.36);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
      }
    } catch (e) {
      // Audio not supported, silently fail
    }
  },
  // ============================================================
  // COMPARTIR RESULTADOS
  // ============================================================
  shareResults() {
    const total = this.currentQuestions.length;
    const percentage = Math.round((this.sessionCorrect / total) * 100);
    const cat = CATEGORIES[this.selectedCategory];
    const catName = cat ? cat.name : this.selectedCategory;
    const text = ` BibliaQuiz - !${percentage}% de aciertos!\n` +
      ` ${this.sessionCorrect}/${total} correctas\n` +
      ` ${this.sessionPoints} puntos\n` +
      ` Categoria: ${catName}\n` +
      `  Fase: ${this.currentPhase}\n` +
      `!Pon a prueba tu conocimiento biblico!`;
    if (navigator.share) {
      navigator.share({ title: 'BibliaQuiz', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast('📋 Resultado copiado al portapapeles', 'success');
      }).catch(() => {
        this.showToast('No se pudo copiar', 'error');
      });
    }
  },
  // ============================================================
  // COMPARTIR COMO IMAGEN
  // ============================================================
  async shareResultsAsImage() {
    const total = this.currentQuestions.length;
    const percentage = Math.round((this.sessionCorrect / total) * 100);
    const cat = CATEGORIES[this.selectedCategory];
    const catName = cat ? cat.name : this.selectedCategory;
    const player = Storage.getPlayer();
    
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 400;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 600, 400);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 400);
    
    // Border decoration
    ctx.strokeStyle = '#6C63FF';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 580, 380);
    
    // Header
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 32px Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('📖 BibliaQuiz', 300, 55);
    
    // Score circle
    ctx.beginPath();
    ctx.arc(300, 150, 55, 0, Math.PI * 2);
    let scoreColor = '#FF6584';
    if (percentage >= 80) scoreColor = '#4CAF50';
    else if (percentage >= 60) scoreColor = '#6C63FF';
    else if (percentage >= 40) scoreColor = '#FFC107';
    ctx.fillStyle = scoreColor;
    ctx.fill();
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 36px Nunito, sans-serif';
    ctx.fillText(`${percentage}%`, 300, 162);
    
    // Stats row
    ctx.font = '20px Nunito, sans-serif';
    ctx.fillStyle = '#E0E0E0';
    ctx.fillText(`✓ ${this.sessionCorrect} correctas · ✗ ${this.sessionWrong} incorrectas`, 300, 230);
    ctx.fillText(`⭐ ${this.sessionPoints} puntos`, 300, 260);
    
    // Category
    ctx.font = '18px Nunito, sans-serif';
    ctx.fillStyle = '#6C63FF';
    ctx.fillText(`${cat?.icon || '📚'} ${catName}`, 300, 300);
    
    // Player info
    ctx.font = '16px Nunito, sans-serif';
    ctx.fillStyle = '#888';
    ctx.fillText(`${player.avatar} ${player.name} · Nivel ${player.level}`, 300, 330);
    
    // Call to action
    ctx.font = 'italic 14px Nunito, sans-serif';
    ctx.fillStyle = '#666';
    ctx.fillText('¡Descarga BibliaQuiz y pon a prueba tu conocimiento!', 300, 370);
    
    // Convert to blob and share
    try {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const file = new File([blob], 'bibliaquiz-resultado.png', { type: 'image/png' });
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Mi resultado en BibliaQuiz',
          text: `¡Obtuve ${percentage}% en BibliaQuiz!`,
          files: [file]
        });
      } else {
        // Fallback: download image
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bibliaquiz-resultado.png';
        a.click();
        URL.revokeObjectURL(url);
        this.showToast('📥 Imagen descargada');
      }
    } catch (e) {
      console.error('[Share] Error sharing image:', e);
      this.shareResults(); // Fallback to text
    }
  },
  // ============================================================
  // CÓDIGOS PROMOCIONALES
  // ============================================================
  PROMO_CODES: {
    // Códigos válidos y sus beneficios
    'VIDASINFINITAS': { type: 'infinite_lives', description: 'Vidas Infinitas' },
    'BIBLIAQUIZ2026': { type: 'infinite_lives', description: 'Vidas Infinitas' },
    'GODMODE': { type: 'infinite_lives', description: 'Vidas Infinitas' },
    'PREMIUM30': { type: 'premium_days', days: 30, description: '30 días Premium' },
    'BIENVENIDO': { type: 'lives', amount: 5, description: '5 vidas extra' }
  },
  
  redeemPromoCode() {
    const input = document.getElementById('promo-code');
    const resultEl = document.getElementById('promo-code-result');
    if (!input || !resultEl) return;
    
    const code = input.value.trim().toUpperCase();
    resultEl.classList.remove('hidden', 'success', 'error');
    
    if (!code) {
      resultEl.textContent = '❌ Ingresa un código';
      resultEl.classList.add('error');
      return;
    }
    
    // Verificar si el código ya fue usado
    const usedCodes = JSON.parse(localStorage.getItem('bq_used_promo_codes') || '[]');
    if (usedCodes.includes(code)) {
      resultEl.textContent = '⚠️ Este código ya fue canjeado';
      resultEl.classList.add('error');
      return;
    }
    
    // Buscar el código
    const promo = this.PROMO_CODES[code];
    if (!promo) {
      resultEl.textContent = '❌ Código inválido';
      resultEl.classList.add('error');
      return;
    }
    
    // Aplicar beneficio
    let message = '';
    switch (promo.type) {
      case 'infinite_lives':
        this.infiniteLives = true;
        this.saveInfiniteLives();
        this.renderHomeLives();
        message = `✅ ¡${promo.description} activadas!`;
        break;
        
      case 'premium_days':
        // Agregar días premium
        const currentExpiry = localStorage.getItem('bq_premium_expiry');
        const now = Date.now();
        const baseDate = currentExpiry ? Math.max(parseInt(currentExpiry), now) : now;
        const newExpiry = baseDate + (promo.days * 24 * 60 * 60 * 1000);
        localStorage.setItem('bq_premium_expiry', newExpiry.toString());
        message = `✅ ¡${promo.description} agregados!`;
        break;
        
      case 'lives':
        this.lives = Math.min(this.lives + promo.amount, this.maxLives);
        this.saveLives();
        this.renderHomeLives();
        message = `✅ ¡${promo.description} agregadas!`;
        break;
    }
    
    // Marcar código como usado
    usedCodes.push(code);
    localStorage.setItem('bq_used_promo_codes', JSON.stringify(usedCodes));
    
    // Mostrar resultado
    resultEl.textContent = message;
    resultEl.classList.add('success');
    input.value = '';
    
    this.showToast(message);
  },
  // ============================================================
  // EXPORT / IMPORT DATA
  // ============================================================
  exportData() {
    const data = {};
    Object.entries(Storage.KEYS).forEach(([name, key]) => {
      const val = localStorage.getItem(key);
      if (val) data[key] = val;
    });
    // Include extra preferences not in KEYS
    ['bibliaquiz_theme', 'bibliaquiz_onboarded', 'bibliaquiz_notif', 'bq_infiniteLives'].forEach(key => {
      const val = localStorage.getItem(key);
      if (val) data[key] = val;
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bibliaquiz-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('💾 Respaldo exportado correctamente', 'success');
  },
  importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        // Validar que es un backup valido
        const validKeys = Object.values(Storage.KEYS);
        const extraKeys = ['bibliaquiz_theme', 'bibliaquiz_onboarded', 'bibliaquiz_notif', 'bq_infiniteLives'];
        const allValidKeys = [...validKeys, ...extraKeys];
        let imported = 0;
        Object.entries(data).forEach(([key, value]) => {
          if (allValidKeys.includes(key)) {
            localStorage.setItem(key, value);
            imported++;
          }
        });
        if (imported > 0) {
          this.showToast(` ${imported} datos restaurados. Recargando...`, 'success');
          setTimeout(() => window.location.reload(), 1500);
        } else {
          this.showToast('Archivo no valido', 'error');
        }
      } catch (err) {
        this.showToast('Error al leer el archivo', 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  },
  // ============================================================
  // OFFLINE DETECTION
  // ============================================================
  initOfflineDetection() {
    const banner = document.getElementById('offline-banner');
    if (!banner) return;
    const update = () => {
      if (navigator.onLine) {
        banner.classList.add('hidden');
      } else {
        banner.classList.remove('hidden');
      }
    };
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    update(); // Check initial state
  },
  // ============================================================
  // KEYBOARD SHORTCUTS
  // ============================================================
  initKeyboard() {
    document.addEventListener('keydown', (e) => {
      // Solo en pantallas de quiz (normal, challenge, duo)
      if (!['quiz', 'challenge-quiz', 'duo-quiz'].includes(this.currentScreen)) return;
      const key = e.key;
      const screen = this.currentScreen;
      // Teclas 1-4 para opciones
      if (['1', '2', '3', '4'].includes(key)) {
        const idx = parseInt(key) - 1;
        let containerId = 'options-container';
        if (screen === 'challenge-quiz') containerId = 'challenge-options';
        else if (screen === 'duo-quiz') containerId = 'duo-options';
        const btns = document.querySelectorAll(`#${containerId} .option-btn`);
        if (btns[idx] && !btns[idx].classList.contains('disabled')) {
          btns[idx].click();
        }
      }
      // Enter o Space para siguiente pregunta
      if (key === 'Enter' || key === ' ') {
        e.preventDefault();
        if (screen === 'quiz') {
          const nextBtn = document.getElementById('next-btn');
          if (nextBtn && !nextBtn.classList.contains('hidden')) nextBtn.click();
        } else if (screen === 'challenge-quiz') {
          const nextBtn = document.getElementById('challenge-next-btn');
          if (nextBtn && !nextBtn.classList.contains('hidden')) nextBtn.click();
        } else if (screen === 'duo-quiz') {
          const nextBtn = document.getElementById('duo-next-btn');
          if (nextBtn && !nextBtn.classList.contains('hidden')) nextBtn.click();
        }
      }
      // Escape para pausa (solo quiz normal)
      if (key === 'Escape' && screen === 'quiz') {
        this.showPauseScreen();
      }
    });
  },
  // ============================================================
  // THEME (AUTO / LIGHT / DARK)
  // ============================================================
  initTheme() {
    const saved = Storage.getTheme(); // 'auto', 'dark', or 'light'
    this.applyTheme(saved);
    // Listen for system theme changes (for auto mode)
    this._mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this._mediaQuery.addEventListener('change', () => {
      if (Storage.getTheme() === 'auto') {
        this.applyTheme('auto');
      }
    });
  },
  applyTheme(mode) {
    let effective = mode;
    if (mode === 'auto') {
      effective = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', effective);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = effective === 'dark' ? '#0F0E17' : '#F5F5FA';
  },
  updateThemeButtons(current) {
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.themeVal === current);
    });
  },
  // ============================================================
  // SPLASH SCREEN
  // ============================================================
  hideSplash() {
    const splash = document.getElementById('splash-screen');
    if (!splash) return;
    setTimeout(() => {
      splash.classList.add('fade-out');
      setTimeout(() => splash.remove(), 600);
    }, 1200);
  },
  // ============================================================
  // DAILY STREAK
  // ============================================================
  initDailyStreak() {
    const streak = Storage.getDailyStreak();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    if (streak.lastDate === today) {
      // Already logged in today
      this.renderDailyStreakCard(streak);
      return;
    }
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (streak.lastDate === yesterday) {
      // Consecutive day
      streak.days++;
    } else {
      // Streak broken or first time
      streak.days = 1;
    }
    streak.lastDate = today;
    if (streak.days > (streak.best || 0)) {
      streak.best = streak.days;
    }
    Storage.saveDailyStreak(streak);
    this.renderDailyStreakCard(streak);
    // Show a toast for streaks
    if (streak.days > 1) {
      setTimeout(() => {
        this.showToast(` !Racha de ${streak.days} dias! !Sigue asi!`);
      }, 1500);
    }
  },
  renderDailyStreakCard(streak) {
    const card = document.getElementById('daily-streak-card');
    if (!card || !streak || streak.days < 1) return;
    card.classList.remove('hidden');
    document.getElementById('streak-card-days').textContent = streak.days;
    if (streak.days >= 30) {
      document.getElementById('streak-card-title').textContent = '  !Racha legendaria!';
    } else if (streak.days >= 7) {
      document.getElementById('streak-card-title').textContent = ' !Gran racha semanal!';
    } else {
      document.getElementById('streak-card-title').textContent = ' Racha diaria';
    }
    document.getElementById('streak-card-desc').textContent =
      streak.days === 1 ? '!Primer dia! Vuelve manana' :
      `Mejor racha: ${streak.best || streak.days} dias`;
  },
  // ============================================================
  // DAILY CHALLENGE
  // ============================================================
  renderDailyChallengeCard() {
    const btn = document.getElementById('btn-daily-challenge');
    if (!btn) return;
    const challenge = Storage.getDailyChallenge();
    const today = new Date().toISOString().split('T')[0];
    btn.classList.remove('hidden', 'completed');
    if (challenge.date === today && challenge.completed) {
      btn.classList.add('completed');
      document.getElementById('daily-challenge-desc').textContent =
        ` Completado · ${challenge.score} pts`;
    } else {
      document.getElementById('daily-challenge-desc').textContent =
        '10 preguntas unicas cada dia';
    }
  },
  startDailyChallenge() {
    const challenge = Storage.getDailyChallenge();
    const today = new Date().toISOString().split('T')[0];
    if (challenge.date === today && challenge.completed) {
      this.showToast('✅ Ya completaste el desafío de hoy');
      return;
    }
    // Verificar vidas antes de iniciar
    this.loadLives();
    if (!this.infiniteLives && this.lives <= 0) {
      this.showToast('💔 No tienes vidas. Espera a que se regeneren', 'error');
      return;
    }
    // Seed-based daily question selection
    const seed = this.getDailySeed();
    const allQuestions = this.getAllQuestionsFlat();
    const dailyQuestions = this.seededShuffle(allQuestions, seed).slice(0, 10);
    if (dailyQuestions.length < 5) {
      this.showToast('No hay suficientes preguntas', 'error');
      return;
    }
    // Use the normal game flow with these specific questions
    this.selectedCategory = 'aleatorio';
    this.selectedDifficulty = 'intermedio';
    this.activeDifficulty = 'intermedio';
    this.currentPhase = 1;
    this.isDailyChallenge = true;
    // Reload lives from storage (may have regenerated)
    this.loadLives();
    this.currentQuestions = dailyQuestions;
    this.currentQuestionIndex = 0;
    this.currentStreak = 0;
    this.sessionBestStreak = 0;
    this.sessionCorrect = 0;
    this.sessionWrong = 0;
    this.sessionPoints = 0;
    this.phaseCorrect = 0;
    this.phaseWrong = 0;
    const settings = Storage.getSettings();
    this.timerMax = settings.timerSeconds != null ? settings.timerSeconds : 30;
    // Hide overlays
    document.getElementById('phase-overlay').classList.add('hidden');
    document.getElementById('gameover-overlay').classList.add('hidden');
    document.getElementById('ad-overlay').classList.add('hidden');
    document.getElementById('catcomplete-overlay').classList.add('hidden');
    this.showScreen('quiz');
    this.renderLives();
    this.renderQuestion();
  },
  getDailySeed() {
    const d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  },
  getAllQuestionsFlat() {
    return [...QUESTIONS_DB];
  },
  seededShuffle(array, seed) {
    const arr = [...array];
    let s = seed;
    const random = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },
  // ============================================================
  // SPEED STATISTICS
  // ============================================================
  recordAnswerSpeed(seconds) {
    const stats = Storage.getSpeedStats();
    stats.totalTime += seconds;
    stats.totalAnswered++;
    if (stats.fastest === null || seconds < stats.fastest) stats.fastest = seconds;
    if (stats.slowest === null || seconds > stats.slowest) stats.slowest = seconds;
    Storage.saveSpeedStats(stats);
  },
  getAverageSpeed() {
    const stats = Storage.getSpeedStats();
    if (stats.totalAnswered === 0) return null;
    return (stats.totalTime / stats.totalAnswered).toFixed(1);
  },
  // ============================================================
  // STREAK POPUP
  // ============================================================
  showStreakPopup(streak) {
    const popup = document.createElement('div');
    popup.className = 'streak-popup';
    popup.textContent = ` !Racha de ${streak}! +50%`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1300);
  },
  // ============================================================
  // NOTIFICATIONS
  // ============================================================
  initNotifications() {
    if (!('Notification' in window)) return;
    // Schedule daily reminder if enabled
    if (Storage.getNotifEnabled() && Notification.permission === 'granted') {
      this.scheduleDailyReminder();
    }
  },
  requestNotificationPermission() {
    if (!('Notification' in window)) {
      this.showToast('Tu navegador no soporta notificaciones', 'error');
      document.getElementById('setting-notifications').checked = false;
      return;
    }

    // Usar el módulo PushNotifications si está disponible
    if (typeof PushNotifications !== 'undefined') {
      PushNotifications.requestPermission().then(result => {
        if (result.success) {
          Storage.saveNotifEnabled(true);
          document.getElementById('notif-time-setting').classList.remove('hidden');
          PushNotifications.setDailyReminder(true, 9, 0);
          this.showToast('🔔 ¡Recordatorios activados!');
        } else {
          Storage.saveNotifEnabled(false);
          document.getElementById('setting-notifications').checked = false;
          document.getElementById('notif-time-setting').classList.add('hidden');
          this.showToast('Permiso denegado para notificaciones', 'error');
        }
      });
    } else {
      // Fallback al método anterior
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          Storage.saveNotifEnabled(true);
          document.getElementById('notif-time-setting').classList.remove('hidden');
          this.scheduleDailyReminder();
          this.showToast('🔔 ¡Recordatorios activados!');
        } else {
          Storage.saveNotifEnabled(false);
          document.getElementById('setting-notifications').checked = false;
          document.getElementById('notif-time-setting').classList.add('hidden');
          this.showToast('Permiso denegado para notificaciones', 'error');
        }
      });
    }
  },
  scheduleDailyReminder() {
    // Clear any existing reminder
    if (this._reminderTimer) clearTimeout(this._reminderTimer);
    // Calculate ms until next day at 9:00 AM
    const now = new Date();
    const next9 = new Date(now);
    next9.setHours(9, 0, 0, 0);
    if (now >= next9) next9.setDate(next9.getDate() + 1);
    const msUntil = next9 - now;
    this._reminderTimer = setTimeout(() => {
      if (Storage.getNotifEnabled() && Notification.permission === 'granted') {
        new Notification('BibliaQuiz ', {
          body: '!No olvides tu reto biblico diario! Manten tu racha ',
          icon: 'icons/icon-192.png',
          badge: 'icons/icon-192.png'
        });
        // Re-schedule for next day
        this.scheduleDailyReminder();
      }
    }, msUntil);
  },
  // ============================================================
  // LEADERBOARD (render in progress screen)
  // ============================================================
  renderLeaderboard() {
    const lb = Storage.getLeaderboard();
    const container = document.getElementById('leaderboard-list');
    if (!lb || lb.length === 0) {
      container.innerHTML = '<div class="leaderboard-empty">Juega partidas para llenar el ranking</div>';
      return;
    }
    const medals = ['🥇', '🥈', '🥉'];
    container.innerHTML = lb.slice(0, 10).map((entry, i) => {
      const rank = medals[i] || `${i + 1}`;
      const d = entry.date ? new Date(entry.date).toLocaleDateString('es', { day: '2-digit', month: 'short' }) : '';
      return `
        <div class="leaderboard-item">
          <span class="lb-rank">${rank}</span>
          <span class="lb-avatar">${entry.avatar || ''}</span>
          <div class="lb-info">
            <div class="lb-name">${escapeHTML(entry.name || 'Jugador')}</div>
            <div class="lb-date">${d}</div>
          </div>
          <span class="lb-score">${entry.points} pts</span>
        </div>
      `;
    }).join('');
  },
  // ============================================================
  // PROGRESS CHART (canvas bar chart - weekly progress)
  // ============================================================
  renderProgressChart() {
    const canvas = document.getElementById('progress-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Get weekly stats (last 7 days)
    const weeklyData = Storage.getWeeklyStats();
    
    // Set actual canvas size for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width;
    const H = rect.height;
    ctx.clearRect(0, 0, W, H);
    
    // Get theme colors
    const cs = getComputedStyle(document.documentElement);
    const primaryColor = cs.getPropertyValue('--primary').trim() || '#6C63FF';
    const accentColor = cs.getPropertyValue('--accent').trim() || '#FF6584';
    const successColor = cs.getPropertyValue('--success').trim() || '#4CAF50';
    const gridColor = cs.getPropertyValue('--text-secondary').trim() || '#555';
    const textColor = cs.getPropertyValue('--text-secondary').trim() || '#888';
    const bgColor = cs.getPropertyValue('--bg-card').trim() || '#1a1a2e';
    
    // Check if there's any data
    const totalGames = weeklyData.reduce((sum, d) => sum + d.games, 0);
    if (totalGames === 0) {
      ctx.fillStyle = textColor;
      ctx.font = '13px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Juega partidas para ver tu progreso semanal', W / 2, H / 2 - 10);
      ctx.font = '11px Nunito, sans-serif';
      ctx.fillText('📊 Aquí verás tus estadísticas diarias', W / 2, H / 2 + 15);
      return;
    }
    
    const padL = 40, padR = 16, padT = 30, padB = 45;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const n = weeklyData.length;
    const barGroupW = chartW / n;
    
    // Find max values for scaling
    const maxGames = Math.max(...weeklyData.map(d => d.games), 1);
    const maxPoints = Math.max(...weeklyData.map(d => d.points), 10);
    
    // Draw Y axis guides
    ctx.strokeStyle = gridColor + '22';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padT + (chartH * i / 4);
      ctx.beginPath();
      ctx.setLineDash([3, 3]);
      ctx.moveTo(padL, y);
      ctx.lineTo(W - padR, y);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // Draw bars for each day
    weeklyData.forEach((day, i) => {
      const x = padL + i * barGroupW + barGroupW * 0.1;
      const barW = barGroupW * 0.8;
      
      // Background bar (empty state)
      const bgHeight = chartH;
      ctx.fillStyle = gridColor + '15';
      ctx.beginPath();
      ctx.roundRect(x, padT, barW, bgHeight, 6);
      ctx.fill();
      
      if (day.games > 0) {
        // Calculate bar height based on accuracy (0-100%)
        const accHeight = (chartH * day.accuracy) / 100;
        
        // Gradient based on accuracy
        const gradient = ctx.createLinearGradient(x, padT + chartH - accHeight, x, padT + chartH);
        if (day.accuracy >= 80) {
          gradient.addColorStop(0, successColor);
          gradient.addColorStop(1, successColor + '88');
        } else if (day.accuracy >= 50) {
          gradient.addColorStop(0, primaryColor);
          gradient.addColorStop(1, primaryColor + '88');
        } else {
          gradient.addColorStop(0, accentColor);
          gradient.addColorStop(1, accentColor + '88');
        }
        
        // Draw accuracy bar
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, padT + chartH - accHeight, barW, accHeight, [6, 6, 0, 0]);
        ctx.fill();
        
        // Draw accuracy percentage on top of bar
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 11px Nunito, sans-serif';
        ctx.textAlign = 'center';
        if (accHeight > 25) {
          ctx.fillText(`${day.accuracy}%`, x + barW / 2, padT + chartH - accHeight + 16);
        } else if (accHeight > 0) {
          ctx.fillStyle = textColor;
          ctx.fillText(`${day.accuracy}%`, x + barW / 2, padT + chartH - accHeight - 5);
        }
        
        // Draw games count below percentage
        if (accHeight > 40) {
          ctx.fillStyle = '#fff';
          ctx.font = '10px Nunito, sans-serif';
          ctx.fillText(`🎮 ${day.games}`, x + barW / 2, padT + chartH - accHeight + 32);
        }
      }
      
      // X-axis: Day label
      ctx.fillStyle = textColor;
      ctx.font = '11px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(day.label, x + barW / 2, H - 24);
      
      // Date below day
      ctx.font = '9px Nunito, sans-serif';
      ctx.fillText(day.date, x + barW / 2, H - 10);
    });
    
    // Draw legend
    ctx.font = '10px Nunito, sans-serif';
    ctx.textAlign = 'left';
    
    // Legend: Accuracy color guide
    const legendY = 12;
    ctx.fillStyle = successColor;
    ctx.fillRect(padL, legendY - 6, 8, 8);
    ctx.fillStyle = textColor;
    ctx.fillText('≥80%', padL + 12, legendY);
    
    ctx.fillStyle = primaryColor;
    ctx.fillRect(padL + 50, legendY - 6, 8, 8);
    ctx.fillStyle = textColor;
    ctx.fillText('50-79%', padL + 62, legendY);
    
    ctx.fillStyle = accentColor;
    ctx.fillRect(padL + 115, legendY - 6, 8, 8);
    ctx.fillStyle = textColor;
    ctx.fillText('<50%', padL + 127, legendY);
    
    // Total week stats
    const totalCorrect = weeklyData.reduce((s, d) => s + d.correct, 0);
    const totalQuestions = weeklyData.reduce((s, d) => s + d.total, 0);
    const weekAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    
    ctx.textAlign = 'right';
    ctx.fillStyle = textColor;
    ctx.fillText(`Semana: ${weekAccuracy}% (${totalGames} partidas)`, W - padR, legendY);
  },
  // ============================================================
  // TOAST NOTIFICATION
  // ============================================================
  showToast(message, type = '') {
    // Remove existing toasts
    document.querySelectorAll('.toast').forEach(t => t.remove());
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    // Announce to screen readers
    this.announce(message);
  },
  // ============================================================
  // PWA INSTALL PROMPT
  // ============================================================
  initInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredInstallPrompt = e;
      // Show install banner
      const banner = document.getElementById('install-banner');
      if (banner) banner.classList.remove('hidden');
    });
    document.getElementById('btn-install')?.addEventListener('click', async () => {
      if (!this.deferredInstallPrompt) return;
      this.deferredInstallPrompt.prompt();
      const { outcome } = await this.deferredInstallPrompt.userChoice;
      if (outcome === 'accepted') {
        this.showToast('📲 ¡App instalada!');
      }
      this.deferredInstallPrompt = null;
      document.getElementById('install-banner')?.classList.add('hidden');
    });
    document.getElementById('btn-install-dismiss')?.addEventListener('click', () => {
      document.getElementById('install-banner')?.classList.add('hidden');
    });
    // Hide banner if app is already installed
    window.addEventListener('appinstalled', () => {
      document.getElementById('install-banner')?.classList.add('hidden');
      this.deferredInstallPrompt = null;
    });
  },
  // ============================================================
  // URL SHORTCUTS (manifest shortcuts support)
  // ============================================================
  handleUrlShortcuts() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    if (!mode || !Storage.isRegistered()) return;
    switch (mode) {
      case 'play':
        this.renderCategories();
        this.showScreen('category-select');
        break;
      case 'daily':
        this.startDailyChallenge();
        break;
      case 'progress':
        this.renderProgress();
        this.showScreen('progress');
        break;
    }
    // Clean URL
    window.history.replaceState({}, '', window.location.pathname);
  },
  // ============================================================
  // ARIA-LIVE ANNOUNCER
  // ============================================================
  announce(text) {
    const region = document.getElementById('aria-live-region');
    if (region) {
      region.textContent = '';
      setTimeout(() => { region.textContent = text; }, 50);
    }
  },
  // ============================================================
  // MODO IMPOSTOR
  // ============================================================
  renderImpostorCategories() {
    const grid = document.getElementById('impostor-category-grid');
    grid.innerHTML = '';
    // Las categorias de palabras del impostor (no incluir 'aleatorio' como categoria separada)
    const impostorCats = {
      personajes: { name: "Personajes", icon: "🧑‍🤝‍🧑", color: "#4CAF50" },
      libros: { name: "Libros", icon: "📚", color: "#2196F3" },
      historias: { name: "Historias", icon: "📜", color: "#FF9800" },
      reyes: { name: "Reyes", icon: "👑", color: "#9C27B0" },
      profetas: { name: "Profetas", icon: "🔮", color: "#F44336" },
      vida_jesus: { name: "Vida de Jesus", icon: "✝️", color: "#E91E63" },
      milagros: { name: "Milagros", icon: "✨", color: "#00BCD4" },
      cartas: { name: "Cartas", icon: "💌", color: "#795548" },
      aleatorio: { name: "Aleatorio", icon: "🎲", color: "#607D8B" }
    };
    Object.entries(impostorCats).forEach(([key, cat]) => {
      const card = document.createElement('div');
      card.className = `category-card ${key === 'aleatorio' ? 'random-card' : ''}`;
      card.innerHTML = `
        <div class="cat-icon" style="background: ${cat.color}22">${cat.icon}</div>
        <span class="cat-name">${cat.name}</span>
      `;
      card.addEventListener('click', () => {
        this.impostorCategory = key;
        this.startImpostorDeal();
      });
      grid.appendChild(card);
    });
  },
  startImpostorDeal() {
    // Seleccionar categoria (aleatorio = cualquiera)
    let category = this.impostorCategory;
    if (category === 'aleatorio') {
      const cats = Object.keys(IMPOSTOR_WORDS);
      category = cats[Math.floor(Math.random() * cats.length)];
    }
    // Elegir una palabra al azar de esa categoria
    const words = IMPOSTOR_WORDS[category];
    this.impostorWord = words[Math.floor(Math.random() * words.length)];
    // Elegir quien sera el impostor (indice 0-based entre los jugadores)
    this.impostorImpostorIndex = Math.floor(Math.random() * this.impostorPlayers);
    this.impostorCurrentPlayer = 0;
    this.showScreen('impostor-deal');
    this.renderImpostorDealWaiting();
  },
  renderImpostorDealWaiting() {
    const container = document.getElementById('impostor-deal-content');
    const playerNum = this.impostorCurrentPlayer + 1;
    const total = this.impostorPlayers;
    container.innerHTML = `
      <div class="impostor-deal-waiting">
        <div class="impostor-deal-waiting-icon">iv>
        <h3>Jugador ${playerNum}</h3>
        <p>Solo el Jugador ${playerNum} debe ver la pantalla</p>
      </div>
      <div class="impostor-deal-progress">Jugador ${playerNum} de ${total}</div>
      <button class="btn-impostor-ready"> Ver mi palabra</button>
    `;
    container.querySelector('.btn-impostor-ready').addEventListener('click', () => {
      this.showImpostorWord();
    });
  },
  showImpostorWord() {
    const container = document.getElementById('impostor-deal-content');
    const isImpostor = this.impostorCurrentPlayer === this.impostorImpostorIndex;
    const playerNum = this.impostorCurrentPlayer + 1;
    if (isImpostor) {
      container.innerHTML = `
        <div class="impostor-deal-word-display">
          <div class="impostor-deal-word-label">Jugador ${playerNum}, tu rol es:</div>
          <div class="impostor-deal-word is-impostor"> !ERES EL IMPOSTOR!</div>
          <p class="impostor-deal-memorize">No conoces la palabra. !Disimula!</p>
          <button class="btn-impostor-seen"> Entendido, pasar</button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="impostor-deal-word-display">
          <div class="impostor-deal-word-label">Jugador ${playerNum}, tu palabra es:</div>
          <div class="impostor-deal-word">${escapeHTML(this.impostorWord)}</div>
          <p class="impostor-deal-memorize">Memoriza la palabra y pasa el dispositivo</p>
          <button class="btn-impostor-seen"> Ya la vi, pasar</button>
        </div>
      `;
    }
    container.querySelector('.btn-impostor-seen').addEventListener('click', () => {
      this.nextImpostorPlayer();
    });
  },
  nextImpostorPlayer() {
    this.impostorCurrentPlayer++;
    if (this.impostorCurrentPlayer >= this.impostorPlayers) {
      // Todos vieron su palabra, ir a discusion
      this.startImpostorDiscussion();
    } else {
      this.renderImpostorDealWaiting();
    }
  },
  startImpostorDiscussion() {
    this.impostorDiscussSeconds = 120; // 2 minutos
    this.showScreen('impostor-discuss');
    this.updateImpostorTimer();
    this.impostorDiscussTimer = setInterval(() => {
      this.impostorDiscussSeconds--;
      this.updateImpostorTimer();
      if (this.impostorDiscussSeconds <= 0) {
        this.clearImpostorTimer();
      }
    }, 1000);
  },
  updateImpostorTimer() {
    const timerEl = document.getElementById('impostor-discuss-timer');
    if (!timerEl) return;
    const mins = Math.floor(this.impostorDiscussSeconds / 60);
    const secs = this.impostorDiscussSeconds % 60;
    timerEl.textContent = `T: ${mins}:${secs.toString().padStart(2, '0')}`;
    // Colores de alerta
    timerEl.classList.remove('warning', 'danger');
    if (this.impostorDiscussSeconds <= 0) {
      timerEl.textContent = 'T: ¡Tiempo!';
      timerEl.classList.add('danger');
    } else if (this.impostorDiscussSeconds <= 15) {
      timerEl.classList.add('danger');
    } else if (this.impostorDiscussSeconds <= 30) {
      timerEl.classList.add('warning');
    }
  },
  clearImpostorTimer() {
    if (this.impostorDiscussTimer) {
      clearInterval(this.impostorDiscussTimer);
      this.impostorDiscussTimer = null;
    }
  },
  revealImpostor() {
    this.clearImpostorTimer();
    const playerNum = this.impostorImpostorIndex + 1;
    document.getElementById('impostor-reveal-player').textContent = `Jugador ${playerNum}`;
    document.getElementById('impostor-reveal-word').textContent = this.impostorWord;
    this.showScreen('impostor-reveal');
  },
  startImpostorNewRound() {
    this.clearImpostorTimer();
    // Volver a elegir categoria con los mismos jugadores
    this.renderImpostorCategories();
    this.showScreen('impostor-category');
  },
  // ============================================================
  // FOCUS TRAPPING (for overlays/modals)
  // ============================================================
  trapFocus(container) {
    const focusable = container.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return null;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();
    const handler = (e) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    container.addEventListener('keydown', handler);
    return handler; // return for cleanup
  },
  // --- Notificaciones Push ---
  requestPushPermission() {
    if (!('Notification' in window) || !('serviceWorker' in navigator)) {
      this.showToast('Tu navegador no soporta notificaciones push');
      return;
    }
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        navigator.serviceWorker.ready.then(reg => {
          reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.getVapidKey()
          }).then(sub => {
            this.showToast('!Notificaciones activadas!');
            // Aqui puedes enviar la suscripcion al backend
            console.log('Push subscription:', JSON.stringify(sub));
          }).catch(err => {
            this.showToast('Error al suscribirse a notificaciones');
            console.error('Push error:', err);
          });
        });
      } else {
        this.showToast('Permiso de notificaciones denegado');
      }
    });
  },
  getVapidKey() {
    // Clave publica VAPID (de ejemplo, reemplazar por la real si tienes backend)
    return 'BElEjemploVapidKey1234567890';
  },
  // Clean up all focus traps when overlays hide
  cleanOverlayTraps() {
    const traps = [
      { key: '_phaseOverlayTrap', id: 'phase-overlay' },
      { key: '_gameoverTrap', id: 'gameover-overlay' },
      { key: '_catcompleteTrap', id: 'catcomplete-overlay' }
    ];
    traps.forEach(({ key, id }) => {
      if (this[key]) {
        const el = document.getElementById(id);
        if (el) el.removeEventListener('keydown', this[key]);
        this[key] = null;
      }
    });
  }
};
// --- Iniciar App ---
document.addEventListener('DOMContentLoaded', () => App.init());
