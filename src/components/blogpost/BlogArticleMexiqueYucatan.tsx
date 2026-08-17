'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Palmtree, Bus, ShieldCheck } from 'lucide-react';

import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import BrandName from '@/components/brand/BrandName';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';
import AffiliateButton from '@/components/affiliate/AffiliateButton';
import AffiliateCard from '@/components/affiliate/AffiliateCard';

/**
 * ARTICLE — Guide Mexique / Yucatán vécu (Akumal, Tulum, Valladolid), SANS voiture.
 * Angle E-E-A-T : voyage indépendant en colectivo + bus ADO. Créneau peu concurrentiel en français.
 *
 * ⚠️ Le SEO (metadata + JSON-LD FAQ) est géré dans la PAGE SERVEUR
 *    app/blog/mexique-yucatan/page.tsx — PAS ici (convention du projet, cf. Sandbanks).
 * ⚠️ Les liens affiliés vivent dans src/lib/affiliates/links.ts (remplacer les '#').
 * ✅ Vécu intégré (voyage mai 2026). Restent 2 à compléter : photo plage Akumal + lien app espagnol.
 */

/** Image légendée réutilisable — chemin relatif à /public. */
function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="not-prose my-6">
      <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="h-auto w-full object-cover"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-sm italic text-gray-500">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

export default function BlogArticleMexiqueYucatan() {
  return (
    <DestinationArticleTemplate
      slug="mexique-yucatan"
      title="Voyage au Mexique (Yucatán) depuis le Québec : notre guide vécu — Akumal, Tulum, Valladolid sans voiture"
      subtitle="Comment on a exploré la Riviera Maya et le Yucatán en indépendant, en colectivo et en bus ADO, sans louer de voiture."
      breadcrumbs={[
        { label: 'Accueil', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Mexique — Yucatán sans voiture' },
      ]}
      hero={{
        eyebrow: 'Yucatán • Akumal • Tulum • Valladolid • Sans voiture',
        caption: 'Akumal, Riviera Maya — Mexique',
        image: (
          <Image
            src="/images/destinations/mexique/vue-aerienne-cancun-mexique.avif"
            alt="Plage d’Akumal au Yucatán, Mexique, eau turquoise et palmiers"
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            priority
          />
        ),
      }}
      toc={[
        { id: 'quand', label: 'Quand partir' },
        { id: 'sargasses', label: 'Sargasses' },
        { id: 'securite', label: 'Sécurité' },
        { id: 'reserver', label: 'Par quoi commencer' },
        { id: 'transport', label: 'Se déplacer sans voiture' },
        { id: 'hebergement', label: 'Où dormir' },
        { id: 'itineraire', label: 'Notre itinéraire' },
        { id: 'argent', label: 'Argent & cartes' },
        { id: 'connexion', label: 'Rester connecté' },
        { id: 'activites', label: 'Cenotes & activités' },
        { id: 'manger', label: 'Où manger' },
        { id: 'espagnol', label: 'Un peu d’espagnol' },
      ]}
      showNearbyDestinations={false}
    >
      {/* Disclosure d'affiliation en tête d'article */}
      <div className="not-prose mb-8">
        <AffiliateDisclosure />
      </div>

      {/* INTRO */}
      <p>
        La plupart des guides sur le Mexique parlent de tout-inclus à Cancún. Le nôtre est différent
        : on a exploré le <strong>Yucatán en indépendant, sans voiture de location</strong> — Akumal
        pour la plage et les tortues, Tulum pour les cenotes et les ruines, Valladolid pour la vraie
        vie coloniale — en se déplaçant en colectivo et en bus ADO comme les locaux.
      </p>
      <p>
        On y est allés une première fois au printemps, et on y retourne en décembre. Ce guide
        rassemble ce qu’on aurait aimé savoir avant de partir : comment réserver dans le bon ordre,
        se déplacer sans voiture, éviter les frais de carte, gérer les sargasses, et profiter des
        plus beaux coins loin de la foule. Du vécu, pas de la théorie.
      </p>
      <p>
        On a fait ce voyage à deux, sac au dos, en logeant dans un appartement les pieds dans l’eau
        à Akumal puis dans une petite casa à Valladolid. Pas de bracelet tout-inclus, pas de voiture
        de location : des colectivos bondés, des cenotes cachés dans la jungle, des tacos mangés là
        où il n’y a aucun autre touriste. C’est de loin le voyage dont on garde le plus de souvenirs
        précis — et c’est exactement ce qu’on partage ici, chiffres réels à l’appui.
      </p>

      {/* QUAND */}
      <H2 id="quand">Quand partir au Yucatán ?</H2>
      <Figure
        src="/images/destinations/mexique/leve-couche-soleil-akumal-mexique.avif"
        alt="Levers et couchers de soleil depuis la terrasse à Akumal, Mexique"
        caption="Nos levers et couchers de soleil depuis la terrasse à Akumal."
      />
      <p>
        La <strong>saison sèche</strong>, de novembre à avril, est la plus agréable : chaleur
        supportable, faible humidité, peu de pluie — c’est la haute saison (Fêtes et relâche
        comprises). De mai à octobre, il fait plus chaud et humide, avec des averses et la saison
        des ouragans en fin de période, mais moins de foule et des prix plus doux.
      </p>
      <p>
        Nous, on y était en mai, et le mot qu’on a le plus prononcé, c’est <em>calor</em> — chaud.
        Un ressenti autour de 36 °C à l’ombre certains jours, une chaleur qui rend chaque marche
        sous le soleil éprouvante. En contrepartie, mai est hors de la haute saison : les cenotes
        étaient quasi déserts, pas de navettes touristiques bondées, et on a pu profiter des sites
        sans foule. Si tu pars en décembre comme on le fait cette fois, ce sera plus doux à marcher
        mais bien plus achalandé. À toi de choisir ton compromis : chaleur et tranquillité, ou
        confort et foule.
      </p>

      {/* SARGASSES */}
      <H2 id="sargasses">Les sargasses : à quoi s’attendre vraiment</H2>
      <p>
        C’est LA question qui inquiète avant de partir. Les <strong>sargasses</strong> sont des
        algues brunes qui s’échouent par vagues sur la côte caraïbe. Leur présence varie selon la{' '}
        <strong>saison</strong> et l’<strong>endroit</strong> : la côte exposée (Tulum, Playa) peut
        en recevoir surtout de la fin du printemps à l’été, tandis que des baies protégées comme{' '}
        <strong>Akumal</strong> sont souvent moins touchées.
      </p>
      <p>
        Notre conseil : vérifie une carte de suivi des sargasses dans les semaines avant le départ,
        et choisis ton secteur en conséquence. Rien n’est garanti, mais on met les chances de son
        côté.
      </p>
      <p>
        Soyons honnêtes : on a eu des sargasses pendant notre séjour à Akumal, même si la baie est
        réputée plus protégée que la côte de Tulum. Le plus ironique ? Elles avaient complètement
        disparu de la plage… le matin de notre départ. C’est toute l’imprévisibilité du phénomène :
        ça va, ça vient, parfois d’un jour à l’autre. Notre conseil vécu : ne base pas tout ton
        voyage sur des plages parfaites de carte postale. On a largement compensé par les cenotes,
        qui eux ne sont jamais touchés par les algues et sont un enchantement total.
      </p>
      <Figure
        src="/images/destinations/mexique/fresques-murales-street-art-akumal-mexique.avif"
        alt="Fresques murales et street art colorés à Akumal, Mexique"
        caption="Akumal, ce n’est pas que la plage : les fresques murales colorent le village."
      />

      {/* SÉCURITÉ */}
      <H2 id="securite">Le Yucatán est-il sécuritaire ? Notre ressenti</H2>
      <p>
        La péninsule du Yucatán est généralement considérée comme l’une des régions les plus
        tranquilles du Mexique pour le tourisme — bien distincte des zones que les avis officiels
        signalent ailleurs dans le pays. On applique le bon sens : transports reconnus, discrétion
        avec les objets de valeur, attention le soir.
      </p>
      <p>
        Deux réflexes avant de partir : consulter les{' '}
        <strong>avis d’Affaires mondiales Canada</strong> (ils varient selon les États) et souscrire
        une <strong>assurance voyage</strong> adaptée — les soins peuvent être coûteux sans
        couverture.
      </p>
      <p>
        Franchement, on ne s’est jamais sentis en danger. On a pris des colectivos bondés, marché
        dans Tulum et Valladolid, accepté des lifts de Mexicains adorables qui nous ont dépannés sur
        la route des cenotes, flâné le soir sur les places de Valladolid pendant qu’une fête de
        quinceañera battait son plein au couvent. Les gens ont été d’une gentillesse constante. Le
        vrai danger, pour nous, c’était le soleil et la chaleur, pas l’insécurité. Le seul « piège »
        rencontré : les taxis à l’aéroport de Cancún qui insistent lourdement (on y revient plus
        bas).
      </p>

      <AffiliateCard
        eyebrow="Avant de partir"
        accent="text-indigo-700"
        icon={<ShieldCheck className="size-4" />}
        title="Une assurance voyage pour le Mexique"
        description="Au Mexique, les frais médicaux peuvent être élevés sans couverture. Si ta carte de crédit ne suffit pas, SafetyWing propose une protection dédiée, avec actuellement un avantage pour les nouveaux membres (voir conditions)."
        affKey="assurance"
        ctaLabel="Voir l’offre SafetyWing"
        variant="primary"
      />

      {/* RÉSERVER */}
      <H2 id="reserver">Par quoi commencer pour réserver son voyage soi-même</H2>
      <p>
        Réserver en indépendant fait peur au début, mais dans le bon ordre c’est simple. Voici la
        séquence qu’on a suivie :
      </p>
      <ol>
        <li>
          <strong>Le vol d’abord.</strong> Il fixe tes dates et représente le plus gros du budget.
        </li>
        <li>
          <strong>Le premier hébergement ensuite.</strong> Réserve au moins tes premières nuits pour
          ne pas chercher fatigué. On avait bloqué Akumal en premier.
        </li>
        <li>
          <strong>Le transfert aéroport.</strong> Depuis Cancún, organise ton arrivée à l’avance.
        </li>
        <li>
          <strong>Le reste au fil de l’eau.</strong> Valladolid, activités, cenotes : on a gardé de
          la flexibilité sur place.
        </li>
      </ol>

      <H3>Notre bon plan : partir d’Ottawa plutôt que de Montréal</H3>
      <p>
        Voici une astuce concrète qui nous a fait économiser gros. Pour le même trajet vers Cancún,
        on a comparé :{' '}
        <strong>
          environ 700 $ par personne au départ de Montréal, contre 500 $ depuis Ottawa
        </strong>
        . Sur deux personnes, ça fait 400 $ d’économie. On a donc choisi de rouler jusqu’à Ottawa,
        dormir une nuit sur place la veille du vol, et partir de là.
      </p>
      <p>
        Le stationnement de l’aéroport d’Ottawa est simple : on s’est garés au{' '}
        <strong>parking P2</strong>, à cinq minutes à pied du terminal, très bien signalé. Et petit
        bonus qui change la matinée : grâce à une carte de crédit voyage, on a eu accès au{' '}
        <strong>salon de l’aéroport</strong>, où on a déjeuné gratuitement et tranquillement avant
        le décollage. On détaille cette stratégie de cartes plus bas.
      </p>

      <AffiliateCard
        eyebrow="Réserver vol + hôtel"
        accent="text-sky-700"
        title="Comparer vols, hôtels et transferts au même endroit"
        description="Garder une vue d’ensemble sur le budget avant de bloquer les premières nuits."
        affKey="stay22Hotel"
        ctaLabel="Comparer vols & hôtels"
        variant="primary"
      />

      {/* TRANSPORT */}
      <H2 id="transport">
        Se déplacer au Yucatán sans voiture : colectivo, bus ADO &amp; transferts
      </H2>
      <p>
        C’est le cœur de notre voyage, et le sujet le moins bien expliqué ailleurs. Bonne nouvelle :{' '}
        <strong>on n’a pas eu besoin de louer de voiture</strong>, et c’était plus reposant et plus
        économique.
      </p>

      <H3>Le colectivo, le transport local par excellence</H3>
      <p>
        Le <strong>colectivo</strong> est une fourgonnette partagée qui suit un trajet fixe (ex.
        Playa del Carmen–Tulum) et s’arrête à la demande. On paie en pesos comptant, on monte s’il y
        a de la place, on descend où on veut. Économique, fréquent, 100 % local.
      </p>
      <p>
        Notre première fois, c’était Akumal → Tulum, et le colectivo était bondé : on avait
        littéralement les genoux sous le menton. Mais c’est devenu notre moyen de transport favori.
        On paie en pesos comptant, on lève la main sur le bord de la route, on descend où on veut.
        Voici les prix <strong>réels</strong> qu’on a payés (pour deux personnes, mai 2026) :
      </p>
      <ul>
        <li>
          Akumal → Tulum : environ <strong>120 pesos</strong> (bondé) ; parfois 90–100 selon
          l’affluence
        </li>
        <li>
          Tulum → cenote Dos Ojos : <strong>90 pesos</strong>
        </li>
        <li>
          Cenote → Tulum : <strong>90 pesos</strong>
        </li>
        <li>
          Tuc-tuc jusqu’au Pueblo Akumal (dernier jour) : <strong>50 pesos</strong>
        </li>
      </ul>
      <p>
        Astuce vécue : garde toujours de la petite monnaie en pesos, et un peu de patience. Un
        matin, on a attendu le colectivo une bonne demi-heure sur un banc — le temps qu’un oiseau
        vise le dos de mon conjoint. Deux fois dans le voyage, d’ailleurs. Ça fait partie du charme.
      </p>

      <H3>Le bus ADO pour les longues distances</H3>
      <p>
        Pour les trajets plus longs, comme vers <strong>Valladolid</strong>, les bus{' '}
        <strong>ADO</strong> sont confortables, climatisés, ponctuels et bon marché.
      </p>
      <p>
        Pour rejoindre Valladolid, on a pris le <strong>bus ADO</strong>, et quel confort après les
        colectivos : sièges spacieux, climatisation, et même un film (Jurassic World en espagnol)
        sur le trajet. Nos prix réels : <strong>Tulum → Valladolid environ 42 $ pour deux</strong>,
        et
        <strong> Valladolid → aéroport de Cancún 69 $ pour deux</strong>. Le terminal ADO de
        Valladolid était à seulement 300 m de notre logement — pense-y en choisissant où dormir.
      </p>

      <div className="not-prose my-4 rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-4 text-sm text-amber-900">
        <p className="font-semibold">⚠️ Le piège des taxis à l’aéroport de Cancún</p>
        <p className="mt-1">
          À l’arrivée du bus, notre terminal (4) n’était pas celui de notre vol (2). Des chauffeurs
          de taxi insistent lourdement pour te « dépanner » — c’est une arnaque. Il suffit de
          marcher 2 minutes jusqu’à l’arrêt de la <strong>navette gratuite</strong> qui relie les
          terminaux. Ne te laisse pas presser.
        </p>
      </div>

      <H3>Le transfert privé depuis l’aéroport de Cancún</H3>
      <p>
        À l’arrivée, avec les bagages et la fatigue du vol, un{' '}
        <strong>transfert privé Cancún → Akumal</strong> est le plus simple. On avait réservé à
        l’avance : un van climatisé, un chauffeur qui attendait à la sortie, environ{' '}
        <strong>145 $</strong> pour le trajet. On a même pu demander un arrêt à un distributeur pour
        retirer nos premiers pesos en route. Après des heures d’avion, arriver directement à la
        porte de son logement sans négocier, ça vaut son prix.
      </p>

      <AffiliateCard
        eyebrow="Transfert aéroport"
        accent="text-emerald-700"
        icon={<Bus className="size-4" />}
        title="Réserver son transfert Cancún → Akumal à l’avance"
        description="Arriver sans stress après le vol, sans négocier un taxi à la sortie."
        affKey="stay22Transfert"
        variant="emerald"
      />

      {/* HÉBERGEMENT */}
      <H2 id="hebergement">
        Où dormir : hôtel les pieds dans l’eau à Akumal vs Airbnb à Valladolid
      </H2>
      <p>
        On a volontairement mélangé deux styles d’hébergement, et c’est ce qui a rendu le voyage
        riche.
      </p>

      <H3>Akumal : un hôtel calme directement sur la plage</H3>
      <Figure
        src="/images/destinations/mexique/hotel-delsolfrontbeach-akumal-mexique.avif"
        alt="Appartement Del Sol Front Beach sur la plage d’Akumal, terrasse et vue mer"
        caption="Notre appartement les pieds dans l’eau à Akumal : terrasse, hamac et vue sur la mer."
      />
      <p>
        À Akumal, on a choisi un <strong>hôtel tranquille, directement sur la plage</strong>. Se
        réveiller face à la mer, accéder à la baie tôt le matin avant l’affluence pour les tortues :
        ça change un séjour.
      </p>
      <p>
        On avait réservé un appartement coloré directement sur la plage :{' '}
        <strong>742 $ pour 5 nuits</strong>, soit un logement de 65 m² avec terrasse intérieure et
        hamac, salle de bain complète, cuisine complète, salle à manger avec vue sur la mer, et une
        terrasse privée pour les couchers de soleil. Se réveiller à 6 h 10 pour voir le soleil se
        lever depuis le lit, cuisiner ses fruits achetés au marché, faire la sieste dans le hamac
        aux heures les plus chaudes : c’est ce genre d’emplacement qui transforme un séjour. La
        cuisine équipée nous a aussi permis de manger local et pas cher tous les jours.
      </p>

      <AffiliateCard
        eyebrow="Hôtel de plage à Akumal"
        accent="text-sky-700"
        icon={<Palmtree className="size-4" />}
        title="Trouver un hébergement sur la plage d’Akumal"
        affKey="stay22Akumal"
        ctaLabel="Voir les hôtels à Akumal"
        variant="primary"
      />

      <H3>Valladolid : un Airbnb au cœur de la ville coloniale</H3>
      <Figure
        src="/images/destinations/mexique/marche-maison-colores-valadolid-yucatan.avif"
        alt="Marché et maisons colorées de Valladolid, Yucatán, Mexique"
        caption="Les rues colorées et le marché municipal de Valladolid, loin de la côte touristique."
      />
      <p>
        À <strong>Valladolid</strong>, on a opté pour un <strong>Airbnb</strong> pour vivre la ville
        comme un habitant : marcher le soir quand les groupes sont repartis, être proche des cenotes
        et de la place centrale.
      </p>
      <p>
        À Valladolid, on a logé à la Casa Daniel : <strong>137 $ pour 2 nuits</strong>. Une grande
        chambre climatisée avec salle de bain, cuisine et une piscine commune partagée entre cinq
        chambres — un vrai bonheur après une journée à 36 °C. Très propre, calme, et idéalement
        situé : à 300 m du terminal ADO, en face d’une <em>panadería</em> (boulangerie), à 400 m du
        restaurant qu’on a adoré et à 700 m du cenote Zací en plein centre-ville. Le soir, une fois
        les groupes d’excursion repartis, Valladolid devient magique : rues colorées, places où les
        oiseaux chantent fort, cathédrale illuminée. C’est là qu’on a vraiment senti le Yucatán
        authentique, loin de la côte touristique.
      </p>

      <AffiliateCard
        eyebrow="Où dormir à Valladolid"
        accent="text-rose-700"
        title="Trouver un hébergement dans le centre de Valladolid"
        description="Une nuit sur place pour vivre la ville coloniale le soir, une fois les excursionnistes repartis."
        affKey="stay22Valladolid"
        ctaLabel="Voir les logements à Valladolid"
        variant="primary"
      />

      {/* ITINÉRAIRE */}
      <H2 id="itineraire">Notre itinéraire jour par jour</H2>
      <p>
        Voici notre déroulé réel sur 8 jours (5 nuits à Akumal + 2 à Valladolid), à adapter selon la
        durée de ton séjour. Il équilibre plage, cenotes, ruines et vie de village.
      </p>
      <ul>
        <li>
          <strong>Jour 1 – Arrivée &amp; Akumal.</strong> Vol Ottawa → Cancún, transfert privé vers
          Akumal, installation dans l’appartement sur la plage, première balade jusqu’à la pointe
          d’Akumal (on a croisé des iguanes) et petite épicerie locale.
        </li>
        <li>
          <strong>Jour 2 – Tulum.</strong> Premier colectivo, dîner à la Taqueria Honorio, ruines
          mayas de Tulum en bord de mer et balade jusqu’à la lagune (papillons, réserve naturelle).
        </li>
        <li>
          <strong>Jour 3 – Cenote Yal-kú &amp; détente.</strong> Cenote à 800 m à pied du logement,
          snorkeling avec de beaux poissons, après-midi hamac. Le soir, balade sur la côte : les
          <em> bufones</em> d’Akumal (geysers), un coati croisé sur le chemin.
        </li>
        <li>
          <strong>Jour 4 – Nager avec les tortues.</strong> À la playa d’Akumal, snorkeling guidé
          (tortues, poissons, coraux, raies).
        </li>
        <li>
          <strong>Jour 5 – Cenote Dos Ojos / Tak bi ha.</strong> Notre coup de cœur : une grotte
          souterraine avec stalactites, chauves-souris et eaux turquoise irréelles.
        </li>
        <li>
          <strong>Jour 6 – Route vers Valladolid.</strong> Tuc-tuc + colectivo + bus ADO.
          L’après-midi : marché municipal, dîner au Loncheria Alich, cenote Zací en ville, couvent
          San Bernardino.
        </li>
        <li>
          <strong>Jour 7 – Ek’ Balam.</strong> Ruines mayas d’Ek’ Balam (32 m de haut, superbes),
          retour par le marché, après-midi piscine, marquesitas sur la place le soir.
        </li>
        <li>
          <strong>Jour 8 – Retour.</strong> Bus ADO Valladolid → aéroport de Cancún, vol vers
          Ottawa.
        </li>
      </ul>
      <p>
        Ce qu’on referait différemment : peut-être une nuit de plus à Valladolid, qui méritait qu’on
        s’y attarde. Et on n’a pas fait Chichén Itzá cette fois — Ek’ Balam, moins couru, nous a
        comblés.
      </p>
      <Figure
        src="/images/destinations/mexique/valladolid-yucatan-mexique.avif"
        alt="Valladolid, ville coloniale du Yucatán : cathédrale, rues colorées et places"
        caption="Valladolid, ville coloniale magique le soir, une fois les groupes repartis."
      />
      <Figure
        src="/images/destinations/mexique/cenote-zaci-yucatan-mexique.avif"
        alt="Cenote Zací en plein centre de Valladolid, Yucatán, Mexique"
        caption="Le cenote Zací, en plein cœur de Valladolid, à 700 m de notre logement."
      />

      {/* ARGENT */}
      <H2 id="argent">Argent, cartes &amp; frais : payer malin au Mexique</H2>
      <p>
        La plupart des cartes de crédit canadiennes ajoutent environ{' '}
        <strong>2,5 % de frais de conversion</strong> sur chaque achat à l’étranger. Notre approche
        :
      </p>
      <ul>
        <li>
          une <strong>carte sans frais de change</strong> pour les dépenses quotidiennes ;
        </li>
        <li>
          une <strong>carte à points</strong> pour les gros achats (vols, hôtels) ;
        </li>
        <li>
          du <strong>comptant en pesos</strong> pour les colectivos et petits commerces ;
        </li>
        <li>
          toujours <strong>payer en pesos</strong> (jamais en dollars) au terminal.
        </li>
      </ul>
      <p>
        Voici précisément comment on a géré l’argent, et ça nous a fait économiser à chaque étape :
      </p>
      <ul>
        <li>
          <strong>Retraits sans frais avec une carte EQ Bank.</strong> Aux distributeurs Banamex
          (dans le Super Aki à Tulum, ou en ville), les frais locaux étaient minimes — de l’ordre de
          <strong> 38 pesos (environ 2,50 $)</strong> — et notre carte EQ ne charge pas de frais de
          conversion. La leçon apprise sur place :{' '}
          <strong>évite certaines banques qui prennent de gros frais de change</strong> ; on a
          comparé et changé de distributeur en conséquence.
        </li>
        <li>
          <strong>Le vol payé avec une carte voyage.</strong> On a réglé les billets avec une carte
          BMO VIPorter World Elite, qui donnait sièges, bagage en soute et bagage à main inclus — un
          détail qui nous a d’ailleurs sauvés au retour (voir plus bas).
        </li>
        <li>
          <strong>Le salon d’aéroport gratuit</strong> grâce à une carte CIBC Aventura : petit
          déjeuner et buffet tranquilles à Ottawa comme à Cancún, un vrai confort.
        </li>
        <li>
          <strong>Du comptant en pesos</strong> pour les colectivos, les marchés et les petits
          commerces, qui ne prennent pas la carte.
        </li>
      </ul>
      <p>
        Le combo gagnant, pour nous : une carte <strong>sans frais de change</strong> (type EQ) pour
        les retraits et le quotidien, et une carte <strong>à points/avantages voyage</strong> pour
        les gros achats et les à-côtés (salons, bagages).
      </p>
      <p className="text-sm text-gray-500">
        Les conditions et primes des cartes changent souvent : vérifie les détails à jour avant
        toute demande. Ceci n’est pas un conseil financier, juste le partage de ce qu’on a utilisé.
      </p>

      {/* CONNEXION */}
      <H2 id="connexion">Rester connecté au Mexique</H2>
      <p>
        Pour les cartes, les colectivos et les réservations de dernière minute, être connecté change
        tout. Une <strong>eSIM</strong> évite les frais d’itinérance et fonctionne dès l’arrivée. On
        détaille tout dans notre{' '}
        <Link href="/blog/vpn-esim-voyage">guide eSIM &amp; VPN voyage</Link>.
      </p>
      <div className="not-prose mt-3">
        <AffiliateButton affKey="airalo" label="Voir les eSIM pour le Mexique" variant="primary" />
      </div>

      {/* ACTIVITÉS */}
      <H2 id="activites">Cenotes, tortues &amp; activités à ne pas manquer</H2>
      <Figure
        src="/images/destinations/mexique/cenote-taak-bi-ha-mexique.avif"
        alt="Cenote Taak Bi Ha, grotte souterraine aux eaux turquoise, Riviera Maya, Mexique"
        caption="Le cenote Taak Bi Ha (Dos Ojos), notre coup de cœur : une grotte souterraine irréelle."
      />
      <p>Le Yucatán, c’est bien plus que la plage. Nos incontournables vécus :</p>
      <ul>
        <li>
          <strong>La baie d’Akumal</strong> pour nager avec les tortues (accès réglementé, tôt le
          matin) ;
        </li>
        <li>
          <strong>Les cenotes</strong> autour de Tulum et Valladolid ;
        </li>
        <li>
          <strong>Les ruines de Tulum</strong>, perchées au-dessus de la mer ;
        </li>
        <li>
          <strong>Chichén Itzá</strong>, depuis Valladolid, à visiter tôt.
        </li>
      </ul>
      <p>
        <strong>Nager avec les tortues à Akumal</strong> a été un moment fort. À la playa, on nous a
        proposé deux formules : tortues seules, ou tortues + poissons + coraux + raies. On a pris la
        seconde (<strong>1300 pesos pour deux</strong>, gilets de sauvetage fournis, guide sympa).
        Résultat : des tortues petites et grandes, en train de brouter au fond puis de remonter
        respirer, dont deux juste devant le visage. Conseil vécu : porte un{' '}
        <strong>t-shirt UV à capuche</strong> — en snorkeling, la tête et la nuque prennent un
        soleil terrible. À noter, c’est une plage très fréquentée, pas un coin tranquille.
      </p>
      <p>
        Mais nos vrais coups de cœur, ce sont les <strong>cenotes</strong>, jamais touchés par les
        sargasses et magiques :
      </p>
      <ul>
        <li>
          <strong>Yal-kú</strong> (à 800 m à pied d’Akumal) : une lagune paisible, parfaite pour un
          premier snorkeling en douceur.
        </li>
        <li>
          <strong>Dos Ojos / Tak bi ha</strong> : notre préféré. Une grotte souterraine avec
          stalactites et stalagmites, chauves-souris, crevasses, eaux bleu transparent sur fond
          noir. <strong>700 pesos pour deux</strong> avec gilets — indispensables pour flotter
          tranquillement.
        </li>
      </ul>
      <p>
        Astuce transport vécue : en mai (hors haute saison), il n’y avait pas de navette pour
        rejoindre certains cenotes depuis la route. On a marché, puis on s’est fait déposer par des
        locaux adorables à l’aller comme au retour. En haute saison, des navettes existent.
      </p>
      <Figure
        src="/images/destinations/mexique/cenote-yalku-akumal-mexique.avif"
        alt="Cenote Yal-kú à Akumal, lagune d’eau claire pour le snorkeling, Mexique"
        caption="Le cenote Yal-kú, à quelques minutes à pied d’Akumal."
      />
      <p>
        Et pour les ruines : on a adoré <strong>Ek’ Balam</strong> près de Valladolid (32 m de haut,
        <strong> 1418 pesos pour deux</strong>, gros arbres, iguanes, oiseaux), moins courue que
        Chichén Itzá qu’on a volontairement laissée de côté.
      </p>
      <Figure
        src="/images/destinations/mexique/temple-maya-ek-balam-yucatan.avif"
        alt="Temple maya d’Ek’ Balam près de Valladolid, Yucatán, Mexique"
        caption="Les ruines mayas d’Ek’ Balam : hautes, impressionnantes et bien moins fréquentées que Chichén Itzá."
      />

      <AffiliateCard
        eyebrow="Excursions & cenotes"
        accent="text-amber-700"
        title="Réserver cenotes, Chichén Itzá ou l’observation des tortues"
        affKey="stay22Activites"
        variant="amber"
      />

      {/* MANGER */}
      <H2 id="manger">Où manger : nos adresses vécues</H2>
      <Figure
        src="/images/destinations/mexique/restaurant-tulum-mexique.avif"
        alt="Plats mexicains à la Taqueria Honorio à Tulum : cochinita pibil et poc-chuc"
        caption="Taqueria Honorio à Tulum : cochinita pibil, poc-chuc et jus frais, sans touristes."
      />
      <p>
        La cuisine du Yucatán est une découverte : cochinita pibil, tacos, marquesitas, jus frais.
        Manger local, c’est voyager moins cher et plus vrai.
      </p>
      <p>Nos adresses réelles, testées et approuvées :</p>
      <ul>
        <li>
          <strong>Taqueria Honorio (Tulum)</strong> : on était les seuls touristes, et c’était
          excellent. <em>Cochinita pibil</em> (porc effiloché mariné à l’achiote) et{' '}
          <em>poc-chuc</em> (porc grillé mariné à l’orange), avec oignons marinés et tortillas.
          Environ 130 pesos le plat, 35 pesos la boisson (jus concombre-lime, horchata).
        </li>
        <li>
          <strong>Loncheria Alich (Valladolid)</strong> : notre restaurant préféré du voyage. On y
          est retournés. À goûter : les <em>salbutes</em> et <em>panuchos</em> (tortillas, poulet
          effiloché, oignons marinés, purée de haricots), le <em>motuleño</em> local, jus de melon
          et de tamarin. Excellent et service impeccable.
        </li>
        <li>
          <strong>Les marchés municipaux</strong> (Tulum, Valladolid) pour les fruits tropicaux :
          <em> ciruela</em>, <em>guayaba</em>, <em>plátano morado</em>, mangues, ananas — de quoi
          cuisiner soi-même pour presque rien.
        </li>
        <li>
          <strong>À ne pas manquer sur le pouce</strong> : les <em>marquesitas</em> (gaufres
          croustillantes garnies, dulce de leche ou Nutella-fromage) et une glace au <em>mamey</em>,
          ce fruit au goût de patate douce et cannelle.
        </li>
      </ul>
      <p>
        Manger local a été l’un de nos plus grands plaisirs — et l’un des postes les moins chers du
        voyage, surtout avec un logement à cuisine équipée.
      </p>
      <Figure
        src="/images/destinations/mexique/restaurant-valladolid-pas-chere.avif"
        alt="Plats typiques abordables au Loncheria Alich à Valladolid, Yucatán"
        caption="Loncheria Alich à Valladolid : salbutes, panuchos et motuleño, excellents et pas chers."
      />

      {/* ESPAGNOL */}
      <H2 id="espagnol">Quelques mots d’espagnol pour voyager mieux</H2>
      <p>
        Un minimum d’espagnol change l’accueil qu’on te réserve. Quelques mots de base suffisent à
        créer un lien. Avant de partir, tu peux pratiquer les essentiels du voyageur avec notre
        application dédiée.
      </p>
      <p>
        On l’a vécu concrètement : au moment de partir nager avec les tortues, ne pas parler
        espagnol nous a mis mal à l’aise — un petit moment de solitude où on aurait tellement aimé
        comprendre et échanger quelques mots avec le guide. Rien de grave, tout le monde a été
        patient, mais on s’est promis d’apprendre les bases pour la prochaine fois. <em>Calor</em>{' '}
        (chaud), <em>gracias</em>, savoir demander un prix ou commander : ça change vraiment la
        connexion avec les gens. Avant de partir, tu peux pratiquer les essentiels du voyageur avec
        notre application dédiée.
      </p>
      <p>{/* [LIEN vers ton app d'espagnol pratique — à insérer ici] */}</p>

      {/* RÉCAP — maillage interne */}
      <H2>
        Continuer avec <BrandName />
      </H2>
      <p>Notre série pour organiser ton voyage dans le Sud toi-même :</p>
      <ul>
        <li>
          🧭{' '}
          <Link href="/blog/reserver-voyage-sud-soi-meme">
            Réserver son voyage dans le Sud soi-même
          </Link>
        </li>
        <li>
          💳 <Link href="/blog/argent-cartes-voyage">Payer malin en voyage sans frais</Link>
        </li>
        <li>
          📶 <Link href="/blog/vpn-esim-voyage">eSIM &amp; VPN : rester connecté à l’étranger</Link>
        </li>
        <li>
          🧭 <Link href="/planificateur">Planifier ton itinéraire</Link>
        </li>
      </ul>
    </DestinationArticleTemplate>
  );
}
