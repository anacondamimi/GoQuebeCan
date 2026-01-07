// src/types/producer.ts

/**
 * Type strict pour représenter un producteur local sur GoQuebeCan.
 */
export interface Producer {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: string;
  description?: string;
  website?: string | null;
  relatedArticles?: string[];
  image?: string;
  featured?: boolean;
  distanceKm?: number; // ← ajouté
}
