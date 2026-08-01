'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Banknote, Plane } from 'lucide-react';

import H2 from '@/components/typography/H2';
import BrandName from '@/components/brand/BrandName';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

/**
 * ARTICLE TRANSVERSAL — Argent & cartes en voyage (frais de change, retraits, points).
 * Angle : VÉCU, non prescriptif (pas de conseil financier). On partage ce qu'on a utilisé.
 *
 * ⚠️ SEO dans app/blog/argent-cartes-voyage/page.tsx.
 * ⚠️ Pas de liens affiliés carte de crédit ici (créneau dominé par Milesopedia/Retraite101,
 *    et réglementation stricte). Monétisation indirecte via les autres articles.
 * ✅ Vécu intégré (Yucatán mai 2026).
 */

export default function BlogArticleArgentCartesVoyage() {
  return (
    <DestinationArticleTemplate
      slug="argent-cartes-voyage"
      title="Argent et cartes en voyage : payer malin sans frais (guide vécu pour Québécois)"
      subtitle="Frais de change, retraits aux guichets, cartes sans frais et cartes à points : comment on a évité les frais inutiles lors de notre voyage au Mexique."
      breadcrumbs={[
        { label: 'Accueil', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Argent & cartes en voyage' },
      ]}
      hero={{
        eyebrow: 'Argent • Cartes • Frais de change • Vécu',
        caption: 'Payer malin en voyage, sans frais inutiles',
        image: (
          <Image
            src="/images/destinations/billets-pesos-mexicains-voyage.avif"
            alt="Cartes de paiement, billets et téléphone pour gérer son argent en voyage"
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            priority
          />
        ),
      }}
      toc={[
        { id: 'probleme', label: 'Le vrai coût caché' },
        { id: 'deux-cartes', label: 'La stratégie 2 cartes' },
        { id: 'sans-frais', label: 'Carte sans frais de change' },
        { id: 'points', label: 'Carte à points & avantages' },
        { id: 'retraits', label: 'Retirer du comptant' },
        { id: 'pesos', label: 'Payer en devise locale' },
        { id: 'comptant', label: 'Combien de comptant' },
        { id: 'erreurs', label: 'Erreurs à éviter' },
        { id: 'checklist', label: 'Checklist avant départ' },
      ]}
      showNearbyDestinations={false}
    >
      <div className="not-prose mb-8">
        <AffiliateDisclosure />
      </div>

      {/* INTRO */}
      <p>
        Sur un voyage, l’argent qu’on perd sans s’en rendre compte, ce sont les{' '}
        <strong>frais</strong> : frais de change, frais de retrait, mauvais taux au terminal. Mis
        bout à bout, ça représente vite des dizaines de dollars envolés pour rien. La bonne
        nouvelle, c’est qu’avec quelques réflexes simples, on les évite presque tous. Voici
        exactement comment on a géré notre argent lors de notre voyage au Mexique (Yucatán), avec
        nos chiffres réels.
      </p>
      <p className="text-sm text-gray-500">
        Note : cet article partage notre expérience personnelle, ce n’est pas un conseil financier.
        Les conditions, taux et primes des cartes changent souvent — vérifie toujours les détails à
        jour auprès de l’émetteur avant toute demande.
      </p>

      {/* PROBLÈME */}
      <H2 id="probleme">Le vrai coût caché : les frais de change</H2>
      <p>
        La plupart des cartes de crédit canadiennes ajoutent environ{' '}
        <strong>2,5 % de frais de conversion</strong> sur chaque achat effectué dans une autre
        devise. Ça paraît peu, mais sur un voyage complet — hôtels, restos, activités, achats — la
        facture grimpe. À cela s’ajoutent, aux guichets automatiques, des frais de retrait qui
        peuvent être salés si tu choisis mal ta banque locale.
      </p>
      <p>
        L’objectif est donc double : <strong>réduire les frais de change</strong> sur tes paiements,
        et <strong>minimiser les frais de retrait</strong> quand tu prends du comptant.
      </p>

      {/* DEUX CARTES */}
      <H2 id="deux-cartes">Notre stratégie : deux cartes complémentaires</H2>
      <p>
        La clé, pour nous, a été de séparer les usages entre deux cartes qui ne servent pas à la
        même chose :
      </p>
      <ul>
        <li>
          <strong>Une carte sans frais de change</strong> pour les dépenses quotidiennes et les
          retraits de comptant sur place.
        </li>
        <li>
          <strong>Une carte à points / avantages voyage</strong> pour les gros achats (vol, hôtel)
          et les à-côtés comme l’accès aux salons d’aéroport.
        </li>
      </ul>
      <p>
        Chacune joue son rôle : l’une te fait économiser sur les frais, l’autre te fait gagner des
        avantages sur les grosses dépenses que tu ferais de toute façon.
      </p>

      {/* SANS FRAIS */}
      <H2 id="sans-frais">La carte sans frais de change (pour le quotidien)</H2>
      <p>
        Pour nos dépenses courantes et nos retraits au Mexique, on a utilisé une carte{' '}
        <strong>sans frais de conversion</strong> — dans notre cas, une carte de la{' '}
        <strong>banque EQ</strong>. Concrètement, ça veut dire qu’on ne payait pas le fameux 2,5 %
        sur chaque transaction en pesos. Sur un voyage entier, c’est l’économie la plus simple à
        réaliser.
      </p>
      <div className="not-prose my-4 rounded-2xl border-l-4 border-emerald-400 bg-emerald-50 p-4 text-sm text-emerald-900">
        <p className="mb-1 inline-flex items-center gap-2 font-semibold">
          <Banknote className="size-4" /> Notre vécu
        </p>
        <p className="mt-1">
          Au distributeur Banamex, on a retiré des pesos avec la carte EQ sans frais de change, et
          les frais locaux du guichet étaient minimes — de l’ordre de{' '}
          <strong>38 pesos (environ 2,50 $)</strong>. Comparé à ce que certaines autres banques
          prélevaient, la différence était nette.
        </p>
      </div>
      <p>
        Le principe à retenir, quelle que soit la carte que tu choisis : cherche une carte qui{' '}
        <strong>n’applique pas de frais de conversion à l’étranger</strong>. Plusieurs options
        existent au Canada (certaines cartes prépayées, certaines cartes de crédit spécialisées) —
        compare-les selon ton profil.
      </p>

      {/* POINTS */}
      <H2 id="points">La carte à points et avantages (pour les gros achats)</H2>
      <p>
        Pour le vol et les grosses dépenses, on a utilisé une carte à{' '}
        <strong>avantages voyage</strong>. L’idée : puisque tu vas dépenser cet argent de toute
        façon, autant qu’il te rapporte quelque chose. Dans notre cas, ça nous a donné des bénéfices
        très concrets :
      </p>
      <ul>
        <li>
          <strong>Bagages et sièges inclus</strong> sur le vol (carte BMO VIPorter World Elite) — un
          détail qui nous a même dépannés au retour, quand on a dû mettre une valise en soute à la
          dernière minute à cause d’épices confisquées à la douane.
        </li>
        <li>
          <strong>Accès aux salons d’aéroport</strong> (carte CIBC Aventura) : on a déjeuné
          gratuitement et tranquillement à Ottawa au départ, puis à Cancún au retour. Buffet,
          boissons, viennoiseries — un vrai confort avant l’embarquement.
        </li>
      </ul>
      <div className="not-prose my-4 rounded-2xl border-l-4 border-indigo-400 bg-indigo-50 p-4 text-sm text-indigo-900">
        <p className="mb-1 inline-flex items-center gap-2 font-semibold">
          <Plane className="size-4" /> Bon à savoir
        </p>
        <p className="mt-1">
          Les cartes à points offrent souvent des <strong>primes de bienvenue</strong> intéressantes
          et parfois des <strong>accès salon</strong>. C’est un univers à part entière : des sites
          québécois spécialisés (comme Milesopedia ou Retraite 101) comparent ces cartes en détail.
          Nous, on partage simplement ce qu’on a utilisé et ce que ça nous a apporté sur le terrain.
        </p>
      </div>

      {/* RETRAITS */}
      <H2 id="retraits">Retirer du comptant sans se faire avoir</H2>
      <p>
        Même avec une bonne carte, le choix du <strong>guichet</strong> compte. Voici ce qu’on a
        appris sur place :
      </p>
      <ul>
        <li>
          <strong>Compare les banques locales.</strong> On a comparé plusieurs guichets à Tulum : la
          première banque prenait trop de frais de change, on a changé pour un distributeur Banamex
          bien plus avantageux (dans le Super Aki, à l’entrée de Tulum).
        </li>
        <li>
          <strong>Retire des montants raisonnables à la fois</strong> pour limiter le nombre de
          frais fixes, sans pour autant te promener avec trop de comptant.
        </li>
        <li>
          <strong>Refuse la « conversion » proposée par le guichet.</strong> S’il te demande si tu
          veux être débité en dollars canadiens, refuse et choisis la devise locale (voir plus bas).
        </li>
      </ul>

      {/* PESOS */}
      <H2 id="pesos">Toujours payer en devise locale (jamais en dollars)</H2>
      <p>
        C’est le réflexe le plus rentable et le plus méconnu. Quand un terminal de paiement ou un
        guichet te propose de payer <strong>« en dollars canadiens »</strong> plutôt qu’en devise
        locale, refuse toujours. Ce service, appelé conversion dynamique de devise, applique un{' '}
        <strong>taux de change presque toujours défavorable</strong>. En choisissant de payer en{' '}
        <strong>pesos</strong> (ou dans la devise du pays), c’est ta banque qui convertit, à un
        meilleur taux — surtout si ta carte n’a pas de frais de change.
      </p>

      {/* COMPTANT */}
      <H2 id="comptant">Combien de comptant prévoir ?</H2>
      <p>
        Dans le Sud, une partie de l’économie fonctionne au comptant. Au Mexique, on a eu besoin de
        pesos pour :
      </p>
      <ul>
        <li>
          les <strong>transports locaux</strong> (colectivos, tuc-tuc — payés cash uniquement) ;
        </li>
        <li>
          les <strong>marchés</strong> et petites épiceries de village ;
        </li>
        <li>
          les <strong>petits restaurants</strong> familiaux et les pourboires.
        </li>
      </ul>
      <p>
        Notre approche : garder une réserve de comptant pour ces usages, et payer par carte (sans
        frais de change) partout où c’est accepté. Inutile de changer de grosses sommes à l’avance à
        l’aéroport (mauvais taux) — un premier retrait au guichet sur place, avec la bonne carte,
        suffit.
      </p>

      {/* ERREURS */}
      <H2 id="erreurs">Les erreurs à éviter</H2>
      <ul>
        <li>
          <strong>Payer en dollars au terminal</strong> : toujours choisir la devise locale.
        </li>
        <li>
          <strong>Utiliser une carte à 2,5 % de frais</strong> pour tout : garde-la pour les points,
          pas pour le quotidien à l’étranger.
        </li>
        <li>
          <strong>Changer de l’argent à l’aéroport</strong> : les taux y sont parmi les pires.
        </li>
        <li>
          <strong>Retirer à la première banque venue</strong> : compare les frais, ils varient
          beaucoup.
        </li>
        <li>
          <strong>Voyager sans aucun comptant local</strong> : certains transports et commerces ne
          prennent que le cash.
        </li>
      </ul>

      {/* CHECKLIST */}
      <H2 id="checklist">Checklist argent avant de partir</H2>
      <ul>
        <li>
          obtenir une <strong>carte sans frais de change</strong> et l’activer ;
        </li>
        <li>
          vérifier les <strong>avantages voyage</strong> de ta carte à points (bagages, salons,
          assurances incluses) ;
        </li>
        <li>prévenir tes institutions que tu voyages, pour éviter un blocage de sécurité ;</li>
        <li>
          noter comment <strong>refuser la conversion en dollars</strong> aux terminaux ;
        </li>
        <li>prévoir un peu de comptant local dès l’arrivée (premier retrait au bon guichet) ;</li>
        <li>
          garder une <strong>carte de secours</strong> rangée séparément, au cas où.
        </li>
      </ul>

      {/* RÉCAP */}
      <H2>
        Continuer avec <BrandName />
      </H2>
      <p>Cet article fait partie de notre série pour organiser son voyage dans le Sud soi-même :</p>
      <ul>
        <li>
          🧭{' '}
          <Link href="/blog/reserver-voyage-sud-soi-meme">
            Réserver son voyage dans le Sud soi-même
          </Link>
        </li>
        <li>
          🌴 <Link href="/blog/mexique-yucatan">Notre guide du Yucatán sans voiture</Link>
        </li>
        <li>
          🛡️ <Link href="/blog/assurance-voyage-quebec">Choisir son assurance voyage</Link>
        </li>
        <li>
          📶 <Link href="/blog/vpn-esim-voyage">eSIM &amp; VPN en voyage</Link>
        </li>
        <li>
          ✈️ <Link href="/blog/partir-ottawa-vs-montreal">Partir d’Ottawa plutôt que Montréal</Link>
        </li>
      </ul>
    </DestinationArticleTemplate>
  );
}
