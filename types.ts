export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  temperature: string;
  bestMonths: string[];
  imageQuery: string;
  imageUrl?: string;
  imageUrls?: string[];
  budget: 'budget' | 'moderate' | 'luxury';
  activities: string[];
  highlights: string[];
  travelTip: string;
  flightDuration?: string;
  difficulty?: 'easy' | 'moderate' | 'challenging';
  continent: string;
  vacationType: string[];
  coordinates?: { lat: number; lng: number };
}

export interface VacationPreferences {
  month: string[];
  temperature: string[];
  vacationType: string[];
  continent: string[];
  flightDuration: string[];
}