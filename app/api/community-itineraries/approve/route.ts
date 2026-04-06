import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type CommunityItineraryRow = {
  id: string;
  title: string | null;
  slug: string | null;
  status: 'pending' | 'approved' | 'rejected' | null;
  pdf_url: string | null;
  created_at: string | null;
  updated_at: string | null;
  approved_at: string | null;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = typeof body?.id === 'string' ? body.id : null;

    if (!id) {
      return NextResponse.json({ error: 'ID manquant.' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Variables Supabase manquantes.' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: existingData, error: fetchError } = await supabase
      .from('community_itineraries')
      .select('id, title, slug, status, pdf_url, created_at, updated_at, approved_at')
      .eq('id', id)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    const itinerary = existingData as CommunityItineraryRow | null;

    if (!itinerary || !itinerary.id) {
      return NextResponse.json({ error: 'Itinéraire introuvable.' }, { status: 404 });
    }

    const { data: updatedData, error: updateError } = await supabase
      .from('community_itineraries')
      .update({
        status: 'approved',
        updated_at: new Date().toISOString(),
      })
      .eq('id', itinerary.id)
      .select('id, title, slug, status, pdf_url, created_at, updated_at, approved_at')
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      itinerary: updatedData,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
