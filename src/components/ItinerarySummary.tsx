'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { Suggestion } from '@/utils/suggestNearbyProducers';
import { useItineraryStore } from '@/store/useItineraryStore';
import type { StepData } from '@/store/useItineraryStore';
import { displayStepTitle, stringifyStepNotes } from '@/utils/itineraryFormat';
import { exportToPDF } from '@/utils/itineraryPdf';

import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

/**
 * ItinerarySummary
 * — Résumé lisible à l'écran + actions d'export (PDF via jsPDF, TXT) et envoi vers /contact
 * — 100% typé (aucun any), remplace complètement l'ancien html2pdf
 */

// Types dérivés du module PDF (zéro any)
type ItineraryParam = Parameters<typeof exportToPDF>[1];
type ItineraryItem = ItineraryParam extends Array<infer U> ? U : never;

// Shape tolérant pour les étapes (au cas où certaines props soient manquantes)
export type SummaryStep = Pick<StepData, 'lat' | 'lng' | 'name' | 'title' | 'notes'> & {
  id?: string | number;
};

export default function ItinerarySummary() {
  const itinerary = useItineraryStore((s) => s.itinerary) as SummaryStep[] | undefined;

  const [producers, setProducers] = useState<Suggestion[]>([]);
  const [downloading, setDownloading] = useState(false);
  const pdfVersion = 'v-2025-09-04'; // Fingerprint léger pour casser le cache des assets

  // Récupère les suggestions de producteurs (facultatif)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const prod = localStorage.getItem('producerSuggestions');
      if (prod) setProducers(JSON.parse(prod) as Suggestion[]);
    } catch (err) {
      console.warn('Erreur parsing JSON localStorage', err);
    }
  }, []);

  // Commentaire auto (lisible à l'écran)
  const aiComment = useMemo(() => {
    if (!Array.isArray(itinerary) || itinerary.length === 0) return '';
    const from = displayStepTitle(itinerary[0] as StepData, 0, itinerary.length);
    const to = displayStepTitle(
      itinerary[itinerary.length - 1] as StepData,
      itinerary.length - 1,
      itinerary.length,
    );
    const count = Math.max(0, itinerary.length - 2);
    return `Vous partez de ${from} jusqu’à ${to} avec ${count > 0 ? `${count} étape(s)` : 'aucune étape'}.`;
  }, [itinerary]);

  const toPdfItinerary = useCallback((steps: SummaryStep[]): ItineraryParam => {
    return steps.map<ItineraryItem>((s, idx, arr) => {
      const { lat, lng } = s;
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        throw new Error(`Coordonnées manquantes ou invalides pour l'étape ${idx}`);
      }
      return {
        ...(s.id != null ? { id: String(s.id) } : {}),
        name: s.name ?? s.title ?? `Étape ${idx}`,
        lat,
        lng,
        role: idx === 0 ? 'start' : idx === arr.length - 1 ? 'end' : 'via',
        // ➜ on transmet le contenu du modal (sections/notes) au moteur PDF
        ...(s.notes != null ? { notes: s.notes } : {}),
      } as ItineraryItem;
    });
  }, []);

  // Export PDF — unifié avec le pipeline jsPDF/autoTable
  const handleExportPDF = useCallback(async () => {
    if (!Array.isArray(itinerary) || itinerary.length < 2) return;

    try {
      setDownloading(true);
      const pdfItinerary = toPdfItinerary(itinerary);

      await exportToPDF(`itineraire-GoQuebeCAN-${pdfVersion}.pdf`, pdfItinerary, {
        brand: 'GoQuébeCAN',
        logoUrl: `/images/logo.png?v=${pdfVersion}`,
        cardUrl: `/images/carte.avif?v=${pdfVersion}`,
        greeting:
          'Bonnes vacances au Québec ! Profitez des paysages, des saveurs locales et de la chaleur de nos producteurs — GoQuébeCAN vous accompagne à chaque étape.',
        shareCtaText: 'Partager mon itinéraire',
        shareCtaUrl: '/contact',
        footerNote: 'GoQuébeCAN vous souhaite de très bonnes vacances.',
      });
    } catch (e) {
      console.error('[ItinerarySummary] exportToPDF failed:', e);
      alert(
        'Impossible de générer le PDF — vérifie que toutes les étapes ont des coordonnées valides.',
      );
    } finally {
      setDownloading(false);
    }
  }, [itinerary, pdfVersion, toPdfItinerary]);

  // Export .txt (léger)
  const handleExportText = useCallback(() => {
    if (!Array.isArray(itinerary) || itinerary.length === 0) return;

    let text = 'Résumé de votre itinéraire\n\n';
    itinerary.forEach((step, i, arr) => {
      const role = i === 0 ? 'Départ' : i === arr.length - 1 ? 'Arrivée' : `Étape ${i}`;
      const title = displayStepTitle(step as StepData, i, arr.length);
      text += `${role}: ${title}\n`;

      const notes = stringifyStepNotes(step as StepData);
      if (notes) text += `${notes}\n`;
      text += '\n';
    });

    if (producers.length > 0) {
      text += 'Suggestions locales:\n';
      producers.forEach(({ producer, distance }) => {
        text += `- ${producer.name} (${producer.type}) à ${distance.toFixed(1)} km\n`;
      });
    }

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'itineraire.txt';
    a.click();
    URL.revokeObjectURL(url);
  }, [itinerary, producers]);

  // Envoi vers /contact
  const handleShareToCommunity = useCallback(async () => {
    if (!Array.isArray(itinerary) || itinerary.length < 2) return;

    const title = prompt('Titre de votre itinéraire :');
    if (!title) return;

    const summary = prompt('Description de votre itinéraire :');
    if (!summary) return;

    try {
      const steps = itinerary.map((s, i, arr) => ({
        id: i === 0 ? 'start' : i === arr.length - 1 ? 'end' : `step-${i}`,
        name: displayStepTitle(s as StepData, i, arr.length),
        role: i === 0 ? 'start' : i === arr.length - 1 ? 'end' : 'via',
        lat: (s as StepData).lat,
        lng: (s as StepData).lng,
        notes: (s as StepData).notes || null,
      }));

      const res = await fetch('/api/community-itineraries/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          summary,
          consent: true,
          steps,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        alert('Erreur : ' + data.error);
        return;
      }

      alert('✅ Itinéraire envoyé à la communauté !');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l’envoi.');
    }
  }, [itinerary]);

  if (!Array.isArray(itinerary) || itinerary.length < 2) return null;

  return (
    <div className="mt-10 rounded-lg bg-white p-6 shadow">
      <div>
        <H2 className="mb-2 text-2xl font-bold">Résumé de votre itinéraire</H2>
        <p className="mb-4 italic text-gray-600">{aiComment}</p>

        <ol className="mb-4 list-inside list-decimal space-y-3 text-gray-800">
          {itinerary.map((step, index) => {
            const s = step as StepData;
            const role =
              index === 0
                ? 'Départ'
                : index === itinerary.length - 1
                  ? 'Arrivée'
                  : `Étape ${index}`;
            const title = displayStepTitle(s, index, itinerary.length);
            const notes = stringifyStepNotes(s);
            return (
              <li key={(s as { id?: string | number }).id ?? index} className="pl-1">
                <div className="font-semibold">
                  {role} — {title}
                </div>
                {notes && (
                  <div className="mt-1 whitespace-pre-wrap text-sm text-gray-700">{notes}</div>
                )}
              </li>
            );
          })}
        </ol>

        {producers.length > 0 && (
          <div className="mt-6">
            <H3 className="mb-2 text-lg font-semibold">💡 Suggestions d’arrêts locaux</H3>
            <ul className="list-inside list-disc space-y-1 text-gray-700">
              {producers.map(({ stepIndex, producer, distance }) => (
                <li key={`${producer.id}-${stepIndex}`}>
                  <strong>{producer.name}</strong> ({producer.type}) — à ~{distance.toFixed(1)} km
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleExportPDF}
          disabled={downloading}
          aria-busy={downloading}
          className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {downloading ? 'Génération…' : '⬇️ Télécharger le PDF'}
        </button>
        <button
          type="button"
          onClick={handleExportText}
          className="rounded border px-4 py-2 hover:bg-gray-50"
        >
          ⬇️ Exporter en texte
        </button>
        <button
          type="button"
          onClick={handleShareToCommunity}
          className="rounded border px-4 py-2 hover:bg-green-50"
        >
          🤝 Partager mon itinéraire
        </button>
      </div>
    </div>
  );
}
