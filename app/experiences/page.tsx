import { Metadata } from 'next';
import { AuthenticExperiences } from '@/components/home/AuthenticExperiences';

export const metadata: Metadata = {
  title: 'Expériences Authentiques au Québec et au Canada | GoQuebecan',
  description:
    'Découvrez des expériences uniques et authentiques au Québec et au Canada. Villages pittoresques, territoires sauvages et aventures hors des sentiers battus.',
  openGraph: {
    title: 'Expériences Authentiques au Québec et au Canada | GoQuebecan',
    description: 'Vivez des expériences uniques et authentiques au Québec et au Canada',
    images: [
      'https://images.unsplash.com/photo-1525638164172-b31ea4222ef7?auto=format&fit=crop&q=80',
    ],
    url: 'https://goquebecan.com/experiences',
    type: 'website',
  },
  alternates: {
    canonical: 'https://goquebecan.com/experiences',
  },
};

export const dynamic = 'force-static';

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen pt-8">
      {/* ✅ H1 invisible pour le SEO */}
      <h1 className="sr-only">Expériences Authentiques au Québec et au Canada</h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AuthenticExperiences />
      </div>
    </main>
  );
}
