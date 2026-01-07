// app/api/itinerary/route.ts
import { NextResponse } from 'next/server';
import { saveItinerary, type SaveStep } from '@/lib/saveItinerary';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Formats possibles qui arrivent depuis le client
type IncomingStep =
  | { id?: string; name?: string; coordinates: [number, number] } // déjà en [lng,lat]
  | { id?: string; name?: string; lat: number; lng: number }; // séparé lat/lng

function normalizeSteps(raw: IncomingStep[]): SaveStep[] {
  return raw.map((s, idx, arr) => {
    const isLast = idx === arr.length - 1;
    const id = s.id ?? (idx === 0 ? 'start' : isLast ? 'end' : `step-${idx}`);
    const name = (s as any).name ?? (idx === 0 ? 'Départ' : isLast ? 'Arrivée' : `Étape ${idx}`);

    // Harmonise en [lng, lat]
    const coords: [number, number] =
      'coordinates' in s ? s.coordinates : ([s.lng, s.lat] as [number, number]);

    // Sécurité : force des nombres
    const lng = Number(coords[0]);
    const lat = Number(coords[1]);

    return { id, name, coordinates: [lng, lat] };
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const stepsRaw = body?.steps;
    const title = typeof body?.title === 'string' ? body.title : undefined;

    if (!Array.isArray(stepsRaw) || stepsRaw.length === 0) {
      return NextResponse.json({ success: false, error: 'Aucune étape reçue.' }, { status: 400 });
    }

    // ✅ Ici on garantit le type attendu par saveItinerary
    const steps: SaveStep[] = normalizeSteps(stepsRaw);

    const slug = await saveItinerary(steps, title);

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
