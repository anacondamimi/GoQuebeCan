import React from 'react';
import Link from 'next/link';

const guides = [
  {
    title: 'Découvrir les producteurs du Québec',
    description:
      'Trouvez les fermes, microbrasseries et artisans locaux le long de votre itinéraire.',
    href: '/planificateur',
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
    href: '/chat',
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
    href: '/communaute',
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
          className="block rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-md transition-colors duration-300"
        >
          <img
            src={guide.image}
            alt={guide.title}
            className="w-full h-40 object-cover border-b border-gray-200"
          />
          <div className="p-4 bg-gray-50 hover:bg-white transition-colors duration-300">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{guide.title}</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{guide.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
