import React from 'react';
import { Hotel, Utensils, Bus, Calendar, DollarSign, Shield, Star } from 'lucide-react';
import Image from 'next/image'; // ✅ CORRECt
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export default function BlogArticleAnseSaintJean() {
  // ✅ Imports déplacés automatiquement

  const hotels = [
    {
      name: 'Auberge des Cévennes',
      category: 'Vue sur Fjord',
      description: 'Vue spectaculaire sur le fjord du Saguenay',
      price: 'À partir de 159$/nuit',
      link: 'https://www.booking.com/hotel/ca/auberge-des-cevennes.html',
      image:
        'https://images.unsplash.com/photo-1572463459372-70c9cf5cb795?auto=format&fit=crop&q=80',
    },
    {
      name: 'Chalets sur le Fjord',
      category: 'Chalet',
      description: 'Chalets indépendants avec vue panoramique',
      price: 'À partir de 189$/nuit',
      link: 'https://www.booking.com/hotel/ca/chalets-sur-le-fjord.html',
      image:
        'https://images.unsplash.com/photo-1583245117386-341b4e73ca88?auto=format&fit=crop&q=80',
    },
    {
      name: 'Gîte du Fjord',
      category: 'B&B',
      description: 'Accueil chaleureux et petit-déjeuner local',
      price: 'À partir de 129$/nuit',
      link: 'https://www.booking.com/hotel/ca/gite-du-fjord.html',
      image:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80',
    },
  ];

  const restaurants = [
    {
      name: 'La Cuisine',
      type: 'Gastronomique',
      speciality: 'Cuisine régionale et produits locaux',
      price: '$$$',
      mustTry: 'Tartare de saumon sauvage',
      schedule: 'Mercredi au Dimanche',
    },
    {
      name: 'Café du Quai',
      type: 'Bistro',
      speciality: 'Fruits de mer et cuisine bistro',
      price: '$$',
      mustTry: 'Fish & Chips au poisson local',
      schedule: 'Tous les jours en saison',
    },
    {
      name: 'Boulangerie Artisanale',
      type: 'Boulangerie-Café',
      speciality: 'Pains et viennoiseries maison',
      price: '$',
      mustTry: 'Pain aux noix et raisins',
      schedule: 'Mardi au Dimanche',
    },
  ];

  const activities = [
    {
      name: 'Croisière sur le Fjord',
      type: 'Navigation',
      duration: '2-3 heures',
      price: '69$/personne',
      description: 'Découverte du fjord en bateau avec guide',
    },
    {
      name: 'Mont-Édouard',
      type: 'Montagne',
      duration: 'Variable',
      price: 'À partir de 45$/jour',
      description: 'Ski en hiver, randonnée et vélo en été',
    },
    {
      name: 'Kayak de Mer',
      type: 'Nautique',
      duration: '2-4 heures',
      price: '75$/personne',
      description: 'Exploration du fjord en kayak guidé',
    },
    {
      name: 'Via Ferrata du Fjord',
      type: 'Aventure',
      duration: '3 heures',
      price: '89$/personne',
      description: 'Parcours sécurisé avec vue sur le fjord',
    },
  ];

  const familyActivities = [
    {
      title: 'Plage municipale',
      description: 'Baignade et jeux de plage (tous âges)',
      price: 'Gratuit',
    },
    {
      title: 'Petit Train du Fjord',
      description: 'Tour commenté du village (tous âges)',
      price: '15$/adulte, 8$/enfant',
    },
    {
      title: 'Initiation au Kayak',
      description: 'Cours en eau calme (8+ ans)',
      price: '45$/personne',
    },
  ];

  const teenActivities = [
    {
      title: 'École de Voile',
      description: "Cours d'initiation à la voile (12+ ans)",
      price: '85$/personne',
      duration: '3 heures',
    },
    {
      title: 'Vélo de Montagne',
      description: 'Sentiers du Mont-Édouard (12+ ans)',
      price: '45$/jour',
      duration: 'À votre rythme',
    },
    {
      title: 'Randonnée Alpine',
      description: 'Sentiers panoramiques guidés (14+ ans)',
      price: '55$/personne',
      duration: '4-5 heures',
    },
  ];

  return (
    <>
      {/* ✅ NOUVEAU composant SEO pour le référencement 2025 */}

      <article id="blog_article_anse_saint_jean" className="mx-auto max-w-4xl bg-white px-4 py-12">
        <header className="mb-12 text-center">
          <H1 className="mb-4">L'Anse-Saint-Jean - Perle du Fjord du Saguenay</H1>
          <p className="text-xl text-gray-600">
            Découvrez ce village pittoresque niché au cœur du fjord, où nature grandiose et
            traditions maritimes se rencontrent
          </p>
        </header>

        <section className="prose mb-12 lg:prose-xl">
          <p>
            L'Anse-Saint-Jean, joyau du fjord du Saguenay, est un village pittoresque qui allie
            parfaitement patrimoine maritime et activités de plein air. Avec ses paysages à couper
            le souffle, ses activités quatre saisons et son authenticité préservée, il offre une
            expérience unique aux visiteurs en quête d'aventure et de sérénité.
          </p>
          <div className="my-8">
            <Image
              src="/images/destinations/anse-saint-jean.avif"
              alt="L'Anse-Saint-Jean"
              width={800}
              height={500}
              className="h-auto w-full rounded-lg object-cover shadow-lg"
              priority={false}
              loading="lazy"
            />
          </div>
        </section>

        <section className="mb-16">
          <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Star className="size-8 text-indigo-600" />
            Pourquoi Visiter L'Anse-Saint-Jean ?
          </H2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Fjord Majestueux</H3>
              <p className="text-gray-600">
                Un des plus beaux fjords au monde, avec des falaises vertigineuses.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Village Authentique</H3>
              <p className="text-gray-600">
                Architecture traditionnelle et mode de vie maritime préservé.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 text-xl font-semibold">Activités 4 Saisons</H3>
              <p className="text-gray-600">
                Du ski au kayak, en passant par la randonnée et l'escalade.
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
                  5h30 en voiture depuis Montréal
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  3h30 en voiture depuis Québec
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Bus interrégional jusqu'à Chicoutimi puis navette
                </li>
              </ul>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-4 text-xl font-semibold">Sur Place</H3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Navette maritime en saison
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Location de vélos disponible
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-indigo-600" />
                  Voiture recommandée pour explorer
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
                Juin à septembre pour l'été. Décembre à mars pour les sports d'hiver.
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <DollarSign className="size-5 text-indigo-600" />
                Budget
              </H3>
              <p className="text-gray-600">
                Hébergement: 129-189$/nuit Activités: 45-89$/jour Repas: 20-50$/personne
              </p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <Shield className="size-5 text-indigo-600" />À Noter
              </H3>
              <p className="text-gray-600">
                Réservation essentielle en haute saison. Prévoir des vêtements chauds même l'été.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-gray-50 p-8 text-center">
          <H2 className="mb-4 text-2xl font-bold text-gray-900">
            Prêt à Découvrir L'Anse-Saint-Jean ?
          </H2>
          <p className="mb-6 text-gray-600">
            Réservez votre séjour maintenant et explorez ce joyau du fjord du Saguenay
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.booking.com/city/ca/l-anse-saint-jean.html"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
            >
              Réserver un Hébergement
            </a>
            <a
              href="https://www.tourisme-saguenay.com"
              className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
            >
              Explorer la Région
            </a>
          </div>
        </section>
      </article>
    </>
  );
}
