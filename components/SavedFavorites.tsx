'use client';

import { Destination } from '../types';
import { DestinationCard } from './DestinationCard';
import { DestinationModal } from './DestinationModal';
import { Heart, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SavedFavoritesProps {
  favorites: Destination[];
  onToggleFavorite: (id: string, destination?: Destination) => void;
  onClearAll: () => void;
}

export function SavedFavorites({ favorites, onToggleFavorite, onClearAll }: SavedFavoritesProps) {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [showClearAllModal, setShowClearAllModal] = useState(false);

  useEffect(() => {
    if (showClearAllModal) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [showClearAllModal]);

  if (favorites.length === 0) {
    return null;
  }

  const handleClearAllConfirm = () => {
    onClearAll();
    setShowClearAllModal(false);
  };

  return (
    <div className="mb-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-rose-200/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
            <div>
              <h2 className="text-3xl text-gray-800">My Favourites</h2>
              <p className="text-gray-600">You have {favorites.length} saved {favorites.length === 1 ? 'destination' : 'destinations'}</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowClearAllModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-all border border-red-200 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Clear All</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {favorites.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onShowDetails={() => setSelectedDestination(destination)}
            />
          ))}
        </div>
      </div>

      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          isOpen={true}
          onClose={() => setSelectedDestination(null)}
        />
      )}

      {showClearAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slideUp">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl text-gray-800">Clear All Favorites?</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove all {favorites.length} saved {favorites.length === 1 ? 'destination' : 'destinations'}? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearAllModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAllConfirm}
                className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}