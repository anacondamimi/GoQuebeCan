// src/lib/saveItinerary.ts
import { getServerSupabase } from '@/lib/supabase-server';

export type SaveStep = {
  id: string;
  name: string; // ← string obligatoire
  coordinates: [number, number]; // [lng, lat]
};

function slugify(input: string) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 60);
}

export async function saveItinerary(steps: SaveStep[], title?: string) {
  const supabase = getServerSupabase();
  const safeTitle = (title ?? 'Itinéraire').trim() || 'Itinéraire';
  const slug = slugify(safeTitle);

  const { error } = await supabase.from('community_itineraries').insert({
    title: safeTitle,
    slug,
    steps, // JSON dans la table
  });

  if (error) throw new Error(error.message);
  return slug;
}
