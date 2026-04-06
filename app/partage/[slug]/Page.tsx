'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabaseBrowser as supabase } from '@/lib/supabase-browser';
import { exportToPDF } from '@/utils/itineraryPdf';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

type CommunityStepRole = 'start' | 'via' | 'end';

type StepNotesObject = {
  hotel?: string;
  restaurant?: string;
  activites?: string;
  producteurs?: string;
  autres?: string;
};

type CommunityStep = {
  id: string;
  name: string;
  role: CommunityStepRole;
  lat: number;
  lng: number;
  notes?: StepNotesObject | string | null;
};

type CommunityItinerary = {
  id: string;
  title: string;
  summary: string;
  author_name: string | null;
  author_email: string | null;
  status: 'pending' | 'approved' | 'rejected';
  steps_json: CommunityStep[];
  step_count: number | null;
  region: string | null;
  duration_days: number | null;
  cover_image_url: string | null;
  pdf_url: string | null;
  slug: string | null;
  created_at: string | null;
};

type PdfItineraryItem = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  role: 'start' | 'via' | 'end';
  notes?: string;
};

function isNotesObject(value: unknown): value is StepNotesObject {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

export default function Page() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? '';

  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<CommunityItinerary | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setErrorText(null);

        const { data, error } = await supabase
          .from('community_itineraries')
          .select(
            'id, title, summary, author_name, author_email, status, steps_json, step_count, region, duration_days, cover_image_url, pdf_url, slug, created_at',
          )
          .eq('slug', slug)
          .eq('status', 'approved')
          .single();

        if (!mounted) return;

        if (error || !data) {
          console.error('[partage] load error', error);
          setItem(null);
          setErrorText(error?.message ?? 'Itinéraire introuvable.');
          return;
        }

        setItem(data as CommunityItinerary);
      } catch (e) {
        console.error('[partage] unexpected error', e);

        if (!mounted) return;

        setItem(null);
        setErrorText(e instanceof Error ? e.message : 'Erreur inconnue.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [slug]);

  function notesToPdfString(notes: CommunityStep['notes']): string | undefined {
    if (!notes) return undefined;

    if (typeof notes === 'string') {
      const trimmed = notes.trim();
      return trimmed || undefined;
    }

    const parts: string[] = [];

    if (notes.hotel?.trim()) parts.push(`Hôtel : ${notes.hotel.trim()}`);
    if (notes.restaurant?.trim()) parts.push(`Restaurant : ${notes.restaurant.trim()}`);
    if (notes.activites?.trim()) parts.push(`Activités : ${notes.activites.trim()}`);
    if (notes.producteurs?.trim()) parts.push(`Producteurs : ${notes.producteurs.trim()}`);
    if (notes.autres?.trim()) parts.push(`Autres : ${notes.autres.trim()}`);

    return parts.length > 0 ? parts.join('\n') : undefined;
  }

  const itineraryForPdf = useMemo<PdfItineraryItem[]>(() => {
    if (!item?.steps_json?.length) return [];

    return item.steps_json.map((step, index, arr) => {
      const pdfNotes = notesToPdfString(step.notes);

      const pdfStep: PdfItineraryItem = {
        id: String(step.id ?? index),
        name: step.name || `Étape ${index + 1}`,
        lat: step.lat,
        lng: step.lng,
        role: index === 0 ? 'start' : index === arr.length - 1 ? 'end' : 'via',
      };

      if (pdfNotes) {
        pdfStep.notes = pdfNotes;
      }

      return pdfStep;
    });
  }, [item]);

  const handleExportPDF = async () => {
    if (!item || itineraryForPdf.length < 2) return;

    await exportToPDF(`itineraire-${item.slug ?? 'communaute'}.pdf`, itineraryForPdf, {
      brand: 'GoQuébeCAN',
      logoUrl: '/images/logo.png',
      cardUrl: '/images/carte.avif',
      greeting:
        'Bonnes vacances au Québec ! Profitez des paysages, des saveurs locales et de la chaleur de nos producteurs — GoQuébeCAN vous accompagne à chaque étape.',
      shareCtaText: 'Créer mon itinéraire',
      shareCtaUrl: '/planificateur',
      footerNote: 'GoQuébeCAN vous souhaite de très bonnes vacances.',
    });
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 text-center">
        <p className="text-gray-600">Chargement de l’itinéraire...</p>
      </main>
    );
  }

  if (!item) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 text-center">
        <H1 className="mb-4 text-2xl font-bold text-red-600">Itinéraire introuvable</H1>
        <p className="mb-3 text-gray-600">
          Cet itinéraire n’existe pas, n’est pas encore approuvé ou a été supprimé.
        </p>
        {errorText ? <p className="text-sm text-gray-400">Détail : {errorText}</p> : null}

        <div className="mt-6">
          <Link
            href="/itineraires-communaute"
            className="inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Retour aux itinéraires de la communauté
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <H1 className="mb-3 text-3xl font-bold">{item.title}</H1>

        <p className="mb-4 text-gray-700">{item.summary}</p>

        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          {item.region ? <span>{item.region}</span> : null}
          {item.step_count ? <span>{item.step_count} étapes</span> : null}
          {item.duration_days ? <span>{item.duration_days} jours</span> : null}
          <span>Partagé par {item.author_name || 'un voyageur GoQuébeCAN'}</span>
        </div>

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
      </header>

      <section>
        <H2 className="mb-4 text-2xl font-bold">Étapes de l’itinéraire</H2>

        <div className="space-y-4">
          {Array.isArray(item.steps_json) && item.steps_json.length > 0 ? (
            item.steps_json.map((step, index) => (
              <article
                key={step.id ?? `${index}`}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-1 text-sm text-gray-500">
                  {index === 0
                    ? 'Départ'
                    : index === item.steps_json.length - 1
                      ? 'Arrivée'
                      : `Étape ${index}`}
                </div>

                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {step.name || `Étape ${index + 1}`}
                </h3>

                <p className="mb-3 text-xs text-gray-500">
                  {step.lat}, {step.lng}
                </p>

                {typeof step.notes === 'string' && step.notes.trim() ? (
                  <p className="text-sm leading-6 text-gray-700">{step.notes}</p>
                ) : isNotesObject(step.notes) ? (
                  <div className="space-y-2 text-sm text-gray-700">
                    {step.notes.hotel ? (
                      <p>
                        <strong>Hôtel :</strong> {step.notes.hotel}
                      </p>
                    ) : null}
                    {step.notes.restaurant ? (
                      <p>
                        <strong>Restaurant :</strong> {step.notes.restaurant}
                      </p>
                    ) : null}
                    {step.notes.activites ? (
                      <p>
                        <strong>Activités :</strong> {step.notes.activites}
                      </p>
                    ) : null}
                    {step.notes.producteurs ? (
                      <p>
                        <strong>Producteurs :</strong> {step.notes.producteurs}
                      </p>
                    ) : null}
                    {step.notes.autres ? (
                      <p>
                        <strong>Autres :</strong> {step.notes.autres}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Aucune note ajoutée.</p>
                )}
              </article>
            ))
          ) : (
            <p className="text-gray-500">Aucune étape disponible.</p>
          )}
        </div>
      </section>
    </main>
  );
}
