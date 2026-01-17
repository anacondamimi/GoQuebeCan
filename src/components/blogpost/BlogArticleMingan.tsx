import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'mingan',
  ville: 'Mingan',
  resume: 'Découverte de Mingan et de ses attraits touristiques.',
  activites: [
    'Excursion aux Monolithes',
    'Randonnée Île Niapiskau',
    'Observation des Oiseaux',
    'Découverte des Fossiles',
    'Mini-Croisière',
    'Centre d',
    'Kayak de Mer',
    'Randonnée Photo',
    'Zodiac Aventure',
  ],
  hebergements: ['Auberge de l', 'Gîte Chez Marie', 'Chalets des Îles'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Chalets Didoche',
    category: 'Chalet en bord de mer',
    description: 'Chalets confortables au cœur de la nature. Note 9/10.',
    price: 'Tarifs variables selon la saison',
    link: 'https://www.booking.com/hotel/ca/chalets-didoche-havre-saint-pierre.fr.html',
    image: '/images/destinations/hotels/chalets-didoche.avif',
  },
  {
    name: 'L’Escale Lam-Air',
    category: 'Vue mer & plage',
    description: 'Hébergement chaleureux avec vue sur l’eau. Note 9,5/10.',
    price: 'Tarif variable selon la saison',
    link: 'https://www.booking.com/hotel/ca/escale-lam-air.fr.html',
    image: '/images/destinations/hotels/escale-lam-air.avif',
  },
  {
    name: 'Hôtels Gouverneur Sept-Îles',
    category: 'Familial',
    description: 'Chambre double avec 2 lits, séjour gratuit pour les enfants. Note 8/10.',
    price: 'À partir de 194$/nuit',
    link: 'https://www.booking.com/hotel/ca/gouverneur-sept-iles.fr.html',
    image: '/images/destinations/hotels/gouverneur.avif',
  },
];

const restaurants = [
  {
    name: 'La Table des Îles',
    type: 'Fruits de mer',
    speciality: 'Fruits de mer et poissons locaux',
    price: '$$$',
    mustTry: 'Homard de la Côte-Nord',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Café de la Mer',
    type: 'Café-Restaurant',
    speciality: 'Cuisine bistro et produits locaux',
    price: '$$',
    mustTry: 'Soupe aux fruits de mer',
    schedule: "Toute l'année",
  },
  {
    name: 'Cantine du Port',
    type: 'Cantine',
    speciality: 'Fast-food maritime',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Juin à Septembre',
  },
];

const activities = [
  {
    name: 'Excursion aux Monolithes',
    type: 'Nature',
    duration: '4-6 heures',
    price: '89$/personne',
    description: 'Découverte en bateau des îles et monolithes',
  },
  {
    name: 'Randonnée Île Niapiskau',
    type: 'Randonnée',
    duration: '2-3 heures',
    price: 'Inclus avec accès parc',
    description: "Sentier d'interprétation des monolithes",
  },
  {
    name: 'Observation des Oiseaux',
    type: 'Nature',
    duration: '2-3 heures',
    price: '45$/personne',
    description: 'Plus de 50 000 oiseaux marins nicheurs',
  },
];

const familyActivities = [
  {
    title: 'Découverte des Fossiles',
    description: "Atelier d'interprétation (7-12 ans)",
    price: '15$/enfant',
  },
  {
    title: 'Mini-Croisière',
    description: 'Tour en bateau adapté aux familles (tous âges)',
    price: '45$/enfant',
  },
  {
    title: "Centre d'Interprétation",
    description: 'Expositions interactives (tous âges)',
    price: 'Gratuit avec accès parc',
  },
];

const teenActivities = [
  {
    title: 'Kayak de Mer',
    description: 'Excursion guidée entre les îles (14+ ans)',
    price: '85$/personne',
    duration: '4 heures',
  },
  {
    title: 'Randonnée Photo',
    description: 'Safari photo des monolithes (12+ ans)',
    price: '55$/personne',
    duration: '3 heures',
  },
  {
    title: 'Zodiac Aventure',
    description: 'Tour rapide en zodiac (12+ ans)',
    price: '75$/personne',
    duration: '2 heures',
  },
];

export function BlogArticleMingan() {
  return (
    <article id="blog_article_mingan" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Mingan - L'Archipel aux Monolithes Légendaires</H1>
        <p className="text-xl text-gray-600">
          Découvrez un paysage unique au monde avec ses sculptures naturelles et sa biodiversité
          exceptionnelle
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          L'archipel de Mingan, joyau naturel de la Côte-Nord, offre un spectacle géologique unique
          avec ses monolithes sculptés par la mer et le temps. Ce parc national abrite également une
          faune marine exceptionnelle et des milliers d'oiseaux marins, faisant de chaque visite une
          expérience inoubliable.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/mingan.avif"
            alt="Monolithes de Mingan"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Mingan ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Monolithes Uniques</H3>
            <p className="text-gray-600">
              Formations rocheuses spectaculaires sculptées par l'érosion marine.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Biodiversité Marine</H3>
            <p className="text-gray-600">Sanctuaire d'oiseaux marins et habitat de phoques.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Aventure Maritime</H3>
            <p className="text-gray-600">Kayak, croisières et exploration des îles.</p>
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
                Vol vers Sept-Îles puis location de voiture
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                10h en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus interrégional jusqu'à Havre-Saint-Pierre
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Navettes maritimes vers les îles
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de kayaks disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Voiture nécessaire pour accéder au parc
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
              De juin à septembre pour le climat doux. Juillet-août pour les meilleures conditions
              maritimes.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 129-169$/nuit Activités: 45-89$/jour Repas: 20-50$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Réservation essentielle en haute saison. Prévoir des vêtements chauds même l'été.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Mingan ?</H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et explorez ce joyau naturel unique au monde
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/region/ca/mingan.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.pc.gc.ca/fr/pn-np/qc/mingan"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer le Parc
          </a>
        </div>
      </section>
    </article>
  );
}

export default BlogArticleMingan;
