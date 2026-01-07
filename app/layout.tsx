// app/layout.tsx
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';
import React from 'react';
import dynamic from 'next/dynamic';

import ClientWrapper from './ClientWrapper';
import LayoutWithBanner from './LayoutWithBanner';
import Footer from '@/components/layout/Footer';

const CookieBanner = dynamic(() => import('@/components/CookieBanner'), { ssr: false });

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'GoQuébeCan | Explorez le Québec et le Canada',
  description: 'Guide complet des itinéraires, hébergements et activités au Québec et au Canada.',
  metadataBase: new URL('https://goquebecan.com'),
  alternates: { canonical: 'https://goquebecan.com' },
  openGraph: {
    title: 'GoQuébeCan | Explorez le Québec et le Canada',
    description:
      'Itinéraires, hébergements, producteurs locaux et expériences authentiques à découvrir.',
    url: 'https://goquebecan.com',
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
  icons: { icon: '/favicon.avif' },
  robots: { index: true, follow: true },
  keywords: ['Québec', 'Canada', 'Itinéraires', 'Voyage', 'Producteurs locaux', 'Tourisme'],
  category: 'travel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <ClientWrapper>
          {/* Structure globale : contenu + footer */}
          <div className="flex min-h-screen flex-col">
            <LayoutWithBanner>{children}</LayoutWithBanner>
            <Footer />
          </div>

          <CookieBanner />
        </ClientWrapper>
      </body>
    </html>
  );
}
