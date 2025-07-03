// 📌 1️⃣ /app/expansion/destinations-monde/page.tsx – Landing page temporaire destinations monde

'use client';

import React from 'react';
import Link from 'next/link';
import destinations from '@/data/destinationsWorld.json' assert { type: 'json' };

export default function DestinationsMonde() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">🌍 Destinations Monde pour Canadiens (Test)</h1>
      <p className="mb-6">
        Découvrez nos premières destinations soleil, Europe et Asie en phase de test avant lancement
        officiel GoQuébeCan international.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((dest) => (
          <Link
            key={dest.slug}
            href={`/expansion/destinations-monde/${dest.slug}`}
            className="border rounded-xl shadow hover:shadow-lg transition bg-white p-4 text-center"
          >
            <img
              src={dest.image}
              alt={dest.title}
              className="rounded-lg object-cover mb-2 w-full h-48"
            />
            <h2 className="font-semibold text-lg mb-1">{dest.title}</h2>
            <p className="text-sm text-gray-600">{dest.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
