'use client';

import React, { useEffect } from 'react';
import H2 from '@/components/typography/H2';

export function Skyscanner() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widgets.skyscanner.net/widget-server/js/loader.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="bg-gray-100 py-16">
      <div className="mx-auto max-w-4xl px-4">
        <H2 className="mb-8 text-center text-3xl font-bold text-gray-900">Comparateur de Vols</H2>
        <div
          className="skyscanner-widget"
          data-skyscanner-widget="SearchWidget"
          data-locale="fr-FR"
          data-market="CA"
          data-currency="CAD"
        ></div>
      </div>
    </section>
  );
}

// ✅ Le composant est maintenant correctement exporté, sans tentative d'importer lui-même.
// 🔒 Assurez-vous d'importer { Skyscanner } dans app/page.tsx uniquement si utilisé.
