import React from 'react';
import AffiliateCard from '@/components/AffiliateCard';
import { affiliateLinks } from '@/data/affiliateLinks';

export default function BonsPlansSection() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {affiliateLinks.map((item) => (
        <AffiliateCard key={item.title} {...item} />
      ))}
    </section>
  );
}
