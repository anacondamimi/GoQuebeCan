'use client';
import React from 'react';
import AffiliateCarousel from 'src/components/AffiliateCarousel';

export default function AffiliateProductsPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">🛍️ Voyagez dans le confort</h1>
      <p className="text-center mb-6">
        Découvrez notre sélection de produits de voyage recommandés aux Canadiens.
      </p>
      <AffiliateCarousel />
    </main>
  );
}
