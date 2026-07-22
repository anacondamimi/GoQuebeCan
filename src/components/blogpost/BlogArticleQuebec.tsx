'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Hotel } from 'lucide-react';

import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import BrandName from '@/components/brand/BrandName';
import { bookingAwin } from '@/lib/awin';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

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
      name: 'Comment accéder au quartier Petit-Champlain depuis le Vieux-Québec ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trois options depuis la Haute-Ville : l’escalier Casse-Cou, le plus ancien escalier de la ville avec sa soixantaine de marches ; le funiculaire du Vieux-Québec, accessible par la maison Louis-Jolliet et qui relie directement la terrasse Dufferin ; ou la côte de la Montagne à pied. Le funiculaire est l’option la plus simple avec une poussette ou de jeunes enfants.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte le téléphérique de la chute Montmorency ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L’accès au parc est payant et le téléphérique s’ajoute selon la formule retenue. Les forfaits combinant entrée et téléphérique sont généralement plus avantageux, et il est possible de prendre un aller simple pour redescendre par l’escalier panoramique. Les tarifs changent chaque saison : vérifiez-les sur le site officiel du parc avant votre visite.',
      },
    },
    {
      '@type': 'Question',
      name: 'La chute Montmorency se visite-t-elle en hiver ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, mais partiellement. L’escalier panoramique et le secteur du pied de la chute ferment pour raisons de sécurité à cause de la glace. La chute reste superbe depuis le haut, le pont suspendu et le belvédère. L’hiver est aussi la saison du pain de sucre, ce cône de glace formé par les embruns qui peut atteindre une trentaine de mètres en janvier et février.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la meilleure période pour visiter la ville de Québec ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'L’automne, de septembre à la mi-octobre, offre souvent le meilleur compromis : couleurs spectaculaires sur l’île d’Orléans, foules réduites après la rentrée et températures agréables pour marcher. L’été est chaud et animé mais achalandé, l’hiver est magique pour qui accepte le froid, et le printemps reste imprévisible avec plusieurs attraits fermés entre deux saisons.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps prévoir pour l’île d’Orléans ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Le chemin Royal fait le tour de l’île sur une soixantaine de kilomètres à travers six villages. Le tour se boucle en une demi-journée sans arrêt, mais l’intérêt de l’île réside justement dans les haltes chez les producteurs : fraises, cidreries, vignobles, fromageries et chocolateries. Comptez une journée complète et prévoyez une glacière. La voiture est indispensable sur place.',
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
    link: bookingAwin('https://www.booking.com/hotel/ca/royal-dalhousie.html'),
    image: '/images/destinations/hotels/royal-daousie-quebec.avif',
  },
  {
    name: 'Monsieur Jean – Hôtel Particulier',
    category: 'Boutique & design',
    description:
      'Hôtel-boutique en Haute-Ville, au cœur du Vieux-Québec, avec déco contemporaine, mini-cuisines et certaines chambres offrant une vue superbe sur la ville.',
    price: 'À partir d’environ 250–350 $/nuit (selon la saison)',
    link: bookingAwin('https://www.booking.com/hotel/ca/coeur-de-ville.fr.html'),
    image: '/images/destinations/hotels/monsieur-jean-quebec.avif',
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
    <DestinationArticleTemplate
      slug="quebec"
      title="Québec, été comme hiver : la ville qui fait battre le cœur du fleuve"
      toc={[
        { id: 'introduction', label: 'Introduction' },
        { id: 'comprendre', label: 'Comprendre Québec' },
        { id: 'petit-champlain', label: 'Petit-Champlain & Place-Royale' },
        { id: 'dufferin', label: 'Terrasse Dufferin & Frontenac' },
        { id: 'montmorency', label: 'Chute Montmorency & téléphérique' },
        { id: 'ile-orleans', label: "Île d'Orléans" },
        { id: 'meteo', label: 'Météo & quand y aller' },
        { id: 'ete', label: 'Québec en été' },
        { id: 'hiver', label: 'Québec en hiver' },
        { id: 'roadtrip', label: 'Road trip 3 jours' },
        { id: 'incontournables', label: 'Incontournables' },
        { id: 'hebergements', label: 'Où dormir' },
        { id: 'faq', label: 'FAQ' },
        { id: 'liens', label: 'Liens utiles' },
      ]}
    >
      <>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <article className="mx-auto max-w-3xl px-4 py-10 lg:max-w-4xl lg:px-0">
          <header className="mb-8 space-y-4">
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
              d’érable s’élève devant le Château Frontenac et que la ville entière devient un décor
              de film de Noël.
            </p>
            <p>
              Avant même de réserver ton hébergement, tu peux déjà préparer ton séjour avec les
              outils de <BrandName /> : tracer ton itinéraire jour par jour avec le{' '}
              <Link href="/planificateur">planificateur</Link>, te plonger dans l’ambiance de la
              ville grâce aux <Link href="/videos">vidéos</Link>, ou repérer les{' '}
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
                <strong>Haute-Ville</strong> : Château Frontenac, Terrasse Dufferin, remparts,
                Plaines d’Abraham, grandes places animées ;
              </li>
              <li>
                <strong>Basse-Ville</strong> : quartier du Petit-Champlain, place Royale, vieux
                port, rues pavées au pied de la falaise.
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
          {/* Petit-Champlain et Place-Royale */}
          <section id="petit-champlain" className="prose prose-slate mt-10 max-w-none">
            <H2>Petit-Champlain et Place-Royale, le berceau de Québec</H2>

            <p>
              Si tu ne devais visiter qu’un secteur, ce serait celui-là. Au pied du cap Diamant, le{' '}
              <strong>quartier Petit-Champlain</strong> aligne ses rues pavées, ses maisons
              séculaires et sa cinquantaine de boutiques et d’ateliers d’artisans sur à peine
              quelques centaines de mètres. La rue du Petit-Champlain, longue d’environ 275 mètres,
              est considérée comme l’une des plus anciennes artères commerçantes d’Amérique du Nord.
            </p>

            <p>
              Le quartier accueille environ 1,5 million de visiteurs par année, et ça se sent en
              juillet. Notre conseil : viens tôt le matin, avant 9 h, ou en fin de journée. La
              lumière est plus belle, les photos sont sans foule, et les commerçants ont le temps de
              jaser.
            </p>

            <H3>L’escalier Casse-Cou</H3>

            <p>
              C’est le plus ancien escalier de la ville : il figurait déjà sur un plan de Québec en
              1660, et un passage existait à cet endroit avant même 1640. Son surnom vient du 19
              <sup>e</sup> siècle, quand les guides anglophones l’avaient baptisé{' '}
              <em>Breakneck Steps</em> — la version en bois de l’époque était réellement dangereuse.
              Aujourd’hui, il relie la Basse-Ville à la Haute-Ville en une soixantaine de marches,
              et c’est l’une des photos les plus reprises de Québec.
            </p>

            <H3>Le funiculaire, l’alternative sans effort</H3>

            <p>
              Juste à côté de l’escalier, le funiculaire du Vieux-Québec grimpe jusqu’à la terrasse
              Dufferin. Il est en service depuis la fin du 19<sup>e</sup> siècle et son accès se
              fait par la maison Louis-Jolliet, ancienne résidence du découvreur du Mississippi.
              C’est l’option évidente avec une poussette, des genoux fatigués ou après une longue
              journée de marche.
            </p>

            <H3>Place-Royale</H3>

            <p>
              À deux pas, la <strong>Place-Royale</strong> marque l’endroit exact où Samuel de
              Champlain fit construire son habitation en 1608. C’est littéralement le berceau de la
              ville. L’église Notre-Dame-des-Victoires, la Batterie Royale aménagée en 1691, la
              fresque des Québécois et les galeries d’art des rues environnantes composent un
              ensemble qu’on parcourt facilement en une heure ou deux, sans plan précis.
            </p>

            <p>
              L’ensemble du secteur fait partie du Vieux-Québec inscrit au patrimoine mondial de
              l’UNESCO — le seul ensemble urbain fortifié au nord du Mexique.
            </p>
          </section>

          {/* Terrasse Dufferin */}
          <section id="dufferin" className="prose prose-slate mt-10 max-w-none">
            <H2>Terrasse Dufferin et Château Frontenac</H2>

            <p>
              C’est la carte postale de Québec, et pour une fois la réalité dépasse l’image. La{' '}
              <strong>terrasse Dufferin</strong> est une longue promenade de bois suspendue
              au-dessus du fleuve, adossée au Château Frontenac, avec vue sur le Saint-Laurent,
              Lévis et l’île d’Orléans au loin.
            </p>

            <p>
              L’endroit vit à toute heure : musiciens de rue et glaces en été, patinoire et glissade
              en hiver, couchers de soleil spectaculaires à l’année. C’est aussi le point de départ
              naturel vers la promenade des Gouverneurs et les Plaines d’Abraham si tu continues
              vers le sud.
            </p>

            <p>
              Le <strong>Château Frontenac</strong>, l’hôtel le plus photographié au monde selon la
              légende locale, se visite même sans y séjourner : les visites guidées costumées
              racontent son histoire, et le hall vaut le coup d’œil. Sinon, contente-toi de le
              contempler depuis la terrasse — c’est gratuit et l’effet est le même.
            </p>

            <p>
              Astuce : depuis la terrasse, l’escalier Casse-Cou et le funiculaire descendent
              directement vers le Petit-Champlain. Enchaîne les deux secteurs dans la même
              demi-journée plutôt que d’en faire deux sorties séparées.
            </p>
          </section>

          {/* Chute Montmorency */}
          <section id="montmorency" className="prose prose-slate mt-10 max-w-none">
            <H2>La chute Montmorency et son téléphérique</H2>

            <p>
              À une quinzaine de minutes du centre-ville, la <strong>chute Montmorency</strong>{' '}
              culmine à 83 mètres — soit une trentaine de mètres de plus que les chutes du Niagara.
              C’est l’excursion la plus facile à greffer à un séjour en ville, et elle fonctionne en
              toutes saisons.
            </p>

            <H3>Le téléphérique</H3>

            <p>
              Le <strong>téléphérique</strong> relie la gare, en bas, au Manoir Montmorency, en
              haut, en quelques minutes. Chaque cabine peut accueillir jusqu’à 40 passagers. Tu peux
              le prendre en aller-retour, ou en aller simple et redescendre à pied par l’escalier
              panoramique — c’est souvent la formule la plus intéressante.
            </p>

            <p>
              L’accès au parc est payant, et le téléphérique s’ajoute selon la formule choisie. Les
              forfaits combinés existent et sont généralement plus avantageux. Achète tes billets à
              l’avance en haute saison pour éviter la file.
            </p>

            <H3>Le circuit panoramique</H3>

            <p>
              Depuis le haut : la promenade le long de la falaise, le pont suspendu au-dessus de la
              chute — sensations garanties — puis le belvédère de la Baronne. La descente se fait
              par l’<strong>escalier panoramique</strong> et ses 487 marches accrochées au flanc de
              la falaise. En bas, un promontoire de béton te place directement dans les embruns.
            </p>

            <p>
              Une tyrolienne double de 300 mètres survole aussi la chute pour les amateurs de
              sensations, et des sentiers de 0,5 à 3 km sillonnent le parc.
            </p>

            <div className="not-prose rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
              <p className="text-gray-800">
                <strong>
                  En hiver, l’escalier panoramique et le secteur du pied de la chute ferment
                </strong>{' '}
                pour raisons de sécurité, à cause de la glace. La chute reste magnifique vue d’en
                haut et du pont suspendu. C’est aussi la saison du <strong>pain de sucre</strong>,
                ce cône de glace formé par les embruns accumulés qui peut atteindre une trentaine de
                mètres en janvier et février.
              </p>
            </div>
          </section>

          {/* Île d'Orléans */}
          <section id="ile-orleans" className="prose prose-slate mt-10 max-w-none">
            <H2>L’île d’Orléans, la campagne à quinze minutes</H2>

            <p>
              L’<strong>île d’Orléans</strong> se trouve à environ un quart d’heure de la chute
              Montmorency, ce qui en fait la suite logique d’une matinée aux chutes. Le chemin Royal
              en fait le tour sur une soixantaine de kilomètres, en passant par six villages.
            </p>

            <p>
              C’est le pays des producteurs : fraises et framboises en saison, cidreries, vignobles,
              fromageries, chocolateries, cabanes à sucre et kiosques en bordure de route. Prévois
              une glacière dans le coffre, tu ne repartiras pas les mains vides.
            </p>

            <p>
              Le tour complet se fait en une demi-journée si tu roules sans t’arrêter, mais
              l’intérêt est justement de t’arrêter. Compte une journée pour bien en profiter, et
              garde à l’esprit que la voiture est indispensable ici — il n’y a pas de transport en
              commun utile sur l’île.
            </p>
          </section>

          {/* Météo */}
          <section id="meteo" className="prose prose-slate mt-10 max-w-none">
            <H2>Météo à Québec : à quoi s’attendre selon la saison</H2>

            <p>
              La <strong>météo à Québec</strong> est franche : les saisons y sont marquées, et
              chacune change complètement l’expérience de la ville. Voici les repères pour
              planifier.
            </p>

            <H3>Été (juin à août)</H3>

            <p>
              Chaud et parfois humide, avec des journées qui invitent aux terrasses et aux Plaines.
              C’est la haute saison : réserve tôt et attends-toi à de l’affluence dans le
              Vieux-Québec. Les orages de fin d’après-midi sont fréquents mais passent vite.
            </p>

            <H3>Automne (septembre-octobre)</H3>

            <p>
              Souvent le meilleur compromis. Les couleurs sur l’île d’Orléans et la Côte-de-Beaupré
              sont spectaculaires, les foules diminuent après la rentrée et les températures restent
              agréables pour marcher. Le pic des couleurs varie d’une année à l’autre, généralement
              entre la fin septembre et la mi-octobre.
            </p>

            <H3>Hiver (décembre à mars)</H3>

            <p>
              Le froid est réel, avec des pointes bien en dessous de zéro et un facteur vent qui
              accentue la sensation. Mais c’est aussi ce qui rend la ville magique : neige sur les
              toits de tôle, Carnaval, patinoire, marché de Noël. Habillé en conséquence — couches,
              vraies bottes, tuque et mitaines — l’hiver devient un terrain de jeu plutôt qu’une
              épreuve.
            </p>

            <H3>Printemps (avril-mai)</H3>

            <p>
              La saison la plus imprévisible. Ça dégèle, certaines activités hivernales ferment
              tandis que les estivales n’ont pas encore ouvert. En contrepartie, les tarifs sont bas
              et la ville est calme. Vérifie l’ouverture des attraits qui t’intéressent avant de
              réserver.
            </p>

            <div className="not-prose rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100">
              <p className="text-gray-800">
                <strong>Le réflexe utile :</strong> consulte la météo la veille et regarde le
                facteur vent autant que la température. Au bord du fleuve, sur la terrasse Dufferin
                ou au pont suspendu de Montmorency, le vent fait souvent plus de différence que le
                thermomètre. En hiver, vérifie aussi les fermetures liées à la glace.
              </p>
            </div>
          </section>

          <section id="ete" className="prose prose-slate mt-10 max-w-none">
            <H2>Québec en été : terrasses, fleuve et grandes pelouses</H2>

            <H3>Se perdre dans le Vieux-Québec</H3>
            <p>
              En été, le meilleur programme commence souvent par quelque chose de très simple :{' '}
              <strong>marcher sans trop de plan</strong>. Monter et descendre entre la Haute et la
              Basse-Ville, emprunter l’escalier Casse-Cou, flâner dans le quartier du
              Petit-Champlain, regarder les artistes-peintres au travail, savourer une crème glacée
              dans une ruelle ombragée, écouter un musicien de rue jouer dans l’écho des pierres.
            </p>
            <p>
              Tu peux repérer à l’avance quelques coins photogéniques dans la section{' '}
              <Link href="/videos">Vidéos</Link> de <BrandName />, puis les placer dans ton
              itinéraire via le <Link href="/planificateur">planificateur</Link> comme “Jour 1 –
              Vieux-Québec à pied”.
            </p>

            <H3>Brunch dans le Vieux-Québec</H3>
            <p>
              Québec se découvre très bien autour d’un <strong>brunch</strong> : pancakes, œufs
              bénédictine, café filtre à volonté, fruits frais, sirop d’érable évidemment. Prendre
              le temps d’un brunch dans le Vieux-Québec, c’est s’offrir une pause au milieu d’une
              carte postale.
            </p>
            <p>
              L’idéal : arriver tôt, s’installer en terrasse, regarder les calèches passer et sentir
              doucement la ville s’animer autour de toi. C’est le genre de moment qui fait du bien
              autant à ceux qui visitent pour la première fois qu’aux habitués.
            </p>

            <H3>Les Plaines d’Abraham : poumon vert au-dessus du fleuve</H3>
            <p>
              Les <strong>Plaines d’Abraham</strong> sont un immense parc historique qui surplombe
              le Saint-Laurent. En été, on y pique-nique, on y fait du vélo, on étale une couverture
              pour regarder les nuages, on assiste parfois à des concerts ou à des feux d’artifice.
            </p>
            <p>
              Si tu voyages en famille, c’est le spot parfait pour laisser les enfants courir. En
              couple, c’est un endroit idéal pour un pique-nique simple : baguette, fromage, fruits
              et quelques trouvailles repérées grâce à la carte des{' '}
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
              resto-bar du Vieux-Port où tu as (presque) les pieds dans l’eau : terrasse sur le
              quai, chaises confortables, vue directe sur les bateaux et l’animation du port.
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
              En hiver, Québec devient une <strong>scène de film de Noël</strong>. Les décorations,
              la neige, la lumière dorée des lampadaires sur la pierre… tout contribue à une
              ambiance unique en Amérique du Nord.
            </p>

            <H3>Le Marché de Noël allemand</H3>
            <p>
              Le <strong>Marché de Noël allemand</strong> transforme le centre-ville en village
              lumineux : cabanes de bois, vins chauds, bretzels, produits artisanaux, décorations de
              Noël, musique. On se promène avec un chocolat chaud, on goûte des biscuits, on achète
              un souvenir fait main.
            </p>

            <H3>Tir d’érable devant le Château Frontenac</H3>
            <p>
              La fameuse <strong>tir d’érable sur neige</strong>, devant le Château Frontenac, est
              une expérience simple mais inoubliable. On verse du sirop d’érable chaud sur la neige,
              on le roule sur un bâton pour créer un bonbon tendre, encore tiède, à déguster en
              regardant le fleuve.
            </p>

            <H3>Glissades sur la Terrasse Dufferin</H3>
            <p>
              Tout près du Château, la glissade sur neige de la <strong>Terrasse Dufferin</strong>{' '}
              est une autre tradition hivernale. On grimpe en haut de la structure en bois, on
              s’installe sur une luge et on dévale la pente à toute vitesse avec le fleuve qui
              s’ouvre devant nous.
            </p>

            <H3>Traversier sur le fleuve gelé</H3>
            <p>
              Reprendre le <strong>traversier Québec–Lévis en hiver</strong> n’a rien à voir avec
              l’été. Le fleuve est parfois couvert de plaques de glace que le bateau fend en
              avançant, produisant un bruit sourd et puissant. La vue sur le Vieux-Québec enneigé
              est encore plus spectaculaire.
            </p>
            <p>
              Un conseil : habille-toi chaudement et reste quelques minutes dehors sur le pont, même
              si le vent est vif. Ce contraste entre le froid, la lumière et le bruit de la glace
              est un souvenir qui marque beaucoup de voyageurs.
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
              Même si tu ne dors pas sur place, la visite vaut largement le détour. Si tu choisis
              d’y passer la nuit, l’article de <BrandName /> sur les{' '}
              <Link href="/blog/voyage-hotel">
                produits indispensables pour un voyage à l’hôtel
              </Link>{' '}
              t’aidera à préparer ton sac (couches chaudes, accessoires de confort, etc.).
            </p>

            <H3>Jour 3 – Chiens de traîneau & retour à Québec</H3>
            <p>
              Pour le troisième jour, réserve une activité <strong>chien de traîneau</strong> dans
              la région (plusieurs entreprises proposent des demi-journées autour de Québec et de
              Valcartier). Glisser en silence dans la forêt, n’entendre que le souffle des chiens et
              le frottement du traîneau sur la neige… c’est l’une des expériences les plus fortes de
              l’hiver québécois.
            </p>
            <p>
              Ensuite, retour à Québec pour une dernière soirée dans le Vieux-Québec, un souper au
              resto-bar avec vue sur le fleuve ou un brunch tardif le lendemain avant de reprendre
              la route. Ce type de mini road trip est très facile à organiser avec le{' '}
              <Link href="/planificateur">planificateur</Link> de <BrandName />.
            </p>
          </section>

          {/* INCONTOURNABLES */}
          <section id="incontournables" className="prose prose-slate mt-10 max-w-none">
            <H2>Activités incontournables, été comme hiver</H2>

            <H3>Visiter une prison : remonter le temps</H3>
            <p>
              Parmi les visites qui marquent, il y a la découverte d’une{' '}
              <strong>ancienne prison de Québec</strong>. Les visites guidées permettent de
              comprendre l’histoire de la justice, le quotidien des détenus, les conditions de vie
              de l’époque et l’évolution du système.
            </p>

            <H3>Autres coups de cœur des visiteurs</H3>
            <ul>
              <li>
                flâner dans le <strong>quartier du Petit-Champlain</strong>, surtout en hiver avec
                les décorations et les guirlandes de lumière ;
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
              Québec offre tous les styles d’hébergements : hôtels historiques, appartements avec
              vue sur le fleuve, adresses design ou options plus familiales. Voici trois idées de
              logements qui reviennent souvent dans les coups de cœur des voyageurs et qui
              s’intègrent très bien à un road trip organisé avec <BrandName />.
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
              Pour transformer ce séjour en expérience fluide, tu peux t’appuyer sur les ressources
              de <BrandName /> :
            </p>
            <ul>
              <li>
                le <Link href="/planificateur">planificateur d’itinéraire</Link> pour organiser tes
                journées entre Vieux-Québec, excursions alentours et activités d’hiver ;
              </li>
              <li>
                la <Link href="/videos">section Vidéos</Link> pour visualiser l’ambiance de la ville
                en été comme en hiver avant de partir ;
              </li>
              <li>
                la <Link href="/producteurs">carte des producteurs locaux</Link>, idéale si tu veux
                combiner Québec avec un détour sur l’île d’Orléans, la Côte-de-Beaupré ou d’autres
                régions gourmandes ;
              </li>
              <li>
                nos conseils sur les{' '}
                <Link href="/blog/voyage-hotel">
                  produits indispensables pour un voyage à l’hôtel
                </Link>{' '}
                pour optimiser ta valise et ton confort.
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <section id="faq" className="prose prose-slate mt-10 max-w-none">
            <H2>FAQ – Québec en été et en hiver</H2>

            <H3>Combien de jours prévoir pour visiter Québec ?</H3>
            <p>
              Pour une première visite, <strong>3 à 4 jours</strong> permettent déjà de bien
              profiter du Vieux-Québec, des Plaines d’Abraham, du traversier et d’une excursion
              comme la chute Montmorency ou l’île d’Orléans. Si tu combines Québec avec un road trip
              plus long, tu peux facilement y passer 5 à 7 jours.
            </p>

            <H3>Québec est-elle une bonne destination en hiver ?</H3>
            <p>
              Oui, et même l’une des meilleures en Amérique du Nord : Marché de Noël allemand, tir
              d’érable, glissades, traversier sur fleuve gelé, Carnaval, Hôtel de glace, chiens de
              traîneau… À condition d’être bien habillé, l’hiver devient un véritable terrain de
              jeu.
            </p>

            <H3>Faut-il une voiture pour visiter Québec ?</H3>
            <p>
              Pour un séjour centré sur la ville, tu peux tout faire à pied, en bus et en
              traversier. En revanche, pour explorer la chute Montmorency, l’île d’Orléans,
              Valcartier ou certains centres de chiens de traîneau, une voiture rend tout beaucoup
              plus simple. Dans ce cas, privilégie un hébergement avec stationnement comme
              l’Appartement Luxe ou certains hôtels partenaires.
            </p>

            <H3>Québec convient-elle aux familles ?</H3>
            <p>
              Absolument : Plaines d’Abraham, glissades, traversier, musées ludiques, Carnaval,
              brunchs, animations de rue… Les activités sont nombreuses et variées. Tu peux
              t’inspirer du <Link href="/planificateur">planificateur</Link> de <BrandName /> pour
              construire un itinéraire adapté aux enfants.
            </p>

            <H3>Québec ou Montréal pour un premier voyage au Québec ?</H3>
            <p>
              Idéalement, les deux. Montréal pour son côté urbain et cosmopolite, Québec pour son
              charme historique et son lien direct avec le fleuve. Si tu dois choisir, demande-toi
              si tu préfères les grandes villes ou les ruelles pavées : dans tous les cas,{' '}
              <BrandName /> peut t’aider à bâtir un itinéraire qui combine les deux sur le même
              voyage.
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
                🎬 Te projeter dans d’autres régions : la page <Link href="/videos">Vidéos</Link>{' '}
                pour découvrir des idées de road trips en images.
              </li>
              <li>
                🧺 Aller à la rencontre des artisans : la carte des{' '}
                <Link href="/producteurs">producteurs locaux</Link> partout au Québec.
              </li>
              <li>
                🏨 Mieux préparer tes nuits à l’hôtel : l’article{' '}
                <Link href="/blog/voyage-hotel">
                  Produits indispensables pour voyager à l’hôtel
                </Link>
                .
              </li>
              <li>
                📝 Découvrir d’autres destinations : l’ensemble de nos articles sur les régions du
                Québec dans la section <Link href="/blog">blog</Link>.
              </li>
            </ul>
            <p>
              Envie de continuer à rêver ton prochain voyage ?{' '}
              <Link href="/#destinations-populaires" className="font-semibold underline">
                Voir tous nos articles sur les plus belles régions du Québec
              </Link>
              .
            </p>
          </section>
        </article>
      </>
    </DestinationArticleTemplate>
  );
}
