import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
export const metadata = {
  slug: 'magog-orford',
  ville: 'Magog Orford',
  resume: 'Découverte de Magog Orford et de ses attraits touristiques.',
  activites: [
    'Parc de la Plage-des-Cantons',
    'École de Voile',
    'Marais de la Rivière aux Cerises',
    'Vélo de Montagne',
    'Location de Kayak',
    'Escalade',
  ],
  hebergements: ['Manoir Hovey', 'Estrimont Suites & Spa', 'Auberge du Grand Lac'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Manoir Hovey',
    category: 'Luxe',
    description: 'Relais & Châteaux au bord du lac',
    price: 'À partir de 399$/nuit',
    link: 'https://www.booking.com/hotel/ca/manoir-hovey.html',
    image: '/images/destinations/hotels/manoir hovey.avif',
  },
  {
    name: 'Estrimont Suites & Spa',
    category: 'Spa',
    description: 'Vue sur le Mont Orford',
    price: 'À partir de 229$/nuit',
    link: 'https://www.booking.com/hotel/ca/estrimont-suites-spa.html',
    image: '/images/destinations/hotels/estrimont.avif',
  },
  {
    name: 'Appartement ',
    category: 'Nature & confort',
    description:
      'Chalet très bien noté (9.3/10) à Magog-Orford, à proximité du lac Memphrémagog, des plages et du Mont-Orford.',
    price: 'Tarif variable selon la saison',
    link: 'https://www.booking.com/hotel/ca/nouveaute-foyer-au-bois-plage-montagne-et-plus.fr.html',
    image: '/images/destinations/hotels/appartement orford.avif',
  },
];

const restaurants = [
  {
    name: 'Le Hatley',
    type: 'Gastronomique',
    speciality: 'Cuisine du terroir raffinée',
    price: '$$$$',
    mustTry: 'Omble chevalier du lac Memphrémagog',
    schedule: "Ouvert toute l'année",
  },
  {
    name: 'Bistro 4 Saisons',
    type: 'Bistro',
    speciality: 'Cuisine locale et vins québécois',
    price: '$$$',
    mustTry: 'Tartare de bison',
    schedule: "Ouvert toute l'année",
  },
  {
    name: 'Café Orford',
    type: 'Café-Restaurant',
    speciality: 'Brunch et pâtisseries maison',
    price: '$$',
    mustTry: 'Brunch du dimanche',
    schedule: "Ouvert toute l'année",
  },
];

const summerActivities = [
  {
    name: 'Croisière sur le Lac Memphrémagog',
    type: 'Navigation',
    duration: '1.5-3 heures',
    price: 'À partir de 45$/adulte',
    description: 'Découverte des légendes du lac et observation de la nature',
  },
  {
    name: 'Randonnée Mont Orford',
    type: 'Nature',
    duration: '2-6 heures',
    difficulty: 'Tous niveaux',
    description: 'Plus de 50 km de sentiers balisés',
  },
  {
    name: 'Plage du Lac Stukely',
    type: 'Baignade',
    duration: 'À la journée',
    price: "Inclus dans l'accès au parc",
    description: "Plage surveillée avec location d'équipements nautiques",
  },
];

const winterActivities = [
  {
    name: 'Ski Alpin Mont Orford',
    type: "Sport d'hiver",
    duration: 'À la journée',
    price: 'À partir de 79$/jour',
    description: '61 pistes sur 3 montagnes',
  },
  {
    name: 'Ski de Fond',
    type: "Sport d'hiver",
    duration: '2-4 heures',
    price: '25$/jour',
    description: 'Plus de 30 km de pistes tracées',
  },
  {
    name: 'Raquette Nocturne',
    type: 'Aventure',
    duration: '2 heures',
    price: '35$/personne',
    description: 'Randonnée guidée sous les étoiles',
  },
];

const familyActivities = [
  {
    title: 'Parc de la Plage-des-Cantons',
    description: "Plage familiale avec jeux d'eau (tous âges)",
    price: '15$/famille',
  },
  {
    title: 'École de Voile',
    description: 'Initiation à la voile (8-12 ans)',
    price: '75$/demi-journée',
  },
  {
    title: 'Marais de la Rivière aux Cerises',
    description: 'Sentiers sur pilotis et observation (tous âges)',
    price: 'Gratuit',
  },
];

const teenActivities = [
  {
    title: 'Vélo de Montagne',
    description: 'Pistes de descente au Mont Orford (12+ ans)',
    price: '45$/jour',
    duration: 'Accès journée',
  },
  {
    title: 'Location de Kayak',
    description: 'Exploration du lac en kayak (12+ ans)',
    price: '35$/2 heures',
    duration: '2-4 heures',
  },
  {
    title: 'Escalade',
    description: 'Parois naturelles avec guide (14+ ans)',
    price: '85$/personne',
    duration: '3 heures',
  },
];

export default function BlogArticleMagogOrford() {
  return (
    <article id="blog_article_magog_orford" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Magog-Orford - Entre Lacs et Montagnes</H1>
        <p className="text-xl text-gray-600">
          Découvrez ce joyau des Cantons-de-l'Est où nature, gastronomie et activités de plein air
          se rencontrent
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          La région de Magog-Orford, nichée entre le majestueux lac Memphrémagog et le parc national
          du Mont-Orford, offre un cadre enchanteur pour des vacances actives en toute saison. Cette
          destination prisée des Cantons-de-l'Est combine harmonieusement activités nautiques,
          randonnées en montagne et expériences gastronomiques.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/magog.avif"
            alt="Lac Memphrémagog"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Magog-Orford ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Nature Exceptionnelle</H3>
            <p className="text-gray-600">
              Entre lac majestueux et montagne accessible, un terrain de jeu naturel unique.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Activités 4 Saisons</H3>
            <p className="text-gray-600">
              Du ski au kayak, en passant par la randonnée et le vélo.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Gastronomie Locale</H3>
            <p className="text-gray-600">
              Route des vins, restaurants gastronomiques et produits du terroir.
            </p>
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
                  {activity.price && <span>Prix: {activity.price}</span>}
                  {activity.difficulty && <span>Difficulté: {activity.difficulty}</span>}
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
                1h30 en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                2h45 en voiture depuis Québec
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
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Navette vers le Mont Orford
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Taxi et location de voiture
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
              Juin à septembre pour les activités nautiques. Décembre à mars pour les sports
              d'hiver.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 169-399$/nuit Activités: 35-85$/jour Repas: 25-75$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Réservation conseillée en haute saison. Location d'équipement disponible sur place.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Magog-Orford ?</H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et profitez des activités quatre saisons
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/magog.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.sepaq.com/pq/mor/"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer le Parc
          </a>
        </div>
      </section>
    </article>
  );
}
