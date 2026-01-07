'use client';

import type { StepData, StepSections } from '@/store/useItineraryStore';

/** Rôle textuel d'une étape selon sa position. */
export function roleLabel(i: number, total: number): string {
  if (i === 0) return 'Départ';
  if (i === total - 1) return 'Arrivée';
  return `Étape ${i}`;
}

/**
 * Titre affiché pour une étape :
 * 1) step.name si présent
 * 2) sinon step.title
 * 3) sinon rôle (Départ / Étape n / Arrivée)
 */
export function displayStepTitle(step: StepData | undefined, i: number, total: number): string {
  if (!step) {
    // repli si étape manquante
    if (i === 0) return 'Départ';
    if (i === total - 1) return 'Arrivée';
    return `Étape ${i}`;
  }
  const name = (step.name ?? '').trim();
  if (name) return name;

  const title = (step.title ?? '').trim();
  if (title) return title;

  if (i === 0) return 'Départ';
  if (i === total - 1) return 'Arrivée';
  return `Étape ${i}`;
}

export function stringifyStepNotes(step?: StepData | null): string {
  if (!step) return ''; // ⬅️ évite "Cannot read properties of undefined"
  const n = step.notes;
  if (!n) return '';
  if (typeof n === 'string') return n.trim();

  // si ce n’est pas un objet, on ignore
  const sections = typeof n === 'object' && n ? (n as StepSections) : null;
  if (!sections) return '';

  const order: Array<[keyof StepSections, string]> = [
    ['activites', '🎯 Activités'],
    ['sorties', '🌙 Sorties'],
    ['restaurant', '🍽️ Restaurants'],
    ['cantine', '🥪 Cantines'],
    ['boulangerie', '🥖 Boulangeries'],
    ['epicerie', '🛒 Épiceries'],
    ['producteurs', '🧑‍🌾 Producteurs'],
    ['randonnees', '🥾 Randonnées'],
    ['rechargeEssence', '⛽ Essence'],
    ['rechargeElectrique', '🔌 Recharge électrique'],
    ['autresNotes', '📝 Autres notes'],
  ];

  const blocks = order
    .map(([key, label]) => {
      const raw = sections[key];
      const txt = typeof raw === 'string' ? raw.trim() : '';
      return txt ? `${label}\n${txt}` : '';
    })
    .filter(Boolean);

  return blocks.join('\n\n');
}

/** Formate une durée en minutes en "H h MM" ou "MM min". */
export function minutesToHhmm(totalMinutes?: number | null): string {
  if (totalMinutes == null || !Number.isFinite(totalMinutes)) return '—';
  const m = Math.max(0, Math.round(totalMinutes));
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return h > 0 ? `${h} h ${mm.toString().padStart(2, '0')}` : `${mm} min`;
}
