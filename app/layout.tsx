// app/layout.tsx
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';

import ClientWrapper from './ClientWrapper';
import LayoutWithBanner from './LayoutWithBanner';
import Footer from '@/components/layout/Footer';

// ✅ Ajout : tes favicons centralisés
import { FAVICON_METADATA } from '@/components/seo/Favicons';

const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'GoQuébeCan | Explorez le Québec et le Canada',
  description: 'Guide complet des itinéraires, hébergements et activités au Québec et au Canada.',
  metadataBase: new URL('https://www.goquebecan.com'),

  openGraph: {
    title: 'GoQuébeCan | Explorez le Québec et le Canada',
    description:
      'Itinéraires, hébergements, producteurs locaux et expériences authentiques à découvrir.',
    url: 'https://www.goquebecan.com',
    siteName: 'GoQuébeCan',
    locale: 'fr_CA',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'GoQuébeCan',
    description: 'Découvrez le Québec et le Canada autrement.',
    creator: '@goquebecan',
  },

  robots: { index: true, follow: true },
  keywords: ['Québec', 'Canada', 'Itinéraires', 'Voyage', 'Producteurs locaux', 'Tourisme'],
  category: 'travel',

  verification: {
    other: {
      'impact-site-verification': 'b3e59d2b-b9c5-4a0d-bcf3-cacc26c52a4',
    },
  },

  ...FAVICON_METADATA,
};

// ✅ Next aime que viewport soit exporté à part
export const viewport: Viewport = {
  themeColor: '#38b6ff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <html lang="fr-CA" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <ClientWrapper>
          <div className="flex min-h-screen flex-col">
            <LayoutWithBanner>{children}</LayoutWithBanner>
            <Footer />
          </div>

          <CookieBanner />
        </ClientWrapper>

        {recaptchaSiteKey ? (
          <Script
            id="google-recaptcha-v3"
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
