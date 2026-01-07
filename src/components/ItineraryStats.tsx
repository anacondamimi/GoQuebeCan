'use client';

import { useItineraryStore } from '@/store/useItineraryStore';
import type { StepData } from '@/types/Step';

function minutesToHhmm(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}

/** Récupère distance/durée vers l’étape suivante s’ils existent (zéro sinon), sans `any`. */
function getStepLeg(step: StepData): { distanceKm: number; durationMin: number } {
  const rec = step as unknown as Record<string, unknown>;
  const distanceKm = typeof rec['distanceKm'] === 'number' ? (rec['distanceKm'] as number) : 0;
  const durationMin = typeof rec['durationMin'] === 'number' ? (rec['durationMin'] as number) : 0;
  return { distanceKm, durationMin };
}

export default function ItineraryStats() {
  const { itinerary } = useItineraryStore();

  const legs: { distanceKm: number; durationMin: number }[] = (itinerary as StepData[]).map(
    (s: StepData) => getStepLeg(s),
  );

  const totalKm: number = legs.reduce(
    (acc: number, l: { distanceKm: number }) => acc + l.distanceKm,
    0,
  );
  const totalMin: number = legs.reduce(
    (acc: number, l: { durationMin: number }) => acc + l.durationMin,
    0,
  );

  return (
    <div className="mt-3 rounded-xl border bg-white/70 p-4 shadow-sm">
      <div className="text-lg font-semibold">
        Total : <span className="text-blue-600">{totalKm.toFixed(1)} km</span> •{' '}
        <span className="text-blue-600">{minutesToHhmm(totalMin)}</span>
      </div>

      {legs.length > 0 && (
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {legs.map((leg: { distanceKm: number; durationMin: number }, i: number) => (
            <div key={i} className="rounded-md border bg-white p-2 text-sm text-gray-700">
              Étape {i + 1} → {i + 2} : <strong>{leg.distanceKm.toFixed(1)} km</strong> •{' '}
              <strong>{minutesToHhmm(leg.durationMin)}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
