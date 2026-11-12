import { useState, type FormEvent } from "react";
import { api } from "../api/client";
import type { Clan } from "../api/types";
import { Avatar, Empty, ErrorBox, Loading, Section, Tabs } from "../components/ui";
import { useAuth } from "../lib/auth";
import { useAsync } from "../lib/useAsync";

const EMOJIS = ["⛪", "✝️", "🕊️", "🦁", "🐑", "📖", "🔥", "⭐", "👑", "🌿", "⚓", "🏔️"];

export default function Clans() {
  const { me } = useAuth();
  const mine = useAsync(() => api.myClan());
  const [error, setError] = useState<string | null>(null);

  async function run(fn: () => Promise<unknown>) {
    setError(null);
    try {
      await fn();
      mine.reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  }

  if (mine.loading && !mine.data) return <Loading />;
  if (mine.error) return <ErrorBox message={mine.error} onRetry={mine.reload} />;
  const clan = mine.data?.clan;

  return (
    <div>
      <h1 className="page-title">Clanes</h1>
      {error && (
        <div className="mb-3">
          <ErrorBox message={error} />
        </div>
      )}
      {clan ? (
        <>
          <div className="card mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{clan.emoji}</span>
              <div className="flex-1">
                <div className="text-xl font-bold">{clan.name}</div>
                <div className="text-sm text-slate-400">
                  Código <span className="font-mono text-brand-300">{clan.tag}</span> · {clan.memberCount} miembros ·{" "}
                  {clan.isOpen ? "Abierto" : "Cerrado"}
                </div>
              </div>
            </div>
            {clan.description && <p className="mt-2 text-sm text-slate-300">{clan.description}</p>}
            <div className="mt-3 text-sm">
              Puntos esta semana: <span className="font-bold text-brand-300">{clan.weeklyPoints.toLocaleString("es")}</span>
            </div>
          </div>
          <Section title="Miembros (puntos de la semana)">
            <ol className="space-y-1.5">
              {clan.members.map((m, i) => (
                <li key={m.id} className="flex items-center gap-3 rounded-xl bg-ink-900 px-3 py-2">
                  <span className="w-6 text-center text-sm text-slate-400">{i + 1}</span>
                  <Avatar emoji={m.avatar} name={m.displayName} size={32} />
                  <span className="flex-1 truncate">
                    {m.displayName}
                    {m.id === clan.leaderId && " 👑"}
                    {m.id === me?.user.id && <span className="text-xs text-slate-400"> (tú)</span>}
                  </span>
                  <span className="font-semibold text-brand-300">{m.weeklyPoints}</span>
                </li>
              ))}
            </ol>
          </Section>
          <button
            className="btn-danger w-full"
            onClick={() => {
              if (confirm("¿Seguro que quieres salir del clan?")) run(() => api.leaveClan());
            }}
          >
            Salir del clan
          </button>
        </>
      ) : (
        <NoClan onJoined={mine.reload} onError={setError} />
      )}
      <ClanRanking />
    </div>
  );
}

function NoClan({ onJoined, onError }: { onJoined: () => void; onError: (m: string) => void }) {
  const [tab, setTab] = useState<"join" | "create">("join");
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Clan[] | null>(null);
  const [form, setForm] = useState({ name: "", emoji: "⛪", description: "", isOpen: true });

  async function search(e: FormEvent) {
    e.preventDefault();
    try {
      setResults((await api.searchClans(q)).clans);
    } catch (err) {
      onError(err instanceof Error ? err.message : "Error");
    }
  }

  async function join(tag: string) {
    try {
      await api.joinClan(tag);
      onJoined();
    } catch (err) {
      onError(err instanceof Error ? err.message : "Error");
    }
  }

  async function create(e: FormEvent) {
    e.preventDefault();
    try {
      await api.createClan(form);
      onJoined();
    } catch (err) {
      onError(err instanceof Error ? err.message : "Error");
    }
  }

  return (
    <div className="mb-6">
      <p className="mb-3 text-sm text-slate-400">
        Únete a un clan para sumar puntos en equipo cada semana.
      </p>
      <Tabs
        value={tab}
        onChange={setTab}
        options={[
          { id: "join", label: "Buscar" },
          { id: "create", label: "Crear" },
        ]}
      />
      {tab === "join" ? (
        <>
          <form onSubmit={search} className="mb-3 flex gap-2">
            <input
              className="input"
              placeholder="Nombre o código del clan"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              minLength={2}
              required
              aria-label="Buscar clan"
            />
            <button className="btn-primary">Buscar</button>
          </form>
          {results && results.length === 0 && <Empty>No se encontraron clanes.</Empty>}
          <ul className="space-y-2">
            {results?.map((c) => (
              <li key={c.id} className="card flex items-center gap-3 p-3">
                <span className="text-3xl">{c.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{c.name}</div>
                  <div className="text-xs text-slate-400">
                    {c.memberCount} miembros · {c.isOpen ? "Abierto" : "Cerrado"}
                  </div>
                </div>
                {c.isOpen && (
                  <button className="btn-primary px-3 py-1.5 text-sm" onClick={() => join(c.tag)}>
                    Unirme
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <form onSubmit={create} className="card space-y-3">
          <div>
            <label className="label" htmlFor="clan-name">
              Nombre
            </label>
            <input
              id="clan-name"
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              minLength={3}
              maxLength={30}
              required
            />
          </div>
          <div>
            <span className="label">Emblema</span>
            <div className="flex flex-wrap gap-1.5">
              {EMOJIS.map((em) => (
                <button
                  type="button"
                  key={em}
                  onClick={() => setForm({ ...form, emoji: em })}
                  aria-pressed={form.emoji === em}
                  className={`h-10 w-10 rounded-xl text-xl ${form.emoji === em ? "bg-brand-500/30 ring-2 ring-brand-400" : "bg-ink-800"}`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="label" htmlFor="clan-desc">
              Descripción (opcional)
            </label>
            <textarea
              id="clan-desc"
              className="input"
              rows={2}
              maxLength={150}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isOpen}
              onChange={(e) => setForm({ ...form, isOpen: e.target.checked })}
            />
            Cualquiera puede unirse
          </label>
          <button className="btn-primary w-full">Crear clan</button>
        </form>
      )}
    </div>
  );
}

function ClanRanking() {
  const { data, loading } = useAsync(() => api.clanLeaderboard());
  return (
    <Section title="Ranking de clanes (semana)">
      {loading && <Loading />}
      {data && data.clans.length === 0 && <Empty>Aún no hay clanes.</Empty>}
      <ol className="space-y-1.5">
        {data?.clans.map((c, i) => (
          <li key={c.id} className="flex items-center gap-3 rounded-xl bg-ink-900 px-3 py-2">
            <span className="w-6 text-center text-sm text-slate-400">{i + 1}</span>
            <span className="text-xl">{c.emoji}</span>
            <span className="flex-1 truncate">{c.name}</span>
            <span className="font-semibold text-brand-300">{c.weeklyPoints.toLocaleString("es")}</span>
          </li>
        ))}
      </ol>
    </Section>
  );
}
