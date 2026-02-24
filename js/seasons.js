// ============================================================
// BibliaQuiz - Sistema de Temporadas y Pase de Batalla
// ============================================================

// === POWERUPS DISPONIBLES ===
const POWERUPS = {
  shield: {
    id: 'shield',
    name: 'Escudo Divino',
    icon: '🛡️',
    description: 'Inmunidad: no pierdes vidas por 5 minutos',
    duration: 5 * 60 * 1000, // 5 minutos en ms
    priceCoins: 1500, // Subido de 500
    priceUSD: 2.99
  },
  reveal: {
    id: 'reveal',
    name: 'Revelación',
    icon: '💡',
    description: 'Muestra la respuesta correcta directamente',
    uses: 1, // Se consume al usar
    priceCoins: 600, // Subido de 200
    priceUSD: 1.49
  },
  doubleCoins: {
    id: 'doubleCoins',
    name: 'Bendición Doble',
    icon: '✨',
    description: 'Duplica las monedas ganadas por 10 minutos',
    duration: 10 * 60 * 1000,
    priceCoins: 800, // Subido de 300
    priceUSD: 1.99
  },
  extraTime: {
    id: 'extraTime',
    name: 'Tiempo Extra',
    icon: '⏳',
    description: 'Añade 15 segundos al temporizador',
    uses: 1,
    priceCoins: 300, // Subido de 100
    priceUSD: 0.79
  },
  fiftyFifty: {
    id: 'fiftyFifty',
    name: '50/50',
    icon: '🎯',
    description: 'Elimina 2 respuestas incorrectas',
    uses: 1,
    priceCoins: 450, // Subido de 150
    priceUSD: 0.99
  }
};

// === DEFINICIÓN DE TEMPORADAS ===
const SEASONS = {
  1: {
    id: 1,
    name: 'Los Patriarcas',
    icon: '⛺',
    theme: 'patriarcas',
    startDate: '2026-03-01',
    endDate: '2026-05-31',
    color: '#8B4513'
  },
  2: {
    id: 2,
    name: 'El Éxodo',
    icon: '🌊',
    theme: 'exodo',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    color: '#1E90FF'
  },
  3: {
    id: 3,
    name: 'Los Profetas',
    icon: '📜',
    theme: 'profetas',
    startDate: '2026-09-01',
    endDate: '2026-11-30',
    color: '#9400D3'
  },
  4: {
    id: 4,
    name: 'El Nuevo Pacto',
    icon: '✝️',
    theme: 'nuevo_pacto',
    startDate: '2026-12-01',
    endDate: '2027-02-28',
    color: '#FFD700'
  }
};

// === PASE DE BATALLA (50 NIVELES) ===
const BATTLE_PASS_REWARDS = [
  // Nivel 1-10
  { level: 1, free: { type: 'coins', amount: 50 }, premium: { type: 'coins', amount: 100 } },
  { level: 2, free: { type: 'coins', amount: 30 }, premium: { type: 'powerup', item: 'fiftyFifty', amount: 2 } },
  { level: 3, free: { type: 'powerup', item: 'extraTime', amount: 1 }, premium: { type: 'coins', amount: 75 } },
  { level: 4, free: { type: 'coins', amount: 40 }, premium: { type: 'powerup', item: 'reveal', amount: 1 } },
  { level: 5, free: { type: 'life', amount: 1 }, premium: { type: 'avatar', item: 'pilgrim' } },
  { level: 6, free: { type: 'coins', amount: 60 }, premium: { type: 'coins', amount: 150 } },
  { level: 7, free: { type: 'powerup', item: 'fiftyFifty', amount: 1 }, premium: { type: 'powerup', item: 'shield', amount: 1 } },
  { level: 8, free: { type: 'coins', amount: 50 }, premium: { type: 'coins', amount: 100 } },
  { level: 9, free: { type: 'powerup', item: 'extraTime', amount: 2 }, premium: { type: 'powerup', item: 'reveal', amount: 2 } },
  { level: 10, free: { type: 'coins', amount: 100 }, premium: { type: 'frame', item: 'disciple' } },
  
  // Nivel 11-20
  { level: 11, free: { type: 'coins', amount: 60 }, premium: { type: 'coins', amount: 150 } },
  { level: 12, free: { type: 'powerup', item: 'fiftyFifty', amount: 2 }, premium: { type: 'powerup', item: 'shield', amount: 1 } },
  { level: 13, free: { type: 'coins', amount: 70 }, premium: { type: 'coins', amount: 175 } },
  { level: 14, free: { type: 'life', amount: 1 }, premium: { type: 'powerup', item: 'reveal', amount: 2 } },
  { level: 15, free: { type: 'powerup', item: 'fiftyFifty', amount: 1 }, premium: { type: 'coins', amount: 200 } },
  { level: 16, free: { type: 'coins', amount: 80 }, premium: { type: 'powerup', item: 'doubleCoins', amount: 1 } },
  { level: 17, free: { type: 'powerup', item: 'extraTime', amount: 2 }, premium: { type: 'coins', amount: 150 } },
  { level: 18, free: { type: 'coins', amount: 90 }, premium: { type: 'powerup', item: 'shield', amount: 2 } },
  { level: 19, free: { type: 'powerup', item: 'fiftyFifty', amount: 2 }, premium: { type: 'powerup', item: 'reveal', amount: 3 } },
  { level: 20, free: { type: 'coins', amount: 200 }, premium: { type: 'title', item: 'faithful_follower' } },
  
  // Nivel 21-30
  { level: 21, free: { type: 'coins', amount: 100 }, premium: { type: 'coins', amount: 250 } },
  { level: 22, free: { type: 'powerup', item: 'extraTime', amount: 3 }, premium: { type: 'powerup', item: 'shield', amount: 2 } },
  { level: 23, free: { type: 'coins', amount: 110 }, premium: { type: 'coins', amount: 275 } },
  { level: 24, free: { type: 'life', amount: 2 }, premium: { type: 'powerup', item: 'reveal', amount: 3 } },
  { level: 25, free: { type: 'life', amount: 2 }, premium: { type: 'avatar', item: 'fisherman' } },
  { level: 26, free: { type: 'coins', amount: 120 }, premium: { type: 'coins', amount: 300 } },
  { level: 27, free: { type: 'powerup', item: 'fiftyFifty', amount: 3 }, premium: { type: 'powerup', item: 'doubleCoins', amount: 2 } },
  { level: 28, free: { type: 'coins', amount: 130 }, premium: { type: 'coins', amount: 325 } },
  { level: 29, free: { type: 'powerup', item: 'extraTime', amount: 3 }, premium: { type: 'powerup', item: 'shield', amount: 3 } },
  { level: 30, free: { type: 'coins', amount: 300 }, premium: { type: 'effect', item: 'divine_light' } },
  
  // Nivel 31-40
  { level: 31, free: { type: 'coins', amount: 140 }, premium: { type: 'coins', amount: 350 } },
  { level: 32, free: { type: 'powerup', item: 'fiftyFifty', amount: 3 }, premium: { type: 'powerup', item: 'reveal', amount: 4 } },
  { level: 33, free: { type: 'coins', amount: 150 }, premium: { type: 'coins', amount: 375 } },
  { level: 34, free: { type: 'life', amount: 2 }, premium: { type: 'powerup', item: 'shield', amount: 3 } },
  { level: 35, free: { type: 'powerup', item: 'reveal', amount: 1 }, premium: { type: 'coins', amount: 500 } },
  { level: 36, free: { type: 'coins', amount: 160 }, premium: { type: 'powerup', item: 'doubleCoins', amount: 3 } },
  { level: 37, free: { type: 'powerup', item: 'extraTime', amount: 4 }, premium: { type: 'coins', amount: 400 } },
  { level: 38, free: { type: 'coins', amount: 170 }, premium: { type: 'powerup', item: 'reveal', amount: 5 } },
  { level: 39, free: { type: 'powerup', item: 'fiftyFifty', amount: 4 }, premium: { type: 'powerup', item: 'shield', amount: 4 } },
  { level: 40, free: { type: 'coins', amount: 500 }, premium: { type: 'frame', item: 'fire_animated' } },
  
  // Nivel 41-50
  { level: 41, free: { type: 'coins', amount: 180 }, premium: { type: 'coins', amount: 450 } },
  { level: 42, free: { type: 'powerup', item: 'extraTime', amount: 5 }, premium: { type: 'powerup', item: 'reveal', amount: 5 } },
  { level: 43, free: { type: 'coins', amount: 190 }, premium: { type: 'coins', amount: 475 } },
  { level: 44, free: { type: 'life', amount: 3 }, premium: { type: 'powerup', item: 'shield', amount: 5 } },
  { level: 45, free: { type: 'life', amount: 3 }, premium: { type: 'title', item: 'servant_of_god' } },
  { level: 46, free: { type: 'coins', amount: 200 }, premium: { type: 'coins', amount: 500 } },
  { level: 47, free: { type: 'powerup', item: 'fiftyFifty', amount: 5 }, premium: { type: 'powerup', item: 'doubleCoins', amount: 5 } },
  { level: 48, free: { type: 'coins', amount: 250 }, premium: { type: 'coins', amount: 600 } },
  { level: 49, free: { type: 'powerup', item: 'reveal', amount: 2 }, premium: { type: 'powerup', item: 'shield', amount: 5 } },
  { level: 50, free: { type: 'coins', amount: 1000, bonus: 'season_frame' }, premium: { type: 'legendary', item: 'champion_pack' } }
];

// === MISIONES (DIARIAS Y SEMANALES) ===
const MISSIONS = {
  daily: [
    { id: 'daily_win_3', name: 'Victoria Triple', description: 'Gana 3 partidas', target: 3, xp: 100, icon: '🏆' },
    { id: 'daily_answer_20', name: 'Estudioso', description: 'Responde 20 preguntas', target: 20, xp: 50, icon: '📖' },
    { id: 'daily_streak_5', name: 'En Racha', description: 'Consigue racha de 5', target: 5, xp: 75, icon: '🔥' },
    { id: 'daily_ranked', name: 'Competidor', description: 'Juega una partida Ranked', target: 1, xp: 100, icon: '⚔️' },
    { id: 'daily_perfect', name: 'Perfección', description: 'Consigue 10/10 en una partida', target: 1, xp: 150, icon: '💯' },
    { id: 'daily_category', name: 'Explorador', description: 'Juega en 2 categorías distintas', target: 2, xp: 60, icon: '🗺️' }
  ],
  weekly: [
    { id: 'weekly_win_10', name: 'Campeón Semanal', description: 'Gana 10 partidas Ranked', target: 10, xp: 500, icon: '🏅' },
    { id: 'weekly_categories', name: 'Maestro de Categorías', description: 'Juega en 5 categorías', target: 5, xp: 300, icon: '📚' },
    { id: 'weekly_trophies', name: 'Escalador', description: 'Consigue 500 trofeos', target: 500, xp: 400, icon: '🏆' },
    { id: 'weekly_streak_10', name: 'Imparable', description: 'Racha de 10 correctas', target: 10, xp: 350, icon: '⚡' },
    { id: 'weekly_answer_100', name: 'Dedicación', description: 'Responde 100 preguntas', target: 100, xp: 250, icon: '✏️' }
  ]
};

// === RECOMPENSAS POR RANGO AL FINAL DE TEMPORADA ===
const SEASON_RANK_REWARDS = {
  bronce: { 
    free: { coins: 100, frame: 'bronze_basic' }, 
    premium: { coins: 300 } 
  },
  plata: { 
    free: { coins: 300, frame: 'silver_basic' }, 
    premium: { coins: 800, avatar: 'silver_warrior' } 
  },
  oro: { 
    free: { coins: 600, frame: 'gold_basic' }, 
    premium: { coins: 1600, avatar: 'gold_champion' } 
  },
  platino: { 
    free: { coins: 1000, frame: 'platinum_basic', title: 'platinum_player' }, 
    premium: { coins: 3000, effect: 'platinum_glow' } 
  },
  diamante: { 
    free: { coins: 2000, frame: 'diamond_basic', title: 'diamond_legend' }, 
    premium: { coins: 7000, avatar: 'diamond_legend' } 
  },
  maestro: { 
    free: { coins: 5000, frame: 'master_animated', title: 'grand_master' }, 
    premium: { coins: 15000, fullPack: true } 
  }
};

// === AVATARES DESBLOQUEABLES ===
const AVATARS = {
  pilgrim: { id: 'pilgrim', name: 'Peregrino', icon: '🚶', rarity: 'common' },
  fisherman: { id: 'fisherman', name: 'Pescador', icon: '🎣', rarity: 'rare' },
  shepherd: { id: 'shepherd', name: 'Pastor', icon: '🐑', rarity: 'common' },
  prophet: { id: 'prophet', name: 'Profeta', icon: '📜', rarity: 'epic' },
  king: { id: 'king', name: 'Rey', icon: '👑', rarity: 'legendary' },
  silver_warrior: { id: 'silver_warrior', name: 'Guerrero de Plata', icon: '⚔️', rarity: 'rare' },
  gold_champion: { id: 'gold_champion', name: 'Campeón Dorado', icon: '🏆', rarity: 'epic' },
  diamond_legend: { id: 'diamond_legend', name: 'Leyenda Diamante', icon: '💎', rarity: 'legendary' }
};

// === MARCOS DE PERFIL ===
const FRAMES = {
  disciple: { id: 'disciple', name: 'Discípulo', color: '#4CAF50', rarity: 'common' },
  bronze_basic: { id: 'bronze_basic', name: 'Bronce', color: '#CD7F32', rarity: 'common' },
  silver_basic: { id: 'silver_basic', name: 'Plata', color: '#C0C0C0', rarity: 'rare' },
  gold_basic: { id: 'gold_basic', name: 'Oro', color: '#FFD700', rarity: 'epic' },
  platinum_basic: { id: 'platinum_basic', name: 'Platino', color: '#00CED1', rarity: 'epic' },
  diamond_basic: { id: 'diamond_basic', name: 'Diamante', color: '#B9F2FF', rarity: 'legendary' },
  fire_animated: { id: 'fire_animated', name: 'Fuego', color: '#FF4500', animated: true, rarity: 'legendary' },
  master_animated: { id: 'master_animated', name: 'Maestro', color: '#9400D3', animated: true, rarity: 'mythic' }
};

// === TÍTULOS ===
const TITLES = {
  faithful_follower: { id: 'faithful_follower', name: 'Seguidor Fiel', rarity: 'rare' },
  servant_of_god: { id: 'servant_of_god', name: 'Siervo de Dios', rarity: 'epic' },
  platinum_player: { id: 'platinum_player', name: 'Jugador Platino', rarity: 'epic' },
  diamond_legend: { id: 'diamond_legend', name: 'Leyenda Diamante', rarity: 'legendary' },
  grand_master: { id: 'grand_master', name: 'Gran Maestro', rarity: 'mythic' }
};

// === SISTEMA DE TEMPORADAS ===
const SeasonSystem = {
  STORAGE_KEYS: {
    SEASON_DATA: 'bibliaquiz_season',
    BATTLE_PASS: 'bibliaquiz_battlepass',
    MISSIONS: 'bibliaquiz_missions',
    POWERUPS: 'bibliaquiz_powerups',
    COSMETICS: 'bibliaquiz_cosmetics',
    ACTIVE_EFFECTS: 'bibliaquiz_active_effects'
  },

  // Obtener temporada actual
  getCurrentSeason() {
    const now = new Date();
    for (const [id, season] of Object.entries(SEASONS)) {
      const start = new Date(season.startDate);
      const end = new Date(season.endDate);
      end.setHours(23, 59, 59);
      if (now >= start && now <= end) {
        return season;
      }
    }
    // Si no hay temporada activa, devolver la primera
    return SEASONS[1];
  },

  // Días restantes de la temporada
  getDaysRemaining() {
    const season = this.getCurrentSeason();
    const end = new Date(season.endDate);
    end.setHours(23, 59, 59);
    const now = new Date();
    const diff = end - now;
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  },

  // === PASE DE BATALLA ===
  getBattlePassData() {
    const data = localStorage.getItem(this.STORAGE_KEYS.BATTLE_PASS);
    if (data) return JSON.parse(data);
    return {
      seasonId: this.getCurrentSeason().id,
      level: 1,
      xp: 0,
      isPremium: false,
      claimedRewards: { free: [], premium: [] }
    };
  },

  saveBattlePassData(data) {
    localStorage.setItem(this.STORAGE_KEYS.BATTLE_PASS, JSON.stringify(data));
  },

  // XP necesario por nivel
  getXPForLevel(level) {
    return 500 + (level - 1) * 50; // 500, 550, 600, 650...
  },

  // Añadir XP al pase
  addBattlePassXP(amount) {
    const data = this.getBattlePassData();
    data.xp += amount;
    
    // Subir de nivel si es necesario
    while (data.level < 50 && data.xp >= this.getXPForLevel(data.level)) {
      data.xp -= this.getXPForLevel(data.level);
      data.level++;
      console.log('[Season] Subiste al nivel', data.level, 'del pase de batalla!');
      
      // Notificar nuevo nivel
      if (window.App && window.App.showToast) {
        window.App.showToast(`🎉 ¡Nivel ${data.level} del Pase!`, 'success');
      }
    }
    
    this.saveBattlePassData(data);
    return data;
  },

  // Reclamar recompensa del pase
  claimReward(level, type = 'free') {
    const data = this.getBattlePassData();
    
    // Verificar si ya se reclamó
    if (data.claimedRewards[type].includes(level)) {
      return { success: false, error: 'Ya reclamaste esta recompensa' };
    }
    
    // Verificar nivel
    if (data.level < level) {
      return { success: false, error: 'Aún no alcanzas este nivel' };
    }
    
    // Verificar premium
    if (type === 'premium' && !data.isPremium) {
      return { success: false, error: 'Necesitas el Pase Premium' };
    }
    
    // Obtener recompensa
    const rewardData = BATTLE_PASS_REWARDS.find(r => r.level === level);
    if (!rewardData) return { success: false, error: 'Recompensa no encontrada' };
    
    const reward = rewardData[type];
    
    // Aplicar recompensa
    this.applyReward(reward);
    
    // Marcar como reclamada
    data.claimedRewards[type].push(level);
    this.saveBattlePassData(data);
    
    return { success: true, reward };
  },

  // Aplicar recompensa
  applyReward(reward) {
    switch (reward.type) {
      case 'coins':
        Storage.addCoins(reward.amount);
        break;
      case 'life':
        const lives = Storage.getLives();
        Storage.setLives(Math.min(lives.current + reward.amount, lives.max + reward.amount));
        break;
      case 'powerup':
        this.addPowerup(reward.item, reward.amount);
        break;
      case 'avatar':
        this.unlockCosmetic('avatars', reward.item);
        break;
      case 'frame':
        this.unlockCosmetic('frames', reward.item);
        break;
      case 'title':
        this.unlockCosmetic('titles', reward.item);
        break;
      case 'effect':
        this.unlockCosmetic('effects', reward.item);
        break;
      case 'legendary':
        // Pack legendario: todo lo anterior
        Storage.addCoins(2000);
        this.addPowerup('shield', 10);
        this.addPowerup('reveal', 10);
        this.unlockCosmetic('avatars', 'champion_season');
        this.unlockCosmetic('frames', 'champion_animated');
        this.unlockCosmetic('titles', 'season_champion');
        break;
    }
  },

  // === POWERUPS ===
  getPowerups() {
    const data = localStorage.getItem(this.STORAGE_KEYS.POWERUPS);
    if (data) return JSON.parse(data);
    return {
      shield: 0,
      reveal: 0,
      doubleCoins: 0,
      extraTime: 0,
      fiftyFifty: 0
    };
  },

  savePowerups(powerups) {
    localStorage.setItem(this.STORAGE_KEYS.POWERUPS, JSON.stringify(powerups));
    // Sincronizar con Firebase si está disponible
    if (window.Firebase?.currentUser) {
      window.Firebase.db.collection('users').doc(window.Firebase.currentUser.uid).update({
        powerups: powerups
      }).catch(e => console.warn('[Season] Error sync powerups:', e));
    }
  },

  addPowerup(powerupId, amount = 1) {
    const powerups = this.getPowerups();
    const current = powerups[powerupId] || 0;
    const maxPowerups = 5; // Máximo 5 de cada tipo
    
    // Limitar al máximo permitido
    const newAmount = Math.min(current + amount, maxPowerups);
    const actualAdded = newAmount - current;
    
    if (actualAdded <= 0) {
      console.log('[Season] Ya tienes el máximo de', powerupId, '(', maxPowerups, ')');
      return powerups;
    }
    
    powerups[powerupId] = newAmount;
    this.savePowerups(powerups);
    console.log('[Season] Añadido powerup:', powerupId, 'x', actualAdded, '- Total:', newAmount);
    return powerups;
  },

  usePowerup(powerupId) {
    const powerups = this.getPowerups();
    if (!powerups[powerupId] || powerups[powerupId] <= 0) {
      return { success: false, error: 'No tienes este powerup' };
    }
    
    powerups[powerupId]--;
    this.savePowerups(powerups);
    
    // Si es un powerup con duración, activar efecto
    const powerupDef = POWERUPS[powerupId];
    if (powerupDef.duration) {
      this.activateTimedEffect(powerupId, powerupDef.duration);
    }
    
    return { success: true, remaining: powerups[powerupId] };
  },

  // === EFECTOS CON TIEMPO ===
  getActiveEffects() {
    const data = localStorage.getItem(this.STORAGE_KEYS.ACTIVE_EFFECTS);
    if (data) {
      const effects = JSON.parse(data);
      // Limpiar efectos expirados
      const now = Date.now();
      const active = {};
      for (const [id, expiry] of Object.entries(effects)) {
        if (expiry > now) {
          active[id] = expiry;
        }
      }
      if (Object.keys(active).length !== Object.keys(effects).length) {
        localStorage.setItem(this.STORAGE_KEYS.ACTIVE_EFFECTS, JSON.stringify(active));
      }
      return active;
    }
    return {};
  },

  activateTimedEffect(effectId, duration) {
    const effects = this.getActiveEffects();
    effects[effectId] = Date.now() + duration;
    localStorage.setItem(this.STORAGE_KEYS.ACTIVE_EFFECTS, JSON.stringify(effects));
    console.log('[Season] Efecto activado:', effectId, 'por', duration / 1000, 'segundos');
  },

  isEffectActive(effectId) {
    const effects = this.getActiveEffects();
    return effects[effectId] && effects[effectId] > Date.now();
  },

  getEffectTimeRemaining(effectId) {
    const effects = this.getActiveEffects();
    if (!effects[effectId]) return 0;
    return Math.max(0, effects[effectId] - Date.now());
  },

  // Verificar inmunidad de vidas (Escudo Divino)
  hasShieldActive() {
    return this.isEffectActive('shield');
  },

  // Verificar monedas dobles
  hasDoubleCoinsActive() {
    return this.isEffectActive('doubleCoins');
  },

  // Verificar tiempo extra
  hasExtraTimeActive() {
    return this.isEffectActive('extraTime');
  },

  // Obtener tiempo restante de escudo
  getShieldRemainingTime() {
    return this.getEffectTimeRemaining('shield');
  },

  // Obtener tiempo restante de monedas dobles
  getDoubleCoinsRemainingTime() {
    return this.getEffectTimeRemaining('doubleCoins');
  },

  // Obtener tiempo restante de tiempo extra
  getExtraTimeRemainingTime() {
    return this.getEffectTimeRemaining('extraTime');
  },

  // Activar un potenciador con duración
  activatePowerup(powerupId) {
    const inventory = this.getPowerups();
    if (!inventory[powerupId] || inventory[powerupId] <= 0) {
      return { success: false, message: 'No tienes este potenciador' };
    }

    const powerup = POWERUPS[powerupId];
    if (!powerup || !powerup.duration) {
      return { success: false, message: 'Potenciador inválido' };
    }

    // Consumir del inventario
    inventory[powerupId]--;
    this.savePowerups(inventory);

    // Activar efecto
    this.activateTimedEffect(powerupId, powerup.duration);

    return { success: true, message: `${powerup.name} activado por ${Math.floor(powerup.duration / 60000)} minutos` };
  },

  // Consumir un potenciador de uso único
  consumePowerup(powerupId) {
    const inventory = this.getPowerups();
    if (inventory[powerupId] && inventory[powerupId] > 0) {
      inventory[powerupId]--;
      this.savePowerups(inventory);
      return true;
    }
    return false;
  },

  // Alias para compatibilidad
  getPowerupInventory() {
    return this.getPowerups();
  },

  // === COSMÉTICOS ===
  getCosmetics() {
    const data = localStorage.getItem(this.STORAGE_KEYS.COSMETICS);
    if (data) return JSON.parse(data);
    return {
      avatars: [],
      frames: [],
      titles: [],
      effects: [],
      equipped: {
        avatar: null,
        frame: null,
        title: null,
        effect: null
      }
    };
  },

  saveCosmetics(cosmetics) {
    localStorage.setItem(this.STORAGE_KEYS.COSMETICS, JSON.stringify(cosmetics));
  },

  unlockCosmetic(type, itemId) {
    const cosmetics = this.getCosmetics();
    if (!cosmetics[type].includes(itemId)) {
      cosmetics[type].push(itemId);
      this.saveCosmetics(cosmetics);
      console.log('[Season] Desbloqueado:', type, itemId);
      
      if (window.App && window.App.showToast) {
        window.App.showToast(`🎁 Nuevo ${type === 'avatars' ? 'avatar' : type === 'frames' ? 'marco' : type === 'titles' ? 'título' : 'efecto'} desbloqueado!`, 'success');
      }
    }
  },

  equipCosmetic(type, itemId) {
    const cosmetics = this.getCosmetics();
    const typeKey = type.replace(/s$/, ''); // avatars -> avatar
    cosmetics.equipped[typeKey] = itemId;
    this.saveCosmetics(cosmetics);
  },

  // === MISIONES ===
  getMissions() {
    const data = localStorage.getItem(this.STORAGE_KEYS.MISSIONS);
    if (data) {
      const missions = JSON.parse(data);
      // Verificar si necesita reset
      const now = new Date();
      if (missions.dailyReset && new Date(missions.dailyReset) < now) {
        missions.daily = this.generateDailyMissions();
        missions.dailyReset = this.getNextDailyReset();
      }
      if (missions.weeklyReset && new Date(missions.weeklyReset) < now) {
        missions.weekly = this.generateWeeklyMissions();
        missions.weeklyReset = this.getNextWeeklyReset();
      }
      localStorage.setItem(this.STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
      return missions;
    }
    
    // Crear misiones nuevas
    const newMissions = {
      daily: this.generateDailyMissions(),
      weekly: this.generateWeeklyMissions(),
      dailyReset: this.getNextDailyReset(),
      weeklyReset: this.getNextWeeklyReset()
    };
    localStorage.setItem(this.STORAGE_KEYS.MISSIONS, JSON.stringify(newMissions));
    return newMissions;
  },

  generateDailyMissions() {
    // Seleccionar 3 misiones aleatorias
    const shuffled = [...MISSIONS.daily].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3).map(m => ({
      ...m,
      progress: 0,
      claimed: false
    }));
  },

  generateWeeklyMissions() {
    // Seleccionar 3 misiones semanales aleatorias
    const shuffled = [...MISSIONS.weekly].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3).map(m => ({
      ...m,
      progress: 0,
      claimed: false
    }));
  },

  getNextDailyReset() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString();
  },

  getNextWeeklyReset() {
    const nextMonday = new Date();
    nextMonday.setDate(nextMonday.getDate() + (8 - nextMonday.getDay()) % 7);
    nextMonday.setHours(0, 0, 0, 0);
    return nextMonday.toISOString();
  },

  // Actualizar progreso de misión
  updateMissionProgress(missionType, amount = 1) {
    const missions = this.getMissions();
    let updated = false;
    
    // Buscar misiones que coincidan
    ['daily', 'weekly'].forEach(period => {
      missions[period].forEach(mission => {
        if (mission.id.includes(missionType) && !mission.claimed && mission.progress < mission.target) {
          mission.progress = Math.min(mission.progress + amount, mission.target);
          updated = true;
          
          // Verificar si está completa
          if (mission.progress >= mission.target) {
            console.log('[Season] Misión completada:', mission.name);
            if (window.App && window.App.showToast) {
              window.App.showToast(`✅ Misión completada: ${mission.name}`, 'success');
            }
          }
        }
      });
    });
    
    if (updated) {
      localStorage.setItem(this.STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
    }
    return missions;
  },

  // Reclamar recompensa de misión
  claimMissionReward(missionId) {
    const missions = this.getMissions();
    
    for (const period of ['daily', 'weekly']) {
      const mission = missions[period].find(m => m.id === missionId);
      if (mission && mission.progress >= mission.target && !mission.claimed) {
        mission.claimed = true;
        this.addBattlePassXP(mission.xp);
        localStorage.setItem(this.STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
        return { success: true, xp: mission.xp };
      }
    }
    
    return { success: false, error: 'Misión no completada o ya reclamada' };
  },

  // === COMPRAR EN TIENDA ===
  buyPowerup(powerupId, withCoins = true) {
    const powerup = POWERUPS[powerupId];
    if (!powerup) return { success: false, error: 'Powerup no encontrado' };
    
    // Verificar límite de 5 por tipo
    const powerups = this.getPowerups();
    const current = powerups[powerupId] || 0;
    const maxPowerups = 5;
    
    if (current >= maxPowerups) {
      return { success: false, error: `Ya tienes el máximo (${maxPowerups}) de este comodín` };
    }
    
    if (withCoins) {
      const coins = Storage.getCoins();
      if (coins.total < powerup.priceCoins) {
        return { success: false, error: 'No tienes suficientes monedas' };
      }
      Storage.spendCoins(powerup.priceCoins);
    }
    
    this.addPowerup(powerupId, 1);
    return { success: true, powerup, message: `Compraste ${powerup.name}` };
  },

  // Comprar pase premium
  buyBattlePassPremium() {
    const data = this.getBattlePassData();
    if (data.isPremium) {
      return { success: false, error: 'Ya tienes el pase premium' };
    }
    
    // Aquí iría la lógica de pago real (Billing.js)
    data.isPremium = true;
    this.saveBattlePassData(data);
    
    return { success: true };
  }
};

// Exportar al window
window.POWERUPS = POWERUPS;
window.SEASONS = SEASONS;
window.BATTLE_PASS_REWARDS = BATTLE_PASS_REWARDS;
window.MISSIONS = MISSIONS;
window.AVATARS = AVATARS;
window.FRAMES = FRAMES;
window.TITLES = TITLES;
window.SeasonSystem = SeasonSystem;

console.log('[Seasons] Sistema de temporadas cargado');
