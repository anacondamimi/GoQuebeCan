import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { ConclusionLinks } from '@/components/TravelContentKit';

export const metadata = {
  slug: 'forillon',
  ville: 'Forillon',
  resume: 'Découverte de Forillon et de ses attraits touristiques.',
  activites: [
    'Randonnée Les Graves',
    'Observation des Baleines',
    'Phare de Cap-des-Rosiers',
    'Plage de Cap-Bon-Ami',
    'Xplorateurs du Parc',
    'Initiation à la Pêche',
    'Découverte des Marées',
    'Randonnée Mont Saint-Alban',
    'Vélo de Montagne',
    'Kayak de Mer',
  ],
  hebergements: ['Hôtel Baker', 'Auberge Gaspé', 'Motel Adams'],
  publics: ['familles', 'ados', 'amateurs de culture', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Tent } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Griffon Aventure',
    category: 'Chalet nature',
    description: 'Chalet pour 5 pers. avec salon et vue sur la mer, idéal pour les aventuriers.',
    price: 'À partir de 946$ pour 4 nuits',
    link: 'https://www.booking.com/hotel/ca/griffon-aventure.html', // lien à valider
    image: '/images/destinations/hotels/auberge-griffon.avif',
  },
  {
    name: 'Motel du Haut Phare',
    category: 'Vue exceptionnelle',
    description: 'Chalet avec 2 lits superposés, proche du Cap-des-Rosiers et du phare.',
    price: 'À partir de 713$ pour 4 nuits',
    link: 'https://www.booking.com/hotel/ca/motel-du-haut-phare.html', // lien à valider
    image: '/images/destinations/hotels/motel-haut-phare.avif',
  },
  {
    name: 'Auberge La Petite École',
    category: 'Confort abordable',
    description: 'Auberge familiale bien notée à Gaspé, parfaite pour explorer Forillon.',
    price: 'Note : 8,7/10 sur 300+ avis',
    link: 'https://www.booking.com/hotel/ca/auberge-la-petite-ecole.html', // lien à valider
    image: '/images/destinations/hotels/auberge-petite-ecole.avif',
  },
];

const camping = [
  {
    name: 'Camping Des-Rosiers',
    type: 'Camping aménagé',
    description: 'Vue sur le phare de Cap-des-Rosiers',
    price: 'À partir de 30$/nuit',
    facilities: ['Douches', 'Électricité', 'Bloc sanitaire'],
  },
  {
    name: 'Camping Cap-Bon-Ami',
    type: 'Camping rustique',
    description: 'Au pied des falaises',
    price: 'À partir de 25$/nuit',
    facilities: ['Tables de pique-nique', 'Toilettes sèches'],
  },
  {
    name: 'Camping Petit-Gaspé',
    type: 'Camping en bord de mer',
    description: 'Accès direct à la plage',
    price: 'À partir de 28$/nuit',
    facilities: ['Douches', 'Cuisine commune', 'Bloc sanitaire'],
  },
];

const restaurants = [
  {
    name: 'Bistro Le Clapotis',
    type: 'Fruits de mer',
    speciality: 'Poissons frais et fruits de mer locaux',
    price: '$$$',
    mustTry: 'Morue fraîche du jour',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Café des Artistes',
    type: 'Café-Restaurant',
    speciality: 'Cuisine locale et sandwichs',
    price: '$$',
    mustTry: 'Sandwich au homard',
    schedule: "Toute l'année",
  },
  {
    name: 'La Cantina du Pêcheur',
    type: 'Cantine',
    speciality: 'Fish & Chips et fruits de mer',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Juin à Septembre',
  },
];

const activities = [
  {
    name: 'Randonnée Les Graves',
    type: 'Randonnée',
    duration: '4-5 heures',
    difficulty: 'Intermédiaire',
    description: 'Sentier côtier avec vues spectaculaires',
  },
  {
    name: 'Observation des Baleines',
    type: 'Nature',
    duration: '3 heures',
    price: '85$/personne',
    description: "Croisière d'observation des mammifères marins",
  },
  {
    name: 'Phare de Cap-des-Rosiers',
    type: 'Culture',
    duration: '1-2 heures',
    price: '12$/personne',
    description: 'Plus haut phare du Canada',
  },
  {
    name: 'Plage de Cap-Bon-Ami',
    type: 'Plage',
    duration: 'Libre',
    price: 'Gratuit',
    description: 'Baignade et détente au pied des falaises',
  },
];

const familyActivities = [
  {
    title: 'Xplorateurs du Parc',
    description: "Programme d'activités éducatives (6-12 ans)",
    price: "Gratuit avec l'entrée",
  },
  {
    title: 'Initiation à la Pêche',
    description: 'Atelier de pêche en famille (8+ ans)',
    price: '25$/personne',
  },
  {
    title: 'Découverte des Marées',
    description: 'Exploration des bassins à marée basse (tous âges)',
    price: "Gratuit avec l'entrée",
  },
];

const teenActivities = [
  {
    title: 'Randonnée Mont Saint-Alban',
    description: "Ascension jusqu'à la tour d'observation (13+ ans)",
    price: "Gratuit avec l'entrée",
    duration: '3-4 heures',
  },
  {
    title: 'Vélo de Montagne',
    description: 'Parcours techniques en forêt (14+ ans)',
    price: 'Location vélo: 35$/jour',
    duration: 'À votre rythme',
  },
  {
    title: 'Kayak de Mer',
    description: 'Excursion guidée le long des falaises (12+ ans)',
    price: '75$/personne',
    duration: '3 heures',
  },
];

export function BlogArticleForillon() {
  return (
    <article id="blog_article_forillon" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Parc national Forillon - Joyau naturel de la Gaspésie</H1>
        <p className="text-xl text-gray-600">
          Découvrez un territoire préservé où la mer, la montagne et la forêt se rencontrent
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Le parc national Forillon, situé à la pointe de la péninsule gaspésienne, offre un
          spectacle naturel unique où falaises vertigineuses, forêts denses et plages sauvages se
          côtoient dans une harmonie parfaite.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/forillon.avif"
            alt="Parc national Forillon"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Forillon ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Biodiversité Unique</H3>
            <p className="text-gray-600">
              Observation de baleines, phoques, ours noirs et plus de 225 espèces d'oiseaux.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Patrimoine Historique</H3>
            <p className="text-gray-600">
              Phare historique, sites archéologiques et maisons d'époque.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Activités Quatre Saisons</H3>
            <p className="text-gray-600">
              Randonnée, kayak, ski de fond et raquette selon la saison.
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
          <Tent className="size-8 text-indigo-600" />
          Camping
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {camping.map((site) => (
            <div key={site.name} className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-2 text-xl font-semibold text-gray-900">{site.name}</H3>
              <p className="mb-4 text-gray-600">{site.description}</p>
              <div className="space-y-2">
                <p className="font-medium text-indigo-600">{site.price}</p>
                <div className="flex flex-wrap gap-2">
                  {site.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-2 py-1 text-sm text-gray-600"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Hotel className="size-8 text-indigo-600" />
          Où Dormir à Proximité ?
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
                Avion vers Gaspé (1h30 depuis Québec)
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus Orléans Express (12h depuis Montréal)
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Voiture (9h depuis Montréal)
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Dans le Parc</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Navette gratuite en haute saison
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Voiture recommandée hors saison
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
              Juin à septembre pour les activités estivales. Décembre à mars pour les sports
              d'hiver.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Entrée au parc: 8$/jour Camping: 25-30$/nuit Activités: 50-100$/jour
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Réservation obligatoire pour le camping en haute saison. Prévoir des vêtements chauds
              même l'été.
            </p>
          </div>
        </div>
      </section>

      {/* Liens internes produits voyages */}
      <ConclusionLinks
        items={[
          { href: '/blog/voyage-camping', label: 'Guide camping 2025' },
          { href: '/blog/voyage-hotel', label: 'Indispensables hôtel 2025' },
          { href: '/blog/voyage-voiture', label: 'Voyage en voiture' },
        ]}
      />
    </article>
  );
}

export default BlogArticleForillon;
