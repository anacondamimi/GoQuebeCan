import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

type CommunityItineraryRow = {
  id: string;
  status: 'pending' | 'approved' | 'rejected' | null;
  rejected_at: string | null;
  updated_at: string | null;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      id?: string;
      validationNote?: string;
    };

    if (!body.id) {
      return NextResponse.json({ ok: false, error: 'ID manquant.' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { ok: false, error: 'Configuration Supabase incomplète côté serveur.' },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { data: existingData, error: fetchError } = await supabase
      .from('community_itineraries')
      .select('id, status, rejected_at, updated_at')
      .eq('id', body.id)
      .single();

    if (fetchError) {
      return NextResponse.json(
        { ok: false, error: `Lecture impossible : ${fetchError.message}` },
        { status: 500 },
      );
    }

    const itinerary = existingData as CommunityItineraryRow | null;

    if (!itinerary?.id) {
      return NextResponse.json({ ok: false, error: 'Itinéraire introuvable.' }, { status: 404 });
    }

    const now = new Date().toISOString();

    const { error: updateError } = await supabase
      .from('community_itineraries')
      .update({
        status: 'rejected',
        rejected_at: now,
        updated_at: now,
      })
      .eq('id', body.id);

    if (updateError) {
      return NextResponse.json(
        { ok: false, error: `Refus impossible : ${updateError.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Itinéraire refusé.',
    });
  } catch (error) {
    console.error('[community-itineraries/reject] unexpected error:', error);
    return NextResponse.json(
      { ok: false, error: 'Erreur inattendue côté serveur.' },
      { status: 500 },
    );
  }
}
