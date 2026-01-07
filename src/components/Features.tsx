'use client';

import React from 'react';
import { Tent, Hotel, Car } from 'lucide-react';
import H3 from '@/components/typography/H3';
import H2 from '@/components/typography/H2';

const features = [
  {
    title: 'Séjour en Camping',
    description: 'Explorez les plus beaux campings du Québec.',
    icon: Tent,
    link: 'https://www.booking.com/camping-affiliation',
    cta: 'Découvrir',
  },
  {
    title: 'Séjour en Hôtels',
    description: 'Trouvez les meilleurs hôtels avec Booking.com.',
    icon: Hotel,
    link: 'https://www.booking.com/hotels-affiliation',
    cta: 'Réserver',
  },
  {
    title: 'Location de voiture',
    description: 'Locations et bornes de recharge pour une aventure écoresponsable.',
    icon: Car,
    link: 'https://turo.com/ve-affiliation',
    cta: 'Louer maintenant',
  },
];

export default function Features() {
  return (
    <section id="planification" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <H2 className="mb-16 text-center text-4xl font-bold text-gray-900">
          Planifiez votre Aventure
        </H2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {features.map((feature) => (
            <a
              key={feature.title}
              href={feature.link}
              target="_blank"
              rel="noopener noreferrer"
              title={feature.title}
              aria-label={`En savoir plus sur ${feature.title}`}
              className="group rounded-xl bg-gray-50 p-8 transition-all hover:bg-gray-100 hover:shadow-lg"
            >
              <feature.icon className="mb-4 size-10 text-indigo-600 sm:mb-6 sm:size-12" />
              <H3 className="mb-3 text-lg font-semibold text-gray-900 sm:mb-4 sm:text-xl">
                {feature.title}
              </H3>
              <p className="mb-2 text-gray-600">{feature.description}</p>
              <span className="mt-2 inline-block font-medium text-indigo-600 group-hover:underline">
                {feature.cta}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
