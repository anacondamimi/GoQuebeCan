import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Waves, Hotel as Star, Info } from 'lucide-react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import { buildMetadata2025 } from '@/lib/seo/buildMetadata2025';
import { buildDestinationLd } from '@/lib/seo/buildDestinationLd';
import { buildBreadcrumbLd } from '@/lib/seo/buildBreadcrumbLd';
import { buildHowToLd } from '@/lib/seo/buildHowToLd';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';

/* =========================
 * SEO 2025 – Metadata & JSON-LD
 * ========================= */

export const metadata = buildMetadata2025({
  title: 'Parcs aquatiques préférés des familles (Québec & Ontario) | GoQuébeCAN 2025',
  description:
    'Parcs aquatiques au Québec et en Ontario pour les familles : Valcartier, Bromont et Calypso. Idées week-end, hôtels proches, conseils pratiques et checklist pour une journée vraiment rafraîchissante avec les enfants.',
  canonical: '/blog/parc-aquatique',
  image: '/images/destinations/calypso.avif',
  keywords: [
    'parc aquatique',
    'parc aquatique Québec',
    'parc aquatique Ontario',
    'Valcartier',
    'Bromont',
    'Calypso',
    'glissades d’eau familiales',
    'week-end en famille',
    'idées vacances Canada',
    'hôtel près d’un parc aquatique',
  ],
  // ✅ pas de author ici : ce champ n'existe pas dans buildMetadata2025
});

const breadcrumbLd = buildBreadcrumbLd([
  { name: 'Accueil', item: '/' },
  { name: 'Blog', item: '/blog' },
  { name: 'Parcs aquatiques Québec & Ontario', item: '/blog/parc-aquatique' },
]);

const destinationLd = buildDestinationLd({
  name: 'Parcs aquatiques du Québec et de l’Ontario',
  description:
    'Sélection GoQuébeCAN 2025 : Village Vacances Valcartier, Bromont montagne d’expériences et Calypso Waterpark, trois parcs aquatiques adaptés aux familles, avec hébergements à proximité et conseils pratiques.',
  image: '/images/destinations/calypso.avif',
  url: '/blog/parc-aquatique',
  latitude: 45.5017, // ✅ valeurs fictives obligatoires selon ta signature
  longitude: -73.5673,
  containedPlaces: ['Québec', 'Ontario'], // ✅ tableau string[]
});

const howToLd = buildHowToLd({
  name: 'Préparer une journée au parc aquatique avec les enfants',
  steps: [
    {
      name: 'Choisir le bon parc',
      text: 'Sélectionnez selon l’âge et la région (Valcartier, Bromont, Calypso).',
    },
    {
      name: 'Planifier le trajet',
      text: 'Vérifiez la météo et préparez votre planificateur GoQuébeCAN.',
    },
    { name: 'Préparer les sacs', text: 'Apportez crème solaire, serviettes, maillots et gourdes.' },
    {
      name: 'Réserver un hébergement',
      text: 'Choisissez un hôtel familial proche du parc, avec déjeuner inclus.',
    },
    { name: 'Profiter sur place', text: 'Alternez glissades, pauses à l’ombre et collations.' },
    {
      name: 'Clore la journée',
      text: 'Terminez par une visite d’un producteur local ou une activité calme.',
    },
  ],
});

/** ✅ CollectionPage JSON-LD */
const collectionPageLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Parcs aquatiques du Québec et de l’Ontario',
  description:
    'Idées de parcs aquatiques pour les familles au Québec et en Ontario, avec hôtels proches, astuces de parents et checklist pour une journée réussie.',
  url: '/blog/parc-aquatique',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Village Vacances Valcartier',
        url: '/blog/parc-aquatique#valcartier',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Bromont, montagne d’expériences',
        url: '/blog/parc-aquatique#bromont',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Calypso Waterpark',
        url: '/blog/parc-aquatique#calypso',
      },
    ],
  },
};

/* =========================
 * Types & Données
 * ========================= */

type HotelInfo = {
  name: string;
  link: string;
  distance: string;
  price: string;
  poi: string;
  image?: string;
  rating?: string;
};

type WaterPark = {
  slug: string;
  name: string;
  location: string;
  tagline: string;
  image: string;
  intro: React.ReactNode;
  practical: React.ReactNode;
  hotels: HotelInfo[];
};

const parks: WaterPark[] = [
  {
    slug: 'valcartier',
    name: 'Village Vacances Valcartier',
    location: 'Québec',
    tagline:
      'Glissades géantes, rivière thématique et Bora Parc intérieur : un classique familial 4 saisons, tout près de Québec.',
    image: '/images/destinations/parc-valcartier.avif',
    intro: (
      <>
        <p>
          Si vous cherchez un parc aquatique qui fait briller les yeux des tout-petits tout en
          amusant les ados, <strong>Village Vacances Valcartier</strong> est un choix sûr. C’est un
          grand classique pour bien des familles québécoises : on y retrouve des glissades d’eau
          pour tous les niveaux, une atmosphère de vacances et la possibilité d’alterner entre
          sections plus calmes et zones sensations fortes.
        </p>
        <p className="mt-2">
          L’un des gros avantages, c’est le <em>Bora Parc intérieur</em> : en cas de météo
          capricieuse, la journée est sauvée. On peut vivre une expérience de parc aquatique même
          lorsqu’il pleut ou qu’il fait plus frais, ce qui en fait une destination très flexible
          pour un week-end en famille près de Québec. Pour garder de l’énergie, pensez à{' '}
          <strong>structurer la journée</strong> : matin glissades, milieu de journée zone plus
          tranquille, fin d’après-midi rivière thématique ou Lazy River.
        </p>
        <p className="mt-2">
          Sur le chemin du retour, si votre famille aime les découvertes gourmandes, prenez le temps
          de <strong>visiter un producteur local</strong> dans la région de Québec. Sur notre page{' '}
          <Link href="/producteurs" className="text-indigo-600 underline-offset-2 hover:underline">
            Découvrir les producteurs québécois
          </Link>
          , vous trouverez des idées pour prolonger l’ambiance vacances autour d’une bonne glace
          artisanale, d’un fromage local ou d’une petite microbrasserie pour les parents.
        </p>
      </>
    ),
    practical: (
      <>
        <p className="mt-2">
          <strong>Quand y aller ?</strong> Juillet-août pour l’ambiance estivale, septembre pour
          moins d’affluence. Arrivez tôt (avant l’ouverture) pour déposer vos serviettes dans un
          coin ombragé et éviter la cohue aux casiers. Si vous venez avec de jeunes enfants, repérez
          rapidement une zone “safe” où revenir en cas de fatigue ou de petite crise : un coin
          d’ombre, une table et un point d’eau à proximité.
        </p>
        <p className="mt-2">
          <strong>Logistique famille :</strong> pensez à séparer les sacs{' '}
          <em>« sec » / « mouillé »</em>, à garder la crème solaire accessible et à prêter attention
          aux pauses hydratation. Pour un trajet plus zen avec les enfants (siège auto, pauses jeux,
          snacks), jetez un œil à nos conseils dédiés dans{' '}
          <Link
            href="/blog/voyage-voiture"
            className="text-indigo-600 underline-offset-2 hover:underline"
          >
            Voyage en voiture
          </Link>
          . Et si vous partez plusieurs jours, notre{' '}
          <Link
            href="/planificateur"
            className="text-indigo-600 underline-offset-2 hover:underline"
          >
            planificateur d’itinéraire
          </Link>{' '}
          vous aide à organiser les étapes, à estimer les temps de route et à enregistrer vos notes.
        </p>
        <p className="mt-2">
          <strong>Budget & repas :</strong> l’option la plus efficace reste souvent un mix{' '}
          <em>pique-nique + repas rapide sur place</em>. Apportez une gourde par personne et
          quelques collations généreuses (fruits, noix, barres protéinées) pour tenir jusqu’au repas
          sans craquer à chaque kiosque. Si vous combinez avec une nuit d’hôtel, comparez les
          hébergements avec déjeuner inclus : ça simplifie énormément le départ du matin avec des
          enfants encore un peu endormis.
        </p>
      </>
    ),
    hotels: [
      {
        name: 'Hôtel Valcartier (sur site)',
        link: 'https://www.valcartier.com/fr/boutique-en-ligne/hebergement/',
        distance: 'Sur place',
        price: 'Dès 159 $/nuit',
        poi: 'Accès direct au parc aquatique, chambres familiales communicantes',
        image: '/images/destinations/hotels/valcartier.avif',
        rating: '4★',
      },
      {
        name: 'Le Manoir du Lac Delage',
        link: 'https://www.booking.com/hotel/ca/manoir-du-lac-de-lage-lac-delage-quebec.fr.html?aid=2276516&label=msn-rVoOgT_nB8tmabcidK571Q-80127049560063%3Atikwd-80127307805998%3Aloc-4064%3Aneo%3Amte%3Alp124427%3Adec%3Aqsmanoir%20du%20lac%20booking&sid=8871fcaf95f2b4031bb564118f7b26e1&dest_id=-574203&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1759180943&srpvid=5f4c9645c9960078&type=total&ucfs=1&',
        distance: '10 km',
        price: 'Dès 189 $/nuit',
        poi: 'Vue sur le lac, spa et ambiance très zen après une journée de glissades',
        image: '/images/destinations/hotels/manoir-delage.avif',
        rating: '4★',
      },
      {
        name: 'Auberge Valcartier',
        link: 'https://www.booking.com/hotel/ca/auberge-valcartier.fr.html?aid=2276422&label=msn-iB3esQzOQBCB%2AbWBrLN7Cg-79989606763414%3Atikwd-79989858727355%3Aloc-4064%3Aneo%3Amte%3Alp124427%3Adec%3Aqsauberge%20valcartier%20booking&sid=8871fcaf95f2b4031bb564118f7b26e1&dest_id=-575242&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1759180752&srpvid=539695e014a0003a&type=total&ucfs=1&',
        distance: 'À proximité',
        price: 'Dès 95 $/nuit',
        poi: 'Option économique pratique pour familles qui veulent surtout profiter du parc aquatique',
        image: '/images/destinations/hotels/auberge-valcartier.avif',
      },
    ],
  },
  {
    slug: 'bromont',
    name: "Bromont, montagne d'expériences",
    location: 'Québec',
    tagline:
      'Parc aquatique en montagne, vues magnifiques et air pur : une escapade qui fait du bien à tout le monde.',
    image: '/images/destinations/glissades-bromont.avif',
    intro: (
      <>
        <p>
          À <strong>Bromont</strong>, on ressent tout de suite l’ambiance de montagne douce : de
          belles vues, de l’air frais et un rythme un peu plus calme que dans certains grands parcs.
          Le parc aquatique de Bromont est idéal si vous aimez combiner glissades d’eau, nature et
          balades en fin de journée. C’est une excellente idée pour un week-end en famille dans les
          Cantons-de-l’Est.
        </p>
        <p className="mt-2">
          Les parents apprécient souvent le fait de pouvoir passer d’un bassin à l’autre sans
          feeling de foule constante. On peut consacrer la matinée aux glissades plus intenses avec
          les ados, puis lever le pied en après-midi avec une chaise longue face aux collines. Et si
          vous aimez camper l’été, notre{' '}
          <Link
            href="/blog/voyage-camping"
            className="text-indigo-600 underline-offset-2 hover:underline"
          >
            Guide camping 2025
          </Link>{' '}
          vous aide à ne rien oublier : abri solaire, serviettes à séchage rapide, trousse
          anti-bobos… tout ce qu’il faut pour un séjour léger mais confortable.
        </p>
        <p className="mt-2">
          Avant de réserver l’hébergement, pensez à regarder nos conseils sur les{' '}
          <Link
            href="/blog/voyage-hotel"
            className="text-indigo-600 underline-offset-2 hover:underline"
          >
            indispensables pour un séjour à l’hôtel avec des enfants
          </Link>
          . Lit bébé, micro-ondes, piscine intérieure ou extérieure : ce sont ces petits détails qui
          font une grande différence quand on revient d’un parc aquatique avec des enfants bien
          fatigués.
        </p>
      </>
    ),
    practical: (
      <>
        <p className="mt-2">
          <strong>Astuce parcours :</strong> commencez par les zones enfants pour les rassurer et
          leur laisser apprivoiser l’eau et les glissades. Ensuite, montez progressivement en
          intensité avec les plus grandes glissades, en fonction de l’énergie du jour. Pour réduire
          le temps d’attente, visez parfois le début d’après-midi pour les attractions « vedettes »
          pendant que beaucoup de familles sont encore à table.
        </p>
        <p className="mt-2">
          <strong>Mémoires de famille :</strong> choisissez à l’avance 2 ou 3 moments où vous voulez
          vraiment prendre des photos : à l’entrée, depuis un point de vue en hauteur et en fin de
          journée tous ensemble. Trop de photos finit par fatiguer tout le monde ; quelques clichés
          bien choisis suffisent pour garder un souvenir précieux de cette sortie.
        </p>
        <p className="mt-2">
          <strong>Idée bonus :</strong> après le parc aquatique, arrêtez-vous dans le village pour
          un gelato, un café ou une pâtisserie. Et si vous aimez les rencontres authentiques,{' '}
          <Link href="/producteurs" className="text-indigo-600 underline-offset-2 hover:underline">
            découvrez un producteur local
          </Link>{' '}
          dans la région de Bromont (fromagerie, vignoble ou microbrasserie artisanale) : ces
          moments calmes, simples et gourmands restent souvent parmi les plus beaux souvenirs des
          enfants.
        </p>
      </>
    ),
    hotels: [
      {
        name: 'Hôtel Château-Bromont',
        link: 'https://www.booking.com/hotel/ca/chateau-bromont-bromont.fr.html?label=msn-QQLmMKuP3Viw7ZGzqQkj4g-80058325963930%3Atikwd-80058585399512%3Aloc-4064%3Aneo%3Amte%3Alp124427%3Adec%3Aqscondo+ch%C3%A2teau+bromont&sid=8871fcaf95f2b4031bb564118f7b26e1&aid=2276422&ucfs=1&arphpl=1&dest_id=900048497&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=0&req_children=0&hpos=2&hapos=2&sr_order=popularity&srpvid=5396991d94460345&srepoch=1759182402&from_sustainable_property_sr=1&from=searchresults',
        distance: '2 km',
        price: 'Dès 199 $/nuit',
        poi: 'Piscine, spa et vue sur la montagne ; parfait pour relâcher la pression en famille',
        image: '/images/destinations/hotels/valleabromont.avif',
        rating: '4★',
      },
      {
        name: 'Condos Château-Bromont',
        link: 'https://www.booking.com/hotel/ca/condos-chateau-bromont.fr.html?aid=2276422&label=msn-QQLmMKuP3Viw7ZGzqQkj4g-80058325963930%3Atikwd-80058585399512%3Aloc-4064%3Aneo%3Amte%3Alp124427%3Adec%3Aqscondo%20ch%C3%A2teau%20bromont&sid=8871fcaf95f2b4031bb564118f7b26e1&dest_id=900048497&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1759181976&srpvid=ce3f984be2c1046a&type=total&ucfs=1&',
        distance: '2,3 km',
        price: 'Dès 170 $/nuit',
        poi: 'Cuisine équipée, idéal pour 3–5 personnes et les familles qui aiment être autonomes',
        image: '/images/destinations/hotels/appartementbromont.avif',
      },
      {
        name: 'Le 204 Champlain',
        link: 'https://www.booking.com/hotel/ca/le-204-champlain-bromont.html',
        distance: '1,5 km',
        price: 'Dès 160 $/nuit',
        poi: 'Appartement très bien noté, pratique pour un week-end actif dans les Cantons-de-l’Est',
        image: '/images/destinations/hotels/204-champlain.avif',
        rating: '9.7/10',
      },
    ],
  },
  {
    slug: 'calypso',
    name: 'Calypso Waterpark',
    location: 'Ontario',
    tagline:
      'Le plus grand parc aquatique du Canada, à Limoges, près d’Ottawa-Gatineau : ambiance vacances garantie.',
    image: '/images/destinations/calypso.avif',
    intro: (
      <>
        <p>
          <strong>Calypso Waterpark</strong>, c’est le grand parc aquatique qui fait rêver bien des
          familles du Québec et de l’Ontario. Immenses glissades, Lazy River pour souffler, grandes
          zones pour enfants, thématiques colorées… on se sent vraiment en vacances, même si l’on
          vient juste pour un long week-end.
        </p>
        <p className="mt-2">
          Si vous partez de la région de Montréal, de la Montérégie ou de Québec, Calypso est une
          superbe option pour un <strong>week-end en famille en Ontario</strong>. Avant de partir,
          prenez quelques minutes pour regarder votre parcours avec notre{' '}
          <Link
            href="/planificateur"
            className="text-indigo-600 underline-offset-2 hover:underline"
          >
            planificateur d’itinéraire
          </Link>
          : vous pourrez y caler les pauses, repérer une aire de jeux sur la route et prévoir les
          bouchons possibles autour d’Ottawa.
        </p>
        <p className="mt-2">
          Si vous voyagez en véhicule électrique, nos conseils dans{' '}
          <Link
            href="/blog/voyage-voiture"
            className="text-indigo-600 underline-offset-2 hover:underline"
          >
            Voyage en voiture
          </Link>{' '}
          vous aideront à anticiper les arrêts recharge. Calypso est une destination intense : mieux
          vaut arriver reposés, bien organisés et repartir sans stress de batterie ou d’horaire.
        </p>
      </>
    ),
    practical: (
      <>
        <p className="mt-2">
          <strong>Organisation maline :</strong> préparez deux sacs distincts : un sac « sec » avec
          les serviettes propres, vêtements de rechange, crème solaire et un sac « mouillé » pour
          les maillots et serviettes trempés en fin de journée. Ajoutez une petite trousse premiers
          soins (pansements, sérum physio, compresse froide instantanée) ; ce sont des détails qui
          évitent bien des tracas.
        </p>
        <p className="mt-2">
          Avec les ados amateurs de sensations fortes, fixez un point de ralliement clair (une
          cabane, un kiosque, un coin d’ombre) et des horaires précis. Calypso étant vaste, cela
          rassure tout le monde. Pour les repas, alternez menu pique-nique et kiosques sur place :
          cela permet de limiter les coûts tout en profitant de l’ambiance du parc.
        </p>
        <p className="mt-2">
          <strong>Souvenirs qui comptent :</strong> une courte vidéo de 15 secondes à la sortie de
          la Lazy River, un selfie complice dans une file d’attente qui semble interminable, un
          moment calme tous ensemble à la fin de la journée. Ensuite, à la maison, prolongez
          l’inspiration en regardant quelques{' '}
          <Link href="/videos" className="text-indigo-600 underline-offset-2 hover:underline">
            vidéos coups de cœur du Québec
          </Link>{' '}
          et en notant dans le{' '}
          <Link
            href="/planificateur"
            className="text-indigo-600 underline-offset-2 hover:underline"
          >
            planificateur
          </Link>{' '}
          deux idées d’escapades pour la prochaine saison.
        </p>
      </>
    ),
    hotels: [
      {
        name: 'Microtel Inn & Suites Casselman',
        link: 'https://www.booking.com/hotel/ca/microtel-casselman.fr.html?label=gen173nr-10CAsoJ0IMbW90ZWwtYmlkZWF1SDNYBGgniAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuAKLwsPIBsACAdICJDI5MGQ0MTEwLWUyMTctNDMxOC05ODA3LTI0YWFiODQzMWE5Y9gCAeACAQ&sid=25da503d934a1bfc72a56a0219f8fa90&aid=304142&ucfs=1&checkin=2026-04-08&checkout=2026-04-09&dest_id=-570760&dest_type=city&group_adults=2&no_rooms=1&group_children=0&srpvid=e8bfd62a3792e42fa8ed14ef648bf7f7&srepoch=1762713979&matching_block_id=150597905_94608288_2_1_0&atlas_src=sr_iw_title',
        distance: '15 km',
        price: 'Dès 159 $/nuit',
        poi: 'Déjeuner inclus et accès pratique à l’autoroute 417',
        image: '/images/destinations/hotels/microtel-casselman.avif',
      },
      {
        name: 'Holiday Inn Express Ottawa East – Orléans',
        link: 'https://www.booking.com/hotel/ca/holiday-inn-select-suites.fr.html?aid=304142&label=gen173nr-10CAsoJ0IMbW90ZWwtYmlkZWF1SDNYBGgniAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuAKLwsPIBsACAdICJDI5MGQ0MTEwLWUyMTctNDMxOC05ODA3LTI0YWFiODQzMWE5Y9gCAeACAQ&sid=25da503d934a1bfc72a56a0219f8fa90&all_sr_blocks=2623619_95150008_2_42_0&checkin=2026-04-08&checkout=2026-04-09&dest_id=-570760&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=4&highlighted_blocks=2623619_95150008_2_42_0&hpos=4&matching_block_id=2623619_95150008_2_42_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=2623619_95150008_2_42_0__20300&srepoch=1762714199&srpvid=e8bfd62a3792e42fa8ed14ef648bf7f7&type=total&ucfs=1&',
        distance: '30 km',
        price: 'Dès 169 $/nuit',
        poi: 'Piscine intérieure, déjeuner inclus, quartier familial d’Orléans',
        image: '/images/destinations/hotels/holidayinn-ottawa.avif',
        rating: '8.7/10',
      },
      {
        name: 'AC Hotel by Marriott Ottawa Downtown',
        link: 'https://www.booking.com/hotel/ca/ac-by-marriott-ottawa-downtown.fr.html?aid=304142&label=gen173nr-10CAsoJ0IMbW90ZWwtYmlkZWF1SDNYBGgniAEBmAEzuAEXyAEM2AED6AEB-AEBiAIBqAIBuAKLwsPIBsACAdICJDI5MGQ0MTEwLWUyMTctNDMxOC05ODA3LTI0YWFiODQzMWE5Y9gCAeACAQ&sid=25da503d934a1bfc72a56a0219f8fa90&all_sr_blocks=1359334202_408254657_0_0_0&checkin=2026-04-08&checkout=2026-04-09&dest_id=-570760&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=3&highlighted_blocks=1359334202_408254657_0_0_0&hpos=3&matching_block_id=1359334202_408254657_0_0_0&nflt=swimming_pool_options%3D433&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=bayesian_review_score&sr_pri_blocks=1359334202_408254657_0_0_0__35100&srepoch=1762714456&srpvid=e8bfd62a3792e42fa8ed14ef648bf7f7&type=total&ucfs=1&',
        distance: 'Centre-ville d’Ottawa',
        price: 'Confort dès 220 $/nuit',
        poi: 'Hôtel moderne avec piscine intérieure et vue urbaine, parfait si vous combinez parc aquatique et visite d’Ottawa',
        image: '/images/destinations/hotels/ac-ottawa.avif',
      },
    ],
  },
];

/* =========================
 * Composants d’affichage
 * ========================= */

function HotelRow({ h }: { h: HotelInfo }) {
  const src = h.image || '/images/placeholder/placeholder.avif';

  return (
    <motion.li
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="group flex items-center gap-4 rounded-lg py-3 transition hover:bg-gray-50 hover:shadow-sm"
    >
      <Link
        href={h.link}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label={`Réserver ${h.name} à ${h.distance} — ${h.price}`}
        title={`${h.name} | ${h.poi} | ${h.price}`}
        className="flex w-full items-center gap-4"
        prefetch={false}
      >
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg ring-1 ring-gray-200 md:h-24 md:w-32">
          <Image
            src={src}
            alt={`Photo de l’hôtel ${h.name} – ${h.poi}`}
            fill
            placeholder="blur"
            blurDataURL="/images/placeholder/placeholder.avif"
            className="object-cover object-center transition group-hover:scale-105"
            sizes="(max-width: 768px) 120px, 160px"
            loading="lazy"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 font-semibold leading-tight text-gray-900">
            {h.name}
            {h.rating && (
              <span className="ml-2 inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[11px] text-amber-700 ring-1 ring-amber-200">
                <Star className="size-3" /> {h.rating}
              </span>
            )}
          </p>
          <p className="mt-0.5 line-clamp-1 text-sm text-gray-600">
            {h.distance} • {h.poi}
          </p>
        </div>

        <div className="w-[10.5rem] shrink-0 text-right">
          <div className="font-semibold leading-6 text-indigo-700 transition-colors group-hover:text-indigo-800">
            {h.price}
          </div>
          <div className="text-xs text-indigo-600 group-hover:underline">Ouvrir l’offre ↗</div>
        </div>
      </Link>
    </motion.li>
  );
}

function ParkBlock({ park }: { park: WaterPark }) {
  return (
    <section
      id={park.slug}
      className="overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100"
      aria-labelledby={`${park.slug}-title`}
    >
      {/* Image héros */}
      <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
        <Image
          src={park.image}
          alt={`${park.name} — parc aquatique familial en ${park.location}`}
          fill
          className="max-h-[600px] object-cover"
          sizes="100vw"
          priority={park.slug === 'valcartier'}
        />
      </div>

      {/* Contenu */}
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <H2 id={`${park.slug}-title`} className="text-2xl font-bold text-gray-900">
            {park.name}
          </H2>
          <span className="text-sm text-gray-500">{park.location}</span>
        </div>

        {park.tagline && <p className="mt-2 text-gray-700">{park.tagline}</p>}

        <div className="mt-6 space-y-4 text-gray-700">
          {park.intro}
          {park.practical}
        </div>

        <div className="mt-6">
          <H3 className="mb-2 text-base font-semibold text-gray-900">
            Hébergements conseillés pour les familles
          </H3>
          <ul
            className="divide-y divide-gray-100"
            aria-label={`Hébergements conseillés à proximité de ${park.name}`}
          >
            {park.hotels.map((h) => (
              <HotelRow key={h.name} h={h} />
            ))}
          </ul>

          <Link
            href="/planificateur"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-indigo-200 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
          >
            <Waves className="size-4 text-indigo-500" />
            Planifiez votre escapade vers ce parc ↗
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =========================
 * Composant principal
 * ========================= */

export default function BlogArticleWaterParks() {
  return (
    <>
      <HeadExtras />

      <JsonLd data={[breadcrumbLd, destinationLd, howToLd, collectionPageLd]} />

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* En-tête */}
        <header className="mb-10 text-center">
          <div className="mb-4 flex justify-center">
            <Waves className="size-10 text-indigo-600" />
          </div>
          <H1 className="mb-3">Parcs aquatiques préférés des familles (Québec & Ontario)</H1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Vous préparez une journée <em>vraiment</em> rafraîchissante avec les enfants&nbsp;? On a
            sélectionné trois <strong>parcs aquatiques adaptés aux familles</strong>, au Québec et
            en Ontario, avec des hôtels proches, des <strong>prix clairs</strong> et des conseils de
            parents pour rester sereins du matin au soir. GoQuébeCAN vous accompagne pour planifier
            vos escapades : lire, rêver, organiser… puis partir en famille, sans vous surcharger.
          </p>
        </header>

        {/* Mini-navigation sticky vers les 3 parcs */}
        <nav className="sticky top-20 z-10 mb-8 flex flex-wrap justify-center gap-3 text-sm text-indigo-700">
          <a
            href="#valcartier"
            className="rounded-full border border-indigo-100 px-3 py-1 hover:bg-indigo-50"
          >
            Valcartier
          </a>
          <a
            href="#bromont"
            className="rounded-full border border-indigo-100 px-3 py-1 hover:bg-indigo-50"
          >
            Bromont
          </a>
          <a
            href="#calypso"
            className="rounded-full border border-indigo-100 px-3 py-1 hover:bg-indigo-50"
          >
            Calypso (Ontario)
          </a>
        </nav>

        {/* Bloc parent-friendly */}
        <section className="mx-auto mb-10 max-w-3xl rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-5 text-blue-600" />
            <p className="text-sm text-blue-900">
              <strong>Parent-friendly :</strong> avant de partir pour un parc aquatique, prenez
              quelques minutes pour regarder l’itinéraire avec le{' '}
              <Link
                href="/planificateur"
                className="text-indigo-700 underline-offset-2 hover:underline"
              >
                planificateur GoQuébeCAN
              </Link>
              . Vous pouvez y caler les pauses, prévoir une aire de jeu et choisir un créneau plus
              calme pour éviter les bouchons. Au retour, on adore prolonger la journée en{' '}
              <Link
                href="/producteurs"
                className="text-indigo-700 underline-offset-2 hover:underline"
              >
                visitant un producteur local
              </Link>
              : petites découvertes, grands souvenirs.
            </p>
          </div>
        </section>

        {/* Parcs */}
        <div className="space-y-12">
          {parks.map((park) => (
            <ParkBlock key={park.slug} park={park} />
          ))}
        </div>

        {/* Checklist express */}
        <section className="mx-auto mt-12 max-w-3xl text-gray-700">
          <H3 className="text-xl font-semibold text-gray-900">
            Checklist express pour une journée au parc aquatique (à adapter à votre famille)
          </H3>
          <ul className="mt-3 grid list-disc gap-2 pl-5 sm:grid-cols-2">
            <li>
              Crème solaire minérale, casquettes et lunettes (avec cordon anti-perte pour enfants)
            </li>
            <li>
              Serviettes microfibres (1 par personne) + sac étanche pour les maillots mouillés
            </li>
            <li>Sandales d’eau antidérapantes et maillot de rechange pour les plus jeunes</li>
            <li>Gourde par personne + snacks protéinés (barres, noix, fruits secs)</li>
            <li>
              Petite trousse premiers soins (pansements, sérum physio, compresse froide instantanée)
            </li>
            <li>Téléphone chargé + pochette étanche ; point de ralliement défini avec les ados</li>
          </ul>
          <p className="mt-4">
            Vous partez plusieurs jours et combinez parc aquatique, hôtel et peut-être camping ?
            Notre article sur les{' '}
            <Link
              href="/blog/voyage-hotel"
              className="text-indigo-600 underline-offset-2 hover:underline"
            >
              indispensables pour un séjour à l’hôtel
            </Link>{' '}
            et notre{' '}
            <Link
              href="/blog/voyage-camping"
              className="text-indigo-600 underline-offset-2 hover:underline"
            >
              Guide camping 2025
            </Link>{' '}
            vous aident à trouver le bon équilibre entre « être prêt » et « ne pas remplir la
            voiture à ras bord ».
          </p>
        </section>

        {/* Budget & timing */}
        <section className="mx-auto mt-10 max-w-3xl text-gray-700">
          <H3 className="text-xl font-semibold text-gray-900">Budget & timing pour une famille</H3>
          <p className="mt-2">
            Pour une famille de 4, prévoyez le budget suivant :{' '}
            <strong>billets d’entrée pour le parc aquatique</strong> (souvent moins chers en ligne
            et parfois en promotion), un <strong>repas</strong> sur place + collations maison, et
            selon vos plans une <strong>nuitée</strong> dans un hôtel à proximité. Arriver tôt
            réduit l’attente et permet de profiter d’un parc encore calme, surtout dans les rivières
            lentes et les zones pour enfants.
          </p>
          <p className="mt-2">
            En haute saison, réservez vos hébergements dès que possible, surtout pour les parcs
            populaires comme Valcartier ou Calypso. Gardez une option de repli si la météo tourne :
            cinéma, musée pour enfants, café-jeux… L’idée n’est pas de tout contrôler, mais de vous
            laisser des portes ouvertes pour que le week-end reste agréable même si la pluie
            s’invite.
          </p>
          <p className="mt-2">
            Après la sortie, on aime bien <strong>redescendre le rythme</strong> : regarder quelques{' '}
            <Link href="/videos" className="text-indigo-600 underline-offset-2 hover:underline">
              vidéos du Québec
            </Link>
            , feuilleter des photos de la journée et noter dans le{' '}
            <Link
              href="/planificateur"
              className="text-indigo-600 underline-offset-2 hover:underline"
            >
              planificateur GoQuébeCAN
            </Link>{' '}
            deux idées d’escapades pour les prochains mois.
          </p>
        </section>

        {/* Producteurs locaux */}
        <section className="mx-auto mt-10 max-w-3xl text-gray-700">
          <H3 className="text-xl font-semibold text-gray-900">
            Prolonger l’expérience : découvrir les producteurs locaux
          </H3>
          <p className="mt-2">
            Une journée au parc aquatique, c’est déjà beaucoup de plaisir. Mais vous pouvez la
            transformer en <strong>petite aventure gourmande</strong> en ajoutant une visite chez un
            producteur local sur le trajet : une fromagerie près de Québec, une microbrasserie des
            Cantons-de-l’Est ou une ferme fruitière dans la région d’Ottawa, par exemple.
          </p>
          <p className="mt-2">
            Nous regroupons progressivement ces adresses sur notre page{' '}
            <Link
              href="/producteurs"
              className="text-indigo-600 underline-offset-2 hover:underline"
            >
              Producteurs locaux
            </Link>
            . C’est une belle façon de montrer aux enfants d’où viennent les aliments qu’ils
            mangent, de rencontrer des gens passionnés par leur métier et de soutenir des
            entreprises d’ici. Une crème glacée maison après les glissades, un fromage local pour le
            souper ou un jus artisanal pour la route : ce sont souvent ces petites touches qui
            rendent le week-end vraiment mémorable.
          </p>
        </section>

        {/* Auteur / E-E-A-T */}
        <section className="mx-auto mt-10 max-w-3xl text-center text-sm text-gray-500">
          Article rédigé par <strong>GoQuébeCAN</strong>, pour les familles qui aiment explorer le
          Québec et l’Ontario à leur rythme. Dernière mise à jour : novembre 2025.
        </section>

        <footer className="mt-8 text-center text-sm text-gray-500">
          Bonne baignade, bons fous rires, et surtout la paix d’esprit&nbsp;: la journée idéale en
          famille, ça se prépare avec simplicité, bienveillance… et un brin de GoQuébeCAN. Quand
          vous aurez testé l’un de ces parcs, revenez nous dire ce qui vous a fait le plus sourire.
        </footer>
      </main>
    </>
  );
}
