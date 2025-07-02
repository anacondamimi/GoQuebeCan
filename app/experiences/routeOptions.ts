import { Metadata } from 'next';

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
