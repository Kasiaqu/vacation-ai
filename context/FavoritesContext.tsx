"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Destination } from "../types";

interface FavoritesContextValue {
  favorites: Destination[];
  toggleFavorite: (id: string, destination?: Destination) => void;
  clearAllFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Destination[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("vacationFavorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading favorites:", e);
      }
    }
  }, []);

  // Save favorites whenever they change
  useEffect(() => {
    localStorage.setItem("vacationFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string, destination?: Destination) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === id);
      if (exists) return prev.filter((f) => f.id !== id);
      return destination ? [...prev, destination] : prev;
    });
  };

  const clearAllFavorites = () => setFavorites([]);

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
