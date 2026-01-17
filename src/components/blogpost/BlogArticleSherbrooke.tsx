import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'sherbrooke',
  ville: 'Sherbrooke',
  resume: 'Découverte de Sherbrooke et de ses attraits touristiques.',
  activites: [
    'Musée de la Nature et des Sciences',
    'Parc Jacques-Cartier',
    'Centre de Sciences',
    'Vélo de Montagne',
    'Escalade Intérieure',
    'Skateparc',
  ],
  hebergements: ['OTL Gouverneur Sherbrooke', 'Grand Times Hotel', 'Hôtel Le Président'],
  publics: ['familles', 'ados', 'amateurs de culture', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Palette } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'OTL Gouverneur Sherbrooke',
    category: 'Luxe',
    description: 'Au cœur du centre-ville avec vue panoramique',
    price: 'À partir de 189$/nuit',
    link: 'https://www.booking.com/hotel/ca/gouverneur-sherbrooke.html',
    image: '/images/destinations/hotels/gouverneur-sherbrooke.avif',
  },
  {
    name: 'Grand Times Hotel',
    category: 'Moderne',
    description: 'Design contemporain et confort',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/grand-times-sherbrooke.html',
    image: '/images/destinations/hotels/time-sherbrooke.avif',
  },
  {
    name: 'Motel Le Refuge',
    category: 'Économique',
    description:
      'Situé à Sherbrooke, ce motel offre un excellent rapport qualité-prix et une localisation pratique à proximité des services.',
    price: 'Tarif abordable selon la période',
    link: 'https://www.booking.com/hotel/ca/motel-le-refuge-sherbrooke.fr.html',
    image: '/images/destinations/hotels/motel-refuge.avif',
  },
];

const restaurants = [
  {
    name: 'Auguste Restaurant',
    type: 'Gastronomique',
    speciality: 'Cuisine française contemporaine',
    price: '$$$$',
    mustTry: 'Foie gras maison',
    schedule: 'Ouvert du mardi au samedi',
  },
  {
    name: 'OMG Restaurant',
    type: 'Fusion',
    speciality: 'Cuisine asiatique fusion',
    price: '$$$',
    mustTry: 'Tataki de thon',
    schedule: 'Ouvert tous les jours',
  },
  {
    name: 'Café Pierre Jean Jase',
    type: 'Bistro',
    speciality: 'Cuisine bistro et brunch',
    price: '$$',
    mustTry: 'Brunch du week-end',
    schedule: 'Ouvert tous les jours',
  },
];

const culturalActivities = [
  {
    name: 'Circuit des Murales',
    type: 'Art Urbain',
    duration: '2-3 heures',
    price: 'Gratuit',
    description: '16 murales géantes dans le centre-ville',
  },
  {
    name: 'Musée des Beaux-Arts',
    type: 'Culture',
    duration: '1-2 heures',
    price: '15$/personne',
    description: 'Collections permanentes et expositions temporaires',
  },
  {
    name: 'Théâtre Granada',
    type: 'Spectacle',
    duration: 'Variable',
    price: 'À partir de 25$',
    description: 'Salle de spectacle historique',
  },
];

const outdoorActivities = [
  {
    name: 'Parc du Mont-Bellevue',
    type: 'Nature',
    duration: '2-4 heures',
    price: 'Gratuit',
    description: 'Randonnée et vélo de montagne en plein cœur de la ville',
  },
  {
    name: 'Gorge de la Rivière Magog',
    type: 'Nature',
    duration: '1-2 heures',
    price: 'Gratuit',
    description: 'Sentiers panoramiques le long de la rivière',
  },
  {
    name: 'Marais Réal-D.-Carbonneau',
    type: 'Nature',
    duration: '1-2 heures',
    price: 'Gratuit',
    description: "Observation d'oiseaux et passerelles sur l'eau",
  },
];

const familyActivities = [
  {
    title: 'Musée de la Nature et des Sciences',
    description: 'Expositions interactives pour tous les âges',
    price: '12$/enfant',
  },
  {
    title: 'Parc Jacques-Cartier',
    description: "Jeux d'eau et aires de jeux",
    price: 'Gratuit',
  },
  {
    title: 'Centre de Sciences',
    description: 'Ateliers scientifiques pour enfants',
    price: '15$/enfant',
  },
];

const teenActivities = [
  {
    title: 'Vélo de Montagne',
    description: 'Pistes au Mont-Bellevue (12+ ans)',
    price: 'Accès gratuit',
    duration: 'À votre rythme',
  },
  {
    title: 'Escalade Intérieure',
    description: "Centre d'escalade moderne (12+ ans)",
    price: '25$/personne',
    duration: '2-3 heures',
  },
  {
    title: 'Skateparc',
    description: 'Modules pour tous les niveaux',
    price: 'Gratuit',
    duration: 'À votre rythme',
  },
];

export default function BlogArticleSherbrooke() {
  return (
    <article id="blog_article_sherbrooke" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Sherbrooke - La Ville des Murales et de la Culture</H1>
        <p className="text-xl text-gray-600">
          Découvrez la capitale culturelle des Cantons-de-l'Est, entre art urbain, nature et
          histoire
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Sherbrooke, ville dynamique des Cantons-de-l'Est, se distingue par son patrimoine culturel
          riche, ses murales urbaines spectaculaires et son cadre naturel enchanteur. Ville
          universitaire vibrante, elle offre un mélange unique d'histoire, d'art contemporain et
          d'activités de plein air.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/sherbrooke.avif"
            alt="Sherbrooke"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Sherbrooke ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Art Urbain Unique</H3>
            <p className="text-gray-600">
              Plus grande concentration de murales au Québec, créant un musée à ciel ouvert.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Culture Vivante</H3>
            <p className="text-gray-600">Musées, galeries d'art et vie nocturne animée.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Nature en Ville</H3>
            <p className="text-gray-600">
              Parcs, sentiers et rivières accessibles en plein cœur urbain.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Palette className="size-8 text-indigo-600" />
          Culture et Art
        </H2>
        <div className="space-y-8">
          {culturalActivities.map((activity) => (
            <div key={activity.name} className="overflow-hidden rounded-lg bg-white shadow-md">
              <div className="p-6">
                <H3 className="mb-2 text-xl font-semibold text-gray-900">{activity.name}</H3>
                <p className="mb-4 text-gray-600">{activity.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Type: {activity.type}</span>
                  <span>Durée: {activity.duration}</span>
                  <span>Prix: {activity.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          Plein Air et Nature
        </H2>
        <div className="space-y-8">
          {outdoorActivities.map((activity) => (
            <div key={activity.name} className="overflow-hidden rounded-lg bg-white shadow-md">
              <div className="p-6">
                <H3 className="mb-2 text-xl font-semibold text-gray-900">{activity.name}</H3>
                <p className="mb-4 text-gray-600">{activity.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Type: {activity.type}</span>
                  <span>Durée: {activity.duration}</span>
                  <span>Prix: {activity.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Activités pour Enfants
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {familyActivities.map((activity) => (
            <div key={activity.title} className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-2 text-xl font-semibold text-gray-900">{activity.title}</H3>
              <p className="mb-2 text-gray-600">{activity.description}</p>
              <p className="font-medium text-indigo-600">{activity.price}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Activités pour Adolescents
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {teenActivities.map((activity) => (
            <div key={activity.title} className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-2 text-xl font-semibold text-gray-900">{activity.title}</H3>
              <p className="mb-2 text-gray-600">{activity.description}</p>
              <div className="mt-4 flex flex-col gap-1">
                <p className="font-medium text-indigo-600">{activity.price}</p>
                <p className="text-sm text-gray-500">Durée: {activity.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Hotel className="size-8 text-indigo-600" />
          Où Dormir ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {hotels.map((hotel) => (
            <a
              key={hotel.name}
              href={hotel.link}
              className="group block overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  className="size-full object-cover"
                  width={800}
                  height={600}
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-start justify-between">
                  <H3 className="text-xl font-semibold text-gray-900">{hotel.name}</H3>
                  <span className="rounded bg-indigo-100 px-2 py-1 text-sm text-indigo-700">
                    {hotel.category}
                  </span>
                </div>
                <p className="mb-4 text-gray-600">{hotel.description}</p>
                <p className="font-semibold text-indigo-600">{hotel.price}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Utensils className="size-8 text-indigo-600" />
          Où Manger ?
        </H2>
        <div className="space-y-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.name} className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <H3 className="mb-1 text-xl font-semibold text-gray-900">{restaurant.name}</H3>
                  <p className="text-gray-600">{restaurant.type}</p>
                </div>
                <span className="font-semibold text-indigo-600">{restaurant.price}</span>
              </div>
              <p className="mb-2 text-gray-700">
                <span className="font-medium">Spécialité:</span> {restaurant.speciality}
              </p>
              <p className="mb-2 text-gray-700">
                <span className="font-medium">À essayer:</span> {restaurant.mustTry}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Horaires:</span> {restaurant.schedule}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Bus className="size-8 text-indigo-600" />
          Comment s'y Rendre ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Depuis les Grandes Villes</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                1h45 en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                2h30 en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus Limocar quotidien
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Transport en commun efficace (STS)
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Centre-ville accessible à pied
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Calendar className="size-8 text-indigo-600" />
          Conseils Pratiques
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Calendar className="size-5 text-indigo-600" />
              Meilleure Période
            </H3>
            <p className="text-gray-600">
              Mai à octobre pour les activités extérieures. Festivals tout au long de l'année.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 139-189$/nuit Activités: 0-25$/jour Repas: 15-50$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Ville étudiante animée. Nombreux événements culturels. Circuit des murales accessible
              toute l'année.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Sherbrooke ?</H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et explorez la capitale culturelle des Cantons-de-l'Est
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/sherbrooke.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.destinationsherbrooke.com"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer la Ville
          </a>
        </div>
      </section>
    </article>
  );
}
