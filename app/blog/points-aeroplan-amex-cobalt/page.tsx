// app/blog/points-aeroplan-amex-cobalt/page.tsx
import * as React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Image from 'next/image';

import { buildMetadata2025, buildGenericJsonLd } from '@/lib/seo/seoConfig2025';
import { HeadExtras, JsonLd } from '@/lib/seo/HeadExtras';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

const CANONICAL = 'https://www.goquebecan.com/blog/points-aeroplan-amex-cobalt';
const OG_IMAGE = 'https://www.goquebecan.com/images/og/points-aeroplan-cobalt.jpg';

export const metadata: Metadata = buildMetadata2025({
  title: 'Voyager moins cher avec Aeroplan, Amex Cobalt et Visa Aventura | Guide complet',
  description:
    'Apprends une méthode simple pour accumuler des points rapidement (épicerie, dépenses du quotidien), réduire le coût des billets et voyager plus sereinement grâce aux assurances et aux salons d’aéroport. Témoignages voyageurs inclus.',
  canonical: CANONICAL,
  image: OG_IMAGE,
  keywords: [
    'aeroplan',
    'amex cobalt',
    'visa aventura',
    'points aeroplan',
    'voyager moins cher',
    'comment accumuler des points',
    'assurance retard vol',
    'salon aeroport',
    'prime de bienvenue carte de crédit',
    'goquebecan',
  ],
  type: 'article',
});

type JsonLdNode = Record<string, any>;

/** FinancialProduct / CreditCard (schema avancé) — stable, sans chiffres “fragiles” */
const cobaltFinancialProductLd: JsonLdNode = {
  '@context': 'https://schema.org',
  '@type': 'CreditCard',
  name: 'American Express Cobalt',
  description:
    'Carte de crédit axée sur l’accumulation de points et les avantages voyage. Utilisée pour optimiser les dépenses du quotidien et réduire certains coûts liés aux voyages (selon conditions).',
  areaServed: 'CA',
  inLanguage: 'fr-CA',
  provider: { '@type': 'Organization', name: 'American Express' },
  category: ['Travel rewards', 'CreditCard'],
  subjectOf: { '@type': 'WebPage', '@id': CANONICAL },
  isRelatedTo: [
    { '@type': 'WebPage', '@id': `${CANONICAL}#exemple-epicerie` },
    { '@type': 'WebPage', '@id': `${CANONICAL}#assurances-voyage` },
  ],
};

const aventuraFinancialProductLd: JsonLdNode = {
  '@context': 'https://schema.org',
  '@type': 'CreditCard',
  name: 'Visa Aventura',
  description:
    'Carte de crédit orientée voyage, souvent utilisée pour accéder à des avantages comme des salons d’aéroport et des primes de bienvenue (selon la carte et la promotion en vigueur).',
  areaServed: 'CA',
  inLanguage: 'fr-CA',
  provider: { '@type': 'Organization', name: 'Visa' },
  category: ['Travel rewards', 'CreditCard'],
  subjectOf: { '@type': 'WebPage', '@id': CANONICAL },
  isRelatedTo: [
    { '@type': 'WebPage', '@id': `${CANONICAL}#salons-aeroport` },
    { '@type': 'WebPage', '@id': `${CANONICAL}#temoignages` },
  ],
};

/** JSON-LD “guide” + FAQ (ton builder retourne un tableau) */
const jsonLdBase = buildGenericJsonLd({
  type: 'guide',
  title: 'Comment accumuler des points plus vite et voyager moins cher avec les cartes de crédit',
  description:
    'Guide pratique pour transformer les dépenses du quotidien en points, réduire le coût des billets d’avion et voyager plus sereinement grâce aux assurances et aux salons d’aéroport.',
  canonical: CANONICAL,
  image: OG_IMAGE,
  published: '2025-12-16',
  modified: '2026-03-28',
  author: 'GoQuébeCAN',
  steps: [
    'Choisir une carte qui bonifie l’épicerie et les dépenses récurrentes',
    'Concentrer les achats du quotidien sur la bonne carte',
    'Accumuler des points chaque mois sans voyager',
    'Transférer les points vers un programme aérien (selon conditions)',
    'Réserver plus intelligemment et profiter des protections/avantages inclus',
  ],
  faq: [
    {
      question: 'Comment accumuler des points rapidement sans changer ses habitudes ?',
      answer:
        'En concentrant tes dépenses récurrentes (épicerie, restaurants) sur une carte qui bonifie ces catégories, tu peux accumuler des points chaque mois sans dépenser plus.',
    },
    {
      question: 'Peut-on vraiment payer un vol avec des points Aeroplan ?',
      answer:
        'Oui, selon la disponibilité et les conditions du programme, les points peuvent couvrir une partie ou la totalité d’un billet. Les taxes et frais peuvent s’appliquer.',
    },
    {
      question: 'Pourquoi les assurances d’une carte sont importantes en voyage ?',
      answer:
        'Elles peuvent couvrir des dépenses imprévues (retard important, bagages) et réduire le stress lorsqu’un voyage se complique.',
    },
  ],
});

/** JSON-LD final (un seul JsonLd data={jsonLd}) */
const jsonLd: JsonLdNode[] = [...jsonLdBase, cobaltFinancialProductLd, aventuraFinancialProductLd];

export default function PointsAeroplanCobaltPage() {
  return (
    <main className="min-h-screen bg-white pt-8">
      <HeadExtras />
      <JsonLd data={jsonLd} />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 space-y-3">
          <H1 className="text-3xl font-bold text-gray-900">
            Comment accumuler des points plus vite et voyager moins cher avec les cartes de crédit
          </H1>
          <p className="text-gray-700">
            Voyager en avion coûte cher, surtout quand on ne prend l’avion qu’une ou deux fois par
            année. Pourtant, beaucoup de voyageurs réussissent à réduire fortement le prix de leurs
            billets — parfois au point de rendre un voyage “possible” plutôt que “trop cher”.
          </p>
          <p className="text-gray-700">
            Ici, je t’explique une méthode simple, réaliste et accessible : épicerie, dépenses du
            quotidien, transferts de points, et les avantages souvent oubliés comme les assurances
            et les salons d’aéroport.
          </p>

          <div className="rounded-2xl border bg-gray-50 p-5">
            <p className="font-semibold text-gray-900">À lire aussi</p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <Link className="font-semibold text-blue-700 hover:underline" href="/vols">
                Conseils vols & comparatifs →
              </Link>
              <Link
                className="font-semibold text-blue-700 hover:underline"
                href="/blog/voyage-avion"
              >
                Objets indispensables en avion →
              </Link>
              <Link className="font-semibold text-blue-700 hover:underline" href="/planificateur">
                Planificateur d’itinéraire →
              </Link>
            </div>
          </div>
        </header>
        {/* TABLE DES MATIÈRES */}
        <nav aria-label="Table des matières" className="mb-12 rounded-2xl border bg-gray-50 p-6">
          <p className="mb-3 font-semibold text-gray-900">Sommaire de l’article</p>

          <ul className="space-y-2 text-blue-700">
            <li>
              <a href="#pourquoi-points" className="hover:underline">
                Pourquoi les points peuvent vraiment faire la différence
              </a>
            </li>
            <li>
              <a href="#principe-de-base" className="hover:underline">
                Le principe de base : transformer tes dépenses en voyages
              </a>
            </li>
            <li>
              <a href="#exemple-epicerie" className="hover:underline">
                Exemple concret : accumuler des points avec l’épicerie
              </a>
            </li>
            <li>
              <a href="#aeroplan" className="hover:underline">
                Aeroplan : payer un vol avec des points
              </a>
            </li>
            <li>
              <a href="#assurances-voyage" className="hover:underline">
                Les assurances voyage : l’avantage souvent oublié
              </a>
            </li>
            <li>
              <a href="#temoignages" className="hover:underline">
                Témoignages de nos voyageurs
              </a>
            </li>
            <li>
              <a href="#salons-aeroport" className="hover:underline">
                Bonus : salons d’aéroport et confort avant le vol
              </a>
            </li>
            <li>
              <a href="#cta-points" className="hover:underline">
                Comment commencer dès maintenant
              </a>
            </li>
          </ul>
        </nav>

        <section id="pourquoi-points" className="space-y-4">
          <H2 className="text-xl font-semibold text-gray-900">
            Pourquoi les points peuvent vraiment faire la différence
          </H2>
          <p className="text-gray-700">
            Un billet d’avion représente souvent la plus grosse dépense d’un voyage. Le principe des
            points, c’est de transformer des dépenses normales (épicerie, restaurants, achats du
            quotidien) en un “budget” que tu réutilises plus tard pour réduire le coût d’un vol.
          </p>
          <p className="text-gray-700">
            Les points ne sont pas réservés aux grands voyageurs : ils sont particulièrement utiles
            pour les familles et les voyageurs occasionnels, parce qu’ils aident à stabiliser le
            budget et à éviter les mauvaises surprises.
          </p>
        </section>

        <section id="principe-de-base" className="mt-10 space-y-4">
          <H2 className="text-xl font-semibold text-gray-900">
            Le principe de base : transformer tes dépenses en voyages
          </H2>
          <p className="text-gray-700">
            Tu dépenses déjà chaque mois. L’objectif n’est pas de dépenser plus, mais de dépenser
            mieux : choisir une carte qui bonifie les catégories où tu dépenses le plus, puis
            centraliser ces dépenses au bon endroit.
          </p>
        </section>

        <section id="exemple-epicerie" className="mt-10 space-y-4">
          <H2 className="text-xl font-semibold text-gray-900">
            Exemple concret : accumuler des points rapidement avec l’épicerie
          </H2>
          <div className="flex justify-center">
            <Image
              src="/images/cartes/amex-cobalt.avif"
              alt="Carte American Express Cobalt – accumuler des points pour voyager"
              width={420}
              height={260}
              className="rounded-xl shadow-md"
              loading="lazy"
            />
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Exemple de carte — visuel à titre indicatif
          </p>

          <p className="text-gray-700">
            Avec une carte comme l’American Express Cobalt, certaines catégories (dont l’épicerie,
            selon le marchand) peuvent donner jusqu’à 5× les points.
          </p>

          <div className="rounded-2xl border p-6">
            <p className="font-semibold text-gray-900">Exemple simple</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-700">
              <li>500 $ d’épicerie → environ 2 500 points</li>
              <li>Sur 6 mois → environ 15 000 points</li>
              <li>Sans voyager, juste avec tes dépenses du quotidien</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              Astuce : pour accélérer, concentre tes achats récurrents sur une seule carte
              “optimisée”.
            </p>
          </div>
        </section>
        <section id="aeroplan" className="mt-10 space-y-4">
          <H2 className="text-xl font-semibold text-gray-900">
            Aeroplan : payer un vol avec des points
          </H2>
          <p className="text-gray-700">
            Aeroplan permet, selon la disponibilité, de payer une partie ou la totalité d’un billet
            avec des points. Les taxes et certains frais peuvent rester à payer, mais le gain peut
            être majeur.
          </p>
          <p className="text-gray-700">
            Une clé importante : certains points (comme les Amex Membership Rewards) peuvent être
            transférés vers Aeroplan selon les conditions en vigueur. C’est ce pont “dépenses du
            quotidien → points → billets” qui change la donne.
          </p>
        </section>

        <section id="assurances-voyage" className="mt-10 space-y-4">
          <H2 className="text-xl font-semibold text-gray-900">
            L’avantage souvent oublié : les assurances voyage
          </H2>
          <p className="text-gray-700">
            Les points réduisent le coût du voyage, mais les assurances incluses réduisent surtout
            le stress. Quand un voyage se complique (retard, bagages), les protections peuvent
            éviter de sortir des centaines de dollars au mauvais moment.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border p-6">
              <p className="font-semibold text-gray-900">Retard important (ex. 4 heures ou plus)</p>
              <p className="mt-2 text-gray-700">
                Certaines cartes comme l’Amex Cobalt peuvent offrir une couverture pouvant aller
                jusqu’à environ
                <strong> 500 $ par personne</strong> pour l’hôtel, repas et transport, selon les
                conditions de la police.
              </p>
              <p className="mt-3 text-sm text-gray-600">
                Toujours vérifier : admissibilité, plafonds, preuves, délais, exclusions, etc.
              </p>
            </div>

            <div className="rounded-2xl border p-6">
              <p className="font-semibold text-gray-900">Perte ou retard de bagages</p>
              <p className="mt-2 text-gray-700">
                De nombreuses cartes couvrent aussi des achats essentiels si tes bagages sont
                retardés ou perdus (vêtements, articles de toilette), ce qui évite de démarrer le
                voyage sur une mauvaise note.
              </p>
              <p className="mt-3 text-sm text-gray-600">
                Vérifie les conditions exactes avant le départ pour voyager l’esprit tranquille.
              </p>
            </div>
          </div>
        </section>

        {/* ✅ TÉMOIGNAGES INTÉGRÉS */}
        <section id="temoignages" className="mt-12 space-y-4">
          <H2 className="text-xl font-semibold text-gray-900">
            Ce que nos voyageurs en disent (expériences réelles)
          </H2>
          <p className="text-gray-700">
            Les points et les cartes peuvent sembler abstraits… jusqu’au moment où on voit ce que ça
            change dans la vraie vie. Voici deux expériences concrètes de voyageurs GoQuébeCan.
          </p>

          <div className="rounded-2xl border bg-gray-50 p-6">
            <p className="font-semibold text-gray-900">
              ✈️ Mathieu, 46 ans — Voyage en famille en Guadeloupe
            </p>
            <p className="mt-3 text-gray-800">
              « Je voyage avec ma conjointe et mes deux enfants. Quand on a commencé à regarder les
              vols Montréal – Pointe-à-Pitre, on était découragés : plus de <strong>3 600 $</strong>{' '}
              pour quatre billets aller-retour avec Air Canada.
            </p>
            <p className="mt-3 text-gray-800">
              En utilisant environ <strong>100 000 points Aeroplan</strong>, on a finalement payé
              environ
              <strong> 600 $</strong> au total (taxes et frais inclus). Sans les points, on aurait
              probablement reporté le voyage. »
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Note : les résultats dépendent de la disponibilité, des tarifs, et des conditions des
              programmes.
            </p>
          </div>

          <div className="rounded-2xl border bg-gray-50 p-6">
            <p className="font-semibold text-gray-900">
              🛋️ Émilie — Famille de 4, escale sereine à l’aéroport
            </p>
            <p className="mt-3 text-gray-800">
              « Grâce à la <strong>carte Visa Aventura</strong>, on a eu accès gratuitement au salon
              Air France. Ça a tout changé : manger et boire, se reposer dans le calme… surtout avec
              les enfants.
            </p>
            <p className="mt-3 text-gray-800">
              En plus, avec une <strong>prime de bienvenue d’environ 500 $</strong>, on a pu
              financer des nuits d’hôtel pour un autre voyage. »
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Les avantages exacts peuvent varier selon la carte, la promotion et les conditions.
            </p>
          </div>

          <p className="text-gray-700">
            Ces témoignages montrent une chose : il ne s’agit pas de “voyager en luxe”, mais de
            rendre le voyage plus abordable, plus prévisible, et plus serein — surtout en famille.
          </p>
        </section>

        <section id="salons-aeroport" className="mt-12 space-y-4">
          <H2 className="text-xl font-semibold text-gray-900">
            Bonus : salons d’aéroport et confort avant le vol
          </H2>
          <div className="flex justify-center">
            <Image
              src="/images/cartes/visa-aventura.avif"
              alt="Carte Visa Aventura – accès aux salons d’aéroport et primes de bienvenue"
              width={420}
              height={260}
              className="rounded-xl shadow-md"
              loading="lazy"
            />
          </div>
          <p className="mt-2 text-center text-sm text-gray-600">
            Exemple de carte — visuel à titre indicatif
          </p>

          <p className="text-gray-700">
            Pour les longues attentes et correspondances, les salons d’aéroport changent
            l’expérience : calme, wifi, prises, et souvent collations/boissons. Certaines cartes (ex
            : Visa Aventura) peuvent inclure des accès, ce qui rend le départ beaucoup plus
            agréable.
          </p>
          <p className="text-gray-700">
            Si tu veux optimiser toute l’expérience (réservation + préparation + confort), commence
            par consulter :
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>
              <Link className="font-semibold text-blue-700 hover:underline" href="/vols">
                Page Vols : comparatifs & conseils →
              </Link>
            </li>
            <li>
              <Link
                className="font-semibold text-blue-700 hover:underline"
                href="/blog/voyage-avion"
              >
                Objets indispensables en avion →
              </Link>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section id="cta-points" className="mt-12 rounded-2xl bg-blue-50 p-6">
          <p className="font-semibold text-gray-900">
            Tu veux apprendre à accumuler plus vite et voyager moins cher avec les points ?
          </p>
          <p className="mt-2 text-gray-700">
            Je te montre une méthode simple (épicerie, dépenses du quotidien, transferts de points)
            pour réduire le coût des billets et voyager avec plus de sérénité.
          </p>

          {/* Remplace le href par ton lien parrainage/affiliation */}
          <a
            href="https://www.americanexpress.com/fr-ca/referral/intl/cobalt?CORID=m~A~T~H~I~m~K~r~9~R-1767821052055-2375629&CPID=100358132&GENCODE=349992917344549&XL=MIANS&ref=mATHImKr9R&v=2"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Découvrir l’offre Amex Cobalt
          </a>

          <p className="mt-3 text-xs text-gray-600">
            Transparence : certains liens peuvent être des liens affiliés. Cela ne change pas ton
            prix, et ça soutient GoQuébeCan.
          </p>
        </section>
      </article>
    </main>
  );
}
