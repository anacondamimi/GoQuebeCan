'use client';
import React from 'react';
import Head from 'next/head';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

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
const PAGE_URL = 'https://goquebecan.com/voyage/avion';
const OG_IMG = 'https://goquebecan.com/og/avion-essentiels-2025-logo.jpg';

const title = 'Accessoires indispensables avion 2025 (Québec & Canada)';
const description =
  '8 accessoires plébiscités en 2025 pour voyager en avion sans stress : tracker bagage, pèse-bagage, adaptateur USB-C GaN, sac cabine, oreiller cervical, casque antibruit, support 360°, cubes compressibles.';

/** === JSON-LD Article (uniformisé) === */
const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  headline: title,
  description,
  image: [OG_IMG],
  datePublished: '2025-02-10',
  dateModified: '2025-09-11',
  inLanguage: 'fr-CA',
  isAccessibleForFree: true,
  author: { '@type': 'Organization', name: 'GoQuébeCan' },
  publisher: {
    '@type': 'Organization',
    name: 'GoQuébeCan',
    logo: { '@type': 'ImageObject', url: 'https://goquebecan.com/logo.png' }, // ← remplace par ton logo public
  },
};

/** === Liste produits pour JSON-LD ItemList (avec tes liens affiliés) === */
const AVION_ITEMS = [
  { name: 'Tracker bagage (AirTag/Tile)', url: 'https://amzn.to/3JZRdOf' },
  { name: 'Pèse-bagage numérique', url: 'https://amzn.to/48jcjkC' },
  { name: 'Adaptateur + charge GaN (USB-C)', url: 'https://amzn.to/4npWqxg' },
  { name: 'Sac à dos cabine (format avion)', url: 'https://amzn.to/48eeO7S' },
  { name: 'Oreiller cervical (style TRTL)', url: 'https://amzn.to/46j2wbM' },
  { name: 'Casque à réduction de bruit (ANC)', url: 'https://amzn.to/46yjuUT' },
  { name: 'Support téléphone 360° pour avion', url: 'https://amzn.to/4niNxWR' },
  { name: 'Cubes de rangement compressibles', url: 'https://amzn.to/3IiAQMg' },
];

export default function BlogArticleVoyageAvion() {
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
        <meta property="article:published_time" content="2025-02-10T00:00:00-05:00" />
        <meta property="article:modified_time" content="2025-09-11T00:00:00-04:00" />
        <meta property="og:image:alt" content="Indispensables Avion 2025 — GoQuébeCan" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="max-image-preview:large" />

        {/* JSON-LD Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
        />
      </Head>

      <article className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-12 text-center">
          <H1 className="mb-4">Indispensables pour Voyager en Avion en 2025</H1>
          <p className="text-xl leading-relaxed text-gray-700">
            Cap sur des vols sereins : on élimine le stress bagage, on dort mieux, on reste connecté
            — et on profite de chaque escale.
          </p>
          <p className="mt-3 text-xs text-gray-500">
            Transparence : certains liens sont affiliés (ex. Amazon). Ça ne change pas le prix.
          </p>
        </header>

        <section className="mb-12">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">Pourquoi ce kit “avion” ?</H2>
          <p className="text-gray-700">
            Les compagnies et aéroports varient, mais tes besoins restent les mêmes : éviter les
            frais surprises, dormir malgré le bruit, garder l’énergie et passer la sécurité en 30
            secondes. Ces 8 essentiels couvrent 95 % des galères en vol.
          </p>
        </section>

        {/* Raccourcis */}
        <div className="mb-8">
          <QuickChips
            items={[
              { href: '#tracker-bagage', label: 'Tracker bagage' },
              { href: '#pese-bagage', label: 'Pèse-bagage' },
              { href: '#adaptateur-recharge', label: 'Adaptateur-Recharge' },
              { href: '#sac-dos-cabine-usb', label: 'Sac à dos cabine USB' },
              { href: '#oreiller-cervical', label: 'Oreiller cervical' },
              { href: '#casque-anc', label: 'Casque ANC' },
              { href: '#support-telephone-avion', label: 'Support-telephone-avion' },
              { href: '#cubes-compressibles', label: 'Cubes compressibles' },
            ]}
          />
        </div>

        {/* 8 FICHES PRODUIT — standardisées */}
        <ProductSection
          id="tracker-bagage"
          title="4 Tracker bagage (AirTag/Tile)"
          href="https://amzn.to/3JZRdOf"
          priceText="~49.99 CAD"
          image={{
            src: '/images/produits/tag.avif',
            alt: 'Tracker bagage type AirTag/Tile — localiser sa valise en temps réel',
            width: 1200,
            height: 900,
            caption: 'Tu sais où est ta valise — même en correspondance.',
          }}
          description="Localisation en temps réel de tes bagages enregistrés et de tes objets (passeport, sac photo)."
          pros="Tranquillité; aide au service bagages; pile bouton durable."
          cons="Fonctionne mieux dans l’écosystème compatible (iOS/Android selon modèle)."
          tips="Glisse-le à l’intérieur de la valise et ajoute un tag externe avec ton courriel."
          scenario="Correspondance serrée : tu vois que ta valise te suit — stress coupé net."
        />

        <ProductSection
          id="pese-bagage"
          title="Pèse-bagage numérique"
          href="https://amzn.to/48jcjkC"
          priceText="~16.99 CAD"
          image={{
            src: '/images/produits/balance-bagages.avif',
            alt: 'Pèse-bagage numérique — éviter les frais de surpoids',
            width: 1200,
            height: 900,
            caption: 'Deux minutes qui évitent 100 $ de frais.',
          }}
          description="Contrôle ton poids cabine/soute avant l’aéroport et évite les frais de dernière minute."
          pros="Précis, compact, accroche rapide."
          cons="Piles à surveiller; lecture difficile en pleine nuit."
          tips="Pèse avec les cubes déjà dans la valise pour un poids réaliste."
          scenario="Retour de voyage : tu redistribues 2 kg dans le bagage cabine et tu passes sans frais."
        />

        <ProductSection
          id="adaptateur-recharge"
          title="Adaptateur universel VYLEE (multi-ports USB/USB-C)"
          href="https://amzn.to/4npWqxg"
          priceText="~42.49 CAD"
          image={{
            src: '/images/produits/adaptateur-chargeur-65w.avif',
            alt: "Adaptateur universel VYLEE — ports multiples pour recharger à l'hôtel et à l'étranger",
            width: 1200,
            height: 900,
            caption: 'Recharge partout sans stress (multi-pays, multi-ports).',
          }}
          description="Compatibilité mondiale et puissance suffisante pour tel + tablette + laptop."
          pros="Multi-ports, compact, 100–240 V."
          cons="Peut occuper deux prises si bloc large."
          tips="Ajoute un câble 2 m pour atteindre les prises éloignées des lits."
          scenario="Escale : tu recharges laptop + tel en même temps, tout est prêt pour l’embarquement."
        />

        <ProductSection
          id="sac-dos-cabine-usb"
          title='Sac à dos cabine avion 15,6" avec port USB (Weekender)'
          href="https://amzn.to/48eeO7S"
          priceText="~47.99 CAD"
          image={{
            src: '/images/produits/sac-dos-avion.avif', // mets ton asset local
            alt: 'Sac à dos cabine avion 15,6 pouces avec port USB — compartiments organisés, sangle valise, format weekender',
            width: 1200,
            height: 900,
            caption: 'Bagage personnel organisé, accès rapide et port USB passe-câble.',
          }}
          description="Format cabine (bagage personnel), compartiment 15,6'', poches organisées et port USB passe-câble pour recharger en déplacement."
          pros="Organisation, sangle pour valise, port USB, compatible cabine."
          cons="Le port USB nécessite une batterie externe (non incluse)."
          tips="Place ton chargeur/power bank à l’intérieur et passe le câble au port USB — charge confortable en file d’embarquement."
          scenario="Long transit : papiers accessibles, laptop protégé, tel branché via le port USB — tu voyages fluide."
        />

        <ProductSection
          id="oreiller-cervical"
          title="Oreiller cervical (style TRTL)"
          href="https://amzn.to/46j2wbM"
          priceText="~74.99 CAD"
          image={{
            src: '/images/produits/cousin-cou.avif',
            alt: 'Oreiller cervical de voyage style TRTL — soutien latéral pour dormir en avion',
            width: 1200,
            height: 900,
            caption: 'Tu dors sans nuque cassée, même en siège du milieu.',
          }}
          description="Soutien latéral discret pour dormir assis; se range facilement dans un sac."
          pros="Maintien réel, format compact."
          cons="Moins “moelleux” qu’un coussin gonflable classique."
          tips="Teste l’orientation (gauche/droite) avant le vol."
          scenario="Vol de nuit : 3 cycles de sommeil, arrivée plus fraîche."
        />

        <ProductSection
          id="casque-anc"
          title="Casque à réduction de bruit (ANC)"
          href="https://amzn.to/46yjuUT"
          priceText="~148 CAD"
          image={{
            src: '/images/produits/casque-bruit-sony.avif',
            alt: 'Casque à réduction de bruit active — annuler le bruit des moteurs en avion',
            width: 1200,
            height: 900,
            caption: 'Le calme… même en rangée près des réacteurs.',
          }}
          description="Annule le bruit de fond des moteurs; podcasts, films et dodo sans monter le volume."
          pros="Confort + concentration + sommeil."
          cons="Prix; penser à le recharger."
          tips="Mode transparence lors des annonces de sécurité."
          scenario="Film + sieste sans fatigue auditive — arrivée zen."
        />

        <ProductSection
          id="support-telephone-avion"
          title="Support téléphone 360° pour avion (clip sur tablette)"
          href="https://amzn.to/4niNxWR"
          priceText="~13.99 CAD"
          image={{
            src: '/images/produits/support-telephone-avion.avif', // mets ton asset local
            alt: 'Support de téléphone mains libres pour avion — rotation 360°, clip sur tablette de siège',
            width: 1200,
            height: 900,
            caption: 'Regarde films/séries sans tenir ton téléphone.',
          }}
          description="Se clipse sur la tablette de siège et pivote à 360° pour un visionnage confortable sans fatiguer le poignet."
          pros="Mains libres, angle réglable, compact."
          cons="Selon l’avion, la tablette peut être épaisse : serre bien le clip."
          tips="Place-le côté couloir au décollage/atterrissage si demandé par l’équipage."
          scenario="Vol de 6 h : tu binges sereinement ta série, téléphone bien stable devant toi."
        />

        <ProductSection
          id="cubes-compressibles"
          title="Cubes de rangement compressibles"
          href="https://amzn.to/3IiAQMg"
          priceText="~35.99 CAD"
          image={{
            src: '/images/produits/cube-compression.avif',
            alt: 'Cubes compressibles pour valise cabine — organisation et gain de place',
            width: 1200,
            height: 900,
            caption: 'Valise nette, zéro chaos à l’hôtel.',
          }}
          description="Organise par tenue/jour; la valise ferme mieux et le repassage diminue."
          pros="Organisation visuelle; gain de place."
          cons="Ajoute un peu de poids si tu en mets beaucoup."
          tips="Un cube “linge sale” pour un retour propre et rapide."
          scenario="Transit d’hôtels : tu ouvres/fermes en 3 minutes."
        />

        {/* Guide d'achat */}
        <section id="guide-achat" className="mb-12 mt-4">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">🛒 Guide d'achat</H2>

          <div className="mb-4">
            <QuickChips
              items={[
                { href: '#pese-bagage', label: 'Éviter le surpoids' },
                { href: '#trousse-100ml', label: 'Passer la sécurité' },
                { href: '#powerbank-20000', label: 'Énergie en cabine' },
                { href: '#casque-anc', label: 'Dormir/filmer' },
              ]}
            />
          </div>

          <DecisionTable
            rows={[
              {
                profil: 'Cabine stricte',
                criteres: 'Poids • Volume',
                reco: (
                  <a href="#cubes-compressibles" className="text-blue-600 underline">
                    Cubes compressibles
                  </a>
                ),
              },
              {
                profil: 'Vol de nuit',
                criteres: 'Sommeil • Bruit',
                reco: (
                  <a href="#oreiller-cervical" className="text-blue-600 underline">
                    Oreiller cervical
                  </a>
                ),
              },
              {
                profil: 'International',
                criteres: 'Prises • Puissance',
                reco: (
                  <a href="#adaptateur-recharge" className="text-blue-600 underline">
                    Adaptateur + GaN
                  </a>
                ),
              },
              {
                profil: 'Long transit / perso',
                criteres: 'Taille cabine • Accès rapide',
                reco: (
                  <a href="#sac-dos-cabine-usb" className="text-blue-600 underline">
                    Sac à dos cabine USB
                  </a>
                ),
              },

              {
                profil: 'Bagage enregistré',
                criteres: 'Suivi • Rassurance',
                reco: (
                  <a href="#tracker-bagage" className="text-blue-600 underline">
                    Tracker bagage
                  </a>
                ),
              },
            ]}
          />
        </section>

        {/* Conseils d'utilisation */}
        <section id="conseils" className="mb-12">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">🛠️ Conseils d'utilisation</H2>
          <ul className="ml-6 list-disc space-y-2 text-gray-700">
            <li>Liquides cabine : ≤100 ml par contenant, dans un seul sac transparent de 1 L.</li>
            <li>Power bank : garde-la en cabine (≤100 Wh), jamais en soute.</li>
            <li>
              Place un tag interne + externe sur tes bagages et un{' '}
              <a href="#tracker-bagage" className="text-blue-600 underline">
                tracker
              </a>{' '}
              à l’intérieur.
            </li>
            <li>
              Siège : choisis côté hublot pour dormir; prévois{' '}
              <a href="#casque-anc" className="text-blue-600 underline">
                ANC
              </a>{' '}
              +{' '}
              <a href="#oreiller-cervical" className="text-blue-600 underline">
                oreiller
              </a>
              .
            </li>
            <li>
              Charge : un{' '}
              <a href="#adaptateur-recharge" className="text-blue-600 underline">
                adaptateur
              </a>{' '}
              + câbles 2 m facilitent aéroports et hôtels.
            </li>
          </ul>
        </section>

        {/* Checklist */}
        <Checklist2Col
          title="📋 Checklist vol (cabine & soute)"
          left={[
            'Passeport/ID + eSIM/VPN',
            'Pèse-bagage',
            'Tracker bagage',
            'Support téléphone (clip avion)',
            'Casque ANC',
          ]}
          right={[
            'Sac à dos cabine USB (port passe-câble)',
            'Adaptateur + GaN 65W',
            'Cubes compressibles',
            'Masque + collation',
            'Stylo (formalités)',
          ]}
        />

        {/* Erreurs courantes */}
        <section className="mb-12">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">
            🚫 Erreurs courantes (et solutions)
          </H2>
          <ul className="ml-6 list-disc space-y-2 text-gray-700">
            <li>
              Liquides &gt; 100&nbsp;ml en cabine → respecte la règle 100&nbsp;ml par contenant,
              dans un sac transparent de 1&nbsp;L.
            </li>
            <li>
              Surpoids au comptoir →{' '}
              <a href="#pese-bagage" className="text-blue-600 underline">
                pèse-bagage
              </a>{' '}
              + redistribution en cabine.
            </li>
            <li>
              Bruit de moteur →{' '}
              <a href="#casque-anc" className="text-blue-600 underline">
                casque ANC
              </a>{' '}
              +{' '}
              <a href="#oreiller-cervical" className="text-blue-600 underline">
                oreiller cervical
              </a>
              .
            </li>
            <li>
              Téléphone qui tombe / poignet fatigué →{' '}
              <a href="#support-telephone-avion" className="text-blue-600 underline">
                support 360° clip
              </a>
              .
            </li>
            <li>
              Batteries lithium en soute → interdit : garde-les en cabine (≤100&nbsp;Wh), idéalement
              dans ton{' '}
              <a href="#sac-dos-cabine-usb" className="text-blue-600 underline">
                sac à dos cabine USB
              </a>
              .
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <FAQ
          items={[
            {
              q: 'Puis-je prendre une batterie externe en avion ?',
              a: (
                <>
                  Oui, en cabine. Choisis ≤100 Wh et protège les bornes. Au-delà (101–160 Wh),
                  l’approbation de la compagnie peut être requise.
                </>
              ),
            },
            {
              q: 'Quelles sont les règles des liquides en cabine au Canada ?',
              a: <>≤100 ml par contenant, tous dans un seul sac transparent refermable de 1 L.</>,
            },
            {
              q: 'Les trackers (AirTag/Tile) sont-ils utiles ?',
              a: (
                <>
                  Oui — ils aident à localiser un bagage retardé et certaines compagnies intègrent
                  désormais le partage de localisation.
                </>
              ),
            },
          ]}
        />

        {/* Conclusion */}
        <ConclusionLinks
          items={[
            { href: '/blog/voyage-hotel', label: 'Voyage en hôtel' },
            { href: '/blog/voyage-voiture', label: 'Voyage en voiture' },
            { href: '/blog/voyage-camping', label: 'Voyage camping' },
          ]}
          title="🎯 Conclusion"
        />
        <ItemListJsonLd items={AVION_ITEMS} />
      </article>
    </>
  );
}
