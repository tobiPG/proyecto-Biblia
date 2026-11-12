import { useMemo, useState } from "react";
import { api } from "../api/client";
import { ErrorBox, Loading, Tabs } from "../components/ui";
import { useAsync } from "../lib/useAsync";

export default function Verses() {
  const verses = useAsync(() => api.verses());
  const favs = useAsync(() => api.favoriteVerses());
  const [tab, setTab] = useState<"all" | "fav">("all");
  const [q, setQ] = useState("");
  const favSet = useMemo(() => new Set(favs.data?.refs ?? []), [favs.data]);

  async function toggle(ref: string) {
    const isFav = favSet.has(ref);
    const refs = isFav ? [...favSet].filter((r) => r !== ref) : [ref, ...favSet];
    favs.setData({ refs });
    try {
      await api.setFavoriteVerse(ref, !isFav);
    } catch {
      favs.reload();
    }
  }

  if (verses.loading) return <Loading />;
  if (verses.error || !verses.data) return <ErrorBox message={verses.error ?? "Sin datos"} onRetry={verses.reload} />;

  const term = q.trim().toLowerCase();
  const list = verses.data.verses.filter(
    (v) =>
      (tab === "all" || favSet.has(v.ref)) &&
      (!term || v.text.toLowerCase().includes(term) || v.ref.toLowerCase().includes(term))
  );

  return (
    <div>
      <h1 className="page-title">Versículos</h1>
      <div className="card mb-4 bg-gradient-to-br from-brand-500/15 to-ink-900">
        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-300">Versículo del día</div>
        <blockquote className="text-lg italic">“{verses.data.today.text}”</blockquote>
        <div className="mt-1 text-sm text-slate-400">— {verses.data.today.ref}</div>
      </div>
      <Tabs
        value={tab}
        onChange={setTab}
        options={[
          { id: "all", label: `Todos (${verses.data.verses.length})` },
          { id: "fav", label: `Favoritos (${favSet.size})` },
        ]}
      />
      <input
        className="input mb-3"
        placeholder="Buscar por texto o cita…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Buscar versículo"
      />
      <ul className="space-y-2">
        {list.map((v) => (
          <li key={v.ref} className="card flex gap-3 p-3">
            <div className="flex-1">
              <p className="text-slate-200">“{v.text}”</p>
              <p className="mt-1 text-sm text-slate-400">— {v.ref}</p>
            </div>
            <button
              className="text-2xl"
              onClick={() => toggle(v.ref)}
              aria-label={favSet.has(v.ref) ? `Quitar ${v.ref} de favoritos` : `Añadir ${v.ref} a favoritos`}
              aria-pressed={favSet.has(v.ref)}
            >
              {favSet.has(v.ref) ? "⭐" : "☆"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
