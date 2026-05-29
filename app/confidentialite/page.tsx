import type { Metadata } from 'next';
import Link from 'next/link';

import BrandName from '@/components/brand/BrandName';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

const siteUrl = 'https://www.goquebecan.com';

export const metadata: Metadata = {
  title: 'Politique de confidentialité | GoQuébeCan',
  description:
    'Découvrez comment GoQuébeCan collecte, utilise et protège les données personnelles de ses visiteurs, producteurs locaux, partenaires et utilisateurs.',
  alternates: {
    canonical: '/confidentialite',
  },
  openGraph: {
    title: 'Politique de confidentialité | GoQuébeCan',
    description:
      'Informations sur la collecte, l’utilisation, la conservation et la protection des données personnelles sur GoQuébeCan.',
    url: `${siteUrl}/confidentialite`,
    siteName: 'GoQuébeCan',
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Politique de confidentialité | GoQuébeCan',
    description: 'Protection des données personnelles sur GoQuébeCan.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'PrivacyPolicy',
  name: 'Politique de confidentialité - GoQuébeCan',
  url: `${siteUrl}/confidentialite`,
  description:
    'Politique de confidentialité décrivant la collecte, l’utilisation, la conservation et la protection des données personnelles sur GoQuébeCan.',
  publisher: {
    '@type': 'Organization',
    name: 'GoQuébeCan',
    url: siteUrl,
  },
};

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="mx-auto max-w-4xl px-6 py-16 lg:py-20">
        <div className="mb-10 rounded-4xl border border-gray-200 bg-white p-6 shadow-card md:p-8">
          <H1 className="mb-6 text-3xl font-bold text-secondary">Politique de confidentialité</H1>

          <p className="leading-relaxed text-neutral">
            <BrandName /> accorde une grande importance à la protection de la vie privée de ses
            visiteurs, voyageurs, producteurs locaux, partenaires et utilisateurs. Cette politique
            explique quelles données peuvent être collectées, comment elles sont utilisées et quels
            sont vos droits.
          </p>

          <p className="mt-4 text-sm text-neutral">Dernière mise à jour : 29 mai 2026.</p>
        </div>

        <div className="space-y-8 rounded-4xl border border-gray-200 bg-white p-6 shadow-card md:p-8">
          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">1. Données collectées</H2>

            <p className="leading-relaxed text-neutral">
              Lors de votre utilisation du site, <BrandName /> peut collecter certaines informations
              lorsque vous naviguez, remplissez un formulaire, proposez un producteur local,
              partagez un itinéraire ou communiquez avec nous.
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 text-neutral">
              <li>Nom et prénom, lorsque vous les indiquez volontairement.</li>
              <li>Adresse e-mail, notamment via le formulaire de contact.</li>
              <li>
                Message, demande de partenariat, proposition de producteur ou itinéraire partagé.
              </li>
              <li>
                Informations techniques de navigation, comme le navigateur, l’appareil ou les pages
                consultées.
              </li>
              <li>
                Données liées aux cookies ou outils de mesure d’audience, si ceux-ci sont activés.
              </li>
            </ul>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              2. Utilisation des données
            </H2>

            <p className="leading-relaxed text-neutral">
              Les données collectées sont utilisées uniquement dans le cadre du fonctionnement et de
              l’amélioration de <BrandName />.
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 text-neutral">
              <li>Répondre aux messages envoyés via la page contact.</li>
              <li>Analyser les propositions de producteurs locaux ou de partenaires.</li>
              <li>Traiter les itinéraires partagés par les utilisateurs.</li>
              <li>
                Améliorer le contenu, l’expérience utilisateur et les outils de planification.
              </li>
              <li>Comprendre les pages les plus consultées afin d’améliorer le site.</li>
              <li>Assurer la sécurité, la stabilité et le bon fonctionnement de la plateforme.</li>
            </ul>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              3. Formulaires de contact, producteurs et itinéraires
            </H2>

            <p className="leading-relaxed text-neutral">
              Lorsque vous utilisez un formulaire sur <BrandName />, les informations que vous
              transmettez sont utilisées pour traiter votre demande. Cela peut inclure une demande
              de contact, une proposition de partenariat, une inscription de producteur local ou le
              partage d’un itinéraire de voyage.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              Les informations transmises doivent être exactes et envoyées volontairement. Les
              contenus reçus peuvent être relus, modérés, corrigés ou refusés avant toute
              publication éventuelle sur le site.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              4. Cookies et mesure d’audience
            </H2>

            <p className="leading-relaxed text-neutral">
              Le site peut utiliser des cookies ou technologies similaires pour améliorer
              l’expérience utilisateur, mesurer la fréquentation, analyser les performances du site
              et comprendre l’utilisation des différentes pages.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              Selon les outils activés, certaines données anonymisées ou pseudonymisées peuvent être
              traitées par des services tiers comme des outils d’analyse statistique, de sécurité ou
              de performance.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              Vous pouvez configurer votre navigateur pour bloquer ou supprimer les cookies.
              Certaines fonctionnalités du site pourraient toutefois être moins fluides.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              5. Services tiers et stockage des données
            </H2>

            <p className="leading-relaxed text-neutral">
              <BrandName /> peut utiliser des services tiers pour assurer l’hébergement, le stockage
              de certaines informations, la sécurité, l’analyse de trafic ou la gestion des
              formulaires.
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 text-neutral">
              <li>Vercel, pour l’hébergement et le déploiement du site.</li>
              <li>
                Supabase, si activé, pour le stockage des messages, producteurs ou itinéraires.
              </li>
              <li>
                Google Analytics ou outils équivalents, si activés, pour la mesure d’audience.
              </li>
              <li>
                Services d’affiliation ou partenaires, uniquement lors de clics vers leurs
                plateformes.
              </li>
            </ul>

            <p className="mt-4 leading-relaxed text-neutral">
              Ces services disposent de leurs propres politiques de confidentialité. <BrandName />{' '}
              ne vend pas vos données personnelles.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">6. Partage des données</H2>

            <p className="leading-relaxed text-neutral">
              Les données personnelles ne sont pas vendues. Elles peuvent être partagées uniquement
              lorsque cela est nécessaire au fonctionnement du site, au traitement d’une demande, au
              respect d’une obligation légale ou à l’utilisation d’un service technique
              indispensable.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              Dans le cas d’une demande de référencement d’un producteur, certaines informations
              publiques fournies volontairement, comme le nom de l’activité, la localisation, le
              site web ou une description, peuvent être publiées sur <BrandName /> après validation.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              7. Conservation des données
            </H2>

            <p className="leading-relaxed text-neutral">
              Les données sont conservées uniquement pendant la durée nécessaire au traitement des
              demandes, à la gestion du site, au suivi des échanges ou au respect d’obligations
              légales.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              Les messages de contact, propositions de producteurs ou itinéraires partagés peuvent
              être conservés afin d’assurer le suivi, l’amélioration du service ou la modération des
              contenus.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">8. Sécurité</H2>

            <p className="leading-relaxed text-neutral">
              <BrandName /> met en place des mesures raisonnables afin de protéger les informations
              transmises contre l’accès non autorisé, la perte, l’utilisation abusive ou la
              divulgation non souhaitée.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              Aucun système numérique ne peut toutefois garantir une sécurité absolue. Les
              utilisateurs sont invités à ne pas transmettre d’informations sensibles inutiles via
              les formulaires.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">9. Vos droits</H2>

            <p className="leading-relaxed text-neutral">
              Selon les lois applicables, notamment les lois canadiennes sur la protection des
              renseignements personnels et, le cas échéant, le Règlement général sur la protection
              des données, vous pouvez demander :
            </p>

            <ul className="mt-4 list-inside list-disc space-y-2 text-neutral">
              <li>l’accès aux données personnelles vous concernant ;</li>
              <li>la rectification d’informations inexactes ;</li>
              <li>la suppression de certaines données ;</li>
              <li>le retrait de votre consentement lorsque le traitement repose sur celui-ci ;</li>
              <li>des informations sur l’utilisation de vos données.</li>
            </ul>

            <p className="mt-4 leading-relaxed text-neutral">
              Pour exercer ces droits, vous pouvez nous contacter via la page{' '}
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

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              10. Liens externes et affiliation
            </H2>

            <p className="leading-relaxed text-neutral">
              Le site peut contenir des liens vers des sites externes, plateformes touristiques,
              outils de réservation, partenaires ou programmes d’affiliation. Lorsque vous quittez
              <BrandName />, la politique de confidentialité du site externe concerné s’applique.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              Certains liens peuvent être des liens affiliés. Ils peuvent générer une commission
              pour
              <BrandName /> sans coût supplémentaire pour l’utilisateur.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">
              11. Modification de la politique
            </H2>

            <p className="leading-relaxed text-neutral">
              Cette politique de confidentialité peut être mise à jour afin de refléter l’évolution
              du site, des outils utilisés, des obligations légales ou des services proposés.
            </p>

            <p className="mt-4 leading-relaxed text-neutral">
              La date de dernière mise à jour indiquée en haut de cette page permet d’identifier la
              version la plus récente.
            </p>
          </section>

          <section>
            <H2 className="mb-3 text-xl font-semibold text-secondary">12. Contact</H2>

            <p className="leading-relaxed text-neutral">
              Pour toute question concernant cette politique de confidentialité ou l’utilisation de
              vos données personnelles, vous pouvez nous écrire à{' '}
              <a
                href="mailto:contact@goquebecan.com"
                className="font-semibold text-primary underline"
              >
                contact@goquebecan.com
              </a>{' '}
              ou utiliser la page{' '}
              <Link href="/contact" className="font-semibold text-primary underline">
                contact
              </Link>
              .
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
