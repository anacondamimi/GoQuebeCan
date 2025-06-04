'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-opacity-90 bg-gradient-to-r from-green-700 to-green-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/forest-banner.jpg"
            alt="Paysage forêt"
            width={60}
            height={60}
            className="rounded-md shadow-md hidden md:block"
          />
          <p className="text-sm md:text-base">
            Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique de confidentialité.
          </p>
        </div>
        <button
          onClick={handleAccept}
          className="bg-white text-green-900 hover:bg-green-100 font-semibold text-sm px-4 py-2 rounded shadow transition"
        >
          J'accepte
        </button>
      </div>
    </div>
  );
}
