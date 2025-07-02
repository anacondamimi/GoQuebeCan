// app/layout.tsx
import './globals.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

import { Inter, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';
import React from 'react';

import ClientWrapper from './ClientWrapper';
import LayoutWithBanner from './LayoutWithBanner'; // 🟢 Bon endroit pour le hook
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'GoQuebecan | Explorez le Québec et le Canada',
  metadataBase: new URL('https://GoQuebeCan.com'),
  description: 'Guide complet des itinéraires, logements et activités au Canada et au Québec.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-warm-50 text-gray-800 font-sans">
        <ClientWrapper>
          <LayoutWithBanner>{children}</LayoutWithBanner>
        </ClientWrapper>
      </body>
    </html>
  );
}
