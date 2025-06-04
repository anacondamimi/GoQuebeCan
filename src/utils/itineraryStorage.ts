export type ItineraryPoint = {
  id: string;
  name: string;
  coordinates: [number, number];
};

// ✅ Ajouter un point à l’itinéraire (manuel / 1 par 1)
export function addToItinerary(point: ItineraryPoint) {
  const existing = getItinerary();
  const updated = [...existing, point];
  localStorage.setItem('itinerary', JSON.stringify(updated));
}

// ✅ Remplacer l’itinéraire complet (utile depuis le planificateur)
export function saveItinerary(points: ItineraryPoint[]) {
  localStorage.setItem('itinerary', JSON.stringify(points));
}

// ✅ Lire tous les points enregistrés
export function getItinerary(): ItineraryPoint[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('itinerary');
  return stored ? JSON.parse(stored) : [];
}

// ✅ Supprimer tous les points
export function clearItinerary() {
  localStorage.removeItem('itinerary');
}
