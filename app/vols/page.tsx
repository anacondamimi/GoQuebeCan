import { Metadata } from 'next';
import dynamicImport from 'next/dynamic'; // ✅ Renommé pour éviter le conflit

// ✅ Métadonnées SEO
export const metadata: Metadata = {
  title: 'Vols pas chers de Montréal vers la France | GoQuebeCan',
  description:
    "Trouvez les meilleurs prix pour vos billets d'avion entre Montréal et la France. Comparez, réservez et économisez grâce à nos partenaires comme French Bee.",
  openGraph: {
    title: 'Vols pas chers de Montréal vers la France | GoQuebeCan',
    description:
      "Comparez les tarifs des vols entre Montréal et la France. Bénéficiez des meilleures offres et conseils d'experts.",
    images: [
      'https://images.unsplash.com/photo-1525638164172-b31ea4222ef7?auto=format&fit=crop&q=80',
    ],
    url: 'https://goquebecan.com/vols',
    type: 'website',
  },
  alternates: {
    canonical: 'https://goquebecan.com/vols',
  },
};

// ✅ Charger le composant client dynamiquement
const VolsClient = dynamicImport(() => import('./VolsClient'), { ssr: false });

export default function VolsPage() {
  return <VolsClient />;
}
