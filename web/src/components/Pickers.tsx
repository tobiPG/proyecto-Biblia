import { RANDOM_CATEGORY, useCatalog } from "../lib/catalog";

export function CategoryPicker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  const catalog = useCatalog();
  const categories = [RANDOM_CATEGORY, ...(catalog?.categories ?? [])];
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {categories.map((c) => {
        const count =
          c.id === "aleatorio"
            ? catalog?.totalQuestions
            : Object.values(catalog?.counts[c.id] ?? {}).reduce((a, b) => a + b, 0);
        return (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            aria-pressed={value === c.id}
            className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors ${
              value === c.id ? "border-brand-400 bg-brand-500/10" : "border-ink-700 bg-ink-900 hover:bg-ink-800"
            }`}
          >
            <span className="text-2xl" style={{ filter: "saturate(1.2)" }}>
              {c.icon}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-semibold">{c.name}</span>
              {count !== undefined && <span className="text-xs text-slate-400">{count} preguntas</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function DifficultyPicker({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  const catalog = useCatalog();
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {catalog?.difficulties.map((d) => (
        <button
          key={d.id}
          onClick={() => onChange(d.id)}
          aria-pressed={value === d.id}
          className={`rounded-2xl border p-3 text-center transition-colors ${
            value === d.id ? "border-brand-400 bg-brand-500/10" : "border-ink-700 bg-ink-900 hover:bg-ink-800"
          }`}
        >
          <div className="text-2xl">{d.icon}</div>
          <div className="font-semibold">{d.name}</div>
          <div className="text-xs text-slate-400">{d.points} pts</div>
        </button>
      ))}
    </div>
  );
}
