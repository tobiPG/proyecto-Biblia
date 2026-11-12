import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import type { ChronologyAnswer, ChronologyGame } from "../api/types";
import { ErrorBox } from "../components/ui";
import { useAuth } from "../lib/auth";
import { sounds } from "../lib/sound";

export default function Chronology() {
  const { refresh } = useAuth();
  const [game, setGame] = useState<ChronologyGame | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  const [result, setResult] = useState<ChronologyAnswer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function start() {
    setBusy(true);
    setError(null);
    try {
      const { game: g } = await api.startChronology();
      setGame(g);
      setOrder([]);
      setResult(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo empezar");
    } finally {
      setBusy(false);
    }
  }

  function tap(i: number) {
    if (result) return;
    setOrder(order.includes(i) ? order.filter((x) => x !== i) : [...order, i]);
  }

  async function check() {
    if (!game) return;
    setBusy(true);
    try {
      const r = await api.answerChronology(game.id, game.currentIndex, order);
      setResult(r);
      setGame({ ...game, score: r.score });
      if (r.perfect) sounds.correct();
      else sounds.wrong();
      if (r.finished) refresh().catch(() => undefined);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo comprobar");
    } finally {
      setBusy(false);
    }
  }

  async function next() {
    if (!game) return;
    const { game: g } = await api.chronology(game.id);
    setGame(g);
    setOrder([]);
    setResult(null);
  }

  if (!game) {
    return (
      <div>
        <h1 className="page-title">Cronología</h1>
        <div className="card space-y-3">
          <p>
            Toca los eventos en el orden en que ocurrieron. Son 10 rondas sin reloj: ordénalos todos bien para
            ganar <b>20 puntos</b>, o <b>10</b> si al menos dos quedan en su sitio.
          </p>
          {error && <ErrorBox message={error} />}
          <button className="btn-primary w-full py-3" onClick={start} disabled={busy}>
            Empezar
          </button>
        </div>
      </div>
    );
  }

  if (result?.finished && result.summary && !game.puzzle) {
    return <Summary s={result.summary} onAgain={start} />;
  }

  const puzzle = game.puzzle;
  if (!puzzle) {
    return result?.summary ? <Summary s={result.summary} onAgain={start} /> : null;
  }

  return (
    <div>
      <div className="mb-3 flex justify-between text-sm text-slate-400">
        <span>⏳ Cronología</span>
        <span>
          {game.currentIndex + 1} / {game.total} · <span className="font-semibold text-brand-300">{game.score} pts</span>
        </span>
      </div>
      <h1 className="card mb-4 text-lg font-semibold">{puzzle.question}</h1>
      <p className="mb-2 text-sm text-slate-400">Toca del más antiguo al más reciente. Toca otra vez para quitar.</p>
      <ul className="grid gap-2">
        {puzzle.items.map((item, i) => {
          const pos = order.indexOf(i);
          let style = pos >= 0 ? "border-brand-400 bg-brand-500/10" : "border-ink-700 bg-ink-900 hover:bg-ink-800";
          let badge: string | number = pos >= 0 ? pos + 1 : "";
          if (result) {
            const correctPos = result.correctOrder.indexOf(i);
            const ok = correctPos === pos;
            style = ok ? "border-emerald-400 bg-emerald-500/15" : "border-rose-400 bg-rose-500/15";
            badge = correctPos + 1;
          }
          return (
            <li key={i}>
              <button
                className={`flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left ${style}`}
                onClick={() => tap(i)}
                disabled={!!result}
                aria-pressed={pos >= 0}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-700 font-bold">
                  {badge}
                </span>
                {item}
              </button>
            </li>
          );
        })}
      </ul>
      {error && (
        <div className="mt-3">
          <ErrorBox message={error} />
        </div>
      )}
      {!result ? (
        <button
          className="btn-primary mt-4 w-full py-3"
          disabled={order.length !== puzzle.items.length || busy}
          onClick={check}
        >
          Comprobar
        </button>
      ) : (
        <div className="mt-4 space-y-3" aria-live="polite">
          <div
            className={`rounded-2xl border p-4 font-bold ${
              result.perfect
                ? "border-emerald-500/40 bg-emerald-500/10"
                : result.points > 0
                  ? "border-yellow-500/40 bg-yellow-500/10"
                  : "border-rose-500/40 bg-rose-500/10"
            }`}
          >
            {result.perfect
              ? `¡Perfecto! +${result.points} pts`
              : result.points > 0
                ? `¡Casi! ${result.positionsRight} en su sitio · +${result.points} pts`
                : "Orden incorrecto"}
            {!result.perfect && <p className="text-sm font-normal text-slate-300">Los números muestran el orden correcto.</p>}
          </div>
          {result.finished ? (
            <button className="btn-primary w-full py-3" onClick={() => setGame({ ...game, puzzle: null })}>
              Ver resultados
            </button>
          ) : (
            <button className="btn-primary w-full py-3" onClick={next}>
              Siguiente
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Summary({ s, onAgain }: { s: NonNullable<ChronologyAnswer["summary"]>; onAgain: () => void }) {
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-3xl font-bold">{s.perfect === s.total ? "¡Perfecto! 🎉" : "¡Buen trabajo!"}</h1>
      <div className="card grid grid-cols-2 gap-2">
        <div>
          <div className="text-2xl font-bold text-brand-300">{s.score}</div>
          <div className="text-xs text-slate-400">Puntos</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-brand-300">
            {s.perfect}/{s.total}
          </div>
          <div className="text-xs text-slate-400">Perfectas</div>
        </div>
      </div>
      <p className="text-sm text-slate-400">
        Nivel {s.level} · {s.totalPoints.toLocaleString("es")} puntos en total
      </p>
      {s.newBadges.length > 0 && (
        <div className="card text-left">
          <div className="mb-2 font-semibold">🏅 ¡Nuevas insignias!</div>
          {s.newBadges.map((b) => (
            <div key={b.id} className="flex items-center gap-3">
              <span className="text-2xl">{b.icon}</span>
              <span>
                <b>{b.name}</b> — <span className="text-sm text-slate-400">{b.description}</span>
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="grid gap-2">
        <button className="btn-primary" onClick={onAgain}>
          Jugar otra vez
        </button>
        <Link to="/" className="btn-ghost">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
