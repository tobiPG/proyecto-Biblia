// ============================================================
// TORNEOS SEMANALES - BibliaQuiz
// ============================================================

const TournamentManager = {
  currentTournament: null,
  myUid: null,

  // Get API base URL (already includes /api in production)
  get apiBase() {
    return window.API_BASE_URL || 'http://localhost:3001/api';
  },

  get headers() {
    const token = localStorage.getItem('backend_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (token || '')
    };
  },

  getMyUid() {
    try {
      const user = JSON.parse(localStorage.getItem('backend_user') || '{}');
      return user.uid || '';
    } catch (e) {
      return '';
    }
  },

  // Load current tournament
  async loadTournament() {
    this.myUid = this.getMyUid();
    const container = document.getElementById('tournament-content');
    if (container) container.innerHTML = '<p class="tournament-loading">Cargando torneo...</p>';

    try {
      const res = await fetch(this.apiBase + '/tournaments/current', { headers: this.headers });
      const data = await res.json();
      this.currentTournament = data.tournament;
      this.renderTournament();
    } catch (err) {
      console.error('[Tournament] Error:', err);
      if (container) container.innerHTML = '<p class="tournament-error">Error al cargar el torneo</p>';
    }
  },

  // Render tournament based on status
  renderTournament() {
    const t = this.currentTournament;
    if (!t) return;

    if (t.status === 'registration') {
      this.renderRegistration();
    } else if (t.status === 'active') {
      this.renderBracket();
    } else if (t.status === 'completed') {
      this.renderCompleted();
    }
  },

  // Render registration screen
  renderRegistration() {
    const t = this.currentTournament;
    const container = document.getElementById('tournament-content');
    if (!container) return;

    const isJoined = t.participants.some(p => p.uid === this.myUid);
    const spotsLeft = (t.maxParticipants || 16) - t.participants.length;
    const startDate = t.startDate ? new Date(t.startDate).toLocaleDateString('es-ES') : 'Próximamente';

    container.innerHTML = `
      <div class="tournament-registration">
        <div class="tournament-banner">
          <div class="tournament-trophy">🏆</div>
          <div class="tournament-title-info">
            <h3>Torneo Semanal</h3>
            <p>Semana ${t.weekNumber} · ${t.year}</p>
          </div>
        </div>

        <div class="tournament-prize">
          <div class="tournament-prize-icon">🪙</div>
          <div class="tournament-prize-info">
            <div class="tournament-prize-amount">${t.prizeCoins || 500}</div>
            <div class="tournament-prize-label">Monedas al Campeón</div>
          </div>
        </div>

        <div class="tournament-info-grid">
          <div class="tournament-info-item">
            <span class="info-icon">👥</span>
            <span>${t.participants.length} / ${t.maxParticipants || 16} jugadores</span>
          </div>
          <div class="tournament-info-item">
            <span class="info-icon">📅</span>
            <span>Inicia: ${startDate}</span>
          </div>
          <div class="tournament-info-item">
            <span class="info-icon">⚔️</span>
            <span>Eliminación directa</span>
          </div>
        </div>

        <div class="tournament-participants-preview">
          <h4>Participantes inscritos (${t.participants.length}/${t.maxParticipants || 16})</h4>
          <div class="tournament-participants-list">
            ${t.participants.map((p, i) => `
              <div class="tournament-participant ${p.uid === this.myUid ? 'me' : ''}">
                <span class="participant-num">${i + 1}</span>
                <span class="participant-name">${p.displayName || 'Jugador'}${p.uid === this.myUid ? ' (Tú)' : ''}</span>
              </div>
            `).join('') || '<p class="no-participants">Sé el primero en inscribirte</p>'}
          </div>
        </div>

        ${isJoined
          ? `<div class="tournament-joined-msg">✅ Ya estás inscrito. Espera a que el torneo comience.</div>`
          : spotsLeft > 0
            ? `<button class="btn-primary tournament-join-btn" onclick="TournamentManager.joinTournament()">🏆 Inscribirme al Torneo</button>`
            : `<div class="tournament-full-msg">El torneo está lleno. El torneo comenzará pronto.</div>`
        }
      </div>
    `;
  },

  // Render active bracket
  renderBracket() {
    const t = this.currentTournament;
    const container = document.getElementById('tournament-content');
    if (!container) return;

    // Group matches by round
    const rounds = {};
    (t.bracket || []).forEach(match => {
      if (!rounds[match.round]) rounds[match.round] = [];
      rounds[match.round].push(match);
    });

    const roundNames = { 1: 'Cuartos de Final', 2: 'Semifinales', 3: 'Final' };

    // Build participant map
    const participantMap = {};
    (t.participants || []).forEach(p => { participantMap[p.uid] = p.displayName; });

    const getPlayerName = (uid) => {
      if (!uid) return 'BYE';
      if (uid.startsWith('tbd_')) return 'Por determinar';
      return participantMap[uid] || uid;
    };

    const bracketHtml = Object.keys(rounds).sort((a, b) => a - b).map(round => {
      const roundMatches = rounds[round];
      return `
        <div class="bracket-round">
          <div class="bracket-round-title">${roundNames[round] || 'Ronda ' + round}</div>
          <div class="bracket-matches">
            ${roundMatches.map(match => `
              <div class="bracket-match ${match.status}">
                <div class="bracket-player ${match.winner === match.player1Uid ? 'winner' : match.status === 'completed' ? 'loser' : ''}">
                  <span class="player-name">${getPlayerName(match.player1Uid)}</span>
                  <span class="player-score">${match.score1 || 0}</span>
                </div>
                <div class="bracket-vs">vs</div>
                <div class="bracket-player ${match.winner === match.player2Uid ? 'winner' : match.status === 'completed' ? 'loser' : ''}">
                  <span class="player-name">${getPlayerName(match.player2Uid)}</span>
                  <span class="player-score">${match.score2 || 0}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="tournament-active">
        <div class="tournament-banner">
          <div class="tournament-trophy">🏆</div>
          <div class="tournament-title-info">
            <h3>Torneo Activo</h3>
            <p>Semana ${t.weekNumber} · ${t.year}</p>
          </div>
        </div>
        <div class="bracket-container">
          ${bracketHtml || '<p>El bracket no está disponible todavía</p>'}
        </div>
      </div>
    `;
  },

  // Render completed tournament
  renderCompleted() {
    const t = this.currentTournament;
    const container = document.getElementById('tournament-content');
    if (!container) return;

    const participantMap = {};
    (t.participants || []).forEach(p => { participantMap[p.uid] = p.displayName; });
    const championName = t.champion ? (participantMap[t.champion] || 'Desconocido') : 'Nadie';

    container.innerHTML = `
      <div class="tournament-completed">
        <div class="tournament-champion-display">
          <div class="champion-trophy">🏆</div>
          <h3>¡Campeón!</h3>
          <div class="champion-name">${championName}</div>
          <div class="champion-prize">+${t.prizeCoins || 500} 🪙</div>
        </div>
        <p class="tournament-next">El próximo torneo comenzará la siguiente semana. ¡Prepárate!</p>
      </div>
    `;
  },

  // Join tournament
  async joinTournament() {
    try {
      const res = await fetch(this.apiBase + '/tournaments/join', {
        method: 'POST',
        headers: this.headers
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al unirse al torneo');

      this.currentTournament = data.tournament;
      App.showToast('✅ ¡Inscrito en el torneo!');
      this.renderTournament();
    } catch (err) {
      App.showToast('❌ ' + err.message);
    }
  }
};

window.TournamentManager = TournamentManager;
