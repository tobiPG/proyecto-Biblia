// ============================================================
// BibliaQuiz - Sistema de Sonidos y Efectos
// ============================================================

const SoundManager = {
  // Estado
  enabled: true,
  volume: 0.5,
  sounds: {},
  
  // Definicion de sonidos con frecuencias para Web Audio API
  soundDefinitions: {
    correct: {
      type: 'success',
      frequencies: [523.25, 659.25, 783.99], // Do-Mi-Sol acorde mayor
      duration: 0.18,
      delay: 0.09
    },
    incorrect: {
      type: 'error',
      frequencies: [330, 220],
      duration: 0.25,
      delay: 0.18
    },
    levelUp: {
      type: 'fanfare',
      frequencies: [392, 494, 587, 659, 784, 988],
      duration: 0.13,
      delay: 0.09
    },
    achievement: {
      type: 'achievement',
      frequencies: [523, 659, 784, 1047, 1319],
      duration: 0.12,
      delay: 0.1
    },
    timerLow: {
      type: 'warning',
      frequencies: [880],
      duration: 0.07,
      delay: 0
    },
    click: {
      type: 'click',
      frequencies: [1000],
      duration: 0.04,
      delay: 0
    },
    gameStart: {
      type: 'start',
      frequencies: [330, 415, 494, 659, 784],
      duration: 0.14,
      delay: 0.11
    },
    gameOver: {
      type: 'gameover',
      frequencies: [440, 370, 311, 233],
      duration: 0.28,
      delay: 0.22
    },
    streak: {
      type: 'streak',
      frequencies: [659, 784, 988, 1319],
      duration: 0.09,
      delay: 0.07
    },
    perfect: {
      type: 'perfect',
      frequencies: [523, 659, 784, 1047, 1319, 1568],
      duration: 0.11,
      delay: 0.09
    },
    countdown: {
      type: 'tick',
      frequencies: [700],
      duration: 0.06,
      delay: 0
    },
    bonus: {
      type: 'bonus',
      frequencies: [440, 554, 659, 880],
      duration: 0.11,
      delay: 0.09
    }
  },
  
  // Contexto de audio
  audioContext: null,
  
  // Inicializar
  init() {
    // Cargar preferencias guardadas
    const savedEnabled = localStorage.getItem('soundEnabled');
    const savedVolume = localStorage.getItem('soundVolume');
    
    if (savedEnabled !== null) {
      this.enabled = savedEnabled === 'true';
    }
    if (savedVolume !== null) {
      this.volume = parseFloat(savedVolume);
    }
    
    // Crear contexto de audio (se activa con interaccion del usuario)
    this.createAudioContext();
    
    console.log('SoundManager inicializado - Sonido:', this.enabled ? 'ON' : 'OFF');
  },
  
  // Crear contexto de audio
  createAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API no soportada:', e);
    }
  },
  
  // Reanudar contexto si esta suspendido
  async resumeContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (e) {
        console.warn('No se pudo reanudar el contexto de audio:', e);
      }
    }
  },
  
  // Reproducir un sonido
  async play(soundName) {
    if (!this.enabled || !this.audioContext) return;
    
    await this.resumeContext();
    
    const soundDef = this.soundDefinitions[soundName];
    if (!soundDef) {
      console.warn('Sonido no encontrado:', soundName);
      return;
    }
    
    try {
      this.playSynthSound(soundDef);
    } catch (e) {
      console.warn('Error al reproducir sonido:', e);
    }
  },
  
  // Reproducir sonido sintetizado
  playSynthSound(soundDef) {
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    const isRich = ['success','achievement','fanfare','perfect','start','streak','bonus'].includes(soundDef.type);

    soundDef.frequencies.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      switch (soundDef.type) {
        case 'success':
        case 'achievement':
        case 'fanfare':
        case 'perfect':
        case 'streak':
        case 'bonus':
        case 'start':
          oscillator.type = 'sine';
          break;
        case 'error':
        case 'gameover':
          oscillator.type = 'sawtooth';
          break;
        case 'warning':
          oscillator.type = 'square';
          break;
        case 'click':
        case 'tick':
          oscillator.type = 'triangle';
          break;
        default:
          oscillator.type = 'sine';
      }

      const startTime = now + (index * soundDef.delay);
      const attackTime = 0.012;
      const decayTime = soundDef.duration;

      oscillator.frequency.setValueAtTime(freq, startTime);

      // Pequeño portamento ascendente en sonidos de éxito
      if (isRich) {
        oscillator.frequency.linearRampToValueAtTime(freq * 1.02, startTime + decayTime * 0.5);
      }

      const peakVol = this.volume * (isRich ? 0.28 : 0.22);
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(peakVol, startTime + attackTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + attackTime + decayTime);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(startTime);
      oscillator.stop(startTime + attackTime + decayTime + 0.05);
    });
  },
  
  // Sonidos especificos con nombres descriptivos
  playCorrect() {
    this.play('correct');
  },
  
  playIncorrect() {
    this.play('incorrect');
  },
  
  playLevelUp() {
    this.play('levelUp');
  },
  
  playAchievement() {
    this.play('achievement');
  },
  
  playTimerLow() {
    this.play('timerLow');
  },
  
  playClick() {
    this.play('click');
  },
  
  playGameStart() {
    this.play('gameStart');
  },
  
  playGameOver() {
    this.play('gameOver');
  },
  
  playStreak() {
    this.play('streak');
  },
  
  playPerfect() {
    this.play('perfect');
  },
  
  playCountdown() {
    this.play('countdown');
  },
  
  playBonus() {
    this.play('bonus');
  },
  
  // Activar/desactivar sonidos
  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('soundEnabled', this.enabled.toString());
    
    // Reproducir sonido de confirmacion si se activa
    if (this.enabled) {
      this.playClick();
    }
    
    return this.enabled;
  },
  
  // Establecer volumen (0-1)
  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, value));
    localStorage.setItem('soundVolume', this.volume.toString());
  },
  
  // Obtener estado
  isEnabled() {
    return this.enabled;
  },
  
  // Obtener volumen
  getVolume() {
    return this.volume;
  }
};

// Inicializar cuando el DOM este listo
document.addEventListener('DOMContentLoaded', () => {
  SoundManager.init();
});

// Activar contexto de audio con primera interaccion
document.addEventListener('click', () => {
  SoundManager.resumeContext();
}, { once: true });

document.addEventListener('touchstart', () => {
  SoundManager.resumeContext();
}, { once: true });

// Exponer globalmente
window.SoundManager = SoundManager;
