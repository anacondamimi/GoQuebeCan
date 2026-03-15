import React, { useEffect, useMemo, useRef, useState } from 'react';
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

/* =========================
   Types locaux enrichis
========================= */

type StepModalProps = {
  isOpen: boolean;
  stepIndex: number;
  onClose: () => void;
  onDeleteStep?: (index: number) => void;
};

type ExtendedStepSections = StepSections & {
  adresse?: string;
  telephone?: string;
  lienUtile?: string;
  budgetEstime?: string;
  momentConseille?: string;
  statut?: string;
  reservation?: string;
  aNePasOublier?: string;
  souvenirPhoto?: string;
  legendePhoto?: string;
};

/* =========================
   Utils
========================= */

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

function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function getStatusBadgeClass(status?: string): string {
  switch ((status || '').toLowerCase()) {
    case 'réservé':
    case 'reserve':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'terminé':
    case 'termine':
      return 'bg-green-50 text-green-700 border-green-200';
    case 'à faire':
    case 'a faire':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
}

const experienceFields: Array<{
  key: keyof ExtendedStepSections;
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
  {
    key: 'sorties',
    label: 'Sorties',
    placeholder: 'Bars, spectacles, festivals…',
    emoji: '🎭',
  },
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
    key: 'epicerie',
    label: 'Épicerie / Marché',
    placeholder: 'Adresse, produits locaux, SAQ…',
    emoji: '🛒',
  },
  {
    key: 'boulangerie',
    label: 'Boulangerie',
    placeholder: 'Pains, viennoiseries, horaires…',
    emoji: '🥖',
  },
  {
    key: 'producteurs',
    label: 'Producteurs à visiter',
    placeholder: 'Cidrerie X, Vignoble Y, Microbrasserie Z…',
    emoji: '🧺',
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
];

type TabKey = 'infos' | 'experience' | 'memo' | 'media' | 'resume';

/* =========================
   Component
========================= */

export default function StepModal({ isOpen, stepIndex, onClose, onDeleteStep }: StepModalProps) {
  const itinerary = useItineraryStore((s) => s.itinerary);
  const setSection = useItineraryStore((s) => s.setSection);
  const appendToSection = useItineraryStore((s) => s.appendToSection);
  const updateStep = useItineraryStore((s) => s.updateStep);

  const [activeTab, setActiveTab] = useState<TabKey>('infos');
  const firstSelectRef = useRef<HTMLSelectElement | null>(null);
  const firstTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const hasValidIndex =
    Number.isInteger(stepIndex) && stepIndex >= 0 && stepIndex < itinerary.length;

  const step: StepData | undefined = hasValidIndex ? itinerary[stepIndex] : undefined;

  const notesObj: ExtendedStepSections =
    step && typeof step.notes === 'object' && step.notes
      ? (step.notes as ExtendedStepSections)
      : {};

  useEffect(() => {
    if (isOpen) {
      setActiveTab('infos');
      setTimeout(() => {
        firstSelectRef.current?.focus();
      }, 60);
    }
  }, [isOpen, stepIndex]);

  const role = hasValidIndex ? roleLabel(stepIndex, itinerary.length) : 'Étape';
  const name = hasValidIndex ? displayTitleUtil(step, stepIndex, itinerary.length) : 'Étape';
  const progression =
    hasValidIndex && itinerary.length > 0
      ? `Étape ${Math.min(stepIndex + 1, itinerary.length)}/${itinerary.length}`
      : '';

  const previewNotes = stringifyStepNotes(step);

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

  const status = notesObj?.statut ?? '';
  const budget = notesObj?.budgetEstime ?? '';
  const souvenir = notesObj?.souvenirPhoto ?? '';
  const hasPhoto = !!step?.photo;

  const completedCount = useMemo(() => {
    const values = Object.values(notesObj || {});
    const textCount = values.filter((v) => typeof v === 'string' && v.trim().length > 0).length;
    return textCount + (step?.photo ? 1 : 0) + (step?.rating ? 1 : 0);
  }, [notesObj, step?.photo, step?.rating]);

  const copyCoords = async () => {
    try {
      await navigator.clipboard.writeText(coordinates);
    } catch (err) {
      console.warn('Clipboard non disponible:', err);
    }
  };

  const copyAddress = async () => {
    try {
      if (notesObj?.adresse?.trim()) {
        await navigator.clipboard.writeText(notesObj.adresse.trim());
      }
    } catch (err) {
      console.warn('Clipboard non disponible:', err);
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

  const openUsefulLink = () => {
    const url = normalizeUrl(notesObj?.lienUtile ?? '');
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !hasValidIndex) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        updateStep(stepIndex, { photo: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const clearPhoto = () => {
    if (!hasValidIndex) return;
    updateStep(stepIndex, { photo: '' });
  };

  const setExtendedSection = (key: keyof ExtendedStepSections, value: string) => {
    if (!hasValidIndex) return;
    setSection(stepIndex, key, value);
  };

  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: 'infos', label: 'Infos' },
    { key: 'experience', label: 'Expérience' },
    { key: 'memo', label: 'Mémo' },
    { key: 'media', label: 'Média' },
    { key: 'resume', label: 'Résumé' },
  ];

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[92svh] max-w-2xl overflow-hidden p-0 sm:max-h-[88vh] sm:max-w-5xl">
        <DialogHeader className="border-b bg-gradient-to-r from-sky-50 via-white to-indigo-50 px-5 pb-4 pt-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold sm:text-2xl">
                {name}
                {progression && (
                  <span className="ml-2 text-sm font-normal text-gray-500">({progression})</span>
                )}
              </DialogTitle>

              <DialogDescription className="mt-1 text-sm text-gray-600">
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

              <div className="mt-3 flex flex-wrap gap-2">
                {status ? (
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusBadgeClass(
                      status,
                    )}`}
                  >
                    {status}
                  </span>
                ) : (
                  <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
                    Statut non défini
                  </span>
                )}

                {budget ? (
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
                    Budget : {budget}
                  </span>
                ) : null}

                {souvenir ? (
                  <span className="rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-xs text-pink-700">
                    Souvenir prévu
                  </span>
                ) : null}

                {hasPhoto ? (
                  <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs text-sky-700">
                    1 photo
                  </span>
                ) : null}

                {step?.rating ? (
                  <span className="rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1 text-xs text-yellow-700">
                    Note : {step.rating}/5
                  </span>
                ) : null}

                <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs text-violet-700">
                  {completedCount} infos remplies
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 md:justify-end">
              <button
                type="button"
                onClick={copyCoords}
                className="rounded-md border bg-white px-2.5 py-1.5 text-xs hover:bg-gray-50"
              >
                📋 Copier coordonnées
              </button>

              {notesObj?.adresse?.trim() ? (
                <button
                  type="button"
                  onClick={copyAddress}
                  className="rounded-md border bg-white px-2.5 py-1.5 text-xs hover:bg-gray-50"
                >
                  📍 Copier adresse
                </button>
              ) : null}

              <button
                type="button"
                onClick={openAppleMaps}
                className="rounded-md border bg-white px-2.5 py-1.5 text-xs hover:bg-gray-50"
              >
                 Ouvrir dans Plans
              </button>

              {notesObj?.lienUtile?.trim() ? (
                <button
                  type="button"
                  onClick={openUsefulLink}
                  className="rounded-md border bg-white px-2.5 py-1.5 text-xs hover:bg-gray-50"
                >
                  🔗 Ouvrir le lien
                </button>
              ) : null}

              {isProducerStep && onDeleteStep && hasValidIndex ? (
                <button
                  type="button"
                  onClick={() => onDeleteStep(stepIndex)}
                  className="rounded-md border border-red-300 bg-white px-2.5 py-1.5 text-xs text-red-700 hover:bg-red-50"
                >
                  🗑️ Supprimer cette étape producteur
                </button>
              ) : null}
            </div>
          </div>
        </DialogHeader>

        <div className="border-b bg-white px-5 py-3">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`rounded-full px-3 py-1.5 text-sm transition ${
                    active
                      ? 'bg-gray-900 text-white'
                      : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-h-[calc(100svh-15rem)] overflow-y-auto px-5 py-4 sm:max-h-[calc(88vh-13rem)]">
          {hasValidIndex ? (
            <>
              {activeTab === 'infos' && (
                <section className="space-y-5">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-xl border bg-white p-4">
                      <label className="mb-1 block text-sm font-medium">Statut</label>
                      <select
                        ref={firstSelectRef}
                        value={notesObj?.statut ?? ''}
                        onChange={(e) => setExtendedSection('statut', e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                      >
                        <option value="">Choisir</option>
                        <option value="À faire">À faire</option>
                        <option value="Réservé">Réservé</option>
                        <option value="Terminé">Terminé</option>
                      </select>
                    </div>

                    <div className="rounded-xl border bg-white p-4">
                      <label className="mb-1 block text-sm font-medium">Budget estimé</label>
                      <input
                        type="text"
                        value={notesObj?.budgetEstime ?? ''}
                        onChange={(e) => setExtendedSection('budgetEstime', e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                        placeholder="Ex. 40$ à 70$ / personne"
                      />
                    </div>

                    <div className="rounded-xl border bg-white p-4">
                      <label className="mb-1 block text-sm font-medium">Moment conseillé</label>
                      <input
                        type="text"
                        value={notesObj?.momentConseille ?? ''}
                        onChange={(e) => setExtendedSection('momentConseille', e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                        placeholder="Matin, coucher du soleil, après-midi…"
                      />
                    </div>

                    <div className="rounded-xl border bg-white p-4">
                      <label className="mb-1 block text-sm font-medium">Réservation</label>
                      <input
                        type="text"
                        value={notesObj?.reservation ?? ''}
                        onChange={(e) => setExtendedSection('reservation', e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                        placeholder="Oui, non, à appeler, déjà payé…"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="rounded-xl border bg-white p-4">
                      <label className="mb-1 block text-sm font-medium">Adresse</label>
                      <textarea
                        ref={firstTextareaRef}
                        rows={2}
                        value={notesObj?.adresse ?? ''}
                        onChange={(e) => setExtendedSection('adresse', e.target.value)}
                        className="w-full rounded-md border px-3 py-2"
                        placeholder="Adresse complète de l’étape…"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="rounded-xl border bg-white p-4">
                        <label className="mb-1 block text-sm font-medium">Téléphone</label>
                        <input
                          type="text"
                          value={notesObj?.telephone ?? ''}
                          onChange={(e) => setExtendedSection('telephone', e.target.value)}
                          className="w-full rounded-md border px-3 py-2"
                          placeholder="Ex. 450-000-0000"
                        />
                      </div>

                      <div className="rounded-xl border bg-white p-4">
                        <label className="mb-1 block text-sm font-medium">Lien utile</label>
                        <input
                          type="text"
                          value={notesObj?.lienUtile ?? ''}
                          onChange={(e) => setExtendedSection('lienUtile', e.target.value)}
                          className="w-full rounded-md border px-3 py-2"
                          placeholder="booking.com / site officiel / menu…"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {activeTab === 'experience' && (
                <section className="space-y-4">
                  {isProducerStep ? (
                    <div className="rounded-xl border bg-amber-50 p-4 text-sm text-amber-800">
                      Cette étape semble être un producteur. Tu peux quand même ajouter des notes
                      utiles dans l’onglet <strong>Mémo</strong> et joindre une photo dans{' '}
                      <strong>Média</strong>.
                    </div>
                  ) : null}

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {experienceFields.map(({ key, label, placeholder, emoji }) => (
                      <div key={String(key)} className="rounded-xl border bg-white p-3">
                        <label
                          htmlFor={`step-${stepIndex}-${String(key)}`}
                          className="mb-1 block text-sm font-medium"
                        >
                          <span className="mr-1">{emoji}</span>
                          {label}
                        </label>
                        <textarea
                          id={`step-${stepIndex}-${String(key)}`}
                          value={notesObj?.[key] ?? ''}
                          onChange={(e) => setExtendedSection(key, e.target.value)}
                          rows={4}
                          className="w-full rounded-md border px-3 py-2"
                          placeholder={placeholder}
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeTab === 'memo' && (
                <section className="space-y-4">
                  <div className="rounded-xl border bg-white p-4">
                    <label className="mb-1 block text-sm font-medium">📝 Notes libres</label>
                    <textarea
                      value={notesObj?.autresNotes ?? ''}
                      onChange={(e) => setExtendedSection('autresNotes', e.target.value)}
                      rows={5}
                      className="w-full rounded-md border px-3 py-2"
                      placeholder="Idées, rappels, liens, petits détails qui comptent…"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-xl border bg-white p-4">
                      <label className="mb-1 block text-sm font-medium">🎒 À ne pas oublier</label>
                      <textarea
                        value={notesObj?.aNePasOublier ?? ''}
                        onChange={(e) => setExtendedSection('aNePasOublier', e.target.value)}
                        rows={4}
                        className="w-full rounded-md border px-3 py-2"
                        placeholder="Billets, maillot, gourde, argent comptant…"
                      />
                    </div>

                    <div className="rounded-xl border bg-white p-4">
                      <label className="mb-1 block text-sm font-medium">
                        📸 Souvenir / photo à prendre
                      </label>
                      <textarea
                        value={notesObj?.souvenirPhoto ?? ''}
                        onChange={(e) => setExtendedSection('souvenirPhoto', e.target.value)}
                        rows={4}
                        className="w-full rounded-md border px-3 py-2"
                        placeholder="Photo au coucher du soleil, pont, vue, moment de famille…"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
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
                    <button
                      type="button"
                      onClick={() =>
                        appendToSection(stepIndex, 'autresNotes', '❤️ Moment fort attendu : ')
                      }
                      className="rounded-md border px-2 py-1 hover:bg-gray-50"
                    >
                      + Moment fort
                    </button>
                  </div>
                </section>
              )}

              {activeTab === 'media' && (
                <section className="space-y-4">
                  <div className="rounded-xl border bg-white p-4">
                    <label htmlFor={`photo-${stepIndex}`} className="block text-sm font-medium">
                      📷 Ajouter une photo (.avif recommandé)
                    </label>

                    <input
                      id={`photo-${stepIndex}`}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="mt-2 block w-full text-sm"
                    />

                    {step?.photo ? (
                      <div className="mt-4">
                        <img
                          src={step.photo}
                          alt={`Étape ${stepIndex + 1}`}
                          className="max-h-80 rounded-xl border object-cover"
                        />

                        <div className="mt-3">
                          <label className="mb-1 block text-sm font-medium">Légende photo</label>
                          <input
                            type="text"
                            value={notesObj?.legendePhoto ?? ''}
                            onChange={(e) => setExtendedSection('legendePhoto', e.target.value)}
                            className="w-full rounded-md border px-3 py-2"
                            placeholder="Ex. Vue magnifique sur le fjord en fin de journée"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={clearPhoto}
                          className="mt-3 rounded-md border border-red-300 px-2.5 py-1.5 text-xs text-red-700 hover:bg-red-50"
                        >
                          Supprimer la photo
                        </button>
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-gray-500">
                        Aucune photo ajoutée pour cette étape.
                      </p>
                    )}
                  </div>

                  <fieldset className="rounded-xl border bg-white p-4">
                    <legend className="px-1 text-sm font-semibold">⭐ Notez cette étape</legend>

                    <div
                      role="radiogroup"
                      aria-label="Notation par étoiles"
                      className="mt-3 flex gap-1"
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => updateStep(stepIndex, { rating: n })}
                          className={`rounded text-3xl leading-none transition focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                            step?.rating && step.rating >= n ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          aria-label={`Évaluer ${n} étoile${n > 1 ? 's' : ''}`}
                          aria-pressed={step?.rating === n}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </fieldset>
                </section>
              )}

              {activeTab === 'resume' && (
                <section className="space-y-4">
                  <div className="rounded-xl border bg-gray-50 p-4 text-sm">
                    <div className="mb-2 text-base font-semibold">Aperçu synthèse de l’étape</div>

                    <div className="space-y-2 text-gray-700">
                      <p>
                        <strong>{name}</strong>
                      </p>

                      {notesObj?.statut ? (
                        <p>
                          <strong>Statut :</strong> {notesObj.statut}
                        </p>
                      ) : null}

                      {notesObj?.momentConseille ? (
                        <p>
                          <strong>Moment conseillé :</strong> {notesObj.momentConseille}
                        </p>
                      ) : null}

                      {notesObj?.budgetEstime ? (
                        <p>
                          <strong>Budget :</strong> {notesObj.budgetEstime}
                        </p>
                      ) : null}

                      {notesObj?.adresse ? (
                        <p>
                          <strong>Adresse :</strong> {notesObj.adresse}
                        </p>
                      ) : null}

                      {notesObj?.telephone ? (
                        <p>
                          <strong>Téléphone :</strong> {notesObj.telephone}
                        </p>
                      ) : null}

                      {notesObj?.reservation ? (
                        <p>
                          <strong>Réservation :</strong> {notesObj.reservation}
                        </p>
                      ) : null}

                      {notesObj?.souvenirPhoto ? (
                        <p>
                          <strong>Souvenir à capturer :</strong> {notesObj.souvenirPhoto}
                        </p>
                      ) : null}

                      {notesObj?.aNePasOublier ? (
                        <p>
                          <strong>À ne pas oublier :</strong> {notesObj.aNePasOublier}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="rounded-xl border bg-white p-4 text-sm">
                    <div className="mb-2 text-base font-semibold">Aperçu notes exportables</div>
                    <pre className="whitespace-pre-wrap font-sans text-gray-700">
                      {previewNotes || 'Aucune note pour cette étape.'}
                    </pre>
                  </div>
                </section>
              )}
            </>
          ) : (
            <div className="text-sm text-gray-500">
              Sélectionne une étape valide pour afficher et compléter les informations.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t bg-white px-5 py-3">
          <div className="text-xs text-gray-500">
            Plus tu complètes cette étape, plus ton itinéraire devient vivant et agréable à suivre.
          </div>

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
