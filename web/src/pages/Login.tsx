import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ErrorBox, Tabs } from "../components/ui";
import { useAuth } from "../lib/auth";

export default function Login() {
  const { me, login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (me) return <Navigate to="/" replace />;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === "login") await login(email, password);
      else await register(email, password, displayName);
      const from = (location.state as { from?: string } | null)?.from;
      navigate(from && from !== "/entrar" ? from : "/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo continuar");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-4 py-10">
      <div className="mb-8 text-center">
        <div className="mb-2 text-5xl">📖</div>
        <h1 className="text-3xl font-bold tracking-tight">
          Biblia<span className="text-brand-400">Quiz</span>
        </h1>
        <p className="mt-2 text-slate-400">Aprende la Biblia jugando y reta a tus amigos.</p>
      </div>

      <Tabs
        value={mode}
        onChange={setMode}
        options={[
          { id: "login", label: "Entrar" },
          { id: "register", label: "Crear cuenta" },
        ]}
      />

      <form onSubmit={submit} className="card space-y-3">
        {mode === "register" && (
          <div>
            <label className="label" htmlFor="name">
              Nombre de jugador
            </label>
            <input
              id="name"
              className="input"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              minLength={2}
              maxLength={24}
              required
              autoComplete="nickname"
            />
          </div>
        )}
        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={mode === "register" ? 8 : 1}
            required
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />
          {mode === "register" && <p className="mt-1 text-xs text-slate-500">Mínimo 8 caracteres.</p>}
        </div>
        {error && <ErrorBox message={error} />}
        <button className="btn-primary w-full" disabled={busy}>
          {busy ? "Un momento…" : mode === "login" ? "Entrar" : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}
