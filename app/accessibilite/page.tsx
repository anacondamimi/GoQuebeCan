import type { Metadata } from 'next';
import Link from 'next/link';

import BrandName from '@/components/brand/BrandName';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

const siteUrl = 'https://www.goquebecan.com';

export const metadata: Metadata = {
  title: 'Accessibilité | GoQuébeCan',
  description:
    'Déclaration d’accessibilité de GoQuébeCan : engagement pour un site plus inclusif, lisible et utilisable par tous les voyageurs.',
  alternates: {
    canonical: '/accessibilite',
  },
  openGraph: {
    title: 'Accessibilité | GoQuébeCan',
    description:
      'GoQuébeCan s’engage à améliorer l’accessibilité de son site pour tous les utilisateurs.',
    url: `${siteUrl}/accessibilite`,
    siteName: 'GoQuébeCan',
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Accessibilité | GoQuébeCan',
    description: 'Déclaration d’accessibilité du site GoQuébeCan.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Déclaration d’accessibilité',
  url: `${siteUrl}/accessibilite`,
  description:
    'Déclaration d’accessibilité du site GoQuébeCan et engagement pour une navigation plus inclusive.',
  publisher: {
    '@type': 'Organization',
    name: 'GoQuébeCan',
    url: siteUrl,
  },
};

export default function AccessibilitePage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-4xl px-6 py-16 lg:py-20">
        <div className="mb-10 rounded-4xl border border-gray-200 bg-white p-6 shadow-card md:p-8">
          <H1 className="mb-6 text-3xl font-bold text-secondary">Déclaration d’accessibilité</H1>

          <p className="leading-relaxed text-neutral">
            <BrandName /> souhaite rendre son site accessible, lisible et utilisable par le plus
            grand nombre de personnes possible, incluant les voyageurs ayant des limitations
            visuelles, auditives, motrices, cognitives ou utilisant des technologies d’assistance.
          </p>

          <p className="mt-4 text-sm text-neutral">Dernière mise à jour : 29 mai 2026.</p>
        </div>

        <div className="space-y-8 rounded-4xl border border-gray-200 bg-white p-6 shadow-card md:p-8">
          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">1. Notre engagement</H2>

            <p className="leading-relaxed text-neutral">
              <BrandName /> travaille progressivement à améliorer l’accessibilité de ses pages,
              contenus, cartes, formulaires, boutons, contrastes, liens et éléments de navigation.
              L’objectif est d’offrir une expérience claire, inclusive et confortable à tous les
              utilisateurs.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">2. Références utilisées</H2>

            <p className="leading-relaxed text-neutral">
              Le site vise à se rapprocher des bonnes pratiques reconnues en matière d’accessibilité
              numérique, notamment les recommandations WCAG 2.1 niveau AA ainsi que les principes
              généraux de la Loi canadienne sur l’accessibilité.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              Ces standards servent de référence pour améliorer la lisibilité, la navigation au
              clavier, la structure des titres, les alternatives textuelles, les contrastes et
              l’organisation des contenus.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">3. Mesures mises en place</H2>

            <ul className="list-inside list-disc space-y-2 text-neutral">
              <li>Structure des pages avec titres hiérarchisés.</li>
              <li>Liens descriptifs pour faciliter la compréhension.</li>
              <li>Contrastes visuels améliorés sur les textes et boutons.</li>
              <li>Formulaires structurés avec champs identifiables.</li>
              <li>Navigation pensée pour les ordinateurs, tablettes et mobiles.</li>
              <li>Amélioration progressive des textes alternatifs pour les images importantes.</li>
              <li>
                Tests réguliers avec des outils comme Lighthouse et les outils de développement
                navigateur.
              </li>
            </ul>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">4. Limites actuelles</H2>

            <p className="leading-relaxed text-neutral">
              Certaines fonctionnalités interactives, comme les cartes, les contenus intégrés, les
              vidéos ou certains outils tiers, peuvent présenter des limites d’accessibilité selon
              les technologies utilisées.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              <BrandName /> travaille à améliorer ces éléments au fil des mises à jour, notamment
              pour rendre les cartes, itinéraires et contenus dynamiques plus compréhensibles et
              plus faciles à utiliser.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">5. Amélioration continue</H2>

            <p className="leading-relaxed text-neutral">
              L’accessibilité est un travail continu. Les pages du site sont amenées à évoluer avec
              de nouveaux contenus, outils, articles, itinéraires, cartes interactives et services.
              Chaque amélioration vise à rendre l’expérience plus simple, plus inclusive et plus
              agréable.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              6. Signaler une difficulté
            </H2>

            <p className="leading-relaxed text-neutral">
              Si vous rencontrez une difficulté d’accès, un problème de lisibilité, un bouton
              difficile à utiliser, une image sans description utile ou une page compliquée à
              parcourir, vous pouvez nous en informer.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              Contactez-nous via la page{' '}
              <Link href="/contact" className="font-semibold text-primary underline">
                contact
              </Link>{' '}
              ou par e-mail à{' '}
              <a
                href="mailto:contact@goquebecan.com"
                className="font-semibold text-primary underline"
              >
                contact@goquebecan.com
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
