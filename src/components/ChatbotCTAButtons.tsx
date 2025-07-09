// src/components/ChatbotCTAButtons.tsx
'use client';
import React from 'react';
import Link from 'next/link';

export default function ChatbotCTAButtons() {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <Link
        href="/planificateur"
        className="bg-indigo-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-indigo-700 transition"
      >
        🗺️ Planifier mon itinéraire
      </Link>
      <Link
        href="/objets-utiles"
        className="bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition"
      >
        🎒 Objets utiles pour voyager
      </Link>
      <Link
        href="/partage"
        className="bg-yellow-500 text-black px-3 py-2 rounded-lg text-sm hover:bg-yellow-600 transition"
      >
        ✨ Partager mes bons plans
      </Link>
    </div>
  );
}
