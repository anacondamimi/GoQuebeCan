// app/offres/page.tsx
import type { Metadata } from 'next';
import Offers from '@/components/Offres';
import OFFERS from '@/data/offres-data';
import H1 from '@/components/typography/H1';

export const revalidate = 21600; // 6h

const SITE =
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.goquebecan.com';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Offres spéciales au Québec | GoQuébeCAN';
  const description =
    'Découvrez les meilleures offres pour voyager au Québec et au Canada : hébergements, activités, transports, forfaits détente et bons plans sélectionnés.';
  const url = `${SITE}/offres`;
  const ogImage = `${SITE}/og/carte.avif`;

  return {
    metadataBase: new URL(SITE),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'GoQuébeCAN',
      locale: 'fr_CA',
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Offres spéciales GoQuébeCAN' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  };
}

export default function OffresPage() {
  const offerCatalogLd = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Offres spéciales — GoQuébeCAN',
    url: `${SITE}/offres`,
    itemListElement: OFFERS.map((offer, index) => ({
      '@type': 'Offer',
      position: index + 1,
      name: offer.title,
      url: offer.cta?.href ?? offer.url,
      price: offer.priceFrom,
      priceCurrency: offer.currency ?? 'CAD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: offer.vendor ?? 'GoQuébeCAN',
      },
    })),
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogLd) }}
      />

      <H1 className="mb-4 text-3xl font-bold sm:text-4xl">
        Offres spéciales au Québec et au Canada
      </H1>

      <p className="mb-8 max-w-3xl text-lg leading-8 text-gray-700">
        Retrouvez ici une sélection d’offres pour préparer vos escapades : hôtels, activités,
        forfaits détente, expériences locales et bons plans utiles pour voyager mieux sans perdre de
        temps à chercher partout.
      </p>

      <Offers />
    </main>
  );
}
