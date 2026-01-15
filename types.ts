export interface Destination {
  activities: string[];
  bestMonths: string[];
  budget: 'budget' | 'moderate' | 'luxury';
  continent: string;
  coordinates?: { lat: number; lng: number };
  country: string;
  description: string;
  flightDuration?: string;
  highlights: string[];
  id: string;
  images: string[];
  name: string;
  reason: string;
  temperature: string;
  travelTip: string;
  vacationType: string[];
}

export interface VacationPreferences {
  month: string[];
  temperature: string[];
  vacationType: string[];
  continent: string[];
  flightDuration: string[];
}

export interface GoogleImageSearchItem {
  link: string;
  mime: string;
  title: string;
  image: {
    contextLink: string;
    height: number;
    width: number;
    thumbnailLink: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
  };
}

export interface GoogleImageSearchResponse {
  kind: 'customsearch#search';
  items?: GoogleImageSearchItem[];
  searchInformation: {
    totalResults: string;
    searchTime: number;
  };
}