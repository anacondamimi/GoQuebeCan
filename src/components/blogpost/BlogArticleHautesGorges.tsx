import Image from 'next/image';
import React from 'react';

import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_HAUTES_GORGES } from '@/data/hotels/byArticle/hautes-gorges';
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Compass } from 'lucide-react';
import { bookingAwin } from '@/lib/awin';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

export const metadata = {
  slug: 'hautes-gorges',
  ville: 'Hautes Gorges',
  resume: 'Découverte de Hautes Gorges et de ses attraits touristiques.',
  activites: [
    'Croisière sur la Rivière Malbaie',
    'Sentier des Érables',
    'Via Ferrata de la Charlevoix',
    'Mini-Croisière Découverte',
    'Rallye Nature',
    'Atelier Junior Ranger',
    'Initiation à l',
    'Location de Kayak',
    'Randonnée L',
  ],
  hebergements: ['Auberge des Hautes-Gorges', 'Fairmont Le Manoir Richelieu', 'Auberge La Marmite'],
  publics: ['familles', 'ados', 'aventuriers'],
};

// ✅ Imports déplacés automatiquement

const hotels = pickHotels(HOTEL_IDS_HAUTES_GORGES);

const camping = [
  {
    name: 'Camping des Érables',
    type: 'Camping aménagé',
    description: 'Sites avec services complets',
    price: 'À partir de 35$/nuit',
    facilities: ['Douches', 'Électricité', 'Bloc sanitaire'],
  },
  {
    name: 'Camping de la Rivière',
    type: 'Camping rustique',
    description: 'Sites en bordure de rivière',
    price: 'À partir de 25$/nuit',
    facilities: ['Tables de pique-nique', 'Toilettes sèches'],
  },
];

const restaurants = [
  {
    name: 'Restaurant du Parc',
    type: 'Cuisine locale',
    speciality: 'Produits du terroir de Charlevoix',
    price: '$$$',
    mustTry: 'Tourtière de Charlevoix',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Café de la Rivière',
    type: 'Café-Restaurant',
    speciality: 'Sandwichs et soupes maison',
    price: '$$',
    mustTry: 'Sandwich au saumon fumé local',
    schedule: "Toute l'année",
  },
  {
    name: 'Casse-Croûte des Randonneurs',
    type: 'Restauration rapide',
    speciality: 'Menus pour randonneurs',
    price: '$',
    mustTry: 'Poutine du randonneur',
    schedule: 'Mai à Octobre',
  },
];

const activities = [
  {
    name: 'Croisière sur la Rivière Malbaie',
    type: 'Navigation',
    duration: '1h30-3h30',
    price: 'À partir de 49$/adulte',
    description: "Découverte des plus hautes parois à l'est des Rocheuses",
  },
  {
    name: 'Sentier des Érables',
    type: 'Randonnée',
    duration: '3-4 heures',
    difficulty: 'Intermédiaire',
    description: 'Vue panoramique sur la vallée',
  },
  {
    name: 'Via Ferrata de la Charlevoix',
    type: 'Aventure',
    duration: '2-3 heures',
    price: '89$/personne',
    description: 'Parcours sécurisé sur les parois',
  },
];

const familyActivities = [
  {
    title: 'Mini-Croisière Découverte',
    description: 'Croisière adaptée aux familles (1h, tous âges)',
    price: '29$/enfant, 39$/adulte',
  },
  {
    title: 'Rallye Nature',
    description: "Parcours d'observation de la faune (5-12 ans)",
    price: "Gratuit avec l'entrée",
  },
  {
    title: 'Atelier Junior Ranger',
    description: 'Programme éducatif sur la nature (7-12 ans)',
    price: '15$/enfant',
  },
];

const teenActivities = [
  {
    title: "Initiation à l'Escalade",
    description: "Cours d'escalade sur paroi naturelle (12+ ans)",
    price: '75$/personne',
    duration: '3 heures',
  },
  {
    title: 'Location de Kayak',
    description: 'Exploration de la rivière en kayak (12+ ans)',
    price: '45$/demi-journée',
    duration: '4 heures',
  },
  {
    title: "Randonnée L'Acropole",
    description: 'Randonnée sportive avec guide (14+ ans)',
    price: '55$/personne',
    duration: '6 heures',
  },
];

export function BlogArticleHautesGorges() {
  return (
    <DestinationArticleTemplate
      slug="hautes-gorges"
      title="Parc national des Hautes-Gorges-de-la-Rivière-Malbaie"
    >
      <article id="blog_article_hautes_gorges" className="mx-auto max-w-4xl bg-white px-4 py-12">
        <header className="mb-12 text-center">
          <p className="text-xl text-gray-600">
            Découvrez l'un des plus beaux parcs du Québec, où fjord, montagnes et rivière créent un
            spectacle naturel unique
          </p>
        </header>

        <section className="prose mb-12 lg:prose-xl">
          <p>
            Le parc national des Hautes-Gorges-de-la-Rivière-Malbaie abrite les parois les plus
            hautes à l'est des Rocheuses. Ce joyau naturel de Charlevoix offre des paysages à couper
            le souffle et des expériences uniques en toute saison.
          </p>
          <div className="my-8">
            <Image
              src="/images/destinations/hautes-gorges.avif"
              alt="Hautes-Gorges"
              className="h-96 w-full rounded-lg object-cover shadow-lg"
              width={800}
              height={600}
            />
          </div>
        </section>

        <section className="mb-16">
          <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Star className="size-8 text-indigo-600" />
            Pourquoi Visiter les Hautes-Gorges ?
          </H2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Paysages Spectaculaires</H3>
              <p className="text-gray-600">
                Parois vertigineuses de 800 mètres et vues panoramiques exceptionnelles.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Activités Nautiques</H3>
              <p className="text-gray-600">
                Croisières, kayak et découverte de la rivière Malbaie.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Aventure Quatre Saisons</H3>
              <p className="text-gray-600">
                Randonnée, escalade, ski de fond et raquette selon la saison.
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
            <Compass className="size-8 text-indigo-600" />
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
          {/* MIGRATED_HOTELS_GRID */}
          <HotelGrid items={hotels} />
        </section>

        <section className="mb-16">
          <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Compass className="size-8 text-indigo-600" />
            Camping
          </H2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
            <Utensils className="size-8 text-indigo-600" />
            Où Manger ?
          </H2>
          <RestaurantPremiumGrid items={restaurants} />
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
                  4h en voiture depuis Québec
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Bus interrégional jusqu'à La Malbaie
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
                Entrée au parc: 9$/jour Camping: 25-35$/nuit Activités: 40-90$/jour
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <Shield className="size-5 text-indigo-600" />À Noter
              </H3>
              <p className="text-gray-600">
                Réservation obligatoire pour le camping et les activités guidées. Prévoir des
                vêtements chauds même l'été.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-8 text-center">
          <H2 className="mb-4 text-2xl font-bold text-gray-900">
            Prêt à Explorer les Hautes-Gorges ?
          </H2>
          <p className="mb-6 text-gray-600">
            Réservez votre séjour maintenant et profitez de la nature préservée
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.sepaq.com/pq/hgo/"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
            >
              Réserver votre visite
            </a>
            <a
              href={bookingAwin(
                'https://www.awin1.com/cread.php?awinmid=6776&awinaffid=1950847&ued=https%3A%2F%2Fwww.booking.com%2Fhotel%2Fca%2Fauberge-la-chatelaine.fr.html',
              )}
              className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
            >
              Trouver un Hébergement
            </a>
          </div>
        </section>
      </article>
    </DestinationArticleTemplate>
  );
}

export default BlogArticleHautesGorges;
