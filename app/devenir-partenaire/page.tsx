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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/photo-quebec-partenaire.avif"
            alt="Paysage du Québec pour les partenaires GoQuébeCAN"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative mx-auto flex min-h-[620px] max-w-7xl flex-col justify-center px-6 py-24 text-white">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/15 px-4 py-2 backdrop-blur">
              <Image src="/logo2.avif" alt="Logo GoQuébeCAN" width={34} height={34} />
              <BrandName className="text-lg text-white" />
            </div>

            <H1 className="text-white">Devenir partenaire de GoQuébeCAN</H1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
              <BrandName /> met en valeur les régions, les producteurs locaux, les expériences
              authentiques et les voyages au Québec à travers une plateforme moderne pensée pour les
              voyageurs d’aujourd’hui.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85">
              Nous développons actuellement des partenariats avec des acteurs touristiques,
              hébergements, producteurs locaux et entreprises souhaitant promouvoir le Québec
              autrement.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110"
              >
                Discutons d’un partenariat
              </Link>

              <Link
                href="/producteurs"
                className="rounded-full border border-white/60 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Voir les producteurs locaux
              </Link>
            </div>
          </div>
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

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-3xl bg-secondary p-8 text-white shadow-card md:p-12">
          <div className="max-w-3xl">
            <H2 className="text-white">Ensemble, faisons rayonner le Québec autrement.</H2>
            <p className="mt-5 leading-relaxed text-white/85">
              Vous représentez un producteur, un hébergement, une activité, une entreprise locale ou
              un organisme touristique ? Parlons d’une collaboration simple, sérieuse et durable.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Aller au formulaire de contact
              </Link>

              <Link
                href="/planificateur"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Découvrir le planificateur
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
