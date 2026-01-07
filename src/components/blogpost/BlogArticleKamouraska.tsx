import Image from 'next/image';
import React from 'react';
import { Sunset } from 'lucide-react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'kamouraska',
  ville: 'Kamouraska',
  resume: 'Découverte de Kamouraska et de ses attraits touristiques.',
  activites: [
    'Coucher de Soleil sur le Fleuve',
    'Musée régional de Kamouraska',
    'Sentier du Cabouron',
    'Plage de Kamouraska',
    'Centre d',
    'Ferme Gijamika',
    'Location de Kayak',
    'Vélo sur la Route Verte',
    'Atelier Photo',
  ],
  hebergements: ['Auberge des Îles', 'Motel des Mariniers', 'Gîte des Coquillages'],
  publics: ['familles', 'ados', 'amateurs de culture', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Auberge Akamaraska',
    category: 'Simplicité & authenticité',
    description: 'Chambre avec lit Queen et balcon, à 100 m du centre du village. Note 7,8/10.',
    price: 'Tarif selon la saison',
    link: 'https://www.booking.com/hotel/ca/akamaraska.fr.html',
    image: '/images/destinations/hotels/akamaraska.avif',
  },
  {
    name: 'Motel des Mariniers',
    category: 'Charme',
    description: 'Au cœur du village historique',
    price: 'À partir de 129$/nuit',
    link: 'https://www.booking.com/hotel/ca/motel-des-mariniers.html',
    image: '/images/destinations/hotels/mariniers.avif',
  },
  {
    name: 'Auberge Comme au premier jour',
    category: 'Charme & piscine',
    description: 'Chambre double avec vue sur la piscine, à 18 km de Kamouraska. Note 8,8/10.',
    price: 'Tarif selon la saison',
    link: 'https://www.booking.com/hotel/ca/auberge-comme-au-premier-jour.fr.html',
    image: '/images/destinations/hotels/auberge saint pacome.avif',
  },
];

const restaurants = [
  {
    name: 'Bistro Côté Est',
    type: 'Gastronomique',
    speciality: 'Cuisine locale et produits du terroir',
    price: '$$$$',
    mustTry: 'Tartare de poisson frais et agneau local',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Café du Clocher',
    type: 'Café-Bistro',
    speciality: 'Brunch et pâtisseries maison',
    price: '$$',
    mustTry: 'Brunch du dimanche',
    schedule: "Toute l'année",
  },
  {
    name: 'Poissonnerie Lauzier',
    type: 'Fruits de mer',
    speciality: 'Poissons et fruits de mer frais',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Mars à Décembre',
  },
];

const activities = [
  {
    name: 'Coucher de Soleil sur le Fleuve',
    type: 'Nature',
    duration: '1-2 heures',
    price: 'Gratuit',
    description: 'Les plus beaux couchers de soleil du Québec',
  },
  {
    name: 'Musée régional de Kamouraska',
    type: 'Culture',
    duration: '1-2 heures',
    price: '10$/personne',
    description: 'Histoire et patrimoine local',
  },
  {
    name: 'Sentier du Cabouron',
    type: 'Randonnée',
    duration: '2-3 heures',
    price: 'Gratuit',
    description: 'Vue panoramique sur le fleuve et les îles',
  },
];

const familyActivities = [
  {
    title: 'Plage de Kamouraska',
    description: 'Baignade et jeux de plage (tous âges)',
    price: 'Gratuit',
  },
  {
    title: "Centre d'Art de Kamouraska",
    description: 'Ateliers créatifs pour enfants (5-12 ans)',
    price: '15$/enfant',
  },
  {
    title: 'Ferme Gijamika',
    description: 'Visite de la ferme et animaux (tous âges)',
    price: '12$/personne',
  },
];

const teenActivities = [
  {
    title: 'Location de Kayak',
    description: 'Exploration du fleuve (12+ ans)',
    price: '45$/demi-journée',
    duration: '3-4 heures',
  },
  {
    title: 'Vélo sur la Route Verte',
    description: 'Parcours côtier (12+ ans)',
    price: '35$/jour',
    duration: 'À votre rythme',
  },
  {
    title: 'Atelier Photo',
    description: 'Cours photo coucher de soleil (13+ ans)',
    price: '55$/personne',
    duration: '2 heures',
  },
];

export function BlogArticleKamouraska() {
  return (
    <article id="blog_article_kamouraska" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Kamouraska - Le Village aux Plus Beaux Couchers de Soleil</H1>
        <p className="text-xl text-gray-600">
          Découvrez ce joyau du Bas-Saint-Laurent, entre patrimoine historique et paysages
          spectaculaires
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Kamouraska, pittoresque village du Bas-Saint-Laurent, est réputé pour avoir les plus beaux
          couchers de soleil au Québec. Avec son riche patrimoine architectural, sa gastronomie
          locale et ses paysages à couper le souffle, il offre une expérience authentique du Québec
          maritime.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/kamouraska.avif"
            alt="Kamouraska"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Kamouraska ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Couchers de Soleil</H3>
            <p className="text-gray-600">
              Les plus spectaculaires du Québec, avec le fleuve et les îles en toile de fond.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Village Historique</H3>
            <p className="text-gray-600">
              Architecture ancestrale et patrimoine culturel bien préservé.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Gastronomie Locale</H3>
            <p className="text-gray-600">
              Produits du terroir, poissons frais et spécialités régionales.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Sunset className="size-8 text-indigo-600" />
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
                5h en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                2h30 en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus Orléans Express (arrêt à Saint-Pascal)
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
                Voiture recommandée pour explorer les environs
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
              De juin à septembre pour le temps doux. Juillet-août pour les plus beaux couchers de
              soleil.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 119-159$/nuit Activités: 15-55$/jour Repas: 15-45$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Réservation conseillée en haute saison. Prévoir un coupe-vent pour les soirées
              fraîches.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Kamouraska ?</H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et profitez des plus beaux couchers de soleil du Québec
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/kamouraska.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.tourismekamouraska.com"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}
export default BlogArticleKamouraska;
