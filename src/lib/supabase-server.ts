// src/lib/supabase-server.ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export function getServerSupabase(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY (server env)');
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
