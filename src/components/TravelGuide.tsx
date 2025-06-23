'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import {
  Compass,
  Map,
  Users,
  Backpack,
  Calendar,
  PlaneLanding,
  Hotel,
  Utensils,
} from 'lucide-react';

type TravelStyle = 'all' | 'family' | 'backpacker' | 'luxury';

const destinations = [
  {
    region: 'Canada',
    places: [
      {
        name: 'Vancouver',
        description: 'Entre océan et montagnes',
        bestTime: 'Juin à Septembre',
        flightTips:
          'Vols directs depuis Montréal, meilleurs prix en basse saison (Octobre-Novembre)',
        image:
          'https://images.unsplash.com/photo-1560814304-4f05b62af116?auto=format&fit=crop&q=80',
        activities: ['Stanley Park', 'Granville Island', 'Grouse Mountain'],
      },
      {
        name: 'Banff',
        description: 'Parc national des Rocheuses',
        bestTime: 'Juillet à Août (été) / Décembre à Mars (ski)',
        flightTips: 'Voler vers Calgary puis location de voiture',
        image:
          'https://images.unsplash.com/photo-1587131782738-de30ea91a542?auto=format&fit=crop&q=80',
        activities: ['Lac Louise', 'Gondole de Banff', 'Sources thermales'],
      },
    ],
  },
  {
    region: 'Europe du Sud',
    places: [
      {
        name: 'Costa del Sol',
        description: "Littoral ensoleillé d'Andalousie",
        bestTime: 'Mai à Octobre',
        flightTips: 'Vols vers Málaga, comparer les escales via Madrid ou Barcelone',
        image:
          'https://images.unsplash.com/photo-1583865288305-5e474e19542f?auto=format&fit=crop&q=80',
        activities: ['Plages de Marbella', 'Vieille ville de Málaga', 'Ronda'],
      },
      {
        name: "Côte d'Azur",
        description: 'Riviera française légendaire',
        bestTime: 'Mai à Septembre',
        flightTips: 'Vols vers Nice, surveiller les offres Air France et Air Transat',
        image:
          'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&q=80',
        activities: ['Nice', 'Monaco', 'Saint-Tropez'],
      },
      {
        name: 'Toscane',
        description: "Cœur culturel de l'Italie",
        bestTime: 'Avril à Octobre',
        flightTips: 'Vols vers Florence ou Pise, comparer les deux aéroports',
        image:
          'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80',
        activities: ['Florence', 'Sienne', "Val d'Orcia"],
      },
    ],
  },
  {
    region: 'Europe Centrale',
    places: [
      {
        name: 'Prague',
        description: 'Ville aux cent clochers',
        bestTime: 'Mars à Mai ou Septembre à Novembre',
        flightTips: 'Vols avec escale, comparer Frankfurt et Amsterdam comme hubs',
        image:
          'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&q=80',
        activities: ['Château de Prague', 'Pont Charles', 'Vieille Ville'],
      },
      {
        name: 'Budapest',
        description: 'Perle du Danube',
        bestTime: 'Mars à Mai ou Septembre à Octobre',
        flightTips: 'Combiner avec Prague ou Vienne pour optimiser les coûts',
        image:
          'https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?auto=format&fit=crop&q=80',
        activities: ['Bains Széchenyi', 'Bastion des Pêcheurs', 'Croisière Danube'],
      },
    ],
  },
  {
    region: 'Asie',
    places: [
      {
        name: 'Tokyo',
        description: 'Métropole futuriste et traditionnelle',
        bestTime: 'Mars-Mai (cerisiers) ou Octobre-Novembre',
        flightTips: 'Vols directs Air Canada, surveiller les promos Japan Airlines',
        image:
          'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80',
        activities: ['Shibuya', 'Temple Senso-ji', 'Mont Fuji'],
      },
      {
        name: 'Bangkok',
        description: 'Capitale vibrante de la Thaïlande',
        bestTime: 'Novembre à Février',
        flightTips: 'Comparer les escales via Tokyo, Hong Kong ou Séoul',
        image:
          'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80',
        activities: ['Grand Palais', 'Temples', 'Marchés flottants'],
      },
    ],
  },
];

const travelStyles = [
  {
    id: 'family',
    icon: Users,
    title: 'Familles',
    tips: [
      'Privilégier les vols directs même si plus chers',
      "Réserver les sièges à l'avance",
      'Vérifier les bagages inclus',
      'Choisir des horaires adaptés aux enfants',
    ],
  },
  {
    id: 'backpacker',
    icon: Backpack,
    title: 'Backpackers',
    tips: [
      'Flexibilité sur les dates',
      'Accepter les longues escales pour économiser',
      'Utiliser les alertes de prix',
      'Voyager hors-saison',
    ],
  },
  {
    id: 'luxury',
    icon: Hotel,
    title: 'Luxe',
    tips: [
      'Vols en classe affaires',
      'Services VIP aux aéroports',
      'Transferts privés inclus',
      'Flexibilité maximale sur les changements',
    ],
  },
];

export function TravelGuide() {
  const [selectedStyle, setSelectedStyle] = useState<TravelStyle>('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const filteredDestinations =
    selectedRegion === 'all'
      ? destinations
      : destinations.filter((d) => d.region === selectedRegion);

  return (
    <section id="guide_voyage" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Compass className="h-8 w-8 text-indigo-600" />
          <h2 className="text-4xl font-bold text-center text-gray-900">
            Guide Complet du Voyageur Malin
          </h2>
        </div>

        <p className="text-xl text-center text-gray-600 mb-12">
          Découvrez nos conseils d'experts pour planifier votre prochain voyage
        </p>

        {/* Filtres */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="all">Toutes les régions</option>
            {destinations.map((d) => (
              <option key={d.region} value={d.region}>
                {d.region}
              </option>
            ))}
          </select>

          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value as TravelStyle)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="all">Tous les styles de voyage</option>
            {travelStyles.map((style) => (
              <option key={style.id} value={style.id}>
                {style.title}
              </option>
            ))}
          </select>
        </div>

        {/* Styles de voyage */}
        {selectedStyle !== 'all' && (
          <div className="bg-gray-50 rounded-xl p-6 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Conseils pour les {travelStyles.find((s) => s.id === selectedStyle)?.title}
            </h3>
            <ul className="space-y-4">
              {travelStyles
                .find((s) => s.id === selectedStyle)
                ?.tips.map((tip, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <PlaneLanding className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Destinations */}
        {filteredDestinations.map((region) => (
          <div key={region.region} className="mb-16 last:mb-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Map className="h-6 w-6 text-indigo-600" />
              {region.region}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {region.places.map((place) => (
                <div key={place.name} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9">
                    <Image
                      src={place.image}
                      alt={place.name}
                      className="w-full h-64 object-cover"
                      width={800}
                      height={600}
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{place.name}</h4>
                    <p className="text-gray-600 mb-4">{place.description}</p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-indigo-600" />
                        <span className="text-sm">Meilleure période: {place.bestTime}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <PlaneLanding className="h-5 w-5 text-indigo-600" />
                        <span className="text-sm">{place.flightTips}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Utensils className="h-5 w-5 text-indigo-600" />
                          <span className="font-medium">À ne pas manquer:</span>
                        </div>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {place.activities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Conseils généraux */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Conseils pour Utiliser Skyscanner Efficacement
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Recherche de Vols</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                  Utilisez "Mois entier" pour voir les meilleurs prix
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                  Activez les alertes de prix pour suivre les tarifs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                  Comparez les aéroports voisins
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                  Vérifiez les options "Multi-cities"
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Astuces de Réservation</h4>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                  Réservez 3-6 mois à l'avance pour les long-courriers
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                  Préférez les vols en milieu de semaine
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                  Vérifiez les conditions d'annulation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                  Comparez les options de bagages inclus
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
