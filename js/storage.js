// --- Versionado de datos ---
const BIBLIAQUIZ_DATA_VERSION = 2; // Incrementa este número en cada cambio de estructura

function getStoredDataVersion() {
  return parseInt(localStorage.getItem('bibliaquiz_data_version') || '0', 10);
}

function setStoredDataVersion(v) {
  localStorage.setItem('bibliaquiz_data_version', String(v));
}

function migrateDataIfNeeded() {
  const current = getStoredDataVersion();
  if (current < BIBLIAQUIZ_DATA_VERSION) {
    // Ejemplo de migración: si subimos a versión 2, agregar un campo a settings
    if (current < 2) {
      let settings = JSON.parse(localStorage.getItem(Storage.KEYS.SETTINGS) || 'null');
      if (settings && !('migracionTest' in settings)) {
        settings.migracionTest = 'ok';
        localStorage.setItem(Storage.KEYS.SETTINGS, JSON.stringify(settings));
        console.log('[Storage] Migración v2: Campo migracionTest agregado a settings');
      }
    }
    setStoredDataVersion(BIBLIAQUIZ_DATA_VERSION);
    console.log('[Storage] Migración de datos completada. Versión:', BIBLIAQUIZ_DATA_VERSION);
  }
}

// ============================================================
// BibliaQuiz - Sistema de Almacenamiento (LocalStorage)
// ============================================================

const Storage = {
    // Llamar a la migración al cargar cualquier dato importante
    initVersioning() {
      migrateDataIfNeeded();
    },
  KEYS: {
    PLAYER: 'bibliaquiz_player',
    STATS: 'bibliaquiz_stats',
    HISTORY: 'bibliaquiz_history',
    SETTINGS: 'bibliaquiz_settings',
    BADGES: 'bibliaquiz_badges',
    ANSWERED: 'bibliaquiz_answered',
    WRONG: 'bibliaquiz_wrong',
    CHALLENGE: 'bibliaquiz_challenge',
    CATEGORY_STATS: 'bibliaquiz_catstats',
    LIVES: 'bibliaquiz_lives',
    CATEGORY_COMPLETE: 'bibliaquiz_catcomplete',
    DAILY_STREAK: 'bibliaquiz_dailystreak',
    DAILY_CHALLENGE: 'bibliaquiz_dailychallenge',
    SPEED_STATS: 'bibliaquiz_speedstats',
    LEADERBOARD: 'bibliaquiz_leaderboard',
    COINS: 'bibliaquiz_coins'
  },

  // Safe JSON parse helper
  _parse(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      if (!data) return typeof fallback === 'function' ? fallback() : fallback;
      return JSON.parse(data);
    } catch (e) {
      console.error('[Storage] Error parsing', key, e);
      localStorage.removeItem(key);
      return typeof fallback === 'function' ? fallback() : fallback;
    }
  },

  // Safe JSON save helper
  _save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('[Storage] Error saving', key, e);
    }
  },

  // --- Defaults ---
  defaultPlayer() {
    return {
      name: 'Jugador',
      avatar: '',
      email: '',
      age: null,
      gender: '',
      registered: false,
      registeredAt: null,
      level: 1,
      xp: 0,
      xpToNext: 100
    };
  },

  isRegistered() {
    const player = this.getPlayer();
    return player.registered === true;
  },

  defaultStats() {
    return {
      totalPoints: 0,
      totalCorrect: 0,
      totalWrong: 0,
      totalAnswered: 0,
      totalGames: 0,
      bestStreak: 0,
      perfectGames: 0,
      expertCorrect: 0,
      categoriesPlayed: 0,
      categoriesSet: []
    };
  },

  defaultSettings() {
    return {
      sound: true,
      vibration: true,
      questionsPerGame: 10,
      showVerse: true,
      timerSeconds: 30,
      noRepeat: true
    };
  },

  // --- GET ---
  getPlayer() { this.initVersioning(); return this._parse(this.KEYS.PLAYER, () => this.defaultPlayer()); },
  getStats() { this.initVersioning(); return this._parse(this.KEYS.STATS, () => this.defaultStats()); },
  getHistory() { this.initVersioning(); return this._parse(this.KEYS.HISTORY, []); },
  getSettings() { this.initVersioning(); return this._parse(this.KEYS.SETTINGS, () => this.defaultSettings()); },
  getBadges() { this.initVersioning(); return this._parse(this.KEYS.BADGES, []); },
  getAnswered() { this.initVersioning(); return this._parse(this.KEYS.ANSWERED, []); },
  getWrongAnswers() { this.initVersioning(); return this._parse(this.KEYS.WRONG, []); },
  getChallengeRecords() { this.initVersioning(); return this._parse(this.KEYS.CHALLENGE, {}); },
  getCategoryStats() { this.initVersioning(); return this._parse(this.KEYS.CATEGORY_STATS, {}); },

  // Get weekly stats - returns array of 7 days with aggregated stats
  getWeeklyStats() {
    const history = this.getHistory();
    const days = [];
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    
    // Get dates for last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - i);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      // Filter games from this day
      const dayGames = history.filter(game => {
        if (!game.date) return false;
        const gameDate = new Date(game.date);
        return gameDate >= date && gameDate < nextDate;
      });
      
      // Calculate aggregated stats for this day
      let totalCorrect = 0;
      let totalQuestions = 0;
      let totalPoints = 0;
      let gamesPlayed = dayGames.length;
      
      dayGames.forEach(game => {
        totalCorrect += game.correct || 0;
        totalQuestions += game.total || 0;
        totalPoints += game.points || 0;
      });
      
      days.push({
        label: dayNames[date.getDay()],
        date: date.toLocaleDateString('es', { day: '2-digit', month: 'short' }),
        games: gamesPlayed,
        correct: totalCorrect,
        total: totalQuestions,
        points: totalPoints,
        accuracy: totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0
      });
    }
    
    return days;
  },

  // --- SET ---
  savePlayer(player) { this._save(this.KEYS.PLAYER, player); },
  saveStats(stats) { this._save(this.KEYS.STATS, stats); },
  saveHistory(history) { this._save(this.KEYS.HISTORY, history); },
  saveSettings(settings) { this._save(this.KEYS.SETTINGS, settings); },
  saveBadges(badges) { this._save(this.KEYS.BADGES, badges); },
  saveAnswered(answered) { this._save(this.KEYS.ANSWERED, answered); },
  saveWrongAnswers(wrong) { this._save(this.KEYS.WRONG, wrong); },
  saveChallengeRecords(records) { this._save(this.KEYS.CHALLENGE, records); },
  saveCategoryStats(catStats) { this._save(this.KEYS.CATEGORY_STATS, catStats); },

  // --- UPDATE HELPERS ---
  addXP(amount) {
    const player = this.getPlayer();
    player.xp += amount;

    while (player.xp >= player.xpToNext) {
      player.xp -= player.xpToNext;
      player.level++;
      player.xpToNext = Math.floor(100 * Math.pow(1.3, player.level - 1));
    }

    this.savePlayer(player);
    return player;
  },

  addGameToHistory(gameResult) {
    const history = this.getHistory();
    history.unshift({
      ...gameResult,
      date: new Date().toISOString()
    });
    // Keep last 50 games
    if (history.length > 50) history.pop();
    this.saveHistory(history);
  },

  checkNewBadges() {
    const stats = this.getStats();
    const earned = this.getBadges();
    const newBadges = [];

    for (const badge of BADGES) {
      if (!earned.includes(badge.id) && badge.condition(stats)) {
        earned.push(badge.id);
        newBadges.push(badge);
      }
    }

    if (newBadges.length > 0) {
      this.saveBadges(earned);
    }

    return newBadges;
  },

  updateCategoryPlayed(category) {
    const stats = this.getStats();
    if (!stats.categoriesSet) stats.categoriesSet = [];
    if (category !== 'aleatorio' && !stats.categoriesSet.includes(category)) {
      stats.categoriesSet.push(category);
      stats.categoriesPlayed = stats.categoriesSet.length;
      this.saveStats(stats);
    }
  },

  // --- WRONG ANSWERS ---
  addWrongAnswer(questionId, userAnswer) {
    const wrong = this.getWrongAnswers();
    if (!wrong.find(w => w.id === questionId)) {
      wrong.push({ id: questionId, userAnswer, date: new Date().toISOString() });
      this.saveWrongAnswers(wrong);
    }
  },

  removeWrongAnswer(questionId) {
    let wrong = this.getWrongAnswers();
    wrong = wrong.filter(w => w.id !== questionId);
    this.saveWrongAnswers(wrong);
  },

  // --- CHALLENGE RECORDS ---
  saveChallengeRecord(time, difficulty, correct, points) {
    const records = this.getChallengeRecords();
    const key = `${time}_${difficulty}`;
    const existing = records[key];
    let isNew = false;
    if (!existing || correct > existing.correct || (correct === existing.correct && points > existing.points)) {
      records[key] = { correct, points, date: new Date().toISOString() };
      isNew = true;
    }
    this.saveChallengeRecords(records);
    return isNew;
  },

  // --- CATEGORY STATS ---
  updateCategoryStatsData(category, correct, wrong) {
    if (category === 'aleatorio') return;
    const catStats = this.getCategoryStats();
    if (!catStats[category]) {
      catStats[category] = { correct: 0, wrong: 0, total: 0 };
    }
    catStats[category].correct += correct;
    catStats[category].wrong += wrong;
    catStats[category].total += correct + wrong;
    this.saveCategoryStats(catStats);
  },

  // --- RESET ---
  resetAll() {
    Object.values(this.KEYS).forEach(key => localStorage.removeItem(key));
    localStorage.removeItem('bibliaquiz_theme');
    localStorage.removeItem('bibliaquiz_onboarded');
    localStorage.removeItem('bibliaquiz_registered');
    localStorage.removeItem('bq_infiniteLives');
  },

  // --- LIVES ---
  getLives() { this.initVersioning(); return this._parse(this.KEYS.LIVES, { lives: 5, lastLostTime: null }); },
  saveLives(livesData) { this._save(this.KEYS.LIVES, livesData); },

  // --- CATEGORY COMPLETION ---
  getCategoryComplete() { this.initVersioning(); return this._parse(this.KEYS.CATEGORY_COMPLETE, {}); },
  saveCategoryComplete(catComplete) { this._save(this.KEYS.CATEGORY_COMPLETE, catComplete); },

  // --- DAILY STREAK ---
  getDailyStreak() {
    this.initVersioning();
    return this._parse(this.KEYS.DAILY_STREAK, { days: 0, lastDate: null, best: 0 });
  },
  saveDailyStreak(data) { this._save(this.KEYS.DAILY_STREAK, data); },

  // --- DAILY CHALLENGE ---
  getDailyChallenge() {
    this.initVersioning();
    return this._parse(this.KEYS.DAILY_CHALLENGE, { date: null, completed: false, score: 0 });
  },
  saveDailyChallenge(data) { this._save(this.KEYS.DAILY_CHALLENGE, data); },

  // --- SPEED STATS ---
  getSpeedStats() {
    this.initVersioning();
    return this._parse(this.KEYS.SPEED_STATS, { totalTime: 0, totalAnswered: 0, fastest: null, slowest: null });
  },
  saveSpeedStats(data) { this._save(this.KEYS.SPEED_STATS, data); },

  // --- LEADERBOARD ---
  getLeaderboard() { this.initVersioning(); return this._parse(this.KEYS.LEADERBOARD, []); },
  saveLeaderboard(data) { this._save(this.KEYS.LEADERBOARD, data); },

  addLeaderboardEntry(entry) {
    const lb = this.getLeaderboard();
    lb.push({ ...entry, date: new Date().toISOString() });
    lb.sort((a, b) => b.points - a.points);
    if (lb.length > 50) lb.length = 50;
    this.saveLeaderboard(lb);
    return lb;
  },

  // --- THEME ---
  getTheme() {
    try { return localStorage.getItem('bibliaquiz_theme') || 'auto'; }
    catch(e) { return 'auto'; }
  },
  saveTheme(theme) {
    try { localStorage.setItem('bibliaquiz_theme', theme); }
    catch(e) { console.error('[Storage] Error saving theme', e); }
  },

  // --- NOTIFICATIONS ---
  getNotifEnabled() {
    try { return localStorage.getItem('bibliaquiz_notif') === 'true'; }
    catch(e) { return false; }
  },
  saveNotifEnabled(val) {
    try { localStorage.setItem('bibliaquiz_notif', val ? 'true' : 'false'); }
    catch(e) {}
  },
  getStreakNotifEnabled() {
    try { 
      const val = localStorage.getItem('bibliaquiz_streak_notif');
      return val === null ? true : val === 'true'; // default true
    }
    catch(e) { return true; }
  },
  saveStreakNotifEnabled(val) {
    try { localStorage.setItem('bibliaquiz_streak_notif', val ? 'true' : 'false'); }
    catch(e) {}
  },
  getNotifTime() {
    try { 
      const saved = localStorage.getItem('bibliaquiz_notif_time');
      return saved || '09:00';
    }
    catch(e) { return '09:00'; }
  },
  saveNotifTime(time) {
    try { localStorage.setItem('bibliaquiz_notif_time', time); }
    catch(e) {}
  },

  // --- FAVORITE VERSES ---
  getFavoriteVerses() {
    try {
      const saved = localStorage.getItem('bibliaquiz_favorite_verses');
      return saved ? JSON.parse(saved) : [];
    }
    catch(e) { return []; }
  },
  
  saveFavoriteVerses(verses) {
    try { localStorage.setItem('bibliaquiz_favorite_verses', JSON.stringify(verses)); }
    catch(e) {}
  },
  
  addFavoriteVerse(verse) {
    const favorites = this.getFavoriteVerses();
    // Check if already exists (by text to avoid duplicates)
    const exists = favorites.some(v => v.text === verse.text);
    if (!exists) {
      favorites.unshift({
        ...verse,
        savedAt: new Date().toISOString(),
        memorized: false
      });
      this.saveFavoriteVerses(favorites);
      return true;
    }
    return false;
  },
  
  removeFavoriteVerse(verseText) {
    const favorites = this.getFavoriteVerses();
    const filtered = favorites.filter(v => v.text !== verseText);
    this.saveFavoriteVerses(filtered);
  },
  
  isFavoriteVerse(verseText) {
    const favorites = this.getFavoriteVerses();
    return favorites.some(v => v.text === verseText);
  },
  
  toggleMemorizedVerse(verseText) {
    const favorites = this.getFavoriteVerses();
    const verse = favorites.find(v => v.text === verseText);
    if (verse) {
      verse.memorized = !verse.memorized;
      verse.memorizedAt = verse.memorized ? new Date().toISOString() : null;
      this.saveFavoriteVerses(favorites);
      return verse.memorized;
    }
    return false;
  },
  
  getMemorizedCount() {
    const favorites = this.getFavoriteVerses();
    return favorites.filter(v => v.memorized).length;
  },

  // --- SISTEMA DE MONEDAS ---
  getCoins() {
    this.initVersioning();
    return this._parse(this.KEYS.COINS, { 
      total: 0, 
      earned: 0, 
      spent: 0,
      multiplier: 1,
      perfectStreakPhases: 0 // Fases consecutivas sin errores
    });
  },
  
  saveCoins(coinsData) { 
    this._save(this.KEYS.COINS, coinsData); 
  },
  
  addCoins(amount) {
    const coins = this.getCoins();
    coins.total += amount;
    coins.earned += amount;
    this.saveCoins(coins);
    return coins;
  },
  
  spendCoins(amount) {
    const coins = this.getCoins();
    if (coins.total >= amount) {
      coins.total -= amount;
      coins.spent += amount;
      this.saveCoins(coins);
      return true;
    }
    return false;
  },
  
  // Actualizar multiplicador basado en fases perfectas
  updateCoinMultiplier(phasePerfect) {
    const coins = this.getCoins();
    if (phasePerfect) {
      coins.perfectStreakPhases++;
      // Calcular nuevo multiplicador (máx x4)
      if (coins.perfectStreakPhases >= 3) {
        coins.multiplier = 4;
      } else if (coins.perfectStreakPhases >= 2) {
        coins.multiplier = 3;
      } else if (coins.perfectStreakPhases >= 1) {
        coins.multiplier = 2;
      }
    } else {
      // Resetear si falla
      coins.perfectStreakPhases = 0;
      coins.multiplier = 1;
    }
    this.saveCoins(coins);
    return coins.multiplier;
  },
  
  resetCoinMultiplier() {
    const coins = this.getCoins();
    coins.perfectStreakPhases = 0;
    coins.multiplier = 1;
    this.saveCoins(coins);
  }
};
