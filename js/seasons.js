// ============================================================
// BibliaQuiz - Misiones y Powerups
// ============================================================

// === POWERUPS DISPONIBLES ===
const POWERUPS = {
  shield: {
    id: 'shield', name: 'Escudo Divino', icon: '🛡️',
    description: 'Inmunidad: no pierdes vidas por 5 minutos',
    duration: 5 * 60 * 1000, priceCoins: 1500
  },
  reveal: {
    id: 'reveal', name: 'Revelación', icon: '💡',
    description: 'Muestra la respuesta correcta directamente',
    uses: 1, priceCoins: 600
  },
  doubleCoins: {
    id: 'doubleCoins', name: 'Bendición Doble', icon: '✨',
    description: 'Duplica las monedas ganadas por 10 minutos',
    duration: 10 * 60 * 1000, priceCoins: 800
  },
  extraTime: {
    id: 'extraTime', name: 'Tiempo Extra', icon: '⏳',
    description: 'Añade 15 segundos al temporizador',
    uses: 1, priceCoins: 300
  },
  fiftyFifty: {
    id: 'fiftyFifty', name: '50/50', icon: '🎯',
    description: 'Elimina 2 respuestas incorrectas',
    uses: 1, priceCoins: 450
  }
};

// === MISIONES PERMANENTES (5 NIVELES PROGRESIVOS) ===
const MISSION_TIERS = [
  {
    id: 'principiante', name: 'Principiante', icon: '🌱', color: '#4CAF50',
    badgeId: 'mission_principiante',
    missions: [
      { id: 'm_p1', name: 'Primer Paso',      description: 'Juega 5 partidas',                       type: 'games',        target: 5,   coins: 50,  icon: '🎮' },
      { id: 'm_p2', name: 'Buen Estudiante',  description: 'Responde 25 preguntas correctamente',     type: 'correct',      target: 25,  coins: 50,  icon: '📖' },
      { id: 'm_p3', name: 'En Racha',         description: 'Consigue una racha de 3 respuestas',      type: 'streak',       target: 3,   coins: 75,  icon: '🔥' },
      { id: 'm_p4', name: 'Debut Ranked',     description: 'Juega 1 partida Ranked',                  type: 'ranked',       target: 1,   coins: 100, icon: '⚔️' },
    ]
  },
  {
    id: 'estudioso', name: 'Estudioso', icon: '📚', color: '#2196F3',
    badgeId: 'mission_estudioso',
    missions: [
      { id: 'm_e1', name: 'Dedicado',          description: 'Juega 20 partidas',                      type: 'games',        target: 20,  coins: 125, icon: '🎮' },
      { id: 'm_e2', name: 'Multitema',         description: 'Juega en 3 categorías distintas',         type: 'categories',   target: 3,   coins: 100, icon: '🗺️' },
      { id: 'm_e3', name: 'Primera Perfección',description: 'Consigue una partida 10/10',              type: 'perfect',      target: 1,   coins: 175, icon: '💯' },
      { id: 'm_e4', name: 'Trofeos Iniciales', description: 'Llega a 200 trofeos en Ranked',           type: 'trophies_max', target: 200, coins: 125, icon: '🏆' },
      { id: 'm_e5', name: 'Racha de 5',        description: 'Consigue una racha de 5 respuestas',      type: 'streak',       target: 5,   coins: 100, icon: '🔥' },
    ]
  },
  {
    id: 'guerrero', name: 'Guerrero', icon: '⚔️', color: '#FF9800',
    badgeId: 'mission_guerrero',
    missions: [
      { id: 'm_g1', name: 'Veterano',          description: 'Juega 50 partidas',                      type: 'games',        target: 50,  coins: 250, icon: '🎮' },
      { id: 'm_g2', name: 'Rival Ranked',      description: 'Gana 5 partidas Ranked',                 type: 'ranked_wins',  target: 5,   coins: 225, icon: '🏅' },
      { id: 'm_g3', name: 'Trofeos de Plata',  description: 'Llega a 500 trofeos en Ranked',           type: 'trophies_max', target: 500, coins: 250, icon: '🥈' },
      { id: 'm_g4', name: 'Respondedor',       description: 'Responde 200 preguntas correctamente',    type: 'correct',      target: 200, coins: 200, icon: '📖' },
      { id: 'm_g5', name: 'En Llamas',         description: 'Consigue una racha de 8 respuestas',      type: 'streak',       target: 8,   coins: 175, icon: '🔥' },
    ]
  },
  {
    id: 'campeon', name: 'Campeón', icon: '🏆', color: '#9C27B0',
    badgeId: 'mission_campeon',
    missions: [
      { id: 'm_c1', name: 'Centenario',        description: 'Juega 100 partidas',                     type: 'games',        target: 100, coins: 400, icon: '🎮' },
      { id: 'm_c2', name: 'Gladiador',         description: 'Gana 20 partidas Ranked',                type: 'ranked_wins',  target: 20,  coins: 375, icon: '🏅' },
      { id: 'm_c3', name: 'Trofeos de Oro',    description: 'Llega a 1500 trofeos en Ranked',          type: 'trophies_max', target: 1500,coins: 400, icon: '🥇' },
      { id: 'm_c4', name: 'Explorador Total',  description: 'Juega en las 9 categorías',               type: 'categories',   target: 9,   coins: 325, icon: '🗺️' },
      { id: 'm_c5', name: 'Triple Perfección', description: 'Consigue 5 partidas perfectas',           type: 'perfect',      target: 5,   coins: 425, icon: '💯' },
    ]
  },
  {
    id: 'maestro', name: 'Maestro', icon: '👑', color: '#F44336',
    badgeId: 'mission_maestro',
    missions: [
      { id: 'm_m1', name: 'Leyenda',           description: 'Juega 200 partidas',                     type: 'games',        target: 200, coins: 750, icon: '🎮' },
      { id: 'm_m2', name: 'Conquistador',      description: 'Gana 50 partidas Ranked',                type: 'ranked_wins',  target: 50,  coins: 650, icon: '🏅' },
      { id: 'm_m3', name: 'Gran Trofeo',       description: 'Llega a 3000 trofeos en Ranked',          type: 'trophies_max', target: 3000,coins: 700, icon: '🏆' },
      { id: 'm_m4', name: 'Racha Épica',       description: 'Consigue una racha de 15 respuestas',     type: 'streak',       target: 15,  coins: 550, icon: '🔥' },
      { id: 'm_m5', name: 'Maestro Absoluto',  description: 'Consigue 20 partidas perfectas',          type: 'perfect',      target: 20,  coins: 750, icon: '💯' },
    ]
  }
];
window.MISSION_TIERS = MISSION_TIERS;

// === SISTEMA DE MISIONES Y POWERUPS ===
const SeasonSystem = {
  STORAGE_KEYS: {
    MISSIONS:       'bibliaquiz_missions',
    POWERUPS:       'bibliaquiz_powerups',
    ACTIVE_EFFECTS: 'bibliaquiz_active_effects'
  },

  // === POWERUPS ===
  getPowerups() {
    const data = localStorage.getItem(this.STORAGE_KEYS.POWERUPS);
    return data ? JSON.parse(data) : {};
  },

  savePowerups(powerups) {
    localStorage.setItem(this.STORAGE_KEYS.POWERUPS, JSON.stringify(powerups));
  },

  addPowerup(powerupId, amount = 1) {
    const powerups = this.getPowerups();
    const current = powerups[powerupId] || 0;
    const maxPowerups = 5;
    const newAmount = Math.min(current + amount, maxPowerups);
    powerups[powerupId] = newAmount;
    this.savePowerups(powerups);
    return powerups;
  },

  usePowerup(powerupId) {
    const powerups = this.getPowerups();
    if (!powerups[powerupId] || powerups[powerupId] <= 0) {
      return { success: false, error: 'No tienes este powerup' };
    }
    powerups[powerupId]--;
    this.savePowerups(powerups);
    const powerupDef = POWERUPS[powerupId];
    if (powerupDef && powerupDef.duration) {
      this.activateTimedEffect(powerupId, powerupDef.duration);
    }
    return { success: true, remaining: powerups[powerupId] };
  },

  consumePowerup(powerupId) {
    const inventory = this.getPowerups();
    if (inventory[powerupId] && inventory[powerupId] > 0) {
      inventory[powerupId]--;
      this.savePowerups(inventory);
      return true;
    }
    return false;
  },

  getPowerupInventory() { return this.getPowerups(); },

  buyPowerup(powerupId, withCoins = true) {
    const powerup = POWERUPS[powerupId];
    if (!powerup) return { success: false, error: 'Powerup no encontrado' };
    const powerups = this.getPowerups();
    const current = powerups[powerupId] || 0;
    if (current >= 5) return { success: false, error: 'Ya tienes el máximo (5) de este comodín' };
    if (withCoins) {
      const coins = Storage.getCoins();
      if (coins.total < powerup.priceCoins) return { success: false, error: 'No tienes suficientes monedas' };
      Storage.spendCoins(powerup.priceCoins);
    }
    this.addPowerup(powerupId, 1);
    return { success: true, powerup, message: `Compraste ${powerup.name}` };
  },

  // === EFECTOS CON TIEMPO ===
  getActiveEffects() {
    const data = localStorage.getItem(this.STORAGE_KEYS.ACTIVE_EFFECTS);
    if (!data) return {};
    const effects = JSON.parse(data);
    const now = Date.now();
    const active = {};
    for (const [id, expiry] of Object.entries(effects)) {
      if (expiry > now) active[id] = expiry;
    }
    localStorage.setItem(this.STORAGE_KEYS.ACTIVE_EFFECTS, JSON.stringify(active));
    return active;
  },

  activateTimedEffect(effectId, duration) {
    const effects = this.getActiveEffects();
    effects[effectId] = Date.now() + duration;
    localStorage.setItem(this.STORAGE_KEYS.ACTIVE_EFFECTS, JSON.stringify(effects));
  },

  isEffectActive(effectId) {
    const effects = this.getActiveEffects();
    return !!(effects[effectId] && effects[effectId] > Date.now());
  },

  getEffectTimeRemaining(effectId) {
    const effects = this.getActiveEffects();
    if (!effects[effectId]) return 0;
    return Math.max(0, effects[effectId] - Date.now());
  },

  activatePowerup(powerupId) {
    const inventory = this.getPowerups();
    if (!inventory[powerupId] || inventory[powerupId] <= 0) return { success: false, message: 'No tienes este potenciador' };
    const powerup = POWERUPS[powerupId];
    if (!powerup || !powerup.duration) return { success: false, message: 'Potenciador inválido' };
    inventory[powerupId]--;
    this.savePowerups(inventory);
    this.activateTimedEffect(powerupId, powerup.duration);
    return { success: true, message: `${powerup.name} activado por ${Math.floor(powerup.duration / 60000)} minutos` };
  },

  hasShieldActive()       { return this.isEffectActive('shield'); },
  hasDoubleCoinsActive()  { return this.isEffectActive('doubleCoins'); },
  hasExtraTimeActive()    { return this.isEffectActive('extraTime'); },
  getShieldRemainingTime()       { return this.getEffectTimeRemaining('shield'); },
  getDoubleCoinsRemainingTime()  { return this.getEffectTimeRemaining('doubleCoins'); },
  getExtraTimeRemainingTime()    { return this.getEffectTimeRemaining('extraTime'); },

  // === MISIONES PERMANENTES ===
  getMissionData() {
    const raw = localStorage.getItem(this.STORAGE_KEYS.MISSIONS);
    if (raw) {
      try {
        const d = JSON.parse(raw);
        if (d.daily || d.weekly) {
          return this._buildFreshMissionData(typeof Storage !== 'undefined' ? Storage.getStats() : {});
        }
        if (!d.progress) d.progress = this._emptyProgress();
        if (!d.claimed) d.claimed = [];
        if (!d.unlockedTiers) d.unlockedTiers = ['principiante'];
        if (!d.claimedTierBadges) d.claimedTierBadges = [];
        return d;
      } catch {}
    }
    return this._buildFreshMissionData(typeof Storage !== 'undefined' ? Storage.getStats() : {});
  },

  _emptyProgress() {
    return { games: 0, correct: 0, ranked: 0, ranked_wins: 0, perfect: 0, streak: 0, trophies_max: 0, categories: [] };
  },

  _buildFreshMissionData(stats) {
    const d = {
      progress: {
        games:        stats.totalGames   || 0,
        correct:      stats.totalCorrect || 0,
        ranked:       0,
        ranked_wins:  0,
        perfect:      stats.perfectGames || 0,
        streak:       stats.bestStreak   || 0,
        trophies_max: 0,
        categories:   Array.isArray(stats.categoriesSet) ? [...stats.categoriesSet] : []
      },
      claimed: [],
      unlockedTiers: ['principiante'],
      claimedTierBadges: []
    };
    localStorage.setItem(this.STORAGE_KEYS.MISSIONS, JSON.stringify(d));
    return d;
  },

  saveMissionData(d) {
    localStorage.setItem(this.STORAGE_KEYS.MISSIONS, JSON.stringify(d));
  },

  getMissions() {
    const d = this.getMissionData();
    const p = d.progress;
    return MISSION_TIERS.map(tier => ({
      ...tier,
      unlocked: d.unlockedTiers.includes(tier.id),
      badgeClaimed: d.claimedTierBadges.includes(tier.id),
      missions: tier.missions.map(m => {
        const raw = m.type === 'categories' ? (p.categories || []).length : (p[m.type] || 0);
        return { ...m, progress: Math.min(raw, m.target), claimed: d.claimed.includes(m.id), done: raw >= m.target };
      })
    }));
  },

  updateMissionProgress(type, value) {
    const d = this.getMissionData();
    const p = d.progress;
    const wasComplete = {};
    MISSION_TIERS.forEach(tier => tier.missions.forEach(m => {
      const v = m.type === 'categories' ? (p.categories || []).length : (p[m.type] || 0);
      wasComplete[m.id] = v >= m.target;
    }));
    if (type === 'categories') {
      if (!Array.isArray(p.categories)) p.categories = [];
      if (value && !p.categories.includes(value)) p.categories.push(value);
    } else if (type === 'streak' || type === 'trophies_max') {
      p[type] = Math.max(p[type] || 0, Number(value) || 0);
    } else {
      p[type] = (p[type] || 0) + (Number(value) || 0);
    }
    d.progress = p;
    this.saveMissionData(d);
    MISSION_TIERS.forEach(tier => {
      if (!d.unlockedTiers.includes(tier.id)) return;
      tier.missions.forEach(m => {
        if (d.claimed.includes(m.id) || wasComplete[m.id]) return;
        const v = m.type === 'categories' ? (p.categories || []).length : (p[m.type] || 0);
        if (v >= m.target) window.App?.showToast?.(`✅ ¡Misión lista: ${m.name}! Reclama tu recompensa`, 'success');
      });
    });
    this._checkTierUnlocks(d);
    return d;
  },

  claimMissionReward(missionId) {
    const d = this.getMissionData();
    const allMissions = MISSION_TIERS.flatMap(t => t.missions);
    const mission = allMissions.find(m => m.id === missionId);
    if (!mission) return { success: false, error: 'Misión no encontrada' };
    if (d.claimed.includes(missionId)) return { success: false, error: 'Ya reclamada' };
    const raw = mission.type === 'categories'
      ? (d.progress.categories || []).length
      : (d.progress[mission.type] || 0);
    if (raw < mission.target) return { success: false, error: 'Misión no completada' };
    if (typeof Storage !== 'undefined') Storage.addCoins(mission.coins);
    d.claimed.push(missionId);
    this.saveMissionData(d);
    this._checkTierCompletion(d);
    this._checkTierUnlocks(d);
    return { success: true, coins: mission.coins };
  },

  _checkTierUnlocks(d) {
    const order = ['principiante', 'estudioso', 'guerrero', 'campeon', 'maestro'];
    for (let i = 0; i < order.length - 1; i++) {
      const nextId = order[i + 1];
      if (d.unlockedTiers.includes(nextId)) continue;
      const tier = MISSION_TIERS.find(t => t.id === order[i]);
      if (tier && tier.missions.every(m => d.claimed.includes(m.id))) {
        d.unlockedTiers.push(nextId);
        this.saveMissionData(d);
        const next = MISSION_TIERS.find(t => t.id === nextId);
        window.App?.showToast?.(`🔓 ¡Categoría desbloqueada: ${next?.icon} ${next?.name}!`, 'success');
      }
    }
  },

  _checkTierCompletion(d) {
    if (!d.claimedTierBadges) d.claimedTierBadges = [];
    MISSION_TIERS.forEach(tier => {
      if (d.claimedTierBadges.includes(tier.id) || !d.unlockedTiers.includes(tier.id)) return;
      if (!tier.missions.every(m => d.claimed.includes(m.id))) return;
      d.claimedTierBadges.push(tier.id);
      this.saveMissionData(d);
      if (typeof Storage !== 'undefined') {
        const badges = Storage.getBadges();
        if (!badges.includes(tier.badgeId)) { badges.push(tier.badgeId); Storage.saveBadges(badges); }
      }
      window.App?.showToast?.(`🏅 ¡Insignia desbloqueada: ${tier.icon} ${tier.name}!`, 'success');
    });
  }
};

window.POWERUPS = POWERUPS;
window.SeasonSystem = SeasonSystem;

console.log('[Misiones] Sistema de misiones cargado');
