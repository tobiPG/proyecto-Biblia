import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../api/client";
import type { Catalog, Category } from "../api/types";

const CatalogContext = createContext<Catalog | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  useEffect(() => {
    api.catalog().then(setCatalog).catch(() => setCatalog(null));
  }, []);
  return <CatalogContext.Provider value={catalog}>{children}</CatalogContext.Provider>;
}

export function useCatalog(): Catalog | null {
  return useContext(CatalogContext);
}

export const RANDOM_CATEGORY: Category = { id: "aleatorio", name: "Aleatorio", icon: "🎲", color: "#607D8B" };

export function useCategory(id: string): Category | undefined {
  const catalog = useCatalog();
  if (id === "aleatorio") return RANDOM_CATEGORY;
  return catalog?.categories.find((c) => c.id === id);
}

export function difficultyName(catalog: Catalog | null, id: string): string {
  if (id === "mixto") return "Mixta";
  return catalog?.difficulties.find((d) => d.id === id)?.name ?? id;
}
