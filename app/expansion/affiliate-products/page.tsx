'use client';
import React from 'react';
import H1 from '@/components/typography/H1';
import AffiliateCarousel from 'src/components/AffiliateCarousel';

export default function AffiliateProductsPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <H1 className="mb-4 text-center text-3xl font-bold">🛍️ Voyagez dans le confort</H1>
      <p className="mb-6 text-center">
        Découvrez notre sélection de produits de voyage recommandés aux Canadiens.
      </p>
      <AffiliateCarousel />
    </main>
  );
}
