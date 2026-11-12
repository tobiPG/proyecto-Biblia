import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { CategoryPicker, DifficultyPicker } from "../components/Pickers";
import { ErrorBox, Section } from "../components/ui";

export default function Play() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("aleatorio");
  const [difficulty, setDifficulty] = useState("facil");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function start() {
    setBusy(true);
    setError(null);
    try {
      const { game } = await api.startSolo(category, difficulty);
      navigate(`/partida/${game.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo empezar la partida");
      setBusy(false);
    }
  }

  return (
    <div>
      <h1 className="page-title">Nueva partida</h1>
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
      <button className="btn-primary w-full py-3 text-lg" onClick={start} disabled={busy}>
        {busy ? "Preparando…" : "¡Empezar!"}
      </button>
    </div>
  );
}
