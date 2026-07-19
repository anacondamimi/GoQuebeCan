import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import BrandName from '@/components/brand/BrandName';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const metadata: Metadata = {
  title: 'Coups de cœur GoQuébeCan | Producteurs et entrepreneurs locaux',
  description:
    'Découvrez les coups de cœur GoQuébeCan : producteurs, artisans et entrepreneurs locaux visités et recommandés pour leur savoir-faire, leurs produits et leur approche humaine.',
  alternates: {
    canonical: '/coups-de-coeur',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Coups de cœur GoQuébeCan',
    description:
      'Nos découvertes locales au Québec : producteurs, artisans et entrepreneurs visités et recommandés par GoQuébeCan.',
    url: '/coups-de-coeur',
    type: 'website',
    images: [
      {
        url: '/images/offres/coups-de-coeur-fromagerie-julio.avif',
        width: 800,
        height: 800,
        alt: 'Fromagerie Julio à Granby, coup de cœur GoQuébeCan',
      },
    ],
  },
};

type CoupDeCoeur = {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  category: string;
  quote?: string;
  isCurrent?: boolean;
};

const coupDeCoeurActuel: CoupDeCoeur = {
  title: 'Fromagerie Julio',
  description:
    "Bien plus qu'une simple fromagerie, c'est une belle rencontre avec une entreprise familiale passionnée, des produits fabriqués sur place et un accueil qui fait toute la différence.",
  href: '/coups-de-coeur/fromagerie-julio',
  image: '/images/offres/coups-de-coeur-fromagerie-julio.avif',
  imageAlt: 'Fromagerie Julio à Granby, coup de cœur GoQuébeCan',
  category: 'Fromagerie',
  isCurrent: true,
};

const anciensCoupsDeCoeur: CoupDeCoeur[] = [
  {
    title: 'AnamimiZen',
    description:
      'Un accompagnement humain combinant soins LaHoChi et outils de psychologie positive pour retrouver davantage de calme et de clarté.',
    href: '/coups-de-coeur/anamimizen',
    image: '/images/offres/coups-de-coeur-anamimizen.avif',
    imageAlt: 'AnamimiZen, ancien coup de cœur GoQuébeCan',
    category: 'Bien-être',
  },
];

function CoupDeCoeurCard({ coupDeCoeur }: { coupDeCoeur: CoupDeCoeur }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border bg-white shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <Link
        href={coupDeCoeur.href}
        className="group flex h-full flex-col"
        aria-label={`Découvrir ${coupDeCoeur.title}`}
      >
        {/* Image identique pour tous les coups de cœur */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f7f3ea]">
          <Image
            src={coupDeCoeur.image}
            alt={coupDeCoeur.imageAlt}
            fill
            priority={coupDeCoeur.isCurrent}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={
              coupDeCoeur.isCurrent
                ? 'object-contain p-4 transition duration-300 group-hover:scale-[1.02]'
                : 'object-cover transition duration-300 group-hover:scale-[1.03]'
            }
          />

          {coupDeCoeur.isCurrent && (
            <span className="absolute left-4 top-4 rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm">
              Sélection actuelle
            </span>
          )}
        </div>

        {/* Contenu identique pour toutes les cartes */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-700">
              {coupDeCoeur.category}
            </span>

            {coupDeCoeur.isCurrent && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-800">
                <span aria-hidden>🧀</span>
                Coup de cœur du mois
              </span>
            )}
          </div>

          <div className="mt-4">
            <H3>{coupDeCoeur.title}</H3>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-gray-700">{coupDeCoeur.description}</p>

          {coupDeCoeur.quote && (
            <blockquote className="mt-4 rounded-2xl border bg-gray-50 p-4 text-sm italic leading-relaxed text-gray-700">
              « {coupDeCoeur.quote} »
            </blockquote>
          )}

          <span className="mt-auto inline-flex pt-5 text-sm font-semibold text-gray-900">
            {coupDeCoeur.isCurrent ? 'Découvrir ce coup de cœur' : 'Lire le coup de cœur'}

            <span aria-hidden className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function CoupsDeCoeurPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* En-tête éditorial */}
      <header className="relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm md:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -left-24 -top-24 size-72 rounded-full bg-[#e11d48]/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-72 rounded-full bg-[#f59e0b]/10 blur-3xl" />
        </div>

        <div className="relative">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-600">
            Série éditoriale
          </p>

          <div className="mt-2">
            <H1>
              Coups de cœur <BrandName />
            </H1>
          </div>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700">
            Nous aimons voyager, mais aussi découvrir ce qui rend le Québec vivant : des producteurs
            passionnés, des artisans, des entrepreneurs locaux et des projets sincères. Nos coups de
            cœur reposent sur des visites, des échanges ou des expériences réelles.
          </p>
        </div>
      </header>

      {/* Coup de cœur actuel */}
      <section className="mt-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Notre sélection du mois
          </p>

          <div className="mt-2">
            <H2>Le coup de cœur actuel</H2>
          </div>

          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
            Une entreprise locale que nous avons visitée et que nous souhaitons particulièrement
            mettre en lumière ce mois-ci.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CoupDeCoeurCard coupDeCoeur={coupDeCoeurActuel} />
        </div>
      </section>

      {/* Anciens coups de cœur */}
      <section className="mt-12 border-t pt-10">
        <div>
          <H2>Nos anciens coups de cœur</H2>

          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-700">
            Tous nos anciens coups de cœur restent disponibles. Ces pages continuent d’informer les
            visiteurs et de conserver leur référencement dans Google.
          </p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {anciensCoupsDeCoeur.map((coupDeCoeur) => (
            <CoupDeCoeurCard key={coupDeCoeur.href} coupDeCoeur={coupDeCoeur} />
          ))}
        </div>
      </section>

      {/* Message final */}
      <section className="mt-12 rounded-3xl border bg-white p-6 text-center shadow-sm">
        <H3>Des découvertes faites sur le terrain</H3>

        <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-gray-700">
          Chaque coup de cœur est sélectionné pour son caractère local, son savoir-faire et
          l’expérience proposée aux visiteurs.
        </p>

        <div className="mt-5">
          <Link
            href="/producteurs"
            className="inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-50"
          >
            Découvrir les producteurs locaux
          </Link>
        </div>
      </section>
    </main>
  );
}
