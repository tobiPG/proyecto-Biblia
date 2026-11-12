import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { ErrorBox } from "../components/ui";
import { useAuth } from "../lib/auth";
import { useAsync } from "../lib/useAsync";

export default function Home() {
  const { me } = useAuth();
  const navigate = useNavigate();
  const verses = useAsync(() => api.verses());
  const challenges = useAsync(() => api.challenges());
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  const pending = challenges.data?.challenges.filter((c) => c.canPlay || c.canRespond).length ?? 0;
  const levelPct = me ? Math.round((me.level.current / me.level.next) * 100) : 0;

  async function startDaily() {
    setStarting(true);
    setError(null);
    try {
      const { game } = await api.startDaily();
      navigate(`/partida/${game.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo empezar");
      setStarting(false);
    }
  }

  return (
    <div className="space-y-4">
      {me && (
        <div className="card">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold">Nivel {me.level.level}</span>
            <span className="text-slate-400">
              {me.level.current} / {me.level.next} pts
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink-700">
            <div className="h-full rounded-full bg-brand-400" style={{ width: `${levelPct}%` }} />
          </div>
        </div>
      )}

      <Link to="/jugar" className="card block bg-gradient-to-br from-brand-500/20 to-ink-900 hover:border-brand-400">
        <div className="text-3xl">🎮</div>
        <div className="mt-1 text-xl font-bold">Jugar</div>
        <div className="text-sm text-slate-300">Elige categoría y dificultad. 10 preguntas por partida.</div>
      </Link>

      <div className="grid grid-cols-2 gap-3">
        <Link to="/campana" className="card hover:border-brand-400">
          <div className="text-2xl">🗺️</div>
          <div className="font-bold">Campaña</div>
          <div className="text-xs text-slate-400">8 mundos, de Génesis a Apocalipsis</div>
        </Link>
        <Link to="/cronologia" className="card hover:border-brand-400">
          <div className="text-2xl">⏳</div>
          <div className="font-bold">Cronología</div>
          <div className="text-xs text-slate-400">Ordena los eventos bíblicos</div>
        </Link>
      </div>

      <div className="card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-lg font-bold">📅 Desafío diario</div>
            <div className="text-sm text-slate-400">
              Las mismas 10 preguntas para todos hoy.
              {me && me.dailyStreak > 0 && <> Racha: 🔥 {me.dailyStreak} días.</>}
            </div>
          </div>
          {me?.dailyDoneToday ? (
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">✓ Hecho</span>
          ) : (
            <button className="btn-primary" onClick={startDaily} disabled={starting}>
              Jugar
            </button>
          )}
        </div>
        {error && (
          <div className="mt-3">
            <ErrorBox message={error} />
          </div>
        )}
      </div>

      <Link to="/retos" className="card flex items-center justify-between hover:border-brand-400">
        <div>
          <div className="text-lg font-bold">⚔️ Retos 1 vs 1</div>
          <div className="text-sm text-slate-400">Reta a tus amigos con las mismas preguntas.</div>
        </div>
        {pending > 0 && (
          <span className="rounded-full bg-brand-500 px-2.5 py-0.5 text-sm font-bold text-ink-950">{pending}</span>
        )}
      </Link>

      {verses.data && (
        <Link to="/versiculos" className="card block hover:border-brand-400">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-300">Versículo del día</div>
          <blockquote className="italic text-slate-200">“{verses.data.today.text}”</blockquote>
          <div className="mt-1 text-sm text-slate-400">— {verses.data.today.ref}</div>
        </Link>
      )}
    </div>
  );
}
