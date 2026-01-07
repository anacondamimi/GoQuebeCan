// src/utils/suggestNearbyProducers.ts

import { Producer } from '@/types/Producer';

type Coord = [number, number];

export interface Suggestion {
  stepIndex: number;
  producer: Producer;
  distance: number;
}

// Fonction haversine en km
function haversineDistance(coord1: Coord, coord2: Coord): number {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.pow(Math.sin(dLon / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Interpolation le long de l'itinéraire
function interpolatePointsAlongRoute(routePoints: Coord[], stepKm: number = 10): Coord[] {
  const interpolated: Coord[] = [];

  for (let i = 0; i < routePoints.length - 1; i++) {
    const [lat1, lon1] = routePoints[i];
    const [lat2, lon2] = routePoints[i + 1];

    const distance = haversineDistance([lat1, lon1], [lat2, lon2]);
    const steps = Math.max(1, Math.floor(distance / stepKm));

    for (let j = 0; j <= steps; j++) {
      const fraction = j / steps;
      const lat = lat1 + (lat2 - lat1) * fraction;
      const lon = lon1 + (lon2 - lon1) * fraction;
      interpolated.push([lat, lon]);
    }
  }

  return interpolated;
}

/**
 * Suggère les producteurs dans un rayon de `maxDistance` le long de l'itinéraire.
 * Utilise des points interpolés tous les `interpolationStepKm` km.
 */
export function suggestNearbyProducers(
  producers: Producer[],
  waypoints: [number, number][],
  maxDistance: number = 30,
  interpolationStepKm: number = 10,
): Suggestion[] {
  if (!waypoints || waypoints.length < 2) {
    console.warn('⚠️ Pas assez de points pour interpoler l’itinéraire.');
    return [];
  }

  const interpolatedPoints = interpolatePointsAlongRoute(waypoints, interpolationStepKm);

  const suggestionsMap = new Map<string, Suggestion>();

  interpolatedPoints.forEach((point, idx) => {
    producers.forEach((producer) => {
      if (
        typeof producer.lat !== 'number' ||
        typeof producer.lng !== 'number' ||
        isNaN(producer.lat) ||
        isNaN(producer.lng)
      ) {
        console.warn('❌ Producteur ignoré (coordonnées invalides):', producer);
        return;
      }

      const distance = haversineDistance(point, [producer.lat, producer.lng]);
      if (distance <= maxDistance) {
        const key = producer.id;
        if (
          !suggestionsMap.has(key) ||
          distance < (suggestionsMap.get(key)?.distance ?? Infinity)
        ) {
          suggestionsMap.set(key, {
            stepIndex: idx,
            producer,
            distance,
          });
        }
      }
    });
  });

  return Array.from(suggestionsMap.values()).sort((a, b) => a.distance - b.distance);
}
