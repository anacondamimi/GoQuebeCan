import Image from 'next/image';
import React from 'react';

import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_SABREVOIS } from '@/data/hotels/byArticle/sabrevois';
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star, Sun } from 'lucide-react';
import { bookingAwin } from '@/lib/awin';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

export const metadata = {
  slug: 'sabrevois',
  ville: 'Sabrevois',
  resume: 'Découverte de Sabrevois et de ses attraits touristiques.',
  activites: [
    'Nuitée en Hutte Flottante',
    'Kayak sur le Richelieu',
    'Pêche Sportive',
    'Mini-Croisière',
    'Plage du Richelieu',
    'Ferme Pédagogique',
    'Location de SUP',
    'Vélo le long du Richelieu',
    'Cours de Voile',
  ],
  hebergements: ['Les Huttes du Richelieu', 'Auberge du Richelieu', 'Gîte des Îles'],
  publics: ['familles', 'ados'],
};

// ✅ Imports déplacés automatiquement

const hotels = pickHotels(HOTEL_IDS_SABREVOIS);

const restaurants = [
  {
    name: 'La Table du Richelieu',
    type: 'Gastronomique',
    speciality: 'Cuisine locale et poissons de rivière',
    price: '$$$',
    mustTry: 'Doré du Richelieu',
    schedule: 'Mercredi au Dimanche',
  },
  {
    name: 'Bistro des Huttes',
    type: 'Bistro',
    speciality: 'Cuisine bistro et terrasse',
    price: '$$',
    mustTry: 'Planche de charcuteries locales',
    schedule: 'Tous les jours en saison',
  },
  {
    name: 'Café de la Rive',
    type: 'Café-Restaurant',
    speciality: 'Brunch et pâtisseries maison',
    price: '$$',
    mustTry: 'Brunch du dimanche',
    schedule: 'Tous les jours',
  },
];

const activities = [
  {
    name: 'Nuitée en Hutte Flottante',
    type: 'Hébergement Insolite',
    duration: '24 heures',
    price: 'À partir de 199$/nuit',
    description: "Expérience unique dans une hutte polynésienne sur l'eau",
  },
  {
    name: 'Kayak sur le Richelieu',
    type: 'Nautique',
    duration: '2-3 heures',
    price: '45$/personne',
    description: 'Exploration de la rivière en kayak',
  },
  {
    name: 'Pêche Sportive',
    type: 'Sport',
    duration: 'Demi-journée',
    price: '85$/personne',
    description: 'Pêche guidée sur la rivière Richelieu',
  },
];

const familyActivities = [
  {
    title: 'Mini-Croisière',
    description: 'Tour guidé en bateau (tous âges)',
    price: '35$/adulte, 20$/enfant',
  },
  {
    title: 'Plage du Richelieu',
    description: 'Baignade et jeux de plage (tous âges)',
    price: 'Gratuit',
  },
  {
    title: 'Ferme Pédagogique',
    description: 'Visite de ferme interactive (3+ ans)',
    price: '15$/personne',
  },
];

const teenActivities = [
  {
    title: 'Location de SUP',
    description: 'Planche à pagaie sur la rivière (12+ ans)',
    price: '35$/2 heures',
    duration: '2 heures',
  },
  {
    title: 'Vélo le long du Richelieu',
    description: 'Piste cyclable panoramique (12+ ans)',
    price: '25$/jour',
    duration: 'À votre rythme',
  },
  {
    title: 'Cours de Voile',
    description: 'Initiation à la voile (14+ ans)',
    price: '75$/demi-journée',
    duration: '3 heures',
  },
];

export default function BlogArticleSabrevois() {
  return (
    <DestinationArticleTemplate
      slug="sabrevois"
      title="Sainte-Anne-de-Sabrevois - L'Expérience Unique des Huttes sur l'Eau"
    >
      <article id="blog_article_sabrevois" className="mx-auto max-w-4xl bg-white px-4 py-12">
        <header className="mb-12 text-center">
          <p className="text-xl text-gray-600">
            Découvrez ce village unique de la Montérégie où des huttes polynésiennes flottantes
            offrent une expérience d'hébergement inoubliable
          </p>
        </header>

        <section className="prose mb-12 lg:prose-xl">
          <p>
            Sainte-Anne-de-Sabrevois, nichée le long de la rivière Richelieu, se distingue par son
            concept unique d'hébergement : des huttes polynésiennes flottantes. Ce village paisible
            de la Montérégie combine parfaitement nature, activités nautiques et expériences
            insolites.
          </p>
          <div className="my-8">
            <Image
              src="/images/destinations/sabrevois.avif"
              alt="Huttes flottantes"
              className="h-96 w-full rounded-lg object-cover shadow-lg"
              width={800}
              height={600}
            />
          </div>
        </section>

        <section className="mb-16">
          <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Star className="size-8 text-indigo-600" />
            Pourquoi Visiter Sainte-Anne-de-Sabrevois ?
          </H2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Hébergement Unique</H3>
              <p className="text-gray-600">
                Huttes polynésiennes flottantes, une première au Québec.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Activités Nautiques</H3>
              <p className="text-gray-600">Kayak, SUP et pêche sur la rivière Richelieu.</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Nature Préservée</H3>
              <p className="text-gray-600">Faune et flore riches le long de la rivière.</p>
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
          {/* MIGRATED_HOTELS_GRID */}
          <HotelGrid items={hotels} />
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
                  45 minutes en voiture depuis Montréal
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  3h en voiture depuis Québec
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Bus interurbain jusqu'à Saint-Jean-sur-Richelieu
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Voiture recommandée
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Location de vélos disponible
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Service de navette sur demande
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
                De mai à octobre pour les huttes. Juillet-août pour les activités nautiques.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <DollarSign className="size-5 text-indigo-600" />
                Budget
              </H3>
              <p className="text-gray-600">
                Hébergement: 129-199$/nuit Activités: 25-85$/jour Repas: 20-50$/personne
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <Shield className="size-5 text-indigo-600" />À Noter
              </H3>
              <p className="text-gray-600">
                Réservation essentielle pour les huttes. Prévoir anti-moustiques en été.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-8 text-center">
          <H2 className="mb-4 text-2xl font-bold text-gray-900">
            Prêt à Vivre une Expérience Unique ?
          </H2>
          <p className="mb-6 text-gray-600">
            Réservez votre séjour maintenant et découvrez le charme des huttes flottantes
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={bookingAwin('https://www.booking.com/city/ca/sainte-anne-de-sabrevois.html')}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
            >
              Réserver un Hébergement
            </a>
            <a
              href="https://www.tourisme-monteregie.qc.ca"
              className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
            >
              Explorer la Région
            </a>
          </div>
        </section>
      </article>
    </DestinationArticleTemplate>
  );
}
