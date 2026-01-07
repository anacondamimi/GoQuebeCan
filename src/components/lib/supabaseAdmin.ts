// src/components/lib/supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // pas la clé public !!
);

export { supabaseAdmin };
