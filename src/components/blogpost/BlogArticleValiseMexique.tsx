'use client';
import Link from 'next/link';

import H2 from '@/components/typography/H2';
import BrandName from '@/components/brand/BrandName';
import DestinationArticleTemplate from '@/components/blog/DestinationArticleTemplate';
import AffiliateDisclosure from '@/components/affiliate/AffiliateDisclosure';

import ValiseProductCard from '@/components/valise/ValiseProductCard';
import { PRODUCTS, CATEGORIES, SAISON } from '@/data/valiseProducts';

/**
 * ARTICLE VALISE MEXIQUE — page produit affiliée, données-pilotées.
 * ⚠️ Le contenu produits vit dans src/data/valiseProducts.ts — c'est LÀ qu'on modifie.
 *    Cet article ne fait qu'afficher joliment ces données par catégorie.
 * ⚠️ SEO dans app/blog/valise-mexique/page.tsx.
 */

export default function BlogArticleValiseMexique() {
  return (
    <DestinationArticleTemplate
      slug="valise-mexique"
      title="Quoi mettre dans sa valise pour le Mexique : la check-list complète (par des Québécois)"
      subtitle="Soleil, cénotes, snorkeling, connexion : notre liste vécue des indispensables à emporter au Yucatán, avec nos astuces pour ne rien oublier."
      breadcrumbs={[
        { label: 'Accueil', href: '/' },
        { label: 'Blog', href: '/blog' },
        { label: 'Valise pour le Mexique' },
      ]}
      hero={{
        eyebrow: 'Valise • Mexique • Check-list • Vécu',
        caption: 'Bien préparer sa valise pour le Yucatán',
      }}
      toc={CATEGORIES.map((c) => ({ id: c.id, label: c.label }))}
      showNearbyDestinations={false}
    >
      <div className="not-prose mb-8">
        <AffiliateDisclosure />
      </div>

      {/* INTRO */}
      <p>
        Préparer sa valise pour le Mexique, c’est simple quand on sait quoi prioriser. Après notre
        voyage au Yucatán (Akumal, Tulum, Valladolid), on a affiné notre liste des vrais
        indispensables — ce qui nous a servi, ce qu’on referait, et les petits oublis à éviter.
        Voici notre check-list, organisée par thème, avec un badge de priorité pour chaque objet.
      </p>

      {/* BANDEAU SAISON (modifiable dans valiseProducts.ts) */}
      {SAISON.actif ? (
        <div className="not-prose my-6 rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">🗓️ Note de saison</p>
          <p className="mt-1">{SAISON.texte}</p>
        </div>
      ) : null}

      {/* SECTIONS PAR CATÉGORIE (générées automatiquement depuis les données) */}
      {CATEGORIES.map((cat) => {
        const items = PRODUCTS.filter((p) => p.category === cat.id && p.active);
        if (items.length === 0) return null;
        return (
          <section key={cat.id} className="mt-10">
            <H2 id={cat.id}>
              {cat.emoji} {cat.label}
            </H2>
            <div className="not-prose mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <ValiseProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        );
      })}

      {/* CONSEIL FINAL */}
      <H2 className="mt-10">Notre conseil : voyage léger</H2>
      <p>
        Au Yucatán, on a tout fait sac au dos, en colectivo et en bus ADO. La chaleur et les
        déplacements récompensent ceux qui voyagent léger. Concentre-toi sur les{' '}
        <strong>essentiels</strong> (badge vert), ajoute quelques objets <strong>utiles</strong>, et
        laisse les <strong>optionnels</strong> si ta valise déborde — sur place, on trouve de tout
        dans les supermarchés et pharmacies.
      </p>

      {/* RÉCAP LIENS INTERNES */}
      <H2 className="mt-10">
        Continuer avec <BrandName />
      </H2>
      <ul>
        <li>
          🌴 <Link href="/blog/mexique-yucatan">Notre guide du Yucatán sans voiture</Link>
        </li>
        <li>
          🧭{' '}
          <Link href="/blog/reserver-voyage-sud-soi-meme">
            Réserver son voyage dans le Sud soi-même
          </Link>
        </li>
        <li>
          💳 <Link href="/blog/argent-cartes-voyage">Payer malin en voyage sans frais</Link>
        </li>
        <li>
          📶 <Link href="/blog/vpn-esim-voyage">eSIM &amp; VPN : rester connecté</Link>
        </li>
      </ul>
    </DestinationArticleTemplate>
  );
}
