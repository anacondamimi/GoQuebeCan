"use client";
import React from 'react';
import { Waves, Hotel } from 'lucide-react';

const waterParks = [
  {
    name: 'Village Vacances Valcartier',
    description: "Le plus grand parc aquatique de l'est du Canada",
    image: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?auto=format&fit=crop&q=80',
    hotels: [
      {
        name: 'Hôtel de Glace',
        distance: 'Sur place',
        price: 'À partir de 299$/nuit',
      },
      {
        name: 'Entourage sur-le-Lac',
        distance: '25 km',
        price: 'À partir de 189$/nuit',
      },
      {
        name: 'Hôtel Le Bonne Entente',
        distance: '28 km',
        price: 'À partir de 219$/nuit',
      },
    ],
  },
  {
    name: "Bromont, montagne d'expériences",
    description: 'Parc aquatique en montagne avec vue panoramique',
    image: 'https://images.unsplash.com/photo-1582653292481-44c51f429f78?auto=format&fit=crop&q=80',
    hotels: [
      {
        name: 'Hôtel Bromont',
        distance: '5 km',
        price: 'À partir de 159$/nuit',
      },
      {
        name: 'Le St-Martin Bromont',
        distance: '8 km',
        price: 'À partir de 179$/nuit',
      },
      {
        name: 'Château-Bromont',
        distance: '3 km',
        price: 'À partir de 199$/nuit',
      },
    ],
  },
];

export function WaterParks() {
  return (
    <section id="parcs_aquatiques" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-16">
          <Waves className="h-8 w-8 text-indigo-600" />
          <h2 className="text-4xl font-bold text-center text-gray-900">Parcs Aquatiques</h2>
        </div>

        <div className="space-y-16">
          {waterParks.map((park) => (
            <div key={park.name} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-full">
                  <img src={park.image} alt={park.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{park.name}</h3>
                  <p className="text-gray-600 mb-8">{park.description}</p>

                  <div className="space-y-6">
                    <div className="flex items-center gap-2">
                      <Hotel className="h-6 w-6 text-indigo-600" />
                      <h4 className="text-lg font-semibold text-gray-900">Hôtels à proximité</h4>
                    </div>

                    <div className="space-y-4">
                      {park.hotels.map((hotel) => (
                        <div
                          key={hotel.name}
                          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <h5 className="font-semibold text-gray-900">{hotel.name}</h5>
                            <p className="text-sm text-gray-600">{hotel.distance}</p>
                          </div>
                          <p className="text-indigo-600 font-semibold">{hotel.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
