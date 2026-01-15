'use client';

import { useState, useEffect } from 'react';
import { Destination } from '../types';
import { DestinationCard } from './DestinationCard';
import { DestinationModal } from './DestinationModal';
import { Sparkles, SearchX } from 'lucide-react';

interface DestinationResultsProps {
  destinations: Destination[];
  isLoading: boolean;
  favorites: Destination[];
  onToggleFavorite: (id: string, destination?: Destination) => void;
  hasSearched: boolean;
}

export function DestinationResults({ destinations, isLoading, favorites, onToggleFavorite, hasSearched }: DestinationResultsProps) {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
 
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-16 text-center border border-blue-200/50">
        <div className="relative mb-10 w-32 h-32 mx-auto">
          <div className="animate-spin rounded-full h-32 w-32 border-8 border-blue-200 border-t-cyan-600"></div>
          <Sparkles className="w-12 h-12 text-cyan-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        
        <h3 className="text-3xl mb-3 text-gray-800">Finding Your Perfect Destinations...</h3>
        <p className="text-gray-600 text-lg">Just a moment while we search the world for you ✨</p>
      </div>
    );
  }

  if (destinations.length === 0 && hasSearched && !isLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-2xl p-16 text-center border border-blue-200/50 animate-fadeIn">
        <div className="mb-8">
          <SearchX className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        </div>
        
        <h3 className="text-3xl mb-4 text-gray-800">No Destinations Found</h3>
        <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
          We couldn&#39;t find any destinations matching your exact criteria. Try adjusting your preferences to see more options!
        </p>
        
        <div className="bg-linear-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 max-w-lg mx-auto border border-cyan-200">
          <p className="text-sm text-gray-700 mb-3">💡 Try these tips:</p>
          <ul className="text-sm text-gray-600 space-y-2 text-left">
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 mt-0.5">•</span>
              <span>Select &quot;Any&quot; for some preferences to see more results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 mt-0.5">•</span>
              <span>Try a different month or temperature range</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-600 mt-0.5">•</span>
              <span>Explore different vacation types or continents</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {destinations.length > 0 &&
      <div className="bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl p-6 text-white text-center shadow-2xl max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-3xl mb-2 flex items-center justify-center gap-3">
          <Sparkles className="w-7 h-7 animate-pulse" />
          Your Perfect Destinations
          <Sparkles className="w-7 h-7 animate-pulse" />
        </h2>
        <p className="text-sky-100 text-lg">We found {destinations.length} amazing places just for you!</p>
      </div>}

      <div className="grid md:grid-cols-3 gap-6">
        {destinations.map((destination, index) => (
          <DestinationCard
            key={`${destination.id}-${index}`}
            destination={destination}
            index={index}
            isFavorite={favorites.some(fav => fav.id === destination.id)}
            onToggleFavorite={onToggleFavorite}
            onShowDetails={() => setSelectedDestination(destination)}
          />
        ))}
      </div>

      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          isOpen={true}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </div>
  );
}