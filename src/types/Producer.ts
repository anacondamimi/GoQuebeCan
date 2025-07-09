// src/types/producer.ts

/**
 * Type strict pour représenter un producteur local sur GoQuebeCan.
 */
export interface Producer {
  id: string; // Identifiant unique du producteur
  name: string; // Nom de l'entreprise ou du producteur
  lat: number; // Latitude
  lng: number; // Longitude
  type?: string; // Type (ex: 'farm', 'brewery', 'fromagerie')
  website?: string | null; // ✅ AJOUT DE "| null"
}
