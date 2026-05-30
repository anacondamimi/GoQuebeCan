import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

const siteUrl = 'https://www.goquebecan.com';

export const metadata: Metadata = {
  title: 'Contact & partenariats | GoQuébeCan',
  description:
    'Contactez GoQuébeCan pour proposer un partenariat, ajouter un producteur local, partager un itinéraire ou échanger autour du tourisme authentique au Québec.',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact & partenariats | GoQuébeCan',
    description:
      'Partenariats touristiques, producteurs locaux, itinéraires de voyageurs et collaborations autour du Québec authentique.',
    url: `${siteUrl}/contact`,
    siteName: 'GoQuébeCan',
    locale: 'fr_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & partenariats | GoQuébeCan',
    description:
      'Contactez GoQuébeCan pour un partenariat, un itinéraire ou une collaboration touristique.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact GoQuébeCan',
  url: `${siteUrl}/contact`,
  description:
    'Page de contact pour voyageurs, producteurs locaux et partenaires touristiques au Québec.',
  publisher: {
    '@type': 'Organization',
    name: 'GoQuébeCan',
    url: siteUrl,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@goquebecan.com',
    contactType: 'customer support',
    areaServed: 'CA',
    availableLanguage: ['fr-CA', 'en-CA'],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactPageClient />
    </>
  );
}
