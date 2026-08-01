// app/blog/argent-cartes-voyage/page.tsx
import BlogArticleArgentCartesVoyage from '@/components/blogpost/BlogArticleArgentCartesVoyage';
import { buildMetadata2025 } from '@/lib/seo/buildMetadata2025';
import { buildBreadcrumbLd } from '@/lib/seo/buildBreadcrumbLd';
import { buildFaqLd } from '@/lib/seo/buildFaqLd';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';

export const metadata = buildMetadata2025({
  title: 'Argent et cartes en voyage : payer sans frais de change (guide Québécois) | GoQuébeCAN',
  description:
    'Éviter les frais de change et de retrait en voyage : notre stratégie à deux cartes, où retirer, pourquoi toujours payer en devise locale. Vécu réel d’un voyage au Mexique, pour voyageurs québécois.',
  canonical: '/blog/argent-cartes-voyage',
  image: '/images/destinations/billets-pesos-mexicains-voyage.avif',
  keywords: [
    'carte sans frais de change',
    'frais de change voyage',
    'payer en voyage sans frais',
    'retirer argent étranger',
    'carte voyage Québec',
    'EQ Bank voyage',
    'payer en devise locale',
    'argent voyage Mexique',
    'conversion dynamique devise',
    'GoQuébeCAN',
  ],
  type: 'article',
});

const breadcrumbLd = buildBreadcrumbLd([
  { name: 'Accueil', item: '/' },
  { name: 'Blog', item: '/blog' },
  { name: 'Argent & cartes en voyage', item: '/blog/argent-cartes-voyage' },
]);

const faqLd = buildFaqLd([
  {
    question: 'Comment éviter les frais de change en voyage ?',
    answer:
      'En utilisant une carte sans frais de conversion (comme certaines cartes prépayées ou cartes de crédit spécialisées) pour les dépenses à l’étranger, plutôt qu’une carte classique qui ajoute environ 2,5 % sur chaque achat en devise étrangère. Il faut aussi toujours payer en devise locale plutôt qu’en dollars canadiens au terminal.',
  },
  {
    question: 'Pourquoi faut-il payer en devise locale et pas en dollars ?',
    answer:
      'Quand un terminal propose de te débiter en dollars canadiens plutôt qu’en devise locale, il applique une conversion dynamique de devise, avec un taux presque toujours défavorable. En choisissant la devise locale (pesos, par exemple), c’est ta banque qui convertit, à un meilleur taux — surtout si ta carte n’a pas de frais de change.',
  },
  {
    question: 'Vaut-il mieux payer par carte ou en comptant à l’étranger ?',
    answer:
      'Les deux, selon l’usage. La carte sans frais de change est idéale partout où elle est acceptée. Mais une partie de l’économie locale (transports partagés, marchés, petits commerces, pourboires) fonctionne au comptant. Le mieux est de garder une réserve de devise locale et de payer par carte ailleurs.',
  },
  {
    question: 'Où retirer de l’argent pour payer le moins de frais ?',
    answer:
      'À un guichet automatique sur place plutôt qu’au comptoir de change de l’aéroport (mauvais taux). Il faut comparer les banques locales, car les frais de retrait varient beaucoup d’une enseigne à l’autre, et refuser la conversion en dollars proposée par le guichet. Utiliser une carte sans frais de change réduit encore le coût.',
  },
  {
    question: 'Faut-il une carte à points pour voyager ?',
    answer:
      'Ce n’est pas obligatoire, mais une carte à avantages voyage peut être rentable sur les grosses dépenses (vol, hôtel) que tu ferais de toute façon : primes de bienvenue, bagages inclus, accès aux salons d’aéroport. L’idéal est de combiner une carte à points pour les gros achats et une carte sans frais de change pour le quotidien à l’étranger.',
  },
]);

export default function ArgentCartesVoyagePage() {
  return (
    <>
      <HeadExtras
        articlePublishedTime="2026-08-01T09:00:00-05:00"
        articleModifiedTime="2026-08-01T09:00:00-05:00"
      />

      <JsonLd data={breadcrumbLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}

      <BlogArticleArgentCartesVoyage />
    </>
  );
}
