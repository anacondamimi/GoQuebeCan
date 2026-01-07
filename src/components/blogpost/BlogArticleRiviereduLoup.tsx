import React from 'react';
import Image from 'next/image';
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'riviere-du-loup',
  ville: 'Riviere-du-Loup',
  resume: 'Découverte de Rivieredu Loup et de ses attraits touristiques.',
  activites: [
    'Croisière aux Baleines',
    'Parc des Chutes',
    'Manoir Fraser',
    'Centre Premier Tech',
    'Parc des Chutes',
    'Mini-Croisière',
    'Vélo sur la Route Verte',
    'Kayak de Mer',
    'Escalade Intérieure',
  ],
  hebergements: ['Hôtel Universel', 'Quality Inn', 'Auberge de la Pointe'],
  publics: ['familles', 'ados', 'amateurs de culture'],
};

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Hôtel Universel',
    category: '4 étoiles',
    description: 'Vue sur le fleuve et piscine intérieure',
    price: 'À partir de 159$/nuit',
    link: 'https://www.booking.com/hotel/ca/ha-tel-universel-centre-de-congra-s-rivia-re-du-loup.fr.html?aid=2369661&label=msn-1iEsdfBWGqhcgsbeYD7wQA-80814291883212%3Atikwd-80814466518286%3Aaud-816715537%3Aloc-32%3Aneo%3Amte%3Alp124427%3Adec%3Aqsbooking&sid=d8c900df91676294fb6594e03d6845ce&all_sr_blocks=31994701_382796525_2_0_0&checkin=2025-12-08&checkout=2025-12-10&dest_id=-572316&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=2&highlighted_blocks=31994701_382796525_2_0_0&hpos=2&matching_block_id=31994701_382796525_2_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=31994701_382796525_2_0_0__34900&srepoch=1761337521&srpvid=df5e8f7bd26e006a&type=total&ucfs=1&',
    image: '/images/destinations/hotels/hotel-universel-riviereduloup.avif',
  },
  {
    name: 'Comfort Inn Rivière-du-Loup',
    category: '3 étoiles',
    description:
      'Chambres confortables près du fleuve, petit-déjeuner inclus et accueil chaleureux.',
    price: 'À partir de 149 $/nuit',
    link: 'https://www.booking.com/hotel/ca/comfort-inn-riviere-du-loup.fr.html?aid=2369661&label=msn-1iEsdfBWGqhcgsbeYD7wQA-80814291883212%3Atikwd-80814466518286%3Aaud-816715537%3Aloc-32%3Aneo%3Amte%3Alp124427%3Adec%3Aqsbooking&sid=d8c900df91676294fb6594e03d6845ce&all_sr_blocks=24034208_91468373_2_1_0&checkin=2025-10-27&checkout=2025-10-29&dest_id=-572316&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=3&highlighted_blocks=24034208_91468373_2_1_0&hpos=3&matching_block_id=24034208_91468373_2_1_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=24034208_91468373_2_1_0__35614&srepoch=1761337234&srpvid=0ef28eef21e203af&type=total&ucfs=1&',
    image: '/images/destinations/hotels/hotel-confort-riviereduloup.avif',
  },

  {
    name: 'Auberge de la Pointe',
    category: 'Vue sur Mer',
    description: 'Site exceptionnel sur le Saint-Laurent',
    price: 'À partir de 169$/nuit',
    link: 'https://www.booking.com/hotel/ca/auberge-de-la-pointe.html',
    image: '/images/destinations/hotels/hotel-pointe-riviereduloup.avif',
  },
];

const restaurants = [
  {
    name: "Resto-Pub l'Estaminet",
    type: 'Pub Gastronomique',
    speciality: 'Cuisine du terroir et bières locales',
    price: '$$$',
    mustTry: 'Tartare de saumon et poutine maison',
    schedule: 'Ouvert tous les jours',
  },
  {
    name: 'Restaurant Bon Voyage',
    type: 'Fruits de mer',
    speciality: 'Poissons et fruits de mer locaux',
    price: '$$$$',
    mustTry: 'Plateau de fruits de mer',
    schedule: 'Ouvert du mardi au dimanche',
  },
  {
    name: "Cantine d'Amours",
    type: 'Cantine',
    speciality: 'Fast-food québécois',
    price: '$$',
    mustTry: 'Poutine et hot-dogs',
    schedule: 'Saison estivale',
  },
];

const activities = [
  {
    name: 'Croisière aux Baleines',
    type: 'Nature',
    duration: '3-4 heures',
    price: '79$/personne',
    description: "Observation des baleines dans l'estuaire",
  },
  {
    name: 'Parc des Chutes',
    type: 'Nature',
    duration: '1-2 heures',
    price: 'Gratuit',
    description: 'Sentiers et chute spectaculaire de 33 mètres',
  },
  {
    name: 'Manoir Fraser',
    type: 'Culture',
    duration: '1-2 heures',
    price: '12$/personne',
    description: 'Maison historique du 19e siècle',
  },
];

const familyActivities = [
  {
    title: 'Centre Premier Tech',
    description: "Centre sportif avec piscine et jeux d'eau (tous âges)",
    price: 'Entrée: 8$/enfant',
  },
  {
    title: 'Parc des Chutes',
    description: 'Sentiers faciles et aires de pique-nique (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Mini-Croisière',
    description: 'Excursion adaptée aux familles (5+ ans)',
    price: '45$/enfant',
  },
];

const teenActivities = [
  {
    title: 'Vélo sur la Route Verte',
    description: 'Piste cyclable panoramique (12+ ans)',
    price: 'Location vélo: 35$/jour',
    duration: 'À votre rythme',
  },
  {
    title: 'Kayak de Mer',
    description: 'Excursion guidée sur le fleuve (12+ ans)',
    price: '65$/personne',
    duration: '3 heures',
  },
  {
    title: 'Escalade Intérieure',
    description: "Centre d'escalade moderne (12+ ans)",
    price: '25$/personne',
    duration: '2-3 heures',
  },
];

export default function BlogArticleRiviereduLoup() {
  return (
    <article id="blog_article_riviere_du_loup" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Rivière-du-Loup - Porte d'entrée du Bas-Saint-Laurent</H1>
        <p className="text-xl text-gray-600">
          Découvrez cette ville historique où le fleuve Saint-Laurent rencontre la nature sauvage
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Située stratégiquement sur la rive sud du Saint-Laurent, Rivière-du-Loup est une ville
          dynamique qui combine patrimoine historique, attractions naturelles et activités
          maritimes. Point de départ idéal pour l'observation des baleines et porte d'entrée vers
          les Maritimes, elle offre une expérience authentique du Bas-Saint-Laurent.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/chute-riviere-du-loup.avif"
            alt="Rivière-du-Loup"
            width={1200}
            height={500}
            className="w-full rounded-lg object-cover shadow-lg"
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Rivière-du-Loup ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Observation des Baleines</H3>
            <p className="text-gray-600">
              L'un des meilleurs endroits au Québec pour observer les baleines dans leur habitat
              naturel.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Patrimoine Historique</H3>
            <p className="text-gray-600">
              Architecture victorienne et sites historiques bien préservés.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Nature Accessible</H3>
            <p className="text-gray-600">
              Parcs, sentiers et activités de plein air à proximité du centre-ville.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          Activités et Attractions
        </H2>
        <div className="space-y-8">
          {activities.map((activity) => (
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
                4h30 en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                2h en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus Orléans Express quotidien
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Centre-ville accessible à pied
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Taxi pour les excursions
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
              De juin à septembre pour les croisières aux baleines et activités extérieures.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 129-169$/nuit Activités: 25-79$/jour Repas: 15-50$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Réservation conseillée pour les croisières en haute saison. Prévoir des vêtements
              chauds même l'été.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">
          Prêt à Découvrir Rivière-du-Loup ?
        </H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et profitez de cette destination unique
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/riviere-du-loup.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.croisieresaml.com/"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Réserver une Croisière
          </a>
        </div>
      </section>
    </article>
  );
}
