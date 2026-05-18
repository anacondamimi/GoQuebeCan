import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { pickHotels } from '@/data/hotels/hotelCatalog.generated';
import { HOTEL_IDS_PERCE } from '@/data/hotels/byArticle/perce';
import { RestaurantPremiumGrid } from '@/components/food/RestaurantPremiumGrid';

const hotels = pickHotels(HOTEL_IDS_PERCE);

const perceRestaurants = [
  {
    name: 'Paqbo',
    city: 'Percé',
    type: 'Cuisine locale et actuelle',
    speciality: 'Cuisine locale, produits de la mer et assiettes soignées',
    price: '$$$',
    mustTry: 'Un plat mettant en valeur les saveurs gaspésiennes et les produits marins',
    schedule: 'Horaires variables selon la saison',
    image: '/images/carte.avif',
    vibe: 'Chaleureux',
    tip: 'Très agréable pour un souper plus travaillé après une journée de visite à Percé.',
  },
  {
    name: 'La Maison du Pêcheur',
    city: 'Percé',
    type: 'Institution gaspésienne',
    speciality: 'Cuisine locale dans un lieu emblématique du village',
    price: '$$$',
    mustTry: 'Un repas inspiré des produits régionaux dans une ambiance typique',
    schedule: 'Horaires variables selon la saison',
    image: '/images/carte.avif',
    vibe: 'Emblématique',
    tip: 'Une belle adresse si tu veux mêler ambiance locale et soirée mémorable.',
  },
  {
    name: 'Pub Pit Caribou de Percé',
    city: 'Percé',
    type: 'Pub et bières artisanales',
    speciality: 'Bières de microbrasserie et ambiance conviviale',
    price: '$$',
    mustTry: 'Une bière artisanale locale avec une petite pause en fin de journée',
    schedule: 'Horaires variables selon la saison',
    image: '/images/carte.avif',
    vibe: 'Décontracté',
    tip: 'Parfait pour relâcher la pression après une excursion ou une longue route.',
  },
  {
    name: 'Cafés et pauses gourmandes du centre',
    city: 'Percé',
    type: 'Pause café et collation',
    speciality: 'Déjeuners simples, cafés et petites douceurs',
    price: '$$',
    mustTry: 'Un café accompagné d’une viennoiserie ou d’une collation rapide avant le départ',
    schedule: 'Horaires variables selon les établissements',
    image: '/images/carte.avif',
    vibe: 'Simple et pratique',
    tip: 'Très utile pour les départs matinaux ou les petites pauses entre deux activités.',
  },
];

const aroundPerce = [
  {
    id: 'gaspe',
    title: 'Gaspé',
    description:
      'Une étape majeure à combiner avec Percé pour prolonger l’expérience gaspésienne entre ville, mer et patrimoine.',
    href: '/blog/gaspesie',
    image: '/images/destinations/gaspe.avif',
  },
  {
    id: 'forillon',
    title: 'Parc national Forillon',
    description:
      'Un incontournable pour les amateurs de falaises, de sentiers, de paysages maritimes et de nature grandiose.',
    href: '/blog/forillon',
    image: '/images/destinations/forillon.avif',
  },
  {
    id: 'bonaventure',
    title: 'Bonaventure',
    description:
      'Une destination très agréable à intégrer à un road trip en Gaspésie pour varier les ambiances et profiter d’un autre rythme.',
    href: '/blog/gaspesie',
    image: '/images/destinations/bonaventure.avif',
  },
  {
    id: 'carleton',
    title: 'Carleton-sur-Mer',
    description:
      'Une belle idée pour poursuivre le voyage avec un mélange de mer, détente, hébergements et atmosphère de vacances.',
    href: '/blog/carleton-sur-mer',
    image: '/images/destinations/carleton.avif',
  },
];

function AroundCard({
  title,
  description,
  href,
  image,
}: {
  title: string;
  description: string;
  href: string;
  image: string;
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <Link href={href} className="block">
        <div className="relative aspect-[16/10]">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      </Link>

      <div className="space-y-3 p-5">
        <h3 className="text-lg font-bold text-slate-900">
          <Link href={href} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="text-sm leading-6 text-slate-700">{description}</p>
        <Link
          href={href}
          className="inline-flex items-center text-sm font-semibold text-slate-900 underline underline-offset-4"
        >
          Découvrir cette destination
        </Link>
      </div>
    </article>
  );
}

export default function BlogArticlePerce() {
  return (
    <DestinationArticleTemplate
      title="Percé : guide complet pour visiter l’une des plus belles destinations du Québec"
      slug="perce"
      subtitle="Tu prépares un voyage à Percé en Gaspésie ? Voici un guide complet et ultra optimisé pour savoir que faire à Percé, où dormir, où manger, combien de jours prévoir et quelles visites faire autour de cette destination mythique du Québec."
      hero={{
        image: (
          <Image
            src="/images/destinations/perce.avif"
            alt="Vue sur Percé et le Rocher Percé en Gaspésie"
            width={1600}
            height={900}
            className="h-auto w-full object-cover"
            priority
          />
        ),
        eyebrow: 'Gaspésie',
        caption: 'Vue sur Percé et le Rocher Percé en Gaspésie',
      }}
      intro={{
        title: 'Pourquoi visiter Percé ?',
        paragraphs: [
          'Percé fait partie des destinations les plus iconiques du Québec. On y vient pour le célèbre Rocher Percé, pour l’Île Bonaventure, pour l’air salin, pour la sensation d’être au bout du monde, mais aussi pour vivre un vrai moment de déconnexion.',
          'Entre paysages maritimes spectaculaires, sorties en mer, balades au village et road trip en Gaspésie, Percé offre une expérience inoubliable.',
          'Si tu te demandes que faire à Percé, combien de temps rester, où dormir et quelles autres destinations visiter autour, ce guide complet va t’aider à construire un séjour fort, beau et fluide.',
        ],
      }}
      hotelIntro={{
        title: 'Où dormir à Percé ?',
        text: 'Le mieux, surtout pour une première visite, est de choisir un hébergement qui te permet de profiter facilement du village et de la vue. Dormir près du bord de mer aide vraiment à vivre Percé plus intensément, notamment tôt le matin et en soirée.',
      }}
      hotelSection={<HotelGrid items={hotels} />}
      restaurantIntro={{
        title: 'Où manger à Percé ?',
        text: 'Manger à Percé fait pleinement partie du plaisir. Entre fruits de mer, ambiance maritime, pauses café et terrasses agréables, la destination se prête très bien aux repas qui prolongent le sentiment de vacances.',
      }}
      restaurantSection={<RestaurantPremiumGrid items={perceRestaurants} />}
      faqIntro={{
        title: 'FAQ : visiter Percé au Québec',
      }}
      faqSection={
        <div className="space-y-5">
          <div className="space-y-4">
            <h3>Percé vaut-il vraiment le détour ?</h3>
            <p>
              Oui, clairement. C’est l’une des destinations les plus emblématiques et les plus
              dépaysantes du Québec.
            </p>
          </div>

          <div className="space-y-4">
            <h3>Peut-on visiter Percé en couple ?</h3>
            <p>
              Oui, et c’est même une très belle idée. Le cadre est romantique, les paysages sont
              puissants et l’ambiance se prête bien à un séjour à deux.
            </p>
          </div>

          <div className="space-y-4">
            <h3>Percé est-il adapté à un road trip ?</h3>
            <p>
              Oui. C’est même l’un des arrêts les plus forts d’un circuit en Gaspésie, à condition
              de lui consacrer assez de temps.
            </p>
          </div>

          <div className="space-y-4">
            <h3>Que faire autour de Percé ?</h3>
            <p>
              Tu peux prolonger l’expérience avec Gaspé, le parc national Forillon, Bonaventure ou
              Carleton-sur-Mer selon ton itinéraire.
            </p>
          </div>

          <div className="space-y-4">
            <h3>Quel est le meilleur moment pour voir le Rocher Percé ?</h3>
            <p>
              Le matin tôt et la fin de journée sont souvent particulièrement beaux grâce à la
              lumière et à l’atmosphère plus calme.
            </p>
          </div>
        </div>
      }
      conclusion={{
        title: 'Conclusion',
        text: 'Si tu cherches une destination forte, photogénique, maritime et vraiment mémorable, Percé mérite une place de choix dans ton voyage. Le lieu impressionne, apaise et donne envie de rester plus longtemps que prévu. Que tu viennes pour un court séjour ou pour une grande boucle en Gaspésie, tu peux facilement transformer cette étape en moment phare de ton itinéraire. Et pour aller encore plus loin, prends le temps de regarder aussi ce qu’il y a autour : c’est souvent là que naissent les plus beaux road trips.',
        ctas: [
          {
            label: 'Planifier mon itinéraire',
            href: '/planificateur',
            variant: 'primary',
          },
          {
            label: 'Voir les itinéraires partagés',
            href: '/itineraires-communaute',
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
      <section className="space-y-12">
        <section className="space-y-6">
          <p>
            Visiter <strong>Percé</strong>, ce n’est pas seulement cocher un lieu célèbre sur une
            carte du Québec. C’est vivre un décor immense, puissant et profondément maritime. Dès
            l’arrivée, il y a ce moment où l’on voit le village apparaître, avec le littoral, les
            falaises, la lumière sur l’eau et cette silhouette mondialement connue du Rocher Percé.
            Le lieu dégage quelque chose de rare.
          </p>

          <p>
            Ce qui rend la destination si forte, c’est qu’elle ne repose pas uniquement sur son
            image carte postale. <strong>Percé en Gaspésie</strong> est aussi une vraie destination
            de séjour : on y mange bien, on y dort avec vue, on y marche, on y prend le large, on y
            fait des haltes gourmandes et on y construit facilement une étape mémorable dans un{' '}
            <Link href="/planificateur" className="font-semibold underline">
              itinéraire au Québec
            </Link>
            .
          </p>

          <p>
            Que tu partes en couple, en famille, en van, en voiture électrique ou dans le cadre d’un
            grand circuit gaspésien, Percé mérite d’être pensé comme un temps fort du voyage, pas
            comme un simple arrêt rapide.
          </p>
        </section>

        <section className="space-y-5">
          <h2>Pourquoi visiter Percé ?</h2>
          <p>
            Percé est une destination parfaite pour celles et ceux qui veulent mêler
            <strong> nature, mer, paysages, détente et émotion</strong>. Peu d’endroits au Québec
            offrent une telle intensité visuelle tout en restant aussi accessibles pour un séjour
            touristique.
          </p>

          <ul className="list-disc space-y-3 pl-6">
            <li>
              Le <strong>Rocher Percé</strong> est l’un des symboles les plus forts du tourisme au
              Québec.
            </li>
            <li>
              L’<strong>Île Bonaventure</strong> offre une excursion mémorable entre mer, sentiers
              et observation de la faune.
            </li>
            <li>
              Le village permet de{' '}
              <strong>profiter facilement des restaurants, boutiques et points de vue</strong>.
            </li>
            <li>
              Le secteur s’intègre parfaitement à un <strong>road trip en Gaspésie</strong>.
            </li>
            <li>
              L’expérience est aussi belle pour un séjour romantique que pour un voyage familial.
            </li>
          </ul>
        </section>

        <section className="space-y-5">
          <h2>Que faire à Percé : les incontournables</h2>

          <div className="space-y-4">
            <h3>Admirer le Rocher Percé</h3>
            <p>
              Impossible de parler de Percé sans commencer par lui. Le Rocher Percé impressionne à
              toute heure, mais il devient encore plus fort au lever ou au coucher du soleil. Selon
              la météo, la marée et la lumière, il change de visage. Même sans programme
              particulier, le simple fait de s’arrêter face à lui donne déjà une vraie sensation de
              voyage.
            </p>
          </div>

          <div className="space-y-4">
            <h3>Faire l’excursion vers l’Île Bonaventure</h3>
            <p>
              Pour beaucoup de visiteurs, c’est l’un des moments les plus marquants du séjour. Cette
              sortie permet de vivre Percé autrement, avec le vent, les oiseaux marins, la mer et
              l’impression de basculer dans un autre rythme. Si tu veux que ton passage à Percé
              laisse une vraie trace, cette activité compte parmi les plus fortes.
            </p>
          </div>

          <div className="space-y-4">
            <h3>Profiter d’une croisière ou d’une sortie en mer</h3>
            <p>
              Observer la côte depuis l’eau change complètement la perspective. On comprend mieux la
              puissance des reliefs, la beauté du littoral et l’échelle réelle du paysage. C’est une
              expérience qui donne de la profondeur au séjour, surtout si tu aimes ressentir les
              lieux plutôt que seulement les voir.
            </p>
          </div>

          <div className="space-y-4">
            <h3>Marcher jusqu’aux points de vue et belvédères</h3>
            <p>
              Percé est idéale pour alterner contemplation et mouvement. Tu peux facilement intégrer
              des promenades, des sentiers ou des arrêts dans des belvédères afin de profiter de
              panoramas superbes sur le village, la mer et les falaises. Cela permet de vivre la
              destination à ton rythme, sans forcément charger l’horaire.
            </p>
          </div>

          <div className="space-y-4">
            <h3>Prendre le temps de vivre le village</h3>
            <p>
              Un séjour à Percé ne se résume pas à cocher des activités. Le village se prête très
              bien à la flânerie : pause café, restaurant en soirée, boutique, marche au bord de
              l’eau, photos, observation de la lumière. Cette partie plus simple et plus lente du
              voyage fait souvent partie des meilleurs souvenirs.
            </p>
          </div>
        </section>

        <section className="space-y-5">
          <h2>Percé en famille : une destination qui fonctionne très bien</h2>
          <p>
            <strong>Percé avec des enfants</strong> fonctionne souvent mieux qu’on l’imagine. Le
            décor est tellement fort qu’il capte naturellement l’attention. Les familles peuvent
            facilement alterner activité structurée, promenade libre, pause gourmande et arrêt photo
            sans avoir l’impression de forcer la journée.
          </p>
          <p>
            Les plus jeunes aiment souvent l’idée de voir le rocher “en vrai”, de prendre le bateau,
            d’observer les oiseaux ou de marcher au bord de l’eau. Les ados, eux, accrochent souvent
            au côté spectaculaire, au sentiment d’aventure et au décor très photogénique.
          </p>
        </section>

        <section className="space-y-5">
          <h2>Combien de jours prévoir à Percé ?</h2>
          <p>
            Pour un séjour agréable, il vaut mieux prévoir <strong>au moins deux nuits</strong>. Une
            seule nuit peut fonctionner si ton itinéraire est très serré, mais tu risques de
            repartir avec la sensation d’avoir survolé la destination.
          </p>
          <p>
            L’idéal, pour beaucoup de voyageurs, reste <strong>deux à trois nuits</strong>. Cela
            permet de profiter du village, des points de vue, d’une excursion, d’un bon repas et
            d’un rythme plus agréable. Si tu voyages en famille ou si tu veux t’offrir une vraie
            respiration dans ton road trip, trois à quatre jours peuvent être encore meilleurs.
          </p>
        </section>

        <section className="space-y-5">
          <h2>Conseils pratiques pour réussir ton séjour à Percé</h2>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              Réserve tôt si tu pars pendant la haute saison : Percé reste une destination très
              demandée.
            </li>
            <li>Prends toujours une couche chaude ou coupe-vent, même si la météo semble douce.</li>
            <li>
              Garde du temps libre dans ton programme : à Percé, les arrêts spontanés font souvent
              partie des meilleurs moments.
            </li>
            <li>
              Si tu fais un road trip, évite de prévoir trop de route le même jour que ton arrivée à
              Percé.
            </li>
            <li>
              Pense à regarder aussi les activités, hébergements et points d’intérêt autour de la
              destination pour enrichir le séjour.
            </li>
          </ul>
        </section>

        <section className="space-y-5">
          <h2>Que visiter autour de Percé ?</h2>
          <p>
            L’un des grands avantages de Percé, c’est que la destination se combine très bien avec
            d’autres arrêts majeurs de la région. Si tu veux bâtir un vrai{' '}
            <strong>voyage en Gaspésie</strong>, il est pertinent d’ajouter une ou plusieurs
            destinations voisines pour créer un parcours plus riche.
          </p>
          <p>Voici quelques suggestions autour de Percé qui méritent vraiment le détour :</p>

          <div className="grid gap-6 md:grid-cols-2">
            {aroundPerce.map((item) => (
              <AroundCard
                key={item.id}
                title={item.title}
                description={item.description}
                href={item.href}
                image={item.image}
              />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2>Construire un itinéraire autour de Percé</h2>
          <p>
            Percé fonctionne parfaitement comme point fort d’un circuit plus large. Tu peux, par
            exemple, l’intégrer avec{' '}
            <Link href="/blog/gaspesie" className="font-semibold underline">
              Gaspé
            </Link>
            , le{' '}
            <Link href="/blog/forillon" className="font-semibold underline">
              parc national Forillon
            </Link>
            ,{' '}
            <Link href="/blog/gaspesie" className="font-semibold underline">
              Bonaventure
            </Link>{' '}
            ou{' '}
            <Link href="/blog/carleton-sur-mer" className="font-semibold underline">
              Carleton-sur-Mer
            </Link>
            .
          </p>
          <p>
            Si tu veux organiser tes étapes simplement, comparer les temps de route et construire un
            séjour plus fluide, utilise notre{' '}
            <Link href="/planificateur" className="font-semibold underline">
              planificateur de voyage
            </Link>
            . Tu peux aussi aller voir les{' '}
            <Link href="/itineraires-communaute" className="font-semibold underline">
              itinéraires de la communauté
            </Link>{' '}
            pour t’inspirer d’autres parcours déjà partagés.
          </p>
        </section>

        <section className="space-y-5">
          <h2>Producteurs locaux et belles haltes pendant ton séjour</h2>
          <p>
            Si tu aimes les voyages qui ont du goût, n’hésite pas à compléter ton passage à Percé
            avec quelques haltes gourmandes et découvertes locales. Selon ton trajet, tu peux aussi
            explorer notre page dédiée aux{' '}
            <Link href="/producteurs" className="font-semibold underline">
              producteurs locaux
            </Link>{' '}
            pour enrichir ton voyage avec des arrêts plus authentiques.
          </p>
        </section>

        <section className="space-y-5">
          <h2>Mon avis sur Percé</h2>
          <p>
            Percé fait clairement partie des destinations qui marquent longtemps. Il y a une force
            dans ce paysage, mais aussi une douceur particulière dans la manière de vivre le lieu.
            Ce n’est pas seulement un “spot célèbre” : c’est un endroit où l’on sent vraiment le
            large, le temps, la lumière et la grandeur du territoire.
          </p>
          <p>
            Pour moi, c’est une destination à vivre sans se presser. Il faut lui laisser de
            l’espace. Regarder, marcher, respirer, manger, repartir, revenir. C’est souvent dans
            cette simplicité que Percé devient vraiment inoubliable.
          </p>
        </section>

        <section className="mt-12 rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Préparer ton voyage autour de Percé
              </h2>
              <p className="text-slate-700">
                Tu veux construire un vrai parcours autour de Percé, ajouter des étapes, repérer des
                producteurs locaux ou t’inspirer d’autres idées de road trip ? Voici les meilleurs
                points d’entrée pour continuer.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/planificateur"
                  className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Planifier mon itinéraire
                </Link>
                <Link
                  href="/itineraires-communaute"
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Voir les itinéraires partagés
                </Link>
                <Link
                  href="/producteurs"
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Découvrir les producteurs
                </Link>
                <Link
                  href="/blog"
                  className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Explorer d’autres destinations
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/destinations/perce.avif"
                alt="Séjour à Percé en Gaspésie"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </section>
    </DestinationArticleTemplate>
  );
}
