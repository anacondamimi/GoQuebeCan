'use client';

import Image from 'next/image';
import Link from 'next/link';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { buildMetadata2025 } from '@/lib/seo/buildMetadata2025';
import { buildDestinationLd } from '@/lib/seo/buildDestinationLd';
import { buildBreadcrumbLd } from '@/lib/seo/buildBreadcrumbLd';
import { buildHowToLd } from '@/lib/seo/buildHowToLd';
import { buildFaqLd } from '@/lib/seo/buildFaqLd';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';

export const dynamic = 'force-static';
export const revalidate = 60 * 60 * 24; // 24 h

// ======= CONSTANTES SEO =======

const TITLE = 'Gaspésie – Road trip en famille (7 jours) | Guide 2025';
const DESCRIPTION =
  'Itinéraire 7 jours en Gaspésie avec enfants : Forillon, Percé, baleines, plages, campings, hôtels famille, cantines, producteurs locaux et conseils pratiques. Road trip clé en main avec liens vers le planificateur GoQuébeCAN.';
const CANONICAL = 'https://goquebecan.com/blog/gaspesie';
const OG_IMAGE = 'https://goquebecan.com/images/destinations/gaspesie-og-1200x630.jpg';

const KEYWORDS = [
  'Gaspésie',
  'road trip Gaspésie',
  'Gaspésie en famille',
  'Forillon',
  'Percé',
  'baleines Gaspésie',
  'camping Gaspésie',
  'hôtels Gaspésie',
  'road trip Québec',
  'idées vacances Québec',
];

const PUBLISHED = '2025-07-01';
const MODIFIED = '2026-01-14';

// ======= METADATA SEO 2025 =======

export const metadata = buildMetadata2025({
  title: TITLE,
  description: DESCRIPTION,
  canonical: CANONICAL,
  image: OG_IMAGE,
  keywords: KEYWORDS,
});

// ======= TYPES =======

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

// ======= DONNÉES HÉBERGEMENTS =======

const hotelsVueMer: StayCardProps[] = [
  {
    name: 'Riôtel Percé',
    location: 'Percé',
    type: 'Hôtel vue mer',
    description:
      'Chambres modernes face au Rocher Percé, avec terrasse pour admirer le lever du soleil et finir la journée en douceur après les excursions en bateau.',
    link: 'https://www.booking.com/hotel/ca/riotel-perce.fr.html',
    image: '/images/destinations/hotels/riohotel-perce.avif',
    extra:
      'Idéal pour les familles qui veulent un peu de confort tout en restant au cœur de l’action.',
  },
  {
    name: 'Hôtel des Commandants',
    location: 'Gaspé',
    type: 'Hôtel centre-ville',
    description:
      'Point de chute pratique pour explorer le parc Forillon, avec restaurants et services accessibles à pied. Parfait pour alterner journées “plein air” et moments plus urbains.',
    link: 'https://www.booking.com/hotel/ca/motel-plante.fr.html?aid=304142&label=gen173rf-10CAsoJ0IMcmlvdGVsLXBlcmNlSA1YA2gniAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBogIObG9jYWxob3N0OjMwMDCoAgG4AvqzoMsGwAIB0gIkOGQyNWEwZmQtOGE4NC00YzBmLWIxZmUtYWY3YWViZGRhZDJk2AIB4AIB&sid=9d202b892b581cafd0019c7f0748e2a5&age=0&all_sr_blocks=31445511_421538538_2_0_0&checkin=2026-01-28&checkout=2026-01-29&dest_id=-565124&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=2&highlighted_blocks=31445511_421538538_2_0_0&hpos=2&matching_block_id=31445511_421538538_2_0_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=31445511_421538538_2_0_0__14995&srepoch=1768430475&srpvid=4fe59f52eb1f0444&type=total&ucfs=1&',
    image: '/images/destinations/hotels/hotelplante.avif',
    extra: 'Pratique si tu voyages avec des ados qui aiment flâner en ville le soir.',
  },
  {
    name: 'Manoir Belle Plage',
    location: 'Carleton-sur-Mer',
    type: 'Hôtel bord de mer',
    description:
      'Atmosphère chaleureuse, vue sur la baie et accès facile à la plage pour les couchers de soleil. Une belle option pour finir le road trip sur une note relax.',
    link: 'https://www.booking.com/hotel/ca/manoir-belle-plage.fr.html',
    image: '/images/destinations/hotels/manoirbelleplage.avif',
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
    link: 'https://www.booking.com/hotel/ca/auberge-seigneurie-des-monts.fr.html?label=gen173rf-10CAsoJ0IMcmlvdGVsLXBlcmNlSA1YA2gniAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBogIObG9jYWxob3N0OjMwMDCoAgG4AvqzoMsGwAIB0gIkOGQyNWEwZmQtOGE4NC00YzBmLWIxZmUtYWY3YWViZGRhZDJk2AIB4AIB&aid=304142&ucfs=1&checkin=2026-04-06&checkout=2026-04-10&dest_id=3602&dest_type=region&group_adults=2&no_rooms=1&group_children=0&srpvid=087ea0c971000196&srepoch=1768431159&matching_block_id=40613001_203767764_2_0_0&atlas_src=sr_iw_title',
    image: '/images/destinations/hotels/auberge-seigneurie-des-monts.avif',
    extra: 'Parfait pour les familles qui alternent randonnée et moments cocooning.',
  },
  {
    name: 'Hostellerie Baie-Bleue',
    location: 'Carleton-sur-Mer',
    type: 'Hôtel avec piscine',
    description:
      'Grande piscine extérieure en saison, accès à la plage et vue sur la baie. Les enfants adorent se baigner pendant que les adultes profitent du paysage.',
    link: 'https://www.booking.com/hotel/ca/hostellerie-baie-bleue.fr.html',
    image: '/images/destinations/hotels/riotel carleton.avif',
    extra: 'Solution idéale pour les journées de vent fort ou de météo incertaine.',
  },
  {
    name: 'Auberge des Caps',
    location: 'Cap-Chat',
    type: 'Auberge familiale',
    description:
      'Ambiance simple et conviviale, avec chambres adaptées aux familles et proximité du fleuve. Un bon point de chute entre parc de la Gaspésie et mer.',
    link: 'https://www.booking.com/hotel/ca/chalets-valmont-plein-air.fr.html?label=gen173rf-10CAsoJ0IMcmlvdGVsLXBlcmNlSA1YA2gniAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBogIObG9jYWxob3N0OjMwMDCoAgG4AvqzoMsGwAIB0gIkOGQyNWEwZmQtOGE4NC00YzBmLWIxZmUtYWY3YWViZGRhZDJk2AIB4AIB&aid=304142&ucfs=1&checkin=2026-04-06&checkout=2026-04-10&dest_id=900040525&dest_type=city&group_adults=2&no_rooms=1&group_children=0&srpvid=92cea16b831b0590&srepoch=1768431535&matching_block_id=381179907_121141165_2_0_0&atlas_src=sr_iw_title',
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
    image: '/images/destinations/carleton.avif',
    extra: 'Très apprécié des familles qui aiment combiner vélo, plage et cantine.',
  },
];

// ======= DONNÉES ACTIVITÉS / RESTOS =======

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
      'Montagnes, caribous (à respecter à distance) et multiples sentiers pour adapter les randos à ton niveau et à l’âge des enfants.',
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
      'Ils sont fragiles et protégés : on les admire de loin, en respectant à la lettre les indications du parc. Une belle occasion d’enseigner le respect de la faune aux enfants.',
  },
];

// ======= JSON-LD (Breadcrumb, Destination, HowTo, FAQ) =======

const breadcrumbLd = buildBreadcrumbLd([
  { name: 'Accueil', item: 'https://goquebecan.com' },
  { name: 'Blog', item: 'https://goquebecan.com/blog' },
  { name: 'Gaspésie', item: CANONICAL },
]);

const destinationLd = buildDestinationLd({
  name: 'Gaspésie – road trip en famille',
  description: DESCRIPTION,
  url: CANONICAL,
  image: OG_IMAGE,
  latitude: 48.836, // approximatif, région Gaspé
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
      'Oui, surtout l’été et pour les hébergements avec vue ou les campings dans les parcs nationaux. Il est recommandé de réserver plusieurs mois à l’avance et d’utiliser un planificateur de voyage pour tout noter.',
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
      'Une semaine est un bon minimum pour faire le tour sans courir, mais tu peux facilement étirer à 10 ou 14 jours en ajoutant des journées plages, randos ou visites chez les producteurs locaux.',
  },
]);

// ======= COMPOSANTS D’AFFICHAGE =======

function StayCard({ name, location, type, description, link, image, extra }: StayCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-52 w-full overflow-hidden">
        <Link href={link} target="_blank" rel="sponsored noopener nofollow">
          <Image
            src={image}
            alt={`${name} — hébergement recommandé en Gaspésie à ${location}`}
            fill
            className="object-cover transition-transform duration-300 hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
          />
        </Link>
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
          <Link
            href={link}
            target="_blank"
            rel="sponsored noopener nofollow"
            className="inline-flex items-center text-sm font-semibold text-indigo-800 underline-offset-2 hover:underline"
          >
            Voir les disponibilités sur Booking
          </Link>
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

// ======= PAGE PRINCIPALE =======

export default function Page() {
  return (
    <>
      {/* SEO TECHNIQUE */}
      <HeadExtras
        ogUpdatedTime={`${MODIFIED}T00:00:00-04:00`}
        ogSeeAlso={[
          'https://goquebecan.com/destinations/fjord-saguenay',
          'https://goquebecan.com/blog/voyage-voiture',
          'https://goquebecan.com/blog/voyage-camping',
        ]}
        articlePublishedTime={`${PUBLISHED}T00:00:00-04:00`}
        articleModifiedTime={`${MODIFIED}T00:00:00-04:00`}
      />
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={destinationLd} />
      <JsonLd data={howTo7DaysLd} />
      <JsonLd data={faqLd} />

      {/* HERO / INTRO */}
      <main className="mx-auto max-w-5xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <H1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Gaspésie – le road trip en famille qui reste dans le cœur
          </H1>
          <p className="mt-3 text-lg text-gray-700">
            Route 132, villages colorés, phares, baleines et couches-tard sur la plage : la
            Gaspésie, c&apos;est plus qu&apos;un itinéraire, c&apos;est un voyage qui se vit en
            famille. Que tu partes avec de jeunes enfants, des ados ou en duo, tu peux adapter le
            rythme, les arrêts et le type d&apos;hébergement pour que tout le monde y trouve son
            compte.
          </p>
          <p className="mt-3 text-sm text-gray-600">
            Pour t&apos;aider à tout organiser sans stress, tu peux utiliser le{' '}
            <Link
              href="/planificateur"
              className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
            >
              planificateur GoQuébeCAN
            </Link>
            , et jeter un œil à nos guides{' '}
            <Link
              href="/blog/voyage-voiture"
              className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
            >
              objets indispensables pour voyager en voiture
            </Link>{' '}
            ainsi que{' '}
            <Link
              href="/blog/voyage-hotel"
              className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
            >
              astuces pour séjourner à l’hôtel en famille
            </Link>
            .
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Dernière mise à jour : {new Date(MODIFIED).toLocaleDateString('fr-CA')}
          </p>
        </header>

        <div className="relative mb-10 overflow-hidden rounded-2xl">
          <Image
            src="/images/destinations/parc-gaspesie.avif"
            alt="Route de la Gaspésie en bord de mer, falaises, mer bleue et ciel dégagé"
            width={1920}
            height={1080}
            priority
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
          />
        </div>

        {/* ITINÉRAIRE 7 JOURS */}
        <section id="itineraire" className="mx-auto max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            Itinéraire 7 jours en Gaspésie avec enfants (et parents heureux)
          </H2>
          <p className="text-gray-700">
            Ici, pas question de cocher une liste de “must see” en courant. L&apos;idée, c&apos;est
            de faire un vrai tour de Gaspésie qui laisse de la place aux imprévus, aux arrêts
            cantine, aux producteurs locaux, aux discussions avec les Gaspésiens et aux journées où
            on décide simplement d&apos;aller à la plage. Utilise cet itinéraire comme une base, et
            ajuste-le dans ton{' '}
            <Link
              href="/planificateur"
              className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
            >
              planificateur GoQuébeCAN
            </Link>
            .
          </p>

          <div className="mt-4 space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <H3 className="text-lg font-semibold text-gray-900">
              Jour 1 – Montréal / Québec → Rimouski / Sainte-Flavie
            </H3>
            <p className="text-sm text-gray-700">
              On quitte la ville tranquillement en direction de Rimouski ou Sainte-Flavie. On fait
              quelques arrêts en chemin pour dégourdir les jambes : parc, aire de jeux, petite
              fromagerie ou café de village. On commence déjà à sentir l&apos;air salin, et les
              enfants voient le fleuve de plus en plus large. C&apos;est le moment idéal pour tester
              ton organisation de voiture (collations, sacs de plage, jouets) abordée dans notre
              guide sur les{' '}
              <Link
                href="/blog/voyage-voiture"
                className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
              >
                objets indispensables pour voyager en voiture
              </Link>
              .
            </p>
          </div>

          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <H3 className="text-lg font-semibold text-gray-900">
              Jour 2 – Sainte-Anne-des-Monts & parc national de la Gaspésie
            </H3>
            <p className="text-sm text-gray-700">
              Direction les montagnes. On s&apos;installe du côté de Sainte-Anne-des-Monts ou
              directement au{' '}
              <Link
                href="https://www.sepaq.com/pq/gas/index.dot"
                target="_blank"
                rel="noopener nofollow"
                className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
              >
                parc national de la Gaspésie
              </Link>
              . On choisit une courte randonnée adaptée aux enfants, un belvédère accessible ou une
              balade en bord de rivière. Les parents amoureux de plein air peuvent se promettre de
              revenir une autre fois pour les grands sommets. En soirée, on profite d&apos;un bon
              souper simple et on prend le temps de respirer : on est enfin en vacances.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <H3 className="text-lg font-semibold text-gray-900">
              Jour 3 – Gaspé & parc national Forillon : falaises et baleines
            </H3>
            <p className="text-sm text-gray-700">
              On longe la côte vers Gaspé et le parc national Forillon. Au programme : belvédères
              impressionnants, marche facile jusqu&apos;à un phare, observation de la faune. Selon
              la météo et la saison, on ajoute une sortie en bateau pour tenter de voir baleines et
              phoques. Les enfants retiennent souvent ce jour-là comme l&apos;un des plus magiques
              du voyage. On alterne glissades sur les roches, petites siestes en voiture et
              collations à l&apos;ombre.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <H3 className="text-lg font-semibold text-gray-900">
              Jour 4 – Percé & île Bonaventure : carte postale gaspésienne
            </H3>
            <p className="text-sm text-gray-700">
              Percé, c&apos;est la carte postale qui devient réalité. On prend le bateau pour faire
              le tour du Rocher Percé, puis on débarque sur l&apos;île Bonaventure pour une marche
              en douceur jusqu&apos;à la colonie de fous de Bassan. En fin de journée, on mange dans
              une cantine ou une microbrasserie, et on regarde les enfants raconter à leur façon ce
              qu&apos;ils viennent de vivre. C&apos;est aussi un bon moment pour faire un tour chez
              un producteur local ou dans une petite boutique d&apos;artisanat.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <H3 className="text-lg font-semibold text-gray-900">
              Jour 5 – Baie-des-Chaleurs & Carleton-sur-Mer : douceur et coucher de soleil
            </H3>
            <p className="text-sm text-gray-700">
              On descend vers la Baie-des-Chaleurs. On profite des plages, du vélo, des glaces et
              des terrasses. À Carleton-sur-Mer, les enfants peuvent courir sur la grève pendant que
              les parents admirent le coucher de soleil. C&apos;est le moment idéal pour planifier
              une soirée calme, un jeu de société, ou une discussion tranquille sur ce que chacun a
              préféré dans le voyage. On peut aussi visiter quelques producteurs locaux pour ramener
              des saveurs de Gaspésie à la maison.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <H3 className="text-lg font-semibold text-gray-900">
              Jour 6 – Vallée de la Matapédia : retour en douceur
            </H3>
            <p className="text-sm text-gray-700">
              On remonte doucement par la vallée de la Matapédia, en s&apos;arrêtant dans quelques
              villages, belvédères ou parcs. Au lieu de voir cette journée comme un simple “retour à
              la maison”, on peut la vivre comme une transition : derniers pique-niques, dernière
              cantine, dernière occasion de discuter avec des Gaspésiens. On note dans le{' '}
              <Link
                href="/planificateur"
                className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
              >
                planificateur
              </Link>{' '}
              ce qu&apos;on veut refaire ou approfondir une prochaine fois.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <H3 className="text-lg font-semibold text-gray-900">
              Jour 7 – Jour tampon : météo, fatigue, coups de cœur
            </H3>
            <p className="text-sm text-gray-700">
              Ce jour “bonus” est précieux. Il permet de gérer une journée de pluie, une fatigue
              générale, ou simplement un coup de cœur où on a envie de rester un peu plus longtemps.
              Tu peux l’utiliser pour une activité aquatique dans un{' '}
              <Link
                href="/blog/parc-aquatique"
                className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
              >
                parc aquatique
              </Link>
              , une journée à l’hôtel avec piscine ou un détour par le Saguenay si les fjords te
              font rêver (notre guide complet sur le{' '}
              <Link
                href="/destinations/fjord-saguenay"
                className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
              >
                Saguenay
              </Link>
              ).
            </p>
          </div>
        </section>

        {/* HÉBERGEMENTS */}
        <section id="hebergements" className="mx-auto mt-10 max-w-5xl space-y-6">
          <H2 className="text-2xl font-semibold text-gray-900">
            Où dormir en Gaspésie : hôtels vue mer, options famille et campings
          </H2>
          <p className="max-w-3xl text-gray-700">
            Choisir ses hébergements, c’est choisir le rythme de son voyage. Certains préfèrent la
            tente au bord de l&apos;eau, d’autres aiment rentrer dans une chambre confortable après
            une journée à marcher ou à naviguer. L&apos;idéal, c&apos;est souvent de combiner les
            deux : quelques nuits en camping pour vivre la nature à fond, et deux ou trois nuits en
            hôtel pour bien se reposer.
          </p>

          {/* Hôtels vue mer */}
          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <H3 className="text-xl font-semibold text-gray-900">Hôtels avec vue sur la mer</H3>
            <p className="text-sm text-gray-700">
              Ces adresses sont parfaites si tu veux des couchers de soleil sur l’eau, des déjeuners
              face au paysage, et la possibilité de rentrer rapidement après une croisière ou une
              grande journée de visite. Idéal pour les couples, mais aussi pour les familles qui
              aiment un peu de confort.
            </p>
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              {hotelsVueMer.map((hotel) => (
                <StayCard key={hotel.name} {...hotel} />
              ))}
            </div>
          </div>

          {/* Hôtels famille */}
          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <H3 className="text-xl font-semibold text-gray-900">
              Hôtels famille & options confort
            </H3>
            <p className="text-sm text-gray-700">
              Quand les enfants ont bien marché, qu&apos;il a venté toute la journée ou que la météo
              joue avec tes nerfs, une chambre confortable, une piscine ou simplement un bon lit
              deviennent des alliés précieux. Ces options sont pensées pour les familles qui veulent
              garder un bon niveau de confort tout en explorant la région.
            </p>
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              {hotelsFamillePiscine.map((hotel) => (
                <StayCard key={hotel.name} {...hotel} />
              ))}
            </div>
          </div>

          {/* Campings */}
          <div className="space-y-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            <H3 className="text-xl font-semibold text-gray-900">Campings nature et bord de mer</H3>
            <p className="text-sm text-gray-700">
              La Gaspésie, c&apos;est aussi le plaisir de dormir sous la tente, d’entendre la mer le
              soir et de faire déjeuner les enfants devant un paysage qui ressemble à une carte
              postale. Si tu prévois un road trip en tente, en VR ou en van, pense aussi à jeter un
              œil à notre article sur les{' '}
              <Link
                href="/blog/voyage-camping"
                className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
              >
                produits indispensables pour le camping
              </Link>
              .
            </p>
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              {campings.map((camping) => (
                <StayCard key={camping.name} {...camping} />
              ))}
            </div>
          </div>
        </section>

        {/* GASTRONOMIE & PRODUCTEURS */}
        <section id="gastronomie" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            Manger en Gaspésie : cantines, bistros et producteurs locaux
          </H2>
          <p className="text-gray-700">
            En Gaspésie, on mange bien. Très bien. Entre les cantines au bord de la route, les
            bistros de village, les poissonneries, les microbrasseries et les petites boulangeries,
            tu peux transformer chaque arrêt en découverte. C’est aussi une belle façon de
            rencontrer les Gaspésiens, de discuter quelques minutes et d&apos;entendre leurs
            histoires du quotidien.
          </p>
          <BulletList items={restaurants} />
          <p className="text-sm text-gray-700">
            N’hésite pas à planifier quelques haltes gourmandes dans ton{' '}
            <Link
              href="/planificateur"
              className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
            >
              planificateur GoQuébeCAN
            </Link>
            , surtout si tu voyages avec des enfants curieux qui aiment découvrir de nouvelles
            saveurs. Et si tu veux prolonger l&apos;expérience côté “eau”, pense à ajouter un{' '}
            <Link
              href="/blog/parc-aquatique"
              className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
            >
              parc aquatique
            </Link>{' '}
            à ton itinéraire, avant ou après la Gaspésie.
          </p>
        </section>

        {/* ACTIVITÉS */}
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
              Idées spéciales familles : plages, musées, journées “douces”
            </H3>
            <BulletList items={familyIdeas} />
          </div>

          <div>
            <H3 className="text-lg font-semibold text-gray-900">
              Faune gaspésienne : baleines, oiseaux marins et caribous
            </H3>
            <BulletList items={wildlife} />
          </div>

          <p className="text-sm text-gray-700">
            Si tu voyages avec une voiture électrique, tu peux organiser tes arrêts activités en
            même temps que tes recharges. Plusieurs hébergements et villages disposent de bornes. Tu
            trouveras des idées d&apos;organisation dans notre article sur les{' '}
            <Link
              href="/blog/voyage-voiture"
              className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
            >
              produits indispensables pour voyager en voiture (et en voiture électrique)
            </Link>
            .
          </p>
        </section>

        {/* CONSEILS PRATIQUES */}
        <section id="conseils" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            Conseils pratiques 2025 pour un road trip Gaspésie serein
          </H2>
          <p className="text-gray-700">
            La météo peut changer vite, les distances sont parfois sous-estimées, et l&apos;été, les
            hébergements se réservent très rapidement. En 2025, planifier un minimum est devenu
            presque indispensable, surtout si tu veux des campings ou hôtels bien situés.
          </p>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <span className="font-semibold text-gray-900">Météo :</span> prévois des couches
              (t-shirt, laine, coupe-vent), même en juillet. Sur les falaises ou sur l&apos;eau, le
              vent peut être frais.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Réservations :</span> pour les campings
              en parcs nationaux et les hôtels vue mer, réserve plusieurs mois à l&apos;avance. Note
              tout dans ton{' '}
              <Link
                href="/planificateur"
                className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
              >
                planificateur GoQuébeCAN
              </Link>
              .
            </li>
            <li>
              <span className="font-semibold text-gray-900">Budget :</span> alterne activités
              payantes (croisières, musées) et gratuites (plages, belvédères, randos). Ça ménage ton
              portefeuille et tes journées.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Bagages :</span> pour la partie
              hébergement, notre article sur les{' '}
              <Link
                href="/blog/voyage-hotel"
                className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
              >
                indispensables à l&apos;hôtel
              </Link>{' '}
              t&apos;aidera à ne rien oublier. Pour la tente et le VR, jette un œil à{' '}
              <Link
                href="/blog/voyage-camping"
                className="font-semibold text-indigo-800 underline-offset-2 hover:underline"
              >
                notre checklist camping
              </Link>
              .
            </li>
          </ul>
        </section>

        {/* FAQ (rendue pour l’utilisateur, en plus du JSON-LD) */}
        <section id="faq" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            FAQ – Questions fréquentes sur un road trip en Gaspésie
          </H2>
          <div className="space-y-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
            {faqLd.mainEntity.map((item: any) => (
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

        {/* CONCLUSION & CTA */}
        <section id="conclusion" className="mx-auto mt-10 max-w-3xl space-y-4">
          <H2 className="text-2xl font-semibold text-gray-900">
            Laisser la Gaspésie te raconter son histoire
          </H2>
          <p className="text-gray-700">
            La Gaspésie, ce n’est pas seulement une suite de paysages spectaculaires. C’est la
            lumière sur le fleuve, la gentillesse des Gaspésiens, les odeurs de fumoir, les glaces
            mangées trop vite, les enfants qui s’endorment dans la voiture en parlant des baleines
            et des oiseaux. C’est un voyage qui continue longtemps dans les conversations, les
            photos et les envies de “on y retourne quand ?”.
          </p>
          <p className="text-gray-700">
            Si cet article t&apos;a aidé à y voir plus clair, tu peux maintenant :
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/planificateur"
              className="rounded-full border border-gray-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-900 shadow-sm hover:bg-indigo-100"
            >
              Préparer ton itinéraire dans le planificateur
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
            <Link
              href="/blog/voyage-camping"
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              Vérifier ta checklist camping
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
