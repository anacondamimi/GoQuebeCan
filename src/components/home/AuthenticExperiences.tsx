'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Compass, Mountain, TreePine } from 'lucide-react';

const experiences = [
  {
    category: 'Territoires Sauvages',
    icon: Mountain,
    destinations: [
      {
        name: 'Eeyou Istchee Baie-James',
        slug: 'eeyou-istchee',
        description:
          'Territoire nordique avec taïga et lacs immenses, éco-gîtes de Matagami et kayak à Wemindji',
        image:
          'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80',
      },
      {
        name: 'Parc Kuururjuaq',
        slug: 'kuururjuaq',
        description: "Mont D'Iberville et rivière George, paradis pour les amateurs de plein air",
        image:
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    category: 'Villages Pittoresques',
    icon: TreePine,
    destinations: [
      {
        name: 'Port-au-Persil',
        slug: 'port-au-persil',
        description: "Hameau aux airs d'Écosse dans Charlevoix",
        image:
          'https://images.unsplash.com/photo-1513977055326-8ae6272d90a7?auto=format&fit=crop&q=80',
      },
      {
        name: "L'Anse-Saint-Jean",
        slug: 'anse-saint-jean',
        description: 'Village historique avec kayak de mer et navettes maritimes du Fjord',
        image:
          'https://images.unsplash.com/photo-1583245117386-341b4e73ca88?auto=format&fit=crop&q=80',
      },
    ],
  },
  {
    category: 'Expériences Uniques',
    icon: Compass,
    destinations: [
      {
        name: 'Sainte-Anne-de-Sabrevois',
        slug: 'sabrevois',
        description: 'Huttes polynésiennes flottantes sur la rivière Richelieu',
        image:
          'https://images.unsplash.com/photo-1470010762743-1fa2363f65ca?auto=format&fit=crop&q=80',
      },
      {
        name: "Canyon des Portes de l'Enfer",
        slug: 'canyon',
        description: 'Passerelle suspendue et sentiers spectaculaires',
        image:
          'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80',
      },
    ],
  },
];

export function AuthenticExperiences() {
  return (
    <section id="experiences_authentiques" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
          Expériences Québécoises Authentiques
        </h2>
        <p className="text-xl text-center text-gray-600 mb-16">
          Découvrez des trésors cachés et vivez des moments uniques
        </p>

        <div className="space-y-16">
          {experiences.map((category) => (
            <div key={category.category}>
              <div className="flex items-center gap-3 mb-8">
                <category.icon className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{category.category}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {category.destinations.map((destination) => (
                  <Link
                    key={destination.name}
                    href={`/blog/${destination.slug}`}
                    className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow block"
                  >
                    <div className="relative h-40 sm:h-48 overflow-hidden">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                        width={800}
                        height={600}
                      />
                    </div>
                    <div className="p-4 sm:p-6">
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                        {destination.name}
                      </h4>
                      <p className="text-gray-600">{destination.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
