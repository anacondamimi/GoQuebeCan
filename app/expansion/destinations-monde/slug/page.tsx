'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
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
    <main className="mx-auto max-w-3xl p-6">
      <H1 className="mb-4 text-3xl font-bold">{destination.title}</H1>
      <div className="relative mb-4 h-64 w-full">
        <Image
          src={destination.image}
          alt={destination.title}
          fill
          className="rounded-lg object-cover"
          sizes="(max-width: 768px) 100vw, 700px"
          priority
        />
      </div>
      <p className="mb-6">{destination.description}</p>

      <AffiliateCarousel />

      <section className="mt-8">
        <H2 className="mb-4 text-2xl font-semibold">
          💳 Financer votre voyage avec des cartes de crédit
        </H2>
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
