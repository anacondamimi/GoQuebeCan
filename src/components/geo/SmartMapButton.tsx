'use client';

import React, { useMemo } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import type { PlaceRef } from '@/lib/geoLinks';

type MapProvider = 'google' | 'apple' | 'waze';

function detectProvider(): MapProvider {
  if (typeof navigator === 'undefined') return 'google';
  const ua = navigator.userAgent || '';

  if (/iPhone|iPad|iPod/i.test(ua)) return 'apple';
  if (/Android/i.test(ua)) return 'waze';
  return 'google';
}

function encodePlace(place: PlaceRef) {
  // On reste compatible avec tes objets actuels { name, city }.
  // Si un jour tu ajoutes address/lat/lng, ça continue de fonctionner.
  const anyPlace = place as any;

  const name = (anyPlace?.name ?? '').toString().trim();
  const city = (anyPlace?.city ?? '').toString().trim();
  const address = (anyPlace?.address ?? '').toString().trim();

  const lat = typeof anyPlace?.lat === 'number' ? anyPlace.lat : undefined;
  const lng = typeof anyPlace?.lng === 'number' ? anyPlace.lng : undefined;

  // Priorité: coordonnées -> adresse -> "name, city"
  if (lat != null && lng != null) return { mode: 'coords' as const, q: `${lat},${lng}` };
  if (address) return { mode: 'text' as const, q: address };
  return {
    mode: 'text' as const,
    q: [name, city].filter(Boolean).join(', ') || name || 'Destination',
  };
}

function buildDirectionsLink(place: PlaceRef, provider: MapProvider) {
  const p = encodePlace(place);

  if (provider === 'apple') {
    // Apple Plans : daddr=destination
    const url = new URL('https://maps.apple.com/');
    url.searchParams.set('daddr', p.q);
    url.searchParams.set('dirflg', 'd'); // driving
    return url.toString();
  }

  if (provider === 'waze') {
    // Waze : navigate to query
    const url = new URL('https://waze.com/ul');
    url.searchParams.set('q', p.q);
    url.searchParams.set('navigate', 'yes');
    return url.toString();
  }

  // Google Maps directions : destination=
  const url = new URL('https://www.google.com/maps/dir/');
  url.searchParams.set('api', '1');
  url.searchParams.set('destination', p.q);
  url.searchParams.set('travelmode', 'driving');
  return url.toString();
}

function providerLabels(provider: MapProvider) {
  if (provider === 'apple') return { pill: 'Plans', full: 'Itinéraire (Plans)' };
  if (provider === 'waze') return { pill: 'Waze', full: 'Itinéraire (Waze)' };
  return { pill: 'Google', full: 'Itinéraire (Google Maps)' };
}

export function SmartMapButton({ place, className = '' }: { place: PlaceRef; className?: string }) {
  const provider = useMemo(() => detectProvider(), []);
  const href = useMemo(() => buildDirectionsLink(place, provider), [place, provider]);
  const labels = useMemo(() => providerLabels(provider), [provider]);

  const Icon = provider === 'waze' ? Navigation : MapPin;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener nofollow"
      aria-label={labels.full}
      title={labels.full}
      className={[
        // base premium
        'group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-sm transition-all duration-200',
        // couleurs
        'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md',
        // interactions
        'active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2',
        // pas de coupe de texte
        'whitespace-nowrap',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Icon className="size-4 shrink-0 transition-transform group-hover:scale-110" />

      {/* Mobile: ultra court / Desktop: explicite — jamais tronqué */}
      <span className="leading-none">
        <span className="sm:hidden">Itinéraire</span>
        <span className="hidden sm:inline">{labels.full}</span>
      </span>

      {/* Petit “badge” provider (très voyage moderne) */}
      <span className="ml-1 inline-flex items-center rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white/95 ring-1 ring-white/20">
        {labels.pill}
      </span>
    </a>
  );
}
