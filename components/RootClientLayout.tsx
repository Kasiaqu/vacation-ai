"use client";

import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { FavoritesProvider, useFavorites } from "../context/FavoritesContext";

export default function RootClientLayout({ children }: { children: ReactNode }) {
  return (
    <FavoritesProvider>
      <LayoutWithNavigation>{children}</LayoutWithNavigation>
    </FavoritesProvider>
  );
}

function LayoutWithNavigation({ children }: { children: ReactNode }) {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen relative py-24 px-4 overflow-hidden">
      <div id="app-background" className="fixed inset-0 z-0 transition-all duration-300">
        <img
          src="https://images.unsplash.com/photo-1763110805060-80dbead1f9d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaW8lMjBkZSUyMGphbmVpcm8lMjBhZXJpYWwlMjBtb3VudGFpbnMlMjBvY2VhbnxlbnwxfHx8fDE3NjU0NjIzMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="travel planner background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600/50 via-cyan-500/45 to-blue-500/50"></div>
      </div>

      <Navigation favoritesCount={favorites.length} />

      <div id="app-content" className="container mx-auto max-w-6xl relative z-10 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
