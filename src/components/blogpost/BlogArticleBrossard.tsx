import React from 'react';
import Image from 'next/image';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_BROSSARD } from '@/data/hotels/byArticle/brossard';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';

const hotels = pickHotels(HOTEL_IDS_BROSSARD);

const brossardRestaurants = [
  {
    name: "L'Aurochs Steakhouse",
    city: 'brossard',
    type: 'Gastronomique',
    speciality: 'Steakhouse haut de gamme, viandes de qualité et carte des vins recherchée',
    price: '$$$$',
    mustTry: 'Ribeye ou filet mignon, huîtres Rockefeller',
    schedule: 'Horaires variables selon la saison',
    image: '/images/carte.avif',
    vibe: "Décor chic, ambiance vivante et feutrée, parfait pour occasions spéciales ou repas d'affaires",
    tip: "Réservez à l'avance, surtout le week-end, et privilégiez le rez-de-chaussée (Vestibule) pour une ambiance plus tranquille en semaine",
  },
  {
    name: '3 Brasseurs',
    city: 'brossard',
    type: 'Microbrasserie',
    speciality: 'Bières artisanales brassées sur place et cuisine de brasserie alsacienne',
    price: '$$',
    mustTry: 'Poutine sauce bière, Flammekueche ou burger au cheddar vieilli et réduction de Brune',
    schedule: 'Horaires variables selon la saison',
    image: '/images/carte.avif',
    vibe: 'Cadre chaleureux et convivial au cœur du Quartier DIX30, idéal en famille, entre amis ou avant le cinéma',
    tip: 'Profitez des horaires étendus pour un 5 à 7 tranquille avant les heures de pointe du centre commercial',
  },
  {
    name: 'Toujours Mikes',
    city: 'brossard',
    type: 'Cantine / Casse-croûte',
    speciality: 'Subs, pizzas et pâtes',
    price: '$',
    mustTry: 'Sub sous-marin classique ou pizza maison',
    schedule: 'Horaires variables selon la saison',
    image: '/images/carte.avif',
    vibe: 'Atmosphère accueillante et moderne, populaire pour repas de famille ou entre collègues',
    tip: 'Idéal pour un lunch rapide entre deux courses au Quartier DIX30',
  },
  {
    name: 'Poutine & Co.',
    city: 'brossard',
    type: 'Cantine / Casse-croûte',
    speciality: 'Poutine, hamburger au poulet frit, smoked meat et sandwichs',
    price: '$',
    mustTry: 'Poutine classique ou hamburger au poulet frit',
    schedule: 'Horaires variables selon la saison',
    image: '/images/carte.avif',
    vibe: 'Cantine simple et sans prétention, service rapide et efficace',
    tip: 'Parfait pour un repas rapide et généreux à petit prix, à emporter ou sur place',
  },
];

export default function BlogArticleBrossard() {
  return (
    <DestinationArticleTemplate
      title={'Brossard en famille : le guide complet pour découvrir la Rive-Sud de Montréal'}
      slug={'brossard'}
      subtitle={"Entre le Quartier DIX30, le REM tout neuf et des parcs à perte de vue, Brossard s'impose comme une destination familiale surprenante à deux pas de Montréal."}
      hero={{
        image: (
          <Image
            src={'/images/destinations/brossard.avif'}
            alt={'Vue sur brossard'}
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
          />
        ),
        eyebrow: 'montréal rive-sud',
        caption: 'Vue sur brossard',
      }}
      quickFacts={[{'label':'Région','value':'Montréal Rive-Sud (Montérégie)'},{'label':'Distance depuis Montréal','value':'Environ 15-20 minutes via le REM ou le pont Champlain'},{'label':'Idéal pour','value':"Familles, magasinage, escapade d'une journée ou d'un week-end"},{'label':'Durée recommandée','value':'1 à 2 jours'},{'label':'Incontournable','value':'Quartier DIX30 et station REM Brossard'},{'label':'Meilleure période','value':"Toute l'année, avec un plus en été pour les parcs extérieurs"}]}
      intro={{
        title: 'Pourquoi visiter Brossard en famille ?',
        paragraphs: ["Brossard a longtemps été perçue comme une simple banlieue de Montréal, celle qu'on traverse sur l'autoroute 10 sans vraiment s'y arrêter. Mais depuis l'arrivée du REM (Réseau express métropolitain), la ville a changé de visage. On y vient maintenant volontairement, pour magasiner, manger et profiter d'installations familiales qui n'ont rien à envier aux grandes villes.","Ce qui frappe d'abord, c'est l'accessibilité. Depuis Montréal, on rejoint Brossard en quelques minutes grâce au REM, sans avoir à se soucier du trafic sur le pont Champlain. Pour les familles québécoises qui veulent une escapade d'un jour ou d'un week-end sans les tracas d'un long trajet, c'est presque trop simple.","Et puis il y a le Quartier DIX30, ce mégacomplexe commercial et de divertissement qui attire autant les ados en quête de boutiques que les parents en mal de restos familiaux. Ajoutez à ça des parcs verts, des pistes cyclables et une bonne dose de diversité culturelle qui se reflète dans l'offre culinaire, et vous obtenez une destination Rive-Sud qui mérite qu'on lui consacre une vraie journée, sinon un week-end complet."],
      }}
      hotelIntro={{ title: 'Où dormir à Brossard en famille', text: "Pour un séjour pratique et central, l'Hôtel Alt Quartier DIX30 se distingue comme une option de choix. Situé au cœur même du Quartier DIX30, il permet aux familles de marcher jusqu'aux boutiques, restaurants et cinémas sans avoir à reprendre la voiture. Les chambres modernes et le style épuré de l'établissement plaisent autant aux parents en quête de confort qu'aux ados qui apprécient l'accès Wi-Fi et l'ambiance contemporaine. C'est l'adresse idéale pour ceux qui veulent combiner shopping, restos et repos sans perdre de temps en déplacements." }}
      hotelSection={<HotelGrid items={hotels} />}
      restaurantIntro={{ title: 'Où manger à Brossard en famille', text: "Le choix de restaurants à Brossard reflète bien la diversité de la ville. Pour une soirée plus festive, L'Aurochs Steakhouse propose une expérience carnivore généreuse qui plaira aux amateurs de bonne viande, parents comme ados. Les familles avec de jeunes enfants opteront plutôt pour 3 Brasseurs, où l'ambiance décontractée et le menu varié font l'unanimité autour de la table. Pour une option plus rapide et économique, Toujours Mikes offre des classiques réconfortants qui plaisent à tous les âges, tandis que Poutine & Co. reste un incontournable pour découvrir (ou redécouvrir) le plat national québécois dans une version savoureuse et sans prétention." }}
      restaurantSection={<RestaurantPremiumGrid items={brossardRestaurants} />}
      faqIntro={{ title: 'FAQ : visiter brossard' }}
      faqSection={
        <div className="space-y-5">
          <div className="space-y-4">
            <h3>Combien de temps prévoir pour visiter Brossard en famille ?</h3>
            <p>Une journée complète permet déjà de profiter du Quartier DIX30 et d'un bon repas en famille. Pour combiner magasinage, parcs et une nuit à l'hôtel, prévoyez plutôt un week-end de deux jours.</p>
          </div>

          <div className="space-y-4">
            <h3>Comment se rendre à Brossard depuis Montréal ?</h3>
            <p>Le moyen le plus simple et le plus rapide est le REM (Réseau express métropolitain), qui relie Montréal à la station Brossard en une vingtaine de minutes, sans se soucier du trafic sur le pont Champlain.</p>
          </div>

          <div className="space-y-4">
            <h3>Le Quartier DIX30 est-il adapté aux familles avec jeunes enfants ?</h3>
            <p>Oui, tout à fait. En plus des boutiques, on y trouve des restaurants familiaux, des espaces extérieurs avec fontaines en été, et un cinéma. C'est un endroit conçu pour qu'on y passe la journée sans s'ennuyer, peu importe l'âge des enfants.</p>
          </div>

          <div className="space-y-4">
            <h3>Y a-t-il des activités gratuites à faire à Brossard en famille ?</h3>
            <p>Absolument. Les parcs municipaux comme le Parc de la Cité offrent des sentiers de marche, des modules de jeux et des espaces pique-nique gratuits. Les pistes cyclables le long du fleuve constituent aussi une belle option sans frais.</p>
          </div>

          <div className="space-y-4">
            <h3>Où loger à Brossard pour être proche de tout ?</h3>
            <p>L'Hôtel Alt Quartier DIX30 est idéalement situé en plein cœur du Quartier DIX30, ce qui permet d'accéder à pied aux boutiques, restaurants et divertissements sans avoir besoin de la voiture.</p>
          </div>

          <div className="space-y-4">
            <h3>Peut-on visiter Brossard sans voiture ?</h3>
            <p>Oui, c'est même de plus en plus facile grâce au REM qui dessert directement Brossard depuis Montréal, et au fait que le Quartier DIX30 est accessible à pied depuis la station.</p>
          </div>
        </div>
      }
      conclusion={{
        title: 'Brossard, une escapade familiale à redécouvrir',
        text: "Brossard n'est plus seulement cette ville qu'on traverse en route vers ailleurs. Avec le REM qui la rapproche encore plus de Montréal, un Quartier DIX30 qui a de quoi occuper toute une famille, et des parcs verts pour souffler entre deux boutiques, elle mérite amplement sa place dans vos plans d'escapade sur la Rive-Sud. Que vous y passiez une simple journée ou un week-end complet, vous repartirez avec la certitude que la Montérégie a encore de belles surprises à offrir aux familles québécoises.",
        ctas: [
          { label: 'Planifier mon itinéraire', href: '/planificateur', variant: 'primary' },
          { label: 'Voir les itinéraires partagés', href: '/itineraires-communaute', variant: 'outline' },
          { label: 'Explorer d’autres destinations', href: '/blog', variant: 'soft' },
        ],
      }}
    >
      <section className="space-y-12">
        <section className="space-y-5">
          <h2>Le REM : la nouvelle façon d'arriver à Brossard</h2>
          <p>Impossible de parler de Brossard en 2026 sans mentionner le REM. Ce train léger automatisé relie désormais la Rive-Sud à Montréal en un temps record, et la station terminus de Brossard est devenue un point de repère pour les visiteurs comme pour les résidents.</p>
          <p>Pour les familles qui viennent de Montréal ou même d'ailleurs au Québec, le REM change vraiment la donne : plus besoin de conduire, plus besoin de chercher un stationnement payant au centre-ville. On embarque, on s'assoit, et vingt minutes plus tard, on est au cœur de l'action brossardoise. Les enfants adorent d'ailleurs l'expérience du train automatisé, sans conducteur visible, un vrai petit moment magique pour les plus jeunes.</p>
          <p>La station Brossard se trouve à distance de marche du Quartier DIX30, ce qui rend l'ensemble du séjour encore plus pratique si vous voyagez léger ou si vous préférez laisser l'auto à la maison.</p>
          <ul className="list-disc space-y-3 pl-6">
            <li>Trajet direct depuis la Gare Centrale de Montréal</li>
            <li>Station Brossard connectée directement au réseau de transport local</li>
            <li>Une option écologique et sans stress pour les familles</li>
          </ul>
        </section>

        <section className="space-y-5">
          <h2>Quartier DIX30 : bien plus qu'un centre commercial</h2>
          <p>Le Quartier DIX30 est souvent LA raison qui pousse les familles à faire le détour par Brossard. Ce n'est pas un centre commercial classique avec des couloirs fermés, mais plutôt un véritable quartier à ciel ouvert, avec ses rues, ses places publiques et son ambiance presque urbaine.</p>
          <p>On y trouve de tout : grandes enseignes, boutiques spécialisées, salles de cinéma, et une concentration impressionnante de restaurants familiaux. En été, les terrasses extérieures et les fontaines interactives font le bonheur des enfants qui peuvent courir et se rafraîchir pendant que les parents magasinent tranquillement.</p>
          <p>L'hiver n'est pas en reste : les décorations et l'ambiance chaleureuse des commerces créent un cadre agréable pour une sortie shopping qui ne ressemble pas à une corvée. C'est aussi un excellent endroit pour dénicher des cadeaux ou faire ses courses de la rentrée sans avoir à se déplacer jusqu'au centre-ville de Montréal.</p>
          <ul className="list-disc space-y-3 pl-6">
            <li>Boutiques pour toute la famille, du bébé à l'ado</li>
            <li>Cinéma et divertissements sur place</li>
            <li>Fontaines et espaces extérieurs appréciés des enfants en été</li>
            <li>Accessible à pied depuis la station REM Brossard</li>
          </ul>
        </section>

        <section className="space-y-5">
          <h2>Parcs, nature et activités extérieures en famille</h2>
          <p>Brossard n'est pas qu'une ville de béton et de magasinage. La municipalité compte plusieurs parcs bien aménagés, parfaits pour une pause après le shopping ou pour une journée complète en plein air.</p>
          <p>Le Parc de la Cité, par exemple, offre des sentiers de marche, des espaces verts et une bibliothèque municipale toute proche, question de combiner activité physique et culture dans la même sortie. Les familles avec de jeunes enfants apprécient particulièrement les modules de jeux bien entretenus qu'on retrouve dans plusieurs parcs de quartier.</p>
          <p>En été, le réseau cyclable de Brossard permet de belles randonnées à vélo en famille, avec des pistes qui longent parfois le fleuve Saint-Laurent, offrant des vues superbes sur Montréal en arrière-plan. C'est une façon différente et rafraîchissante de découvrir la Rive-Sud, loin de l'agitation commerciale du DIX30.</p>
          <ul className="list-disc space-y-3 pl-6">
            <li>Parc de la Cité et ses sentiers accessibles</li>
            <li>Modules de jeux pour enfants dans plusieurs quartiers</li>
            <li>Pistes cyclables avec vue sur le fleuve et Montréal</li>
            <li>Espaces pique-nique bien aménagés</li>
          </ul>
        </section>

        <section className="space-y-5">
          <h2>Une escapade d'une journée ou un vrai week-end ?</h2>
          <p>La question revient souvent : faut-il prévoir une simple journée ou un week-end complet à Brossard ? Tout dépend de vos priorités. Si l'objectif principal est le magasinage au Quartier DIX30 avec un bon repas en famille, une journée suffit amplement, surtout si vous partez de Montréal via le REM tôt le matin.</p>
          <p>Par contre, si vous souhaitez combiner shopping, restos, promenade dans les parcs et peut-être une soirée tranquille à l'hôtel avant de reprendre la route, un week-end permet de prendre le temps sans courir. C'est aussi une bonne option pour les familles qui viennent de plus loin au Québec et qui veulent profiter à la fois de Brossard et faire un saut à Montréal, à quelques minutes de train seulement.</p>
          <p>Pour les familles avec de jeunes enfants, étaler les activités sur deux jours évite la fatigue et permet de profiter pleinement de chaque arrêt, plutôt que de tout précipiter en une seule journée chargée.</p>

        </section>

        <section className="space-y-5">
          <h2>Où faire l’épicerie et découvrir les producteurs locaux</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Boulangerie artisanale française</p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">L'Amour du Pain</h3>
              <p className="mt-3 text-sm text-gray-700">Boulangerie artisanale située au 3050 boulevard Matte à Brossard, reconnue pour ses pains, viennoiseries et pâtisseries fraîches préparées quotidiennement par des artisans boulangers passionnés.</p>
            </div>
          </div>
        </section>


      </section>
    </DestinationArticleTemplate>
  );
}
