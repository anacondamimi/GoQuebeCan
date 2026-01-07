'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Hotel } from 'lucide-react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import BrandName from '@/components/brand/BrandName';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Combien de jours prévoir pour visiter la ville de Québec ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour une première visite, 3 à 4 jours permettent déjà de bien profiter du Vieux-Québec, des Plaines d’Abraham, du traversier et d’une excursion comme la chute Montmorency ou l’île d’Orléans. Si tu combines Québec avec un road trip plus long, tu peux facilement y passer 5 à 7 jours.',
      },
    },
    {
      '@type': 'Question',
      name: 'La ville de Québec est-elle une bonne destination en hiver ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, c’est l’une des meilleures destinations hivernales en Amérique du Nord : Marché de Noël allemand, tir d’érable, glissades, traversier sur le fleuve gelé, Carnaval, Hôtel de glace et chiens de traîneau. À condition d’être bien habillé, l’hiver devient un véritable terrain de jeu.',
      },
    },
    {
      '@type': 'Question',
      name: 'Faut-il une voiture pour visiter Québec ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour un séjour centré sur la ville, tu peux tout faire à pied, en bus et en traversier. En revanche, pour explorer la chute Montmorency, l’île d’Orléans, Valcartier ou certains centres de chiens de traîneau, la voiture rend tout beaucoup plus simple.',
      },
    },
    {
      '@type': 'Question',
      name: 'La ville de Québec convient-elle aux familles ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, les familles apprécient beaucoup Québec : Plaines d’Abraham, glissades, traversier, musées ludiques, Carnaval, brunchs, animations de rue. Il y a de nombreuses activités adaptées aux enfants en été comme en hiver.',
      },
    },
    {
      '@type': 'Question',
      name: 'Faut-il choisir Québec ou Montréal pour un premier voyage au Québec ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Idéalement, les deux : Montréal pour son côté urbain et cosmopolite, Québec pour son charme historique et son lien direct avec le fleuve. Si tu dois choisir, demande-toi si tu préfères les grandes villes animées ou les ruelles pavées et les remparts. Les deux se combinent très bien dans un même voyage.',
      },
    },
  ],
} as const;

const hotels = [
  {
    name: 'Royal Dalhousie',
    category: 'Appartements vue fleuve',
    description:
      'Condos haut de gamme dans le Vieux-Port, avec grandes fenêtres, cuisines équipées et vue directe sur le fleuve et le mouvement des bateaux.',
    price: 'À partir d’environ 300–400 $/nuit (selon la saison)',
    link: 'https://www.booking.com/hotel/ca/royal-dalhousie.html',
    image: '/images/destinations/hotels/royaldaousie-quebec.avif',
  },
  {
    name: 'Monsieur Jean – Hôtel Particulier',
    category: 'Boutique & design',
    description:
      'Hôtel-boutique en Haute-Ville, au cœur du Vieux-Québec, avec déco contemporaine, mini-cuisines et certaines chambres offrant une vue superbe sur la ville.',
    price: 'À partir d’environ 250–350 $/nuit (selon la saison)',
    link: 'https://www.booking.com/hotel/ca/coeur-de-ville.fr.html',
    image: '/images/destinations/hotels/monsieurjean-quebec.avif',
  },
  {
    name: 'Appartement Luxe – Sunset View, Pool, Parking, Near Old Québec',
    category: 'Appartement avec piscine',
    description:
      'Appartement moderne avec vue sur le coucher de soleil, accès piscine (selon la saison) et stationnement, à distance de marche du Vieux-Québec.',
    price: 'Tarifs variables selon les dates et la durée du séjour',
    link: 'https://appartement-luxe-incredible-sunset-view-pool-parking.hotelsquebeccity.net/en/',
    image: '/images/destinations/hotels/appartluxe-quebec.avif',
  },
] as const;

export default function BlogArticleVilleDeQuebec() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 lg:max-w-4xl lg:px-0">
        <header className="mb-8 space-y-4">
          <H1>Québec, été comme hiver : la ville qui fait battre le cœur du fleuve</H1>

          <div className="mt-4 overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
            <Image
              src="/images/destinations/quebec.avif" // adapte le chemin si besoin
              alt="Vue sur le Vieux-Québec et le fleuve en été et en hiver"
              width={1200}
              height={675}
              className="h-auto w-full rounded-3xl object-cover"
              priority
            />
          </div>

          <p className="text-sm uppercase tracking-wide text-slate-500">
            Vieux-Québec • Marché de Noël • Traversier • Road trip Valcartier
          </p>
          <nav
            aria-label="Sommaire de l'article"
            className="mt-6 rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-700"
          >
            <p className="mb-2 font-semibold">Dans cet article :</p>
            <ul className="grid gap-1 md:grid-cols-2">
              <li>
                <a href="#introduction" className="hover:underline">
                  Pourquoi Québec séduit en été comme en hiver
                </a>
              </li>
              <li>
                <a href="#comprendre" className="hover:underline">
                  Comprendre la ville en quelques repères
                </a>
              </li>
              <li>
                <a href="#ete" className="hover:underline">
                  Québec en été : terrasses et fleuve
                </a>
              </li>
              <li>
                <a href="#hiver" className="hover:underline">
                  Québec en hiver : ambiance conte de fées
                </a>
              </li>
              <li>
                <a href="#roadtrip" className="hover:underline">
                  Road trip 3 jours Québec–Valcartier–Hôtel de glace
                </a>
              </li>
              <li>
                <a href="#incontournables" className="hover:underline">
                  Activités incontournables toute l&apos;année
                </a>
              </li>
              <li>
                <a href="#hebergements" className="hover:underline">
                  Où dormir à Québec ?
                </a>
              </li>
              <li>
                <a href="#goquebecan" className="hover:underline">
                  Préparer ton séjour avec <BrandName />
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:underline">
                  FAQ – Questions fréquentes
                </a>
              </li>
              <li>
                <a href="#liens" className="hover:underline">
                  Continuer à explorer le Québec
                </a>
              </li>
            </ul>
          </nav>
        </header>

        {/* INTRODUCTION */}
        <section id="introduction" className="prose prose-slate max-w-none">
          <p>
            Visiter la ville de Québec, c’est accepter de se laisser surprendre deux fois. Une
            première fois en été, quand les terrasses débordent de vie, que les ruelles du
            Vieux-Québec résonnent de musique de rue et que le fleuve scintille jusqu’à l’horizon.
            Une deuxième fois en hiver, quand la neige enveloppe les toits, que la vapeur de sirop
            d’érable s’élève devant le Château Frontenac et que la ville entière devient un décor de
            film de Noël.
          </p>
          <p>
            Avant même de réserver ton hébergement, tu peux déjà préparer ton séjour avec les outils
            de <BrandName /> : tracer ton itinéraire jour par jour avec le{' '}
            <Link href="/planificateur">planificateur</Link>, te plonger dans l’ambiance de la ville
            grâce aux <Link href="/videos">vidéos</Link>, ou repérer les{' '}
            <Link href="/producteurs">producteurs locaux</Link> à découvrir autour de Québec, de
            l’île d’Orléans ou de la Côte-de-Beaupré.
          </p>
          <p>
            Cet article est pensé pour t’aider à préparer un voyage à Québec en toute saison : que
            faire, où dormir, comment profiter à la fois des grands classiques et de petites
            adresses coup de cœur, été comme hiver, avec en bonus une idée de{' '}
            <strong>
              road trip de 3 jours Québec – Valcartier – chiens de traîneau – Hôtel de glace
            </strong>
            .
          </p>
        </section>

        {/* COMPRENDRE */}
        <section id="comprendre" className="prose prose-slate mt-10 max-w-none">
          <H2>Comprendre Québec en quelques repères</H2>
          <p>
            Capitale nationale, ville fortifiée classée au patrimoine mondial de l’UNESCO, Québec
            est bâtie sur un promontoire qui domine le fleuve Saint-Laurent. Le{' '}
            <strong>Vieux-Québec</strong> se divise en :
          </p>
          <ul>
            <li>
              <strong>Haute-Ville</strong> : Château Frontenac, Terrasse Dufferin, remparts, Plaines
              d’Abraham, grandes places animées ;
            </li>
            <li>
              <strong>Basse-Ville</strong> : quartier du Petit-Champlain, place Royale, vieux port,
              rues pavées au pied de la falaise.
            </li>
          </ul>
          <p>Ce qui la rend unique :</p>
          <ul>
            <li>une échelle humaine : tout se fait à pied ou presque ;</li>
            <li>une histoire visible dans l’architecture et les remparts ;</li>
            <li>un lien très fort avec les saisons : festivals, neige, couleurs d’automne ;</li>
            <li>
              une gastronomie vivante, entre bistros, brunchs, produits du terroir et petites
              adresses gourmandes.
            </li>
          </ul>
        </section>

        {/* ÉTÉ */}
        <section id="ete" className="prose prose-slate mt-10 max-w-none">
          <H2>Québec en été : terrasses, fleuve et grandes pelouses</H2>

          <H3>Se perdre dans le Vieux-Québec</H3>
          <p>
            En été, le meilleur programme commence souvent par quelque chose de très simple :{' '}
            <strong>marcher sans trop de plan</strong>. Monter et descendre entre la Haute et la
            Basse-Ville, emprunter l’escalier Casse-Cou, flâner dans le quartier du Petit-Champlain,
            regarder les artistes-peintres au travail, savourer une crème glacée dans une ruelle
            ombragée, écouter un musicien de rue jouer dans l’écho des pierres.
          </p>
          <p>
            Tu peux repérer à l’avance quelques coins photogéniques dans la section{' '}
            <Link href="/videos">Vidéos</Link> de <BrandName />, puis les placer dans ton itinéraire
            via le <Link href="/planificateur">planificateur</Link> comme “Jour 1 – Vieux-Québec à
            pied”.
          </p>

          <H3>Brunch dans le Vieux-Québec</H3>
          <p>
            Québec se découvre très bien autour d’un <strong>brunch</strong> : pancakes, œufs
            bénédictine, café filtre à volonté, fruits frais, sirop d’érable évidemment. Prendre le
            temps d’un brunch dans le Vieux-Québec, c’est s’offrir une pause au milieu d’une carte
            postale.
          </p>
          <p>
            L’idéal : arriver tôt, s’installer en terrasse, regarder les calèches passer et sentir
            doucement la ville s’animer autour de toi. C’est le genre de moment qui fait du bien
            autant à ceux qui visitent pour la première fois qu’aux habitués.
          </p>

          <H3>Les Plaines d’Abraham : poumon vert au-dessus du fleuve</H3>
          <p>
            Les <strong>Plaines d’Abraham</strong> sont un immense parc historique qui surplombe le
            Saint-Laurent. En été, on y pique-nique, on y fait du vélo, on étale une couverture pour
            regarder les nuages, on assiste parfois à des concerts ou à des feux d’artifice.
          </p>
          <p>
            Si tu voyages en famille, c’est le spot parfait pour laisser les enfants courir. En
            couple, c’est un endroit idéal pour un pique-nique simple : baguette, fromage, fruits et
            quelques trouvailles repérées grâce à la carte des{' '}
            <Link href="/producteurs">producteurs locaux</Link>.
          </p>

          <H3>Traversier Québec–Lévis : la plus belle vue sur le Vieux-Québec</H3>
          <p>
            Prendre le <strong>traversier Québec–Lévis</strong> est une expérience en soi. En été,
            le vent est doux, le fleuve est large, les couleurs du Vieux-Québec se détachent
            nettement sur la colline : Château Frontenac, remparts, toits colorés.
          </p>
          <p>
            La traversée est courte, mais la vue est immense. Tu peux l’intégrer à ton itinéraire
            comme une mini-croisière : aller-retour en fin de journée pour profiter de la lumière
            dorée, ou aller simple pour souper à Lévis avant de revenir.
          </p>

          <H3>Un resto-bar les pieds dans l’eau</H3>
          <p>
            Québec, ce n’est pas seulement la pierre et l’histoire : c’est aussi la proximité avec
            le <strong>fleuve</strong>. En été, offre-toi un moment complètement différent dans un
            resto-bar du Vieux-Port où tu as (presque) les pieds dans l’eau : terrasse sur le quai,
            chaises confortables, vue directe sur les bateaux et l’animation du port.
          </p>
          <p>
            C’est le spot parfait pour un 5 à 7 : cocktail, bière locale, assiette à partager,
            coucher de soleil sur le Saint-Laurent. Une façon très douce de terminer une journée
            bien remplie.
          </p>

          <H3>Mary’s Popcorn : petite pause sucrée</H3>
          <p>
            Pour les gourmands, un arrêt s’impose au magasin de popcorn{' '}
            <strong>Mary’s Popcorn</strong>, une adresse bien connue du Vieux-Québec. Popcorn au
            caramel, au chocolat, au cheddar, mélanges sucrés-salés… On en ressort rarement les
            mains vides.
          </p>
          <p>
            C’est la petite touche ludique à ajouter à ton itinéraire : “Brunch – balade – Mary’s
            Popcorn – traversier au coucher de soleil” fait une journée parfaite pour beaucoup de
            visiteurs.
          </p>
        </section>

        {/* HIVER */}
        <section id="hiver" className="prose prose-slate mt-10 max-w-none">
          <H2>Québec en hiver : une ville de conte de fées</H2>
          <p>
            En hiver, Québec devient une <strong>scène de film de Noël</strong>. Les décorations, la
            neige, la lumière dorée des lampadaires sur la pierre… tout contribue à une ambiance
            unique en Amérique du Nord.
          </p>

          <H3>Le Marché de Noël allemand</H3>
          <p>
            Le <strong>Marché de Noël allemand</strong> transforme le centre-ville en village
            lumineux : cabanes de bois, vins chauds, bretzels, produits artisanaux, décorations de
            Noël, musique. On se promène avec un chocolat chaud, on goûte des biscuits, on achète un
            souvenir fait main.
          </p>

          <H3>Tir d’érable devant le Château Frontenac</H3>
          <p>
            La fameuse <strong>tir d’érable sur neige</strong>, devant le Château Frontenac, est une
            expérience simple mais inoubliable. On verse du sirop d’érable chaud sur la neige, on le
            roule sur un bâton pour créer un bonbon tendre, encore tiède, à déguster en regardant le
            fleuve.
          </p>

          <H3>Glissades sur la Terrasse Dufferin</H3>
          <p>
            Tout près du Château, la glissade sur neige de la <strong>Terrasse Dufferin</strong> est
            une autre tradition hivernale. On grimpe en haut de la structure en bois, on s’installe
            sur une luge et on dévale la pente à toute vitesse avec le fleuve qui s’ouvre devant
            nous.
          </p>

          <H3>Traversier sur le fleuve gelé</H3>
          <p>
            Reprendre le <strong>traversier Québec–Lévis en hiver</strong> n’a rien à voir avec
            l’été. Le fleuve est parfois couvert de plaques de glace que le bateau fend en avançant,
            produisant un bruit sourd et puissant. La vue sur le Vieux-Québec enneigé est encore
            plus spectaculaire.
          </p>
          <p>
            Un conseil : habille-toi chaudement et reste quelques minutes dehors sur le pont, même
            si le vent est vif. Ce contraste entre le froid, la lumière et le bruit de la glace est
            un souvenir qui marque beaucoup de voyageurs.
          </p>
        </section>

        {/* ROADTRIP */}
        <section id="roadtrip" className="prose prose-slate mt-10 max-w-none">
          <H2>Road trip 3 jours : Québec – Valcartier – chiens de traîneau – Hôtel de glace</H2>
          <p>
            Si tu disposes de quelques jours en hiver, tu peux transformer ton séjour à Québec en{' '}
            <strong>mini road trip nordique de 3 jours</strong> : parfait pour un couple ou une
            petite famille.
          </p>

          <H3>Jour 1 – Vieux-Québec en mode hivernal</H3>
          <p>
            Installation à Québec, balade dans le Vieux-Québec, tir d’érable, glissades sur la
            Terrasse Dufferin, Marché de Noël allemand si tu viens en décembre, souper dans un
            bistro chaleureux. Tu peux préparer cette journée dans le{' '}
            <Link href="/planificateur">planificateur</Link> de <BrandName /> comme “Jour 1 –
            Découverte du Vieux-Québec”.
          </p>

          <H3>Jour 2 – Village Vacances Valcartier & Hôtel de glace</H3>
          <p>
            Le lendemain, direction <strong>Village Vacances Valcartier</strong>, à moins d’une
            heure de route : glissades sur neige, rafting sur bouées, activités familiales. En
            soirée, visite du célèbre <strong>Hôtel de glace</strong> : sculptures de neige,
            chambres éphémères, bar glacé.
          </p>
          <p>
            Même si tu ne dors pas sur place, la visite vaut largement le détour. Si tu choisis d’y
            passer la nuit, l’article de <BrandName /> sur les{' '}
            <Link href="/blog/voyage-hotel">produits indispensables pour un voyage à l’hôtel</Link>{' '}
            t’aidera à préparer ton sac (couches chaudes, accessoires de confort, etc.).
          </p>

          <H3>Jour 3 – Chiens de traîneau & retour à Québec</H3>
          <p>
            Pour le troisième jour, réserve une activité <strong>chien de traîneau</strong> dans la
            région (plusieurs entreprises proposent des demi-journées autour de Québec et de
            Valcartier). Glisser en silence dans la forêt, n’entendre que le souffle des chiens et
            le frottement du traîneau sur la neige… c’est l’une des expériences les plus fortes de
            l’hiver québécois.
          </p>
          <p>
            Ensuite, retour à Québec pour une dernière soirée dans le Vieux-Québec, un souper au
            resto-bar avec vue sur le fleuve ou un brunch tardif le lendemain avant de reprendre la
            route. Ce type de mini road trip est très facile à organiser avec le{' '}
            <Link href="/planificateur">planificateur</Link> de <BrandName />.
          </p>
        </section>

        {/* INCONTOURNABLES */}
        <section id="incontournables" className="prose prose-slate mt-10 max-w-none">
          <H2>Activités incontournables, été comme hiver</H2>

          <H3>Visiter une prison : remonter le temps</H3>
          <p>
            Parmi les visites qui marquent, il y a la découverte d’une{' '}
            <strong>ancienne prison de Québec</strong>. Les visites guidées permettent de comprendre
            l’histoire de la justice, le quotidien des détenus, les conditions de vie de l’époque et
            l’évolution du système.
          </p>

          <H3>Autres coups de cœur des visiteurs</H3>
          <ul>
            <li>
              flâner dans le <strong>quartier du Petit-Champlain</strong>, surtout en hiver avec les
              décorations et les guirlandes de lumière ;
            </li>
            <li>
              visiter la <strong>chute Montmorency</strong>, impressionnante en toute saison ;
            </li>
            <li>
              explorer les <strong>musées</strong> (Musée de la civilisation, Musée national des
              beaux-arts du Québec) ;
            </li>
            <li>
              partir à la journée vers l’<strong>île d’Orléans</strong> : fraises, pommes, vins,
              cidres, chocolateries, fromageries… une île parfaite pour goûter aux produits aussi
              présents sur la carte des <Link href="/producteurs">producteurs locaux</Link>.
            </li>
          </ul>
        </section>

        {/* HÉBERGEMENTS */}
        <section id="hebergements" className="mt-12">
          <H2 className="mb-8 flex items-center gap-2 text-3xl font-bold text-gray-900">
            <Hotel className="size-8 text-indigo-600" />
            Où dormir à Québec ?
          </H2>

          <p className="mb-6 text-sm text-slate-600">
            Québec offre tous les styles d’hébergements : hôtels historiques, appartements avec vue
            sur le fleuve, adresses design ou options plus familiales. Voici trois idées de
            logements qui reviennent souvent dans les coups de cœur des voyageurs et qui s’intègrent
            très bien à un road trip organisé avec <BrandName />.
          </p>

          <div className="not-prose mt-6 grid gap-6 md:grid-cols-3">
            {hotels.map((hotel) => (
              <article
                key={hotel.name}
                className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm"
              >
                <div className="relative h-40 w-full">
                  <Image src={hotel.image} alt={hotel.name} fill className="object-cover" />
                </div>

                <div className="flex flex-1 flex-col p-4">
                  {/* Badge catégorie */}
                  <p className="mb-2 inline-flex rounded-md bg-indigo-50 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-700">
                    {hotel.category}
                  </p>

                  {/* Nom de l’hôtel = SEUL élément cliquable principal */}
                  <H3 className="text-base font-semibold leading-snug text-slate-900">
                    <Link
                      href={hotel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-4 hover:text-sky-700"
                    >
                      {hotel.name}
                    </Link>
                  </H3>

                  {/* Description non cliquable */}
                  <p className="mt-2 text-sm text-slate-700">{hotel.description}</p>

                  {/* Prix : CTA discret vers Booking (optionnel) */}
                  <p className="mt-3 text-sm font-semibold">
                    <Link
                      href={hotel.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-700 underline underline-offset-2 hover:text-sky-800"
                    >
                      {hotel.price}
                    </Link>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* GOQUEBECAN */}
        <section id="goquebecan" className="prose prose-slate mt-10 max-w-none">
          <H2>
            Préparer ton séjour à Québec avec <BrandName />
          </H2>
          <p>
            Pour transformer ce séjour en expérience fluide, tu peux t’appuyer sur les ressources de{' '}
            <BrandName /> :
          </p>
          <ul>
            <li>
              le <strong>planificateur d’itinéraire</strong> (
              <Link href="/planificateur">/planificateur</Link>) pour organiser tes journées entre
              Vieux-Québec, excursions alentours et activités d’hiver ;
            </li>
            <li>
              la section <strong>Vidéos</strong> (<Link href="/videos">/videos</Link>) pour
              visualiser l’ambiance de la ville en été comme en hiver avant de partir ;
            </li>
            <li>
              la carte des <strong>producteurs locaux</strong> (
              <Link href="/producteurs">/producteurs</Link>), idéale si tu veux combiner Québec avec
              un détour sur l’île d’Orléans, la Côte-de-Beaupré ou d’autres régions gourmandes ;
            </li>
            <li>
              les articles pratiques sur les{' '}
              <strong>produits indispensables pour un voyage à l’hôtel</strong> (
              <Link href="/blog/voyage-hotel">/blog/voyage-hotel</Link>) pour optimiser ta valise et
              ton confort.
            </li>
          </ul>
        </section>

        {/* FAQ */}
        <section id="faq" className="prose prose-slate mt-10 max-w-none">
          <H2>FAQ – Québec en été et en hiver</H2>

          <H3>Combien de jours prévoir pour visiter Québec ?</H3>
          <p>
            Pour une première visite, <strong>3 à 4 jours</strong> permettent déjà de bien profiter
            du Vieux-Québec, des Plaines d’Abraham, du traversier et d’une excursion comme la chute
            Montmorency ou l’île d’Orléans. Si tu combines Québec avec un road trip plus long, tu
            peux facilement y passer 5 à 7 jours.
          </p>

          <H3>Québec est-elle une bonne destination en hiver ?</H3>
          <p>
            Oui, et même l’une des meilleures en Amérique du Nord : Marché de Noël allemand, tir
            d’érable, glissades, traversier sur fleuve gelé, Carnaval, Hôtel de glace, chiens de
            traîneau… À condition d’être bien habillé, l’hiver devient un véritable terrain de jeu.
          </p>

          <H3>Faut-il une voiture pour visiter Québec ?</H3>
          <p>
            Pour un séjour centré sur la ville, tu peux tout faire à pied, en bus et en traversier.
            En revanche, pour explorer la chute Montmorency, l’île d’Orléans, Valcartier ou certains
            centres de chiens de traîneau, une voiture rend tout beaucoup plus simple. Dans ce cas,
            privilégie un hébergement avec stationnement comme l’Appartement Luxe ou certains hôtels
            partenaires.
          </p>

          <H3>Québec convient-elle aux familles ?</H3>
          <p>
            Absolument : Plaines d’Abraham, glissades, traversier, musées ludiques, Carnaval,
            brunchs, animations de rue… Les activités sont nombreuses et variées. Tu peux t’inspirer
            du <Link href="/planificateur">planificateur</Link> de <BrandName /> pour construire un
            itinéraire adapté aux enfants.
          </p>

          <H3>Québec ou Montréal pour un premier voyage au Québec ?</H3>
          <p>
            Idéalement, les deux. Montréal pour son côté urbain et cosmopolite, Québec pour son
            charme historique et son lien direct avec le fleuve. Si tu dois choisir, demande-toi si
            tu préfères les grandes villes ou les ruelles pavées : dans tous les cas, <BrandName />{' '}
            peut t’aider à bâtir un itinéraire qui combine les deux sur le même voyage.
          </p>
        </section>

        {/* LIENS / RÉCAP */}
        <section id="liens" className="prose prose-slate mt-10 max-w-none">
          <H2>
            Continuer à explorer le Québec avec <BrandName />
          </H2>
          <p>
            Si Québec te donne envie de voir encore plus de paysages, de villages et de grands
            espaces, <BrandName /> a été pensé pour t’accompagner bien au-delà d’un seul voyage.
          </p>
          <ul>
            <li>
              🧭 Construire ton prochain road trip : le{' '}
              <Link href="/planificateur">planificateur d’itinéraire</Link>.
            </li>
            <li>
              🎬 Te projeter dans d’autres régions : la page <Link href="/videos">Vidéos</Link> pour
              découvrir des idées de road trips en images.
            </li>
            <li>
              🧺 Aller à la rencontre des artisans : la carte des{' '}
              <Link href="/producteurs">producteurs locaux</Link> partout au Québec.
            </li>
            <li>
              🏨 Mieux préparer tes nuits à l’hôtel : l’article{' '}
              <Link href="/blog/voyage-hotel">Produits indispensables pour voyager à l’hôtel</Link>.
            </li>
            <li>
              📝 Découvrir d’autres destinations : l’ensemble de nos articles sur les régions du
              Québec dans la section <Link href="/blog">blog</Link>.
            </li>
          </ul>
          <p>
            Envie de continuer à rêver ton prochain voyage ?{' '}
            <Link href="/blog" className="font-semibold underline">
              Voir tous nos articles sur les plus belles régions du Québec
            </Link>
            .
          </p>
        </section>
      </article>
    </>
  );
}
