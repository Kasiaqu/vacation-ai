"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Destination } from "../types";

interface FavoritesContextValue {
  favorites: Destination[];
  toggleFavorite: (destination: Destination) => void;
  clearAllFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);


export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Destination[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("vacationFavorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading favorites:", e);
        setFavorites([]);
      }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("vacationFavorites", JSON.stringify(favorites));
    }
  }, [favorites, isHydrated]);

  const toggleFavorite = (destination: Destination) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.name === destination.name);
      if (exists) return prev.filter((f) => f.name !== destination.name);
      return destination ? [...prev, destination] : prev;
    });
  };

  const clearAllFavorites = () => setFavorites([]);

  if (!isHydrated) return null;
  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, clearAllFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
