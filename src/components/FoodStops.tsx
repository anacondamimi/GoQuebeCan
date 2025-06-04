'use client';
import React, { useState } from 'react';
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
          stop.location.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((region) => region.stops.length > 0);

  return (
    <section id="haltes_gourmandes" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-8">
          <UtensilsCrossed className="h-8 w-8 text-indigo-600" />
          <h2 className="text-4xl font-bold text-center text-gray-900">Haltes Gourmandes</h2>
        </div>

        <p className="text-xl text-center text-gray-600 mb-12">
          Découvrez les meilleures adresses gastronomiques locales
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher par nom, spécialité ou lieu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="all">Toutes les régions</option>
            {foodStops.map((region) => (
              <option key={region.region} value={region.region}>
                {region.region}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStops.map((region) => (
            <div key={region.region}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{region.region}</h3>
              <div className="space-y-6">
                {region.stops.map((stop) => (
                  <div
                    key={stop.name}
                    className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-semibold text-gray-900">{stop.name}</h4>
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                        {stop.rating}/5
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{stop.location}</p>
                    <p className="text-gray-700 font-medium">Spécialité: {stop.speciality}</p>
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
