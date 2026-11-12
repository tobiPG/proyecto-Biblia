import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api/client";
import type { AnswerResult, Game, GameSummary } from "../api/types";
import { ErrorBox, Loading } from "../components/ui";
import { useAuth } from "../lib/auth";
import { difficultyName, useCatalog, useCategory } from "../lib/catalog";
import { sounds } from "../lib/sound";

type Phase = "loading" | "question" | "feedback" | "finished" | "error";

export default function GamePage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { refresh } = useAuth();
  const catalog = useCatalog();
  const [game, setGame] = useState<Game | null>(null);
  const [phase, setPhase] = useState<Phase>("loading");
  const [error, setError] = useState<string | null>(null);
  const [chosen, setChosen] = useState<number | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [summary, setSummary] = useState<GameSummary | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const deadline = useRef(0);
  const sending = useRef(false);
  const category = useCategory(game?.category ?? "");

  /** Abre la pregunta actual en el servidor (arranca su reloj) y la muestra. */
  const openQuestion = useCallback(
    async (g: Game) => {
      if (g.status !== "active" || !g.question) {
        navigate("/", { replace: true });
        return;
      }
      const { game: opened } = await api.startQuestion(g.id, g.currentIndex);
      setGame(opened);
      setChosen(null);
      setResult(null);
      deadline.current = Date.now() + opened.secondsLeft * 1000;
      setSecondsLeft(opened.secondsLeft);
      setPhase("question");
    },
    [navigate]
  );

  useEffect(() => {
    api
      .game(id)
      .then(({ game: g }) => openQuestion(g))
      .catch((e) => {
        setError(e instanceof Error ? e.message : "No se pudo cargar la partida");
        setPhase("error");
      });
  }, [id, openQuestion]);

  const submit = useCallback(
    async (option: number) => {
      if (!game || sending.current) return;
      sending.current = true;
      setChosen(option);
      try {
        const r = await api.answer(game.id, game.currentIndex, option);
        setResult(r);
        setGame({ ...game, score: r.score, streak: r.streak, correctCount: game.correctCount + (r.correct ? 1 : 0) });
        if (r.correct) sounds.correct();
        else sounds.wrong();
        if (r.summary) setSummary(r.summary);
        setPhase("feedback");
      } catch (e) {
        setError(e instanceof Error ? e.message : "No se pudo enviar la respuesta");
      } finally {
        sending.current = false;
      }
    },
    [game]
  );

  // Cuenta atrás; al llegar a 0 se envía como "sin respuesta" (-1).
  useEffect(() => {
    if (phase !== "question") return;
    const t = setInterval(() => {
      const left = Math.max(0, Math.ceil((deadline.current - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) {
        clearInterval(t);
        submit(-1);
      }
    }, 250);
    return () => clearInterval(t);
  }, [phase, submit]);

  async function next() {
    if (!game || !result) return;
    if (result.finished) {
      sounds.finish();
      setPhase("finished");
      refresh().catch(() => undefined);
      return;
    }
    try {
      await openQuestion({ ...game, currentIndex: game.currentIndex + 1 });
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo continuar");
    }
  }

  if (phase === "loading") return <Loading label="Preparando partida…" />;
  if (phase === "error" || !game) return <ErrorBox message={error ?? "Partida no disponible"} />;
  if (phase === "finished" && summary) return <Results summary={summary} />;

  const q = game.question!;
  const pct = (secondsLeft / game.secondsPerQuestion) * 100;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
        <span>
          {category?.icon} {category?.name ?? "Mixto"} · {difficultyName(catalog, game.difficulty)}
        </span>
        <span>
          {game.currentIndex + 1} / {game.total}
        </span>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-700" aria-hidden="true">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              secondsLeft <= 5 ? "bg-rose-400" : "bg-brand-400"
            }`}
            style={{ width: `${phase === "question" ? pct : 0}%` }}
          />
        </div>
        <span className="w-10 text-right font-mono text-sm" aria-label={`${secondsLeft} segundos`}>
          {phase === "question" ? `${secondsLeft}s` : "—"}
        </span>
      </div>

      <div className="mb-2 flex justify-between text-sm">
        <span className="font-semibold text-brand-300">{game.score} pts</span>
        {game.streak >= 2 && <span className="text-orange-300">🔥 Racha {game.streak}</span>}
      </div>

      <h1 className="card mb-4 text-lg font-semibold leading-snug">{q.question}</h1>
      {q.image && (
        <img src={q.image} alt="Imagen de apoyo para la pregunta" className="mb-4 w-full rounded-2xl bg-white/5 p-2" />
      )}

      <div className="grid gap-2" role="group" aria-label="Opciones">
        {q.options.map((opt, i) => {
          let style = "border-ink-700 bg-ink-900 hover:bg-ink-800";
          if (phase === "feedback" && result) {
            if (i === result.correctIndex) style = "border-emerald-400 bg-emerald-500/15 text-emerald-100";
            else if (i === chosen) style = "border-rose-400 bg-rose-500/15 text-rose-100";
            else style = "border-ink-700 bg-ink-900 opacity-60";
          } else if (i === chosen) style = "border-brand-400 bg-brand-500/10";
          return (
            <button
              key={i}
              disabled={phase !== "question" || chosen !== null}
              onClick={() => submit(i)}
              className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-colors ${style}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-700 text-sm font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {error && phase === "question" && (
        <div className="mt-3">
          <ErrorBox message={error} />
        </div>
      )}

      {phase === "feedback" && result && (
        <div className="mt-4 space-y-3" aria-live="polite">
          <div
            className={`rounded-2xl border p-4 ${
              result.correct ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"
            }`}
          >
            <div className="font-bold">
              {result.correct
                ? `¡Correcto! +${result.points} pts`
                : result.timedOut
                  ? "⏰ Se acabó el tiempo"
                  : "Incorrecto"}
            </div>
            {result.explanation && <p className="mt-1 text-sm text-slate-300">{result.explanation}</p>}
            {result.reference && <p className="mt-1 text-xs text-slate-400">📖 {result.reference}</p>}
          </div>
          <button className="btn-primary w-full py-3" onClick={next} autoFocus>
            {result.finished ? "Ver resultados" : "Siguiente"}
          </button>
        </div>
      )}
    </div>
  );
}

function Results({ summary }: { summary: GameSummary }) {
  const pct = Math.round((summary.correct / summary.total) * 100);
  const title = pct === 100 ? "¡Perfecto! 🎉" : pct >= 70 ? "¡Muy bien! 👏" : pct >= 40 ? "¡Buen intento!" : "¡Sigue practicando!";
  return (
    <div className="space-y-4 text-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="card grid grid-cols-3 gap-2">
        <Stat label="Puntos" value={summary.score} />
        <Stat label="Aciertos" value={`${summary.correct}/${summary.total}`} />
        <Stat label="Mejor racha" value={summary.bestStreak} />
      </div>
      <p className="text-sm text-slate-400">
        Nivel {summary.level} · {summary.totalPoints.toLocaleString("es")} puntos en total
      </p>

      {summary.newBadges.length > 0 && (
        <div className="card text-left">
          <div className="mb-2 font-semibold">🏅 ¡Nuevas insignias!</div>
          <ul className="space-y-2">
            {summary.newBadges.map((b) => (
              <li key={b.id} className="flex items-center gap-3">
                <span className="text-2xl">{b.icon}</span>
                <span>
                  <span className="block font-semibold">{b.name}</span>
                  <span className="text-sm text-slate-400">{b.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {summary.mode === "challenge" && (
        <p className="text-sm text-slate-300">
          Tu resultado quedó guardado. Verás quién ganó cuando tu amigo juegue.
        </p>
      )}

      <div className="grid gap-2">
        {summary.mode === "challenge" ? (
          <Link to="/retos" className="btn-primary">
            Ver mis retos
          </Link>
        ) : (
          <Link to="/jugar" className="btn-primary">
            Jugar otra vez
          </Link>
        )}
        <Link to="/" className="btn-ghost">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <div className="text-2xl font-bold text-brand-300">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}
