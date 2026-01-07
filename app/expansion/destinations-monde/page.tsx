'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import destinations from 'src/data/destinationsWorld.json';

type Destination = {
  slug: string;
  title: string;
  image: string;
  description: string;
  category: string;
  region: string;
};

export default function DestinationsMonde() {
  const destinationsData = destinations as Destination[];

  return (
    <main className="mx-auto max-w-4xl p-6">
      <H1 className="mb-4 text-3xl font-bold">🌍 Destinations Monde</H1>
      <p className="mb-6">
        Explorez nos suggestions de destinations internationales pour Canadiens.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {destinationsData.map((dest, index) => (
          <Link
            key={dest.slug}
            href={`/expansion/destinations-monde/${dest.slug}`}
            aria-label={`Découvrir ${dest.title}`}
            className="rounded-xl border bg-white p-4 text-center shadow transition hover:shadow-lg"
          >
            <Image
              src={dest.image}
              alt={dest.title}
              width={400}
              height={300}
              className="mb-2 h-48 w-full rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0} // Priorise le premier pour LCP
            />
            <H2 className="mb-1 text-lg font-semibold">{dest.title}</H2>
            <p className="text-sm text-gray-600">{dest.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
