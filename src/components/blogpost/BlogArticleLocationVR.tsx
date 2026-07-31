'use client';
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
      name: 'Faut-il un permis spécial pour conduire un VR au Québec ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour la grande majorité des VR de location (classe B, classe C, motorisés compacts) et pour tracter une roulotte, le permis de conduire régulier de classe 5 suffit au Québec. Un permis particulier ne devient nécessaire que pour les véhicules très lourds ou les ensembles dépassant certains seuils de poids. Vérifie toujours le poids total du véhicule et de la remorque auprès du loueur avant de réserver.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte la location d’un VR au Québec ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les tarifs varient beaucoup selon le type de véhicule et la saison. En haute saison (juin à août), compte souvent de 150 à 250 $ par nuit pour un van aménagé ou un petit motorisé, et davantage pour un grand classe A ou C familial. À ces montants s’ajoutent le kilométrage, l’assurance, les frais de ménage et parfois une trousse de literie ou de cuisine. Réserver tôt et voyager hors des semaines de vacances scolaires fait baisser la facture.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la meilleure période pour louer un VR au Québec ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La saison de camping s’étend surtout de la mi-mai à la mi-octobre. Juillet et août sont les plus achalandés et les plus chers ; la fin de l’été et le début de l’automne, avec les couleurs, offrent souvent le meilleur compromis entre météo, disponibilité et tarifs. Si tu vises un VR pour l’été, réserve dès le printemps : les meilleurs véhicules partent vite.',
      },
    },
    {
      '@type': 'Question',
      name: 'VR motorisé ou roulotte : que choisir pour un premier voyage ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour un premier voyage, un VR motorisé (classe B ou C) est souvent plus simple : tout est intégré, rien à atteler, et on conduit comme un gros véhicule. La roulotte revient moins cher à la nuit mais suppose un véhicule capable de la tracter et une certaine aisance pour reculer et stationner. Si tu n’as jamais tracté, commence par un motorisé compact.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on louer un VR entre particuliers au Québec ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Des plateformes de location entre particuliers permettent de louer le VR d’un propriétaire, souvent à un prix plus avantageux qu’en agence, avec une assurance incluse par la plateforme. C’est une bonne option pour accéder à une plus grande variété de véhicules. Lis attentivement les conditions de kilométrage, d’assurance et d’annulation avant de réserver.',
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on stationner un VR n’importe où pour dormir au Québec ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Non. Le camping sauvage est réglementé et souvent interdit sur les terrains publics et les stationnements commerciaux. Le plus simple est de réserver des campings avec services (électricité, eau, vidange), très nombreux au Québec et dans les parcs de la Sépaq. Certains réseaux proposent aussi des haltes chez des producteurs ou des vignobles pour une nuit.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quel type de VR convient à une famille ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les familles se tournent souvent vers un motorisé de classe C avec sa capucine (couchage au-dessus de la cabine) ou vers une roulotte familiale avec chambre séparée et lits superposés. L’important est de vérifier le nombre de places de couchage réelles et le nombre de ceintures de sécurité homologuées, qui limite le nombre de passagers en mouvement.',
      },
    },
    {
      '@type': 'Question',
      name: 'Existe-t-il des VR ou roulottes 4 saisons pour le climat du Québec ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Les modèles dits 4 saisons (ou « grand froid ») sont conçus pour les climats froids : isolation renforcée, soubassement fermé et chauffé, réservoirs et conduites protégés du gel, doubles fenêtres et chaufferette plus puissante. Ils permettent de camper au printemps et à l’automne, quand les nuits québécoises descendent sous zéro, et parfois même l’hiver. Si tu voyages hors de la pleine saison estivale, demande précisément au loueur si le véhicule est isolé 4 saisons et si ses systèmes d’eau sont protégés contre le gel.',
      },
    },
    {
      '@type': 'Question',
      name: 'Faut-il de l’expérience pour conduire un VR ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pas nécessairement, mais quelques réflexes aident : anticiper le freinage, surveiller la hauteur du véhicule aux entrées et viaducs, élargir ses virages et prendre son temps pour reculer, idéalement à deux. La plupart des loueurs donnent une prise en main du véhicule au départ. Pour une première fois, choisis un modèle compact et des étapes courtes.',
      },
    },
  ],
} as const;

export default function BlogArticleLocationVR() {
  return (
    <DestinationArticleTemplate
      slug="location-vr-quebec"
      title="Louer un VR au Québec : le guide complet pour voyager libre, été comme automne"
      toc={[
        { id: 'introduction', label: 'Introduction' },
        { id: 'pourquoi', label: 'Pourquoi voyager en VR' },
        { id: 'types', label: 'Types de VR & roulottes' },
        { id: 'ou-louer', label: 'Où louer' },
        { id: 'budget', label: 'Budget & coûts' },
        { id: 'permis', label: 'Permis & conduite' },
        { id: 'quatre-saisons', label: 'VR 4 saisons' },
        { id: 'quand', label: 'Quand partir' },
        { id: 'itineraires', label: 'Idées d’itinéraires' },
        { id: 'dormir', label: 'Où dormir en VR' },
        { id: 'checklist', label: 'Checklist départ' },
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
                src="/images/destinations/location-vr.avif" // adapte le chemin si besoin
                alt="VR motorisé stationné devant un paysage du Québec au coucher du soleil"
                width={1200}
                height={675}
                className="h-auto w-full rounded-3xl object-cover"
                priority
              />
            </div>

            <p className="text-sm uppercase tracking-wide text-slate-500">
              Location VR • Roulotte • Van aménagé • Road trip Québec
            </p>
            <nav
              aria-label="Sommaire de l'article"
              className="mt-6 rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-700"
            >
              <p className="mb-2 font-semibold">Dans cet article :</p>
              <ul className="grid gap-1 md:grid-cols-2">
                <li>
                  <a href="#introduction" className="hover:underline">
                    Pourquoi la location de VR séduit
                  </a>
                </li>
                <li>
                  <a href="#pourquoi" className="hover:underline">
                    Voyager en VR : la liberté au quotidien
                  </a>
                </li>
                <li>
                  <a href="#types" className="hover:underline">
                    Types de VR &amp; roulottes
                  </a>
                </li>
                <li>
                  <a href="#ou-louer" className="hover:underline">
                    Où louer un VR au Québec
                  </a>
                </li>
                <li>
                  <a href="#budget" className="hover:underline">
                    Budget &amp; coûts à prévoir
                  </a>
                </li>
                <li>
                  <a href="#permis" className="hover:underline">
                    Permis, poids &amp; conduite
                  </a>
                </li>
                <li>
                  <a href="#quatre-saisons" className="hover:underline">
                    VR &amp; roulottes 4 saisons
                  </a>
                </li>
                <li>
                  <a href="#quand" className="hover:underline">
                    Quand partir au Québec
                  </a>
                </li>
                <li>
                  <a href="#itineraires" className="hover:underline">
                    Idées d’itinéraires
                  </a>
                </li>
                <li>
                  <a href="#dormir" className="hover:underline">
                    Où dormir en VR
                  </a>
                </li>
                <li>
                  <a href="#checklist" className="hover:underline">
                    Checklist avant le départ
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:underline">
                    FAQ – Questions fréquentes
                  </a>
                </li>
                <li>
                  <a href="#liens" className="hover:underline">
                    Continuer avec <BrandName />
                  </a>
                </li>
              </ul>
            </nav>
          </header>

          {/* INTRODUCTION */}
          <section id="introduction" className="prose prose-slate max-w-none">
            <p>
              Voyager en VR au Québec, c’est décider chaque matin où l’on veut se réveiller. Un lac
              au petit-déjeuner, une plage du Bas-Saint-Laurent au dîner, une forêt de Charlevoix au
              coucher du soleil : le véhicule récréatif transforme la province en un immense terrain
              de jeu où l’hébergement suit le paysage plutôt que l’inverse.
            </p>
            <p>
              Avant même de choisir ton véhicule, tu peux préparer ton parcours avec les outils de{' '}
              <BrandName /> : tracer tes étapes avec le{' '}
              <Link href="/planificateur">planificateur</Link>, repérer l’ambiance des régions dans
              les <Link href="/videos">vidéos</Link>, et localiser les{' '}
              <Link href="/producteurs">producteurs locaux</Link> pour transformer chaque halte en
              découverte gourmande.
            </p>
            <p>
              Ce guide t’explique comment <strong>louer un VR ou une roulotte au Québec</strong> :
              les types de véhicules, où les trouver, combien prévoir, quel permis, quand partir, où
              dormir légalement, et une checklist pour ne rien oublier au départ.
            </p>
          </section>

          {/* POURQUOI */}
          <section id="pourquoi" className="prose prose-slate mt-10 max-w-none">
            <H2>Pourquoi voyager en VR plutôt qu’en hôtel</H2>
            <p>
              Le VR n’est pas qu’un moyen de transport : c’est une façon de voyager. Voici ce qui
              séduit la plupart des voyageurs qui essaient une première fois.
            </p>
            <ul>
              <li>
                <strong>La liberté d’itinéraire</strong> : pas de réservation d’hôtel à respecter,
                on ajuste selon la météo et les coups de cœur.
              </li>
              <li>
                <strong>Un budget prévisible</strong> : le logement et le transport sont réunis, et
                cuisiner à bord réduit la facture de restaurant.
              </li>
              <li>
                <strong>La proximité de la nature</strong> : on dort dans les parcs, au bord des
                lacs, loin des zones touristiques saturées.
              </li>
              <li>
                <strong>Un rythme familial</strong> : les enfants ont leurs repères, leur lit, leurs
                jouets, ce qui simplifie énormément les longues journées.
              </li>
            </ul>
          </section>

          {/* TYPES */}
          <section id="types" className="prose prose-slate mt-10 max-w-none">
            <H2>Les types de VR et de roulottes à connaître</H2>
            <p>
              Le vocabulaire peut dérouter au début. Voici les grandes familles, du plus simple à
              conduire au plus spacieux.
            </p>

            <H3>Van aménagé (classe B)</H3>
            <p>
              Un fourgon transformé en mini-maison : compact, facile à conduire et à stationner,
              idéal pour un couple ou un voyageur solo. On passe partout, mais l’espace de vie est
              restreint. C’est souvent le meilleur choix pour une première location sans stress de
              conduite.
            </p>

            <H3>Motorisé de classe C</H3>
            <p>
              Reconnaissable à sa capucine au-dessus de la cabine, le classe C est le grand
              classique familial : couchages multiples, cuisine, salle d’eau, tout intégré. Plus
              volumineux qu’un van, il reste conduisible avec un permis régulier et convient très
              bien aux familles.
            </p>

            <H3>Motorisé de classe A</H3>
            <p>
              Le plus grand et le plus confortable, façon autobus aménagé. Beaucoup d’espace et
              d’équipements, mais un gabarit imposant qui demande de l’aisance au volant et coûte
              plus cher à louer et en carburant. À réserver aux voyageurs déjà à l’aise.
            </p>

            <H3>Roulotte de voyage</H3>
            <p>
              Une remorque que l’on attelle à son propre véhicule (si celui-ci a la capacité de
              remorquage). Moins chère à la nuit, elle laisse la liberté de détacher le véhicule une
              fois installé au camping. En revanche, atteler, reculer et stationner demandent un peu
              de pratique.
            </p>

            <H3>Roulotte à sellette (fifth wheel)</H3>
            <p>
              Une grande roulotte qui s’attelle dans la boîte d’une camionnette, très spacieuse et
              stable sur la route. Réservée à ceux qui possèdent un camion adapté ; on la voit
              surtout en location longue durée ou en usage saisonnier.
            </p>

            <H3>Tente-roulotte et hybrides</H3>
            <p>
              Légères et abordables, elles se déploient une fois sur place avec des sections en
              toile. Un bon compromis pour goûter au camping en remorque sans le poids d’une
              roulotte rigide, mais moins isolées par temps frais.
            </p>

            <H3>VR ou roulotte : lequel choisir ?</H3>
            <p>
              La <strong>différence entre un VR motorisé et une roulotte</strong> tient surtout à la
              conduite et au budget. Le <strong>VR motorisé</strong> réunit tout dans un seul
              véhicule : rien à atteler, on conduit directement, on arrive et on est installé. C’est
              plus cher à la nuit, mais plus simple, et une fois garé on ne peut plus se déplacer
              sans tout remballer.
            </p>
            <p>
              La <strong>roulotte</strong> coûte moins cher, se laisse au camping pendant qu’on
              rayonne avec le véhicule tracteur, mais suppose un véhicule capable de la tirer et une
              certaine aisance pour atteler, reculer et stationner. En résumé&nbsp;: motorisé pour
              la simplicité et le confort de conduite, roulotte pour l’économie et la liberté une
              fois sur place. Si tu hésites encore, la question suivante t’aidera à trancher.
            </p>

            <H3>Quel VR choisir pour débuter : nos conseils pour un premier VR</H3>
            <p>
              Pour un <strong>premier VR</strong>, privilégie la simplicité. Un{' '}
              <strong>motorisé compact (classe B ou C)</strong> se conduit sans stress d’attelage et
              se stationne plus facilement qu’un grand classe A ou qu’un ensemble avec roulotte.
              Quelques conseils pour un premier voyage réussi&nbsp;:
            </p>
            <ul>
              <li>choisis un modèle récent et bien noté, avec une prise en main au départ ;</li>
              <li>vise des étapes courtes et un itinéraire simple pour la première fois ;</li>
              <li>
                vérifie le nombre de couchages <em>réels</em> et de ceintures homologuées avant de
                réserver ;
              </li>
              <li>
                si tu voyages au printemps ou à l’automne, demande un véhicule bien isolé (voir la
                section 4 saisons ci-dessous) ;
              </li>
              <li>
                fais quelques manœuvres à vide dans un stationnement désert avant de prendre la
                route.
              </li>
            </ul>
          </section>

          {/* OÙ LOUER */}
          <section id="ou-louer" className="prose prose-slate mt-10 max-w-none">
            <H2>Où louer un VR au Québec</H2>
            <p>Deux grandes voies s’offrent à toi, chacune avec ses avantages.</p>

            <H3>Les agences de location</H3>
            <p>
              Des entreprises spécialisées louent des flottes de motorisés et de vans, souvent
              récents et bien entretenus, avec assistance routière et forfaits kilométrage. C’est
              rassurant pour une première fois : véhicules standardisés, contrats clairs, prise en
              main encadrée. Les points de départ se trouvent surtout autour de Montréal et de
              Québec.
            </p>

            <H3>La location entre particuliers</H3>
            <p>
              Des plateformes comme <strong>RVezy</strong> ou <strong>Outdoorsy</strong> mettent en
              relation propriétaires et voyageurs, avec une assurance fournie par la plateforme. On
              y trouve une plus grande variété de véhicules et souvent de meilleurs prix, en échange
              d’un peu plus de vérifications à faire soi-même (état, équipements, conditions).
            </p>

            <div className="not-prose rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100">
              <p className="text-gray-800">
                <strong>Le réflexe avant de réserver :</strong> compare le prix affiché{' '}
                <em>tout inclus</em>. Le tarif à la nuit cache souvent le kilométrage, l’assurance,
                les frais de ménage, la vidange et la trousse de literie/cuisine. Un véhicule
                «&nbsp;moins cher&nbsp;» peut revenir plus haut une fois ces frais ajoutés.
              </p>
            </div>
          </section>

          {/* BUDGET */}
          <section id="budget" className="prose prose-slate mt-10 max-w-none">
            <H2>Budget : combien coûte un voyage en VR</H2>
            <p>
              Les tarifs bougent selon le véhicule et la saison, mais voici des repères pour
              construire ton budget.
            </p>
            <ul>
              <li>
                <strong>Location (haute saison) :</strong> souvent 150 à 250 $/nuit pour un van ou
                un petit motorisé, davantage pour un grand classe A ou C familial.
              </li>
              <li>
                <strong>Kilométrage :</strong> parfois inclus jusqu’à un plafond, puis facturé au
                kilomètre. Estime ta distance à l’avance sur le{' '}
                <Link href="/planificateur">planificateur</Link>.
              </li>
              <li>
                <strong>Carburant :</strong> un poste réel, surtout pour les gros motorisés. Compte
                large et privilégie des étapes rapprochées.
              </li>
              <li>
                <strong>Camping :</strong> de quelques dizaines de dollars la nuit selon les
                services (électricité, eau, vidange).
              </li>
              <li>
                <strong>Extras :</strong> assurance, frais de ménage, literie, vidange, éventuel
                équipement (chaises, BBQ).
              </li>
            </ul>
            <p>
              Astuce budget : cuisiner à bord et viser la fin de l’été ou l’automne, moins chers et
              moins achalandés, allège nettement la facture par rapport à juillet-août.
            </p>
          </section>

          {/* PERMIS */}
          <section id="permis" className="prose prose-slate mt-10 max-w-none">
            <H2>Quel permis pour conduire un VR ?</H2>

            <H3>Louer un VR sans permis spécial : ce qu’il faut savoir</H3>
            <p>
              Bonne nouvelle : pour la <strong>grande majorité des VR de location</strong> et pour
              tracter une roulotte, le permis de conduire régulier (classe 5) suffit au Québec —
              donc <strong>sans permis spécial</strong> dans la plupart des cas. Un permis
              particulier ne devient nécessaire que pour les véhicules très lourds ou les ensembles
              dépassant certains seuils de poids. Vérifie toujours le poids total du véhicule et de
              la remorque auprès du loueur.
            </p>
            <p>Quelques réflexes de conduite qui changent tout&nbsp;:</p>
            <ul>
              <li>surveiller la hauteur du véhicule aux entrées de stationnement et viaducs ;</li>
              <li>anticiper le freinage, plus long avec le poids ;</li>
              <li>élargir les virages pour ne pas monter sur les trottoirs ;</li>
              <li>reculer lentement, idéalement à deux, avec un guide à l’extérieur ;</li>
              <li>
                pour une roulotte, faire quelques manœuvres à vide dans un stationnement vide avant
                de partir.
              </li>
            </ul>
          </section>

          {/* 4 SAISONS */}
          <section id="quatre-saisons" className="prose prose-slate mt-10 max-w-none">
            <H2>VR et roulottes 4 saisons au Québec</H2>
            <p>
              Au Québec, la question du <strong>4 saisons</strong> n’est pas un détail : dès le
              printemps et jusqu’à l’automne, les nuits descendent régulièrement sous zéro, et un
              véhicule mal isolé transforme vite le voyage en épreuve. Si tu comptes voyager hors de
              la pleine saison estivale, c’est le critère à surveiller en premier.
            </p>

            <H3>Ce qui distingue un VR ou une roulotte 4 saisons</H3>
            <p>
              Les modèles dits <strong>4 saisons</strong> (ou «&nbsp;grand froid&nbsp;») sont conçus
              pour les climats froids. Concrètement, on y retrouve&nbsp;:
            </p>
            <ul>
              <li>
                une <strong>isolation renforcée</strong> des murs, du toit et du plancher ;
              </li>
              <li>
                un <strong>soubassement fermé et chauffé</strong> qui protège les réservoirs et les
                conduites d’eau du gel ;
              </li>
              <li>
                des <strong>doubles fenêtres</strong> et de meilleurs joints contre les courants
                d’air ;
              </li>
              <li>
                une <strong>chaufferette plus puissante</strong> et parfois un plancher chauffant ;
              </li>
              <li>des réservoirs d’eaux usées isolés ou réchauffés.</li>
            </ul>

            <H3>Quand ça change tout</H3>
            <p>
              Un véhicule 4 saisons permet de camper confortablement au <strong>printemps</strong>{' '}
              et à l’<strong>automne</strong> québécois — justement les meilleures périodes pour les
              couleurs et les tarifs — et parfois même l’<strong>hiver</strong> pour les plus
              aventureux. À l’inverse, un VR d’été utilisé par temps froid expose au gel des
              conduites et à des nuits inconfortables.
            </p>

            <div className="not-prose rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100">
              <p className="text-gray-800">
                <strong>La question à poser au loueur :</strong> «&nbsp;Ce véhicule est-il isolé 4
                saisons, et ses systèmes d’eau sont-ils protégés contre le gel&nbsp;?&nbsp;» Si tu
                voyages en mai, en septembre-octobre ou plus tard, la réponse doit être claire.
                Pense aussi à confirmer que le chauffage fonctionne et à prévoir de la literie
                chaude.
              </p>
            </div>
          </section>

          {/* QUAND */}
          <section id="quand" className="prose prose-slate mt-10 max-w-none">
            <H2>Quand partir en VR au Québec</H2>

            <H3>Été (juin à août)</H3>
            <p>
              La pleine saison : longues journées, lacs baignables, tous les campings ouverts. C’est
              aussi le plus achalandé et le plus cher, et les meilleurs véhicules se réservent des
              mois à l’avance. Réserve tôt.
            </p>

            <H3>Fin d’été et automne (septembre-octobre)</H3>
            <p>
              Souvent le meilleur compromis. Les couleurs d’automne dans Charlevoix, en Mauricie ou
              dans les Cantons-de-l’Est sont spectaculaires, les foules diminuent et les tarifs
              baissent. Les nuits fraîchissent : vise un véhicule bien isolé et vérifie le
              chauffage.
            </p>

            <H3>Printemps (mai)</H3>
            <p>
              Le début de saison, plus calme et plus abordable, mais tous les campings ne sont pas
              encore ouverts et la météo reste variable. Vérifie les ouvertures avant de tracer ton
              itinéraire.
            </p>

            <div className="not-prose rounded-xl bg-amber-50 p-4 ring-1 ring-amber-200">
              <p className="text-gray-800">
                <strong>Saisonnalité de la demande :</strong> les recherches de location de VR
                explosent au <strong>printemps</strong>, quand tout le monde planifie l’été. Si tu
                veux du choix et de bons prix, réserve dès mars-avril pour un départ estival.
              </p>
            </div>
          </section>

          {/* ITINÉRAIRES */}
          <section id="itineraires" className="prose prose-slate mt-10 max-w-none">
            <H2>Idées d’itinéraires en VR</H2>

            <H3>Le tour de la Gaspésie</H3>
            <p>
              L’itinéraire de rêve : la route 132 qui longe le fleuve puis la mer, le rocher Percé,
              le parc Forillon, les phares et les villages de pêcheurs. Prévois au moins une semaine
              pour ne pas courir, et réserve les campings côtiers à l’avance en été.
            </p>

            <H3>Charlevoix et la Côte-Nord</H3>
            <p>
              Des paysages de montagnes qui plongent dans le fleuve, Baie-Saint-Paul, Tadoussac et
              l’observation des baleines. Un parcours plus court, idéal pour un premier road trip en
              VR de quelques jours au départ de Québec.
            </p>

            <H3>La boucle Mauricie – Lanaudière</H3>
            <p>
              Lacs, forêts et parcs nationaux à distance raisonnable des grands centres. Parfait
              pour une première sortie relax, avec des campings bien équipés et des étapes
              rapprochées.
            </p>

            <p>
              Tu peux bâtir et ajuster chacun de ces parcours dans le{' '}
              <Link href="/planificateur">planificateur d’itinéraire</Link> de <BrandName />, en
              intégrant tes haltes chez les <Link href="/producteurs">producteurs locaux</Link>.
            </p>
          </section>

          {/* DORMIR */}
          <section id="dormir" className="prose prose-slate mt-10 max-w-none">
            <H2>Camping avec un VR : où dormir légalement</H2>
            <p>
              Contrairement à une idée reçue, on ne se stationne pas n’importe où pour la nuit. Le
              camping sauvage est réglementé et souvent interdit sur les terrains publics et les
              stationnements commerciaux. Les bonnes options&nbsp;:
            </p>
            <ul>
              <li>
                <strong>Les campings avec services</strong> : électricité, eau et vidange, très
                nombreux partout au Québec.
              </li>
              <li>
                <strong>Les parcs nationaux (Sépaq)</strong> : emplacements en pleine nature, à
                réserver tôt en haute saison.
              </li>
              <li>
                <strong>Les haltes chez des producteurs ou vignobles</strong> : certains réseaux
                permettent une nuit sur place, une belle façon de découvrir le terroir.
              </li>
            </ul>
            <p>
              Vérifie toujours les services dont ton véhicule a besoin (branchement électrique,
              vidange des eaux) au moment de réserver ton emplacement.
            </p>
          </section>

          {/* CHECKLIST */}
          <section id="checklist" className="prose prose-slate mt-10 max-w-none">
            <H2>Checklist avant le départ</H2>
            <ul>
              <li>prise en main du véhicule avec le loueur (systèmes d’eau, gaz, électricité) ;</li>
              <li>vérifier les niveaux, la pression des pneus et l’attelage si roulotte ;</li>
              <li>confirmer le forfait kilométrage et l’assurance ;</li>
              <li>literie, vaisselle, produits de base et trousse de premiers soins ;</li>
              <li>réservations de campings pour les premières nuits au moins ;</li>
              <li>
                itinéraire chargé sur le <Link href="/planificateur">planificateur</Link> avec les
                arrêts producteurs et points d’intérêt ;
              </li>
              <li>
                nos conseils pour le confort à bord dans l’article{' '}
                <Link href="/blog/voyage-hotel">produits indispensables pour voyager</Link>.
              </li>
            </ul>
          </section>

          {/* GOQUEBECAN */}
          <section id="goquebecan" className="prose prose-slate mt-10 max-w-none">
            <H2>
              Préparer ton road trip en VR avec <BrandName />
            </H2>
            <p>
              Pour transformer ta location de VR en voyage fluide, appuie-toi sur les ressources de{' '}
              <BrandName /> :
            </p>
            <ul>
              <li>
                le <Link href="/planificateur">planificateur d’itinéraire</Link> pour enchaîner tes
                étapes et estimer les distances ;
              </li>
              <li>
                la <Link href="/videos">section Vidéos</Link> pour repérer l’ambiance des régions
                avant de choisir ton parcours ;
              </li>
              <li>
                la <Link href="/producteurs">carte des producteurs locaux</Link>, idéale pour
                planifier des haltes gourmandes en route ;
              </li>
              <li>
                nos conseils sur les{' '}
                <Link href="/blog/voyage-hotel">produits indispensables pour voyager</Link> pour
                optimiser le confort à bord.
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <section id="faq" className="prose prose-slate mt-10 max-w-none">
            <H2>FAQ – Louer un VR au Québec</H2>

            <H3>Faut-il un permis spécial pour conduire un VR ?</H3>
            <p>
              Pour la plupart des VR de location et pour tracter une roulotte, le permis régulier de
              classe 5 suffit au Québec. Un permis particulier ne s’impose que pour les véhicules
              très lourds ou les ensembles dépassant certains seuils de poids. Vérifie le poids
              total auprès du loueur avant de réserver.
            </p>

            <H3>Combien coûte la location d’un VR ?</H3>
            <p>
              En haute saison, compte souvent <strong>150 à 250 $/nuit</strong> pour un van ou un
              petit motorisé, davantage pour un grand modèle familial. Ajoute le kilométrage,
              l’assurance, le ménage et parfois la literie. Réserver tôt et éviter juillet-août fait
              baisser la note.
            </p>

            <H3>VR motorisé ou roulotte pour débuter ?</H3>
            <p>
              Un motorisé compact (classe B ou C) est plus simple pour une première fois : rien à
              atteler, tout intégré. La roulotte coûte moins cher à la nuit mais suppose un véhicule
              capable de tracter et de l’aisance pour reculer. Si tu n’as jamais tracté, commence
              par un motorisé.
            </p>

            <H3>Peut-on louer entre particuliers ?</H3>
            <p>
              Oui, via des plateformes qui incluent une assurance et donnent accès à plus de choix,
              souvent à meilleur prix qu’en agence. Lis bien les conditions de kilométrage,
              d’assurance et d’annulation avant de réserver.
            </p>

            <H3>Peut-on dormir n’importe où en VR ?</H3>
            <p>
              Non : le camping sauvage est réglementé et souvent interdit. Réserve des campings avec
              services ou des emplacements de la Sépaq ; certains réseaux permettent aussi une nuit
              chez des producteurs. Tu peux repérer des haltes gourmandes sur la carte des{' '}
              <Link href="/producteurs">producteurs locaux</Link>.
            </p>

            <H3>Quel VR pour une famille ?</H3>
            <p>
              Souvent un classe C avec capucine ou une roulotte familiale avec chambre séparée.
              Vérifie le nombre de couchages réels et surtout le nombre de ceintures homologuées,
              qui limite le nombre de passagers en mouvement.
            </p>
          </section>

          {/* LIENS / RÉCAP */}
          <section id="liens" className="prose prose-slate mt-10 max-w-none">
            <H2>
              Continuer à explorer le Québec avec <BrandName />
            </H2>
            <p>
              Le VR n’est qu’un début. <BrandName /> t’accompagne pour transformer chaque route en
              découverte.
            </p>
            <ul>
              <li>
                🧭 Construire ton road trip : le{' '}
                <Link href="/planificateur">planificateur d’itinéraire</Link>.
              </li>
              <li>
                🎬 Te projeter dans les régions : la page <Link href="/videos">Vidéos</Link>.
              </li>
              <li>
                🧺 Repérer les haltes gourmandes : la carte des{' '}
                <Link href="/producteurs">producteurs locaux</Link>.
              </li>
              <li>
                🎒 Optimiser ton confort : l’article{' '}
                <Link href="/blog/voyage-hotel">produits indispensables pour voyager</Link>.
              </li>
              <li>
                📝 Découvrir d’autres destinations : nos articles régions dans la section{' '}
                <Link href="/blog">blog</Link>.
              </li>
            </ul>
            <p>
              Envie de tracer ton prochain voyage ?{' '}
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
