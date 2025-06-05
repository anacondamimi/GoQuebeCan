'use client';

import { ReactNode, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SiteProvider } from '@/components/contexts/SiteContext';

// Composant client-only
const Chatbot = dynamic(() => import('@/components/ui/Chatbot'), { ssr: false });

export default function ClientWrapper({ children }: { children: ReactNode }) {
  /* Leaflet uniquement côté client */
  useEffect(() => {
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      });
    });
  }, []);

  return (
    <SiteProvider>
      {children} {/*   <-- plus de <Navbar /> ici   */}
      <Chatbot />
    </SiteProvider>
  );
}
