import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { ConclusionLinks } from '@/components/TravelContentKit';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_FORILLON } from '@/data/hotels/byArticle/forillon';
import {
  Calendar,
  Clock3,
  Compass,
  Camera,
  MapPinned,
  Mountain,
  Shield,
  Star,
  Tent,
  Trees,
  Waves,
  Binoculars,
} from 'lucide-react';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

export const metadata = {
  slug: 'forillon',
  ville: 'Forillon',
  resume:
    "Forillon est l'une des plus belles portes d'entrée vers la Gaspésie sauvage : falaises, mer, randonnées, faune, camping et points de vue spectaculaires.",
  activites: [
    'Randonnée Les Graves',
    'Mont Saint-Alban',
    'Phare de Cap-des-Rosiers',
    'Plage de Cap-Bon-Ami',
    'Observation de la faune',
    'Kayak de mer',
    'Camping dans le parc',
    'Road trip vers Gaspé',
  ],
  hebergements: [
    'Auberge Griffon Aventure',
    'Hôtel Baker',
    'Auberge sous Les Arbres',
    'Motel Adams',
  ],
  publics: ['familles', 'couples', 'ados', 'randonneurs', 'aventuriers', 'amoureux de nature'],
};

const hotels = pickHotels(HOTEL_IDS_FORILLON);

const restaurants = [
  {
    name: 'Bistro Le Clapotis',
    city: 'Gaspé / secteur Forillon',
    type: 'Cuisine locale et fruits de mer',
    speciality: 'Poissons frais, saveurs gaspésiennes et ambiance maritime',
    price: '$$$',
    mustTry: 'Poisson du jour ou assiette de fruits de mer',
    schedule: 'Horaires variables selon la saison',
  },
  {
    name: 'Café des Artistes',
    city: 'Gaspé',
    type: 'Café-resto chaleureux',
    speciality: 'Pause gourmande, sandwichs, desserts et plats simples',
    price: '$$',
    mustTry: 'Sandwich maison ou dessert du jour',
    schedule: 'Horaires variables selon la saison touristique',
  },
  {
    name: 'La Cantina du Pêcheur',
    city: 'Gaspé / Cap-des-Rosiers',
    type: 'Cantine maritime',
    speciality: 'Repas décontracté après randonnée ou journée au bord de l’eau',
    price: '$$',
    mustTry: 'Fish & chips ou guédille aux fruits de mer',
    schedule: 'Surtout en période estivale',
  },
];

const camping = [
  {
    name: 'Camping Des-Rosiers',
    type: 'Camping aménagé',
    description:
      'Une option pratique pour dormir près du secteur nord du parc, avec une ambiance nature et un accès efficace aux principaux points d’intérêt.',
    price: 'Budget variable selon la saison',
    facilities: ['Bloc sanitaire', 'Espaces aménagés', 'Accès facile au parc'],
  },
  {
    name: 'Camping Cap-Bon-Ami',
    type: 'Camping rustique',
    description:
      'Une expérience plus immersive, parfaite pour profiter du calme, des falaises et de l’ambiance maritime de Forillon.',
    price: 'Budget variable selon la saison',
    facilities: ['Cadre exceptionnel', 'Ambiance nature', 'Départ idéal tôt le matin'],
  },
  {
    name: 'Camping Petit-Gaspé',
    type: 'Camping familial près de la mer',
    description:
      'Un bon choix pour les familles et les voyageurs qui veulent combiner plage, sentiers, pique-nique et accès aux secteurs populaires du parc.',
    price: 'Budget variable selon la saison',
    facilities: ['Proximité de la plage', 'Ambiance familiale', 'Accès aux sentiers'],
  },
];

const mustDoActivities = [
  {
    name: 'Randonnée Les Graves jusqu’au bout du monde',
    icon: <Mountain className="size-5 text-indigo-600" />,
    description:
      'Le sentier Les Graves est l’une des expériences fortes de Forillon. Il longe le littoral, traverse des paysages maritimes puissants et mène vers Cap-Gaspé, un secteur qui donne vraiment l’impression d’arriver au bout du monde.',
    details:
      'À prévoir : bonnes chaussures, eau, coupe-vent et marge dans l’horaire. La version complète demande plusieurs heures.',
  },
  {
    name: 'Monter au Mont Saint-Alban',
    icon: <Compass className="size-5 text-indigo-600" />,
    description:
      'Le Mont Saint-Alban est parfait si tu veux une vue panoramique forte sans transformer ta journée en expédition extrême. C’est l’un des meilleurs points de vue pour ressentir la rencontre entre mer, falaises et forêt.',
    details:
      'Très bon choix pour couples, ados actifs, amateurs de photo et voyageurs qui veulent un moment “wow”.',
  },
  {
    name: 'Voir le phare de Cap-des-Rosiers',
    icon: <Camera className="size-5 text-indigo-600" />,
    description:
      'Le phare de Cap-des-Rosiers est un arrêt facile à intégrer dans une journée à Forillon. C’est un bon mélange de patrimoine, de paysage côtier et de pause photo.',
    details: 'Idéal en début ou fin de journée pour profiter d’une plus belle lumière.',
  },
  {
    name: 'Se poser à Cap-Bon-Ami',
    icon: <Waves className="size-5 text-indigo-600" />,
    description:
      'Cap-Bon-Ami est l’un des endroits les plus marquants du parc : falaises, galets, mer, oiseaux et lumière changeante. Même une courte pause ici peut devenir un souvenir fort.',
    details: 'Apporte une couche chaude : le vent peut changer l’ambiance très vite.',
  },
  {
    name: 'Observer la faune',
    icon: <Binoculars className="size-5 text-indigo-600" />,
    description:
      'Forillon est excellent pour observer oiseaux marins, phoques et parfois des mammifères marins au large. Ce n’est pas seulement une destination de randonnée : c’est aussi un lieu vivant.',
    details: 'Des jumelles changent vraiment l’expérience, surtout avec les enfants.',
  },
  {
    name: 'Faire du kayak de mer',
    icon: <Waves className="size-5 text-indigo-600" />,
    description:
      'Le kayak de mer permet de découvrir Forillon depuis l’eau, avec une perspective complètement différente sur les falaises et le littoral.',
    details:
      'À privilégier avec un prestataire encadré si tu veux une sortie sécuritaire et plus sereine.',
  },
];

const familyActivities = [
  {
    title: 'Découvrir les marées et le bord de mer',
    description:
      'Une activité simple, gratuite ou peu coûteuse, parfaite pour les enfants curieux. On observe, on cherche, on pose des questions, et le décor fait le reste.',
    price: 'Très abordable',
  },
  {
    title: 'Petites randonnées accessibles',
    description:
      'Forillon peut se vivre en famille sans tout faire. Choisis des sections courtes, ajoute des pauses photo et garde un rythme souple.',
    price: 'Coût surtout lié à l’accès au parc',
  },
  {
    title: 'Pique-nique avec vue',
    description:
      'Un classique qui fonctionne toujours : sandwichs, gourdes, couverture, point de vue et temps libre. Simple, beau, efficace.',
    price: 'Budget flexible',
  },
];

const teenActivities = [
  {
    title: 'Mont Saint-Alban',
    description:
      'Une randonnée motivante pour les ados : effort raisonnable, vraie récompense visuelle et photos spectaculaires.',
    price: 'Frais variables selon accès / stationnement',
    duration: 'Demi-journée',
  },
  {
    title: 'Kayak de mer',
    description:
      'Très bon choix pour les ados qui aiment bouger, sortir du cadre et vivre une activité plus immersive.',
    price: 'Variable selon le prestataire',
    duration: '2 à 3 heures environ',
  },
  {
    title: 'Road trip photo dans le parc',
    description:
      'Falaises, phares, plages, mer, forêt : Forillon est parfait pour une journée visuelle avec plusieurs arrêts courts.',
    price: 'Faible à modéré',
    duration: 'Flexible',
  },
];

const practicalCards = [
  {
    title: 'Pourquoi Forillon plaît autant',
    icon: <Star className="size-5 text-indigo-600" />,
    text: 'Parce qu’on y ressent vraiment la rencontre entre la mer, la montagne et la forêt. C’est spectaculaire, apaisant et profondément gaspésien.',
  },
  {
    title: 'Pour quel type de voyage',
    icon: <MapPinned className="size-5 text-indigo-600" />,
    text: 'Forillon fonctionne très bien pour un road trip en Gaspésie, un séjour nature, une escapade active, un voyage photo ou quelques jours de camping.',
  },
  {
    title: 'Le détail qui marque',
    icon: <Trees className="size-5 text-indigo-600" />,
    text: 'La sensation d’espace. On n’a pas juste l’impression de visiter un parc : on sent qu’on entre dans un territoire fort.',
  },
];

export default function BlogArticleForillon() {
  return (
    <DestinationArticleTemplate
      slug="forillon"
      title="Forillon : que faire, où dormir et comment profiter de ce joyau de la Gaspésie"
      subtitle="Falaises, mer, sentiers panoramiques, camping, faune, plages et points de vue : voici le guide complet pour visiter le parc national Forillon sans passer à côté de l’essentiel."
      hero={{
        eyebrow: 'Gaspésie',
        image: (
          <Image
            src="/images/destinations/forillon.avif"
            alt="Falaises et mer au parc national Forillon en Gaspésie"
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
          />
        ),
        caption:
          'Forillon est l’un des plus beaux secteurs de la Gaspésie pour marcher entre mer, falaises et montagne.',
      }}
      quickFacts={[
        { label: 'Région', value: 'Gaspésie' },
        { label: 'Durée idéale', value: '1 à 3 jours' },
        { label: 'À ne pas manquer', value: 'Les Graves, Mont Saint-Alban, Cap-Bon-Ami' },
        { label: 'Style de voyage', value: 'Nature, randonnée, camping, famille, photo' },
      ]}
      utilityLinks={[
        { label: 'Planifier mon itinéraire', href: '/planificateur' },
        { label: 'Voir les vidéos', href: '/videos', variant: 'outline' },
        { label: 'Explorer les producteurs locaux', href: '/producteurs', variant: 'soft' },
      ]}
      hotelIntro={{
        title: 'Où dormir près de Forillon ?',
        text: 'Pour profiter du parc sans courir, choisis un hébergement à proximité de Gaspé, Cap-des-Rosiers ou des secteurs du parc. Tu peux dormir en camping pour l’immersion ou choisir un hôtel/auberge pour plus de confort.',
      }}
      hotelSection={<HotelGrid items={hotels} />}
      restaurantIntro={{
        title: 'Où manger près de Forillon et Gaspé ?',
        text: 'Après une journée au grand air, vise simple et local : fruits de mer, cantines, cafés chaleureux, fish & chips, guédilles et adresses faciles autour de Gaspé.',
      }}
      restaurantSection={<RestaurantPremiumGrid items={restaurants} />}
      conclusion={{
        title: 'Mon avis sur Forillon',
        text: 'Forillon est une destination qui mérite plus qu’un simple passage rapide. Le parc est spectaculaire, mais il devient vraiment mémorable quand on lui laisse du temps : une randonnée, un coucher de soleil, un pique-nique, une nuit proche du parc et quelques arrêts spontanés. C’est exactement le genre d’étape qui donne de la profondeur à un road trip en Gaspésie.',
        ctas: [
          { label: 'Créer mon itinéraire', href: '/planificateur', variant: 'primary' },
          { label: 'Voir les destinations de Gaspésie', href: '/blog', variant: 'outline' },
        ],
      }}
    >
      <section className="space-y-14">
        <section className="rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 p-6 md:p-8">
          <H2 className="mb-4">Forillon en un coup d’œil</H2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                <Clock3 className="size-5 text-indigo-600" />
                Temps conseillé
              </div>
              <p className="text-sm text-gray-600">
                1 jour pour voir l’essentiel, 2 à 3 jours pour vraiment savourer.
              </p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                <Compass className="size-5 text-indigo-600" />
                Ambiance
              </div>
              <p className="text-sm text-gray-600">
                Nature grandiose, air marin, falaises, randonnées, faune et liberté.
              </p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                <Tent className="size-5 text-indigo-600" />
                Profil idéal
              </div>
              <p className="text-sm text-gray-600">
                Couples, familles, campeurs, randonneurs, photographes et amateurs de road trip.
              </p>
            </div>
          </div>
        </section>

        <section className="prose max-w-none lg:prose-lg">
          <p>
            À l’extrémité de la péninsule gaspésienne, <strong>Forillon</strong> fait partie de ces
            lieux qui donnent immédiatement l’impression d’être plus loin, plus libre, plus proche
            des éléments. La mer, les falaises, les plages de galets, les sentiers, les phares et la
            forêt créent une destination complète, à la fois accessible et spectaculaire.
          </p>

          <p>
            C’est aussi une excellente étape pour structurer un{' '}
            <Link href="/planificateur" className="font-semibold underline">
              road trip en Gaspésie
            </Link>
            . Tu peux l’intégrer après Percé, avant Gaspé, ou en faire une base de séjour de deux ou
            trois jours si tu veux marcher, camper, observer la faune et prendre ton temps.
          </p>

          <p>
            Le vrai secret de Forillon, c’est de ne pas vouloir tout cocher trop vite. Le parc se
            vit mieux avec un peu d’espace : une randonnée forte, une pause à Cap-Bon-Ami, une
            soirée tranquille, un pique-nique, puis peut-être une sortie en mer ou une journée plus
            lente autour de Gaspé.
          </p>
        </section>

        <section>
          <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Star className="size-8 text-indigo-600" />
            Pourquoi visiter Forillon ?
          </H2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {practicalCards.map((card) => (
              <div key={card.title} className="rounded-2xl bg-white p-6 shadow-md">
                <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900">
                  {card.icon}
                  {card.title}
                </H3>
                <p className="text-gray-600">{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <H2 className="mb-8">Que faire à Forillon : les activités à ne pas manquer</H2>

          <div className="space-y-5">
            {mustDoActivities.map((activity) => (
              <div
                key={activity.name}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-gray-900">
                  {activity.icon}
                  {activity.name}
                </H3>
                <p className="mb-2 text-gray-700">{activity.description}</p>
                <p className="text-sm text-gray-500">{activity.details}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <H2>Forillon avec des enfants : simple, nature et vraiment marquant</H2>
          <p className="mt-3 text-gray-700">
            Forillon fonctionne très bien en famille, surtout si tu adaptes le rythme. Les enfants
            n’ont pas besoin d’un programme compliqué : la mer, les galets, les oiseaux, les
            belvédères et les pique-niques suffisent souvent à créer une journée mémorable.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {familyActivities.map((activity) => (
              <div key={activity.title} className="rounded-2xl bg-white p-6 shadow-md">
                <H3 className="mb-3 text-xl font-semibold text-gray-900">{activity.title}</H3>
                <p className="mb-3 text-gray-600">{activity.description}</p>
                <p className="font-medium text-indigo-600">{activity.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <H2>Forillon avec des ados : randonnée, kayak et photos</H2>
          <p className="mt-3 text-gray-700">
            Pour les ados, Forillon a un gros avantage : les paysages sont assez forts pour donner
            envie de bouger. Une montée, un phare, une sortie en mer ou quelques arrêts photo
            transforment vite la visite en vraie aventure.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            {teenActivities.map((activity) => (
              <div key={activity.title} className="rounded-2xl bg-white p-6 shadow-md">
                <H3 className="mb-3 text-xl font-semibold text-gray-900">{activity.title}</H3>
                <p className="mb-3 text-gray-600">{activity.description}</p>
                <div className="space-y-1">
                  <p className="font-medium text-indigo-600">{activity.price}</p>
                  <p className="text-sm text-gray-500">Durée : {activity.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Tent className="size-8 text-indigo-600" />
            Camper à Forillon
          </H2>

          <p className="mb-6 text-gray-700">
            Dormir en camping à Forillon, c’est souvent la meilleure façon de vivre le parc. Tu
            profites davantage du calme du soir, de la lumière du matin et tu évites les longs
            allers-retours avant les randonnées.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {camping.map((site) => (
              <div key={site.name} className="rounded-2xl bg-white p-6 shadow-md">
                <H3 className="mb-2 text-xl font-semibold text-gray-900">{site.name}</H3>
                <p className="mb-2 text-sm font-medium text-indigo-600">{site.type}</p>
                <p className="mb-4 text-gray-600">{site.description}</p>
                <p className="mb-4 font-medium text-gray-800">{site.price}</p>
                <div className="flex flex-wrap gap-2">
                  {site.facilities.map((facility) => (
                    <span
                      key={facility}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <H2>Comment se rendre à Forillon ?</H2>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <H3 className="mb-4 text-xl font-semibold">Le plus simple</H3>
              <ul className="space-y-3 text-gray-700">
                <li>• En voiture, dans le cadre d’un road trip en Gaspésie.</li>
                <li>• En combinant Gaspé + Forillon pour un séjour de quelques jours.</li>
                <li>• En réservant tôt en haute saison, surtout pour le camping.</li>
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-md">
              <H3 className="mb-4 text-xl font-semibold">À garder en tête</H3>
              <ul className="space-y-3 text-gray-700">
                <li>• La voiture reste la solution la plus souple.</li>
                <li>
                  • Les distances en Gaspésie sont longues : évite les journées trop chargées.
                </li>
                <li>• Certaines randonnées sont plus agréables tôt le matin.</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Calendar className="size-8 text-indigo-600" />
            Conseils pratiques pour profiter de Forillon
          </H2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <Calendar className="size-5 text-indigo-600" />
                Meilleure période
              </H3>
              <p className="text-gray-600">
                La belle saison est la plus simple pour les sentiers, le camping, les plages et les
                sorties en mer. L’automne peut être superbe, plus calme, mais plus frais.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <Shield className="size-5 text-indigo-600" />À prévoir
              </H3>
              <p className="text-gray-600">
                Coupe-vent, eau, chaussures confortables, jumelles, appareil photo et marge dans
                l’horaire. À Forillon, tu vas souvent vouloir t’arrêter plus longtemps que prévu.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-md">
              <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
                <Clock3 className="size-5 text-indigo-600" />
                Bon rythme
              </H3>
              <p className="text-gray-600">
                Choisis deux ou trois expériences fortes au lieu d’empiler les arrêts. Forillon est
                plus beau quand on lui laisse de la place.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-slate-50 p-6 md:p-8">
          <H2 className="mb-4">Continuer ton voyage après Forillon</H2>
          <p className="mb-4 text-gray-700">
            Forillon se combine très bien avec Percé, Gaspé, Bonaventure, Carleton-sur-Mer ou un
            grand tour de la Gaspésie. Pour construire une boucle équilibrée, pense à alterner les
            grosses journées de route, les randonnées et les pauses plus lentes.
          </p>

          <p className="text-gray-700">
            Tu peux aussi utiliser le{' '}
            <Link href="/planificateur" className="font-semibold underline">
              planificateur GoQuébeCAN
            </Link>{' '}
            pour organiser tes étapes, ajouter des producteurs locaux et garder une vue claire sur
            ton itinéraire.
          </p>
        </section>

        <ConclusionLinks
          items={[
            { href: '/planificateur', label: 'Planifier mon itinéraire' },
            { href: '/blog/voyage-camping', label: 'Guide camping' },
            { href: '/blog/voyage-hotel', label: 'Indispensables pour l’hôtel' },
            { href: '/blog/voyage-voiture', label: 'Voyage en voiture' },
          ]}
        />
      </section>
    </DestinationArticleTemplate>
  );
}
