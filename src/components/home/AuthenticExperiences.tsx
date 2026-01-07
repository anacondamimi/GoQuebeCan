'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { Compass, Mountain, TreePine } from 'lucide-react';
import H3 from '@/components/typography/H3';
import H2 from '@/components/typography/H2';

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
        image: '/images/destinations/eeyou-istchee-baiejames.avif',
      },
      {
        name: 'Parc Kuururjuaq',
        slug: 'kuururjuaq',
        description: "Mont D'Iberville et rivière George, paradis pour les amateurs de plein air",
        image: '/images/destinations/kuururjuaq.avif',
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
        image: '/images/destinations/port-au-persil.avif',
      },
      {
        name: "L'Anse-Saint-Jean",
        slug: 'anse-saint-jean',
        description: 'Village historique avec kayak de mer et navettes maritimes du Fjord',
        image: '/images/destinations/anse-saint-jean.avif',
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
        image: '/images/destinations/sabrevois.avif',
      },
      {
        name: "Canyon des Portes de l'Enfer",
        slug: 'canyon',
        description: 'Passerelle suspendue et sentiers spectaculaires',
        image: '/images/destinations/canyon.avif',
      },
    ],
  },
];

export function AuthenticExperiences() {
  return (
    <section id="experiences_authentiques" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <H2 className="mb-4 text-center font-serif text-5xl font-bold text-primary sm:text-5xl">
          Expériences Québécoises Authentiques
        </H2>
        <p className="mb-16 text-center text-xl text-gray-600">
          Découvrez des trésors cachés et vivez des moments uniques hors des sentiers battus.
          Villages pittoresques, territoires sauvages et expériences inoubliables.
        </p>

        <div className="space-y-16">
          {experiences.map((category) => {
            const Icon = category.icon; // ✅ Fix
            return (
              <div key={category.category}>
                <div className="mb-8 flex items-center gap-3">
                  <Icon className="size-6 text-indigo-600 sm:size-8" />
                  <H3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    {category.category}
                  </H3>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  {category.destinations.map((destination) => (
                    <Link
                      key={destination.name}
                      href={`/blog/${destination.slug}`}
                      className="group block overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl"
                    >
                      <div className="relative h-40 overflow-hidden sm:h-48">
                        <Image
                          src={destination.image}
                          alt={destination.name}
                          className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                          width={800}
                          height={600}
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <h4 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
                          {destination.name}
                        </h4>
                        <p className="text-gray-600">{destination.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
