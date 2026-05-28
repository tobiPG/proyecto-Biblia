// ============================================================
// CLANES / GRUPOS DE IGLESIA - BibliaQuiz
// ============================================================

const ClanManager = {
  myClan: null,
  searchResults: [],

  // Get API base URL (already includes /api in production)
  get apiBase() {
    return window.API_BASE_URL || 'http://localhost:3001/api';
  },

  // Get auth headers
  get headers() {
    const token = localStorage.getItem('backend_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (token || '')
    };
  },

  // Load user's clan from backend
  async loadClan() {
    // Show cached data immediately while fetching
    const cached = this._loadCached();
    if (cached && !this.myClan) {
      this.myClan = cached;
      this.renderClanHome();
    }
    try {
      const res = await fetch(this.apiBase + '/clans/my', { headers: this.headers });
      if (!res.ok) throw new Error('Error al cargar clan');
      const data = await res.json();
      this.myClan = data.clan;
      this._saveCache(data.clan);
      this.renderClanHome();
    } catch (err) {
      console.error('[Clans] Error loading clan:', err);
      // Only reset to null if we have nothing cached — don't destroy good data on network errors
      if (!this.myClan) {
        this.renderClanHome();
      }
    }
  },

  _saveCache(clan) {
    try {
      if (clan) localStorage.setItem('clan_cache', JSON.stringify(clan));
      else localStorage.removeItem('clan_cache');
    } catch (e) {}
  },

  _loadCached() {
    try {
      const raw = localStorage.getItem('clan_cache');
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  },

  // Render clan home screen
  renderClanHome() {
    const container = document.getElementById('clan-home-content');
    if (!container) return;

    if (!this.myClan) {
      container.innerHTML = `
        <div class="clan-no-clan">
          <div class="clan-no-clan-icon">⛪</div>
          <h3>No perteneces a ningún clan</h3>
          <p>Únete a un clan de tu iglesia o crea uno nuevo para competir juntos</p>
          <div class="clan-join-options">
            <button class="btn-primary" onclick="ClanManager.showCreateClan()">✨ Crear Clan</button>
            <button class="btn-secondary" onclick="ClanManager.showSearchClan()">🔍 Buscar Clan</button>
          </div>
        </div>
      `;
      return;
    }

    const clan = this.myClan;
    const isLeader = clan.leader === this.getMyUid();

    // Sort members by weekly points
    const sortedMembers = [...(clan.members || [])].sort((a, b) => (b.weeklyPoints || 0) - (a.weeklyPoints || 0));

    container.innerHTML = `
      <div class="clan-header-card">
        <div class="clan-emoji">${clan.emoji || '⛪'}</div>
        <div class="clan-header-info">
          <div class="clan-name">${clan.name}</div>
          <div class="clan-tag">#${clan.tag}</div>
          <div class="clan-desc">${clan.description || ''}</div>
        </div>
        <div class="clan-header-stats">
          <div class="clan-stat"><span class="clan-stat-val">${sortedMembers.length}</span><span class="clan-stat-lbl">Miembros</span></div>
          <div class="clan-stat"><span class="clan-stat-val">${clan.weeklyPoints || 0}</span><span class="clan-stat-lbl">Pts Semana</span></div>
          <div class="clan-stat"><span class="clan-stat-val">${clan.totalPoints || 0}</span><span class="clan-stat-lbl">Pts Totales</span></div>
        </div>
      </div>

      <div class="clan-members-section">
        <h4 class="clan-section-title">🏆 Ranking Semanal</h4>
        <div class="clan-members-list">
          ${sortedMembers.map((m, i) => `
            <div class="clan-member-row ${m.uid === this.getMyUid() ? 'me' : ''}">
              <div class="clan-member-rank">${i + 1}</div>
              <div class="clan-member-avatar">${m.displayName ? m.displayName[0].toUpperCase() : '?'}</div>
              <div class="clan-member-info">
                <div class="clan-member-name">${m.displayName || 'Jugador'}${m.uid === clan.leader ? ' 👑' : ''}</div>
              </div>
              <div class="clan-member-pts">${m.weeklyPoints || 0} pts</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="clan-actions">
        <button class="btn-secondary clan-leaderboard-btn" onclick="ClanManager.showLeaderboard()">🏆 Ranking de Clanes</button>
        <button class="btn-danger clan-leave-btn" onclick="ClanManager.leaveClan()">🚪 Salir del Clan</button>
      </div>
    `;
  },

  // Get current user UID
  getMyUid() {
    try {
      const user = JSON.parse(localStorage.getItem('backend_user') || '{}');
      return user.uid || '';
    } catch (e) {
      return '';
    }
  },

  // Show create clan form
  showCreateClan() {
    const container = document.getElementById('clan-home-content');
    if (!container) return;

    container.innerHTML = `
      <div class="clan-form">
        <h3>✨ Crear un Clan</h3>
        <div class="clan-form-field">
          <label>Nombre del Clan *</label>
          <input type="text" id="clan-input-name" maxlength="30" placeholder="Ej: Iglesia Bethel" class="clan-input">
        </div>
        <div class="clan-form-field">
          <label>Descripción</label>
          <textarea id="clan-input-desc" maxlength="150" placeholder="Descripción breve..." class="clan-input clan-textarea"></textarea>
        </div>
        <div class="clan-form-field">
          <label>Emoji del Clan</label>
          <div class="clan-emoji-picker">
            ${['⛪','✝️','🙏','📖','🕊️','⭐','🔥','👑','💒','🌟'].map(e =>
              `<span class="clan-emoji-opt" onclick="ClanManager.selectEmoji('${e}')">${e}</span>`
            ).join('')}
          </div>
          <div id="clan-selected-emoji" class="clan-selected-emoji">⛪</div>
        </div>
        <div class="clan-form-field clan-toggle-row">
          <label>Clan Abierto</label>
          <input type="checkbox" id="clan-input-open" checked class="clan-checkbox">
        </div>
        <div class="clan-form-actions">
          <button class="btn-primary" onclick="ClanManager.createClan()">Crear Clan</button>
          <button class="btn-secondary" onclick="ClanManager.loadClan()">Cancelar</button>
        </div>
      </div>
    `;
    this._selectedEmoji = '⛪';
  },

  selectEmoji(emoji) {
    this._selectedEmoji = emoji;
    const el = document.getElementById('clan-selected-emoji');
    if (el) el.textContent = emoji;
    document.querySelectorAll('.clan-emoji-opt').forEach(opt => {
      opt.classList.toggle('selected', opt.textContent === emoji);
    });
  },

  // Create clan
  async createClan() {
    const name = document.getElementById('clan-input-name')?.value?.trim();
    const description = document.getElementById('clan-input-desc')?.value?.trim() || '';
    const emoji = this._selectedEmoji || '⛪';
    const isOpen = document.getElementById('clan-input-open')?.checked !== false;

    if (!name || name.length < 2) {
      App.showToast('⚠️ El nombre debe tener al menos 2 caracteres');
      return;
    }

    try {
      const res = await fetch(this.apiBase + '/clans/create', {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ name, description, emoji, isOpen })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al crear clan');

      this.myClan = data.clan;
      this._saveCache(data.clan);
      App.showToast('✅ Clan creado correctamente');
      this.renderClanHome();
    } catch (err) {
      App.showToast('❌ ' + err.message);
    }
  },

  // Show search clan
  showSearchClan() {
    App.showScreen('clan-search');
    this.renderClanSearch();
  },

  // Render clan search
  renderClanSearch() {
    const container = document.getElementById('clan-search-results');
    if (container) container.innerHTML = '<p class="clan-search-hint">Escribe el nombre de un clan para buscarlo</p>';
  },

  // Search clans
  async searchClans() {
    const q = document.getElementById('clan-search-input')?.value?.trim();
    if (!q || q.length < 2) {
      App.showToast('⚠️ Escribe al menos 2 caracteres');
      return;
    }

    const container = document.getElementById('clan-search-results');
    if (container) container.innerHTML = '<p>Buscando...</p>';

    try {
      const res = await fetch(this.apiBase + '/clans/search?q=' + encodeURIComponent(q), { headers: this.headers });
      const data = await res.json();
      this.searchResults = data.clans || [];
      this.renderSearchResults();
    } catch (err) {
      App.showToast('❌ Error al buscar clanes');
    }
  },

  // Render search results
  renderSearchResults() {
    const container = document.getElementById('clan-search-results');
    if (!container) return;

    if (this.searchResults.length === 0) {
      container.innerHTML = '<p class="clan-no-results">No se encontraron clanes</p>';
      return;
    }

    container.innerHTML = this.searchResults.map(clan => `
      <div class="clan-search-card">
        <div class="clan-search-emoji">${clan.emoji || '⛪'}</div>
        <div class="clan-search-info">
          <div class="clan-search-name">${clan.name}</div>
          <div class="clan-search-tag">#${clan.tag} • ${clan.members?.length || 0}/${clan.maxMembers || 50} miembros</div>
          <div class="clan-search-desc">${clan.description || ''}</div>
        </div>
        <button class="btn-primary clan-join-btn" onclick="ClanManager.joinClan('${clan.tag}')">Unirse</button>
      </div>
    `).join('');
  },

  // Join clan
  async joinClan(tag) {
    try {
      const res = await fetch(this.apiBase + '/clans/join/' + tag, {
        method: 'POST',
        headers: this.headers
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al unirse al clan');

      this.myClan = data.clan;
      this._saveCache(data.clan);
      App.showToast('✅ Te has unido al clan ' + data.clan.name);
      App.showScreen('clans');
      this.renderClanHome();
    } catch (err) {
      App.showToast('❌ ' + err.message);
    }
  },

  // Leave clan
  async leaveClan() {
    if (!confirm('¿Seguro que quieres salir del clan?')) return;

    try {
      const res = await fetch(this.apiBase + '/clans/leave', {
        method: 'POST',
        headers: this.headers
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al salir del clan');

      this.myClan = null;
      this._saveCache(null);
      App.showToast('Has salido del clan');
      this.renderClanHome();
    } catch (err) {
      App.showToast('❌ ' + err.message);
    }
  },

  // Show leaderboard
  async showLeaderboard() {
    App.showScreen('clan-leaderboard');
    await this.renderLeaderboard();
  },

  // Render clan leaderboard
  async renderLeaderboard() {
    const container = document.getElementById('clan-leaderboard-list');
    if (!container) return;

    container.innerHTML = '<p>Cargando...</p>';

    try {
      const res = await fetch(this.apiBase + '/clans/leaderboard', { headers: this.headers });
      const data = await res.json();
      const clans = data.clans || [];

      if (clans.length === 0) {
        container.innerHTML = '<p>No hay clanes todavía</p>';
        return;
      }

      const rankClass = (i) => i === 0 ? 'clan-lb-rank-gold' : i === 1 ? 'clan-lb-rank-silver' : i === 2 ? 'clan-lb-rank-bronze' : '';
      const rankLabel = (i) => i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1;
      container.innerHTML = clans.map((clan, i) => `
        <div class="clan-lb-row ${clan.tag === this.myClan?.tag ? 'my-clan' : ''}">
          <div class="clan-lb-rank ${rankClass(i)}">${rankLabel(i)}</div>
          <div class="clan-lb-emoji">${clan.emoji || '⛪'}</div>
          <div class="clan-lb-info">
            <div class="clan-lb-name">${clan.name}</div>
            <div class="clan-lb-tag">#${clan.tag} • ${clan.members?.length || 0} miembros</div>
          </div>
          <div class="clan-lb-pts">${clan.weeklyPoints || 0}<span>pts</span></div>
        </div>
      `).join('');
    } catch (err) {
      container.innerHTML = '<p>Error al cargar el ranking</p>';
    }
  },

  // Add points after a quiz
  async addPointsFromQuiz(points) {
    if (!points || points <= 0) return;
    try {
      await fetch(this.apiBase + '/clans/addPoints', {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ points })
      });
    } catch (err) {
      console.error('[Clans] Error adding points:', err);
    }
  }
};

window.ClanManager = ClanManager;
