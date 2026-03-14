import Image from 'next/image';
import { Bus, Calendar, DollarSign, Shield, Star, Waves, Mountain } from 'lucide-react';

import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';
import DestinationFaq from '@/components/blog/DestinationFaq';

import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_ANSE_SAINT_JEAN } from '@/data/hotels/byArticle/anseSaintJean';

import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';
import { bookingAwin } from '@/lib/awin';

export const metadata = {
  slug: 'anse-saint-jean',
  ville: "L'Anse-Saint-Jean",
  resume:
    "Découvrez L'Anse-Saint-Jean, perle du fjord du Saguenay, entre montagnes, fjord, nature grandiose et activités quatre saisons.",
  activites: [
    'Croisière sur le fjord',
    'Mont-Édouard',
    'Kayak de mer',
    'Via Ferrata du Fjord',
    'Plage municipale',
    'Petit train du Fjord',
    'École de voile',
    'Vélo de montagne',
    'Randonnée alpine',
  ],
  hebergements: ['Auberge des Cévennes', 'Chalets sur le Fjord', 'Gîte du Fjord'],
  publics: ['familles', 'ados', 'couples', 'aventuriers', 'amateurs de plein air'],
};

const restaurants = [
  {
    name: 'La Cuisine',
    city: "L'Anse-Saint-Jean",
    type: 'Gastronomique',
    speciality: 'Cuisine régionale et produits locaux',
    price: '$$$',
    mustTry: 'Tartare de saumon sauvage',
    schedule: 'Mercredi au dimanche',
    image: '/images/restos/anse-saint-jean/restaurant-la-fringale-anse-saint-jean.avif',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=La+Cuisine+L%27Anse-Saint-Jean',
    reserveUrl: '',
    vibe: 'Table chaleureuse avec accent terroir et vue inspirante sur la région',
    tip: 'Réserve à l’avance en haute saison ou les weekends d’automne.',
  },
  {
    name: 'Café du Quai',
    city: "L'Anse-Saint-Jean",
    type: 'Bistro',
    speciality: 'Fruits de mer et cuisine bistro',
    price: '$$',
    mustTry: 'Fish & chips au poisson local',
    schedule: 'Tous les jours en saison',
    image: '/images/restos/anse-saint-jean/cafe-du-quai-anse-saint-jean.avif',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+du+Quai+L%27Anse-Saint-Jean',
    reserveUrl: '',
    vibe: 'Ambiance simple, conviviale et parfaite après une journée dehors',
    tip: 'Très agréable pour un dîner sans trop se compliquer la vie.',
  },
  {
    name: 'Nuances de grains',
    city: "L'Anse-Saint-Jean",
    type: 'Boulangerie-Café',
    speciality: 'Pains et viennoiseries maison',
    price: '$',
    mustTry: 'Pain aux noix et raisins',
    schedule: 'Mardi au dimanche',
    image: '/images/restos/anse-saint-jean/nuances-de-grain-boulangerie-anse-saint-jean.avif',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Boulangerie+Artisanale+L%27Anse-Saint-Jean',
    reserveUrl: '',
    vibe: 'Pause locale douce et authentique pour le matin ou le goûter',
    tip: 'Passe tôt pour avoir le meilleur choix de pains et viennoiseries.',
  },
];

const faqItems = [
  {
    question: "Que faire à L'Anse-Saint-Jean en famille ?",
    answer:
      'L’Anse-Saint-Jean est idéale pour les familles grâce à sa plage municipale, ses balades faciles, ses activités nautiques encadrées et ses paysages spectaculaires accessibles sans trop de logistique.',
  },
  {
    question: "Combien de temps faut-il pour visiter L'Anse-Saint-Jean ?",
    answer:
      'Un séjour de 2 à 3 jours permet déjà de profiter du village, du fjord, d’une activité phare comme le kayak ou la via ferrata, et de prendre le temps de découvrir les environs sans courir.',
  },
  {
    question: "Quelle est la meilleure saison pour visiter L'Anse-Saint-Jean ?",
    answer:
      'L’été et le début de l’automne sont parfaits pour le kayak, les randonnées et les panoramas sur le fjord. L’hiver est excellent pour le ski et les activités de montagne au Mont-Édouard.',
  },
  {
    question: "Faut-il réserver l'hébergement à l'avance ?",
    answer:
      'Oui, surtout en haute saison estivale, pendant les couleurs d’automne et durant les périodes de ski. Les plus beaux hébergements avec vue partent souvent rapidement.',
  },
];

export default function BlogArticleAnseSaintJean() {
  const hotels = pickHotels(HOTEL_IDS_ANSE_SAINT_JEAN);

  const ctaBookingUrl = bookingAwin('https://www.booking.com/city/ca/l-anse-saint-jean.html');

  return (
    <DestinationArticleTemplate
      slug="anse-saint-jean"
      title="L'Anse-Saint-Jean - Perle du Fjord du Saguenay"
      subtitle="Découvrez ce village pittoresque niché au cœur du fjord, où nature grandiose et traditions maritimes se rencontrent."
      toc={[
        { id: 'intro', label: 'Introduction' },
        { id: 'why', label: 'Pourquoi visiter' },
        { id: 'activities', label: 'Activités & attractions' },
        { id: 'kids', label: 'Activités pour enfants' },
        { id: 'teens', label: 'Activités pour ados / actifs' },
        { id: 'ou-dormir', label: 'Où dormir' },
        { id: 'ou-manger', label: 'Où manger' },
        { id: 'faq', label: 'FAQ' },
        { id: 'getting-there', label: "Comment s'y rendre" },
        { id: 'tips', label: 'Conseils pratiques' },
        { id: 'cta', label: 'Réserver & liens utiles' },
      ]}
      hotelIntro={{
        title: "Où dormir à L'Anse-Saint-Jean",
        text: 'Pour profiter pleinement du fjord et du village, mieux vaut choisir un hébergement confortable, paisible et bien situé selon ton style de séjour.',
      }}
      restaurantIntro={{
        title: "Où manger à L'Anse-Saint-Jean",
        text: 'Entre table chaleureuse, pause bistro et boulangerie artisanale, L’Anse-Saint-Jean offre des adresses simples et agréables qui prolongent très bien l’expérience nature.',
      }}
      faqIntro={{
        title: "FAQ sur L'Anse-Saint-Jean",
        text: 'Voici quelques réponses utiles pour préparer plus facilement ton séjour.',
      }}
      hotelSection={<HotelGrid items={hotels} />}
      restaurantSection={<RestaurantPremiumGrid items={restaurants} />}
      faqSection={<DestinationFaq items={faqItems} />}
      quickFacts={[
        { label: 'Région', value: 'Saguenay–Lac-Saint-Jean' },
        { label: 'Durée idéale', value: '2 à 3 jours' },
        { label: 'Expérience phare', value: 'Fjord + kayak + montagne' },
        { label: 'Budget', value: 'Variable selon hébergement et activités' },
      ]}
      utilityLinks={[
        { label: '🗺 Planifier mon itinéraire', href: '/planificateur' },
        { label: '🚗 Guide voyage en voiture', href: '/blog/voyage-voiture', variant: 'outline' },
        { label: '🏕 Voir d’autres destinations nature', href: '/blog', variant: 'outline' },
      ]}
      hero={{
        eyebrow: 'Guide destination',
        image: (
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="relative mx-auto aspect-square w-full max-w-[900px]">
              <Image
                src="/images/destinations/anse-saint-jean.avif"
                alt="L'Anse-Saint-Jean et le fjord du Saguenay"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-gray-900">
                  Un des plus beaux villages du fjord
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Fjord, montagne, village authentique et activités plein air dans un décor
                  marquant.
                </p>
              </div>
            </div>
          </div>
        ),
        caption:
          "L'Anse-Saint-Jean séduit par son fjord spectaculaire, son cachet authentique et ses activités de plein air en toute saison.",
      }}
    >
      <section id="intro" className="prose mb-12 lg:prose-xl">
        <p>
          L&apos;Anse-Saint-Jean, joyau du fjord du Saguenay, est un village pittoresque qui allie
          patrimoine maritime, paysages saisissants et activités de plein air. Ici, tout respire la
          beauté brute du Québec : les montagnes plongent dans le fjord, les maisons ont du
          caractère et chaque détour donne envie de ralentir un peu.
        </p>

        <div className="my-8">
          <Image
            src="/images/destinations/anse-saint-jean.avif"
            alt="L'Anse-Saint-Jean et son fjord"
            width={800}
            height={500}
            className="h-auto w-full rounded-lg object-cover shadow-lg"
          />
        </div>

        <p>
          Que vous veniez pour une escapade romantique, un séjour en famille ou une aventure plus
          sportive, L&apos;Anse-Saint-Jean offre un équilibre rare entre sérénité, nature et
          découvertes. C&apos;est un endroit qui marque, avec une atmosphère paisible mais jamais
          vide.
        </p>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi visiter L&apos;Anse-Saint-Jean ?
        </H2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Fjord majestueux</H3>
            <p className="text-gray-600">
              Un décor spectaculaire parmi les plus impressionnants du Québec, entre falaises, eau
              profonde et lumière changeante.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Village authentique</H3>
            <p className="text-gray-600">
              Une ambiance chaleureuse, un vrai cachet patrimonial et ce sentiment rare d’être dans
              un lieu encore profondément vivant.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 text-xl font-semibold">Activités 4 saisons</H3>
            <p className="text-gray-600">
              Kayak, randonnée, ski, vélo, via ferrata… il y a toujours une bonne raison d’y
              revenir.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Waves className="size-8 text-indigo-600" />
          Activités et attractions
        </H2>

        <div className="space-y-8">
          {[
            {
              name: 'Croisière sur le Fjord',
              type: 'Navigation',
              duration: '2 à 3 heures',
              price: 'À partir de 69$/personne',
              description:
                'Une belle manière de découvrir la grandeur du fjord et ses paysages autrement, avec un point de vue très immersif.',
            },
            {
              name: 'Mont-Édouard',
              type: 'Montagne',
              duration: 'Variable',
              price: 'À partir de 45$/jour',
              description:
                'Destination phare en hiver pour le ski, mais aussi très intéressante en été pour la randonnée, le vélo et les panoramas.',
            },
            {
              name: 'Kayak de mer',
              type: 'Nautique',
              duration: '2 à 4 heures',
              price: 'À partir de 75$/personne',
              description:
                'Une activité mémorable pour approcher le fjord au plus près, dans une ambiance à la fois sportive et contemplative.',
            },
            {
              name: 'Via Ferrata du Fjord',
              type: 'Aventure',
              duration: 'Environ 3 heures',
              price: 'À partir de 89$/personne',
              description:
                'Pour ceux qui aiment les sensations et les points de vue spectaculaires, c’est une expérience forte du secteur.',
            },
          ].map((activity) => (
            <div key={activity.name} className="overflow-hidden rounded-lg bg-white shadow-md">
              <div className="p-6">
                <H3 className="mb-2 text-xl font-semibold text-gray-900">{activity.name}</H3>
                <p className="mb-4 text-gray-600">{activity.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Type : {activity.type}</span>
                  <span>Durée : {activity.duration}</span>
                  <span>Prix : {activity.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Activités pour enfants
        </H2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: 'Plage municipale',
              description: 'Baignade, détente et jeux simples dans un cadre paisible.',
              price: 'Gratuit',
            },
            {
              title: 'Petit train du Fjord',
              description: 'Une activité douce et agréable pour découvrir le village autrement.',
              price: '15$/adulte, 8$/enfant',
            },
            {
              title: 'Initiation au kayak',
              description: 'Première approche encadrée dans un environnement plus calme.',
              price: 'À partir de 45$/personne',
            },
          ].map((activity) => (
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
          Activités pour adolescents
        </H2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: 'École de voile',
              description: 'Initiation motivante pour les jeunes qui aiment bouger et apprendre.',
              price: 'À partir de 85$/personne',
              duration: '3 heures',
            },
            {
              title: 'Vélo de montagne',
              description: 'Sentiers intéressants autour du Mont-Édouard pour les plus actifs.',
              price: 'À partir de 45$/jour',
              duration: 'À votre rythme',
            },
            {
              title: 'Randonnée alpine',
              description: 'Une belle activité pour les ados qui aiment les vues et l’effort.',
              price: 'À partir de 55$/personne',
              duration: '4 à 5 heures',
            },
          ].map((activity) => (
            <div key={activity.title} className="rounded-lg bg-white p-6 shadow-md">
              <H3 className="mb-2 text-xl font-semibold text-gray-900">{activity.title}</H3>
              <p className="mb-2 text-gray-600">{activity.description}</p>
              <div className="mt-4 flex flex-col gap-1">
                <p className="font-medium text-indigo-600">{activity.price}</p>
                <p className="text-sm text-gray-500">Durée : {activity.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16" id="ou-dormir">
        <HotelGrid items={hotels} />
      </section>

      <section className="mb-16" id="ou-manger">
        <RestaurantPremiumGrid items={restaurants} />
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Bus className="size-8 text-indigo-600" />
          Comment s&apos;y rendre ?
        </H2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Depuis les grandes villes</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Environ 5h30 en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Environ 3h30 en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus interrégional jusqu&apos;à Chicoutimi puis transfert local
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-4 text-xl font-semibold">Sur place</H3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Voiture recommandée pour profiter pleinement du secteur
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Certaines activités sont accessibles à pied selon votre hébergement
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Vélo et activités nautiques disponibles en saison
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Calendar className="size-8 text-indigo-600" />
          Conseils pratiques
        </H2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Calendar className="size-5 text-indigo-600" />
              Meilleure période
            </H3>
            <p className="text-gray-600">
              L’été et l’automne sont magnifiques pour le fjord, tandis que l’hiver est parfait pour
              le ski et l’ambiance montagne.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Comptez selon le niveau d’hébergement choisi, mais prévoyez un budget variable selon
              les activités de plein air et la saison.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À noter
            </H3>
            <p className="text-gray-600">
              Réservez tôt en haute saison. Même en été, il vaut mieux prévoir une couche chaude,
              surtout près de l’eau ou en altitude.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <DestinationFaq items={faqItems} />
      </section>

      <section className="rounded-lg bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">
          Prêt à découvrir L&apos;Anse-Saint-Jean ?
        </H2>
        <p className="mb-6 text-gray-600">
          Réservez votre séjour maintenant et explorez l’un des plus beaux coins du fjord du
          Saguenay.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href={ctaBookingUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="rounded-lg bg-indigo-500 px-6 py-3 text-white transition-colors hover:bg-indigo-800"
          >
            Réserver un hébergement
          </a>
          <a
            href="https://www.tourisme-saguenay.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-indigo-600 bg-white px-6 py-3 text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            Explorer la région
          </a>
        </div>
      </section>
    </DestinationArticleTemplate>
  );
}
