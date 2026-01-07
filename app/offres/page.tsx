// app/offres/page.tsx
import type { Metadata } from 'next';
import Offers from '@/components/Offers';
import OFFERS from '@/data/offers-data';
import H1 from '@/components/typography/H1';

export const revalidate = 21600; // 6h

const SITE =
  process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.goquebecan.com';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Offres spéciales | GoQuébeCan';
  const description =
    'Promos et bons plans pour découvrir le Québec et le Canada : hébergements, activités, transports… Sélection vérifiée et mise à jour.';
  const url = `${SITE}/offres`;
  const ogImage = `${SITE}/og/offres.jpg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'GoQuébeCan',
      locale: 'fr_CA',
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Offres spéciales GoQuébeCan' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@goquebecan',
      creator: '@goquebecan',
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
    metadataBase: new URL(SITE),
  };
}

// JSON-LD OfferCatalog (SEO)
const offerCatalogLd = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Offres spéciales — GoQuébeCan',
  url: `${SITE}/offres`,
  itemListElement: OFFERS.map((o: any, i: number) => ({
    '@type': 'Offer',
    position: i + 1,
    name: o.title,
    url: o.cta?.href ?? o.url,
    price: o.priceFrom,
    priceCurrency: o.currency ?? 'CAD',
  })),
};

export default function OffresPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <H1 className="mb-6 text-3xl font-bold sm:text-4xl">Offres spéciales</H1>

      {/* SEO: données structurées */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalogLd) }}
      />

      <Offers />
    </main>
  );
}
