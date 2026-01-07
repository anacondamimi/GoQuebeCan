'use client';
import React, { useState } from 'react';
import H3 from '@/components/typography/H3';
import H2 from '@/components/typography/H2';
import { UtensilsCrossed, Search } from 'lucide-react';

const foodStops = [
  {
    region: 'Gaspésie',
    stops: [
      {
        name: 'Marché des Saveurs Gaspésiennes',
        location: 'Percé',
        speciality: 'Fruits de mer frais et produits locaux',
        rating: 4.8,
      },
      {
        name: 'La Fromagerie du Littoral',
        location: 'Mont-Joli',
        speciality: 'Fromages artisanaux',
        rating: 4.6,
      },
    ],
  },
  {
    region: 'Côte-Nord',
    stops: [
      {
        name: 'Les Jardins de la Mer',
        location: 'Sept-Îles',
        speciality: 'Algues et produits marins',
        rating: 4.7,
      },
      {
        name: 'La Galouïne',
        location: 'Tadoussac',
        speciality: 'Poisson fumé et tartares',
        rating: 4.9,
      },
    ],
  },
  {
    region: 'Québec',
    stops: [
      {
        name: 'Marché du Vieux-Port',
        location: 'Québec',
        speciality: 'Produits du terroir',
        rating: 4.8,
      },
      {
        name: 'Érablière du Cap',
        location: "Île d'Orléans",
        speciality: "Produits de l'érable",
        rating: 4.7,
      },
    ],
  },
];

export function FoodStops() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const filteredStops = foodStops
    .filter((region) => selectedRegion === 'all' || region.region === selectedRegion)
    .map((region) => ({
      ...region,
      stops: region.stops.filter(
        (stop) =>
          stop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stop.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stop.location.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((region) => region.stops.length > 0);

  return (
    <section id="haltes_gourmandes" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-center gap-3">
          <UtensilsCrossed className="size-8 text-indigo-600" />
          <H2 className="text-center text-4xl font-bold text-gray-900">Haltes Gourmandes</H2>
        </div>

        <p className="mb-12 text-center text-xl text-gray-600">
          Découvrez les meilleures adresses gastronomiques locales
        </p>

        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, spécialité ou lieu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="all">Toutes les régions</option>
            {foodStops.map((region) => (
              <option key={region.region} value={region.region}>
                {region.region}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredStops.map((region) => (
            <div key={region.region}>
              <H3 className="mb-6 text-2xl font-bold text-gray-900">{region.region}</H3>
              <div className="space-y-6">
                {region.stops.map((stop) => (
                  <div
                    key={stop.name}
                    className="rounded-xl bg-gray-50 p-6 transition-shadow hover:shadow-lg"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <h4 className="text-xl font-semibold text-gray-900">{stop.name}</h4>
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                        {stop.rating}/5
                      </span>
                    </div>
                    <p className="mb-2 text-gray-600">{stop.location}</p>
                    <p className="font-medium text-gray-700">Spécialité: {stop.speciality}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
