import producers from '@/data/producers.json';
import { point, lineString, nearestPointOnLine } from '@turf/turf';

type Producer = {
  name: string;
  lat: number;
  lng: number;
  type?: string;
  [key: string]: any;
};

/**
 * Filtre les producteurs situés à moins de `radiusKm` km d'un itinéraire.
 * @param routeCoords Tableau de points GPS [lat, lng]
 * @param radiusKm Rayon de recherche autour de l’itinéraire (par défaut 10 km)
 */
export function suggestNearbyProducers(
  routeCoords: [number, number][],
  radiusKm = 10
): Producer[] {
  const routeLine = lineString(routeCoords.map(([lat, lng]) => [lng, lat]));

  return producers.filter((producer: Producer) => {
    const p = point([producer.lng, producer.lat]);
    const nearest = nearestPointOnLine(routeLine, p, { units: 'kilometers' });
    return nearest.properties.dist <= radiusKm;
  });
}
