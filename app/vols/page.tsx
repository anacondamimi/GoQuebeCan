import { Metadata } from 'next';
import dynamicImport from 'next/dynamic'; // ✅ Renommé pour éviter le conflit

// ✅ Métadonnées SEO
export const metadata: Metadata = {
  title: 'Comparateur de Vols pour le Québec et le Canada | GoQuebecan',
  description:
    "Trouvez les meilleurs tarifs pour vos vols vers le Québec et le Canada. Comparateur intelligent avec conseils d'experts et astuces pour économiser.",
  openGraph: {
    title: 'Comparateur de Vols pour le Québec et le Canada | GoQuebecan',
    description: 'Trouvez les meilleurs tarifs pour vos vols vers le Québec et le Canada',
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
