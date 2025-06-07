import { supabase } from './supabase';

export interface ContactForm {
  nom: string;
  email: string;
  message: string;
  type: 'contact' | 'producteur' | 'itineraire';
}

export async function saveContact(form: ContactForm) {
  const { error } = await supabase.from('contact_messages').insert([
    {
      ...form,
      created_at: new Date().toISOString(),
    },
  ]);

  return { error }; // ✅ important de retourner { error }
}
