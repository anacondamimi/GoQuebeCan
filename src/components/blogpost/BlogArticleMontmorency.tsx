import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'montmorency',
  ville: 'Montmorency',
  resume: 'Découverte de Montmorency et de ses attraits touristiques.',
  activites: [
    'Via Ferrata de la Chute',
    'Téléphérique Panoramique',
    'Randonnée des Chutes',
    'Tyrolienne Double',
    'Jeux d',
    'Rallye-découverte',
  ],
  hebergements: ['Manoir Montmorency', 'Auberge Baker', 'Comfort Inn Beauport'],
  publics: ['familles', 'aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: 'Royal Dalhousie',
    category: 'Appartements vue fleuve',
    description:
      'Condos haut de gamme dans le Vieux-Port, avec grandes fenêtres, cuisines équipées et vue directe sur le fleuve et le mouvement des bateaux.',
    price: 'À partir d’environ 300–400 $/nuit (selon la saison)',
    link: 'https://www.booking.com/hotel/ca/royal-dalhousie.html',
    image: '/images/destinations/hotels/royal-daousie-quebec.avif',
  },
  {
    name: 'Monsieur Jean – Hôtel Particulier',
    category: 'Boutique & design',
    description:
      'Hôtel-boutique en Haute-Ville, au cœur du Vieux-Québec, avec déco contemporaine, mini-cuisines et certaines chambres offrant une vue superbe sur la ville.',
    price: 'À partir d’environ 250–350 $/nuit (selon la saison)',
    link: 'https://www.booking.com/hotel/ca/coeur-de-ville.fr.html',
    image: '/images/destinations/hotels/monsieur-jean-quebec.avif',
  },
  {
    name: 'Appartement Luxe – Sunset View, Pool, Parking, Near Old Québec',
    category: 'Appartement avec piscine',
    description:
      'Appartement moderne avec vue sur le coucher de soleil, accès piscine (selon la saison) et stationnement, à distance de marche du Vieux-Québec.',
    price: 'Tarifs variables selon les dates et la durée du séjour',
    link: 'https://appartement-luxe-incredible-sunset-view-pool-parking.hotelsquebeccity.net/en/',
    image: '/images/destinations/hotels/appartluxe-quebec.avif',
  },
] as const;

const restaurants = [
  {
    name: 'Restaurant Le Montmorency',
    type: 'Gastronomique',
    speciality: 'Cuisine québécoise raffinée',
    price: '$$$$',
    mustTry: "Tartare de saumon à l'érable",
    schedule: "Ouvert toute l'année",
  },
  {
    name: 'Bistro La Chute',
    type: 'Bistro',
    speciality: 'Cuisine locale décontractée',
    price: '$$$',
    mustTry: 'Poutine au canard confit',
    schedule: "Ouvert toute l'année",
  },
  {
    name: 'Café du Manoir',
    type: 'Café-Restaurant',
    speciality: 'Brunch et lunch',
    price: '$$',
    mustTry: 'Crêpes aux fruits frais',
    schedule: "Ouvert toute l'année",
  },
];

const activities = [
  {
    name: 'Via Ferrata de la Chute',
    type: 'Aventure',
    duration: '2-3 heures',
    price: '75$/personne',
    link: 'https://www.sepaq.com/ct/pcm/',
    description: 'Parcours sécurisé le long de la falaise',
  },
  {
    name: 'Téléphérique Panoramique',
    type: 'Observation',
    duration: '30 minutes',
    price: '25$/personne',
    link: 'https://www.sepaq.com/ct/pcm/',
    description: 'Vue spectaculaire sur la chute et le fleuve',
  },
  {
    name: 'Randonnée des Chutes',
    type: 'Nature',
    duration: '1-2 heures',
    price: 'Gratuit',
    link: 'https://www.sepaq.com/ct/pcm/',
    description: 'Sentiers aménagés autour de la chute',
  },
];

const familyActivities = [
  {
    title: 'Tyrolienne Double',
    description: 'Traversez la chute en tyrolienne (minimum 10 ans)',
    price: '45$/personne',
  },
  {
    title: "Jeux d'eau",
    description: 'Aires de jeux aquatiques pour enfants (été)',
    price: "Inclus dans l'entrée",
  },
  {
    title: 'Rallye-découverte',
    description: "Parcours ludique avec énigmes sur l'histoire du site",
    price: '10$/famille',
  },
];

export default function BlogArticleMontmorency() {
  return (
    <article id="blog_article_montmorency" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Chute Montmorency et Chaudière-Appalaches</H1>
        <p className="text-xl text-gray-600">
          Découvrez la majestueuse chute de 83 mètres et explorez la région naturelle de
          Chaudière-Appalaches
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          À seulement quelques minutes de Québec, la Chute Montmorency vous impressionnera par sa
          hauteur vertigineuse de 83 mètres (plus haute que les chutes Niagara!).
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/chute-montmorency.avif"
            alt="Chute Montmorency"
            className="h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
        </div>

        <p>
          Combinée à la région pittoresque de Chaudière-Appalaches, elle offre une expérience unique
          entre nature spectaculaire et aventure.
        </p>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Chute Spectaculaire</H3>
            <p className="text-gray-600">
              Une des plus hautes chutes d'Amérique du Nord, offrant des vues à couper le souffle en
              toute saison.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Activités d'Aventure</H3>
            <p className="text-gray-600">
              Via ferrata, tyrolienne et randonnées pour tous les niveaux.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Nature Préservée</H3>
            <p className="text-gray-600">
              Parcs naturels et sentiers de la région Chaudière-Appalaches.
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
                  <h4 className="font-medium text-gray-900">Passerelle Suspendue</h4>
                  <p className="text-gray-600">
                    Vue plongeante sur la chute et le fleuve Saint-Laurent.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 size-2 rounded-full bg-indigo-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Escalier Panoramique</h4>
                  <p className="text-gray-600">300 marches offrant différents angles de vue.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 size-2 rounded-full bg-indigo-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Manoir Montmorency</h4>
                  <p className="text-gray-600">
                    Terrasse avec vue imprenable sur la chute et le fleuve.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Activités pour Enfants et Familles
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
          Découvrir Chaudière-Appalaches
        </H2>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <Image
            src="/images/destinations/chaudiere-deux.avif"
            alt="Chutes de la Chaudière"
            className="mb-4 h-96 w-full rounded-lg object-cover shadow-lg"
            width={800}
            height={600}
          />
          <H3 className="mb-2 text-xl font-semibold text-gray-900">Les Chutes de la Chaudière</H3>
          <p className="text-gray-600">
            Une merveille naturelle impressionnante située dans la région de Chaudière-Appalaches,
            offrant des sentiers de randonnée et des points de vue spectaculaires sur les chutes.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          Activités et Attractions
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
          <Hotel className="size-8 text-indigo-600" />
          Où Dormir ?
        </H2>
        <div className="not-prose mt-6 grid gap-6 md:grid-cols-3">
          {hotels.map((hotel) => (
            <article
              key={hotel.name}
              className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm"
            >
              <div className="relative h-40 w-full">
                <Image src={hotel.image} alt={hotel.name} fill className="object-cover" />
              </div>

              <div className="flex flex-1 flex-col p-4">
                {/* Badge catégorie */}
                <p className="mb-2 inline-flex rounded-md bg-indigo-50 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
                  {hotel.category}
                </p>

                {/* Nom de l’hôtel = SEUL élément cliquable principal */}
                <H3 className="text-base font-semibold leading-snug text-slate-900">
                  <Link
                    href={hotel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-sky-700"
                  >
                    {hotel.name}
                  </Link>
                </H3>

                {/* Description non cliquable */}
                <p className="mt-2 text-sm text-slate-700">{hotel.description}</p>

                {/* Prix : CTA discret vers Booking (optionnel) */}
                <p className="mt-3 text-sm font-semibold">
                  <Link
                    href={hotel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-700 underline underline-offset-2 hover:text-sky-800"
                  >
                    {hotel.price}
                  </Link>
                </p>
              </div>
            </article>
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
            <H3 className="mb-4 text-xl font-semibold">Depuis Québec</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                15 minutes en voiture depuis le Vieux-Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus RTC 800 (service régulier)
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Taxi (~30$ depuis le centre-ville)
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Stationnement</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Stationnement payant sur place
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Navette gratuite entre les stationnements
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Places réservées pour les autobus
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
              Toute l'année : été pour les activités, hiver pour le pain de glace.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Prévoir 100-150$/jour incluant l'hébergement, les repas et les activités.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À Noter
            </H3>
            <p className="text-gray-600">
              Réservation conseillée pour les activités d'aventure en haute saison.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">
          Prêt à Explorer la Chute Montmorency ?
        </H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et profitez de nos offres exclusives
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.sepaq.com/ct/pcm/"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver les Activités
          </a>
          <a
            href="https://www.booking.com/landmark/ca/montmorency-falls.html"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Trouver un Hébergement
          </a>
        </div>
      </section>
    </article>
  );
}
