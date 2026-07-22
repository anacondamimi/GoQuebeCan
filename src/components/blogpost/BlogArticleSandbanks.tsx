import Image from 'next/image';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_SANDBANKS } from '@/data/hotels/byArticle/sandbanks';
import { bookingAwin } from '@/lib/awin';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';
import DestinationFaq from '@/components/blog/DestinationFaq';

import {
  Waves,
  Calendar,
  DollarSign,
  Car,
  Sun,
  Tent,
  Map,
  ShoppingBasket,
  Baby,
  AlertTriangle,
  Star,
  Footprints,
  CloudSun,
  Wind,
  Flame,
  ShieldAlert,
} from 'lucide-react';

const hotels = pickHotels(HOTEL_IDS_SANDBANKS);

const restaurants = [
  {
    name: 'The Beau Bistro',
    city: 'Picton',
    type: 'Bistro canadien moderne',
    speciality: 'Cuisine de saison et produits locaux',
    price: '$$$',
    mustTry: 'Smash burger signature, fish and chips',
    schedule: 'Midi et soir, brunch la fin de semaine',
    vibe: 'Décontracté chic',
    tip: "Sur Main Street West à Picton, à quelques minutes du parc. Terrasse agréable l'été.",
  },
  {
    name: 'The Acoustic Grill',
    city: 'Picton',
    type: 'Pub avec musique live',
    speciality: 'Cuisine de pub et scène acoustique',
    price: '$$',
    mustTry: 'Plats de pub et bières locales',
    schedule: 'Selon la programmation musicale',
    vibe: 'Convivial & animé',
    tip: "Installé dans l'ancien Master Feeds Building, une institution locale depuis près de 20 ans.",
  },
  {
    name: 'Bocado',
    city: 'Picton',
    type: 'Tapas espagnoles',
    speciality: 'Petites assiettes de saison et vins du comté',
    price: '$$$',
    mustTry: 'Assortiment de tapas à partager',
    schedule: 'Réservation nécessaire',
    vibe: 'Chaleureux & gourmand',
    tip: 'Au cœur de Picton. Réservez tôt en haute saison, la salle est petite.',
  },
  {
    name: 'The Lighthouse Restaurant',
    city: 'Picton',
    type: 'Déjeuner et cuisine familiale',
    speciality: 'Déjeuners classiques et poisson frit',
    price: '$$',
    mustTry: 'Œufs bénédictine, crêpes, fish and chips',
    schedule: 'Ouvre tôt le matin',
    vibe: 'Familial & sans prétention',
    tip: 'Dans le Picton Harbour Inn, primé plusieurs fois pour son déjeuner. Idéal avant une journée de plage.',
  },
  {
    name: 'Bean Counter',
    city: 'Picton',
    type: 'Café et lunch',
    speciality: 'Espresso, viennoiseries, sandwichs et soupes',
    price: '$',
    mustTry: 'Pâtisseries maison et quiches',
    schedule: 'Surtout le matin et le midi',
    vibe: 'Café de village',
    tip: 'Parfait pour un arrêt rapide en route vers la plage ou pour composer un pique-nique.',
  },
];

const faqItems = [
  {
    question: 'Combien de temps faut-il pour se rendre à Sandbanks depuis Montréal ?',
    answer:
      "Comptez environ 4 h à 4 h 30 de route pour un trajet d'à peu près 380 km depuis Montréal. Depuis la ville de Québec, prévoyez plutôt 6 h 30 à 7 h. Le parc se trouve à environ 14 km de Picton, soit une vingtaine de minutes.",
  },
  {
    question: 'Faut-il réserver pour entrer à Sandbanks ?',
    answer:
      "Oui. Tout véhicule entrant pour la journée a besoin d'un permis de véhicule journalier, et il est fortement recommandé de le réserver à l'avance. Les permis se réservent jusqu'à 5 jours avant la visite, à partir de 7 h (heure de l'Est), sur le site de réservation des parcs de l'Ontario. La capacité du parc est limitée et il se remplit régulièrement en haute saison.",
  },
  {
    question: 'Quelles sont les trois plages de Sandbanks et laquelle choisir ?',
    answer:
      "Outlet Beach est la plus connue et la plus familiale : environ deux kilomètres de sable fin, une entrée dans l'eau très graduelle et le statut Pavillon bleu pour la qualité de l'eau. Dunes Beach, sur le lac West, a une pente plus prononcée mais une eau plus chaude, et donne directement accès aux dunes. Lakeshore Beach (aussi appelée Sandbanks Beach) est la plus longue et souvent la plus tranquille.",
  },
  {
    question: 'Quelle plage choisir avec de jeunes enfants ?',
    answer:
      "Outlet Beach est le meilleur choix : l'eau reste peu profonde sur une longue distance, ce qui permet aux enfants de jouer en sécurité. C'est aussi le secteur qui se remplit le plus vite, alors visez une arrivée en matinée.",
  },
  {
    question: 'Peut-on camper à Sandbanks et comment réserver ?',
    answer:
      "Oui. Le parc compte plus de 500 emplacements répartis dans plusieurs campings : Outlet River A et B, Cedars, Richardson's, Woodlands et West Lake. Plus de 250 emplacements offrent l'électricité. Les réservations s'ouvrent des mois à l'avance et les places d'été partent très vite. Deux hébergements avec toit, le Jacques Cottage et la Maple Rest Heritage House, se réservent à l'année.",
  },
  {
    question: 'Quelle est la meilleure période pour visiter Sandbanks ?',
    answer:
      "Juillet et août offrent l'eau la plus chaude mais aussi la plus forte affluence. Le début septembre est souvent le meilleur compromis : l'eau reste agréable, les plages se vident et les vendanges commencent dans le comté. Le parc opère généralement de la fin avril à la fin octobre pour le camping et l'accès de jour.",
  },
  {
    question: 'Y a-t-il de l’ombre sur les plages ?',
    answer:
      "Très peu. Les plages sont largement exposées au soleil. Un parasol ou un abri portatif est pratiquement indispensable en juillet et août, tout comme une bonne réserve d'eau et de la crème solaire.",
  },
  {
    question: 'Peut-on faire du vélo dans le parc ?',
    answer:
      "Oui, mais avec des attentes réalistes. Le parc compte une dizaine de kilomètres de pistes cyclables officielles, dont la signalisation est jugée perfectible par plusieurs visiteurs. Une partie des parcours emprunte des sentiers piétonniers ou des routes asphaltées peu passantes, ce qui demande de la vigilance en période d'achalandage.",
  },
  {
    question: 'Parle-t-on français à Sandbanks ?',
    answer:
      "Le service se fait principalement en anglais, comme partout en Ontario. Quelques notions suffisent largement pour la plage, les restaurants et les hébergements. Le parc est très fréquenté par les familles québécoises, l'accueil est habituellement chaleureux.",
  },
  {
    question: 'Quelle est la météo typique à Sandbanks en été ?',
    answer:
      "Juillet et août sont chauds, avec une eau à son meilleur pour la baignade et des orages possibles en fin d'après-midi. Le microclimat de la péninsule adoucit les extrêmes. Le vent est un facteur à surveiller : les dunes existent justement parce qu'il souffle fort sur cette rive, et une journée ventée peut rendre la plage moins agréable. Consultez les prévisions pour Picton ou Wellington plutôt que pour une ville éloignée.",
  },
  {
    question: 'Quelle est la température de l’eau à Sandbanks ?',
    answer:
      "L'eau se réchauffe bien en été parce que le secteur du lac Ontario y est peu profond. Juillet et août offrent les meilleures conditions de baignade, et le début septembre reste souvent agréable puisque l'eau conserve la chaleur accumulée pendant l'été alors que l'air se rafraîchit. En mai et juin, elle est encore froide.",
  },
  {
    question: 'Comment vérifier la qualité de l’air avant de partir à Sandbanks ?',
    answer:
      "Consultez la Cote air santé (CAS) d'Environnement et Changement climatique Canada, une échelle de 1 à 10+ où un chiffre élevé signale un risque accru. L'application MétéoCAN permet de recevoir des notifications quand la cote change. La fumée des feux de forêt peut voyager sur des centaines de kilomètres, donc l'air peut être affecté même sans feu à proximité — et même si vous ne voyez ni ne sentez de fumée.",
  },
  {
    question: 'Peut-on faire un feu de camp à Sandbanks ?',
    answer:
      "Oui, dans le foyer de votre emplacement de camping, sauf en cas d'interdiction. Deux niveaux d'interdiction peuvent s'appliquer simultanément : une zone de feux réglementée provinciale et une interdiction municipale. Vérifiez la page des alertes des parcs de l'Ontario avant de partir. Pendant une interdiction complète, aucun feu n'est permis, mais les réchauds au gaz ou à combustible liquide munis d'une valve d'arrêt restent autorisés, à au moins un mètre de tout matériau inflammable.",
  },
  {
    question: 'Peut-on apporter son bois de chauffage à Sandbanks ?',
    answer:
      "Non, c'est fortement déconseillé et réglementé. Transporter du bois propage des insectes et des maladies invasives comme l'agrile du frêne. Déplacer du bois hors d'une zone sous quarantaine sans autorisation de l'Agence canadienne d'inspection des aliments peut entraîner des sanctions importantes. Achetez votre bois au camping ou chez un commerçant local, et privilégiez le bois séché au four. Il est également interdit de ramasser du bois dans le parc.",
  },
  {
    question: 'Où dormir si le camping du parc est complet ?',
    answer:
      "Picton, Wellington et Bloomfield offrent de nombreux hébergements à moins de vingt minutes des plages. C'est souvent une meilleure option pour un premier séjour : plus de confort, plus de souplesse, et un accès facile aux restaurants et aux vignobles du comté.",
  },
];

export default function BlogArticleSandbanks() {
  const ctaBookingUrl = bookingAwin(
    'https://www.booking.com/landmark/ca/sandbanks-provincial-park.fr.html',
  );

  return (
    <DestinationArticleTemplate
      slug="sandbanks"
      title="Sandbanks — dunes géantes, eau turquoise et escapade familiale en Ontario"
      subtitle="À quatre heures de Montréal, le parc provincial de Sandbanks protège le plus grand système de dunes de sable d'eau douce au monde. Trois plages, plus de 500 emplacements de camping et les vignobles du Prince Edward County : le guide complet pour préparer votre séjour depuis le Québec."
      toc={[
        { id: 'intro', label: 'Introduction' },
        { id: 'essentiel', label: "L'essentiel en bref" },
        { id: 'plages', label: 'Les trois plages du parc' },
        { id: 'why', label: 'Pourquoi y aller' },
        { id: 'acces', label: 'Permis, réservation & accès' },
        { id: 'itinerary', label: 'Itinéraire conseillé (2 jours)' },
        { id: 'familles', label: 'Avec des enfants' },
        { id: 'dunes', label: 'Dunes, sentiers & vélo' },
        { id: 'camping', label: 'Camping à Sandbanks' },
        { id: 'saisons', label: 'Quand y aller' },
        { id: 'meteo', label: 'Météo & température de l’eau' },
        { id: 'qualite-air', label: 'Qualité de l’air & fumée' },
        { id: 'feux', label: 'Feux de camp : règles & interdictions' },
        { id: 'producteurs', label: 'Vignobles & producteurs du comté' },
        { id: 'ou-dormir', label: 'Où dormir' },
        { id: 'ou-manger', label: 'Où manger' },
        { id: 'getting-there', label: "Comment s'y rendre depuis le Québec" },
        { id: 'erreurs', label: 'Erreurs fréquentes à éviter' },
        { id: 'tips', label: 'Conseils pratiques' },
        { id: 'faq', label: 'FAQ' },
        { id: 'cta', label: 'Réserver & liens utiles' },
      ]}
      hotelIntro={{
        title: 'Où dormir près de Sandbanks',
        text: "Le camping du parc se réserve des mois à l'avance et affiche complet très tôt pour l'été. Loger à Picton ou Wellington, à une vingtaine de minutes des plages, offre plus de souplesse et un accès facile aux restaurants et aux vignobles.",
      }}
      restaurantIntro={{
        title: 'Où manger autour de Sandbanks',
        text: "Le Prince Edward County est devenu une véritable destination gastronomique. On peut y déjeuner simplement avant la plage, s'arrêter pour un fish and chips en sortant du parc ou s'offrir une vraie soirée à table. Voici des adresses fiables à Picton, toutes à moins de vingt minutes des plages.",
      }}
      faqIntro={{
        title: 'FAQ sur Sandbanks',
        text: 'Les réponses aux questions que se posent le plus souvent les visiteurs québécois avant de partir.',
      }}
      hotelSection={<HotelGrid items={hotels} />}
      restaurantSection={<RestaurantPremiumGrid items={restaurants} />}
      faqSection={<DestinationFaq items={faqItems} />}
      conclusion={{
        title: 'Réserver et liens utiles',
        text: "Sandbanks demande un minimum de préparation, surtout pour le permis de véhicule et l'hébergement en haute saison. Une fois ces deux points réglés, c'est l'une des escapades balnéaires les plus faciles à organiser depuis le Québec.",
        ctas: [
          {
            label: 'Voir les hébergements autour de Sandbanks',
            href: ctaBookingUrl,
          },
        ],
      }}
    >
      {/* Introduction */}
      <section id="intro" className="space-y-4 text-gray-700">
        <p>
          Sable blond, eau turquoise et dunes à perte de vue : le parc provincial de{' '}
          <strong>Sandbanks</strong> fait partie de ces endroits où les familles québécoises
          reviennent année après année. Situé dans le <strong>Prince Edward County</strong>, en
          Ontario, près de Picton, il protège le plus grand système de dunes de sable d&apos;eau
          douce au monde — une formation de barrière de baie qui s&apos;étire sur une douzaine de
          kilomètres, avec des dunes atteignant environ 25 mètres de hauteur.
        </p>
        <p>
          Le parc couvre environ 1 550 hectares le long du lac Ontario. À quelque{' '}
          <strong>380 km de Montréal</strong>, soit un peu plus de quatre heures de route,
          c&apos;est l&apos;une des rares destinations véritablement balnéaires accessibles depuis
          le Québec pour une longue fin de semaine.
        </p>
        <p>
          Ce guide rassemble tout ce qu&apos;il faut savoir avant de partir : la différence entre
          les trois plages, le système de permis obligatoire qui surprend encore beaucoup de
          visiteurs, où dormir quand le camping est complet, et comment combiner plage et vignobles.
        </p>

        <figure className="mt-6">
          <Image
            src="/images/destinations/sandbanks.avif"
            alt="Plage de sable et eau turquoise au parc provincial Sandbanks en Ontario"
            width={1200}
            height={675}
            className="rounded-xl"
            priority
          />
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            Le parc provincial Sandbanks, dans le Prince Edward County, en Ontario.
          </figcaption>
        </figure>
      </section>

      {/* L'essentiel en bref */}
      <section id="essentiel" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-7 text-indigo-600" />
          L&apos;essentiel en bref
        </H2>
        <div className="rounded-xl bg-indigo-50 p-5 ring-1 ring-indigo-100">
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Où :</strong> Prince Edward County, Ontario, à environ 14 km de Picton (3004
              County Road 12).
            </li>
            <li>
              <strong>Depuis Montréal :</strong> environ 380 km, 4 h à 4 h 30 de route.
            </li>
            <li>
              <strong>Trois plages :</strong> Outlet (familiale), Dunes (spectaculaire), Lakeshore
              (la plus longue).
            </li>
            <li>
              <strong>À réserver :</strong> permis de véhicule journalier, jusqu&apos;à 5 jours à
              l&apos;avance dès 7 h HE.
            </li>
            <li>
              <strong>Camping :</strong> plus de 500 emplacements, dont plus de 250 avec
              électricité.
            </li>
            <li>
              <strong>Saison :</strong> accès de jour et camping généralement de fin avril à fin
              octobre.
            </li>
            <li>
              <strong>À prévoir :</strong> de l&apos;ombre, elle est rare et le soleil est intense.
            </li>
          </ul>
        </div>
      </section>

      {/* Les plages */}
      <section id="plages" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Waves className="size-7 text-indigo-600" />
          Les trois plages du parc
        </H2>
        <p>
          Sandbanks n&apos;est pas une plage unique mais trois secteurs bien distincts. Choisir le
          bon selon votre groupe change complètement l&apos;expérience de la journée.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Outlet Beach — la plus familiale</H3>
        <p>
          C&apos;est la plus connue et la plus fréquentée : environ deux kilomètres de sable fin et
          clair, avec une entrée dans l&apos;eau très graduelle. Elle détient le statut{' '}
          <strong>Pavillon bleu</strong>, une reconnaissance internationale pour la qualité de
          l&apos;eau et la sécurité. On peut marcher longtemps avant d&apos;avoir de l&apos;eau à la
          taille, ce qui explique pourquoi les familles avec de jeunes enfants la privilégient.
        </p>
        <p>
          Revers de la médaille : son stationnement est le premier à se remplir, et les fins de
          semaine de juillet, l&apos;affluence y est réelle.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Dunes Beach — la plus spectaculaire</H3>
        <p>
          Située sur le <strong>lac West</strong>, elle présente une entrée dans l&apos;eau plus
          abrupte mais une eau généralement plus chaude. C&apos;est là que se trouvent les fameuses
          dunes : le sentier des dunes part directement de ce secteur et traverse la formation de
          sable.
        </p>
        <p>Le bon compromis si vous voulez combiner baignade et marche dans un même après-midi.</p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">
          Lakeshore Beach — la plus longue et la plus calme
        </H3>
        <p>
          Aussi appelée Sandbanks Beach, elle borde le lac Ontario avec une pente douce et
          s&apos;étire sur plusieurs kilomètres en direction du village de Wellington. Généralement
          plus tranquille que Outlet, elle convient bien à ceux qui cherchent de l&apos;espace sans
          quitter le parc.
        </p>
      </section>

      {/* Pourquoi y aller */}
      <section id="why" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Sun className="size-7 text-indigo-600" />
          Pourquoi y aller
        </H2>
        <p>
          Sandbanks offre quelque chose qu&apos;on trouve difficilement au Québec : de très longues
          plages de sable fin avec une eau qui se réchauffe réellement en été. Le secteur du lac
          Ontario y est peu profond, ce qui permet à l&apos;eau d&apos;atteindre des températures de
          baignade confortables dès juillet — une différence marquante avec le fleuve ou les lacs
          plus au nord.
        </p>
        <p>
          Le paysage y est aussi singulier. Les dunes créent une ambiance qui ne ressemble à rien
          d&apos;autre en Ontario, et plusieurs visiteurs québécois décrivent l&apos;endroit comme
          une plage du Sud transplantée à quatre heures de Montréal.
        </p>
        <p>
          S&apos;ajoute enfin le <strong>Prince Edward County</strong>, devenu en une vingtaine
          d&apos;années une région viticole et gastronomique reconnue. On peut donc alterner
          journées de plage et découvertes gourmandes, ce qui rend le séjour intéressant pour les
          adultes comme pour les enfants.
        </p>
      </section>

      {/* Accès et permis */}
      <section id="acces" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Car className="size-7 text-indigo-600" />
          Permis, réservation et accès
        </H2>
        <p>
          <strong>
            C&apos;est le point qui surprend le plus de visiteurs, et celui à régler en premier.
          </strong>{' '}
          Tout véhicule qui entre dans le parc pour la journée doit avoir un{' '}
          <strong>permis de véhicule journalier</strong>.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Comment réserver</H3>
        <p>
          Les permis se réservent jusqu&apos;à <strong>cinq jours avant la visite</strong>, à partir
          de 7 h (heure de l&apos;Est), sur le site de réservation des parcs de l&apos;Ontario
          (reservations.ontarioparks.ca) ou par téléphone. Un permis acheté à l&apos;avance
          n&apos;est pas remboursable et reste valide uniquement pour le parc et la date choisis.
        </p>
        <p>
          Sandbanks fait partie des parcs les plus populaires de la province : la capacité
          journalière est limitée et régulièrement atteinte lors des fins de semaine d&apos;été.
          Sans réservation, vous risquez tout simplement de vous faire refuser l&apos;entrée.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Le truc de la voie de contournement</H3>
        <p>
          Si vous imprimez votre confirmation et la placez sur le tableau de bord, vous pouvez
          emprunter la voie réservée aux réservations et éviter la file d&apos;attente à la guérite.
          Gardez aussi une copie numérique en réserve.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Permis saisonnier et annuel</H3>
        <p>
          Si vous prévoyez plus de cinq visites dans des parcs ontariens dans l&apos;année, le
          permis annuel devient rentable. Attention toutefois : détenir un permis saisonnier{' '}
          <strong>ne garantit pas à lui seul l&apos;entrée</strong> dans un parc à capacité limitée
          — il faut tout de même réserver sa place.
        </p>

        <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <p className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <span>
              Les tarifs et les modalités changent d&apos;une saison à l&apos;autre. Vérifiez
              toujours les conditions en vigueur sur le site officiel des parcs de l&apos;Ontario
              avant de partir.
            </span>
          </p>
        </div>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Stationnement</H3>
        <p>
          Chacune des trois plages dispose de son propre stationnement, auxquels s&apos;ajoutent des
          aires de pique-nique comme Lakeshore Lodge. Respectez scrupuleusement la signalisation :
          se garer sur les routes du comté expose à une contravention ou au remorquage, en plus de
          bloquer les accès.
        </p>
      </section>

      {/* Itinéraire */}
      <section id="itinerary" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Calendar className="size-7 text-indigo-600" />
          Itinéraire conseillé (2 jours)
        </H2>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Jour 1 — Route et première baignade</H3>
        <p>
          Départ de Montréal en matinée, arrivée en début d&apos;après-midi après environ quatre
          heures de route. Installation à l&apos;hébergement à Picton ou Wellington, puis première
          baignade à <strong>Outlet Beach</strong> en fin d&apos;après-midi, quand l&apos;affluence
          retombe et que la lumière devient belle.
        </p>
        <p>
          Souper à Picton — The Beau Bistro pour une vraie table, ou The Acoustic Grill si vous
          voulez une ambiance plus animée.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Jour 2 — Dunes et vignobles</H3>
        <p>
          Déjeuner tôt au Lighthouse ou au Bean Counter, puis matinée à <strong>Dunes Beach</strong>{' '}
          : marche dans les dunes avant la chaleur, baignade ensuite. Après-midi partagé entre un
          vignoble du comté et un arrêt chez un producteur local, avant le retour ou une nuit
          supplémentaire.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Si vous restez trois jours</H3>
        <p>
          Ajoutez <strong>Lakeshore Beach</strong> pour une journée plus tranquille, une sortie en
          kayak sur le lac West, et poussez jusqu&apos;au village de Wellington ou à Bloomfield pour
          les boutiques et les galeries.
        </p>
      </section>

      {/* Familles */}
      <section id="familles" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Baby className="size-7 text-indigo-600" />
          Avec des enfants
        </H2>
        <p>
          Sandbanks est une destination particulièrement adaptée aux familles, et c&apos;est
          d&apos;ailleurs ce qui explique sa popularité auprès des Québécois. L&apos;eau peu
          profonde d&apos;Outlet Beach permet aux plus jeunes de jouer longtemps en sécurité, et les
          dunes constituent un terrain d&apos;exploration naturel qui occupe facilement une matinée.
        </p>
        <p>
          Le point de vigilance principal reste <strong>l&apos;ombre</strong> : les plages en
          offrent très peu. Parasol ou abri portatif, crème solaire, chapeaux et grande réserve
          d&apos;eau sont à mettre dans la voiture avant de partir. Prévoyez aussi des sandales ou
          des chaussures fermées : le sable devient brûlant en milieu de journée, particulièrement
          dans les dunes.
        </p>
        <p>
          Certains secteurs disposent d&apos;aires de jeux et de casse-croûtes en haute saison, mais
          l&apos;offre reste limitée : apporter son pique-nique est souvent plus simple et plus
          économique.
        </p>
      </section>

      {/* Dunes et sentiers */}
      <section id="dunes" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Footprints className="size-7 text-indigo-600" />
          Dunes, sentiers et vélo
        </H2>
        <p>
          Le sentier des dunes part du secteur Dunes Beach et traverse la formation de sable. Les
          dunes atteignent environ 25 mètres et s&apos;étirent sur une douzaine de kilomètres : le
          panorama depuis le sommet justifie à lui seul la montée, exigeante dans le sable meuble.
        </p>
        <p>
          <strong>Restez sur les parcours balisés.</strong> La végétation qui retient le sable est
          fragile et fait l&apos;objet d&apos;un travail de conservation. Marcher hors sentier
          accélère l&apos;érosion d&apos;un écosystème rare.
        </p>
        <p>
          Côté vélo, soyons honnêtes : le parc compte une dizaine de kilomètres de pistes
          officielles dont la signalisation laisse à désirer, de l&apos;avis de plusieurs visiteurs.
          Une partie du réseau emprunte des sentiers piétonniers ou des routes asphaltées peu
          passantes. C&apos;est agréable hors saison, plus délicat en plein cœur de l&apos;été.
        </p>
      </section>

      {/* Camping */}
      <section id="camping" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Tent className="size-7 text-indigo-600" />
          Camping à Sandbanks : secteurs, VR et chalets
        </H2>
        <p>
          Le parc compte plus de <strong>500 emplacements de camping</strong> répartis dans
          plusieurs secteurs, dont plus de 250 avec électricité. Ils accueillent aussi bien les
          tentes que les grandes roulottes, avec points d&apos;eau, blocs sanitaires et buanderies à
          proximité.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Quel camping choisir</H3>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Outlet River A</strong> — les emplacements les plus recherchés, plusieurs en
            bord d&apos;eau avec accès direct à la plage. Camping animé, sites rapprochés.
          </li>
          <li>
            <strong>Outlet River B</strong> — un peu plus d&apos;intimité, certains sites le long de
            la rivière, avec une boucle d&apos;emplacements traversants électrifiés.
          </li>
          <li>
            <strong>Cedars</strong> — orienté familles, plus abrité et plus privé, avec moins de
            circulation, tout en restant près de la plage.
          </li>
          <li>
            <strong>Woodlands</strong> — situé entre les secteurs des lacs East et West.
          </li>
          <li>
            <strong>Richardson&apos;s</strong> — dans le secteur du lac West, le long de la rive.
          </li>
          <li>
            <strong>West Lake</strong> — tout électrique, bien espacé, près de l&apos;entrée de
            Dunes Beach et des dunes.
          </li>
        </ul>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Hébergements avec toit</H3>
        <p>
          Deux options se réservent à l&apos;année : le <strong>Jacques Cottage</strong>, un chalet
          d&apos;une pièce et demie sur la rive du lac Ontario qui accueille quatre personnes, et la{' '}
          <strong>Maple Rest Heritage House</strong>, une maison victorienne de quatre chambres
          meublée d&apos;antiquités, pouvant loger huit personnes, à courte distance de Dunes Beach.
        </p>

        <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <p className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <span>
              Les emplacements d&apos;été partent extrêmement vite dès l&apos;ouverture des
              réservations, plusieurs mois à l&apos;avance. Si vous visez juillet ou août, planifiez
              tôt — ou prévoyez de loger à Picton ou Wellington.
            </span>
          </p>
        </div>
      </section>

      {/* Saisons */}
      <section id="saisons" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Calendar className="size-7 text-indigo-600" />
          Quand y aller
        </H2>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Juillet et août</H3>
        <p>
          L&apos;eau est à son meilleur et toutes les installations fonctionnent. C&apos;est aussi
          la période la plus achalandée : réservation du permis obligatoire, arrivée tôt
          recommandée, hébergements plus chers.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Début septembre — le meilleur compromis</H3>
        <p>
          Souvent le moment idéal. L&apos;eau reste chaude après l&apos;été, les plages se vident
          après la rentrée, et les vendanges battent leur plein dans le comté. Pour un couple ou des
          voyageurs sans contrainte scolaire, c&apos;est le choix évident.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Printemps et automne</H3>
        <p>
          Peu de baignade, mais des plages désertes, de belles lumières et un excellent accès aux
          sentiers. Le parc opère généralement de la fin avril à la fin octobre pour le camping et
          l&apos;accès de jour ; les deux hébergements avec toit restent disponibles à l&apos;année.
        </p>
      </section>

      {/* Météo */}
      <section id="meteo" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <CloudSun className="size-7 text-indigo-600" />
          Météo à Sandbanks et température de l&apos;eau
        </H2>
        <p>
          C&apos;est la question que se posent presque tous les visiteurs la veille du départ.
          Sandbanks profite d&apos;un microclimat plus doux que la moyenne ontarienne : la péninsule
          du Prince Edward County est entourée d&apos;eau, ce qui tempère les extrêmes dans les deux
          sens.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">À quoi s&apos;attendre selon le mois</H3>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Mai et juin</strong> — journées douces à chaudes, mais eau encore froide. Bon
            pour les sentiers et les dunes, moins pour la baignade prolongée.
          </li>
          <li>
            <strong>Juillet et août</strong> — le cœur de la saison. Chaleur soutenue, eau à son
            meilleur. C&apos;est aussi la période des orages de fin d&apos;après-midi, fréquents et
            parfois brefs.
          </li>
          <li>
            <strong>Septembre</strong> — souvent le meilleur compromis. L&apos;eau conserve la
            chaleur accumulée pendant l&apos;été alors que l&apos;air se rafraîchit, et les plages
            se vident.
          </li>
          <li>
            <strong>Octobre</strong> — plus frais et venteux, mais superbe pour la marche et la
            photo.
          </li>
        </ul>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Le vent, un facteur sous-estimé</H3>
        <p>
          Les dunes existent précisément parce que le vent souffle fort sur cette rive. Une journée
          ensoleillée mais ventée peut rendre la plage désagréable : sable soulevé, parasol
          difficile à ancrer, vagues plus fortes à Dunes Beach. Vérifiez la vitesse du vent autant
          que la température avant de partir, et prévoyez un ancrage solide pour tout abri portatif.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Où vérifier avant de partir</H3>
        <p>
          Consultez les prévisions pour <strong>Picton</strong> ou <strong>Wellington</strong>{' '}
          plutôt que pour une grande ville voisine : les conditions au bord du lac diffèrent souvent
          de celles de l&apos;intérieur des terres. L&apos;application MétéoCAN d&apos;Environnement
          Canada donne les prévisions locales, les avertissements en vigueur et les alertes de
          qualité de l&apos;air au même endroit.
        </p>

        <div className="rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100">
          <p className="flex items-start gap-3">
            <Wind className="mt-0.5 size-5 shrink-0 text-blue-600" />
            <span>
              <strong>Le réflexe utile :</strong> vérifiez la météo la veille au soir plutôt que le
              matin même. Le permis de véhicule s&apos;achète jusqu&apos;à cinq jours à
              l&apos;avance et n&apos;est pas remboursable — mieux vaut connaître la tendance avant
              de réserver.
            </span>
          </p>
        </div>
      </section>

      {/* Qualité de l'air */}
      <section id="qualite-air" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <ShieldAlert className="size-7 text-indigo-600" />
          Qualité de l&apos;air et fumée des feux de forêt
        </H2>
        <p>
          C&apos;est devenu un réflexe de planification au Canada, et c&apos;est une vérification
          qui vaut la peine avant une escapade de plage. La fumée des feux de forêt peut{' '}
          <strong>se déplacer sur des centaines, voire des milliers de kilomètres</strong> depuis la
          zone d&apos;incendie : la qualité de l&apos;air peut donc se détériorer à Sandbanks même
          si aucun feu ne brûle dans la région.
        </p>
        <p>
          Point important souligné par les autorités de santé publique : la qualité de l&apos;air
          peut être mauvaise <strong>même si vous ne voyez ni ne sentez de fumée</strong>.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Comprendre la Cote air santé (CAS)</H3>
        <p>
          Environnement et Changement climatique Canada publie la <strong>Cote air santé</strong>,
          une échelle de 1 à 10+. Plus le chiffre est élevé, plus le risque pour la santé est
          important. Chaque catégorie s&apos;accompagne de recommandations distinctes pour la
          population générale et pour les personnes à risque. Durant un épisode de fumée, la cote
          est recalculée toutes les heures à partir des particules fines (PM2,5), afin de suivre des
          variations parfois rapides.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Qui doit être particulièrement vigilant</H3>
        <p>
          Les autorités de santé considèrent comme plus à risque les enfants de moins de cinq ans,
          les personnes enceintes, les personnes de plus de 65 ans, celles ayant une maladie
          respiratoire, cardiaque ou le diabète, ainsi que celles qui font de l&apos;exercice ou
          travaillent à l&apos;extérieur. Une journée de plage avec de jeunes enfants entre
          pleinement dans cette catégorie.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Quoi faire si l&apos;air est mauvais</H3>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Réduisez ou reportez les activités extérieures intenses, surtout pour les enfants.
          </li>
          <li>
            Gardez à portée de main les médicaments pour l&apos;asthme si quelqu&apos;un en utilise.
          </li>
          <li>Privilégiez les activités intérieures du comté : vignobles, galeries, boutiques.</li>
          <li>
            Si des symptômes apparaissent (toux persistante, difficulté à respirer, douleur à la
            poitrine), rentrez à l&apos;intérieur et consultez — Info-Santé 811 au Québec, ou le 911
            selon la gravité.
          </li>
        </ul>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Où vérifier</H3>
        <p>
          Consultez les prévisions de la Cote air santé sur le site d&apos;Environnement et
          Changement climatique Canada, ou téléchargez l&apos;application <strong>MétéoCAN</strong>,
          qui permet de configurer des notifications lorsque la cote change. Les alertes de qualité
          de l&apos;air y figurent aux côtés des avertissements météo.
        </p>

        <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <p className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <span>
              La saison des feux de forêt s&apos;étend généralement du début avril à la fin octobre
              au Canada. Vérifiez la Cote air santé la veille de votre départ, au même moment que la
              météo.
            </span>
          </p>
        </div>
      </section>

      {/* Feux de camp */}
      <section id="feux" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Flame className="size-7 text-indigo-600" />
          Feux de camp : règles, interdictions et erreurs à éviter
        </H2>
        <p>
          Le feu de camp fait partie de l&apos;expérience, mais c&apos;est aussi le sujet le plus
          réglementé du camping en Ontario — et celui où les visiteurs se font le plus souvent
          surprendre. Les règles changent d&apos;une semaine à l&apos;autre selon les conditions.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Vérifier avant de partir</H3>
        <p>
          Deux niveaux d&apos;interdiction peuvent s&apos;appliquer en même temps : une{' '}
          <strong>zone de feux réglementée</strong> décrétée par le ministère provincial, et une{' '}
          <strong>interdiction municipale</strong>. Si les deux sont en vigueur, il faut respecter
          les deux ; et si l&apos;une est levée, l&apos;autre peut rester active. Consultez la page
          des alertes des parcs de l&apos;Ontario (ontarioparks.ca/alerts) juste avant de partir,
          puis vérifiez l&apos;affichage à votre arrivée au parc.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">
          Ce qui est permis pendant une interdiction
        </H3>
        <p>
          En cas d&apos;interdiction complète, <strong>aucun feu de camp n&apos;est permis</strong>.
          Pour cuisiner, les réchauds portatifs au gaz ou au propane munis d&apos;une valve
          d&apos;arrêt et conçus pour la cuisson restent autorisés, tout comme les réchauds à
          combustible liquide avec valve ou couvercle. Le réchaud doit être placé à au moins un
          mètre de tout matériau inflammable.
        </p>

        <div className="rounded-xl bg-red-50 p-5 ring-1 ring-red-200">
          <p className="mb-3 flex items-start gap-3 font-semibold text-red-900">
            <Flame className="mt-0.5 size-5 shrink-0 text-red-600" />
            Ce qu&apos;il ne faut jamais faire
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-800">
            <li>
              <strong>Allumer un feu pendant une interdiction.</strong> Cela inclut tout brûlage :
              herbe, débris, feu de camp, même dans un foyer, une grille ou un anneau de feu prévu à
              cet effet.
            </li>
            <li>
              <strong>Utiliser un barbecue au charbon de bois pendant une interdiction.</strong> Il
              est interdit, qu&apos;il vienne de chez vous ou qu&apos;il soit déjà sur place. Seuls
              les appareils au gaz ou à combustible liquide avec valve sont acceptés.
            </li>
            <li>
              <strong>Apporter du bois de chauffage de la maison.</strong> Transporter du bois
              propage des insectes et des maladies invasives comme l&apos;agrile du frêne. Déplacer
              du bois hors d&apos;une zone sous quarantaine sans autorisation de l&apos;ACIA peut
              entraîner des sanctions pouvant atteindre 50 000 $. Achetez le bois sur place ou
              localement.
            </li>
            <li>
              <strong>Ramasser du bois dans le parc.</strong> C&apos;est interdit : le bois mort au
              sol fait partie de l&apos;écosystème.
            </li>
            <li>
              <strong>Déplacer un foyer ou en créer un nouveau.</strong> Utilisez uniquement
              l&apos;installation existante de votre emplacement.
            </li>
            <li>
              <strong>Laisser un feu sans surveillance, même une minute.</strong> En Ontario, on
              compte en moyenne au moins un feu de forêt par jour durant la saison de camping causé
              par un feu mal éteint ou laissé seul.
            </li>
            <li>
              <strong>Partir en pensant que « ça va s&apos;éteindre tout seul ».</strong> Laissez le
              feu se consumer jusqu&apos;aux cendres, noyez-le abondamment, remuez les cendres et
              ajoutez encore de l&apos;eau. Le feu doit être froid au toucher.
            </li>
            <li>
              <strong>Faire un feu sur la plage ou dans les dunes.</strong> Les feux sont limités
              aux foyers des emplacements de camping.
            </li>
          </ul>
        </div>

        <p>
          Un rappel qui pèse lourd : si votre feu déclenche un incendie de forêt, vous pouvez être
          tenu responsable des coûts d&apos;extinction et des dommages.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Où acheter son bois</H3>
        <p>
          Le bois se vend généralement au bureau du camping ou chez les commerces des environs.
          Privilégiez le bois séché au four (kiln-dried) lorsqu&apos;il est offert. La règle simple
          à retenir : <strong>on achète son bois là où on le brûle</strong>.
        </p>
      </section>

      {/* Producteurs et vignobles */}
      <section id="producteurs" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <ShoppingBasket className="size-7 text-indigo-600" />
          Vignobles et producteurs du comté
        </H2>
        <p>
          Le Prince Edward County compte plusieurs dizaines de vignobles, dont beaucoup se visitent
          et proposent des dégustations. La région s&apos;est bâti une réputation solide, notamment
          pour ses chardonnays et ses pinots noirs, portée par un terroir calcaire distinctif.
        </p>
        <p>
          S&apos;ajoutent des cidreries, des microbrasseries, des fromageries et des marchés
          fermiers. Plusieurs vignobles disposent de leur propre table, ce qui permet de combiner
          dégustation et repas dans un même arrêt.
        </p>
        <p>
          Deux conseils pratiques : prévoyez un conducteur désigné ou une visite guidée avec
          transport si vous comptez déguster, et gardez un peu d&apos;argent comptant, certains
          petits producteurs n&apos;acceptant pas toutes les cartes.
        </p>
      </section>

      {/* Comment s'y rendre */}
      <section id="getting-there" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Map className="size-7 text-indigo-600" />
          Comment s&apos;y rendre depuis le Québec
        </H2>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Depuis Montréal</H3>
        <p>
          Environ <strong>380 km et 4 h à 4 h 30 de route</strong>. On emprunte l&apos;autoroute 20
          puis la 401 ouest, avant de bifurquer vers Belleville ou Trenton et de descendre dans le
          comté. Le parc se situe à environ 14 km de Picton, soit une vingtaine de minutes.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Depuis la ville de Québec</H3>
        <p>
          Comptez plutôt <strong>6 h 30 à 7 h</strong>. Beaucoup de familles coupent le trajet avec
          une nuit à Montréal ou à Kingston.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Sans voiture</H3>
        <p>
          C&apos;est possible mais peu pratique : le train VIA Rail dessert Belleville, puis il faut
          un taxi ou une location pour la trentaine de kilomètres restants. Sur place, une voiture
          reste presque indispensable pour circuler entre les plages, les villages et les vignobles.
        </p>
        <p>
          Pensez à faire le plein avant d&apos;entrer dans le comté, où les stations sont plus
          espacées.
        </p>
      </section>

      {/* Erreurs fréquentes */}
      <section id="erreurs" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <AlertTriangle className="size-7 text-indigo-600" />
          Erreurs fréquentes à éviter
        </H2>
        <ul className="list-disc space-y-3 pl-6">
          <li>
            <strong>Arriver sans permis de véhicule.</strong> L&apos;erreur la plus coûteuse : par
            forte affluence, vous serez refusé après quatre heures de route.
          </li>
          <li>
            <strong>Viser le camping du parc trop tard.</strong> Les emplacements d&apos;été se
            réservent des mois à l&apos;avance.
          </li>
          <li>
            <strong>Sous-estimer le soleil.</strong> Sans parasol, une journée complète sur la plage
            devient vite pénible avec des enfants.
          </li>
          <li>
            <strong>Se garer sur les routes du comté.</strong> Contravention ou remorquage assurés.
          </li>
          <li>
            <strong>Se fier au GPS pour « la plage ».</strong> Les trois secteurs ont des entrées
            distinctes ; entrez la destination précise pour éviter un détour de vingt minutes.
          </li>
          <li>
            <strong>Marcher hors sentier dans les dunes.</strong> Écosystème fragile et protégé.
          </li>
        </ul>
      </section>

      {/* Conseils pratiques */}
      <section id="tips" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <DollarSign className="size-7 text-indigo-600" />
          Conseils pratiques
        </H2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            Réservez le permis de véhicule dès l&apos;ouverture, cinq jours avant, à 7 h HE précises
            pour les fins de semaine d&apos;été.
          </li>
          <li>Imprimez la confirmation pour utiliser la voie de contournement à l&apos;entrée.</li>
          <li>Arrivez en matinée les fins de semaine : les stationnements se remplissent vite.</li>
          <li>Apportez parasol, crème solaire, chapeaux et beaucoup d&apos;eau.</li>
          <li>Prévoyez sandales ou chaussures fermées pour le sable brûlant.</li>
          <li>
            Composez un pique-nique à Picton : l&apos;offre de restauration dans le parc est
            limitée.
          </li>
          <li>Gardez de l&apos;argent comptant pour les petits producteurs du comté.</li>
          <li>
            Visez début septembre si votre horaire le permet : eau encore chaude, beaucoup moins de
            monde.
          </li>
          <li>Faites le plein d&apos;essence avant d&apos;entrer dans le comté.</li>
        </ul>
      </section>
    </DestinationArticleTemplate>
  );
}
