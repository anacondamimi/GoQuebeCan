import { supabase } from './supabase';

export async function saveFeedback(slug: string, feedback: string) {
  const { error } = await supabase.from('feedbacks').insert([
    {
      slug,
      feedback,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    throw new Error('Erreur sauvegarde : ' + error.message);
  }
}
