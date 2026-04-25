'use client';

import Image from 'next/image';
import Link from 'next/link';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { buildHowToLd } from '@/lib/seo/buildHowToLd';
import { buildFaqLd } from '@/lib/seo/buildFaqLd';
import { buildBreadcrumbLd } from '@/lib/seo/buildBreadcrumbLd';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';

const TITLE = 'Location VR au Québec : prix, van aménagé, camping-car, assurance et conseils';

const CANONICAL = 'https://www.goquebecan.com/blog/location-vr';
const IMAGE = '/images/destinations/vr-suite.avif';
const PUBLISHED = '2025-12-01';
const MODIFIED = '2026-04-25';

const faqItems = [
  {
    question: 'Quel type de VR choisir pour un couple ?',
    answer:
      'Un van aménagé ou un VR compact est souvent le meilleur choix pour un couple : plus facile à conduire, plus simple à stationner et généralement plus agréable pour un road trip flexible.',
  },
  {
    question: 'Quel type de VR choisir pour une famille ?',
    answer:
      'Un VR Classe C est souvent le meilleur compromis pour une famille. Il offre plus d’espace, des zones de couchage plus pratiques et reste généralement plus accessible à conduire qu’un très gros motorisé.',
  },
  {
    question: 'Combien coûte une location de VR au Québec ?',
    answer:
      'Le prix varie beaucoup selon la saison, le modèle, la durée, le kilométrage inclus, l’assurance et les frais de préparation. Il faut toujours comparer le coût total, pas seulement le prix affiché par jour.',
  },
  {
    question: 'Où peut-on dormir en VR au Québec ?',
    answer:
      'Les campings restent l’option la plus simple. On peut aussi utiliser certains lieux d’accueil, haltes agrotouristiques ou terrains autorisés, mais il faut toujours vérifier les règles locales avant de s’installer.',
  },
  {
    question: 'Faut-il une assurance spéciale pour louer un VR ?',
    answer:
      'Oui. Il faut vérifier l’assurance du loueur, la franchise, les exclusions, les conducteurs autorisés et les conditions en cas de dommage ou d’annulation.',
  },
];

const breadcrumb = buildBreadcrumbLd([
  { name: 'Accueil', item: 'https://www.goquebecan.com/' },
  { name: 'Blog', item: 'https://www.goquebecan.com/blog' },
  { name: 'Location VR au Québec', item: CANONICAL },
]);

const howTo = buildHowToLd({
  name: 'Comment louer un VR au Québec',
  description:
    'Étapes pour bien louer un véhicule récréatif au Québec : choisir le bon format, comparer les coûts, organiser ses haltes et réserver au bon moment.',
  steps: [
    {
      name: 'Choisir le bon format',
      text: 'Déterminez si vous avez besoin d’un van aménagé, d’un VR compact, d’un Classe C ou d’un modèle plus spacieux selon votre budget, votre aisance de conduite et le nombre de voyageurs.',
    },
    {
      name: 'Comparer le coût total',
      text: 'Comparez le prix par jour, le kilométrage inclus, l’assurance, la franchise, les frais de préparation, la literie, la vaisselle et les options.',
    },
    {
      name: 'Construire un itinéraire réaliste',
      text: 'Repérez les étapes, les campings, les haltes chez des producteurs, les distances et les points de services avant le départ.',
    },
    {
      name: 'Réserver au bon moment',
      text: 'En haute saison, réservez le plus tôt possible pour avoir plus de choix, surtout pour les modèles familiaux et les vans populaires.',
    },
  ],
  totalTimeISO: 'P3D',
  image: IMAGE,
  url: CANONICAL,
});

const faq = buildFaqLd(faqItems);

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

      <p className="lead">
        Louer un VR au Québec, c’est choisir une façon de voyager plus libre, plus flexible et plus
        immersive. Mais pour que l’expérience reste agréable, il faut bien comprendre les types de
        véhicules, les frais réels, l’assurance, les règles de stationnement et la logique d’un bon
        itinéraire.
      </p>

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
          Un voyage en VR réussi commence rarement par le véhicule : il commence par un itinéraire
          réaliste.
        </figcaption>
      </figure>

      <div className="not-prose my-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
        <p className="mb-3 font-semibold text-blue-950">À retenir avant de réserver</p>
        <ul className="grid gap-2 text-sm text-blue-950 md:grid-cols-2">
          <li>• Compare toujours le prix total, pas seulement le prix par jour.</li>
          <li>• Vérifie l’assurance, la franchise et les conducteurs autorisés.</li>
          <li>• Prévois des étapes courtes au début du voyage.</li>
          <li>• Réserve tôt pour l’été, les longs weekends et les modèles familiaux.</li>
        </ul>
      </div>

      <H2>Quel type de VR choisir au Québec ?</H2>

      <p>
        Le bon véhicule dépend surtout de votre façon de voyager. Un couple qui veut bouger souvent
        n’aura pas les mêmes besoins qu’une famille qui veut du confort, des rangements et des nuits
        plus simples.
      </p>

      <div className="not-prose my-8 overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-gray-50 text-gray-900">
            <tr>
              <th className="p-4">Type</th>
              <th className="p-4">Idéal pour</th>
              <th className="p-4">Avantages</th>
              <th className="p-4">À surveiller</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="p-4 font-semibold">Van aménagé / Classe B</td>
              <td className="p-4">Couple, solo, voyage flexible</td>
              <td className="p-4">Conduite facile, stationnement plus simple, ambiance aventure</td>
              <td className="p-4">Espace réduit, confort limité par mauvais temps</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold">Classe C</td>
              <td className="p-4">Famille, premier voyage en VR</td>
              <td className="p-4">Bon équilibre confort / conduite / rangements</td>
              <td className="p-4">Plus gourmand, plus long à stationner</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold">Classe A</td>
              <td className="p-4">Long séjour, confort maximal</td>
              <td className="p-4">Très spacieux, sensation de maison roulante</td>
              <td className="p-4">Coût élevé, conduite plus intimidante</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold">Roulotte</td>
              <td className="p-4">Voyageurs avec véhicule adapté</td>
              <td className="p-4">Permet de détacher le véhicule sur place</td>
              <td className="p-4">Nécessite remorquage, expérience et équipement</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>Combien coûte une location de VR au Québec ?</H2>

      <p>
        Le prix affiché n’est qu’une partie du budget. Pour comparer correctement deux locations, il
        faut additionner les frais obligatoires, les options, l’assurance, le kilométrage, le
        carburant et les nuits en camping.
      </p>

      <H3>Les frais à vérifier avant de réserver</H3>

      <ul>
        <li>Prix par jour ou par nuit.</li>
        <li>Kilométrage inclus et coût des kilomètres supplémentaires.</li>
        <li>Frais de préparation ou de nettoyage.</li>
        <li>Assurance, franchise et options de protection.</li>
        <li>Literie, vaisselle, chaises, BBQ, génératrice ou équipements inclus.</li>
        <li>Frais de service de la plateforme, s’il y en a.</li>
        <li>Politique d’annulation et de modification.</li>
      </ul>

      <p>
        La bonne question n’est donc pas seulement : “combien coûte le VR ?”. La vraie question est
        :<strong> combien coûte le voyage complet une fois toutes les options ajoutées ?</strong>
      </p>

      <H2>Assurance, franchise et sécurité : le point à ne pas négliger</H2>

      <p>
        L’assurance est l’un des éléments les plus importants dans une location de VR. Un prix
        attractif peut devenir moins intéressant si la franchise est élevée, si plusieurs exclusions
        s’appliquent ou si certains conducteurs ne sont pas couverts.
      </p>

      <div className="not-prose my-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="mb-3 font-semibold text-amber-950">Checklist assurance</p>
        <ul className="space-y-2 text-sm text-amber-950">
          <li>• Montant exact de la franchise.</li>
          <li>• Conducteurs autorisés et âge minimum.</li>
          <li>• Couverture en cas de bris de vitre, pneus, toit ou accessoires.</li>
          <li>• Assistance routière incluse ou non.</li>
          <li>• Règles pour les routes non pavées ou les régions éloignées.</li>
        </ul>
      </div>

      <H2>Où dormir en VR au Québec ?</H2>

      <p>
        Pour un premier voyage, les campings restent la solution la plus simple : branchements,
        douches, eau, vidange, sécurité et emplacement réservé. C’est particulièrement pratique avec
        des enfants ou si vous ne voulez pas gérer trop d’improvisation.
      </p>

      <p>
        Pour un voyage plus local, vous pouvez aussi ajouter des arrêts chez des producteurs,
        artisans ou lieux d’accueil autorisés. Cela donne une vraie couleur au road trip : dormir
        près d’un vignoble, d’une ferme, d’une microbrasserie ou d’un lieu gourmand change beaucoup
        l’expérience.
      </p>

      <p>
        Pour repérer des haltes intéressantes, explorez notre page{' '}
        <Link href="/producteurs" className="text-blue-600 underline">
          producteurs locaux
        </Link>{' '}
        et combinez-la avec le{' '}
        <Link href="/planificateur" className="text-blue-600 underline">
          planificateur GoQuébeCAN
        </Link>
        .
      </p>

      <H2>Idées d’itinéraires VR au Québec</H2>

      <p>
        Un bon itinéraire en VR doit éviter les journées trop longues. L’objectif n’est pas de
        conduire toute la journée, mais de créer un rythme agréable entre route, pauses, nature et
        découvertes.
      </p>

      <div className="not-prose my-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <H3 className="mb-2 text-xl">Route facile pour débuter</H3>
          <p className="text-sm text-gray-700">
            Québec, Charlevoix, Kamouraska ou Cantons-de-l’Est : parfait pour tester le VR sans trop
            allonger les distances.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <H3 className="mb-2 text-xl">Road trip nature</H3>
          <p className="text-sm text-gray-700">
            Gaspésie, Forillon, Percé, Bic ou Côte-Nord : plus intense, plus sauvage, idéal avec un
            peu plus de temps.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <H3 className="mb-2 text-xl">Voyage gourmand</H3>
          <p className="text-sm text-gray-700">
            Ajoutez fermes, microbrasseries, fromageries, marchés publics et pauses locales pour
            transformer la route en expérience.
          </p>
        </div>
      </div>

      <H2>Conseils pratiques pour réussir un premier voyage en VR</H2>

      <ul>
        <li>Commencez par un itinéraire simple avec peu d’étapes.</li>
        <li>Évitez les arrivées tardives au camping.</li>
        <li>Gardez une marge de temps pour les courses, la vidange et les pauses.</li>
        <li>Prévoyez une première nuit facile, proche du point de départ.</li>
        <li>Testez chauffage, eau, électricité et branchements dès le début.</li>
        <li>Ne remplissez pas trop l’horaire : le VR est fait pour ralentir.</li>
      </ul>

      <H2>Les erreurs fréquentes à éviter</H2>

      <ul>
        <li>Choisir un VR trop gros pour un premier voyage.</li>
        <li>Oublier les frais additionnels dans le budget.</li>
        <li>Prévoir trop de kilomètres par jour.</li>
        <li>Réserver les campings trop tard en haute saison.</li>
        <li>Ne pas vérifier les restrictions d’assurance.</li>
        <li>
          Partir sans comprendre le fonctionnement de l’eau, de l’électricité et de la vidange.
        </li>
      </ul>

      <H2>FAQ : location de VR au Québec</H2>

      <div className="not-prose my-6 space-y-3">
        {faqItems.map((item) => (
          <details key={item.question} className="rounded-xl border bg-white p-4">
            <summary className="cursor-pointer font-semibold text-gray-900">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-6 text-gray-700">{item.answer}</p>
          </details>
        ))}
      </div>

      <H2>Conclusion : est-ce une bonne idée de louer un VR au Québec ?</H2>

      <p>
        Oui, à condition de bien préparer le voyage. La location de VR peut devenir une expérience
        incroyable : plus libre qu’un séjour classique, plus immersive qu’un simple road trip en
        voiture, et très forte pour découvrir les régions du Québec autrement.
      </p>

      <p>
        Le secret, c’est de rester réaliste. Choisissez le bon format, comparez le coût total,
        réservez les nuits importantes, puis construisez un itinéraire qui laisse de la place aux
        imprévus.
      </p>

      <div className="not-prose mt-10 rounded-3xl bg-slate-900 p-6 text-center text-white">
        <H2 className="mb-3 text-2xl text-white">Préparer votre road trip en VR</H2>
        <p className="mx-auto mb-6 max-w-2xl text-slate-200">
          Construisez vos étapes, repérez les producteurs locaux, équilibrez les distances et gardez
          une vue claire sur votre voyage.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/planificateur"
            className="rounded-full bg-white px-5 py-3 font-medium text-slate-900 no-underline hover:bg-slate-100"
          >
            Ouvrir le planificateur
          </Link>

          <Link
            href="/producteurs"
            className="rounded-full border border-white/40 px-5 py-3 font-medium text-white no-underline hover:bg-white/10"
          >
            Voir les producteurs locaux
          </Link>

          <Link
            href="/blog/voyage-camping"
            className="rounded-full border border-white/40 px-5 py-3 font-medium text-white no-underline hover:bg-white/10"
          >
            Guide camping
          </Link>
        </div>
      </div>
    </article>
  );
}
