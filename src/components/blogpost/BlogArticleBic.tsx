import Image from 'next/image';
import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'bic',
  ville: 'Bic',
  resume: 'Découverte de Bic et de ses attraits touristiques.',
  activites: [
    'Observation des Phoques',
    'Randonnée Pic Champlain',
    'Kayak de Mer',
    'Sentier Le Chemin du Nord',
    'Centre de Découverte',
    'Plage du Havre du Bic',
    'Vélo de Montagne',
    'Kayak Aventure',
    'Randonnée Photo',
  ],
  hebergements: ['Auberge du Mange Grenouille', 'Gîte du Bic', 'Camping du Bic'],
  publics: ['familles', 'ados', 'aventuriers'],
};
import {
  Hotel,
  Utensils,
  Bus,
  Calendar,
  DollarSign,
  Shield,
  Star,
  Mountain,
  Binary as Binoculars,
} from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Hôtel Rimouski',
    category: 'Confort & services',
    description:
      'Hôtel idéalement situé face au fleuve Saint-Laurent, parfait pour les familles et les voyageurs d’affaires.',
    price: 'Tarif selon la saison et le type de chambre',
    link: 'https://www.booking.com/hotel/ca/rimouski.fr.html',
    image: '/images/destinations/hotels/rimouski.avif',
  },
  {
    name: 'Hôtel Le Saint-Germain',
    category: 'Boutique & moderne',
    description:
      'Hôtel boutique élégant au cœur de Rimouski. Chambres spacieuses, parfait pour un séjour raffiné.',
    price: 'Tarif selon la saison et le type de chambre',
    link: 'https://www.booking.com/hotel/ca/le-saint-germain.fr.html',
    image: '/images/destinations/hotels/saint germain rimouski.avif',
  },
  {
    name: 'Camping du Bic',
    category: 'Plein Air',
    description: 'Sites de camping avec vue sur mer',
    price: 'À partir de 30$/nuit',
    link: 'https://www.sepaq.com/pq/bic/',
    image: '/images/destinations/hotels/camping bic.avif',
  },
];

const restaurants = [
  {
    name: 'Café-Bar Le Mange-Grenouille',
    type: 'Bistro',
    speciality: 'Cuisine du terroir et fruits de mer',
    price: '$$$',
    mustTry: 'Tartare de saumon et produits locaux',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'La Cabane à Manger',
    type: 'Café-Restaurant',
    speciality: 'Brunch et cuisine locale',
    price: '$$',
    mustTry: 'Brunch du dimanche',
    schedule: "Toute l'année",
  },
  {
    name: 'Cantine du Parc',
    type: 'Cantine',
    speciality: 'Fast-food de qualité',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Juin à Septembre',
  },
];

const activities = [
  {
    name: 'Observation des Phoques',
    type: 'Nature',
    duration: '2-3 heures',
    price: 'Inclus avec accès parc',
    description: 'Observation des phoques communs et gris',
  },
  {
    name: 'Randonnée Pic Champlain',
    type: 'Randonnée',
    duration: '3-4 heures',
    price: 'Inclus avec accès parc',
    description: 'Vue panoramique sur le Saint-Laurent',
  },
  {
    name: 'Kayak de Mer',
    type: 'Nautique',
    duration: '2-3 heures',
    price: '75$/personne',
    description: 'Excursion guidée le long des côtes',
  },
];

const familyActivities = [
  {
    title: 'Sentier Le Chemin du Nord',
    description: "Randonnée facile avec points d'observation (tous âges)",
    price: 'Inclus avec accès parc',
  },
  {
    title: 'Centre de Découverte',
    description: 'Expositions interactives sur la faune (5-12 ans)',
    price: 'Inclus avec accès parc',
  },
  {
    title: 'Plage du Havre du Bic',
    description: 'Baignade et jeux de plage (tous âges)',
    price: 'Inclus avec accès parc',
  },
];

const teenActivities = [
  {
    title: 'Vélo de Montagne',
    description: 'Sentiers techniques (12+ ans)',
    price: 'Location: 35$/jour',
    duration: 'À votre rythme',
  },
  {
    title: 'Kayak Aventure',
    description: 'Excursion guidée (12+ ans)',
    price: '75$/personne',
    duration: '3 heures',
  },
  {
    title: 'Randonnée Photo',
    description: 'Safari photo guidé (12+ ans)',
    price: '45$/personne',
    duration: '2 heures',
  },
];

export default function BlogArticleBic() {
  return (
    <article id="blog_article_bic" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Parc national du Bic - Paradis des Phoques et des Randonneurs</H1>
        <p className="text-xl text-gray-600">
          Découvrez ce joyau naturel du Bas-Saint-Laurent, où montagnes et mer se rencontrent dans
          un décor spectaculaire
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          Le Parc national du Bic, niché sur les rives du Saint-Laurent, est un sanctuaire naturel
          où les phoques se prélassent sur les rochers et où les sentiers de randonnée offrent des
          vues imprenables sur le fleuve. Ce parc unique combine harmonieusement paysages maritimes,
          montagnes et une riche biodiversité.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/bic.avif"
            alt="Parc national du Bic"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter le Parc du Bic ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Observation des Phoques</H3>
            <p className="text-gray-600">
              L'un des meilleurs endroits au Québec pour observer les phoques dans leur habitat
              naturel.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Paysages Uniques</H3>
            <p className="text-gray-600">
              Mélange spectaculaire de caps rocheux, anses et montagnes.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Randonnées Panoramiques</H3>
            <p className="text-gray-600">
              Plus de 25 km de sentiers avec vues imprenables sur le Saint-Laurent.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Binoculars className="size-8 text-indigo-600" />
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
          <Mountain className="size-8 text-indigo-600" />
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
                3h en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus Orléans Express (arrêt à Rimouski)
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Voiture nécessaire pour accéder au parc
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Navette depuis Rimouski en été
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
              De juin à septembre pour le climat doux. Mai-juin et septembre pour l'observation des
              phoques.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement: 30-169$/nuit Activités: 8.75$/jour (accès parc) Repas: 15-45$/personne
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Réservation conseillée en haute saison. Prévoir des vêtements chauds même l'été.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à Découvrir le Parc du Bic ?</H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et partez à la rencontre des phoques
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/region/ca/le-bic.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.sepaq.com/pq/bic/"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer le Parc
          </a>
        </div>
      </section>
    </article>
  );
}
