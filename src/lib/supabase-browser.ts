// src/lib/supabase-browser.ts
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key) {
  if (typeof window !== 'undefined') {
    console.warn('Missing NEXT_PUBLIC_SUPABASE_URL/ANON_KEY (client env)');
  }
}

// fallback inerte pour éviter un crash en dev si env manquantes côté client
export const supabaseBrowser =
  url && key ? createClient(url, key) : createClient('http://localhost', 'public-anon-key');
