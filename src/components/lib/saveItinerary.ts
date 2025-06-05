// lib/saveItinerary.ts
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

// Définis un type ItineraryStep
export type ItineraryStep = {
  id: string;
  name: string;
  coordinates: [number, number];
};

export async function saveItinerary(data: ItineraryStep[], title = '') {
  const slug = uuidv4();

  const { error } = await supabase.from('itineraries').insert([
    {
      slug,
      title,
      data,
    },
  ]);

  if (error) throw new Error('Erreur sauvegarde : ' + error.message);
  return slug;
}
