'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import destinations from '@/data/destinationsWorld.json';
import AffiliateCarousel from '@/components/AffiliateCarousel';
import { CTABanner } from '@/components/CTAComponents';

interface PageProps {
  params: { slug: string };
}

interface Destination {
  slug: string;
  title: string;
  image: string;
  description: string;
  category: string;
  region: string;
}

export default function DestinationPage({ params }: PageProps) {
  const destinationsData = destinations as Destination[];
  const destination = destinationsData.find((d) => d.slug === params.slug);

  if (!destination) return notFound();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{destination.title}</h1>
      <img
        src={destination.image}
        alt={destination.title}
        className="rounded-lg object-cover mb-4 w-full h-64"
      />
      <p className="mb-6">{destination.description}</p>
      <AffiliateCarousel />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          💳 Financer votre voyage avec des cartes de crédit
        </h2>
        <p className="mb-4">
          Découvrez comment les primes de bienvenue des cartes de crédit peuvent financer vos vols
          et séjours.
        </p>
        <CTABanner
          text="🌟 Voir les meilleures cartes de crédit pour voyageurs Canadiens"
          link="https://www.example-affiliation-cartes-credit.ca"
        />
      </section>
    </main>
  );
}
