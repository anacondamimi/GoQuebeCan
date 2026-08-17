// app/blog/reserver-voyage-sud-soi-meme/page.tsx
import BlogArticleReserverVoyageSud from '@/components/blogpost/BlogArticleReserverVoyageSud';
import { buildMetadata2025 } from '@/lib/seo/buildMetadata2025';
import { buildBreadcrumbLd } from '@/lib/seo/buildBreadcrumbLd';
import { buildFaqLd } from '@/lib/seo/buildFaqLd';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';
import H1 from '@/components/typography/H1';

export const metadata = buildMetadata2025({
  title: 'Réserver son voyage dans le Sud soi-même : la méthode complète (Québec) | GoQuébeCAN',
  description:
    'Vol, hébergement, transferts, argent, assurance, connexion : l’ordre exact pour organiser son voyage dans le Sud sans agence, avec nos chiffres réels d’un voyage au Yucatán. Guide méthode pour Québécois.',
  canonical: '/blog/reserver-voyage-sud-soi-meme',
  image: '/images/blog/reserver-voyage-sud.avif',
  keywords: [
    'réserver voyage Sud soi-même',
    'organiser voyage Mexique sans agence',
    'voyage indépendant Sud',
    'planifier voyage soleil Québec',
    'vol hébergement séparé',
    'budget voyage Yucatán',
    'méthode réservation voyage',
    'voyage sans tout-inclus',
    'GoQuébeCAN',
  ],
  type: 'article',
});

const breadcrumbLd = buildBreadcrumbLd([
  { name: 'Accueil', item: '/' },
  { name: 'Blog', item: '/blog' },
  { name: 'Réserver son voyage Sud soi-même', item: '/blog/reserver-voyage-sud-soi-meme' },
]);

const faqLd = buildFaqLd([
  {
    question: 'Dans quel ordre réserver son voyage dans le Sud soi-même ?',
    answer:
      'Le vol d’abord (il fixe les dates et le budget), puis les premières nuits d’hébergement, le transfert aéroport, la préparation des cartes de paiement, l’assurance voyage et l’eSIM — tous avant le départ. Le reste (autres nuits, activités, restos) se réserve au fil de l’eau une fois sur place.',
  },
  {
    question: 'Est-ce vraiment moins cher que le tout-inclus ?',
    answer:
      'Souvent oui, surtout en dissociant le vol de l’hébergement et en cuisinant une partie des repas. Notre voyage au Yucatán illustre des économies importantes : vol moins cher au départ d’Ottawa, appartement avec cuisine, transports locaux (colectivo, bus ADO) et repas locaux abordables. Le tout-inclus reste plus simple, mais l’indépendant offre plus de liberté et souvent un meilleur prix.',
  },
  {
    question: 'Faut-il tout réserver à l’avance ?',
    answer:
      'Non. On réserve à l’avance ce qui est critique (vol, premières nuits, transfert, assurance, eSIM) et on garde de la flexibilité pour les autres nuits, les activités et les restaurants. Cette souplesse est justement l’un des grands avantages du voyage organisé soi-même.',
  },
  {
    question: 'Comment éviter les frais de change et de retrait à l’étranger ?',
    answer:
      'En combinant une carte sans frais de conversion (comme EQ Bank) pour les retraits et le quotidien, et une carte à avantages voyage pour les gros achats. Il faut aussi toujours payer en devise locale plutôt qu’en dollars au terminal, et comparer les distributeurs car certaines banques prennent de gros frais.',
  },
  {
    question: 'Quelle assurance voyage prendre, et attention à la RAMQ ?',
    answer:
      'Une assurance couvrant les soins médicaux d’urgence et le rapatriement est essentielle. Pour les longs séjours (snowbirds), attention : au-delà d’une certaine durée d’absence, on peut perdre sa couverture de la RAMQ. Il faut vérifier la durée maximale et choisir une police adaptée à la longueur du voyage.',
  },
  {
    question: 'Peut-on organiser un voyage dans le Sud sans louer de voiture ?',
    answer:
      'Oui. Au Yucatán par exemple, on s’est déplacés uniquement en colectivo (fourgonnettes partagées), en bus ADO pour les longues distances, et en transfert privé depuis l’aéroport. C’est économique, reposant et authentique. Le choix d’un hébergement bien situé (près d’un terminal de bus) facilite tout.',
  },
]);

export default function ReserverVoyageSudPage() {
  return (
    <>
      <HeadExtras
        articlePublishedTime="2026-08-01T09:00:00-05:00"
        articleModifiedTime="2026-08-01T09:00:00-05:00"
      />

      <JsonLd data={breadcrumbLd} />
      {faqLd ? <JsonLd data={faqLd} /> : null}

      <H1 className="sr-only">
        Réserver son voyage dans le Sud soi-même : la méthode complète (Québec)
      </H1>

      <BlogArticleReserverVoyageSud />
    </>
  );
}
