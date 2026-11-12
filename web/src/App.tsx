import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Loading } from "./components/ui";
import { useAuth } from "./lib/auth";
import Challenges from "./pages/Challenges";
import Clans from "./pages/Clans";
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
  const { me, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loading />;
  if (!me) return <Navigate to="/entrar" replace state={{ from: location.pathname }} />;
  return children;
}

export default function App() {
  return (
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
        <Route path="/clanes" element={<Clans />} />
        <Route path="/ajustes" element={<Settings />} />
        <Route path="/mas" element={<More />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
