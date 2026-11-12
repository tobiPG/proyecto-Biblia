import { api } from "../api/client";
import { Empty, ErrorBox, Loading, Section, formatDate } from "../components/ui";
import { RANDOM_CATEGORY, useCatalog } from "../lib/catalog";
import { useAsync } from "../lib/useAsync";

const MODE_LABEL = { solo: "Partida", daily: "Diario", challenge: "Reto" } as const;

export default function Progress() {
  const catalog = useCatalog();
  const { data, error, loading, reload } = useAsync(() => api.stats());
  if (loading && !data) return <Loading />;
  if (error || !data) return <ErrorBox message={error ?? "Sin datos"} onRetry={reload} />;

  const s = data.stats;
  const answered = s.totalCorrect + s.totalWrong;
  const accuracy = answered ? Math.round((s.totalCorrect / answered) * 100) : 0;
  const earned = data.badges.filter((b) => b.earnedAt).length;
  const catName = (id: string) =>
    id === "aleatorio" ? RANDOM_CATEGORY : catalog?.categories.find((c) => c.id === id) ?? { name: id, icon: "📘" };

  return (
    <div>
      <h1 className="page-title">Mi progreso</h1>

      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <Tile label="Nivel" value={data.level.level} />
        <Tile label="Puntos" value={s.totalPoints.toLocaleString("es")} />
        <Tile label="Partidas" value={s.totalGames} />
        <Tile label="Precisión" value={`${accuracy}%`} />
        <Tile label="Mejor racha" value={s.bestStreak} />
        <Tile label="Retos ganados" value={s.challengesWon} />
        <Tile label="Partidas perfectas" value={s.perfectGames} />
        <Tile label="Racha diaria" value={`${s.dailyStreak} días`} />
        <Tile label="Mejor racha diaria" value={`${s.dailyBestStreak} días`} />
      </div>

      <Section title="Por categoría">
        {data.categories.length === 0 ? (
          <Empty>Juega una partida para ver tus estadísticas.</Empty>
        ) : (
          <ul className="space-y-2">
            {[...data.categories]
              .sort((a, b) => b.correct + b.wrong - (a.correct + a.wrong))
              .map((c) => {
                const total = c.correct + c.wrong;
                const pct = total ? Math.round((c.correct / total) * 100) : 0;
                const cat = catName(c.category);
                return (
                  <li key={c.category} className="card p-3">
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="font-semibold">
                        {cat.icon} {cat.name}
                      </span>
                      <span className="text-slate-400">
                        {c.correct}/{total} · {pct}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-ink-700">
                      <div className="h-full rounded-full bg-emerald-400" style={{ width: `${pct}%` }} />
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
      </Section>

      <Section title={`Insignias (${earned}/${data.badges.length})`}>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {data.badges.map((b) => (
            <li
              key={b.id}
              className={`card flex flex-col items-center p-3 text-center ${b.earnedAt ? "" : "opacity-40 grayscale"}`}
              title={b.description}
            >
              <span className="text-3xl">{b.icon}</span>
              <span className="mt-1 text-xs font-semibold">{b.name}</span>
              <span className="sr-only">{b.earnedAt ? "conseguida" : "bloqueada"}: {b.description}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Últimas partidas">
        {data.recentGames.length === 0 ? (
          <Empty>Todavía no has terminado ninguna partida.</Empty>
        ) : (
          <ul className="space-y-1.5">
            {data.recentGames.map((g) => {
              const cat = catName(g.category);
              return (
                <li key={g.id} className="flex items-center justify-between rounded-xl bg-ink-900 px-3 py-2 text-sm">
                  <span>
                    {cat.icon} {MODE_LABEL[g.mode]} · {cat.name}
                  </span>
                  <span className="text-slate-400">
                    {g.correct}/{g.total} · <span className="font-semibold text-brand-300">{g.score} pts</span> ·{" "}
                    {formatDate(g.finishedAt)}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </Section>
    </div>
  );
}

function Tile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card p-3">
      <div className="text-xl font-bold text-brand-300">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}
