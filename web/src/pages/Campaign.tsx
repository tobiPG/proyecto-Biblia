import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import type { CampaignWorld } from "../api/types";
import { ErrorBox, Loading } from "../components/ui";
import { difficultyName, useCatalog } from "../lib/catalog";
import { useAsync } from "../lib/useAsync";

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} de 3 estrellas`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={i < n ? "" : "opacity-20 grayscale"}>
          ⭐
        </span>
      ))}
    </span>
  );
}

export default function CampaignPage() {
  const { data, error, loading, reload } = useAsync(() => api.campaign());
  const [open, setOpen] = useState<string | null>(null);

  if (loading && !data) return <Loading />;
  if (error || !data) return <ErrorBox message={error ?? "Sin datos"} onRetry={reload} />;

  // Por defecto se despliega el último mundo desbloqueado.
  const current = open ?? [...data.worlds].reverse().find((w) => w.unlocked)?.id ?? data.worlds[0].id;
  const pct = Math.round((data.totalStars / data.maxStars) * 100);

  return (
    <div>
      <h1 className="page-title">Campaña</h1>
      <div className="card mb-4">
        <div className="flex justify-between text-sm">
          <span className="font-semibold">⭐ {data.totalStars} estrellas</span>
          <span className="text-slate-400">de {data.maxStars}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink-700">
          <div className="h-full rounded-full bg-yellow-400" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-xs text-slate-400">
          6 aciertos = ⭐ · 8 aciertos = ⭐⭐ · 10 aciertos = ⭐⭐⭐. Consigue al menos una estrella para abrir el
          siguiente capítulo.
        </p>
      </div>
      <ul className="space-y-2">
        {data.worlds.map((w) => (
          <World
            key={w.id}
            world={w}
            expanded={current === w.id}
            totalStars={data.totalStars}
            onToggle={() => setOpen(current === w.id ? "" : w.id)}
          />
        ))}
      </ul>
    </div>
  );
}

function World({
  world,
  expanded,
  totalStars,
  onToggle,
}: {
  world: CampaignWorld;
  expanded: boolean;
  totalStars: number;
  onToggle: () => void;
}) {
  const catalog = useCatalog();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const earned = world.chapters.reduce((n, c) => n + c.stars, 0);

  async function play(chapterId: string) {
    setBusy(chapterId);
    setError(null);
    try {
      const { game } = await api.playChapter(chapterId);
      navigate(`/partida/${game.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo empezar");
      setBusy(null);
    }
  }

  return (
    <li className={`card p-0 ${world.unlocked ? "" : "opacity-60"}`}>
      <button
        className="flex w-full items-center gap-3 p-4 text-left"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        <span className="text-3xl">{world.unlocked ? world.icon : "🔒"}</span>
        <span className="flex-1">
          <span className="block font-bold">{world.name}</span>
          <span className="text-sm text-slate-400">
            {world.unlocked ? world.subtitle : `Necesitas ${world.requiredStars} ⭐ (tienes ${totalStars})`}
          </span>
        </span>
        <span className="text-sm text-slate-400">
          {earned}/{world.chapters.length * 3} ⭐
        </span>
      </button>
      {expanded && (
        <div className="border-t border-ink-700 p-2">
          {error && (
            <div className="m-2">
              <ErrorBox message={error} />
            </div>
          )}
          <ol className="space-y-1">
            {world.chapters.map((c, i) => (
              <li key={c.id} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-ink-800">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-700 text-sm font-bold">
                  {c.unlocked ? i + 1 : "🔒"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{c.name}</span>
                  <span className="text-xs text-slate-400">
                    {difficultyName(catalog, c.difficulty)} · <Stars n={c.stars} />
                  </span>
                </span>
                {c.unlocked ? (
                  <button
                    className={c.stars > 0 ? "btn-ghost px-3 py-1.5 text-sm" : "btn-primary px-3 py-1.5 text-sm"}
                    disabled={busy !== null}
                    onClick={() => play(c.id)}
                  >
                    {busy === c.id ? "…" : c.stars > 0 ? "Repetir" : "Jugar"}
                  </button>
                ) : (
                  <span className="px-3 text-xs text-slate-500">Bloqueado</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </li>
  );
}
