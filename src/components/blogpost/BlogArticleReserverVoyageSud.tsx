'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Plane, CreditCard, ShieldCheck, Wifi } from 'lucide-react';

import H2 from '@/components/typography/H2';
import BrandName from '@/components/brand/BrandName';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';
import AffiliateButton from '@/components/affiliate/AffiliateButton';
import AffiliateCard from '@/components/affiliate/AffiliateCard';

/**
 * ARTICLE TRANSVERSAL — Réserver son voyage dans le Sud soi-même (méthode + vécu).
 * Rôle : HUB interne en haut de l'entonnoir. Chaque étape renvoie vers un article
 * spécialisé (cartes, assurance, eSIM, destination) où vivent les liens affiliés.
 *
 * ⚠️ SEO (metadata + JSON-LD FAQ) dans app/blog/reserver-voyage-sud-soi-meme/page.tsx.
 * ⚠️ Liens affiliés dans src/lib/affiliates/links.ts.
 * ✅ Vécu intégré (Yucatán, mai 2026). Reste : liens internes à confirmer + 1 photo.
 */

export default function BlogArticleReserverVoyageSud() {
  return (
    <DestinationArticleTemplate
      slug="reserver-voyage-sud-soi-meme"
      title="Réserver son voyage dans le Sud soi-même : la méthode complète (par des Québécois qui le font)"
      subtitle="Vol, hébergement, transferts, argent, assurance, connexion : l’ordre exact pour tout organiser sans agence, sans stress et en payant moins cher."
      breadcrumbs={[
        { label: 'Accueil', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Réserver son voyage Sud soi-même' },
      ]}
      hero={{
        eyebrow: 'Voyage dans le Sud • Méthode • Sans agence',
        caption: 'Organiser son voyage soi-même, étape par étape',
        image: (
          <Image
            src="/images/reserver-voyage-sud/reserver-voyage-sud.avif"
            alt="Planifier soi-même son voyage dans le Sud : carte, téléphone et carnet"
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            priority
          />
        ),
      }}
      toc={[
        { id: 'pourquoi', label: 'Pourquoi réserver soi-même' },
        { id: 'ordre', label: 'Le bon ordre' },
        { id: 'etape1', label: '1. Le vol' },
        { id: 'etape2', label: '2. L’hébergement' },
        { id: 'etape3', label: '3. Le transfert' },
        { id: 'etape4', label: '4. Argent & cartes' },
        { id: 'etape5', label: '5. Assurance' },
        { id: 'etape6', label: '6. Connexion' },
        { id: 'etape7', label: '7. Sur place' },
        { id: 'budget', label: 'Notre budget réel' },
        { id: 'erreurs', label: 'Erreurs à éviter' },
      ]}
      showNearbyDestinations={false}
    >
      <div className="not-prose mb-8">
        <AffiliateDisclosure />
      </div>

      {/* INTRO */}
      <p>
        Réserver un tout-inclus, c’est un appel à une agence et c’est réglé. Mais organiser son
        voyage <strong>soi-même</strong> — choisir son vol, son quartier, ses activités — fait peur
        à beaucoup de monde. Pourtant, c’est plus simple qu’il n’y paraît, souvent moins cher, et
        infiniment plus libre. On l’a fait pour notre voyage au Yucatán (Akumal, Tulum, Valladolid,
        sans voiture), et on te partage ici la <strong>méthode exacte</strong>, dans l’ordre, avec
        nos chiffres réels.
      </p>
      <p>
        L’idée n’est pas de tout réserver à l’avance dans le moindre détail, mais de bloquer les
        bons éléments dans le bon ordre — puis de laisser de la place à l’imprévu une fois sur
        place.
      </p>

      {/* POURQUOI */}
      <H2 id="pourquoi">Pourquoi réserver son voyage Sud soi-même ?</H2>
      <p>
        Les trois raisons qui nous ont convaincus, et qui reviennent chez la plupart des voyageurs
        indépendants :
      </p>
      <ul>
        <li>
          <strong>Le prix.</strong> En dissociant vol et hébergement, on paie souvent bien moins
          qu’un forfait.
        </li>
        <li>
          <strong>La liberté.</strong> On choisit son quartier, on change d’avis, on reste où on se
          sent bien.
        </li>
        <li>
          <strong>L’authenticité.</strong> On mange local, on prend les transports locaux, on sort
          de la bulle du resort.
        </li>
      </ul>
      <p>
        Le seul « coût », c’est un peu de temps de préparation. Ce guide est là pour le réduire au
        minimum.
      </p>

      {/* ORDRE */}
      <H2 id="ordre">Le bon ordre pour tout réserver</H2>
      <p>
        La clé, c’est la séquence. Réserver dans le désordre, c’est là qu’on se retrouve coincé ou
        qu’on paie trop cher. Voici l’ordre qu’on suit :
      </p>
      <ol>
        <li>
          <strong>Le vol</strong> — il fixe les dates et le gros du budget.
        </li>
        <li>
          <strong>Le premier hébergement</strong> — au moins les nuits d’arrivée.
        </li>
        <li>
          <strong>Le transfert aéroport</strong> — pour arriver serein.
        </li>
        <li>
          <strong>Les cartes de paiement</strong> — à préparer avant de partir.
        </li>
        <li>
          <strong>L’assurance voyage</strong> — non négociable.
        </li>
        <li>
          <strong>La connexion (eSIM)</strong> — installée avant le départ.
        </li>
        <li>
          <strong>Le reste sur place</strong> — activités, autres nuits, restos.
        </li>
      </ol>

      {/* ÉTAPE 1 — VOL */}
      <H2 id="etape1">Étape 1 — Le vol (et le bon aéroport de départ)</H2>
      <p>
        Le vol se réserve en premier : il détermine tes dates et pèse le plus lourd. Notre conseil
        vécu le plus rentable : <strong>compare les aéroports de départ</strong>. Pour notre trajet
        vers Cancún, on a payé{' '}
        <strong>environ 500 $ par personne au départ d’Ottawa contre 700 $ depuis Montréal</strong>{' '}
        — 400 $ d’économie à deux, juste en changeant de point de départ.
      </p>
      <p>
        On a donc roulé jusqu’à Ottawa, dormi une nuit sur place la veille, et laissé la voiture au
        parking P2 (5 minutes à pied du terminal). Payer le vol avec une bonne carte voyage a aussi
        inclus les bagages et les sièges — on y revient à l’étape argent.
      </p>
      <div className="not-prose my-4 rounded-2xl border-l-4 border-sky-400 bg-sky-50 p-4 text-sm text-sky-900">
        <p className="font-semibold">💡 À retenir</p>
        <p className="mt-1">
          Élargis ta recherche de vol à 2-3 aéroports (Montréal, Ottawa, parfois Toronto).
          L’économie peut largement dépasser le coût de la route et d’une nuit d’hôtel. On en a fait
          un guide dédié :{' '}
          <Link href="/blog/partir-ottawa-vs-montreal">partir d’Ottawa plutôt que de Montréal</Link>
          .
        </p>
      </div>

      {/* ÉTAPE 2 — HÉBERGEMENT */}
      <H2 id="etape2">Étape 2 — L’hébergement (au moins les premières nuits)</H2>
      <p>
        Une fois les dates fixées par le vol, réserve <strong>au moins tes premières nuits</strong>.
        Arriver fatigué dans un pays étranger sans savoir où dormir, c’est le stress garanti. On
        avait bloqué notre appartement d’Akumal en premier (742 $ pour 5 nuits, les pieds dans
        l’eau, cuisine équipée), puis on a réservé Valladolid plus tard (137 $ pour 2 nuits, avec
        piscine).
      </p>
      <p>
        Cuisine équipée = économies importantes sur les repas, et un logement bien situé (près d’un
        terminal de bus, par exemple) simplifie toute la logistique. On compare vols, hôtels et
        logements au même endroit pour garder une vue d’ensemble du budget.
      </p>
      <AffiliateCard
        eyebrow="Comparer les hébergements"
        accent="text-sky-700"
        icon={<Plane className="size-4" />}
        title="Vols, hôtels et logements au même endroit"
        description="Garder une vue d’ensemble sur le budget avant de bloquer les premières nuits."
        affKey="stay22Hotel"
        ctaLabel="Comparer maintenant"
        variant="primary"
      />

      {/* ÉTAPE 3 — TRANSFERT */}
      <H2 id="etape3">Étape 3 — Le transfert depuis l’aéroport</H2>
      <p>
        À l’arrivée, avec les bagages et le décalage, un{' '}
        <strong>transfert privé réservé d’avance</strong> évite bien des tracas. On avait un van
        climatisé qui nous attendait à la sortie de Cancún (environ 145 $ jusqu’à Akumal), avec même
        un arrêt au distributeur pour nos premiers pesos.
      </p>
      <p>
        Astuce sécurité vécue : méfie-toi des chauffeurs de taxi qui t’abordent en insistant dans
        les aéroports. Au retour, à Cancún, ils tentaient de nous « dépanner » entre terminaux alors
        qu’une <strong>navette gratuite</strong> fait le trajet. Réserver son transfert à l’avance,
        c’est aussi s’éviter ces pressions.
      </p>
      <AffiliateCard
        eyebrow="Transfert aéroport"
        accent="text-emerald-700"
        title="Réserver son transfert à l’avance"
        description="Un chauffeur qui attend à la sortie, sans négocier ni se faire presser."
        affKey="stay22Transfert"
        variant="emerald"
      />

      {/* ÉTAPE 4 — ARGENT */}
      <H2 id="etape4">Étape 4 — Préparer ses cartes et son argent</H2>
      <p>
        Ça se prépare <strong>avant</strong> de partir, pas à l’aéroport. La plupart des cartes de
        crédit canadiennes ajoutent environ <strong>2,5 % de frais de conversion</strong> sur chaque
        achat à l’étranger. Notre combo pour éviter ça :
      </p>
      <ul>
        <li>
          une <strong>carte sans frais de change</strong> (type EQ Bank) pour les retraits et le
          quotidien — au Mexique, retraits Banamex avec des frais locaux minimes (environ 38 pesos)
          ;
        </li>
        <li>
          une <strong>carte à avantages voyage</strong> pour les gros achats (vol, hôtel), qui nous
          a donné bagages, sièges et même l’accès aux <strong>salons d’aéroport</strong> (déjeuner
          gratuit à Ottawa comme à Cancún) ;
        </li>
        <li>
          du <strong>comptant en pesos</strong> pour les transports locaux et les marchés.
        </li>
      </ul>
      <div className="not-prose my-4 rounded-2xl border-l-4 border-indigo-400 bg-indigo-50 p-4 text-sm text-indigo-900">
        <p className="mb-1 inline-flex items-center gap-2 font-semibold">
          <CreditCard className="size-4" /> Pour aller plus loin
        </p>
        <p className="mt-1">
          On détaille toute notre stratégie de cartes (sans frais de change, points, salons) dans
          notre guide dédié :{' '}
          <Link href="/blog/argent-cartes-voyage">payer malin en voyage sans frais</Link>.
        </p>
      </div>
      <p className="text-sm text-gray-500">
        Les conditions et primes des cartes changent souvent : vérifie les détails à jour avant
        toute demande. Ceci n’est pas un conseil financier.
      </p>

      {/* ÉTAPE 5 — ASSURANCE */}
      <H2 id="etape5">Étape 5 — L’assurance voyage (à ne jamais sauter)</H2>
      <p>
        C’est l’étape que trop de gens négligent, et la plus risquée à oublier. Sans assurance, des
        soins médicaux à l’étranger peuvent coûter une fortune. On souscrit toujours une couverture
        adaptée avant le départ, en vérifiant les soins d’urgence et le rapatriement.
      </p>
      <p>
        Point important pour les Québécois qui partent longtemps (snowbirds) : au-delà d’une
        certaine durée d’absence, on peut perdre sa couverture RAMQ. On explique ce cas et comment
        choisir sa police dans notre{' '}
        <Link href="/blog/assurance-voyage-quebec">guide de l’assurance voyage</Link>.
      </p>
      <AffiliateCard
        eyebrow="Avant de partir"
        accent="text-indigo-700"
        icon={<ShieldCheck className="size-4" />}
        title="Comparer les assurances voyage"
        description="Vérifier soins d’urgence et rapatriement, et comparer les protections avant de choisir."
        affKey="assurance"
        variant="primary"
      />

      {/* ÉTAPE 6 — CONNEXION */}
      <H2 id="etape6">Étape 6 — La connexion (eSIM installée avant le départ)</H2>
      <p>
        Pour les cartes, les réservations de dernière minute et se repérer, être connecté change
        tout. Une <strong>eSIM</strong> évite les frais d’itinérance et s’active dès l’arrivée —
        installe-la chez toi, sur ton wifi, avant de partir. On détaille le choix, l’installation et
        la quantité de données dans notre{' '}
        <Link href="/blog/vpn-esim-voyage">guide eSIM &amp; VPN</Link>.
      </p>
      <div className="not-prose mt-3">
        <AffiliateButton affKey="airalo" label="Voir les eSIM" variant="primary" />
      </div>

      {/* ÉTAPE 7 — SUR PLACE */}
      <H2 id="etape7">Étape 7 — Le reste, une fois sur place</H2>
      <p>
        Le secret d’un voyage indépendant réussi : ne pas tout verrouiller à l’avance. Une fois le
        vol, la première nuit, le transfert, les cartes, l’assurance et la connexion réglés, on
        garde de la flexibilité pour :
      </p>
      <ul>
        <li>
          les <strong>autres nuits</strong> (on a réservé Valladolid une fois sur place) ;
        </li>
        <li>
          les <strong>transports locaux</strong> (colectivos, bus ADO — payés cash au fil de l’eau)
          ;
        </li>
        <li>
          les <strong>activités</strong> (cenotes, tortues, ruines — décidées selon la météo et
          l’envie) ;
        </li>
        <li>
          les <strong>restos</strong>, en suivant les adresses locales plutôt que les pièges à
          touristes.
        </li>
      </ul>
      <AffiliateCard
        eyebrow="Activités & excursions"
        accent="text-amber-700"
        icon={<Wifi className="size-4" />}
        title="Réserver cenotes, excursions et visites"
        description="Sur place ou à l’avance pour les activités populaires qui affichent vite complet."
        affKey="stay22Activites"
        variant="amber"
      />

      {/* BUDGET */}
      <H2 id="budget">Notre budget réel, poste par poste</H2>
      <p>
        Pour te donner des repères concrets, voici ce qu’on a réellement payé pour deux personnes au
        Yucatán (mai 2026, hors vol) :
      </p>
      <ul>
        <li>
          <strong>Vol</strong> : ~500 $/personne au départ d’Ottawa
        </li>
        <li>
          <strong>Hébergement Akumal</strong> : 742 $ (5 nuits, appartement plage)
        </li>
        <li>
          <strong>Hébergement Valladolid</strong> : 137 $ (2 nuits, avec piscine)
        </li>
        <li>
          <strong>Transfert privé</strong> Cancún → Akumal : ~145 $
        </li>
        <li>
          <strong>Transports locaux</strong> : colectivos 90–120 pesos, bus ADO 42–69 $ le trajet
        </li>
        <li>
          <strong>Activités</strong> : tortues 1300 pesos, cenotes ~700 pesos, ruines Ek’ Balam 1418
          pesos (pour deux)
        </li>
        <li>
          <strong>Repas</strong> : très abordables en mangeant local et en cuisinant (plats ~130
          pesos)
        </li>
      </ul>
      <p>
        Le détail complet de cet itinéraire est dans notre{' '}
        <Link href="/blog/mexique-yucatan">guide du Yucatán sans voiture</Link>.
      </p>

      {/* ERREURS */}
      <H2 id="erreurs">Les erreurs à éviter (qu’on a apprises)</H2>
      <ul>
        <li>
          <strong>Payer en dollars au terminal.</strong> Choisis toujours de payer en devise locale
          (pesos) : le taux « en dollars » proposé est presque toujours défavorable.
        </li>
        <li>
          <strong>Retirer à la première banque venue.</strong> Certaines prennent de gros frais de
          change — compare, on a changé de distributeur pour ça.
        </li>
        <li>
          <strong>Accepter les taxis qui insistent</strong> dans les aéroports : cherche la navette
          officielle ou le transfert réservé.
        </li>
        <li>
          <strong>Oublier l’assurance</strong> ou l’installer « plus tard » : à faire avant le
          départ.
        </li>
        <li>
          <strong>Tout sur-réserver.</strong> Garde de la place pour l’imprévu — c’est souvent le
          meilleur du voyage.
        </li>
      </ul>

      {/* RÉCAP LIENS */}
      <H2>
        Continuer avec <BrandName />
      </H2>
      <p>Chaque étape a son guide détaillé :</p>
      <ul>
        <li>
          🌴 <Link href="/blog/mexique-yucatan">Notre guide du Yucatán sans voiture</Link>
        </li>
        <li>
          💳 <Link href="/blog/argent-cartes-voyage">Payer malin en voyage sans frais</Link>
        </li>
        <li>
          🛡️ <Link href="/blog/assurance-voyage-quebec">Choisir son assurance voyage</Link>
        </li>
        <li>
          📶 <Link href="/blog/vpn-esim-voyage">eSIM &amp; VPN en voyage</Link>
        </li>
        <li>
          ✈️ <Link href="/blog/partir-ottawa-vs-montreal">Partir d’Ottawa plutôt que Montréal</Link>
        </li>
        <li>
          🧭 <Link href="/planificateur">Le planificateur d’itinéraire</Link>
        </li>
      </ul>
    </DestinationArticleTemplate>
  );
}
