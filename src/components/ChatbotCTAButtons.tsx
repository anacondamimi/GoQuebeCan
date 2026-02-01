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
        href="/#objets"
        className="rounded-lg bg-green-600 px-3 py-2 text-sm text-white transition hover:bg-green-700"
      >
        🎒 Objets utiles pour voyager
      </Link>
      <Link
        href="/offres"
        className="rounded-lg bg-yellow-500 px-3 py-2 text-sm text-black transition hover:bg-yellow-600"
      >
        ✨ Partager mes bons plans
      </Link>
    </div>
  );
}
