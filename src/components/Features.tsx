'use client';

import React from 'react';
import { Tent, Hotel, Car } from 'lucide-react';

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
    <section id="planification" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Planifiez votre Aventure
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature) => (
            <a
              key={feature.title}
              href={feature.link}
              target="_blank"
              rel="noopener noreferrer"
              title={feature.title}
              aria-label={`En savoir plus sur ${feature.title}`}
              className="group p-8 bg-gray-50 rounded-xl transition-all hover:bg-gray-100 hover:shadow-lg"
            >
              <feature.icon className="h-10 w-10 sm:h-12 sm:w-12 text-indigo-600 mb-4 sm:mb-6" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-2">{feature.description}</p>
              <span className="inline-block mt-2 text-indigo-600 font-medium group-hover:underline">
                {feature.cta}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
