// src/components/Skyscanner.tsx

'use client';
import React, { useEffect } from 'react';

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
    <section className="py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Comparateur de Vols</h2>
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
