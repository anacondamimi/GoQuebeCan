'use client';

import React, { useMemo, useState } from 'react';
import { useItineraryStore } from '@/store/useItineraryStore';

type CommunityStepRole = 'start' | 'via' | 'end';

type CommunityStep = {
  id: string;
  name: string;
  role: CommunityStepRole;
  lat: number;
  lng: number;
  notes?:
    | {
        hotel?: string;
        restaurant?: string;
        activites?: string;
        producteurs?: string;
        autres?: string;
      }
    | string
    | null;
};

type SubmitPayload = {
  title: string;
  summary: string;
  authorName?: string;
  authorEmail?: string;
  consent: boolean;
  steps: CommunityStep[];
};

type StoreStep = {
  id?: string | number;
  name?: string | null;
  title?: string | null;
  coordinates?: [number, number];
  lat?: number;
  lng?: number;
  notes?: unknown;
  restaurants?: string | null;
  sorties?: string | null;
  recharge?: string | null;
  autresNotes?: string | null;
};

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function normalizeStoreStep(step: StoreStep, index: number, total: number): CommunityStep | null {
  const lat = isFiniteNumber(step.lat)
    ? step.lat
    : Array.isArray(step.coordinates) && isFiniteNumber(step.coordinates[0])
      ? step.coordinates[0]
      : null;

  const lng = isFiniteNumber(step.lng)
    ? step.lng
    : Array.isArray(step.coordinates) && isFiniteNumber(step.coordinates[1])
      ? step.coordinates[1]
      : null;

  if (!isFiniteNumber(lat) || !isFiniteNumber(lng)) {
    return null;
  }

  const role: CommunityStepRole = index === 0 ? 'start' : index === total - 1 ? 'end' : 'via';

  const name = (step.name ?? step.title ?? `Étape ${index + 1}`).toString().trim();

  const structuredNotes = {
    restaurant: step.restaurants ?? undefined,
    activites: step.sorties ?? undefined,
    autres: step.autresNotes ?? undefined,
  };

  const hasStructuredNotes = Object.values(structuredNotes).some(Boolean);

  return {
    id: String(step.id ?? `step-${index + 1}`),
    name,
    role,
    lat,
    lng,
    notes: step.notes ?? (hasStructuredNotes ? structuredNotes : null),
  };
}

function buildDefaultTitle(steps: CommunityStep[]): string {
  if (steps.length >= 2) {
    return `Itinéraire de ${steps[0].name} à ${steps[steps.length - 1].name}`;
  }
  return 'Mon itinéraire GoQuébeCAN';
}

function buildDefaultSummary(steps: CommunityStep[]): string {
  if (steps.length >= 2) {
    return `Itinéraire de ${steps.length} étapes entre ${steps[0].name} et ${steps[steps.length - 1].name}, partagé avec la communauté GoQuébeCAN.`;
  }
  return 'Itinéraire partagé avec la communauté GoQuébeCAN.';
}

export default function ShareItineraryButton() {
  const itinerary = useItineraryStore((s) => s.itinerary) as StoreStep[] | undefined;

  const [open, setOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'err'; message: string } | null>(null);

  const normalizedSteps = useMemo(() => {
    const raw = Array.isArray(itinerary) ? itinerary : [];
    return raw
      .map((step, index) => normalizeStoreStep(step, index, raw.length))
      .filter((step): step is CommunityStep => step !== null);
  }, [itinerary]);

  const canShare = normalizedSteps.length >= 2;

  const openModal = () => {
    if (!canShare) return;
    setTitle((prev) => prev || buildDefaultTitle(normalizedSteps));
    setSummary((prev) => prev || buildDefaultSummary(normalizedSteps));
    setOpen(true);
    setFeedback(null);
  };

  const closeModal = () => {
    if (submitting) return;
    setOpen(false);
  };

  const handleSubmit = async () => {
    setFeedback(null);

    const payload: SubmitPayload = {
      title: title.trim(),
      summary: summary.trim(),
      authorName: authorName.trim() || undefined,
      authorEmail: authorEmail.trim() || undefined,
      consent,
      steps: normalizedSteps,
    };

    if (!payload.title) {
      setFeedback({ type: 'err', message: 'Le titre est requis.' });
      return;
    }

    if (payload.summary.length < 20) {
      setFeedback({ type: 'err', message: 'Ajoute une description un peu plus complète.' });
      return;
    }

    if (!payload.consent) {
      setFeedback({ type: 'err', message: 'Tu dois autoriser la publication après validation.' });
      return;
    }

    if (payload.steps.length < 2) {
      setFeedback({ type: 'err', message: "L'itinéraire doit contenir au moins 2 étapes." });
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch('/api/community-itineraries/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as
        | { ok: true; message: string }
        | { ok: false; error?: string };

      if (!response.ok || !data.ok) {
        setFeedback({
          type: 'err',
          message:
            data && 'error' in data && data.error
              ? data.error
              : "Impossible d'envoyer l'itinéraire.",
        });
        return;
      }

      setFeedback({
        type: 'ok',
        message:
          'Merci, votre itinéraire a bien été envoyé. Il apparaîtra avec le statut “En cours de validation”.',
      });

      setTimeout(() => {
        setOpen(false);
      }, 1200);
    } catch {
      setFeedback({
        type: 'err',
        message: "Une erreur réseau s'est produite. Réessaie dans un instant.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!canShare) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-gray-400 shadow-sm"
        title="Ajoutez au moins un départ et une arrivée pour partager un itinéraire"
      >
        🤝 Partager mon itinéraire
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center gap-2 rounded-2xl border border-indigo-200 bg-white px-4 py-2 text-indigo-700 shadow-sm hover:bg-indigo-50"
      >
        🤝 Partager mon itinéraire
      </button>

      {open && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Partager mon itinéraire à la communauté
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Votre itinéraire apparaîtra dans la communauté avec le statut “En cours de
                validation”.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="share-itinerary-title"
                  className="mb-1 block text-sm font-medium text-gray-800"
                >
                  Titre *
                </label>
                <input
                  id="share-itinerary-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500"
                  placeholder="Ex. Road trip de Montréal à Québec"
                />
              </div>

              <div>
                <label
                  htmlFor="share-itinerary-summary"
                  className="mb-1 block text-sm font-medium text-gray-800"
                >
                  Description *
                </label>
                <textarea
                  id="share-itinerary-summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500"
                  placeholder="Décrivez brièvement votre itinéraire, son ambiance, les points forts..."
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="share-itinerary-author-name"
                    className="mb-1 block text-sm font-medium text-gray-800"
                  >
                    Prénom ou pseudo
                  </label>
                  <input
                    id="share-itinerary-author-name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500"
                    placeholder="Ex. Mathieu"
                  />
                </div>

                <div>
                  <label
                    htmlFor="share-itinerary-author-email"
                    className="mb-1 block text-sm font-medium text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    id="share-itinerary-author-email"
                    type="email"
                    value={authorEmail}
                    onChange={(e) => setAuthorEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-indigo-500"
                    placeholder="Ex. nom@email.com"
                  />
                </div>
              </div>
              <label className="flex items-start gap-3 rounded-xl border border-gray-200 p-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1"
                />
                <span>J’autorise GoQuébeCAN à publier cet itinéraire après validation.</span>
              </label>

              <div className="rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
                <strong>{normalizedSteps.length}</strong> étape(s) détectée(s)
              </div>

              {feedback && (
                <div
                  className={`rounded-xl p-3 text-sm ${
                    feedback.type === 'ok' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}
                >
                  {feedback.message}
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="rounded-2xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {submitting ? 'Envoi en cours…' : 'Envoyer à la communauté'}
              </button>

              <button
                type="button"
                onClick={closeModal}
                disabled={submitting}
                className="rounded-2xl border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
