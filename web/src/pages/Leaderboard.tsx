import { useState } from "react";
import { api } from "../api/client";
import { Avatar, Empty, ErrorBox, Loading, Tabs } from "../components/ui";
import { useAuth } from "../lib/auth";
import { useAsync } from "../lib/useAsync";

export default function Leaderboard() {
  const { me } = useAuth();
  const [scope, setScope] = useState<"global" | "friends">("global");
  const [period, setPeriod] = useState<"all" | "week">("week");
  const { data, error, loading, reload } = useAsync(() => api.leaderboard(scope, period), [scope, period]);

  return (
    <div>
      <h1 className="page-title">Clasificación</h1>
      <Tabs
        value={scope}
        onChange={setScope}
        options={[
          { id: "global", label: "Todos" },
          { id: "friends", label: "Amigos" },
        ]}
      />
      <Tabs
        value={period}
        onChange={setPeriod}
        options={[
          { id: "week", label: "Esta semana" },
          { id: "all", label: "Histórico" },
        ]}
      />
      {loading && <Loading />}
      {error && <ErrorBox message={error} onRetry={reload} />}
      {data && !loading && (
        <>
          {data.myRank && <p className="mb-2 text-sm text-slate-400">Tu posición: #{data.myRank}</p>}
          {data.players.length === 0 ? (
            <Empty>Nadie ha jugado todavía.</Empty>
          ) : (
            <ol className="space-y-1.5">
              {data.players.map((p, i) => (
                <li
                  key={p.id}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 ${
                    p.id === me?.user.id ? "border border-brand-400 bg-brand-500/10" : "bg-ink-900"
                  }`}
                >
                  <span className="w-8 text-center font-bold">
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                  </span>
                  <Avatar emoji={p.avatar} name={p.displayName} size={32} />
                  <span className="min-w-0 flex-1 truncate font-medium">{p.displayName}</span>
                  <span className="font-semibold text-brand-300">{p.totalPoints.toLocaleString("es")}</span>
                </li>
              ))}
            </ol>
          )}
        </>
      )}
    </div>
  );
}
