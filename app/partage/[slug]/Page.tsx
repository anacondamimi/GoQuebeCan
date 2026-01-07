'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { supabaseBrowser as supabase } from '@/lib/supabase-browser';
import { saveFeedback } from '@/components/lib/saveFeedback';
import { exportToPDF } from '@/utils/itineraryPdf';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

// -----------------------------
// Types dérivés & shape partagé
// -----------------------------

type ItineraryParam = Parameters<typeof exportToPDF>[1];
type ItineraryItem = ItineraryParam extends Array<infer U> ? U : never;

type SharedStep = {
  id?: string | number;
  name?: string;
  title?: string;
  coordinates?: readonly [number, number] | number[];
  lat?: number;
  lng?: number;
  location?: { lat?: number; lng?: number } | null;
  notes?: string | null;
};

// -----------------------------
// Page composant
// -----------------------------

export default function Page() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? '';
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [steps, setSteps] = useState<SharedStep[] | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Charger l'itinéraire depuis Supabase
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('itineraries')
          .select('title, data')
          .eq('slug', slug)
          .single();

        if (!mounted) return;
        if (error) {
          console.error('[partage] load error', error);
          setTitle('');
          setSteps([]);
        } else {
          const loadedTitle = (data as { title?: string } | null)?.title ?? '';
          // data.data?.steps :
          const loadedSteps = (data as { data?: unknown } | null)?.data as
            | { steps?: SharedStep[] }
            | undefined
            | null;
          setTitle(loadedTitle);
          setSteps(Array.isArray(loadedSteps?.steps) ? loadedSteps!.steps : []);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  // Dupliquer l'itinéraire
  async function handleDuplicate() {
    const newSlug = uuidv4();
    const { error } = await supabase.from('itineraries').insert([
      {
        slug: newSlug,
        title: title ? `${title} (copie)` : 'Itinéraire (copie)',
        data: { steps },
      },
    ]);

    if (!error) router.push(`/partage/${newSlug}`);
    else console.error('Erreur duplication:', error.message);
  }

  // Export PDF (pipeline jsPDF partagé)
  const handleExportPDF = async () => {
    if (!steps || steps.length < 2) return;

    const itinerary: ItineraryParam = (steps as SharedStep[]).map<ItineraryItem>((s, idx, arr) => {
      // ✅ Calcul robuste des coordonnées (array -> lat/lng -> location)
      const lat =
        Array.isArray(s.coordinates) && typeof s.coordinates[0] === 'number'
          ? s.coordinates[0]
          : typeof s.lat === 'number'
            ? s.lat
            : typeof s.location?.lat === 'number'
              ? s.location.lat
              : NaN;

      const lng =
        Array.isArray(s.coordinates) && typeof s.coordinates[1] === 'number'
          ? s.coordinates[1]
          : typeof s.lng === 'number'
            ? s.lng
            : typeof s.location?.lng === 'number'
              ? s.location.lng
              : NaN;

      if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
        throw new Error(`Coordonnées manquantes pour l'étape ${idx}`);
      }

      return {
        ...(s.id != null ? { id: String(s.id) } : {}),
        name: s.name ?? s.title ?? `Étape ${idx}`,
        lat,
        lng,
        role: idx === 0 ? 'start' : idx === arr.length - 1 ? 'end' : 'via',
        // ➕ on envoie aussi le contenu du modal pour la colonne « Notes »
        ...(s.notes != null ? { notes: s.notes } : {}),
      } as ItineraryItem;
    });

    await exportToPDF(`itineraire-${String(slug)}.pdf`, itinerary, {
      brand: 'GoQuébeCAN',
      logoUrl: '/images/logo.png',
      cardUrl: '/images/carte.avif',
      greeting:
        'Bonnes vacances au Québec ! Profitez des paysages, des saveurs locales et de la chaleur de nos producteurs — GoQuébeCAN vous accompagne à chaque étape.',
      shareCtaText: 'Partager mon itinéraire',
      shareCtaUrl: '/contact',
      footerNote: 'GoQuébeCAN vous souhaite de très bonnes vacances.',
    });
  };

  // Feedback (optionnel)
  const handleSendFeedback = async () => {
    try {
      await saveFeedback(slug as string, feedback);
      setSubmitted(true);
      setFeedback('');
    } catch (e) {
      console.error(e);
      alert('Erreur lors de l’envoi');
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 text-center">
        <p className="text-gray-600">Chargement de l’itinéraire...</p>
      </main>
    );
  }

  if (!steps || steps.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 text-center">
        <H1 className="mb-4 text-2xl font-bold text-red-600">Itinéraire introuvable</H1>
        <p className="text-gray-600">Cet itinéraire n’existe pas ou a été supprimé.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6">
        <H1 className="mb-2 text-2xl font-bold">{title || 'Mon itinéraire'}</H1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportPDF}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
          >
            ⬇️ Télécharger le PDF
          </button>
          <button
            onClick={handleDuplicate}
            className="rounded-lg border px-3 py-2 hover:bg-gray-50"
            title="Dupliquer cet itinéraire"
          >
            Dupliquer
          </button>
        </div>
      </header>

      <section className="mb-8 space-y-2">
        {steps.map((s, idx) => (
          <div key={(s.id ?? idx).toString()} className="rounded-md border p-3">
            <div className="text-sm text-gray-600">
              {idx === 0 ? 'Départ' : idx === steps.length - 1 ? 'Arrivée' : `Étape ${idx}`}
            </div>
            <div className="font-medium">{s.name ?? s.title ?? `Étape ${idx}`}</div>
            {Array.isArray(s.coordinates) && (
              <div className="text-xs text-gray-500">
                ({s.coordinates[0]?.toFixed?.(4)}, {s.coordinates[1]?.toFixed?.(4)})
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="border-t pt-6">
        <H2 className="mb-2 text-lg font-semibold">Un avis ?</H2>
        {submitted ? (
          <p className="text-green-700">Merci pour votre retour !</p>
        ) : (
          <div className="flex items-start gap-2">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full rounded-md border p-2"
              rows={3}
              placeholder="Vos idées d’amélioration, suggestions…"
            />
            <button
              onClick={handleSendFeedback}
              className="rounded-lg bg-gray-800 px-3 py-2 text-white hover:bg-black"
            >
              Envoyer
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
