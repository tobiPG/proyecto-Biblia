import { useEffect, useState } from "react";

/** Aviso cuando el dispositivo pierde la conexión (las partidas necesitan internet). */
export function OfflineBanner() {
  const [online, setOnline] = useState(navigator.onLine);
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  if (online) return null;
  return (
    <div className="bg-yellow-500/15 px-4 py-2 text-center text-sm text-yellow-200" role="status">
      Sin conexión. Conéctate a internet para jugar y guardar tu progreso.
    </div>
  );
}
