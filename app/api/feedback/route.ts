// app/api/feedback/route.ts
import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/supabase-server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type FeedbackPayload = {
  name?: string;
  email?: string;
  message?: string;
  page?: string;
};

export async function POST(req: Request) {
  try {
    const {
      name = '',
      email = '',
      message = '',
      page = '',
    } = (await req.json()) as FeedbackPayload;

    if (!message.trim()) {
      return NextResponse.json({ ok: false, error: 'Le message est requis.' }, { status: 400 });
    }

    const supabase = getServerSupabase();
    const { error } = await supabase.from('feedback').insert({
      name: name.trim() || null,
      email: email.trim() || null,
      message: message.trim(),
      page: page || null,
      user_agent: req.headers.get('user-agent'),
      created_at: new Date().toISOString(), // si pas de default côté DB
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Erreur inconnue';
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
