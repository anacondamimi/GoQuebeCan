import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_SAGUENAY } from '@/data/hotels/byArticle/saguenay';
import { bookingAwin } from '@/lib/awin';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';

export const metadata = {
  slug: 'saguenay',
  ville: 'Saguenay',
  resume:
    'Que faire à Saguenay ? Guide complet pour découvrir Chicoutimi, Jonquière, La Baie, le fjord du Saguenay, les belvédères, les activités en famille, les restaurants, les producteurs locaux et les meilleurs hébergements.',
  activites: [
    'Fjord du Saguenay',
    'Chicoutimi',
    'Jonquière',
    'La Baie',
    'Belvédères du fjord',
    'Pulperie de Chicoutimi',
    'Randonnées familiales',
    'Kayak encadré',
    'Producteurs locaux',
    'Road trip au Saguenay',
  ],
  hebergements: ['OTL Gouverneur Saguenay', 'Hôtel Le Montagnais', 'Gîte du Haut des Arbres'],
  publics: ['familles', 'couples', 'sportifs', 'VR', 'amoureux de la nature', 'gourmands'],
};

const hotels = pickHotels(HOTEL_IDS_SAGUENAY);

const restaurants = [
  {
    name: 'Boefish Saguenay',
    city: 'Saguenay',
    type: 'Restaurant chic',
    speciality: 'Grill, fruits de mer et ambiance moderne',
    price: '$$$$',
    mustTry: 'Grillades, tartares ou fruits de mer selon la saison',
    schedule: 'Dîner et souper',
    image: '/images/carte.avif',
    vibe: 'Élégant et moderne',
    tip: 'Très bon choix pour une soirée plus spéciale, surtout si tu dors à Chicoutimi.',
  },
  {
    name: 'La Voie Maltée',
    city: 'Saguenay',
    type: 'Microbrasserie',
    speciality: 'Bières artisanales, burgers et plats généreux',
    price: '$$',
    mustTry: 'Bière maison et plat réconfort',
    schedule: 'Midi et soir',
    image: '/images/carte.avif',
    vibe: 'Locale et conviviale',
    tip: 'Parfait après une journée dehors quand tu veux une ambiance simple et vivante.',
  },
  {
    name: 'La Cuisine',
    city: 'Chicoutimi',
    type: 'Bistro local',
    speciality: 'Cuisine créative, produits du Québec et ambiance chaleureuse',
    price: '$$$',
    mustTry: 'Plat du moment ou assiette à partager',
    schedule: 'Horaires variables selon la saison',
    image: '/images/carte.avif',
    vibe: 'Créatif et chaleureux',
    tip: 'Une belle adresse pour sentir le côté urbain et gourmand de Chicoutimi.',
  },
  {
    name: 'Cantine ou casse-croûte local',
    city: 'Saguenay',
    type: 'Pause simple',
    speciality: 'Poutine, burgers, repas rapides et cuisine réconfort',
    price: '$',
    mustTry: 'Poutine ou club sandwich',
    schedule: 'Midi et souper',
    image: '/images/carte.avif',
    vibe: 'Simple et efficace',
    tip: 'Très pratique entre deux belvédères ou avant de reprendre la route.',
  },
];

const faqItems = [
  {
    question: 'Pourquoi visiter Saguenay ?',
    answer:
      'Saguenay est une destination forte pour son fjord, ses belvédères, ses secteurs complémentaires comme Chicoutimi, Jonquière et La Baie, ses activités de plein air, ses restaurants et son potentiel de road trip au Québec.',
  },
  {
    question: 'Combien de jours faut-il pour visiter Saguenay ?',
    answer:
      'Trois jours permettent de voir l’essentiel. Quatre à cinq jours rendent le séjour plus confortable, surtout si tu veux ajouter des producteurs locaux, des randonnées, La Baie et des activités sur l’eau.',
  },
  {
    question: 'Saguenay est-il adapté aux familles ?',
    answer:
      'Oui. La région propose des sentiers accessibles, des musées, des points de vue, des hôtels avec services familiaux, des pauses gourmandes et des activités encadrées selon la saison.',
  },
  {
    question: 'Quelle est la meilleure période pour visiter Saguenay ?',
    answer:
      'La période de juin à octobre est souvent la plus agréable pour profiter du fjord, des routes panoramiques, des producteurs locaux, des terrasses et des activités extérieures.',
  },
  {
    question: 'Saguenay est-il une bonne étape de road trip au Québec ?',
    answer:
      'Oui. Saguenay est une excellente étape de road trip grâce à ses paysages, ses hébergements, ses routes panoramiques, ses producteurs locaux et ses possibilités de combiner nature, culture et gastronomie.',
  },
];

export default function BlogArticleSaguenay() {
  return (
    <DestinationArticleTemplate
      slug="saguenay"
      title="Saguenay : que faire, où dormir et comment réussir un séjour entre fjord, Chicoutimi et La Baie"
      subtitle="Entre fjord majestueux, belvédères, Chicoutimi, Jonquière, La Baie, producteurs locaux, activités familiales et bonnes adresses, Saguenay est une destination idéale pour un vrai road trip au Québec."
      quickFacts={[
        { label: 'Région', value: 'Saguenay–Lac-Saint-Jean' },
        { label: 'Durée idéale', value: '3 à 5 jours' },
        { label: 'Expérience phare', value: 'Fjord + belvédères + terroir' },
        { label: 'Ambiance', value: 'Nature, grand air, famille et road trip' },
      ]}
      utilityLinks={[
        { label: '🗺 Planifier mon itinéraire', href: '/planificateur' },
        { label: '🍓 Découvrir les producteurs locaux', href: '/producteurs', variant: 'outline' },
        { label: '💛 Voir nos coups de cœur', href: '/coups-de-coeur', variant: 'outline' },
        { label: '📚 Explorer d’autres destinations', href: '/blog', variant: 'outline' },
      ]}
      hero={{
        eyebrow: 'Saguenay–Lac-Saint-Jean',
        image: (
          <div className="relative h-[260px] w-full overflow-hidden sm:h-[340px] lg:h-[430px]">
            <Image
              src="/images/destinations/saguenay.avif"
              alt="Fjord du Saguenay avec falaises, eau profonde et paysage nordique"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1100px"
            />
          </div>
        ),
        caption:
          'Saguenay combine fjord spectaculaire, secteurs urbains pratiques, routes panoramiques, producteurs locaux et activités familiales pour un séjour complet au Québec.',
      }}
      intro={{
        title: 'Pourquoi visiter Saguenay ?',
        paragraphs: [
          'Saguenay fait partie de ces destinations qui donnent immédiatement une impression de grandeur. On y vient souvent pour le fjord du Saguenay, mais on découvre rapidement une région plus complète : Chicoutimi pour la base pratique, Jonquière pour rayonner autrement, La Baie pour ressentir le paysage, et plusieurs routes où chaque détour peut devenir un vrai moment de voyage.',
          'Ce qui rend Saguenay intéressant, c’est sa capacité à mélanger nature, confort, gastronomie, patrimoine et road trip sans devenir compliqué. Tu peux y organiser un séjour familial, une escapade en couple, une étape en VR, ou un voyage plus actif avec randonnées, belvédères et sorties encadrées.',
          'Si tu te demandes que faire à Saguenay, combien de temps rester, où dormir, où manger, quels secteurs choisir et comment bâtir un itinéraire logique, ce guide reprend la structure la plus simple et la plus efficace pour préparer ton séjour.',
        ],
      }}
      hotelIntro={{
        title: 'Où dormir à Saguenay ?',
        text: 'Dormir à Saguenay permet de mieux profiter des secteurs de Chicoutimi, Jonquière, La Baie et du fjord. Le bon choix dépend de ton style : confort urbain, hôtel familial ou adresse plus calme près de la nature.',
      }}
      hotelSection={<HotelGrid items={hotels} />}
      restaurantIntro={{
        title: 'Où manger à Saguenay ?',
        text: 'Saguenay se découvre aussi à table. Entre microbrasseries, bistros, restaurants plus chics, cantines simples et produits locaux, tu peux facilement adapter tes repas au rythme du voyage.',
      }}
      restaurantSection={<RestaurantPremiumGrid items={restaurants} />}
      faqIntro={{
        title: 'FAQ : visiter Saguenay',
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
        text: 'Saguenay mérite plus qu’un simple passage rapide. Le fjord, les belvédères, les secteurs de Chicoutimi, Jonquière et La Baie, les producteurs locaux et les bonnes adresses créent une destination complète, idéale pour ralentir et construire un vrai souvenir de voyage au Québec.',
        ctas: [
          {
            label: 'Réserver un hébergement',
            href: bookingAwin('https://www.booking.com/city/ca/saguenay.fr.html'),
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
          <strong>Saguenay</strong> est une destination qui se ressent autant qu’elle se visite. Dès
          qu’on approche du fjord, le paysage prend une autre dimension : l’eau paraît plus
          profonde, les falaises plus présentes, la lumière plus nordique. C’est ce mélange de force
          et de calme qui rend la région si attachante.
        </p>

        <p>
          Le grand avantage de Saguenay, c’est qu’on peut composer un séjour très équilibré. Une
          journée peut commencer à <strong>Chicoutimi</strong>, se poursuivre vers un belvédère,
          inclure une pause gourmande, puis finir à <strong>La Baie</strong> devant un panorama plus
          ouvert. On ne fait pas seulement une liste d’activités : on construit une vraie
          progression de voyage.
        </p>

        <p>
          C’est aussi une région très intéressante pour GoQuébeCAN parce qu’elle se prête
          parfaitement au <Link href="/planificateur">planificateur d’itinéraire</Link>. Les
          distances, les secteurs, les arrêts locaux, les producteurs et les points de vue gagnent
          vraiment à être organisés dans un parcours logique.
        </p>
      </section>

      <section className="space-y-5">
        <h2>Les incontournables à Saguenay</h2>

        <div className="space-y-4">
          <h3>1. Explorer le fjord du Saguenay</h3>
          <p>
            Le fjord est la grande signature de la région. Que tu l’approches par la route, par un
            belvédère, par un sentier ou par une activité encadrée sur l’eau, il donne immédiatement
            un sentiment d’espace. C’est souvent le moment du voyage où l’on comprend pourquoi
            Saguenay marque autant les visiteurs.
          </p>
        </div>

        <div className="space-y-4">
          <h3>2. Découvrir Chicoutimi</h3>
          <p>
            Chicoutimi est une excellente base pour dormir, manger, marcher et organiser les
            sorties. Le secteur permet de garder un bon équilibre entre confort urbain et accès
            rapide aux paysages. C’est souvent le meilleur choix pour un premier séjour dans la
            région.
          </p>
        </div>

        <div className="space-y-4">
          <h3>3. Aller vers La Baie</h3>
          <p>
            La Baie donne une sensation plus directe du fjord et du grand paysage. C’est un secteur
            très agréable pour ralentir, prendre des photos, respirer et intégrer un moment plus
            contemplatif à l’itinéraire.
          </p>
        </div>

        <div className="space-y-4">
          <h3>4. Monter à un belvédère</h3>
          <p>
            Les belvédères sont parmi les meilleurs arrêts à prévoir. Ils permettent d’obtenir un
            vrai effet wow sans forcément prévoir une longue randonnée. C’est parfait pour les
            familles, les couples et les voyageurs qui veulent voir grand sans trop compliquer la
            journée.
          </p>
        </div>

        <div className="space-y-4">
          <h3>5. Ajouter un arrêt terroir</h3>
          <p>
            Bleuets, fromages, chocolats, produits locaux, microbrasseries et marchés donnent une
            autre personnalité au séjour. Pour enrichir ton parcours, consulte aussi notre page des{' '}
            <Link href="/producteurs">producteurs locaux</Link>.
          </p>
        </div>
      </section>

      <section className="space-y-5">
        <h2>Que faire à Saguenay en famille ?</h2>
        <p>
          Saguenay fonctionne très bien avec des enfants parce qu’on peut alterner les activités
          sans surcharger la journée. Un point de vue, une courte marche, un musée, une pause
          chocolat ou une piscine d’hôtel peuvent suffire à créer un programme agréable et réaliste.
        </p>
        <p>
          Les familles apprécient surtout la flexibilité de la région. Si la météo est belle, on
          mise sur les sorties dehors. Si elle devient moins favorable, on garde des options plus
          simples : restaurants, musées, pauses gourmandes ou moments tranquilles à l’hébergement.
        </p>
      </section>

      <section className="space-y-5">
        <h2>Combien de jours prévoir à Saguenay ?</h2>
        <p>
          Une journée donne seulement un aperçu. Pour vraiment apprécier Saguenay, le meilleur
          format commence souvent à <strong>trois jours</strong>. Cela permet de découvrir
          Chicoutimi, La Baie, quelques belvédères et au moins une ou deux bonnes adresses locales.
        </p>
        <p>
          Si tu peux rester <strong>quatre à cinq jours</strong>, le voyage devient beaucoup plus
          confortable. Tu peux ajouter des producteurs locaux, une activité sur l’eau, une randonnée
          plus longue, des pauses sans pression et un itinéraire plus fluide autour du fjord.
        </p>
      </section>

      <section className="space-y-5">
        <h2>Producteurs locaux, bleuets et plaisirs gourmands autour de Saguenay</h2>
        <p>
          Le Saguenay–Lac-Saint-Jean a une vraie identité gourmande. Le bleuet fait évidemment
          partie de l’imaginaire régional, mais il ne faut pas s’arrêter là : fromages, chocolats,
          produits transformés, boissons artisanales et petites adresses locales peuvent donner
          beaucoup d’âme à un road trip.
        </p>

        <div className="space-y-4">
          <h3>Les bleuets et produits régionaux</h3>
          <p>
            Tartes, confitures, desserts, produits transformés : le bleuet ajoute une couleur très
            locale au séjour. C’est le genre d’arrêt simple qui rend la route plus mémorable.
          </p>
        </div>

        <div className="space-y-4">
          <h3>Fromages, boulangeries et pique-niques</h3>
          <p>
            Un bon pain, un fromage du Québec, quelques produits frais et un point de vue suffisent
            parfois à créer l’un des meilleurs repas du voyage. Ce sont ces moments simples qui
            donnent beaucoup de valeur à un itinéraire.
          </p>
        </div>

        <div className="space-y-4">
          <h3>Microbrasseries et ambiance locale</h3>
          <p>
            Après une journée dehors, une microbrasserie ou un bistro local permet de finir la
            journée dans une ambiance détendue. C’est aussi une bonne façon de ressentir le côté
            vivant et convivial de la région.
          </p>
        </div>

        <p>
          Pour aller plus loin, explore notre page dédiée aux{' '}
          <Link href="/producteurs" className="font-semibold underline">
            producteurs locaux
          </Link>
          . C’est une excellente façon d’ajouter des arrêts utiles et gourmands à ton parcours.
        </p>
      </section>

      <section className="space-y-5">
        <h2>Comment construire un itinéraire intelligent autour de Saguenay</h2>
        <p>
          Saguenay se prête très bien à un itinéraire construit par étapes. Le piège serait de
          vouloir tout faire dans le désordre : Chicoutimi, Jonquière, La Baie, les belvédères, les
          producteurs et les activités nature doivent être organisés selon la logique de route.
        </p>
        <p>
          Le plus simple est d’utiliser notre{' '}
          <Link href="/planificateur" className="font-semibold underline">
            planificateur d’itinéraire
          </Link>
          . Tu peux y relier les hébergements, les points de vue, les producteurs locaux et les
          autres destinations de ton voyage au Québec.
        </p>
      </section>

      <section className="space-y-5">
        <h2>Conseils pratiques pour réussir ton séjour à Saguenay</h2>
        <ul className="list-disc space-y-3 pl-6">
          <li>Prévois au moins trois jours si tu veux éviter de seulement traverser la région.</li>
          <li>Garde une marge dans l’horaire pour la météo, surtout près du fjord.</li>
          <li>
            Choisis ton hébergement selon ton programme : Chicoutimi pour le pratique, La Baie pour
            le décor.
          </li>
          <li>
            Ajoute au moins un arrêt producteur pour rendre le séjour plus local et plus mémorable.
          </li>
          <li>Prévois un coupe-vent ou une couche plus chaude pour les sorties près de l’eau.</li>
          <li>
            Consulte aussi nos <Link href="/videos">vidéos</Link> et nos{' '}
            <Link href="/coups-de-coeur">coups de cœur</Link> pour compléter ton inspiration.
          </li>
        </ul>
      </section>

      <section className="space-y-5">
        <h2>Mon avis sur Saguenay</h2>
        <p>
          Saguenay n’est pas seulement une destination de beaux paysages. C’est une région qui donne
          une vraie respiration au voyage. Le fjord impose le décor, mais ce sont les détails autour
          qui rendent le séjour attachant : une bonne table, un producteur, une route tranquille,
          une lumière de fin de journée, un belvédère où l’on reste plus longtemps que prévu.
        </p>
        <p>
          Si tu prends le temps d’y dormir quelques nuits et d’organiser ton itinéraire avec calme,
          Saguenay peut devenir l’un des moments les plus forts d’un voyage au Québec.
        </p>
      </section>
    </DestinationArticleTemplate>
  );
}
