'use client';

import { useState } from 'react';
import { VacationForm } from '../components/VacationForm';
import { DestinationResults } from '../components/DestinationResults';
import { Destination, VacationPreferences } from '../types';
import { useFavorites } from '@/context/FavoritesContext';


export default function HomePage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();

  const handleGenerateSuggestions = async (preferences: VacationPreferences) => {
    setIsLoading(true);
    setHasSearched(true);

    try {
      const resp = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences })
      });

      if (!resp.ok) {
        console.error('API error', resp.status);
        setDestinations([]);
        return;
      }

      const json = await resp.json();
      if (Array.isArray(json.recommendations) && json.recommendations.length > 0) {
        setDestinations(json.recommendations);
      } else {
        setDestinations([]);
      }
    } catch (err) {
      console.error('Fetch error', err);
      setDestinations([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="text-center mb-16">
        <h1 className="text-6xl mb-4 text-white drop-shadow-2xl">✈️ Travel Planner</h1>
        <p className="text-sky-50 text-xl drop-shadow-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Answer a few questions and discover your perfect vacation destinations
        </p>
        <div className="flex items-center justify-center gap-8 text-white">
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl">🌍</span>
            <span className="text-base">Choose preferences</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl">🤖</span>
            <span className="text-base">AI finds matches</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl">✨</span>
            <span className="text-base">Get 3 destinations</span>
          </div>
        </div>
      </header>

      <div className="mb-12 max-w-4xl mx-auto">
        <VacationForm 
          onSubmit={handleGenerateSuggestions} 
          isLoading={isLoading}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <DestinationResults 
          destinations={destinations}
          isLoading={isLoading}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          hasSearched={hasSearched}
        />
      </div>
    </>
  );
}