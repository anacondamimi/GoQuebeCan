// lib/saveItinerary.ts
import supabase from './supabase';
import { v4 as uuidv4 } from 'uuid';

export async function saveItinerary(data: any, title = '') {
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
