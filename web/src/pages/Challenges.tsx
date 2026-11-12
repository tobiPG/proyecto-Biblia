import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import type { Challenge } from "../api/types";
import { Avatar, Empty, ErrorBox, Loading, Section, formatDate } from "../components/ui";
import { difficultyName, useCatalog, useCategory } from "../lib/catalog";
import { useAsync } from "../lib/useAsync";

export default function Challenges() {
  const { data, error, loading, reload } = useAsync(() => api.challenges());
  const navigate = useNavigate();
  const [actionError, setActionError] = useState<string | null>(null);

  async function run(fn: () => Promise<unknown>) {
    setActionError(null);
    try {
      await fn();
      reload();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Error");
    }
  }

  async function play(id: number) {
    setActionError(null);
    try {
      const { game } = await api.playChallenge(id);
      navigate(`/partida/${game.id}`);
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "No se pudo empezar");
    }
  }

  const list = data?.challenges ?? [];
  const open = list.filter((c) => c.status === "pending" || c.status === "active");
  const closed = list.filter((c) => !(c.status === "pending" || c.status === "active"));

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="page-title mb-0">Retos 1 vs 1</h1>
        <Link to="/amigos" className="btn-primary px-3 py-1.5 text-sm">
          + Nuevo reto
        </Link>
      </div>
      {loading && !data && <Loading />}
      {error && <ErrorBox message={error} onRetry={reload} />}
      {actionError && (
        <div className="mb-3">
          <ErrorBox message={actionError} />
        </div>
      )}

      {data && (
        <>
          <Section title="En curso">
            {open.length === 0 ? (
              <Empty>No tienes retos abiertos. Ve a Amigos y reta a alguien.</Empty>
            ) : (
              <ul className="space-y-2">
                {open.map((c) => (
                  <ChallengeCard key={c.id} c={c}>
                    {c.canRespond && (
                      <>
                        <button className="btn-primary px-3 py-1.5 text-sm" onClick={() => run(() => api.acceptChallenge(c.id))}>
                          Aceptar
                        </button>
                        <button className="btn-ghost px-3 py-1.5 text-sm" onClick={() => run(() => api.declineChallenge(c.id))}>
                          Rechazar
                        </button>
                      </>
                    )}
                    {c.canPlay && (
                      <button className="btn-primary px-3 py-1.5 text-sm" onClick={() => play(c.id)}>
                        {c.me && !c.me.finished ? "Continuar" : "Jugar"}
                      </button>
                    )}
                    {!c.canPlay && !c.canRespond && (
                      <span className="text-xs text-slate-400">
                        {c.me?.finished ? "Esperando a tu amigo…" : "Esperando que acepte…"}
                      </span>
                    )}
                  </ChallengeCard>
                ))}
              </ul>
            )}
          </Section>

          <Section title="Historial">
            {closed.length === 0 ? (
              <Empty>Aquí verás los retos terminados.</Empty>
            ) : (
              <ul className="space-y-2">
                {closed.map((c) => (
                  <ChallengeCard key={c.id} c={c} />
                ))}
              </ul>
            )}
          </Section>
        </>
      )}
    </div>
  );
}

const STATUS_LABEL: Record<Challenge["status"], string> = {
  pending: "Pendiente",
  active: "En juego",
  completed: "Terminado",
  declined: "Rechazado",
  expired: "Expirado",
};

function ChallengeCard({ c, children }: { c: Challenge; children?: React.ReactNode }) {
  const catalog = useCatalog();
  const category = useCategory(c.category);
  const outcome =
    c.outcome === "me" ? (
      <span className="font-bold text-emerald-300">🏆 Ganaste</span>
    ) : c.outcome === "them" ? (
      <span className="font-bold text-rose-300">Perdiste</span>
    ) : c.outcome === "tie" ? (
      <span className="font-bold text-slate-200">Empate</span>
    ) : (
      <span className="text-xs text-slate-400">{STATUS_LABEL[c.status]}</span>
    );
  return (
    <li className="card p-3">
      <div className="flex items-center gap-3">
        <Avatar emoji={c.opponent.avatar} name={c.opponent.displayName} />
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold">
            {c.isCreator ? "Retaste a " : "Te retó "}
            {c.opponent.displayName}
          </div>
          <div className="text-xs text-slate-400">
            {category?.icon} {category?.name} · {difficultyName(catalog, c.difficulty)} · {formatDate(c.createdAt)}
          </div>
        </div>
        {outcome}
      </div>
      {(c.me?.finished || c.status === "completed") && (
        <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl bg-ink-800 p-2 text-center text-sm">
          <div>
            <div className="text-xs text-slate-400">Tú</div>
            <div className="font-bold">{c.me ? `${c.me.score} pts · ${c.me.correct}/${c.me.total}` : "—"}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">{c.opponent.displayName}</div>
            <div className="font-bold">
              {c.them?.finished ? `${c.them.score} pts · ${c.them.correct}/${c.them.total}` : "Aún no juega"}
            </div>
          </div>
        </div>
      )}
      {children && <div className="mt-2 flex flex-wrap items-center justify-end gap-1.5">{children}</div>}
    </li>
  );
}
