"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Plane } from "lucide-react";

interface NavigationProps {
  favoritesCount: number;
}

export function Navigation({ favoritesCount }: NavigationProps) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <nav id="app-navigation" className="absolute top-8 right-8 z-50 transition-all duration-300">
      {isHome ? (
        <Link
          href="/favorites"
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 text-white drop-shadow-lg relative backdrop-blur-sm bg-white/10 hover:bg-white/20 cursor-pointer w-45 justify-center whitespace-nowrap"
        >
          <Heart className={`w-5 h-5 ${favoritesCount > 0 ? "fill-current text-rose-500" : ""}`} />
          <span>Favorites</span>
          {favoritesCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-rose-500 text-white text-xs rounded-full flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
        </Link>
      ) : (
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105 text-white drop-shadow-lg hover:text-cyan-300 backdrop-blur-sm bg-white/10 hover:bg-white/20 cursor-pointer w-45 justify-center whitespace-nowrap"
        >
          <Plane className="w-5 h-5" />
          <span>Travel Planner</span>
        </Link>
      )}
    </nav>
  );
}
