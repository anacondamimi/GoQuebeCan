'use client';

import Head from 'next/head';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import {
  ItemListJsonLd,
  ProductSection,
  QuickChips,
  DecisionTable,
  FAQ,
  Checklist2Col,
  ConclusionLinks,
} from '@/components/TravelContentKit';

/** === Constantes SEO communes === */
const PAGE_URL = 'https://www.goquebecan.com/voyage-voiture';
const OG_IMG = 'https://www.goquebecan.com/og/voiture-essentiels-2025-logo.jpg';

const PUBLISHED_AT = '2025-09-14T00:00:00-04:00';
const MODIFIED_AT = '2025-09-14T00:00:00-04:00';

const title = 'Accessoires voiture pour longs trajets — Guide 2025 Québec & Canada';
const description =
  "9 accessoires + l'app ABRP pour des longs trajets sereins : booster batterie, trousse d'urgence, dashcam, chargeur USB‑C + câble long, pare-soleil enfants, sacs vacuum, chargeur de batterie, glacière 12 V, compresseur pneus. Planification VE incluse.";

/** === JSON-LD Article (uniformisé) === */
const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  headline: title,
  description,
  image: [OG_IMG],
  datePublished: PUBLISHED_AT,
  dateModified: MODIFIED_AT,
  inLanguage: 'fr-CA',
  isAccessibleForFree: true,
  author: { '@type': 'Organization', name: 'GoQuébeCan' },
  publisher: {
    '@type': 'Organization',
    name: 'GoQuébeCan',
    logo: { '@type': 'ImageObject', url: 'https://www.goquebecan.com/logo.png' },
  },
};

/** === Liste produits pour JSON-LD ItemList (liens affiliés fournis) === */
const VOITURE_ITEMS = [
  { name: 'Booster / démarreur de batterie (jump starter)', url: 'https://amzn.to/4pnjNct' },
  { name: 'Trousse d’urgence routière + premiers soins', url: 'https://amzn.to/46tpayu' },
  { name: 'Dashcam', url: 'https://amzn.to/41PALq6' },
  { name: 'Chargeur auto USB‑C haut débit + câble long', url: 'https://amzn.to/3HVSHbS' },
  { name: 'Pare-soleil enfants anti‑UV', url: 'https://amzn.to/4mgqGtt' },
  { name: 'Sacs vacuum pour valise', url: 'https://amzn.to/3K2kGaf' },
  { name: 'Chargeur de batterie (mainteneur)', url: 'https://amzn.to/4nxlF0J' },
  { name: 'Glacière électrique 12 V', url: 'https://amzn.to/4mgmoCw' },
  { name: 'Compresseur de pneus portable 12 V', url: 'https://amzn.to/4pBpjbQ' },
];

export default function BlogArticleVoyageVoiture() {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={PAGE_URL} />
        <meta name="description" content={description} />

        {/* Open Graph / Twitter */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content="GoQuébeCan" />
        <meta property="og:image" content={OG_IMG} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fr_CA" />
        <meta property="og:image:alt" content="Indispensables voiture 2025 — GoQuébeCan" />
        <meta property="article:published_time" content={PUBLISHED_AT} />
        <meta property="article:modified_time" content={MODIFIED_AT} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="max-image-preview:large" />

        {/* JSON-LD Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
        />
      </Head>

      <article className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <header className="mb-10 text-center">
          <H1 className="mb-4">{title}</H1>
          <p className="text-lg text-gray-700">
            Sur la route vers la Gaspésie, la Côte‑Nord ou les grands lacs de l’Ontario, chaque
            kilomètre compte — et chaque petit détail change l’atmosphère à bord. Ce guide rassemble
            l’essentiel pour des trajets vraiment sereins : une sécurité qui rassure, une autonomie
            maîtrisée, un confort qui apaise les enfants comme les dos fatigués, et un coffre
            organisé qui évite le chaos des départs. Et si tu roules en véhicule électrique, l’app{' '}
            <strong>ABRP</strong> devient ton copilote intelligent : elle planifie les recharges
            selon ton modèle, la météo et la disponibilité des bornes pour t’arrêter quand c’est
            utile, pas quand tu es stressé. Moins d’imprévus, plus de paysages — cap sur les
            vacances.
          </p>
        </header>

        {/* Raccourcis */}
        <QuickChips
          items={[
            { href: '#jump-starter', label: 'Booster batterie' },
            { href: '#kit-urgence', label: 'Trousse urgence' },
            { href: '#dashcam', label: 'Dashcam' },
            { href: '#chargeur-usbc', label: 'Chargeur USB‑C + câble' },
            { href: '#pare-soleil-enfants', label: 'Pare‑soleil enfants' },
            { href: '#sacs-vacuum', label: 'Sacs vacuum' },
            { href: '#chargeur-batterie', label: 'Chargeur batterie' },
            { href: '#glaciere-12v', label: 'Glacière 12 V' },
            { href: '#compresseur-12v', label: 'Compresseur 12 V' },
            { href: '#abrp', label: 'ABRP (VE)' },
          ]}
        />

        {/* 1. Booster batterie */}
        <ProductSection
          id="jump-starter"
          title="Booster / démarreur de batterie (jump starter)"
          href="https://amzn.to/4pnjNct"
          priceText="≈ 135 $ CAD"
          image={{
            src: '/images/produits/booster-batterie.avif',
            alt: 'Booster de batterie compact pour démarrage d’urgence',
            width: 1200,
            height: 900,
            caption: 'Démarre en autonomie, même au fin fond d’un rang.',
          }}
          description="Batterie lithium compacte avec pinces intelligentes; lampe et port USB souvent intégrés."
          pros="Sécurité, autonomie, USB de secours."
          cons="À recharger après usage; évite l’expo prolongée à la chaleur."
          tips="Teste-le à la maison, glisse-le côté passager pour accès rapide."
          scenario="Après une pause photo, la voiture ne repart pas… booster, et c’est réglé."
        />

        {/* 2. Trousse urgence */}
        <ProductSection
          id="kit-urgence"
          title="Trousse d’urgence routière + premiers soins"
          href="https://amzn.to/46tpayu"
          priceText="≈ 29,99 $ CAD"
          image={{
            src: '/images/produits/kit-urgence.avif',
            alt: 'Trousse d’urgence routière et premiers soins compacte',
            width: 1200,
            height: 900,
            caption: 'Cones, gants, bandes, couverture : le minimum vital.',
          }}
          description="Essentiels sécurité + premiers soins pour attendre l’assistance en sécurité."
          pros="Compact, pensé pour la route."
          cons="Complète avec tes médications perso."
          tips="Range-la sous le siège conducteur pour un accès immédiat."
          scenario="Crevaison au crépuscule : triangle + gilet = visibilité au top."
        />

        {/* 3. Dashcam */}
        <ProductSection
          id="dashcam"
          title="Dashcam"
          href="https://amzn.to/41PALq6"
          priceText="≈ 139 $ CAD"
          image={{
            src: '/images/produits/dashcam.avif',
            alt: 'Dashcam grand angle pour preuve vidéo en cas d’incident',
            width: 1200,
            height: 900,
            caption: 'Un œil qui ne cligne jamais, même stationné.',
          }}
          description="Grand angle, enregistrement boucle, mode parking selon modèle."
          pros="Preuves en cas de litige; dissuasion."
          cons="Carte microSD de qualité U3 recommandée."
          tips="Place-la derrière le rétroviseur, câble discrètement le long du ciel de toit."
          scenario="Freinage brusque devant toi : la vidéo tranche toute discussion."
        />

        {/* 4. Chargeur USB‑C + câble long */}
        <ProductSection
          id="chargeur-usbc"
          title="Chargeur auto USB‑C haut débit + câble long (4‑en‑1)"
          href="https://amzn.to/3HVSHbS"
          priceText="≈ 13,99 $ CAD"
          image={{
            src: '/images/produits/cable-recharge-4in1.avif',
            alt: 'Chargeur voiture USB‑C rapide avec câble multi‑têtes long',
            width: 1200,
            height: 900,
            caption: 'Personne à 2 % de batterie à l’arrière, promis.',
          }}
          description="USB‑C rapide pour plusieurs appareils; câble long multi‑têtes pratique pour l’arrière."
          pros="Rapide, multi‑appareils, prix mini."
          cons="Évite les câbles qui se coincent dans le rail de siège."
          tips="Fixe le câble avec un petit velcro côté appuie‑tête."
          scenario="Waze, Spotify et tablette kids alimentés sans compromis."
        />

        {/* 5. Pare‑soleil enfants */}
        <ProductSection
          id="pare-soleil-enfants"
          title="Pare‑soleil enfants (anti‑UV)"
          href="https://amzn.to/4mgqGtt"
          priceText="≈ 15,98 $ CAD"
          image={{
            src: '/images/produits/pare-soleil.avif',
            alt: 'Pare‑soleil/rideaux pour vitres arrière, protection UV',
            width: 1200,
            height: 900,
            caption: 'Moins d’éblouissement, sieste plus facile.',
          }}
          description="Montage instantané (électrostatique/chaussette/aimants selon modèle)."
          pros="Protection UV, habitacle plus frais."
          cons="Vérifie la remontée de vitre avec les modèles “chaussette”."
          tips="Combine avec masque de nuit enfant pour la sieste plein sud."
          scenario="Entre Trois‑Rivières et Québec, dodo 90 min = parents zen."
        />

        {/* 6. Sacs vacuum */}
        <ProductSection
          id="sacs-vacuum"
          title="Sacs vacuum pour la valise"
          href="https://amzn.to/3K2kGaf"
          priceText="≈ 29 $ CAD"
          image={{
            src: '/images/produits/sac-vacuum.avif',
            alt: 'Sacs de compression sous vide pour vêtements et linge',
            width: 1200,
            height: 900,
            caption: 'Gain de place pour manteaux et doudous.',
          }}
          description="Compression sans aspirateur (rouler) ou avec; idéale pour familles."
          pros="Valises rangées, coffre optimisé."
          cons="Ne pas compresser objets fragiles/rigides."
          tips="Garde 1–2 sacs libres pour le linge sale au retour."
          scenario="Tout rentre dans le coffre malgré la glacière et les trottinettes."
        />

        {/* 7. Chargeur de batterie */}
        <ProductSection
          id="chargeur-batterie"
          title="Chargeur de batterie (mainteneur)"
          href="https://amzn.to/4nxlF0J"
          priceText="≈ 22 $ CAD"
          image={{
            src: '/images/produits/chargeur-batterie-deux.avif',
            alt: 'Chargeur/mainteneur de batterie 12 V pour entretien',
            width: 1200,
            height: 900,
            caption: 'La batterie te dit merci après l’hiver.',
          }}
          description="Maintien et recharge douce 12 V; utile si la voiture dort longtemps."
          pros="Prolonge la vie de la batterie."
          cons="À brancher sur secteur; non pour recharger en roulant."
          tips="Parfait au garage entre deux road‑trips."
          scenario="Après 3 semaines sans rouler, démarrage au quart de tour."
        />

        {/* 8. Glacière 12 V */}
        <ProductSection
          id="glaciere-12v"
          title="Glacière électrique 12 V (thermoélectrique)"
          href="https://amzn.to/4mgmoCw"
          priceText="≈ 129 $ CAD"
          image={{
            src: '/images/produits/glaciere.avif',
            alt: 'Glacière 12 V compacte pour boissons et collations fraîches',
            width: 1200,
            height: 900,
            caption: 'Moins d’arrêts = arrivée plus tôt à la plage.',
          }}
          description="Garde l’eau et les collations au frais; parfois un mode chaud."
          pros="Poignée, volume pratique, branchement allume‑cigare."
          cons="Refroidit ~15–20 °C sous l’ambiant (pas un frigo)."
          tips="Préréfrigère les boissons + ajoute 2 packs froid."
          scenario="Pique‑nique au phare de Cap‑Gaspé : tout est encore frais."
        />

        {/* 9. Compresseur 12 V */}
        <ProductSection
          id="compresseur-12v"
          title="Compresseur de pneus portable 12 V"
          href="https://amzn.to/4pBpjbQ"
          priceText="≈ 42 $ CAD"
          image={{
            src: '/images/produits/gonfleur.avif',
            alt: 'Compresseur 12 V avec manomètre pour voiture/vélo',
            width: 1200,
            height: 900,
            caption: 'Bonne pression = sécurité, confort, conso et autonomie.',
          }}
          description="Gonflage rapide, arrêt automatique à la pression cible."
          pros="Buses voiture/vélo/ballons; manomètre lisible."
          cons="Vérifie la longueur de câble pour les roues arrière."
          tips="Mesure à froid le matin (écart 3–4 PSI en été)."
          scenario="Route 132 : à 36 PSI, tenue de route et conso optimisées."
        />

        {/* ABRP */}
        <section id="abrp" className="mb-12">
          <H2 className="mb-3 text-3xl font-semibold text-gray-900">
            Planifie tes recharges avec ABRP
          </H2>

          <p className="mb-3 text-gray-700">
            <strong>A Better Routeplanner (ABRP)</strong> est le planificateur de référence pour les
            véhicules électriques. Tu sélectionnes ton modèle, indiques ton niveau de batterie
            (SoC), ta vitesse et tes préférences de bornes, puis l'app calcule des arrêts optimaux
            en tenant compte de la météo, du relief et du trafic.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://apps.apple.com/ca/app/a-better-routeplanner-abrp/id1490860521"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm text-white"
              aria-label="Télécharger ABRP sur l'App Store"
            >
               App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.iternio.abrpapp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg px-4 py-2 text-sm"
              aria-label="Télécharger ABRP sur Google Play"
            >
              Google Play
            </a>
            <a
              href="https://abetterrouteplanner.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border px-4 py-2 text-sm"
              aria-label="Ouvrir ABRP sur le web"
            >
              Version web
            </a>
          </div>

          <H3 className="mt-6 text-xl font-semibold">Comment l'utiliser (3 min)</H3>
          <ol className="ml-6 list-decimal space-y-1 text-gray-700">
            <li>
              Crée un véhicule et choisis ton modèle exact (ex. <em>Hyundai Ioniq 6</em>).
            </li>
            <li>
              Renseigne le <strong>SoC</strong> de départ (ex. 90%) et le SoC d'arrivée visé (ex.
              10–20%).
            </li>
            <li>
              Indique ta <strong>vitesse</strong> (ex. 115 km/h sur autoroute) et ton chargement.
            </li>
            <li>
              Sélectionne les <strong>réseaux de bornes</strong> préférés et la puissance minimale
              souhaitée (ex. ≥150 kW).
            </li>
            <li>
              Appuie sur <em>Planifier</em> et ajoute une <strong>marge de sécurité</strong> (+5% si
              vent/pluie/températures fraîches).
            </li>
            <li>
              (Optionnel) Active le <em>Live SoC</em> via OBD/Bluetooth pour des prédictions en
              temps réel.
            </li>
          </ol>

          <H3 className="mt-6 text-xl font-semibold">Pourquoi bien programmer son voyage ?</H3>
          <ul className="ml-6 list-disc space-y-1 text-gray-700">
            <li>Moins de stress : bornes fiables, marges claires, pauses au bon moment.</li>
            <li>Temps optimisé : viser 10–80% permet des recharges rapides et efficaces.</li>
            <li>Autonomie maîtrisée : l'app ajuste selon météo, vent, dénivelé et circulation.</li>
            <li>Souplesse : verrouille des étapes (repas, points de vue) et recalcul en un tap.</li>
          </ul>

          <figure className="mt-6 rounded-lg border bg-gray-50 p-4">
            <p className="italic text-gray-800">
              "Au printemps/été, à 115 km/h sur autoroute, je constate environ 1% de batterie par 5
              km parcourus avec ma Hyundai Ioniq 6. Sur plusieurs trajets, ABRP s'est montré fiable
              à ±1% sur l'estimation d'arrivée."
            </p>
            <figcaption className="mt-2 text-sm text-gray-600">
              — Mathieu, utilisateur fréquent d'ABRP (retour d'expérience)
            </figcaption>
          </figure>

          <p className="mt-4 text-sm text-gray-600">
            Note : la consommation varie selon le vent, la pluie, la température, le relief et le
            chargement. Garde une marge adaptée aux conditions du jour.
          </p>
        </section>

        {/* Tableau décisionnel (mis à jour) */}
        <DecisionTable
          rows={[
            {
              profil: 'Famille avec enfants',
              criteres: 'Sieste • Batteries toujours pleines',
              reco: (
                <>
                  <a href="#pare-soleil-enfants" className="text-blue-600 underline">
                    pare‑soleil
                  </a>{' '}
                  +{' '}
                  <a href="#chargeur-usbc" className="text-blue-600 underline">
                    chargeur USB‑C + câble long
                  </a>
                </>
              ),
            },
            {
              profil: 'Prévention galères',
              criteres: 'Panne • Sécurité • Preuve',
              reco: (
                <>
                  <a href="#jump-starter" className="text-blue-600 underline">
                    booster
                  </a>{' '}
                  +{' '}
                  <a href="#kit-urgence" className="text-blue-600 underline">
                    trousse d’urgence
                  </a>{' '}
                  +{' '}
                  <a href="#dashcam" className="text-blue-600 underline">
                    dashcam
                  </a>
                </>
              ),
            },
            {
              profil: 'Optimisation coffre',
              criteres: 'Volume • Organisation',
              reco: (
                <a href="#sacs-vacuum" className="text-blue-600 underline">
                  sacs vacuum
                </a>
              ),
            },
            {
              profil: 'Long trajet estival',
              criteres: 'Hydratation • Fraîcheur',
              reco: (
                <a href="#glaciere-12v" className="text-blue-600 underline">
                  glacière 12V
                </a>
              ),
            },
            {
              profil: 'Conduite éco / sécurité',
              criteres: 'Pression pneus',
              reco: (
                <a href="#compresseur-12v" className="text-blue-600 underline">
                  compresseur 12V
                </a>
              ),
            },
            {
              profil: 'Véhicule électrique',
              criteres: 'Planification • Sérénité',
              reco: (
                <a href="#abrp" className="text-blue-600 underline">
                  ABRP
                </a>
              ),
            },
          ]}
        />

        {/* Conseils & Checklist */}
        <section className="mb-10">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">🛠️ Conseils d’utilisation</H2>
          <ul className="ml-6 list-disc space-y-2 text-gray-700">
            <li>
              Active les cartes hors‑ligne (Google Maps) et télécharge playlists/films avant le
              départ.
            </li>
            <li>
              Pause <strong>toutes les 2h</strong> : belvédère, plage, parc… le moral reste au beau
              fixe.
            </li>
            <li>Range câbles courts à l’avant, longs à l’arrière (velcro = zéro nœud).</li>
            <li>VE : pars à 90–100% si 1re borne loin; vise 10–80% pour gagner du temps.</li>
          </ul>
        </section>

        <Checklist2Col
          title="📋 Checklist voiture (avant départ)"
          left={[
            'Permis, immatriculation, assurance',
            'Téléphone + câbles (USB‑C/Lightning)',
            'Eau + collations',
            'Jeux/activités enfants (kits surprise)',
            'Trousse 1ers soins + médicaments',
          ]}
          right={[
            'Couvertures légères / coussins',
            'Lingettes, sacs poubelle, mouchoirs',
            'Pression pneus OK ',
            'ABRP installé + cartes bornes',
            'Argent pour péages / stationnements',
          ]}
        />

        {/* FAQ */}
        <FAQ
          items={[
            {
              q: 'Booster ou câbles de démarrage ?',
              a: (
                <>
                  Le booster est autonome et évite de dépendre d’un autre véhicule — plus sûr au
                  bord de la route.
                </>
              ),
            },
            {
              q: 'Les glacières 12 V refroidissent comme un frigo ?',
              a: (
                <>
                  Non, compte ~15–20°C sous l’ambiant. Préréfrigère le contenu pour de meilleurs
                  résultats.
                </>
              ),
            },
            {
              q: 'Comment garder un habitacle calme avec des enfants ?',
              a: (
                <>
                  Écrans à hauteur des yeux, collations légères, sieste aidée par le pare‑soleil, et
                  pauses régulières.
                </>
              ),
            },
          ]}
        />

        {/* Maillage interne */}
        <ConclusionLinks
          items={[
            { href: '/blog/voyage-camping', label: 'Guide camping 2025' },
            { href: '/blog/voyage-hotel', label: 'Indispensables hôtel 2025' },
            { href: '/blog/voyage-avion', label: 'Indispensables avion 2025' },
          ]}
        />

        {/* JSON-LD liste des produits */}
        <ItemListJsonLd
          items={[
            { name: 'Booster / démarreur de batterie', url: PAGE_URL + '#jump-starter' },
            { name: 'Trousse d’urgence routière + premiers soins', url: PAGE_URL + '#kit-urgence' },
            { name: 'Dashcam', url: PAGE_URL + '#dashcam' },
            { name: 'Chargeur auto USB‑C + câble long', url: PAGE_URL + '#chargeur-usbc' },
            { name: 'Pare‑soleil enfants', url: PAGE_URL + '#pare-soleil-enfants' },
            { name: 'Sacs vacuum pour valise', url: PAGE_URL + '#sacs-vacuum' },
            { name: 'Chargeur de batterie (mainteneur)', url: PAGE_URL + '#chargeur-batterie' },
            { name: 'Glacière électrique 12 V', url: PAGE_URL + '#glaciere-12v' },
            { name: 'Compresseur de pneus portable 12 V', url: PAGE_URL + '#compresseur-12v' },
          ]}
        />
        <ItemListJsonLd items={VOITURE_ITEMS} />
      </article>
    </>
  );
}
