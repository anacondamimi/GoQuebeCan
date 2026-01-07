'use client';

/**
 * Stockage local (localStorage) de l'itinéraire côté navigateur.
 * Zéro `any`, avec des gardes de type runtime pour sécuriser JSON.parse.
 */

export type ItineraryPoint = {
  id: string; // identifiant stable (ex: 'start', 'end', 'step-1', …)
  name: string; // libellé affiché (ex: "Montréal, Québec, Canada")
  coordinates: [number, number]; // [lat, lng]
};

const STORAGE_KEY = 'itinerary';

/* ----------------------------- Type guards ----------------------------- */

function isNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

function isTupleLatLng(v: unknown): v is [number, number] {
  return Array.isArray(v) && v.length === 2 && isNumber(v[0]) && isNumber(v[1]);
}

function isItineraryPoint(v: unknown): v is ItineraryPoint {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return typeof o.id === 'string' && typeof o.name === 'string' && isTupleLatLng(o.coordinates);
}

function isItineraryArray(v: unknown): v is ItineraryPoint[] {
  return Array.isArray(v) && v.every(isItineraryPoint);
}

/* ------------------------------ Helpers -------------------------------- */

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

/* --------------------------------- API --------------------------------- */

/** Remplace intégralement l'itinéraire sauvegardé. */
export function saveItinerary(points: ItineraryPoint[]): void {
  if (!canUseStorage()) return;
  // On n’écrit que si le tableau est bien formé
  const toWrite = Array.isArray(points) ? points.filter(isItineraryPoint) : [];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toWrite));
}

/** Alias pratique. */
export const setItinerary = saveItinerary;

/** Ajoute un point à la fin de l'itinéraire persisté. */
export function addToItinerary(point: ItineraryPoint): void {
  const current = getItinerary();
  if (!isItineraryPoint(point)) return;
  current.push(point);
  saveItinerary(current);
}

/** Met à jour un point (par id). Ignore la mise à jour si elle invalide le schéma. */
export function updateItineraryPoint(id: string, patch: Partial<ItineraryPoint>): void {
  const current = getItinerary();
  const idx = current.findIndex((p) => p.id === id);
  if (idx === -1) return;

  const next: ItineraryPoint = {
    ...current[idx],
    ...patch,
  };

  // Si le patch fournit des coordonnées, on valide le tuple
  if (patch.coordinates && !isTupleLatLng(patch.coordinates)) {
    // coordonnées invalides → on n'applique pas ce champ
    next.coordinates = current[idx].coordinates;
  }

  // Validation finale
  if (!isItineraryPoint(next)) return;

  current[idx] = next;
  saveItinerary(current);
}

/** Supprime un point par id. */
export function removeItineraryPoint(id: string): void {
  const current = getItinerary();
  saveItinerary(current.filter((p) => p.id !== id));
}

/** Récupère l'itinéraire sauvegardé (tableau vide si rien/format invalide). */
export function getItinerary(): ItineraryPoint[] {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return isItineraryArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Efface l'itinéraire sauvegardé. */
export function clearItinerary(): void {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}
