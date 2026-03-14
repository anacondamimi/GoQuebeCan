import Image from 'next/image';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_BIC } from '@/data/hotels/byArticle/bic';
import { bookingAwin } from '@/lib/awin';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';

import {
  Hotel,
  Bus,
  Calendar,
  DollarSign,
  Shield,
  Star,
  Mountain,
  Binoculars,
  Map,
} from 'lucide-react';

export const metadata = {
  slug: 'bic',
  ville: 'Bic',
  resume: 'Découverte de Bic et de ses attraits touristiques.',
  activites: [
    'Observation des Phoques',
    'Randonnée Pic Champlain',
    'Kayak de Mer',
    'Sentier Le Chemin du Nord',
    'Centre de Découverte',
    'Plage du Havre du Bic',
    'Vélo de Montagne',
    'Kayak Aventure',
    'Randonnée Photo',
  ],
  hebergements: ['Auberge du Mange Grenouille', 'Gîte du Bic', 'Camping du Bic'],
  publics: ['familles', 'ados', 'aventuriers'],
};

const restaurants = [
  {
    name: 'Café-Bar Le Mange-Grenouille',
    city: 'Le Bic',
    type: 'Bistro',
    speciality: 'Cuisine du terroir et fruits de mer',
    price: '$$$',
    mustTry: 'Tartare de saumon',
    schedule: 'Mai à Octobre',
    image: '/images/restos/bic/mange-grenouille.avif',
    reserveUrl: 'https://www.mangegrenouille.com',
    vibe: 'Terrasse & local',
    tip: 'Très populaire l’été : arrive tôt ou réserve si possible.',
  },
  {
    name: 'Restaurant Chez Saint-Pierre',
    city: 'Le Bic',
    type: 'Gastronomique',
    speciality: 'Cuisine française-québécoise créative',
    price: '$$$$',
    mustTry: 'Menu dégustation local',
    schedule: 'Mi-avril à Octobre (selon saison)',
    image: '/images/restos/bic/chez-saint-pierre.avif',
    vibe: 'Gastro local',
    tip: 'Réservation fortement conseillée en haute saison.',
  },
  {
    name: 'La Cabane à Manger',
    city: 'Le Bic',
    type: 'Café-Restaurant',
    speciality: 'Brunch et cuisine locale',
    price: '$$',
    mustTry: 'Brunch du dimanche',
    schedule: "Toute l'année",
    image: '/images/restos/bic/la-cabane.avif',
    vibe: 'Confort & simple',
    tip: 'Parfait pour un matin slow avant le parc.',
  },
  {
    name: 'Cantine du Parc',
    city: 'Le Bic',
    type: 'Cantine',
    speciality: 'Fast-food de qualité',
    price: '$$',
    mustTry: 'Fish & Chips maison',
    schedule: 'Juin à Septembre',
    image: '/images/restos/bic/cantine-du-parc.avif',
    vibe: 'Rapide & efficace',
    tip: 'Idéal après une rando : simple, bon, sans perdre de temps.',
  },
];

const activities = [
  {
    name: 'Observation des Phoques',
    type: 'Nature',
    duration: '2–3 h',
    price: 'Inclus (accès parc)',
    description: 'Observation des phoques communs et gris depuis les anses et rochers.',
    tip: 'Meilleure fenêtre : marée basse + début/fin de journée.',
  },
  {
    name: 'Randonnée Pic Champlain',
    type: 'Randonnée',
    duration: '3–4 h',
    price: 'Inclus (accès parc)',
    description: 'L’une des plus belles vues panoramiques sur le Saint-Laurent.',
    tip: 'Apporte une couche chaude : le vent peut surprendre même l’été.',
  },
  {
    name: 'Kayak de Mer',
    type: 'Nautique',
    duration: '2–3 h',
    price: '≈ 75 $ / personne',
    description: 'Excursion guidée le long des caps rocheux et anses du parc.',
    tip: 'Réserve tôt en haute saison (weekends + vacances).',
  },
];

const familyActivities = [
  {
    title: 'Sentier Le Chemin du Nord',
    description: "Randonnée facile avec points d'observation (tous âges).",
    price: 'Inclus (accès parc)',
    tip: 'Super en fin de journée pour la lumière + ambiance calme.',
  },
  {
    title: 'Centre de Découverte',
    description: 'Expositions interactives sur la faune (5–12 ans).',
    price: 'Inclus (accès parc)',
    tip: 'Parfait s’il pleut : kids happy, parents aussi 😄',
  },
  {
    title: 'Plage du Havre du Bic',
    description: 'Baignade, jeux de plage et détente (tous âges).',
    price: 'Inclus (accès parc)',
    tip: 'Prévois des sandales : parfois coquillages/galets.',
  },
];

const teenActivities = [
  {
    title: 'Vélo de Montagne',
    description: 'Sentiers techniques et beaux points de vue (12+).',
    price: 'Location : ≈ 35 $ / jour',
    duration: 'À votre rythme',
    tip: 'Gants + lunettes = combo confort sur sentiers.',
  },
  {
    title: 'Kayak Aventure',
    description: 'Excursion guidée plus “sport” (12+).',
    price: '≈ 75 $ / personne',
    duration: '≈ 3 h',
    tip: 'Idéal si tes ados aiment bouger et voir “du vrai” paysage.',
  },
  {
    title: 'Randonnée Photo',
    description: 'Safari photo guidé (12+).',
    price: '≈ 45 $ / personne',
    duration: '≈ 2 h',
    tip: 'Fin de journée = meilleure lumière + plus d’animaux visibles.',
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-100">
      {children}
    </span>
  );
}

export default function BlogArticleBic() {
  const hotels = pickHotels(HOTEL_IDS_BIC);
  const ctaBookingUrl = bookingAwin('https://www.booking.com/region/ca/le-bic.html');

  return (
    <DestinationArticleTemplate
      slug="bic"
      title="Parc national du Bic — paradis des phoques & randonnées panoramiques"
      subtitle="Un joyau du Bas-Saint-Laurent où caps rocheux, anses secrètes et vues sur le Saint-Laurent créent l’une des plus belles escapades nature du Québec."
      toc={[
        { id: 'intro', label: 'Introduction' },
        { id: 'incontournables', label: 'Incontournables (Top 5)' },
        { id: 'why', label: 'Pourquoi visiter' },
        { id: 'activities', label: 'Activités & attractions' },
        { id: 'kids', label: 'Activités pour enfants' },
        { id: 'teens', label: 'Activités pour ados' },
        { id: 'eat', label: 'Où manger' },
        { id: 'sleep', label: 'Où dormir' },
        { id: 'getting-there', label: "Comment s'y rendre" },
        { id: 'tips', label: 'Conseils pratiques' },
        { id: 'cta', label: 'Réserver & liens utiles' },
      ]}
      quickFacts={[
        { label: 'Région', value: 'Bas-Saint-Laurent' },
        { label: 'Durée idéale', value: '1 à 2 jours' },
        { label: 'Expérience phare', value: 'Phoques + caps rocheux + vue Saint-Laurent' },
        { label: 'Budget', value: 'Accès parc + repas local (15–45 $/pers)' },
      ]}
      utilityLinks={[
        { label: '🎥 Voir les vidéos du Bic', href: '/videos/bic', variant: 'outline' },
        { label: '🍺 Producteurs locaux', href: '/producteurs', variant: 'outline' },
        { label: '🗺 Planifier mon itinéraire', href: '/planificateur', variant: 'primary' },
        { label: '🚗 Guide voyage en voiture', href: '/blog/voyage-voiture', variant: 'outline' },
      ]}
      hero={{
        image: (
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="relative h-72 w-full sm:h-96">
              <Image
                src="/images/destinations/bic.avif"
                alt="Parc national du Bic, caps rocheux et vue sur le Saint-Laurent"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
              <div className="min-w-0">
                <p className="text-sm font-extrabold text-gray-900">Le Bic, version “wow”</p>
                <p className="mt-1 text-sm text-gray-600">
                  Phoques, sentiers panoramiques, anses et couchers de soleil.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Chip>Nature</Chip>
                <Chip>Randonnée</Chip>
                <Chip>Kayak</Chip>
              </div>
            </div>
          </div>
        ),
        eyebrow: 'Bas-Saint-Laurent',
        caption:
          'Une destination côtière spectaculaire pour marcher, observer les phoques et profiter du Saint-Laurent.',
      }}
    >
      {/* INTRO */}
      <section id="intro" className="mb-14">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-gray-700">
            Le Parc national du Bic est un sanctuaire naturel sur les rives du Saint-Laurent :
            phoques sur les rochers, caps dramatiques, anses tranquilles et sentiers qui donnent
            envie de marcher “juste encore un peu”. C’est une destination parfaite pour une escapade
            nature — que tu sois en couple, en famille ou en mode aventure.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Chip>Idéal : mai → octobre</Chip>
            <Chip>Top photo : fin de journée</Chip>
            <Chip>Accès parc : Sépaq</Chip>
          </div>
        </div>
      </section>

      {/* INCONTOURNABLES */}
      <section id="incontournables" className="mb-16">
        <H2 className="mb-6 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Les 5 incontournables à ne pas manquer
        </H2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              t: 'Observer les phoques',
              d: 'Depuis les anses et rochers — surtout à marée basse.',
            },
            {
              t: 'Monter au Pic Champlain',
              d: 'La vue sur le Saint-Laurent est juste spectaculaire.',
            },
            {
              t: 'Explorer les sentiers côtiers',
              d: 'Ambiance “bord de mer” + paysages uniques.',
            },
            {
              t: 'Sortie kayak de mer',
              d: 'Voir le Bic depuis l’eau : expérience mémorable.',
            },
            {
              t: 'Coucher de soleil',
              d: 'La lumière sur les caps = magie (vraiment).',
            },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <H3 className="mb-2 text-xl font-semibold">{x.t}</H3>
              <p className="text-gray-600">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POURQUOI VISITER */}
      <section id="why" className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Pourquoi visiter le Parc du Bic ?
        </H2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <H3 className="mb-3 text-xl font-semibold">Phoques accessibles</H3>
            <p className="text-gray-600">
              Un des meilleurs spots au Québec pour voir les phoques dans leur habitat naturel.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <H3 className="mb-3 text-xl font-semibold">Paysages uniques</H3>
            <p className="text-gray-600">
              Caps rocheux, anses, marées et reliefs : ambiance “cinéma”.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <H3 className="mb-3 text-xl font-semibold">Randos panoramiques</H3>
            <p className="text-gray-600">
              Plus de 25 km de sentiers — avec des vues qui valent le détour.
            </p>
          </div>
        </div>
      </section>

      {/* ACTIVITÉS */}
      <section id="activities" className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Binoculars className="size-8 text-indigo-600" />
          Activités et attractions
        </H2>

        <div className="grid grid-cols-1 gap-6">
          {activities.map((a) => (
            <div key={a.name} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <H3 className="text-xl font-semibold text-gray-900">{a.name}</H3>
                  <p className="mt-2 text-gray-600">{a.description}</p>
                  {a.tip ? (
                    <p className="mt-3 text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">Tip :</span> {a.tip}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2 sm:justify-end">
                  <Chip>{a.type}</Chip>
                  <Chip>Durée : {a.duration}</Chip>
                  <Chip>Prix : {a.price}</Chip>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ENFANTS */}
      <section id="kids" className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Star className="size-8 text-indigo-600" />
          Activités pour enfants
        </H2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {familyActivities.map((a) => (
            <div
              key={a.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <H3 className="mb-2 text-xl font-semibold text-gray-900">{a.title}</H3>
              <p className="mb-3 text-gray-600">{a.description}</p>
              <p className="font-extrabold text-indigo-700">{a.price}</p>
              {a.tip ? <p className="mt-3 text-sm text-gray-600">{a.tip}</p> : null}
            </div>
          ))}
        </div>
      </section>

      {/* ADOS */}
      <section id="teens" className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Mountain className="size-8 text-indigo-600" />
          Activités pour ados
        </H2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {teenActivities.map((a) => (
            <div
              key={a.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <H3 className="mb-2 text-xl font-semibold text-gray-900">{a.title}</H3>
              <p className="mb-3 text-gray-600">{a.description}</p>
              <div className="mt-4 flex flex-col gap-1">
                <p className="font-extrabold text-indigo-700">{a.price}</p>
                <p className="text-sm text-gray-500">Durée : {a.duration}</p>
              </div>
              {a.tip ? <p className="mt-3 text-sm text-gray-600">{a.tip}</p> : null}
            </div>
          ))}
        </div>
      </section>

      {/* MANGER */}
      <section id="eat" className="mb-16">
        <div className="mb-6 flex items-center gap-2">
          <Map className="size-6 text-indigo-600" />
          <H2 className="text-3xl font-bold text-gray-900">Où manger au Bic ?</H2>
        </div>

        <p className="mb-6 text-gray-600">
          4 spots sélectionnés pour te faire plaisir : gastro, bistro local, brunch et cantine
          efficace.
        </p>

        <RestaurantPremiumGrid items={restaurants} />
      </section>

      {/* DORMIR */}
      <section id="sleep" className="mb-16" aria-label="Hébergements recommandés">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Hotel className="size-8 text-indigo-600" />
          Où dormir ?
        </H2>
        <HotelGrid items={hotels} />
      </section>

      {/* SE RENDRE */}
      <section id="getting-there" className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Bus className="size-8 text-indigo-600" />
          Comment s&apos;y rendre ?
        </H2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <H3 className="mb-4 text-xl font-semibold">Depuis les grandes villes</H3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Environ 5h en voiture depuis Montréal
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Environ 3h en voiture depuis Québec
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Bus Orléans Express (arrêt à Rimouski)
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <H3 className="mb-4 text-xl font-semibold">Sur place</H3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Voiture pratique pour bouger facilement
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Location de vélos selon la saison
              </li>
              <li className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-600" />
                Navette depuis Rimouski en été (selon disponibilité)
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONSEILS */}
      <section id="tips" className="mb-16">
        <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
          <Calendar className="size-8 text-indigo-600" />
          Conseils pratiques
        </H2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Calendar className="size-5 text-indigo-600" />
              Meilleure période
            </H3>
            <p className="text-gray-600">
              Juin à septembre pour le climat doux. Mai-juin et septembre pour maximiser les chances
              d’observer les phoques.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <DollarSign className="size-5 text-indigo-600" />
              Budget
            </H3>
            <p className="text-gray-600">
              Hébergement : 30–169 $/nuit · Activités : accès parc · Repas : 15–45 $/personne
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <H3 className="mb-3 flex items-center gap-2 text-xl font-semibold">
              <Shield className="size-5 text-indigo-600" />À noter
            </H3>
            <p className="text-gray-600">
              Réservation conseillée en haute saison. Prévoir des vêtements chauds même l’été :
              l’air du fleuve + vent peuvent surprendre.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="rounded-3xl bg-gray-50 p-8 text-center">
        <H2 className="mb-4 text-2xl font-bold text-gray-900">Prêt à découvrir le Parc du Bic ?</H2>
        <p className="mb-6 text-gray-600">
          Réserve ton hébergement, explore le parc… et garde un moment pour juste respirer.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={ctaBookingUrl}
            target="_blank"
            rel="sponsored noopener nofollow"
            className="rounded-xl bg-indigo-500 px-6 py-3 font-extrabold text-white transition-colors hover:bg-indigo-800"
          >
            Réserver un hébergement
          </a>
          <a
            href="https://www.sepaq.com/pq/bic/"
            target="_blank"
            rel="noopener nofollow"
            className="rounded-xl border border-indigo-600 bg-white px-6 py-3 font-extrabold text-indigo-700 transition-colors hover:bg-indigo-50"
          >
            Explorer le parc (Sépaq)
          </a>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="/videos" className="text-sm font-semibold text-indigo-700 hover:text-indigo-800">
            🎥 Voir les vidéos du Bic
          </a>
          <span className="hidden text-gray-300 sm:inline">•</span>
          <a
            href="/producteurs"
            className="text-sm font-semibold text-indigo-700 hover:text-indigo-800"
          >
            🍺 Découvrir les producteurs locaux
          </a>
          <span className="hidden text-gray-300 sm:inline">•</span>
          <a
            href="/planificateur"
            className="text-sm font-semibold text-indigo-700 hover:text-indigo-800"
          >
            🗺 Planifier mon itinéraire
          </a>
        </div>
      </section>
    </DestinationArticleTemplate>
  );
}
