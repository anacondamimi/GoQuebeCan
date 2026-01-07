'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import BrandName from '@/components/brand/BrandName';
import React, { Suspense, useEffect, useState } from 'react';

// ✅ Composant wrapper pour déclencher le chargement seulement quand visible
export function NunavikMapLoader() {
  // ✅ Lazy load avec Suspense + IntersectionObserver
  const NunavikMap = dynamic(() => import('@/components/NunavikMap'), {
    ssr: false,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // stoppe l’observation une fois visible
        }
      },
      { threshold: 0.2 }, // déclenche quand 20% du bloc est visible
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
    <article className="prose prose-lg prose-slate max-w-none prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-strong:text-slate-900 prose-li:marker:text-slate-500 prose-img:rounded-xl">
      {/* ✅ Titre principal */}
      <H1>
        Vacances dans le Grand Nord québécois : Kuujjuaq, Nunavik et le rêve arctique accessible
      </H1>

      <p>
        Le Nord du Québec, c’est un autre monde. Pas juste « un peu plus haut que le Saguenay »,
        mais un territoire immense où la route s’arrête, où la culture inuite est bien vivante, où
        le ciel prend toute la place. Quand on dit
        <strong> Kuujjuaq</strong>, <strong>Nunavik</strong>, <strong>toundra</strong>,{' '}
        <strong>aurores boréales</strong>… on parle d’endroits où l’on ressent quelque chose de très
        simple et très puissant : le calme.
      </p>

      <p>
        Si vous cherchez un voyage qui sort complètement du cadre classique « Québec – Charlevoix –
        Gaspésie », alors bienvenue. Ici, on part loin, mais pas n’importe comment : on part
        intelligemment, on planifie, et on respecte les lieux.
      </p>

      <p>Dans cet article, on va voir :</p>

      <ul>
        <li>Pourquoi le Nunavik et Kuujjuaq sont des destinations incroyables ;</li>
        <li>Où dormir (avec des adresses concrètes) ;</li>
        <li>Comment organiser le trajet ;</li>
        <li>Quoi faire sur place ;</li>
        <li>
          Et comment tout préparer sans stress grâce à notre outil{' '}
          <Link href="/planificateur" className="font-semibold text-indigo-600 hover:underline">
            /planificateur
          </Link>{' '}
          et à notre guide{' '}
          <Link
            href="/blog/voyage-voiture"
            className="font-semibold text-indigo-600 hover:underline"
          >
            /blog/voyage-voiture
          </Link>
          .
        </li>
      </ul>

      <p>
        Notre but est simple : que vous soyez déjà en train d’imaginer
        <em> « OK, on le fait. On part. »</em>
      </p>

      {/* === Section Pourquoi aller === */}
      <H2>Pourquoi aller jusqu’au Nunavik (et à Kuujjuaq)</H2>

      <p>
        Le <strong>Nunavik</strong> couvre tout le nord du Québec, au-delà du 55e parallèle. C’est
        grandiose : immensité arctique, rivières larges comme des lacs, silence, neige qui craque
        l’hiver, lumière quasi permanente l’été. On ne parle pas ici d’une « belle région
        touristique ». On parle d’un
        <strong> choc émotionnel</strong>.
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

      {/* === Section trajet === */}
      <H2>Comment s’y rendre (et ce que personne ne vous dit)</H2>

      <p>
        L’accès au Nunavik se fait principalement par avion, mais un voyage « route + nord » reste
        possible. Beaucoup de familles font un road trip vers la Côte-Nord, Tadoussac, le
        Bas-Saint-Laurent, puis prennent un vol régional vers Kuujjuaq. C’est une manière plus douce
        d’arriver dans le Nord.
      </p>

      <p>Pour que le trajet reste agréable, découvrez :</p>

      <ul>
        <li>
          Notre guide spécial longues distances{' '}
          <Link
            href="/blog/voyage-voiture"
            className="font-semibold text-indigo-600 hover:underline"
          >
            /blog/voyage-voiture
          </Link>{' '}
          (pauses, repas, musique, astuces enfants).
        </li>
        <li>
          Notre outil de planification{' '}
          <Link href="/planificateur" className="font-semibold text-indigo-600 hover:underline">
            /planificateur
          </Link>{' '}
          pour équilibrer vos étapes et vos nuitées.
        </li>
      </ul>

      {/* === Section hébergements === */}
      <H2>Où dormir dans le Nord du Québec</H2>

      <H3>Kuujjuaq Inn – Kuujjuaq, Nunavik</H3>
      <p>
        Le <strong>Kuujjuaq Inn</strong> est l’adresse incontournable à Kuujjuaq : chambres
        confortables, <strong>restaurant sur place</strong>, navette aéroport, Wi-Fi. Un vrai point
        d’ancrage humain dans le Nunavik.
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

      {/* === Section expériences === */}
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

      {/* === Module carte (UX + SEO) === */}
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

        {/* carte responsive, lazy-loadée */}
        <div className="mt-4">
          <NunavikMapLoader />
        </div>

        {/* bloc texte SEO sous la carte */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
          <p className="mb-2">
            Le Nunavik est une région nordique du Québec composée de 14 villages inuits, accessible
            principalement par avion. Kuujjuaq est la porte d’entrée principale du territoire, mais
            chaque communauté a sa culture, ses paysages et ses réalités logistiques (hébergement,
            approvisionnement, transport). Cette carte interactive aide les familles, randonneurs,
            passionnés d’espace nordique et photographes d’aurores boréales à comprendre le terrain
            avant le départ.
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

      {/* === FAQ === */}
      <H2>Conseils pratiques &amp; questions fréquentes</H2>

      <H3>Quelle est la meilleure période pour visiter ?</H3>
      <p>
        L’été (juin à septembre) est plus doux, parfait pour explorer. L’hiver (décembre à mars)
        offre les aurores boréales et la magie de la neige.
      </p>

      <H3>Peut-on venir avec des enfants ?</H3>
      <p>
        Oui. Ce n’est pas un voyage « tout inclus », mais une expérience qui les marquera : grands
        espaces, animaux, rencontres. Prévoyez du confort le soir.
      </p>

      <H3>Y a-t-il des bornes pour véhicules électriques ?</H3>
      <p>
        Dans le Nord, elles sont rares. Planifiez vos arrêts avec notre guide{' '}
        <Link href="/blog/voyage-voiture" className="font-semibold text-indigo-600 hover:underline">
          /blog/voyage-voiture
        </Link>
        .
      </p>

      <H3>Faut-il réserver à l’avance ?</H3>
      <p>
        Oui, impérativement. Les hébergements sont peu nombreux : réservez dès que vos dates de vol
        ou de route sont fixées.
      </p>

      {/* === Conclusion === */}
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
      {/* === Données structurées SEO (JSON-LD) === */}
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
              url: 'https://goquebecan.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'GoQuébeCAN',
              logo: {
                '@type': 'ImageObject',
                url: 'https://goquebecan.com/images/logo.png',
              },
            },
            datePublished: '2025-10-25',
            dateModified: '2025-10-25',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://goquebecan.com/blog/kuururjuaq',
            },
            image: ['https://goquebecan.com/images/blog/kuururjuaq-nunavik.avif'],
            description:
              'Découvrez le Nunavik et Kuujjuaq : nature arctique, culture inuite, hôtels coopératifs, itinéraires et carte interactive du Grand Nord. Planifiez votre voyage vers le Nord du Québec avec GoQuébeCAN.',
            keywords: [
              'Kuujjuaq',
              'Nunavik',
              'Nord du Québec',
              'voyage nordique',
              'GoQuébeCAN',
              'planificateur de voyage Québec',
            ],
            hasPart: [
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Quelle est la meilleure période pour visiter le Nunavik ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'L’été (juin à septembre) est plus doux, l’hiver (décembre à mars) offre les aurores boréales et la magie du Nord.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Peut-on venir avec des enfants ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Oui. Ce n’est pas un voyage tout inclus, mais une expérience qui marque les enfants grâce aux grands espaces et à la culture locale.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Y a-t-il des bornes de recharge électrique ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Elles sont rares dans le Nord. Planifiez vos arrêts avec le guide GoQuébeCAN pour les longs trajets.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: 'Faut-il réserver les hébergements à l’avance ?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: 'Oui, les hébergements du Nunavik sont peu nombreux et doivent être réservés plusieurs semaines à l’avance.',
                    },
                  },
                ],
              },
            ],
          }),
        }}
      />
      {/* === Données structurées des lieux (LocalBusiness / Place) === */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'Hotel',
              name: 'Kuujjuaq Inn',
              image:
                'https://www.kuujjuaqinn.com/wp-content/uploads/2020/08/kuujjuaqinn-front-entrance.jpg',
              url: 'https://www.kuujjuaqinn.com/',
              telephone: '+1-819-964-2960',
              priceRange: '$$$',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '245 Avenue Allen',
                addressLocality: 'Kuujjuaq',
                addressRegion: 'Québec',
                postalCode: 'J0M 1C0',
                addressCountry: 'CA',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 58.099,
                longitude: -68.418,
              },
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Navette aéroport', value: true },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Restaurant sur place',
                  value: true,
                },
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.3',
                reviewCount: '120',
              },
              description:
                'Hôtel Kuujjuaq Inn : hébergement confortable, restaurant et navette aéroport pour les voyageurs du Grand Nord québécois.',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Hotel',
              name: 'Hôtels coopératifs du Nunavik',
              image:
                'https://nunavikhotels.ca/wp-content/uploads/2020/09/nunavik-hotels-network.jpg',
              url: 'https://nunavikhotels.ca/fr/',
              priceRange: '$$',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Nunavik',
                addressRegion: 'Québec',
                addressCountry: 'CA',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 59.55,
                longitude: -68.52,
              },
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'Restaurant', value: true },
                {
                  '@type': 'LocationFeatureSpecification',
                  name: 'Accueil coopératif',
                  value: true,
                },
              ],
              description:
                'Réseau d’hôtels gérés par la Fédération des coopératives du Nouveau-Québec : hébergements authentiques dans 14 communautés nordiques.',
            },
          ]),
        }}
      />
      {/* === Données structurées Destination Touristique (SEO 2025) === */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TouristDestination',
            name: 'Kuujjuaq et le Nunavik – Grand Nord du Québec',
            description:
              'Découvrez Kuujjuaq et le Nunavik, destination unique du nord du Québec : culture inuite, hébergements coopératifs, nature arctique et aurores boréales. Planifiez votre itinéraire avec GoQuébeCAN.',
            url: 'https://goquebecan.com/blog/kuururjuaq',
            image: [
              'https://goquebecan.com/images/blog/kuururjuaq-nunavik.avif',
              'https://www.kuujjuaqinn.com/wp-content/uploads/2020/08/kuujjuaqinn-front-entrance.jpg',
              'https://nunavikhotels.ca/wp-content/uploads/2020/09/nunavik-hotels-network.jpg',
            ],
            touristType: ['Voyage aventure', 'Famille', 'Culture inuite', 'Expédition arctique'],
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 58.099,
              longitude: -68.418,
            },
            hasPart: [
              {
                '@type': 'TouristAttraction',
                name: 'Kuujjuaq Inn',
                url: 'https://www.kuujjuaqinn.com/',
                description: 'Hôtel accueillant et restaurant dans le Grand Nord québécois.',
                image:
                  'https://www.kuujjuaqinn.com/wp-content/uploads/2020/08/kuujjuaqinn-front-entrance.jpg',
              },
              {
                '@type': 'TouristAttraction',
                name: 'Hôtels coopératifs du Nunavik',
                url: 'https://nunavikhotels.ca/fr/',
                description: 'Réseau d’hôtels coopératifs dans 14 communautés du Nunavik.',
                image:
                  'https://nunavikhotels.ca/wp-content/uploads/2020/09/nunavik-hotels-network.jpg',
              },
              {
                '@type': 'TouristInformationCenter',
                name: 'GoQuébeCAN Planificateur de voyage',
                url: 'https://goquebecan.com/planificateur',
                description:
                  'Outil de planification d’itinéraire intelligent pour découvrir le Québec et le Nunavik.',
              },
            ],
            containedInPlace: {
              '@type': 'AdministrativeArea',
              name: 'Nunavik, Québec, Canada',
            },
            additionalProperty: [
              {
                '@type': 'PropertyValue',
                name: 'Langue parlée',
                value: 'Français, Anglais, Inuktitut',
              },
              {
                '@type': 'PropertyValue',
                name: 'Saisons recommandées',
                value: 'Été pour la lumière, hiver pour les aurores boréales',
              },
            ],
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://goquebecan.com/blog/kuururjuaq',
            },
            sameAs: [
              'https://nunavikhotels.ca/',
              'https://www.kuujjuaqinn.com/',
              'https://www.quebecoriginal.com/',
              'https://maps.google.com/?q=Kuujjuaq',
            ],
          }),
        }}
      />

      {/* === Données structurées : Carte interactive === */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Map',
            name: 'Carte interactive du Nunavik',
            description:
              'Carte des communautés du Nunavik (Kuujjuaq, Kangiqsualujjuaq, etc.) pour aider les voyageurs à planifier un itinéraire dans le nord du Québec.',
            hasMap: 'https://goquebecan.com/blog/kuururjuaq',
            creator: {
              '@type': 'Organization',
              name: 'GoQuébeCAN',
              url: 'https://goquebecan.com',
            },
          }),
        }}
      />
    </article>
  );
}
