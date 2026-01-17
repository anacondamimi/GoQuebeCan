import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'massif',
  ville: 'Massif',
  resume: 'Découverte de Massif et de ses attraits touristiques.',
  activites: [
    'École de Ski Junior',
    'Parc d',
    'Chasse au Trésor',
    'Snowpark',
    'Camp Ados Freeride',
    'Descente en Fat Bike',
  ],
  hebergements: ['Hôtel Le Massif', 'Refuge Le Massif', 'Chalets du Massif'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Snowflake } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Au Grand Merisier',
    category: 'Chalet alpin',
    description:
      'Chalet 4 chambres avec vue, 3 salles de bain, grande cuisine et espace familial chaleureux.',
    price: 'À partir de 465$/nuit',
    link: 'https://www.booking.com/hotel/ca/au-grand-merisier.html', // ou le lien exact selon URL finale
    image: '/images/destinations/hotels/chalet-alpin.avif',
  },
  {
    name: 'Cottage Québec - Olivine',
    category: 'Chalet nature',
    description:
      'Chalet tout équipé avec 3 chambres, cuisine, terrasse et spa, parfait pour familles ou amis.',
    price: 'À partir de 227$/nuit',
    link: 'https://www.booking.com/hotel/ca/cottage-quebec-olivine.fr.html',
    image: '/images/destinations/hotels/cottage-olivine.avif',
  },
  {
    name: 'Cottage Québec - La Zéolite',
    category: 'Appartement spacieux',
    description:
      'Appartement 4 chambres avec grande cuisine et vue panoramique, parfait pour groupes ou familles.',
    price: 'À partir de 313$/nuit',
    link: 'https://www.booking.com/hotel/ca/cottage-quebec-la-zeolite.fr.html',
    image: '/images/destinations/hotels/cottage-zeolite.avif',
  },
];

const restaurants = [
  {
    name: 'Le Bistro Le Charlevoix',
    type: 'Gastronomique',
    speciality: 'Cuisine régionale raffinée',
    price: '$$$$',
    mustTry: 'Tartare de cerf et fromages locaux',
    schedule: "Ouvert toute l'année",
  },
  {
    name: 'Le Camp de Base',
    type: 'Bistro-Bar',
    speciality: 'Cuisine réconfortante',
    price: '$$$',
    mustTry: 'Poutine du bûcheron',
    schedule: 'Saison de ski',
  },
  {
    name: 'Le Café du Sommet',
    type: 'Café-Restaurant',
    speciality: 'Sandwichs et soupes maison',
    price: '$$',
    mustTry: "Grilled fromage au fromage d'ici",
    schedule: "Toute l'année",
  },
];

const winterActivities = [
  {
    name: 'Ski Alpin',
    type: "Sport d'hiver",
    duration: 'À la journée',
    price: 'À partir de 89$/jour',
    description: '52 pistes avec vue sur le Saint-Laurent',
  },
  {
    name: 'Ski de Randonnée',
    type: "Sport d'hiver",
    duration: '2-4 heures',
    difficulty: 'Intermédiaire-Avancé',
    description: 'Sentiers balisés en forêt',
  },
  {
    name: 'Raquette',
    type: "Sport d'hiver",
    duration: '1-3 heures',
    price: '25$/personne',
    description: '12 km de sentiers panoramiques',
  },
];

const summerActivities = [
  {
    name: 'Vélo de Montagne',
    type: "Sport d'été",
    duration: 'À la journée',
    price: 'À partir de 45$/jour',
    description: '20 pistes de descente tous niveaux',
  },
  {
    name: 'Randonnée Pédestre',
    type: 'Nature',
    duration: '1-6 heures',
    difficulty: 'Tous niveaux',
    description: 'Plus de 30 km de sentiers',
  },
  {
    name: 'Via Ferrata',
    type: 'Aventure',
    duration: '3 heures',
    price: '89$/personne',
    description: 'Parcours sécurisé avec vue sur le fleuve',
  },
];

const familyActivities = [
  {
    title: 'École de Ski Junior',
    description: 'Cours adaptés aux enfants (4-12 ans)',
    price: '75$/demi-journée',
  },
  {
    title: "Parc d'Aventure",
    description: 'Parcours dans les arbres (7+ ans)',
    price: '39$/enfant',
  },
  {
    title: 'Chasse au Trésor',
    description: "Activité d'orientation en famille",
    price: 'Gratuit avec forfait',
  },
];

const teenActivities = [
  {
    title: 'Snowpark',
    description: 'Modules pour tous les niveaux (12+ ans)',
    price: 'Inclus dans forfait ski',
    duration: 'Accès journée',
  },
  {
    title: 'Camp Ados Freeride',
    description: 'Stage de perfectionnement ski/snow (13-17 ans)',
    price: '299$/3 jours',
    duration: '3 jours',
  },
  {
    title: 'Descente en Fat Bike',
    description: 'Vélo sur neige encadré (14+ ans)',
    price: '65$/personne',
    duration: '2 heures',
  },
];

export default function BlogArticleMassif() {
  return (
    <article id="blog_article_massif" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Le Massif de Charlevoix - Entre Montagne et Fleuve</H1>
        <p className="text-xl text-gray-600">
          Découvrez la plus haute station de ski à l'est des Rocheuses canadiennes, où les pistes
          plongent vers le Saint-Laurent
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Le Massif de Charlevoix offre une expérience unique où la montagne rencontre le fleuve.
          Avec le plus grand dénivelé à l'est des Rocheuses canadiennes (770 mètres), la station
          propose des panoramas à couper le souffle et des activités quatre saisons.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/le-massif.avif"
            alt="Le Massif en hiver"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Le Massif ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Vue Spectaculaire</H3>
            <p className="text-gray-600">
              Skier face au Saint-Laurent, une expérience unique en Amérique du Nord.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Terrain Varié</H3>
            <p className="text-gray-600">52 pistes pour tous les niveaux et un snowpark renommé.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Activités Quatre Saisons</H3>
            <p className="text-gray-600">
              Ski, vélo de montagne, randonnée et via ferrata selon la saison.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Snowflake className="size-8 text-indigo-600" />
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
                1h15 en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Train de Charlevoix depuis Québec
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Navette gratuite entre les secteurs
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de voiture recommandée
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Service de navette depuis Québec
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
              Décembre à avril pour le ski. Juin à octobre pour les activités estivales.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Forfait ski: 89-129$/jour Hébergement: 189-399$/nuit Repas: 30-75$/personne
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
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Le Massif ?</H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et profitez de la vue imprenable sur le Saint-Laurent
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.lemassif.com"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver vos Forfaits
          </a>
          <a
            href="https://www.booking.com/landmark/ca/le-massif-de-charlevoix.html"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Trouver un Hébergement
          </a>
        </div>
      </section>
    </article>
  );
}
