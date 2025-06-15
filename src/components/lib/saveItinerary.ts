// lib/saveItinerary.ts
import { supabase } from './supabase';  // ton fichier de config Supabase
import { v4 as uuidv4 } from 'uuid';
import { ItineraryStep } from 'src/types/itinerary';  // ton type partagé

export async function saveItinerary(data: ItineraryStep[], title = '') {
  const slug = uuidv4();

  try {
    const { error } = await supabase.from('itineraries').insert([
      { slug, title, data }
    ]);

    if (error) {
      console.error('❌ Supabase error:', error);
      throw new Error('Erreur sauvegarde : ' + error.message);
    }

    return slug;

  } catch (err: any) {
    console.error('❌ Erreur réseau ou Supabase :', err);
    throw new Error('Erreur sauvegarde : ' + (err.message || 'Erreur inconnue'));
  }
}
