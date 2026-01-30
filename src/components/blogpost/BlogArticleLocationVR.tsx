'use client';

import Image from 'next/image';
import Link from 'next/link';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import { buildMetadata2025 } from '@/lib/seo/buildMetadata2025';
import { buildHowToLd } from '@/lib/seo/buildHowToLd';
import { buildFaqLd } from '@/lib/seo/buildFaqLd';
import { buildBreadcrumbLd } from '@/lib/seo/buildBreadcrumbLd';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';

// ======================= SEO CONFIGURATION =======================

const TITLE =
  'Location VR Québec 2025 : van aménagé, camping-car (Classe B/C/A), prix, assurance & conseils';

const DESCRIPTION =
  'Guide 2025 pour louer un VR au Québec/Canada : différences Classe A/B/C, prix moyens, assurance, kilométrage, où dormir (campings, Terego, iOverlander), astuces haute saison et itinéraires.';

const CANONICAL =
  'https://goquebecan.com/blog/pourquoi-louer-un-vr-au-quebec-avec-authentik-canada';

const IMAGE = '/images/destinations/vr-suite.avif';
const PUBLISHED = '2025-12-01';
const MODIFIED = '2025-12-07';
const KEYWORDS = [
  'location VR Québec',
  'louer VR 2025',
  'location camping-car Canada',
  'van aménagé Québec',
  'Classe B',
  'Classe C',
  'Classe A',
  'prix location VR',
  'assurance VR',
  'Terego',
  'iOverlander',
  'boondocking',
  'campings Québec',
];

// ✅ Nouveau système de metadata 2025
export const metadata = buildMetadata2025({
  title: TITLE,
  description: DESCRIPTION,
  canonical: CANONICAL,
  image: IMAGE,
  keywords: KEYWORDS,
  type: 'article',
});

// ======================= JSON-LD STRUCTURÉS =======================

const breadcrumb = buildBreadcrumbLd([
  { name: 'Accueil', item: 'https://goquebecan.com/' },
  { name: 'Blog', item: 'https://goquebecan.com/blog' },
  { name: 'Location VR au Québec', item: CANONICAL },
]);

const howTo = buildHowToLd({
  name: 'Comment louer un VR au Québec',
  description:
    'Étapes pour bien louer un véhicule récréatif au Québec : choisir, comparer, planifier et réserver.',
  steps: [
    {
      name: 'Choisir le type de VR',
      text: 'Déterminez si vous préférez un van (Classe B), un C ou un A selon votre budget et confort.',
    },
    {
      name: 'Comparer les prix et assurances',
      text: 'Vérifiez les conditions, kilométrage et options incluses.',
    },
    {
      name: 'Planifier son itinéraire',
      text: 'Utilisez Terego, iOverlander et notre planificateur GoQuébeCAN.',
    },
    { name: 'Réserver tôt', text: 'En haute saison, anticipez de 2 à 3 mois à l’avance.' },
  ],
  totalTimeISO: 'P3D',
  image: IMAGE,
  url: CANONICAL,
});

const faq = buildFaqLd([
  {
    question: 'Quel type de VR choisir pour un couple ?',
    answer:
      'Un van aménagé (Classe B) est compact, facile à conduire et parfait pour deux personnes souhaitant voyager léger.',
  },
  {
    question: 'Où peut-on dormir gratuitement en VR au Québec ?',
    answer:
      'Chez Terego, dans certaines aires municipales ou parkings Walmart, en respectant les règles locales.',
  },
  {
    question: 'Faut-il une assurance spéciale pour louer un VR ?',
    answer:
      'Oui, la plupart des agences exigent une assurance tous risques adaptée aux véhicules récréatifs. Vérifiez les clauses de franchise avant de signer.',
  },
]);

// ======================= CONTENU =======================

export default function BlogArticleLocationVR() {
  return (
    <article className="prose prose-lg mx-auto max-w-4xl px-5 py-10">
      {/* ====== SEO STRUCTURÉ ====== */}
      <HeadExtras articlePublishedTime={PUBLISHED} articleModifiedTime={MODIFIED} />
      <JsonLd data={breadcrumb} />
      <JsonLd data={howTo} />
      <JsonLd data={faq} />

      {/* ====== TITRE ====== */}
      <H1 size="lg" accent="bar">
        Location VR Québec 2025 : van aménagé, camping-car, prix, assurance, conseils
      </H1>

      {/* ====== IMAGE PRINCIPALE ====== */}
      <figure className="my-8">
        <Image
          src={IMAGE}
          alt="Voyage en VR au Québec — Route panoramique à travers les montagnes et les forêts"
          width={1200}
          height={675}
          className="w-full rounded-2xl shadow-md"
          priority
        />
        <figcaption className="mt-2 text-center text-sm text-gray-600">
          Louer un VR au Québec permet de découvrir la province à son rythme — parfait pour un road
          trip authentique.
        </figcaption>
      </figure>

      {/* ====== INTRO ====== */}
      <p>
        Louer un véhicule récréatif (VR) au Québec, c’est la liberté de partir à l’aventure sans
        contrainte. Que vous choisissiez un van compact ou un grand camping-car tout équipé, ce
        guide 2025 vous aide à comprendre les types de VR, leurs prix, les assurances et les astuces
        pour profiter d’un voyage sans stress.
      </p>

      {/* ====== SECTION 1 : TYPES DE VR ====== */}
      <H2>Les différents types de VR disponibles au Québec</H2>
      <p>
        Il existe trois grandes classes de VR. Le <strong>Classe A</strong> est un véritable
        appartement roulant, souvent réservé aux longs séjours ou aux familles. Le{' '}
        <strong>Classe C</strong> est plus abordable, avec une cabine sur châssis de camion. Enfin,
        le <strong>Classe B</strong> (ou van aménagé) est idéal pour les couples ou les voyageurs
        recherchant la simplicité et la mobilité.
      </p>

      {/* ====== SECTION 2 : PRIX & ASSURANCE ====== */}
      <H2>Prix moyen d’une location de VR en 2025</H2>
      <p>
        En haute saison (juin à septembre), comptez entre{' '}
        <strong>150 $ et 350 $ CAD par jour</strong> selon le modèle et l’équipement. Certains sites
        comme <strong>Authentik Canada</strong> ou <strong>Fraserway</strong> proposent des forfaits
        tout inclus (assurance, literie, kilométrage). Pensez à réserver au moins 3 mois à l’avance
        pour éviter la pénurie estivale.
      </p>

      {/* ====== SECTION 3 : OÙ DORMIR EN VR ====== */}
      <H2>Où dormir en VR au Québec ?</H2>
      <p>
        Les <strong>campings</strong> restent la solution la plus simple, avec des bornes
        électriques et de l’eau. Mais les plateformes comme <strong>Terego</strong> offrent des
        nuits gratuites chez des producteurs locaux. Pour les plus aventuriers, des applications
        comme <strong>iOverlander</strong> répertorient les endroits où dormir gratuitement
        (boondocking).
      </p>

      {/* ====== SECTION 4 : CONSEILS PRATIQUES ====== */}
      <H2>Nos conseils pour un road trip réussi</H2>
      <ul>
        <li>Évitez les routes trop escarpées avec les gros VR (Classe A/C).</li>
        <li>Planifiez vos haltes recharge/douche avant de partir.</li>
        <li>Privilégiez les trajets entre 200 et 300 km par jour pour mieux profiter.</li>
        <li>
          Utilisez notre{' '}
          <Link href="/planificateur" className="text-blue-600 underline">
            planificateur interactif
          </Link>{' '}
          pour calculer vos itinéraires et vos arrêts.
        </li>
      </ul>

      {/* ====== SECTION 5 : ASTUCES SUPPLÉMENTAIRES ====== */}
      <H2>Optimiser votre voyage en VR</H2>
      <p>
        Avant le départ, vérifiez la pression des pneus, le niveau d’eau propre et la charge
        électrique. Envisagez l’ajout d’une application comme <strong>ChargeHub</strong> ou{' '}
        <strong>ABRP</strong> si vous voyagez avec un VR électrique ou hybride.
      </p>
      <p>
        Enfin, profitez-en pour découvrir nos{' '}
        <Link href="/objets-indispensables" className="text-blue-600 underline">
          produits indispensables pour le voyage
        </Link>{' '}
        — de quoi rendre votre expérience encore plus agréable et pratique.
      </p>

      {/* ====== CONCLUSION ====== */}
      <H2>Conclusion</H2>
      <p>
        Voyager en VR au Québec, c’est vivre une expérience de liberté totale. Que vous partiez pour
        3 jours ou 3 semaines, chaque route est une aventure. Pour compléter votre préparation,
        explorez nos{' '}
        <Link href="/carte-interactive" className="text-blue-600 underline">
          cartes interactives
        </Link>{' '}
        et découvrez les meilleurs arrêts nature et producteurs locaux sur votre itinéraire.
      </p>

      {/* ====== CTA FIN D’ARTICLE ====== */}
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/destinations"
          className="rounded-full border px-5 py-3 font-medium hover:bg-gray-50"
        >
          Retourner aux destinations populaires
        </Link>
        <Link href="/videos" className="rounded-full border px-5 py-3 font-medium hover:bg-gray-50">
          Vidéos populaires
        </Link>
      </div>
    </article>
  );
}
