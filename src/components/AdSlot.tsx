'use client';
import { useEffect, useState } from 'react';
import { hasConsented } from '@/lib/consent';

export default function AdSlot() {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    setOk(hasConsented('marketing'));
  }, []);

  if (!ok) return null;
  {
    /*pas de consentement → pas d’ad*/
  }
  return (
    <div id="ad-slot" className="min-h-24">
      {/* Ad code */}
    </div>
  );
}
