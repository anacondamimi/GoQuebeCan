import Image from 'next/image';
import Link from 'next/link';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { buildMetadata2025 } from '@/lib/seo/buildMetadata2025';
import { buildDestinationLd } from '@/lib/seo/buildDestinationLd';
import { buildBreadcrumbLd } from '@/lib/seo/buildBreadcrumbLd';
import { buildHowToLd } from '@/lib/seo/buildHowToLd';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';

/**
 * 👉 VERSION RÉFÉRENCE (SEO 2025) — Destinations / Saguenay
 * Next.js 14.2.30 – Static SSG + JSON-LD renforcé + accessibilité + liens affiliés durcis
 */

export const dynamic = 'force-static';
export const revalidate = 60 * 60 * 24; // 24h

// ======= MÉTADONNÉES =======
const TITLE = 'Saguenay (Chicoutimi, Jonquière, La Baie) – Guide complet 2025';
const DESCRIPTION =
  'Entre fjord majestueux, adresses gourmandes et activités pour tous les âges : notre guide complet pour réussir vos vacances à Saguenay (Chicoutimi, Jonquière, La Baie). Itinéraire, hôtels, restos, points de vue, baleines, producteurs locaux, bornes EV et liens utiles.';
const CANONICAL = 'https://goquebecan.com/destinations/fjord-saguenay';
const OG_IMAGE = 'https://goquebecan.com/images/saguenay/og-saguenay-1200x630.jpg';
const KEYWORDS = [
  'Saguenay',
  'Chicoutimi',
  'Jonquière',
  'La Baie',
  'fjord du Saguenay',
  'baleines Tadoussac',
  'idées voyage Québec',
  'hôtels Saguenay',
  'restaurants Saguenay',
  'producteurs locaux Saguenay',
  'bornes recharge Saguenay',
];

const PUBLISHED = '2025-06-15';
const MODIFIED = '2026-03-09';

// ======= LIENS EXTERNES / AFFILIÉS =======
const isExternal = (url: string) => /^https?:\/\//.test(url) && !url.includes('goquebecan.com');

type HotelCardProps = {
  href: string;
  image: string;
  title: string;
  badge?: string;
  subtitle?: string;
  priceText?: string;
  rel?: string;
  target?: '_blank' | '_self';
};

function HotelCard({
  href,
  image,
  title,
  badge,
  subtitle,
  priceText,
  rel,
  target,
}: HotelCardProps) {
  const external = isExternal(href);
  const finalRel = rel ?? (external ? 'sponsored noopener nofollow' : undefined);
  const finalTarget = target ?? (external ? '_blank' : undefined);

  return (
    <article className="group rounded-2xl border bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
      <div className="relative overflow-hidden rounded-t-2xl">
        <Link href={href} aria-label={`Voir ${title}`} rel={finalRel} target={finalTarget}>
          <Image
            src={image}
            alt={`${title} — hébergement recommandé à Saguenay`}
            width={900}
            height={600}
            className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
            priority={false}
          />
        </Link>
        {badge ? (
          <span className="absolute right-3 top-3 select-none rounded-lg bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-900 shadow-sm">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <Link href={href} rel={finalRel} target={finalTarget} className="block">
          <H3 className="mb-1 text-xl font-semibold leading-tight text-gray-900 group-hover:underline">
            {title}
          </H3>
        </Link>
        {subtitle ? <p className="mb-4 text-gray-700">{subtitle}</p> : null}
        {priceText ? (
          <Link
            href={href}
            rel={finalRel}
            target={finalTarget}
            className="inline-block font-semibold text-indigo-800 underline-offset-2 hover:underline"
          >
            {priceText}
          </Link>
        ) : null}
      </div>
    </article>
  );
}

// ======= METADATA SEO 2025 =======
export const metadata = buildMetadata2025({
  title: TITLE,
  description: DESCRIPTION,
  canonical: CANONICAL,
  image: OG_IMAGE,
  keywords: KEYWORDS,
});

// ======= PAGE SAGUENAY =======
export default function Page() {
  // ===== JSON-LD STRUCTURÉ =====
  const breadcrumb = buildBreadcrumbLd([
    { name: 'Accueil', item: 'https://goquebecan.com' },
    { name: 'Destinations', item: 'https://goquebecan.com/destinations' },
    { name: 'Saguenay', item: CANONICAL },
  ]);

  const destination = buildDestinationLd({
    name: 'Saguenay (Chicoutimi, Jonquière, La Baie)',
    description: DESCRIPTION,
    url: CANONICAL,
    image: OG_IMAGE,
    latitude: 48.418,
    longitude: -71.052,
    containedPlaces: ['Chicoutimi', 'Jonquière', 'La Baie'],
    touristType: ['Famille', 'Plein air', 'Gastronomie', 'EV-friendly'],
    rating: { value: 4.8, count: 126 },
  });

  const howto3jours = buildHowToLd({
    name: 'Comment planifier 3 jours au Saguenay',
    description:
      'Répartition des journées pour voir l’essentiel sans courir : Chicoutimi, Jonquière et La Baie.',
    totalTimeISO: 'P3D',
    steps: [
      {
        name: 'Jour 1 – Chicoutimi',
        text: 'Installation, balade au Vieux-Port et souper au bord du fjord.',
      },
      { name: 'Jour 2 – Jonquière', text: 'Randonnée, musée local, cantine populaire et détente.' },
      {
        name: 'Jour 3 – La Baie',
        text: 'Belvédères du fjord, artisans locaux et observation des baleines.',
      },
    ],
  });

  return (
    <>
      {/* ======= SEO STRUCTURÉ ======= */}
      <HeadExtras
        ogUpdatedTime="2025-10-31T00:00:00-04:00"
        ogSeeAlso={[
          'https://goquebecan.com/destinations/charlevoix',
          'https://goquebecan.com/destinations/gaspesie',
        ]}
        articlePublishedTime={`${PUBLISHED}T00:00:00-04:00`}
        articleModifiedTime={`${MODIFIED}T00:00:00-04:00`}
      />
      <JsonLd data={breadcrumb} />
      <JsonLd data={destination} />
      <JsonLd data={howto3jours} />
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <header className="mb-8 text-center">
          <H1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Saguenay (Chicoutimi, Jonquière, La Baie) — le guide complet pour des vacances
            inoubliables
          </H1>
          <p className="mt-3 text-lg text-gray-700">
            Le fjord, la lumière, les gens : au Saguenay, on respire plus grand. Voici notre
            itinéraire vivant, tendre et pratique, pour mêler émotions, saveurs locales et aventures
            douces.
          </p>
          <p className="mt-2 text-sm text-gray-500">Dernière mise à jour : 31 octobre 2025</p>
        </header>

        <div className="relative mb-8 overflow-hidden rounded-2xl">
          <Image
            src="/images/destinations/fjord-saguenay.avif"
            alt="Fjord du Saguenay au lever du jour, falaises sombres et eau profonde"
            width={1920}
            height={1080}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
            priority
          />
        </div>

        {/* Sommaire ancré */}
        <nav aria-label="Sommaire" className="mb-10 rounded-xl bg-gray-50 p-5">
          <p className="mb-3 font-semibold">Sommaire</p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            <li>
              <a href="#planifier" className="hover:underline">
                Planifier l’itinéraire
              </a>
            </li>
            <li>
              <a href="#hebergements" className="hover:underline">
                Hébergements
              </a>
            </li>
            <li>
              <a href="#gastronomie" className="hover:underline">
                Gastronomie & spécialités
              </a>
            </li>
            <li>
              <a href="#activites" className="hover:underline">
                Activités famille & plein air
              </a>
            </li>
            <li>
              <a href="#panoramas" className="hover:underline">
                Points de vue & baleines
              </a>
            </li>
            <li>
              <a href="#producteurs" className="hover:underline">
                Producteurs locaux
              </a>
            </li>
            <li>
              <a href="#ev" className="hover:underline">
                Bornes EV & conseils
              </a>
            </li>
            <li>
              <a href="#itineraire" className="hover:underline">
                Itinéraire type
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </nav>
      </section>

      {/* PLANIFIER */}
      <section id="planifier" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <H2 className="mb-4 text-2xl font-semibold">Planifier l’itinéraire (simple & inspirant)</H2>
        <p className="mb-4">
          Commencez par visualiser vos étapes entre <strong>Chicoutimi</strong>,{' '}
          <strong>Jonquière</strong> et <strong>La Baie</strong> : combien de jours, quels temps
          forts (fjords, musées, gourmandises), et où dormir. Avant de partir, créez votre parcours
          personnalisé avec notre outil — c’est le meilleur moyen d’optimiser les trajets, surtout
          si vous voyagez en famille.
        </p>
        <p className="mb-6">
          👉{' '}
          <Link className="font-medium underline" href="/planificateur">
            Planifiez votre itinéraire sur notre carte interactive
          </Link>
          .
        </p>
        <p className="mb-2">
          Pour garder le sourire pendant les heures de route, piochez des idées d’animations et de
          pauses dans notre guide dédié :{' '}
          <Link className="font-medium underline" href="/blog/voyage-voiture">
            bien voyager en voiture
          </Link>
          .
        </p>
      </section>

      {/* HEBERGEMENTS */}
      <section id="hebergements" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <H2 className="mb-2 text-2xl font-semibold">Où Dormir ?</H2>
        <p className="mb-6 text-gray-700">
          Trois styles, trois ambiances — pour vivre Saguenay à ton rythme. Clique sur la photo pour
          vérifier les disponibilités et réserver.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          <HotelCard
            href="https://www.booking.com/hotel/ca/hotels-gouverneur-saguenay.fr.html?aid=357028"
            image="/images/destinations/hotels/hotel-gouverneur-saguenay.avif"
            title="OTL Gouverneur Saguenay"
            badge="Luxe"
            subtitle="Design moderne, spa PAÜS et restaurant Boefish — l’adresse chic pour un séjour tout confort."
            priceText="À partir de 199$/nuit"
          />

          <HotelCard
            href="https://www.booking.com/hotel/ca/le-montagnais-and-convention-center.fr.html?aid=357028"
            image="/images/destinations/hotels/montagnais-saguenay.avif"
            title="Hôtel Le Montagnais"
            badge="Familial"
            subtitle="Piscine intérieure, aires ludiques et localisation pratique pour rayonner entre Chicoutimi & Jonquière."
            priceText="À partir de 169$/nuit"
          />

          <HotelCard
            href="https://www.booking.com/hotel/ca/gite-du-haut-des-arbres.fr.html?aid=357028"
            image="/images/destinations/hotels/gite-haut-arbre-saguenay.avif"
            title="Gîte du Haut des Arbres"
            badge="Charme"
            subtitle="Cabanes perchées au cœur de la forêt saguenéenne — ambiance chaleureuse, vue nature et déconnexion assurée."
            priceText="À partir de 124$/nuit"
          />
        </div>
      </section>

      {/* GASTRONOMIE */}
      <section id="gastronomie" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <H2 className="mb-4 text-2xl font-semibold">
          Se régaler : restaurants, cantines, boulangeries & spécialités
        </H2>
        <div className="relative mb-6 overflow-hidden rounded-2xl">
          <Image
            src="/images/destinations/horizon-restaurant-saguenay.avif"
            alt="Gourmandises du Saguenay : bleuets, chocolats, pains et produits du fjord"
            width={1600}
            height={900}
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
        <p className="mb-4">
          Au Saguenay, on aime prendre le temps de bien manger. Entre bistros de marché et tables
          gourmandes, laissez-vous guider par vos envies : cuisine soignée avec produits du fjord,
          chocolateries artisanales pour réconforter petits et grands, et boulangeries où l’on
          craque pour un pain chaud au retour d’une randonnée.
        </p>
        <ul className="mb-4 list-inside list-disc space-y-2">
          <li>
            <strong>Tables soignées</strong> — cuisine de saison, poissons et viandes maturées,
            belles cartes des vins.
          </li>
          <li>
            <strong>Cantines & casse-croûte</strong> — parfait pour un midi simple avant de repartir
            sur les sentiers.
          </li>
          <li>
            <strong>Chocolateries & boulangeries</strong> — le goûter des familles et le péché
            mignon des sportifs.
          </li>
        </ul>
        <p className="mb-4">
          Côté <em>terroir</em>, goûtez aux <strong>bleuets</strong> (tartes, confitures, desserts),
          aux fromages régionaux, aux chocolats maison et aux poissons du fjord. Pour aller à la
          rencontre des artisans, explorez notre carte interactive des producteurs :{' '}
          <Link className="font-medium underline" href="/producteurs">
            producteurs locaux du Saguenay
          </Link>
          .
        </p>
      </section>

      {/* ACTIVITÉS */}
      <section id="activites" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <H2 className="mb-4 text-2xl font-semibold">
          Activités pour les enfants, ados et sportifs
        </H2>
        <p className="mb-4">
          La région est une formidable cour de récréation. Selon la saison, alternez entre
          randonnées accessibles, <strong>kayak</strong> sur eaux calmes encadrées, circuits vélo,
          parcours d’hébertisme, piscines d’hôtels et visites ludiques de musées. Les adolescents
          accrochent vite à l’aventure douce — et aux chocolateries (magie instantanée).
        </p>
        <ul className="mb-6 list-inside list-disc space-y-2">
          <li>Randonnées familiales vers belvédères sur le fjord (panoramas garantis).</li>
          <li>Vélo & cyclotourisme, avec portions adaptées pour rouler en sécurité.</li>
          <li>Kayak ou paddle en encadrement débutant (toujours vérifier météo/conditions).</li>
          <li>Musées & patrimoine (ex. Pulperie de Chicoutimi) pour relier culture et nature.</li>
          <li>Centres aquatiques et aires ludiques des hôtels pour souffler entre deux sorties.</li>
        </ul>
        <p className="mb-2">
          Si l’appel de la nature vous tente pour une nuit sous les étoiles, consultez notre{' '}
          <Link className="font-medium underline" href="/camping">
            guide des campings
          </Link>{' '}
          et préparez l’équipement malin avec{' '}
          <Link className="font-medium underline" href="/blog/voyage-camping">
            nos produits camping indispensables
          </Link>
          .
        </p>
      </section>

      {/* PANORAMAS & BALEINES */}
      <section id="panoramas" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <H2 className="mb-4 text-2xl font-semibold">Points de vue, fjord & baleines</H2>
        <div className="relative mb-6 overflow-hidden rounded-2xl">
          <Image
            src="/images/destinations/belvedere-fjord.avif"
            alt="Belvédère dominant le fjord du Saguenay au soleil bas"
            width={1600}
            height={900}
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </div>
        <p className="mb-4">
          Le <strong>fjord du Saguenay</strong> est un décor qui serre le cœur : falaises sombres,
          eau profonde, ciel changeant. Multipliez les belvédères au fil de la route vers La Baie ;
          certains accès sont très abordables pour les familles. Selon la saison, des{' '}
          <strong>sorties en bateau</strong> permettent d’observer les <strong>baleines</strong> :
          réservez tôt et choisissez des opérateurs respectueux de l’environnement.
        </p>
        <p className="mb-4">
          Envie d’un avant-goût visuel ? Plongez dans nos{' '}
          <Link className="font-medium underline" href="/videos">
            vidéos
          </Link>{' '}
          pour ressentir l’atmosphère avant de partir.
        </p>
      </section>

      {/* PRODUCTEURS LOCAUX */}
      <section id="producteurs" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <H2 className="mb-4 text-2xl font-semibold">Producteurs locaux & agrotourisme</H2>
        <p className="mb-4">
          C’est l’une des joies d’un voyage au Saguenay : rencontrer celles et ceux qui font la
          saveur du territoire. Fromages, bleuets, chocolats, charcuteries, boissons artisanales…
          Chaque halte est l’occasion d’un échange, d’une histoire, d’un coup de cœur — et souvent
          d’un panier qui se remplit.
        </p>
        <p className="mb-4">
          Pour vous repérer facilement et construire une tournée gourmande sans perdre de temps,
          ouvrez notre carte interactive :{' '}
          <Link className="font-medium underline" href="/producteurs">
            la carte des producteurs locaux
          </Link>
          .
        </p>
      </section>

      {/* BORNES EV */}
      <section id="ev" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <H2 className="mb-4 text-2xl font-semibold">Bornes de recharge (EV) & conseils de route</H2>
        <p className="mb-4">
          Les principaux secteurs urbains disposent de bornes publiques. Avant de partir, planifiez
          vos arrêts : vérifiez les parkings d’hôtels, les disponibilités des bornes et gardez une
          marge de sécurité, surtout en haute saison. Les applis de recharge sont vos alliées pour
          éviter les surprises.
        </p>
        <p className="mb-2">
          Pour rendre le trajet aussi agréable qu’efficace, piochez des idées futées dans notre
          guide{' '}
          <Link className="font-medium underline" href="/blog/voyage-voiture">
            bien voyager en voiture
          </Link>
          .
        </p>
      </section>

      {/* ITINÉRAIRE TYPE */}
      <section id="itineraire" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <H2 className="mb-4 text-2xl font-semibold">Itinéraire type (3–4 jours)</H2>
        <ol className="mb-6 list-inside list-decimal space-y-3">
          <li>
            <strong>Jour 1 — Chicoutimi :</strong> installation à l’hôtel (luxe ou milieu de gamme),
            balade en bord d’eau, dîner dans une table de marché et chocolat chaud au retour. La
            lumière tombe, le fjord respire — on décroche.
          </li>
          <li>
            <strong>Jour 2 — Jonquière :</strong> matin randonnée ou vélo, midi cantine locale,
            après-midi musée/patrimoine ou atelier gourmand, soirée douce à la piscine ou au spa
            selon l’hébergement.
          </li>
          <li>
            <strong>Jour 3 — Vers La Baie :</strong> arrêts panoramas + producteurs, installation à
            une auberge de charme, dîner terroir avec vue sur le fjord. Si le ciel est clair, sortez
            admirer les étoiles.
          </li>
          <li>
            <strong>Jour 4 — Fjord & baleines :</strong> sortie encadrée en bateau ou kayak,
            déjeuner tardif au bord de l’eau, retour ou prolongation selon votre rythme. Gardez un
            dernier instant pour regarder l’horizon.
          </li>
        </ol>
        <p className="mb-2">
          Si la tente vous appelle, lisez notre{' '}
          <Link className="font-medium underline" href="/camping">
            guide des campings
          </Link>{' '}
          et préparez l’équipement malin dans{' '}
          <Link className="font-medium underline" href="/blog/voyage-camping">
            nos indispensables camping
          </Link>
          .
        </p>
      </section>

      {/* FAQ visible */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <H2 className="mb-4 text-2xl font-semibold">FAQ – Questions fréquentes</H2>
        <div className="space-y-4">
          <details className="rounded-2xl border p-4">
            <summary className="cursor-pointer font-medium">
              Meilleure saison pour voir les baleines ?
            </summary>
            <p className="mt-2 text-gray-700">
              De la fin du printemps au début de l’automne, avec des variations selon météo et
              espèces. Réservez vos sorties et privilégiez les opérateurs responsables.
            </p>
          </details>
          <details className="rounded-2xl border p-4">
            <summary className="cursor-pointer font-medium">
              Saguenay avec enfants et ados, c’est adapté ?
            </summary>
            <p className="mt-2 text-gray-700">
              Oui : musées interactifs, chocolateries, sentiers faciles, piscines d’hôtels et
              activités encadrées sur l’eau.
            </p>
          </details>
          <details className="rounded-2xl border p-4">
            <summary className="cursor-pointer font-medium">Bornes EV : facile à trouver ?</summary>
            <p className="mt-2 text-gray-700">
              Dans les centres urbains, oui. Anticipez en haute saison et vérifiez la disponibilité
              en amont via les applis dédiées.
            </p>
          </details>
        </div>
      </section>

      {/* CTA fin d’article */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="@/components/PopularDestinations"
          className="rounded-full border px-5 py-3 font-medium hover:bg-gray-50"
        >
          Retourner aux destinations populaires
        </Link>
        <Link href="/videos" className="rounded-full border px-5 py-3 font-medium hover:bg-gray-50">
          Vidéos populaires
        </Link>
      </div>
    </>
  );
}
