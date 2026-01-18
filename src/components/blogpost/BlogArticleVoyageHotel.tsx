'use client';

import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

import Head from 'next/head';
import {
  ProductSection,
  QuickChips,
  DecisionTable,
  FAQ,
  Checklist2Col,
  ConclusionLinks,
  ItemListJsonLd,
} from '@/components/TravelContentKit';

export default function BlogArticleVoyageHotel() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Produits Indispensables pour un Voyage à l’Hôtel au Canada | Guide 2025',
    description:
      "Le kit d'accessoires essentiels pour bien vivre à l’hôtel, au Canada et à l’étranger : adaptateur universel, power bank 20 000 mAh, cubes de rangement, trousse de toilette à crochet, kit sommeil, cadenas TSA, etc.",
    datePublished: '2025-01-20',
    dateModified: '2025-09-10', // maj
    publisher: {
      '@type': 'Organization',
      name: 'Voyage Canada Expert',
    },
  };

  // Liste pour JSON-LD ItemList (SEO)
  const HOTEL_ITEMS = [
    {
      name: 'Protège-dents anti-grincement (AnaMimi Global Wellness)',
      url: 'https://anamimiglobalwellness.com/',
    },
    { name: 'Adaptateur universel VYLEE (multi-ports)', url: 'https://amzn.to/3G7Gi3D' },
    { name: 'Batterie externe 20 000 mAh (USB-C PD)', url: 'https://amzn.to/4pikrYN' },
    { name: 'cables-2m-65w', url: 'https://amzn.to/3HVSHbS' }, // TODO remplace par ton lien
    { name: 'Organiseur de valise BAGSMART (cubes)', url: 'https://amzn.to/44bWutV' },
    { name: 'Sacs de compression/vide GONGSHI', url: 'https://amzn.to/4euLP0T' },
    { name: 'Trousse de toilette à crochet (TSA-friendly)', url: 'https://amzn.to/47Dzvdk' }, // TODO
    { name: 'Kit sommeil : masque + bouchons', url: 'https://amzn.to/4gixyVG' }, // TODO
    { name: 'Cadenas TSA FOSMON (câble flexible)', url: 'https://amzn.to/3TgpWZr' },
  ];

  return (
    <>
      <Head>
        <title>Produits Indispensables pour un Voyage à l’Hôtel au Canada | Guide 2025</title>
        <meta
          name="description"
          content="Le kit d'accessoires essentiels pour bien vivre à l’hôtel, au Canada et à l’étranger : adaptateur universel, power bank, cubes de rangement, trousse à crochet, kit sommeil, cadenas TSA, etc."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Liste de produits structurée pour SEO */}
        {<ItemListJsonLd items={HOTEL_ITEMS} />}
      </Head>

      <article className="mx-auto max-w-4xl px-6 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <H1 className="mb-4">
            Indispensables pour un Séjour à l’Hôtel (Canada & International) — 2025
          </H1>
          <p className="text-xl leading-relaxed text-gray-700">
            Que ce soit à Montréal, Québec ou à l’étranger, ce kit minimaliste te garantit un séjour
            fluide : charge partout, dors bien, range mieux, sécurise l’essentiel — et profite.
          </p>
        </header>

        {/* Pourquoi */}
        <section className="mb-12">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">Pourquoi ce kit d’hôtel ?</H2>
          <p className="text-gray-700">
            Même les meilleurs hôtels n’anticipent pas tous tes besoins personnels (énergie,
            sommeil, organisation, sécurité). Ces 8 essentiels couvrent 95 % des galères courantes —
            en gardant ta valise simple et légère.
          </p>
        </section>

        {/* Raccourcis (chips) */}
        <div className="mb-8">
          <QuickChips
            items={[
              { href: '#protege-dent-bruxisme', label: 'Protège-dents (nuit)' },
              { href: '#adaptateur-vylee', label: 'Adaptateur universel' },
              { href: '#powerbank-20000', label: 'Énergie 2–3 jours' },
              { href: '#cables-2m-65w', label: 'Câbles 2 m' },
              { href: '#cubes-bagsmart', label: 'Cubes valise' },
              { href: '#sous-vide-gongshi', label: 'Compression' },
              { href: '#trousse-toilette-hook', label: 'Trousse crochet' },
              { href: '#kit-sommeil', label: 'Sommeil' },
              { href: '#cadenas-tsa-fosmon', label: 'Cadenas TSA' },
            ]}
          />
        </div>

        {/* 8 FICHES PRODUIT — standardisées comme l’article Camping */}
        <ProductSection
          id="protege-dent-bruxisme"
          title="Protège-dents anti-grincement (bruxisme) — AnaMimi Global Wellness"
          href="https://anamimiglobalwellness.com/"
          priceText="selon l’offre"
          image={{
            src: '/images/produits/AnaMimi.avif', // mets ton asset local
            alt: 'Protège-dents de nuit contre le bruxisme — moulable, étui de transport, usage hôtel & voyage',
            width: 1200,
            height: 900,
            caption: 'Soulage la mâchoire, protège l’émail — nuits plus calmes en déplacement.',
          }}
          description="Moulable à chaud, il limite le grincement nocturne et aide à détendre la mâchoire — pratique en voyage quand le stress augmente."
          pros="Protège l’émail, moulage personnalisé, étui compact."
          cons="Nécessite un moulage correct; période d’adaptation; hygiène à surveiller."
          tips="Suis bien les videos d'explication pour le moulage (https://www.youtube.com/@AnaMimiOfficial/videos) ; remplace périodiquement ; rince et sèche avant l’étui."
          scenario="Nuit d’hôtel après une grosse journée : tu t’endors serein, sans réveils à cause du grincement."
        />

        <ProductSection
          id="adaptateur-vylee"
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
          description="Compatibilité mondiale, plusieurs ports pour recharger tel/tablette/laptop la nuit."
          pros="Compatibilité étendue, multi-ports, simple à utiliser."
          cons="Peut être un peu volumineux dans certaines prises murales anciennes."
          tips="Vérifie le 100–240 V de tes appareils; emporte un câble 2 m pour la prise loin du lit."
          scenario="Tu branches tout en arrivant, tout est full chargement au matin."
        />

        <ProductSection
          id="powerbank-20000"
          title="Batterie externe 20 000 mAh (USB-C PD)"
          href="https://amzn.to/4pikrYN"
          priceText="~34.19 CAD"
          image={{
            src: '/images/produits/chargeur-batterie.avif',
            alt: 'Power bank 20 000 mAh — affichage du pourcentage, lampe intégrée',
            width: 1200,
            height: 800,
            caption: '2–3 jours de sérénité en visites.',
          }}
          description="Recharge téléphone, frontale, petite lampe; affichage clair du % restant."
          pros="Grosse capacité, affichage pratique."
          cons="Un peu lourde; recharge complète longue; non étanche."
          tips="Charge à 100 % la veille; garde-la au chaud si tu sors par temps froid."
          scenario="Journée entière de visites sans chercher de prise."
        />

        <ProductSection
          id="cables-2m-65w"
          title="Câbles USB-C 65W + câble 4-en-1 (2 m)"
          href="https://amzn.to/3HVSHbS" // TODO ton lien
          priceText="~13.99 CAD"
          image={{
            src: '/images/produits/cable-recharge-4in1.avif',
            alt: 'Câbles USB-C 65W et câble 4-en-1 de 2 mètres pour recharger confortablement depuis le lit',
            width: 1200,
            height: 900,
            caption: 'La longueur qui change tout (prise loin du lit).',
          }}
          description="Un USB-C 65W pour laptop + un 4-en-1 robuste pour couvrir tous les appareils."
          pros="Rapide, polyvalent, pratique depuis la tête de lit."
          cons="Les multi-têtes cheap s’usent vite."
          tips="Prends un 2 m tressé; en rechange, une version courte pour l’aéroport."
          scenario="Tu scrolles au lit pendant la recharge — sans déplacer la table de nuit."
        />

        <ProductSection
          id="cubes-bagsmart"
          title="Organiseur de valise BAGSMART (cubes compressibles)"
          href="https://amzn.to/44bWutV"
          priceText="~49.95 CAD"
          image={{
            src: '/images/produits/organisateur-bagsmart-noirjpg.avif',
            alt: 'Cubes de rangement BAGSMART — valise organisée, moins de repassage',
            width: 1200,
            height: 900,
            caption: 'Tu ouvres la valise : tout est déjà “tiroirs”.',
          }}
          description="Compartimente tes vêtements et garde ta chambre d’hôtel rangée en 30 secondes."
          pros="Organisation visuelle, lavable, compactable."
          cons="Prend un peu de place en cabine si tu en utilises beaucoup."
          tips="Un cube “linge sale” — le retour devient un jeu d’enfant."
          scenario="Tu vis 5 jours sur 2 cubes, sans éparpiller tes affaires partout."
        />

        <ProductSection
          id="sous-vide-gongshi"
          title="Sacs de compression / vide GONGSHI"
          href="https://amzn.to/4euLP0T"
          priceText="~19.37 CAD"
          image={{
            src: '/images/produits/sac-compression-habits.avif',
            alt: 'Sacs sous vide GONGSHI — gain de place à la valise',
            width: 1200,
            height: 900,
            caption: 'Gagne de la place (surtout au retour).',
          }}
          description="Réduit le volume des vêtements; parfait pour un voyage multi-hôtels ou pour ramener des souvenirs."
          pros="Gain de place, léger, facile à transporter."
          cons="Nécessite une source d’air ou un roulage soigné selon le modèle."
          tips="Utilise la power bank + mini pompe si tu en as une; sinon roule bien pour chasser l’air."
          scenario="Road-trip urbain : tu compresses avant chaque check-out en 2 minutes."
        />

        <ProductSection
          id="trousse-toilette-hook"
          title="Trousse de toilette à crochet (TSA-friendly)"
          href="https://amzn.to/47Dzvdk" // TODO ton lien
          priceText="~18.99 CAD"
          image={{
            src: '/images/produits/trousse-toilet-crochet.avif',
            alt: "Trousse de toilette voyage à crochet — format cabin-friendly, s'accroche au dos de la porte",
            width: 1200,
            height: 900,
            caption: 'Comptoir libre, salle de bain propre.',
          }}
          description="Accroche-la au dos de la porte. Tout est visible et à portée — même dans une petite salle de bain."
          pros="Hook pratique, poches visibles, formats 100 ml."
          cons="À recharger en produits après 7–10 jours."
          tips="Ajoute un petit sac étanche pour la lingerie/maillot."
          scenario="Douches express sans fouiller au fond d’une trousse molle."
        />

        <ProductSection
          id="kit-sommeil"
          title="Kit sommeil : masque + bouchons d’oreilles"
          href="https://amzn.to/4gixyVG" // TODO ton lien
          priceText="~13.99 CAD"
          image={{
            src: '/images/produits/masque-sommeil-bouchons.avif',
            alt: 'Masque de nuit et bouchons — dormir malgré les couloirs bruyants et l’ascenseur',
            width: 1200,
            height: 900,
            caption: 'Tu dors bien, même près de l’ascenseur.',
          }}
          description="Pour couper la lumière et le bruit : combo gagnant si la chambre donne sur le couloir ou la rue."
          pros="Améliore nettement le sommeil."
          cons="Bouchons mousses parfois gênants si tu dors sur le côté."
          tips="Teste le duo mousse + silicone avant le départ."
          scenario="Mariage le samedi : tu dors à 23 h, pas à 2 h."
        />

        <ProductSection
          id="cadenas-tsa-fosmon"
          title="Cadenas TSA FOSMON (câble flexible)"
          href="https://amzn.to/3TgpWZr"
          priceText="~27 CAD"
          image={{
            src: '/images/produits/cadenas-bagages.avif',
            alt: 'Cadenas TSA FOSMON — sécuriser valises et casiers à l’hôtel',
            width: 1200,
            height: 900,
            caption: 'Simple, efficace, approuvé TSA.',
          }}
          description="Sécurise valises et casiers d’hôtel, câble souple pratique pour les fermetures Éclair."
          pros="Approuvé TSA, câble flexible, léger."
          cons="Nécessite de bien gérer la clé ou le code."
          tips="Photo de la combinaison dans un coffre numérique; étiquette avec e-mail/numéro."
          scenario="Late check-out et bagagerie : tu pars serein, cadenas posé."
        />

        {/* Guide d'achat (décisionnel) */}
        <section id="guide-achat" className="mb-12 mt-4">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">🛒 Guide d'achat</H2>

          <div className="mb-4">
            <QuickChips
              items={[
                { href: '#protege-dent-bruxisme', label: 'Protège-dents (nuit)' },
                { href: '#adaptateur-vylee', label: 'Prises internationales' },
                { href: '#powerbank-20000', label: 'Autonomie' },
                { href: '#cubes-bagsmart', label: 'Organisation' },
                { href: '#trousse-toilette-hook', label: 'Salle de bain' },
                { href: '#kit-sommeil', label: 'Sommeil' },
                { href: '#cadenas-tsa-fosmon', label: 'Sécurité' },
              ]}
            />
          </div>

          <DecisionTable
            rows={[
              {
                profil: 'Sommeil + mâchoire tendue',
                criteres: 'Confort • Moulage',
                reco: (
                  <a href="#protege-dent-bruxisme" className="text-blue-600 underline">
                    Protège-dents AnaMimi
                  </a>
                ),
              },

              {
                profil: 'Journée complète en ville',
                criteres: 'Batterie • % restant',
                reco: (
                  <a href="#powerbank-20000" className="text-blue-600 underline">
                    Power bank 20 000 mAh
                  </a>
                ),
              },
              {
                profil: 'International / multi-pays',
                criteres: 'Compatibilité • Ports',
                reco: (
                  <a href="#adaptateur-vylee" className="text-blue-600 underline">
                    Adaptateur VYLEE
                  </a>
                ),
              },
              {
                profil: 'Valise nette',
                criteres: 'Compartiments • Compression',
                reco: (
                  <a href="#cubes-bagsmart" className="text-blue-600 underline">
                    Cubes BAGSMART
                  </a>
                ),
              },
              {
                profil: 'Salle de bain petite',
                criteres: 'Accrochage • Accès',
                reco: (
                  <a href="#trousse-toilette-hook" className="text-blue-600 underline">
                    Trousse à crochet
                  </a>
                ),
              },
              {
                profil: 'Sommeil léger',
                criteres: 'Obscurité • Bruit',
                reco: (
                  <a href="#kit-sommeil" className="text-blue-600 underline">
                    Masque + bouchons
                  </a>
                ),
              },
              {
                profil: 'Sécuriser l’essentiel',
                criteres: 'TSA • Souple',
                reco: (
                  <a href="#cadenas-tsa-fosmon" className="text-blue-600 underline">
                    Cadenas FOSMON
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
            <li>
              Si tu grince des dents en période de stress, prends un{' '}
              <a href="#protege-dent-bruxisme" className="text-blue-600 underline">
                protège-dents
              </a>{' '}
              moulable.
            </li>
            <li>
              Charge tout la veille; garde la{' '}
              <a href="#powerbank-20000" className="text-blue-600 underline">
                power bank
              </a>{' '}
              au chaud.
            </li>
            <li>Demande un étage élevé, loin de l’ascenseur/la machine à glace.</li>
            <li>
              Accroche la{' '}
              <a href="#trousse-toilette-hook" className="text-blue-600 underline">
                trousse
              </a>{' '}
              au dos de la porte pour libérer le comptoir.
            </li>
            <li>
              Place l’
              <a href="#adaptateur-vylee" className="text-blue-600 underline">
                adaptateur
              </a>{' '}
              côté bureau et des{' '}
              <a href="#cables-2m-100w" className="text-blue-600 underline">
                câbles 2 m
              </a>{' '}
              côté lit.
            </li>
            <li>
              Utilise le coffre et/ou un{' '}
              <a href="#cadenas-tsa-fosmon" className="text-blue-600 underline">
                cadenas TSA
              </a>{' '}
              pour tes effets de valeur.
            </li>
          </ul>
        </section>

        {/* Checklist 2 colonnes */}
        <Checklist2Col
          title="📋 Checklist de voyage à l'hôtel"
          left={[
            'Adaptateur universel',
            'Câbles USB-C 100W (2 m)',
            'Power bank 20 000 mAh',
            'Cubes de rangement',
            'Sacs sous vide',
          ]}
          right={[
            'Trousse à crochet (100 ml)',
            'Masque + bouchons',
            'Sandales / pantoufles',
            'Lingettes / petit gel',
            'Petit sac à linge',
          ]}
        />

        {/* Erreurs courantes */}
        <section className="mb-12">
          <H2 className="mb-4 text-3xl font-semibold text-gray-900">
            🚫 Erreurs courantes (et solutions)
          </H2>
          <ul className="ml-6 list-disc space-y-2 text-gray-700">
            <li>
              Oublier l’adaptateur →{' '}
              <a href="#adaptateur-vylee" className="text-blue-600 underline">
                VYLEE
              </a>{' '}
              multi-ports.
            </li>
            <li>
              Portes trop loin des prises →{' '}
              <a href="#cables-2m-65w" className="text-blue-600 underline">
                câbles 2 m
              </a>
              .
            </li>
            <li>
              Valise chaos →{' '}
              <a href="#cubes-bagsmart" className="text-blue-600 underline">
                cubes
              </a>{' '}
              +{' '}
              <a href="#sous-vide-gongshi" className="text-blue-600 underline">
                compression
              </a>
              .
            </li>
            <li>
              Sommeil haché →{' '}
              <a href="#kit-sommeil" className="text-blue-600 underline">
                masque + bouchons
              </a>
              .
            </li>
            <li>
              Oublier de sécuriser →{' '}
              <a href="#cadenas-tsa-fosmon" className="text-blue-600 underline">
                cadenas TSA
              </a>
              .
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <FAQ
          items={[
            {
              q: 'Faut-il un adaptateur à l’étranger ?',
              a: (
                <>
                  Oui, prends un modèle universel (
                  <a href="#adaptateur-vylee" className="text-blue-600 underline">
                    VYLEE
                  </a>
                  ) et vérifie le bi-voltage 100–240 V de tes appareils.
                </>
              ),
            },
            {
              q: 'Les batteries sont-elles autorisées en avion ?',
              a: (
                <>
                  Oui, en <strong>cabine</strong> pour la plupart des compagnies (limite Wh).
                  Protège les bornes et garde la{' '}
                  <a href="#powerbank-20000" className="text-blue-600 underline">
                    power bank
                  </a>{' '}
                  accessible.
                </>
              ),
            },
            {
              q: 'Comment éviter le bazar dans la chambre ?',
              a: (
                <>
                  Utilise des{' '}
                  <a href="#cubes-bagsmart" className="text-blue-600 underline">
                    cubes
                  </a>
                  , un sac linge et accroche la{' '}
                  <a href="#trousse-toilette-hook" className="text-blue-600 underline">
                    trousse
                  </a>
                  .
                </>
              ),
            },
          ]}
        />

        {/* Conclusion avec liens internes vers tes autres guides */}
        <ConclusionLinks
          items={[
            { href: '/blog/voyage-camping', label: 'Voyage en camping' },
            { href: '/blog/voyage-voiture', label: 'Voyage en voiture' },
            { href: '/blog/voyage-avion', label: 'Voyage en avion' },
          ]}
          title="🎯 Conclusion"
        />
      </article>
    </>
  );
}
