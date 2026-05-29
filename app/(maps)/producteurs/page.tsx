import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Apple,
  Beer,
  Handshake,
  Leaf,
  MapPinned,
  Route,
  Sparkles,
  Store,
  Wheat,
} from 'lucide-react';

import BrandName from '@/components/brand/BrandName';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import ProducteursMapSection from './ProducteursMapSection';

const siteUrl = 'https://www.goquebecan.com';

export const metadata: Metadata = {
  title: 'Producteurs locaux du Québec | Carte interactive GoQuébeCan',
  description:
    'Découvrez les producteurs locaux du Québec avec GoQuébeCan : fermes, fromageries, microbrasseries, cidreries, marchés publics et arrêts gourmands à ajouter à vos itinéraires.',
  alternates: {
    canonical: '/producteurs',
  },
  openGraph: {
    title: 'Producteurs locaux du Québec | GoQuébeCan',
    description:
      'Explorez une carte interactive des producteurs locaux du Québec et préparez un itinéraire plus authentique avec GoQuébeCan.',
    url: `${siteUrl}/producteurs`,
    siteName: 'GoQuébeCan',
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Producteurs locaux du Québec | GoQuébeCan',
    description:
      'Fermes, fromageries, cidreries, microbrasseries et marchés publics à découvrir au Québec.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Producteurs locaux du Québec',
  url: `${siteUrl}/producteurs`,
  description:
    'Carte interactive et guide des producteurs locaux du Québec : fermes, fromageries, cidreries, microbrasseries, marchés publics et entreprises régionales.',
  publisher: {
    '@type': 'Organization',
    name: 'GoQuébeCan',
    url: siteUrl,
  },
  about: ['Producteurs locaux', 'Tourisme gourmand', 'Québec', 'Circuits courts', 'Agrotourisme'],
};

const categories = [
  {
    title: 'Fermes et produits du terroir',
    text: 'Découvrez des producteurs passionnés, des fermes familiales et des produits locaux à intégrer à vos vacances.',
    icon: Wheat,
  },
  {
    title: 'Fromageries et marchés publics',
    text: 'Ajoutez des arrêts gourmands à votre road trip et soutenez les artisans des régions.',
    icon: Store,
  },
  {
    title: 'Cidrerie, vignobles et microbrasseries',
    text: 'Trouvez des lieux authentiques pour goûter les saveurs locales du Québec.',
    icon: Beer,
  },
  {
    title: 'Itinéraires gourmands',
    text: 'Planifiez un trajet plus humain en reliant paysages, villages, producteurs et expériences locales.',
    icon: Route,
  },
];

export default function ProducteursPage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <Sparkles size={16} />
            Producteurs locaux & tourisme gourmand
          </div>

          <H1>Producteurs locaux du Québec : découvrez les saveurs authentiques</H1>

          <p className="mt-6 text-base leading-relaxed text-neutral md:text-lg">
            Avec <BrandName />, découvrez les producteurs locaux du Québec : fermes, fromageries,
            cidreries, microbrasseries, marchés publics, artisans gourmands et entreprises
            régionales à ajouter à vos vacances, vos escapades ou vos itinéraires de road trip.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/planificateur"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
            >
              📍 Planifier un itinéraire gourmand
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
            >
              Ajouter un producteur
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <article
                key={category.title}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <H2 className="text-lg font-bold text-secondary">{category.title}</H2>
                <p className="mt-3 text-sm leading-relaxed text-neutral">{category.text}</p>
              </article>
            );
          })}
        </div>

        <section className="mt-16 rounded-4xl border border-gray-200 bg-white p-6 shadow-card md:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <MapPinned size={22} />
            </div>

            <H2>Carte interactive des producteurs locaux</H2>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-neutral md:text-base">
              Utilisez la carte pour repérer des producteurs à proximité de vos destinations, créer
              des arrêts plus authentiques et soutenir les entreprises locales pendant votre voyage.
            </p>
          </div>

          <ProducteursMapSection />
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Leaf size={22} />
            </div>

            <H2>Pourquoi visiter les producteurs du Québec ?</H2>

            <p className="mt-4 leading-relaxed text-neutral">
              Visiter un producteur local, c’est découvrir une région autrement. C’est prendre le
              temps de rencontrer des gens passionnés, goûter des produits du terroir, encourager
              l’économie locale et transformer un simple trajet en souvenir de voyage.
            </p>
          </article>

          <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Handshake size={22} />
            </div>

            <H2>Vous êtes producteur local ?</H2>

            <p className="mt-4 leading-relaxed text-neutral">
              Vous exploitez une ferme, une fromagerie, une cidrerie, une microbrasserie, un marché,
              une érablière ou une entreprise locale ? Vous pouvez proposer votre activité afin
              qu’elle soit ajoutée progressivement à la plateforme GoQuébeCan.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
            >
              📬 Proposer mon activité
            </Link>
          </article>
        </section>

        <section className="mt-16 rounded-4xl bg-secondary px-6 py-10 text-center text-white">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-white/10 text-white">
            <Apple size={22} />
          </div>

          <H2 className="text-white">Voyager local, c’est donner du sens à son itinéraire</H2>

          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-white/90">
            GoQuébeCan veut aider les voyageurs à relier les plus beaux paysages du Québec aux
            producteurs, artisans et lieux authentiques qui font vivre les régions.
          </p>

          <div className="mt-8">
            <Link
              href="/planificateur"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-secondary transition hover:opacity-90"
            >
              Créer mon itinéraire avec des arrêts locaux
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}
