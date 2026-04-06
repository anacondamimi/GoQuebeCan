// app/camping/[slug]/page.tsx

import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { buildMetadata2025, buildGenericJsonLd } from '@/lib/seo/seoConfig2025';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';
import H1 from '@/components/typography/H1';

/* ════════════════════════════════════════════════
   🔎 TYPES — Modèle de fiche camping
   ════════════════════════════════════════════════ */

type ItineraryIdea = {
  title: string;
  description: string;
};

type NearbyAttraction = {
  name: string;
  description: string;
};

type BookingLink = {
  label: string;
  href: string;
};

type InternalLink = {
  label: string;
  href: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

type PracticalInfo = {
  checkIn?: string;
  checkOut?: string;
  distanceFromCity?: string;
  access?: string;
  seasonBest?: string;
  noiseLevel?: string;
  shade?: string;
  wifi?: string;
  cellCoverage?: string;
  animals?: string;
  languages?: string;
  notes?: string;
};

type CampingPageData = {
  slug: string;
  name: string;
  region: string;
  location: string;
  heroImage: string;
  heroImageAlt: string;
  shortDescription: string;
  longIntro: string;
  tags: string[]; // ex : ["Vue sur l’eau", "Familial", "VR bienvenus"]
  seoKeywords: string[];
  typicalPrice: string;
  openPeriod: string;
  siteTypes: string[]; // ex : ["Tentes", "VR 30A", "Prêt-à-camper"]
  idealFor: string[]; // ex : ["Familles", "Couples", "Amateurs de randonnée"]
  services: string[]; // ex : ["Bloc sanitaire chauffé", "Douches chaudes", ...]
  pros: string[];
  cons: string[];
  practical: PracticalInfo;
  itineraryIdeas: ItineraryIdea[];
  nearbyAttractions: NearbyAttraction[];
  bookingLinks: BookingLink[];
  internalLinks: InternalLink[];
  faq?: FaqItem[];
};

/* ════════════════════════════════════════════════
   🧱 DONNÉES — Exemple de fiche (modèle à dupliquer)
   ════════════════════════════════════════════════ */

const CAMPINGS: CampingPageData[] = [
  {
    slug: 'camping-du-fjord-saguenay',
    name: 'Camping du Fjord du Saguenay',
    region: 'Saguenay–Lac-Saint-Jean',
    location: 'L’Anse-Saint-Jean, Québec',
    heroImage: '/images/destinations/camping/camping-fjord-saguenay-hero.avif',
    heroImageAlt: 'Vue sur le fjord du Saguenay depuis un emplacement de camping en hauteur.',
    shortDescription:
      'Un camping à flanc de montagne avec vue plongeante sur le fjord : parfait pour combiner randonnées, kayak et soirées au coin du feu.',
    longIntro:
      'Le Camping du Fjord du Saguenay est l’un de ces endroits où l’on se sent vraiment en vacances dès les premiers mètres parcourus sur le chemin d’accès. Emplacements en terrasse avec vue sur le fjord, ambiance calme, nature omniprésente : c’est un point de départ idéal pour explorer L’Anse-Saint-Jean, faire du kayak de mer ou simplement profiter des couchers de soleil.',
    tags: ['Vue sur le fjord', 'Ambiance calme', 'Parfait pour road trip', 'VR et tentes'],
    seoKeywords: [
      'camping fjord saguenay',
      'camping anse-saint-jean',
      'camping vue fjord',
      'camping saguenay famille',
      'camping nature québec',
    ],
    typicalPrice: 'Environ 45–65 $ / nuit selon le type d’emplacement et la saison',
    openPeriod: 'En général de fin mai à début octobre (à vérifier chaque année)',
    siteTypes: [
      'Emplacements pour tentes (plateformes ou sol naturel)',
      'Emplacements pour VR (électricité, certains avec vue)',
      'Quelques unités de prêt-à-camper ou cabines rustiques (selon saison)',
    ],
    idealFor: [
      'Voyageurs en road trip qui veulent une étape “wow”',
      'Couples à la recherche d’un cadre romantique proche de la nature',
      'Familles avec enfants qui aiment les randonnées et les points de vue',
    ],
    services: [
      'Bloc sanitaire avec douches chaudes',
      'Accès à l’eau potable',
      'Points de vidange pour VR (selon configuration exacte)',
      'Petite aire de jeux ou espace pour enfants',
      'Accès rapide en voiture au village de L’Anse-Saint-Jean',
    ],
    pros: [
      'Vue exceptionnelle sur le fjord depuis certains emplacements',
      'Point de départ idéal pour explorer le Saguenay et la Côte-Nord',
      'Ambiance nature, loin des grands complexes trop bruyants',
    ],
    cons: [
      'Accès parfois en pente : prévoir de bons freins et bien caler le VR',
      'Le vent peut être présent sur les emplacements en hauteur',
      'Services limités comparé à un gros “resort” de camping (et c’est aussi ce qui fait son charme)',
    ],
    practical: {
      checkIn:
        'Souvent en fin d’après-midi (par exemple 15 h – 20 h, à confirmer auprès du camping)',
      checkOut: 'Généralement avant midi',
      distanceFromCity:
        'À environ 3 h 30 de route de Québec, 2 h 30 de Saguenay (Ville de Saguenay)',
      access:
        'Route asphaltée puis chemin d’accès en pente : roulez doucement, surtout avec une roulotte ou un VR.',
      seasonBest:
        'Juin à début octobre. Juillet–août pour la chaleur, septembre pour les couleurs d’automne.',
      noiseLevel: 'Plutôt calme; ambiance familiale et randonneurs.',
      shade: 'Certains emplacements sont bien ombragés, d’autres plus ouverts avec vue.',
      wifi: 'Variable selon les zones; à considérer comme un bonus et non une garantie.',
      cellCoverage: 'Généralement correcte, mais peut fluctuer selon votre opérateur.',
      animals: 'Animaux souvent acceptés en laisse (vérifier les règles exactes du camping).',
      languages: 'Accueil en français, souvent possible en anglais.',
      notes:
        'Réservation fortement recommandée en haute saison et durant les vacances de la construction.',
    },
    itineraryIdeas: [
      {
        title: '3 jours entre fjord, kayak et villages du Saguenay',
        description:
          'Jour 1 : arrivée au camping, installation et point de vue sur le fjord au coucher de soleil. Jour 2 : sortie en kayak ou croisière sur le fjord, découverte du village de L’Anse-Saint-Jean. Jour 3 : randonnée dans le secteur (Sentier de la Statue ou parc national du Fjord-du-Saguenay), puis route vers Tadoussac ou le Lac-Saint-Jean.',
      },
      {
        title: 'Étape clé d’un road trip Côte-Nord – Saguenay',
        description:
          'Utilisez ce camping comme étape entre Québec / Charlevoix et Tadoussac ou la Côte-Nord. Idéal pour casser la route tout en profitant d’un vrai décor de carte postale.',
      },
    ],
    nearbyAttractions: [
      {
        name: 'Village de L’Anse-Saint-Jean',
        description:
          'Un des plus beaux villages du Québec, avec petit port, cafés, restaurants et vue sur le fjord.',
      },
      {
        name: 'Parc national du Fjord-du-Saguenay',
        description:
          'Sentiers de randonnée, points de vue spectaculaires et possibilités d’activités nautiques encadrées.',
      },
      {
        name: 'Excursions en kayak ou croisière',
        description:
          'Plusieurs opérateurs proposent des sorties sur le fjord : idéal pour voir les falaises depuis l’eau.',
      },
    ],
    bookingLinks: [
      {
        label: 'Site officiel du camping',
        href: 'https://www.example-camping-fjord-saguenay.com', // À remplacer par le vrai lien
      },
      {
        label: 'Page GoQuébeCAN sur le Saguenay',
        href: '/destinations/saguenay-lac-saint-jean', // À adapter à ton slug réel
      },
    ],
    internalLinks: [
      { label: 'Planificateur d’itinéraire GoQuébeCAN', href: '/planificateur' },
      { label: 'Voir d’autres campings au Québec', href: '/camping' },
      { label: 'Découvrir les producteurs locaux du Saguenay', href: '/producteurs' },
      { label: 'Objets indispensables pour le camping', href: '/objets-indispensables/camping' },
      { label: 'Vidéos inspirantes pour préparer votre voyage', href: '/videos' },
    ],
    faq: [
      {
        question: 'Est-ce que le camping est adapté aux familles avec jeunes enfants ?',
        answer:
          'Oui, l’ambiance est familiale et plusieurs emplacements sont suffisamment grands pour laisser les enfants jouer près de la tente ou du VR, sous la surveillance des parents.',
      },
      {
        question: 'Peut-on venir sans voiture ?',
        answer:
          'Ce n’est pas idéal. Le camping est surtout pensé pour les voyageurs motorisés (voiture, VR, van), et une voiture facilite vraiment les déplacements vers les activités autour.',
      },
    ],
  },
  // 🧩 Pour ajouter d’autres campings :
  // - duplique cet objet
  // - adapte slug, textes, liens, images, etc.
];

/* ════════════════════════════════════════════════
   🔍 HELPERS — Récupération des données
   ════════════════════════════════════════════════ */

function getCampingBySlug(slug: string): CampingPageData | undefined {
  return CAMPINGS.find((c) => c.slug === slug);
}

/* ════════════════════════════════════════════════
   📌 SEO DYNAMIQUE — generateMetadata
   ════════════════════════════════════════════════ */

type PageParams = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const camping = getCampingBySlug(params.slug);
  if (!camping) {
    return buildMetadata2025({
      title: 'Camping au Québec | GoQuébeCAN',
      description:
        'Découvrez les meilleurs campings du Québec : emplacements nature, lacs, forêts et panoramas uniques.',
      canonical: 'https://goquebecan.com/camping',
      image: 'https://goquebecan.com/images/og/camping-quebec.jpg',
      keywords: ['camping québec', 'camping nature', 'camping famille', 'camping VR'],
      type: 'article',
    });
  }

  return buildMetadata2025({
    title: `${camping.name} | Camping au Québec`,
    description: camping.shortDescription,
    canonical: `https://goquebecan.com/camping/${camping.slug}`,
    image: `https://goquebecan.com${camping.heroImage}`,
    keywords: camping.seoKeywords,
    type: 'article',
  });
}

/* ════════════════════════════════════════════════
   🗺️ SSG — generateStaticParams pour pré-rendre les fiches
   ════════════════════════════════════════════════ */

export function generateStaticParams() {
  return CAMPINGS.map((camping) => ({ slug: camping.slug }));
}

/* ════════════════════════════════════════════════
   🧠 JSON-LD par camping
   ════════════════════════════════════════════════ */

function buildCampingJsonLd(camping: CampingPageData) {
  return buildGenericJsonLd({
    type: 'article', // On reste sur un article mais le contenu décrit un Campground
    title: camping.name,
    description: camping.shortDescription,
    canonical: `https://goquebecan.com/camping/${camping.slug}`,
    image: `https://goquebecan.com${camping.heroImage}`,
    published: '2025-05-01', // à adapter par camping si besoin
    modified: '2026-04-05',
    author: 'GoQuébeCAN',
    faq: camping.faq?.map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
    places: [camping.name, camping.location, camping.region],
  });
}

/* ════════════════════════════════════════════════
   🏕️ PAGE FICHE CAMPING
   ════════════════════════════════════════════════ */

export default function CampingFichePage({ params }: PageParams) {
  const camping = getCampingBySlug(params.slug);

  if (!camping) {
    notFound();
  }

  const jsonLd = buildCampingJsonLd(camping);

  return (
    <main className="min-h-screen bg-white">
      {/* SEO extras & JSON-LD */}
      <HeadExtras />
      <JsonLd data={jsonLd} />

      {/* HERO */}
      <section className="relative bg-slate-900 text-white">
        <div className="absolute inset-0">
          <img
            src={camping.heroImage}
            alt={camping.heroImageAlt}
            className="size-full object-cover opacity-70"
            loading="lazy"
          />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:px-8">
          <div className="inline-flex flex-wrap gap-2">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              {camping.region}
            </span>
            <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold">
              Camping au Québec
            </span>
          </div>

          <H1 as="h1" align="left" accent="bar" size="lg" className="max-w-3xl text-white">
            {camping.name}
          </H1>

          <p className="max-w-3xl text-sm font-medium text-emerald-100 sm:text-base">
            {camping.location} — {camping.shortDescription}
          </p>

          {/* Tags / Badges */}
          {camping.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {camping.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-emerald-50 ring-1 ring-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTENU PRINCIPAL */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Colonne principale */}
          <div className="space-y-10 lg:col-span-2">
            {/* INTRO */}
            <section aria-labelledby="intro">
              <h2 id="intro" className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                Pourquoi choisir ce camping ?
              </h2>
              <p className="leading-relaxed text-gray-700">{camping.longIntro}</p>
            </section>

            {/* EMPLACEMENTS & AMBIANCE */}
            <section aria-labelledby="sites-types">
              <h2 id="sites-types" className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                Types d’emplacements & ambiance sur place
              </h2>
              <div className="space-y-3 text-gray-700">
                <ul className="ml-4 list-disc space-y-2">
                  {camping.siteTypes.map((type) => (
                    <li key={type}>{type}</li>
                  ))}
                </ul>
                {camping.idealFor.length > 0 && (
                  <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-900">
                    <h3 className="mb-2 font-semibold">Pour qui ce camping est-il idéal ?</h3>
                    <ul className="ml-4 list-disc space-y-1">
                      {camping.idealFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>

            {/* SERVICES & INFRASTRUCTURES */}
            <section aria-labelledby="services">
              <h2 id="services" className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                Services & infrastructures
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <ul className="ml-4 list-disc space-y-2 text-gray-700">
                  {camping.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
                <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-800">
                  <h3 className="mb-2 font-semibold">À savoir avant de réserver</h3>
                  <p className="mb-1">
                    <strong>Période d’ouverture :</strong> {camping.openPeriod}
                  </p>
                  <p className="mb-1">
                    <strong>Tarifs indicatifs :</strong> {camping.typicalPrice}
                  </p>
                  {camping.practical.seasonBest && (
                    <p className="mb-1">
                      <strong>Meilleure période :</strong> {camping.practical.seasonBest}
                    </p>
                  )}
                  {camping.practical.distanceFromCity && (
                    <p className="mb-1">
                      <strong>Accès depuis les grandes villes :</strong>{' '}
                      {camping.practical.distanceFromCity}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* AVANTAGES / POINTS À SURVEILLER */}
            <section aria-labelledby="pros-cons">
              <h2 id="pros-cons" className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                Points forts & éléments à garder en tête
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-emerald-50 p-4">
                  <h3 className="mb-2 font-semibold text-emerald-900">
                    Ce que les voyageurs aiment
                  </h3>
                  <ul className="ml-4 list-disc space-y-1 text-sm text-emerald-900">
                    {camping.pros.map((pro) => (
                      <li key={pro}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg bg-amber-50 p-4">
                  <h3 className="mb-2 font-semibold text-amber-900">
                    À vérifier selon votre style de voyage
                  </h3>
                  <ul className="ml-4 list-disc space-y-1 text-sm text-amber-900">
                    {camping.cons.map((con) => (
                      <li key={con}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* IDÉES D’ITINÉRAIRES */}
            {camping.itineraryIdeas.length > 0 && (
              <section aria-labelledby="itineraires">
                <h2
                  id="itineraires"
                  className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl"
                >
                  Idées d’itinéraires avec ce camping
                </h2>
                <div className="space-y-4">
                  {camping.itineraryIdeas.map((idea) => (
                    <article
                      key={idea.title}
                      className="rounded-lg border border-slate-200 p-4 text-sm text-slate-800"
                    >
                      <h3 className="mb-1 font-semibold">{idea.title}</h3>
                      <p className="leading-relaxed">{idea.description}</p>
                    </article>
                  ))}
                </div>
                <div className="mt-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-900">
                  Envie de transformer cette idée en vrai road trip ?{' '}
                  <Link href="/planificateur" className="font-semibold underline">
                    Utilisez le planificateur GoQuébeCAN pour tracer votre itinéraire
                  </Link>{' '}
                  et ajoutez vos nuits dans ce camping comme étapes clés.
                </div>
              </section>
            )}

            {/* ATTRACTIONS À PROXIMITÉ */}
            {camping.nearbyAttractions.length > 0 && (
              <section aria-labelledby="attractions">
                <h2
                  id="attractions"
                  className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl"
                >
                  À voir ou faire à proximité
                </h2>
                <ul className="ml-4 list-disc space-y-2 text-gray-700">
                  {camping.nearbyAttractions.map((attraction) => (
                    <li key={attraction.name}>
                      <strong>{attraction.name} : </strong>
                      <span>{attraction.description}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* FAQ SPÉCIFIQUE AU CAMPING */}
            {camping.faq && camping.faq.length > 0 && (
              <section aria-labelledby="faq-camping">
                <h2
                  id="faq-camping"
                  className="mb-3 text-xl font-semibold text-gray-900 sm:text-2xl"
                >
                  FAQ sur ce camping
                </h2>
                <div className="divide-y divide-slate-200 rounded-lg border border-slate-200">
                  {camping.faq.map((item) => (
                    <details key={item.question} className="group p-4">
                      <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-slate-900">
                        <span>{item.question}</span>
                        <span className="text-xs text-slate-500 group-open:hidden">+</span>
                        <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
                      </summary>
                      <p className="mt-2 text-sm text-slate-700">{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Colonne latérale : infos pratiques & liens */}
          <aside className="space-y-8 lg:col-span-1">
            {/* Infos pratiques compactes */}
            <section aria-labelledby="infos-pratiques">
              <h2
                id="infos-pratiques"
                className="mb-3 text-base font-semibold uppercase tracking-wide text-slate-700"
              >
                Infos pratiques
              </h2>
              <div className="space-y-2 rounded-lg bg-slate-50 p-4 text-sm text-slate-800">
                {camping.practical.checkIn && (
                  <p>
                    <strong>Arrivée :</strong> {camping.practical.checkIn}
                  </p>
                )}
                {camping.practical.checkOut && (
                  <p>
                    <strong>Départ :</strong> {camping.practical.checkOut}
                  </p>
                )}
                {camping.practical.access && (
                  <p>
                    <strong>Accès :</strong> {camping.practical.access}
                  </p>
                )}
                {camping.practical.noiseLevel && (
                  <p>
                    <strong>Ambiance sonore :</strong> {camping.practical.noiseLevel}
                  </p>
                )}
                {camping.practical.shade && (
                  <p>
                    <strong>Ombre :</strong> {camping.practical.shade}
                  </p>
                )}
                {camping.practical.wifi && (
                  <p>
                    <strong>Wi-Fi :</strong> {camping.practical.wifi}
                  </p>
                )}
                {camping.practical.cellCoverage && (
                  <p>
                    <strong>Cellulaire :</strong> {camping.practical.cellCoverage}
                  </p>
                )}
                {camping.practical.animals && (
                  <p>
                    <strong>Animaux :</strong> {camping.practical.animals}
                  </p>
                )}
                {camping.practical.languages && (
                  <p>
                    <strong>Langues :</strong> {camping.practical.languages}
                  </p>
                )}
                {camping.practical.notes && (
                  <p>
                    <strong>À noter :</strong> {camping.practical.notes}
                  </p>
                )}
              </div>
            </section>

            {/* Liens de réservation / officiels */}
            {camping.bookingLinks.length > 0 && (
              <section aria-labelledby="liens-reservation">
                <h2
                  id="liens-reservation"
                  className="mb-3 text-base font-semibold uppercase tracking-wide text-slate-700"
                >
                  Réservation & infos officielles
                </h2>
                <div className="space-y-2">
                  {camping.bookingLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Liens internes GoQuébeCAN */}
            {camping.internalLinks.length > 0 && (
              <section aria-labelledby="liens-internes">
                <h2
                  id="liens-internes"
                  className="mb-3 text-base font-semibold uppercase tracking-wide text-slate-700"
                >
                  Pour aller plus loin avec GoQuébeCAN
                </h2>
                <ul className="space-y-2 text-sm">
                  {camping.internalLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-blue-700 hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Mini check-list */}
            <section aria-labelledby="checklist">
              <h2
                id="checklist"
                className="mb-3 text-base font-semibold uppercase tracking-wide text-slate-700"
              >
                Check-list avant de réserver
              </h2>
              <ul className="ml-4 list-disc space-y-1 text-sm text-slate-800">
                <li>Vérifier les dates d’ouverture exactes pour votre année de voyage.</li>
                <li>Confirmer les services disponibles (électricité, vidange VR, Wi-Fi, etc.).</li>
                <li>
                  Regarder le plan du camping pour choisir un emplacement adapté à votre véhicule.
                </li>
                <li>Réserver à l’avance en haute saison ou pour les week-ends prolongés.</li>
              </ul>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}
