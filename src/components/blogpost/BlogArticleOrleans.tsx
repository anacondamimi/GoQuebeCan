import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata = {
  slug: 'orleans',
  ville: 'Orleans',
  resume: 'Découverte de Orleans et de ses attraits touristiques.',
  activites: ['Tour Gourmand de l', 'Location de Vélos', 'Vignobles et Cidreries'],
  hebergements: ['Auberge La Grange de l', 'Le Domaine Orléans', 'Les Chalets de l'],
  publics: ['aventuriers'],
};
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';

// ✅ Imports déplacés automatiquement

const hotels = [
  {
    name: "La maison de l'île d'Orléans",
    category: 'Gastronomique & romantique',
    description:
      'B&B haut de gamme à Saint-Jean, connu pour son déjeuner gastronomique à l’aveugle – parfait pour un séjour en couple sur l’île d’Orléans.',
    price: 'À partir de 233 $/nuit (petit-déjeuner inclus)',
    link: 'https://www.booking.com/hotel/ca/la-maison-de-l-39-ile.fr.html?label=msn-FQZ8IgHEiaVN31poKb5DbQ-80608103155809%3Atikwd-80608256542845%3Aloc-32%3Aneo%3Amte%3Alp124427%3Adec%3Aqsh%C3%A9bergement+%C3%AEle+orl%C3%A9ans&sid=dd41b6917ba1eb791f5db659a3e15674&aid=1856194&ucfs=1&arphpl=1&checkin=2026-06-03&checkout=2026-06-04&dest_id=5087&dest_type=region&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=1&hapos=1&sr_order=score&srpvid=accc3cc25a4b00f2&srepoch=1763714580&all_sr_blocks=705794903_309162090_2_1_0&highlighted_blocks=705794903_309162090_2_1_0&matching_block_id=705794903_309162090_2_1_0&sr_pri_blocks=705794903_309162090_2_1_0__23300&from=searchresults' /* à remplacer par ton lien affilié La maison de l’île d’Orléans */,
    image: '/images/destinations/hotels/maison-gastro-ileorleans.avif',
  },
  {
    name: 'Auberge Les Blancs Moutons',
    category: 'Charme & vue sur le fleuve',
    description:
      'Auberge pleine de charme à Saint-Laurent-de-l’île d’Orléans, avec vue exceptionnelle et petit-déjeuner inclus, idéale pour explorer l’île en douceur.',
    price: 'À partir de 134 $/nuit (petit-déjeuner inclus)',
    link: 'https://www.booking.com/hotel/ca/auberge-les-blancs-moutons.fr.html?label=msn-FQZ8IgHEiaVN31poKb5DbQ-80608103155809%3Atikwd-80608256542845%3Aloc-32%3Aneo%3Amte%3Alp124427%3Adec%3Aqsh%C3%A9bergement+%C3%AEle+orl%C3%A9ans&sid=dd41b6917ba1eb791f5db659a3e15674&aid=1856194&ucfs=1&arphpl=1&checkin=2026-06-03&checkout=2026-06-04&dest_id=5087&dest_type=region&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=2&hapos=2&sr_order=score&srpvid=accc3cc25a4b00f2&srepoch=1763714790&all_sr_blocks=193561502_414095988_2_1_0&highlighted_blocks=193561502_414095988_2_1_0&matching_block_id=193561502_414095988_2_1_0&sr_pri_blocks=193561502_414095988_2_1_0__13400&from=searchresults' /* à remplacer par ton lien affilié Auberge Les Blancs Moutons */,
    image: '/images/destinations/hotels/auberge-blancsmoutons-ileorleans.avif',
  },
  {
    name: "Auberge Le P'tit Bonheur",
    category: 'Familial & abordable',
    description:
      'Auberge simple et conviviale à Saint-Laurent-de-l’île d’Orléans, avec chambres familiales et annulation gratuite – pratique pour un séjour flexible.',
    price: 'Tarif variable selon la saison',
    link: 'https://www.booking.com/hotel/ca/auberge-le-p-39-tit-bonheur.fr.html?label=msn-FQZ8IgHEiaVN31poKb5DbQ-80608103155809%3Atikwd-80608256542845%3Aloc-32%3Aneo%3Amte%3Alp124427%3Adec%3Aqsh%C3%A9bergement+%C3%AEle+orl%C3%A9ans&sid=dd41b6917ba1eb791f5db659a3e15674&aid=1856194&ucfs=1&arphpl=1&checkin=2026-06-03&checkout=2026-06-04&dest_id=900051336&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=2&hapos=2&sr_order=popularity&srpvid=80463d756f7503de&srepoch=1763714699&all_sr_blocks=104993711_184406356_2_0_0&highlighted_blocks=104993711_184406356_2_0_0&matching_block_id=104993711_184406356_2_0_0&sr_pri_blocks=104993711_184406356_2_0_0__10100&from=searchresults' /* à remplacer par ton lien affilié Auberge Le P’tit Bonheur */,
    image: '/images/destinations/hotels/auberge-petit-bonheur-ileorleans.avif',
  },
];

const restaurants = [
  {
    name: 'Le Relais des Pins',
    type: 'Cabane à sucre',
    speciality: "Repas traditionnel à l'érable",
    price: '$$$',
    mustTry: "Oreilles de crisse et jambon à l'érable",
    schedule: "Ouvert toute l'année",
  },
  {
    name: 'Panache Mobile',
    type: 'Gastronomique',
    speciality: 'Cuisine du terroir raffinée',
    price: '$$$$',
    mustTry: 'Tartare de boeuf local',
    schedule: 'Mai à Octobre',
  },
  {
    name: 'La Grange',
    type: 'Brunch',
    speciality: 'Brunch fermier',
    price: '$$',
    mustTry: 'Crêpes aux fruits de saison',
    schedule: "Toute l'année, weekends",
  },
];

const activities = [
  {
    name: "Tour Gourmand de l'Île d'Orléans",
    type: 'Gastronomie',
    duration: '6 heures',
    price: '125$/personne',
    link: 'https://www.quebec-cite.com/fr/quoi-faire-quebec/tours-gourmands#tour-gourmand-de-lile-dorleans',
    description: 'Découverte des producteurs locaux et dégustations',
  },
  {
    name: 'Location de Vélos',
    type: 'Activité',
    duration: 'À la journée',
    price: '35$/jour',
    link: 'https://www.locationvelos.com',
    description: "Parcourez l'île à vélo sur 67 km de routes panoramiques",
  },
  {
    name: 'Vignobles et Cidreries',
    type: 'Dégustation',
    duration: '3-4 heures',
    price: '45$/personne',
    link: 'https://www.tourisme.iledorleans.com',
    description: 'Circuit des vignobles avec dégustation',
  },
];

const springActivities = [
  {
    title: 'Temps des Sucres',
    description: 'Visitez les cabanes à sucre traditionnelles et modernes',
    period: 'Mars à Avril',
  },
  {
    title: 'Floraison des Vergers',
    description: 'Spectacle naturel des pommiers en fleurs',
    period: 'Mai',
  },
  {
    title: 'Randonnée Printanière',
    description: "Découverte de la nature qui s'éveille",
    period: 'Avril à Juin',
  },
];

const summerActivities = [
  {
    title: 'Cueillette de Fruits',
    description: 'Fraises, framboises et bleuets selon la saison',
    period: 'Juin à Septembre',
  },
  {
    title: "Tour de l'Île à Vélo",
    description: 'Circuit cyclable avec vues panoramiques',
    period: 'Mai à Octobre',
  },
  {
    title: 'Pique-niques Champêtres',
    description: 'Aires aménagées avec vue sur le fleuve',
    period: 'Juin à Septembre',
  },
];

export default function BlogArticleOrleans() {
  return (
    <article id="blog_article_orleans" className="mx-auto max-w-4xl bg-white px-4 py-12">
      <header className="mb-12 text-center">
        <H1 className="mb-4">Guide de Voyage à l'Île d'Orléans : Le Joyau du Saint-Laurent</H1>
        <p className="text-xl text-gray-600">
          Découvrez le berceau de la Nouvelle-France, entre patrimoine, gastronomie et paysages
          enchanteurs
        </p>
      </header>

      <section className="prose mb-12 lg:prose-xl">
        <p>
          À seulement 15 minutes de Québec, l'Île d'Orléans est un véritable havre de paix qui
          conjugue patrimoine historique, traditions agricoles et gastronomie locale. Cette île de
          34 kilomètres de long, surnommée le "Jardin de Québec", vous invite à un voyage dans le
          temps et les saveurs.
        </p>
        <div className="my-8">
          <Image
            src="/images/destinations/ile-dorleans.avif"
            alt="Découvrez les trésors de l'île d'Orleans"
            width={800}
            height={500}
            loading="lazy"
            className="h-auto w-full rounded-lg object-cover shadow-md"
          />
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi Visiter l'Île d'Orléans ?
        </H2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Terroir d'Exception</H3>
            <p className="text-gray-600">
              Plus de 200 producteurs locaux : fraises, pommes, vins, fromages et produits de
              l'érable.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Patrimoine Historique</H3>
            <p className="text-gray-600">
              Plus de 600 bâtiments historiques, témoins de la Nouvelle-France.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Paysages Uniques</H3>
            <p className="text-gray-600">
              Vues spectaculaires sur le fleuve Saint-Laurent et les Laurentides.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Calendar className="size-8 text-indigo-600" />
          Activités Saisonnières
        </H2>

        <div className="space-y-8">
          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="p-6">
              <H3 className="mb-4 text-xl font-semibold text-gray-900">Printemps à l'Île</H3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {springActivities.map((activity) => (
                  <div key={activity.title} className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium text-gray-900">{activity.title}</h4>
                    <p className="mb-2 text-sm text-gray-600">{activity.description}</p>
                    <span className="text-sm text-indigo-600">{activity.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="p-6">
              <H3 className="mb-4 text-xl font-semibold text-gray-900">Été à l'Île</H3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {summerActivities.map((activity) => (
                  <div key={activity.title} className="rounded-lg bg-gray-50 p-4">
                    <h4 className="mb-2 font-medium text-gray-900">{activity.title}</h4>
                    <p className="mb-2 text-sm text-gray-600">{activity.description}</p>
                    <span className="text-sm text-indigo-600">{activity.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          Que Faire et Que Voir ?
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
          Où dormir ?
        </H2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {hotels.map((hotel) => (
            <article
              key={hotel.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={800}
                  height={600}
                />
              </div>

              {/* Contenu */}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-start justify-between gap-2">
                  {/* Nom = lien principal */}
                  <Link
                    href={hotel.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-semibold text-gray-900 no-underline hover:text-indigo-700 hover:underline"
                  >
                    {hotel.name}
                  </Link>

                  <span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700">
                    {hotel.category}
                  </span>
                </div>

                {/* Description non cliquable */}
                <p className="text-sm text-gray-700">{hotel.description}</p>

                {/* Prix + CTA */}
                <div className="mt-auto pt-2">
                  <Link
                    href={hotel.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-indigo-600 no-underline hover:text-indigo-800 hover:underline"
                  >
                    {hotel.price} – Voir les disponibilités
                  </Link>
                </div>
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
          <Star className="size-8 text-indigo-600" />
          Activités pour Enfants
        </H2>
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold text-gray-900">Activités Familiales</H3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-2 size-2 rounded-full bg-indigo-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Cueillette de Fruits</h4>
                  <p className="text-gray-600">
                    Fraises en juin-juillet, pommes en septembre-octobre. Une activité ludique et
                    gourmande pour toute la famille.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 size-2 rounded-full bg-indigo-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Visite de la Ferme Pédagogique</h4>
                  <p className="text-gray-600">
                    Rencontre avec les animaux de la ferme et ateliers éducatifs sur l'agriculture.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 size-2 rounded-full bg-indigo-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Chasse aux Trésors de l'Île</h4>
                  <p className="text-gray-600">
                    Parcours ludique à travers les six villages de l'île avec énigmes et
                    découvertes.
                  </p>
                </div>
              </li>
            </ul>
          </div>
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
                Bus PLUMobile (service régulier)
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Taxi (~35$ depuis le centre-ville)
              </li>
            </ul>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Sur l'Île</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de vélos disponible
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Circuit d'autobus touristique
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Voiture recommandée pour plus de flexibilité
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
              De mai à octobre pour les activités extérieures. Mars-avril pour le temps des sucres.
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
              Réservation conseillée pour les restaurants et hébergements en haute saison.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">
          Prêt à Découvrir l'Île d'Orléans ?
        </H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et profitez de nos offres exclusives
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://www.booking.com/region/ca/ile-d-orleans.html"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Réserver un Hébergement
          </a>
          <a
            href="https://www.tourisme.iledorleans.com"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer les Activités
          </a>
        </div>
      </section>
    </article>
  );
}
