'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Video, Search, X } from 'lucide-react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

interface VideoItem {
  id: string;
  title: string;
  destination: string;
  thumbnail: string;
  videoUrl: string;
}

const videos: VideoItem[] = [
  {
    id: 'video100',
    title: 'Percé & Île Bonaventure',
    destination: 'Gaspésie',
    thumbnail: 'https://img.youtube.com/vi/0xWwU-hoDl4/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/0xWwU-hoDl4',
  },
  {
    id: 'video101',
    title: 'Parc national Forillon',
    destination: 'Gaspésie',
    thumbnail: 'https://img.youtube.com/vi/X9tG12MDpWo/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/X9tG12MDpWo',
  },
  {
    id: 'video102',
    title: 'Carleton-sur-Mer',
    destination: 'Gaspésie',
    thumbnail: 'https://img.youtube.com/vi/XdCDPgbeQjw/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/XdCDPgbeQjw',
  },
  {
    id: 'video103',
    title: 'Ville de Québec',
    destination: 'Ville de Québec',
    thumbnail: 'https://img.youtube.com/vi/FHEfTBz3MPs/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/FHEfTBz3MPs',
  },
  {
    id: 'video104',
    title: "Île d'Orléans",
    destination: 'Ville de Québec',
    thumbnail: 'https://img.youtube.com/vi/vVI1efp6hyE/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/vVI1efp6hyE',
  },
  {
    id: 'video32',
    title: 'Visite Guidée du Vieux-Québec',
    destination: 'Ville de Québec',
    thumbnail: 'https://img.youtube.com/vi/Gb5PWz1gs4g/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/Gb5PWz1gs4g',
  },
  {
    id: 'video105',
    title: 'Baie-Saint-Paul',
    destination: 'Charlevoix',
    thumbnail: 'https://img.youtube.com/vi/Pr2wkJAiKdc/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/Pr2wkJAiKdc',
  },
  {
    id: 'video106',
    title: 'Le Massif de Charlevoix',
    destination: 'Charlevoix',
    thumbnail: 'https://img.youtube.com/vi/Nd2VmFTnOGs/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/Nd2VmFTnOGs',
  },
  {
    id: 'video107',
    title: 'Parc national des Hautes-Gorges',
    destination: 'Charlevoix',
    thumbnail: 'https://img.youtube.com/vi/HR4AaXdISDE/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/HR4AaXdISDE',
  },
  {
    id: 'video108',
    title: 'Magog-Orford',
    destination: "Cantons-de-l'Est",
    thumbnail: 'https://img.youtube.com/vi/yHQ1U6cvyLQ/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/yHQ1U6cvyLQ',
  },
  {
    id: 'video109',
    title: 'Sherbrooke',
    destination: "Cantons-de-l'Est",
    thumbnail: 'https://img.youtube.com/vi/U80atbAANds/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/U80atbAANds',
  },
  {
    id: 'video110',
    title: 'Mont-Sutton',
    destination: "Cantons-de-l'Est",
    thumbnail: 'https://img.youtube.com/vi/RVI3obnegc0/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/RVI3obnegc0',
  },
  {
    id: 'video111',
    title: 'Rivière-du-Loup',
    destination: 'Bas-Saint-Laurent',
    thumbnail: 'https://img.youtube.com/vi/qDh-htj470s/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/qDh-htj470s',
  },
  {
    id: 'video112',
    title: 'Parc national du Bic',
    destination: 'Bas-Saint-Laurent',
    thumbnail: 'https://img.youtube.com/vi/D6oxT9255q8/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/D6oxT9255q8',
  },
  {
    id: 'video113',
    title: 'Kamouraska',
    destination: 'Bas-Saint-Laurent',
    thumbnail: 'https://img.youtube.com/vi/b9wRZkhdgiU/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/b9wRZkhdgiU',
  },
  {
    id: 'video114',
    title: 'Tadoussac',
    destination: 'Côte-Nord',
    thumbnail: 'https://img.youtube.com/vi/I6U5sJntrhU/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/I6U5sJntrhU',
  },
  {
    id: 'video17',
    title: 'Sept-Îles',
    destination: 'Côte-Nord',
    thumbnail: 'https://img.youtube.com/vi/SXkjn8J3f4M/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/SXkjn8J3f4M',
  },
  {
    id: 'video18',
    title: 'Mingan',
    destination: 'Côte-Nord',
    thumbnail: 'https://img.youtube.com/vi/7KLtIO3HV6Y/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/7KLtIO3HV6Y',
  },
  {
    id: 'video19',
    title: 'Road trip au Bas-Saint-Laurent',
    destination: 'Bas-Saint-Laurent',
    thumbnail: 'https://img.youtube.com/vi/HB6WPSolvFk/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/HB6WPSolvFk',
  },
  {
    id: 'video20',
    title: 'Road trip au Lac St-Jean',
    destination: 'Saguenay',
    thumbnail: 'https://img.youtube.com/vi/AruRrnZK9XM/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/AruRrnZK9XM',
  },
  {
    id: 'video21',
    title: 'Découverte de Eeyou Istchee Baie-James',
    destination: 'Territoires Sauvages',
    thumbnail: 'https://img.youtube.com/vi/8yOf6UPeqew/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/8yOf6UPeqew',
  },
  {
    id: 'video22',
    title: 'Exploration du Parc Kuururjuaq',
    destination: 'Territoires Sauvages',
    thumbnail: 'https://img.youtube.com/vi/rZecnWDv6ow/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/rZecnWDv6ow',
  },
  {
    id: 'video23',
    title: 'Visite de Port-au-Persil',
    destination: 'Villages Pittoresques',
    thumbnail: 'https://img.youtube.com/vi/L8lVUglwL1Y/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/L8lVUglwL1Y',
  },
  {
    id: 'video24',
    title: "L'Anse-Saint-Jean et le Fjord",
    destination: 'Villages Pittoresques',
    thumbnail: 'https://img.youtube.com/vi/qzH7Yvnw40A/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/qzH7Yvnw40A',
  },
  {
    id: 'video25',
    title: 'Les Huttes de Sainte-Anne-de-Sabrevois',
    destination: 'Expériences Uniques',
    thumbnail: 'https://img.youtube.com/vi/JIi0sGIXFyQ/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/example-sabrevois',
  },
  {
    id: 'video26',
    title: "Le Canyon des Portes de l'Enfer",
    destination: 'Expériences Uniques',
    thumbnail: 'https://img.youtube.com/vi/asRmQdGIohY/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/asRmQdGIohY',
  },
  {
    id: 'video27',
    title: "Wasaga Beach: La plus longue plage d'eau douce",
    destination: "Plages de l'Ontario",
    thumbnail: 'https://img.youtube.com/vi/FqEAQ1uJXv4/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/FqEAQ1uJXv4',
  },
  {
    id: 'video28',
    title: 'Sauble Beach: 11 km de sable blanc',
    destination: "Plages de l'Ontario",
    thumbnail: 'https://img.youtube.com/vi/QPW6UMsrInE/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/QPW6UMsrInE',
  },
  {
    id: 'video29',
    title: 'Grand Bend: Couchers de soleil spectaculaires',
    destination: "Plages de l'Ontario",
    thumbnail: 'https://img.youtube.com/vi/JIi0sGIXFyQ/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/JIi0sGIXFyQ',
  },
  {
    id: 'video30',
    title: 'Port Dover: Ambiance de ville balnéaire',
    destination: "Plages de l'Ontario",
    thumbnail: 'https://img.youtube.com/vi/HFi7RQaqiqg/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/HFi7RQaqiqg',
  },
  {
    id: 'video31',
    title: 'Sandbanks: Dunes de sable spectaculaires',
    destination: "Plages de l'Ontario",
    thumbnail: 'https://img.youtube.com/vi/lZLhS_M_zJU/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/lZLhS_M_zJU',
  },
];

const destinations = [
  'Toutes les destinations',
  ...Array.from(new Set(videos.map((v) => v.destination))),
];

export default function PopularVideos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('Toutes les destinations');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDestination =
      selectedDestination === 'Toutes les destinations' ||
      video.destination === selectedDestination;
    return matchesSearch && matchesDestination;
  });

  return (
    <section id="videos_populaires" className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-center gap-3">
          <Video className="size-8 text-indigo-600" />
          <H1 className="text-center text-4xl font-bold text-gray-900">Vidéos Populaires</H1>
        </div>

        {/* Search + Filter */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une vidéo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            {destinations.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </select>
        </div>

        {/* Grid of Videos */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg"
              title={`Voir la vidéo : ${video.title}`}
            >
              <div className="relative h-40 sm:h-48">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-30">
                  <Video className="size-12 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <H3 className="mb-2 text-base font-semibold text-gray-900 sm:text-lg">
                  {video.title}
                </H3>
                <p className="text-sm text-gray-600">Destination: {video.destination}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600">Aucune vidéo ne correspond à votre recherche.</p>
          </div>
        )}
      </div>

      {/* 🔥 MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
          <div className="relative w-full max-w-3xl rounded-xl bg-white p-6">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="size-6" />
            </button>
            <H2 className="mb-4 text-2xl font-bold">{selectedVideo.title}</H2>
            <div className="relative mb-4 w-full pb-[56.25%]">
              <iframe
                src={
                  selectedVideo.videoUrl?.includes('watch?v=')
                    ? selectedVideo.videoUrl.replace('watch?v=', 'embed/')
                    : selectedVideo.videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                }
                title={selectedVideo.title}
                className="absolute left-0 top-0 size-full rounded-lg"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <p className="text-center text-gray-600">Profitez de la vidéo !</p>
          </div>
        </div>
      )}
    </section>
  );
}
