import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // simple et compatible

export async function GET(req: Request) {
  const token = process.env.MAPBOX_SECRET_TOKEN;
  if (!token) {
    return NextResponse.json({ features: [], error: 'missing_token' }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') ?? '').trim();

  if (q.length < 3) {
    return NextResponse.json({ features: [] }, { status: 200 });
  }

  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json` +
    `?access_token=${encodeURIComponent(token)}` +
    `&autocomplete=true&language=fr&limit=5` +
    `&_cb=${Date.now()}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });

    const text = await res.text();
    // Mapbox renvoie parfois des détails utiles même en erreur
    if (!res.ok) {
      return NextResponse.json(
        { features: [], error: 'mapbox_error', status: res.status, body: text.slice(0, 300) },
        { status: 200 }, // on garde 200 pour ne pas casser l'UX côté client
      );
    }

    // Reparse le JSON depuis text (plus robuste)
    const data = JSON.parse(text);
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json({ features: [], error: 'fetch_failed' }, { status: 200 });
  }
}
