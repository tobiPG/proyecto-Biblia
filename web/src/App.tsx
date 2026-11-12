import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { OfflineBanner } from "./components/OfflineBanner";
import { Loading } from "./components/ui";
import { useAuth } from "./lib/auth";
import Challenges from "./pages/Challenges";
import CampaignPage from "./pages/Campaign";
import Chronology from "./pages/Chronology";
import Friends from "./pages/Friends";
import GamePage from "./pages/Game";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import More from "./pages/More";
import Play from "./pages/Play";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import Study from "./pages/Study";
import Verses from "./pages/Verses";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { me, loading, unreachable, refresh } = useAuth();
  const location = useLocation();
  if (loading) return <Loading />;
  if (!me && unreachable) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-sm flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="text-5xl">📡</div>
        <h1 className="text-2xl font-bold">Sin conexión</h1>
        <p className="text-slate-400">BibliaQuiz necesita internet para jugar y guardar tu progreso.</p>
        <button className="btn-primary" onClick={() => refresh().catch(() => undefined)}>
          Reintentar
        </button>
      </div>
    );
  }
  if (!me) return <Navigate to="/entrar" replace state={{ from: location.pathname }} />;
  return children;
}

export default function App() {
  return (
    <>
      <OfflineBanner />
      <Routes>
      <Route path="/entrar" element={<Login />} />
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/jugar" element={<Play />} />
        <Route path="/partida/:id" element={<GamePage />} />
        <Route path="/amigos" element={<Friends />} />
        <Route path="/retos" element={<Challenges />} />
        <Route path="/progreso" element={<Progress />} />
        <Route path="/clasificacion" element={<Leaderboard />} />
        <Route path="/versiculos" element={<Verses />} />
        <Route path="/estudio" element={<Study />} />
        <Route path="/campana" element={<CampaignPage />} />
        <Route path="/cronologia" element={<Chronology />} />
        <Route path="/ajustes" element={<Settings />} />
        <Route path="/mas" element={<More />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
