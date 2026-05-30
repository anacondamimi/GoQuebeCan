import Image from 'next/image';
import Link from 'next/link';
import {
  Camera,
  HeartHandshake,
  Hotel,
  MapPinned,
  Sparkles,
  TrendingUp,
  Wheat,
} from 'lucide-react';

import BrandName from '@/components/brand/BrandName';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

export const metadata = {
  title: 'Devenir partenaire | GoQuébeCAN',
  description:
    'GoQuébeCAN développe des partenariats long terme avec producteurs locaux, hébergements, restaurants et acteurs touristiques du Québec.',
};

const partnerBenefits = [
  {
    title: 'Visibilité régionale',
    description:
      'Présentez votre activité auprès de voyageurs qui souhaitent découvrir le Québec autrement.',
    icon: MapPinned,
  },
  {
    title: 'Producteurs locaux',
    description:
      'Mettez en avant le savoir-faire local, les arrêts gourmands et les rencontres authentiques.',
    icon: Wheat,
  },
  {
    title: 'Tourisme et hébergement',
    description:
      'Valorisez votre hébergement, activité, restaurant ou service touristique dans un contexte utile.',
    icon: Hotel,
  },
  {
    title: 'SEO long terme',
    description:
      'Bénéficiez d’une présence dans des contenus pensés pour le référencement naturel et la recherche Google.',
    icon: TrendingUp,
  },
  {
    title: 'Contenu inspirant',
    description:
      'Intégrez votre entreprise dans des articles, itinéraires, guides ou futures mises en avant visuelles.',
    icon: Camera,
  },
  {
    title: 'Collaboration durable',
    description:
      'Construisons une relation sérieuse, humaine et cohérente avec l’identité du Québec.',
    icon: HeartHandshake,
  },
];

const partnerTypes = [
  'Producteurs locaux',
  'Campings',
  'Hôtels',
  'Restaurants',
  'Activités touristiques',
  'Offices de tourisme',
  'Entreprises québécoises',
  'Créateurs de contenu',
  'Agrotourisme',
  'Expériences authentiques',
];

const offerItems = [
  'Articles optimisés SEO',
  'Présence possible sur la carte interactive',
  'Mise en avant dans des itinéraires',
  'Liens internes vers vos activités',
  'Backlinks vers votre site',
  'Visibilité dans des guides thématiques',
  'Valorisation des producteurs locaux',
  'Collaborations long terme',
];

export default function DevenirPartenairePage() {
  return (
    <main className="bg-background">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16">
          <H1>Devenir partenaire de GoQuébeCAN</H1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-neutral">
            Faites découvrir votre entreprise à des voyageurs qui recherchent des expériences
            authentiques, des producteurs locaux et des trésors cachés partout au Québec.
          </p>

          <p className="mt-4 max-w-3xl leading-relaxed text-neutral">
            <BrandName /> met en valeur les régions, les producteurs locaux, les expériences
            authentiques et les voyages au Québec à travers une plateforme moderne pensée pour les
            voyageurs d’aujourd’hui.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
            >
              Discutons d’un partenariat
            </Link>

            <Link
              href="/producteurs"
              className="rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-secondary transition hover:bg-gray-50"
            >
              Voir les producteurs locaux
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[16/9] w-full max-w-7xl overflow-hidden rounded-none bg-white md:rounded-3xl">
          <Image
            src="/images/photo-quebec-partenaire.avif"
            alt="Famille de voyageurs devant un kiosque de produits locaux au Québec"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-card md:grid-cols-4">
          {[
            'Plateforme québécoise',
            'Producteurs locaux',
            'SEO touristique',
            'Carte interactive',
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl bg-primary/5 px-4 py-3 text-sm font-semibold text-secondary"
            >
              <Sparkles size={16} className="text-primary" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 max-w-3xl">
          <H2>Pourquoi devenir partenaire ?</H2>
          <p className="mt-4 text-neutral">
            <BrandName /> souhaite créer des collaborations utiles, visibles et durables avec les
            entreprises qui participent à la richesse du Québec.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partnerBenefits.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-secondary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral">{item.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-card lg:grid-cols-2">
          <div>
            <H2>Une vision durable du tourisme québécois</H2>
            <p className="mt-5 leading-relaxed text-neutral">
              Notre objectif est de bâtir une plateforme québécoise forte, humaine et durable qui
              valorise autant les grands attraits touristiques que les petites découvertes locales.
            </p>
            <p className="mt-4 leading-relaxed text-neutral">
              <BrandName /> veut aider les voyageurs à découvrir des lieux inspirants, à préparer
              leurs road trips avec simplicité et à intégrer davantage de producteurs, d’arrêts
              gourmands et d’expériences authentiques dans leurs itinéraires.
            </p>
          </div>

          <div className="rounded-3xl bg-primary/5 p-6">
            <h3 className="text-lg font-bold text-secondary">Partenaires recherchés</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {partnerTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-primary/20 bg-white px-4 py-2 text-sm font-medium text-neutral"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <H2>Ce que GoQuébeCAN peut offrir</H2>
            <p className="mt-4 text-neutral">
              Selon le type de collaboration, votre entreprise peut être intégrée à différents
              endroits stratégiques de la plateforme.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {offerItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-neutral shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-gradient-to-r from-green-50 via-white to-blue-50 p-10 text-center shadow-card md:p-16">
          <H2 className="mx-auto max-w-4xl">Ensemble, faisons découvrir le meilleur du Québec.</H2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-neutral">
            Vous êtes producteur, restaurateur, propriétaire de camping, hôtelier, artisan ou acteur
            touristique ? Rejoignez <BrandName /> et faites connaître votre entreprise à des
            voyageurs en quête d'authenticité et de découvertes locales.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:scale-105 hover:brightness-110"
            >
              🤝 Devenir partenaire
            </Link>

            <Link
              href="/producteurs"
              className="rounded-full border border-primary px-8 py-4 text-base font-semibold text-primary transition hover:bg-primary/5"
            >
              🧀 Voir les producteurs locaux
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
