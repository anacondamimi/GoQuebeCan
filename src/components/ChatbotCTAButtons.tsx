// src/components/ChatbotCTAButtons.tsx
'use client';

import React from 'react';
import Link from 'next/link';

export default function ChatbotCTAButtons({ visible = true }: { visible?: boolean }) {
  if (!visible) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      <Link
        href="/planificateur"
        className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white transition hover:bg-indigo-700"
      >
        🗺️ Planifier mon itinéraire
      </Link>

      <Link
        href="/producteurs"
        className="rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white transition hover:bg-emerald-700"
      >
        🧺 Producteurs locaux
      </Link>

      <Link
        href="/blog/voyage-voiture"
        className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white transition hover:bg-green-700"
      >
        🚗 Guide voyage voiture
      </Link>

      <Link
        href="/blog/voyage-hotel"
        className="rounded-lg bg-sky-600 px-3 py-2 text-sm text-white transition hover:bg-sky-700"
      >
        🏨 Guide voyage hôtel
      </Link>
    </div>
  );
}
