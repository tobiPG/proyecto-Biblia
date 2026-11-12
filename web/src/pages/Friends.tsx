import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import type { Player } from "../api/types";
import { CategoryPicker, DifficultyPicker } from "../components/Pickers";
import { Avatar, Empty, ErrorBox, Loading, Section } from "../components/ui";
import { useAuth } from "../lib/auth";
import { useAsync } from "../lib/useAsync";

export default function Friends() {
  const { me } = useAuth();
  const { data, error, loading, reload } = useAsync(() => api.friends());
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [challenging, setChallenging] = useState<Player | null>(null);

  async function add(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    try {
      const r = await api.addFriend(code);
      setMsg({
        ok: true,
        text:
          r.result === "accepted"
            ? `¡Ahora eres amigo de ${r.player.displayName}!`
            : `Solicitud enviada a ${r.player.displayName}`,
      });
      setCode("");
      reload();
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Error" });
    }
  }

  async function act(fn: () => Promise<unknown>) {
    try {
      await fn();
      reload();
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Error" });
    }
  }

  async function copyCode() {
    if (!me) return;
    try {
      await navigator.clipboard.writeText(me.user.friendCode);
      setMsg({ ok: true, text: "Código copiado" });
    } catch {
      /* el portapapeles puede no estar disponible */
    }
  }

  if (challenging) return <NewChallenge friend={challenging} onCancel={() => setChallenging(null)} />;

  return (
    <div>
      <h1 className="page-title">Amigos</h1>

      <div className="card mb-4">
        <div className="text-sm text-slate-400">Tu código de amigo</div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-2xl font-bold tracking-widest text-brand-300">{me?.user.friendCode}</span>
          <button className="btn-ghost text-sm" onClick={copyCode}>
            Copiar
          </button>
        </div>
        <form onSubmit={add} className="mt-3 flex gap-2">
          <input
            className="input font-mono uppercase"
            placeholder="Código de tu amigo"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={12}
            aria-label="Código de amigo"
            required
          />
          <button className="btn-primary">Agregar</button>
        </form>
        {msg && <p className={`mt-2 text-sm ${msg.ok ? "text-emerald-300" : "text-rose-300"}`}>{msg.text}</p>}
      </div>

      {loading && !data && <Loading />}
      {error && <ErrorBox message={error} onRetry={reload} />}

      {data && data.incoming.length > 0 && (
        <Section title="Solicitudes recibidas">
          <ul className="space-y-2">
            {data.incoming.map((p) => (
              <PlayerRow key={p.id} player={p}>
                <button className="btn-primary px-3 py-1.5 text-sm" onClick={() => act(() => api.acceptFriend(p.id))}>
                  Aceptar
                </button>
                <button className="btn-ghost px-3 py-1.5 text-sm" onClick={() => act(() => api.declineFriend(p.id))}>
                  ✕
                </button>
              </PlayerRow>
            ))}
          </ul>
        </Section>
      )}

      {data && (
        <Section title={`Mis amigos (${data.friends.length})`}>
          {data.friends.length === 0 ? (
            <Empty>Aún no tienes amigos. Comparte tu código para empezar a retarse.</Empty>
          ) : (
            <ul className="space-y-2">
              {data.friends.map((p) => (
                <PlayerRow key={p.id} player={p}>
                  <button className="btn-primary px-3 py-1.5 text-sm" onClick={() => setChallenging(p)}>
                    ⚔️ Retar
                  </button>
                  <button
                    className="btn-ghost px-3 py-1.5 text-sm"
                    aria-label={`Eliminar a ${p.displayName}`}
                    onClick={() => {
                      if (confirm(`¿Eliminar a ${p.displayName} de tus amigos?`)) act(() => api.removeFriend(p.id));
                    }}
                  >
                    🗑
                  </button>
                </PlayerRow>
              ))}
            </ul>
          )}
        </Section>
      )}

      {data && data.outgoing.length > 0 && (
        <Section title="Solicitudes enviadas">
          <ul className="space-y-2">
            {data.outgoing.map((p) => (
              <PlayerRow key={p.id} player={p}>
                <span className="text-xs text-slate-400">Pendiente</span>
              </PlayerRow>
            ))}
          </ul>
        </Section>
      )}
    </div>
  );
}

function PlayerRow({ player, children }: { player: Player; children?: React.ReactNode }) {
  return (
    <li className="card flex items-center gap-3 p-3">
      <Avatar emoji={player.avatar} name={player.displayName} />
      <div className="min-w-0 flex-1">
        <div className="truncate font-semibold">{player.displayName}</div>
        <div className="text-xs text-slate-400">
          Nivel {player.level} · {player.totalPoints.toLocaleString("es")} pts
        </div>
      </div>
      <div className="flex gap-1.5">{children}</div>
    </li>
  );
}

function NewChallenge({ friend, onCancel }: { friend: Player; onCancel: () => void }) {
  const navigate = useNavigate();
  const [category, setCategory] = useState("aleatorio");
  const [difficulty, setDifficulty] = useState("facil");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function create(playNow: boolean) {
    setBusy(true);
    setError(null);
    try {
      const { challenge } = await api.createChallenge(friend.id, category, difficulty);
      if (playNow) {
        const { game } = await api.playChallenge(challenge.id);
        navigate(`/partida/${game.id}`);
      } else navigate("/retos");
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo crear el reto");
      setBusy(false);
    }
  }

  return (
    <div>
      <button className="mb-3 text-sm text-slate-400 hover:text-slate-100" onClick={onCancel}>
        ← Volver
      </button>
      <h1 className="page-title">Retar a {friend.displayName}</h1>
      <p className="mb-4 text-sm text-slate-400">
        Los dos responderán las mismas 10 preguntas. Gana quien haga más puntos (en empate, el más rápido). Tu
        amigo tiene 48 horas para jugar.
      </p>
      <Section title="Categoría">
        <CategoryPicker value={category} onChange={setCategory} />
      </Section>
      <Section title="Dificultad">
        <DifficultyPicker value={difficulty} onChange={setDifficulty} />
      </Section>
      {error && (
        <div className="mb-3">
          <ErrorBox message={error} />
        </div>
      )}
      <div className="grid gap-2">
        <button className="btn-primary py-3" disabled={busy} onClick={() => create(true)}>
          Crear reto y jugar ahora
        </button>
        <button className="btn-ghost" disabled={busy} onClick={() => create(false)}>
          Crear reto y jugar después
        </button>
      </div>
    </div>
  );
}
