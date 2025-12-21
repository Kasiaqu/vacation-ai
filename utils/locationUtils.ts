// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// Calculate flight duration based on distance
export function calculateFlightDuration(distanceKm: number): string {
  // Average flight speed: ~800 km/h
  // Add 1 hour for takeoff/landing procedures
  const flightTimeHours = distanceKm / 800 + 1;
  
  if (flightTimeHours < 2) {
    return 'Under 2 hours';
  } else if (flightTimeHours < 4) {
    return `${Math.round(flightTimeHours)} hours`;
  } else if (flightTimeHours < 8) {
    return `${Math.round(flightTimeHours)} hours`;
  } else if (flightTimeHours < 12) {
    return `${Math.round(flightTimeHours)} hours`;
  } else {
    return `${Math.round(flightTimeHours)} hours (long-haul)`;
  }
}

// Get user's location
export async function getUserLocation(): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        // If user denies or error, default to Central Europe (Frankfurt)
        resolve({ lat: 50.1109, lng: 8.6821 });
      }
    );
  });
}

// Temperature descriptions
export const temperatureDescriptions: Record<string, string> = {
  'cold': 'Cold climate - below 10°C. Perfect for winter sports and cozy experiences.',
  'cool': 'Cool climate - 10-20°C. Mild weather, ideal for sightseeing and outdoor activities.',
  'warm': 'Warm climate - 20-30°C. Pleasant temperatures for beach, hiking, and exploration.',
  'hot': 'Hot climate - above 30°C. High temperatures, best for beach relaxation and water sports.',
  'any': 'Flexible - open to any temperature range.'
};

// Budget descriptions
export const budgetDescriptions: Record<string, string> = {
  'budget': 'Budget-friendly - Affordable accommodation, food, and activities. Great value for money.',
  'moderate': 'Moderate pricing - Balanced mix of comfort and affordability. Mid-range options.',
  'luxury': 'Luxury experience - Premium hotels, fine dining, and exclusive experiences.'
};
