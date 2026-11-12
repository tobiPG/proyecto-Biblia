import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { api, ApiError } from "../api/client";
import type { MeResponse } from "../api/types";

interface AuthState {
  me: MeResponse | null;
  loading: boolean;
  /** true si no se pudo contactar con el servidor (sin conexión): no es lo mismo que no tener sesión. */
  unreachable: boolean;
  refresh: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [unreachable, setUnreachable] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setMe(await api.me());
      setUnreachable(false);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setMe(null);
        setUnreachable(false);
      } else if (!(err instanceof ApiError)) {
        setUnreachable(true); // error de red: conservar la sesión que hubiera
      } else throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh().catch(() => setLoading(false));
    // Al recuperar la conexión, volver a comprobar la sesión.
    const onOnline = () => refresh().catch(() => undefined);
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [refresh]);

  const value: AuthState = {
    me,
    loading,
    unreachable,
    refresh,
    login: async (email, password) => {
      await api.login(email, password);
      await refresh();
    },
    register: async (email, password, displayName) => {
      await api.register(email, password, displayName);
      await refresh();
    },
    logout: async () => {
      await api.logout();
      setMe(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth fuera de AuthProvider");
  return ctx;
}
