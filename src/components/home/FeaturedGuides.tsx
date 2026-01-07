'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import H3 from '@/components/typography/H3';

const guides = [
  {
    title: 'Découvrir les producteurs du Québec',
    description:
      'Trouvez les fermes, microbrasseries et artisans locaux le long de votre itinéraire.',
    href: '/producteurs',
    image: '/images/producteurs.avif',
  },
  {
    title: 'Paysages spectaculaires',
    description: 'Explorez les plus beaux panoramas : Gaspésie, Charlevoix, Saguenay et plus.',
    href: '/destinations',
    image: '/images/page-accueil.avif',
  },
  {
    title: 'Vidéos immersives',
    description: 'Visionnez nos reportages vidéos pour découvrir le Québec et le Canada.',
    href: '/videos',
    image: '/images/destinations/hotels/motel-beluga.avif',
  },
  {
    title: 'Offres spéciales vols & hôtels',
    description: 'Profitez des meilleures promotions du moment pour voyager moins cher.',
    href: '/offres',
    image: '/images/destinations/hotels/rimouski.avif',
  },
  {
    title: 'Assistant IA de réservation',
    description: 'Gagnez du temps avec notre IA pour planifier et réserver sans stress.',
    href: 'api/chat/route.ts',
    image: '/images/carte.avif',
  },
  {
    title: 'Planificateur interactif',
    description: 'Créez votre itinéraire et découvrez les producteurs proches de votre route.',
    href: '/planificateur',
    image: '/images/planificateuritineraire.avif',
  },
  {
    title: 'Communauté & partages',
    description: 'Partagez vos itinéraires et découvrez ceux des autres voyageurs.',
    href: '/itineraires-communaute',
    image: '/images/communaute.avif',
  },
];

export default function FeaturedGuides() {
  return (
    <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
      {guides.map((guide) => (
        <Link
          key={guide.href}
          href={guide.href}
          className="block overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 transition-colors duration-300 hover:bg-white hover:shadow-md"
        >
          <div className="relative h-40 w-full">
            <Image
              src={guide.image}
              alt={guide.title}
              fill
              className="border-b border-gray-200 object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          </div>
          <div className="bg-gray-50 p-4 transition-colors duration-300 hover:bg-white">
            <H3 className="mb-2 text-lg font-semibold text-gray-900">{guide.title}</H3>
            <p className="text-sm leading-relaxed text-gray-700">{guide.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
