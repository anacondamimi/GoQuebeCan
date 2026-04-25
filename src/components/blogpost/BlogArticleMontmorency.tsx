import Image from 'next/image';
import React from 'react';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';
import DestinationFaq from '@/components/blog/DestinationFaq';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_MONTMORENCY } from '@/data/hotels/byArticle/montmorency';
import { bookingAwin } from '@/lib/awin';
import { NearbyDestinations } from '@/components/blog/NearbyDestinations';
import {
  
  Bus,
  Calendar,

  Star,
  Trees,
  Camera,
  Map,
} from 'lucide-react';

export const metadata = {
  slug: 'montmorency',
  ville: 'Montmorency',
  resume:
    'Que faire à la Chute Montmorency ? Guide complet pour visiter la passerelle, le téléphérique, les sentiers, la via ferrata, les activités en famille, les meilleurs points de vue, où dormir et où manger près de Québec.',
  activites: [
    'Passerelle suspendue',
    'Téléphérique panoramique',
    'Escalier panoramique',
    'Via ferrata',
    'Tyrolienne',
    'Sentiers autour de la chute',
    'Manoir Montmorency',
    'Belvédères photo',
    'Balade près du fleuve',
  ],
  hebergements: ['Manoir Montmorency', 'Auberge Baker', 'Comfort Inn Beauport'],
  publics: ['familles', 'couples', 'aventuriers', 'photographes', 'visiteurs de Québec'],
};

const hotels = pickHotels(HOTEL_IDS_MONTMORENCY);

const restaurants = [
  {
    name: 'Manoir Montmorency',
    city: 'Québec / Chute Montmorency',
    type: 'Restaurant avec vue',
    speciality: 'Cuisine québécoise et cadre panoramique',
    price: '$$$',
    mustTry: 'Table d’hôte ou plat de saison avec vue sur la chute',
    schedule: 'Selon saison et horaires du site',
    image: '/images/destinations/chute-montmorency.avif',
    vibe: 'Panoramique & élégant',
    tip: 'Très bon choix si tu veux vivre l’expérience complète directement sur le site.',
  },
  {
    name: 'Auberge Baker',
    city: 'Château-Richer',
    type: 'Restaurant chaleureux',
    speciality: 'Cuisine généreuse et ambiance d’auberge',
    price: '$$$',
    mustTry: 'Cuisine du terroir et desserts maison',
    schedule: 'Selon horaires',
    image: '/images/carte.avif',
    vibe: 'Chaleureux & gourmand',
    tip: 'Pratique si tu combines la chute avec une balade vers l’Île d’Orléans ou la Côte-de-Beaupré.',
  },
  {
    name: 'Restaurants du Vieux-Québec',
    city: 'Québec',
    type: 'Option variée',
    speciality: 'Bistros, brunchs, tables gourmandes et adresses familiales',
    price: '$$ à $$$$',
    mustTry: 'Selon tes envies du moment',
    schedule: 'Variable',
    image: '/images/carte.avif',
    vibe: 'Flexible & vivant',
    tip: 'Idéal si tu visites la chute en demi-journée puis poursuis ta journée dans Québec.',
  },
];

const activities = [
  {
    name: 'Passerelle suspendue',
    type: 'Incontournable',
    duration: '20 à 45 min',
    price: 'Accès selon billet / site',
    description:
      'C’est le grand classique : traverser au-dessus de la chute et profiter d’une vue spectaculaire sur l’eau, la falaise et le fleuve.',
    tip: 'Très belle lumière le matin et en fin de journée pour les photos.',
    link: 'https://www.sepaq.com/ct/pcm/',
  },
  {
    name: 'Téléphérique panoramique',
    type: 'Observation',
    duration: '20 à 30 min',
    price: 'Accès selon billet / site',
    description:
      'Parfait si tu veux profiter de la vue sans trop marcher et relier facilement le bas et le haut du site.',
    tip: 'Très pratique avec enfants ou si tu veux économiser tes jambes avant d’autres visites.',
    link: 'https://www.sepaq.com/ct/pcm/',
  },
  {
    name: 'Escalier panoramique',
    type: 'Balade sportive',
    duration: '30 à 60 min',
    price: 'Inclus selon accès au site',
    description:
      'Une expérience visuelle très forte avec plusieurs angles sur la chute. Ça grimpe, mais la récompense est réelle.',
    tip: 'Prévois de bonnes chaussures et prends ton temps pour profiter des belvédères.',
    link: 'https://www.sepaq.com/ct/pcm/',
  },
  {
    name: 'Via ferrata',
    type: 'Aventure',
    duration: '2 à 3 h',
    price: 'Variable selon forfait',
    description:
      'Pour ceux qui veulent une activité plus intense, avec une vraie dose d’adrénaline et une vue unique sur la chute.',
    tip: 'Réservation fortement conseillée en haute saison.',
    link: 'https://www.sepaq.com/ct/pcm/',
  },
  {
    name: 'Tyrolienne',
    type: 'Adrénaline',
    duration: '15 à 30 min',
    price: 'Variable selon forfait',
    description:
      'Une façon mémorable de vivre le site autrement, avec une traversée spectaculaire au-dessus du décor.',
    tip: 'Excellente activité signature à faire une fois pour marquer le coup.',
    link: 'https://www.sepaq.com/ct/pcm/',
  },
  {
    name: 'Sentiers et belvédères',
    type: 'Nature',
    duration: '45 min à 2 h',
    price: 'Selon accès',
    description:
      'Autour de la chute, plusieurs points de vue permettent d’étirer la visite et de profiter d’un rythme plus doux.',
    tip: 'Très bien si tu veux combiner marche, photos et pauses contemplatives.',
    link: 'https://www.sepaq.com/ct/pcm/',
  },
];

const familyActivities = [
  {
    title: 'Passerelle et belvédères en famille',
    description:
      'Une activité simple et marquante, parfaite pour voir la chute sans organiser une grosse journée compliquée.',
    price: 'Selon accès',
    tip: 'Très bien pour tous les âges si tu veux une sortie visuelle et mémorable.',
  },
  {
    title: 'Téléphérique panoramique',
    description:
      'Pratique, agréable et rassurant pour les familles qui veulent profiter du site avec moins d’effort.',
    price: 'Selon billet',
    tip: 'Idéal avec jeunes enfants ou grands-parents.',
  },
  {
    title: 'Rallye-découverte du site',
    description:
      'Une façon ludique d’intéresser les enfants à l’histoire et au lieu tout en gardant la visite active.',
    price: 'Selon activité disponible',
    tip: 'Très bon complément à une visite plus classique.',
  },
];

const teenActivities = [
  {
    title: 'Via ferrata',
    description:
      'Une excellente option pour les ados et jeunes adultes qui aiment bouger et vivre une activité un peu plus forte.',
    price: 'Variable',
    duration: '2 à 3 h',
    tip: 'Parfait pour transformer la visite en vraie expérience.',
  },
  {
    title: 'Tyrolienne',
    description:
      'Une activité courte mais marquante, très efficace si tu veux ajouter un vrai moment “wow” à la journée.',
    price: 'Variable',
    duration: '15 à 30 min',
    tip: 'Très bon souvenir à partager en duo ou en famille.',
  },
  {
    title: 'Escalier + photos + Québec ensuite',
    description:
      'Un bon combo si tu veux une visite active, quelques belles photos, puis poursuivre la journée dans la ville.',
    price: 'Faible à modéré',
    duration: '1 à 2 h',
    tip: 'Bonne option pour ceux qui aiment les journées variées.',
  },
];

const panoramas = [
  {
    title: 'La passerelle suspendue',
    description:
      'Le point de vue signature. C’est ici que la puissance de la chute frappe le plus fort.',
  },
  {
    title: 'Le pied de la chute',
    description:
      'Une vue très impressionnante, plus immersive, avec le grondement de l’eau et la hauteur réelle du site.',
  },
  {
    title: 'Le Manoir Montmorency',
    description:
      'Très bon spot si tu veux une vision plus élégante, plus dégagée et plus confortable du décor.',
  },
];

const practicalCards = [
  {
    title: 'Durée idéale',
    description:
      'Prévois de 2 à 4 heures pour bien profiter du site sans courir. Une demi-journée fonctionne très bien.',
  },
  {
    title: 'Quand y aller',
    description:
      'Le site est beau toute l’année : été pour les activités, automne pour les couleurs, hiver pour le célèbre pain de glace.',
  },
  {
    title: 'Avec quoi combiner la visite',
    description:
      'Montmorency se combine très bien avec Québec, l’Île d’Orléans, la Côte-de-Beaupré et quelques arrêts gourmands.',
  },
];

const faqItems = [
  {
    question: 'Combien de temps faut-il pour visiter la Chute Montmorency ?',
    answer:
      'La plupart des visiteurs profitent bien du site en 2 à 4 heures. Si tu ajoutes la via ferrata, la tyrolienne ou un repas avec vue, tu peux facilement en faire une demi-journée complète.',
  },
  {
    question: 'La Chute Montmorency vaut-elle le détour si je visite déjà Québec ?',
    answer:
      'Oui, clairement. La chute est tout près de Québec et ajoute une dimension nature, panorama et aventure très complémentaire à une visite plus urbaine du Vieux-Québec.',
  },
  {
    question: 'Peut-on visiter la Chute Montmorency avec des enfants ?',
    answer:
      'Oui. Le site est bien adapté pour une sortie familiale, surtout si tu privilégies les belvédères, la passerelle et le téléphérique.',
  },
  {
    question: 'Quel est le meilleur moment pour voir la Chute Montmorency ?',
    answer:
      'Il n’y a pas une seule bonne réponse : l’été est parfait pour les activités extérieures, l’automne pour les couleurs, et l’hiver pour voir le célèbre pain de glace.',
  },
  {
    question: 'Où dormir pour visiter la Chute Montmorency ?',
    answer:
      'Le plus simple est de dormir à proximité immédiate du site, sur la Côte-de-Beaupré ou dans le secteur de Québec, afin de combiner facilement la chute avec d’autres visites.',
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-100">
      {children}
    </span>
  );
}

function SoftCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <H3>{title}</H3>
      <div className="mt-3 text-sm leading-7 text-gray-700">{children}</div>
    </div>
  );
}

export default function BlogArticleMontmorency() {
  const ctaBookingUrl = bookingAwin('https://www.booking.com/city/ca/quebec.fr.html');

  return (
    <DestinationArticleTemplate
      slug="montmorency"
      title="Chute Montmorency — la sortie spectaculaire à faire près de Québec"
      subtitle="Entre passerelle suspendue, téléphérique, belvédères, aventure et vue sur le fleuve, la Chute Montmorency est l’une des visites les plus marquantes à faire autour de Québec."
      toc={[
        { id: 'intro', label: 'Introduction' },
        { id: 'incontournables', label: 'Pourquoi visiter' },
        { id: 'activities', label: 'Activités & attractions' },
        { id: 'panoramas', label: 'Points de vue' },
        { id: 'kids', label: 'Activités pour familles' },
        { id: 'teens', label: 'Activités pour ados / actifs' },
        { id: 'ou-dormir', label: 'Où dormir' },
        { id: 'ou-manger', label: 'Où manger' },
        { id: 'getting-there', label: "Comment s'y rendre" },
        { id: 'tips', label: 'Conseils pratiques' },
        { id: 'faq', label: 'FAQ' },
        { id: 'cta', label: 'Réserver & liens utiles' },
      ]}
      hotelIntro={{
        title: 'Où dormir près de la Chute Montmorency',
        text: 'Pour profiter du site sans te presser, le plus simple est de choisir un hébergement pratique dans le secteur de Québec, de Beauport ou de la Côte-de-Beaupré.',
      }}
      restaurantIntro={{
        title: 'Où manger près de la Chute Montmorency',
        text: 'Tu peux soit miser sur un repas avec vue directement au site, soit prolonger l’expérience avec une bonne adresse vers Château-Richer, Beauport ou le Vieux-Québec.',
      }}
      faqIntro={{
        title: 'FAQ sur la Chute Montmorency',
        text: 'Voici les réponses aux questions les plus utiles pour organiser ta visite.',
      }}
      hotelSection={<HotelGrid items={hotels} />}
      restaurantSection={<RestaurantPremiumGrid items={restaurants} />}
      faqSection={<DestinationFaq items={faqItems} />}
      quickFacts={[
        { label: 'Région', value: 'Québec / Côte-de-Beaupré' },
        { label: 'Durée idéale', value: '2 à 4 heures' },
        { label: 'Expérience phare', value: 'Passerelle + vue + activités d’aventure' },
        { label: 'Budget', value: 'Flexible : visite simple ou demi-journée plus complète' },
      ]}
      utilityLinks={[
        { label: '🗺 Planifier mon itinéraire', href: '/planificateur' },
        { label: '🍓 Découvrir les producteurs locaux', href: '/producteurs', variant: 'outline' },
        { label: '💛 Voir nos coups de cœur', href: '/coups-de-coeur', variant: 'outline' },
        { label: '🎥 Regarder nos idées en vidéo', href: '/videos', variant: 'outline' },
      ]}
      hero={{
        eyebrow: 'Guide destination',
        image: (
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="relative mx-auto aspect-square w-full max-w-[900px]">
              <Image
                src="/images/destinations/chute-montmorency.avif"
                alt="Chute Montmorency près de Québec"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-gray-900">
                  Une sortie simple à organiser, mais spectaculaire à vivre
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Vue puissante, promenade, téléphérique, belvédères et activités d’aventure à deux
                  pas de Québec.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Chip>Panorama</Chip>
                <Chip>Famille</Chip>
                <Chip>Aventure</Chip>
                <Chip>Québec</Chip>
              </div>
            </div>
          </div>
        ),
        caption:
          'La Chute Montmorency est parfaite si tu veux ajouter une dose de nature spectaculaire, de photos mémorables et d’activités à un séjour dans la région de Québec.',
      }}
    >
      <section id="intro" className="scroll-mt-24">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6 shadow-sm">
          <p className="text-base leading-8 text-gray-700">
            La <strong>Chute Montmorency</strong> fait partie de ces lieux qui impressionnent
            immédiatement. À seulement quelques minutes de Québec, tu passes vite d’une journée
            urbaine à un décor où l’eau, la hauteur, la falaise et la vue sur le fleuve créent un
            vrai effet “wow”. C’est une visite facile à intégrer dans un séjour, mais qui laisse une
            forte impression.
          </p>
          <p className="mt-4 text-base leading-8 text-gray-700">
            Ce qui rend le site intéressant, c’est aussi sa polyvalence : tu peux y aller pour une
            simple promenade panoramique, pour une sortie en famille, pour faire de belles photos,
            ou pour ajouter une activité plus intense comme la <strong>via ferrata</strong> ou la{' '}
            <strong>tyrolienne</strong>. C’est justement cette souplesse qui en fait l’un des
            meilleurs arrêts à faire près de Québec.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Idéal pour</p>
            <p className="mt-2 text-sm leading-7 text-gray-700">
              Familles, couples, visiteurs de Québec, amateurs de photo, voyageurs en road trip et
              personnes qui veulent une activité forte sans aller trop loin.
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">À savoir</p>
            <p className="mt-2 text-sm leading-7 text-gray-700">
              La visite se combine très bien avec le Vieux-Québec, l’Île d’Orléans, la
              Côte-de-Beaupré et plusieurs arrêts gourmands de la région.
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Style de visite
            </p>
            <p className="mt-2 text-sm leading-7 text-gray-700">
              Une sortie très flexible : promenade simple, demi-journée active ou combinaison nature
              + ville dans la même journée.
            </p>
          </div>
        </div>
      </section>

      <section id="incontournables" className="mt-14 scroll-mt-24">
        <H2 className="flex items-center gap-2">
          <Star className="size-6 text-indigo-600" />
          Pourquoi visiter la Chute Montmorency
        </H2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <SoftCard title="Une chute vraiment impressionnante">
            Sa hauteur dépasse celle des chutes Niagara. C’est l’une des visites les plus visuelles
            et mémorables à faire autour de Québec.
          </SoftCard>
          <SoftCard title="Une sortie facile à intégrer">
            Tu peux y consacrer 2 heures ou une demi-journée complète. C’est simple, pratique et
            très rentable en émotion.
          </SoftCard>
          <SoftCard title="Un site bon pour tous les rythmes">
            Belvédères, téléphérique, marche, aventure, photos, repas avec vue : chacun peut y
            construire sa visite.
          </SoftCard>
        </div>
      </section>

      <section id="activities" className="mt-14 scroll-mt-24">
        <H2 className="flex items-center gap-2">
          <Trees className="size-6 text-indigo-600" />
          Activités et attractions à faire
        </H2>
        <div className="mt-6 space-y-5">
          {activities.map((activity) => (
            <a
              key={activity.name}
              href={activity.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <H3>{activity.name}</H3>
                  <p className="mt-2 text-sm leading-7 text-gray-700">{activity.description}</p>
                  <p className="mt-2 text-sm text-gray-600">{activity.tip}</p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2 md:max-w-[260px] md:justify-end">
                  <Chip>{activity.type}</Chip>
                  <Chip>{activity.duration}</Chip>
                  <Chip>{activity.price}</Chip>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="panoramas" className="mt-14 scroll-mt-24">
        <H2 className="flex items-center gap-2">
          <Camera className="size-6 text-indigo-600" />
          Les plus beaux points de vue
        </H2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {panoramas.map((item) => (
            <SoftCard key={item.title} title={item.title}>
              {item.description}
            </SoftCard>
          ))}
        </div>
      </section>

      <section id="kids" className="mt-14 scroll-mt-24">
        <H2 className="flex items-center gap-2">
          <Star className="size-6 text-indigo-600" />
          Activités pour enfants et familles
        </H2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {familyActivities.map((activity) => (
            <SoftCard key={activity.title} title={activity.title}>
              <p>{activity.description}</p>
              <p className="mt-3 font-semibold text-indigo-700">{activity.price}</p>
              <p className="mt-2 text-gray-600">{activity.tip}</p>
            </SoftCard>
          ))}
        </div>
      </section>

      <section id="teens" className="mt-14 scroll-mt-24">
        <H2 className="flex items-center gap-2">
          <Map className="size-6 text-indigo-600" />
          Activités pour ados et visiteurs plus actifs
        </H2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {teenActivities.map((activity) => (
            <SoftCard key={activity.title} title={activity.title}>
              <p>{activity.description}</p>
              <p className="mt-3 font-semibold text-indigo-700">{activity.price}</p>
              <p className="mt-1 text-gray-600">Durée : {activity.duration}</p>
              <p className="mt-2 text-gray-600">{activity.tip}</p>
            </SoftCard>
          ))}
        </div>
      </section>

      <section id="getting-there" className="mt-14 scroll-mt-24">
        <H2 className="flex items-center gap-2">
          <Bus className="size-6 text-indigo-600" />
          Comment s’y rendre
        </H2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <SoftCard title="Depuis Québec">
            <ul className="space-y-2">
              <li>• Environ 15 minutes en voiture depuis le Vieux-Québec.</li>
              <li>• Accès facile pour une demi-journée.</li>
              <li>• Très bon arrêt à combiner avec d’autres visites dans le secteur.</li>
            </ul>
          </SoftCard>
          <SoftCard title="Stationnement et organisation">
            <ul className="space-y-2">
              <li>• Prévois un peu de temps pour te stationner en haute saison.</li>
              <li>• Vérifie les accès et billets selon les activités choisies.</li>
              <li>• Des chaussures confortables changent vraiment l’expérience.</li>
            </ul>
          </SoftCard>
        </div>
      </section>

      <section id="tips" className="mt-14 scroll-mt-24">
        <H2 className="flex items-center gap-2">
          <Calendar className="size-6 text-indigo-600" />
          Conseils pratiques
        </H2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {practicalCards.map((card) => (
            <SoftCard key={card.title} title={card.title}>
              {card.description}
            </SoftCard>
          ))}
          <SoftCard title="Budget">
            Une visite simple reste assez accessible. Le budget monte surtout si tu ajoutes
            aventure, repas sur place et hébergement.
          </SoftCard>
          <SoftCard title="Réservations">
            Pour la via ferrata, la tyrolienne et certaines périodes populaires, mieux vaut réserver
            d’avance.
          </SoftCard>
          <SoftCard title="Lien utile">
            <a
              href="https://www.sepaq.com/ct/pcm/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-indigo-700 underline underline-offset-4"
            >
              Voir les infos officielles du site
            </a>
          </SoftCard>
        </div>
      </section>

      <section id="cta" className="mt-14 scroll-mt-24">
        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-6 shadow-sm">
          <H2>Préparer ta visite de la Chute Montmorency</H2>
          <p className="mt-3 text-sm leading-7 text-gray-700">
            Si tu veux organiser une journée fluide, le mieux est de prévoir ton trajet, choisir ton
            hébergement dans le bon secteur et garder sous la main quelques idées de sorties
            complémentaires.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={ctaBookingUrl}
              target="_blank"
              rel="sponsored noopener nofollow"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Réserver un hébergement près de Québec
            </a>
            <a
              href="/planificateur"
              className="rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              Ouvrir le planificateur
            </a>
            <a
              href="/producteurs"
              className="rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              Voir les producteurs locaux
            </a>
            <a
              href="/videos"
              className="rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              Regarder des vidéos
            </a>
            <a
              href="/coups-de-coeur"
              className="rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              Voir nos coups de cœur
            </a>
          </div>
        </div>
      </section>

      <NearbyDestinations currentSlug="montmorency" />
    </DestinationArticleTemplate>
  );
}
