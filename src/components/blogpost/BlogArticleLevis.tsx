import React from 'react';
import Image from 'next/image';
// src/components/blogpost/BlogArticleLevis.tsx

import { Star, Hotel, Utensils, Bus, Calendar, DollarSign, Shield } from 'lucide-react';

export const metadata = {
  slug: 'levis',
  ville: 'Lévis',
  resume: 'Découverte de Lévis et de ses attraits touristiques.',
  activites: [
    'Terrasse de Lévis',
    'Parc des Chutes-de-la-Chaudière',
    'Parcours des Anses',
    'Aquarium du Québec',
    'Lieu historique du Fort-Numéro-Un',
    'Vélo sur le Parcours des Anses',
    'Escalade Intérieure',
    'Paintball Lévis',
  ],
  hebergements: [
    'Four Points by Sheraton Lévis',
    'Comfort Inn Lévis',
    'Quality Inn & Suites Lévis',
  ],
  publics: ['familles', 'ados'],
};

const hotels = [
  {
    name: 'Four Points by Sheraton Lévis',
    category: 'Vue sur Québec',
    description: 'Vue panoramique sur le Vieux-Québec',
    price: 'À partir de 179$/nuit',
    link: 'https://www.booking.com/hotel/ca/four-points-levis.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
  {
    name: 'Comfort Inn Lévis',
    category: 'Confort',
    description: 'Proche des attractions principales',
    price: 'À partir de 149$/nuit',
    link: 'https://www.booking.com/hotel/ca/comfort-inn-levis.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: 'Quality Inn & Suites Lévis',
    category: 'Familial',
    description: 'Idéal pour les familles',
    price: 'À partir de 139$/nuit',
    link: 'https://www.booking.com/hotel/ca/quality-inn-suites-levis.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

interface Restaurant {
  name: string;
  type: string;
  speciality: string;
  price: string;
  mustTry: string;
  schedule: string;
}
const restaurants: Restaurant[] = [
  {
    name: 'Cosmos Lévis',
    type: 'Cuisine internationale',
    speciality: 'Cuisine créative et cocktails',
    price: '$$$',
    mustTry: 'Tartare de saumon et cocktails signature',
    schedule: 'Ouvert tous les jours',
  },
  {
    name: 'Le Corsaire Pub',
    type: 'Microbrasserie',
    speciality: 'Bières artisanales et cuisine pub',
    price: '$$',
    mustTry: 'Planche dégustation de bières',
    schedule: 'Ouvert tous les jours',
  },
  {
    name: 'Restaurant Délice',
    type: 'Bistro français',
    speciality: 'Cuisine française contemporaine',
    price: '$$$',
    mustTry: 'Canard confit maison',
    schedule: 'Fermé le lundi',
  },
];

interface Activity {
  name: string;
  type: string;
  duration: string;
  price: string;
  description: string;
}
const activities: Activity[] = [
  {
    name: 'Terrasse de Lévis',
    type: 'Point de vue',
    duration: '1–2 heures',
    price: 'Gratuit',
    description: 'Vue imprenable sur Québec et le Saint-Laurent',
  },
  {
    name: 'Parc des Chutes-de-la-Chaudière',
    type: 'Nature',
    duration: '2–3 heures',
    price: 'Gratuit',
    description: 'Chute spectaculaire de 35 m et sentiers',
  },
  {
    name: 'Parcours des Anses',
    type: 'Cyclisme',
    duration: '2–4 heures',
    price: '35$/jour (location vélo)',
    description: 'Piste panoramique le long du fleuve',
  },
];

interface SimpleItem {
  title: string;
  description: string;
  price: string;
}
const familyActivities: SimpleItem[] = [
  {
    title: 'Parc des Chutes-de-la-Chaudière',
    description: 'Sentiers faciles et aires de pique-nique (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Aquarium du Québec',
    description: 'Plus de 10 000 spécimens marins (tous âges)',
    price: '22$/adulte, 11$/enfant',
  },
  {
    title: 'Lieu historique du Fort-Numéro-Un',
    description: 'Site interactif (7+ ans)',
    price: '8$/personne',
  },
];

const teenActivities: SimpleItem[] = [
  {
    title: 'Vélo sur le Parcours des Anses',
    description: 'Balade panoramique (12+ ans)',
    price: '35$/jour',
  },
  {
    title: 'Escalade Intérieure',
    description: 'Centre moderne (12+ ans)',
    price: '25$/personne',
  },
  {
    title: 'Paintball Lévis',
    description: 'Terrains variés (14+ ans)',
    price: '45$/personne',
  },
];

export default function BlogArticleLevis() {
  return (
    <article id="blog_article_levis" className="max-w-4xl mx-auto px-4 py-12 bg-white">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Lévis – L’Autre Rive de Québec</h1>
        <p className="text-xl text-gray-600">
          Découvrez cette ville dynamique offrant la plus belle vue sur Québec et des attractions
          uniques.
        </p>
      </header>

      <section className="prose lg:prose-xl mb-12">
        <p>
          Lévis, située sur la rive sud du Saint-Laurent face à Québec, offre bien plus qu'une
          simple vue panoramique sur la capitale. Cette ville combine patrimoine historique, nature
          préservée et vie culturelle animée, le tout à quelques minutes du Vieux-Québec.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/levis.avif"
            alt="Vue sur Québec depuis Lévis"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Pourquoi visiter Lévis ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Vue Spectaculaire</h3>
            <p className="text-gray-600">
              Le meilleur point de vue sur Québec et le Château Frontenac.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Nature Accessible</h3>
            <p className="text-gray-600">Parcs, pistes cyclables et chutes à proximité.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3">Histoire Maritime</h3>
            <p className="text-gray-600">Riche patrimoine naval et fortifications historiques.</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          Activités et Attractions
        </h2>
        <div className="space-y-8">
          {activities.map((act) => (
            <div key={act.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{act.name}</h3>
                <p className="text-gray-600 mb-4">{act.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Type : {act.type}</span>
                  <span>Durée : {act.duration}</span>
                  <span>Prix : {act.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Activités pour enfants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {familyActivities.map((item) => (
            <div key={item.title} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-indigo-600 font-medium">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Star className="h-8 w-8 text-indigo-600" />
          Activités pour adolescents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teenActivities.map((item) => (
            <div key={item.title} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-indigo-600 font-medium">{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Hotel className="h-8 w-8 text-indigo-600" />
          Où dormir ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hotels.map((h) => (
            <a
              key={h.name}
              href={h.link}
              className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={h.image}
                  alt={h.name}
                  className="w-full h-full object-cover"
                  width={800}
                  height={600}
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{h.name}</h3>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-sm">
                    {h.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{h.description}</p>
                <p className="text-indigo-600 font-semibold">{h.price}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Utensils className="h-8 w-8 text-indigo-600" />
          Où manger ?
        </h2>
        <div className="space-y-6">
          {restaurants.map((r) => (
            <div key={r.name} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{r.name}</h3>
                  <p className="text-gray-600">{r.type}</p>
                </div>
                <span className="text-indigo-600 font-semibold">{r.price}</span>
              </div>
              <p className="text-gray-700 mb-2">
                <strong>Spécialité:</strong> {r.speciality}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>À essayer:</strong> {r.mustTry}
              </p>
              <p className="text-gray-700">
                <strong>Horaires:</strong> {r.schedule}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Bus className="h-8 w-8 text-indigo-600" />
          Comment s’y rendre ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Depuis les grandes villes</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />3 h en voiture depuis
                Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Traversier depuis le Vieux-Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Bus interurbain quotidien
              </li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Sur place</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Transport en commun STLévis
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Location de vélos
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                Taxi et services locaux
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Calendar className="h-8 w-8 text-indigo-600" />
          Conseils pratiques
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-indigo-600" />
              Meilleure période
            </h3>
            <p className="text-gray-600">
              De mai à octobre pour l’extérieur, toute l’année pour la vue.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-indigo-600" />
              Budget
            </h3>
            <p className="text-gray-600">
              Hébergement : 139–179$/nuit · Activités : 0–45$/jour · Repas : 15–50$/pers.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-3 flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" />À noter
            </h3>
            <p className="text-gray-600">
              Prévoir chaussures adaptées et vérifier horaires du traversier.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
