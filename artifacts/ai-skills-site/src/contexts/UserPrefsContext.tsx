import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

const FAV_KEY = "ai-skills:favorites";
const RECENT_KEY = "ai-skills:recent";
const RECENT_MAX = 8;

type Ctx = {
  favorites: string[];
  recent: string[];
  isFavorite: (key: string) => boolean;
  toggleFavorite: (key: string) => void;
  addRecent: (key: string) => void;
  clearRecent: () => void;
};

const UserPrefsCtx = createContext<Ctx | null>(null);

function readArray(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeArray(key: string, value: string[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded or unavailable — silently ignore
  }
}

export function UserPrefsProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => readArray(FAV_KEY));
  const [recent, setRecent] = useState<string[]>(() => readArray(RECENT_KEY));

  // Cross-tab sync via storage events
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === FAV_KEY) setFavorites(readArray(FAV_KEY));
      if (e.key === RECENT_KEY) setRecent(readArray(RECENT_KEY));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isFavorite = useCallback((key: string) => favorites.includes(key), [favorites]);

  const toggleFavorite = useCallback((key: string) => {
    setFavorites((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [key, ...prev];
      writeArray(FAV_KEY, next);
      return next;
    });
  }, []);

  const addRecent = useCallback((key: string) => {
    setRecent((prev) => {
      const next = [key, ...prev.filter((k) => k !== key)].slice(0, RECENT_MAX);
      writeArray(RECENT_KEY, next);
      return next;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
    writeArray(RECENT_KEY, []);
  }, []);

  return (
    <UserPrefsCtx.Provider value={{ favorites, recent, isFavorite, toggleFavorite, addRecent, clearRecent }}>
      {children}
    </UserPrefsCtx.Provider>
  );
}

export function useUserPrefs() {
  const ctx = useContext(UserPrefsCtx);
  if (!ctx) throw new Error("useUserPrefs must be used within UserPrefsProvider");
  return ctx;
}
