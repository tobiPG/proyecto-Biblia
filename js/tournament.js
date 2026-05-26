// ============================================================
// TORNEOS LIGA - BibliaQuiz
// ============================================================

const TournamentManager = {
  currentTournament: null,
  myUid: null,
  _refreshInterval: null,

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
      return JSON.parse(localStorage.getItem('backend_user') || '{}').uid || '';
    } catch { return ''; }
  },

  async loadTournament() {
    this.myUid = this.getMyUid();
    const container = document.getElementById('tournament-content');
    if (container) container.innerHTML = '<p class="tournament-loading">Cargando torneo...</p>';
    this._stopRefresh();

    try {
      const res = await fetch(this.apiBase + '/tournaments/current', { headers: this.headers });
      const data = await res.json();
      this.currentTournament = data.tournament;
      this.renderTournament();
      if (this.currentTournament?.status === 'active') {
        this._startRefresh();
      }
    } catch (err) {
      console.error('[Tournament] Error:', err);
      if (container) container.innerHTML = '<p class="tournament-error">No se pudo conectar al servidor.<br>El servidor puede estar iniciando, intenta en unos segundos.</p>';
    }
  },

  renderTournament() {
    const t = this.currentTournament;
    const container = document.getElementById('tournament-content');
    if (!container) return;

    if (!t) {
      container.innerHTML = '<p class="tournament-error">No hay información del torneo.</p>';
      return;
    }

    if (t.status === 'rest') {
      this.renderRestPeriod(t);
    } else if (t.status === 'active') {
      this.renderActive(t);
    } else if (t.status === 'completed') {
      this.renderCompleted(t);
    }
  },

  renderRestPeriod(t) {
    const container = document.getElementById('tournament-content');
    const restEnd = new Date(t.restUntil);
    container.innerHTML = `
      <div class="tournament-rest">
        <div class="tournament-trophy">⏳</div>
        <h3>Próximo Torneo</h3>
        <p class="tournament-rest-msg">El siguiente torneo comenzará el</p>
        <div class="tournament-rest-date">${restEnd.toLocaleDateString('es-ES', { weekday:'long', day:'numeric', month:'long' })}</div>
        <p class="tournament-rest-sub">¡Prepárate para competir!</p>
      </div>
    `;
  },

  renderActive(t) {
    const container = document.getElementById('tournament-content');
    const myParticipant = t.participants.find(p => p.uid === this.myUid);
    const isEnrolled = !!myParticipant;
    const endDate = new Date(t.endDate);
    const timeLeft = this._formatCountdown(endDate - Date.now());
    const myRank = t.participants.findIndex(p => p.uid === this.myUid) + 1;

    const podiumColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
    const podiumLabels = ['🥇', '🥈', '🥉'];
    const prizes = [t.prizes?.first || 1000, t.prizes?.second || 500, t.prizes?.third || 250];

    const rowHtml = (p, i) => {
      const isMe = p.uid === this.myUid;
      const medal = i < 3 ? podiumLabels[i] : `${i + 1}`;
      return `
        <tr class="tournament-row ${isMe ? 'tournament-row-me' : ''} ${i < 3 ? 'tournament-row-top' : ''}">
          <td class="tournament-rank" style="${i < 3 ? `color:${podiumColors[i]};font-weight:900` : ''}">${medal}</td>
          <td class="tournament-name">${p.displayName || 'Jugador'}${isMe ? ' <span class="you-badge">Tú</span>' : ''}</td>
          <td class="tournament-pts">${p.points.toLocaleString()}</td>
          <td class="tournament-games">${p.gamesPlayed}</td>
          ${i < 3 ? `<td class="tournament-prize-col">+${prizes[i]} 🪙</td>` : '<td></td>'}
        </tr>
      `;
    };

    container.innerHTML = `
      <div class="tournament-header">
        <div class="tournament-trophy">🏆</div>
        <div>
          <div class="tournament-title">Torneo #${t.number}</div>
          <div class="tournament-countdown">⏳ ${timeLeft}</div>
        </div>
      </div>

      <div class="tournament-prizes-strip">
        <div class="prize-item"><span class="prize-place">🥇</span><span class="prize-coins">${prizes[0]} 🪙</span></div>
        <div class="prize-item"><span class="prize-place">🥈</span><span class="prize-coins">${prizes[1]} 🪙</span></div>
        <div class="prize-item"><span class="prize-place">🥉</span><span class="prize-coins">${prizes[2]} 🪙</span></div>
      </div>

      ${isEnrolled && myRank > 0 ? `
        <div class="tournament-myrank">Tu posición: <strong>#${myRank}</strong> · ${myParticipant.points.toLocaleString()} pts · ${myParticipant.gamesPlayed} partidas</div>
      ` : ''}

      <div class="tournament-table-wrap">
        ${t.participants.length === 0
          ? '<p class="tournament-empty">Nadie inscrito aún. ¡Sé el primero!</p>'
          : `<table class="tournament-table">
              <thead><tr>
                <th>#</th><th>Jugador</th><th>Puntos</th><th>Partidas</th><th>Premio</th>
              </tr></thead>
              <tbody>${t.participants.map((p, i) => rowHtml(p, i)).join('')}</tbody>
            </table>`
        }
      </div>

      ${isEnrolled
        ? `<div class="tournament-enrolled-msg">✅ Inscrito — tus puntos se acumulan automáticamente al jugar</div>`
        : this.myUid
          ? `<button class="btn-primary tournament-join-btn" onclick="TournamentManager.joinTournament()">⚔️ Inscribirme al Torneo</button>`
          : `<p class="tournament-login-msg">Inicia sesión para participar</p>`
      }
    `;
  },

  renderCompleted(t) {
    const container = document.getElementById('tournament-content');
    const podiumColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
    const tierNames = ['gold', 'silver', 'bronze'];
    const badgeIcons = ['👑', '🥈', '🥉'];

    const myWin = t.winners?.find(w => w.uid === this.myUid);

    container.innerHTML = `
      <div class="tournament-completed">
        <div class="tournament-trophy">🏆</div>
        <h3>Torneo #${t.number} Finalizado</h3>

        <div class="tournament-podium">
          ${(t.winners || []).map((w, i) => `
            <div class="podium-item podium-item-${tierNames[i]}" style="border-color:${podiumColors[i]}">
              <div class="podium-medal">${badgeIcons[i]}</div>
              <div class="podium-name">${w.displayName}</div>
              <div class="podium-prize" style="color:${podiumColors[i]}">+${w.coins} 🪙</div>
              <div class="podium-badge-note" style="color:${podiumColors[i]}">+ insignia exclusiva</div>
            </div>
          `).join('')}
        </div>

        <div class="podium-badge-info">
          🎖️ Los primeros 100 jugadores reciben una insignia permanente de este torneo
        </div>

        ${myWin ? `<div class="tournament-my-prize">🎉 ¡Ganaste ${myWin.coins} monedas + insignia ${['👑 Campeón', '🥈 2.º Lugar', '🥉 3.er Lugar'][myWin.place - 1]}! Revisa tus Logros.</div>` : ''}
        <p class="tournament-next">El próximo torneo comenzará en los próximos días. ¡Prepárate!</p>
      </div>
    `;
  },

  async joinTournament() {
    try {
      const res = await fetch(this.apiBase + '/tournaments/join', {
        method: 'POST',
        headers: this.headers
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al unirse');
      this.currentTournament = data.tournament;
      window.App?.showToast?.('✅ ¡Inscrito en el torneo! Tus puntos se acumularán al jugar.', 'success');
      this.renderTournament();
    } catch (err) {
      window.App?.showToast?.('❌ ' + err.message, 'error');
    }
  },

  // Called from app.js endGame() — fire-and-forget
  async submitScore(points) {
    if (!points || points <= 0) return;
    if (!localStorage.getItem('backend_token')) return;
    try {
      const res = await fetch(this.apiBase + '/tournaments/submit-score', {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ points })
      });
      const data = await res.json();
      if (data.success) {
        // Update local cache so leaderboard is fresh next time they open it
        if (this.currentTournament && data.leaderboard) {
          this.currentTournament.participants = data.leaderboard;
        }
      }
    } catch { /* silent — not critical */ }
  },

  _formatCountdown(ms) {
    if (ms <= 0) return 'Finalizando...';
    const days = Math.floor(ms / 86400000);
    const hours = Math.floor((ms % 86400000) / 3600000);
    const mins = Math.floor((ms % 3600000) / 60000);
    if (days > 0) return `${days}d ${hours}h restantes`;
    if (hours > 0) return `${hours}h ${mins}m restantes`;
    return `${mins}m restantes`;
  },

  _startRefresh() {
    this._refreshInterval = setInterval(() => {
      // Only refresh countdown in UI, full reload every 5 min
      const el = document.querySelector('.tournament-countdown');
      if (this.currentTournament?.endDate) {
        const left = this._formatCountdown(new Date(this.currentTournament.endDate) - Date.now());
        if (el) el.textContent = '⏳ ' + left;
      }
    }, 60000);
  },

  _stopRefresh() {
    if (this._refreshInterval) { clearInterval(this._refreshInterval); this._refreshInterval = null; }
  }
};

window.TournamentManager = TournamentManager;
