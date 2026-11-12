import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { Avatar } from "./ui";

const tabs = [
  { to: "/", label: "Inicio", icon: "🏠", end: true },
  { to: "/jugar", label: "Jugar", icon: "🎮" },
  { to: "/amigos", label: "Amigos", icon: "🤝" },
  { to: "/progreso", label: "Progreso", icon: "📊" },
  { to: "/mas", label: "Más", icon: "☰" },
];

export function Layout() {
  const { me } = useAuth();
  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col">
      <header className="sticky top-0 z-10 border-b border-ink-800 bg-ink-950/90 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-bold tracking-tight">
            📖 Biblia<span className="text-brand-400">Quiz</span>
          </Link>
          {me && (
            <Link to="/ajustes" className="flex items-center gap-2 text-sm" aria-label="Mi perfil">
              <span className="text-right leading-tight">
                <span className="block font-semibold">{me.user.displayName}</span>
                <span className="text-xs text-slate-400">
                  Nivel {me.level.level} · {me.totalPoints.toLocaleString("es")} pts
                </span>
              </span>
              <Avatar emoji={me.user.avatar} name={me.user.displayName} size={36} />
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 px-4 pb-28 pt-4">
        <Outlet />
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-10 border-t border-ink-800 bg-ink-950/95 backdrop-blur"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Navegación principal"
      >
        <div className="mx-auto flex max-w-2xl">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 py-2 text-xs font-medium ${
                  isActive ? "text-brand-400" : "text-slate-400 hover:text-slate-200"
                }`
              }
            >
              <span className="text-xl" aria-hidden="true">
                {t.icon}
              </span>
              {t.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
