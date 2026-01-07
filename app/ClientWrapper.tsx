'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SiteProvider } from '@/components/contexts/SiteContext';

// Client-only component
const Chatbot = dynamic(() => import('@/components/ui/Chatbot'), { ssr: false });

export default function ClientWrapper({ children }: { children: ReactNode }) {
  // Leaflet only on client
  useEffect(() => {
    let mounted = true;

    void import('leaflet').then(({ Icon }) => {
      if (!mounted) return;

      // Narrow the prototype type instead of using `any`
      type IconProto = { _getIconUrl?: unknown };
      const proto = Icon.Default.prototype as unknown as IconProto;
      delete proto._getIconUrl;

      Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png',
        iconUrl: '/leaflet/marker-icon.png',
        shadowUrl: '/leaflet/marker-shadow.png',
      });
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <SiteProvider>
      {children}
      <Chatbot />
    </SiteProvider>
  );
}
