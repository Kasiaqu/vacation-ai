'use client';

import { useState } from 'react';
import { VacationForm } from '../components/VacationForm';
import { DestinationResults } from '../components/DestinationResults';
import { Destination, VacationPreferences } from '../types';
import { getAllDestinations } from '../utils/destinationData';
import { useFavorites } from '@/context/FavoritesContext';

interface HomePageProps {
  userLocation: { lat: number; lng: number } | null;
}

export default function HomePage({ userLocation }: HomePageProps) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();

  const handleGenerateSuggestions = async (preferences: VacationPreferences) => {
    setIsLoading(true);
    setHasSearched(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const allDestinations = getAllDestinations();
    const matches = allDestinations.filter(dest => {
      const monthMatch = preferences.month.length === 0 || dest.bestMonths.some(m => preferences.month.includes(m));
      const tempMatch = preferences.temperature.length === 0 || preferences.temperature.includes(dest.temperature);
      const typeMatch = preferences.vacationType.length === 0 || (dest.vacationType && dest.vacationType.length > 0 && preferences.vacationType.every(type => dest.vacationType!.includes(type)));
      const continentMatch = preferences.continent.length === 0 || preferences.continent.includes(dest.continent || '');
      const flightMatch = preferences.flightDuration.length === 0 || preferences.flightDuration.includes(dest.flightDuration || '');
      
      return monthMatch && tempMatch && typeMatch && continentMatch && flightMatch;
    });
    
    const shuffled = matches.sort(() => Math.random() - 0.5);
    const topThree = shuffled.slice(0, 3);
    
    setDestinations(topThree);
    setIsLoading(false);
  };

  return (
    <>
      <header className="text-center mb-16">
        <h1 className="text-6xl mb-4 text-white drop-shadow-2xl">✈️ Vacation Helper</h1>
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

      {/* Form Section - Centered with max width */}
      <div className="mb-12 max-w-4xl mx-auto">
        <VacationForm 
          onSubmit={handleGenerateSuggestions} 
          isLoading={isLoading}
        />
      </div>

      {/* Results Section - Below form */}
      <div className="max-w-4xl mx-auto">
        <DestinationResults 
          destinations={destinations}
          isLoading={isLoading}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          userLocation={userLocation}
          hasSearched={hasSearched}
        />
      </div>
    </>
  );
}