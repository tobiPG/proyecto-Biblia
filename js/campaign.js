// ============================================================
// MODO CAMPAÑA BÍBLICA - BibliaQuiz
// ============================================================

// Palabras clave de libros bíblicos por mundo — se buscan en el campo `reference` de cada pregunta
const WORLD_BOOKS = {
  w1: ['genesis', 'gen ', 'gén', 'gen.'],                                         // Génesis
  w2: ['exodo', 'éxodo', 'exodus', 'levitico', 'levítico', 'numeros', 'números',
       'deuteronomio', 'ex ', 'lev ', 'num ', 'deut'],                            // Pentateuco sin Génesis
  w3: ['josue', 'josué', 'jueces', '1 samuel', '2 samuel', '1 reyes', '2 reyes',
       '1samuel', '2samuel', '1reyes', '2reyes'],                                  // Josué→Reyes
  w4: ['salmo', 'psalm', 'proverbio', 'prov', 'eclesiastes', 'eclesiastés',
       'job ', 'job.', 'cantares', 'cant'],                                        // Libros poéticos
  w5: ['isaias', 'isaías', 'jeremias', 'jeremías', 'ezequiel', 'daniel',
       'oseas', 'joel', 'amos', 'amós', 'abdias', 'jonas', 'jonás',
       'miqueas', 'nahum', 'nahúm', 'habacuc', 'sofonias', 'hageo',
       'zacarias', 'zacarías', 'malaquias', 'malaquías'],                          // Profetas
  w6: ['mateo', 'marcos', 'lucas', 'juan ', 'juan.', 'mt ', 'mc ', 'lc ',
       'jn ', 'evangelio'],                                                         // Evangelios
  w7: ['hechos', 'romanos', 'corintios', 'galatas', 'gálatas', 'efesios',
       'filipenses', 'colosenses', 'tesalonicenses', 'timoteo', 'tito',
       'filemon', 'hebreos', 'santiago', '1 pedro', '2 pedro', '1 juan',
       '2 juan', '3 juan', 'judas', 'hch'],                                        // Hechos + Epístolas
  w8: ['apocalipsis', 'revelation', 'apoc']                                        // Apocalipsis
};

const CAMPAIGN_WORLDS = [
  {
    id: 'w1',
    name: 'Los Orígenes',
    icon: '🌍',
    subtitle: 'Génesis y la Creación',
    requiredStars: 0,
    chapters: [
      { id: 'w1c1', name: 'La Creación', categories: ['historias', 'personajes'], difficulty: 'facil' },
      { id: 'w1c2', name: 'El Edén y la Caída', categories: ['historias', 'milagros'], difficulty: 'facil' },
      { id: 'w1c3', name: 'Los Patriarcas', categories: ['personajes', 'historias'], difficulty: 'facil' },
      { id: 'w1c4', name: 'Tierra y Promesas', categories: ['lugares', 'historias'], difficulty: 'intermedio' },
      { id: 'w1c5', name: 'Noé y Abraham', categories: ['personajes', 'historias'], difficulty: 'intermedio' }
    ]
  },
  {
    id: 'w2',
    name: 'Egipto y la Ley',
    icon: '🏛️',
    subtitle: 'Moisés y el Éxodo',
    requiredStars: 6,
    chapters: [
      { id: 'w2c1', name: 'José en Egipto', categories: ['historias', 'personajes'], difficulty: 'facil' },
      { id: 'w2c2', name: 'Las Plagas', categories: ['milagros', 'historias'], difficulty: 'intermedio' },
      { id: 'w2c3', name: 'Moisés y la Ley', categories: ['libros', 'historias'], difficulty: 'intermedio' },
      { id: 'w2c4', name: 'Los Mandamientos', categories: ['ensenanzas', 'libros'], difficulty: 'intermedio' },
      { id: 'w2c5', name: 'El Desierto', categories: ['lugares', 'historias'], difficulty: 'intermedio' }
    ]
  },
  {
    id: 'w3',
    name: 'La Historia de Israel',
    icon: '⚔️',
    subtitle: 'Jueces, Reyes y Guerras',
    requiredStars: 12,
    chapters: [
      { id: 'w3c1', name: 'Saúl y David', categories: ['reyes', 'historias'], difficulty: 'intermedio' },
      { id: 'w3c2', name: 'Los Reyes', categories: ['reyes', 'personajes'], difficulty: 'intermedio' },
      { id: 'w3c3', name: 'Tierras y Batallas', categories: ['historias', 'lugares'], difficulty: 'intermedio' },
      { id: 'w3c4', name: 'Salomón y el Templo', categories: ['reyes', 'historias'], difficulty: 'dificil' },
      { id: 'w3c5', name: 'El Reino Dividido', categories: ['personajes', 'reyes'], difficulty: 'dificil' }
    ]
  },
  {
    id: 'w4',
    name: 'Los Salmos y Sabiduría',
    icon: '📜',
    subtitle: 'Poesía y Sabiduría Divina',
    requiredStars: 18,
    chapters: [
      { id: 'w4c1', name: 'Los Salmos', categories: ['versiculos', 'ensenanzas'], difficulty: 'facil' },
      { id: 'w4c2', name: 'Proverbios', categories: ['ensenanzas', 'versiculos'], difficulty: 'intermedio' },
      { id: 'w4c3', name: 'Eclesiastés y Job', categories: ['versiculos', 'libros'], difficulty: 'intermedio' },
      { id: 'w4c4', name: 'Sabiduría Profunda', categories: ['ensenanzas', 'versiculos'], difficulty: 'dificil' },
      { id: 'w4c5', name: 'Las Escrituras', categories: ['versiculos', 'libros'], difficulty: 'dificil' }
    ]
  },
  {
    id: 'w5',
    name: 'Los Profetas',
    icon: '🔮',
    subtitle: 'Mensajeros del Señor',
    requiredStars: 24,
    chapters: [
      { id: 'w5c1', name: 'Isaías y Jeremías', categories: ['profetas', 'historias'], difficulty: 'intermedio' },
      { id: 'w5c2', name: 'Los Profetas Menores', categories: ['profetas', 'personajes'], difficulty: 'intermedio' },
      { id: 'w5c3', name: 'Ezequiel y Daniel', categories: ['profetas', 'historias'], difficulty: 'dificil' },
      { id: 'w5c4', name: 'Profecías y Visiones', categories: ['profetas', 'versiculos'], difficulty: 'dificil' },
      { id: 'w5c5', name: 'Libros Proféticos', categories: ['profetas', 'libros'], difficulty: 'experto' }
    ]
  },
  {
    id: 'w6',
    name: 'La Vida de Jesús',
    icon: '✝️',
    subtitle: 'El Evangelio del Señor',
    requiredStars: 30,
    chapters: [
      { id: 'w6c1', name: 'El Nacimiento', categories: ['vida_jesus', 'personajes'], difficulty: 'facil' },
      { id: 'w6c2', name: 'Milagros de Jesús', categories: ['vida_jesus', 'milagros'], difficulty: 'facil' },
      { id: 'w6c3', name: 'Las Parábolas', categories: ['vida_jesus', 'parabolas'], difficulty: 'intermedio' },
      { id: 'w6c4', name: 'La Pasión', categories: ['vida_jesus', 'historias'], difficulty: 'intermedio' },
      { id: 'w6c5', name: 'Versículos del Evangelio', categories: ['vida_jesus', 'versiculos'], difficulty: 'dificil' }
    ]
  },
  {
    id: 'w7',
    name: 'La Iglesia Primitiva',
    icon: '⛪',
    subtitle: 'Hechos y Epístolas',
    requiredStars: 36,
    chapters: [
      { id: 'w7c1', name: 'Los Apóstoles', categories: ['cartas', 'ensenanzas'], difficulty: 'intermedio' },
      { id: 'w7c2', name: 'Pablo y la Iglesia', categories: ['cartas', 'personajes'], difficulty: 'intermedio' },
      { id: 'w7c3', name: 'Las Epístolas', categories: ['cartas', 'versiculos'], difficulty: 'dificil' },
      { id: 'w7c4', name: 'Enseñanzas Apostólicas', categories: ['ensenanzas', 'cartas'], difficulty: 'dificil' },
      { id: 'w7c5', name: 'Libros del NT', categories: ['cartas', 'libros'], difficulty: 'experto' }
    ]
  },
  {
    id: 'w8',
    name: 'El Apocalipsis',
    icon: '🌟',
    subtitle: 'El Fin y el Comienzo',
    requiredStars: 42,
    chapters: [
      { id: 'w8c1', name: 'Visiones Proféticas', categories: ['profetas', 'versiculos'], difficulty: 'dificil' },
      { id: 'w8c2', name: 'Los Últimos Libros', categories: ['versiculos', 'libros'], difficulty: 'experto' },
      { id: 'w8c3', name: 'La Tribulación', categories: ['profetas', 'historias'], difficulty: 'experto' },
      { id: 'w8c4', name: 'Personajes del Fin', categories: ['versiculos', 'personajes'], difficulty: 'experto' },
      { id: 'w8c5', name: 'El Trono de Dios', categories: ['profetas', 'versiculos'], difficulty: 'experto' }
    ]
  }
];

const CampaignManager = {
  selectedWorldIndex: 0,

  // Get campaign progress from localStorage
  getProgress() {
    try {
      const saved = localStorage.getItem('campaign_progress');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  },

  // Save chapter result
  saveChapterResult(chapterId, correctCount, totalCount, sessionPoints = 0) {
    const progress = this.getProgress();
    const percentage = totalCount > 0 ? (correctCount / totalCount) * 100 : 0;
    let stars = 0;
    if (percentage >= 100) stars = 3;
    else if (percentage >= 80) stars = 2;
    else if (percentage >= 60) stars = 1;

    const existing = progress[chapterId];
    const newStars = Math.max(stars, existing ? existing.stars : 0);
    const newScore = Math.max(
      sessionPoints || correctCount * 100,
      existing ? (existing.score || 0) : 0
    );

    progress[chapterId] = {
      stars: newStars,
      score: newScore,
      completedAt: new Date().toISOString(),
      correct: correctCount,
      total: totalCount
    };

    localStorage.setItem('campaign_progress', JSON.stringify(progress));

    // Sync to backend
    if (window.BackendService && BackendService.token) {
      const token = localStorage.getItem('backend_token');
      const API_BASE_URL = window.API_BASE_URL || 'http://localhost:3001';
      fetch(API_BASE_URL + '/api/users/campaign-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ chapterId, stars: newStars, score: newScore, correct: correctCount, total: totalCount })
      }).catch(err => console.error('[Campaign] Error syncing progress:', err));
    }

    // Guardar índices para botón de repetir
    this._lastWorldIndex = App.campaignMode?.worldIndex ?? null;
    this._lastChapterIndex = App.campaignMode?.chapterIndex ?? null;

    // Show campaign result screen
    this.showCampaignResult(stars, correctCount, totalCount, chapterId);
  },

  // Get total stars earned
  getTotalStars() {
    const progress = this.getProgress();
    return Object.values(progress).reduce((sum, ch) => sum + (ch.stars || 0), 0);
  },

  // Check if chapter is unlocked
  isChapterUnlocked(worldIndex, chapterIndex) {
    // First chapter of world 1 always unlocked
    if (worldIndex === 0 && chapterIndex === 0) return true;

    const progress = this.getProgress();
    const world = CAMPAIGN_WORLDS[worldIndex];

    // First chapter of other worlds: need world's requiredStars total
    if (chapterIndex === 0) {
      return this.getTotalStars() >= world.requiredStars;
    }

    // Other chapters: need previous chapter with >= 1 star
    const prevChapter = world.chapters[chapterIndex - 1];
    const prevProgress = progress[prevChapter.id];
    return prevProgress && prevProgress.stars >= 1;
  },

  // Start a chapter
  startChapter(worldIndex, chapterIndex) {
    if (!this.isChapterUnlocked(worldIndex, chapterIndex)) {
      App.showToast('🔒 Completa el capítulo anterior primero');
      return;
    }

    const world = CAMPAIGN_WORLDS[worldIndex];
    const chapter = world.chapters[chapterIndex];

    // Filter questions by categories, difficulty AND libros bíblicos del mundo
    const worldBooks = WORLD_BOOKS[world.id] || [];
    const allDB = window.QUESTIONS_DB || [];

    const matchesBook = (q) => {
      if (worldBooks.length === 0) return true;
      const ref = (q.reference || '').toLowerCase();
      return worldBooks.some(kw => ref.includes(kw));
    };

    let eligible = allDB.filter(q => {
      return chapter.categories.includes(q.category) &&
             q.difficulty === chapter.difficulty &&
             matchesBook(q);
    });

    // Si no hay suficientes con filtro de libro, relajar solo el filtro de libro
    if (eligible.length < 5) {
      eligible = allDB.filter(q =>
        chapter.categories.includes(q.category) && q.difficulty === chapter.difficulty
      );
    }

    if (eligible.length < 5) {
      App.showToast('⚠️ No hay suficientes preguntas para este capítulo');
      return;
    }

    // Pick 10 random questions
    const shuffled = eligible.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 10);

    // Set campaign mode
    App.campaignMode = {
      chapterId: chapter.id,
      worldIndex,
      chapterIndex,
      chapterName: chapter.name,
      worldName: world.name
    };

    // Set up game state directly (bypass startGame which rebuilds questions)
    App.selectedCategory = chapter.categories[0];
    App.selectedDifficulty = chapter.difficulty;
    App.currentQuestions = selected;
    App.currentQuestionIndex = 0;
    App.currentStreak = 0;
    App.sessionBestStreak = 0;
    App.sessionCorrect = 0;
    App.sessionWrong = 0;
    App.sessionPoints = 0;
    App.sessionCoins = 0;
    App.phaseHadError = false;
    App.currentPhase = 1;
    App.phaseCorrect = 0;
    App.phaseWrong = 0;
    App.initialDifficulty = chapter.difficulty;
    App.activeDifficulty = chapter.difficulty;
    App.categoryExhausted = false;
    App.diffCompletedInSession = [];
    App.sessionPowerupsUsed = 0;
    App.isSocialChallenge = false;
    App.loadLives();

    // Hide overlays
    const overlayIds = ['phase-overlay', 'gameover-overlay', 'ad-overlay', 'catcomplete-overlay'];
    overlayIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('hidden');
    });
    if (App.cleanOverlayTraps) App.cleanOverlayTraps();

    // Prevenir cuadros negros: forzar hidden en contenedores de imagen
    ['question-image-container', 'category-big-icon'].forEach(id => {
      document.getElementById(id)?.classList.add('hidden');
    });
    App.showScreen('quiz');
    if (App.playSound) App.playSound('gameStart');
    App.renderLives();
    App.renderQuestion();
  },

  // Show campaign result
  showCampaignResult(stars, correct, total, chapterId) {
    const screen = document.getElementById('campaign-result');
    if (!screen) return;

    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Reset stars first
    const starEls = screen.querySelectorAll('.result-star');
    starEls.forEach(el => el.classList.remove('filled'));

    // Update stats
    const correctEl = screen.querySelector('#campaign-result-correct');
    const totalEl = screen.querySelector('#campaign-result-total');
    const pctEl = screen.querySelector('#campaign-result-pct');
    const msgEl = screen.querySelector('#campaign-result-msg');
    const iconEl = screen.querySelector('.campaign-result-icon');

    if (correctEl) correctEl.textContent = correct;
    if (totalEl) totalEl.textContent = total;
    if (pctEl) pctEl.textContent = percentage + '%';

    let msg = '', icon = '⭐';
    if (stars === 3) { msg = '¡Perfecto! ¡3 estrellas! 🎉'; icon = '🏆'; }
    else if (stars === 2) { msg = '¡Muy bien! ¡2 estrellas!'; icon = '⭐'; }
    else if (stars === 1) { msg = '¡Capítulo completado!'; icon = '✅'; }
    else { msg = '¡Sigue intentando! Necesitas 60% para ganar 1 estrella'; icon = '💪'; }
    if (msgEl) msgEl.textContent = msg;
    if (iconEl) iconEl.textContent = icon;

    // Bonus de monedas por estrellas
    const coinBonus = [0, 20, 50, 100][stars] || 0;
    if (coinBonus > 0 && window.Storage) {
      Storage.addCoins(coinBonus);
      setTimeout(() => App.showToast(`⭐ ¡Capítulo completado! +${coinBonus} monedas`, 'success'), 1200);
    }

    // Botón de repetir capítulo
    const retryBtn = document.getElementById('btn-campaign-result-retry');
    if (retryBtn) {
      const wi = this._lastWorldIndex;
      const ci = this._lastChapterIndex;
      if (wi !== null && ci !== null) {
        retryBtn.classList.remove('hidden');
        retryBtn.onclick = () => this.startChapter(wi, ci);
      } else {
        retryBtn.classList.add('hidden');
      }
    }

    App.showScreen('campaign-result');

    // Animación escalonada de estrellas
    starEls.forEach((el, i) => {
      if (i < stars) {
        setTimeout(() => el.classList.add('filled'), 400 + i * 300);
      }
    });

    // Actualizar contador de estrellas en la pantalla principal
    const totalStarsEl = document.getElementById('campaign-total-stars');
    if (totalStarsEl) totalStarsEl.textContent = this.getTotalStars();
  },

  // Render world list
  renderWorlds() {
    const container = document.getElementById('campaign-worlds-list');
    if (!container) return;

    const totalStars = this.getTotalStars();
    const progress = this.getProgress();

    container.innerHTML = CAMPAIGN_WORLDS.map((world, wi) => {
      const worldStars = world.chapters.reduce((sum, ch) => {
        const p = progress[ch.id];
        return sum + (p ? p.stars : 0);
      }, 0);
      const maxWorldStars = world.chapters.length * 3;
      const isLocked = wi > 0 && totalStars < world.requiredStars;
      const pct = Math.round((worldStars / maxWorldStars) * 100);

      return `
        <div class="world-card ${isLocked ? 'locked' : ''}" onclick="${isLocked ? '' : `CampaignManager.openWorld(${wi})`}" role="button" tabindex="0">
          <div class="world-icon">${isLocked ? '🔒' : world.icon}</div>
          <div class="world-info">
            <div class="world-name">${world.name}</div>
            <div class="world-subtitle">${world.subtitle}</div>
            <div class="world-stars-bar">
              <div class="world-stars-fill" style="width:${pct}%"></div>
            </div>
            <div class="world-stars-text">${worldStars} / ${maxWorldStars} ⭐</div>
            ${isLocked ? `<div class="world-lock-msg">Necesitas ${world.requiredStars} ⭐ totales</div>` : ''}
          </div>
          <div class="world-arrow">${isLocked ? '🔒' : '›'}</div>
        </div>
      `;
    }).join('');
  },

  // Open a world to show its chapters
  openWorld(worldIndex) {
    this.selectedWorldIndex = worldIndex;
    this.renderChapters(worldIndex);
    App.showScreen('campaign-chapters');
  },

  // Render chapters for a world
  renderChapters(worldIndex) {
    const world = CAMPAIGN_WORLDS[worldIndex];
    const container = document.getElementById('campaign-chapters-grid');
    const titleEl = document.getElementById('campaign-chapters-title');
    if (!container) return;

    if (titleEl) titleEl.textContent = `${world.icon} ${world.name}`;

    const progress = this.getProgress();

    container.innerHTML = world.chapters.map((chapter, ci) => {
      const p = progress[chapter.id];
      const stars = p ? p.stars : 0;
      const isUnlocked = this.isChapterUnlocked(worldIndex, ci);
      const isCompleted = stars > 0;

      const starsHtml = [1, 2, 3].map(s =>
        `<span class="chapter-star ${stars >= s ? 'filled' : ''}">★</span>`
      ).join('');

      const diffLabel = { facil: 'Fácil', intermedio: 'Medio', dificil: 'Difícil', experto: 'Experto' }[chapter.difficulty] || chapter.difficulty;

      return `
        <div class="chapter-badge ${!isUnlocked ? 'locked' : isCompleted ? 'completed' : 'available'}"
          onclick="${isUnlocked ? `CampaignManager.startChapter(${worldIndex}, ${ci})` : ''}"
          role="button" tabindex="${isUnlocked ? 0 : -1}"
          title="${chapter.name}">
          <div class="chapter-number">${ci + 1}</div>
          <div class="chapter-stars">${isUnlocked ? starsHtml : '🔒'}</div>
          <div class="chapter-name">${chapter.name}</div>
          <div class="chapter-diff">${diffLabel}</div>
        </div>
      `;
    }).join('');
  }
};

window.CampaignManager = CampaignManager;
