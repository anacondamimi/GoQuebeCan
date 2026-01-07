'use client';

import React, { useEffect, useRef } from 'react';
import { useItineraryStore } from '@/store/useItineraryStore';
import type { StepData, StepSections } from '@/store/useItineraryStore';

import H2 from '@/components/typography/H2';

interface Props {
  index: number;
}

// Clés canoniques (mêmes que StepSections)
const fields: Array<{ key: keyof StepSections; label: string; placeholder: string }> = [
  {
    key: 'activites',
    label: 'Activités',
    placeholder: 'Musée, croisière aux baleines, spa nordique…',
  },
  { key: 'sorties', label: 'Sorties', placeholder: 'Bars, spectacles, festivals…' },
  { key: 'restaurant', label: 'Restaurant', placeholder: 'Réservation, spécialités, budget…' },
  { key: 'cantine', label: 'Cantine', placeholder: 'Casse-croûte, snack, dépanneur chaud…' },
  { key: 'epicerie', label: 'Épicerie / Marché', placeholder: 'Adresse, produits locaux, SAQ…' },
  { key: 'boulangerie', label: 'Boulangerie', placeholder: 'Pains, viennoiseries, horaires…' },
  {
    key: 'producteurs',
    label: 'Producteurs à visiter',
    placeholder: 'Cidrerie X, Vignoble Y, Microbrasserie Z…',
  },
  { key: 'randonnees', label: 'Randonnées', placeholder: 'Sentiers, durée, dénivelé, sécurité…' },
  { key: 'rechargeEssence', label: 'Recharge (Essence)', placeholder: 'Stations, horaires, prix…' },
  {
    key: 'rechargeElectrique',
    label: 'Recharge (Électrique)',
    placeholder: 'Bornes, puissance, cartes, tarifs…',
  },
  { key: 'autresNotes', label: 'Autres notes', placeholder: 'Tout ce qui ne rentre pas ailleurs…' },
];

export default function StepDetailsManager({ index }: Props) {
  const itinerary = useItineraryStore((s) => s.itinerary);
  const setSection = useItineraryStore((s) => s.setSection);
  const updateStep = useItineraryStore((s) => s.updateStep);

  const step: StepData | undefined = itinerary[index];
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [index]);

  if (!step) return null;

  const notesObj: StepSections =
    step.notes && typeof step.notes === 'object' ? (step.notes as StepSections) : {};

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        updateStep(index, { photo: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <H2 className="text-xl font-bold">Détails de l’étape {index + 1}</H2>

      {/* Notes par catégorie */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.map(({ key, label, placeholder }) => {
          const id = `step-${index}-${key}`;
          return (
            <div key={String(key)}>
              <label htmlFor={id} className="mb-1 block text-sm font-semibold">
                {label}
              </label>
              <textarea
                id={id}
                ref={key === 'autresNotes' ? inputRef : undefined}
                rows={2}
                className="w-full rounded border p-2 text-gray-700"
                value={notesObj?.[key] ?? ''}
                onChange={(e) => setSection(index, key, e.target.value)}
                placeholder={placeholder}
              />
            </div>
          );
        })}
      </div>

      {/* Photo */}
      <div>
        <label htmlFor={`photo-${index}`} className="mb-1 block font-semibold">
          Ajouter une photo (.avif recommandé)
        </label>
        <input id={`photo-${index}`} type="file" accept="image/*" onChange={handleImageChange} />

        {step.photo && (
          <img
            src={step.photo}
            alt={`Étape ${index + 1}`}
            className="mt-4 max-h-64 rounded border"
          />
        )}
      </div>

      {/* Notation */}
      <fieldset>
        <legend className="mb-1 block font-semibold">Notez cette étape :</legend>

        <div role="radiogroup" aria-label="Notation par étoiles" className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => updateStep(index, { rating: n })}
              className={`rounded text-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                step.rating && step.rating >= n ? 'text-yellow-400' : 'text-gray-300'
              }`}
              aria-label={`Évaluer ${n} étoile${n > 1 ? 's' : ''}`}
              aria-pressed={step.rating === n}
            >
              ★
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
