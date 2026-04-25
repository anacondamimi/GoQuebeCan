import React from 'react';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';
import BrandName from '@/components/brand/BrandName';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ConclusionLinks } from '@/components/TravelContentKit';

const BRAND_NAME = 'GoQuébeCAN';
export const metadata: Metadata = {
  title:
    'Location de VR au Canada 2025 — Comparatif complet (Outdoorsy, RVezy, Authentik, Fraserway, CanaDream)',
  description:
    'Le guide 2025 le plus utile sur la location de VR au Canada : comparatif détaillé d’Outdoorsy, RVezy, Authentik Canada, Fraserway et CanaDream, villes de départ, tailles de VR, options one-way, assurance, et bons plans relocations dès 1 $/jour. Liens pratiques vers itinéraires, vidéos et producteurs du Québec.',
  alternates: { canonical: 'https://www.goquebecan.com/blog/location-vr' },
  openGraph: {
    title: 'Location de VR au Canada 2025 — Comparatif complet',
    description:
      'Outdoorsy vs RVezy vs Authentik Canada vs Fraserway vs CanaDream. Le comparatif 2025 le plus utile : villes de prise en charge, tailles de VR, assurance, one-way, relocations 1 $/jour.',
    url: 'https://www.goquebecan.com/blog/location-vr',
    siteName: BRAND_NAME,
    type: 'article',
  },
  robots: { index: true, follow: true },
};

const AFF_OUTDOORSY = 'https://www.outdoorsy.com/?utm_source=aff_goquebecan'; // ← remplace par ton lien
const AFF_RVEZY = 'https://www.rvezy.com/?utm_source=aff_goquebecan'; // ← remplace par ton lien
const AFF_AUTHENTIK = 'https://www.authentikcanada.com/?utm_source=aff_goquebecan'; // ← remplace par ton lien
const INFO_IMOOVA = 'https://www.imoova.com/'; // informatif (si tu as un lien affilié, remplace)

export default function Page() {
  return (
    <article className="prose prose-lg mx-auto px-4 py-8 lg:prose-xl md:px-8">
      {/* H1 principal */}
      <H1 className="mb-4">
        Location de VR au Canada en 2025 — Le comparatif <em>utile</em> (Outdoorsy, RVezy,
        Authentik, Fraserway, CanaDream)
      </H1>

      <p>
        Voyager en véhicule récréatif (VR, motorisé ou campervan) reste l’une des façons les plus
        libres et les plus intensément <strong>canadiennes</strong> de parcourir nos régions. En
        2025, l’offre a explosé: plateformes <em>peer-to-peer</em> (P2P) comme{' '}
        <strong>Outdoorsy</strong> et <strong>RVezy</strong>, comparateurs comme{' '}
        <strong>Authentik Canada</strong>, et loueurs historiques (Fraserway, CanaDream). Ce guide
        signé <BrandName /> a un objectif simple: te donner une vision claire, concrète et orientée
        résultats — avec les <Link href="/planificateur">outils pour planifier ton itinéraire</Link>
        , des <Link href="/videos">vidéos pour t’inspirer</Link> et la découverte des{' '}
        <Link href="/producteurs">producteurs du Québec</Link> pour transformer ton road trip en
        voyage gourmand. Et si tu hésites entre nature et confort: compare nos guides{' '}
        <Link href="/blog/voyage-camping">voyage camping</Link>,{' '}
        <Link href="/blog/voyage-hotel">voyage à l’hôtel</Link> et{' '}
        <Link href="/blog/voyage-voiture">voyage en voiture</Link> pour trouver ton style
        d’aventure.
      </p>

      <H2>Pourquoi louer un VR pour voyager au Canada?</H2>
      <p>
        Le VR, c’est l’équilibre entre <strong>liberté</strong>, <strong>confort</strong> et{' '}
        <strong>optimisation du budget</strong>. Dormir au pied des Rocheuses, cuisiner un déjeuner
        chaud face au fleuve Saint-Laurent, allonger la sieste parce que le soleil tape sur la
        Gaspésie: tout devient simple. En famille, en couple ou entre amis, tu maîtrises ton rythme.
        Et pour ceux qui aiment tout structurer, notre{' '}
        <Link href="/planificateur">planificateur d’itinéraire</Link> permet d’organiser tes étapes,
        calculer distances/durées et exporter l’essentiel avant le départ.
      </p>

      <H2>Les plateformes incontournables 2025</H2>

      <H3>Outdoorsy — le géant international</H3>
      <p>
        <strong>Outdoorsy</strong> est une marketplace internationale P2P: une immense sélection de
        véhicules (du van 2 pers. au classe A 8 pers.), une assurance intégrée et une expérience
        soignée. C’est la plateforme la plus <em>visible</em> au niveau mondial, ce qui t’assure un
        large choix près des grandes villes — souvent Toronto, Montréal, Vancouver, Calgary — selon
        la localisation des propriétaires.
      </p>
      <p>
        👉{' '}
        <a href={AFF_OUTDOORSY} target="_blank" rel="nofollow sponsored noopener noreferrer">
          Réserver un VR sur Outdoorsy (lien affilié)
        </a>
      </p>

      <H3>RVezy — la communauté 100 % canadienne</H3>
      <p>
        <strong>RVezy</strong> est née au Canada et s’adresse d’abord au marché canadien. Tu y
        trouveras souvent des prix compétitifs et des propriétaires proches des régions moins
        couvertes par les acteurs internationaux. Comme sur Outdoorsy, la variété dépend de l’offre
        locale; tu peux tomber sur <em>la</em> perle rare à deux rues de chez toi.
      </p>
      <p>
        👉{' '}
        <a href={AFF_RVEZY} target="_blank" rel="nofollow sponsored noopener noreferrer">
          Explorer les offres RVezy (lien affilié)
        </a>
      </p>

      <H3>Authentik Canada — comparer en un clic</H3>
      <p>
        <strong>Authentik Canada</strong> n’est pas P2P: c’est un <em>comparateur</em> qui te permet
        de visualiser, sur une même interface, l’offre de loueurs historiques (Fraserway, CanaDream,
        Cruise Canada…) avec des villes de prise en charge claires et des conditions standardisées.
        Si tu sais déjà que ton itinéraire passe par des grandes bases (Toronto, Vancouver, Calgary,
        Halifax, Whitehorse), un comparateur te fait <em>gagner du temps</em> et parfois de
        l’argent.
      </p>
      <p>
        👉{' '}
        <a href={AFF_AUTHENTIK} target="_blank" rel="nofollow sponsored noopener noreferrer">
          Comparer les offres VR avec Authentik Canada (lien affilié)
        </a>
      </p>

      <H2>Autres acteurs à connaître</H2>
      <ul>
        <li>
          <strong>Fraserway RV</strong> — Loueur historique, <em>bases fixes</em> bien réparties
          (Toronto, Calgary, Edmonton, Vancouver, Halifax, Whitehorse). Idéal pour les itinéraires
          structurés, avec options d’<em>aller simple</em> sur certaines routes.
        </li>
        <li>
          <strong>CanaDream</strong> — Grande flotte, réputation solide, villes majeures et
          expérience fluide; une valeur sûre si tu veux une logistique carrée.
        </li>
        <li>
          <strong>Roadsurfer</strong> — Spécialiste campervans, postes à Vancouver, Calgary,
          Montréal selon saison; vibe jeune, format compact.
        </li>
      </ul>

      <H2>Comparatif utile 2025 — tailles, villes de prise en charge et flexibilité</H2>
      <p>
        Voici un tableau qui ne joue pas à cache-cache: il met en face des critères concrets
        (tailles de VR, villes de départ <em>réelles</em>, flexibilité one-way, nature du service).
        Assure-toi d’aligner ce choix avec ton itinéraire (pense à le tracer dans le{' '}
        <Link href="/planificateur">planificateur</Link>).
      </p>

      <div className="not-prose overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left">Critère</th>
              <th className="p-3 text-left">Outdoorsy (P2P)</th>
              <th className="p-3 text-left">RVezy (P2P)</th>
              <th className="p-3 text-left">Authentik (Comparateur)</th>
              <th className="p-3 text-left">Fraserway (Loueur)</th>
              <th className="p-3 text-left">CanaDream (Loueur)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-3 font-semibold">Tailles disponibles</td>
              <td className="p-3">Van 2 pers → Classe A ~8 pers</td>
              <td className="p-3">Van/roulotte → Classe C ~7 pers</td>
              <td className="p-3">Van → Classe C/A (selon loueur)</td>
              <td className="p-3">Classe B/C/A (familles 4–8)</td>
              <td className="p-3">Classe B/C (familles 4–6)</td>
            </tr>
            <tr className="border-t">
              <td className="p-3 font-semibold">Villes de prise en charge</td>
              <td className="p-3">
                Selon propriétaires — forte présence à{' '}
                <strong>Toronto, Montréal, Vancouver, Calgary</strong>
              </td>
              <td className="p-3">
                Selon propriétaires — présence à <strong>Toronto, Ottawa, Québec, Vancouver</strong>
              </td>
              <td className="p-3">
                <strong>Toronto, Montréal, Vancouver, Calgary, Halifax, Whitehorse</strong> (via
                loueurs)
              </td>
              <td className="p-3">
                <strong>Toronto, Calgary, Edmonton, Vancouver, Halifax, Whitehorse</strong>
              </td>
              <td className="p-3">
                <strong>Toronto, Montréal, Vancouver, Calgary, Halifax, Whitehorse</strong>
              </td>
            </tr>
            <tr className="border-t">
              <td className="p-3 font-semibold">Aller simple (one-way)</td>
              <td className="p-3">Rare, à négocier au cas par cas</td>
              <td className="p-3">Rare, à négocier au cas par cas</td>
              <td className="p-3">Oui, selon loueur/route (souvent payant)</td>
              <td className="p-3">Oui, sur routes définies (frais variables)</td>
              <td className="p-3">Oui, sur routes définies (frais variables)</td>
            </tr>
            <tr className="border-t">
              <td className="p-3 font-semibold">Assurance</td>
              <td className="p-3">Incluse via plateforme</td>
              <td className="p-3">Incluse via plateforme</td>
              <td className="p-3">Selon loueur (standardisée)</td>
              <td className="p-3">Incluse + options</td>
              <td className="p-3">Incluse + options</td>
            </tr>
            <tr className="border-t">
              <td className="p-3 font-semibold">Profil idéal</td>
              <td className="p-3">Choix maximal, flexibilité, villes majeures</td>
              <td className="p-3">Budget local, proximité, coups de cœur</td>
              <td className="p-3">Vue d’ensemble, optimisation logistique</td>
              <td className="p-3">Itinéraires structurés, familles</td>
              <td className="p-3">Itinéraires structurés, couples/familles</td>
            </tr>
          </tbody>
        </table>
      </div>

      <H2>Le critère qui change tout: la ville de prise en charge</H2>
      <p>
        Tu peux trouver le meilleur prix du monde — si tu dois traverser la province pour récupérer
        le VR, l’économie s’évapore. Commence donc par <strong>dessiner ton itinéraire</strong> dans
        le{' '}
        <Link href="/planificateur">
          planificateur <BrandName />
        </Link>
        : départ, étapes, arrivée. Puis choisis la plateforme qui <em>colle au plus près</em> de ce
        tracé. Les loueurs historiques (Fraserway, CanaDream) brillent par leurs{' '}
        <strong>bases fixes</strong>; les marketplaces (Outdoorsy, RVezy) excellent là où l’offre
        locale est dense (grandes villes).
      </p>
      <p>
        Astuce: si tu rêves d’un <em>aller simple</em> (p. ex. Vancouver → Calgary), vérifie d’abord
        la faisabilité et les frais — sur comparateur ou chez les loueurs historiques — avant de
        verrouiller tes nuits de camping (ou ton{' '}
        <Link href="/blog/voyage-hotel">mix avec l’hôtel</Link> si tu alternes confort et route).
      </p>

      <H2>Bons plans 💸 — Les “relocations” dès 1 $/jour</H2>
      <p>
        Certaines entreprises doivent <strong>rapatrier</strong> leurs véhicules d’une ville à
        l’autre. Plutôt que de payer un chauffeur, elles proposent des offres symboliques — parfois{' '}
        <strong>1 $/jour</strong> — pour ramener le VR! Le deal: un <strong>trajet imposé</strong>,
        une <strong>date limite</strong> et peu de flexibilité. Pour un road trip <em>spontané</em>{' '}
        et
        <em>budget-friendly</em>, c’est un bonheur.
      </p>
      <ul>
        <li>
          👉 Consulte régulièrement{' '}
          <a href={INFO_IMOOVA} target="_blank" rel="noopener noreferrer">
            Imoova
          </a>{' '}
          (si tu as un itinéraire compatible, fonce).
        </li>
        <li>
          Demande aussi chez les loueurs (Fraserway, CanaDream) — certaines relocations ne figurent
          pas longtemps en ligne.
        </li>
      </ul>
      <p>
        Et si tu attrapes la bonne fenêtre, pense à intégrer quelques{' '}
        <strong>étapes gourmandes</strong>: utilise la carte des{' '}
        <Link href="/producteurs">producteurs du Québec</Link> pour transformer un simple transfert
        en voyage de saveurs.
      </p>

      <H2>Budget & vraie vie: combien prévoir?</H2>
      <p>
        En haute saison, compte généralement <strong>120–240 $ CAD/nuit</strong> selon taille, âge
        du VR et région. Ajoute l’essence, les campings (ou sites gratuits quand c’est permis), et
        une marge pour les activités. Côté repas, le VR te fait économiser: une épicerie
        intelligente vaut bien des restaurants. Pour optimiser, consulte nos guides{' '}
        <Link href="/blog/voyage-camping">voyage camping</Link> et{' '}
        <Link href="/blog/voyage-voiture">voyage en voiture</Link> (checklists, erreurs à éviter,
        FAQ).
      </p>

      <H2>Choisir en confiance: quel site pour quel profil?</H2>
      <ul>
        <li>
          <strong>Tu veux le choix maximal</strong> (formats, budgets, villes majeures): tente{' '}
          <a href={AFF_OUTDOORSY} target="_blank" rel="nofollow sponsored noopener noreferrer">
            Outdoorsy
          </a>{' '}
          d’abord.
        </li>
        <li>
          <strong>Tu privilégies le local/budget</strong> avec un coup de cœur près de chez toi:
          regarde{' '}
          <a href={AFF_RVEZY} target="_blank" rel="nofollow sponsored noopener noreferrer">
            RVezy
          </a>
          .
        </li>
        <li>
          <strong>Tu veux optimiser logistique & one-way</strong>: passe par{' '}
          <a href={AFF_AUTHENTIK} target="_blank" rel="nofollow sponsored noopener noreferrer">
            Authentik Canada
          </a>{' '}
          ou contacte Fraserway/CanaDream.
        </li>
      </ul>

      <H2>FAQ — Réponses rapides pour 2025</H2>
      <details>
        <summary>Quelle est la meilleure plateforme pour louer un VR au Canada?</summary>
        <p>
          Il n’y a pas de “meilleure” absolue: <strong>Outdoorsy</strong> pour la variété et la
          visibilité, <strong>RVezy</strong> pour le local/budget, <strong>Authentik</strong> pour
          comparer plusieurs loueurs historiques. Trace d’abord ton trajet dans le{' '}
          <Link href="/planificateur">planificateur</Link>, puis choisis la plateforme qui colle aux
          villes de départ.
        </p>
      </details>
      <details>
        <summary>Puis-je récupérer un VR ailleurs qu’à Toronto ou Vancouver?</summary>
        <p>
          Oui! Les loueurs ont des bases à <strong>Calgary, Edmonton, Halifax, Whitehorse</strong>,
          et les marketplaces couvrent aussi <strong>Montréal, Ottawa, Québec</strong> selon l’offre
          des propriétaires.
        </p>
      </details>
      <details>
        <summary>Les allers simples (one-way) sont-ils possibles?</summary>
        <p>
          Chez les loueurs historiques: souvent oui, sur routes définies et avec frais. En P2P: plus
          rare, à négocier. Vérifie sur{' '}
          <a href={AFF_OUTDOORSY} target="_blank" rel="nofollow sponsored noopener noreferrer">
            Authentik
          </a>{' '}
          et contacte Fraserway/CanaDream si tu cibles une route précise.
        </p>
      </details>
      <details>
        <summary>Existe-t-il des locations vraiment pas chères?</summary>
        <p>
          Les <strong>relocations</strong>! Parfois <strong>1 $/jour</strong>, mais trajet et dates
          imposés. Regarde{' '}
          <a href={AFF_RVEZY} target="_blank" rel="nofollow sponsored noopener noreferrer">
            Imoova
          </a>{' '}
          et demande aux loueurs.
        </p>
      </details>

      <H2>Conclusion — Passe à l’action (et profite de la route)</H2>
      <p>
        Ce qui compte, c’est l’<strong>alignement</strong> entre ton itinéraire et la logistique
        réelle. Commence par le{' '}
        <Link href="/planificateur">
          planificateur d’itinéraire <BrandName />
        </Link>
        , inspire-toi avec nos <Link href="/videos">vidéos des destinations</Link>, et ponctue ton
        voyage de rencontres chez les <Link href="/producteurs">producteurs du Québec</Link>. Selon
        ton profil, teste:
      </p>
      <ul>
        <li>
          🚐{' '}
          <a href={AFF_OUTDOORSY} target="_blank" rel="nofollow sponsored noopener noreferrer">
            Réserver sur Outdoorsy
          </a>{' '}
          — choix maximal et simplicité.
        </li>
        <li>
          🍁{' '}
          <a href={AFF_RVEZY} target="_blank" rel="nofollow sponsored noopener noreferrer">
            Explorer RVezy
          </a>{' '}
          — proximité, budget, esprit canadien.
        </li>
        <li>
          🔍{' '}
          <a href={AFF_AUTHENTIK} target="_blank" rel="nofollow sponsored noopener noreferrer">
            Comparer sur Authentik Canada
          </a>{' '}
          — logistique optimisée, options one-way.
        </li>
      </ul>

      <ConclusionLinks
        items={[
          { href: '/blog/voyage-camping', label: 'Guide camping 2025' },
          { href: '/blog/voyage-hotel', label: 'Indispensables hôtel 2025' },
          { href: '/blog/voyage-voiture', label: 'Voyage en voiture' },
          { href: '/producteurs', label: 'Découvrire les Producteurs Quebecois' },
          { href: '/videos', label: 'Explorer les joyaux du Quebec' },
          { href: '/planificateur', label: 'Planifier vos vacances ' },
        ]}
      />
      {/* JSON-LD Article + FAQ pour SEO 2025 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline:
              'Location de VR au Canada 2025 — Comparatif complet (Outdoorsy, RVezy, Authentik, Fraserway, CanaDream)',
            author: { '@type': 'Organization', name: 'GoQuébeCan' },
            publisher: { '@type': 'Organization', name: 'GoQuébeCan' },
            mainEntityOfPage: 'https://www.goquebecan.com/blog/location-vr',
            inLanguage: 'fr-CA',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Quelle est la meilleure plateforme pour louer un VR au Canada ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Outdoorsy pour la variété, RVezy pour le local/budget, Authentik pour comparer plusieurs loueurs historiques. Trace d’abord ton trajet dans le planificateur, puis choisis en fonction des villes de départ.',
                },
              },
              {
                '@type': 'Question',
                name: 'Puis-je récupérer un VR ailleurs qu’à Toronto ou Vancouver ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Oui. Les loueurs ont des bases à Calgary, Edmonton, Halifax, Whitehorse, et les marketplaces couvrent également Montréal, Ottawa, Québec selon l’offre.',
                },
              },
              {
                '@type': 'Question',
                name: 'Les allers simples (one-way) sont-ils possibles ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Chez les loueurs historiques, souvent oui sur routes définies et avec frais. En P2P, plus rare et à négocier au cas par cas.',
                },
              },
              {
                '@type': 'Question',
                name: 'Existe-t-il des locations vraiment pas chères ?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Les relocations. Parfois 1 $/jour, mais avec trajet imposé et date limite. Regarde Imoova et demande aux loueurs.',
                },
              },
            ],
          }),
        }}
      />
    </article>
  );
}
