import Image from 'next/image';
import Link from 'next/link';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { buildMetadata2025 } from '@/lib/seo/buildMetadata2025';
import { buildDestinationLd } from '@/lib/seo/buildDestinationLd';
import { buildBreadcrumbLd } from '@/lib/seo/buildBreadcrumbLd';
import { buildHowToLd } from '@/lib/seo/buildHowToLd';
import { buildFaqLd } from '@/lib/seo/buildFaqLd';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';
import { bookingAwin } from '@/lib/awin';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

export const dynamic = 'force-static';
export const revalidate = 60 * 60 * 24;

const TITLE = 'Gaspésie : road trip, parc national, Percé et météo | Guide complet';
const DESCRIPTION =
  'Guide complet de la Gaspésie : itinéraire road trip, Parc national de la Gaspésie et mont Jacques-Cartier, Géoparc de Percé, Jardins de Métis, camping, météo et conseils pratiques pour préparer votre voyage.';
const CANONICAL = 'https://www.goquebecan.com/blog/gaspesie';
const OG_IMAGE = 'https://www.goquebecan.com/images/destinations/gaspesie-og-1200x630.jpg';

const KEYWORDS = [
  'Gaspésie',
  'Gaspésie Québec',
  'road trip Gaspésie',
  'Gaspésie en famille',
  'météo Gaspésie',
  'Parc national de la Gaspésie',
  'mont Jacques-Cartier',
  'Géoparc de Percé',
  'Jardins de Métis',
  'camping Gaspésie',
  'camping Percé',
  'rivière aux Émeraudes',
  'Forillon',
  'Percé',
  'baleines Gaspésie',
  'hôtels Gaspésie',
];

const PUBLISHED = '2025-07-01';
const MODIFIED = '2026-04-14';

export const metadata = buildMetadata2025({
  title: TITLE,
  description: DESCRIPTION,
  canonical: CANONICAL,
  image: OG_IMAGE,
  keywords: KEYWORDS,
});

type StayCardProps = {
  name: string;
  location: string;
  type: string;
  description: string;
  link: string;
  image: string;
  extra?: string;
};

type SimpleItem = {
  title: string;
  location?: string;
  description: string;
};

const hotelsVueMer: StayCardProps[] = [
  {
    name: 'Riôtel Percé',
    location: 'Percé',
    type: 'Hôtel vue mer',
    description:
      'Chambres modernes face au Rocher Percé, avec terrasse pour admirer le lever du soleil et finir la journée en douceur après les excursions en bateau.',
    link: bookingAwin('https://www.booking.com/hotel/ca/riotel-perce.fr.html'),
    image: '/images/destinations/hotels/riohotel-perce.avif',
    extra:
      'Idéal pour les familles qui veulent un peu de confort tout en restant au cœur de l’action.',
  },
  {
    name: 'Hôtel des Commandants',
    location: 'Gaspé',
    type: 'Hôtel centre-ville',
    description:
      'Point de chute pratique pour explorer le parc Forillon, avec restaurants et services accessibles à pied. Parfait pour alterner journées plein air et moments plus urbains.',
    link: bookingAwin('https://www.booking.com/hotel/ca/motel-plante.fr.html'),
    image: '/images/destinations/hotels/hotel-plante.avif',
    extra: 'Pratique si tu voyages avec des ados qui aiment flâner en ville le soir.',
  },
  {
    name: 'Manoir Belle Plage',
    location: 'Carleton-sur-Mer',
    type: 'Hôtel bord de mer',
    description:
      'Atmosphère chaleureuse, vue sur la baie et accès facile à la plage pour les couchers de soleil. Une belle option pour finir le road trip sur une note relax.',
    link: bookingAwin('https://www.booking.com/hotel/ca/manoir-belle-plage.fr.html'),
    image: '/images/destinations/hotels/manoir-belle-plage.avif',
    extra: 'Excellent pour recharger les batteries avant le retour vers la maison.',
  },
];

const hotelsFamillePiscine: StayCardProps[] = [
  {
    name: 'Hôtel & Cie',
    location: 'Sainte-Anne-des-Monts',
    type: 'Hôtel famille',
    description:
      'Chambres confortables et accueil chaleureux, pratique comme base pour découvrir le parc national de la Gaspésie tout en gardant un bon niveau de confort.',
    link: bookingAwin('https://www.booking.com/hotel/ca/auberge-seigneurie-des-monts.fr.html'),
    image: '/images/destinations/hotels/auberge-seigneurie-des-monts.avif',
    extra: 'Parfait pour les familles qui alternent randonnée et moments cocooning.',
  },
  {
    name: 'Hostellerie Baie-Bleue',
    location: 'Carleton-sur-Mer',
    type: 'Hôtel avec piscine',
    description:
      'Grande piscine extérieure en saison, accès à la plage et vue sur la baie. Les enfants adorent se baigner pendant que les adultes profitent du paysage.',
    link: bookingAwin('https://www.booking.com/hotel/ca/hostellerie-baie-bleue.fr.html'),
    image: '/images/destinations/hotels/riotel-carleton.avif',
    extra: 'Solution idéale pour les journées de vent fort ou de météo incertaine.',
  },
  {
    name: 'Auberge des Caps',
    location: 'Cap-Chat',
    type: 'Auberge familiale',
    description:
      'Ambiance simple et conviviale, avec chambres adaptées aux familles et proximité du fleuve. Un bon point de chute entre parc de la Gaspésie et mer.',
    link: bookingAwin('https://www.booking.com/hotel/ca/chalets-valmont-plein-air.fr.html'),
    image: '/images/destinations/hotels/chalets-valmont.avif',
    extra: 'Top si tu veux limiter les déplacements quotidiens en voiture.',
  },
];

const campings: StayCardProps[] = [
  {
    name: 'Camping du Parc national Forillon',
    location: 'Gaspé',
    type: 'Camping en parc national',
    description:
      'Emplacements près des sentiers, de la mer et des belvédères. Tu te réveilles avec l’odeur du sel et le cri des fous de Bassan au loin.',
    link: 'https://parcs.canada.ca/pn-np/qc/forillon/activ/camping',
    image: '/images/destinations/forillon.avif',
    extra: 'À réserver très tôt en haute saison, surtout si tu veux un emplacement avec vue.',
  },
  {
    name: 'Camping du Parc national de la Gaspésie',
    location: 'Sainte-Anne-des-Monts',
    type: 'Camping montagne',
    description:
      'Pour vivre la Gaspésie côté sommets : rivières, sentiers et belvédères à proximité, avec un vrai sentiment d’évasion.',
    link: 'https://www.sepaq.com/fr/reservation/camping/parc-national-de-la-gaspesie',
    image: '/images/destinations/hotels/camping-gaspesie.avif',
    extra:
      'Idéal si tu veux initier les enfants à la randonnée sans faire des journées trop longues.',
  },
  {
    name: 'Camping Carleton-sur-Mer',
    location: 'Carleton-sur-Mer',
    type: 'Camping bord de mer',
    description:
      'Emplacements en bord de baie, aire de jeux et accès facile aux services du village. L’endroit parfait pour une fin de séjour tout en douceur.',
    link: 'https://campingcarletonsurmer.com',
    image: '/images/destinations/carleton-sur-mer.avif',
    extra: 'Très apprécié des familles qui aiment combiner vélo, plage et cantine.',
  },
];

const restaurants: SimpleItem[] = [
  {
    title: 'Cantine à Percé',
    location: 'Percé',
    description:
      'Fish & chips, guédilles au homard et poutine aux fruits de mer : la cantine gaspésienne parfaite après une journée sur l’eau.',
  },
  {
    title: 'Microbrasserie Pit Caribou',
    location: 'L’Anse-à-Beaufils / Percé',
    description:
      'Bière locale, terrasse animée et assiettes généreuses. Les parents se font plaisir pendant que les enfants picorent quelques bouchées.',
  },
  {
    title: 'Boulangerie artisanale à Carleton',
    location: 'Carleton-sur-Mer',
    description:
      'Pains, viennoiseries et cafés de spécialité : l’endroit idéal pour un déjeuner tranquille avant de reprendre la route.',
  },
  {
    title: 'Poissonnerie locale',
    location: 'Divers villages',
    description:
      'Poissons fumés, crabes, homards, tartinades : parfait pour un pique-nique face au fleuve ou un souper au camping.',
  },
];

const mustDoActivities: SimpleItem[] = [
  {
    title: 'Parc national Forillon',
    description:
      'Falaises spectaculaires, sentiers pour petits et grands, et belvédères où l’on se sent au bout du monde. À combiner avec une sortie baleines.',
  },
  {
    title: 'Rocher Percé & Île-Bonaventure',
    description:
      'Croisière autour du Rocher Percé, débarquement sur l’île et marche jusqu’à la colonie de fous de Bassan : un classique qui émerveille toute la famille.',
  },
  {
    title: 'Parc national de la Gaspésie',
    description:
      'Montagnes, caribous à respecter à distance et multiples sentiers pour adapter les randos à ton niveau et à l’âge des enfants.',
  },
  {
    title: 'Baie-des-Chaleurs',
    description:
      'Plages, pistes cyclables, activités nautiques et couchers de soleil doux. Un terrain de jeu parfait pour les familles et les couples.',
  },
];

const familyIdeas: SimpleItem[] = [
  {
    title: 'Exploramer à Sainte-Anne-des-Monts',
    description:
      'Musée et activités sur le Saint-Laurent, idéal les jours de pluie ou pour les enfants curieux de la vie marine.',
  },
  {
    title: 'Plages familiales',
    description:
      'Haldimand, Carleton-sur-Mer, Coin-du-Banc : de belles plages pour courir, faire des châteaux, ou simplement écouter les vagues.',
  },
  {
    title: 'Haltes gourmandes chez les producteurs locaux',
    description:
      'Fromageries, fumoirs, microbrasseries, kiosques de légumes et petites pâtisseries : l’occasion de goûter à la Gaspésie côté terroir.',
  },
];

const wildlife: SimpleItem[] = [
  {
    title: 'Baleines et phoques',
    description:
      'Selon la saison, tu peux observer baleines, marsouins et phoques en croisière ou depuis certains belvédères. Toujours garder ses distances et écouter les consignes.',
  },
  {
    title: 'Oiseaux marins',
    description:
      'Les fous de Bassan de l’île Bonaventure sont impressionnants à observer, surtout pour les enfants. Une colonie à voir au moins une fois dans sa vie.',
  },
  {
    title: 'Caribous du parc de la Gaspésie',
    description:
      'Ils sont fragiles et protégés : on les admire de loin, en respectant à la lettre les indications du parc.',
  },
];

const breadcrumbLd = buildBreadcrumbLd([
  { name: 'Accueil', item: 'https://www.goquebecan.com' },
  { name: 'Blog', item: 'https://www.goquebecan.com/blog' },
  { name: 'Gaspésie', item: CANONICAL },
]);

const destinationLd = buildDestinationLd({
  name: 'Gaspésie – road trip en famille',
  description: DESCRIPTION,
  url: CANONICAL,
  image: OG_IMAGE,
  latitude: 48.836,
  longitude: -64.492,
  containedPlaces: [
    'Sainte-Anne-des-Monts',
    'Parc national de la Gaspésie',
    'Gaspé',
    'Parc Forillon',
    'Percé',
    'Carleton-sur-Mer',
    'Baie-des-Chaleurs',
  ],
  touristType: ['Famille', 'Road trip', 'Plein air', 'Mer'],
  rating: { value: 4.9, count: 152 },
});

const howTo7DaysLd = buildHowToLd({
  name: 'Comment organiser un road trip de 7 jours en Gaspésie en famille',
  description:
    'Itinéraire type pour une semaine en Gaspésie avec des enfants, en combinant parcs nationaux, villages côtiers, plages, baleines, cantines et producteurs locaux.',
  url: CANONICAL,
  totalTimeISO: 'P7D',
  steps: [
    {
      name: 'Jour 1 – Montréal / Québec → Rimouski / Sainte-Flavie',
      text: 'Mise en route, premières vues sur le fleuve, arrêts dans les parcs et cantines pour prendre le rythme de vacances.',
    },
    {
      name: 'Jour 2 – Sainte-Anne-des-Monts & parc de la Gaspésie',
      text: 'Découverte des montagnes, courtes randonnées et belvédères adaptés aux familles.',
    },
    {
      name: 'Jour 3 – Gaspé & parc Forillon',
      text: 'Falaises, belvédères spectaculaires et, si possible, sortie baleines pour émerveiller petits et grands.',
    },
    {
      name: 'Jour 4 – Percé & île Bonaventure',
      text: 'Croisière autour du Rocher Percé, visite de l’île et observation des fous de Bassan.',
    },
    {
      name: 'Jour 5 – Baie-des-Chaleurs & Carleton-sur-Mer',
      text: 'Plages, vélo, activités nautiques et découverte de producteurs locaux.',
    },
    {
      name: 'Jour 6 – Vallée de la Matapédia',
      text: 'Retour en douceur avec belvédères, villages et haltes gourmandes.',
    },
    {
      name: 'Jour 7 – Jour tampon / météo / bonus',
      text: 'Journée flexible pour gérer la météo, la fatigue ou un coup de cœur à prolonger.',
    },
  ],
});

const faqLd = buildFaqLd([
  {
    question: 'Quel est le meilleur moment pour faire un road trip en Gaspésie en famille ?',
    answer:
      'De la mi-juin à la mi-septembre, avec un pic d’achalandage en juillet et pendant les vacances de la construction. En mai et octobre, certaines activités sont réduites, mais les paysages restent magnifiques.',
  },
  {
    question: 'Faut-il absolument réserver les campings et hébergements en Gaspésie ?',
    answer:
      'Oui, surtout l’été et pour les hébergements avec vue ou les campings dans les parcs nationaux. Il est recommandé de réserver plusieurs mois à l’avance.',
  },
  {
    question: 'La Gaspésie est-elle adaptée aux jeunes enfants ?',
    answer:
      'Oui, à condition d’adapter les distances de route et la durée des randonnées. Il y a de nombreuses plages, cantines, petites activités intérieures et musées pour les jours de pluie.',
  },
  {
    question: 'Peut-on voyager en Gaspésie avec une voiture électrique ?',
    answer:
      'Oui, de plus en plus de bornes sont disponibles dans les villages et près des hébergements. Il est simplement recommandé de planifier ses arrêts de recharge à l’avance.',
  },
  {
    question: 'Combien de jours faut-il prévoir pour un road trip en Gaspésie ?',
    answer:
      'Une semaine est un bon minimum pour faire le tour sans courir, mais tu peux facilement étirer à 10 ou 14 jours.',
  },
  {
    question: 'Quelle est la météo en Gaspésie et comment s’y préparer ?',
    answer:
      'La météo en Gaspésie change vite et varie beaucoup d’un secteur à l’autre. Il peut faire soleil à Percé et être dans le brouillard au sommet des Chic-Chocs le même jour. Consultez les prévisions par municipalité plutôt que pour la région entière, et surtout la météo du Parc national de la Gaspésie séparément : en altitude, il peut faire 10 à 15 degrés de moins qu’au bord du fleuve, avec du vent et de la neige possible même en été.',
  },
  {
    question: 'Comment accéder au mont Jacques-Cartier ?',
    answer:
      'L’accès est strictement réglementé pour protéger le troupeau de caribous. Le sentier est ouvert du 1er juillet au 30 septembre, uniquement entre 10 h et 16 h, et aucun départ n’est autorisé après midi. La navette est obligatoire : elle part de l’accueil du camping du Mont-Jacques-Cartier. Les places sont limitées, la réservation est fortement recommandée. Les chiens ne sont pas admis et il est interdit de sortir des sentiers balisés.',
  },
  {
    question: 'Quelle est la difficulté du sentier du mont Jacques-Cartier ?',
    answer:
      'Environ 8 km aller-retour pour 465 mètres de dénivelé, comptez à peu près 4 heures. Le sentier est large, rocailleux et facile à suivre, avec des escaliers de bois avant le sommet. Il est classé difficile surtout à cause du terrain et de la durée, mais il reste accessible à des marcheurs en forme raisonnable.',
  },
  {
    question: 'Qu’est-ce que le Géoparc de Percé et que peut-on y faire ?',
    answer:
      'C’est un géoparc mondial UNESCO qui raconte 500 millions d’années d’histoire de la Terre. On y trouve 23 géosites, 18 km de sentiers sur le mont Sainte-Anne et le mont Blanc, l’exposition multimédia TEKTONIK, une tyrolienne, un espace de jeux intérieur pour les enfants et une plateforme vitrée suspendue à 200 mètres d’altitude avec vue sur le village. La projection extérieure La Légende de Gluskap est présentée les soirs d’été.',
  },
  {
    question: 'Comment accéder à la plateforme vitrée suspendue du Géoparc ?',
    answer:
      'Deux options : à pied par le réseau de sentiers, en empruntant le sentier des Arpenteurs puis celui des Belvédères — la plateforme se trouve au troisième belvédère — ou en navette au départ du pavillon principal. L’accès à la plateforme est payant et la navette représente un coût additionnel, tandis que la marche en sentier est gratuite.',
  },
  {
    question: 'Peut-on camper à Percé ?',
    answer:
      'Oui. Le Géoparc de Percé exploite un camping situé au cœur du village, ce qui permet de tout faire à pied. D’autres campings privés et municipaux se répartissent autour de Percé. Comme partout en Gaspésie l’été, réservez plusieurs mois à l’avance, surtout pour juillet et les vacances de la construction.',
  },
  {
    question: 'Que sont les Jardins de Métis et valent-ils le détour ?',
    answer:
      'Créés par Elsie Reford et ouverts au public depuis 1962, les Jardins de Métis à Grand-Métis couvrent environ 18 hectares et rassemblent près de 3 000 variétés de plantes. Le site est reconnu lieu historique national du Canada. C’est souvent la première ou la dernière étape d’un tour de la Gaspésie selon le sens du trajet, et une belle pause pour couper la route.',
  },
]);

function StayCard({ name, location, type, description, link, image, extra }: StayCardProps) {
  const isBooking = /(^|\.)booking\.com$/i.test(new URL(link, 'https://example.com').hostname);
  const finalHref = isBooking ? bookingAwin(link) : link;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-52 w-full overflow-hidden">
        <a href={finalHref} target="_blank" rel="sponsored noopener nofollow">
          <Image
            src={image}
            alt={`${name} — hébergement recommandé en Gaspésie à ${location}`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
          />
        </a>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <header className="mb-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{type}</p>
          <H3 className="text-lg font-semibold text-gray-900">{name}</H3>
          <p className="text-sm text-gray-600">{location}</p>
        </header>

        <p className="flex-1 text-sm text-gray-700">{description}</p>
        {extra ? <p className="mt-2 text-sm text-gray-600">{extra}</p> : null}

        <div className="mt-3">
          <a
            href={finalHref}
            target="_blank"
            rel="sponsored noopener nofollow"
            className="inline-flex items-center text-sm font-semibold text-indigo-800 underline-offset-2 hover:underline"
          >
            {isBooking ? 'Voir les disponibilités sur Booking' : 'Voir les infos / réserver'}
          </a>
          {isBooking ? (
            <p className="mt-1 text-[11px] text-gray-500">
              Lien affilié — ça soutient GoQuébeCAN sans coût pour toi.
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function BulletList({ items }: { items: SimpleItem[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm text-gray-700">
      {items.map((item) => (
        <li key={item.title} className="flex gap-2">
          <span className="mt-[6px] size-1.5 flex-shrink-0 rounded-full bg-indigo-700" />
          <div>
            <span className="font-semibold text-gray-900">{item.title}</span>
            {item.location ? <span className="text-gray-600">{` — ${item.location}`}</span> : null}
            <span className="block text-gray-700">{item.description}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <>
      <HeadExtras
        ogUpdatedTime={`${MODIFIED}T00:00:00-04:00`}
        ogSeeAlso={[
          'https://www.goquebecan.com/blog/fjord-saguenay',
          'https://www.goquebecan.com/blog/voyage-voiture',
          'https://www.goquebecan.com/blog/voyage-camping',
        ]}
        articlePublishedTime={`${PUBLISHED}T00:00:00-04:00`}
        articleModifiedTime={`${MODIFIED}T00:00:00-04:00`}
      />

      <JsonLd data={breadcrumbLd} />
      <JsonLd data={destinationLd} />
      <JsonLd data={howTo7DaysLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}

      <DestinationArticleTemplate
        slug="gaspesie"
        title="Gaspésie – le road trip en famille qui reste dans le cœur"
        subtitle="Route 132, villages colorés, phares, baleines et couchers de soleil sur la plage : la Gaspésie, c’est plus qu’un itinéraire, c’est un voyage qui se vit en famille."
        toc={[
          { id: 'intro-gaspesie', label: 'Introduction' },
          { id: 'itineraire', label: 'Itinéraire conseillé' },
          { id: 'parc-national', label: 'Parc national de la Gaspésie' },
          { id: 'jacques-cartier', label: 'Mont Jacques-Cartier' },
          { id: 'geoparc-perce', label: 'Géoparc de Percé' },
          { id: 'jardins-metis', label: 'Jardins de Métis' },
          { id: 'camping', label: 'Camping en Gaspésie' },
          { id: 'meteo', label: 'Météo en Gaspésie' },
          { id: 'hebergements', label: 'Où dormir' },
          { id: 'gastronomie', label: 'Où manger' },
          { id: 'activites', label: 'Activités' },
          { id: 'conseils', label: 'Conseils pratiques' },
          { id: 'faq', label: 'FAQ' },
          { id: 'conclusion', label: 'Pour conclure' },
        ]}
        hero={{
          image: (
            <Image
              src="/images/destinations/gaspesie.avif"
              alt="Route de la Gaspésie en bord de mer, falaises, mer bleue et ciel dégagé"
              width={1920}
              height={1080}
              priority
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            />
          ),
          caption: `Dernière mise à jour : ${new Date(MODIFIED).toLocaleDateString('fr-CA')}`,
        }}
        utilityLinks={[
          {
            label: 'Préparer mon itinéraire',
            href: '/planificateur',
            variant: 'primary',
          },
          {
            label: 'Guide voyage en voiture',
            href: '/blog/voyage-voiture',
            variant: 'soft',
          },
          {
            label: 'Astuces hôtel en famille',
            href: '/blog/voyage-hotel',
            variant: 'outline',
          },
        ]}
      >
        <section id="intro-gaspesie" className="mx-auto max-w-3xl space-y-4">
          <p className="text-lg leading-8 text-gray-700">
            Que tu partes avec de jeunes enfants, des ados ou en duo, tu peux adapter le rythme, les
            arrêts et le type d’hébergement pour que tout le monde y trouve son compte. Pour t’aider
            à tout organiser sans stress, tu peux utiliser le{' '}
            <Link
              href="/planificateur"
              className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
            >
              planificateur GoQuébeCAN
            </Link>
            , puis compléter avec nos guides sur les{' '}
            <Link
              href="/blog/voyage-voiture"
              className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
            >
              objets indispensables pour voyager en voiture
            </Link>{' '}
            et les{' '}
            <Link
              href="/blog/voyage-hotel"
              className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
            >
              astuces pour séjourner à l’hôtel en famille
            </Link>
            .
          </p>
        </section>

        <section id="itineraire" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            Itinéraire 7 jours en Gaspésie avec enfants
          </H2>

          <p className="text-gray-700">
            Ici, pas question de cocher une liste de “must see” en courant. L’idée, c’est de faire
            un vrai tour de Gaspésie qui laisse de la place aux imprévus, aux arrêts cantine, aux
            producteurs locaux, aux discussions avec les Gaspésiens et aux journées où on décide
            simplement d’aller à la plage.
          </p>

          {[
            {
              title: 'Jour 1 – Montréal / Québec → Rimouski / Sainte-Flavie',
              text: 'On quitte la ville tranquillement en direction de Rimouski ou Sainte-Flavie. On fait quelques arrêts en chemin pour dégourdir les jambes : parc, aire de jeux, petite fromagerie ou café de village. On commence déjà à sentir l’air salin, et les enfants voient le fleuve de plus en plus large.',
            },
            {
              title: 'Jour 2 – Sainte-Anne-des-Monts & parc national de la Gaspésie',
              text: 'Direction les montagnes. On s’installe du côté de Sainte-Anne-des-Monts ou directement au parc national de la Gaspésie. On choisit une courte randonnée adaptée aux enfants, un belvédère accessible ou une balade en bord de rivière.',
            },
            {
              title: 'Jour 3 – Gaspé & parc national Forillon',
              text: 'On longe la côte vers Gaspé et le parc national Forillon. Au programme : belvédères impressionnants, marche facile jusqu’à un phare, observation de la faune et, selon la saison, sortie en bateau pour tenter de voir baleines et phoques.',
            },
            {
              title: 'Jour 4 – Percé & île Bonaventure',
              text: 'Percé, c’est la carte postale qui devient réalité. On prend le bateau pour faire le tour du Rocher Percé, puis on débarque sur l’île Bonaventure pour une marche en douceur jusqu’à la colonie de fous de Bassan.',
            },
            {
              title: 'Jour 5 – Baie-des-Chaleurs & Carleton-sur-Mer',
              text: 'On descend vers la Baie-des-Chaleurs. On profite des plages, du vélo, des glaces et des terrasses. À Carleton-sur-Mer, les enfants peuvent courir sur la grève pendant que les parents admirent le coucher de soleil.',
            },
            {
              title: 'Jour 6 – Vallée de la Matapédia',
              text: 'On remonte doucement par la vallée de la Matapédia, en s’arrêtant dans quelques villages, belvédères ou parcs. Cette journée devient une transition douce plutôt qu’un simple retour.',
            },
            {
              title: 'Jour 7 – Jour tampon : météo, fatigue, coups de cœur',
              text: 'Ce jour bonus permet de gérer une journée de pluie, une fatigue générale ou simplement un coup de cœur où on a envie de rester un peu plus longtemps.',
            },
          ].map((day) => (
            <div
              key={day.title}
              className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100"
            >
              <H3 className="text-lg font-semibold text-gray-900">{day.title}</H3>
              <p className="text-sm leading-7 text-gray-700">{day.text}</p>
            </div>
          ))}
        </section>

        {/* Parc national de la Gaspésie */}
        <section id="parc-national" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            Le Parc national de la Gaspésie, cœur sauvage de la péninsule
          </H2>

          <p className="text-gray-700">
            Beaucoup de voyageurs longent la côte sans jamais monter dans les terres. C’est dommage
            : le <strong>parc de la Gaspésie</strong> abrite les plus hautes montagnes du sud du
            Québec, avec plus de 800 km² de territoire et un réseau d’environ 130 km de sentiers
            dans les monts Chic-Chocs et McGerrigle.
          </p>

          <p className="text-gray-700">
            C’est un tout autre visage de la région : forêt boréale, toundra alpine, lacs de
            montagne et surtout le dernier troupeau de caribous des bois au sud du fleuve
            Saint-Laurent. Prévoyez au moins une journée complète, idéalement deux, en gardant en
            tête que les distances internes sont longues et que plusieurs routes sont en gravier.
          </p>

          <H3 className="mt-6 text-xl font-semibold text-gray-900">La rivière aux Émeraudes</H3>

          <p className="text-gray-700">
            Son nom dit tout : l’eau y prend une teinte verte translucide, particulièrement
            frappante quand la lumière tombe bien. C’est une halte photo facile et une belle
            introduction au parc pour les familles qui ne feront pas de longue randonnée. Un bon
            complément à une journée plus sportive ailleurs dans le secteur.
          </p>

          <H3 className="mt-6 text-xl font-semibold text-gray-900">Sommets et sentiers</H3>

          <p className="text-gray-700">
            Le mont Albert et le mont Xalibu comptent parmi les randonnées les plus appréciées, et
            le lac aux Américains offre un point de vue spectaculaire pour un effort modéré. Les
            marcheurs expérimentés peuvent enchaîner Xalibu et Jacques-Cartier en linéaire — environ
            18 km et 905 m de dénivelé, avec retour en navette.
          </p>
        </section>

        {/* Mont Jacques-Cartier */}
        <section id="jacques-cartier" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            Mont Jacques-Cartier : la randonnée aux caribous
          </H2>

          <p className="text-gray-700">
            C’est la randonnée emblématique du parc, et celle qui demande le plus de préparation.
            Culminant à 1 270 mètres, le <strong>mont Jacques-Cartier</strong> est le plus haut
            sommet des Chic-Chocs et le deuxième du Québec. Son plateau de toundra alpine, épargné
            par les glaciers, est le meilleur endroit de la province pour observer le caribou.
          </p>

          <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
            <p className="text-gray-800">
              <strong>Accès strictement réglementé.</strong> Pour protéger le troupeau, le sentier
              n’est ouvert que du 1<sup>er</sup> juillet au 30 septembre, uniquement entre 10 h et
              16 h, et aucun départ n’est autorisé après midi. Il est interdit de sortir des
              sentiers balisés et les chiens ne sont pas admis. Un garde-parc veille au respect de
              ces règles.
            </p>
          </div>

          <H3 className="mt-6 text-xl font-semibold text-gray-900">La navette, obligatoire</H3>

          <p className="text-gray-700">
            On ne se rend pas au départ du sentier avec sa propre voiture : la navette part de
            l’accueil du camping du Mont-Jacques-Cartier. Les places sont limitées et la réservation
            est fortement recommandée. Arriver tôt le matin au centre de services augmente vos
            chances d’obtenir une place le jour même, mais mieux vaut ne pas compter dessus en haute
            saison.
          </p>

          <p className="text-gray-700">
            Notez que le camping du Mont-Jacques-Cartier se trouve à une quarantaine de kilomètres
            du centre de découverte, en partie sur une route de gravier : comptez le temps de trajet
            dans votre planification.
          </p>

          <H3 className="mt-6 text-xl font-semibold text-gray-900">La randonnée elle-même</H3>

          <p className="text-gray-700">
            Environ 8 km aller-retour, 465 mètres de dénivelé, à peu près 4 heures. Le sentier est
            large et rocailleux, en montée constante, avec des escaliers de bois avant le sommet.
            Classé difficile surtout pour le terrain et la durée, il reste accessible à des
            marcheurs en forme raisonnable. Au sommet, une boucle d’un kilomètre — le sentier du
            Caribou — permet de parcourir le plateau, avec une tour d’observation et un abri.
          </p>

          <p className="text-gray-700">
            Habillez-vous en conséquence : au sommet, il peut faire nettement plus froid et venteux
            qu’au stationnement, même en plein mois de juillet.
          </p>
        </section>

        {/* Géoparc de Percé */}
        <section id="geoparc-perce" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            Le Géoparc de Percé, 500 millions d’années sous les pieds
          </H2>

          <p className="text-gray-700">
            Reconnu <strong>géoparc mondial UNESCO</strong>, le site raconte l’histoire géologique
            de la région à travers 23 géosites et un réseau d’environ 18 km de sentiers sur le mont
            Sainte-Anne et le mont Blanc. C’est une visite qui fonctionne beau temps mauvais temps,
            ce qui en fait une carte à garder en réserve pour une journée grise.
          </p>

          <H3 className="mt-6 text-xl font-semibold text-gray-900">
            La plateforme vitrée suspendue
          </H3>

          <p className="text-gray-700">
            C’est l’attraction signature : une plateforme de verre ancrée dans la falaise à 200
            mètres d’altitude, avec vue plongeante sur le village et l’amphithéâtre naturel de
            Percé. Effet vertigineux garanti.
          </p>

          <p className="text-gray-700">
            Deux façons d’y accéder. À pied, par le sentier des Arpenteurs puis celui des Belvédères
            — la plateforme se trouve au troisième belvédère — sachant que{' '}
            <strong>la marche en sentier est gratuite</strong>. Ou en navette, au départ du pavillon
            principal. L’accès à la plateforme est payant, et la navette représente un coût
            additionnel.
          </p>

          <H3 className="mt-6 text-xl font-semibold text-gray-900">Avec des enfants</H3>

          <p className="text-gray-700">
            L’exposition multimédia TEKTONIK propose un voyage à travers l’histoire géologique, et
            un espace de jeux intérieur inspiré des fonds marins occupe les plus jeunes. Les
            amateurs de sensations trouveront une tyrolienne double et un mur d’escalade. En soirée
            d’été, la projection extérieure gratuite de <em>La Légende de Gluskap</em>, un
            court-métrage de douze minutes inspiré d’un récit mi’gmaq, clôt bien la journée.
          </p>

          <p className="text-gray-700">
            La saison estivale s’étend généralement de la mi-mai au début octobre, avec une
            ouverture prolongée les fins de semaine à l’automne. En hiver, les sentiers se
            parcourent en raquettes. Vérifiez les horaires et la tarification en vigueur avant de
            vous déplacer.
          </p>
        </section>

        {/* Jardins de Métis */}
        <section id="jardins-metis" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            Les Jardins de Métis, la porte d’entrée de la Gaspésie
          </H2>

          <p className="text-gray-700">
            À Grand-Métis, ces jardins créés par Elsie Reford et ouverts au public depuis 1962
            couvrent environ 18 hectares et rassemblent près de 3 000 variétés de plantes. Le site
            est reconnu lieu historique national du Canada et classé au patrimoine québécois.
          </p>

          <p className="text-gray-700">
            Selon le sens de votre tour, c’est souvent la première ou la dernière étape du voyage.
            En venant de Québec par la route 132, les <strong>Jardins de Métis</strong> arrivent
            juste après Sainte-Flavie, au moment précis où l’on commence à sentir qu’on entre
            vraiment en Gaspésie. Une halte agréable pour couper une longue journée de route,
            surtout avec des enfants qui ont besoin de bouger autrement qu’en voiture.
          </p>

          <p className="text-gray-700">
            Des visites guidées d’une heure sont offertes en haute saison moyennant un supplément
            modeste. Les jardins ferment à l’automne et rouvrent au printemps : vérifiez les dates
            avant de bâtir votre itinéraire autour de cette étape.
          </p>
        </section>

        {/* Camping */}
        <section id="camping" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            Camping en Gaspésie : ce qu’il faut savoir
          </H2>

          <p className="text-gray-700">
            Le <strong>camping en Gaspésie</strong> reste la façon la plus immersive de vivre la
            région, et souvent la plus économique pour une famille. Mais c’est aussi ce qui demande
            le plus d’anticipation.
          </p>

          <H3 className="mt-6 text-xl font-semibold text-gray-900">Réserver, et tôt</H3>

          <p className="text-gray-700">
            Les emplacements des parcs nationaux — Forillon, parc de la Gaspésie, Bic sur la route —
            partent des mois à l’avance pour juillet et août, particulièrement pendant les vacances
            de la construction. Si vous visez ces dates, réservez dès l’ouverture des réservations.
            À défaut, les campings privés et municipaux offrent souvent plus de disponibilité et se
            trouvent parfois mieux situés pour visiter un village.
          </p>

          <H3 className="mt-6 text-xl font-semibold text-gray-900">Le camping à Percé</H3>

          <p className="text-gray-700">
            Le Géoparc exploite un <strong>camping au cœur du village de Percé</strong>, ce qui
            change beaucoup de choses : on laisse la voiture et on fait le village, les restaurants
            et le quai à pied. Un vrai avantage dans une localité où le stationnement devient
            difficile en haute saison. D’autres campings se répartissent autour de Percé, certains
            avec vue sur le rocher.
          </p>

          <H3 className="mt-6 text-xl font-semibold text-gray-900">Camper en montagne</H3>

          <p className="text-gray-700">
            Le camping du Mont-Jacques-Cartier a un intérêt stratégique évident : c’est de là que
            part la navette du sommet. Y dormir la veille évite une longue route de gravier au petit
            matin. Prévoyez des vêtements chauds — les nuits en altitude sont fraîches même en
            juillet — et sachez que les services y sont plus rudimentaires qu’en bord de mer.
          </p>

          <div className="rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100">
            <p className="text-gray-800">
              <strong>Le conseil qui sauve un voyage :</strong> ne planifiez pas une nuit de camping
              différente chaque soir. Monter et démonter le campement tous les jours, sur un circuit
              où les distances sont longues, épuise tout le monde. Deux ou trois camps de base de
              deux ou trois nuits chacun donnent un voyage bien plus agréable.
            </p>
          </div>
        </section>

        {/* Météo */}
        <section id="meteo" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            Météo en Gaspésie : la variable qui change tout
          </H2>

          <p className="text-gray-700">
            S’il y a une chose à comprendre avant de partir, c’est que la{' '}
            <strong>météo en Gaspésie</strong> ne se résume pas à une seule prévision. La péninsule
            est vaste, découpée entre le fleuve, la baie des Chaleurs et les montagnes, et les
            conditions peuvent être radicalement différentes à deux heures de route d’intervalle.
          </p>

          <H3 className="mt-6 text-xl font-semibold text-gray-900">Vérifiez par secteur</H3>

          <p className="text-gray-700">
            Consultez les prévisions par municipalité plutôt que pour « la Gaspésie ». La{' '}
            <strong>météo à Percé</strong> et celle de Sainte-Anne-des-Monts ou de Carleton
            racontent souvent trois histoires différentes le même jour. Le côté baie des Chaleurs
            est généralement plus chaud et plus abrité que la côte nord, exposée au fleuve.
          </p>

          <H3 className="mt-6 text-xl font-semibold text-gray-900">
            La montagne, un climat à part
          </H3>

          <p className="text-gray-700">
            Point crucial : la <strong>météo du Parc national de la Gaspésie</strong> se consulte
            séparément. En altitude dans les Chic-Chocs, il peut faire dix à quinze degrés de moins
            qu’au bord du fleuve, avec du vent soutenu, du brouillard qui masque complètement la
            vue, et de la neige possible même en été. Partir en shorts parce qu’il faisait 25 °C à
            Sainte-Anne-des-Monts est une erreur classique.
          </p>

          <p className="text-gray-700">
            Emportez toujours une couche chaude et un coupe-vent dans le sac, quelle que soit la
            prévision au départ. Sur le mont Jacques-Cartier, où la fenêtre de randonnée est déjà
            limitée à 10 h – 16 h, une météo qui tourne peut vous priver complètement de la vue.
          </p>

          <H3 className="mt-6 text-xl font-semibold text-gray-900">Le brouillard côtier</H3>

          <p className="text-gray-700">
            Fréquent au printemps et au début de l’été, surtout le matin, il se lève souvent en
            milieu de journée. S’il masque le rocher Percé à votre arrivée, ne repartez pas déçu :
            gardez une marge dans votre horaire et retentez en fin d’après-midi. C’est aussi une
            bonne raison de prévoir deux nuits à Percé plutôt qu’une.
          </p>

          <p className="text-gray-700">
            Enfin, les sorties en mer — observation des baleines, excursion vers l’île Bonaventure —
            dépendent directement des conditions et peuvent être annulées. Réservez-les en début de
            séjour plutôt que le dernier jour, pour vous garder une possibilité de reprise.
          </p>
        </section>

        <section id="hebergements" className="mx-auto mt-10 max-w-5xl space-y-6">
          <H2 className="text-2xl font-semibold text-gray-900">
            Où dormir en Gaspésie : hôtels vue mer, options famille et campings
          </H2>

          <p className="max-w-3xl text-gray-700">
            Choisir ses hébergements, c’est choisir le rythme de son voyage. Certains préfèrent la
            tente au bord de l’eau, d’autres aiment rentrer dans une chambre confortable après une
            journée à marcher ou à naviguer. L’idéal, c’est souvent de combiner les deux.
          </p>

          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <H3 className="text-xl font-semibold text-gray-900">Hôtels avec vue sur la mer</H3>
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              {hotelsVueMer.map((hotel) => (
                <StayCard key={hotel.name} {...hotel} />
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <H3 className="text-xl font-semibold text-gray-900">
              Hôtels famille & options confort
            </H3>
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              {hotelsFamillePiscine.map((hotel) => (
                <StayCard key={hotel.name} {...hotel} />
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <H3 className="text-xl font-semibold text-gray-900">Campings nature et bord de mer</H3>
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              {campings.map((camping) => (
                <StayCard key={camping.name} {...camping} />
              ))}
            </div>
          </div>
        </section>

        <section id="gastronomie" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            Manger en Gaspésie : cantines, bistros et producteurs locaux
          </H2>
          <p className="text-gray-700">
            En Gaspésie, on mange bien. Entre les cantines au bord de la route, les bistros de
            village, les poissonneries, les microbrasseries et les petites boulangeries, chaque
            arrêt peut devenir une découverte.
          </p>
          <BulletList items={restaurants} />
        </section>

        <section id="activites" className="mx-auto mt-10 max-w-3xl space-y-6">
          <H2 className="text-2xl font-semibold text-gray-900">
            Activités incontournables en Gaspésie avec ou sans enfants
          </H2>

          <div>
            <H3 className="text-lg font-semibold text-gray-900">
              Pour les amoureux de la mer et des grands paysages
            </H3>
            <BulletList items={mustDoActivities} />
          </div>

          <div>
            <H3 className="text-lg font-semibold text-gray-900">
              Idées spéciales familles : plages, musées, journées douces
            </H3>
            <BulletList items={familyIdeas} />
          </div>

          <div>
            <H3 className="text-lg font-semibold text-gray-900">
              Faune gaspésienne : baleines, oiseaux marins et caribous
            </H3>
            <BulletList items={wildlife} />
          </div>
        </section>

        <section id="conseils" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            Conseils pratiques pour un road trip Gaspésie serein
          </H2>

          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <span className="font-semibold text-gray-900">Météo :</span> prévois des couches, même
              en juillet. Sur les falaises ou sur l’eau, le vent peut être frais.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Réservations :</span> pour les campings
              en parcs nationaux et les hôtels vue mer, réserve plusieurs mois à l’avance.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Budget :</span> alterne activités
              payantes et gratuites pour ménager ton portefeuille.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Bagages :</span> complète ta préparation
              avec les guides{' '}
              <Link
                href="/blog/voyage-hotel"
                className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
              >
                voyage à l’hôtel
              </Link>{' '}
              et{' '}
              <Link
                href="/blog/voyage-camping"
                className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
              >
                checklist camping
              </Link>
              .
            </li>
          </ul>
        </section>

        <section id="faq" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            FAQ – Questions fréquentes sur un road trip en Gaspésie
          </H2>

          <div className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            {faqLd?.mainEntity?.map((item: any) => (
              <details key={item.name} className="group rounded-lg border border-gray-100 p-3">
                <summary className="cursor-pointer text-sm font-semibold text-gray-900 group-open:text-indigo-800">
                  {item.name}
                </summary>
                <p className="mt-2 text-sm text-gray-700">
                  {typeof item.acceptedAnswer?.text === 'string' ? item.acceptedAnswer.text : ''}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section id="conclusion" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            Laisser la Gaspésie te raconter son histoire
          </H2>

          <p className="text-gray-700">
            La Gaspésie, ce n’est pas seulement une suite de paysages spectaculaires. C’est la
            lumière sur le fleuve, la gentillesse des Gaspésiens, les odeurs de fumoir, les glaces
            mangées trop vite, les enfants qui s’endorment dans la voiture en parlant des baleines
            et des oiseaux.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/planificateur"
              className="rounded-full border border-gray-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-900 shadow-sm hover:bg-indigo-100"
            >
              Préparer ton itinéraire
            </Link>
            <Link
              href="/videos"
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              Regarder des vidéos inspirantes
            </Link>
            <Link
              href="/blog/voyage-voiture"
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              Lire le guide voyage en voiture
            </Link>
          </div>
        </section>
      </DestinationArticleTemplate>
    </>
  );
}
