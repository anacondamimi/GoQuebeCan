import Image from 'next/image';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_CHAMBLY } from '@/data/hotels/byArticle/chambly';
import { bookingAwin } from '@/lib/awin';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';
import DestinationFaq from '@/components/blog/DestinationFaq';

import {
  Hotel,
  Bike,
  Calendar,
  DollarSign,
  Shield,
  Star,
  Trees,
  Map,
  ShoppingBasket,
} from 'lucide-react';

export const metadata = {
  slug: 'chambly',
  ville: 'Chambly',
  resume:
    'Que faire à Chambly ? Guide complet pour visiter le Fort-Chambly, le canal, les pistes cyclables, les balades au bord du Richelieu, les boulangeries, producteurs locaux, marchés et bonnes adresses gourmandes.',
  activites: [
    'Fort Chambly',
    'Canal de Chambly',
    'Vélo sur la piste du canal',
    'Promenade aux écluses',
    'Pique-nique au bord du Richelieu',
    'Marché de Chambly',
    'Ferme Guyon',
    'Parc naturel des Ruisseaux',
    'Boulangeries artisanales',
    'Fromages du Québec',
  ],
  hebergements: [
    'Hôtel Escad Quartier DIX30',
    'Urban Retreat - 2 Bedroom, 3 Beds, 6 Guests, Free Parking',
    'Quality Inn Saint-Jean-sur-Richelieu',
  ],
  publics: ['familles', 'couples', 'sportifs', 'amoureux de la nature', 'VR', 'gourmands'],
};

const hotels = pickHotels(HOTEL_IDS_CHAMBLY);

const restaurants = [
  {
    name: 'Nord Laboratoire Culinaire',
    city: 'Chambly',
    type: 'Restaurant chic',
    speciality: 'Cuisine raffinée et produits de saison',
    price: '$$$$',
    mustTry: 'Menu dégustation / assiettes du moment',
    schedule: 'Selon horaires',
    image: '/images/restos/chambly/cochonne-rit-chambly.avif',
    vibe: 'Élégant & gourmand',
    tip: 'Très bon choix pour une soirée plus spéciale ou un souper en amoureux.',
  },
  {
    name: 'La Cochonne Rit',
    city: 'Chambly',
    type: 'Cantine gourmande',
    speciality: 'Poutines, burgers et cuisine réconfort',
    price: '$$',
    mustTry: 'Poutine maison',
    schedule: 'Dîner et souper',
    image: '/images/restos/chambly/cochonne-rit-chambly.avif',
    vibe: 'Décontracté & généreux',
    tip: 'Parfait après une activité extérieure quand tu veux manger simple et bon.',
  },
  {
    name: 'La Croisée des Chemins',
    city: 'Chambly',
    type: 'Microbrasserie',
    speciality: 'Bières artisanales et menu bistro',
    price: '$$',
    mustTry: 'Bière maison + plat bistro',
    schedule: 'Fin d’après-midi et soirée',
    image: '/images/carte.avif',
    vibe: 'Vivante & conviviale',
    tip: 'Très bonne ambiance pour finir la journée sans se presser.',
  },
  {
    name: 'Fourquet Fourchette',
    city: 'Chambly',
    type: 'Restaurant du terroir',
    speciality: 'Cuisine locale et produits du Québec',
    price: '$$$',
    mustTry: 'Poutine au canard confit',
    schedule: 'Dîner et souper',
    image: '/images/carte.avif',
    vibe: 'Chaleureux & gourmand',
    tip: 'Très bon choix si tu veux une autre option locale plus gourmande.',
  },
];

const activities = [
  {
    name: 'Fort Chambly',
    type: 'Patrimoine',
    duration: '1 à 2 h',
    price: 'Variable selon saison / accès site',
    description:
      'Le lieu emblématique de Chambly. On y vient pour l’histoire, l’architecture, les pelouses au bord du Richelieu et l’ambiance de vraie sortie qui commence bien.',
    tip: 'Commence ici le matin pour profiter d’un rythme plus calme et de belles photos.',
  },
  {
    name: 'Vélo sur le canal de Chambly',
    type: 'Plein air',
    duration: '1 à 3 h',
    price: 'Gratuit (hors location vélo)',
    description:
      'Une sortie facile à recommander : le long du canal, l’ambiance est douce, plate, agréable, parfaite pour pédaler sans pression et profiter du paysage.',
    tip: 'Idéal en matinée ou en fin de journée pour éviter les grosses chaleurs.',
  },
  {
    name: 'Promenade près des écluses',
    type: 'Nature',
    duration: '45 min à 1 h 30',
    price: 'Gratuit',
    description:
      'Une belle marche accessible pour observer l’eau, les bateaux, les ponts et la vie tranquille autour du canal.',
    tip: 'Très belle lumière en fin de journée, surtout quand tu veux une sortie plus contemplative.',
  },
  {
    name: 'Marché de Chambly ou arrêt gourmand local',
    type: 'Terroir',
    duration: '30 min à 1 h',
    price: 'Selon achats',
    description:
      'L’été, ajouter une touche marché ou terroir rend la journée plus vivante et plus mémorable. C’est une excellente façon de ramener un petit morceau de la région chez soi.',
    tip: 'Parfait entre deux activités, ou avant un pique-nique au bord de l’eau.',
  },
  {
    name: 'Ferme Guyon',
    type: 'Gourmand / famille',
    duration: '45 min à 1 h 30',
    price: 'Selon achats',
    description:
      'Une adresse très agréable pour enrichir la sortie avec des produits locaux, une atmosphère conviviale et un côté découverte qui plaît aux familles comme aux couples.',
    tip: 'Très bonne idée pour compléter un itinéraire avec fruits, légumes, boulangerie et produits du terroir.',
  },
  {
    name: 'Parc naturel des Ruisseaux',
    type: 'Balade nature',
    duration: '45 min à 2 h',
    price: 'Gratuit',
    description:
      'Quand tu veux un Chambly un peu plus vert, plus calme et plus nature, cette balade complète très bien le côté historique et gourmand du centre.',
    tip: 'Choisis cette option si tu veux respirer davantage et sortir du rythme urbain.',
  },
];

const familyActivities = [
  {
    title: 'Visite du Fort Chambly en famille',
    description:
      'Une activité facile à aimer avec de l’histoire, de l’espace pour marcher et un beau parc pour relaxer sans complication.',
    price: 'Variable selon saison',
    tip: 'Ajoute un pique-nique pour transformer la sortie en vraie belle journée.',
  },
  {
    title: 'Pique-nique au bord du Richelieu',
    description:
      'Simple, agréable et parfait avec des enfants qui ont besoin d’espace pour bouger un peu sans programme trop chargé.',
    price: 'Selon ce que tu apportes',
    tip: 'Passe d’abord en boulangerie pour rendre le lunch encore meilleur.',
  },
  {
    title: 'Balade courte près des écluses',
    description:
      'Une promenade tranquille où les enfants aiment souvent observer les bateaux, les passerelles et le mouvement de l’eau.',
    price: 'Gratuit',
    tip: 'Très bien pour finir la journée sans trop les fatiguer.',
  },
];

const teenActivities = [
  {
    title: 'Sortie vélo plus dynamique',
    description:
      'Le canal permet une activité sportive accessible, agréable et motivante pour les ados qui aiment bouger sans que ça devienne trop intense.',
    price: 'Gratuit ou location vélo',
    duration: '1 à 3 h',
    tip: 'Prévois eau, collation et petite pause photo aux écluses.',
  },
  {
    title: 'Pause microbrasserie + ambiance locale',
    description:
      'Pour les familles avec grands ados, l’ambiance du secteur est agréable à découvrir après les activités de la journée.',
    price: 'Selon consommation',
    duration: 'Variable',
    tip: 'Parfait après une journée dehors, surtout si tout le monde veut relaxer.',
  },
  {
    title: 'Découverte gourmande locale',
    description:
      'Choisir un pain artisanal, un fromage du Québec et quelques produits locaux rend la sortie plus mémorable et plus concrète.',
    price: 'Selon achats',
    duration: '30 à 60 min',
    tip: 'Très bonne idée pour compléter un pique-nique ou rapporter quelque chose à la maison.',
  },
];

const panoramas = [
  {
    title: 'Le bord du Richelieu devant le fort',
    description:
      'C’est le décor carte postale de Chambly : eau, patrimoine, arbres et belle lumière. Un arrêt simple qui fait beaucoup.',
  },
  {
    title: 'Les écluses et le canal',
    description:
      'Parfait pour voir le mouvement de l’eau, l’ambiance du lieu et saisir ce côté calme et vivant à la fois.',
  },
  {
    title: 'La promenade riveraine',
    description:
      'Un très beau coin pour marcher doucement, prendre des photos et profiter du rythme de Chambly sans se presser.',
  },
];

const natureIdeas = [
  {
    title: 'Canal + marche douce',
    description:
      'Excellent choix si tu veux un parcours facile, agréable et très accessible pour presque tout le monde.',
  },
  {
    title: 'Canal + vélo',
    description:
      'Le meilleur duo pour découvrir Chambly de façon active sans t’imposer une grosse journée sportive.',
  },
  {
    title: 'Parc naturel des Ruisseaux',
    description:
      'À privilégier si tu veux plus de verdure, plus de silence et un complément nature à ton itinéraire.',
  },
];

const localStops = [
  {
    title: 'Boulangerie du Vieux-Chambly',
    subtitle: 'Pain, viennoiseries et plaisir immédiat',
    description:
      'L’arrêt parfait pour démarrer la journée, préparer un pique-nique ou simplement ajouter une touche chaleureuse et artisanale à la sortie.',
  },
  {
    title: 'Ferme Guyon',
    subtitle: 'Produits locaux, saison et esprit terroir',
    description:
      'Une très belle adresse pour trouver fruits, légumes, produits du Québec, idées gourmandes et inspiration locale en toute saison.',
  },
  {
    title: 'Marché de Chambly',
    subtitle: 'L’été, pour sentir la ville vivre',
    description:
      'Si ta visite tombe au bon moment, c’est une excellente façon d’ajouter producteurs, fraîcheur et ambiance locale à ton parcours.',
  },
];

const practicalCards = [
  {
    title: 'Stationnement',
    description:
      'La sortie est facile à gérer en voiture, avec plusieurs options de stationnement selon le secteur où tu commences ta journée.',
  },
  {
    title: 'VR / véhicule récréatif',
    description:
      'Chambly est une bonne étape pratique pour une sortie de jour ou un arrêt bien organisé, surtout si tu combines patrimoine, canal et terroir.',
  },
  {
    title: 'Quand y aller',
    description:
      'De la fin du printemps au début de l’automne, Chambly donne généralement sa version la plus douce, vivante et gourmande.',
  },
];

const faqItems = [
  {
    question: 'Que faire à Chambly en une journée ?',
    answer:
      'Une journée suffit très bien pour découvrir le Fort Chambly, longer le canal, marcher près des écluses, faire une pause gourmande et ajouter un arrêt terroir comme une boulangerie, un marché ou une ferme.',
  },
  {
    question: 'Chambly est-elle une bonne destination pour un week-end ?',
    answer:
      'Oui. Chambly fonctionne très bien pour une journée, mais aussi pour un court séjour si tu veux prendre davantage ton temps, dormir dans les environs et explorer d’autres arrêts sur la Rive-Sud.',
  },
  {
    question: 'Peut-on visiter Chambly sans gros budget ?',
    answer:
      'Oui. Plusieurs activités extérieures sont gratuites, comme les balades au bord de l’eau, certaines portions du canal ou les arrêts gourmands libres. Tu peux ensuite ajuster ton budget selon les repas, les achats locaux et l’hébergement.',
  },
  {
    question: 'Chambly est-elle intéressante pour les amateurs de produits locaux ?',
    answer:
      'Oui, c’est même un très bon angle de visite. Entre boulangerie artisanale, produits du terroir, marchés saisonniers, fromages et fermes dans les environs, tu peux facilement transformer la sortie en escapade gourmande.',
  },
  {
    question: 'Peut-on venir à Chambly en VR ou en van ?',
    answer:
      'Oui, comme étape de jour ou arrêt pratique bien préparé. Il est judicieux de vérifier à l’avance ton stationnement, ton gabarit et tes besoins si tu voyages avec un plus gros véhicule.',
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-100">
      {children}
    </span>
  );
}

function SoftCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <H3>{title}</H3>
      <div className="mt-3 text-sm leading-7 text-gray-700">{children}</div>
    </div>
  );
}

export default function BlogArticleChambly() {
  const ctaBookingUrl = bookingAwin('https://www.booking.com/city/ca/chambly.fr.html');

  return (
    <DestinationArticleTemplate
      slug="chambly"
      title="Chambly — fort historique, canal paisible et escapade gourmande sur la Rive-Sud"
      subtitle="Une destination toute proche de Montréal où patrimoine, vélo, bord de l’eau, producteurs locaux et bonnes adresses créent une journée simple, douce et vraiment agréable."
      toc={[
        { id: 'intro', label: 'Introduction' },
        { id: 'incontournables', label: 'Incontournables (Top 5)' },
        { id: 'why', label: 'Pourquoi visiter' },
        { id: 'itinerary', label: 'Itinéraire conseillé (1 jour)' },
        { id: 'activities', label: 'Activités & attractions' },
        { id: 'panoramas', label: 'Panoramas & plus beaux coins' },
        { id: 'nature', label: 'Balades, sentiers & vélo' },
        { id: 'kids', label: 'Activités pour enfants' },
        { id: 'teens', label: 'Activités pour ados / actifs' },
        { id: 'bakeries', label: 'Boulangeries' },
        { id: 'terroir', label: 'Producteurs, fromages & marché' },
        { id: 'vr-camping', label: 'VR, stationnement & infos pratiques' },
        { id: 'ou-dormir', label: 'Où dormir' },
        { id: 'ou-manger', label: 'Où manger' },
        { id: 'getting-there', label: "Comment s'y rendre" },
        { id: 'tips', label: 'Conseils pratiques' },
        { id: 'faq', label: 'FAQ' },
        { id: 'cta', label: 'Réserver & liens utiles' },
      ]}
      hotelIntro={{
        title: 'Où dormir à Chambly',
        text: 'Pour prolonger l’escapade sans complication, mieux vaut choisir un hébergement confortable et bien placé selon ton style de séjour.',
      }}
      restaurantIntro={{
        title: 'Où manger à Chambly',
        text: 'Chambly est agréable parce qu’on peut y manger selon l’humeur du jour. Une sortie romantique ? Un resto chic. Une journée vélo ou fort + canal ? Une cantine réconfort. Une fin d’après-midi où tu veux juste prendre ton temps ? Une microbrasserie avec une bonne ambiance. Ce trio rend la destination encore plus facile à recommander.',
      }}
      faqIntro={{
        title: 'FAQ sur Chambly',
        text: 'Voici quelques réponses utiles pour préparer plus facilement ta visite.',
      }}
      hotelSection={<HotelGrid items={hotels} />}
      restaurantSection={<RestaurantPremiumGrid items={restaurants} />}
      faqSection={<DestinationFaq items={faqItems} />}
      quickFacts={[
        { label: 'Région', value: 'Montérégie / Rive-Sud de Montréal' },
        { label: 'Durée idéale', value: '1 journée à 1 week-end' },
        { label: 'Expérience phare', value: 'Fort + canal + balade gourmande' },
        { label: 'Budget', value: 'Flexible : très doux à plus gourmand selon tes choix' },
      ]}
      utilityLinks={[
        { label: '🗺 Planifier mon itinéraire', href: '/planificateur' },
        { label: '🍓 Découvrir les producteurs locaux', href: '/producteurs', variant: 'outline' },
        { label: '💛 Voir nos coups de cœur', href: '/coups-de-coeur', variant: 'outline' },
        { label: '🎥 Regarder nos idées en vidéo', href: '/videos', variant: 'outline' },
      ]}
      hero={{
        eyebrow: 'Guide destination',
        image: (
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="relative mx-auto aspect-square w-full max-w-[900px]">
              <Image
                src="/images/destinations/chambly.avif"
                alt="Chambly, fort historique et canal"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-gray-900">
                  Chambly, version “facile à aimer”
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Fort, canal, vélo, panorama sur l’eau, gourmandises locales et ambiance relax à
                  deux pas de Montréal.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Chip>Patrimoine</Chip>
                <Chip>Vélo</Chip>
                <Chip>Gourmand</Chip>
                <Chip>Nature douce</Chip>
              </div>
            </div>
          </div>
        ),
        caption:
          'Chambly combine patrimoine, promenade au bord de l’eau, vélo, marchés et bonnes adresses gourmandes pour une escapade simple, belle et vraiment agréable.',
      }}
    >
      <section id="intro" className="scroll-mt-24">
        <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-emerald-50 p-6 shadow-sm">
          <p className="text-base leading-8 text-gray-700">
            Chambly fait partie de ces destinations qui demandent peu d’effort, mais qui donnent
            beaucoup. En quittant Montréal ou la Rive-Sud, tu arrives vite dans un décor où
            l’histoire, l’eau et la douceur de vivre prennent naturellement la place. C’est le genre
            d’endroit parfait quand tu veux sortir, respirer, bouger un peu, bien manger et revenir
            avec la sensation d’avoir réellement décroché.
          </p>
          <p className="mt-4 text-base leading-8 text-gray-700">
            On vient souvent à Chambly pour le <strong>Fort Chambly</strong>, puis on découvre que
            la sortie peut devenir beaucoup plus riche : <strong>canal</strong>,{' '}
            <strong>balades au bord du Richelieu</strong>, <strong>vélo</strong>,{' '}
            <strong>boulangerie artisanale</strong>, <strong>produits locaux</strong>,{' '}
            <strong>marché saisonnier</strong>, microbrasserie ou pique-nique devant l’eau. C’est
            justement cette facilité à combiner plusieurs plaisirs dans une même journée qui rend
            Chambly si attachante.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Idéal pour</p>
            <p className="mt-2 text-sm leading-7 text-gray-700">
              Couples, familles, amateurs de plein air doux, gourmands, cyclistes et voyageurs qui
              aiment les sorties simples mais belles.
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              Durée parfaite
            </p>
            <p className="mt-2 text-sm leading-7 text-gray-700">
              Une journée fonctionne très bien. Une nuit dans les environs permet de prendre encore
              plus son temps et d’ajouter d’autres arrêts.
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
              À combiner avec
            </p>

            <p className="mt-2 text-sm leading-7 text-gray-700">
              Notre{' '}
              <a href="/planificateur" className="font-semibold text-blue-700 hover:underline">
                planificateur d’itinéraire au Québec
              </a>{' '}
              pour bâtir un trajet plus complet, ou découvrir les{' '}
              <a href="/producteurs" className="font-semibold text-blue-700 hover:underline">
                producteurs locaux du Québec
              </a>{' '}
              afin d’ajouter fromagerie, ferme ou marché à la sortie.
            </p>
          </div>
        </div>
      </section>

      <section id="incontournables" className="mt-10 scroll-mt-24">
        <H2>Les incontournables de Chambly (Top 5)</H2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <Star className="mb-3 size-5 text-gray-900" />
            <H3>1. Visiter le Fort Chambly</H3>
            <p className="mt-2 text-sm text-gray-700">
              Le cœur historique de la ville, avec un vrai cachet et un superbe cadre au bord du
              Richelieu.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <Bike className="mb-3 size-5 text-gray-900" />
            <H3>2. Rouler ou marcher le long du canal</H3>
            <p className="mt-2 text-sm text-gray-700">
              Une activité active mais accessible, parfaite pour sentir immédiatement l’ambiance de
              Chambly.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <Trees className="mb-3 size-5 text-gray-900" />
            <H3>3. Profiter du bord de l’eau et des écluses</H3>
            <p className="mt-2 text-sm text-gray-700">
              Pour ralentir, observer l’eau, prendre de belles photos et savourer une vraie pause.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <ShoppingBasket className="mb-3 size-5 text-gray-900" />
            <H3>4. Ajouter un arrêt terroir</H3>
            <p className="mt-2 text-sm text-gray-700">
              Marché, boulangerie, produits locaux ou ferme : c’est ce qui donne plus d’âme à la
              journée.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <Star className="mb-3 size-5 text-gray-900" />
            <H3>5. Finir en resto ou en microbrasserie</H3>
            <p className="mt-2 text-sm text-gray-700">
              Chic, terroir ou décontracté : Chambly se savoure aussi très bien à table.
            </p>
          </div>
        </div>
      </section>

      <section id="why" className="mt-10 scroll-mt-24">
        <H2>Pourquoi visiter Chambly</H2>
        <p className="mt-4 text-gray-700">
          Chambly fonctionne si bien parce qu’elle combine plusieurs univers sans jamais devenir
          compliquée. Tu peux vivre un moment culturel avec le fort, un moment actif à vélo, un
          moment contemplatif au bord de l’eau, puis un moment gourmand en resto ou chez un
          producteur. Tout ça dans une même journée, sans avoir l’impression de courir.
        </p>
        <p className="mt-4 text-gray-700">
          C’est aussi une destination rassurante : tu n’as pas besoin de planifier mille choses pour
          que la sortie soit réussie. Tu peux partir le matin, improviser une partie sur place, puis
          revenir avec de belles images, un bon pain, quelques produits du terroir et le sentiment
          d’avoir vraiment pris l’air.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <Shield className="mb-3 size-5 text-gray-900" />
            <H3>Accessible</H3>
            <p className="mt-2 text-sm text-gray-700">
              Très bien pour une première escapade, un week-end sans stress ou une journée décidée à
              la dernière minute.
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <DollarSign className="mb-3 size-5 text-gray-900" />
            <H3>Flexible côté budget</H3>
            <p className="mt-2 text-sm text-gray-700">
              Tu peux faire une sortie très simple ou t’offrir une version plus gourmande avec bon
              resto et nuit sur place.
            </p>
          </div>
        </div>
      </section>

      <section id="itinerary" className="mt-10 scroll-mt-24">
        <H2>Idée d’itinéraire parfait pour 1 journée à Chambly</H2>
        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          <SoftCard title="Matin">
            Commence par une viennoiserie ou un pain artisanal, puis dirige-toi vers le Fort Chambly
            pour prendre le rythme du lieu en douceur.
          </SoftCard>
          <SoftCard title="Fin de matinée">
            Marche près de l’eau ou fais une portion du canal à vélo. C’est le meilleur moment pour
            sentir l’âme de Chambly.
          </SoftCard>
          <SoftCard title="Après-midi">
            Ajoute un arrêt terroir : marché, ferme, fromages, fruits et légumes selon la saison, ou
            balade plus nature si tu veux étirer la journée.
          </SoftCard>
          <SoftCard title="Fin de journée">
            Termine en microbrasserie, en resto gourmand ou avec un pique-nique amélioré au bord du
            Richelieu. Et si tu veux aller plus loin, passe par{' '}
            <a href="/coups-de-coeur" className="font-semibold text-blue-700 hover:underline">
              nos coups de cœur gourmands au Québec
            </a>{' '}
            pour découvrir d’autres idées dans le même esprit.
          </SoftCard>
        </div>
      </section>

      <section id="activities" className="mt-10 scroll-mt-24">
        <H2>Activités et attractions à faire à Chambly</H2>
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {activities.map((activity) => (
            <div key={activity.name} className="rounded-2xl border bg-white p-5 shadow-sm">
              <H3>{activity.name}</H3>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip>{activity.type}</Chip>
                <Chip>{activity.duration}</Chip>
                <Chip>{activity.price}</Chip>
              </div>
              <p className="mt-3 text-sm text-gray-700">{activity.description}</p>
              <p className="mt-3 text-sm font-medium text-gray-900">Conseil : {activity.tip}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-gray-700">
          Le vrai point fort de Chambly, c’est que ces activités peuvent s’assembler très
          naturellement. Tu peux commencer par une visite plus calme, enchaîner avec une sortie un
          peu plus active, puis terminer avec un moment gourmand. Le décor au bord du Richelieu
          donne presque toujours cette sensation de pause mentale, même quand la journée est bien
          remplie.
        </p>

        <p className="mt-4 text-gray-700">
          Pour préparer un trajet plus complet avec d’autres étapes proches, le plus simple est
          d’utiliser notre{' '}
          <a href="/planificateur" className="font-semibold text-blue-700 hover:underline">
            planificateur d’itinéraire au Québec
          </a>{' '}
          afin de relier Chambly à d’autres arrêts intéressants selon ton style de voyage.
        </p>
      </section>

      <section id="panoramas" className="mt-10 scroll-mt-24">
        <H2>Panoramas et plus beaux coins à voir</H2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {panoramas.map((item) => (
            <div key={item.title} className="rounded-2xl border bg-white p-5 shadow-sm">
              <H3>{item.title}</H3>
              <p className="mt-3 text-sm text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-amber-100 bg-amber-50/60 p-6">
          <p className="text-sm leading-7 text-gray-700">
            Chambly n’est pas une destination de grands sommets ou de falaises spectaculaires. Sa
            beauté vient plutôt de l’équilibre entre le patrimoine, l’eau, les arbres, les ponts,
            les écluses et la lumière. C’est justement ce mélange simple qui rend l’endroit si
            agréable à photographier et si facile à aimer.
          </p>
        </div>
      </section>

      <section id="nature" className="mt-10 scroll-mt-24">
        <H2>Balades, sentiers et vélo</H2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {natureIdeas.map((item) => (
            <div key={item.title} className="rounded-2xl border bg-white p-5 shadow-sm">
              <H3>{item.title}</H3>
              <p className="mt-3 text-sm text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-gray-700">
          Si tu recherches surtout une randonnée sportive, Chambly n’est pas forcément la première
          destination à choisir. En revanche, pour la marche agréable, le vélo facile, la promenade
          au bord de l’eau et les sorties qui se vivent sans pression, c’est une excellente option.
        </p>

        <p className="mt-4 text-gray-700">
          Et si tu aimes découvrir les lieux en image avant de partir, va voir aussi notre section{' '}
          <a href="/videos" className="font-semibold text-blue-700 hover:underline">
            vidéos de destinations au Québec
          </a>{' '}
          pour t’inspirer visuellement.
        </p>
      </section>

      <section id="kids" className="mt-10 scroll-mt-24">
        <H2>Activités pour enfants et familles</H2>
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {familyActivities.map((activity) => (
            <div key={activity.title} className="rounded-2xl border bg-white p-5 shadow-sm">
              <H3>{activity.title}</H3>
              <p className="mt-3 text-sm text-gray-700">{activity.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip>{activity.price}</Chip>
              </div>
              <p className="mt-3 text-sm font-medium text-gray-900">Conseil : {activity.tip}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-gray-700">
          Avec des enfants, Chambly est pratique parce qu’on peut facilement alterner activité,
          nourriture et moment calme. Il n’y a pas besoin de courir partout pour remplir la journée.
          Souvent, le fort, une petite marche, une gourmandise et un bon pique-nique suffisent à
          créer une sortie vraiment réussie.
        </p>
      </section>

      <section id="teens" className="mt-10 scroll-mt-24">
        <H2>Activités pour ados, actifs et sorties dynamiques</H2>
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {teenActivities.map((activity) => (
            <div key={activity.title} className="rounded-2xl border bg-white p-5 shadow-sm">
              <H3>{activity.title}</H3>
              <p className="mt-3 text-sm text-gray-700">{activity.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip>{activity.price}</Chip>
                {activity.duration ? <Chip>{activity.duration}</Chip> : null}
              </div>
              <p className="mt-3 text-sm font-medium text-gray-900">Conseil : {activity.tip}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="bakeries" className="mt-10 scroll-mt-24">
        <H2>Boulangeries et plaisirs simples à ne pas négliger</H2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <H3>Boulangerie du Vieux-Chambly</H3>
            <p className="mt-3 text-gray-700">
              C’est le genre d’endroit qui change tout sans faire de bruit. Tu y passes pour un
              croissant, un pain ou quelques douceurs, puis tu réalises que ça améliore toute la
              journée : le déjeuner, le pique-nique, la pause café, même le retour à la maison.
            </p>
            <p className="mt-3 text-gray-700">
              Dans un article tourisme, ce type d’adresse apporte énormément de valeur parce qu’il
              rend l’escapade plus concrète, plus humaine et plus mémorable.
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <H3>Le bon réflexe gourmand</H3>

            <p className="mt-3 text-gray-700">
              À Chambly, l’idéal est souvent très simple : un bon pain, un fromage, quelques
              produits frais, puis un coin tranquille près de l’eau. C’est une formule facile,
              belle, peu compliquée et franchement efficace.
            </p>

            <p className="mt-3 text-gray-700">
              Si tu aimes ce genre de sorties sincères et savoureuses, tu trouveras aussi beaucoup
              d’idées dans notre page{' '}
              <a href="/coups-de-coeur" className="font-semibold text-blue-700 hover:underline">
                coups de cœur gourmands au Québec
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section id="terroir" className="mt-10 scroll-mt-24">
        <H2>Producteurs locaux, marché, fromages, fruits et légumes</H2>
        <p className="mt-4 text-gray-700">
          La région autour de Chambly possède une vraie richesse agricole et gourmande. Ajouter un
          arrêt terroir à ton itinéraire change complètement la perception de la sortie : tu ne fais
          plus seulement une visite, tu découvres aussi ce que la région produit et ce qui la rend
          vivante.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {localStops.map((item) => (
            <div key={item.title} className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                {item.subtitle}
              </p>
              <H3 className="mt-2">{item.title}</H3>
              <p className="mt-3 text-sm text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <H3>Trois fromages à goûter dans l’esprit de l’escapade</H3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
            <li>
              <strong>Riopelle de l’Isle</strong> : crémeux, raffiné, parfait avec un pain
              artisanal.
            </li>
            <li>
              <strong>Cheddar vieilli de Fritz Kaiser</strong> : plus intense, excellent sur un
              plateau gourmand.
            </li>
            <li>
              <strong>Pied-de-Vent</strong> : une belle texture et une personnalité douce, très
              agréable en pique-nique.
            </li>
          </ul>
          <p className="mt-4 text-gray-700">
            L’idée parfaite ? Pain frais, fromage, fruits ou légumes de saison, quelques produits
            locaux et un moment tranquille près de l’eau. C’est simple, mais c’est exactement ce
            supplément d’âme qu’on recherche dans une vraie bonne escapade.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/producteurs"
            className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
          >
            Voir les producteurs locaux
          </a>
          <a
            href="/planificateur"
            className="inline-flex items-center rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm hover:bg-blue-100"
          >
            Ajouter ces arrêts à mon itinéraire
          </a>
        </div>
      </section>

      <section id="vr-camping" className="mt-10 scroll-mt-24">
        <H2>VR, stationnement, camping et infos pratiques</H2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {practicalCards.map((card) => (
            <div key={card.title} className="rounded-2xl border bg-white p-5 shadow-sm">
              <H3>{card.title}</H3>
              <p className="mt-3 text-sm text-gray-700">{card.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6">
          <p className="text-sm leading-7 text-gray-700">
            Pour un voyageur en VR ou en van, Chambly fonctionne surtout très bien comme{' '}
            <strong>étape agréable de jour</strong> ou comme arrêt bien préparé dans un itinéraire
            plus large. Le meilleur réflexe est de vérifier ton stationnement selon ton gabarit,
            puis d’utiliser{' '}
            <a
              href="/planificateur"
              className="font-semibold text-blue-700 underline-offset-4 hover:underline"
            >
              le planificateur d’itinéraire
            </a>{' '}
            pour bâtir un trajet plus fluide avec d’autres haltes dans les environs.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-700">
            Côté camping, Chambly se prête davantage à la sortie et à l’escapade qu’au séjour
            camping « sur place ». Le plus simple est donc de considérer la ville comme une belle
            étape à intégrer à un parcours plus large selon tes besoins.
          </p>
        </div>
      </section>

      <section id="getting-there" className="mt-10 scroll-mt-24">
        <H2>Comment se rendre à Chambly</H2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <Map className="mb-3 size-5 text-gray-900" />
            <H3>En voiture</H3>
            <p className="mt-2 text-sm text-gray-700">
              Le moyen le plus simple pour profiter librement du fort, du canal, des producteurs et
              des environs sans contrainte.
            </p>
          </div>
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <Calendar className="mb-3 size-5 text-gray-900" />
            <H3>En sortie planifiée</H3>
            <p className="mt-2 text-sm text-gray-700">
              Très bien en excursion d’une journée, mais encore plus agréable si tu ajoutes une nuit
              sur place ou une autre étape voisine.
            </p>
          </div>
        </div>
      </section>

      <section id="tips" className="mt-10 scroll-mt-24">
        <H2>Conseils pratiques pour réussir ta sortie</H2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
          <li>
            <strong>Mai à octobre</strong> est souvent la période la plus agréable pour profiter du
            vélo, de la marche, des marchés, des terrasses et des produits frais.
          </li>
          <li>
            <strong>Le matin</strong> est parfait pour le fort, les photos plus calmes et une
            ambiance plus douce.
          </li>
          <li>
            <strong>La fin de journée</strong> est idéale pour les promenades aux écluses et la
            lumière sur l’eau.
          </li>
          <li>
            <strong>Le combo gagnant</strong> : boulangerie + fort + balade au canal + arrêt terroir
            + microbrasserie ou resto.
          </li>
          <li>
            Pour ajouter une touche encore plus gourmande, découvre{' '}
            <a
              href="/producteurs"
              className="font-semibold text-indigo-700 underline underline-offset-4"
            >
              notre sélection de producteurs locaux
            </a>
            .
          </li>
          <li>
            Pour construire une escapade plus complète autour de Chambly, utilise{' '}
            <a
              href="/planificateur"
              className="font-semibold text-indigo-700 underline underline-offset-4"
            >
              le planificateur d’itinéraire
            </a>
            .
          </li>

          <li>
            Et pour trouver d’autres idées avant de partir, jette aussi un œil à{' '}
            <a
              href="/videos"
              className="font-semibold text-indigo-700 underline underline-offset-4"
            >
              nos vidéos
            </a>{' '}
            et à{' '}
            <a
              href="/coups-de-coeur"
              className="font-semibold text-indigo-700 underline underline-offset-4"
            >
              nos coups de cœur
            </a>
            .
          </li>
        </ul>
      </section>

      <section id="cta" className="mt-10 scroll-mt-24">
        <H2>Réserver et liens utiles</H2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <a
            href={ctaBookingUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Hotel className="mb-3 size-5 text-gray-900" />
            <p className="text-base font-bold text-gray-900">
              Voir les hébergements autour de Chambly
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Compare les options pour dormir sur la Rive-Sud et prolonger l’escapade sans stress.
            </p>
          </a>

          <a
            href="/planificateur"
            className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Map className="mb-3 size-5 text-gray-900" />
            <p className="text-base font-bold text-gray-900">Planifier mon itinéraire</p>
            <p className="mt-2 text-sm text-gray-700">
              Construit ton trajet avec Chambly, les producteurs locaux et d’autres étapes proches.
            </p>
          </a>

          <a
            href="/producteurs"
            className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <ShoppingBasket className="mb-3 size-5 text-gray-900" />
            <p className="text-base font-bold text-gray-900">Découvrir les producteurs</p>
            <p className="mt-2 text-sm text-gray-700">
              Ajoute marchés, fermes, fromageries et gourmandises locales à ton itinéraire.
            </p>
          </a>

          <a
            href="/videos"
            className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Calendar className="mb-3 size-5 text-gray-900" />
            <p className="text-base font-bold text-gray-900">Voir plus d’inspiration</p>
            <p className="mt-2 text-sm text-gray-700">
              Regarde nos vidéos et complète avec nos coups de cœur pour préparer une belle sortie.
            </p>
          </a>
        </div>
      </section>
    </DestinationArticleTemplate>
  );
}
