import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'bromont-granby',
  ville: 'Bromont Granby',
  resume: 'Découverte de Bromont Granby et de ses attraits touristiques.',
  activites: [
    'Zoo de Granby',
    'Parc aquatique Bromont',
    'Yamaska National Park',
    'Vélo de Montagne',
    'Arbre en Arbre',
    'Ski de Soirée',
  ],
  hebergements: ['St-Martin Bromont', 'Château-Bromont', 'Hôtel Castel & Spa Confort'],
  publics: ['familles', 'ados'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Splendid Mountain View Condo',
    category: 'Sport & télétravail',
    description:
      'Condo moderne avec vue sur la montagne, piscine, BBQ et Wi-Fi rapide. Parfait pour le ski, vélo, golf ou télétravail.',
    price: 'Tarif selon la saison et disponibilités',
    link: 'https://www.booking.com/hotel/ca/splendid-mountain-view-condo-with-pool-amp-bbq-ski-mtb-cycling-golf-telework.fr.html',
    image: '/images/destinations/hotels/appartement bromont.avif',
  },
  {
    name: 'Château-Bromont',
    category: 'Resort',
    description: 'Au pied des pistes avec golf',
    price: 'À partir de 189$/nuit',
    link: 'https://www.booking.com/hotel/ca/chateau-bromont.html',
    image: '/images/destinations/hotels/vallea bromont.avif',
  },
  {
    name: 'Hôtel Castel & Spa Confort',
    category: 'Spa',
    description: 'À proximité du Zoo de Granby',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/castel-granby.html',
    image: '/images/destinations/hotels/hotel castel granby.avif',
  },
];

const restaurants = [
  {
    name: 'Le Brouemont',
    type: 'Pub Gastronomique',
    speciality: 'Cuisine pub raffinée et bières artisanales',
    price: '$$$',
    mustTry: 'Burger signature et bières locales',
    schedule: 'Ouvert tous les jours',
  },
  {
    name: "L'Abordage",
    type: 'Bistro',
    speciality: 'Cuisine bistro créative',
    price: '$$$',
    mustTry: 'Plats du jour et cocktails maison',
    schedule: 'Ouvert du mardi au dimanche',
  },
  {
    name: 'Les Quatre Canards',
    type: 'Gastronomique',
    speciality: 'Cuisine française contemporaine',
    price: '$$$$',
    mustTry: 'Canard du lac Brome',
    schedule: 'Ouvert du mercredi au dimanche',
  },
  {
    name: 'Edgar Hyperlodge',
    type: 'Bistro-Pub',
    speciality: 'Cuisine du terroir et bières locales',
    price: '$$$',
    mustTry: 'Poutine au canard confit',
    schedule: 'Ouvert tous les jours',
  },
  {
    name: 'Les délices du Mont à Shefford',
    type: 'Cantine',
    speciality: 'Cuisine rapide de qualité',
    price: '$$',
    mustTry: 'Poutine maison et hot-dogs',
    schedule: 'Saison estivale',
  },
  {
    name: 'Le restau du 9',
    type: 'Brunch',
    speciality: 'Brunch et déjeuners gourmands',
    price: '$$',
    mustTry: 'Brunch du week-end',
    schedule: 'Ouvert tous les jours',
  },
  {
    name: "L'express à Waterloo",
    type: 'Brunch & Café',
    speciality: 'Déjeuners et cafés spécialisés',
    price: '$$',
    mustTry: 'Oeufs bénédictine',
    schedule: 'Ouvert tous les jours',
  },
  {
    name: "C'est Belge",
    type: 'Brunch & Pâtisserie',
    speciality: 'Brunch et pâtisseries belges',
    price: '$$',
    mustTry: 'Gaufres belges',
    schedule: 'Ouvert du mercredi au dimanche',
  },
  {
    name: 'Boulangerie Pâtisserie Canaelle',
    type: 'Boulangerie Pâtisserie',
    speciality: 'Pains artisanaux et pâtisseries fines',
    price: '$$',
    mustTry: 'Viennoiseries maison',
    schedule: 'Ouvert du mardi au dimanche',
  },
];

const summerActivities = [
  {
    name: 'Parc aquatique Bromont',
    type: 'Aquatique',
    duration: 'Journée',
    price: 'À partir de 39$/personne',
    description: "13 glissades d'eau et piscine à vagues",
  },
  {
    name: 'Zoo de Granby',
    type: 'Famille',
    duration: '4-6 heures',
    price: '45$/adulte, 35$/enfant',
    description: 'Plus de 1500 animaux et parc aquatique',
  },
  {
    name: 'Vélo de Montagne Bromont',
    type: 'Sport',
    duration: 'À la journée',
    price: '45$/jour',
    description: 'Plus de 100 km de sentiers tous niveaux',
  },
];

const winterActivities = [
  {
    name: 'Ski Bromont',
    type: "Sport d'hiver",
    duration: 'À la journée',
    price: 'À partir de 79$/jour',
    description: '141 pistes et ski de soirée',
  },
  {
    name: 'Ski de Fond',
    type: "Sport d'hiver",
    duration: '2-4 heures',
    price: '20$/jour',
    description: 'Réseau de sentiers entretenus',
  },
  {
    name: 'Raquette Nocturne',
    type: 'Aventure',
    duration: '2 heures',
    price: '25$/personne',
    description: 'Sentiers illuminés en soirée',
  },
];

const familyActivities = [
  {
    title: 'Zoo de Granby',
    description: 'Animaux et parc aquatique (tous âges)',
    price: 'Forfaits famille disponibles',
  },
  {
    title: 'Parc aquatique Bromont',
    description: 'Glissades et piscines (tous âges)',
    price: 'À partir de 35$/enfant',
  },
  {
    title: 'Yamaska National Park',
    description: 'Plage et sentiers faciles',
    price: '8.75$/adulte',
  },
];

const teenActivities = [
  {
    title: 'Vélo de Montagne',
    description: 'Pistes de descente (12+ ans)',
    price: '45$/jour',
    duration: 'Accès journée',
  },
  {
    title: 'Arbre en Arbre',
    description: 'Parcours dans les arbres (12+ ans)',
    price: '35$/personne',
    duration: '2-3 heures',
  },
  {
    title: 'Ski de Soirée',
    description: 'Ski sous les lumières (12+ ans)',
    price: 'À partir de 35$',
    duration: '16h-22h',
  },
];

export default function BlogArticleBromontGranby() {
  return (
    <article id="blog_article_bromont_granby" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Bromont et Granby - Plaisirs Quatre Saisons</H1>
        <p className="text-xl text-gray-600">
          Découvrez deux villes complémentaires offrant sports de montagne, attractions familiales
          et plein air
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Bromont et Granby, deux villes voisines des Cantons-de-l'Est, offrent une combinaison
          parfaite d'activités sportives, familiales et de plein air. De la montagne au zoo, en
          passant par les parcs aquatiques, ces destinations promettent des aventures mémorables en
          toute saison.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/bromont.avif"
            alt="Bromont en été"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Bromont et Granby ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Activités Quatre Saisons</H3>
            <p className="text-gray-600">
              Du ski au vélo de montagne, en passant par les parcs aquatiques.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Attractions Familiales</H3>
            <p className="text-gray-600">
              Zoo de Granby, parcs aquatiques et activités pour tous les âges.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Nature Accessible</H3>
            <p className="text-gray-600">Montagnes, lacs et parcs nationaux à proximité.</p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          Activités Estivales
        </H2>
        <div className="space-y-8">
          {summerActivities.map((activity) => (
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
          Activités Hivernales
        </H2>
        <div className="space-y-8">
          {winterActivities.map((activity) => (
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
                1h en voiture depuis Montréal
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
                Navettes entre les attractions
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de voiture recommandée
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Transport en commun limité
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
              Juin à septembre pour les activités estivales. Décembre à mars pour le ski.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 159-199$/nuit Activités: 35-79$/jour Repas: 20-60$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Réservation conseillée en haute saison. Forfaits multi-activités disponibles.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">
          Prêt à Découvrir Bromont et Granby ?
        </H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et profitez des activités quatre saisons
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/bromont.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.skibromont.com"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}
