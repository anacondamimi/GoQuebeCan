// src/types/waypoint.ts

export interface Waypoint {
  id: string;
  name: string;
  coordinates: [number, number]; // [lat, lng]
  excerpt?: string;
  type?: 'city' | 'microbrasserie' | 'halte' | 'producteur';
}
