import type { Metadata } from 'next';
import Link from 'next/link';

import BrandName from '@/components/brand/BrandName';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

const siteUrl = 'https://www.goquebecan.com';

export const metadata: Metadata = {
  title: 'Mentions légales | GoQuébeCan',
  description:
    'Consultez les mentions légales de GoQuébeCan : éditeur du site, hébergement, propriété intellectuelle, responsabilité, liens externes, affiliation et contact.',
  alternates: {
    canonical: '/mentions-legales',
  },
  openGraph: {
    title: 'Mentions légales | GoQuébeCan',
    description:
      'Informations légales relatives au site GoQuébeCan : éditeur, hébergement, propriété intellectuelle, responsabilité et contact.',
    url: `${siteUrl}/mentions-legales`,
    siteName: 'GoQuébeCan',
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Mentions légales | GoQuébeCan',
    description: 'Informations légales relatives au site GoQuébeCan.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Mentions légales',
  url: `${siteUrl}/mentions-legales`,
  description:
    'Page des mentions légales du site GoQuébeCan, incluant les informations relatives à l’éditeur, à l’hébergement, à la propriété intellectuelle et à la responsabilité.',
  publisher: {
    '@type': 'Organization',
    name: 'GoQuébeCan',
    url: siteUrl,
  },
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-4xl px-6 py-16 lg:py-20">
        <div className="mb-10 rounded-4xl border border-gray-200 bg-white p-6 shadow-card md:p-8">
          <H1 className="mb-6 text-3xl font-bold text-secondary">Mentions légales</H1>

          <p className="leading-relaxed text-neutral">
            Les présentes mentions légales ont pour objectif d’informer les visiteurs du site{' '}
            <BrandName /> sur l’identité de l’éditeur, les conditions d’utilisation du contenu, les
            responsabilités liées aux informations publiées ainsi que les moyens de contact.
          </p>

          <p className="mt-4 text-sm text-neutral">Dernière mise à jour : 29 mai 2026.</p>
        </div>

        <div className="space-y-8 rounded-4xl border border-gray-200 bg-white p-6 shadow-card md:p-8">
          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">1. Éditeur du site</H2>
            <p className="leading-relaxed text-neutral">
              Le site <strong>GoQuébeCan</strong>, accessible à l’adresse{' '}
              <Link href="/" className="font-semibold text-primary underline">
                www.goquebecan.com
              </Link>
              , est édité par :
            </p>

            <div className="mt-4 rounded-2xl bg-primary/5 p-4 text-sm leading-relaxed text-neutral">
              <p>
                <strong>Nom :</strong> Mathieu Marciniak
              </p>
              <p>
                <strong>Adresse e-mail :</strong>{' '}
                <a
                  href="mailto:contact@goquebecan.com"
                  className="font-semibold text-primary underline"
                >
                  contact@goquebecan.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">2. Hébergement</H2>
            <p className="leading-relaxed text-neutral">
              Le site est hébergé par la plateforme suivante :
            </p>

            <div className="mt-4 rounded-2xl bg-primary/5 p-4 text-sm leading-relaxed text-neutral">
              <p>
                <strong>Nom :</strong> Vercel Inc.
              </p>
              <p>
                <strong>Site web :</strong>{' '}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline"
                >
                  vercel.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              3. Propriété intellectuelle
            </H2>
            <p className="leading-relaxed text-neutral">
              L’ensemble des contenus présents sur le site <BrandName />, incluant notamment les
              textes, visuels, logos, éléments graphiques, vidéos, cartes, contenus éditoriaux,
              structures de pages et éléments de navigation, sont protégés par les règles relatives
              au droit d’auteur et à la propriété intellectuelle.
            </p>
            <p className="mt-4 leading-relaxed text-neutral">
              Toute reproduction, représentation, modification, diffusion ou exploitation, totale ou
              partielle, sans autorisation écrite préalable, est interdite, sauf usage personnel et
              non commercial dans le respect des lois applicables.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">4. Responsabilité</H2>
            <p className="leading-relaxed text-neutral">
              <BrandName /> s’efforce de fournir des informations utiles, fiables et mises à jour
              concernant les destinations, itinéraires, producteurs locaux, hébergements,
              expériences touristiques et conseils de voyage au Québec et au Canada.
            </p>
            <p className="mt-4 leading-relaxed text-neutral">
              Toutefois, les informations publiées peuvent évoluer avec le temps. Les horaires,
              tarifs, disponibilités, accès, conditions météorologiques, règlements locaux ou
              services proposés par des tiers peuvent changer sans préavis. Le visiteur est invité à
              vérifier les informations importantes auprès des organismes, entreprises ou autorités
              concernées avant tout déplacement ou réservation.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">5. Liens externes</H2>
            <p className="leading-relaxed text-neutral">
              Le site peut contenir des liens vers des sites externes, notamment des sites
              touristiques, plateformes de réservation, producteurs locaux, hébergements, compagnies
              de transport, outils de planification ou partenaires.
            </p>
            <p className="mt-4 leading-relaxed text-neutral">
              <BrandName /> n’exerce aucun contrôle permanent sur ces sites tiers et ne peut être
              tenu responsable de leur contenu, de leur disponibilité, de leurs pratiques
              commerciales ou de leur politique de confidentialité.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">6. Liens d’affiliation</H2>
            <p className="leading-relaxed text-neutral">
              Certaines pages de <BrandName /> peuvent contenir des liens d’affiliation. Lorsqu’un
              visiteur clique sur ces liens ou effectue un achat auprès d’un partenaire, le site
              peut percevoir une commission, sans coût supplémentaire pour l’utilisateur.
            </p>
            <p className="mt-4 leading-relaxed text-neutral">
              Ces revenus contribuent au financement, à l’amélioration et au développement continu
              de la plateforme. La présence d’un lien affilié ne modifie pas le prix payé par le
              visiteur et ne remet pas en cause l’indépendance éditoriale du site.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              7. Producteurs, partenaires et informations locales
            </H2>
            <p className="leading-relaxed text-neutral">
              Les informations relatives aux producteurs locaux, entreprises régionales,
              hébergements, lieux touristiques, activités ou partenaires peuvent provenir de sources
              publiques, de recherches éditoriales ou de données transmises directement par les
              personnes ou organisations concernées.
            </p>
            <p className="mt-4 leading-relaxed text-neutral">
              Malgré le soin apporté à leur présentation, <BrandName /> ne peut garantir en tout
              temps l’exactitude, l’exhaustivité ou la mise à jour permanente de ces informations.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              8. Itinéraires et contenus proposés par les utilisateurs
            </H2>
            <p className="leading-relaxed text-neutral">
              Le site peut permettre aux utilisateurs de proposer des itinéraires, suggestions,
              commentaires, documents ou expériences de voyage. Les contenus transmis par les
              utilisateurs demeurent sous leur responsabilité.
            </p>
            <p className="mt-4 leading-relaxed text-neutral">
              <BrandName /> se réserve le droit de modérer, corriger, refuser, retirer ou ne pas
              publier tout contenu jugé incomplet, inexact, inapproprié, promotionnel de manière
              excessive ou non conforme à l’esprit de la plateforme.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">9. Données personnelles</H2>
            <p className="leading-relaxed text-neutral">
              Les informations relatives à la collecte, à l’utilisation et à la protection des
              données personnelles sont détaillées dans la page{' '}
              <Link href="/confidentialite" className="font-semibold text-primary underline">
                Politique de confidentialité
              </Link>
              .
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">10. Contact</H2>
            <p className="leading-relaxed text-neutral">
              Pour toute question relative aux présentes mentions légales, vous pouvez utiliser la
              page de{' '}
              <Link href="/contact" className="font-semibold text-primary underline">
                contact
              </Link>{' '}
              ou écrire directement à{' '}
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
