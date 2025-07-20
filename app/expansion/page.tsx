'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        {destinations.map((dest, index) => (
          <Link
            key={dest.slug}
            href={`/expansion/destinations-monde/${dest.slug}`}
            aria-label={`Découvrir ${dest.title}`}
            className="border rounded-xl shadow hover:shadow-lg transition bg-white p-4 text-center"
          >
            <Image
              src={dest.image}
              alt={dest.title}
              width={400}
              height={300}
              className="rounded-lg object-cover mb-2 w-full h-48"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0}
            />
            <h2 className="font-semibold text-lg mb-1">{dest.title}</h2>
            <p className="text-sm text-gray-600">{dest.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
