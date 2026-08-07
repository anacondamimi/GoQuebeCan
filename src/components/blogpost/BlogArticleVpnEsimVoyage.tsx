'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Wifi, Lock } from 'lucide-react';

import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import BrandName from '@/components/brand/BrandName';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';

import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';
import AffiliateButton from '@/components/affiliate/AffiliateButton';
import AffiliateCard from '@/components/affiliate/AffiliateCard';

/**
 * ARTICLE — eSIM & VPN en voyage (refait au format projet, SEO 2026).
 * Angle : scénarios réels et parlants (arrivée aéroport sans wifi, sécurité),
 * émotion honnête (pas de fausses peurs). Monétise Airalo (eSIM) + NordVPN (VPN).
 *
 * ⚠️ SEO dans app/blog/vpn-esim-voyage/page.tsx.
 * ⚠️ Liens dans links.ts : airalo ✅, nordvpn (à remplir si programme validé).
 */

export default function BlogArticleVpnEsimVoyage() {
  return (
    <DestinationArticleTemplate
      slug="vpn-esim-voyage"
      title="eSIM et VPN en voyage : rester connecté et protégé (guide 2026 pour Québécois)"
      subtitle="Pourquoi une eSIM te sauve dès l’atterrissage, ce qu’un VPN change vraiment, et comment tout installer avant de partir — expliqué avec des exemples concrets."
      breadcrumbs={[
        { label: 'Accueil', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'eSIM & VPN en voyage' },
      ]}
      hero={{
        eyebrow: 'eSIM • VPN • Voyage • Rester connecté',
        caption: 'Rester connecté et protégé, partout',
        image: (
          <Image
            src="/images/destinations/esim-vpn-voyage.avif"
            alt="Voyageur connecté avec son téléphone via eSIM à l’étranger"
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            priority
          />
        ),
      }}
      toc={[
        { id: 'scene', label: 'La scène que tout le monde vit' },
        { id: 'esim-cest-quoi', label: 'L’eSIM, c’est quoi' },
        { id: 'esim-pourquoi', label: 'Pourquoi une eSIM' },
        { id: 'esim-choisir', label: 'Quelle eSIM choisir' },
        { id: 'vpn-cest-quoi', label: 'Le VPN, c’est quoi' },
        { id: 'vpn-avantages', label: 'Les vrais avantages du VPN' },
        { id: 'difference', label: 'eSIM vs VPN' },
        { id: 'installer', label: 'Installer avant de partir' },
        { id: 'faq', label: 'FAQ' },
      ]}
      showNearbyDestinations={false}
    >
      <div className="not-prose mb-8">
        <AffiliateDisclosure />
      </div>

      {/* SCÈNE D'OUVERTURE — émotion honnête */}
      <H2 id="scene">La scène que presque tous les voyageurs ont vécue</H2>
      <p>
        Tu viens d’atterrir après des heures de vol. Il fait chaud, tu es fatigué, tu récupères tes
        valises. Ton chauffeur de transport privé est censé t’attendre — mais où ? Tu sors ton
        téléphone pour lui écrire… et <strong>rien</strong>. Le wifi de l’aéroport demande une
        inscription interminable, ou ne fonctionne pas. Tes données mobiles canadiennes, elles,
        afficheraient des frais d’itinérance à faire pâlir. Te voilà planté, déconnecté, à scruter
        la foule en espérant reconnaître une pancarte à ton nom.
      </p>
      <p>
        Ce moment de solitude, une simple <strong>eSIM</strong> l’élimine complètement : à la
        seconde où ton avion se pose, ton téléphone est connecté, tu écris à ton chauffeur, tu
        ouvres ta carte, tu respires. C’est exactement pour éviter ce genre de stress qu’on ne
        voyage plus jamais sans. Voici comment ça marche, et comment t’équiper avant de partir.
      </p>

      {/* ESIM C'EST QUOI */}
      <H2 id="esim-cest-quoi">L’eSIM, c’est quoi exactement ?</H2>
      <p>
        Une <strong>eSIM</strong> (SIM intégrée) est une carte SIM numérique déjà présente dans la
        plupart des téléphones récents. Au lieu d’insérer une carte physique, tu achètes un forfait
        de données en ligne, tu scannes un code QR, et tu es connecté. Pas de boutique à chercher à
        l’arrivée, pas de manipulation de minuscule carte, pas de frais d’itinérance de ton forfait
        canadien. Ta carte SIM habituelle reste en place pour tes appels ; l’eSIM gère les données à
        l’étranger.
      </p>

      {/* ESIM POURQUOI — scénarios concrets */}
      <H2 id="esim-pourquoi">Pourquoi une eSIM change vraiment ton voyage</H2>
      <p>Au-delà de l’arrivée à l’aéroport, voici les moments concrets où elle te sauve :</p>
      <ul>
        <li>
          <strong>Joindre ton transfert ou ton hôtel</strong> dès l’atterrissage, sans dépendre d’un
          wifi capricieux.
        </li>
        <li>
          <strong>Suivre ta carte</strong> en temps réel dans une ville inconnue, au lieu de tourner
          en rond.
        </li>
        <li>
          <strong>Réserver à la dernière minute</strong> une excursion, un resto, un taxi, où que tu
          sois.
        </li>
        <li>
          <strong>Rassurer tes proches</strong> restés au Québec d’un simple message, sans chercher
          un café avec wifi.
        </li>
        <li>
          <strong>Gérer un imprévu</strong> (vol modifié, réservation à confirmer) sans paniquer.
        </li>
      </ul>
      <p>
        En clair : l’eSIM transforme le sentiment d’être perdu à l’étranger en sentiment de
        contrôle. C’est une petite dépense qui enlève une grosse source de stress.
      </p>

      {/* ESIM CHOISIR — Airalo */}
      <H2 id="esim-choisir">Quelle eSIM choisir ?</H2>
      <p>
        Le marché des eSIM a explosé, mais un nom revient comme référence pour sa simplicité et sa
        couverture mondiale : <strong>Airalo</strong>. L’application est claire, tu choisis ton pays
        et ton forfait (par nombre de Go et de jours), tu installes avant de partir, et ça s’active
        à l’arrivée. Idéal pour une première expérience d’eSIM sans prise de tête.
      </p>
      <AffiliateCard
        eyebrow="Rester connecté"
        accent="text-sky-700"
        icon={<Wifi className="size-4" />}
        title="Une eSIM pour ta destination"
        description="Choisis ton forfait, installe-le avant de partir, et arrive connecté. Simple, sans frais d’itinérance."
        affKey="airalo"
        ctaLabel="Voir les forfaits eSIM"
        variant="primary"
      />
      <p className="mt-4">
        Astuce : prends un forfait raisonnable (souvent 3 à 5 Go suffisent pour une semaine si tu
        utilises le wifi de l’hôtel le soir), quitte à recharger en quelques secondes depuis
        l’application si besoin.
      </p>

      {/* VPN C'EST QUOI */}
      <H2 id="vpn-cest-quoi">Le VPN, c’est quoi (et pourquoi ça t’intéresse en voyage) ?</H2>
      <p>
        Un <strong>VPN</strong> (réseau privé virtuel) fait deux choses : il{' '}
        <strong>chiffre</strong> ta connexion (personne ne peut espionner ce que tu fais), et il te
        permet de choisir depuis quel pays tu sembles te connecter. En voyage, ces deux fonctions
        règlent des problèmes très concrets pour un Québécois.
      </p>

      {/* VPN AVANTAGES — exemples parlants */}
      <H2 id="vpn-avantages">Les vrais avantages d’un VPN, avec des exemples</H2>

      <H3>1. Protéger tes données sur les wifis publics</H3>
      <p>
        <strong>Exemple :</strong> tu consultes ton compte bancaire depuis le wifi gratuit de ton
        hôtel pour vérifier une dépense. Sur un réseau ouvert, un individu mal intentionné connecté
        au même wifi peut potentiellement intercepter ce qui n’est pas chiffré : mots de passe,
        courriels, infos bancaires. Un VPN chiffre tout, rendant tes données illisibles. Le même
        réflexe vaut à l’aéroport, au café, dans un Airbnb : partout où le wifi est partagé.
      </p>

      <H3>2. Garder l’accès à tes services canadiens</H3>
      <p>
        <strong>Exemple :</strong> le soir à l’hôtel, tu veux regarder ton émission sur Tou.tv ou
        Crave, ou finir une série sur ton Netflix canadien — mais depuis l’étranger, le catalogue
        change ou l’accès est bloqué. En te connectant à un serveur canadien via le VPN, tu
        retrouves tes contenus comme si tu étais à la maison.
      </p>

      <H3>3. Accéder à ta banque quand elle bloque l’étranger</H3>
      <p>
        <strong>Exemple :</strong> certaines institutions bancaires bloquent les connexions venant
        de l’étranger par sécurité. En te connectant via un serveur canadien, tu peux souvent
        accéder normalement à tes services en ligne, sans te retrouver coincé au mauvais moment.
      </p>

      <H3>4. Payer parfois moins cher</H3>
      <p>
        <strong>Exemple :</strong> certains prix en ligne (vols, réservations, abonnements) varient
        selon le pays depuis lequel tu navigues. Comparer en changeant de serveur peut, dans
        certains cas, révéler un meilleur tarif.
      </p>

      <div className="not-prose my-4 rounded-2xl border bg-white p-5 shadow-sm">
        <p className="mb-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700">
          <Lock className="size-4" /> Notre VPN recommandé
        </p>
        <h4 className="text-base font-semibold text-gray-900">NordVPN</h4>
        <p className="mt-2 text-sm leading-6 text-gray-700">
          Reconnu, simple à installer sur mobile et ordinateur, avec des serveurs au Canada et de
          bonnes performances pour le streaming. Installe-le et teste-le à la maison avant de
          partir.
        </p>
        <div className="mt-4">
          <AffiliateButton affKey="nordvpn" label="Voir NordVPN" variant="primary" />
        </div>
      </div>

      {/* DIFFÉRENCE */}
      <H2 id="difference">eSIM ou VPN : la différence en une phrase</H2>
      <p>
        Ce ne sont pas deux options concurrentes, mais deux outils <strong>complémentaires</strong>{' '}
        :
      </p>
      <ul>
        <li>
          l’<strong>eSIM</strong> te <em>connecte</em> à Internet sans frais d’itinérance ;
        </li>
        <li>
          le <strong>VPN</strong> <em>sécurise</em> cette connexion et te <em>redonne accès</em> à
          tes services canadiens.
        </li>
      </ul>
      <p>
        L’idéal en voyage : l’eSIM pour ne jamais être déconnecté, le VPN pour être protégé et
        rester chez toi, où que tu sois.
      </p>

      {/* INSTALLER */}
      <H2 id="installer">À installer avant de partir (pas à l’aéroport)</H2>
      <ul>
        <li>
          vérifier que ton téléphone est <strong>compatible eSIM</strong> et déverrouillé ;
        </li>
        <li>
          <strong>acheter et installer ton eSIM</strong> à la maison (elle s’active à l’arrivée) ;
        </li>
        <li>
          <strong>installer et tester ton VPN</strong> chez toi, en te connectant une fois pour
          confirmer que ça marche ;
        </li>
        <li>
          noter comment <strong>désactiver les données</strong> de ta SIM canadienne pour éviter
          tout frais accidentel.
        </li>
      </ul>
      <p>
        Dix minutes de préparation à la maison t’évitent le stress à l’arrivée. C’est le genre de
        détail qui distingue un voyage serein d’un début de séjour compliqué.
      </p>

      {/* FAQ */}
      <H2 id="faq">FAQ – eSIM &amp; VPN en voyage</H2>

      <H3>Ai-je besoin d’une eSIM si l’aéroport et l’hôtel ont le wifi ?</H3>
      <p>
        Le wifi public est souvent lent, mal sécurisé ou capricieux, et il te lâche justement quand
        tu en as le plus besoin — à l’arrivée, pour joindre ton transfert. Une eSIM te connecte
        partout, tout le temps. Le combo idéal : eSIM le jour, wifi de l’hôtel pour la vidéo le
        soir.
      </p>

      <H3>Quelle est la différence entre eSIM et VPN ?</H3>
      <p>
        L’eSIM te donne l’accès à Internet sans frais d’itinérance ; le VPN sécurise cette connexion
        et te redonne accès à tes services canadiens (Tou.tv, banque, etc.). Ils sont
        complémentaires.
      </p>

      <H3>Le VPN est-il vraiment utile ou c’est du marketing ?</H3>
      <p>
        Il est utile sur deux plans concrets : la sécurité sur les wifis publics (banque, mots de
        passe) et l’accès à tes contenus et services canadiens depuis l’étranger. Ce ne sont pas des
        promesses vagues, mais des situations que tu rencontres à chaque voyage.
      </p>

      <H3>Faut-il tout installer avant de partir ?</H3>
      <p>
        Oui. Installe et teste le VPN à la maison, achète et installe l’eSIM avant le départ (elle
        s’active à l’arrivée). Tu arrives connecté et protégé, sans chercher de réseau à l’aéroport.
      </p>

      {/* RÉCAP */}
      <H2>
        Continuer avec <BrandName />
      </H2>
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
          💳 <Link href="/blog/argent-cartes-voyage">Payer malin en voyage sans frais</Link>
        </li>
      </ul>
    </DestinationArticleTemplate>
  );
}
