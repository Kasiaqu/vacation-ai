'use client';

import { SavedFavorites } from '../../components/SavedFavorites';
import { Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import Link from 'next/link';


export default function FavoritesPage() {
    const { favorites, toggleFavorite, clearAllFavorites } = useFavorites();

  return (
    <>
      <header className="text-center mb-16">
        <h1 className="text-6xl mb-4 text-white drop-shadow-2xl">Favourites</h1>
        <p className="text-sky-50 text-xl drop-shadow-lg mb-5 max-w-2xl mx-auto leading-relaxed">
          Your collection of dream destinations waiting to be explored
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        {favorites.length === 0 ? (
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-16 text-center border border-sky-200/50">
            <div className="w-24 h-24 bg-gradient-to-br from-sky-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-sky-400" />
            </div>
            <h2 className="text-3xl text-gray-800 mb-4">No favorites yet</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Start exploring destinations and click the heart icon to save your favorites here!
            </p>
            <Link
              href="/"
              scroll={false}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="text-lg">Discover Destinations</span>
            </Link>
          </div>
        ) : (
          <SavedFavorites
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onClearAll={clearAllFavorites}
          />
        )}
      </div>
    </>
  );
}