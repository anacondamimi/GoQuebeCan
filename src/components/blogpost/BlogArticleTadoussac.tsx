import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'tadoussac',
  ville: 'Tadoussac',
  resume: 'Découverte de Tadoussac et de ses attraits touristiques.',
  activites: [
    'Croisière aux Baleines',
    'Sentier de la Pointe-de-l',
    'Centre d',
    'Mini-Croisière',
    'Plage de Tadoussac',
    'Atelier Découverte des Baleines',
    'Kayak de Mer',
    'Randonnée du Fjord',
    'Zodiac Aventure',
  ],
  hebergements: ['Hôtel Tadoussac', 'Auberge La Galouïne', 'Motel Le Beluga'],
  publics: ['familles', 'ados', 'amateurs de culture', 'aventuriers'],
};
import {
  Hotel,
  Utensils,
  Bus,
  Calendar,
  DollarSign,
  Shield,
  Star,
  Scale as Whale,
} from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Hôtel Tadoussac',
    category: 'En bord de plage – Éco-certifié',
    description:
      'Un hôtel emblématique face au fleuve Saint-Laurent avec une note exceptionnelle de 9.7/10. Certificat de durabilité.',
    price: 'Tarifs variables selon la saison',
    link: 'https://www.booking.com/hotel/ca/tadoussac.fr.html',
    image: '/images/destinations/hotels/hotel tadoussac.avif',
  },
  {
    name: 'Hôtel Motel Le Béluga',
    category: 'Emplacement central',
    description:
      "À seulement 100 mètres du centre de Tadoussac. Idéal pour rejoindre les départs d'excursion aux baleines à pied.",
    price: 'À partir de ~135$/nuit (selon la saison)',
    link: 'https://www.booking.com/hotel/ca/le-beluga.fr.html',
    image: '/images/destinations/hotels/motel-beluga.avif',
  },
  {
    name: 'Auberge du Café chez Sam',
    category: 'Authentique & convivial',
    description:
      'Située à Baie-Sainte-Catherine, à seulement 4 km de Tadoussac. Note de 8,3/10 par plus de 500 voyageurs.',
    price: 'Tarif variable selon la saison',
    link: 'https://www.booking.com/hotel/ca/auberge-du-cafe-chez-sam.fr.html',
    image: '/images/destinations/hotels/auberge chez sam.avif',
  },
];

const restaurants = [
  {
    name: 'Restaurant Le Bateau',
    type: 'Gastronomique',
    speciality: 'Fruits de mer et poissons locaux',
    price: '$$$$',
    mustTry: 'Tartare de saumon et pétoncles poêlés',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Café du Fjord',
    type: 'Bistro',
    speciality: 'Cuisine québécoise contemporaine',
    price: '$$$',
    mustTry: 'Soupe aux fruits de mer',
    schedule: "Toute l'année",
  },
  {
    name: 'La Cantine du Quai',
    type: 'Cantine',
    speciality: 'Fast-food maritime',
    price: '$$',
    mustTry: 'Fish & Chips et guedille au homard',
    schedule: 'Mai à Septembre',
  },
];

const activities = [
  {
    name: 'Croisière aux Baleines',
    type: 'Nature',
    duration: '3 heures',
    price: '79$/personne',
    description: 'Observation des baleines et bélugas',
  },
  {
    name: "Sentier de la Pointe-de-l'Islet",
    type: 'Randonnée',
    duration: '1-2 heures',
    price: 'Gratuit',
    description: 'Vue panoramique sur le fjord',
  },
  {
    name: "Centre d'Interprétation des Mammifères Marins",
    type: 'Culture',
    duration: '2-3 heures',
    price: '25$/personne',
    description: 'Exposition interactive sur les baleines',
  },
];

const familyActivities = [
  {
    title: 'Mini-Croisière',
    description: 'Croisière adaptée aux familles (tous âges)',
    price: '45$/enfant',
  },
  {
    title: 'Plage de Tadoussac',
    description: 'Baignade et jeux de plage (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Atelier Découverte des Baleines',
    description: 'Animation interactive (5-12 ans)',
    price: '15$/enfant',
  },
];

const teenActivities = [
  {
    title: 'Kayak de Mer',
    description: 'Excursion guidée sur le fjord (12+ ans)',
    price: '75$/personne',
    duration: '3 heures',
  },
  {
    title: 'Randonnée du Fjord',
    description: 'Sentier panoramique (12+ ans)',
    price: 'Gratuit',
    duration: '4-5 heures',
  },
  {
    title: 'Zodiac Aventure',
    description: 'Observation des baleines en zodiac (12+ ans)',
    price: '89$/personne',
    duration: '2.5 heures',
  },
];

export default function BlogArticleTadoussac() {
  return (
    <article id="blog_article_tadoussac" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Tadoussac - Le Royaume des Baleines</H1>
        <p className="text-xl text-gray-600">
          Découvrez ce village historique où le fjord du Saguenay rencontre le Saint-Laurent, créant
          un habitat unique pour les baleines
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Tadoussac, premier poste de traite de fourrures en Amérique du Nord, est aujourd'hui
          mondialement reconnu pour l'observation des baleines. Situé à la confluence du fjord du
          Saguenay et du Saint-Laurent, ce village pittoresque offre un mélange unique d'histoire,
          de nature spectaculaire et d'aventures maritimes.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/tadoussac.avif"
            alt="Tadoussac"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Tadoussac ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Observation des Baleines</H3>
            <p className="text-gray-600">
              L'un des meilleurs endroits au monde pour observer les baleines et bélugas.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Site Historique</H3>
            <p className="text-gray-600">
              Plus ancien poste de traite en Amérique du Nord, riche en histoire.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Paysages Uniques</H3>
            <p className="text-gray-600">
              Rencontre spectaculaire du fjord du Saguenay et du Saint-Laurent.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Whale className="size-8 text-indigo-600" />
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
                6h en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                3h30 en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus interrégional quotidien
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Village accessible à pied
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Traversier pour Baie-Sainte-Catherine
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
              De juin à octobre pour l'observation des baleines. Juillet-août pour le temps le plus
              doux.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 139-199$/nuit Activités: 25-89$/jour Repas: 20-60$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Réservation essentielle en haute saison. Prévoir des vêtements chauds pour les
              croisières.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Tadoussac ?</H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et partez à la rencontre des baleines
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/tadoussac.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.croisieres-aml.com"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Réserver une Croisière
          </a>
        </div>
      </section>
    </article>
  );
}
