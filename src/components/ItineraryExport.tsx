'use client';

import React, { useState } from 'react';
import { useItineraryStore } from '@/store/useItineraryStore';
import { exportToPDF } from '@/utils/itineraryPdf';

// Ajoute une petite version pour forcer le rafraîchissement des assets et vérifier
// que c'est bien cette version du code qui tourne.
const PDF_VERSION = '2025-09-03-02';

export default function ItineraryExport() {
  const itinerary = useItineraryStore((s) => s.itinerary);
  const [loading, setLoading] = useState(false);

  if (!Array.isArray(itinerary) || itinerary.length < 2) return null;

  const handleClick = async () => {
    try {
      setLoading(true);
      console.info('[ItineraryExport] PDF_VERSION =', PDF_VERSION);

      // Infère le type exact du 3e argument depuis la signature d'exportToPDF
      const custom: Parameters<typeof exportToPDF>[2] = {
        brand: 'GoQuébeCAN',
        logoUrl: `/images/logo.png?v=${PDF_VERSION}`, // évite un cache persistant
        cardUrl: `/images/carte.avif?v=${PDF_VERSION}`,
        greeting:
          'Bonnes vacances au Québec ! Profitez des paysages, des saveurs locales et de la chaleur de nos producteurs — GoQuébeCAN vous accompagne à chaque étape.',
        shareCtaText: 'Partager mon itinéraire',
        shareCtaUrl: '/contact',
        footerNote: 'GoQuébeCAN vous souhaite de très bonnes vacances.',
      };

      await exportToPDF(
        `itineraire-GoQuebeCAN-${PDF_VERSION}.pdf`,
        itinerary.map((step, i) => ({
          ...step,
          role: i === 0 ? 'start' : i === itinerary.length - 1 ? 'end' : 'via',
        })),
        custom,
      );
    } catch (err) {
      console.error('[ItineraryExport] exportToPDF failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      aria-busy={loading}
      className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
      title="Exporter l’itinéraire en PDF"
    >
      {loading ? 'Génération…' : '⬇️ Télécharger le PDF'}
    </button>
  );
}
