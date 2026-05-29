
import type { Metadata } from 'next';
import Link from 'next/link';

import BrandName from '@/components/brand/BrandName';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

const siteUrl = 'https://www.goquebecan.com';

export const metadata: Metadata = {
  title: "Conditions d'utilisation | GoQuébeCan",
  description:
    "Conditions générales d'utilisation du site GoQuébeCan : accès aux contenus, itinéraires, producteurs locaux, outils de planification et services proposés.",
  alternates: {
    canonical: '/conditions-utilisation',
  },
  openGraph: {
    title: "Conditions d'utilisation | GoQuébeCan",
    description:
      "Consultez les conditions générales d'utilisation de GoQuébeCan.",
    url: `${siteUrl}/conditions-utilisation`,
    siteName: 'GoQuébeCan',
    locale: 'fr_CA',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: "Conditions d'utilisation",
  url: `${siteUrl}/conditions-utilisation`,
  description:
    "Conditions générales d'utilisation du site GoQuébeCan.",
};

export default function ConditionsUtilisationPage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-4xl px-6 py-16 lg:py-20">
        <div className="mb-10 rounded-4xl border border-gray-200 bg-white p-6 shadow-card md:p-8">
          <H1 className="mb-6 text-3xl font-bold text-secondary">
            Conditions générales d’utilisation
          </H1>

          <p className="leading-relaxed text-neutral">
            En accédant au site <BrandName />, vous acceptez les présentes
            conditions générales d’utilisation. Si vous n’acceptez pas ces
            conditions, veuillez ne pas utiliser les services proposés.
          </p>

          <p className="mt-4 text-sm text-neutral">
            Dernière mise à jour : 29 mai 2026.
          </p>
        </div>

        <div className="space-y-8 rounded-4xl border border-gray-200 bg-white p-6 shadow-card md:p-8">

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              1. Objet du site
            </H2>

            <p className="leading-relaxed text-neutral">
              <BrandName /> est une plateforme de découverte touristique
              permettant de consulter des destinations, itinéraires,
              producteurs locaux, contenus éditoriaux, cartes interactives,
              vidéos, outils de planification et ressources liées au tourisme
              au Québec et au Canada.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              2. Utilisation du site
            </H2>

            <p className="leading-relaxed text-neutral">
              L’utilisateur s’engage à utiliser le site de manière légale,
              respectueuse et conforme aux lois applicables.
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 text-neutral">
              <li>Ne pas tenter d’endommager le site ou ses services.</li>
              <li>Ne pas contourner les mécanismes de sécurité.</li>
              <li>Ne pas publier de contenu trompeur ou illégal.</li>
              <li>Respecter les autres utilisateurs et partenaires.</li>
            </ul>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              3. Itinéraires et informations touristiques
            </H2>

            <p className="leading-relaxed text-neutral">
              Les itinéraires, recommandations, producteurs locaux,
              hébergements, activités et informations touristiques sont
              fournis à titre informatif.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              Les horaires, tarifs, disponibilités, conditions d’accès,
              règlements municipaux ou services proposés par des tiers peuvent
              changer sans préavis.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              Les voyageurs demeurent responsables de leurs décisions,
              réservations et déplacements.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              4. Contenu partagé par les utilisateurs
            </H2>

            <p className="leading-relaxed text-neutral">
              Les utilisateurs peuvent soumettre des itinéraires, suggestions,
              commentaires, documents ou informations destinés à être publiés
              ou analysés.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              En soumettant du contenu, l’utilisateur confirme disposer des
              droits nécessaires pour le partager.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              <BrandName /> se réserve le droit de refuser, modifier ou retirer
              tout contenu jugé inapproprié, trompeur, offensant ou contraire
              à l’esprit de la plateforme.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              5. Producteurs locaux et partenaires
            </H2>

            <p className="leading-relaxed text-neutral">
              Les informations relatives aux producteurs, hébergements,
              entreprises ou partenaires peuvent provenir de données publiques
              ou d’informations fournies directement par les organisations
              concernées.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              Malgré le soin apporté à leur présentation, aucune garantie
              absolue d’exactitude ou de disponibilité ne peut être accordée.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              6. Liens d’affiliation
            </H2>

            <p className="leading-relaxed text-neutral">
              Certaines pages peuvent contenir des liens affiliés vers des
              partenaires commerciaux.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              Lorsqu’un visiteur effectue un achat ou une réservation via ces
              liens, <BrandName /> peut percevoir une commission sans coût
              supplémentaire pour l’utilisateur.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              7. Propriété intellectuelle
            </H2>

            <p className="leading-relaxed text-neutral">
              Les textes, logos, visuels, cartes, éléments graphiques,
              photographies, vidéos et contenus présents sur le site sont
              protégés par les lois relatives à la propriété intellectuelle.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              Toute reproduction ou utilisation non autorisée est interdite.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              8. Limitation de responsabilité
            </H2>

            <p className="leading-relaxed text-neutral">
              <BrandName /> ne pourra être tenu responsable des dommages,
              pertes, retards, erreurs ou inexactitudes pouvant résulter de
              l’utilisation du site ou de services tiers accessibles par lien.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              9. Modification des conditions
            </H2>

            <p className="leading-relaxed text-neutral">
              Ces conditions peuvent être modifiées à tout moment afin de tenir
              compte de l’évolution du site, de ses services ou des obligations
              légales applicables.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              10. Contact
            </H2>

            <p className="leading-relaxed text-neutral">
              Pour toute question concernant ces conditions d’utilisation,
              veuillez consulter notre page{' '}
              <Link
                href="/contact"
                className="font-semibold text-primary underline"
              >
                Contact
              </Link>
              .
            </p>
          </section>

        </div>
      </section>
    </main>
  );
}
