import type { Metadata } from 'next';
import Link from 'next/link';
import { Compass, Handshake, Leaf, MapPinned, Route, Sparkles, Users, Wheat } from 'lucide-react';

import BrandName from '@/components/brand/BrandName';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

const siteUrl = 'https://www.goquebecan.com';

export const metadata: Metadata = {
  title: 'Notre mission | GoQuébeCan',
  description:
    'Découvrez la mission de GoQuébeCan : valoriser le tourisme local, les producteurs québécois, les itinéraires authentiques et les expériences humaines au Québec et au Canada.',
  alternates: {
    canonical: '/notre-mission',
  },
  openGraph: {
    title: 'Notre mission | GoQuébeCan',
    description:
      'GoQuébeCan aide les voyageurs à découvrir le Québec autrement grâce aux itinéraires, producteurs locaux, expériences authentiques et outils de planification.',
    url: `${siteUrl}/notre-mission`,
    siteName: 'GoQuébeCan',
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notre mission | GoQuébeCan',
    description:
      'Une plateforme pour découvrir le Québec autrement : producteurs locaux, itinéraires, road trips et tourisme authentique.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Notre mission - GoQuébeCan',
  url: `${siteUrl}/notre-mission`,
  description:
    'Page présentant la mission de GoQuébeCan : valoriser le tourisme local, les producteurs québécois, les itinéraires authentiques et les expériences humaines au Québec.',
  publisher: {
    '@type': 'Organization',
    name: 'GoQuébeCan',
    url: siteUrl,
  },
};

const pillars = [
  {
    title: 'Découvrir le Québec autrement',
    text: 'Mettre en lumière les régions, les villages, les routes panoramiques et les lieux parfois oubliés des grands circuits touristiques.',
    icon: Compass,
  },
  {
    title: 'Valoriser les producteurs locaux',
    text: 'Encourager les voyageurs à s’arrêter chez les producteurs, artisans, marchés, fromageries, microbrasseries et entreprises locales.',
    icon: Wheat,
  },
  {
    title: 'Créer des itinéraires utiles',
    text: 'Aider les visiteurs à mieux organiser leurs vacances grâce à des idées de road trip, des étapes claires et des outils de planification.',
    icon: Route,
  },
  {
    title: 'Favoriser un tourisme plus humain',
    text: 'Promouvoir une façon de voyager plus consciente, plus locale et plus connectée aux gens qui font vivre les régions.',
    icon: Handshake,
  },
];

export default function NotreMissionPage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Sparkles size={16} />
            Notre vision du voyage
          </div>

          <H1>Notre mission : faire découvrir le Québec autrement</H1>

          <p className="mt-6 text-base leading-relaxed text-neutral md:text-lg">
            Chez <BrandName />, notre mission est d’aider les voyageurs à découvrir le Québec et le
            Canada avec plus de sens : en valorisant les régions, les producteurs locaux, les
            itinéraires authentiques, les campings, les expériences humaines et les routes qui
            méritent vraiment le détour.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.title}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <H2 className="text-xl font-bold text-secondary">{pillar.title}</H2>
                <p className="mt-3 text-sm leading-relaxed text-neutral">{pillar.text}</p>
              </article>
            );
          })}
        </div>

        <section className="mt-16 rounded-4xl border border-gray-200 bg-white p-8 shadow-card">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MapPinned size={22} />
              </div>

              <H2>Pourquoi GoQuébeCan existe</H2>

              <p className="mt-4 leading-relaxed text-neutral">
                Beaucoup de voyageurs visitent les mêmes lieux, suivent les mêmes itinéraires et
                passent parfois à côté de ce qui rend le Québec profondément vivant : ses villages,
                ses producteurs, ses paysages, ses routes secondaires, ses marchés publics et ses
                rencontres simples.
              </p>

              <p className="mt-4 leading-relaxed text-neutral">
                <BrandName /> veut rendre ces découvertes plus faciles à trouver, plus agréables à
                planifier et plus utiles pour les visiteurs comme pour les acteurs locaux.
              </p>
            </div>

            <div className="rounded-3xl bg-primary/5 p-6">
              <H2 className="text-xl">Notre engagement</H2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-neutral">
                <li>✅ Encourager le tourisme local et responsable.</li>
                <li>✅ Donner plus de visibilité aux producteurs et entreprises régionales.</li>
                <li>
                  ✅ Aider les familles, couples, campeurs et voyageurs autonomes à mieux préparer
                  leurs séjours.
                </li>
                <li>
                  ✅ Créer des outils simples : carte interactive, planificateur, itinéraires et
                  contenus pratiques.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Users size={22} />
            </div>
            <H2>Pour les voyageurs</H2>
            <p className="mt-4 leading-relaxed text-neutral">
              GoQuébeCan accompagne les voyageurs dans la préparation de leurs vacances : idées de
              destinations, étapes de road trip, producteurs à visiter, activités familiales,
              campings, vidéos et conseils pratiques pour mieux profiter du Québec.
            </p>
          </article>

          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Leaf size={22} />
            </div>
            <H2>Pour les producteurs et partenaires</H2>
            <p className="mt-4 leading-relaxed text-neutral">
              La plateforme vise aussi à soutenir les acteurs locaux : producteurs, hébergements,
              offices touristiques, artisans, entreprises régionales et lieux d’expérience qui
              souhaitent rejoindre des visiteurs curieux et respectueux.
            </p>
          </article>
        </section>

        <section className="mt-16 rounded-4xl bg-secondary px-6 py-10 text-center text-white">
          <H2 className="text-white">Une plateforme en évolution</H2>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-white/90">
            <BrandName /> évolue progressivement avec de nouveaux itinéraires, des cartes
            interactives, des outils de planification, des contenus SEO, des vidéos, des suggestions
            locales et des projets collaboratifs pour mieux connecter les voyageurs au territoire.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/planificateur"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-secondary transition hover:opacity-90"
            >
              Planifier mon itinéraire
            </Link>

            <Link
              href="/producteurs"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Découvrir les producteurs locaux
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
