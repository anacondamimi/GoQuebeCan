import { supabase } from '@/components/lib/supabase';

export async function saveFeedback({
  nom,
  email,
  message,
  type,
}: {
  nom: string;
  email: string;
  message: string;
  type: string;
}) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ nom, email, message, type }]);

  return { data, error };
}
