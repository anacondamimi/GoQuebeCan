// app/blog/sandbanks/page.tsx
import BlogArticleSandbanks from '@/components/blogpost/BlogArticleSandbanks';
import { buildMetadata2025 } from '@/lib/seo/buildMetadata2025';
import { buildDestinationLd } from '@/lib/seo/buildDestinationLd';
import { buildBreadcrumbLd } from '@/lib/seo/buildBreadcrumbLd';
import { buildHowToLd } from '@/lib/seo/buildHowToLd';
import { buildFaqLd } from '@/lib/seo/buildFaqLd';
import { JsonLd, HeadExtras } from '@/lib/seo/HeadExtras';

// =========================
// SEO 2025 – Metadata
// =========================

export const metadata = buildMetadata2025({
  title: 'Plage de Sandbanks en Ontario : guide familles québécoises 2025 | GoQuébeCAN',
  description:
    'Sable blond, dunes et eau turquoise : découvrez comment organiser une escapade en famille à la plage de Sandbanks en Ontario. Accès, conseils parents, hébergements, producteurs locaux et idées de roadtrip avec GoQuébeCAN.',
  canonical: '/blog/sandbanks',
  image: '/images/destinations/sand-banks.avif',
  keywords: [
    'Sandbanks',
    'plage Sandbanks',
    'Sandbanks Ontario',
    'Prince Edward County',
    'voyage famille Ontario',
    'plage famille Canada',
    'roadtrip Ontario',
    'vacances avec enfants',
    'GoQuébeCAN Sandbanks',
  ],
  type: 'article',
});

// =========================
// SEO 2025 – JSON-LD
// =========================

// Fil d’Ariane
const breadcrumbLd = buildBreadcrumbLd([
  { name: 'Accueil', item: '/' },
  { name: 'Blog', item: '/blog' },
  { name: 'Plage de Sandbanks en Ontario', item: '/blog/sandbanks' },
]);

// Destination
const destinationLd = buildDestinationLd({
  name: 'Plage de Sandbanks',
  description:
    'La plage de Sandbanks en Ontario est l’une des plus belles plages d’eau douce du Canada, avec ses grandes dunes de sable, ses eaux turquoise et ses larges espaces parfaits pour les familles québécoises.',
  url: '/blog/sandbanks',
  image: '/images/destinations/sand-banks.avif',
  latitude: 43.938, // approx. Sandbanks Provincial Park
  longitude: -77.228,
  containedPlaces: ['Prince Edward County', 'Ontario', 'Canada'],
  touristType: ['Familles', 'Couples', 'Roadtrip', 'Plage'],
});

// HowTo – préparer une journée à Sandbanks
const howToLd = buildHowToLd({
  name: 'Comment préparer une journée parfaite à Sandbanks avec des enfants',
  description:
    'Étapes clés pour organiser une journée à la plage de Sandbanks en Ontario avec des enfants : choix de la plage, préparation du sac, gestion du trajet et des pauses, sécurité et idées pour prolonger le plaisir.',
  url: '/blog/sandbanks',
  image: '/images/destinations/sand-banks.avif',
  steps: [
    {
      name: 'Choisir la bonne plage à Sandbanks',
      text: "Comparez Outlet Beach et Dunes Beach selon l'âge de vos enfants, la météo et le vent prévu. Outlet Beach est idéale pour les plus petits, Dunes Beach offre de grands espaces pour les ados.",
    },
    {
      name: 'Planifier le trajet et les pauses',
      text: "Depuis Montréal ou Québec, visualisez votre route, vos arrêts et vos temps de pause avec le planificateur GoQuébeCAN afin d'éviter les grosses pointes et de garder tout le monde en forme.",
    },
    {
      name: 'Préparer le sac de plage',
      text: 'Ajoutez crème solaire, serviettes, parasol bien ancré, jeux de sable, gourdes et collations. Pensez aussi à des vêtements de rechange et des sacs pour les maillots mouillés.',
    },
    {
      name: 'Organiser le voyage en voiture',
      text: 'Optimisez le coffre, prévoyez une glacière, des chargeurs et un minimum de désordre. Inspirez-vous des listes d’objets indispensables pour les longs trajets proposées par GoQuébeCAN.',
    },
    {
      name: 'Gérer le rythme sur place',
      text: 'Alternez baignade, jeux de plage, pauses à l’ombre et collations. Observez les vagues et le vent et adaptez la durée des baignades selon les conditions.',
    },
    {
      name: 'Prolonger la journée ou le séjour',
      text: 'Terminez par une visite chez un producteur local, une glace artisanale ou une balade dans le comté de Prince Edward avant de reprendre la route, ou prévoyez un deuxième jour sur place.',
    },
  ],
});

// FAQ JSON-LD
const faqLd = buildFaqLd([
  {
    question: 'Quelle est la meilleure plage pour les jeunes enfants à Sandbanks ?',
    answer:
      "Outlet Beach est généralement la plus adaptée pour les jeunes enfants grâce à son entrée à l'eau progressive, son vaste sable et son ambiance familiale. Surveillez toujours les conditions de vague et de vent avant la baignade.",
  },
  {
    question: 'Faut-il réserver à l’avance pour accéder à Sandbanks ?',
    answer:
      "En haute saison, le stationnement peut rapidement être complet. Il est recommandé de vérifier les consignes du parc provincial de l’Ontario, d'arriver tôt et de prévoir un plan B dans votre itinéraire.",
  },
  {
    question: 'Peut-on combiner Sandbanks avec d’autres destinations en Ontario ?',
    answer:
      'Oui, Sandbanks s’intègre très bien dans un roadtrip incluant Ottawa, Kingston, la région de Prince Edward County, voire un parc aquatique comme Calypso. C’est une excellente option pour varier plages, villes et activités familiales.',
  },
  {
    question: 'Quels sont les indispensables à ne pas oublier pour Sandbanks ?',
    answer:
      'Crème solaire, parasol ou abri, serviettes en quantité suffisante, glacière, vêtements de rechange, sacs pour maillots mouillés, jeux de plage, chapeaux et lunettes de soleil. Une bonne organisation en amont rend la journée beaucoup plus agréable.',
  },
  {
    question: 'Sandbanks convient-il aux ados ?',
    answer:
      'Oui, les ados apprécient particulièrement les dunes, les grandes étendues de sable, les vagues et les possibilités de photos. Il est toutefois important de leur rappeler les règles de sécurité liées au vent, aux courants et aux zones de baignade.',
  },
]);

// CollectionPage – pour signaler à Google que c’est une page de contenu structuré
const collectionPageLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Plage de Sandbanks en Ontario – Guide GoQuébeCAN',
  description:
    'Guide complet pour découvrir la plage de Sandbanks en Ontario avec GoQuébeCAN : plages, accès, conseils familles, hébergements, producteurs locaux et idées de roadtrip.',
  url: '/blog/sandbanks',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Présentation de la plage de Sandbanks',
        url: '/blog/sandbanks#plages',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Accès, trajet et organisation',
        url: '/blog/sandbanks#acces',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Conseils pour les familles',
        url: '/blog/sandbanks#familles',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Hébergements près de Sandbanks',
        url: '/blog/sandbanks#hebergements',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Producteurs locaux et idées autour',
        url: '/blog/sandbanks#producteurs',
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'FAQ Sandbanks pour les familles québécoises',
        url: '/blog/sandbanks#faq',
      },
    ],
  },
};

// =========================
// Page Server – App Router
// =========================

export default function SandbanksPage() {
  return (
    <>
      {/* Métadonnées complémentaires (OpenGraph article times, etc.) */}
      <HeadExtras
        articlePublishedTime="2025-01-01T09:00:00-05:00"
        articleModifiedTime="2025-01-01T09:00:00-05:00"
      />

      {/* JSON-LD structurés – un script par bloc pour rester propre */}
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={destinationLd} />
      <JsonLd data={howToLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={collectionPageLd} />

      {/* Contenu principal (composant client) */}
      <BlogArticleSandbanks />
    </>
  );
}
