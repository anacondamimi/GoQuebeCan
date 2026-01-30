'use client';
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Compass, Waves } from 'lucide-react';
import H3 from '@/components/typography/H3';

interface Destination {
  name: string;
  description: string;
  image: string;
  blogId?: string;
}
interface Region {
  title: string;
  icon: 'compass' | 'pin' | 'waves';
  destinations: Destination[];
}
const regions: Region[] = [
  {
    title: 'Montréal et sa région',
    icon: 'waves',
    destinations: [
      {
        name: 'Montréal',
        description: 'Métropole culturelle entre histoire et modernité',
        image: '/images/destinations/montreal.avif',
        blogId: 'blog_article_montreal',
      },
    ],
  },
  {
    title: 'Ville de Québec et sa région',
    icon: 'compass',
    destinations: [
      {
        name: 'Vieux-Québec',
        description:
          "Site du patrimoine mondial de l'UNESCO avec ses fortifications historiques, le Château Frontenac et ses ruelles pavées",
        image: '/images/destinations/quebec.avif',
        blogId: 'blog_article',
      },
      {
        name: "Île d'Orléans",
        description: 'Terroir québécois, vignobles et patrimoine agricole',
        image: '/images/destinations/ile-dorleans.avif',
        blogId: 'blog_article_orleans',
      },
      {
        name: 'Chute Montmorency',
        description: 'Cascade spectaculaire de 83 mètres de hauteur',
        image: '/images/destinations/chute-montmorency.avif',
        blogId: 'blog_article_montmorency',
      },
      {
        name: 'Lévis',
        description: 'Vue imprenable sur Québec et patrimoine maritime',
        image: '/images/destinations/levis.avif',
        blogId: 'blog_article_levis',
      },
    ],
  },
  {
    title: 'Gaspésie',
    icon: 'pin',
    destinations: [
      {
        name: 'Percé',
        description: "Célèbre pour son rocher et l'île Bonaventure",
        image: '/images/destinations/perce.avif',
        blogId: 'blog/perce',
      },
      {
        name: 'Parc national Forillon',
        description: 'Randonnées spectaculaires et observation des baleines',
        image: '/images/destinations/forillon.avif',
        blogId: 'blog_article_forillon',
      },
      {
        name: 'Carleton-sur-Mer',
        description: 'Plages magnifiques et sports nautiques',
        image: '/images/destinations/carleton.avif',
        blogId: 'blog_article_carleton',
      },
    ],
  },
  {
    title: 'Charlevoix',
    icon: 'pin',
    destinations: [
      {
        name: 'Baie-Saint-Paul',
        description: "Village d'artistes et gastronomie locale",
        image: '/images/destinations/baie-st-paul.avif',
        blogId: 'blog_article_baie_saint_paul',
      },
      {
        name: 'Le Massif de Charlevoix',
        description: 'Station de ski avec vue sur le fleuve Saint-Laurent',
        image: '/images/destinations/le-massif.avif',
        blogId: 'blog_article_massif',
      },
      {
        name: 'Parc national des Hautes-Gorges',
        description: 'Croisières et randonnées spectaculaires',
        image: '/images/destinations/hautes-gorges.avif',
        blogId: 'blog_article_hautes_gorges',
      },
    ],
  },
  {
    title: "Cantons-de-l'Est",
    icon: 'pin',
    destinations: [
      {
        name: 'Magog-Orford',
        description: 'Lac Memphrémagog et activités de plein air',
        image: '/images/destinations/magog.avif',
        blogId: 'blog_article_magog_orford',
      },
      {
        name: 'Sherbrooke',
        description: 'Ville culturelle et murales urbaines',
        image: '/images/destinations/sherbrooke.avif',
        blogId: 'blog_article_sherbrooke',
      },
      {
        name: 'Bromont et Granby',
        description: 'Activités quatre saisons et Zoo de Granby',
        image: '/images/destinations/bromont.avif',
        blogId: 'blog_article_bromont_granby',
      },
    ],
  },
  {
    title: 'Bas-Saint-Laurent',
    icon: 'pin',
    destinations: [
      {
        name: 'Rivière-du-Loup',
        description: 'Observation des baleines et îles du Saint-Laurent',
        image: '/images/destinations/chute-riviere-du-loup.avif',
        blogId: 'blog_article_riviere_du_loup',
      },
      {
        name: 'Parc national du Bic',
        description: 'Phoques, randonnée et paysages maritimes',
        image: '/images/destinations/bic.avif',
        blogId: 'blog_article_bic',
      },
      {
        name: 'Kamouraska',
        description: 'Village historique et couchers de soleil légendaires',
        image: '/images/destinations/kamouraska.avif',
        blogId: 'blog_article_kamouraska',
      },
    ],
  },
  {
    title: 'Saguenay',
    icon: 'pin',
    destinations: [
      {
        name: 'Saguenay',
        description: 'Observation des baleines et îles du Saint-Laurent',
        image: '/images/destinations/fjord-saguenay.avif',
        blogId: 'blog_article_saguenay',
      },
      {
        name: 'Anse saint Jean',
        description: 'Phoques, randonnée et paysages maritimes',
        image: '/images/destinations/anse-saint-jean.avif',
        blogId: 'blog_article_anse_saint_jean',
      },
    ],
  },
  {
    title: 'Côte-Nord',
    icon: 'pin',
    destinations: [
      {
        name: 'Tadoussac',
        description: 'Observation des baleines et fjord du Saguenay',
        image: '/images/destinations/tadoussac.avif',
        blogId: 'blog_article_tadoussac',
      },
      {
        name: 'Sept-Îles',
        description: 'Archipel et culture innue',
        image: '/images/destinations/sept-iles.avif',
        blogId: 'blog_article_sept_iles',
      },
      {
        name: 'Mingan',
        description: 'Monolithes et îles uniques',
        image: '/images/destinations/mingan.avif',
        blogId: 'blog_article_mingan',
      },
      {
        name: 'Port-Cartier',
        description: 'Ville portuaire dynamique entre mer et forêt',
        image: '/images/destinations/port-cartier.avif',
        blogId: 'blog_article_port_cartier',
      },
    ],
  },
  {
    title: "Plages de l'Ontario",
    icon: 'pin',
    destinations: [
      {
        name: 'Wasaga Beach',
        description: "La plus longue plage d'eau douce au monde",
        image: '/images/destinations/wasaga-beach.avif',
        blogId: 'blog_article_wasaga_beach',
      },
      {
        name: 'Sauble Beach',
        description: '11 km de sable blanc',
        image: '/images/destinations/sauble-beach.avif',
        blogId: 'blog_article_sauble_beach',
      },
      {
        name: 'Grand Bend',
        description: 'Couchers de soleil spectaculaires',
        image: '/images/destinations/grand-bend.avif',
        blogId: 'blog_article_grand_bend',
      },
      {
        name: 'Port Dover',
        description: 'Ambiance de ville balnéaire',
        image: '/images/destinations/port-dover.avif',
        blogId: 'blog_article_port_dover',
      },
      {
        name: 'Sandbanks',
        description: 'Dunes de sable spectaculaires',
        image: '/images/destinations/sand-banks.avif',
        blogId: 'blog_article_sandbanks',
      },
      {
        name: 'Singing Sands Beach',
        description: 'Plage naturelle avec eaux peu profondes et sable chantant',
        image: '/images/destinations/singing-sands.avif',
        blogId: 'blog_article_singingsands',
      },
    ],
  },
  {
    title: 'Parcs Aquatiques',
    icon: 'waves',
    destinations: [
      {
        name: 'Parc Aquatique',
        description: 'Amusement garanti',
        image: '/images/destinations/glissades-bromont.avif',
        blogId: 'blog_article_parc_aquatique',
      },
    ],
  },
  {
    title: 'Territoires Sauvages',
    icon: 'compass',
    destinations: [
      {
        name: 'Eeyou Istchee Baie-James',
        description:
          'Territoire nordique avec taïga et lacs immenses, éco-gîtes de Matagami et kayak à Wemindji',
        image: '/images/destinations/eeyou-istchee-baiejames.avif',
        blogId: 'blog_article_eeyou_istchee',
      },
      {
        name: 'Kuururjuaq',
        description: "Mont D'Iberville et rivière George, paradis pour les amateurs de plein air",
        image: '/images/destinations/kuururjuaq.avif',
        blogId: 'blog_article_kuururjuaq',
      },
    ],
  },
  {
    title: 'Villages Pittoresques',
    icon: 'pin',
    destinations: [
      {
        name: 'Port-au-Persil',
        description: "Hameau aux airs d'Écosse dans Charlevoix",
        image: '/images/destinations/port-au-persil.avif',
        blogId: 'blog_article_port_au_persil',
      },
      {
        name: "L'Anse-Saint-Jean",
        description: 'Village historique avec kayak de mer et navettes maritimes du Fjord',
        image: '/images/destinations/anse-saint-jean.avif',
        blogId: 'blog_article_anse_saint_jean',
      },
    ],
  },
];
export default function PopularDestinations() {
  return (
    <section id="destinations" className="bg-warm-50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        {regions.map((region) => (
          <div key={region.title} className="mb-16 last:mb-0">
            {/* Titre de région + icône */}
            <div className="mb-8 flex items-center gap-3">
              {region.title === 'Gaspésie' ? (
                <Compass className="size-8 text-indigo-600" />
              ) : region.title === 'Ville de Québec et sa région' ? (
                <MapPin className="size-8 text-indigo-600" />
              ) : (
                <Waves className="size-8 text-indigo-600" />
              )}
              <H3 className="text-2xl font-bold text-gray-900 sm:text-3xl">{region.title}</H3>
            </div>

            {/* Grille de destinations */}
            <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
              {region.destinations.map((d) => (
                <Link
                  key={d.name}
                  href={d.blogId ? `/blog/${d.blogId}` : '#'}
                  className={`group overflow-hidden rounded-xl bg-white shadow-card transition-shadow hover:shadow-card-hover ${
                    d.blogId ? 'cursor-pointer' : 'cursor-default'
                  }`}
                >
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <Image
                      src={d.image}
                      alt={d.name}
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="rounded-xl object-cover object-center transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  </div>

                  <div className="p-5">
                    <h4 className="mb-1 font-display text-lg font-semibold text-gray-900">
                      {d.name}
                    </h4>
                    <p className="text-sm text-gray-600">{d.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
