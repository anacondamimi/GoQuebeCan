// app/planificateur/page.tsx
import * as React from 'react';
import Link from 'next/link';
import ItineraryPlannerWrapper from './ItineraryPlannerWrapper';
import { buildMetadata2025, buildGenericJsonLd } from '@/lib/seo/seoConfig2025';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import BrandName from '@/components/brand/BrandName';

import type { Metadata } from 'next';

// ─────────────────────────────
// 🔍 MÉTADONNÉES SEO
// ─────────────────────────────
export const metadata: Metadata = buildMetadata2025({
  title: 'Planificateur d’itinéraire au Québec | GoQuébeCAN',
  description:
    'Créez votre itinéraire de voyage au Québec : sélectionnez vos étapes, calculez les distances, découvrez les producteurs locaux et préparez un road trip clair, pratique et inspirant.',
  canonical: 'https://goquebecan.com/planificateur',
  image: 'https://goquebecan.com/images/og/planificateur-quebec.jpg',
  keywords: [
    'planificateur itinéraire Québec',
    'road trip Québec',
    'itinéraire voyage Canada',
    'carte interactive Québec',
    'producteurs locaux Québec',
    'planifier voyage Québec',
    'GoQuébeCAN planificateur',
  ],
  type: 'article',
});

// ─────────────────────────────
// 🗺️ STRUCTURED DATA JSON-LD
// ─────────────────────────────
const jsonLd = buildGenericJsonLd({
  type: 'guide',
  title: 'Planificateur d’itinéraire au Québec',
  description:
    'Préparez un road trip au Québec avec un planificateur simple et visuel : ajoutez vos étapes, visualisez votre trajet, découvrez les régions et organisez un voyage plus fluide.',
  canonical: 'https://goquebecan.com/planificateur',
  image: 'https://goquebecan.com/images/og/planificateur-quebec.jpg',
  published: '2025-05-01',
  modified: '2026-03-15',
  author: 'GoQuébeCAN',

  steps: [
    'Choisissez votre point de départ et votre destination.',
    'Ajoutez des étapes intermédiaires selon votre parcours.',
    'Visualisez votre trajet directement sur la carte.',
    'Repérez les producteurs locaux et les arrêts utiles.',
    'Préparez un road trip plus clair, plus simple et plus agréable.',
  ],
  faq: [
    {
      question: 'Puis-je créer un itinéraire avec plusieurs étapes au Québec ?',
      answer:
        'Oui, le planificateur permet d’ajouter plusieurs étapes pour construire un road trip plus personnalisé entre différentes villes et régions du Québec.',
    },
    {
      question: 'Le planificateur est-il utile pour découvrir des producteurs locaux ?',
      answer:
        'Oui, vous pouvez visualiser votre trajet et repérer des producteurs locaux afin de rendre votre voyage plus authentique et plus gourmand.',
    },
  ],
});

// ─────────────────────────────
// ⚡ PAGE PRINCIPALE
// ─────────────────────────────
export default function PlanificateurPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-8">
      <H1 className="sr-only">Planificateur d’itinéraire au Québec | GoQuébeCAN</H1>

      <HeadExtras />
      <JsonLd data={jsonLd} />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Intro principale */}
        <div className="mx-auto mb-10 max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <H2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Planifiez un road trip au Québec avec envie, simplicité et liberté
          </H2>

          <p className="mt-4 text-base leading-7 text-gray-700">
            Un beau voyage commence souvent par une idée simple : partir, prendre la route et se
            laisser surprendre par les paysages, les villages, les bonnes adresses et les arrêts
            qu’on n’avait pas prévus. Avec le planificateur <BrandName />, vous pouvez organiser
            votre itinéraire plus facilement, visualiser votre trajet sur la carte et construire un
            parcours qui ressemble vraiment à votre façon de voyager.
          </p>

          <p className="mt-4 text-base leading-7 text-gray-700">
            Que vous prépariez une escapade de quelques heures, un week-end en amoureux, des
            vacances en famille ou un vrai road trip à travers le Québec, cet outil vous aide à
            choisir un départ, une arrivée et plusieurs étapes intermédiaires, puis à mieux repérer
            les détours intéressants, les producteurs locaux et les régions à découvrir sur la
            route.
          </p>

          <p className="mt-4 text-base leading-7 text-gray-700">
            Il est particulièrement utile pour planifier un trajet entre Montréal, Québec,
            Charlevoix, la Gaspésie, le Saguenay, l’Estrie, la Côte-Nord, le Bas-Saint-Laurent et
            d’autres destinations du Québec et du Canada. Vous gagnez du temps, vous voyez plus
            clair, et surtout, vous préparez un voyage plus vivant, plus fluide et souvent beaucoup
            plus mémorable.
          </p>

          {/* Bloc explicatif */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <H3 className="text-base font-semibold text-gray-900">
                Comment fonctionne le planificateur
              </H3>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                Indiquez votre point de départ, votre destination, puis ajoutez les arrêts que vous
                souhaitez faire en chemin. Le trajet s’affiche ensuite sur la carte pour vous aider
                à mieux structurer votre voyage.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <H3 className="text-base font-semibold text-gray-900">
                Ce que vous pouvez faire avec
              </H3>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                Préparer un road trip, visualiser vos étapes, repérer des arrêts utiles, découvrir
                des producteurs locaux et construire un itinéraire plus agréable avant même de
                partir.
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <H3 className="text-base font-semibold text-gray-900">Régions et trajets couverts</H3>
              <p className="mt-2 text-sm leading-6 text-gray-700">
                L’outil est pensé pour les trajets au Québec et au Canada, en particulier entre les
                villes, les régions touristiques, les villages, les points de vue et les
                destinations populaires de road trip.
              </p>
            </div>
          </div>
        </div>

        {/* Planificateur */}
        <ItineraryPlannerWrapper />

        {/* Bloc complémentaire */}
        <div className="mx-auto mt-12 max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Transformez un simple trajet en vraie expérience de voyage
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-700">
            Le but n’est pas seulement d’aller d’un point A à un point B. Le plaisir d’un road trip
            au Québec, c’est aussi de choisir les bons détours, de découvrir une boulangerie de
            village, une halte gourmande, un producteur local, une vue magnifique ou une destination
            qu’on n’aurait peut-être jamais pensée ajouter au départ.
          </p>

          <p className="mt-4 text-base leading-7 text-gray-700">
            <BrandName /> vous aide à préparer un itinéraire plus inspirant et plus pratique, tout
            en reliant votre parcours à d’autres contenus utiles du site. Vous pouvez compléter
            votre trajet avec des idées de destinations, des vidéos, des producteurs locaux et des
            objets indispensables pour mieux profiter de la route, de l’hôtel, du camping ou des
            vacances en famille.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
            >
              🌄 Voir les destinations
            </Link>

            <Link
              href="/videos"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
            >
              🎥 Regarder les vidéos
            </Link>

            <Link
              href="/producteurs"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
            >
              🧑‍🌾 Découvrir les producteurs
            </Link>

            <Link
              href="/objets"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
            >
              🎒 Voir les objets indispensables
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
