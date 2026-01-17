import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'grand-bend',
  ville: 'Grand Bend',
  resume: 'Découverte de Grand Bend et de ses attraits touristiques.',
  activites: [
    'Main Beach',
    'Pinery Provincial Park',
    'Grand Bend Marina',
    'Plage Familiale',
    'Grand Bend Splash Pad',
    'Mini-Golf Adventure',
    'École de Surf',
    'Location de Jet-Ski',
    'Parasailing',
  ],
  hebergements: ['Pine Dale Motor Inn', 'Oakwood Resort', 'Colonial Hotel'],
  publics: ['familles', 'ados'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Sun } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Colonial Hotel & Suites',
    category: 'Centre-ville & plage',
    description:
      'Hôtel simple et bien situé à Lambton Shores, pratique pour profiter des plages du lac Huron sans exploser le budget.',
    price: 'À partir de 149 $/nuit',
    link: 'https://www.expedia.ca/fr/Lambton-Shores-Hotels-Colonial-Hotel-Suites.h71648848.Description-Hotel?chkin=2026-04-14&chkout=2026-04-15&x_pwa=1&rfrr=HSR&pwa_ts=1763710918347&referrerUrl=aHR0cHM6Ly93d3cuZXhwZWRpYS5jYS9Ib3RlbC1TZWFyY2g%3D&useRewards=false&rm1=a2&regionId=11178&destination=Ontario%2C+Canada&destType=MARKET&latLong=43.653482%2C-79.383935&sort=REVIEW_RELEVANT&top_dp=149&top_cur=CAD&userIntent=&selectedRoomType=324828646&selectedRatePlan=395949071&searchId=fac64ac8-42a6-40ab-a46b-35d8d7e4d366',
    image: '/images/destinations/hotels/colonial-hotel-granbendavif.avif',
  },
  {
    name: 'Dreamz Inn',
    category: 'Moderne & familial',
    description:
      'Motel-inn moderne avec piscine et espace extérieur, idéal comme base pour explorer la côte du lac Huron en famille ou en couple.',
    price: 'À partir de 167 $/nuit',
    link: 'https://www.expedia.ca/fr/Central-Huron-Hotels-Dreamz-Inn.h8274788.Description-Hotel?chkin=2026-04-14&chkout=2026-04-15&x_pwa=1&rfrr=HSR&pwa_ts=1763710918267&referrerUrl=aHR0cHM6Ly93d3cuZXhwZWRpYS5jYS9Ib3RlbC1TZWFyY2g%3D&useRewards=false&rm1=a2&regionId=11178&destination=Ontario%2C+Canada&destType=MARKET&latLong=43.653482%2C-79.383935&sort=REVIEW_RELEVANT&top_dp=167&top_cur=CAD&userIntent=&selectedRoomType=200693312&selectedRatePlan=203441088&searchId=fac64ac8-42a6-40ab-a46b-35d8d7e4d366',
    image: '/images/destinations/hotels/central-huron-granbend.avif',
  },
  {
    name: 'Samuels Boutique Hotel',
    category: 'Boutique & charme',
    description:
      'Petit hôtel-boutique de caractère, avec vue sur la rivière et ambiance cosy, parfait pour une escapade plus chic au bord du lac Huron.',
    price: 'À partir de 215 $/nuit',
    link: 'https://www.expedia.ca/fr/Ashfield-Colborne-Wawanosh-Hotels-Samuels-Boutique-Hotel.h10218772.Description-Hotel?chkin=2026-04-14&chkout=2026-04-15&x_pwa=1&rfrr=HSR&pwa_ts=1763710918227&referrerUrl=aHR0cHM6Ly93d3cuZXhwZWRpYS5jYS9Ib3RlbC1TZWFyY2g%3D&useRewards=false&rm1=a2&regionId=11178&destination=Ontario%2C+Canada&destType=MARKET&latLong=43.653482%2C-79.383935&sort=REVIEW_RELEVANT&top_dp=215&top_cur=CAD&userIntent=&selectedRoomType=200932920&selectedRatePlan=274388838&searchId=fac64ac8-42a6-40ab-a46b-35d8d7e4d366',
    image: '/images/destinations/hotels/samuel-hotel-granbend.avif',
  },
];

const restaurants = [
  {
    name: 'F.I.N.E. A Restaurant',
    type: 'Gastronomique',
    speciality: 'Cuisine raffinée et fruits de mer',
    price: '$$$$',
    mustTry: 'Poisson frais du lac Huron',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Smackwater Jacks',
    type: 'Pub & Grill',
    speciality: 'Burgers et fruits de mer',
    price: '$$$',
    mustTry: 'Fish tacos',
    schedule: "Toute l'année",
  },
  {
    name: 'Highway Girl',
    type: 'Café-Restaurant',
    speciality: 'Brunch et cuisine locale',
    price: '$$',
    mustTry: 'Brunch du week-end',
    schedule: 'Mai à Septembre',
  },
];

const activities = [
  {
    name: 'Main Beach',
    type: 'Plage',
    duration: 'À la journée',
    price: 'Gratuit',
    description: 'Plage de sable fin avec couchers de soleil spectaculaires',
  },
  {
    name: 'Pinery Provincial Park',
    type: 'Nature',
    duration: '2-4 heures',
    price: '15$/véhicule',
    description: 'Dunes de sable et forêt de chênes rares',
  },
  {
    name: 'Grand Bend Marina',
    type: 'Nautique',
    duration: 'Variable',
    price: 'Location à partir de 35$/heure',
    description: 'Location de bateaux et sports nautiques',
  },
];

const familyActivities = [
  {
    title: 'Plage Familiale',
    description: 'Zone surveillée avec eaux peu profondes (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Grand Bend Splash Pad',
    description: "Jeux d'eau pour enfants (2-12 ans)",
    price: 'Gratuit',
  },
  {
    title: 'Mini-Golf Adventure',
    description: 'Parcours thématique (tous âges)',
    price: '12$/personne',
  },
];

const teenActivities = [
  {
    title: 'École de Surf',
    description: 'Cours de surf sur le lac (12+ ans)',
    price: '65$/2 heures',
    duration: '2 heures',
  },
  {
    title: 'Location de Jet-Ski',
    description: 'Excursion guidée (16+ ans)',
    price: '85$/heure',
    duration: '1-2 heures',
  },
  {
    title: 'Parasailing',
    description: 'Vol panoramique (12+ ans)',
    price: '75$/personne',
    duration: '30 minutes',
  },
];

export function BlogArticleGrandBend() {
  return (
    <article id="blog_article_grand_bend" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Grand Bend - Paradis des Couchers de Soleil sur le Lac Huron</H1>
        <p className="text-xl text-gray-600">
          Découvrez cette station balnéaire animée de l'Ontario, réputée pour ses plages de sable
          fin et ses couchers de soleil spectaculaires
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Grand Bend, joyau du lac Huron, est une destination estivale prisée qui combine plages
          magnifiques, sports nautiques et vie nocturne animée. Réputée pour avoir les plus beaux
          couchers de soleil de l'Ontario, cette ville balnéaire offre une expérience unique entre
          détente et divertissement.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/grand-bend.avif"
            alt="Grand Bend"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Grand Bend ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Couchers de Soleil</H3>
            <p className="text-gray-600">Les plus spectaculaires de l'Ontario sur le lac Huron.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Plages de Rêve</H3>
            <p className="text-gray-600">Sable fin et eaux cristallines du lac Huron.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Ambiance Festive</H3>
            <p className="text-gray-600">Vie nocturne animée et festivals tout l'été.</p>
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
          <Sun className="size-8 text-indigo-600" />
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
                2h30 en voiture depuis Toronto
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                7h en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus interurbain disponible en été
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
                Service de navette en haute saison
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
              De juin à septembre pour la baignade. Juillet-août pour l'ambiance estivale.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 149-209$/nuit Activités: 15-85$/jour Repas: 20-60$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Réservation essentielle en haute saison. Stationnement payant près de la plage.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir Grand Bend ?</H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et profitez des plus beaux couchers de soleil de
          l'Ontario
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/city/ca/grand-bend.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.grandbend.com"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}

export default BlogArticleGrandBend;
