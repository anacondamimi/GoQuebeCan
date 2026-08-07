// app/blog/valise-mexique/page.tsx
import BlogArticleValiseMexique from '@/components/blogpost/BlogArticleValiseMexique';
import { buildMetadata2025 } from '@/lib/seo/buildMetadata2025';
import { buildBreadcrumbLd } from '@/lib/seo/buildBreadcrumbLd';
import { buildFaqLd } from '@/lib/seo/buildFaqLd';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';

export const metadata = buildMetadata2025({
  title: 'Quoi mettre dans sa valise pour le Mexique : check-list complète (Québec) | GoQuébeCAN',
  description:
    'La check-list vécue des indispensables pour le Mexique (Yucatán) : crème solaire, t-shirt UV, anti-moustiques, eSIM, trousse de soins et plus. Organisée par priorité, avec nos astuces de voyageurs québécois.',
  canonical: '/blog/valise-mexique',
  image: '/images/destinations/valise-mexique.avif',
  keywords: [
    'valise Mexique',
    'quoi apporter Mexique',
    'check-list voyage Mexique',
    'que mettre dans sa valise Yucatán',
    'indispensables voyage Cancún',
    'préparer valise sud',
    'liste bagage Mexique',
    'crème solaire cénote',
    'eSIM Mexique',
    'GoQuébeCAN',
  ],
  type: 'article',
});

const breadcrumbLd = buildBreadcrumbLd([
  { name: 'Accueil', item: '/' },
  { name: 'Blog', item: '/blog' },
  { name: 'Valise pour le Mexique', item: '/blog/valise-mexique' },
]);

const faqLd = buildFaqLd([
  {
    question: 'Quels sont les indispensables à mettre dans sa valise pour le Mexique ?',
    answer:
      'Les essentiels sont la crème solaire (idéalement « reef safe » pour les cénotes), un chapeau, des lunettes de soleil, un anti-moustiques, une petite trousse de premiers soins, une eSIM pour rester connecté et une assurance voyage. On ajoute selon ses activités un t-shirt UV pour le snorkeling, un sac étanche et une batterie externe.',
  },
  {
    question: 'Faut-il apporter un adaptateur de prise électrique au Mexique ?',
    answer:
      'Le Mexique utilise des prises de type A et B, les mêmes qu’au Canada. La plupart des voyageurs québécois n’ont donc pas besoin d’adaptateur. Il vaut mieux vérifier ses appareils avant de partir, mais dans la majorité des cas, tes chargeurs canadiens fonctionneront directement.',
  },
  {
    question: 'Quelle crème solaire choisir pour les cénotes ?',
    answer:
      'Pour les cénotes et la baignade avec la faune marine (comme les tortues à Akumal), privilégie une crème solaire « reef safe », sans oxybenzone ni octinoxate, afin de protéger les coraux et les écosystèmes. Certains sites l’exigent même pour pouvoir se baigner.',
  },
  {
    question: 'Une eSIM est-elle utile pour un voyage au Mexique ?',
    answer:
      'Oui. Une eSIM te permet d’être connecté dès l’atterrissage, sans frais d’itinérance : pratique pour joindre ton transfert privé, suivre ta carte, réserver des excursions ou rester en contact. Il suffit de l’installer avant de partir ; elle s’active à l’arrivée.',
  },
  {
    question: 'Comment voyager léger pour le Yucatán ?',
    answer:
      'Concentre-toi sur les essentiels et privilégie des vêtements légers et respirants adaptés à la chaleur. Un petit sac à dos de jour suffit pour les excursions. Sur place, on trouve de tout dans les supermarchés et pharmacies, donc inutile de surcharger sa valise : mieux vaut garder de la place, surtout si on se déplace en colectivo et en bus.',
  },
]);

export default function ValiseMexiquePage() {
  return (
    <>
      <HeadExtras
        articlePublishedTime="2026-08-01T09:00:00-05:00"
        articleModifiedTime="2026-08-01T09:00:00-05:00"
      />

      <JsonLd data={breadcrumbLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}

      <BlogArticleValiseMexique />
    </>
  );
}
