'use client';

import { Destination } from '../types';
import { Heart, MapPin, DollarSign, Plane, ThermometerSun, Calendar } from 'lucide-react';
import { useState } from 'react';
import { calculateDistance, calculateFlightDuration, temperatureDescriptions, budgetDescriptions } from '../utils/locationUtils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface DestinationCardProps {
  destination: Destination;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string, destination?: Destination) => void;
  onShowDetails: () => void;
  userLocation: { lat: number; lng: number } | null;
}

export function DestinationCard({ 
  destination, 
  index, 
  isFavorite, 
  onToggleFavorite,
  onShowDetails,
  userLocation
}: DestinationCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleFavoriteClick = () => {
    setIsAnimating(true);
    onToggleFavorite(destination.id, destination);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const budgetInfo = {
    budget: { label: 'Budget', icon: '$', gradient: 'from-emerald-500 to-teal-600' },
    moderate: { label: 'Moderate', icon: '$$', gradient: 'from-sky-500 to-blue-600' },
    luxury: { label: 'Luxury', icon: '$$$', gradient: 'from-orange-500 to-amber-600' }
  };

  const budget = destination.budget && budgetInfo[destination.budget as keyof typeof budgetInfo] 
    ? budgetInfo[destination.budget as keyof typeof budgetInfo]
    : budgetInfo.moderate;

  let flightDuration = destination.flightDuration || 'Time varies';
  if (userLocation && destination.coordinates) {
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      destination.coordinates.lat,
      destination.coordinates.lng
    );
    flightDuration = calculateFlightDuration(distance);
  }

  const tempKey = destination.temperature.toLowerCase().includes('cold') ? 'cold'
    : destination.temperature.toLowerCase().includes('cool') ? 'cool'
    : destination.temperature.toLowerCase().includes('hot') ? 'hot'
    : destination.temperature.toLowerCase().includes('warm') ? 'warm'
    : 'warm';
  
  const cityName = destination.name ? destination.name.trim() : 'Unknown Destination';

  return (
    <TooltipProvider>
      <div
        className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 border border-blue-200/50 animate-slideUp flex flex-col"
        style={{ animationDelay: `${index * 150}ms` }}
      >
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden group">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Favorite Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleFavoriteClick}
                className="absolute top-2 right-2 w-12 h-12 flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
              >
                <Heart 
                  className={`w-7 h-7 stroke-[2.5] transition-all ${
                    isAnimating ? 'animate-ping-once' : ''
                  } ${isFavorite ? 'fill-rose-500 text-rose-500' : 'fill-transparent text-rose-500'}`}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}</p>
            </TooltipContent>
          </Tooltip>

          {/* Destination Name on Image */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-3xl text-white mb-1 drop-shadow-lg">{cityName}</h3>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{destination.country}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
          <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">
            {destination.description}
          </p>

          {/* Quick Info Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-orange-50 rounded-lg border border-orange-200 cursor-help">
                  <ThermometerSun className="w-3.5 h-3.5 text-orange-600" />
                  <span className="text-xs text-orange-700">{destination.temperature}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{temperatureDescriptions[tempKey]}</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-sky-50 rounded-lg border border-sky-200 cursor-help">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" />
                  <span className="text-xs text-sky-700">
                    {destination.bestMonths?.slice(0, 2).join(', ') || 'Year-round'}
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Best months to visit: {destination.bestMonths?.join(', ') || 'Year-round'}. Optimal weather, fewer crowds, or special events during these times.</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 bg-gradient-to-r ${budget.gradient} rounded-lg text-white cursor-help`}>
                  <DollarSign className="w-3.5 h-3.5" />
                  <span className="text-xs">{budget.label}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{budgetDescriptions[destination.budget]}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-indigo-50 rounded-lg border border-indigo-200 cursor-help">
                  <Plane className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="text-xs text-indigo-700">{flightDuration}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>Estimated flight time from your location. Actual time may vary based on connections and route.</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Show Details Button */}
          <button
            onClick={onShowDetails}
            className="mt-auto w-full py-3 text-sm bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Full Details</span>
          </button>
        </div>
      </div>
    </TooltipProvider>
  );
}
