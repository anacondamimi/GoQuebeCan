// app/blog/mexique-yucatan/page.tsx
import BlogArticleMexiqueYucatan from '@/components/blogpost/BlogArticleMexiqueYucatan';
import { buildBlogPageSeo } from '@/lib/seo/buildBlogPageSeo';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';

// =========================
// SEO 2025 — source unique
// =========================
const seo = buildBlogPageSeo({
  metaTitle:
    'Voyage au Mexique (Yucatán) sans voiture : Akumal, Tulum, Valladolid — guide québécois | GoQuébeCAN',
  headline: 'Voyage au Mexique (Yucatán) sans voiture : Akumal, Tulum, Valladolid',
  description:
    'Notre guide vécu du Yucatán en indépendant : Akumal, Tulum et Valladolid en colectivo et bus ADO, sans louer de voiture. Quand partir, sargasses, sécurité, hébergement, argent, cenotes et bons plans pour Québécois.',
  articleDescription:
    'Notre guide vécu du Yucatán en indépendant : Akumal, Tulum et Valladolid en colectivo et bus ADO, sans louer de voiture.',
  canonical: '/blog/mexique-yucatan',
  image: '/images/blog/mexique-yucatan.avif',
  keywords: [
    'voyage Mexique Yucatán',
    'Akumal',
    'Tulum',
    'Valladolid',
    'colectivo Riviera Maya',
    'bus ADO',
    'Yucatán sans voiture',
    'cenotes',
    'voyage Mexique Québécois',
    'sargasses Riviera Maya',
    'GoQuébeCAN Mexique',
  ],
  datePublished: '2026-08-01T09:00:00-05:00',
  dateModified: '2026-08-01T09:00:00-05:00',
  breadcrumb: [
    { name: 'Accueil', item: '/' },
    { name: 'Blog', item: '/blog' },
    { name: 'Mexique — Yucatán sans voiture', item: '/blog/mexique-yucatan' },
  ],
  faq: [
    {
      question: 'Peut-on visiter le Yucatán (Akumal, Tulum, Valladolid) sans louer de voiture ?',
      answer:
        'Oui. On a fait tout le voyage sans voiture : les colectivos (fourgonnettes partagées) relient Playa del Carmen, Akumal et Tulum pour quelques dollars, et les bus ADO, confortables et climatisés, couvrent les plus longues distances comme vers Valladolid. Depuis l’aéroport de Cancún, un transfert privé est le plus simple à l’arrivée.',
    },
    {
      question: 'Qu’est-ce qu’un colectivo et comment ça fonctionne ?',
      answer:
        'Un colectivo est une fourgonnette partagée qui circule sur un trajet fixe et s’arrête à la demande. On paie en pesos comptant au chauffeur, on monte quand il y a de la place, et on descend où on veut. C’est le transport local le plus économique de la Riviera Maya.',
    },
    {
      question: 'Y a-t-il des sargasses (algues) sur les plages du Yucatán ?',
      answer:
        'Les sargasses varient selon la saison et l’endroit. La côte caraïbe (Tulum, Playa del Carmen) peut en recevoir surtout de la fin du printemps à l’été, tandis que des baies protégées comme Akumal sont souvent moins touchées. Vérifie une carte de suivi des sargasses avant le départ et choisis ton secteur en conséquence.',
    },
    {
      question: 'Valladolid vaut-elle une nuit ou plus ?',
      answer:
        'Oui. Valladolid est une charmante ville coloniale au cœur du Yucatán, plus calme et authentique que la côte, idéale comme base pour Chichén Itzá et les cenotes. Y passer au moins une nuit en Airbnb permet de vivre la ville le soir, quand les excursionnistes sont repartis.',
    },
    {
      question: 'Quelle carte utiliser pour payer au Mexique sans frais ?',
      answer:
        'La plupart des cartes de crédit canadiennes ajoutent environ 2,5 % de frais de conversion à l’étranger. Beaucoup de voyageurs combinent une carte sans frais de change pour le quotidien et une carte à points pour les gros achats, gardent du comptant en pesos, et paient toujours en pesos plutôt qu’en dollars au terminal.',
    },
    {
      question: 'Le Yucatán est-il sécuritaire pour les voyageurs québécois ?',
      answer:
        'La péninsule du Yucatán est généralement considérée comme l’une des régions les plus tranquilles du Mexique pour le tourisme. On applique le bon sens habituel, on consulte les avis officiels d’Affaires mondiales Canada avant de partir (ils varient selon les États) et on souscrit une assurance voyage adéquate.',
    },
  ],
});

export const metadata = seo.metadata;

// =========================
// Rendu
// =========================
export default function MexiqueYucatanPage() {
  return (
    <>
      <HeadExtras articlePublishedTime={seo.publishedTime} articleModifiedTime={seo.modifiedTime} />

      <JsonLd data={seo.breadcrumbLd} />
      {seo.faqLd ? <JsonLd data={seo.faqLd} /> : null}
      {seo.articleLd ? <JsonLd data={seo.articleLd} /> : null}

      <BlogArticleMexiqueYucatan />
    </>
  );
}
