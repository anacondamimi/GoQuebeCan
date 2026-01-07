'use client';

import React from 'react';
import OFFERS from '@/data/offers-data';
import OfferCard from '@/components/OfferCard';

export default function Offers() {
  if (!OFFERS?.length) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center text-gray-600">
        Les offres arrivent bientôt. Revenez très vite ✨
      </div>
    );
  }

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {OFFERS.map((o) => (
        <OfferCard key={o.id} offer={o} />
      ))}
    </section>
  );
}
