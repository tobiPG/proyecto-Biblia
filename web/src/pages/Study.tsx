import { useState } from "react";
import { api } from "../api/client";
import { CategoryPicker } from "../components/Pickers";
import { ErrorBox, Loading } from "../components/ui";
import { difficultyName, useCatalog } from "../lib/catalog";
import { useAsync } from "../lib/useAsync";

export default function Study() {
  const catalog = useCatalog();
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const { data, error, loading, reload } = useAsync(
    () => (category ? api.study(category, page) : Promise.resolve(null)),
    [category, page]
  );

  if (!category) {
    return (
      <div>
        <h1 className="page-title">Modo estudio</h1>
        <p className="mb-4 text-sm text-slate-400">
          Repasa preguntas con su respuesta y explicación. No suma puntos.
        </p>
        <CategoryPicker
          value=""
          onChange={(c) => {
            setCategory(c);
            setPage(0);
          }}
        />
      </div>
    );
  }

  const pages = data ? Math.ceil(data.total / data.pageSize) : 0;

  return (
    <div>
      <button className="mb-3 text-sm text-slate-400 hover:text-slate-100" onClick={() => setCategory(null)}>
        ← Categorías
      </button>
      {loading && <Loading />}
      {error && <ErrorBox message={error} onRetry={reload} />}
      {data && !loading && (
        <>
          <ul className="space-y-2">
            {data.questions.map((q) => (
              <li key={q.id} className="card p-3">
                <div className="text-xs text-slate-400">{difficultyName(catalog, q.difficulty)}</div>
                <div className="font-semibold">{q.question}</div>
                {revealed.has(q.id) ? (
                  <div className="mt-2 rounded-xl bg-emerald-500/10 p-2 text-sm">
                    <div className="font-semibold text-emerald-300">✓ {q.answer}</div>
                    {q.explanation && <p className="mt-1 text-slate-300">{q.explanation}</p>}
                    {q.reference && <p className="mt-1 text-xs text-slate-400">📖 {q.reference}</p>}
                  </div>
                ) : (
                  <button
                    className="mt-2 text-sm text-brand-300 hover:underline"
                    onClick={() => setRevealed(new Set(revealed).add(q.id))}
                  >
                    Ver respuesta
                  </button>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <button className="btn-ghost" disabled={page === 0} onClick={() => setPage(page - 1)}>
              ← Anterior
            </button>
            <span className="text-sm text-slate-400">
              {page + 1} / {pages}
            </span>
            <button className="btn-ghost" disabled={page + 1 >= pages} onClick={() => setPage(page + 1)}>
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
