// ============================================================
// 🔐 VERIFICACIÓN DE LOGIN OBLIGATORIO - SE EJECUTA PRIMERO
// ============================================================
(function() {
  const hasToken = localStorage.getItem('backend_token');
  if (!hasToken) {
    console.log('[BibliaQuiz] ⚠️ SIN TOKEN - Login obligatorio');
    
    // Esperar a que el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
      // Crear overlay de login obligatorio
      const loginOverlay = document.createElement('div');
      loginOverlay.id = 'mandatory-login-overlay';
      loginOverlay.innerHTML = `
        <div style="background: linear-gradient(135deg, #1a1626 0%, #2d2640 100%); padding: 30px; border-radius: 20px; border: 2px solid #ff6b6b; max-width: 400px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
          <h2 style="color: white; text-align: center; margin-bottom: 20px; font-size: 1.5rem;">🔐 Inicia sesión para continuar</h2>
          <p style="color: #aaa; text-align: center; margin-bottom: 20px;">Tu progreso se guardará en la nube</p>
          
          <div id="mandatory-login-form">
            <input type="email" id="mandatory-email" placeholder="Correo electrónico" style="width: 100%; padding: 14px; margin: 8px 0; border-radius: 10px; border: 2px solid #333; background: #1a1a2e; color: white; font-size: 16px; box-sizing: border-box;">
            <input type="password" id="mandatory-password" placeholder="Contraseña" style="width: 100%; padding: 14px; margin: 8px 0; border-radius: 10px; border: 2px solid #333; background: #1a1a2e; color: white; font-size: 16px; box-sizing: border-box;">
            <button id="mandatory-login-btn" style="width: 100%; padding: 16px; background: linear-gradient(135deg, #4ecdc4, #44a08d); color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer; margin-top: 10px;">🔑 Iniciar Sesión</button>
          </div>
          
          <div id="mandatory-register-form" style="display: none;">
            <input type="email" id="mandatory-reg-email" placeholder="Correo electrónico" style="width: 100%; padding: 14px; margin: 8px 0; border-radius: 10px; border: 2px solid #333; background: #1a1a2e; color: white; font-size: 16px; box-sizing: border-box;">
            <input type="password" id="mandatory-reg-password" placeholder="Contraseña (mín. 6 caracteres)" style="width: 100%; padding: 14px; margin: 8px 0; border-radius: 10px; border: 2px solid #333; background: #1a1a2e; color: white; font-size: 16px; box-sizing: border-box;">
            <input type="text" id="mandatory-reg-name" placeholder="Nombre (opcional)" style="width: 100%; padding: 14px; margin: 8px 0; border-radius: 10px; border: 2px solid #333; background: #1a1a2e; color: white; font-size: 16px; box-sizing: border-box;">
            <button id="mandatory-register-btn" style="width: 100%; padding: 16px; background: linear-gradient(135deg, #ff6b6b, #ee5a5a); color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer; margin-top: 10px;">📝 Crear Cuenta</button>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <span id="toggle-text" style="color: #888;">¿No tienes cuenta?</span>
            <button id="toggle-form-btn" style="background: none; border: none; color: #4ecdc4; cursor: pointer; font-weight: bold; margin-left: 5px;">Registrarse</button>
          </div>
          
          <div id="mandatory-error" style="color: #ff6b6b; text-align: center; margin-top: 15px; display: none;"></div>
          <div id="mandatory-loading" style="color: #4ecdc4; text-align: center; margin-top: 15px; display: none;">⏳ Procesando...</div>
        </div>
      `;
      loginOverlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 14, 23, 0.98); display: flex; align-items: center; justify-content: center; z-index: 999999;';
      document.body.appendChild(loginOverlay);
      
      // Toggle entre login y registro
      document.getElementById('toggle-form-btn').addEventListener('click', function() {
        const loginForm = document.getElementById('mandatory-login-form');
        const registerForm = document.getElementById('mandatory-register-form');
        const toggleText = document.getElementById('toggle-text');
        const toggleBtn = document.getElementById('toggle-form-btn');
        
        if (loginForm.style.display !== 'none') {
          loginForm.style.display = 'none';
          registerForm.style.display = 'block';
          toggleText.textContent = '¿Ya tienes cuenta?';
          toggleBtn.textContent = 'Iniciar Sesión';
        } else {
          loginForm.style.display = 'block';
          registerForm.style.display = 'none';
          toggleText.textContent = '¿No tienes cuenta?';
          toggleBtn.textContent = 'Registrarse';
        }
      });
      
      // Login
      document.getElementById('mandatory-login-btn').addEventListener('click', async function() {
        const email = document.getElementById('mandatory-email').value.trim();
        const password = document.getElementById('mandatory-password').value;
        const errorDiv = document.getElementById('mandatory-error');
        const loadingDiv = document.getElementById('mandatory-loading');
        
        if (!email || !password) {
          errorDiv.textContent = 'Por favor completa todos los campos';
          errorDiv.style.display = 'block';
          return;
        }
        
        errorDiv.style.display = 'none';
        loadingDiv.style.display = 'block';
        
        try {
          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          
          const data = await response.json();
          
          if (response.ok && data.token) {
            localStorage.setItem('backend_token', data.token);
            localStorage.setItem('backend_user', JSON.stringify(data.user));
            location.reload();
          } else {
            errorDiv.textContent = data.message || 'Error al iniciar sesión';
            errorDiv.style.display = 'block';
          }
        } catch (err) {
          errorDiv.textContent = 'Error de conexión. Verifica que el servidor esté activo.';
          errorDiv.style.display = 'block';
        }
        
        loadingDiv.style.display = 'none';
      });
      
      // Registro
      document.getElementById('mandatory-register-btn').addEventListener('click', async function() {
        const email = document.getElementById('mandatory-reg-email').value.trim();
        const password = document.getElementById('mandatory-reg-password').value;
        const name = document.getElementById('mandatory-reg-name').value.trim() || 'Jugador';
        const errorDiv = document.getElementById('mandatory-error');
        const loadingDiv = document.getElementById('mandatory-loading');
        
        if (!email || !password) {
          errorDiv.textContent = 'Por favor completa email y contraseña';
          errorDiv.style.display = 'block';
          return;
        }
        
        if (password.length < 6) {
          errorDiv.textContent = 'La contraseña debe tener al menos 6 caracteres';
          errorDiv.style.display = 'block';
          return;
        }
        
        errorDiv.style.display = 'none';
        loadingDiv.style.display = 'block';
        
        try {
          const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, displayName: name })
          });
          
          const data = await response.json();
          
          if (response.ok && data.token) {
            localStorage.setItem('backend_token', data.token);
            localStorage.setItem('backend_user', JSON.stringify(data.user));
            location.reload();
          } else {
            errorDiv.textContent = data.message || 'Error al crear cuenta';
            errorDiv.style.display = 'block';
          }
        } catch (err) {
          errorDiv.textContent = 'Error de conexión. Verifica que el servidor esté activo.';
          errorDiv.style.display = 'block';
        }
        
        loadingDiv.style.display = 'none';
      });
      
      // Enter para enviar
      document.getElementById('mandatory-email').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') document.getElementById('mandatory-login-btn').click();
      });
      document.getElementById('mandatory-password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') document.getElementById('mandatory-login-btn').click();
      });
    });
  }
})();

// --- Boton Acerca de ---
document.addEventListener('DOMContentLoaded', () => {
  const btnAbout = document.getElementById('btn-about');
  if (btnAbout) {
    btnAbout.addEventListener('click', () => App.showScreen('about'));
  }
  // Bot�n Poltica de Privacidad
  const btnPrivacy = document.getElementById('btn-privacy');
  if (btnPrivacy) {
    btnPrivacy.addEventListener('click', () => App.showScreen('privacy'));
  }
  // Bot�n T�rminos de Uso
  const btnTerms = document.getElementById('btn-terms');
  if (btnTerms) {
    btnTerms.addEventListener('click', () => App.showScreen('terms'));
  }
  // Bot�n Valorar App
  const btnRate = document.getElementById('btn-rate');
  if (btnRate) {
    btnRate.addEventListener('click', () => {
      // Abrir enlace de valoración (placeholder - cambiar por URL real de la tienda)
      App.showToast('\u{2B50} ¡Gracias por tu apoyo!');
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

// ============================================================
// Avatar / Personaje customization data
// ============================================================
const DICEBEAR_BASE = 'https://api.dicebear.com/9.x/adventurer/svg?seed=';
const AVATAR_CHARACTERS = [
  // ── Hombres piel clara ──
  { key:'rodrigo',   seed:'ManRod2025',  p:'&skinColor[]=f5d0a9&hair[]=short01' },
  { key:'andres',    seed:'ManAnd2025',  p:'&skinColor[]=eac393&hair[]=short03' },
  { key:'carlos',    seed:'ManCar2025',  p:'&skinColor[]=f5d0a9&hair[]=short05' },
  { key:'sebastian', seed:'ManSeb2025',  p:'&skinColor[]=f5d0a9&hair[]=short07' },
  { key:'diego',     seed:'ManDie2025',  p:'&skinColor[]=d4a574&hair[]=short02' },
  { key:'cristobal', seed:'ManCri2025',  p:'&skinColor[]=f5d0a9&hair[]=short04' },
  { key:'alejandro', seed:'ManAle2025',  p:'&skinColor[]=eac393&hair[]=short06' },
  { key:'nicolas',   seed:'ManNic2025',  p:'&skinColor[]=d4a574&hair[]=short08' },
  { key:'gabriel',   seed:'ManGab2025',  p:'&skinColor[]=eac393&hair[]=short01' },
  { key:'rafael',    seed:'ManRaf2025',  p:'&skinColor[]=d4a574&hair[]=short03' },
  // ── Hombres piel morena / oscura ──
  { key:'oziel',     seed:'ManOzi2025',  p:'&skinColor[]=c68642&hair[]=short05' },
  { key:'matias',    seed:'ManMat2025',  p:'&skinColor[]=c68642&hair[]=short07' },
  { key:'santiago',  seed:'ManSan2025',  p:'&skinColor[]=8d5524&hair[]=short02' },
  { key:'victor',    seed:'ManVic2025',  p:'&skinColor[]=c68642&hair[]=short04' },
  { key:'simon',     seed:'ManSim2025',  p:'&skinColor[]=8d5524&hair[]=short06' },
  { key:'elian',     seed:'ManEli2025',  p:'&skinColor[]=c68642&hair[]=short08' },
  { key:'bruno',     seed:'ManBru2025',  p:'&skinColor[]=8d5524&hair[]=short01' },
  { key:'dante',     seed:'ManDan2025',  p:'&skinColor[]=6b3e2e&hair[]=short03' },
  { key:'renzo',     seed:'ManRen2025',  p:'&skinColor[]=8d5524&hair[]=short05' },
  { key:'leonardo',  seed:'ManLeo2025',  p:'&skinColor[]=c68642&hair[]=short07' },
  { key:'ivan',      seed:'ManIva2025',  p:'&skinColor[]=d4a574&hair[]=short02' },
  { key:'franco',    seed:'ManFra2025',  p:'&skinColor[]=6b3e2e&hair[]=short04' },
  // ── Mujeres piel clara ──
  { key:'valentina', seed:'WomVal2025',  p:'&skinColor[]=f5d0a9&hair[]=long01'  },
  { key:'camila',    seed:'WomCam2025',  p:'&skinColor[]=eac393&hair[]=long03'  },
  { key:'isabella',  seed:'WomIsa2025',  p:'&skinColor[]=f5d0a9&hair[]=long05'  },
  { key:'sofia',     seed:'WomSof2025',  p:'&skinColor[]=f5d0a9&hair[]=long02'  },
  { key:'lucia',     seed:'WomLuc2025',  p:'&skinColor[]=eac393&hair[]=long04'  },
  { key:'elena',     seed:'WomEle2025',  p:'&skinColor[]=d4a574&hair[]=long06'  },
  { key:'clara',     seed:'WomCla2025',  p:'&skinColor[]=eac393&hair[]=long01'  },
  { key:'natalia',   seed:'WomNat2025',  p:'&skinColor[]=d4a574&hair[]=long03'  },
  { key:'adriana',   seed:'WomAdr2025',  p:'&skinColor[]=f5d0a9&hair[]=long05'  },
  // ── Mujeres piel morena / oscura ──
  { key:'fernanda',  seed:'WomFer2025',  p:'&skinColor[]=c68642&hair[]=long02'  },
  { key:'valeria',   seed:'WomVale2025', p:'&skinColor[]=8d5524&hair[]=long04'  },
  { key:'daniela',   seed:'WomDan2025',  p:'&skinColor[]=c68642&hair[]=long06'  },
  { key:'paola',     seed:'WomPao2025',  p:'&skinColor[]=8d5524&hair[]=long01'  },
  { key:'andrea',    seed:'WomAnd2025',  p:'&skinColor[]=c68642&hair[]=long03'  },
  { key:'rebeca',    seed:'WomReb2025',  p:'&skinColor[]=8d5524&hair[]=long05'  },
  { key:'catalina',  seed:'WomCat2025',  p:'&skinColor[]=6b3e2e&hair[]=long02'  },
  { key:'samara',    seed:'WomSam2025',  p:'&skinColor[]=c68642&hair[]=long04'  },
];
window.AVATAR_CHARACTERS = AVATAR_CHARACTERS;
window.DICEBEAR_BASE = DICEBEAR_BASE;
const AVATAR_COLORS = {
  indigo:  { name:'Índigo',    grad:'linear-gradient(135deg,#6366f1,#8b5cf6)', glow:'rgba(99,102,241,0.7)'  },
  sky:     { name:'Cielo',     grad:'linear-gradient(135deg,#3b82f6,#06b6d4)', glow:'rgba(59,130,246,0.7)'  },
  emerald: { name:'Esmeralda', grad:'linear-gradient(135deg,#10b981,#059669)', glow:'rgba(16,185,129,0.7)'  },
  rose:    { name:'Rosa',      grad:'linear-gradient(135deg,#ec4899,#db2777)', glow:'rgba(236,72,153,0.7)'  },
  orange:  { name:'Naranja',   grad:'linear-gradient(135deg,#f97316,#f59e0b)', glow:'rgba(249,115,22,0.7)'  },
  gold:    { name:'Dorado',    grad:'linear-gradient(135deg,#f59e0b,#d97706)', glow:'rgba(245,158,11,0.7)'  },
  red:     { name:'Rojo',      grad:'linear-gradient(135deg,#ef4444,#dc2626)', glow:'rgba(239,68,68,0.7)'   },
  lime:    { name:'Lima',      grad:'linear-gradient(135deg,#84cc16,#16a34a)', glow:'rgba(132,204,22,0.7)'  },
  violet:  { name:'Violeta',   grad:'linear-gradient(135deg,#a855f7,#7e22ce)', glow:'rgba(168,85,247,0.7)'  },
  slate:   { name:'Noche',     grad:'linear-gradient(135deg,#475569,#1e293b)', glow:'rgba(71,85,105,0.7)'   },
};
window.AVATAR_COLORS = AVATAR_COLORS;

// ============================================================
// SVG Game Icons
// ============================================================
const _H = 'http://www.w3.org/2000/svg';
const ICON_SVG = {
  heartActive: `<svg class="icon-heart active" viewBox="0 0 24 24" xmlns="${_H}" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
  heartEmpty:  `<svg class="icon-heart empty"  viewBox="0 0 24 24" xmlns="${_H}" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
  fire:        `<svg class="icon-fire"         viewBox="0 0 24 24" xmlns="${_H}" aria-hidden="true"><path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-1 .23-1.97.75-2.73 1.44-2.67 2.43-3.34 6.3-1.81 9.46-1.57-.44-1.68-1.43-1.72-2.3-.64 1.06-.82 2.38-.59 3.62.24 1.3 1.01 2.43 2.01 3.23 1.98 1.53 4.64 1.28 6.7.17 2.72-1.47 3.62-4.86 2.84-7.42z"/></svg>`,
  fireLg:      `<svg class="icon-fire lg"      viewBox="0 0 24 24" xmlns="${_H}" aria-hidden="true"><path d="M17.66 11.2c-.23-.3-.51-.56-.77-.82-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-1 .23-1.97.75-2.73 1.44-2.67 2.43-3.34 6.3-1.81 9.46-1.57-.44-1.68-1.43-1.72-2.3-.64 1.06-.82 2.38-.59 3.62.24 1.3 1.01 2.43 2.01 3.23 1.98 1.53 4.64 1.28 6.7.17 2.72-1.47 3.62-4.86 2.84-7.42z"/></svg>`,
  crownLg:     `<svg class="icon-crown lg"     viewBox="0 0 24 24" xmlns="${_H}" aria-hidden="true"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>`,
  lightningLg: `<svg class="icon-lightning lg" viewBox="0 0 24 24" xmlns="${_H}" aria-hidden="true"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`,
  star:        `<svg class="icon-star"         viewBox="0 0 24 24" xmlns="${_H}" aria-hidden="true"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`,
  trophy:      `<svg class="icon-trophy"       viewBox="0 0 24 24" xmlns="${_H}" aria-hidden="true"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94C8.02 14.5 9.37 15.77 11 16v2H7v2h10v-2h-4v-2c1.63-.23 2.98-1.5 3.61-3.06C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>`,
};
window.ICON_SVG = ICON_SVG;

const App = {
  // --- Estado ---
  // Sistema de vidas
  lives: 12,
  maxLives: 12,
  infiniteLives: false,
  lifeRegenInterval: null,
  homeLivesTimerInterval: null,
  // Orden de dificultades para progresion
  difficultyOrder: ['facil', 'intermedio', 'dificil', 'experto'],
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
  // Sistema de monedas
  sessionCoins: 0,
  coinMultiplier: 1,
  phaseHadError: false,
  currentPhase: 1,
  phaseCorrect: 0,
  phaseWrong: 0,
  allUsedQuestionIds: [],
  allUsedQuestionTexts: [],
  categoryExhausted: false,
  diffCompletedInSession: [],
  answered: false,
  timerInterval: null,
  timerSeconds: 0,
  timerMax: 0,
  // Challenge mode (contrarreloj)
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
  // Campaign mode
  campaignMode: null,
  // Social challenge mode (reto contra amigo)
  isSocialChallenge: false,
  socialChallengeData: null,
  socialChallengeStartTime: null,
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
  // Contador de comodines usados en la partida actual (max 1 por partida)
  sessionPowerupsUsed: 0,
  
  // Pool de distractores bíblicos por categoría para generar opciones extra
  distractorPool: {
    personajes: ['Abraham', 'Isaac', 'Jacob', 'Moisés', 'David', 'Salomón', 'Elías', 'Eliseo', 'Daniel', 'José', 'Samuel', 'Jonás', 'Noé', 'Adán', 'Eva', 'Caín', 'Abel', 'Set', 'Enoc', 'Matusalén', 'Pedro', 'Pablo', 'Juan', 'Santiago', 'Andrés', 'Felipe', 'Tomás', 'Mateo', 'Judas', 'Bartolomé', 'María', 'Marta', 'Lázaro', 'Nicodemo', 'Pilato', 'Herodes', 'Faraón', 'Nabucodonosor', 'Goliat', 'Sansón', 'Isaías', 'Jeremías', 'Ezequiel', 'Oseas', 'Amós', 'Miqueas', 'Habacuc', 'Sofonías', 'Hageo', 'Zacarías', 'Malaquías', 'Hilcías', 'Petuel', 'Beeri', 'Buzi', 'Amoz', 'Cusi', 'Iddo'],
    numeros: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '20', '30', '40', '50', '70', '100', '120', '150', '200', '300', '400', '500', '600', '666', '1000'],
    lugares: ['Jerusalén', 'Belén', 'Nazaret', 'Galilea', 'Samaria', 'Egipto', 'Babilonia', 'Roma', 'Corinto', 'Éfeso', 'Antioquía', 'Damasco', 'Jericó', 'Sodoma', 'Gomorra', 'Nínive', 'Tarsis', 'Sinaí', 'Carmelo', 'Tabor', 'Getsemaní', 'Gólgota', 'Caná', 'Capernaúm', 'Betania'],
    libros: ['Génesis', 'Éxodo', 'Levítico', 'Números', 'Deuteronomio', 'Josué', 'Jueces', 'Rut', 'Samuel', 'Reyes', 'Crónicas', 'Esdras', 'Nehemías', 'Ester', 'Job', 'Salmos', 'Proverbios', 'Eclesiastés', 'Cantares', 'Isaías', 'Jeremías', 'Ezequiel', 'Daniel', 'Mateo', 'Marcos', 'Lucas', 'Juan', 'Hechos', 'Romanos', 'Corintios', 'Apocalipsis'],
    general: ['Fe', 'Esperanza', 'Amor', 'Paz', 'Gozo', 'Paciencia', 'Bondad', 'Benignidad', 'Templanza', 'Gracia', 'Misericordia', 'Perdón', 'Salvación', 'Redención', 'Justificación', 'Santificación', 'Bautismo', 'Comunión', 'Oración', 'Ayuno', 'Diezmo', 'Sacrificio', 'Pacto', 'Alianza', 'Ley', 'Profecía', 'Milagro', 'Señal', 'Maravilla', 'Reino']
  },
  
  // Función para expandir opciones a 6
  expandOptionsTo6(question) {
    const originalOptions = [...question.options];
    const correctAnswer = originalOptions[question.correct];
    
    // Si ya tiene 6 o más opciones, mezclarlas y devolver
    if (originalOptions.length >= 6) {
      const shuffled = this.shuffleWithCorrect(originalOptions, question.correct);
      return shuffled;
    }
    
    // PRIORIDAD 1: Usar la categoría de la pregunta si está disponible
    let poolCategory = 'general';
    const questionCategory = question.category?.toLowerCase();
    
    // Mapear categorías de preguntas a pools de distractores
    if (questionCategory === 'personajes' || questionCategory === 'profetas' || questionCategory === 'reyes') {
      poolCategory = 'personajes';
    } else if (questionCategory === 'lugares' || questionCategory === 'geografia') {
      poolCategory = 'lugares';
    } else if (questionCategory === 'libros') {
      poolCategory = 'libros';
    } else {
      // PRIORIDAD 2: Detectar automáticamente según contenido de opciones
      const firstOption = originalOptions[0]?.toLowerCase() || '';
      
      if (/^\d+$/.test(originalOptions[0])) {
        poolCategory = 'numeros';
      } else if (originalOptions.some(opt => this.distractorPool.personajes.some(p => opt.toLowerCase().includes(p.toLowerCase())))) {
        poolCategory = 'personajes';
      } else if (originalOptions.some(opt => this.distractorPool.lugares.some(l => opt.toLowerCase().includes(l.toLowerCase())))) {
        poolCategory = 'lugares';
      } else if (originalOptions.some(opt => this.distractorPool.libros.some(b => opt.toLowerCase().includes(b.toLowerCase())))) {
        poolCategory = 'libros';
      }
    }
    
    // Obtener distractores que no estén ya en las opciones
    const existingLower = originalOptions.map(o => o.toLowerCase());
    const availableDistractors = this.distractorPool[poolCategory].filter(
      d => !existingLower.includes(d.toLowerCase())
    );
    
    // Si no hay suficientes en la categoría, añadir de personajes (más seguro que general)
    if (availableDistractors.length < 2 && poolCategory !== 'personajes') {
      const personajesDistractors = this.distractorPool.personajes.filter(
        d => !existingLower.includes(d.toLowerCase()) && !availableDistractors.includes(d)
      );
      availableDistractors.push(...personajesDistractors);
    }
    
    // Mezclar distractores disponibles
    const shuffledDistractors = availableDistractors.sort(() => Math.random() - 0.5);
    
    // Añadir 2 distractores extra
    const extraOptions = shuffledDistractors.slice(0, 6 - originalOptions.length);
    const allOptions = [...originalOptions, ...extraOptions];
    
    // Mezclar todas las opciones manteniendo track del índice correcto
    const shuffled = this.shuffleWithCorrect(allOptions, question.correct);
    return shuffled;
  },
  
  // Función auxiliar para mezclar opciones y devolver nuevo índice correcto
  shuffleWithCorrect(options, originalCorrectIndex) {
    const correctAnswer = options[originalCorrectIndex];
    
    // Crear array de pares [opción, esCorrecta]
    const optionsWithFlag = options.map((opt, i) => ({
      text: opt,
      isCorrect: i === originalCorrectIndex
    }));
    
    // Mezclar usando Fisher-Yates
    for (let i = optionsWithFlag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionsWithFlag[i], optionsWithFlag[j]] = [optionsWithFlag[j], optionsWithFlag[i]];
    }
    
    // Encontrar nuevo índice correcto
    const newCorrectIndex = optionsWithFlag.findIndex(opt => opt.isCorrect);
    
    return {
      options: optionsWithFlag.map(opt => opt.text),
      correctIndex: newCorrectIndex
    };
  },
  
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
    try {
      // --- Versionado/migracion de datos ---
      if (typeof Storage.initVersioning === 'function') {
        Storage.initVersioning();
      }
      // Sync backend username to Storage so Firebase picks it up
      try {
        const backendUser = JSON.parse(localStorage.getItem('backend_user') || '{}');
        if (backendUser.displayName) {
          const player = Storage.getPlayer();
          if (!player.name || player.name !== backendUser.displayName) {
            player.name = backendUser.displayName;
            Storage.savePlayer(player);
          }
        }
      } catch(e) {}
      this.bindEvents();
      console.log('[BibliaQuiz] Events bound');
      this.loadLives();
      this.loadInfiniteLives();
      this.startLifeRegen();
      this.startHomeLivesTimer();
      this.initTheme();
      
      // 🔐 VERIFICACIÓN INMEDIATA DE AUTENTICACIÓN
      // Si no hay token, forzar login y NO mostrar home
      const hasToken = localStorage.getItem('backend_token');
      if (!hasToken) {
        console.log('[BibliaQuiz] ⚠️ Sin token - forzando login obligatorio');
        this.forceShowLoginModal();
        // NO continuar con renderHome
      } else {
        // Solo mostrar home si hay token
        if (Storage.isRegistered()) {
          this.showScreen('home');
          this.renderHome();
          this.loadSettings();
          this.initOnboarding();
          this._initHomeBannerAd();
          // Sync local avatar to MongoDB on every startup (fire-and-forget)
          try {
            const _p = Storage.getPlayer();
            if (_p.avatar && window.BackendService?.updateAvatar) {
              window.BackendService.updateAvatar(_p.avatar, _p.avatarColor || 'indigo');
            }
          } catch(e) {}
        }
      }
      
      this.initOfflineDetection();
      this.initKeyboard();
      this.initDailyStreak();
      this._lastVisibleDate = new Date().toDateString();
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          const today = new Date().toDateString();
          if (today !== this._lastVisibleDate) {
            this._lastVisibleDate = today;
            this.initDailyStreak();
            this.renderDailyChallengeCard();
            this._refreshDailyContent();
          }
        }
      });
      this.renderDailyChallengeCard();
      this.scheduleMidnightRefresh();
      this.initNotifications();
      try {
        this.initPowerupListeners();
        this.updatePowerupsDisplay();
      } catch (e) {
        console.warn('[BibliaQuiz] Error inicializando powerups:', e);
      }
      this.initInstallPrompt();
      this.handleUrlShortcuts();
    } catch (e) {
      console.error('[BibliaQuiz] Error fatal en init:', e);
    }
    this.hideSplash();
  },
  
  // 🔐 Forzar modal de login inmediatamente
  forceShowLoginModal() {
    console.log('[BibliaQuiz] 🔐 Forzando modal de login...');
    
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    
    // Mostrar el modal de login con máxima prioridad
    const modal = document.getElementById('login-prompt-banner');
    if (modal) {
      modal.classList.remove('hidden');
      modal.style.cssText = `
        display: flex !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        z-index: 99999 !important;
        background: rgba(15, 14, 23, 0.98) !important;
        align-items: center !important;
        justify-content: center !important;
      `;
      
      // Asegurar que el contenido interno sea visible
      const content = modal.querySelector('.login-prompt-content');
      if (content) {
        content.style.cssText = `
          background: linear-gradient(135deg, #1a1626 0%, #2d2640 100%) !important;
          padding: 30px !important;
          border-radius: 20px !important;
          border: 2px solid #ff6b6b !important;
          max-width: 400px !important;
          width: 90% !important;
        `;
      }
      
      // Actualizar título (es h3, no h2)
      const title = modal.querySelector('.login-prompt-title');
      if (title) {
        title.textContent = '🔐 Inicia sesión para continuar';
        title.style.cssText = 'color: white !important; text-align: center !important; margin-bottom: 20px !important;';
      }
      
      // Ocultar botón de cerrar - login es obligatorio
      const closeBtn = modal.querySelector('.btn-close-login');
      if (closeBtn) {
        closeBtn.style.display = 'none';
      }
      
      console.log('[BibliaQuiz] ✅ Modal de login forzado visible');
    } else {
      console.error('[BibliaQuiz] ❌ No se encontró #login-prompt-banner');
      // Fallback: crear un modal simple si no existe
      this.createEmergencyLoginModal();
    }
  },
  
  // Crear modal de emergencia si el principal no existe
  createEmergencyLoginModal() {
    const overlay = document.createElement('div');
    overlay.id = 'emergency-login';
    overlay.innerHTML = `
      <div style="background: #1a1626; padding: 30px; border-radius: 20px; border: 2px solid #ff6b6b; max-width: 400px; width: 90%;">
        <h2 style="color: white; text-align: center;">🔐 Inicia sesión</h2>
        <input type="email" id="emergency-email" placeholder="Correo" style="width: 100%; padding: 12px; margin: 10px 0; border-radius: 8px; border: none;">
        <input type="password" id="emergency-password" placeholder="Contraseña" style="width: 100%; padding: 12px; margin: 10px 0; border-radius: 8px; border: none;">
        <button onclick="BackendService.login(document.getElementById('emergency-email').value, document.getElementById('emergency-password').value).then(() => location.reload())" style="width: 100%; padding: 15px; background: #4ecdc4; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">Entrar</button>
      </div>
    `;
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center; z-index: 99999;';
    document.body.appendChild(overlay);
  },
  
  // 🆕 Verificación de autenticación obligatoria (LLAMADA DESDE backend.js)
  checkAuthenticationRequired() {
    console.log('[BibliaQuiz] 🔍 Verificando autenticación...');
    const token = localStorage.getItem('backend_token');
    const hasBackendAuth = BackendService && BackendService.token;
    
    console.log(`[BibliaQuiz] Token localStorage: ${token ? 'SÍ' : 'NO'}`);
    console.log(`[BibliaQuiz] BackendService.token: ${hasBackendAuth ? 'SÍ' : 'NO'}`);
    
    if (!token && !hasBackendAuth) {
      console.log('[BibliaQuiz] ⚠️ NO AUTENTICADO - Mostrando login obligatorio');
      
      // Ocultar todo excepto el login
      document.getElementById('home-screen')?.classList.add('hidden');
      document.getElementById('main-container')?.classList.add('hidden');
      
      // Mostrar pantalla de login
      this.showScreen('login');
      this.showAuthModalForcedLogin();
      
      return false;
    }
    
    console.log('[BibliaQuiz] ✅ Usuario autenticado verificado');
    return true;
  },
  
  // 🆕 Mostrar modal de login obligatorio
  showAuthModalForcedLogin() {
    const modalEl = document.getElementById('login-prompt-banner');
    if (modalEl) {
      console.log('[BibliaQuiz] 📱 Mostrando modal de login obligatorio');
      modalEl.classList.remove('hidden');
      modalEl.style.display = 'flex';
      const title = document.querySelector('#login-prompt-banner h2');
      if (title) {
        title.textContent = '🔐 Se requiere iniciar sesión';
      }
    } else {
      console.warn('[BibliaQuiz] ⚠️ Modal #login-prompt-banner no encontrado en DOM');
    }
  },

  // 🆕 Verificar si el usuario está autenticado
  isUserAuthenticated() {
    // Verificar token en BackendService
    if (BackendService && BackendService.token && BackendService.currentUser) {
      return true;
    }
    
    // Verificar token en localStorage como fallback
    const token = localStorage.getItem('backend_token');
    if (token) {
      return true;
    }
    
    return false;
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
      nextBtn.textContent = idx === slides.length - 1 ? 'Empezar!' : 'Siguiente ';
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
    const submitBtn    = document.getElementById('register-submit');
    const nameInput    = document.getElementById('register-name');
    const emailInput   = document.getElementById('register-email');
    const errorMsg     = document.getElementById('register-error');

    submitBtn.addEventListener('click', async () => {
      const name     = nameInput.value.trim();
      const email    = emailInput.value.trim();
      const password = passwordInput ? passwordInput.value.trim() : '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validar los 3 campos obligatorios
      if (!name) {
        errorMsg.textContent = 'Escribe tu nombre de jugador';
        errorMsg.classList.remove('hidden');
        nameInput.focus();
        return;
      }
      if (!email || !emailRegex.test(email)) {
        errorMsg.textContent = 'Escribe un correo electrónico válido';
        errorMsg.classList.remove('hidden');
        emailInput.focus();
        return;
      }
      if (!password || password.length < 6) {
        errorMsg.textContent = 'La contraseña debe tener al menos 6 caracteres';
        errorMsg.classList.remove('hidden');
        if (passwordInput) passwordInput.focus();
        return;
      }
      errorMsg.classList.add('hidden');

      // Deshabilitar botón mientras se registra
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creando cuenta...';

      // Registrar en MongoDB (BackendService)
      if (window.BackendService) {
        const result = await BackendService.register(email, password, name);
        if (!result.success) {
          errorMsg.textContent = result.error === 'El email ya está registrado'
            ? 'Ese correo ya tiene una cuenta. ¿Ya te registraste antes?'
            : (result.error || 'Error al crear cuenta. Intenta de nuevo.');
          errorMsg.classList.remove('hidden');
          submitBtn.disabled = false;
          submitBtn.textContent = '🚀 ¡Crear cuenta!';
          return;
        }
      }

      // Guardar datos locales
      const player = Storage.getPlayer();
      player.name  = name;
      player.email = email;
      player.registered = true;
      player.registeredAt = new Date().toISOString();
      Storage.savePlayer(player);

      // Cerrar overlay con animación y entrar
      overlay.style.animation = 'fadeOut 0.4s ease forwards';
      setTimeout(() => {
        overlay.classList.add('hidden');
        overlay.style.animation = '';
        this.showScreen('home');
        this.renderHome();
        this.loadSettings();
        this.initOnboarding();
        this.showToast(`¡Bienvenido, ${name}!`);
      }, 400);
    });

    // Enter key support
    [nameInput, emailInput, passwordInput].filter(Boolean).forEach(input => {
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
    document.getElementById('btn-achievements')?.addEventListener('click', () => {
      this.renderAchievements();
      this.showScreen('achievements');
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
    // Botón salir durante partida duo
    document.getElementById('btn-duo-exit')?.addEventListener('click', () => {
      this.stopDuoTimer();
      if (confirm('¿Seguro que quieres salir? Se perderá el progreso de la partida.')) {
        this.showScreen('home');
        this.renderHome();
      }
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
    // --- SPELLING MODE (DELETREAR) ---
    document.getElementById('btn-spelling')?.addEventListener('click', () => {
      this.startSpellingMode();
    });
    // Shop button
    document.getElementById('btn-shop').addEventListener('click', () => {
      this.renderShop();
      this.showScreen('shop');
    });
    // Ranked button
    document.getElementById('btn-ranked').addEventListener('click', () => {
      this.openRankedScreen();
    });
    // Cancel ranked search
    document.getElementById('btn-cancel-search')?.addEventListener('click', () => {
      if (window.Ranked) {
        window.Ranked.cancelSearch();
      }
    });
    // Ranked result buttons
    document.getElementById('btn-ranked-play-again')?.addEventListener('click', () => {
      document.getElementById('ranked-result-overlay').classList.add('hidden');
      this.openRankedScreen();
    });
    document.getElementById('btn-ranked-done')?.addEventListener('click', () => {
      document.getElementById('ranked-result-overlay').classList.add('hidden');
      this.showScreen('home');
    });
    // Ranked tabs
    document.getElementById('tab-ranked-play')?.addEventListener('click', () => {
      document.getElementById('tab-ranked-play').classList.add('active');
      document.getElementById('tab-ranked-leaderboard').classList.remove('active');
      document.getElementById('ranked-play-content').classList.remove('hidden');
      document.getElementById('ranked-leaderboard-content').classList.add('hidden');
    });
    document.getElementById('tab-ranked-leaderboard')?.addEventListener('click', () => {
      document.getElementById('tab-ranked-leaderboard').classList.add('active');
      document.getElementById('tab-ranked-play').classList.remove('active');
      document.getElementById('ranked-leaderboard-content').classList.remove('hidden');
      document.getElementById('ranked-play-content').classList.add('hidden');
      this.loadRankedLeaderboard();
    });
    // Leaderboard category change
    document.getElementById('leaderboard-category-select')?.addEventListener('change', () => {
      this.loadRankedLeaderboard();
    });
    // Ver todos los rangos
    document.getElementById('btn-view-ranks')?.addEventListener('click', () => {
      this.showRanksOverview();
    });
    document.getElementById('btn-close-ranks')?.addEventListener('click', () => {
      const overlay = document.getElementById('ranks-overview-overlay');
      overlay.classList.add('hidden');
      overlay.style.display = 'none';
    });
    // Cerrar overlay al hacer clic fuera
    document.getElementById('ranks-overview-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'ranks-overview-overlay') {
        const overlay = e.target;
        overlay.classList.add('hidden');
        overlay.style.display = 'none';
      }
    });
    // Shop buy buttons (delegaci�n de eventos para botones din�micos)
    const shopContainer = document.querySelector('.shop-container');
    if (shopContainer) {
      shopContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.shop-item-btn');
        if (btn) {
          const productId = btn.dataset.buy;
          this.handleShopBuy(productId);
        }
        // Botones de canje de monedas por vidas
        const redeemBtn = e.target.closest('.redeem-life-btn');
        if (redeemBtn) {
          const amount = parseInt(redeemBtn.dataset.redeem);
          this.redeemCoinsForLife(amount);
        }
        // Botones de compra de potenciadores
        const powerupBtn = e.target.closest('.powerup-buy-btn');
        if (powerupBtn) {
          const powerupId = powerupBtn.dataset.buyPowerup;
          this.buyPowerup(powerupId);
        }
      });
    }
    // Restaurar compras
    document.getElementById('btn-restore-purchases').addEventListener('click', () => {
      this.handleRestorePurchases();
    });
    // Gestionar suscripcin
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
    // Logout
    document.getElementById('btn-logout')?.addEventListener('click', () => {
      this.logout();
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
    // Sync progress button
    document.getElementById('btn-sync-progress')?.addEventListener('click', async () => {
      const btn = document.getElementById('btn-sync-progress');
      
      // Verificar si hay sesión activa
      if (!BackendService.isAuthenticated()) {
        this.showToast('⚠️ Debes iniciar sesión para sincronizar');
        return;
      }
      
      const originalText = btn.innerHTML;
      btn.innerHTML = '⏳ Sincronizando...';
      btn.disabled = true;
      try {
        const result = await BackendService.syncFullProgress();
        if (result) {
          this.showToast('✅ Progreso sincronizado correctamente');
        } else {
          this.showToast('⚠️ No se pudo sincronizar. Verifica tu conexión.');
        }
      } catch (error) {
        console.error('Error al sincronizar:', error);
        this.showToast('❌ Error al sincronizar. Inténtalo de nuevo.');
      } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
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
    // Character picker is built dynamically in loadSettingsUI → buildCharacterPicker()
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
        this.showToast(`? Recordatorio programado a las ${e.target.value}`);
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
    // --- CAMPAÑA BÍBLICA ---
    document.getElementById('btn-campaign')?.addEventListener('click', () => {
      if (window.CampaignManager) {
        CampaignManager.renderWorlds();
        const totalStarsEl = document.getElementById('campaign-total-stars');
        if (totalStarsEl) totalStarsEl.textContent = CampaignManager.getTotalStars();
      }
      this.showScreen('campaign');
    });
    // --- CRONOLOGÍA ---
    document.getElementById('btn-chronology')?.addEventListener('click', () => {
      if (window.ChronologyManager) {
        ChronologyManager.startGame();
      } else {
        this.showScreen('chronology');
      }
    });
    // --- CLANES ---
    document.getElementById('btn-clans')?.addEventListener('click', () => {
      this.showScreen('clans');
      if (window.ClanManager) {
        ClanManager.loadClan();
      }
    });
    // --- TORNEOS ---
    document.getElementById('btn-tournament')?.addEventListener('click', () => {
      this.showScreen('tournament');
      if (window.TournamentManager) {
        TournamentManager.loadTournament();
      }
    });
    // --- TEMPORADA ---
    document.getElementById('btn-season')?.addEventListener('click', () => {
      this.showScreen('season');
      this.renderSeasonScreen();
    });
    // Campaign chapters back button
    document.getElementById('campaign-chapters')?.querySelector('.back-btn')?.addEventListener('click', () => {
      this.showScreen('campaign');
      if (window.CampaignManager) CampaignManager.renderWorlds();
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
    // Show player greeting on home
    const player = Storage.getPlayer();
    const greeting = document.getElementById('user-greeting');
    if (greeting) {
      greeting.textContent = `¡Hola, ${player.name}! Nivel ${player.level}`;
    }
    // Update home lives card
    this.renderHomeLives();
    // Update coins display
    this.updateCoinsDisplay();
    // Always refresh daily cards on home
    this.renderDailyChallengeCard();
    this.renderDailyStreakCard(Storage.getDailyStreak());
  },
  showDailyVerse() {
    // Verificar que DAILY_VERSES exista y tenga contenido
    if (typeof DAILY_VERSES === 'undefined' || !DAILY_VERSES || DAILY_VERSES.length === 0) {
      console.warn('[App] DAILY_VERSES no está disponible, reintentando en 500ms...');
      setTimeout(() => this.showDailyVerse(), 500);
      return;
    }
    
    // Seleccionar versículo basado en el día del año para que cambie cada día
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const verseIndex = dayOfYear % DAILY_VERSES.length;
    
    const verse = DAILY_VERSES[verseIndex];
    
    // Validar que el versículo tenga la estructura correcta
    if (!verse || !verse.text || !verse.ref) {
      console.warn('[App] Versículo inválido en índice', verseIndex, verse);
      // Usar versículo de respaldo
      this.currentVerse = { 
        text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.", 
        ref: "Juan 3:16" 
      };
    } else {
      this.currentVerse = verse;
    }
    
    document.getElementById('verse-text').textContent = `"${this.currentVerse.text}"`;
    document.getElementById('verse-ref').textContent = ` ${this.currentVerse.ref}`;
    this.updateVerseFavoriteButton();
  },
  showNewVerse() {
    // Verificar que DAILY_VERSES exista
    if (typeof DAILY_VERSES === 'undefined' || !DAILY_VERSES || DAILY_VERSES.length === 0) {
      this.showToast('Cargando versículos...');
      return;
    }
    
    const verse = DAILY_VERSES[Math.floor(Math.random() * DAILY_VERSES.length)];
    
    // Validar estructura del versículo
    if (!verse || !verse.text || !verse.ref) {
      this.currentVerse = { 
        text: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.", 
        ref: "Juan 3:16" 
      };
    } else {
      this.currentVerse = verse;
    }
    
    document.getElementById('verse-text').textContent = `"${this.currentVerse.text}"`;
    document.getElementById('verse-ref').textContent = ` ${this.currentVerse.ref}`;
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
    btn.textContent = isFav ? '\u{2764}\u{FE0F}' : '\u{1F90D}';
    btn.classList.toggle('is-favorite', isFav);
  },
  toggleCurrentVerseFavorite() {
    if (!this.currentVerse) return;
    
    const isFav = Storage.isFavoriteVerse(this.currentVerse.text);
    if (isFav) {
      Storage.removeFavoriteVerse(this.currentVerse.text);
      this.showToast('\u{1F494} Versículo eliminado de favoritos');
    } else {
      Storage.addFavoriteVerse(this.currentVerse);
      this.showToast('\u{2764}\u{FE0F} Versículo guardado en favoritos');
    }
    this.updateVerseFavoriteButton();
  },
  // === PANTALLA VERS�CULOS ===
  versesFilter: 'all',
  _getDayVerse() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    return { verse: DAILY_VERSES[dayOfYear % DAILY_VERSES.length], now };
  },
  renderVerses() {
    const container = document.getElementById('verses-list');
    if (!container) return;

    if (typeof DAILY_VERSES !== 'undefined' && DAILY_VERSES.length > 0) {
      const { verse: todayVerse, now } = this._getDayVerse();
      const dailyText = document.getElementById('verses-daily-text');
      const dailyRef = document.getElementById('verses-daily-ref');
      const dailyDate = document.getElementById('verses-daily-date');
      if (dailyText && todayVerse) {
        dailyText.textContent = `"${todayVerse.text}"`;
        dailyRef.textContent = todayVerse.ref;
        if (dailyDate) {
          dailyDate.textContent = now.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
        }
        const favBtn = document.getElementById('btn-verses-daily-fav');
        if (favBtn) {
          const updateFavBtn = () => {
            const isFav = Storage.isFavoriteVerse(todayVerse.text);
            favBtn.textContent = isFav ? '\u{2764}\u{FE0F}' : '\u{1F90D}';
            favBtn.classList.toggle('active', isFav);
          };
          updateFavBtn();
          favBtn.onclick = () => {
            if (Storage.isFavoriteVerse(todayVerse.text)) {
              Storage.removeFavoriteVerse(todayVerse.text);
              this.showToast('\u{1F494} Eliminado de favoritos');
            } else {
              Storage.addFavoriteVerse(todayVerse);
              this.showToast('\u{2764}\u{FE0F} Agregado a favoritos');
            }
            updateFavBtn();
          };
        }
        const shareBtn = document.getElementById('btn-verses-daily-share');
        if (shareBtn) {
          shareBtn.onclick = () => {
            const shareText = `"${todayVerse.text}" — ${todayVerse.ref}\n\n📖 BibliaQuiz`;
            if (navigator.share) {
              navigator.share({ text: shareText });
            } else {
              navigator.clipboard?.writeText(shareText).then(() => this.showToast('\u{1F4CB} Copiado al portapapeles'));
            }
          };
        }
      }
    }

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
            ${verse.isFavorite ? '\u{2764}\u{FE0F}' : '\u{1F90D}'}
          </button>
          ${verse.isFavorite ? `
            <button class="verse-item-btn ${verse.memorized ? 'active' : ''}" data-action="memorize" data-text="${escapeHTML(verse.text)}" aria-label="${verse.memorized ? 'Desmarcar memorizado' : 'Marcar como memorizado'}">
              ${verse.memorized ? '\u{2705}' : '\u{1F7E6}'}
            </button>
          ` : ''}
          <button class="verse-item-btn" data-action="share" data-text="${escapeHTML(verse.text)}" data-ref="${escapeHTML(verse.ref)}" aria-label="Compartir versículo">
            \u{1F4E4}
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
            this.showToast('\u{1F494} Eliminado de favoritos');
          } else {
            Storage.addFavoriteVerse({ text, ref });
            this.showToast('\u{2764}\u{FE0F} Agregado a favoritos');
          }
          this.renderVersesList();
        } else if (action === 'memorize') {
          const isNowMemorized = Storage.toggleMemorizedVerse(text);
          this.showToast(isNowMemorized ? '\u{2705} Marcado como memorizado' : '\u{1F7E6} Desmarcado');
          this.renderVersesList();
        } else if (action === 'share') {
          this.shareVerse(text, ref);
        }
      };
    });
  },
  shareVerse(text, ref) {
    const shareText = `"${text}" - ${ref}\n\n\u{271D}\u{FE0F} BibliaQuiz App`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Versculo Biblico',
        text: shareText
      }).catch(() => {});
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(shareText).then(() => {
        this.showToast('Versiculo copiado al portapapeles');
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
        <div class="cat-icon">${cat.svg || cat.icon}</div>
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
    // 🔐 VERIFICACIÓN DE AUTENTICACIÓN OBLIGATORIA
    if (!this.isUserAuthenticated()) {
      console.log('[BibliaQuiz] ❌ Acceso denegado - Usuario no autenticado');
      this.showToast('🔒 Debes iniciar sesión para jugar');
      this.showScreen('login');
      setTimeout(() => {
        const modal = document.getElementById('login-prompt-banner');
        if (modal) modal.classList.remove('hidden');
      }, 300);
      return;
    }
    
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
    // Deduplicar pool por texto normalizado (elimina preguntas equivalentes con distinto ID)
    const _seenTexts = new Set();
    pool = pool.filter(q => {
      const t = this._normalizeQ(q.question);
      if (_seenTexts.has(t)) return false;
      _seenTexts.add(t);
      return true;
    });
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
    // Inicializar monedas de sesi�n
    this.sessionCoins = 0;
    const coinsData = Storage.getCoins();
    this.coinMultiplier = coinsData.multiplier || 1;
    this.phaseHadError = false;
    this.timerMax = settings.timerSeconds || 0;
    this.currentPhase = 1;
    this.phaseCorrect = 0;
    this.phaseWrong = 0;
    this.allUsedQuestionIds = this.currentQuestions.map(q => q.id);
    this.allUsedQuestionTexts = this.currentQuestions.map(q => this._normalizeQ(q.question));
    this.initialDifficulty = this.selectedDifficulty;
    this.activeDifficulty = this.selectedDifficulty;
    this.categoryExhausted = false;
    this.diffCompletedInSession = [];
    // Reset contador de comodines (max 1 por partida)
    this.sessionPowerupsUsed = 0;
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
    window.logGA?.('game_start', { category: this.selectedCategory, difficulty: this.selectedDifficulty });
    // Ocultar overlays
    document.getElementById('phase-overlay').classList.add('hidden');
    document.getElementById('gameover-overlay').classList.add('hidden');
    document.getElementById('ad-overlay').classList.add('hidden');
    document.getElementById('catcomplete-overlay').classList.add('hidden');
    this.cleanOverlayTraps();
    this.showScreen('quiz');
    // Sonido de inicio de partida
    this.playSound('gameStart');
    this.renderLives();
    this.renderQuestion();
  },
  
  // Iniciar modo reto social (contra amigo)
  startChallengeMode(challengeData) {
    console.log('[App] ========== INICIANDO RETO SOCIAL ==========');
    console.log('[App] challengeData:', challengeData);
    
    if (!challengeData) {
      console.error('[App] ERROR: challengeData es null/undefined');
      return;
    }
    
    this.isSocialChallenge = true;
    this.socialChallengeData = challengeData;
    this.socialChallengeStartTime = Date.now();
    
    // Configurar categor�a del reto
    const category = challengeData.category === 'random' ? 'aleatorio' : challengeData.category;
    this.selectedCategory = category;
    console.log('[App] Categor�a:', category);
    
    // Configurar dificultad del reto
    const difficulty = challengeData.difficulty === 'random' ? null : challengeData.difficulty;
    this.selectedDifficulty = difficulty || 'intermedio';
    
    // ============================================
    // USAR LAS MISMAS PREGUNTAS PARA AMBOS JUGADORES
    // ============================================
    const numQuestions = challengeData.questionsCount || 10;
    
    // Si el reto tiene questionIds, usar exactamente esas preguntas
    if (challengeData.questionIds && challengeData.questionIds.length > 0) {
      console.log('[App] Usando preguntas del reto:', challengeData.questionIds);
      console.log('[App] Total preguntas en DB:', window.QUESTIONS_DB ? window.QUESTIONS_DB.length : 0);

      // Buscar las preguntas por ID en el orden correcto
      this.currentQuestions = [];
      for (const qId of challengeData.questionIds) {
        // Convertir a número si viene como string
        const numId = typeof qId === 'string' ? parseInt(qId, 10) : qId;
        const question = window.QUESTIONS_DB.find(q => q.id === numId);
        console.log('[App] Buscando ID:', qId, '(numId:', numId, ') encontrada:', !!question);
        if (question) {
          this.currentQuestions.push(question);
        }
      }

      // Si faltan preguntas (por si acaso), completar con aleatorias
      if (this.currentQuestions.length < numQuestions) {
        console.warn('[BibliaQuiz] Faltan preguntas, completando...');
        const existingIds = this.currentQuestions.map(q => q.id);
        const extraQuestions = window.QUESTIONS_DB
          .filter(q => !existingIds.includes(q.id))
          .sort(() => Math.random() - 0.5)
          .slice(0, numQuestions - this.currentQuestions.length);
        this.currentQuestions = this.currentQuestions.concat(extraQuestions);
      }
    } else {
      // Fallback: generar preguntas aleatorias (para retos antiguos sin questionIds)
      console.log('[BibliaQuiz] Reto sin questionIds, generando aleatorias');

      // Filtrar preguntas por categora
      let pool = [...window.QUESTIONS_DB];
      if (category !== 'aleatorio') {
        pool = pool.filter(q => q.category === category);
      }
      
      // Filtrar por dificultad si no es random
      if (difficulty && difficulty !== 'random') {
        pool = pool.filter(q => q.difficulty === difficulty);
      }
      
      // Si no hay suficientes preguntas, usar todas las disponibles
      if (pool.length < numQuestions) {
        pool = [...window.QUESTIONS_DB];
        if (category !== 'aleatorio') {
          pool = pool.filter(q => q.category === category);
        }
      }
      
      // Mezclar y tomar las preguntas del reto
      pool = this.shuffle(pool);
      this.currentQuestions = pool.slice(0, numQuestions);
    }
    
    console.log('[App] Preguntas cargadas:', this.currentQuestions.length);
    console.log('[App] Primera pregunta:', this.currentQuestions[0] ? this.currentQuestions[0].question : 'NO HAY');
    
    // Si no hay preguntas, error
    if (this.currentQuestions.length === 0) {
      console.error('[App] ERROR: No se cargaron preguntas!');
      alert('Error: No se pudieron cargar las preguntas del reto');
      return;
    }
    
    // Reset estado
    this.currentQuestionIndex = 0;
    this.currentStreak = 0;
    this.sessionBestStreak = 0;
    this.sessionCorrect = 0;
    this.sessionWrong = 0;
    this.sessionPoints = 0;
    this.sessionCoins = 0;
    this.coinMultiplier = 1;
    this.phaseHadError = false;
    this.currentPhase = 1;
    this.phaseCorrect = 0;
    this.phaseWrong = 0;
    this.answered = false;
    this.sessionPowerupsUsed = 0;
    
    // Configurar timer
    const settings = Storage.getSettings();
    this.timerMax = settings.timerSeconds || 30;
    
    // No usar vidas en modo reto
    this.infiniteLives = true;
    
    // Mostrar pantalla de quiz
    document.getElementById('phase-overlay').classList.add('hidden');
    document.getElementById('gameover-overlay').classList.add('hidden');
    document.getElementById('ad-overlay').classList.add('hidden');
    this.showScreen('quiz');
    this.renderQuestion();
    
    // Mostrar indicador de reto con info
    const categoryNames = {
      'aleatorio': 'Aleatorio',
      'antiguo-testamento': 'AT',
      'nuevo-testamento': 'NT',
      'personajes': 'Personajes',
      'lugares': 'Lugares',
      'milagros': 'Milagros',
      'parabolas': 'Parabolas',
      'profetas': 'Profetas',
      'reyes': 'Reyes',
      'salmos-proverbios': 'Salmos'
    };
    const difficultyNames = {
      'facil': '[F]',
      'intermedio': '[M]',
      'dificil': '[D]',
      'experto': '[E]'
    };
    const catName = categoryNames[category] || category;
    const diffIcon = difficultyNames[difficulty] || '';
    this.showToast(`Reto: ${numQuestions}P - ${catName} ${diffIcon}`, 'info');
  },
  
  // ============================================
  // MOSTRAR RESULTADOS DEL RETO SOCIAL
  // ============================================
  async showChallengeResults() {
    console.log('[App] Mostrando resultados del reto social');
    
    const timeSpent = Math.floor((Date.now() - this.socialChallengeStartTime) / 1000);
    const score = this.sessionPoints;
    const correctAnswers = this.sessionCorrect;
    const challengeId = this.socialChallengeData.id;
    
    // Mostrar el overlay de resultados
    const overlay = document.getElementById('challenge-result-overlay');
    overlay.classList.remove('hidden');
    
    // Mostrar mis resultados
    document.getElementById('my-challenge-score').textContent = score;
    document.getElementById('my-challenge-correct').textContent = `${correctAnswers} correctas`;
    document.getElementById('my-challenge-time').textContent = `${timeSpent}s`;
    
    // Nombre del oponente (creatorId es Firebase UID, usar Firebase para comparar)
    const myUid = window.FirebaseService?.currentUser?.uid || BackendService.currentUser?.uid || BackendService.currentUser?.id;
    const isCreator = this.socialChallengeData.creatorId === myUid;
    const opponentName = isCreator ? this.socialChallengeData.opponentName : this.socialChallengeData.creatorName;
    document.getElementById('opponent-name').textContent = opponentName || 'Oponente';
    
    // Mostrar estado de espera
    document.getElementById('opponent-score-value').textContent = '--';
    document.getElementById('opponent-waiting').classList.remove('hidden');
    document.getElementById('opponent-challenge-correct').textContent = '--';
    document.getElementById('opponent-challenge-time').textContent = '--';
    document.getElementById('challenge-status-message').classList.remove('hidden');
    document.getElementById('challenge-status-message').classList.remove('completed');
    document.getElementById('challenge-result-title').textContent = 'Reto Completado';
    document.getElementById('challenge-result-subtitle').textContent = 'Esperando al oponente...';
    document.getElementById('challenge-result-icon').innerHTML = '<span style="font-size:48px">&#9876;</span>';
    
    // Enviar resultado a Firebase (los retos viven en Firestore)
    try {
      if (!window.FirebaseService) throw new Error('Firebase no disponible');
      const result = await window.FirebaseService.submitChallengeResult(challengeId, score, timeSpent, correctAnswers);
      console.log('[App] Resultado enviado:', result);

      if (result.success && result.completed) {
        // Ambos terminaron - mostrar comparación inmediatamente
        this.showChallengeComparison(result, score, timeSpent, correctAnswers, result.opponentCorrect);
      } else {
        // Esperando al oponente - escuchar en tiempo real con Firestore
        this.listenForOpponentResult(challengeId, score, timeSpent, correctAnswers);
      }
    } catch (error) {
      console.error('[App] Error enviando resultado:', error);
      document.getElementById('challenge-status-message').innerHTML =
        '<span style="color: var(--danger)">Error al enviar resultado</span>';
    }
    
    // Limpiar estado del reto
    this.isSocialChallenge = false;
    this.socialChallengeData = null;
    this.socialChallengeStartTime = null;
    this.infiniteLives = false;
    
    // Event listener para el bot�n de salir
    const btnDone = document.getElementById('btn-challenge-done');
    btnDone.onclick = () => {
      overlay.classList.add('hidden');
      if (this._challengeUnsubscribe) {
        this._challengeUnsubscribe();
        this._challengeUnsubscribe = null;
      }
      this.showScreen('home');
    };
  },
  
  // Escuchar cuando el oponente termine (listener en tiempo real de Firestore)
  listenForOpponentResult(challengeId, myScore, myTime, myCorrect) {
    // Cancelar listener anterior si existe
    if (this._challengeUnsubscribe) {
      this._challengeUnsubscribe();
      this._challengeUnsubscribe = null;
    }
    // Cancelar cualquier polling viejo
    if (this._challengePollingInterval) {
      clearInterval(this._challengePollingInterval);
      this._challengePollingInterval = null;
    }

    const myUid = window.FirebaseService?.currentUser?.uid;

    // Listener en tiempo real — Firestore notifica en cuanto el oponente termina
    if (!window.FirebaseService) return;
    const unsubscribe = window.FirebaseService.subscribeToChallenge(challengeId, (challenge) => {
      if (challenge.status !== 'completed') return;

      unsubscribe();
      this._challengeUnsubscribe = null;

      const iAmCreator = challenge.creatorId === myUid;
      const opponentScore   = iAmCreator ? challenge.opponentScore   : challenge.creatorScore;
      const opponentTime    = iAmCreator ? challenge.opponentTime    : challenge.creatorTime;
      const opponentCorrect = iAmCreator ? challenge.opponentCorrect : challenge.creatorCorrect;

      const result = {
        completed: true,
        winner: challenge.winner,
        myScore,
        opponentScore,
        myTime,
        opponentTime
      };

      this.showChallengeComparison(result, myScore, myTime, myCorrect, opponentCorrect);
    });

    this._challengeUnsubscribe = unsubscribe;
  },
  
  // Mostrar comparaci�n de resultados
  showChallengeComparison(result, myScore, myTime, myCorrect, opponentCorrect) {
    console.log('[App] Mostrando comparaci�n:', result);
    
    // Ocultar estado de espera
    document.getElementById('opponent-waiting').classList.add('hidden');
    document.getElementById('challenge-status-message').classList.add('hidden');
    
    // Mostrar resultados del oponente
    document.getElementById('opponent-score-value').textContent = result.opponentScore;
    document.getElementById('opponent-challenge-correct').textContent = `${opponentCorrect ?? '--'} correctas`;
    document.getElementById('opponent-challenge-time').textContent = `${result.opponentTime ?? '--'}s`;
    
    // Determinar ganador y aplicar estilos
    const myCard = document.querySelector('.challenge-player.me');
    const opponentCard = document.querySelector('.challenge-player.opponent');
    
    myCard.classList.remove('winner', 'loser');
    opponentCard.classList.remove('winner', 'loser');
    
    const myUid = window.FirebaseService?.currentUser?.uid || BackendService.currentUser?.uid || BackendService.currentUser?.id;
    const iWon = result.winner === myUid;
    const isTie = result.winner === 'tie';
    
    if (isTie) {
      document.getElementById('challenge-result-icon').innerHTML = '<span style="font-size:48px;color:#ffd700">&#9876;</span>';
      document.getElementById('challenge-result-title').textContent = 'Empate';
      document.getElementById('challenge-result-subtitle').textContent = 'Ambos jugaron igual de bien';
      document.getElementById('challenge-vs-text').textContent = '=';
    } else if (iWon) {
      document.getElementById('challenge-result-icon').innerHTML = '<span style="font-size:48px;color:#ffd700">&#9733;</span>';
      document.getElementById('challenge-result-title').textContent = 'Ganaste!';
      document.getElementById('challenge-result-subtitle').textContent = 'Felicitaciones!';
      myCard.classList.add('winner');
      opponentCard.classList.add('loser');
    } else {
      document.getElementById('challenge-result-icon').innerHTML = '<span style="font-size:48px;color:#888">&#9734;</span>';
      document.getElementById('challenge-result-title').textContent = 'Perdiste';
      document.getElementById('challenge-result-subtitle').textContent = 'Intentalo de nuevo!';
      myCard.classList.add('loser');
      opponentCard.classList.add('winner');
    }
    
    // Sonido
    this.playSound(iWon || isTie ? 'phase' : 'wrong');
  },

  // Finalizar reto social
  async finishSocialChallenge() {
    if (!this.isSocialChallenge || !this.socialChallengeData) return;
    
    const timeSpent = Math.floor((Date.now() - this.socialChallengeStartTime) / 1000);
    const score = this.sessionPoints; // Usar puntos totales, no solo correctas
    const correctAnswers = this.sessionCorrect;
    
    // Guardar referencia al reto antes de limpiarlo
    const challengeData = { ...this.socialChallengeData };
    
    // Limpiar estado de reto
    this.isSocialChallenge = false;
    this.socialChallengeData = null;
    this.socialChallengeStartTime = null;
    this.infiniteLives = false;
    
    // Enviar resultado al backend
    if (window.Social) {
      // Guardar el reto actual en Social para mostrar resultados
      Social.currentChallenge = challengeData;
      await Social.finishChallenge(score, timeSpent, correctAnswers);
    }
  },

  // ============================================
  // SISTEMA RANKED
  // ============================================

  // Abrir pantalla de ranked
  async openRankedScreen() {
    document.getElementById('ranked-opponent-bar')?.classList.add('hidden');
    await this.loadRankedData();
    this.showScreen('ranked');
  },

  // Cargar datos de ranked
  async loadRankedData() {
    if (!window.Ranked) return;
    
    // Cargar mis rankings de todas las categor�as
    const myRankings = await window.Ranked.getMyRankings();
    this.cachedRankings = myRankings; // Guardar para uso en showRanksOverview
    
    // Obtener el ranking m�s alto para mostrar en el header
    let totalTrophies = 0;
    let highestRank = window.RANKS[0];
    
    for (const cat of window.RANKED_CATEGORIES) {
      const ranking = myRankings[cat.id] || { trophies: 0 };
      totalTrophies += ranking.trophies;
      const rank = window.Ranked.getRankByTrophies(ranking.trophies);
      if (rank.minTrophies > highestRank.minTrophies) {
        highestRank = rank;
      }
    }
    
    // Actualizar header con el total de trofeos y el rango correspondiente
    const displayRank = window.Ranked.getRankByTrophies(totalTrophies);
    const nextRank = window.RANKS.find(r => r.minTrophies > totalTrophies) || displayRank;
    
    document.getElementById('ranked-my-rank-icon').textContent = displayRank.icon;
    document.getElementById('ranked-my-rank-name').textContent = displayRank.name;
    document.getElementById('ranked-my-rank-name').style.color = displayRank.color;
    document.getElementById('ranked-my-trophies').textContent = totalTrophies;
    
    // Actualizar info del siguiente rango
    document.getElementById('ranked-next-rank-name').textContent = nextRank.name;
    document.getElementById('ranked-next-trophies').textContent = `(${nextRank.minTrophies} trofeos)`;
    
    const progress = window.Ranked.getRankProgress(totalTrophies);
    document.getElementById('ranked-my-progress-bar').style.width = progress + '%';
    
    // Texto de progreso
    const progressText = document.getElementById('ranked-progress-text');
    if (progressText) {
      progressText.textContent = `${totalTrophies} / ${displayRank.maxTrophies === Infinity ? '8' : displayRank.maxTrophies}`;
    }
    
    // Renderizar grid de categor�as
    this.renderRankedCategories(myRankings);
  },

  // Renderizar categoras de ranked
  renderRankedCategories(myRankings) {
    const grid = document.getElementById('ranked-categories-grid');
    if (!grid || !window.RANKED_CATEGORIES) return;
    
    grid.innerHTML = window.RANKED_CATEGORIES.map(cat => {
      const ranking = myRankings[cat.id] || { trophies: 0 };
      const t = ranking.trophies;
      const rank = window.Ranked.getRankByTrophies(t);
      const pct = rank.maxTrophies === Infinity ? 100
        : Math.round(((t - rank.minTrophies) / (rank.maxTrophies - rank.minTrophies)) * 100);
      const toNext = rank.maxTrophies === Infinity ? '' : `${rank.maxTrophies - t} para subir`;
      return `
        <div class="ranked-category-card" data-category="${cat.id}">
          <span class="ranked-category-icon">${cat.icon}</span>
          <span class="ranked-category-name">${cat.name}</span>
          <div class="ranked-category-trophies">🏆 <strong>${t}</strong></div>
          <div class="ranked-cat-bar-wrap">
            <div class="ranked-cat-bar-fill" style="width:${pct}%;background:${rank.color}"></div>
          </div>
          <span class="ranked-category-rank" style="color:${rank.color}">${rank.icon} ${rank.name}</span>
          ${toNext ? `<span class="ranked-cat-to-next">${toNext}</span>` : ''}
        </div>
      `;
    }).join('');
    
    // Event listeners para cada categor�a
    grid.querySelectorAll('.ranked-category-card').forEach(card => {
      card.addEventListener('click', () => {
        const category = card.dataset.category;
        this.startRankedSearch(category);
      });
    });
  },

  // Iniciar búsqueda de partida ranked (bots cuando no hay servidor)
  async startRankedSearch(category) {
    if (!window.Ranked) {
      this.showToast('Sistema ranked no disponible', 'error');
      return;
    }
    await window.Ranked.searchMatchWithBot(category);
  },

  // Mostrar overlay de todos los rangos
  showRanksOverview() {
    const overlay = document.getElementById('ranks-overview-overlay');
    if (!overlay || !window.RANKS) return;
    
    // Obtener trofeos actuales
    const myRankings = this.cachedRankings || {};
    let totalTrophies = 0;
    for (const cat of (window.RANKED_CATEGORIES || [])) {
      const ranking = myRankings[cat.id] || { trophies: 0 };
      totalTrophies += ranking.trophies;
    }
    
    const currentRank = window.Ranked.getRankByTrophies(totalTrophies);
    
    // Actualizar encabezado del overlay
    document.getElementById('overview-current-icon').textContent = currentRank.icon;
    document.getElementById('overview-current-name').textContent = currentRank.name;
    document.getElementById('overview-current-name').style.color = currentRank.color;
    document.getElementById('overview-current-trophies').textContent = 
      `${totalTrophies} / ${currentRank.maxTrophies === Infinity ? '8' : currentRank.maxTrophies} trofeos`;
    
    // Renderizar lista de rangos
    const ranksList = document.getElementById('ranks-list');
    ranksList.innerHTML = window.RANKS.map(rank => {
      const isCurrent = rank.id === currentRank.id;
      const isAchieved = totalTrophies >= rank.minTrophies;
      
      return `
        <div class="rank-item ${isCurrent ? 'current' : ''} ${isAchieved ? 'achieved' : 'locked'}">
          <span class="rank-icon">${rank.icon}</span>
          <div class="rank-info">
            <span class="rank-name" style="color: ${rank.color}">${rank.name}</span>
            <span class="rank-trophies">${rank.minTrophies}${rank.maxTrophies === Infinity ? '+' : ' - ' + rank.maxTrophies} T</span>
          </div>
          ${isCurrent ? '<span class="rank-current-badge">? Actual</span>' : ''}
        </div>
      `;
    }).join('');
    
    overlay.style.display = 'flex';
    overlay.classList.remove('hidden');
  },

  // Iniciar modo ranked (llamado por Ranked.js)
  startRankedMode(matchData) {
    console.log('[App] Iniciando partida ranked:', matchData);

    this.isRankedMatch = true;
    this.rankedMatchData = matchData;
    this.rankedMatchStartTime = Date.now();
    this.rankedPowerupsUsed = 0;
    this.sessionPowerupsUsed = 0;
    this.selectedCategory = matchData.category;

    // Aceptar preguntas como objetos directos (nuevo flujo socket)
    // o como array de IDs (flujo legacy)
    if (matchData.questions && matchData.questions.length > 0 && typeof matchData.questions[0] === 'object') {
      this.currentQuestions = matchData.questions;
    } else {
      // Flujo legacy: buscar por IDs
      const ids = matchData.questions || matchData.questionIds || [];
      this.currentQuestions = [];
      for (const qId of ids) {
        const numId = typeof qId === 'string' ? parseInt(qId, 10) : qId;
        const question = window.QUESTIONS_DB?.find(q => q.id === numId);
        if (question) this.currentQuestions.push(question);
      }
    }

    console.log('[App] Preguntas ranked cargadas:', this.currentQuestions.length);

    if (this.currentQuestions.length === 0) {
      this.showToast('Error cargando preguntas de la partida', 'error');
      return;
    }

    // Reset estado
    this.currentQuestionIndex = 0;
    this.currentStreak = 0;
    this.sessionBestStreak = 0;
    this.sessionCorrect = 0;
    this.sessionWrong = 0;
    this.sessionPoints = 0;
    this.sessionCoins = 0;
    this.coinMultiplier = 1;
    this.phaseHadError = false;
    this.currentPhase = 1;
    this.phaseCorrect = 0;
    this.phaseWrong = 0;
    this.answered = false;
    this.infiniteLives = true;

    // Timer ranked (configurable, por defecto 13s)
    this.timerMax = window.RANKED_CONFIG?.questionTime || 13;

    // Mostrar y configurar barra del oponente
    const oppBar = document.getElementById('ranked-opponent-bar');
    if (oppBar) {
      oppBar.classList.remove('hidden');
      const nameEl = document.getElementById('ranked-opp-name-bar');
      if (nameEl) nameEl.textContent = matchData.opponent?.userName || 'Oponente';
      const scoreBarEl = document.getElementById('ranked-opp-score-bar');
      if (scoreBarEl) scoreBarEl.textContent = '0 pts';
      // Crear indicadores por pregunta
      const indContainer = document.getElementById('ranked-opp-indicators');
      if (indContainer) {
        indContainer.innerHTML = '';
        for (let i = 0; i < this.currentQuestions.length; i++) {
          const dot = document.createElement('span');
          dot.id = `ranked-opp-q${i}`;
          dot.className = 'ranked-opp-dot';
          dot.textContent = '·';
          indContainer.appendChild(dot);
        }
      }
    }
    if (window.Ranked) window.Ranked._opponentCorrect = 0;

    // Mostrar pantalla de quiz
    document.getElementById('phase-overlay')?.classList.add('hidden');
    document.getElementById('gameover-overlay')?.classList.add('hidden');
    document.getElementById('ad-overlay')?.classList.add('hidden');
    this.showScreen('quiz');
    this.renderQuestion();

    this.showToast(`⚔️ Ranked vs ${matchData.opponent?.userName || 'Oponente'}`, 'info');
  },

  // Mostrar resultados de partida ranked (nuevo flujo con Socket.io)
  async showRankedResults() {
    console.log('[App] Mostrando resultados ranked');

    const timeSpent = Math.floor((Date.now() - this.rankedMatchStartTime) / 1000);
    const score = this.sessionPoints;
    const correctAnswers = this.sessionCorrect;
    const matchId = this.rankedMatchData?.id;
    const opponent = this.rankedMatchData?.opponent;

    // Torneo: acumular puntos de la partida ranked
    if (score > 0 && typeof TournamentManager !== 'undefined') {
      TournamentManager.submitScore(score);
    }

    // Mostrar overlay
    const overlay = document.getElementById('ranked-result-overlay');
    if (overlay) overlay.classList.remove('hidden');

    // Mostrar mis datos inmediatamente
    const myScoreEl = document.getElementById('ranked-my-score');
    if (myScoreEl) myScoreEl.textContent = score;
    const oppNameEl = document.getElementById('ranked-opponent-name');
    if (oppNameEl) oppNameEl.textContent = opponent?.userName || 'Oponente';
    const oppScoreEl = document.getElementById('ranked-opponent-score');
    if (oppScoreEl) oppScoreEl.textContent = '--';
    const statusEl = document.getElementById('ranked-status-message');
    if (statusEl) { statusEl.textContent = 'Esperando resultado del servidor...'; statusEl.classList.remove('hidden'); }
    const titleEl = document.getElementById('ranked-result-title');
    if (titleEl) titleEl.textContent = 'Partida Terminada!';
    const iconEl = document.getElementById('ranked-result-icon');
    if (iconEl) iconEl.textContent = '⏳';
    const trophyEl = document.getElementById('ranked-trophy-change');
    if (trophyEl) trophyEl.style.display = 'none';

    // Bot match: calcular resultado localmente sin socket
    const isBotMatch = this.rankedMatchData?.isBot || !!window.Ranked?._botMatchData;
    if (isBotMatch) {
      const category = this.rankedMatchData?.category || this._rankedCategory || 'aleatorio';
      this._rankedCategory = category;
      this.isRankedMatch = false;
      this.rankedMatchData = null;
      this.rankedMatchStartTime = null;
      this.infiniteLives = false;
      document.getElementById('ranked-opponent-bar')?.classList.add('hidden');
      console.log('[App] Bot match detectado, llamando finalizeBotMatch en 400ms. score:', score, 'category:', category);
      setTimeout(() => {
        if (window.Ranked) window.Ranked.finalizeBotMatch(score, category);
        else console.error('[App] window.Ranked no disponible para finalizeBotMatch');
      }, 400);
      return;
    }
    if (typeof SeasonSystem !== 'undefined') {
      SeasonSystem.updateMissionProgress('ranked', 1);
    }
    // Partida online: enviar resultado al servidor via socket
    window.Ranked.submitResult(matchId, score, timeSpent, correctAnswers);

    // Guardar categoría para showRankedResult
    this._rankedCategory = this.rankedMatchData?.category;

    // Ocultar barra del oponente
    document.getElementById('ranked-opponent-bar')?.classList.add('hidden');

    // Limpiar estado de partida
    this.isRankedMatch = false;
    this.rankedMatchData = null;
    this.rankedMatchStartTime = null;
    this.infiniteLives = false;

    // Botones (handlers están en init() via addEventListener)
  },

  // Llamado por socket 'game_over' — resultado calculado por el servidor
  showRankedResult(result) {
    console.log('[App] Resultado final del servidor:', result);
    const category = this._rankedCategory || 'aleatorio';

    // Actualizar score del oponente
    const oppScoreEl = document.getElementById('ranked-opponent-score');
    if (oppScoreEl) oppScoreEl.textContent = result.opponentScore ?? '--';

    // Ocultar "esperando..."
    const statusEl = document.getElementById('ranked-status-message');
    if (statusEl) statusEl.classList.add('hidden');

    // Mostrar resultado
    const iconEl  = document.getElementById('ranked-result-icon');
    const titleEl = document.getElementById('ranked-result-title');
    const subEl   = document.getElementById('ranked-result-subtitle');
    const myCard  = document.querySelector('#ranked-result-overlay .challenge-player.me');
    const oppCard = document.querySelector('#ranked-result-overlay .challenge-player.opponent');

    myCard?.classList.remove('winner', 'loser');
    oppCard?.classList.remove('winner', 'loser');

    if (result.isTie) {
      if (iconEl)  iconEl.textContent  = '=';
      if (titleEl) titleEl.textContent = '¡Empate!';
      if (subEl)   subEl.textContent   = 'Ambos jugaron igual de bien';
      myCard?.classList.add('winner');
      oppCard?.classList.add('winner');
    } else if (result.isWinner) {
      if (iconEl)  iconEl.textContent  = '🏆';
      if (titleEl) titleEl.textContent = '¡Victoria!';
      if (subEl)   subEl.textContent   = '¡Excelente desempeño!';
      myCard?.classList.add('winner');
      oppCard?.classList.add('loser');
    } else {
      if (iconEl)  iconEl.textContent  = '😔';
      if (titleEl) titleEl.textContent = 'Derrota';
      if (subEl)   subEl.textContent   = '¡Sigue intentando!';
      myCard?.classList.add('loser');
      oppCard?.classList.add('winner');
    }

    // Mostrar cambio de trofeos (datos directos del servidor, ya calculados)
    const trophyEl = document.getElementById('ranked-trophy-change');
    if (trophyEl) {
      trophyEl.style.display = 'flex';
      const oldTrophies = Math.max(0, result.newTrophies - result.trophyChange);
      const oldEl  = document.getElementById('ranked-trophy-old');
      const newEl  = document.getElementById('ranked-trophy-new');
      const diffEl = document.getElementById('ranked-trophy-diff');
      if (oldEl)  oldEl.textContent  = oldTrophies;
      if (newEl)  newEl.textContent  = result.newTrophies;
      if (diffEl) {
        const ch = result.trophyChange;
        diffEl.textContent = ch >= 0 ? `+${ch}` : `${ch}`;
        diffEl.className = 'trophy-diff ' + (ch > 0 ? 'positive' : ch < 0 ? 'negative' : 'neutral');
      }
    }

    // Sync trophies to localStorage and Firestore
    if (result.newTrophies !== undefined && window.Ranked) {
      window.Ranked.saveLocalTrophies(category, result.newTrophies);
      window.FirebaseService?.updateRankedTrophies?.(category, result.newTrophies);
    }

    // Misiones de temporada con resultado conocido (partida online)
    if (typeof SeasonSystem !== 'undefined') {
      if (result.isWinner) SeasonSystem.updateMissionProgress('ranked_wins', 1);
      if (result.newTrophies !== undefined) SeasonSystem.updateMissionProgress('trophies_max', result.newTrophies);
    }
    window.logGA?.('ranked_match', { result: result.isWinner ? 'win' : result.isTie ? 'tie' : 'loss', trophy_change: result.trophyChange });

    this.playSound(result.isWinner || result.isTie ? 'phase' : 'wrong');
  },

  // Oponente se desconectó durante la partida
  endRankedMatchByDisconnect() {
    if (!this.isRankedMatch) return;
    this.showRankedResults();
  },

  // Escuchar resultado del oponente en ranked (LEGACY - ya no se usa con sockets)
  listenForRankedOpponent(matchId, myScore, myTime, myCorrect, category) {
    if (this._rankedUnsubscribe) {
      this._rankedUnsubscribe();
    }

    this._rankedUnsubscribe = window.Ranked.subscribeToMatch
      ? window.Ranked.subscribeToMatch(matchId, async (match) => {
          console.log('[App] Actualizacion match ranked (legacy polling):', match);

          const iAmPlayer1 = match.player1Id === window.BackendService?.currentUser?.uid;
          const opponentScore = iAmPlayer1 ? match.player2Score : match.player1Score;

          if (opponentScore !== null && opponentScore !== undefined) {
            const result = {
              isTie: match.winner === 'tie',
              isWinner: match.winner === window.BackendService?.currentUser?.uid,
              myScore,
              opponentScore,
              trophyChange: 0,
              newTrophies: 0
            };
            this.showRankedResult(result);

            if (this._rankedUnsubscribe) {
              this._rankedUnsubscribe();
              this._rankedUnsubscribe = null;
            }
          }
        })
      : null;
  },

  // Mostrar comparacion de resultados ranked
  async showRankedComparison(result, category) {
    console.log('[App] Mostrando comparacion ranked:', result);
    
    // Ocultar estado de espera
    document.getElementById('ranked-status-message').classList.add('hidden');
    
    // Mostrar score del oponente
    document.getElementById('ranked-opponent-score').textContent = result.opponentScore;
    
    // Determinar ganador
    const iWon = result.winner === window.BackendService?.currentUser?.uid;
    const isTie = result.winner === 'tie';
    
    // Actualizar UI
    const myCard = document.querySelector('#ranked-result-overlay .challenge-player.me');
    const opponentCard = document.querySelector('#ranked-result-overlay .challenge-player.opponent');
    
    myCard?.classList.remove('winner', 'loser');
    opponentCard?.classList.remove('winner', 'loser');
    
    if (isTie) {
      document.getElementById('ranked-result-icon').textContent = '=';
      document.getElementById('ranked-result-title').textContent = 'Empate!';
      document.getElementById('ranked-result-subtitle').textContent = 'Ambos jugaron igual';
      myCard?.classList.add('winner');
      opponentCard?.classList.add('winner');
    } else if (iWon) {
      document.getElementById('ranked-result-icon').textContent = '*';
      document.getElementById('ranked-result-title').textContent = 'Victoria!';
      document.getElementById('ranked-result-subtitle').textContent = 'Excelente!';
      myCard?.classList.add('winner');
      opponentCard?.classList.add('loser');
    } else {
      document.getElementById('ranked-result-icon').textContent = 'X';
      document.getElementById('ranked-result-title').textContent = 'Derrota';
      document.getElementById('ranked-result-subtitle').textContent = 'Sigue intentando!';
      myCard?.classList.add('loser');
      opponentCard?.classList.add('winner');
    }
    
    // Mostrar cambio de trofeos
    const trophyChange = document.getElementById('ranked-trophy-change');
    trophyChange.style.display = 'flex';
    
    // Obtener ranking actual para mostrar el cambio
    const myRanking = await window.Ranked.getCategoryRanking(category);
    const oldTrophies = myRanking?.trophies || 0;
    
    let change = 0;
    if (iWon) change = window.RANKED_CONFIG.trophiesWin;
    else if (isTie) change = window.RANKED_CONFIG.trophiesTie;
    else change = -window.RANKED_CONFIG.trophiesLose;
    
    // Nota: los trofeos ya se actualizaron en submitResult, as� que mostramos los valores calculados
    const displayOld = Math.max(0, oldTrophies - change);
    
    document.getElementById('ranked-trophy-old').textContent = displayOld;
    document.getElementById('ranked-trophy-new').textContent = oldTrophies;
    
    const diffEl = document.getElementById('ranked-trophy-diff');
    diffEl.textContent = change >= 0 ? `+${change}` : change;
    diffEl.className = 'trophy-diff ' + (change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral');
    
    // Sonido
    this.playSound(iWon || isTie ? 'phase' : 'wrong');
  },

  // Cargar leaderboard
  async loadRankedLeaderboard() {
    if (!window.Ranked) return;
    
    const category = document.getElementById('leaderboard-category-select')?.value || 'personajes';
    const allCategories = ['personajes', 'lugares', 'eventos', 'profetas', 'reyes', 'milagros', 'parabolas', 'salmos-proverbios'];
    
    // Obtener trofeos del usuario (backend o local)
    let myTrophies = 0;
    if (window.BackendService?.token) {
      if (category === 'aleatorio') {
        const allRankings = await window.BackendService.getMyRankings();
        for (const cat of allCategories) myTrophies += allRankings[cat]?.trophies || 0;
      } else {
        const catRanking = await window.BackendService.getCategoryRanking(category);
        myTrophies = catRanking?.trophies || 0;
      }
    } else if (window.Ranked) {
      myTrophies = window.Ranked.getLocalTrophies(category);
    }
    
    // Mostrar el rango actual en el t�tulo
    const myRank = window.Ranked.getRankByTrophies(myTrophies);
    const rankTitleEl = document.getElementById('leaderboard-current-rank');
    if (rankTitleEl) {
      rankTitleEl.textContent = `${myRank.icon} ${myRank.name}`;
    }
    
    const leaderboard = await window.Ranked.getLeaderboard(category);
    
    const list = document.getElementById('ranked-leaderboard-list');
    if (!list) return;

    const medals = ['🥇', '🥈', '🥉'];
    list.innerHTML = leaderboard.map((player, index) => {
      const position = index + 1;
      const posClass = position === 1 ? 'gold' : position === 2 ? 'silver' : position === 3 ? 'bronze' : '';
      const isMe = player.userId === 'local' || player.name === '★ Tú';
      const rank = window.Ranked ? window.Ranked.getRankByTrophies(player.trophies) : { icon: '🥉', color: '#CD7F32' };
      const posLabel = medals[index] || `${position}`;
      const winRate = player.gamesPlayed > 0 ? Math.round((player.wins / player.gamesPlayed) * 100) : 0;
      return `
        <div class="leaderboard-item ${isMe ? 'me' : ''} ${posClass}">
          <span class="leaderboard-position">${posLabel}</span>
          <span class="leaderboard-name">${isMe ? `<strong>${player.name}</strong>` : player.name}</span>
          <div class="leaderboard-trophies">${ICON_SVG.trophy} ${player.trophies}</div>
          <span class="leaderboard-stats" style="color:${rank.color}">${rank.icon}</span>
        </div>
      `;
    }).join('');

    if (leaderboard.length === 0) {
      list.innerHTML = '<p style="text-align:center;color:var(--text-secondary);padding:20px">Juega partidas para ver la clasificación</p>';
    }
  },
  
  renderQuestion() {
    console.log('[App] renderQuestion - index:', this.currentQuestionIndex, 'total:', this.currentQuestions?.length);
    const q = this.currentQuestions[this.currentQuestionIndex];
    if (!q) {
      console.error('[App] ERROR: No hay pregunta en el �ndice', this.currentQuestionIndex);
      console.log('[App] currentQuestions:', this.currentQuestions);
      return;
    }
    console.log('[App] Mostrando pregunta:', q.question?.substring(0, 50) + '...');
    this.answered = false;
    // Scroll al tope para preguntas largas
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const total = this.currentQuestions.length;
    const current = this.currentQuestionIndex + 1;
    // Update top bar
    document.getElementById('question-counter').textContent = `${current}/${total}`;
    const ptsNum = document.getElementById('quiz-points-num');
    if (ptsNum) ptsNum.textContent = this.sessionPoints;
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
      const sNum = document.getElementById('quiz-streak-num');
      if (sNum) sNum.textContent = this.currentStreak;
      streakEl.classList.remove('hidden');
    } else {
      streakEl.classList.add('hidden');
    }
    // Progress bar
    const percent = ((current - 1) / total) * 100;
    document.getElementById('progress-fill').style.width = `${percent}%`;
    // Category tag and big icon
    const cat = CATEGORIES[q.category] || { icon: '', name: q.category, bigIcon: '📖', color: '#6C63FF' };
    document.getElementById('question-category-tag').innerHTML = `${cat.icon} ${cat.name}`;
    
    // Big category icon - ahora oculto porque usamos imágenes
    const bigIconEl = document.getElementById('category-big-icon');
    if (bigIconEl) {
      bigIconEl.classList.add('hidden');
    }
    
    // Question image - solo mostrar si hay imagen real
    const imgContainer = document.getElementById('question-image-container');
    if (imgContainer) {
      const imageUrl = q.image || null; // solo imágenes específicas, no decorativas por categoría
      if (imageUrl) {
        imgContainer.innerHTML = `
          <div class="image-placeholder" style="background: linear-gradient(135deg, ${cat.color}44, ${cat.color}22);">
            <span class="placeholder-icon">${cat.bigIcon || cat.icon}</span>
          </div>
        `;
        const img = document.createElement('img');
        img.className = 'question-image';
        img.src = imageUrl;
        img.alt = q.imageAlt || `Imagen de ${cat.name}`;
        img.onerror = () => { imgContainer.innerHTML = ''; imgContainer.classList.add('hidden'); };
        imgContainer.prepend(img);
        imgContainer.classList.remove('hidden');
      } else {
        imgContainer.innerHTML = '';
        imgContainer.classList.add('hidden');
      }
    }
    // Question text
    document.getElementById('question-text').textContent = q.question;
    // Options - Expanded to 6 options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    // Get expanded options (6 options with proper shuffling)
    const expandedData = this.expandOptionsTo6(q);
    const expandedOptions = expandedData.options;
    const correctIndex = expandedData.correctIndex;
    
    // Store corrected index for answer checking
    this.currentCorrectIndex = correctIndex;
    
    expandedOptions.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-label', `Opcion ${letters[i]}: ${opt}`);
      btn.innerHTML = `
        <span class="option-letter" aria-hidden="true">${letters[i]}</span>
        <span class="option-text">${escapeHTML(opt)}</span>
      `;
      btn.addEventListener('click', () => this.selectAnswer(i, btn, correctIndex));
      optionsContainer.appendChild(btn);
    });
    optionsContainer.setAttribute('role', 'listbox');
    optionsContainer.setAttribute('aria-label', 'Opciones de respuesta');
    optionsContainer.classList.add('six-options');
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
    
    // Aplicar tiempo extra si el potenciador est� activo (+10 segundos)
    let extraTime = 0;
    if (typeof SeasonSystem !== 'undefined' && SeasonSystem.hasExtraTimeActive()) {
      extraTime = 10;
    }
    const effectiveMax = this.timerMax + extraTime;
    
    this.timerSeconds = effectiveMax;
    timerEl.textContent = `T: ${this.timerSeconds}`;
    timerEl.className = 'quiz-timer';
    timerBar.style.width = '100%';
    timerBar.className = 'timer-bar-fill';
    this.timerInterval = setInterval(() => {
      this.timerSeconds--;
      const percent = (this.timerSeconds / effectiveMax) * 100;
      timerEl.textContent = `T: ${this.timerSeconds}`;
      timerBar.style.width = `${percent}%`;
      // Color changes
      if (this.timerSeconds <= effectiveMax * 0.25) {
        timerEl.className = 'quiz-timer danger';
        timerBar.className = 'timer-bar-fill danger';
      } else if (this.timerSeconds <= effectiveMax * 0.5) {
        timerEl.className = 'quiz-timer warning';
        timerBar.className = 'timer-bar-fill warning';
      }
      // Sonido de alerta cuando quedan 5 segundos o menos
      if (this.timerSeconds <= 5 && this.timerSeconds > 0 && !this.answered) {
        this.playSound('timerLow');
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
    timerEl.textContent = 'T: Tiempo!';
    timerEl.className = 'quiz-timer danger';
    // Show reference
    document.getElementById('ref-text').innerHTML = `<strong>T: Se acabo el tiempo!</strong>  ${q.reference}`;
    document.getElementById('reference-card').classList.remove('hidden');
    // Show next button
    const nextBtn = document.getElementById('next-btn');
    const isLast = this.currentQuestionIndex >= this.currentQuestions.length - 1;
    nextBtn.textContent = isLast ? 'Completar Fase ' : 'Siguiente ';
    nextBtn.classList.remove('hidden');
  },
  selectAnswer(index, btnEl, correctIndex) {
    if (this.answered) return;
    this.answered = true;
    this.stopTimer();
    // Track answer speed
    const answerTime = (performance.now() - this.questionStartTime) / 1000;
    this.recordAnswerSpeed(answerTime);
    const q = this.currentQuestions[this.currentQuestionIndex];
    // Use passed correctIndex if available (for expanded 6-option questions)
    const actualCorrect = correctIndex !== undefined ? correctIndex : q.correct;
    const isCorrect = index === actualCorrect;
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
      allBtns[actualCorrect].classList.add('correct');
      allBtns[actualCorrect].setAttribute('aria-label', allBtns[actualCorrect].getAttribute('aria-label') + '   Respuesta correcta');
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
    // Enviar respuesta en tiempo real al oponente (Socket.io)
    if (this.isRankedMatch && window.Ranked?.submitAnswer) {
      const timeMs = Math.round((performance.now() - this.questionStartTime));
      window.Ranked.submitAnswer(this.currentQuestionIndex, isCorrect, timeMs);
    }

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
    
    // === SISTEMA DE MONEDAS ===
    // Monedas base seg�n dificultad (reducido si multiplicador >= 3 para equilibrio)
    let baseCoins = { facil: 5, medio: 8, intermedio: 8, dificil: 12, experto: 20 }[this.activeDifficulty] || 5;
    // Reducir monedas base si el multiplicador es alto (equilibrio econ�mico)
    if (this.coinMultiplier >= 3) {
      baseCoins = Math.ceil(baseCoins * 0.6); // 40% menos monedas base con x3+
    }
    let coinsEarned = Math.floor(baseCoins * this.coinMultiplier);
    
    // Aplicar potenciador de monedas dobles
    if (typeof SeasonSystem !== 'undefined' && SeasonSystem.hasDoubleCoinsActive()) {
      coinsEarned *= 2;
    }
    
    this.sessionCoins += coinsEarned;
    const updatedCoins = Storage.addCoins(coinsEarned);
    // Sincronizar monedas con Backend
    if (window.BackendService?.currentUser) {
      window.BackendService?.syncCoinsToCloud(updatedCoins);
    }
    // Actualizar UI de monedas
    this.updateCoinsDisplay();
    
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
    // A�adir monedas al popup
    popupText += ` +${coinsEarned}c`;
    // Show point popup
    this.showPointPopup(popupText);
    // Update streak display
    const streakEl = document.getElementById('quiz-streak');
    if (this.currentStreak >= 3) {
      const sNum = document.getElementById('quiz-streak-num');
      if (sNum) sNum.textContent = this.currentStreak;
      streakEl.classList.remove('hidden');
    }
    const ptsNum2 = document.getElementById('quiz-points-num');
    if (ptsNum2) ptsNum2.textContent = this.sessionPoints;
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
    this.phaseHadError = true; // Marcar error en la fase para el multiplicador
    document.getElementById('quiz-streak').classList.add('hidden');
    // Quitar una vida (salvo si tiene vidas infinitas o escudo activo)
    const hasShield = typeof SeasonSystem !== 'undefined' && SeasonSystem.hasShieldActive();
    if (!this.infiniteLives && !hasShield) {
      this.lives--;
      if (this.lives < 0) this.lives = 0;
      this.saveLivesState();
      this.animateLifeLost();
    } else if (hasShield) {
      // Mostrar efecto visual de escudo protegiendo
      this.showShieldProtectionEffect();
    }
    this.renderLives();
    // Sound & Vibrate
    this.playSound('wrong');
    this.vibrate([100, 50, 100]);
    this.announce(`Incorrecto. ${this.infiniteLives ? 'Vidas infinitas activas.' : hasShield ? 'Escudo activo - vida protegida.' : `Te quedan ${this.lives} vida${this.lives !== 1 ? 's' : ''}.`}`);
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
    
    // === ACTUALIZAR MULTIPLICADOR DE MONEDAS ===
    const phasePerfect = !this.phaseHadError && this.phaseCorrect === this.currentQuestions.length;
    const newMultiplier = Storage.updateCoinMultiplier(phasePerfect);
    this.coinMultiplier = newMultiplier;
    
    // If daily challenge, save completion, give bonus and show different UI
    if (this.isDailyChallenge) {
      const today = new Date().toISOString().split('T')[0];
      Storage.saveDailyChallenge({
        date: today,
        completed: true,
        score: this.sessionPoints
      });
      // Bonus coins for daily challenge
      const dailyBonus = 50 + Math.floor(this.sessionPoints / 10);
      Storage.addCoins(dailyBonus);
      this.isDailyChallenge = false;
      this.renderDailyChallengeCard();
      setTimeout(() => {
        this.showToast(`🎯 ¡Desafío del día completado! +${dailyBonus} monedas bonus`, 'success');
      }, 800);
    }
    
    // ============================================
    // CAMPAÑA - Ir directo al resultado de capítulo
    // ============================================
    if (this.campaignMode) {
      Storage.addXP(this.sessionPoints);
      ['phase-overlay','gameover-overlay','ad-overlay','catcomplete-overlay'].forEach(id => {
        document.getElementById(id)?.classList.add('hidden');
      });
      CampaignManager.saveChapterResult(
        this.campaignMode.chapterId,
        this.sessionCorrect,
        this.currentQuestions.length,
        this.sessionPoints
      );
      this.campaignMode = null;
      return;
    }

    // ============================================
    // RETO SOCIAL - Mostrar pantalla de resultados
    // ============================================
    if (this.isSocialChallenge && this.socialChallengeData) {
      this.showChallengeResults();
      return; // No mostrar el overlay normal de fase
    }
    
    // ============================================
    // PARTIDA RANKED - Mostrar resultados ranked
    // ============================================
    if (this.isRankedMatch && this.rankedMatchData) {
      this.showRankedResults();
      return; // No mostrar el overlay normal de fase
    }
    
    const percentage = this.currentQuestions.length > 0
      ? Math.round((this.phaseCorrect / this.currentQuestions.length) * 100) : 0;
    let icon;
    if (percentage === 100) icon = '*';
    else if (percentage >= 80) icon = '*';
    else if (percentage >= 60) icon = '+';
    else if (percentage >= 40) icon = '~';
    else icon = '-';
    document.getElementById('phase-icon').textContent = icon;
    document.getElementById('phase-title').textContent = `Fase ${this.currentPhase} Completada`;
    document.getElementById('phase-correct').textContent = this.phaseCorrect;
    document.getElementById('phase-wrong').textContent = this.phaseWrong;
    document.getElementById('phase-points').textContent = this.sessionPoints;
    document.getElementById('phase-streak').textContent = this.currentStreak;
    
    // Mostrar info de monedas y multiplicador
    const phaseCoinsEl = document.getElementById('phase-coins');
    const phaseMultiplierEl = document.getElementById('phase-multiplier');
    if (phaseCoinsEl) {
      phaseCoinsEl.textContent = this.sessionCoins;
    }
    if (phaseMultiplierEl) {
      phaseMultiplierEl.textContent = `x${newMultiplier}`;
      phaseMultiplierEl.className = `phase-multiplier-badge mult-${newMultiplier}`;
      if (phasePerfect && newMultiplier > 1) {
        phaseMultiplierEl.classList.add('multiplier-up');
      }
    }
    
    // Determinar si la proxima fase sube de dificultad
    const nextPhase = this.currentPhase + 1;
    const nextDiff = this.getDifficultyForPhase(nextPhase);
    const subtitleEl = document.getElementById('phase-subtitle');
    const diffLabelEl = document.getElementById('phase-diff-label');
    
    // Mostrar info del multiplicador si es perfecto
    if (phasePerfect && newMultiplier > 1) {
      subtitleEl.textContent = `Fase Perfecta! Multiplicador x${newMultiplier}`;
      subtitleEl.classList.remove('hidden');
      if (nextDiff !== this.activeDifficulty && !this.categoryExhausted) {
        const diffInfo = DIFFICULTIES[nextDiff];
        if (diffInfo) {
          diffLabelEl.textContent = `${diffInfo.icon} Siguiente: ${diffInfo.name}`;
          diffLabelEl.style.color = diffInfo.color;
          diffLabelEl.classList.remove('hidden');
        } else {
          diffLabelEl.classList.add('hidden');
        }
      } else {
        diffLabelEl.classList.add('hidden');
      }
    } else if (nextDiff !== this.activeDifficulty && !this.categoryExhausted) {
      const diffInfo = DIFFICULTIES[nextDiff];
      if (diffInfo) {
        subtitleEl.textContent = `!Aumento de Dificultad!`;
        diffLabelEl.textContent = `${diffInfo.icon} Siguiente: ${diffInfo.name}`;
        diffLabelEl.style.color = diffInfo.color;
        subtitleEl.classList.remove('hidden');
        diffLabelEl.classList.remove('hidden');
      } else {
        subtitleEl.classList.add('hidden');
        diffLabelEl.classList.add('hidden');
      }
    } else if (this.categoryExhausted) {
      subtitleEl.textContent = '✅ ¡Categoría completada!';
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
    if (this.currentPhase % 2 === 0 && this._canShowAds()) {
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
    this.phaseHadError = false; // Resetear para la nueva fase
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
      pool = QUESTIONS_DB.filter(q => !this.allUsedQuestionIds.includes(q.id) && !this.allUsedQuestionTexts.includes(this._normalizeQ(q.question)));
      // Si todas las preguntas estan usadas, resetear
      if (pool.length < 5) {
        this.allUsedQuestionIds = [];
        this.allUsedQuestionTexts = [];
        pool = QUESTIONS_DB.slice();
      }
    }
    pool = this.shuffle(pool);
    const count = Math.min(numQuestions, pool.length);
    this.currentQuestions = pool.slice(0, count);
    this.allUsedQuestionIds.push(...this.currentQuestions.map(q => q.id));
    this.allUsedQuestionTexts.push(...this.currentQuestions.map(q => this._normalizeQ(q.question)));
    this.currentQuestionIndex = 0;
    // Ocultar overlay y mostrar siguiente pregunta
    document.getElementById('phase-overlay').classList.add('hidden');
    this.renderQuestion();
  },
  applyAvatarStyle(el, player) {
    if (!el) return;
    const colorKey = player.avatarColor || 'indigo';
    const color = AVATAR_COLORS[colorKey] || AVATAR_COLORS.indigo;
    const ch = AVATAR_CHARACTERS.find(c => c.key === player.avatar);
    if (ch) {
      el.style.background = '#1a1a2e';
      el.style.boxShadow = `0 0 0 3px ${color.glow}, 0 6px 28px ${color.glow}`;
      el.style.overflow = 'hidden';
      el.style.padding = '0';
      el.innerHTML = `<img src="${DICEBEAR_BASE}${ch.seed}${ch.p||''}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;">`;
    } else {
      const figure = player.avatar || (player.name ? player.name.charAt(0).toUpperCase() : '?');
      el.innerHTML = '';
      el.textContent = figure;
      el.style.background = color.grad;
      el.style.boxShadow = `0 4px 24px ${color.glow}`;
      el.style.color = '#fff';
      el.style.overflow = '';
      el.style.padding = '';
    }
  },
  buildCharacterPicker() {
    const player = Storage.getPlayer();
    const figGrid = document.getElementById('avatar-grid');
    if (!figGrid) return;
    figGrid.innerHTML = AVATAR_CHARACTERS.map(ch =>
      `<button class="char-figure-btn${player.avatar === ch.key ? ' selected' : ''}" data-figure="${ch.key}">
        <div class="char-figure-img-wrap">
          <img src="${DICEBEAR_BASE}${ch.seed}${ch.p||''}" loading="eager">
        </div>
      </button>`
    ).join('');
    figGrid.querySelectorAll('.char-figure-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = Storage.getPlayer();
        p.avatar = btn.dataset.figure;
        Storage.savePlayer(p);
        figGrid.querySelectorAll('.char-figure-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.applyAvatarStyle(document.getElementById('avatar-preview'), p);
        window.BackendService?.updateAvatar(p.avatar, p.avatarColor);
      });
    });
    const colGrid = document.getElementById('avatar-color-grid');
    if (!colGrid) return;
    const currentColor = player.avatarColor || 'indigo';
    colGrid.innerHTML = Object.entries(AVATAR_COLORS).map(([key, c]) =>
      `<button class="char-color-btn${currentColor === key ? ' selected' : ''}" data-color="${key}" style="background:${c.grad}" title="${c.name}">
        <span class="char-color-shine"></span>
        ${currentColor === key ? '<span class="char-color-check">✓</span>' : ''}
      </button>`
    ).join('');
    colGrid.querySelectorAll('.char-color-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = Storage.getPlayer();
        p.avatarColor = btn.dataset.color;
        Storage.savePlayer(p);
        colGrid.querySelectorAll('.char-color-btn').forEach(b => {
          b.classList.remove('selected');
          const chk = b.querySelector('.char-color-check');
          if (chk) chk.remove();
        });
        btn.classList.add('selected');
        const chk = document.createElement('span');
        chk.className = 'char-color-check';
        chk.textContent = '✓';
        btn.appendChild(chk);
        this.applyAvatarStyle(document.getElementById('avatar-preview'), p);
        window.BackendService?.updateAvatar(p.avatar, p.avatarColor);
      });
    });
    this.applyAvatarStyle(document.getElementById('avatar-preview'), player);
  },
  // Normaliza texto de pregunta para comparar duplicados semánticos
  _normalizeQ(text) {
    return text.toLowerCase()
      .replace(/[áàä]/g,'a').replace(/[éèë]/g,'e').replace(/[íìï]/g,'i')
      .replace(/[óòö]/g,'o').replace(/[úùü]/g,'u').replace(/ñ/g,'n')
      .replace(/[¿¡?!.,;:'"-]/g,'').replace(/\s+/g,' ').trim();
  },
  // Obtener preguntas disponibles para una dificultad y categoria
  getPoolForPhase(difficulty, category) {
    let pool = QUESTIONS_DB.filter(q => q.difficulty === difficulty);
    if (category && category !== 'aleatorio') {
      pool = pool.filter(q => q.category === category);
    }
    pool = pool.filter(q => !this.allUsedQuestionIds.includes(q.id));
    pool = pool.filter(q => !this.allUsedQuestionTexts.includes(this._normalizeQ(q.question)));
    return pool;
  },
  // ========== SISTEMA DE VIDAS ==========
  loadLives() {
    const data = Storage.getLives();
    this.lives = typeof data.lives === 'number' && !isNaN(data.lives) ? data.lives : 12;
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
      livesEl.innerHTML = '<span class="icon-lives-inf">∞</span>';
      return;
    }
    let hearts = '';
    for (let i = 0; i < this.maxLives; i++) {
      hearts += i < this.lives ? ICON_SVG.heartActive : ICON_SVG.heartEmpty;
    }
    livesEl.innerHTML = hearts;
  },
  // ========== SISTEMA DE MONEDAS ==========
  updateCoinsDisplay() {
    const coins = Storage.getCoins();
    // Actualizar todos los displays de monedas
    const homeCoinsEl = document.getElementById('home-coins-count');
    const shopCoinsEl = document.getElementById('shop-coins-count');
    const quizCoinsValueEl = document.querySelector('#quiz-coins .quiz-coins-value');
    
    if (homeCoinsEl) homeCoinsEl.textContent = coins.total;
    if (shopCoinsEl) shopCoinsEl.textContent = coins.total;
    if (quizCoinsValueEl) quizCoinsValueEl.textContent = this.sessionCoins;
    
    // Actualizar multiplicador en UI
    const multiplierBadge = document.getElementById('coin-multiplier-badge');
    if (multiplierBadge) {
      multiplierBadge.textContent = `x${coins.multiplier}`;
      multiplierBadge.className = `coin-multiplier-badge mult-${coins.multiplier}`;
    }
    
    // Actualizar botones de canje en tienda
    this.updateRedeemButtons();
  },
  updateRedeemButtons() {
    const coins = Storage.getCoins();
    // Costos de vidas en monedas
    const costs = { 1: 50, 3: 120, 5: 180 };
    
    Object.keys(costs).forEach(lives => {
      const btn = document.getElementById(`redeem-${lives}-life`);
      if (btn) {
        const cost = costs[lives];
        btn.disabled = coins.total < cost || (this.lives >= this.maxLives && parseInt(lives) === 1);
        const costEl = btn.querySelector('.redeem-cost');
        if (costEl) costEl.textContent = cost;
      }
    });
  },
  redeemCoinsForLife(amount) {
    const costs = { 1: 50, 3: 120, 5: 180 };
    const cost = costs[amount];
    
    if (!cost) return false;
    
    const coins = Storage.getCoins();
    if (coins.total < cost) {
      this.showToast('? No tienes suficientes monedas');
      return false;
    }
    
    // Verificar que no exceda el maximo de vidas
    const livesToAdd = Math.min(amount, this.maxLives - this.lives);
    if (livesToAdd <= 0) {
      this.showToast('Ya tienes todas las vidas');
      return false;
    }
    
    // Gastar monedas
    if (Storage.spendCoins(cost)) {
      // Sincronizar con Backend
      if (window.BackendService?.currentUser) {
        window.BackendService?.syncCoinsToCloud(Storage.getCoins());
      }
      this.lives = Math.min(this.lives + livesToAdd, this.maxLives);
      this.saveLivesState();
      this.renderLives();
      this.renderHomeLives();
      this.updateCoinsDisplay();
      this.playSound('correct');
      this.showToast(`? +${livesToAdd} vida${livesToAdd > 1 ? 's' : ''} canjeada${livesToAdd > 1 ? 's' : ''}`);
      return true;
    }
    return false;
  },
  animateLifeLost() {
    const livesEl = document.getElementById('quiz-lives');
    if (!livesEl) return;
    livesEl.classList.add('life-lost-shake');
    setTimeout(() => livesEl.classList.remove('life-lost-shake'), 600);
  },
  // ========== SISTEMA DE POTENCIADORES ==========
  buyPowerup(powerupId) {
    if (typeof SeasonSystem === 'undefined') {
      this.showToast('? Sistema no disponible');
      return;
    }
    const result = SeasonSystem.buyPowerup(powerupId);
    if (result.success) {
      this.playSound('correct');
      this.showToast(`? ${result.message || 'Compra exitosa'}`);
      this.updateCoinsDisplay();
      this.updatePowerupsDisplay();
      // Sincronizar con Backend
      if (window.BackendService?.currentUser) {
        window.BackendService?.syncCoinsToCloud(Storage.getCoins());
      }
    } else {
      this.playSound('wrong');
      this.showToast(`? ${result.error || 'Error en la compra'}`);
    }
  },
  updatePowerupsDisplay() {
    try {
      if (typeof SeasonSystem === 'undefined') return;
      const inventory = SeasonSystem.getPowerups();
      // Actualizar tienda
      ['shield', 'reveal', 'doubleCoins', 'extraTime', 'fiftyFifty'].forEach(id => {
        const el = document.getElementById(`owned-${id}`);
        if (el) el.textContent = inventory[id] || 0;
        // Actualizar contadores en quiz
        const quizEl = document.getElementById(`quiz-${id}-count`);
        if (quizEl) quizEl.textContent = inventory[id] || 0;
      });
      // Actualizar botones de uso en quiz
      this.updateQuizPowerupButtons();
      // Mostrar potenciadores activos en tienda
      this.renderActivePowerups();
      // Actualizar indicador de escudo
      this.updateShieldIndicator();
    } catch (e) {
      console.warn('[BibliaQuiz] Error en updatePowerupsDisplay:', e);
    }
  },
  updateQuizPowerupButtons() {
    if (typeof SeasonSystem === 'undefined') return;
    const inventory = SeasonSystem.getPowerups();
    
    // En modo ranked, verificar si ya se uso el comodin permitido
    const rankedLimitReached = this.isRankedMatch && this.rankedPowerupsUsed >= 1;
    
    ['shield', 'reveal', 'doubleCoins', 'extraTime', 'fiftyFifty'].forEach(id => {
      const btn = document.getElementById(`use-${id}`);
      if (btn) {
        const count = inventory[id] || 0;
        // Deshabilitar si no tiene o si alcanzo limite en ranked
        btn.disabled = count <= 0 || rankedLimitReached;
        
        // Agregar indicador de limite ranked
        if (this.isRankedMatch) {
          btn.title = rankedLimitReached ? 'Ya usaste tu comodin en esta partida' : `${btn.title} (1 por partida)`;
        }
        
        // Marcar activos
        if (id === 'shield' && SeasonSystem.hasShieldActive()) {
          btn.classList.add('active');
        } else if (id === 'doubleCoins' && SeasonSystem.hasDoubleCoinsActive()) {
          btn.classList.add('active');
        } else if (id === 'extraTime' && SeasonSystem.hasExtraTimeActive()) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      }
    });
  },
  renderActivePowerups() {
    const container = document.getElementById('active-powerups-list');
    const box = document.getElementById('active-powerups-display');
    if (!container || !box) return;
    
    const activePowerups = [];
    if (typeof SeasonSystem !== 'undefined') {
      if (SeasonSystem.hasShieldActive()) {
        const remaining = SeasonSystem.getShieldRemainingTime();
        activePowerups.push({ id: 'shield', name: 'Escudo Divino', icon: '#', time: remaining });
      }
      if (SeasonSystem.hasDoubleCoinsActive()) {
        const remaining = SeasonSystem.getDoubleCoinsRemainingTime();
        activePowerups.push({ id: 'doubleCoins', name: 'Doble Monedas', icon: 'x2', time: remaining });
      }
      if (SeasonSystem.hasExtraTimeActive()) {
        const remaining = SeasonSystem.getExtraTimeRemainingTime();
        activePowerups.push({ id: 'extraTime', name: 'Tiempo Extra', icon: '+T', time: remaining });
      }
    }
    
    if (activePowerups.length === 0) {
      box.classList.add('hidden');
      return;
    }
    
    box.classList.remove('hidden');
    container.innerHTML = activePowerups.map(p => {
      const mins = Math.floor(p.time / 60000);
      const secs = Math.floor((p.time % 60000) / 1000);
      const timeStr = `${mins}:${secs.toString().padStart(2, '0')}`;
      const expiring = p.time < 60000 ? 'expiring' : '';
      return `
        <div class="active-powerup-item">
          <span class="active-powerup-icon">${p.icon}</span>
          <div class="active-powerup-info">
            <span class="active-powerup-name">${p.name}</span>
            <span class="active-powerup-timer ${expiring}">${timeStr}</span>
          </div>
        </div>
      `;
    }).join('');
  },
  updateShieldIndicator() {
    const indicator = document.getElementById('shield-active-indicator');
    if (!indicator) return;
    
    if (typeof SeasonSystem !== 'undefined' && SeasonSystem.hasShieldActive()) {
      const remaining = SeasonSystem.getShieldRemainingTime();
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      document.getElementById('shield-timer-text').textContent = `Escudo: ${mins}:${secs.toString().padStart(2, '0')}`;
      indicator.classList.remove('hidden');
    } else {
      indicator.classList.add('hidden');
    }
  },
  usePowerup(powerupId) {
    if (typeof SeasonSystem === 'undefined') return;
    
    // Restriccion: maximo 1 comodin por partida en CUALQUIER modo
    if (this.sessionPowerupsUsed >= 1) {
      this.showToast('Solo puedes usar 1 comodin por partida');
      return;
    }
    
    // Para powerups de uso instant�neo
    if (powerupId === 'reveal') {
      this.useRevealPowerup();
      return;
    }
    if (powerupId === 'fiftyFifty') {
      this.useFiftyFiftyPowerup();
      return;
    }
    
    // Para powerups con duracion
    const result = SeasonSystem.activatePowerup(powerupId);
    if (result.success) {
      // Contar uso de comodin en esta partida
      this.sessionPowerupsUsed = (this.sessionPowerupsUsed || 0) + 1;
      this.playSound('correct');
      this.showToast(`? ${result.message}`);
      this.updatePowerupsDisplay();
    } else {       
      this.showToast(`? ${result.message}`);
    }
  },
  useRevealPowerup() {
    if (typeof SeasonSystem === 'undefined') return;
    
    // Restriccion: max 1 comodin por partida
    if (this.sessionPowerupsUsed >= 1) {
      this.showToast('Solo puedes usar 1 comodin por partida');
      return;
    }
    
    // Verificar que no se haya respondido ya
    if (this.answered) {
      this.showToast('Ya respondiste esta pregunta');
      return;
    }
    
    const inventory = SeasonSystem.getPowerups();
    if (!inventory.reveal || inventory.reveal <= 0) {
      this.showToast('No tienes Revelacion disponible');
      return;
    }
    
    // Consumir el powerup
    SeasonSystem.consumePowerup('reveal');
    
    // Contar uso de comodin
    this.sessionPowerupsUsed = (this.sessionPowerupsUsed || 0) + 1;
    
    // Mostrar la respuesta correcta
    const currentQ = this.currentQuestions[this.currentQuestionIndex];
    if (currentQ) {
      const buttons = document.querySelectorAll('#options-container .option-btn');
      // Usar this.currentCorrectIndex que es el índice REAL después de mezclar las opciones
      const correctIndex = this.currentCorrectIndex;
      buttons.forEach((btn, index) => {
        if (index === correctIndex) {
          btn.classList.add('reveal-highlight');
          btn.style.border = '3px solid var(--success)';
          btn.style.boxShadow = '0 0 20px rgba(76, 175, 80, 0.5)';
        }
      });
      this.showToast('Respuesta revelada!');
      this.playSound('correct');
    }
    this.updatePowerupsDisplay();
  },
  useFiftyFiftyPowerup() {
    if (typeof SeasonSystem === 'undefined') return;
    
    // Restriccion: max 1 comodin por partida
    if (this.sessionPowerupsUsed >= 1) {
      this.showToast('Solo puedes usar 1 comodin por partida');
      return;
    }
    
    // Verificar que no se haya respondido ya
    if (this.answered) {
      this.showToast('Ya respondiste esta pregunta');
      return;
    }
    
    const inventory = SeasonSystem.getPowerups();
    if (!inventory.fiftyFifty || inventory.fiftyFifty <= 0) {
      this.showToast('No tienes 50:50 disponible');
      return;
    }
    
    const currentQ = this.currentQuestions[this.currentQuestionIndex];
    if (!currentQ) return;
    
    // Consumir el powerup
    SeasonSystem.consumePowerup('fiftyFifty');
    
    // Contar uso de comodin
    this.sessionPowerupsUsed = (this.sessionPowerupsUsed || 0) + 1;
    
    // Obtener botones y filtrar los incorrectos
    const buttons = Array.from(document.querySelectorAll('#options-container .option-btn'));
    // Usar this.currentCorrectIndex que es el índice REAL después de mezclar las opciones
    const correctIndex = this.currentCorrectIndex;
    const wrongButtons = buttons.filter((btn, index) => index !== correctIndex && !btn.disabled);
    
    // Eliminar 2 opciones incorrectas aleatorias
    const shuffled = this.shuffle([...wrongButtons]);
    const toRemove = shuffled.slice(0, 2);
    toRemove.forEach(btn => {
      btn.disabled = true;
      btn.classList.add('eliminated');
      btn.style.opacity = '0.3';
      btn.style.textDecoration = 'line-through';
      btn.style.pointerEvents = 'none';
    });
    
    this.showToast('2 respuestas eliminadas!');
    this.playSound('correct');
    this.updatePowerupsDisplay();
  },
  initPowerupListeners() {
    // Listeners para usar potenciadores en quiz
    const powerupBtns = document.querySelectorAll('.quiz-powerup-btn');
    powerupBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const powerupId = btn.dataset.powerup;
        this.usePowerup(powerupId);
      });
    });
    
    // Actualizar displays cada segundo para timers
    setInterval(() => {
      this.updatePowerupsDisplay();
    }, 1000);
  },
  // ========== HOME LIVES DISPLAY + TIMER ==========
  loadInfiniteLives() {
    try {
      const backendUser = JSON.parse(localStorage.getItem('backend_user') || '{}');
      // Solo si hay un usuario autenticado del backend
      if (backendUser.uid) {
        if (backendUser.infiniteLives === true || backendUser.isPremium === true) {
          this.infiniteLives = true;
          localStorage.setItem('bq_infiniteLives', 'true');
          if (typeof Billing !== 'undefined') {
                if (backendUser.isPremium) {
              Billing.isPremium = true;
              localStorage.setItem(Billing.STORAGE_KEYS.PREMIUM, 'true');
              // Sincronizar fecha de expiración y registro de compra anual
              if (backendUser.premiumExpiry) {
                localStorage.setItem(Billing.STORAGE_KEYS.PREMIUM_EXPIRY, backendUser.premiumExpiry);
                const purchases = JSON.parse(localStorage.getItem(Billing.STORAGE_KEYS.PURCHASES) || '[]');
                const hasActive = purchases.some(p => (p.productId === 'premium_yearly' || p.productId === 'premium_monthly') && p.status === 'active');
                if (!hasActive) {
                  purchases.push({
                    id: 'server_' + Date.now(),
                    productId: 'premium_yearly',
                    price: 0,
                    purchaseDate: new Date().toISOString(),
                    expiryDate: backendUser.premiumExpiry,
                    status: 'active'
                  });
                  localStorage.setItem(Billing.STORAGE_KEYS.PURCHASES, JSON.stringify(purchases));
                }
              }
            }
            if (backendUser.adsRemoved) {
              Billing.adsRemoved = true;
              localStorage.setItem(Billing.STORAGE_KEYS.ADS_REMOVED, 'true');
            }
          }
        } else if (localStorage.getItem('bq_promo_infinite_lives') === 'true') {
          // Promo local activa — respetar aunque el backend no lo sepa
          this.infiniteLives = true;
          localStorage.setItem('bq_infiniteLives', 'true');
        } else {
          // Usuario sin premium — resetear por si quedó de otra sesión
          this.infiniteLives = false;
          localStorage.setItem('bq_infiniteLives', 'false');
        }
        return;
      }
    } catch(e) {}
    this.infiniteLives = localStorage.getItem('bq_infiniteLives') === 'true';
  },
  saveInfiniteLives() {
    localStorage.setItem('bq_infiniteLives', this.infiniteLives ? 'true' : 'false');
  },
  renderHomeLives() {
    const countEl = document.getElementById('home-lives-count');
    const timerWrap = document.getElementById('home-lives-timer-wrap');
    const card = document.getElementById('home-lives-card');
    if (!countEl) return;
    
    if (this.infiniteLives) {
      const heartsEl = document.getElementById('home-lives-hearts');
      if (heartsEl) heartsEl.innerHTML = '<span class="icon-lives-inf">∞</span>';
      countEl.textContent = 'Infinitas';
      if (timerWrap) timerWrap.classList.add('hidden');
      if (card) card.classList.add('infinite-active');
      return;
    }
    if (card) card.classList.remove('infinite-active');

    // SVG hearts
    const heartsEl = document.getElementById('home-lives-hearts');
    if (heartsEl) {
      let hearts = '';
      for (let i = 0; i < this.maxLives; i++) {
        hearts += i < this.lives ? ICON_SVG.heartActive : ICON_SVG.heartEmpty;
      }
      heartsEl.innerHTML = hearts;
    }
    countEl.textContent = `${this.lives}/${this.maxLives}`;
    
    // Show/hide timer
    if (this.lives < this.maxLives && timerWrap) {
      timerWrap.classList.remove('hidden');
      this.updateHomeLivesTimer();
    } else if (timerWrap) {
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
      heartsEl.innerHTML = '<span style="color:#ffd700;font-size:24px">&#8734;</span>';
      textEl.textContent = 'Vidas infinitas activas';
    } else {
      let hearts = '';
      for (let i = 0; i < this.maxLives; i++) {
        hearts += i < this.lives ? '<span style="color:#e74c3c">&#9829;</span>' : '<span style="color:#555">&#9829;</span>';
      }
      heartsEl.innerHTML = hearts;
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
    // Actualizar display de monedas
    this.updateCoinsDisplay();
    // Actualizar multiplicador en tienda
    const shopMultBadge = document.getElementById('shop-multiplier-badge');
    if (shopMultBadge) {
      const coins = Storage.getCoins();
      shopMultBadge.textContent = `x${coins.multiplier}`;
      shopMultBadge.className = `coin-multiplier-badge mult-${coins.multiplier}`;
    }
  },
  handleShopBuy(action) {
    // Nueva l�gica de compra usando Billing
    if (typeof Billing !== 'undefined') {
      this.handleShopBuyNew(action);
      return;
    }
    // Fallback legacy
    if (action === '1') {
      if (this.lives >= this.maxLives) {
        this.showToast('Ya tienes todas las vidas', 'info');
        return;
      }
      this.lives = Math.min(this.maxLives, this.lives + 1);
      this.saveLivesState();
      this.playSound('correct');
      this.showToast('+1 vida obtenida');
    } else if (action === 'full') {
      if (this.lives >= this.maxLives) {
        this.showToast('Ya tienes todas las vidas', 'info');
        return;
      }
      this.lives = this.maxLives;
      this.saveLivesState();
      this.playSound('correct');
      this.showToast('Vidas al maximo!');
    } else if (action === 'infinite') {
      this.infiniteLives = !this.infiniteLives;
      this.saveInfiniteLives();
      if (this.infiniteLives) {
        this.playSound('correct');
        this.showToast('Vidas infinitas activadas!');
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
        this.showToast('Ya tienes todas las vidas', 'info');
        return;
      }
    }
    
    // Iniciar compra
    this.showToast('Procesando...', 'info');
    
    const result = await Billing.purchase(mappedId);
    
    if (result.success) {
      console.log('[Shop] Compra exitosa:', result.purchase);
    } else if (result.error !== 'cancelled') {
      this.showToast('? Error: ' + result.error, 'error');
    }
  },
  
  onPurchaseComplete(purchase) {
    switch (purchase.productId) {
      case 'life_1':
        this.lives = Math.min(this.maxLives, this.lives + 1);
        this.saveLivesState();
        this.playSound('correct');
        this.showToast('💖 +1 vida obtenida');
        break;
        
      case 'life_full':
        this.lives = this.maxLives;
        this.saveLivesState();
        this.playSound('correct');
        this.showToast('Vidas al máximo!');
        break;
        
      case 'premium_monthly':
      case 'premium_yearly':
        this.infiniteLives = true;
        this.saveInfiniteLives();
        this.playSound('complete');
        this.showToast(' Bienvenido a Premium!');
        const stats = Storage.getStats();
        stats.isPremium = true;
        stats.premiumDate = new Date().toISOString();
        Storage.saveStats(stats);
        break;
        
      case 'remove_ads':
        this.playSound('complete');
        this.showToast('Anuncios eliminados!');
        break;
      
      // Paquetes de monedas
      case 'coins_500':
        Storage.addCoins(500);
        this.updateCoinsDisplay();
        this.playSound('correct');
        this.showToast('💰 +500 monedas');
        if (window.BackendService?.currentUser) {
          window.BackendService?.syncCoinsToCloud(Storage.getCoins());
        }
        break;
        
      case 'coins_1500':
        Storage.addCoins(1650); // 1500 + 10% bonus
        this.updateCoinsDisplay();
        this.playSound('correct');
        this.showToast('💰 +1,650 monedas (+10% bonus)');
        if (window.BackendService?.currentUser) {
          window.BackendService?.syncCoinsToCloud(Storage.getCoins());
        }
        break;
        
      case 'coins_5000':
        Storage.addCoins(6250); // 5000 + 25% bonus
        this.updateCoinsDisplay();
        this.playSound('complete');
        this.showToast('💰 +6,250 monedas (+25% bonus)');
        if (window.BackendService?.currentUser) {
          window.BackendService?.syncCoinsToCloud(Storage.getCoins());
        }
        break;
        
      case 'coins_12000':
        Storage.addCoins(16800); // 12000 + 40% bonus
        this.updateCoinsDisplay();
        this.playSound('complete');
        this.showToast('💰 +16,800 monedas (+40% bonus)');
        if (window.BackendService?.currentUser) {
          window.BackendService?.syncCoinsToCloud(Storage.getCoins());
        }
        break;
    }
    
    this.renderShop();
    this.renderLives();
    this.renderHomeLives();
  },
  
  async handleRestorePurchases() {
    this.showToast(' Restaurando compras...', 'info');
    
    try {
      const purchases = await Billing.restorePurchases();
      
      if (purchases.length > 0) {
        Billing.checkPremiumStatus();
        
        if (Billing.isPremium) {
          this.infiniteLives = true;
          this.saveInfiniteLives();
        }
        
        this.renderShop();
        this.showToast(' Compras restauradas: ' + purchases.length);
      } else {
        this.showToast(' No hay compras para restaurar', 'info');
      }
    } catch (e) {
      this.showToast(' Error al restaurar', 'error');
    }
  },
  
  async handleManageSubscription() {
    const result = await this.showConfirmModal(
      'Gestionar Suscripcion',
      'Que deseas hacer con tu suscripcion Premium?',
      'Cancelar Suscripcion',
      'Volver'
    );
    
    if (result) {
      const cancelResult = await Billing.cancelSubscription();
      if (cancelResult.success) {
        this.showToast('✅ ' + cancelResult.message);
        this.renderShop();
      } else {
        this.showToast('? ' + cancelResult.error, 'error');
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
    // Sonido de fin de juego
    this.playSound('gameOver');
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

  _canShowAds() {
    return typeof Billing === 'undefined' || Billing.canShowAds();
  },

  _pushAd(el) {
    if (!el || el.dataset.adsbygoogleStatus) return;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch(e) {}
  },

  _initHomeBannerAd() {
    if (!this._canShowAds()) {
      const banner = document.getElementById('home-ad-banner');
      if (banner) banner.style.display = 'none';
      return;
    }
    const ins = document.querySelector('#home-ad-banner .adsbygoogle');
    this._pushAd(ins);
  },

  _pushResultsAd() {
    if (!this._canShowAds()) {
      const container = document.getElementById('results-ad-container');
      if (container) container.style.display = 'none';
      return;
    }
    const ins = document.querySelector('#results-ad-container .adsbygoogle');
    this._pushAd(ins);
  },

  showAdOverlay(onComplete) {
    // Si el usuario es premium, no mostrar anuncios
    if (!this._canShowAds()) {
      if (onComplete) onComplete();
      return;
    }
    
    this._adCallback = onComplete;
    const overlay = document.getElementById('ad-overlay');
    const closeBtn = document.getElementById('btn-close-ad');
    const countdownEl = document.getElementById('ad-countdown');
    closeBtn.classList.add('hidden');
    closeBtn.disabled = true;
    // Cargar anuncio AdSense
    this._pushAd(overlay.querySelector('.adsbygoogle'));
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
      titleEl.textContent = ` !${catInfo.name} Completado!`;
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
        <span class="medal-icon">${isDone ? '*' : 'o'}</span>
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
      icon = '⭐'; motivation = '¡Increíble! Vas como un verdadero sabio bíblico.';
    } else if (percentage >= 70) {
      icon = '👍'; motivation = '¡Muy bien! Tu conocimiento brilla con fuerza.';
    } else if (percentage >= 50) {
      icon = '📖'; motivation = '¡Sigue adelante! La Palabra de Dios te guía.';
    } else {
      icon = '💪'; motivation = '¡No te rindas! Cada pregunta es una oportunidad de aprender.';
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
    // Add XP and check for level up
    const playerBefore = Storage.getPlayer();
    const levelBefore = playerBefore.level;
    Storage.addXP(this.sessionPoints);
    window.logGA?.('game_complete', { category: this.selectedCategory, score: this.sessionPoints, correct: this.sessionCorrect });
    // Misiones
    if (typeof SeasonSystem !== 'undefined') {
      SeasonSystem.updateMissionProgress('games', 1);
      SeasonSystem.updateMissionProgress('correct', this.sessionCorrect);
      SeasonSystem.updateMissionProgress('streak', this.sessionBestStreak || this.currentStreak || 0);
      if (this.sessionCorrect === this.currentQuestions.length && this.currentQuestions.length > 0) {
        SeasonSystem.updateMissionProgress('perfect', 1);
      }
      if (this.selectedCategory) {
        SeasonSystem.updateMissionProgress('categories', this.selectedCategory);
      }
    }
    // Torneo: acumular puntos si está inscrito (fire-and-forget)
    if (this.sessionPoints > 0 && typeof TournamentManager !== 'undefined') {
      TournamentManager.submitScore(this.sessionPoints);
    }
    const playerAfter = Storage.getPlayer();
    if (playerAfter.level > levelBefore) {
      // Subio de nivel!
      this.playSound('levelup');
      setTimeout(() => {
        this.showToast(`🎉 ¡Subiste al nivel ${playerAfter.level}!`, 'success');
      }, 1500);
    }
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
    
    // Sincronizar puntos con Firestore para el leaderboard social
    if (window.FirebaseService?.currentUser) {
      window.FirebaseService.updateStats({
        points: this.sessionPoints,
        totalCorrect: this.sessionCorrect,
        totalGames: 1,
        streak: this.sessionBestStreak
      }).catch(err => console.error('Error sincronizando stats a Firestore:', err));
    }

    // Sincronizar progreso completo con MongoDB (valores absolutos desde localStorage)
    // Se usa syncFullProgress para evitar race condition con $inc vs $set
    if (window.BackendService && BackendService.token) {
      console.log('[BibliaQuiz] 💾 Sincronizando progreso a MongoDB...');
      BackendService.syncFullProgress()
        .then(success => {
          if (success) {
            console.log('[BibliaQuiz] ✅ Progreso guardado en MongoDB');
          }
        })
        .catch(err => console.error('[BibliaQuiz] Error sincronizando a MongoDB:', err));
    }
    
    // Si es reto social, enviar resultado
    if (this.isSocialChallenge) {
      this.finishSocialChallenge();
    }
    
    // Check badges
    const newBadges = Storage.checkNewBadges();
    // Show achievement popup for new badges
    if (newBadges && newBadges.length > 0) {
      newBadges.forEach((badge, i) => {
        setTimeout(() => this.showAchievementPopup(badge), 1000 + (i * 2500));
      });
    }
    // --- CAMPAIGN MODE HOOK ---
    if (this.campaignMode && window.CampaignManager) {
      // Dar XP antes de salir
      Storage.addXP(this.sessionPoints);
      // Limpiar overlays del quiz para evitar cuadros negros
      ['phase-overlay','gameover-overlay','ad-overlay','catcomplete-overlay'].forEach(id => {
        document.getElementById(id)?.classList.add('hidden');
      });
      CampaignManager.saveChapterResult(
        this.campaignMode.chapterId,
        this.sessionCorrect,
        this.currentQuestions.length,
        this.sessionPoints
      );
      this.campaignMode = null;
      this.isRankedMatch = false;
      this.isDailyChallenge = false;
      return;
    }

    // --- CLAN POINTS HOOK ---
    if (window.ClanManager && this.sessionPoints > 0) {
      ClanManager.addPointsFromQuiz(this.sessionPoints).catch(() => {});
    }

    // Render results
    this.renderResults(newBadges);
    this.showScreen('results');
    this._pushResultsAd();
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
      icon = '🏆'; title = '¡PERFECTO!'; subtitle = '¡No has fallado ninguna!';
    } else if (percentage >= 80) {
      icon = '⭐'; title = '¡Excelente!'; subtitle = '¡Conoces muy bien la Biblia!';
    } else if (percentage >= 60) {
      icon = '👍'; title = '¡Bien hecho!'; subtitle = 'Sigue estudiando la Palabra';
    } else if (percentage >= 40) {
      icon = '~'; title = 'Puedes mejorar'; subtitle = 'No te rindas, sigue aprendiendo';
    } else {
      icon = '-'; title = 'A estudiar'; subtitle = 'La Palabra de Dios es tu guia';
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
    const avatarEl = document.getElementById('progress-avatar');
    this.applyAvatarStyle(avatarEl, player);
    document.getElementById('progress-name').textContent = player.name;
    document.getElementById('progress-email').textContent = player.email ? ` ${player.email}` : '';
    document.getElementById('progress-age').textContent = player.age ? ` ${player.age} anos` : '';
    document.getElementById('progress-level').textContent = `Nivel ${player.level} - ${this.getLevelTitle(player.level)}`;
    const xpPercent = player.xpToNext > 0 ? (player.xp / player.xpToNext) * 100 : 0;
    document.getElementById('progress-xp-fill').style.width = `${xpPercent}%`;
    document.getElementById('progress-xp-text').textContent = `${player.xp} / ${player.xpToNext} XP`;
    // Stats
    document.getElementById('stat-total-points').textContent = stats.totalPoints.toLocaleString();
    document.getElementById('stat-games-played').textContent = stats.totalGames;
    document.getElementById('stat-best-streak').textContent = ` ${stats.bestStreak}`;
    
    // Daily streak
    const dailyStreak = Storage.getDailyStreak();
    const dailyStreakEl = document.getElementById('stat-daily-streak');
    if (dailyStreakEl) dailyStreakEl.textContent = dailyStreak.count || 0;

    // Advanced stats
    const totalCorrectEl = document.getElementById('stat-total-correct');
    const perfectGamesEl = document.getElementById('stat-perfect-games');
    const avgPerGameEl = document.getElementById('stat-avg-per-game');
    const totalCoinsEl = document.getElementById('stat-total-coins');

    if (totalCorrectEl) totalCorrectEl.textContent = stats.totalCorrect.toLocaleString();
    if (perfectGamesEl) perfectGamesEl.textContent = stats.perfectGames || 0;
    if (avgPerGameEl) {
      const avg = stats.totalGames > 0 ? Math.round(stats.totalPoints / stats.totalGames) : 0;
      avgPerGameEl.textContent = avg;
    }
    if (totalCoinsEl) totalCoinsEl.textContent = (Storage.getCoins().total || 0).toLocaleString();
    
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
    this.renderProgressChart('weekly');
    // Period selector listeners
    document.querySelectorAll('.period-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderProgressChart(btn.dataset.period);
      };
    });
    // Leaderboard
    this.renderLeaderboard();
    // History
    const historyList = document.getElementById('history-list');
    if (history.length === 0) {
      historyList.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📜</div>
          <div class="empty-text">Aún no has jugado ninguna partida</div>
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
  // === LOGROS / ACHIEVEMENTS ===
  renderAchievements(filter = 'all') {
    const earnedBadges = Storage.getBadges();
    const stats = this.getAchievementStats();

    // Tournament badges (dynamic, from backend_user)
    let tournamentBadges = [];
    try {
      const bu = JSON.parse(localStorage.getItem('backend_user') || '{}');
      tournamentBadges = Array.isArray(bu.tournamentBadges) ? bu.tournamentBadges : [];
    } catch {}

    // Summary
    document.getElementById('achievements-unlocked').textContent = earnedBadges.length + tournamentBadges.length;
    document.getElementById('achievements-total').textContent = BADGES.length;
    const progressPercent = (earnedBadges.length / BADGES.length) * 100;
    document.getElementById('achievements-progress-fill').style.width = `${progressPercent}%`;

    // Render tournament badges section if any
    const grid = document.getElementById('achievements-grid');
    let tournamentSection = '';
    if (tournamentBadges.length > 0) {
      // Sort: gold first, then by place ascending
      const sorted = [...tournamentBadges].sort((a, b) => a.place - b.place || a.tournamentNumber - b.tournamentNumber);
      tournamentSection = `
        <div class="tournament-badges-section">
          <div class="tournament-badges-title">🏆 Insignias de Torneos</div>
          <div class="tournament-badges-grid">
            ${sorted.map(b => `
              <div class="tbadge tbadge-${b.tier}">
                <div class="tbadge-ribbon">#${b.tournamentNumber}</div>
                <div class="tbadge-icon">${b.icon}</div>
                <div class="tbadge-name">${b.name}</div>
                <div class="tbadge-desc">${b.description}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
    
    // Tabs
    document.querySelectorAll('.achievements-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === filter);
      tab.onclick = () => this.renderAchievements(tab.dataset.tab);
    });
    
    // Filter badges
    let filteredBadges = BADGES;
    if (filter === 'unlocked') {
      filteredBadges = BADGES.filter(b => earnedBadges.includes(b.id));
    } else if (filter === 'locked') {
      filteredBadges = BADGES.filter(b => !earnedBadges.includes(b.id));
    }
    
    // Grid
    if (filteredBadges.length === 0 && tournamentBadges.length === 0) {
      grid.innerHTML = `${tournamentSection}<div class="empty-state" style="grid-column: 1/-1; padding: 40px; text-align: center;">
        <div style="font-size: 3rem; margin-bottom: 12px;">${filter === 'unlocked' ? '🔒' : '🏆'}</div>
        <p style="color: var(--text-muted);">${filter === 'unlocked' ? 'Aun no has desbloqueado logros' : 'Has desbloqueado todos los logros!'}</p>
      </div>`;
      return;
    }

    const badgeCards = filteredBadges.map(badge => {
      const isEarned = earnedBadges.includes(badge.id);
      return `
        <div class="achievement-card ${isEarned ? 'unlocked' : 'locked'}">
          <span class="achievement-icon">${badge.icon}</span>
          <div class="achievement-name">${badge.name}</div>
          <div class="achievement-desc">${badge.description}</div>
        </div>
      `;
    }).join('');

    grid.innerHTML = tournamentSection + badgeCards;
  },
  
  getAchievementStats() {
    const stats = Storage.getStats();
    const player = Storage.getPlayer();
    const history = Storage.getHistory();
    
    // Calculate additional stats for achievements
    let perfectGames = 0;
    let categoriesPlayed = new Set();
    let categoriesCompleted = [];
    let expertCorrect = 0;
    let fastAnswers = 0;
    let gamesNoLivesLost = 0;
    let impostorWins = 0;
    let dailyChallengesWon = 0;
    
    history.forEach(game => {
      categoriesPlayed.add(game.category);
      if (game.correct === game.total) {
        perfectGames++;
        if (!game.livesLost || game.livesLost === 0) {
          gamesNoLivesLost++;
        }
      }
      if (game.difficulty === 'experto') {
        expertCorrect += game.correct;
      }
      if (game.mode === 'impostor' && game.won) {
        impostorWins++;
      }
      if (game.mode === 'daily' && game.won) {
        dailyChallengesWon++;
      }
    });
    
    // Speed stats
    const speedStats = Storage.getSpeedStats();
    fastAnswers = speedStats.fastAnswers || 0;
    
    // Daily streak
    const dailyStreak = Storage.getDailyStreak();
    
    return {
      ...stats,
      totalPoints: stats.totalPoints,
      totalGames: stats.totalGames,
      bestStreak: stats.bestStreak,
      totalAnswered: stats.totalAnswered,
      totalCorrect: stats.totalCorrect,
      perfectGames,
      categoriesPlayed: categoriesPlayed.size,
      categoriesCompleted,
      expertCorrect,
      fastAnswers,
      dailyStreak: dailyStreak.count || 0,
      uniqueDaysPlayed: history.length > 0 ? new Set(history.map(h => h.date?.split('T')[0])).size : 0,
      gamesNoLivesLost,
      impostorWins,
      dailyChallengesWon
    };
  },
  
  checkAndUnlockAchievements() {
    const earnedBadges = Storage.getBadges();
    const stats = this.getAchievementStats();
    const newBadges = [];
    
    BADGES.forEach(badge => {
      if (!earnedBadges.includes(badge.id) && badge.condition(stats)) {
        newBadges.push(badge);
        earnedBadges.push(badge.id);
      }
    });
    
    if (newBadges.length > 0) {
      Storage.saveBadges(earnedBadges);
      // Show popup for each new badge
      newBadges.forEach((badge, i) => {
        setTimeout(() => this.showAchievementPopup(badge), i * 2500);
      });
    }
    
    return newBadges;
  },
  
  showAchievementPopup(badge) {
    // Cancelar cierre automático previo para que no mate el badge actual
    if (this._achievementAutoClose) {
      clearTimeout(this._achievementAutoClose);
      this._achievementAutoClose = null;
    }

    let overlay = document.querySelector('.achievement-overlay');
    let popup = document.querySelector('.achievement-popup');

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'achievement-overlay';
      document.body.appendChild(overlay);
    }

    if (!popup) {
      popup = document.createElement('div');
      popup.className = 'achievement-popup';
      document.body.appendChild(popup);
    }

    popup.innerHTML = `
      <div class="achievement-popup-title">Nuevo Logro!</div>
      <div class="achievement-popup-icon">${badge.icon}</div>
      <div class="achievement-popup-name">${badge.name}</div>
      <div class="achievement-popup-desc">${badge.description}</div>
      <button class="achievement-popup-close">Genial!</button>
    `;

    this.playSound('achievement');

    setTimeout(() => {
      overlay.classList.add('show');
      popup.classList.add('show');
    }, 100);

    const close = () => {
      overlay.classList.remove('show');
      popup.classList.remove('show');
      if (this._achievementAutoClose) {
        clearTimeout(this._achievementAutoClose);
        this._achievementAutoClose = null;
      }
    };

    popup.querySelector('.achievement-popup-close').onclick = close;
    this._achievementAutoClose = setTimeout(close, 5000);
  },
  // === CONFIGURACION ===
  renderSettings() {
    const player = Storage.getPlayer();
    const settings = Storage.getSettings();
    
    // 🔐 Cargar datos del usuario autenticado desde BackendService
    let userName = player.name;
    let userEmail = player.email || '';
    
    // Intentar obtener datos del backend (MongoDB)
    const backendUser = localStorage.getItem('backend_user');
    if (backendUser) {
      try {
        const user = JSON.parse(backendUser);
        userName = user.displayName || user.email?.split('@')[0] || userName;
        userEmail = user.email || userEmail;
        console.log('[BibliaQuiz] Cargando datos de usuario autenticado:', userEmail);
      } catch (e) {
        console.warn('[BibliaQuiz] Error parseando backend_user:', e);
      }
    }
    
    // También verificar BackendService directamente
    if (typeof BackendService !== 'undefined' && BackendService.currentUser) {
      userName = BackendService.currentUser.displayName || BackendService.currentUser.email?.split('@')[0] || userName;
      userEmail = BackendService.currentUser.email || userEmail;
    }
    
    document.getElementById('setting-name').value = userName;
    document.getElementById('setting-email').value = userEmail;

    // Show logged-in account info next to logout button
    const loggedInInfo = document.getElementById('logged-in-user-info');
    if (loggedInInfo && userEmail) {
      loggedInInfo.textContent = `Sesión: ${userEmail}`;
    }
    
    // Si hay usuario autenticado, el email es de solo lectura
    const emailInput = document.getElementById('setting-email');
    if (backendUser || (typeof BackendService !== 'undefined' && BackendService.currentUser)) {
      emailInput.readOnly = true;
      emailInput.style.opacity = '0.7';
      emailInput.title = 'Email de tu cuenta (no se puede cambiar aquí)';
    } else {
      emailInput.readOnly = false;
      emailInput.style.opacity = '1';
      emailInput.title = '';
    }
    
    document.getElementById('setting-age').value = player.age || '';
    document.getElementById('setting-gender').value = player.gender || '';
    document.getElementById('setting-questions').value = settings.questionsPerGame;
    document.getElementById('setting-timer').value = settings.timerSeconds !== undefined ? settings.timerSeconds : 30;
    document.getElementById('setting-no-repeat').checked = settings.noRepeat !== false;
    document.getElementById('setting-sound').checked = settings.sound;
    document.getElementById('setting-vibration').checked = settings.vibration;
    document.getElementById('setting-verse').checked = settings.showVerse;
    // Character picker
    this.buildCharacterPicker();
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

  async logout() {
    const token = localStorage.getItem('backend_token');
    if (token) {
      try {
        const apiBase = window.API_BASE_URL || 'http://localhost:3001/api';
        await fetch(apiBase + '/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + token }
        });
      } catch (e) {}
    }
    localStorage.removeItem('backend_token');
    localStorage.removeItem('backend_user');
    // Sign out from Firebase too if available
    if (window.FirebaseService?.auth) {
      try { await window.FirebaseService.auth.signOut(); } catch (e) {}
    }
    location.reload();
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
  showShieldProtectionEffect() {
    const popup = document.createElement('div');
    popup.className = 'point-popup shield-protection';
    popup.textContent = '🛡️ Protegido';
    popup.style.color = '#4CAF50';
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1200);
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
          <span class="sca-icon">?</span>
          <span class="sca-text">${escapeHTML(correctAnswer)}</span>
        </div>
        <div class="study-card-wrong">
          <span class="scw-icon">?</span>
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
          <div class="empty-icon">?</div>
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
      bestText.textContent = `Mejor: ${record.correct} correctas - ${record.points} pts`;
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
    // Reset contador de comodines (max 1 por partida)
    this.sessionPowerupsUsed = 0;
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
    document.getElementById('challenge-points').textContent = `P ${this.challengePoints}`;
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
    document.getElementById('challenge-points').textContent = `P ${this.challengePoints}`;
    document.getElementById('challenge-counter').textContent = ` ${this.challengeCorrect + this.challengeWrong}`;
    const streakEl = document.getElementById('challenge-streak');
    if (this.challengeStreak >= 3) {
      streakEl.textContent = ` ${this.challengeStreak}`;
      streakEl.classList.remove('hidden');
    } else {
      streakEl.classList.add('hidden');
    }
    this.vibrate(isCorrect ? 50 : [100, 50, 100]);
    // Sonidos
    this.playSound(isCorrect ? 'correct' : 'wrong');
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

    // Sincronizar puntos con Firestore para el leaderboard social
    if (window.FirebaseService?.currentUser) {
      window.FirebaseService.updateStats({
        points: this.challengePoints,
        totalCorrect: this.challengeCorrect,
        totalGames: 1,
        streak: this.challengeBestStreak
      }).catch(err => console.error('Error sincronizando stats a Firestore:', err));
    }

    // Add XP and check for level up
    const playerBefore = Storage.getPlayer();
    const levelBefore = playerBefore.level;
    Storage.addXP(this.challengePoints);
    const playerAfter = Storage.getPlayer();
    if (playerAfter.level > levelBefore) {
      // Subio de nivel!
      this.playSound('levelup');
      setTimeout(() => {
        this.showToast(`🎉 ¡Subiste al nivel ${playerAfter.level}!`, 'success');
      }, 1500);
    }
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
      icon = '🏆'; title = '¡INCREÍBLE!'; subtitle = `${this.challengeCorrect} respuestas correctas · ¡Eres imparable!`;
    } else if (this.challengeCorrect >= 15) {
      icon = '⭐'; title = '¡Excelente!'; subtitle = `${this.challengeCorrect} correctas · ¡Gran desempeño!`;
    } else if (this.challengeCorrect >= 10) {
      icon = '👍'; title = '¡Bien hecho!'; subtitle = `${this.challengeCorrect} correctas · ¡Sigue mejorando!`;
    } else if (this.challengeCorrect >= 5) {
      icon = '📖'; title = '¡Buen intento!'; subtitle = `${this.challengeCorrect} correctas · ¡Puedes más!`;
    } else {
      icon = '💪'; title = 'A practicar'; subtitle = `${this.challengeCorrect} correctas · ¡No te rindas!`;
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
        <div class="cat-icon">${cat.svg || cat.icon}</div>
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
    this.sessionPowerupsUsed = 0; // Reset contador de comodines
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
    // Options - Expanded to 6 options
    const optionsContainer = document.getElementById('duo-options');
    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    // Get expanded options (6 options with proper shuffling)
    const expandedData = this.expandOptionsTo6(q);
    const expandedOptions = expandedData.options;
    const correctIndex = expandedData.correctIndex;
    
    // Store corrected index for answer checking
    this.duoCurrentCorrectIndex = correctIndex;
    
    expandedOptions.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('aria-label', `Opcion ${letters[i]}: ${opt}`);
      btn.innerHTML = `
        <span class="option-letter">${letters[i]}</span>
        <span class="option-text">${escapeHTML(opt)}</span>
      `;
      btn.addEventListener('click', () => this.duoSelectAnswer(i, btn, correctIndex));
      optionsContainer.appendChild(btn);
    });
    optionsContainer.classList.add('six-options');
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
    timerEl.textContent = 'T: Tiempo!';
    timerEl.className = 'quiz-timer danger';
    document.getElementById('duo-ref-text').innerHTML = `<strong>T: Se acabo el tiempo!</strong>  ${q.reference}`;
    document.getElementById('duo-ref-card').classList.remove('hidden');
    this.vibrate([100, 50, 100]);
    // Auto-advance after 2 seconds
    setTimeout(() => this.duoAdvance(), 2000);
  },
  duoSelectAnswer(index, btnEl, correctIndex) {
    if (this.duoAnswered) return;
    this.duoAnswered = true;
    this.stopDuoTimer();
    const isP1 = this.duoCurrentPlayer === 1;
    const questions = isP1 ? this.duoP1Questions : this.duoP2Questions;
    const idx = isP1 ? this.duoP1Index : this.duoP2Index;
    const q = questions[idx];
    // Use passed correctIndex for 6-option questions
    const actualCorrect = correctIndex !== undefined ? correctIndex : q.correct;
    const isCorrect = index === actualCorrect;
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
      this.playSound('correct');
    } else {
      btnEl.classList.add('wrong');
      allBtns[actualCorrect].classList.add('correct');
      if (isP1) this.duoP1Wrong++;
      else this.duoP2Wrong++;
      this.vibrate([100, 50, 100]);
      this.playSound('wrong');
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
      icon = '*';
      title = this.duoPlayer1 + ' gana!';
      subtitle = this.duoP1Points + ' vs ' + this.duoP2Points + ' puntos';
    } else if (this.duoP2Points > this.duoP1Points) {
      icon = '*';
      title = this.duoPlayer2 + ' gana!';
      subtitle = this.duoP2Points + ' vs ' + this.duoP1Points + ' puntos';
    } else {
      icon = '=';
      title = 'Empate!';
      subtitle = 'Ambos con ' + this.duoP1Points + ' puntos';
    }
    document.getElementById('duo-res-icon').textContent = icon;
    document.getElementById('duo-res-title').textContent = title;
    document.getElementById('duo-res-subtitle').textContent = subtitle;
    document.getElementById('duo-res-p1-name').textContent = this.duoPlayer1;
    document.getElementById('duo-res-p1-correct').textContent = this.duoP1Correct + ' correctas';
    document.getElementById('duo-res-p1-score').textContent = this.duoP1Points + ' pts';
    document.getElementById('duo-res-p2-name').textContent = this.duoPlayer2;
    document.getElementById('duo-res-p2-correct').textContent = this.duoP2Correct + ' correctas';
    document.getElementById('duo-res-p2-score').textContent = this.duoP2Points + ' pts';
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
  // SISTEMA DE SONIDO (Web Audio API + SoundManager)
  // ============================================================
  playSound(type) {
    const settings = Storage.getSettings();
    if (!settings.sound) return;
    
    // Usar SoundManager si esta disponible
    if (typeof SoundManager !== 'undefined') {
      const soundMap = {
        'correct': 'playCorrect',
        'wrong': 'playIncorrect',
        'phase': 'playLevelUp',
        'complete': 'playPerfect',
        'levelup': 'playLevelUp',
        'achievement': 'playAchievement',
        'timerLow': 'playTimerLow',
        'click': 'playClick',
        'gameStart': 'playGameStart',
        'gameOver': 'playGameOver',
        'streak': 'playStreak',
        'bonus': 'playBonus',
        'countdown': 'playCountdown'
      };
      
      const soundMethod = soundMap[type];
      if (soundMethod && typeof SoundManager[soundMethod] === 'function') {
        SoundManager[soundMethod]();
        return;
      }
    }
    
    // Fallback al sistema antiguo
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
      `P ${this.sessionPoints} puntos\n` +
      ` Categoria: ${catName}\n` +
      `F Fase: ${this.currentPhase}\n` +
      `!Pon a prueba tu conocimiento biblico!`;
    if (navigator.share) {
      navigator.share({ title: 'BibliaQuiz', text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast('✅ Resultado copiado al portapapeles', 'success');
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
    ctx.fillText('✝️ BibliaQuiz', 300, 55);
    
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
    ctx.fillText(`V ${this.sessionCorrect} correctas - X ${this.sessionWrong} incorrectas`, 300, 230);
    ctx.fillText(`P ${this.sessionPoints} puntos`, 300, 260);
    
    // Category
    ctx.font = '18px Nunito, sans-serif';
    ctx.fillStyle = '#6C63FF';
    ctx.fillText(`${cat?.icon || '?'} ${catName}`, 300, 300);
    
    // Player info
    ctx.font = '16px Nunito, sans-serif';
    ctx.fillStyle = '#888';
    const _avCh = AVATAR_CHARACTERS.find(c => c.key === player.avatar);
    const _avLabel = _avCh ? _avCh.label : (player.avatar || '');
    ctx.fillText(`${_avLabel ? _avLabel + ' · ' : ''}${player.name} - Nivel ${player.level}`, 300, 330);
    
    // Call to action
    ctx.font = 'italic 14px Nunito, sans-serif';
    ctx.fillStyle = '#666';
    ctx.fillText('Descarga BibliaQuiz y pon a prueba tu conocimiento!', 300, 370);
    
    // Convert to blob and share
    try {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const file = new File([blob], 'bibliaquiz-resultado.png', { type: 'image/png' });
      
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Mi resultado en BibliaQuiz',
          text: `Obtuve ${percentage}% en BibliaQuiz!`,
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
        this.showToast('✅ Imagen descargada');
      }
    } catch (e) {
      console.error('[Share] Error sharing image:', e);
      this.shareResults(); // Fallback to text
    }
  },
  // ============================================================
  // C�DIGOS PROMOCIONALES
  // ============================================================
  PROMO_CODES: {
    // C�digos v�lidos y sus beneficios
    'VIDASINFINITAS': { type: 'infinite_lives', description: 'Vidas Infinitas' },
    'BIBLIAQUIZ2026': { type: 'infinite_lives', description: 'Vidas Infinitas' },
    'GODMODE': { type: 'infinite_lives', description: 'Vidas Infinitas' },
    'PREMIUM30': { type: 'premium_days', days: 30, description: '30 dias Premium' },
    'BIENVENIDO': { type: 'lives', amount: 5, description: '5 vidas extra' }
  },
  
  redeemPromoCode() {
    const input = document.getElementById('promo-code');
    const resultEl = document.getElementById('promo-code-result');
    if (!input || !resultEl) return;
    
    const code = input.value.trim().toUpperCase();
    resultEl.classList.remove('hidden', 'success', 'error');
    
    if (!code) {
      resultEl.textContent = 'Ingresa un codigo';
      resultEl.classList.add('error');
      return;
    }
    
    // Verificar si el codigo ya fue usado
    const usedCodes = JSON.parse(localStorage.getItem('bq_used_promo_codes') || '[]');
    if (usedCodes.includes(code)) {
      resultEl.textContent = 'Este codigo ya fue canjeado';
      resultEl.classList.add('error');
      return;
    }
    
    // Buscar el c�digo
    const promo = this.PROMO_CODES[code];
    if (!promo) {
      resultEl.textContent = 'Codigo invalido';
      resultEl.classList.add('error');
      return;
    }
    
    // Aplicar beneficio
    let message = '';
    switch (promo.type) {
      case 'infinite_lives':
        this.infiniteLives = true;
        this.saveInfiniteLives();
        localStorage.setItem('bq_promo_infinite_lives', 'true');
        this.renderHomeLives();
        message = `${promo.description} activadas!`;
        break;

      case 'premium_days': {
        const premiumExpiryKey = typeof Billing !== 'undefined' ? Billing.STORAGE_KEYS.PREMIUM_EXPIRY : 'bibliaquiz_premium_expiry';
        const premiumKey = typeof Billing !== 'undefined' ? Billing.STORAGE_KEYS.PREMIUM : 'bibliaquiz_premium';
        const currentExpiry = localStorage.getItem(premiumExpiryKey);
        const nowMs = Date.now();
        const baseMs = currentExpiry ? Math.max(new Date(currentExpiry).getTime(), nowMs) : nowMs;
        const newExpiryISO = new Date(baseMs + (promo.days * 24 * 60 * 60 * 1000)).toISOString();
        localStorage.setItem(premiumExpiryKey, newExpiryISO);
        localStorage.setItem(premiumKey, 'true');
        if (typeof Billing !== 'undefined') {
          Billing.isPremium = true;
          Billing.adsRemoved = true;
          localStorage.setItem(Billing.STORAGE_KEYS.ADS_REMOVED, 'true');
        }
        this.infiniteLives = true;
        this.saveInfiniteLives();
        localStorage.setItem('bq_promo_infinite_lives', 'true');
        this.renderHomeLives();
        message = `${promo.description} agregados!`;
        break;
      }
        
      case 'lives':
        this.lives = Math.min(this.lives + promo.amount, this.maxLives);
        this.saveLives();
        this.renderHomeLives();
        message = `${promo.description} agregadas!`;
        break;
    }
    
    // Marcar codigo como usado
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
    this.showToast('✅ Respaldo exportado correctamente', 'success');
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
    // Milestone rewards and toasts
    const milestones = { 3: 30, 7: 75, 14: 150, 30: 400, 60: 1000, 100: 2500 };
    if (milestones[streak.days]) {
      const bonus = milestones[streak.days];
      Storage.addCoins(bonus);
      setTimeout(() => {
        this.showToast(`🏆 ¡Racha de ${streak.days} días! +${bonus} monedas de regalo`, 'success');
      }, 1500);
    } else if (streak.days > 1) {
      setTimeout(() => {
        this.showToast(`🔥 ¡Racha de ${streak.days} días! ¡Sigue así!`);
      }, 1500);
    }
  },
  renderDailyStreakCard(streak) {
    const card = document.getElementById('daily-streak-card');
    if (!card || !streak || streak.days < 1) return;
    card.classList.remove('hidden');
    document.getElementById('streak-card-days').textContent = streak.days;
    const iconEl = card.querySelector('.streak-card-icon');
    if (streak.days >= 30) {
      document.getElementById('streak-card-title').textContent = '¡Racha legendaria!';
      if (iconEl) iconEl.innerHTML = ICON_SVG.crownLg;
      card.dataset.milestone = '30';
    } else if (streak.days >= 14) {
      document.getElementById('streak-card-title').textContent = '¡Racha increíble!';
      if (iconEl) iconEl.innerHTML = ICON_SVG.lightningLg;
      card.dataset.milestone = '14';
    } else if (streak.days >= 7) {
      document.getElementById('streak-card-title').textContent = '¡Racha semanal!';
      if (iconEl) iconEl.innerHTML = ICON_SVG.fireLg;
      card.dataset.milestone = '7';
    } else if (streak.days >= 3) {
      document.getElementById('streak-card-title').textContent = '¡Vas bien!';
      if (iconEl) iconEl.innerHTML = ICON_SVG.fireLg;
      card.dataset.milestone = '';
    } else {
      document.getElementById('streak-card-title').textContent = 'Racha diaria';
      if (iconEl) iconEl.innerHTML = ICON_SVG.fireLg;
      card.dataset.milestone = '';
    }
    document.getElementById('streak-card-desc').textContent =
      streak.days === 1 ? '¡Primer día! Vuelve mañana' :
      `Mejor racha: ${streak.best || streak.days} días`;
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
    // Clear any previous countdown interval
    if (this._dailyChallengeCountdownInterval) {
      clearInterval(this._dailyChallengeCountdownInterval);
      this._dailyChallengeCountdownInterval = null;
    }
    if (challenge.date === today && challenge.completed) {
      btn.classList.add('completed');
      const descEl = document.getElementById('daily-challenge-desc');
      const updateCountdown = () => {
        const now = new Date();
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);
        const diff = midnight - now;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        descEl.textContent = `✓ ${challenge.score} pts · Nuevo en ${h}h ${m}m`;
      };
      updateCountdown();
      this._dailyChallengeCountdownInterval = setInterval(updateCountdown, 60000);
    } else {
      const iconEl = btn.querySelector('.daily-icon');
      if (iconEl) iconEl.textContent = '🎯';
      document.getElementById('daily-challenge-desc').textContent =
        '10 preguntas únicas · Bonus de monedas';
    }
  },
  startDailyChallenge() {
    // VERIFICACIÓN DE AUTENTICACIÓN OBLIGATORIA
    if (!this.isUserAuthenticated()) {
      console.log('[BibliaQuiz] Acceso denegado - Usuario no autenticado');
      this.showToast('Debes iniciar sesión para jugar');
      this.showScreen('login');
      setTimeout(() => {
        const modal = document.getElementById('login-prompt-banner');
        if (modal) modal.classList.remove('hidden');
      }, 300);
      return;
    }
    
    const challenge = Storage.getDailyChallenge();
    const today = new Date().toISOString().split('T')[0];
    if (challenge.date === today && challenge.completed) {
      this.showToast('Ya completaste el desafio de hoy');
      return;
    }
    // Verificar vidas antes de iniciar
    this.loadLives();
    if (!this.infiniteLives && this.lives <= 0) {
      this.showToast('❤️ No tienes vidas. Espera a que se regeneren', 'error');
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
  // MIDNIGHT REFRESH
  // ============================================================
  scheduleMidnightRefresh() {
    if (this._midnightRefreshTimeout) clearTimeout(this._midnightRefreshTimeout);
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 5, 0);
    const ms = midnight - now;
    this._midnightRefreshTimeout = setTimeout(() => {
      this.initDailyStreak();
      this.renderDailyChallengeCard();
      this._refreshDailyContent();
      this.scheduleMidnightRefresh();
    }, ms);
  },
  _refreshDailyContent() {
    if (this.currentScreen === 'home') this.showDailyVerse();
    if (this.currentScreen === 'verses') this.renderVerses();
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
    popup.textContent = `🔥 ¡Racha de ${streak}! +50%`;
    document.body.appendChild(popup);
    // Sonido de racha
    this.playSound('streak');
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

    // Usar el m�dulo PushNotifications si est� disponible
    if (typeof PushNotifications !== 'undefined') {
      PushNotifications.requestPermission().then(result => {
        if (result.success) {
          Storage.saveNotifEnabled(true);
          document.getElementById('notif-time-setting').classList.remove('hidden');
          PushNotifications.setDailyReminder(true, 9, 0);
          this.showToast('Recordatorios activados!');
        } else {
          Storage.saveNotifEnabled(false);
          document.getElementById('setting-notifications').checked = false;
          document.getElementById('notif-time-setting').classList.add('hidden');
          this.showToast('Permiso denegado para notificaciones', 'error');
        }
      });
    } else {
      // Fallback al m�todo anterior
      Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
          Storage.saveNotifEnabled(true);
          document.getElementById('notif-time-setting').classList.remove('hidden');
          this.scheduleDailyReminder();
          this.showToast('Recordatorios activados!');
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
    const container = document.getElementById('progress-leaderboard-list');
    if (!lb || lb.length === 0) {
      container.innerHTML = '<div class="leaderboard-empty">Juega partidas para llenar el ranking</div>';
      return;
    }
    const medals = ['1ro', '2do', '3ro'];
    container.innerHTML = lb.slice(0, 10).map((entry, i) => {
      const rank = medals[i] || `${i + 1}`;
      const d = entry.date ? new Date(entry.date).toLocaleDateString('es', { day: '2-digit', month: 'short' }) : '';
      return `
        <div class="leaderboard-item">
          <span class="lb-rank">${rank}</span>
          ${(() => { const _ch = AVATAR_CHARACTERS.find(c => c.key === entry.avatar); return _ch ? `<img class="lb-avatar-db" src="${DICEBEAR_BASE}${_ch.seed}${_ch.p||''}" alt="">` : `<span class="lb-avatar">${entry.avatar || '👤'}</span>`; })()}
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
  // PROGRESS CHART (canvas bar chart - weekly/monthly progress)
  // ============================================================
  renderProgressChart(period = 'weekly') {
    const canvas = document.getElementById('progress-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Get stats based on period
    let chartData;
    if (period === 'monthly') {
      chartData = Storage.getMonthlyStats ? Storage.getMonthlyStats() : this.calculateMonthlyStats();
    } else {
      chartData = Storage.getWeeklyStats();
    }
    
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
    const totalGames = chartData.reduce((sum, d) => sum + d.games, 0);
    if (totalGames === 0) {
      ctx.fillStyle = textColor;
      ctx.font = '13px Nunito, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Juega partidas para ver tu progreso semanal', W / 2, H / 2 - 10);
      ctx.font = '11px Nunito, sans-serif';
      ctx.fillText('Aqui veras tus estadisticas diarias', W / 2, H / 2 + 15);
      return;
    }
    
    const padL = 40, padR = 16, padT = 30, padB = 45;
    const chartW = W - padL - padR;
    const chartH = H - padT - padB;
    const n = chartData.length;
    const barGroupW = chartW / n;
    
    // Find max values for scaling
    const maxGames = Math.max(...chartData.map(d => d.games), 1);
    const maxPoints = Math.max(...chartData.map(d => d.points), 10);
    
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
    chartData.forEach((day, i) => {
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
          ctx.fillText(`${day.games}`, x + barW / 2, padT + chartH - accHeight + 32);
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
    ctx.fillText('=80%', padL + 12, legendY);
    
    ctx.fillStyle = primaryColor;
    ctx.fillRect(padL + 50, legendY - 6, 8, 8);
    ctx.fillStyle = textColor;
    ctx.fillText('50-79%', padL + 62, legendY);
    
    ctx.fillStyle = accentColor;
    ctx.fillRect(padL + 115, legendY - 6, 8, 8);
    ctx.fillStyle = textColor;
    ctx.fillText('<50%', padL + 127, legendY);
    
    // Total stats
    const totalCorrect = chartData.reduce((s, d) => s + d.correct, 0);
    const totalQuestions = chartData.reduce((s, d) => s + d.total, 0);
    const periodAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const periodLabel = period === 'monthly' ? 'Mes' : 'Semana';
    
    ctx.textAlign = 'right';
    ctx.fillStyle = textColor;
    ctx.fillText(`${periodLabel}: ${periodAccuracy}% (${totalGames} partidas)`, W - padR, legendY);
  },
  
  // Calculate monthly stats for chart
  calculateMonthlyStats() {
    const history = Storage.getHistory();
    const now = new Date();
    const data = [];
    
    // Get data for last 4 weeks
    for (let week = 3; week >= 0; week--) {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - (week * 7) - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      
      const weekGames = history.filter(h => {
        const d = new Date(h.date);
        return d >= weekStart && d <= weekEnd;
      });
      
      const correct = weekGames.reduce((s, g) => s + (g.correct || 0), 0);
      const total = weekGames.reduce((s, g) => s + (g.total || 0), 0);
      const points = weekGames.reduce((s, g) => s + (g.points || 0), 0);
      
      data.push({
        label: `Sem ${4 - week}`,
        date: weekStart.toLocaleDateString('es', { day: '2-digit', month: 'short' }),
        games: weekGames.length,
        correct,
        total,
        points,
        accuracy: total > 0 ? Math.round((correct / total) * 100) : 0
      });
    }
    
    return data;
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
    const isStandalone = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return; // Ya instalada

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
      // iOS no soporta beforeinstallprompt — mostrar instrucciones manuales
      const dismissed = sessionStorage.getItem('ios_install_dismissed');
      if (!dismissed) {
        setTimeout(() => {
          document.getElementById('ios-install-banner')?.classList.remove('hidden');
        }, 3000);
      }
      document.getElementById('ios-install-dismiss')?.addEventListener('click', () => {
        document.getElementById('ios-install-banner')?.classList.add('hidden');
        sessionStorage.setItem('ios_install_dismissed', '1');
      });
      return;
    }

    // Android / Chrome
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredInstallPrompt = e;
      document.getElementById('install-banner')?.classList.remove('hidden');
    });
    document.getElementById('btn-install')?.addEventListener('click', async () => {
      if (!this.deferredInstallPrompt) return;
      this.deferredInstallPrompt.prompt();
      const { outcome } = await this.deferredInstallPrompt.userChoice;
      if (outcome === 'accepted') this.showToast('¡App instalada!');
      this.deferredInstallPrompt = null;
      document.getElementById('install-banner')?.classList.add('hidden');
    });
    document.getElementById('btn-install-dismiss')?.addEventListener('click', () => {
      document.getElementById('install-banner')?.classList.add('hidden');
    });
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

    // Manejar retorno de Stripe Checkout
    const payment = params.get('payment');
    if (payment === 'success') {
      const sessionId = params.get('session_id');
      const productId = params.get('productId');
      window.history.replaceState({}, '', window.location.pathname);
      if (sessionId && productId && typeof Billing !== 'undefined') {
        Billing.verifyStripeSession(sessionId, productId);
      }
      return;
    }
    if (payment === 'cancelled') {
      window.history.replaceState({}, '', window.location.pathname);
      this.showToast('❌ Pago cancelado');
      return;
    }

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
    const impostorCats = ['personajes','libros','historias','reyes','profetas','vida_jesus','milagros','cartas','aleatorio'];
    const impostorEntries = impostorCats.map(k => [k, CATEGORIES[k]]).filter(([,v]) => v);
    impostorEntries.forEach(([key, cat]) => {
      const card = document.createElement('div');
      card.className = `category-card ${key === 'aleatorio' ? 'random-card' : ''}`;
      card.innerHTML = `
        <div class="cat-icon">${cat.svg || cat.icon}</div>
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
        <div class="impostor-deal-waiting-icon">\u{1F464}</div>
        <h3>Jugador ${playerNum}</h3>
        <p>Solo el Jugador ${playerNum} debe ver la pantalla</p>
      </div>
      <div class="impostor-deal-progress">Jugador ${playerNum} de ${total}</div>
      <button class="btn-impostor-ready">\u{1F441} Ver mi palabra</button>
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
          <div class="impostor-deal-word is-impostor">\u{1F47A} ERES EL IMPOSTOR!</div>
          <p class="impostor-deal-memorize">No conoces la palabra. Disimula!</p>
          <button class="btn-impostor-seen">\u{2705} Entendido, pasar</button>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="impostor-deal-word-display">
          <div class="impostor-deal-word-label">Jugador ${playerNum}, tu palabra es:</div>
          <div class="impostor-deal-word">${escapeHTML(this.impostorWord)}</div>
          <p class="impostor-deal-memorize">Memoriza la palabra y pasa el dispositivo</p>
          <button class="btn-impostor-seen">\u{1F440} Ya la vi, pasar</button>
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
      timerEl.textContent = 'T: Tiempo!';
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
  },

  // =====================================================
  // MODO DELETREAR (Spelling Mode)
  // =====================================================
  
  // Estado del modo deletrear
  spellingQuestions: [],
  spellingIndex: 0,
  spellingCorrect: 0,
  spellingSkipped: 0,
  spellingPoints: 0,
  spellingCurrentAnswer: '',
  spellingUserInput: [],
  spellingShuffledLetters: [],

  // Preguntas especiales para deletrear (respuestas cortas)
  spellingQuestionPool: [
    { hint: '¿Quién construyó el arca?', answer: 'NOE', reference: 'Génesis 6:14' },
    { hint: '¿Profeta que fue tragado por un pez?', answer: 'JONAS', reference: 'Jonás 1:17' },
    { hint: '¿Primer hombre creado por Dios?', answer: 'ADAN', reference: 'Génesis 2:7' },
    { hint: '¿Rey sabio que pidió sabiduría?', answer: 'SALOMON', reference: '1 Reyes 3:9' },
    { hint: '¿Discípulo que negó a Jesús tres veces?', answer: 'PEDRO', reference: 'Mateo 26:69-75' },
    { hint: '¿Gigante derrotado por David?', answer: 'GOLIAT', reference: '1 Samuel 17:49' },
    { hint: '¿Ciudad donde nació Jesús?', answer: 'BELEN', reference: 'Mateo 2:1' },
    { hint: '¿Primer libro de la Biblia?', answer: 'GENESIS', reference: 'Génesis 1:1' },
    { hint: '¿Último libro de la Biblia?', answer: 'APOCALIPSIS', reference: 'Apocalipsis 1:1' },
    { hint: '¿Monte donde Moisés recibió los mandamientos?', answer: 'SINAI', reference: 'Éxodo 19:20' },
    { hint: '¿Mar que Moisés dividió?', answer: 'ROJO', reference: 'Éxodo 14:21' },
    { hint: '¿Discípulo que traicionó a Jesús?', answer: 'JUDAS', reference: 'Mateo 26:14-16' },
    { hint: '¿Patriarca que casi sacrifica a su hijo?', answer: 'ABRAHAM', reference: 'Génesis 22:2' },
    { hint: '¿Profeta arrebatado al cielo en carro de fuego?', answer: 'ELIAS', reference: '2 Reyes 2:11' },
    { hint: '¿Rey pastor de Israel?', answer: 'DAVID', reference: '1 Samuel 16:13' },
    { hint: '¿Madre de Jesús?', answer: 'MARIA', reference: 'Lucas 1:30-31' },
    { hint: '¿Apóstol de los gentiles?', answer: 'PABLO', reference: 'Hechos 9:15' },
    { hint: '¿Profeta del foso de los leones?', answer: 'DANIEL', reference: 'Daniel 6:16' },
    { hint: '¿Hombre fuerte que perdió su fuerza?', answer: 'SANSON', reference: 'Jueces 16:17' },
    { hint: '¿Hijo de Jacob vendido por sus hermanos?', answer: 'JOSE', reference: 'Génesis 37:28' },
    { hint: '¿Ciudad de muros que cayeron?', answer: 'JERICO', reference: 'Josué 6:20' },
    { hint: '¿Primer mártir cristiano?', answer: 'ESTEBAN', reference: 'Hechos 7:59' },
    { hint: '¿Esposa de Isaac?', answer: 'REBECA', reference: 'Génesis 24:67' },
    { hint: '¿Hermano de Moisés?', answer: 'AARON', reference: 'Éxodo 4:14' },
    { hint: '¿Rey que persiguió a David?', answer: 'SAUL', reference: '1 Samuel 18:9' },
    { hint: '¿Libro de los Salmos?', answer: 'SALMOS', reference: 'Salmo 1:1' },
    { hint: '¿Profeta del Antiguo Testamento, hijo de Amoz?', answer: 'ISAIAS', reference: 'Isaías 1:1' },
    { hint: '¿Primer rey de Israel?', answer: 'SAUL', reference: '1 Samuel 10:1' },
    { hint: '¿Padre de Juan el Bautista?', answer: 'ZACARIAS', reference: 'Lucas 1:13' },
    { hint: '¿Nombre del huerto donde Jesús oró?', answer: 'GETSEMANI', reference: 'Mateo 26:36' }
  ],

  // Iniciar modo deletrear
  startSpellingMode() {
    console.log('[Spelling] Iniciando modo deletrear');
    
    // Combinar preguntas del pool estático con preguntas de QUESTIONS_DB
    let allSpellingQuestions = [...this.spellingQuestionPool];
    
    // Convertir preguntas de QUESTIONS_DB al formato de spelling
    // Solo incluir respuestas que sean una sola palabra (nombres, lugares, etc.)
    if (typeof QUESTIONS_DB !== 'undefined' && Array.isArray(QUESTIONS_DB)) {
      const dbQuestions = QUESTIONS_DB
        .filter(q => {
          const answer = q.options[q.correct];
          // Solo incluir respuestas de una sola palabra, sin espacios, y de longitud razonable
          return answer && 
                 !answer.includes(' ') && 
                 answer.length >= 3 && 
                 answer.length <= 12 &&
                 /^[a-záéíóúñü]+$/i.test(answer);
        })
        .map(q => ({
          hint: q.question,
          answer: q.options[q.correct].toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          reference: q.reference || ''
        }));
      
      allSpellingQuestions = [...allSpellingQuestions, ...dbQuestions];
    }
    
    // Mezclar y seleccionar 10 preguntas
    const shuffled = allSpellingQuestions.sort(() => Math.random() - 0.5);
    this.spellingQuestions = shuffled.slice(0, 10);
    
    // Resetear estado
    this.spellingIndex = 0;
    this.spellingCorrect = 0;
    this.spellingSkipped = 0;
    this.spellingPoints = 0;
    this.spellingLives = 5; // 5 vidas para el modo
    
    // Mostrar pantalla
    this.showScreen('spelling');
    
    // Renderizar primera pregunta
    this.renderSpellingQuestion();
    
    // Vincular eventos
    this.bindSpellingEvents();
  },

  // Renderizar pregunta de deletrear
  renderSpellingQuestion() {
    const q = this.spellingQuestions[this.spellingIndex];
    if (!q) return this.endSpellingMode();

    // Actualizar contador y progreso
    document.getElementById('spelling-counter').textContent = `${this.spellingIndex + 1}/${this.spellingQuestions.length}`;
    document.getElementById('spelling-score').textContent = `${this.spellingPoints} pts`;
    
    // Actualizar vidas
    const livesEl = document.getElementById('spelling-lives');
    if (livesEl) {
      livesEl.textContent = '❤️'.repeat(this.spellingLives);
    }
    
    const progress = (this.spellingIndex / this.spellingQuestions.length) * 100;
    document.getElementById('spelling-progress-fill').style.width = `${progress}%`;

    // Mostrar pista y referencia
    document.getElementById('spelling-hint').textContent = q.hint;
    document.getElementById('spelling-reference').textContent = q.reference;

    // Guardar respuesta actual
    this.spellingCurrentAnswer = q.answer.toUpperCase();
    this.spellingUserInput = [];

    // Crear cajas de letras vacías (con evento click para quitar letra)
    const boxesContainer = document.getElementById('spelling-boxes');
    boxesContainer.innerHTML = '';
    
    for (let i = 0; i < this.spellingCurrentAnswer.length; i++) {
      const box = document.createElement('div');
      box.className = 'spelling-box';
      box.dataset.index = i;
      box.addEventListener('click', () => this.removeSpellingLetter(i));
      boxesContainer.appendChild(box);
    }

    // Crear teclado con letras mezcladas
    this.createSpellingKeyboard();

    // Ocultar feedback
    document.getElementById('spelling-feedback').classList.add('hidden');
  },

  // Crear teclado con letras mezcladas (2 filas)
  createSpellingKeyboard() {
    const answer = this.spellingCurrentAnswer;
    
    // Obtener letras de la respuesta
    let letters = answer.split('');
    
    // Calcular cuántas letras extra necesitamos (queremos 14-16 letras total, en 2 filas de 7-8)
    const targetTotal = 14;
    const extraNeeded = Math.max(0, targetTotal - letters.length);
    
    // Añadir letras extra aleatorias como distracción
    const extraLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const usedLetters = new Set(letters.map(l => l.toUpperCase()));
    
    // Primero añadir letras que NO están en la respuesta
    const availableExtra = extraLetters.filter(l => !usedLetters.has(l));
    
    for (let i = 0; i < extraNeeded; i++) {
      if (availableExtra.length > 0) {
        const idx = Math.floor(Math.random() * availableExtra.length);
        letters.push(availableExtra.splice(idx, 1)[0]);
      } else {
        // Si no hay suficientes letras únicas, añadir aleatorias
        letters.push(extraLetters[Math.floor(Math.random() * extraLetters.length)]);
      }
    }
    
    // Mezclar todas las letras
    this.spellingShuffledLetters = letters.sort(() => Math.random() - 0.5);
    
    // Crear teclado con 2 filas
    const keyboard = document.getElementById('spelling-keyboard');
    keyboard.innerHTML = '';
    
    // Dividir en 2 filas
    const midpoint = Math.ceil(this.spellingShuffledLetters.length / 2);
    const row1Letters = this.spellingShuffledLetters.slice(0, midpoint);
    const row2Letters = this.spellingShuffledLetters.slice(midpoint);
    
    // Fila 1
    const row1 = document.createElement('div');
    row1.className = 'spelling-keyboard-row';
    row1Letters.forEach((letter, i) => {
      const key = this.createSpellingKey(letter, i);
      row1.appendChild(key);
    });
    keyboard.appendChild(row1);
    
    // Fila 2
    const row2 = document.createElement('div');
    row2.className = 'spelling-keyboard-row';
    row2Letters.forEach((letter, i) => {
      const key = this.createSpellingKey(letter, midpoint + i);
      row2.appendChild(key);
    });
    keyboard.appendChild(row2);
  },
  
  // Crear una tecla individual
  createSpellingKey(letter, index) {
    const key = document.createElement('button');
    key.className = 'spelling-key';
    key.textContent = letter;
    key.dataset.letter = letter;
    key.dataset.index = index;
    key.addEventListener('click', () => this.handleSpellingKeyPress(letter, index, key));
    return key;
  },
  
  // Quitar letra al tocar un cuadro lleno
  removeSpellingLetter(boxIndex) {
    // Solo si hay una letra en esa posición
    if (boxIndex >= this.spellingUserInput.length) return;
    
    // Obtener la letra que se va a quitar
    const removed = this.spellingUserInput[boxIndex];
    
    // Quitar del array
    this.spellingUserInput.splice(boxIndex, 1);
    
    // Restaurar la tecla correspondiente
    const keys = document.querySelectorAll('.spelling-key');
    if (keys[removed.keyIndex]) {
      keys[removed.keyIndex].classList.remove('used');
    }
    
    // Actualizar todas las cajas
    const boxes = document.querySelectorAll('.spelling-box');
    boxes.forEach((box, i) => {
      if (i < this.spellingUserInput.length) {
        box.textContent = this.spellingUserInput[i].letter;
        box.classList.add('filled');
      } else {
        box.textContent = '';
        box.classList.remove('filled', 'correct', 'wrong');
      }
    });
    
    // Ocultar feedback si estaba visible
    document.getElementById('spelling-feedback').classList.add('hidden');
  },

  // Manejar presión de tecla
  handleSpellingKeyPress(letter, keyIndex, keyEl) {
    if (this.spellingUserInput.length >= this.spellingCurrentAnswer.length) return;
    
    // Añadir letra al input
    this.spellingUserInput.push({ letter, keyIndex });
    
    // Actualizar caja correspondiente
    const boxes = document.querySelectorAll('.spelling-box');
    const currentBox = boxes[this.spellingUserInput.length - 1];
    if (currentBox) {
      currentBox.textContent = letter;
      currentBox.classList.add('filled');
    }
    
    // Marcar tecla como usada
    keyEl.classList.add('used');
    
    // Verificar si completó la palabra
    if (this.spellingUserInput.length === this.spellingCurrentAnswer.length) {
      this.checkSpellingAnswer();
    }
  },

  // Verificar respuesta
  checkSpellingAnswer() {
    const userAnswer = this.spellingUserInput.map(u => u.letter).join('');
    const isCorrect = userAnswer === this.spellingCurrentAnswer;
    
    const boxes = document.querySelectorAll('.spelling-box');
    const feedback = document.getElementById('spelling-feedback');
    
    if (isCorrect) {
      // Marcar todas como correctas
      boxes.forEach(box => box.classList.add('correct'));
      
      // Mostrar feedback
      feedback.className = 'spelling-feedback correct';
      document.getElementById('spelling-feedback-icon').textContent = '✓';
      document.getElementById('spelling-feedback-text').textContent = '¡Correcto!';
      feedback.classList.remove('hidden');
      
      // Sumar puntos
      this.spellingCorrect++;
      this.spellingPoints += 15;
      document.getElementById('spelling-score').textContent = `${this.spellingPoints} pts`;
      
      // Monedas
      const coins = 8;
      this.sessionCoins += coins;
      Storage.addCoins(coins);
      
      // Siguiente pregunta después de delay
      setTimeout(() => this.nextSpellingQuestion(), 1500);
      
    } else {
      // INCORRECTO: Quitar una vida y dejar intentar de nuevo
      this.spellingLives--;
      
      // Actualizar display de vidas
      const livesEl = document.getElementById('spelling-lives');
      if (livesEl) {
        livesEl.textContent = '❤️'.repeat(Math.max(0, this.spellingLives));
      }
      
      // Marcar letra por letra temporalmente para mostrar cuáles estaban mal
      for (let i = 0; i < boxes.length; i++) {
        if (this.spellingUserInput[i]?.letter === this.spellingCurrentAnswer[i]) {
          boxes[i].classList.add('correct');
        } else {
          boxes[i].classList.add('wrong');
        }
      }
      
      // Mostrar feedback SIN la respuesta
      feedback.className = 'spelling-feedback wrong';
      document.getElementById('spelling-feedback-icon').textContent = '✗';
      document.getElementById('spelling-feedback-text').textContent = `¡Incorrecto! Te quedan ${this.spellingLives} vidas`;
      feedback.classList.remove('hidden');
      
      // Si se quedó sin vidas, terminar
      if (this.spellingLives <= 0) {
        document.getElementById('spelling-feedback-text').textContent = '¡Sin vidas! Game Over';
        setTimeout(() => this.endSpellingMode(), 2000);
      } else {
        // Limpiar después de un momento y dejar intentar de nuevo
        setTimeout(() => {
          this.clearSpellingInput();
        }, 1500);
      }
    }
  },

  // Siguiente pregunta
  nextSpellingQuestion() {
    this.spellingIndex++;
    
    if (this.spellingIndex >= this.spellingQuestions.length) {
      this.endSpellingMode();
    } else {
      this.renderSpellingQuestion();
    }
  },

  // Limpiar input actual
  clearSpellingInput() {
    this.spellingUserInput = [];
    
    // Limpiar cajas
    const boxes = document.querySelectorAll('.spelling-box');
    boxes.forEach(box => {
      box.textContent = '';
      box.classList.remove('filled', 'correct', 'wrong');
    });
    
    // Restaurar teclas
    const keys = document.querySelectorAll('.spelling-key');
    keys.forEach(key => key.classList.remove('used'));
    
    // Ocultar feedback
    document.getElementById('spelling-feedback').classList.add('hidden');
  },

  // Saltar pregunta
  skipSpellingQuestion() {
    this.spellingSkipped++;
    
    // Mostrar respuesta correcta
    const boxes = document.querySelectorAll('.spelling-box');
    this.spellingCurrentAnswer.split('').forEach((letter, i) => {
      if (boxes[i]) {
        boxes[i].textContent = letter;
        boxes[i].classList.add('filled');
      }
    });
    
    const feedback = document.getElementById('spelling-feedback');
    feedback.className = 'spelling-feedback wrong';
    document.getElementById('spelling-feedback-icon').textContent = '⏭️';
    document.getElementById('spelling-feedback-text').textContent = `Respuesta: ${this.spellingCurrentAnswer}`;
    feedback.classList.remove('hidden');
    
    // Siguiente pregunta
    setTimeout(() => this.nextSpellingQuestion(), 2000);
  },

  // Vincular eventos del modo deletrear
  bindSpellingEvents() {
    const clearBtn = document.getElementById('spelling-clear');
    const skipBtn = document.getElementById('spelling-skip');
    
    // Remover listeners anteriores
    clearBtn.replaceWith(clearBtn.cloneNode(true));
    skipBtn.replaceWith(skipBtn.cloneNode(true));
    
    // Añadir nuevos
    document.getElementById('spelling-clear').addEventListener('click', () => this.clearSpellingInput());
    document.getElementById('spelling-skip').addEventListener('click', () => this.skipSpellingQuestion());
  },

  // Terminar modo deletrear
  endSpellingMode() {
    console.log('[Spelling] Modo completado');
    
    // Mostrar resultados
    this.showScreen('spelling-results');
    
    // Actualizar estadísticas
    document.getElementById('spelling-stat-correct').textContent = this.spellingCorrect;
    document.getElementById('spelling-stat-skipped').textContent = this.spellingSkipped;
    document.getElementById('spelling-stat-points').textContent = this.spellingPoints;
    
    // Calcular porcentaje
    const percentage = Math.round((this.spellingCorrect / this.spellingQuestions.length) * 100);
    let message = '';
    if (percentage >= 90) message = '¡Increíble! Eres un experto bíblico.';
    else if (percentage >= 70) message = '¡Muy bien! Conoces bien la Biblia.';
    else if (percentage >= 50) message = 'Buen intento. ¡Sigue practicando!';
    else message = 'No te rindas. ¡La práctica hace al maestro!';
    
    document.getElementById('spelling-results-subtitle').textContent = message;
    
    // Vincular botones de resultados
    document.getElementById('btn-spelling-replay').onclick = () => this.startSpellingMode();
    document.getElementById('btn-spelling-home').onclick = () => this.showScreen('home');
  },

  // === TEMPORADA / PASE DE BATALLA ===
  renderSeasonScreen() {
    if (typeof SeasonSystem === 'undefined') return;
    const container = document.getElementById('season-content');
    if (!container) return;

    const missions = SeasonSystem.getMissions();

    const missionBar = (m) => {
      const pct = Math.min(100, Math.round((m.progress / m.target) * 100));
      const done = m.progress >= m.target;
      return `
        <div class="season-mission ${done && !m.claimed ? 'claimable' : ''} ${m.claimed ? 'claimed' : ''}">
          <div class="season-mission-header">
            <span class="season-mission-icon">${m.icon}</span>
            <div class="season-mission-info">
              <div class="season-mission-name">${m.name}</div>
              <div class="season-mission-desc">${m.description}</div>
            </div>
            <div class="season-mission-xp">${m.coins ? `+${m.coins} 🪙` : ''}</div>
          </div>
          <div class="season-mission-progress-bar">
            <div class="season-mission-fill" style="width:${pct}%"></div>
          </div>
          <div class="season-mission-footer">
            <span class="season-mission-count">${m.progress}/${m.target}</span>
            ${done && !m.claimed
              ? `<button class="season-claim-btn" onclick="App.claimMission('${m.id}')">Reclamar</button>`
              : m.claimed
                ? `<span class="season-claimed-badge">✅ Reclamado</span>`
                : ''}
          </div>
        </div>
      `;
    };

    container.innerHTML = missions.map(tier => {
      const isLocked = !tier.unlocked;
      const allClaimed = tier.missions.every(m => m.claimed);
      const tierBadgeClaimed = tier.badgeClaimed;
      return `
        <div class="season-missions-section ${isLocked ? 'tier-locked' : ''}" style="border-left: 4px solid ${tier.color};">
          <h4 class="season-section-title">
            ${tier.icon} ${tier.name}
            ${isLocked ? ' 🔒' : ''}
            ${allClaimed && !tierBadgeClaimed ? `<span class="tier-badge-ready">🏅 Insignia disponible</span>` : ''}
            ${tierBadgeClaimed ? `<span class="tier-badge-done">🏅 Completado</span>` : ''}
          </h4>
          ${isLocked
            ? `<div class="tier-locked-msg">Completa el nivel anterior para desbloquear</div>`
            : tier.missions.map(m => missionBar(m)).join('')
          }
        </div>
      `;
    }).join('');
  },

  claimMission(missionId) {
    if (typeof SeasonSystem === 'undefined') return;
    const result = SeasonSystem.claimMissionReward(missionId);
    if (result.success) {
      const coinsMsg = result.coins ? ` · +${result.coins} 🪙` : '';
      this.showToast(`🎉 Misión completada!${coinsMsg}`, 'success');
      this.updateCoinsDisplay();
      this.renderSeasonScreen();
    } else {
      this.showToast('❌ ' + (result.error || 'Error'), 'error');
    }
  }
};

// Hacer App accesible globalmente
window.App = App;

// --- Iniciar App ---
document.addEventListener('DOMContentLoaded', () => App.init());
