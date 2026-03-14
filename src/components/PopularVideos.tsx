'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Video, Search, X, Map } from 'lucide-react';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

interface VideoItem {
  id: string;
  title: string;
  destination: string;
  region: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  articleUrl?: string;
}

const videos: VideoItem[] = [
  {
    id: 'video200',
    title: 'Montréal',
    destination: 'Montréal',
    region: 'Montréal et Rive-Sud',
    description:
      'Une belle introduction visuelle à Montréal pour découvrir l’ambiance urbaine, les quartiers, les points de vue et les idées de sortie.',
    thumbnail: 'https://img.youtube.com/vi/xBY8mh58D4I/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/xBY8mh58D4I',
    articleUrl: '/blog/montreal',
  },
  {
    id: 'video201',
    title: 'Chambly',
    destination: 'Chambly',
    region: 'Montréal et Rive-Sud',
    description:
      'Découvre Chambly en vidéo entre canal, fort, bord de l’eau et ambiance parfaite pour une escapade simple et gourmande près de Montréal.',
    thumbnail: 'https://img.youtube.com/vi/Pc6kyOH1i60/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/Pc6kyOH1i60',
    articleUrl: '/blog/chambly',
  },

  {
    id: 'video100',
    title: 'Percé & Île Bonaventure',
    destination: 'Percé',
    region: 'Gaspésie',
    description:
      'Une vidéo inspirante pour découvrir Percé, le Rocher Percé et l’Île Bonaventure lors d’un voyage en Gaspésie.',
    thumbnail: 'https://img.youtube.com/vi/0xWwU-hoDl4/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/0xWwU-hoDl4',
    articleUrl: '/blog/perce',
  },
  {
    id: 'video101',
    title: 'Parc national Forillon',
    destination: 'Forillon',
    region: 'Gaspésie',
    description:
      'Un aperçu vidéo du parc national Forillon avec paysages marins, falaises et grands espaces de la Gaspésie.',
    thumbnail: 'https://img.youtube.com/vi/X9tG12MDpWo/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/X9tG12MDpWo',
    articleUrl: '/blog/forillon',
  },
  {
    id: 'video102',
    title: 'Carleton-sur-Mer',
    destination: 'Carleton-sur-Mer',
    region: 'Gaspésie',
    description:
      'Une vidéo pour ressentir l’ambiance de Carleton-sur-Mer entre mer, détente et paysages côtiers.',
    thumbnail: 'https://img.youtube.com/vi/XdCDPgbeQjw/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/XdCDPgbeQjw',
    articleUrl: '/blog/carleton-sur-mer',
  },
  {
    id: 'video103',
    title: 'Ville de Québec',
    destination: 'Ville de Québec',
    region: 'Ville de Québec',
    description:
      'Une vidéo inspirante pour découvrir le charme, l’histoire et l’énergie de la ville de Québec.',
    thumbnail: 'https://img.youtube.com/vi/FHEfTBz3MPs/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/FHEfTBz3MPs',
    articleUrl: '/blog/quebec',
  },
  {
    id: 'video104',
    title: "Île d'Orléans",
    destination: "Île d'Orléans",
    region: 'Ville de Québec',
    description:
      'Découvre l’Île d’Orléans en vidéo avec ses paysages, ses routes tranquilles et ses bonnes adresses gourmandes.',
    thumbnail: 'https://img.youtube.com/vi/vVI1efp6hyE/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/vVI1efp6hyE',
    articleUrl: "/blog/ile-d'orleans",
  },
  {
    id: 'video32',
    title: 'Visite guidée du Vieux-Québec',
    destination: 'Vieux-Québec',
    region: 'Ville de Québec',
    description:
      'Une visite vidéo du Vieux-Québec pour voir l’ambiance, les rues historiques et les lieux emblématiques.',
    thumbnail: 'https://img.youtube.com/vi/Gb5PWz1gs4g/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/Gb5PWz1gs4g',
    articleUrl: '/blog/quebec',
  },
  {
    id: 'video105',
    title: 'Baie-Saint-Paul',
    destination: 'Baie-Saint-Paul',
    region: 'Charlevoix',
    description:
      'Une vidéo sur Baie-Saint-Paul pour découvrir son ambiance artistique, ses paysages et ses bonnes idées de sortie.',
    thumbnail: 'https://img.youtube.com/vi/Pr2wkJAiKdc/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/Pr2wkJAiKdc',
    articleUrl: '/blog/baie-saint-paul',
  },
  {
    id: 'video106',
    title: 'Le Massif de Charlevoix',
    destination: 'Le Massif de Charlevoix',
    region: 'Charlevoix',
    description:
      'Une vidéo du Massif de Charlevoix pour ressentir la montagne, les points de vue et l’expérience sur place.',
    thumbnail: 'https://img.youtube.com/vi/Nd2VmFTnOGs/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/Nd2VmFTnOGs',
    articleUrl: '/blog/massif',
  },
  {
    id: 'video107',
    title: 'Parc national des Hautes-Gorges',
    destination: 'Hautes-Gorges',
    region: 'Charlevoix',
    description:
      'Découvre les Hautes-Gorges en vidéo avec ses paysages spectaculaires et son ambiance nature.',
    thumbnail: 'https://img.youtube.com/vi/HR4AaXdISDE/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/HR4AaXdISDE',
    articleUrl: '/blog/hautes-gorges',
  },
  {
    id: 'video108',
    title: 'Magog-Orford',
    destination: 'Magog-Orford',
    region: "Cantons-de-l'Est",
    description:
      'Une vidéo de Magog-Orford pour voir le lac, la nature et les belles idées d’escapade dans les Cantons-de-l’Est.',
    thumbnail: 'https://img.youtube.com/vi/yHQ1U6cvyLQ/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/yHQ1U6cvyLQ',
    articleUrl: '/blog/magog-orford',
  },
  {
    id: 'video109',
    title: 'Sherbrooke',
    destination: 'Sherbrooke',
    region: "Cantons-de-l'Est",
    description:
      'Découvre Sherbrooke en vidéo avec son ambiance urbaine, ses murales et ses idées de sortie.',
    thumbnail: 'https://img.youtube.com/vi/U80atbAANds/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/U80atbAANds',
    articleUrl: '/blog/sherbrooke',
  },
  {
    id: 'video110',
    title: 'Mont-Sutton',
    destination: 'Mont-Sutton',
    region: "Cantons-de-l'Est",
    description:
      'Un aperçu vidéo du Mont-Sutton pour voir l’ambiance nature, les paysages et l’expérience plein air.',
    thumbnail: 'https://img.youtube.com/vi/RVI3obnegc0/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/RVI3obnegc0',
    articleUrl: '/blog/magog-orford',
  },
  {
    id: 'video111',
    title: 'Rivière-du-Loup',
    destination: 'Rivière-du-Loup',
    region: 'Bas-Saint-Laurent',
    description:
      'Une vidéo sur Rivière-du-Loup pour ressentir le fleuve, les points de vue et l’esprit de la région.',
    thumbnail: 'https://img.youtube.com/vi/qDh-htj470s/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/qDh-htj470s',
    articleUrl: '/blog/riviere-du-loup',
  },
  {
    id: 'video112',
    title: 'Parc national du Bic',
    destination: 'Le Bic',
    region: 'Bas-Saint-Laurent',
    description:
      'Découvre le parc national du Bic en vidéo avec ses caps, ses couchers de soleil et sa faune.',
    thumbnail: 'https://img.youtube.com/vi/D6oxT9255q8/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/D6oxT9255q8',
    articleUrl: '/blog/bic',
  },
  {
    id: 'video113',
    title: 'Kamouraska',
    destination: 'Kamouraska',
    region: 'Bas-Saint-Laurent',
    description:
      'Une vidéo pour découvrir Kamouraska, son charme tranquille et ses magnifiques vues sur le fleuve.',
    thumbnail: 'https://img.youtube.com/vi/b9wRZkhdgiU/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/b9wRZkhdgiU',
    articleUrl: '/blog/kamouraska',
  },
  {
    id: 'video114',
    title: 'Tadoussac',
    destination: 'Tadoussac',
    region: 'Côte-Nord',
    description:
      'Une vidéo de Tadoussac pour voir l’ambiance du village, les paysages et l’univers marin.',
    thumbnail: 'https://img.youtube.com/vi/I6U5sJntrhU/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/I6U5sJntrhU',
    articleUrl: '/blog/tadoussac',
  },
  {
    id: 'video17',
    title: 'Sept-Îles',
    destination: 'Sept-Îles',
    region: 'Côte-Nord',
    description:
      'Découvre Sept-Îles en vidéo avec ses grands espaces et son ambiance de bord de mer.',
    thumbnail: 'https://img.youtube.com/vi/SXkjn8J3f4M/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/SXkjn8J3f4M',
    articleUrl: '/blog/sept-iles',
  },
  {
    id: 'video18',
    title: 'Mingan',
    destination: 'Mingan',
    region: 'Côte-Nord',
    description:
      'Une vidéo sur Mingan pour découvrir un décor spectaculaire et une expérience unique sur la Côte-Nord.',
    thumbnail: 'https://img.youtube.com/vi/7KLtIO3HV6Y/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/7KLtIO3HV6Y',
    articleUrl: '/blog/mingan',
  },
  {
    id: 'video19',
    title: 'Road trip au Bas-Saint-Laurent',
    destination: 'Bas-Saint-Laurent',
    region: 'Bas-Saint-Laurent',
    description:
      'Un road trip vidéo pour voir plusieurs arrêts inspirants dans le Bas-Saint-Laurent.',
    thumbnail: 'https://img.youtube.com/vi/HB6WPSolvFk/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/HB6WPSolvFk',
    articleUrl: '/blog/gaspesie',
  },
  {
    id: 'video20',
    title: 'Road trip au Lac-Saint-Jean',
    destination: 'Lac-Saint-Jean',
    region: 'Saguenay',
    description:
      'Une vidéo de road trip pour découvrir l’ambiance du Lac-Saint-Jean et les idées d’étapes.',
    thumbnail: 'https://img.youtube.com/vi/AruRrnZK9XM/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/AruRrnZK9XM',
    articleUrl: '/blog/saguenay',
  },
  {
    id: 'video21',
    title: 'Découverte de Eeyou Istchee Baie-James',
    destination: 'Eeyou Istchee Baie-James',
    region: 'Territoires sauvages',
    description:
      'Une vidéo pour explorer l’immensité et l’esprit d’aventure de Eeyou Istchee Baie-James.',
    thumbnail: 'https://img.youtube.com/vi/8yOf6UPeqew/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/8yOf6UPeqew',
    articleUrl: '/blog/eeyou-istchee',
  },
  {
    id: 'video22',
    title: 'Exploration du parc Kuururjuaq',
    destination: 'Parc Kuururjuaq',
    region: 'Territoires sauvages',
    description:
      'Découvre le parc Kuururjuaq en vidéo avec ses paysages nordiques impressionnants.',
    thumbnail: 'https://img.youtube.com/vi/rZecnWDv6ow/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/rZecnWDv6ow',
    articleUrl: '/blog/kuururjuaq',
  },
  {
    id: 'video23',
    title: 'Visite de Port-au-Persil',
    destination: 'Port-au-Persil',
    region: 'Villages pittoresques',
    description:
      'Une vidéo sur Port-au-Persil pour voir un village plein de charme et de tranquillité.',
    thumbnail: 'https://img.youtube.com/vi/L8lVUglwL1Y/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/L8lVUglwL1Y',
    articleUrl: '/blog/port-au-persil',
  },
  {
    id: 'video24',
    title: "L'Anse-Saint-Jean et le fjord",
    destination: "L'Anse-Saint-Jean",
    region: 'Villages pittoresques',
    description:
      'Découvre L’Anse-Saint-Jean en vidéo avec le fjord, les montagnes et l’ambiance du village.',
    thumbnail: 'https://img.youtube.com/vi/qzH7Yvnw40A/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/qzH7Yvnw40A',
    articleUrl: '/blog/anse-saint-jean',
  },
  {
    id: 'video26',
    title: "Le canyon des Portes de l'Enfer",
    destination: "Canyon des Portes de l'Enfer",
    region: 'Expériences uniques',
    description: 'Une vidéo pour découvrir une sortie originale et impressionnante au Québec.',
    thumbnail: 'https://img.youtube.com/vi/asRmQdGIohY/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/asRmQdGIohY',
    articleUrl: '/blog/canyon',
  },
  {
    id: 'video27',
    title: "Wasaga Beach : la plus longue plage d'eau douce",
    destination: 'Wasaga Beach',
    region: "Plages de l'Ontario",
    description: 'Une vidéo pour découvrir Wasaga Beach, son immensité et son ambiance estivale.',
    thumbnail: 'https://img.youtube.com/vi/FqEAQ1uJXv4/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/FqEAQ1uJXv4',
    articleUrl: '/blog/wasaga-beach',
  },
  {
    id: 'video28',
    title: 'Sauble Beach : 11 km de sable blanc',
    destination: 'Sauble Beach',
    region: "Plages de l'Ontario",
    description: 'Une vidéo pour découvrir Sauble Beach, sa plage et son ambiance relaxe.',
    thumbnail: 'https://img.youtube.com/vi/QPW6UMsrInE/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/QPW6UMsrInE',
    articleUrl: '/blog/sauble-beach',
  },
  {
    id: 'video29',
    title: 'Grand Bend : couchers de soleil spectaculaires',
    destination: 'Grand Bend',
    region: "Plages de l'Ontario",
    description: 'Découvre Grand Bend en vidéo et ses magnifiques couchers de soleil.',
    thumbnail: 'https://img.youtube.com/vi/JIi0sGIXFyQ/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/JIi0sGIXFyQ',
    articleUrl: '/blog/grand-bend',
  },
  {
    id: 'video30',
    title: 'Port Dover : ambiance de ville balnéaire',
    destination: 'Port Dover',
    region: "Plages de l'Ontario",
    description: 'Une vidéo pour voir Port Dover, son atmosphère de plage et ses idées de sortie.',
    thumbnail: 'https://img.youtube.com/vi/HFi7RQaqiqg/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/HFi7RQaqiqg',
    articleUrl: '/blog/port-dover',
  },
  {
    id: 'video31',
    title: 'Sandbanks : dunes de sable spectaculaires',
    destination: 'Sandbanks',
    region: "Plages de l'Ontario",
    description: 'Découvre Sandbanks en vidéo avec ses dunes et son décor impressionnant.',
    thumbnail: 'https://img.youtube.com/vi/lZLhS_M_zJU/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/lZLhS_M_zJU',
    articleUrl: '/blog/sandbanks',
  },
];

const destinations = [
  'Toutes les destinations',
  ...Array.from(new Set(videos.map((v) => v.region))),
];

export default function PopularVideos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('Toutes les destinations');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const query = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !query ||
        video.title.toLowerCase().includes(query) ||
        video.destination.toLowerCase().includes(query) ||
        video.region.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query);

      const matchesDestination =
        selectedDestination === 'Toutes les destinations' || video.region === selectedDestination;

      return matchesSearch && matchesDestination;
    });
  }, [searchTerm, selectedDestination]);

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Vidéos populaires de voyage au Québec et au Canada',
    itemListElement: filteredVideos.map((video, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: video.title,
      url: video.articleUrl
        ? `https://goquebecan.com${video.articleUrl}`
        : 'https://goquebecan.com/videos',
    })),
  };

  return (
    <section id="videos_populaires" className="bg-gray-50 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-center gap-3">
          <Video className="size-8 text-indigo-600" />
          <H2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            Vidéos populaires
          </H2>
        </div>

        <p className="mx-auto mb-8 max-w-3xl text-center text-gray-600">
          Explore les plus belles destinations du Québec et du Canada en vidéo pour trouver des
          idées d’escapades, voir l’ambiance des lieux et préparer plus facilement ton prochain
          voyage.
        </p>

        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une vidéo ou une destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            aria-label="Filtrer les vidéos par région"
          >
            {destinations.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {filteredVideos.map((video) => (
            <article
              key={video.id}
              className="overflow-hidden rounded-xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <button
                type="button"
                onClick={() => setSelectedVideo(video)}
                className="group block w-full text-left"
                title={`Voir la vidéo : ${video.title}`}
              >
                <div className="relative h-40 sm:h-48">
                  <Image
                    src={video.thumbnail}
                    alt={`${video.title} - ${video.destination}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-opacity group-hover:bg-black/30">
                    <Video className="size-12 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wide text-indigo-600">
                    {video.region}
                  </p>

                  <H3 className="mb-2 text-base font-semibold text-gray-900 sm:text-lg">
                    {video.title}
                  </H3>

                  <p className="mb-3 text-sm leading-6 text-gray-600">{video.description}</p>

                  <p className="text-sm font-medium text-gray-700">
                    Destination : {video.destination}
                  </p>
                </div>
              </button>

              <div className="border-t border-gray-100 px-4 py-3 sm:px-6">
                <div className="flex flex-col gap-2">
                  {video.articleUrl ? (
                    <Link
                      href={video.articleUrl}
                      className="text-sm font-semibold text-blue-700 hover:underline"
                    >
                      Lire notre guide sur {video.destination}
                    </Link>
                  ) : null}

                  <Link
                    href="/planificateur"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:underline"
                  >
                    <Map className="size-4" />
                    Planifier un itinéraire
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600">Aucune vidéo ne correspond à votre recherche.</p>
          </div>
        )}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-3xl rounded-xl bg-white p-6">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              aria-label="Fermer la vidéo"
            >
              <X className="size-6" />
            </button>

            <H2 className="mb-2 text-2xl font-bold">{selectedVideo.title}</H2>
            <p className="mb-4 text-sm text-gray-600">{selectedVideo.description}</p>

            <div className="relative mb-4 w-full pb-[56.25%]">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="absolute left-0 top-0 size-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="mt-4 flex flex-col gap-2 text-center">
              {selectedVideo.articleUrl ? (
                <Link
                  href={selectedVideo.articleUrl}
                  className="font-semibold text-blue-700 hover:underline"
                >
                  Lire notre guide sur {selectedVideo.destination}
                </Link>
              ) : null}

              <Link href="/planificateur" className="font-semibold text-indigo-700 hover:underline">
                Utiliser notre planificateur d’itinéraire au Québec
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
