// src/components/StepModal.tsx
'use client';

import React, { useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useItineraryStore } from '@/store/useItineraryStore';
import type { StepData, StepSections } from '@/store/useItineraryStore';
import producersData from '@/data/producers.json';
import { type Producer } from '@/utils/producersFilters';
import { displayStepTitle as displayTitleUtil, stringifyStepNotes } from '@/utils/itineraryFormat';

/* ---------- Utils ---------- */

function formatCoord(n?: number): string {
  return typeof n === 'number' && Number.isFinite(n) ? n.toFixed(5) : 'N/A';
}

function minutesToHhmm(min?: number): string {
  if (min === undefined || min === null) return '—';
  const m = Math.max(0, Math.round(min));
  const h = Math.floor(m / 60);
  const r = m % 60;
  return h > 0 ? `${h}h${r.toString().padStart(2, '0')}` : `${r} min`;
}

function roleLabel(i: number, total: number): string {
  if (i === 0) return 'Départ';
  if (i === total - 1) return 'Arrivée';
  return `Étape ${i + 1}`;
}

/**
 * ⚠️ NOTE IMPORTANT
 * Pour éviter l’erreur Next TS(71007) “Props must be serializable… 'onClose' is invalid",
 * on tape le paramètre en `any` et on destructure. Le composant est 100 % client.
 */

/* ---------- Component ---------- */

export default function StepModal(props: any) {
  const { isOpen, stepIndex, onClose, onDeleteStep } = props as {
    isOpen: boolean;
    stepIndex: number;
    onClose: () => void;
    onDeleteStep?: (index: number) => void;
  };

  const itinerary = useItineraryStore((s) => s.itinerary);
  const setSection = useItineraryStore((s) => s.setSection);
  const appendToSection = useItineraryStore((s) => s.appendToSection);

  const hasValidIndex =
    Number.isInteger(stepIndex) && stepIndex >= 0 && stepIndex < itinerary.length;

  const step: StepData | undefined = hasValidIndex ? itinerary[stepIndex] : undefined;
  const notesObj: StepSections =
    step && typeof step.notes === 'object' && step.notes ? (step.notes as StepSections) : {};

  const role = hasValidIndex ? roleLabel(stepIndex, itinerary.length) : 'Étape';
  const name = hasValidIndex ? displayTitleUtil(step, stepIndex, itinerary.length) : 'Étape';
  const progression =
    hasValidIndex && itinerary.length > 0
      ? `Étape ${Math.min(stepIndex + 1, itinerary.length)}/${itinerary.length}`
      : '';
  const previewNotes = stringifyStepNotes(step);

  // producteur ?
  const producerNames = useMemo(() => {
    const list = producersData as unknown as Producer[];
    return new Set(
      list.map((p) => (p.name ?? '').toLowerCase().trim()).filter((s) => s.length > 0),
    );
  }, []);
  const isProducerStep = !!step?.title && producerNames.has(step.title.toLowerCase().trim());

  const coordinates = useMemo(() => {
    return `${formatCoord(step?.lat)}, ${formatCoord(step?.lng)}`;
  }, [step?.lat, step?.lng]);

  const legDistance = step?.distanceKm ?? undefined;
  const legDuration = step?.durationMin ?? undefined;
  const isLast = hasValidIndex && stepIndex === itinerary.length - 1;

  const copyCoords = async () => {
    try {
      await navigator.clipboard.writeText(coordinates);
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Clipboard non disponible:', err);
      }
    }
  };

  const openAppleMaps = () => {
    if (typeof step?.lat === 'number' && typeof step?.lng === 'number') {
      window.open(
        `https://maps.apple.com/?q=${step.lat},${step.lng}`,
        '_blank',
        'noopener,noreferrer',
      );
    }
  };

  const fields: Array<{
    key: keyof StepSections;
    label: string;
    placeholder: string;
    emoji: string;
  }> = [
    {
      key: 'activites',
      label: 'Activités',
      placeholder: 'Croisière aux baleines, musée, spa nordique…',
      emoji: '🎡',
    },
    { key: 'sorties', label: 'Sorties', placeholder: 'Bars, spectacles, festivals…', emoji: '🎭' },
    {
      key: 'restaurant',
      label: 'Restaurant',
      placeholder: 'Réservation, spécialités, budget…',
      emoji: '🍽️',
    },
    {
      key: 'cantine',
      label: 'Cantine',
      placeholder: 'Casse-croûte, snack, dépanneur…',
      emoji: '🌭',
    },
    {
      key: 'boulangerie',
      label: 'Boulangerie',
      placeholder: 'Pains, viennoiseries, horaires…',
      emoji: '🥖',
    },
    {
      key: 'epicerie',
      label: 'Épicerie / Marché',
      placeholder: 'Adresse, produits locaux, SAQ…',
      emoji: '🛒',
    },
    {
      key: 'randonnees',
      label: 'Randonnées',
      placeholder: 'Sentiers, durée, dénivelé, sécurité…',
      emoji: '🥾',
    },
    {
      key: 'rechargeEssence',
      label: 'Recharge (Essence)',
      placeholder: 'Stations, horaires, prix…',
      emoji: '⛽',
    },
    {
      key: 'rechargeElectrique',
      label: 'Recharge (Électrique)',
      placeholder: 'Bornes, puissance, cartes, tarifs…',
      emoji: '🔌',
    },
    {
      key: 'autresNotes',
      label: 'Autres notes',
      placeholder: 'Idées, rappels, liens…',
      emoji: '📝',
    },
  ];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[90svh] max-w-2xl p-0 sm:max-h-[85vh] sm:max-w-3xl">
        <DialogHeader className="px-5 pt-5">
          <DialogTitle className="text-xl font-semibold">
            {name}
            {progression && (
              <span className="ml-2 text-sm font-normal text-gray-500">({progression})</span>
            )}
          </DialogTitle>

          <DialogDescription className="text-sm text-gray-600">
            <span className="font-medium">{role}</span>
            {!isLast && legDistance != null && legDuration != null && (
              <>
                {' '}
                • Vers l’étape suivante : <strong>{legDistance.toFixed(1)} km</strong> •{' '}
                <strong>{minutesToHhmm(legDuration)}</strong>
              </>
            )}
            <span className="ml-2">({coordinates})</span>
          </DialogDescription>

          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyCoords}
              className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
            >
              📋 Copier coordonnées
            </button>
            <button
              type="button"
              onClick={openAppleMaps}
              className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
            >
               Ouvrir dans Plans
            </button>

            {isProducerStep && onDeleteStep && hasValidIndex && (
              <button
                type="button"
                onClick={() => onDeleteStep(stepIndex)}
                className="ml-auto rounded-md border border-red-300 px-2 py-1 text-xs text-red-700 hover:bg-red-50"
              >
                🗑️ Supprimer cette étape producteur
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="max-h-[calc(100svh-12rem)] overflow-y-auto overscroll-contain px-5 py-4 sm:max-h-[calc(85vh-10rem)]">
          {hasValidIndex ? (
            isProducerStep ? (
              <section className="space-y-4">
                <div>
                  <label
                    htmlFor={`step-${stepIndex}-autresNotes`}
                    className="block text-sm font-medium"
                  >
                    📝 Pense-bête
                  </label>
                  <textarea
                    id={`step-${stepIndex}-autresNotes`}
                    value={notesObj?.autresNotes ?? ''}
                    onChange={(e) => setSection(stepIndex, 'autresNotes', e.target.value)}
                    rows={4}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    placeholder="Acheter…, Visiter…, Partager…"
                  />

                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => appendToSection(stepIndex, 'autresNotes', '🛒 Acheter : ')}
                      className="rounded-md border px-2 py-1 hover:bg-gray-50"
                    >
                      + Acheter
                    </button>

                    <button
                      type="button"
                      onClick={() => appendToSection(stepIndex, 'autresNotes', '👀 Visiter : ')}
                      className="rounded-md border px-2 py-1 hover:bg-gray-50"
                    >
                      + Visiter
                    </button>

                    <button
                      type="button"
                      onClick={() => appendToSection(stepIndex, 'autresNotes', '🔗 Partager : ')}
                      className="rounded-md border px-2 py-1 hover:bg-gray-50"
                    >
                      + Partager
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border bg-gray-50 p-3 text-sm">
                  <div className="mb-1 font-medium">Aperçu (résumé PDF)</div>
                  <div className="text-gray-700">
                    <strong>{name}</strong>
                    <pre className="mt-2 whitespace-pre-wrap">
                      {previewNotes || 'Aucune note pour cette étape.'}
                    </pre>
                  </div>
                </div>
              </section>
            ) : (
              <>
                <div className="mb-4">
                  <label
                    htmlFor={`step-${stepIndex}-notes-libres`}
                    className="block text-sm font-medium"
                  >
                    Notes libres
                  </label>
                  <textarea
                    id={`step-${stepIndex}-notes-libres`}
                    value={notesObj?.autresNotes ?? ''}
                    onChange={(e) => setSection(stepIndex, 'autresNotes', e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded-md border px-3 py-2"
                    placeholder="Idées, rappels, liens…"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {fields
                    .filter(({ key }) => key !== 'autresNotes')
                    .map(({ key, label, placeholder, emoji }) => (
                      <div key={String(key)} className="rounded-lg border bg-white p-3">
                        <label className="mb-1 block text-sm font-medium">
                          <span className="mr-1">{emoji}</span>
                          {label}
                        </label>
                        <textarea
                          value={notesObj?.[key] ?? ''}
                          onChange={(e) => setSection(stepIndex, key, e.target.value)}
                          rows={4}
                          className="mt-1 w-full rounded-md border px-3 py-2"
                          placeholder={placeholder}
                        />
                      </div>
                    ))}
                </div>

                <div className="mt-4 rounded-lg border bg-gray-50 p-3 text-sm">
                  <div className="mb-1 font-medium">Aperçu (résumé PDF)</div>
                  <div className="text-gray-700">
                    <strong>{name}</strong>
                    <pre className="mt-2 whitespace-pre-wrap">
                      {previewNotes || 'Aucune note pour cette étape.'}
                    </pre>
                  </div>
                </div>
              </>
            )
          ) : (
            <div className="text-muted-foreground text-sm">
              Sélectionne une étape valide pour afficher et compléter les informations.
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t bg-white px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            Enregistrer &amp; Fermer
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
