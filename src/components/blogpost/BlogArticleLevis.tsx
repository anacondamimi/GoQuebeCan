import Image from 'next/image';
import Link from 'next/link';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export default function BlogArticleLevisMiniRoadTrip() {
  return (
    <article className="prose prose-neutral max-w-4xl px-4 py-10 lg:prose-lg lg:px-0 lg:py-16">
      <header className="mb-10">
        <H1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Mini road trip à Lévis en famille (2025) : piscines chaudes, producteurs locaux et
          parenthèse étoilée Michelin
        </H1>
        <div className="mt-4 overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
          <Image
            src="/images/destinations/levis.avif"
            alt="Vue sur le Vieux-Québec depuis le Quai Paquet à Lévis au coucher du soleil"
            width={675}
            height={675}
            className="h-auto w-full rounded-3xl object-cover"
            priority
          />
        </div>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
          Québec • Lévis • Mini road trip en famille 2025
        </p>
        <p className="mt-4 text-sm text-slate-700 sm:text-base">
          Imagine : tu poses tes valises à Lévis, tu regardes le Vieux-Québec de l’autre côté du
          fleuve, les enfants parlent déjà de piscine, et toi tu hésites entre une boulangerie qui
          sent le beurre, une microbrasserie avec vue et un restaurant fraîchement étoilé Michelin.
          Ce mini road trip de 3 jours à Lévis est pensé pour les familles, mais il laisse aussi une
          belle place aux parents épicuriens.
        </p>

        {/* Liens internes clés */}
        <div className="mt-4 flex flex-wrap gap-3 text-xs sm:text-sm">
          <Link
            href="/planificateur"
            className="inline-flex items-center rounded-full border border-sky-500 px-4 py-1.5 font-medium text-sky-700 shadow-sm transition hover:bg-sky-50"
          >
            Utiliser le planificateur d’itinéraires
          </Link>
          <Link
            href="/producteurs"
            className="inline-flex items-center rounded-full border border-emerald-500 px-4 py-1.5 font-medium text-emerald-700 shadow-sm transition hover:bg-emerald-50"
          >
            Voir les producteurs locaux autour de Lévis
          </Link>
          <Link
            href="/videos"
            className="inline-flex items-center rounded-full border border-indigo-500 px-4 py-1.5 font-medium text-indigo-700 shadow-sm transition hover:bg-indigo-50"
          >
            Regarder les vidéos de la région
          </Link>
          <Link
            href="/blog/voyage-hotel"
            className="inline-flex items-center rounded-full border border-amber-500 px-4 py-1.5 font-medium text-amber-700 shadow-sm transition hover:bg-amber-50"
          >
            Conseils pour voyager à l’hôtel en famille
          </Link>
        </div>
      </header>

      {/* INTRO / POURQUOI LÉVIS */}
      <section>
        <H2>Pourquoi choisir Lévis pour un mini road trip en famille&nbsp;?</H2>
        <p>
          Lévis, c’est la combinaison idéale entre simplicité logistique et moments &quot;wow&quot;.
          Facile d’accès par l’autoroute 20, juste en face du Vieux-Québec, la ville permet de
          profiter des grands paysages du Saint-Laurent tout en gardant un rythme doux pour les
          enfants. Tu ajoutes à ça des hôtels avec piscines, des producteurs gourmands et la
          proximité de restaurants étoilés Michelin à Québec, et tu obtiens un séjour court, mais
          riche en émotions.
        </p>
        <ul>
          <li>Une ville calme et facile d’accès, à deux pas de Québec.</li>
          <li>
            Des hôtels avec piscines intérieures ou extérieures chauffées, parfaits pour les
            familles.
          </li>
          <li>
            Des balades spectaculaires le long du fleuve, au Quai Paquet et sur le Parcours des
            Anses.
          </li>
          <li>
            Une passerelle directe vers les meilleures tables de Québec grâce au traversier, dont un
            restaurant étoilé Michelin.
          </li>
          <li>
            Des producteurs locaux et une boulangerie-pâtisserie (Bernillon) qui donnent envie de
            revenir rien que pour manger.
          </li>
        </ul>
      </section>

      {/* JOUR 1 */}
      <section>
        <H2>Jour 1 – Fleuve, traversier et première soirée à Lévis</H2>

        <H3>Installation à l’hôtel : trois “bases” parfaites pour les familles</H3>
        <p>
          Pour ce mini road trip, tu peux choisir l’un de ces trois hôtels comme camp de base. Tous
          sont adaptés aux familles et offrent une piscine pour finir la journée dans l’eau.
        </p>

        {/* CARTES HÔTELS */}
        <div className="not-prose mt-6 grid gap-6 md:grid-cols-3">
          {/* Four Points */}
          <div className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="relative h-40 w-full">
              {/* ➜ Remplace cette image par une photo du Four Points by Sheraton Lévis */}
              <Image
                src="/images/destinations/hotels/fourpoint-levis.avif"
                alt="Piscine extérieure chauffée du Four Points by Sheraton Lévis"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <H3 className="text-base font-semibold text-slate-900">
                <Link
                  href="https://www.booking.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-700 hover:underline"
                >
                  Four Points by Sheraton Lévis Convention Centre
                </Link>
              </H3>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-sky-600">
                Piscine extérieure chauffée
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Hôtel moderne relié au Centre des congrès, avec une belle piscine extérieure
                chauffée pour se détendre après les journées de visite. Chambres confortables,
                stationnement et bornes de recharge pour véhicules électriques.
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500">
                Gamme de prix&nbsp;: environ 220&nbsp;$ à 350&nbsp;$&nbsp;CAD / nuit selon la saison
              </p>
              <Link
                href="https://www.booking.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-700"
              >
                Découvrir cet hôtel sur Booking
              </Link>
            </div>
          </div>

          {/* Quality Inn */}
          <div className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="relative h-40 w-full">
              {/* ➜ Remplace cette image par une photo du Quality Inn & Suites Lévis */}
              <Image
                src="/images/destinations/hotels/oie-desneiges-levis.avif"
                alt="Piscine intérieure du Quality Inn & Suites Lévis"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <H3 className="text-base font-semibold text-slate-900">
                <Link
                  href="https://www.booking.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-700 hover:underline"
                >
                  Quality Inn &amp; Suites Lévis
                </Link>
              </H3>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-sky-600">
                Piscine intérieure chauffée
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Hôtel 3★+ très bien noté, situé près de l’autoroute 20. Grande piscine intérieure
                chauffée, ouverte de 7 h à 22 h, petit-déjeuner, Wi-Fi et services pratiques pour
                les familles en transit ou en séjour.
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500">
                Gamme de prix&nbsp;: environ 180&nbsp;$ à 260&nbsp;$&nbsp;CAD / nuit avec déjeuner,
                selon la saison
              </p>
              <Link
                href="https://www.booking.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-700"
              >
                Découvrir cet hôtel sur Booking
              </Link>
            </div>
          </div>

          {/* L'Oie des Neiges */}
          <div className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">
            <div className="relative h-40 w-full">
              {/* ➜ Remplace cette image par une photo de l’Hôtel L’Oie des Neiges */}
              <Image
                src="/images/destinations/hotels/qualityinn-levis.avif"
                alt="Piscine intérieure tropicale de l’Hôtel L’Oie des Neiges"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <H3 className="text-base font-semibold text-slate-900">
                <Link
                  href="https://www.booking.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-700 hover:underline"
                >
                  Hôtel L’Oie des Neiges
                </Link>
              </H3>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-sky-600">
                Grande piscine intérieure &amp; ambiance tropicale
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Ambiance chaleureuse de petit resort avec grande piscine intérieure chauffée dans un
                décor tropical, jacuzzi et espaces pour se détendre. Parfait pour déconnecter en
                famille, été comme hiver.
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500">
                Gamme de prix&nbsp;: environ 170&nbsp;$ à 240&nbsp;$&nbsp;CAD / nuit selon la saison
              </p>
              <Link
                href="https://www.booking.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center rounded-full bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-sky-700"
              >
                Découvrir cet hôtel
              </Link>
            </div>
          </div>
        </div>

        <H3>Après-midi : Quai Paquet, Parcours des Anses et traversier</H3>
        <p>
          Une fois les valises posées, on file vers le fleuve. Le Quai Paquet est l’endroit parfait
          pour laisser les enfants courir, admirer la vue sur le Château Frontenac et s’imprégner de
          l’ambiance du Saint-Laurent. En été, les jeux d’eau et la grande fontaine mettent tout le
          monde de bonne humeur.
        </p>
        <p>
          Le Parcours des Anses, lui, offre une magnifique piste cyclable et piétonne en bord de
          fleuve. On peut y marcher tranquillement, faire de la trottinette, du vélo, ou simplement
          s’asseoir sur un banc et regarder les bateaux passer.
        </p>
        <p>
          Puis vient le moment que les enfants attendent souvent le plus&nbsp;: la traversée en{' '}
          <strong>traversier Québec–Lévis</strong>. En 10 à 15 minutes, tu passes d’une rive à
          l’autre avec une vue de carte postale sur le Vieux-Québec. En hiver, le bateau fend les
          glaces, et l’expérience devient presque magique.
        </p>

        <H3>Parenthèse gastronomique étoilée : dîner au Laurie Raphaël (Québec)</H3>
        <p>
          Pour les parents épicuriens, ce mini road trip peut aussi devenir l’occasion de vivre une
          soirée d’exception dans un restaurant <strong>étoilé Michelin</strong> à Québec. En 2025,
          le <strong>Laurie Raphaël</strong> a reçu sa première étoile MICHELIN, récompensant une
          cuisine créative qui met en valeur les produits du terroir québécois.
        </p>
        <p>
          Scénario parfait&nbsp;: tu laisses la voiture à Lévis, tu prends le traversier en fin
          d’après-midi, tu marches quelques minutes dans le Vieux-Port et tu t’offres un menu
          dégustation au Laurie Raphaël. Puis tu reprends le traversier de nuit, avec la ville
          illuminée comme décor, avant de retrouver la douceur de ton hôtel à Lévis.
        </p>
        <p>
          Pour les gourmets les plus passionnés, tu peux également mentionner{' '}
          <strong>Tanière³, doublement étoilé Michelin</strong>, pour une expérience gastronomique
          encore plus poussée, nichée dans les voûtes historiques du Petit Champlain.
        </p>
      </section>

      {/* JOUR 2 */}
      <section>
        <H2>Jour 2 – Chutes de la Chaudière, nature et producteurs locaux</H2>

        <H3>Matin : les Chutes de la Chaudière, version famille</H3>
        <p>
          À quelques minutes en voiture de Lévis, les <strong>Chutes de la Chaudière</strong>{' '}
          offrent un décor puissant sans être trop exigeant physiquement. Un pont suspendu traverse
          la gorge, des belvédères permettent d’admirer la chute sous différents angles, et
          plusieurs sentiers faciles conviennent aux petits marcheurs.
        </p>
        <p>
          C’est l’endroit parfait pour organiser un pique-nique terroir&nbsp;: pain, fromages,
          charcuteries, jus de pomme ou cidres sans alcool, le tout acheté la veille chez tes{' '}
          <Link
            href="/producteurs"
            className="font-semibold text-emerald-700 underline underline-offset-2"
          >
            producteurs locaux préférés
          </Link>
          .
        </p>

        <H3>Après-midi : Cidrerie St-Nicolas, le terroir à deux pas de Lévis</H3>
        <p>
          L’après-midi, tu peux proposer une halte à la <strong>Cidrerie St-Nicolas</strong>, dans
          le secteur Saint-Nicolas de Lévis. Sur place, on découvre un vaste verger, des cidres
          tranquilles ou effervescents, des moûts de pomme, des sirops et de délicieuses gelées.
        </p>
        <p>
          En saison, l’autocueillette de pommes, la terrasse extérieure et le petit marché de fruits
          et légumes en font une sortie familiale complète. Les parents dégustent les cidres, les
          enfants croquent dans les pommes et découvrent d’où vient ce qu’ils boivent.
        </p>
        <p>
          Sur ta page{' '}
          <Link
            href="/producteurs"
            className="font-semibold text-emerald-700 underline underline-offset-2"
          >
            Producteurs
          </Link>
          , tu peux mettre la Cidrerie St-Nicolas en avant dans une section &laquo;&nbsp;Autour de
          Lévis&nbsp;&raquo;, avec d’autres adresses coup de cœur.
        </p>

        <H3>Option mini road trip : Cassis et Mélisse &amp; microbrasserie de Bellechasse</H3>
        <p>
          Si ta famille aime un peu plus la route et la campagne, tu peux suggérer une boucle vers
          la région de Bellechasse. La <strong>Ferme Cassis et Mélisse</strong> propose des fromages
          de chèvre biologiques et une visite de la ferme où l’on rencontre les chèvres. Plus loin,
          la <strong>microbrasserie de Bellechasse</strong> et son pub de la Contrée servent des
          bières inspirées des villages de la région, dans une ambiance très locale.
        </p>
        <p>
          C’est la partie du voyage où l’on sort un peu de la ville pour sentir la campagne, les
          montagnes au loin et le travail patient des producteurs.
        </p>
      </section>

      {/* JOUR 3 */}
      <section>
        <H2>Jour 3 – Forts, boulangerie Bernillon et dernières découvertes</H2>

        <H3>Matin : Forts-de-Lévis, jouer aux explorateurs</H3>
        <p>
          Pour le troisième jour, les <strong>Forts-de-Lévis</strong> permettent de mélanger
          histoire, plein air et aventure. Tunnels, remparts, canons, vue sur le fleuve… les enfants
          se sentent un peu comme dans un film d’exploration, et les parents apprécient le contexte
          historique.
        </p>
        <p>
          Tu peux encourager tes lecteurs à préparer la visite en regardant quelques{' '}
          <Link
            href="/videos"
            className="font-semibold text-indigo-700 underline underline-offset-2"
          >
            vidéos de la région
          </Link>{' '}
          pour mieux visualiser les lieux avant de partir.
        </p>

        <H3>Boulangerie pâtisserie Bernillon : le passage obligé</H3>
        <p>
          À quelques minutes de marche du Four Points by Sheraton, la{' '}
          <strong>boulangerie pâtisserie Bernillon</strong> est un véritable aimant à gourmands. Dès
          que tu pousses la porte, l’odeur du beurre et du pain chaud t’enveloppe.
        </p>
        <p>
          Pain croustillant, baguettes, miches généreuses, viennoiseries dorées qui rappellent les
          meilleures boulangeries françaises, macarons multicolores et gâteaux raffinés&nbsp;: la
          vitrine est un régal pour les yeux, et chaque bouchée est un bonheur pour les papilles.
        </p>
        <p>
          C’est le genre d’adresse où tu entres en te disant &laquo;&nbsp;juste un pain&nbsp;&raquo;
          et d’où tu sors finalement avec une boîte de macarons, deux croissants au beurre et un
          dessert pour le soir.
        </p>

        <div className="not-prose mt-4 rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">💛 Coup de cœur gourmand GoQuébecan</p>
          <p className="mt-1">
            La boulangerie Bernillon est un incontournable d’un mini road trip à Lévis. Elle n’est
            qu’à quelques minutes à pied du Four Points by Sheraton, ce qui en fait un arrêt parfait
            pour un café-croissant le matin ou un dessert gourmand en fin de journée.
          </p>
        </div>

        <H3>Après-midi : dernière balade au bord de l’eau</H3>
        <p>
          Pour terminer ce mini road trip en douceur, rien de mieux qu’une dernière promenade au
          Quai Paquet ou sur le Parcours des Anses, un dernier regard sur le Château Frontenac de
          l’autre côté du fleuve, ou même une ultime traversée en ferry si les enfants en
          redemandent.
        </p>
        <p>
          C’est aussi le moment idéal pour renvoyer tes lecteurs vers ton{' '}
          <Link
            href="/planificateur"
            className="font-semibold text-sky-700 underline underline-offset-2"
          >
            planificateur d’itinéraires
          </Link>{' '}
          afin d’adapter ce séjour à leur réalité&nbsp;: ajouter une journée au Village Vacances
          Valcartier, un tour de chiens de traîneau, une nuit à l’Hôtel de Glace ou d’autres
          expériences autour de Québec.
        </p>
      </section>

      {/* CONSEILS PRATIQUES */}
      <section>
        <H2>Conseils pratiques pour réussir son mini road trip à Lévis</H2>
        <ul>
          <li>
            <strong>Durée idéale&nbsp;:</strong> 3 jours / 2 ou 3 nuits, avec possibilité d’ajouter
            une journée à Québec.
          </li>
          <li>
            <strong>Meilleure période&nbsp;:</strong> de mai à octobre pour les balades, terrasses
            et producteurs&nbsp;; l’hiver pour l’ambiance féerique, les piscines intérieures et les
            traversées dans les glaces.
          </li>
          <li>
            <strong>Réservations&nbsp;:</strong> les hôtels se remplissent vite en été et pendant
            les vacances scolaires. Les restaurants étoilés Michelin (comme Laurie Raphaël ou
            Tanière³) demandent souvent une réservation plusieurs semaines, voire mois à l’avance.
          </li>
          <li>
            <strong>Organisation&nbsp;:</strong> loger à Lévis, laisser la voiture sur la rive sud
            et utiliser le traversier pour profiter de Québec, puis revenir dormir au calme, avec
            piscine pour les enfants.
          </li>
        </ul>
      </section>

      {/* FAQ */}
      <section>
        <H2>FAQ – Mini road trip à Lévis en famille (2025)</H2>

        <H3>Quel est le meilleur moment pour visiter Lévis en famille&nbsp;?</H3>
        <p>
          De mai à octobre, tu profites pleinement des balades au bord du fleuve, des terrasses et
          des producteurs. En hiver, l’ambiance devient magique avec le fleuve gelé, les piscines
          intérieures des hôtels et la proximité du Vieux-Québec décoré pour les fêtes.
        </p>

        <H3>Où dormir à Lévis avec des enfants&nbsp;?</H3>
        <p>
          Si tu veux une piscine intérieure, le <strong>Quality Inn &amp; Suites Lévis</strong> et
          l’
          <strong>Hôtel L’Oie des Neiges</strong> sont deux excellents choix. Si tu préfères une
          piscine extérieure chauffée et une ambiance plus urbaine, le{' '}
          <strong>Four Points by Sheraton Lévis Convention Centre</strong> est idéal.
        </p>

        <H3>Peut-on visiter Québec tout en logeant à Lévis&nbsp;?</H3>
        <p>
          Oui, et c’est même une très bonne idée. Tu laisses la voiture à Lévis, tu prends le
          traversier pour rejoindre le Vieux-Québec, puis tu reviens dormir côté rive sud, au calme,
          avec piscine pour les enfants et souvent un stationnement plus simple.
        </p>

        <H3>Quels producteurs locaux ne pas manquer autour de Lévis&nbsp;?</H3>
        <p>
          La <strong>Cidrerie St-Nicolas</strong>, la <strong>Ferme Cassis et Mélisse</strong>, la
          microbrasserie de Bellechasse et les autres adresses que tu recenses sur ta page{' '}
          <Link
            href="/producteurs"
            className="font-semibold text-emerald-700 underline underline-offset-2"
          >
            Producteurs
          </Link>{' '}
          sont de très beaux arrêts pour goûter au terroir de Chaudière-Appalaches.
        </p>

        <H3>Comment intégrer un restaurant étoilé Michelin dans un séjour basé à Lévis&nbsp;?</H3>
        <p>
          Le plus simple est de loger à Lévis, de prendre le traversier en fin de journée, puis de
          marcher jusqu’au
          <strong> Laurie Raphaël</strong> ou à un autre restaurant étoilé à Québec. Après le repas,
          tu reprends le traversier de nuit vers Lévis, et tu retrouves le confort de ton hôtel avec
          piscine. C’est la combinaison parfaite entre séjour familial et parenthèse gastronomique.
        </p>
      </section>

      {/* CTA fin d’article */}
      <section className="not-prose mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/planificateur"
          className="rounded-full border border-sky-600 px-5 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
        >
          Créer mon itinéraire autour de Lévis
        </Link>
        <Link
          href="/videos"
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Regarder les vidéos de Lévis et Québec
        </Link>
        <Link
          href="/producteurs"
          className="rounded-full border border-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          Découvrir les producteurs de Chaudière-Appalaches
        </Link>
      </section>
    </article>
  );
}
