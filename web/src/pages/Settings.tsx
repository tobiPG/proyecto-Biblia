import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { Section } from "../components/ui";
import { useAuth } from "../lib/auth";
import { setSoundEnabled, soundEnabled } from "../lib/sound";

const AVATARS = ["", "🙂", "😇", "🦁", "🕊️", "🐑", "🌿", "⭐", "📖", "✝️", "👑", "🔥", "🌊", "🏔️", "🍇", "⚓"];

export default function Settings() {
  const { me, refresh, logout } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(me?.user.displayName ?? "");
  const [sound, setSound] = useState(soundEnabled());
  const [pw, setPw] = useState({ current: "", next: "" });
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function save(data: { displayName?: string; avatar?: string }) {
    setMsg(null);
    try {
      await api.updateMe(data);
      await refresh();
      setMsg({ ok: true, text: "Guardado" });
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error ? e.message : "Error" });
    }
  }

  async function changePassword(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    try {
      await api.changePassword(pw.current, pw.next);
      setPw({ current: "", next: "" });
      setMsg({ ok: true, text: "Contraseña actualizada. Se cerraron tus otras sesiones." });
    } catch (err) {
      setMsg({ ok: false, text: err instanceof Error ? err.message : "Error" });
    }
  }

  async function deleteAccount() {
    if (!confirm("Esto borrará tu cuenta y todo tu progreso para siempre. ¿Continuar?")) return;
    await api.deleteAccount();
    await refresh();
    navigate("/entrar", { replace: true });
  }

  if (!me) return null;

  return (
    <div>
      <h1 className="page-title">Ajustes</h1>
      {msg && (
        <p className={`mb-3 rounded-xl p-2 text-sm ${msg.ok ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"}`} role="status">
          {msg.text}
        </p>
      )}

      <Section title="Perfil">
        <form
          className="card mb-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            save({ displayName: name });
          }}
        >
          <input
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength={2}
            maxLength={24}
            aria-label="Nombre de jugador"
            required
          />
          <button className="btn-primary">Guardar</button>
        </form>
        <div className="card">
          <div className="label">Avatar</div>
          <div className="flex flex-wrap gap-1.5">
            {AVATARS.map((a) => (
              <button
                key={a || "inicial"}
                onClick={() => save({ avatar: a })}
                aria-pressed={me.user.avatar === a}
                aria-label={a ? `Avatar ${a}` : "Usar mi inicial"}
                className={`h-11 w-11 rounded-full text-xl ${
                  me.user.avatar === a ? "bg-brand-500/30 ring-2 ring-brand-400" : "bg-ink-800"
                }`}
              >
                {a || me.user.displayName.charAt(0).toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-500">Email: {me.user.email}</p>
      </Section>

      <Section title="Juego">
        <label className="card flex items-center justify-between">
          <span>Sonidos</span>
          <input
            type="checkbox"
            checked={sound}
            onChange={(e) => {
              setSound(e.target.checked);
              setSoundEnabled(e.target.checked);
            }}
          />
        </label>
      </Section>

      <Section title="Cambiar contraseña">
        <form onSubmit={changePassword} className="card space-y-2">
          <input
            type="password"
            className="input"
            placeholder="Contraseña actual"
            autoComplete="current-password"
            value={pw.current}
            onChange={(e) => setPw({ ...pw, current: e.target.value })}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Nueva contraseña (mín. 8)"
            autoComplete="new-password"
            minLength={8}
            value={pw.next}
            onChange={(e) => setPw({ ...pw, next: e.target.value })}
            required
          />
          <button className="btn-ghost w-full">Actualizar contraseña</button>
        </form>
      </Section>

      <div className="grid gap-2">
        <button
          className="btn-ghost"
          onClick={async () => {
            await logout();
            navigate("/entrar", { replace: true });
          }}
        >
          Cerrar sesión
        </button>
        <button className="btn-danger" onClick={deleteAccount}>
          Borrar mi cuenta
        </button>
      </div>
    </div>
  );
}
