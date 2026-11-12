import { Link } from "react-router-dom";

const items = [
  { to: "/retos", icon: "⚔️", label: "Retos 1 vs 1", desc: "Tus retos con amigos" },
  { to: "/clasificacion", icon: "🏆", label: "Clasificación", desc: "Global y entre amigos" },
  { to: "/campana", icon: "🗺️", label: "Campaña", desc: "Recorre la Biblia en 8 mundos" },
  { to: "/cronologia", icon: "⏳", label: "Cronología", desc: "Ordena los eventos bíblicos" },
  { to: "/versiculos", icon: "📖", label: "Versículos", desc: "Versículo del día y favoritos" },
  { to: "/estudio", icon: "🎓", label: "Modo estudio", desc: "Repasa preguntas con su respuesta" },
  { to: "/ajustes", icon: "⚙️", label: "Ajustes", desc: "Perfil, sonido y cuenta" },
];

export default function More() {
  return (
    <div>
      <h1 className="page-title">Más</h1>
      <ul className="grid gap-2">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="card flex items-center gap-3 hover:border-brand-400">
              <span className="text-2xl">{i.icon}</span>
              <span>
                <span className="block font-semibold">{i.label}</span>
                <span className="text-sm text-slate-400">{i.desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
