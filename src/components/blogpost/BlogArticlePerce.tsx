import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { ConclusionLinks } from '@/components/TravelContentKit';

export const metadata = {
  slug: 'perce',
  ville: 'Perce',
  resume: 'Découverte de Perce et de ses attraits touristiques.',
  activites: [
    'Croisière aux Baleines',
    'Île Bonaventure',
    'Géoparc de Percé',
    'Rallye du Géoparc',
    'Mini-Croisière',
    'Plage de l',
    'Initiation au Kayak de Mer',
    'Atelier Photo Nature',
    'Randonnée Nocturne',
  ],
  hebergements: ['Riotel Percé', 'Hôtel La Normandie', 'Au Pic de l'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Fish } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Riotel Percé',
    category: 'Vue sur Mer',
    description: 'Vue imprenable sur le Rocher Percé',
    price: 'À partir de 199$/nuit',
    link: 'https://www.booking.com/hotel/ca/riotel-perce.fr.html?aid=304142&label=gen173rf-10CAsoJ0IMcmlvdGVsLXBlcmNlSDNYA2gniAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBogIObG9jYWxob3N0OjMwMDCoAgG4Au3FoMsGwAIB0gIkNDQyNjMyZGEtYTA3NC00NGVhLWFiYmEtODQ2Mjg3NzAzZDk02AIB4AIB&sid=9d202b892b581cafd0019c7f0748e2a5&checkin=2026-04-06&checkout=2026-04-10&dest_id=900040525&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&soh=1&sr_order=popularity&srepoch=1768432374&srpvid=2deea3377e57004d&type=total&ucfs=1&#no_availability_msg',
    image: '/images/destinations/hotels/riohotel-perce.avif',
  },
  {
    name: 'Hôtel La Normandie',
    category: 'Charme',
    description: 'Au cœur du village historique',
    price: 'À partir de 169$/nuit',
    link: 'https://www.booking.com/hotel/ca/la-normandie-perce.html',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
  },
  {
    name: "Au Pic de l'Aurore",
    category: 'Vue Panoramique',
    description: 'Surplombant la baie de Percé',
    price: 'À partir de 189$/nuit',
    link: 'https://www.booking.com/hotel/ca/au-pic-de-l-aurore.html',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80',
  },
];

const restaurants = [
  {
    name: 'La Maison du Pêcheur',
    type: 'Fruits de mer',
    speciality: 'Homard frais et poissons locaux',
    price: '$$$$',
    mustTry: 'Plateau de fruits de mer royal',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'Les Sacs à Vin',
    type: 'Bistro-Bar à vin',
    speciality: 'Cuisine du terroir et vins naturels',
    price: '$$$',
    mustTry: 'Tartare de thon aux agrumes',
    schedule: 'Juin à Septembre',
  },
  {
    name: 'Cantine Le Petit Barachois',
    type: 'Cantine de Plage',
    speciality: 'Fruits de mer décontractés',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Mai à Septembre',
  },
];

const activities = [
  {
    name: 'Croisière aux Baleines',
    type: 'Nature',
    duration: '2.5-3 heures',
    price: '79$/personne',
    link: 'https://www.croisieresgaspe.ca',
    description: 'Observation des baleines et du Rocher Percé',
  },
  {
    name: 'Île Bonaventure',
    type: 'Nature',
    duration: 'Demi-journée',
    price: '45$/personne',
    link: 'https://www.sepaq.com/pq/bon/',
    description: 'Colonie de fous de Bassan et randonnées',
  },
  {
    name: 'Géoparc de Percé',
    type: 'Aventure',
    duration: '2-4 heures',
    price: '35$/personne',
    link: 'https://geoparcdeperce.com',
    description: 'Plateforme vitrée et sentiers suspendus',
  },
];

const familyActivities = [
  {
    title: 'Rallye du Géoparc',
    description: 'Chasse au trésor éducative sur la géologie (5-12 ans)',
    price: "Inclus avec l'entrée",
  },
  {
    title: 'Mini-Croisière',
    description: 'Tour en bateau adapté aux enfants de 5-12 ans (1h)',
    price: '35$/enfant',
  },
  {
    title: "Plage de l'Anse-à-Beaufils",
    description: 'Baignade et châteaux de sable (tous âges)',
    price: 'Gratuit',
  },
];

const teenActivities = [
  {
    title: 'Initiation au Kayak de Mer',
    description: 'Excursion guidée autour du Rocher Percé (13+ ans)',
    price: '75$/personne',
    duration: '3 heures',
  },
  {
    title: 'Atelier Photo Nature',
    description: 'Cours de photographie avec un pro local (12-17 ans)',
    price: '45$/personne',
    duration: '2 heures',
  },
  {
    title: 'Randonnée Nocturne',
    description: 'Exploration du Géoparc au crépuscule avec astronome (13+ ans)',
    price: '40$/personne',
    duration: '2.5 heures',
  },
];
export default function BlogArticlePerce() {
  return (
    <article id="blog_article_perce" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Percé en Gaspésie - Le Joyau du Saint-Laurent</H1>
        <p className="text-xl text-gray-600">
          Découvrez l'iconique Rocher Percé, l'île Bonaventure et les merveilles de la péninsule
          gaspésienne
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Percé, véritable emblème de la Gaspésie, vous accueille avec son célèbre rocher percé, ses
          falaises majestueuses et sa colonie de fous de Bassan, la plus accessible au monde.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/perce.avif"
            alt="Rocher Percé"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter Percé ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Site Naturel Unique</H3>
            <p className="text-gray-600">
              Le Rocher Percé et l'île Bonaventure forment un des paysages les plus spectaculaires
              du Canada.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Paradis Ornithologique</H3>
            <p className="text-gray-600">
              Plus de 200 000 oiseaux marins, dont la plus grande colonie de fous de Bassan en
              Amérique du Nord.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Gastronomie Maritime</H3>
            <p className="text-gray-600">
              Fruits de mer frais et cuisine locale authentique dans un cadre pittoresque.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          Points de Vue Incontournables
        </H2>
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold text-gray-900">Meilleurs Spots Photos</H3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-2 size-2 rounded-full bg-indigo-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Plateforme du Géoparc</h4>
                  <p className="text-gray-600">Vue plongeante sur le Rocher Percé et la baie.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 size-2 rounded-full bg-indigo-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Mont Sainte-Anne</h4>
                  <p className="text-gray-600">Panorama sur toute la région de Percé.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 size-2 rounded-full bg-indigo-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Promenade des Navigateurs</h4>
                  <p className="text-gray-600">
                    Vue rapprochée sur le Rocher au coucher du soleil.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Fish className="size-8 text-indigo-600" />
          Activités Nautiques et Nature
        </H2>
        <div className="space-y-8">
          {activities.map((activity) => (
            <a
              key={activity.name}
              href={activity.link}
              className="block overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="p-6">
                <H3 className="mb-2 text-xl font-semibold text-gray-900">{activity.name}</H3>
                <p className="mb-4 text-gray-600">{activity.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Type: {activity.type}</span>
                  <span>Durée: {activity.duration}</span>
                  <span>Prix: {activity.price}</span>
                </div>
              </div>
            </a>
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
            <H3 className="mb-4 text-xl font-semibold">Depuis Québec/Montréal</H3>
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
            <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Navette locale gratuite en saison
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de vélos électriques
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Centre-ville facilement accessible à pied
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
              De juin à septembre pour le temps doux et toutes les activités disponibles.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Prévoir 150-200$/jour incluant l'hébergement, les repas et les activités.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">Réservation essentielle en haute saison (juillet-août).</p>
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
