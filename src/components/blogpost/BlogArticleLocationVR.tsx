'use client';

import Image from 'next/image';
import Link from 'next/link';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import { buildHowToLd } from '@/lib/seo/buildHowToLd';
import { buildFaqLd } from '@/lib/seo/buildFaqLd';
import { buildBreadcrumbLd } from '@/lib/seo/buildBreadcrumbLd';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';

// ======================= SEO CONTENT CONFIGURATION =======================

const TITLE = 'Location VR au Québec 2025 : van aménagé, camping-car, prix, assurance et conseils';

const CANONICAL = 'https://goquebecan.com/blog/location-vr-au-quebec';
const IMAGE = '/images/destinations/vr-suite.avif';
const PUBLISHED = '2025-12-01';
const MODIFIED = '2025-12-07';

// ======================= JSON-LD STRUCTURÉS =======================

const breadcrumb = buildBreadcrumbLd([
  { name: 'Accueil', item: 'https://goquebecan.com/' },
  { name: 'Blog', item: 'https://goquebecan.com/blog' },
  { name: 'Location VR au Québec', item: CANONICAL },
]);

const howTo = buildHowToLd({
  name: 'Comment louer un VR au Québec',
  description:
    'Étapes pour bien louer un véhicule récréatif au Québec : choisir le bon format, comparer les coûts, organiser ses haltes et réserver au bon moment.',
  steps: [
    {
      name: 'Choisir le type de VR',
      text: 'Déterminez si vous avez besoin d’un van aménagé, d’un VR Classe C ou d’un modèle plus spacieux selon votre budget, votre aisance de conduite et le nombre de voyageurs.',
    },
    {
      name: 'Comparer prix et assurance',
      text: 'Vérifiez les frais journaliers, le kilométrage inclus, la franchise, les frais de préparation et les options comme la literie, la vaisselle ou les kilomètres supplémentaires.',
    },
    {
      name: 'Préparer son itinéraire',
      text: 'Repérez vos arrêts, vos campings, vos haltes chez des producteurs et vos points de services avant le départ.',
    },
    {
      name: 'Réserver à l’avance',
      text: 'En haute saison, il est recommandé de réserver plusieurs semaines ou plusieurs mois à l’avance pour avoir plus de choix et de meilleurs tarifs.',
    },
  ],
  totalTimeISO: 'P3D',
  image: IMAGE,
  url: CANONICAL,
});

const faq = buildFaqLd([
  {
    question: 'Quel type de VR choisir pour un couple ?',
    answer:
      'Un van aménagé ou un VR Classe B convient très bien à un couple qui veut voyager léger, se garer plus facilement et garder une bonne liberté de mouvement.',
  },
  {
    question: 'Quel type de VR choisir pour une famille ?',
    answer:
      'Un VR Classe C est souvent un bon compromis pour une famille grâce à son espace, son confort et sa facilité de conduite comparativement à un très gros modèle.',
  },
  {
    question: 'Où peut-on dormir en VR au Québec ?',
    answer:
      'Vous pouvez dormir dans des campings, sur certains terrains partenaires comme ceux de réseaux agrotouristiques, et dans certains lieux répertoriés par des applications spécialisées, toujours en respectant les règles locales.',
  },
  {
    question: 'Faut-il une assurance spéciale pour louer un VR ?',
    answer:
      'Oui, il faut vérifier la couverture proposée par le loueur, la franchise, les exclusions et les responsabilités liées au véhicule avant de réserver.',
  },
]);

// ======================= CONTENU =======================

export default function BlogArticleLocationVR() {
  return (
    <article className="prose prose-lg mx-auto max-w-4xl px-5 py-10">
      <HeadExtras articlePublishedTime={PUBLISHED} articleModifiedTime={MODIFIED} />
      <JsonLd data={breadcrumb} />
      <JsonLd data={howTo} />
      {faq ? <JsonLd data={faq} /> : null}

      <H1 size="lg" accent="bar">
        {TITLE}
      </H1>

      <figure className="my-8">
        <Image
          src={IMAGE}
          alt="Voyage en VR au Québec sur une route panoramique entre forêt, montagne et liberté"
          width={1200}
          height={675}
          className="w-full rounded-2xl shadow-md"
          priority
        />
        <figcaption className="mt-2 text-center text-sm text-gray-600">
          Louer un VR au Québec permet de voyager à son rythme, de s’arrêter plus librement et de
          transformer la route en partie intégrante du voyage.
        </figcaption>
      </figure>

      <p>
        Louer un véhicule récréatif au Québec, c’est choisir une façon de voyager plus souple, plus
        immersive et souvent plus mémorable. Que vous visiez un van aménagé pour un couple ou un VR
        plus spacieux pour une famille, cette formule permet de découvrir le territoire à votre
        rythme, avec une vraie liberté dans la manière de bouger, de dormir et de profiter des
        paysages.
      </p>

      <p>
        Dans ce guide, vous trouverez les différences entre les principaux formats de VR, le budget
        à prévoir, les points importants à vérifier avant la réservation, les options pour dormir
        sur la route et plusieurs conseils simples pour éviter les mauvaises surprises.
      </p>

      <H2>Quel type de VR choisir ?</H2>
      <p>
        Le choix dépend surtout du nombre de voyageurs, de votre confort au volant et du style de
        voyage que vous recherchez.
      </p>

      <p>
        Le <strong>Classe B</strong>, souvent appelé van aménagé, est compact, plus facile à
        conduire et pratique pour les couples ou les voyageurs qui veulent rester mobiles. Le{' '}
        <strong>Classe C</strong> offre un bon équilibre entre espace intérieur et prise en main, ce
        qui en fait souvent une excellente option pour les familles. Le <strong>Classe A</strong>{' '}
        est le plus spacieux, mais aussi le plus imposant, le plus coûteux et le moins simple à
        manœuvrer dans certaines zones.
      </p>

      <p>
        Pour un premier voyage, beaucoup de voyageurs se sentent plus à l’aise avec un format
        intermédiaire plutôt qu’avec un très gros modèle. Cela simplifie les stationnements, les
        routes plus étroites et les arrêts improvisés.
      </p>

      <H2>Combien coûte une location de VR au Québec en 2025 ?</H2>
      <p>
        Le tarif varie selon la saison, la taille du véhicule, les équipements inclus et les frais
        additionnels. En période estivale, il faut souvent prévoir un budget plus élevé, surtout
        pour les départs en juillet et en août.
      </p>

      <p>
        De façon générale, un budget d’environ <strong>150 $ à 350 $ CAD par jour</strong> peut
        servir de repère selon le modèle choisi. À cela peuvent s’ajouter les frais de préparation,
        la literie, la vaisselle, les kilomètres supplémentaires, le carburant, les campings et
        certaines options de confort.
      </p>

      <p>
        Avant de réserver, vérifiez toujours ce qui est vraiment inclus. Deux offres qui semblent
        proches au premier regard peuvent devenir très différentes une fois les kilomètres, les
        assurances et les frais obligatoires ajoutés.
      </p>

      <H2>Assurance, franchise et points à vérifier avant de signer</H2>
      <p>
        L’assurance est l’un des points les plus importants. Il faut regarder le niveau de
        protection offert, la franchise, les exclusions et les conditions de responsabilité en cas
        d’incident.
      </p>

      <ul>
        <li>Vérifiez le montant de la franchise.</li>
        <li>Confirmez les restrictions de conducteur et d’âge.</li>
        <li>Regardez si le kilométrage est limité ou non.</li>
        <li>Demandez ce qui est inclus dans les frais de préparation.</li>
        <li>Vérifiez les conditions d’annulation et de modification.</li>
      </ul>

      <p>
        Prenez aussi le temps de faire un vrai tour du véhicule au départ : état extérieur,
        équipements, niveau de carburant, eau, branchements, accessoires fournis et fonctionnement
        général.
      </p>

      <H2>Où dormir en VR au Québec ?</H2>
      <p>
        Les <strong>campings</strong> restent la solution la plus simple pour avoir accès à
        l’électricité, à l’eau, aux douches et parfois aux services de vidange. C’est souvent la
        meilleure option pour garder un voyage confortable, surtout en famille ou lors d’un premier
        séjour en VR.
      </p>

      <p>
        Il existe aussi des alternatives intéressantes pour varier les haltes, notamment certains
        réseaux agrotouristiques et lieux d’accueil chez des producteurs. C’est une façon beaucoup
        plus humaine et locale de voyager, surtout si vous aimez ajouter des découvertes gourmandes
        à votre parcours.
      </p>

      <p>
        Pour compléter votre préparation, vous pouvez explorer notre page{' '}
        <Link href="/producteurs" className="text-blue-600 underline">
          producteurs locaux
        </Link>{' '}
        afin de repérer des arrêts qui donneront plus de saveur à votre itinéraire.
      </p>

      <H2>Nos conseils pour réussir un road trip en VR</H2>
      <ul>
        <li>Évitez de prévoir des journées trop longues, surtout au début.</li>
        <li>Gardez une marge pour les détours, les pauses et les imprévus.</li>
        <li>Visez souvent des étapes raisonnables pour mieux profiter des lieux.</li>
        <li>Réservez plus tôt en haute saison pour avoir davantage de choix.</li>
        <li>Repérez vos points d’eau, campings et haltes importantes avant le départ.</li>
      </ul>

      <p>
        Pour organiser vos étapes plus facilement, utilisez notre{' '}
        <Link href="/planificateur" className="text-blue-600 underline">
          planificateur interactif
        </Link>{' '}
        afin de visualiser votre parcours, structurer vos arrêts et préparer un voyage plus fluide.
      </p>

      <H2>Comment rendre l’expérience encore plus agréable ?</H2>
      <p>
        Un voyage en VR est souvent plus réussi quand on ne cherche pas seulement à se déplacer,
        mais à construire un vrai rythme de découverte. Alternez les trajets, les pauses nature, les
        petits villages, les haltes gourmandes et les moments plus simples au bord de l’eau ou près
        d’un point de vue.
      </p>

      <p>
        Pour compléter votre préparation, vous pouvez aussi consulter nos guides pratiques selon le
        type de séjour :
      </p>

      <ul>
        <li>
          <Link href="/blog/voyage-voiture" className="text-blue-600 underline">
            Guide voyage en voiture
          </Link>
        </li>
        <li>
          <Link href="/blog/voyage-camping" className="text-blue-600 underline">
            Guide voyage camping
          </Link>
        </li>
        <li>
          <Link href="/camping" className="text-blue-600 underline">
            Campings au Québec
          </Link>
        </li>
      </ul>

      <H2>Conclusion</H2>
      <p>
        Louer un VR au Québec, c’est une excellente manière de découvrir la province et le Canada
        avec plus de liberté, plus de flexibilité et un vrai sentiment d’aventure. Que vous partiez
        pour quelques jours ou pour un plus long circuit, une bonne préparation fait toute la
        différence.
      </p>

      <p>
        Prenez le temps de choisir le bon format, de vérifier les frais réels, d’anticiper vos
        haltes et de construire un itinéraire réaliste. Ensuite, laissez la route faire le reste.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/planificateur"
          className="rounded-full bg-blue-600 px-5 py-3 font-medium text-white no-underline hover:bg-blue-700"
        >
          Ouvrir le planificateur
        </Link>

        <Link
          href="/producteurs"
          className="rounded-full border px-5 py-3 font-medium no-underline hover:bg-gray-50"
        >
          Voir les producteurs locaux
        </Link>

        <Link
          href="/#destinations-populaires"
          className="rounded-full border px-5 py-3 font-medium no-underline hover:bg-gray-50"
        >
          Retour aux destinations
        </Link>
      </div>
    </article>
  );
}
