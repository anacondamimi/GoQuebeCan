'use client';

import React from 'react';
import Image from 'next/image';

import H3 from '@/components/typography/H3';

interface Producer {
  id: string;
  name: string;
  description?: string;
  website?: string | null;
  relatedArticles?: string[];
  lat: number;
  lng: number;
  image?: string;
  distanceKm?: number;
  distanceFromStartKm?: number;
}

interface Props {
  prod: Producer;
  onAddDestinationStep?: (step: { lat: number; lng: number; title?: string }) => void;
}

export default function ProducerPopup({ prod, onAddDestinationStep }: Props) {
  const isIOS =
    typeof navigator !== 'undefined' && /iPhone|iPad|Macintosh/.test(navigator.userAgent);

  const appleMapsUrl = `http://maps.apple.com/?q=${encodeURIComponent(
    prod.name,
  )}&ll=${prod.lat},${prod.lng}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${prod.lat},${prod.lng}`;

  // 🖼️ Fallback image si aucune image n’est définie
  const imageSrc =
    prod.image && prod.image.trim() !== '' ? prod.image : '/images/placeholder/placeholder.avif';

  return (
    <div className="max-w-[260px] space-y-2 text-sm">
      <H3 className="text-base font-bold text-indigo-700">{prod.name}</H3>

      {/* ✅ Image optimisée Next.js */}
      <div className="relative h-24 w-full overflow-hidden rounded shadow">
        <Image
          src={imageSrc}
          alt={`Photo de ${prod.name}`}
          fill
          sizes="(max-width: 768px) 100vw, 250px"
          className="object-cover"
          priority
        />
      </div>

      {prod.description && <p className="text-xs leading-snug text-gray-700">{prod.description}</p>}

      {typeof prod.distanceKm === 'number' && (
        <p className="text-xs text-gray-500">
          À {prod.distanceKm.toFixed(1)} km de votre itinéraire
        </p>
      )}

      {typeof prod.distanceFromStartKm === 'number' && (
        <p className="text-xs text-gray-500">
          {prod.distanceFromStartKm.toFixed(1)} km depuis le départ
        </p>
      )}

      <div className="mt-2 flex flex-wrap gap-2">
        {prod.website && (
          <a
            href={prod.website.startsWith('http') ? prod.website : `https://${prod.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-blue-600 px-2 py-1 text-xs text-white transition hover:bg-blue-700"
          >
            🌐 Site web
          </a>
        )}

        {prod.relatedArticles?.length ? (
          <a
            href={`/blog/${prod.relatedArticles[0]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-green-600 px-2 py-1 text-xs text-white transition hover:bg-green-700"
          >
            📖 Lire l’article
          </a>
        ) : null}

        <a
          href={isIOS ? appleMapsUrl : googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-gray-200 px-2 py-1 text-xs text-black transition hover:bg-gray-300"
        >
          🗺️ Ouvrir dans Maps
        </a>

        {onAddDestinationStep && (
          <button
            onClick={() => onAddDestinationStep({ lat: prod.lat, lng: prod.lng, title: prod.name })}
            className="rounded bg-indigo-600 px-2 py-1 text-xs text-white transition hover:bg-indigo-700"
          >
            ➕ Ajouter
          </button>
        )}
      </div>
    </div>
  );
}
