'use client';

import Link from 'next/link';
import { exportToPDF } from '@/utils/itineraryPdf';

export default function PartageClient({ item }: { item: any }) {
  const handleExportPDF = async () => {
    if (!item?.steps_json || item.steps_json.length < 2) return;

    await exportToPDF(`itineraire-${item.slug ?? 'communaute'}.pdf`, item.steps_json, {
      brand: 'GoQuébeCAN',
      logoUrl: '/logo.png',
      cardUrl: '/images/carte.avif',
      greeting: 'Bonnes vacances au Québec ! GoQuébeCAN vous accompagne à chaque étape.',
      shareCtaText: 'Créer mon itinéraire',
      shareCtaUrl: '/planificateur',
      footerNote: 'GoQuébeCAN vous souhaite de très bonnes vacances.',
    });
  };

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <button
        onClick={handleExportPDF}
        className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
      >
        Télécharger le PDF
      </button>

      <Link
        href="/planificateur"
        className="rounded-xl border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
      >
        Créer mon propre itinéraire
      </Link>

      {item.pdf_url ? (
        <a
          href={item.pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
        >
          Ouvrir le PDF partagé
        </a>
      ) : null}
    </div>
  );
}
