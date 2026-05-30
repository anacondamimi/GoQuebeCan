import Link from 'next/link';
import Image from 'next/image';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import BrandName from '@/components/brand/BrandName';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Combien de jours prévoir pour un voyage en Eeyou Istchee Baie-James ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour un premier voyage, 6 à 10 jours sont idéaux : le temps de monter par la Route Billy-Diamond, de passer quelques nuits en pourvoirie, de visiter au moins une communauté crie et éventuellement un barrage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Eeyou Istchee Baie-James est-elle adaptée à un couple sans enfants ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, c’est une destination idéale pour les couples qui aiment la nature, les longues routes et les rencontres. Il faut simplement accepter l’isolement, bien préparer la logistique et prévoir l’équipement adapté.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on voyager en Eeyou Istchee Baie-James en véhicule électrique ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'À l’heure actuelle, les bornes rapides sont rares sur les grands axes nordiques et certains tronçons sont dépourvus de services sur des centaines de kilomètres. Pour ce type de voyage, le véhicule à essence ou hybride reste l’option la plus réaliste.',
      },
    },
    {
      '@type': 'Question',
      name: 'Faut-il parler cri pour voyager en Eeyou Istchee Baie-James ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Non, le français et l’anglais suffisent largement pour voyager dans la région. Apprendre quelques mots de base en cri, comme “Wachiya” pour dire bonjour, est toutefois un beau signe de respect envers la Nation crie.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on voir des aurores boréales en Eeyou Istchee Baie-James ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, en automne et en hiver, lorsque le ciel est dégagé et suffisamment sombre, il est possible d’observer des aurores boréales. Rien n’est garanti, mais l’éloignement de la pollution lumineuse augmente vos chances.',
      },
    },
  ],
} as const;

export default function BlogArticleEeyouIstcheeBaieJames() {
  return (
    <DestinationArticleTemplate
      slug="eeyou-istchee"
      title="Eeyou Istchee Baie-James : le vrai Nord pour un voyage à deux"
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
                src="/images/destinations/eeyou-istchee.avif" // ou "/eeyou-istchee-baiejames.avif" selon ton dossier
                alt="Paysage nordique d’Eeyou Istchee Baie-James"
                width={1200}
                height={675}
                className="h-auto w-full rounded-3xl object-cover"
                priority
              />
            </div>

            <p className="text-sm uppercase tracking-wide text-slate-500">
              Road trip • Pourvoiries • Culture crie • Grand Nord québécois
            </p>

            <nav
              aria-label="Sommaire de l'article"
              className="mt-6 rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-700"
            >
              <p className="mb-2 font-semibold">Dans cet article :</p>
              <ul className="grid gap-1 md:grid-cols-2">
                <li>
                  <a href="#introduction" className="hover:underline">
                    Introduction : partir à deux dans le vrai Nord
                  </a>
                </li>
                <li>
                  <a href="#comprendre" className="hover:underline">
                    Comprendre Eeyou Istchee Baie-James
                  </a>
                </li>
                <li>
                  <a href="#acces-preparation" className="hover:underline">
                    Accès &amp; préparation du road trip
                  </a>
                </li>
                <li>
                  <a href="#activites" className="hover:underline">
                    Que faire à deux sur place
                  </a>
                </li>
                <li>
                  <a href="#pourvoiries" className="hover:underline">
                    Pourvoiries de pêche en couple
                  </a>
                </li>
                <li>
                  <a href="#itineraire" className="hover:underline">
                    Itinéraire de 6–7 jours
                  </a>
                </li>
                <li>
                  <a href="#hebergements" className="hover:underline">
                    Hébergements &amp; bien manger
                  </a>
                </li>
                <li>
                  <a href="#responsable" className="hover:underline">
                    Voyager de manière responsable
                  </a>
                </li>
                <li>
                  <a href="#quand-partir" className="hover:underline">
                    Quand partir à deux ?
                  </a>
                </li>
                <li>
                  <a href="#checklist" className="hover:underline">
                    Checklist des essentiels
                  </a>
                </li>
                <li>
                  <a href="#videos" className="hover:underline">
                    Voir le Nord en vidéo
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:underline">
                    FAQ – Questions fréquentes
                  </a>
                </li>
                <li>
                  <a href="#liens" className="hover:underline">
                    Continuer à rêver le Québec
                  </a>
                </li>
              </ul>
            </nav>
          </header>

          <section id="introduction" className="prose prose-slate max-w-none prose-a:text-blue-700">
            <p>
              Partir à deux vers Eeyou Istchee Baie-James, c’est accepter de changer d’échelle : des
              lignes droites de plusieurs centaines de kilomètres, une forêt boréale qui ne finit
              plus, des lacs sans fin, des nuits noires percées d’étoiles et parfois d’aurores
              boréales. Ici, on ne “passe pas”, on s’installe dans le silence, on apprend à
              ralentir, à écouter le territoire… et les conversations dans la voiture deviennent
              aussi longues que la route.
            </p>
            <p>
              Immense région du Nord du Québec, Eeyou Istchee Baie-James couvre plus de{' '}
              <strong>350&nbsp;000&nbsp;km²</strong>, presque la taille de certains pays européens,
              avec une population très faible, des communautés cries vivantes et seulement quelques
              villes nordiques. Ce guide est pensé pour un <strong>couple</strong> qui a envie de
              vivre un vrai “grand Nord” : road trip, pourvoirie, rencontres, mais aussi un minimum
              de confort grâce à des lodges et auberges bien choisis.
            </p>
            <p>
              Au fil de l’article, tu trouveras des conseils concrets, une idée d’itinéraire sur 6–7
              jours, une checklist d’équipement, et des liens directs vers les outils de{' '}
              <BrandName /> :{' '}
              <Link href="/planificateur" className="font-semibold">
                planificateur d’itinéraire
              </Link>
              , vidéos, carte des producteurs et articles pratiques comme notre guide spécial voyage
              à l’hôtel.
            </p>
          </section>

          <section id="comprendre" className="prose prose-slate mt-10 max-w-none">
            <H2>Comprendre Eeyou Istchee Baie-James en quelques repères</H2>

            <H3>Un territoire cri, vivant et habité</H3>
            <p>
              “Eeyou Istchee” signifie “la terre du peuple Eeyou (Cree)”. On n’est pas dans un{' '}
              <em>no man’s land</em> : c’est un territoire habité, organisé, avec plusieurs
              communautés cries et une culture qui s’exprime dans la langue, l’art, la cuisine, la
              spiritualité et la relation à la terre. Voyager ici, c’est entrer chez quelqu’un. Le
              respect, l’écoute et la curiosité bienveillante sont les bases.
            </p>

            <H3>Une immensité presque irréelle</H3>
            <p>
              Visuellement, tout est plus grand : des milliers de lacs et de rivières, une taïga qui
              s’étire à l’horizon, des distances entre villes qui se comptent en{' '}
              <strong>centaines de kilomètres</strong>. C’est parfait pour un couple qui veut
              vraiment déconnecter : pas de file d’attente, pas de foule, juste vous deux et la
              route.
            </p>

            <H3>Des routes mythiques : la Route Billy-Diamond</H3>
            <p>
              L’axe principal du voyage, c’est la <strong>Route Billy-Diamond</strong> (ancienne
              route de la Baie-James) : environ 620&nbsp;km entre Matagami et Radisson, sur une
              route asphaltée mais très isolée, avec un seul gros point de services complet au
              km&nbsp;381 (essence, nourriture, hébergement rudimentaire). On y trouve un poste
              d’enregistrement près de Matagami, des aires de repos spectaculaires le long des
              rivières et une vraie impression de “bout du monde”.
            </p>

            <H3>Un climat fort, des saisons marquées</H3>
            <ul>
              <li>
                <strong>Été</strong> : longues journées, possibilités de pêche, canot, randonnée.
              </li>
              <li>
                <strong>Automne</strong> : couleurs folles dans la forêt, lumière dorée,
                températures fraîches, moins de moustiques.
              </li>
              <li>
                <strong>Hiver</strong> : neige, froid intense, motoneige, aurores boréales,
                expériences cries autour de la vie sur le territoire.
              </li>
            </ul>
          </section>

          <section id="acces-preparation" className="prose prose-slate mt-10 max-w-none">
            <H2>Comment s’y rendre et préparer votre road trip</H2>

            <H3>Arriver par la route</H3>
            <p>
              Pour la plupart des voyageurs, le point de départ est <strong>Matagami</strong>,
              accessible en voiture depuis Montréal, Québec ou Gatineau. De là, on entre vraiment
              dans le Nord en empruntant la Route Billy-Diamond.
            </p>
            <p>Quelques réalités à intégrer pour un voyage à deux :</p>
            <ul>
              <li>les distances sont longues et les services rares ;</li>
              <li>il faut planifier soigneusement l’essence (notamment autour du km&nbsp;381) ;</li>
              <li>la météo peut changer vite, même en été.</li>
            </ul>
            <p>
              C’est le moment d’utiliser le{' '}
              <Link href="/planificateur" className="font-semibold">
                planificateur d’itinéraires de <BrandName />
              </Link>{' '}
              pour découper vos journées et prévoir les pauses de façon réaliste.
            </p>

            <H3>Arriver par avion</H3>
            <p>
              Il est aussi possible d’arriver en avion jusqu’à certaines villes ou communautés
              (Chibougamau/Chapais, Radisson, certaines localités cries), puis de louer un véhicule
              ou de s’appuyer sur des transferts locaux. C’est une option intéressante si vous
              disposez de peu de temps et que vous voulez concentrer votre séjour sur une pourvoirie
              ou un lodge spécifique.
            </p>
          </section>

          <section id="activites" className="prose prose-slate mt-10 max-w-none">
            <H2>Que faire en Eeyou Istchee Baie-James à deux ?</H2>

            <H3>Rouler sur la Route Billy-Diamond</H3>
            <p>
              Rouler des heures sur la Billy-Diamond, c’est presque une expérience méditative à
              deux. On enchaîne les grands virages entourés de conifères, les traversées de rivières
              puissantes, les arrêts sur des belvédères naturels pour regarder l’eau, écouter le
              bruit et juste… être là.
            </p>
            <p>
              C’est le genre de route où l’on se parle vraiment, où les silences ne sont pas
              gênants, où l’on sent physiquement le changement de rythme.
            </p>

            <H3>Rencontrer la Nation crie</H3>
            <p>
              Plusieurs communautés cries ouvrent leurs portes aux visiteurs à travers des{' '}
              <strong>centres culturels</strong>, des ateliers (artisanat, cuisine, contes et
              légendes) et des séjours dans des lodges ou pourvoiries gérés localement. Pour un
              couple, c’est un moment fort du voyage : on ne vient pas “consommer” une culture, mais
              écouter des histoires, apprendre d’autres façons de voir le territoire, partager un
              repas.
            </p>

            <H3>Visiter les grands barrages</H3>
            <p>
              La région est aussi marquée par les complexes hydroélectriques de la Baie-James. Des
              visites guidées permettent de comprendre l’ampleur des travaux et leur impact sur le
              territoire. C’est impressionnant, autant d’un point de vue technique que humain, et
              cela alimente souvent de longues discussions à deux sur l’énergie, l’environnement et
              le développement du Nord.
            </p>

            <H3>Rando, canot, aurores : la nature en grand</H3>
            <p>Selon la saison, vous pouvez :</p>
            <ul>
              <li>partir en canot ou en kayak sur des lacs calmes ;</li>
              <li>vous offrir une petite randonnée vers un point de vue sur la forêt boréale ;</li>
              <li>observer la faune (oiseaux, orignaux, parfois caribous selon les secteurs) ;</li>
              <li>
                guetter les <strong>aurores boréales</strong> en automne ou en hiver, loin de toute
                pollution lumineuse.
              </li>
            </ul>
            <p>
              Ces moments en tête-à-tête face à la nature laissent souvent une trace plus forte que
              n’importe quelle attraction touristique.
            </p>
          </section>

          <section id="pourvoiries" className="prose prose-slate mt-10 max-w-none">
            <H2>Pourvoiries de pêche : le refuge idéal pour un voyage à deux</H2>

            <p>
              Dans le Nord, les hôtels sont concentrés dans quelques villes (Radisson, Chibougamau,
              Matagami, Mistissini, Waskaganish, etc.) et restent rares à l’échelle de la région.
              C’est là que les <strong>pourvoiries</strong> deviennent l’option la plus logique – et
              la plus romantique.
            </p>

            <H3>Pourquoi la pourvoirie est parfaite pour un couple</H3>
            <p>
              Les pourvoiries de la région proposent en général des{' '}
              <strong>chalets en bord de lac</strong>, souvent rustiques mais très confortables
              (poêle, cuisine, espace pour cuisiner le poisson, terrasse), des forfaits pêche (doré,
              brochet, parfois truite grise ou mouchetée) avec location d’embarcation, et parfois la
              présence d’un <strong>guide de pêche</strong> qui connaît les bons coins.
            </p>
            <p>Concrètement, ça peut donner :</p>
            <ul>
              <li>
                matin : sortie sur le lac à deux, café dans le thermos, brume qui flotte sur l’eau ;
              </li>
              <li>journée : pêche, observation des oiseaux, discussions au fil de l’eau ;</li>
              <li>
                soir : retour au chalet, cuisine simple mais généreuse, feu à l’extérieur, ciel
                immense.
              </li>
            </ul>
            <p>
              C’est une bulle parfaite pour un couple qui veut vivre la nature sans sacrifier tout
              le confort.
            </p>

            <H3>Comment choisir sa pourvoirie</H3>
            <p>
              Sur le site officiel d’Eeyou Istchee Baie-James, la section “Où dormir / Pourvoiries”
              répertorie plusieurs adresses par secteur. De ton côté, avec <BrandName />, tu peux
              placer la pourvoirie comme <strong>base</strong> de ton itinéraire et utiliser le{' '}
              <Link href="/planificateur" className="font-semibold">
                planificateur
              </Link>{' '}
              pour organiser les jours de route autour de ce point fixe.
            </p>
          </section>

          <section id="itineraire" className="prose prose-slate mt-10 max-w-none">
            <H2>Idée d’itinéraire de 6–7 jours pour un couple</H2>

            <p>
              Évidemment, tout dépend de la saison et de votre rythme, mais voici une trame simple
              que vous pouvez adapter dans le <Link href="/planificateur">planificateur</Link> de{' '}
              <BrandName />.
            </p>

            <H3>Jour 1 – Matagami : entrée dans le Nord</H3>
            <p>
              Arrivée à Matagami depuis le sud du Québec, derniers ajustements (essence, épicerie,
              vérification de la voiture). Nuit en hôtel pour démarrer reposés, ou premier saut vers
              un hébergement nature à proximité.
            </p>

            <H3>Jour 2 – Route Billy-Diamond jusqu’au km 381</H3>
            <p>
              Enregistrement au poste d’accueil, puis montée progressive vers le km&nbsp;381, avec
              arrêts aux aires de repos pour sentir l’immensité. Nuit dans le secteur du km&nbsp;381
              ou dans un hébergement nordique, selon la saison et les disponibilités.
            </p>

            <H3>Jour 3 – Vers Radisson</H3>
            <p>
              Route jusqu’à Radisson, pauses photos en chemin, installation à l’auberge ou dans un
              hébergement proche. Balade dans les environs, premier contact avec la région.
            </p>

            <H3>Jour 4 – Barrages &amp; baie</H3>
            <p>
              Visite guidée d’un complexe hydroélectrique (à réserver à l’avance), puis, si votre
              itinéraire le permet, excursion vers une communauté côtière pour découvrir la Baie
              James, les marées et les paysages maritimes du Nord.
            </p>

            <H3>Jour 5 – Installation en pourvoirie</H3>
            <p>
              Route vers une pourvoirie choisie en amont : installation au chalet, première sortie
              sur le lac, repérage des lieux. Soirée tranquille : cuisine, feu, étoiles.
            </p>

            <H3>Jour 6 – Journée complète à la pourvoirie</H3>
            <p>
              Journée de pêche, de canot ou de détente. Si la pourvoirie est crie ou collabore avec
              la communauté locale, possibilité d’activité culturelle (à vérifier selon les lieux).
            </p>

            <H3>Jour 7 – Retour progressif vers le sud</H3>
            <p>
              Retour en douceur vers Matagami puis vers le sud. Sur le chemin, vous pouvez planifier
              une nuit dans une ville plus urbaine (Montréal, Québec, Saguenay, etc.). Pour
              optimiser ces nuits de transition, l’article{' '}
              <Link href="/blog/voyage-hotel" className="font-semibold">
                “Produits indispensables pour un voyage à l’hôtel”
              </Link>{' '}
              sur <BrandName /> vous aide à rendre chaque arrêt plus confortable.
            </p>
          </section>

          <section id="hebergements" className="prose prose-slate mt-10 max-w-none">
            <H2>Où dormir et où manger</H2>

            <H3>Hébergements : combiner hôtels et pourvoiries</H3>
            <p>
              La région propose quelques <strong>auberges et hôtels</strong> dans les villes et
              villages (Matagami, Chibougamau, Radisson, Mistissini, Waskaganish, etc.), des
              pourvoiries et des écolodges en pleine nature, et des chalets accessibles en voiture
              ou en bateau.
            </p>
            <p>Pour un couple, l’idéal est souvent de combiner :</p>
            <ul>
              <li>quelques nuits en hôtel (avant/après le Nord, ou à Radisson),</li>
              <li>plusieurs nuits en pourvoirie de pêche.</li>
            </ul>
            <p>
              Pour préparer tout ce qui touche aux nuits d’hôtel (checklist, organisation de la
              valise, astuces pour rendre la chambre plus agréable après une longue journée de
              route), appuyez-vous sur notre guide détaillé :{' '}
              <Link href="/blog/voyage-hotel" className="font-semibold">
                Produits indispensables pour un voyage à l’hôtel
              </Link>
              .
            </p>

            <H3>Manger local et simplement</H3>
            <p>
              Sur la route et dans les communautés, vous trouverez des restaurants simples mais
              chaleureux, des cantines, parfois des tables plus travaillées dans certaines auberges,
              et, selon la saison, des possibilités de goûter à des spécialités inspirées de la
              cuisine crie (poisson, bannique, plats de gibier, etc.).
            </p>
            <p>
              En pourvoirie, la cuisine peut être autonome (vous préparez vos repas au chalet) ou
              incluse dans un forfait avec repas préparés sur place. Là encore, la sobriété du cadre
              fait partie de l’expérience.
            </p>
          </section>

          <section id="responsable" className="prose prose-slate mt-10 max-w-none">
            <H2>Voyager de manière responsable en territoire cri</H2>
            <p>
              Vous voyagez sur le <strong>territoire d’une Nation</strong>. Quelques clés
              essentielles :
            </p>
            <ul>
              <li>
                Réserver en priorité vos activités et hébergements auprès de structures cries
                lorsque c’est possible (pourvoiries, lodges, organisations touristiques locales).
              </li>
              <li>
                Respecter les consignes liées aux photos, à l’accès à certains territoires et aux
                règles de chasse/pêche.
              </li>
              <li>
                Privilégier les achats locaux (artisanat, produits alimentaires, souvenirs utiles
                plutôt que gadgets).
              </li>
            </ul>
            <p>
              <BrandName /> s’inscrit dans cette logique : sur notre carte des{' '}
              <Link href="/producteurs" className="font-semibold">
                producteurs locaux
              </Link>
              , nous mettons en avant des artisans, fermes, microbrasseries et entreprises qui
              donnent du sens à vos déplacements partout au Québec. Même si tous ne se trouvent pas
              en Eeyou Istchee Baie-James, le réflexe de consommer local reste le même.
            </p>
          </section>

          <section id="quand-partir" className="prose prose-slate mt-10 max-w-none">
            <H2>Quand partir à deux en Eeyou Istchee Baie-James ?</H2>
            <ul>
              <li>
                <strong>Été (juin à août)</strong> : parfait pour un premier voyage à deux. Routes
                plus faciles, pourvoiries ouvertes, accès à l’eau, longues soirées dehors.
              </li>
              <li>
                <strong>Automne (septembre – début octobre)</strong> : couleurs sublimes, moins
                d’insectes, nuits plus fraîches et parfois des aurores.
              </li>
              <li>
                <strong>Hiver</strong> : pour les couples qui aiment vraiment le froid et l’aventure
                : motoneige, séjours en lodge nordique, activités cries d’hiver (survie, raquette,
                trappe). La logistique devient plus exigeante, mais l’expérience est unique.
              </li>
            </ul>
            <p>
              Dans tous les cas, un bon équipement est essentiel. Notre article{' '}
              <Link href="/blog/voyage-hotel">
                Produits indispensables pour un voyage à l’hôtel
              </Link>{' '}
              est une excellente base pour la partie nuit &amp; confort, à compléter avec du
              matériel spécifique au grand froid selon la saison.
            </p>
          </section>

          <section id="checklist" className="prose prose-slate mt-10 max-w-none">
            <H2>Checklist des essentiels pour le vrai Nord (version couple)</H2>

            <H3>Sécurité &amp; voiture</H3>
            <ul>
              <li>Entretien à jour, pneus en bon état, roue de secours fonctionnelle.</li>
              <li>Réserve d’essence suffisante entre les points de ravitaillement.</li>
              <li>
                Trousse d’urgence : couverture, lampe, nourriture d’appoint, eau, petite trousse de
                premiers soins.
              </li>
            </ul>

            <H3>Communication</H3>
            <ul>
              <li>Cartes hors ligne téléchargées sur vos téléphones.</li>
              <li>Chargeurs, batterie externe, adaptateur 12&nbsp;V pour la voiture.</li>
              <li>Coordonnées des hébergements et pourvoiries notées aussi sur papier.</li>
            </ul>

            <H3>Vêtements</H3>
            <ul>
              <li>Système multicouches (t-shirt technique, polaire, coquille coupe-vent).</li>
              <li>Tuque, gants, bas chauds, même en été pour les soirées fraîches.</li>
              <li>Imperméable ou manteau chaud selon la saison.</li>
            </ul>

            <H3>Confort &amp; nuits</H3>
            <ul>
              <li>
                Tout ce qui rend vos nuits d’hôtel plus agréables (organisateurs de valise, trousse
                de toilette optimisée, bouchons d’oreilles, masque de nuit).
              </li>
              <li>
                Pour la pourvoirie : café que vous aimez, petites gourmandises, épices, bougie
                citronnelle, livre ou carnet pour profiter des soirées au calme.
              </li>
            </ul>
            <p>
              Pour une checklist encore plus complète dédiée aux séjours en hôtel, appuyez-vous sur
              notre article{' '}
              <Link href="/blog/voyage-hotel" className="font-semibold">
                voyage-hôtel
              </Link>
              .
            </p>
          </section>

          <section id="videos" className="prose prose-slate mt-10 max-w-none">
            <H2>Voir le Nord en vidéo avant de partir</H2>
            <p>
              Avant même de faire vos bagages, vous pouvez déjà vous projeter en Eeyou Istchee
              Baie-James depuis votre salon : routes qui filent à l’horizon, lacs scintillants, son
              des cascades, lumière du soir sur la forêt boréale.
            </p>
            <p>
              C’est aussi un bon moyen, à deux, d’affiner ce que vous cherchez vraiment : davantage
              de pêche, plus de culture, plus d’aventure ou un mélange de tout ça.
            </p>
            <p>
              Rendez-vous dans la section{' '}
              <Link href="/videos" className="font-semibold">
                vidéos
              </Link>{' '}
              de <BrandName /> pour :
            </p>
            <ul>
              <li>regarder des idées de road trip nordiques ;</li>
              <li>découvrir d’autres régions à combiner avec Eeyou Istchee Baie-James ;</li>
              <li>vous mettre d’accord sur l’ambiance de votre prochain grand voyage à deux.</li>
            </ul>
          </section>

          <section id="faq" className="prose prose-slate mt-10 max-w-none">
            <H2>FAQ – Voyager à deux en Eeyou Istchee Baie-James</H2>

            <H3>Combien de jours prévoir pour un voyage en Eeyou Istchee Baie-James ?</H3>
            <p>
              Pour un premier voyage, <strong>6 à 10 jours</strong> sont idéaux : le temps de monter
              par la Route Billy-Diamond, de passer quelques nuits en pourvoirie, de visiter au
              moins une communauté crie et éventuellement un barrage.
            </p>

            <H3>Eeyou Istchee Baie-James est-elle adaptée à un couple sans enfants ?</H3>
            <p>
              Oui, c’est une destination idéale pour les couples qui aiment la nature, les longues
              routes et les rencontres. Il faut simplement accepter l’isolement, bien préparer la
              logistique et prévoir l’équipement adapté. En échange, vous gagnez un sentiment de
              liberté difficile à retrouver ailleurs.
            </p>

            <H3>Peut-on voyager en Eeyou Istchee Baie-James en véhicule électrique ?</H3>
            <p>
              À l’heure actuelle, les bornes rapides sont rares sur les grands axes nordiques et
              certains tronçons sont dépourvus de services sur des centaines de kilomètres. Pour ce
              type de voyage, le véhicule à essence ou hybride reste l’option la plus réaliste. Pour
              d’autres road trips au Québec, notre guide sur le voyage en voiture électrique
              complétera parfaitement ce premier aperçu du Nord.
            </p>

            <H3>Faut-il parler cri pour voyager en Eeyou Istchee Baie-James ?</H3>
            <p>
              Non, le français et l’anglais suffisent largement pour voyager dans la région.
              Apprendre quelques mots de base en cri, comme <em>“Wachiya”</em> pour dire bonjour,
              est toutefois un beau signe de respect envers la Nation crie et crée souvent un
              sourire en retour.
            </p>

            <H3>Peut-on voir des aurores boréales en Eeyou Istchee Baie-James ?</H3>
            <p>
              Oui, en automne et en hiver, lorsque le ciel est dégagé et suffisamment sombre, il est
              possible d’observer des aurores boréales. Rien n’est garanti, mais l’éloignement de la
              pollution lumineuse augmente clairement vos chances. Prenez le temps, le soir,
              d’éteindre les lumières et de lever les yeux.
            </p>
          </section>

          <section id="liens" className="prose prose-slate mt-10 max-w-none">
            <H2>
              Continuer à rêver le Québec avec <BrandName />
            </H2>
            <p>
              Si Eeyou Istchee Baie-James t’attire, c’est souvent que tu cherches quelque chose de
              plus grand, de plus silencieux, de plus vrai. Ce guide est là pour t’aider à te
              lancer, mais le voyage ne s’arrête pas là : <BrandName /> a été pensé pour
              t’accompagner dans tous tes projets de road trip au Québec.
            </p>
            <p>Voici ce que tu peux explorer juste après cet article :</p>

            <ul className="mt-4 space-y-4">
              <li className="flex gap-3">
                <span className="mt-1 text-lg">🧭</span>
                <div>
                  <p className="font-semibold">
                    <Link href="/planificateur">Planifier ton road trip dans le Nord</Link>
                  </p>
                  <p className="text-sm text-slate-600">
                    Construis ton itinéraire étape par étape, ajuste les distances et garde une vue
                    claire sur chaque journée de route.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-1 text-lg">🗺️</span>
                <div>
                  <p className="font-semibold">
                    {/* si tu as une vraie route, remplace par <Link href="/planificateur"> */}
                    Explorer le Québec sur la carte
                  </p>
                  <p className="text-sm text-slate-600">
                    Depuis l’onglet <strong>Carte interactive</strong> de <BrandName />, visualise
                    les régions, les destinations et les futurs road trips que tu pourrais relier à
                    la Baie-James.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-1 text-lg">🎬</span>
                <div>
                  <p className="font-semibold">
                    <Link href="/videos">Plonger dans l’ambiance en vidéo</Link>
                  </p>
                  <p className="text-sm text-slate-600">
                    Découvre des idées de road trip, des paysages nordiques et d’autres régions à
                    combiner avec Eeyou Istchee Baie-James.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-1 text-lg">🧺</span>
                <div>
                  <p className="font-semibold">
                    <Link href="/producteurs">Soutenir les producteurs locaux</Link>
                  </p>
                  <p className="text-sm text-slate-600">
                    Utilise notre carte des producteurs pour rencontrer des artisans, fermes et
                    microbrasseries partout au Québec, avant ou après ton séjour dans le Nord.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-1 text-lg">🏨</span>
                <div>
                  <p className="font-semibold">
                    <Link href="/blog/voyage-hotel">
                      Préparer tes nuits en auberge ou à l’hôtel
                    </Link>
                  </p>
                  <p className="text-sm text-slate-600">
                    Checklist, astuces et produits malins pour transformer chaque nuit d’hôtel en
                    vraie pause de confort pendant ton road trip.
                  </p>
                </div>
              </li>

              <li className="flex gap-3">
                <span className="mt-1 text-lg">📝</span>
                <div>
                  <p className="font-semibold">
                    <Link href="/blog">Découvrir d’autres idées de voyages</Link>
                  </p>
                  <p className="text-sm text-slate-600">
                    Consulte tous nos articles sur les régions du Québec : fjord du Saguenay,
                    Côte-Nord, Gaspésie, Cantons de l’Est et bien plus encore.
                  </p>
                </div>
              </li>
            </ul>

            <p className="mt-6">
              Envie d’encore plus d’idées de destinations pour vos prochains voyages à deux ?{' '}
              <Link href="/blog" className="font-semibold underline">
                Parcourir tous nos articles sur les plus belles régions du Québec
              </Link>
              .
            </p>
          </section>
        </article>
      </>
    </DestinationArticleTemplate>
  );
}
