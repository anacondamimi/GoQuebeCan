import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_TADOUSSAC } from '@/data/hotels/byArticle/tadoussac';
import { bookingAwin } from '@/lib/awin';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';

export const metadata = {
  slug: 'tadoussac',
  ville: 'Tadoussac',
  resume:
    'Que faire à Tadoussac ? Guide complet pour voir les baleines, explorer le fjord du Saguenay, profiter du village, choisir les meilleures activités, découvrir les producteurs locaux et réussir son séjour sur la Côte-Nord.',
  activites: [
    'Observation des baleines',
    "Pointe-de-l'Islet",
    'CIMM',
    'Traversier Tadoussac–Baie-Sainte-Catherine',
    'Kayak de mer',
    'Plage de Tadoussac',
    'Belvédères et sentiers',
    'Village historique',
  ],
  hebergements: ['Hôtel Tadoussac', 'Motel Le Beluga', 'Auberge La Galouïne'],
  publics: ['familles', 'couples', 'amateurs de nature', 'photographes', 'aventuriers'],
};

const hotels = pickHotels(HOTEL_IDS_TADOUSSAC);

const restaurants = [
  {
    name: 'Le Coquart',
    city: 'Tadoussac',
    type: 'Restaurant avec vue',
    speciality: 'Cuisine inspirée du Saint-Laurent et ambiance panoramique',
    price: '$$$',
    mustTry: 'Un repas face à la baie pour prolonger la magie du séjour',
    schedule: 'Horaires variables selon la saison',
    image: '/images/carte.avif',
    vibe: 'Élégant et maritime',
    tip: 'Très agréable en soirée si tu veux une expérience plus posée après une journée d’excursion.',
  },
  {
    name: 'Bistro Le Bar Rayé',
    city: 'Tadoussac',
    type: 'Bistro local',
    speciality: 'Cuisine de saison et produits du terroir',
    price: '$$$',
    mustTry: 'Une assiette mettant en valeur les saveurs locales',
    schedule: 'Horaires variables selon la saison',
    image: '/images/carte.avif',
    vibe: 'Chaleureux',
    tip: 'Une très bonne option si tu veux l’équilibre entre gourmandise et ambiance simple.',
  },
  {
    name: 'Café l’Abri Côtier',
    city: 'Tadoussac',
    type: 'Pause café',
    speciality: 'Boissons chaudes, collations et pause détente',
    price: '$$',
    mustTry: 'Un café et une collation entre deux activités',
    schedule: 'Horaires variables selon la saison',
    image: '/images/carte.avif',
    vibe: 'Relax',
    tip: 'Parfait avant une balade, après la route ou pour te poser un moment dans le village.',
  },
  {
    name: 'À l’Emportée Boulangerie',
    city: 'Tadoussac',
    type: 'Boulangerie artisanale',
    speciality: 'Pain, viennoiseries, pâtisseries et épicerie fine',
    price: '$$',
    mustTry: 'Un pain artisanal ou une viennoiserie pour un pique-nique avec vue',
    schedule: 'Horaires variables selon la saison',
    image: '/images/carte.avif',
    vibe: 'Artisanal et pratique',
    tip: 'Excellent arrêt pour composer un lunch simple et franchement réussi avant une sortie.',
  },
];

const faqItems = [
  {
    question: 'Pourquoi visiter Tadoussac ?',
    answer:
      'Tadoussac attire pour les baleines, le parc marin, le fjord du Saguenay, la beauté du village, les points de vue et cette atmosphère maritime unique qui donne vraiment l’impression de changer de rythme.',
  },
  {
    question: 'Peut-on voir des baleines sans faire de croisière ?',
    answer:
      'Oui. Tadoussac permet aussi de vivre une belle expérience depuis la terre, notamment avec la Pointe-de-l’Islet et plusieurs points d’observation du secteur.',
  },
  {
    question: 'Combien de temps faut-il pour visiter Tadoussac ?',
    answer:
      'Une journée donne un aperçu, mais deux jours ou deux à trois nuits rendent l’expérience beaucoup plus agréable, surtout si tu veux combiner excursion, village, randonnée douce et pauses gourmandes.',
  },
  {
    question: 'Quelle est la meilleure saison pour aller à Tadoussac ?',
    answer:
      'La belle saison est la plus populaire, en particulier du printemps avancé à l’automne, période où les activités nautiques, les points de vue et l’observation des baleines sont les plus recherchés.',
  },
  {
    question: 'Le traversier vers Baie-Sainte-Catherine est-il payant ?',
    answer:
      'Non, le traversier Tadoussac–Baie-Sainte-Catherine est gratuit, ce qui facilite beaucoup l’accès au secteur.',
  },
];

export default function BlogArticleTadoussac() {
  return (
    <DestinationArticleTemplate
      slug="tadoussac"
      title="Tadoussac : que faire, où dormir et comment réussir un séjour inoubliable sur la Côte-Nord"
      subtitle="Entre baleines, fjord du Saguenay, traversier mythique, producteurs locaux, boulangerie artisanale et vues spectaculaires, Tadoussac fait partie des destinations les plus fortes du Québec. Voici un guide complet, pensé pour vraiment préparer ton voyage."
      quickFacts={[
        { label: 'Région', value: 'Côte-Nord' },
        { label: 'Durée idéale', value: '2 à 3 jours' },
        { label: 'Expérience phare', value: 'Baleines + fjord + village' },
        { label: 'Ambiance', value: 'Maritime, spectaculaire et dépaysante' },
      ]}
      utilityLinks={[
        { label: '🗺 Planifier mon itinéraire', href: '/planificateur' },
        { label: '🍓 Découvrir les producteurs locaux', href: '/producteurs', variant: 'outline' },
        {
          label: '🧭 Voir les itinéraires partagés',
          href: '/itineraires-communaute',
          variant: 'outline',
        },
        { label: '📚 Explorer d’autres destinations', href: '/blog', variant: 'outline' },
      ]}
      hero={{
        eyebrow: 'Côte-Nord',
        image: (
          <div className="relative h-[260px] w-full overflow-hidden sm:h-[340px] lg:h-[430px]">
            <Image
              src="/images/destinations/tadoussac.avif"
              alt="Tadoussac entre le fjord du Saguenay et le Saint-Laurent"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1100px"
            />
          </div>
        ),
        caption:
          'Tadoussac est l’une des grandes destinations du Québec pour voir les baleines, respirer l’air du large et ressentir toute la force du fjord.',
      }}
      intro={{
        title: 'Pourquoi visiter Tadoussac ?',
        paragraphs: [
          'Tadoussac fait partie des destinations les plus marquantes du Québec. On y vient souvent pour voir les baleines, mais on découvre très vite beaucoup plus qu’une simple excursion : un village au caractère fort, une baie magnifique, une histoire ancienne, un accès direct au parc marin et ce décor rare où le fjord du Saguenay rencontre le Saint-Laurent.',
          'Ce qui rend Tadoussac si puissant, c’est l’intensité du lieu. Il y a la mer, le vent, la lumière, les reliefs, les traversiers, les belvédères, les oiseaux, les mammifères marins, mais aussi cette sensation presque immédiate d’être ailleurs. Peu de destinations québécoises donnent aussi vite l’impression de vivre quelque chose de grand.',
          'Si tu te demandes que faire à Tadoussac, combien de temps rester, où dormir, quelle période choisir, où bien manger et quels producteurs découvrir autour, ce guide a été pensé pour répondre à tout ça avec une vraie logique de séjour, pas seulement une liste rapide d’idées.',
        ],
      }}
      hotelIntro={{
        title: 'Où dormir à Tadoussac ?',
        text: 'Dormir sur place ou tout près permet de mieux vivre le village tôt le matin, de profiter de l’ambiance en soirée et d’organiser plus facilement une sortie sur l’eau ou une journée complète autour du parc marin.',
      }}
      hotelSection={<HotelGrid items={hotels} />}
      restaurantIntro={{
        title: 'Où manger à Tadoussac ?',
        text: 'Tadoussac propose un mélange très agréable entre restauration plus soignée, cafés utiles pour les pauses, et bonnes adresses simples à intégrer dans une journée de route, de croisière ou de randonnée douce.',
      }}
      restaurantSection={<RestaurantPremiumGrid items={restaurants} />}
      faqIntro={{
        title: 'FAQ : visiter Tadoussac',
        text: 'Les réponses les plus utiles avant de partir.',
      }}
      faqSection={
        <div className="space-y-5">
          {faqItems.map((item) => (
            <div key={item.question} className="space-y-2">
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      }
      conclusion={{
        title: 'Conclusion',
        text: 'Tadoussac mérite largement sa réputation. Oui, les baleines comptent énormément. Mais ce qui rend vraiment la destination forte, c’est l’ensemble : le fjord, la baie, le village, la route, les points de vue, les adresses locales et la sensation d’être au bon endroit pour ralentir. Si tu prends le temps d’y passer au moins deux jours, tu vas vivre bien plus qu’une simple activité : un vrai moment de voyage au Québec.',
        ctas: [
          {
            label: 'Réserver un hébergement',
            href: bookingAwin('https://www.booking.com/city/ca/tadoussac.html'),
            target: '_blank',
            rel: 'noreferrer',
            variant: 'primary',
          },
          {
            label: 'Planifier mon itinéraire',
            href: '/planificateur',
            variant: 'outline',
          },
          {
            label: 'Explorer d’autres destinations',
            href: '/blog',
            variant: 'soft',
          },
        ],
      }}
    >
      <section className="space-y-6">
        <p>
          <strong>Tadoussac</strong> fait partie de ces endroits qu’on n’oublie pas facilement. Même
          si on a vu beaucoup de photos, l’arrivée sur place garde quelque chose de très fort. La
          route, le relief, la traversée, la baie, les maisons, le fleuve, la lumière : tout semble
          participer à une mise en scène naturelle beaucoup plus impressionnante que prévue.
        </p>

        <p>
          Ce n’est pas pour rien que la destination est autant associée à l’
          <strong>observation des baleines</strong>. Le secteur fait partie des plus connus au
          Québec pour vivre cette expérience, et il a l’avantage d’offrir plusieurs façons d’en
          profiter : croisière, zodiac, observation depuis la rive, sentiers panoramiques et visite
          au centre d’interprétation. Cela rend le séjour plus riche, plus flexible et plus
          mémorable.
        </p>

        <p>
          Mais Tadoussac ne se résume pas aux baleines. Le village a une vraie personnalité, le
          paysage donne envie de ralentir, et les alentours permettent aussi d’ajouter des haltes
          gourmandes, des producteurs locaux et un itinéraire plus complet sur la Côte-Nord. C’est
          exactement ce qui en fait une destination aussi forte pour un couple, une famille, un
          voyageur solo ou un road trip plus ambitieux.
        </p>
      </section>

      <section className="space-y-5">
        <h2>Les incontournables à Tadoussac</h2>

        <div className="space-y-4">
          <h3>1. Faire une sortie d’observation des baleines</h3>
          <p>
            C’est l’activité phare, celle qui amène énormément de voyageurs jusqu’à Tadoussac. Et
            franchement, elle tient sa promesse. Le secteur est l’un des grands classiques du Québec
            pour observer les mammifères marins. Que tu choisisses une sortie plus confortable en
            bateau ou une formule plus vive en zodiac, l’expérience laisse rarement indifférent.
          </p>
          <p>
            Le vrai conseil ici, c’est de ne pas réduire la sortie à une simple “activité
            touristique”. Pour beaucoup de visiteurs, c’est l’un des grands moments du voyage. Le
            décor du parc marin, la lumière sur l’eau, le silence entre deux observations et le
            sentiment d’être petit face au Saint-Laurent changent complètement la perception du
            lieu.
          </p>
        </div>

        <div className="space-y-4">
          <h3>2. Marcher à la Pointe-de-l’Islet</h3>
          <p>
            C’est l’un des meilleurs gestes à faire une fois sur place. Le sentier n’est pas là pour
            te “fatiguer”, mais pour te faire ressentir Tadoussac. Tu avances doucement, tu regardes
            la baie, le fleuve, la rencontre des eaux, et tu comprends pourquoi ce secteur est aussi
            apprécié. En plus, la Pointe-de-l’Islet est un excellent lieu pour l’observation
            terrestre des mammifères marins.
          </p>
        </div>

        <div className="space-y-4">
          <h3>3. Visiter le CIMM</h3>
          <p>
            Le Centre d’interprétation des mammifères marins est une vraie bonne idée, surtout si tu
            veux donner plus de profondeur à ton séjour. Tu ne regardes plus simplement “des
            baleines” : tu comprends davantage les espèces, leurs comportements, les enjeux du parc
            marin et la richesse du milieu.
          </p>
          <p>
            C’est aussi une excellente visite si tu voyages avec des enfants ou si tu veux une
            activité complémentaire à l’observation sur l’eau. Elle ajoute une dimension éducative
            sans casser le plaisir du voyage.
          </p>
        </div>

        <div className="space-y-4">
          <h3>4. Profiter du traversier Tadoussac–Baie-Sainte-Catherine</h3>
          <p>
            Beaucoup de gens le considèrent seulement comme un passage pratique. En réalité, il fait
            déjà partie de l’expérience. Le traversier est gratuit, le trajet est beau, et il offre
            une vraie entrée en matière vers Tadoussac et la Côte-Nord. Ce n’est pas juste un point
            logistique : c’est déjà du paysage et de l’émotion.
          </p>
        </div>

        <div className="space-y-4">
          <h3>5. Vivre le village</h3>
          <p>
            C’est souvent ce qu’on sous-estime avant de partir. Tadoussac se vit aussi très bien
            sans courir. Flâner dans le village, faire une pause café, regarder la baie, acheter du
            pain à la boulangerie, prendre un repas avec vue ou simplement laisser le temps passer :
            cette partie-là du séjour compte énormément.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <h2>Que faire à Tadoussac en famille ?</h2>
        <p>
          Tadoussac marche très bien avec des enfants parce que la destination crée naturellement de
          l’émerveillement. Les baleines, le traversier, le bord de l’eau, les oiseaux, les sentiers
          accessibles et le CIMM rendent le séjour vivant sans demander de très grosses performances
          physiques.
        </p>
        <p>
          L’avantage, c’est que tu peux construire une journée équilibrée. Une activité forte le
          matin, une pause simple le midi, une marche douce dans l’après-midi, puis un bon repas ou
          une crème glacée en soirée. Cette fluidité-là est très précieuse en voyage familial.
        </p>
      </section>

      <section className="space-y-5">
        <h2>Combien de jours prévoir à Tadoussac ?</h2>
        <p>
          Une journée est possible, surtout si Tadoussac s’insère dans une grande boucle. Mais
          soyons honnêtes : cela donne souvent l’impression de survoler. Tu vois un peu, tu repars
          vite, et tu n’as pas vraiment le temps de laisser la destination travailler.
        </p>
        <p>
          Le meilleur format reste souvent <strong>deux jours pleins</strong> ou
          <strong> deux à trois nuits</strong>. C’est là que tu profites vraiment du village, d’une
          sortie sur l’eau, de la Pointe-de-l’Islet, d’une table agréable et peut-être même d’un
          petit détour gourmand à proximité.
        </p>
      </section>

      <section className="space-y-5">
        <h2>Producteurs locaux, microbrasserie et plaisirs gourmands autour de Tadoussac</h2>
        <p>
          Pour que Google aime un article, il faut aussi qu’il aide vraiment le voyageur. Et un
          voyageur qui prépare Tadoussac se demande rarement seulement “où voir les baleines ?”. Il
          veut aussi savoir où bien manger, où acheter du bon pain, quel producteur découvrir, quoi
          rapporter, comment enrichir son itinéraire. C’est là que ta page peut devenir plus forte
          que beaucoup d’autres.
        </p>

        <div className="space-y-4">
          <h3>À l’Emportée Boulangerie</h3>
          <p>
            C’est l’arrêt intelligent à intégrer presque automatiquement dans un séjour à Tadoussac.
            Une vraie boulangerie artisanale avec viennoiseries, pâtisseries, pain et épicerie fine,
            parfaite pour composer un déjeuner, un pique-nique ou une pause simple mais réussie.
          </p>
        </div>

        <div className="space-y-4">
          <h3>Microbrasserie Tadoussac</h3>
          <p>
            Une microbrasserie locale, c’est souvent un excellent prolongement de la journée. Après
            une excursion, une marche ou plusieurs heures sur la route, ce type d’arrêt te ramène au
            rythme du lieu. C’est aussi une bonne façon de relier voyage, terroir et ambiance
            locale.
          </p>
        </div>

        <div className="space-y-4">
          <h3>Terroir Boréal Saveurs Natives</h3>
          <p>
            Si tu veux donner une vraie profondeur locale à ton passage à Tadoussac, c’est le genre
            d’adresse qui apporte beaucoup. Tu passes du “j’ai vu une destination” à “j’ai goûté une
            région”. Pour un site comme le tien, c’est exactement le type de recommandation qui
            enrichit l’expérience.
          </p>
        </div>

        <div className="space-y-4">
          <h3>À intégrer autour : Sacré-Cœur et les alentours</h3>
          <p>
            Si ton itinéraire te laisse un peu de marge, regarde aussi des adresses comme
            <strong> Herbamiel</strong> ou la <strong>Ferme 5 Étoiles</strong> du côté de
            Sacré-Cœur. Ce sont de très bonnes idées pour ceux qui aiment associer nature, route,
            terroir et découvertes locales dans un même voyage.
          </p>
        </div>

        <p>
          Pour aller plus loin dans cette logique, n’hésite pas à explorer aussi notre page dédiée
          aux{' '}
          <Link href="/producteurs" className="font-semibold underline">
            producteurs locaux
          </Link>
          . C’est exactement le genre de maillage interne utile, cohérent et bon pour le lecteur.
        </p>
      </section>

      <section className="space-y-5">
        <h2>Comment construire un itinéraire intelligent autour de Tadoussac</h2>
        <p>
          Tadoussac fonctionne très bien comme point fort d’un parcours plus large. Tu peux le
          combiner avec d’autres arrêts de la Côte-Nord, mais aussi avec des détours autour du fjord
          ou vers des villages maritimes qui enrichissent énormément le voyage.
        </p>
        <p>
          Si tu veux un trajet plus fluide, le plus simple est d’utiliser notre{' '}
          <Link href="/planificateur" className="font-semibold underline">
            planificateur d’itinéraire
          </Link>
          . Tu peux aussi aller voir les{' '}
          <Link href="/itineraires-communaute" className="font-semibold underline">
            itinéraires partagés par la communauté
          </Link>{' '}
          pour t’inspirer de parcours déjà pensés.
        </p>
      </section>

      <section className="space-y-5">
        <h2>Conseils pratiques pour réussir ton séjour à Tadoussac</h2>
        <ul className="list-disc space-y-3 pl-6">
          <li>Réserve tôt en haute saison, surtout si tu veux un hébergement bien placé.</li>
          <li>Prévois des vêtements plus chauds que prévu pour les sorties sur l’eau.</li>
          <li>
            Garde du temps libre : à Tadoussac, les meilleurs souvenirs viennent souvent aussi des
            moments non programmés.
          </li>
          <li>Prends le temps de marcher, pas seulement d’enchaîner les activités.</li>
          <li>
            Ajoute une boulangerie ou un producteur à ton trajet pour rendre la journée encore plus
            mémorable.
          </li>
        </ul>
      </section>

      <section className="space-y-5">
        <h2>Mon avis sur Tadoussac</h2>
        <p>
          Pour moi, Tadoussac ne fait pas seulement partie des destinations célèbres du Québec.
          C’est une destination qui a du souffle. Elle donne quelque chose qu’on retrouve rarement
          avec la même intensité : la sensation d’être face à un territoire plus grand que soi, mais
          dans un cadre encore humain, accessible et agréable à vivre.
        </p>
        <p>
          Oui, tu peux y aller pour les baleines. Mais si tu laisses un peu de place au village, aux
          pauses gourmandes, aux producteurs, aux points de vue et au rythme du lieu, Tadoussac
          devient beaucoup plus qu’une sortie. Elle devient un vrai souvenir de voyage.
        </p>
      </section>
    </DestinationArticleTemplate>
  );
}
