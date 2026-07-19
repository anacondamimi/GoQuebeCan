'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import BrandName from '@/components/brand/BrandName';
import React, { Suspense, useEffect, useState } from 'react';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

export function NunavikMapLoader() {
  const NunavikMap = dynamic(() => import('@/components/NunavikMap'), {
    ssr: false,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    const el = document.getElementById('nunavik-map-trigger');
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div id="nunavik-map-trigger" className="w-full">
      {isVisible ? (
        <Suspense
          fallback={
            <div className="flex h-[60vh] w-full items-center justify-center rounded-xl bg-slate-100 text-sm text-slate-500 shadow-inner">
              Chargement de la carte du Nunavik...
            </div>
          }
        >
          <NunavikMap />
        </Suspense>
      ) : (
        <div className="flex h-[60vh] w-full items-center justify-center rounded-xl bg-slate-100 italic text-slate-400">
          Carte en veille – visible au défilement
        </div>
      )}
    </div>
  );
}

export default function BlogArticleKuururjuaq() {
  return (
    <DestinationArticleTemplate
      slug="kuururjuaq"
      title="Vacances dans le Grand Nord québécois : Kuujjuaq, Nunavik et le rêve arctique accessible"
      subtitle="Kuujjuaq, Nunavik, culture inuite, toundra, aurores boréales et voyage nordique : un guide complet pour préparer une aventure unique dans le Grand Nord québécois."
    >
      <section className="prose prose-lg prose-slate max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-strong:text-slate-900 prose-li:marker:text-slate-500 prose-img:rounded-xl">
        <p>
          Le Nord du Québec, c’est un autre monde. Pas juste « un peu plus haut que le Saguenay »,
          mais un territoire immense où la route s’arrête, où la culture inuite est bien vivante, où
          le ciel prend toute la place. Quand on dit <strong>Kuujjuaq</strong>,{' '}
          <strong>Nunavik</strong>, <strong>toundra</strong>, <strong>aurores boréales</strong>… on
          parle d’endroits où l’on ressent quelque chose de très simple et très puissant : le calme.
        </p>

        <p>
          Si vous cherchez un voyage qui sort complètement du cadre classique « Québec – Charlevoix
          – Gaspésie », alors bienvenue. Ici, on part loin, mais pas n’importe comment : on part
          intelligemment, on planifie, et on respecte les lieux.
        </p>

        <p>Dans cet article, on va voir :</p>

        <ul>
          <li>Pourquoi le Nunavik et Kuujjuaq sont des destinations incroyables ;</li>
          <li>Où dormir avec des adresses concrètes ;</li>
          <li>Comment organiser le trajet ;</li>
          <li>Quoi faire sur place ;</li>
          <li>
            Et comment tout préparer sans stress grâce à notre outil{' '}
            <Link href="/planificateur" className="font-semibold text-indigo-600 hover:underline">
              planificateur
            </Link>{' '}
            et à notre guide{' '}
            <Link
              href="/blog/voyage-voiture"
              className="font-semibold text-indigo-600 hover:underline"
            >
              voyage en voiture
            </Link>
            .
          </li>
        </ul>

        <p>
          Notre but est simple : que vous soyez déjà en train d’imaginer
          <em> « OK, on le fait. On part. »</em>
        </p>

        <H2>Pourquoi aller jusqu’au Nunavik et à Kuujjuaq</H2>

        <p>
          Le <strong>Nunavik</strong> couvre tout le nord du Québec, au-delà du 55e parallèle. C’est
          grandiose : immensité arctique, rivières larges comme des lacs, silence, neige qui craque
          l’hiver, lumière quasi permanente l’été. On ne parle pas ici d’une « belle région
          touristique ». On parle d’un <strong>choc émotionnel</strong>.
        </p>

        <p>
          Venir ici, ce n’est pas seulement « voir du paysage ». C’est rencontrer les communautés
          inuites, comprendre leur lien au territoire et ressentir ce que veut dire{' '}
          <em>vivre au Nord</em>.
        </p>

        <p>
          Si vous rêvez de <strong>nature brute</strong>, d’<strong>authenticité</strong> et d’un
          voyage qui a du sens, vous êtes au bon endroit.
        </p>

        <H2>Comment s’y rendre et ce que personne ne vous dit</H2>

        <p>
          L’accès au Nunavik se fait principalement par avion, mais un voyage « route + nord » reste
          possible. Beaucoup de familles font un road trip vers la Côte-Nord, Tadoussac, le
          Bas-Saint-Laurent, puis prennent un vol régional vers Kuujjuaq. C’est une manière plus
          douce d’arriver dans le Nord.
        </p>

        <p>Pour que le trajet reste agréable, découvrez :</p>

        <ul>
          <li>
            Notre guide spécial longues distances{' '}
            <Link
              href="/blog/voyage-voiture"
              className="font-semibold text-indigo-600 hover:underline"
            >
              voyage en voiture
            </Link>{' '}
            : pauses, repas, musique, astuces enfants.
          </li>
          <li>
            Notre outil de planification{' '}
            <Link href="/planificateur" className="font-semibold text-indigo-600 hover:underline">
              planificateur
            </Link>{' '}
            pour équilibrer vos étapes et vos nuitées.
          </li>
        </ul>

        <H2>Où dormir dans le Nord du Québec</H2>

        <H3>Kuujjuaq Inn – Kuujjuaq, Nunavik</H3>
        <p>
          Le <strong>Kuujjuaq Inn</strong> est l’adresse incontournable à Kuujjuaq : chambres
          confortables, <strong>restaurant sur place</strong>, navette aéroport, Wi-Fi. Un vrai
          point d’ancrage humain dans le Nunavik.
        </p>
        <ul>
          <li>🏔️ En plein Nunavik</li>
          <li>🍽️ Repas sur place</li>
          <li>🚌 Navette aéroport</li>
          <li>🌐 Wi-Fi</li>
        </ul>
        <p className="text-sm text-slate-600">Tarif indicatif : ≈ 245 $/nuit.</p>

        <H3>Réseau des hôtels coopératifs du Nunavik</H3>
        <p>
          La <strong>Fédération des coopératives du Nouveau-Québec</strong> gère 14 hôtels répartis
          dans les communautés du Nunavik. Ce n’est pas une chaîne, mais un réseau local : accueil
          simple, repas sur place, immersion culturelle.
        </p>
        <ul>
          <li>❄️ Expérience nordique</li>
          <li>🤝 Modèle coopératif</li>
          <li>🍽️ Restauration</li>
          <li>✈️ Accès par avion</li>
        </ul>
        <p className="text-sm text-slate-600">Tarif indicatif : ≈ 220 $/nuit.</p>

        <H2>Quoi faire sur place : vivre le Nord, pas juste le regarder</H2>

        <ul>
          <li>
            Observer les <strong>aurores boréales</strong>.
          </li>
          <li>
            Découvrir la <strong>culture inuite vivante</strong>.
          </li>
          <li>
            Partager un <strong>repas local</strong> et écouter des histoires.
          </li>
          <li>Sentir l’immensité, marcher, respirer le silence.</li>
        </ul>

        <p>
          Et si vous aimez encourager les artisans du Québec, explorez notre carte des{' '}
          <Link href="/producteurs" className="font-semibold text-indigo-600 hover:underline">
            producteurs locaux
          </Link>
          .
        </p>

        <section aria-label="Carte interactive du Nunavik" className="my-10">
          <H2 className="flex flex-wrap items-center gap-2 text-xl font-semibold text-slate-900">
            <span>Carte interactive du Nunavik</span>
            <span className="text-[11px] font-normal text-white">
              <BrandName as="span" size="sm" />
            </span>
          </H2>

          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Cette carte vous permet d’explorer les communautés inuites du Nunavik, au nord du 55e
            parallèle. Chaque point représente un village nordique, un service essentiel ou un lieu
            d’hébergement possible pour les voyageurs. Cliquez pour voir le nom du lieu et préparez
            votre itinéraire.
          </p>

          <div className="mt-4">
            <NunavikMapLoader />
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
            <p className="mb-2">
              Le Nunavik est une région nordique du Québec composée de 14 villages inuits,
              accessible principalement par avion. Kuujjuaq est la porte d’entrée principale du
              territoire, mais chaque communauté a sa culture, ses paysages et ses réalités
              logistiques.
            </p>
            <p>
              Astuce voyage : utilisez notre{' '}
              <Link href="/planificateur" className="font-semibold text-indigo-600 hover:underline">
                planificateur
              </Link>{' '}
              pour tracer vos étapes, et regardez les{' '}
              <Link href="/videos" className="font-semibold text-indigo-600 hover:underline">
                vidéos du Nord
              </Link>{' '}
              pour visualiser l’ambiance réelle avant d’arriver sur place.
            </p>
          </div>
        </section>

        <H2>Conseils pratiques &amp; questions fréquentes</H2>

        <H3>Quelle est la meilleure période pour visiter ?</H3>
        <p>
          L’été, de juin à septembre, est plus doux et parfait pour explorer. L’hiver, de décembre à
          mars, offre les aurores boréales et la magie de la neige.
        </p>

        <H3>Peut-on venir avec des enfants ?</H3>
        <p>
          Oui. Ce n’est pas un voyage « tout inclus », mais une expérience qui les marquera : grands
          espaces, animaux, rencontres. Prévoyez du confort le soir.
        </p>

        <H3>Y a-t-il des bornes pour véhicules électriques ?</H3>
        <p>
          Dans le Nord, elles sont rares. Planifiez vos arrêts avec notre guide{' '}
          <Link
            href="/blog/voyage-voiture"
            className="font-semibold text-indigo-600 hover:underline"
          >
            voyage en voiture
          </Link>
          .
        </p>

        <H3>Faut-il réserver à l’avance ?</H3>
        <p>
          Oui, impérativement. Les hébergements sont peu nombreux : réservez dès que vos dates de
          vol ou de route sont fixées.
        </p>

        <H2>Prêt à vivre le Nord du Québec ?</H2>

        <p>
          Aller au Nunavik, dormir à Kuujjuaq, parler avec les gens, regarder le ciel la nuit… ce
          n’est pas juste un voyage, c’est une rencontre. Une aventure qui change la perception du
          Québec.
        </p>

        <p>
          Planifiez dès maintenant avec notre{' '}
          <Link href="/planificateur" className="font-semibold text-indigo-600 hover:underline">
            planificateur
          </Link>
          , découvrez nos{' '}
          <Link href="/videos" className="font-semibold text-indigo-600 hover:underline">
            vidéos
          </Link>{' '}
          pour vous inspirer, et laissez-vous guider par la beauté du Nord.
        </p>

        <p>Le Québec nordique vous attend. Et il ne ressemble à rien d’autre.</p>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline:
              'Vacances dans le Grand Nord québécois : Kuujjuaq, Nunavik et le rêve arctique accessible',
            author: {
              '@type': 'Organization',
              name: 'GoQuébeCAN',
              url: 'https://www.goquebecan.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'GoQuébeCAN',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.goquebecan.com/logo.png',
              },
            },
            datePublished: '2025-10-25',
            dateModified: '2025-10-25',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.goquebecan.com/blog/kuururjuaq',
            },
            image: ['https://www.goquebecan.com/images/destinations/kuururjuaq.avif'],
            description:
              'Découvrez le Nunavik et Kuujjuaq : nature arctique, culture inuite, hôtels coopératifs, itinéraires et carte interactive du Grand Nord.',
            keywords: [
              'Kuujjuaq',
              'Nunavik',
              'Nord du Québec',
              'voyage nordique',
              'GoQuébeCAN',
              'planificateur de voyage Québec',
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristDestination',
            name: 'Kuujjuaq et le Nunavik – Grand Nord du Québec',
            description:
              'Découvrez Kuujjuaq et le Nunavik, destination unique du nord du Québec : culture inuite, hébergements coopératifs, nature arctique et aurores boréales.',
            url: 'https://www.goquebecan.com/blog/kuururjuaq',
            image: ['https://www.goquebecan.com/images/destinations/kuururjuaq.avif'],
            touristType: ['Voyage aventure', 'Famille', 'Culture inuite', 'Expédition arctique'],
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 58.099,
              longitude: -68.418,
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.goquebecan.com/blog/kuururjuaq',
            },
          }),
        }}
      />
    </DestinationArticleTemplate>
  );
}
