/** Efectos de sonido simples con Web Audio (sin archivos). */
let ctx: AudioContext | null = null;

export function soundEnabled(): boolean {
  try {
    return localStorage.getItem("bq_sound") !== "off";
  } catch {
    return true;
  }
}

export function setSoundEnabled(on: boolean) {
  try {
    localStorage.setItem("bq_sound", on ? "on" : "off");
  } catch {
    /* almacenamiento no disponible */
  }
}

function tone(freq: number, duration: number, delay = 0) {
  if (!soundEnabled()) return;
  try {
    ctx ??= new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.12, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch {
    /* audio no disponible */
  }
}

export const sounds = {
  correct: () => {
    tone(660, 0.12);
    tone(880, 0.18, 0.1);
  },
  wrong: () => tone(220, 0.3),
  finish: () => {
    tone(523, 0.15);
    tone(659, 0.15, 0.15);
    tone(784, 0.3, 0.3);
  },
};
