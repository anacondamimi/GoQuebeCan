import Image from 'next/image';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_WASAGA_BEACH } from '@/data/hotels/byArticle/wasaga-beach';
import { bookingAwin } from '@/lib/awin';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';
import DestinationFaq from '@/components/blog/DestinationFaq';

import {
  Waves,
  Calendar,
  DollarSign,
  Car,
  Sun,
  Map,
  Baby,
  AlertTriangle,
  Star,
  Footprints,
  CloudSun,
  Wind,
  Flame,
  ShieldAlert,
  Dog,
  Landmark,
} from 'lucide-react';

const hotels = pickHotels(HOTEL_IDS_WASAGA_BEACH);

const restaurants = [
  {
    name: 'Catch 22 Fresh Market Grill',
    city: 'Wasaga Beach',
    type: 'Grill et poissonnerie',
    speciality: 'Poisson frais et fruits de mer',
    price: '$$$',
    mustTry: 'Poisson du jour et fish and chips',
    schedule: 'Selon la saison',
    vibe: 'Décontracté & frais',
    tip: "L'une des adresses les mieux cotées de la ville. Réservez ou arrivez tôt en juillet.",
  },
  {
    name: 'Black Bellows',
    city: 'Wasaga Beach',
    type: 'Brasserie et pub',
    speciality: 'Bières artisanales et cuisine de pub soignée',
    price: '$$',
    mustTry: 'Bières maison et plats à partager',
    schedule: 'Toute l’année',
    vibe: 'Chaleureux & animé',
    tip: 'Terrasse agréable en soirée, bonne option après une journée de plage.',
  },
  {
    name: 'Georgian Circle Steak & Seafood',
    city: 'Wasaga Beach',
    type: 'Grillades et fruits de mer',
    speciality: 'Steaks et poissons grillés',
    price: '$$$',
    mustTry: 'Steak et assiettes de fruits de mer',
    schedule: 'Réservation recommandée',
    vibe: 'Classique & soigné',
    tip: 'Le choix pour un souper un peu plus habillé, sans quitter Wasaga.',
  },
  {
    name: "Grandma's Beach Treats",
    city: 'Wasaga Beach',
    type: 'Casse-croûte et desserts',
    speciality: 'Beignes, pâtisseries et déjeuners',
    price: '$',
    mustTry: 'Beignes frais du matin',
    schedule: 'Surtout en saison',
    vibe: 'Institution locale',
    tip: 'Parfait pour un déjeuner rapide avant la plage ou une pause sucrée avec les enfants.',
  },
  {
    name: 'British Cuisine Fish & Chips',
    city: 'Wasaga Beach',
    type: 'Cantine de plage',
    speciality: 'Fish and chips à l’anglaise',
    price: '$$',
    mustTry: 'Morue panée et frites',
    schedule: 'Surtout en haute saison',
    vibe: 'Simple & généreux',
    tip: 'Un classique de bord de plage, souvent cité comme le meilleur fish and chips du secteur.',
  },
];

const faqItems = [
  {
    question: 'Combien de temps faut-il pour se rendre à Wasaga Beach depuis Montréal ?',
    answer:
      "Comptez environ 7 heures de route depuis Montréal, ce qui en fait une destination de séjour plutôt que d'excursion d'un jour. Depuis Toronto, le trajet tombe à environ 2 heures. Beaucoup de Québécois coupent la route avec une nuit à Kingston ou à Toronto, ou combinent Wasaga avec un plus grand circuit en Ontario.",
  },
  {
    question: 'Faut-il réserver son stationnement à Wasaga Beach ?',
    answer:
      "Oui, c'est fortement recommandé. Pour les secteurs 1 à 6 du parc provincial, le permis de véhicule journalier se réserve jusqu'à cinq jours à l'avance, en ligne ou par téléphone. Le parc atteint régulièrement sa capacité les fins de semaine d'été et les barrières ferment alors pour des raisons de sécurité. Sans réservation, vous risquez de ne pas pouvoir entrer.",
  },
  {
    question: 'Quelle est la différence entre le stationnement provincial et municipal ?',
    answer:
      "C'est le piège le plus fréquent. Le parc provincial gère certains secteurs de plage avec ses propres permis, tandis que la Ville de Wasaga Beach gère d'autres stationnements avec un système de paiement distinct, généralement via une application mobile. Les deux types de permis ne sont pas interchangeables : un permis provincial ne donne pas accès à un stationnement municipal, et inversement. Vérifiez bien quel secteur vous visez avant de payer.",
  },
  {
    question: 'Peut-on amener son chien sur la plage à Wasaga Beach ?',
    answer:
      "Dans le parc provincial, un seul endroit l'autorise : le secteur 3 (Beach Area 3), sur la 22e rue Nord, et seulement dans une portion précise de la plage. Ailleurs dans le parc, les chiens ne sont pas admis sur le sable. C'est une règle régulièrement enfreinte et régulièrement rappelée par les visiteurs comme par le personnel.",
  },
  {
    question: 'Quelle zone de plage choisir à Wasaga Beach ?',
    answer:
      "Le parc provincial compte plusieurs secteurs numérotés aux ambiances très différentes. Les secteurs proches du centre-ville sont les plus animés, avec commerces et restauration à distance de marche. Les secteurs plus éloignés, comme le 5 et le 6, sont généralement plus calmes et conviennent mieux aux familles qui cherchent de l'espace. Le secteur 3 est le seul à admettre les chiens.",
  },
  {
    question: 'Quelle est la météo typique à Wasaga Beach ?',
    answer:
      "L'été est la saison de la baignade, avec une eau qui se réchauffe bien puisqu'elle est peu profonde sur une grande distance. Le vent de la baie Georgienne est un facteur à surveiller : il peut lever rapidement et changer complètement l'ambiance d'une journée. Consultez les prévisions pour Wasaga Beach même plutôt que pour Barrie ou Toronto, les conditions au bord de la baie étant souvent différentes.",
  },
  {
    question: 'Comment vérifier la qualité de l’air avant de partir ?',
    answer:
      "Consultez la Cote air santé (CAS) d'Environnement et Changement climatique Canada, une échelle de 1 à 10+ où un chiffre élevé indique un risque accru. L'application MétéoCAN permet de recevoir une notification quand la cote change. La fumée des feux de forêt peut voyager sur des centaines de kilomètres : l'air peut être affecté même sans feu à proximité, et même si vous ne voyez ni ne sentez de fumée.",
  },
  {
    question: 'Peut-on faire un feu à Wasaga Beach ?',
    answer:
      "Aucun permis de feu de camp n'est exigé dans la Ville de Wasaga Beach, mais le règlement municipal sur les feux à ciel ouvert encadre strictement la pratique : uniquement du bois sec séché au moins un an, jamais de déchets, de branches ou de matériaux de construction, des plages horaires interdites, et personne de moins de 16 ans ne peut surveiller un feu. Aucun feu n'est permis lorsqu'une interdiction est en vigueur. Renseignez-vous auprès de votre hébergement, car les règles diffèrent selon le lieu.",
  },
  {
    question: 'Peut-on camper dans le parc provincial de Wasaga Beach ?',
    answer:
      "Non. Wasaga Beach Provincial Park est un parc de jour : il n'offre pas de camping. Pour camper, il faut se tourner vers les parcs provinciaux voisins comme Awenda, Craigleith ou Earl Rowe, tous à environ 35 à 50 minutes de route, ou vers les campings privés du secteur.",
  },
  {
    question: 'Wasaga Beach est-elle vraiment la plus longue plage d’eau douce au monde ?',
    answer:
      "C'est le titre que revendique la destination, avec environ 14 kilomètres de sable le long de la baie Georgienne. C'est aussi ce qui explique la structure du parc en plusieurs secteurs numérotés plutôt qu'en une seule aire de stationnement.",
  },
  {
    question: 'Quelle est la meilleure période pour visiter Wasaga Beach ?',
    answer:
      "Juillet et août pour la baignade et l'animation, avec en contrepartie une affluence importante et des barrières qui ferment tôt les fins de semaine. Le printemps et le début de l'automne offrent une expérience beaucoup plus tranquille, recommandée par le parc lui-même pour éviter la foule — l'eau est plus fraîche, mais les plages et les sentiers sont nettement plus agréables.",
  },
];

export default function BlogArticleWasagaBeach() {
  const ctaBookingUrl = bookingAwin('https://www.booking.com/city/ca/wasaga-beach.fr.html');

  return (
    <DestinationArticleTemplate
      slug="wasaga-beach"
      title="Wasaga Beach — la plus longue plage d'eau douce au monde"
      subtitle="Quatorze kilomètres de sable le long de la baie Georgienne, des secteurs de plage aux ambiances très différentes et plus de 25 km de sentiers. Le guide complet pour préparer votre séjour, du stationnement aux règles de feux."
      toc={[
        { id: 'intro', label: 'Introduction' },
        { id: 'essentiel', label: "L'essentiel en bref" },
        { id: 'zones', label: 'Quelle zone de plage choisir' },
        { id: 'why', label: 'Pourquoi y aller' },
        { id: 'stationnement', label: 'Stationnement & permis' },
        { id: 'itinerary', label: 'Itinéraire conseillé (2 jours)' },
        { id: 'familles', label: 'Avec des enfants' },
        { id: 'ados', label: 'Ados & sports nautiques' },
        { id: 'sentiers', label: 'Sentiers & nature' },
        { id: 'nancy-island', label: 'Nancy Island et l’histoire de 1812' },
        { id: 'chiens', label: 'Avec un chien' },
        { id: 'meteo', label: 'Météo & température de l’eau' },
        { id: 'qualite-air', label: 'Qualité de l’air & fumée' },
        { id: 'feux', label: 'Feux : règles & interdictions' },
        { id: 'saisons', label: 'Quand y aller' },
        { id: 'ou-dormir', label: 'Où dormir' },
        { id: 'ou-manger', label: 'Où manger' },
        { id: 'getting-there', label: "Comment s'y rendre depuis le Québec" },
        { id: 'erreurs', label: 'Erreurs fréquentes à éviter' },
        { id: 'tips', label: 'Conseils pratiques' },
        { id: 'faq', label: 'FAQ' },
        { id: 'cta', label: 'Réserver & liens utiles' },
      ]}
      hotelIntro={{
        title: 'Où dormir à Wasaga Beach',
        text: "Le parc provincial n'offre pas de camping : c'est un parc de jour. Il faut donc loger en ville, où l'offre va du motel de bord de plage au complexe familial. Réservez tôt pour juillet et août, la demande est forte.",
      }}
      restaurantIntro={{
        title: 'Où manger à Wasaga Beach',
        text: "La ville vit au rythme des saisons : la rue principale s'anime l'été de terrasses, de cantines et de casse-croûtes, puis retrouve un rythme plus local le reste de l'année. Voici des adresses qui reviennent régulièrement dans les recommandations.",
      }}
      faqIntro={{
        title: 'FAQ sur Wasaga Beach',
        text: 'Les réponses aux questions que se posent le plus souvent les visiteurs avant de partir.',
      }}
      hotelSection={<HotelGrid items={hotels} />}
      restaurantSection={<RestaurantPremiumGrid items={restaurants} />}
      faqSection={<DestinationFaq items={faqItems} />}
      conclusion={{
        title: 'Réserver et liens utiles',
        text: "Wasaga Beach demande un peu de préparation, surtout pour le stationnement, qui reste la principale source de mauvaises surprises. Une fois ce point réglé, c'est l'une des plus belles journées de plage qu'offre l'Ontario.",
        ctas: [
          {
            label: 'Voir les hébergements à Wasaga Beach',
            href: ctaBookingUrl,
          },
        ],
      }}
    >
      {/* Introduction */}
      <section id="intro" className="space-y-4 text-gray-700">
        <p>
          Quatorze kilomètres de sable fin le long de la baie Georgienne :{' '}
          <strong>Wasaga Beach</strong> revendique le titre de plus longue plage d&apos;eau douce au
          monde. C&apos;est une destination estivale qui vit à fond en juillet et en août, avec ses
          terrasses, ses festivals et ses couchers de soleil sur la baie.
        </p>
        <p>
          Mais Wasaga se prépare différemment des autres plages ontariennes. Le parc provincial est
          découpé en <strong>plusieurs secteurs de plage numérotés</strong>, chacun avec son propre
          stationnement, ses propres commodités et sa propre ambiance. S&apos;ajoute un système de
          stationnement à deux vitesses — provincial d&apos;un côté, municipal de l&apos;autre — qui
          piège chaque année des milliers de visiteurs.
        </p>
        <p>
          Ce guide couvre tout ce qu&apos;il faut savoir avant de partir : quel secteur choisir, où
          et comment réserver son stationnement, ce qui est permis avec un chien, les règles de
          feux, et comment vérifier la météo et la qualité de l&apos;air.
        </p>

        <figure className="mt-6">
          <Image
            src="/images/destinations/wasaga-beach.avif"
            alt="Plage de sable et eaux peu profondes de la baie Georgienne à Wasaga Beach en Ontario"
            width={1200}
            height={675}
            className="rounded-xl"
            priority
          />
          <figcaption className="mt-2 text-center text-sm text-gray-500">
            Wasaga Beach, sur les rives de la baie Georgienne, en Ontario.
          </figcaption>
        </figure>
      </section>

      {/* L'essentiel */}
      <section id="essentiel" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-7 text-indigo-600" />
          L&apos;essentiel en bref
        </H2>
        <div className="rounded-xl bg-indigo-50 p-5 ring-1 ring-indigo-100">
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Où :</strong> baie Georgienne, Ontario, à environ 2 h de Toronto et 7 h de
              Montréal.
            </li>
            <li>
              <strong>La plage :</strong> environ 14 km, découpée en secteurs numérotés.
            </li>
            <li>
              <strong>À réserver :</strong> permis de véhicule journalier pour les secteurs 1 à 6,
              jusqu&apos;à 5 jours à l&apos;avance.
            </li>
            <li>
              <strong>Attention :</strong> permis provincial et stationnement municipal ne sont pas
              interchangeables.
            </li>
            <li>
              <strong>Chiens :</strong> uniquement dans une portion du secteur 3.
            </li>
            <li>
              <strong>Camping :</strong> aucun dans le parc — c&apos;est un parc de jour.
            </li>
            <li>
              <strong>Sentiers :</strong> plus de 25 km, du littoral à la forêt en passant par les
              dunes.
            </li>
            <li>
              <strong>Affluence :</strong> maximale les samedis, dimanches et lundis fériés, entre 9
              h et 16 h.
            </li>
          </ul>
        </div>
      </section>

      {/* Zones de plage */}
      <section id="zones" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Waves className="size-7 text-indigo-600" />
          Quelle zone de plage choisir
        </H2>
        <p>
          C&apos;est la décision qui structure toute votre journée. Wasaga n&apos;est pas une plage
          unique : le parc provincial compte plusieurs secteurs, auxquels s&apos;ajoutent des plages
          gérées par la municipalité. Les secteurs 1 à 6 se trouvent à l&apos;ouest de la rivière
          Nottawasaga et s&apos;atteignent par Mosley Street.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Les secteurs animés</H3>
        <p>
          Les zones les plus proches du centre-ville concentrent l&apos;action : commerces,
          restaurants, casse-croûtes et animation à distance de marche. C&apos;est là que
          l&apos;ambiance de station balnéaire est la plus marquée, et aussi là que le stationnement
          part le plus vite.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Les secteurs tranquilles</H3>
        <p>
          En s&apos;éloignant du centre, les secteurs deviennent nettement plus calmes. Le secteur
          6, par exemple, offre du sable, de l&apos;eau peu profonde, des aires de pique-nique et de
          très beaux couchers de soleil, avec beaucoup moins de monde. Les toilettes y sont
          généralement propres, mais il n&apos;y a pas de douches.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Le secteur 3, à part</H3>
        <p>
          Situé sur la 22<sup>e</sup> rue Nord, c&apos;est le <strong>seul secteur du parc</strong>{' '}
          où les chiens sont admis sur la plage, et uniquement dans une portion délimitée.
        </p>

        <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <p className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <span>
              Le permis de véhicule journalier <strong>n&apos;est pas transférable</strong>{' '}
              d&apos;un secteur à l&apos;autre. Choisissez votre zone avant de réserver, pas après.
            </span>
          </p>
        </div>
      </section>

      {/* Pourquoi y aller */}
      <section id="why" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Sun className="size-7 text-indigo-600" />
          Pourquoi y aller
        </H2>
        <p>
          L&apos;eau de la baie Georgienne est peu profonde sur une longue distance à Wasaga, ce qui
          la rend chaude en été et rassurante avec de jeunes enfants. On peut marcher très loin
          avant d&apos;avoir de l&apos;eau à la taille.
        </p>
        <p>
          La longueur de la plage change aussi l&apos;expérience : même les jours d&apos;affluence,
          il reste possible de trouver un secteur plus tranquille en s&apos;éloignant du centre. Et
          l&apos;orientation de la baie offre des couchers de soleil qui se couchent littéralement
          dans l&apos;eau, face à la plage.
        </p>
        <p>
          Enfin, contrairement à une plage isolée, Wasaga est une véritable petite ville balnéaire :
          restauration, location d&apos;équipement, événements et musique en direct animent la
          saison estivale.
        </p>
      </section>

      {/* Stationnement */}
      <section id="stationnement" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Car className="size-7 text-indigo-600" />
          Stationnement et permis : le point à ne pas rater
        </H2>
        <p>
          <strong>C&apos;est de loin la principale source de mauvaises surprises à Wasaga.</strong>{' '}
          Deux systèmes coexistent et ne communiquent pas entre eux.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Le parc provincial</H3>
        <p>
          Pour les <strong>secteurs 1 à 6</strong>, le permis de véhicule journalier se réserve
          jusqu&apos;à <strong>cinq jours avant la visite</strong>, en ligne ou par téléphone. Le
          parc recommande fortement de réserver : une fois les stationnements pleins, les barrières
          ferment pour des raisons de sécurité.
        </p>
        <p>
          Deux détails importants : le permis n&apos;est <strong>pas transférable</strong> entre les
          secteurs, et une fois stationné, il est conseillé de rester sur place — la ré-entrée
          n&apos;est pas garantie si les barrières ont fermé entretemps.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Les stationnements municipaux</H3>
        <p>
          La Ville de Wasaga Beach gère ses propres aires de stationnement, avec paiement à
          l&apos;heure ou à la journée via une application mobile.{' '}
          <strong>Les permis provinciaux et municipaux ne sont pas interchangeables.</strong> Un
          permis d&apos;Ontario Parks ne vous donne aucun droit dans un stationnement de la ville,
          et inversement.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Le piège du GPS</H3>
        <p>
          Entrer simplement « Wasaga Beach Area 1 » dans une application de navigation peut vous
          diriger vers un stationnement <em>municipal</em> plutôt que vers le secteur du parc
          provincial que vous avez réservé. Vérifiez l&apos;adresse exacte figurant sur votre
          confirmation avant de partir.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Quand arriver</H3>
        <p>
          Le parc est le plus achalandé les{' '}
          <strong>samedis, dimanches et lundis fériés, entre 9 h et 16 h</strong>. Arriver avant 9 h
          ou après 16 h change complètement l&apos;expérience, surtout en juillet et en août.
        </p>
      </section>

      {/* Itinéraire */}
      <section id="itinerary" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Calendar className="size-7 text-indigo-600" />
          Itinéraire conseillé (2 jours)
        </H2>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Jour 1 — Plage et centre-ville</H3>
        <p>
          Arrivée en matinée, stationnement réservé à l&apos;avance dans un secteur central.
          Baignade, jeux de plage et dîner sur la rue principale. Fin d&apos;après-midi plus
          tranquille, puis souper en terrasse et coucher de soleil sur la baie — le moment fort de
          la journée.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Jour 2 — Nature et histoire</H3>
        <p>
          Matinée sur les sentiers du parc, qui traversent dunes, forêt et milieux humides. Visite
          de <strong>Nancy Island</strong> pour l&apos;histoire de la guerre de 1812, puis
          après-midi dans un secteur de plage plus éloigné, plus calme, avant le retour.
        </p>
      </section>

      {/* Familles */}
      <section id="familles" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Baby className="size-7 text-indigo-600" />
          Avec des enfants
        </H2>
        <p>
          Wasaga est une destination très adaptée aux familles. L&apos;eau peu profonde sur une
          longue distance permet aux plus jeunes de jouer en sécurité, et plusieurs secteurs
          disposent d&apos;aires de jeux, de tables de pique-nique et de terrains de volleyball.
        </p>
        <p>
          Choisissez un secteur selon l&apos;âge de vos enfants : les zones centrales pour
          l&apos;animation et l&apos;accès facile aux commerces et aux toilettes, les zones
          éloignées pour l&apos;espace et le calme. Notez que certains secteurs n&apos;ont pas de
          douches — prévoyez de l&apos;eau pour rincer le sable.
        </p>
        <p>
          Comme partout sur une longue plage exposée, l&apos;ombre est rare. Parasol, crème solaire
          et chapeaux sont à mettre dans la voiture avant de partir.
        </p>
      </section>

      {/* Ados */}
      <section id="ados" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Waves className="size-7 text-indigo-600" />
          Ados et sports nautiques
        </H2>
        <p>
          C&apos;est l&apos;un des points forts de Wasaga pour les familles avec adolescents. La
          baie se prête bien à la planche à pagaie et au kayak, particulièrement le matin, quand
          l&apos;eau est la plus calme. Des commerces de location s&apos;installent le long de la
          plage durant la saison.
        </p>
        <p>
          Les terrains de volleyball de plage, gratuits, sont un classique de fin d&apos;après-midi.
          Et la rue principale, avec ses casse-croûtes et ses arcades, donne aux ados une autonomie
          appréciable pendant que les parents restent sur le sable.
        </p>
        <p>
          Les tarifs de location varient d&apos;un commerce et d&apos;une saison à l&apos;autre :
          vérifiez sur place ou en ligne avant de prévoir un budget.
        </p>
      </section>

      {/* Sentiers */}
      <section id="sentiers" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Footprints className="size-7 text-indigo-600" />
          Sentiers et nature
        </H2>
        <p>
          C&apos;est la facette méconnue de Wasaga. Le parc propose{' '}
          <strong>plus de 25 kilomètres de sentiers</strong> de longueurs et de paysages variés :
          bord de l&apos;eau, forêt, dunes et milieux humides.
        </p>
        <p>
          L&apos;observation d&apos;oiseaux y est réputée, et le printemps comme l&apos;automne
          offrent des conditions idéales pour marcher — fraîcheur, tranquillité et lumière. Une
          bonne raison de venir hors saison, quand les plages sont désertes mais que le parc reste
          magnifique.
        </p>
      </section>

      {/* Nancy Island */}
      <section id="nancy-island" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Landmark className="size-7 text-indigo-600" />
          Nancy Island et l&apos;histoire de 1812
        </H2>
        <p>
          Le site historique de <strong>Nancy Island</strong> raconte un épisode marquant de la
          guerre de 1812 sur les Grands Lacs, autour du destin du navire <em>Nancy</em>. C&apos;est
          une visite courte, à échelle humaine, qui offre une belle alternative les jours de
          canicule, de pluie ou de mauvaise qualité de l&apos;air.
        </p>
        <p>
          Le stationnement s&apos;y obtient généralement à l&apos;arrivée, premier arrivé premier
          servi, plutôt que par réservation. Vérifiez les heures d&apos;ouverture avant de vous
          déplacer, elles varient selon la saison.
        </p>
      </section>

      {/* Chiens */}
      <section id="chiens" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Dog className="size-7 text-indigo-600" />
          Avec un chien
        </H2>
        <p>
          La règle est simple mais souvent ignorée : dans le parc provincial, les chiens ne sont
          admis sur la plage que dans <strong>une portion précise du secteur 3</strong>, sur la 22
          <sup>e</sup> rue Nord. Partout ailleurs dans le parc, ils ne sont pas permis sur le sable.
        </p>
        <p>
          Si vous voyagez avec un chien, réservez donc directement pour ce secteur. Et gardez à
          l&apos;esprit qu&apos;une voiture stationnée au soleil sur une plage exposée devient
          dangereuse très vite — ne laissez jamais un animal à l&apos;intérieur.
        </p>
      </section>

      {/* Météo */}
      <section id="meteo" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <CloudSun className="size-7 text-indigo-600" />
          Météo à Wasaga Beach et température de l&apos;eau
        </H2>
        <p>
          C&apos;est la vérification que font presque tous les visiteurs la veille du départ, et
          elle compte double ici : le stationnement se réserve à l&apos;avance et ne se rembourse
          pas nécessairement, donc mieux vaut connaître la tendance avant de payer.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">La température de l&apos;eau</H3>
        <p>
          L&apos;eau se réchauffe bien en été parce qu&apos;elle est peu profonde sur une grande
          distance. En juillet et en août, la baignade est confortable. Dès la mi-septembre, elle
          redescend rapidement : des visiteurs rapportent une eau autour de 19 °C à cette période —
          agréable pour la planche à pagaie ou le kayak, plus fraîche pour se baigner longtemps.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Le vent, le vrai facteur</H3>
        <p>
          La baie Georgienne peut se lever vite. Une journée annoncée ensoleillée mais ventée change
          complètement l&apos;expérience : sable soulevé, parasol difficile à ancrer, vagues plus
          fortes. À l&apos;inverse, une matinée sans vent offre une eau presque parfaitement lisse,
          idéale pour pagayer.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Où vérifier</H3>
        <p>
          Consultez les prévisions pour <strong>Wasaga Beach</strong> précisément, pas pour Barrie
          ou Toronto : les conditions au bord de la baie diffèrent souvent de celles de
          l&apos;intérieur des terres. L&apos;application MétéoCAN d&apos;Environnement Canada
          regroupe prévisions, avertissements et alertes de qualité de l&apos;air au même endroit.
        </p>

        <div className="rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100">
          <p className="flex items-start gap-3">
            <Wind className="mt-0.5 size-5 shrink-0 text-blue-600" />
            <span>
              <strong>Le réflexe utile :</strong> regardez la vitesse du vent autant que la
              température. C&apos;est souvent lui qui détermine si la journée sera agréable ou
              pénible sur une plage aussi exposée.
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
          C&apos;est devenu un réflexe de planification au Canada. La fumée des feux de forêt peut{' '}
          <strong>voyager sur des centaines, voire des milliers de kilomètres</strong> depuis la
          zone d&apos;incendie : la qualité de l&apos;air peut donc se dégrader à Wasaga Beach même
          si aucun feu ne brûle dans la région.
        </p>
        <p>
          Point souligné par les autorités de santé publique : l&apos;air peut être mauvais{' '}
          <strong>même si vous ne voyez ni ne sentez de fumée</strong>.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">La Cote air santé (CAS)</H3>
        <p>
          Environnement et Changement climatique Canada publie la <strong>Cote air santé</strong>,
          une échelle de 1 à 10+ : plus le chiffre est élevé, plus le risque pour la santé est
          important. Chaque catégorie s&apos;accompagne de recommandations distinctes pour la
          population générale et pour les personnes à risque. Durant un épisode de fumée, la cote
          est recalculée toutes les heures à partir des particules fines (PM2,5).
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Qui doit être vigilant</H3>
        <p>
          Sont considérés plus à risque les enfants de moins de cinq ans, les personnes enceintes,
          les personnes de plus de 65 ans, celles ayant une maladie respiratoire, cardiaque ou le
          diabète, et celles qui font de l&apos;exercice à l&apos;extérieur. Une journée de plage
          active avec des enfants entre pleinement dans cette catégorie.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Quoi faire si l&apos;air est mauvais</H3>
        <ul className="list-disc space-y-2 pl-6">
          <li>Réduisez les activités physiques intenses, surtout pour les enfants.</li>
          <li>Gardez les pompes pour l&apos;asthme à portée de main.</li>
          <li>
            Repliez-vous sur des activités intérieures : Nancy Island, commerces du centre-ville,
            restaurants.
          </li>
          <li>
            En cas de symptômes (toux persistante, souffle court, douleur à la poitrine), rentrez à
            l&apos;intérieur et consultez — Info-Santé 811 au Québec, ou le 911 selon la gravité.
          </li>
        </ul>

        <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
          <p className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <span>
              La saison des feux de forêt s&apos;étend généralement du début avril à la fin octobre.
              Vérifiez la Cote air santé en même temps que la météo, la veille de votre départ.
            </span>
          </p>
        </div>
      </section>

      {/* Feux */}
      <section id="feux" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Flame className="size-7 text-indigo-600" />
          Feux : règles, interdictions et erreurs à éviter
        </H2>
        <p>
          Wasaga Beach a la particularité de ne <strong>pas exiger de permis</strong> de feu de
          camp, mais cela ne veut pas dire que tout est permis. Un règlement municipal sur les feux
          à ciel ouvert encadre la pratique de façon assez stricte, et les règles diffèrent entre le
          territoire de la ville et le parc provincial.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Vérifier avant de partir</H3>
        <p>
          Une interdiction de feu peut être décrétée à tout moment selon les conditions. Consultez
          le site de la Ville de Wasaga Beach et celui des parcs de l&apos;Ontario avant de partir,
          puis vérifiez l&apos;affichage à votre arrivée. Renseignez-vous aussi auprès de votre
          hébergement : un motel, un chalet locatif et un camping privé n&apos;ont pas les mêmes
          règles.
        </p>

        <div className="rounded-xl bg-red-50 p-5 ring-1 ring-red-200">
          <p className="mb-3 flex items-start gap-3 font-semibold text-red-900">
            <Flame className="mt-0.5 size-5 shrink-0 text-red-600" />
            Ce qu&apos;il ne faut jamais faire
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-800">
            <li>
              <strong>Allumer un feu pendant une interdiction.</strong> Lorsqu&apos;une interdiction
              est en vigueur, tout brûlage à ciel ouvert est prohibé, sans exception.
            </li>
            <li>
              <strong>Brûler autre chose que du bois sec.</strong> Le règlement n&apos;autorise que
              du bois séché depuis au moins un an, du petit bois d&apos;allumage ou du charbon
              commercial. Brûler des branches, des résidus de jardin, des déchets ou des matériaux
              de construction est interdit.
            </li>
            <li>
              <strong>Faire un feu à n&apos;importe quelle heure.</strong> Le règlement municipal
              prévoit des plages horaires durant lesquelles les feux ne sont pas permis. Vérifiez
              les heures en vigueur avant d&apos;allumer.
            </li>
            <li>
              <strong>Laisser un mineur surveiller le feu.</strong> Personne de moins de 16 ans ne
              peut être laissé seul en charge d&apos;un feu.
            </li>
            <li>
              <strong>Faire un feu quand un avis de qualité de l&apos;air est émis.</strong> Le
              règlement le prévoit explicitement : la fumée s&apos;ajoute à une pollution déjà
              présente.
            </li>
            <li>
              <strong>Faire un feu directement sur la plage.</strong> Les feux à ciel ouvert ne sont
              pas une activité de plage libre ici — ils relèvent des propriétés privées et des
              installations prévues à cet effet.
            </li>
            <li>
              <strong>Partir sans avoir éteint complètement.</strong> Un feu doit être noyé, remué
              et re-noyé jusqu&apos;à ce qu&apos;il ne reste ni fumée, ni braise, ni cendre chaude.
              Il doit être froid au toucher.
            </li>
            <li>
              <strong>Apporter du bois de chez soi.</strong> Transporter du bois de chauffage
              propage des insectes et des maladies invasives comme l&apos;agrile du frêne.
              Achetez-le localement.
            </li>
          </ul>
        </div>

        <p>
          Ces règles paraissent contraignantes, mais elles s&apos;expliquent : une ville de bord de
          plage avec des propriétés rapprochées, du sable sec et du vent constant est un
          environnement où un feu mal maîtrisé se propage vite.
        </p>
      </section>

      {/* Saisons */}
      <section id="saisons" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Calendar className="size-7 text-indigo-600" />
          Quand y aller
        </H2>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Juillet et août</H3>
        <p>
          La pleine saison : eau chaude, tous les services ouverts, animation, musique et
          événements. En contrepartie, c&apos;est la période où les barrières ferment le plus
          souvent et où il faut impérativement réserver son stationnement.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Printemps et début d&apos;automne</H3>
        <p>
          Le parc lui-même recommande ces périodes pour éviter la foule, et c&apos;est un bon
          conseil. L&apos;eau est plus fraîche, mais les plages sont quasi désertes, les sentiers
          superbes et le stationnement beaucoup plus facile. Un visiteur de septembre décrivait une
          plage pratiquement vide avec une eau parfaitement calme.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Hiver</H3>
        <p>
          Le parc opère aussi une saison hivernale, avec une tout autre ambiance : glace, neige et
          grands espaces. À considérer si vous cherchez une sortie nature originale.
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
          Comptez environ <strong>7 heures de route</strong>. C&apos;est une vraie distance : Wasaga
          se prête mieux à un séjour de quelques jours, ou à une étape dans un circuit ontarien plus
          large, qu&apos;à une escapade de fin de semaine express. Beaucoup coupent le trajet avec
          une nuit à Kingston ou à Toronto.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Depuis Toronto</H3>
        <p>
          Environ <strong>2 heures</strong>, ce qui explique la forte affluence torontoise les fins
          de semaine d&apos;été.
        </p>

        <H3 className="mb-2 mt-6 text-xl font-semibold">Se déplacer sur place</H3>
        <p>
          La ville dispose d&apos;un service de transport à la demande, sur réservation, qui dessert
          une partie du territoire — pratique pour éviter de déplacer la voiture une fois installé.
          La location de vélos est aussi une bonne option pour circuler entre les secteurs.
        </p>
        <p>
          À noter : seules deux routes à l&apos;intérieur de la ville donnent accès aux secteurs de
          plage, ce qui explique les ralentissements aux heures de pointe estivales.
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
            <strong>Confondre stationnement provincial et municipal.</strong> Les permis ne sont pas
            interchangeables — c&apos;est l&apos;erreur numéro un à Wasaga.
          </li>
          <li>
            <strong>Suivre le GPS aveuglément.</strong> Un nom de secteur entré tel quel peut vous
            mener au mauvais stationnement.
          </li>
          <li>
            <strong>Arriver en milieu de journée une fin de semaine d&apos;été.</strong> Entre 9 h
            et 16 h le samedi et le dimanche, vous risquez de trouver les barrières fermées.
          </li>
          <li>
            <strong>Ressortir du secteur après s&apos;être stationné.</strong> La ré-entrée
            n&apos;est pas garantie une fois les barrières fermées.
          </li>
          <li>
            <strong>Amener son chien sur n&apos;importe quelle plage.</strong> Seule une portion du
            secteur 3 l&apos;autorise.
          </li>
          <li>
            <strong>Venir pour camper dans le parc.</strong> Wasaga Beach Provincial Park est un
            parc de jour : il n&apos;y a pas de camping.
          </li>
          <li>
            <strong>Ne regarder que la température.</strong> Sur cette plage, le vent fait souvent
            plus de différence que le thermomètre.
          </li>
        </ul>
      </section>

      {/* Conseils */}
      <section id="tips" className="mt-10 space-y-4 text-gray-700">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <DollarSign className="size-7 text-indigo-600" />
          Conseils pratiques
        </H2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Réservez votre permis de véhicule dès que possible, jusqu&apos;à 5 jours avant.</li>
          <li>
            Choisissez votre secteur avant de réserver : le permis n&apos;est pas transférable.
          </li>
          <li>Notez l&apos;adresse exacte du secteur plutôt que son seul nom pour le GPS.</li>
          <li>Arrivez avant 9 h ou après 16 h les fins de semaine d&apos;été.</li>
          <li>Prévoyez parasol, crème solaire et beaucoup d&apos;eau : l&apos;ombre est rare.</li>
          <li>
            Apportez de l&apos;eau pour rincer : plusieurs secteurs n&apos;ont pas de douches.
          </li>
          <li>Vérifiez météo, vent et Cote air santé la veille, ensemble.</li>
          <li>Si vous voyagez avec un chien, visez le secteur 3 dès la réservation.</li>
          <li>Pour la tranquillité, préférez les secteurs éloignés ou une visite hors saison.</li>
        </ul>
      </section>
    </DestinationArticleTemplate>
  );
}
