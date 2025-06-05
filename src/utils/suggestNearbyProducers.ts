// Type pour les données de camping si utilisé ailleurs
export type CampingData = {
  title: string;
  location: string;
  description: string;
  image: string;
  price: string;
  bestFor: string;
  facilities: string[];
  activities: string[];
  season: string;
  capacity: string;
};

import producers from '@/data/producers.json'; // JSON contenant les producteurs

// Type pour la suggestion retournée
export type SuggestedProducer = {
  stepIndex: number;
  producer: (typeof producers)[0];
  distance: number;
};

// Fonction de calcul de distance (Haversine)
function haversineDistance(coord1: [number, number], coord2: [number, number]) {
  const toRad = (x: number) => (x * Math.PI) / 180;
  const R = 6371; // rayon terrestre en km
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Fonction principale
export function suggestNearbyProducers(
  route: [number, number][],
  maxDistanceKm = 20
): SuggestedProducer[] {
  const suggestions: SuggestedProducer[] = [];
  const seen = new Set<string>();

  route.forEach((step, stepIndex) => {
    producers.forEach((p) => {
      const dist = haversineDistance(step, [p.lat, p.lng]);

      if (dist <= maxDistanceKm && !seen.has(p.id)) {
        suggestions.push({ stepIndex, producer: p, distance: dist });
        seen.add(p.id);
      }
    });
  });

  return suggestions
    .sort((a, b) => a.stepIndex - b.stepIndex || a.distance - b.distance)
    .slice(0, 5);
}
