// src/store/useItineraryStore.ts
'use client';

import { create } from 'zustand';

type PlaceLike = {
  name?: string;
  label?: string;
  city?: string;
  displayName?: string;
  location?: { name?: string };
  lat: number;
  lng: number;
};

function extractPlaceName(p: PlaceLike): string {
  const candidates = [p.name, p.label, p.city, p.displayName, p.location?.name];
  for (const v of candidates) {
    if (typeof v === 'string') {
      const t = v.trim();
      if (t.length >= 2) return t;
    }
  }
  return '';
}

/* ===========================
   Utils d'insertion d'étape
   =========================== */

export type NewProducerStepInput = {
  id: string | number;
  name: string;
  lat: number;
  lng: number;
};

export type StepKind = 'city' | 'producer';

export interface StepPhoto {
  id: string;
  dataUrl: string;
  mime: string;
  width?: number;
  height?: number;
  caption?: string;
}

/** Champs thématiques pour une étape (notes structurées) */
export interface StepSections {
  activites?: string;
  sorties?: string;
  restaurant?: string;
  cantine?: string;
  boulangerie?: string;
  epicerie?: string;
  producteurs?: string;
  randonnees?: string;
  rechargeEssence?: string;
  rechargeElectrique?: string;
  autresNotes?: string;

  // Nouveaux champs premium pour le modal
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
}

/** Étape de l’itinéraire */
export interface StepData {
  name?: string;
  producerId?: string | number;
  lat: number;
  lng: number;
  title?: string;
  notes?: string | StepSections;
  distanceKm?: number;
  durationMin?: number;
  photos?: StepPhoto[];
  kind?: StepKind;

  // Compat ancienne version / export rapide
  photo?: string;
  rating?: number;
}

export type RouteShape = Array<{ lat: number; lng: number }>;

export function makeStepFromProducer(p: NewProducerStepInput): StepData {
  return {
    name: p.name,
    title: p.name,
    producerId: p.id,
    kind: 'producer',
    lat: p.lat,
    lng: p.lng,
    notes: {},
  };
}

/* ===========================
   État & actions du store
   =========================== */

interface ItineraryState {
  itinerary: StepData[];
  routeShape: RouteShape | null;

  // Étapes
  setItinerary: (steps: StepData[]) => void;
  addStepAtEnd: (step: StepData) => void;
  addStepAt: (index: number, step: StepData) => void;
  removeStep: (index: number) => void;
  moveStep: (from: number, to: number) => void;
  updateStep: (index: number, partial: Partial<StepData>) => void;
  setDeparture: (place: PlaceLike) => void;
  setArrival: (place: PlaceLike) => void;

  // Notes
  setNotesString: (index: number, text: string) => void;
  setNotesObject: (index: number, notes: StepSections) => void;
  setSection: <K extends keyof StepSections>(index: number, key: K, value: StepSections[K]) => void;
  appendToSection: <K extends keyof StepSections>(index: number, key: K, line: string) => void;

  // Routage
  setDistanceDuration: (index: number, distanceKm: number, durationMin: number) => void;
  setRouteShape: (shape: RouteShape) => void;

  // Photos multiples
  addPhoto: (index: number, photo: StepPhoto) => void;
  removePhoto: (index: number, photoId: string) => void;
  movePhoto: (index: number, from: number, to: number) => void;
  setPhotoCaption: (index: number, photoId: string, caption: string) => void;
}

/* ===========================
   Implémentation Zustand
   =========================== */

export const useItineraryStore = create<ItineraryState>((set) => ({
  itinerary: [],
  routeShape: null,

  /* ——— Étapes ——— */

  setItinerary: (steps) => set({ itinerary: steps }),

  addStepAtEnd: (step) =>
    set((state) => ({
      itinerary: [...state.itinerary, step],
    })),

  addStepAt: (index: number, step: StepData) =>
    set((state) => {
      const it = [...state.itinerary];
      if (it.length === 0) return state;

      const last = Math.max(1, it.length - 1);
      const pos = Math.min(Math.max(index, 1), last);

      it.splice(pos, 0, step);
      return { itinerary: it };
    }),

  removeStep: (index: number) =>
    set((state) => {
      const len = state.itinerary.length;
      if (index <= 0 || index >= len - 1) return state;

      const it = [...state.itinerary];
      it.splice(index, 1);
      return { itinerary: it };
    }),

  moveStep: (from: number, to: number) =>
    set((state) => {
      const len = state.itinerary.length;
      const last = len - 1;

      if (from <= 0 || from >= last || to < 0 || to > last || from === to) {
        return state;
      }

      const it = [...state.itinerary];
      const [item] = it.splice(from, 1);

      const lastAfterRemoval = Math.max(1, it.length - 1);

      let dest = to;
      if (from < to) dest = to - 1;

      dest = Math.min(Math.max(dest, 1), lastAfterRemoval);

      it.splice(dest, 0, item);
      return { itinerary: it };
    }),

  setDeparture: (place: PlaceLike) =>
    set((state) => {
      const arr = Array.isArray(state.itinerary) ? [...state.itinerary] : [];

      if (!arr[0]) {
        arr[0] = {
          lat: place.lat,
          lng: place.lng,
          name: 'Départ',
          title: 'Départ',
          kind: 'city',
          notes: {},
        };
      }

      arr[0] = {
        ...arr[0],
        lat: place.lat,
        lng: place.lng,
        name: extractPlaceName(place) || arr[0].name || 'Départ',
        title: extractPlaceName(place) || arr[0].title || 'Départ',
        kind: 'city',
      };

      return { itinerary: arr };
    }),

  setArrival: (place: PlaceLike) =>
    set((state) => {
      const arr = Array.isArray(state.itinerary) ? [...state.itinerary] : [];
      const last = Math.max(0, arr.length - 1);

      if (!arr[last]) {
        arr[last] = {
          lat: place.lat,
          lng: place.lng,
          name: 'Arrivée',
          title: 'Arrivée',
          kind: 'city',
          notes: {},
        };
      }

      arr[last] = {
        ...arr[last],
        lat: place.lat,
        lng: place.lng,
        name: extractPlaceName(place) || arr[last].name || 'Arrivée',
        title: extractPlaceName(place) || arr[last].title || 'Arrivée',
        kind: 'city',
      };

      return { itinerary: arr };
    }),

  updateStep: (index, partial) =>
    set((state) => {
      const it = [...state.itinerary];
      if (!it[index]) return state;

      it[index] = { ...it[index], ...partial };
      return { itinerary: it };
    }),

  /* ——— Notes ——— */

  setNotesString: (index, text) =>
    set((state) => {
      const it = [...state.itinerary];
      if (!it[index]) return state;

      it[index] = { ...it[index], notes: text };
      return { itinerary: it };
    }),

  setNotesObject: (index, notes) =>
    set((state) => {
      const it = [...state.itinerary];
      if (!it[index]) return state;

      it[index] = { ...it[index], notes: { ...notes } };
      return { itinerary: it };
    }),

  setSection: (index, key, value) =>
    set((state) => {
      const it = [...state.itinerary];
      const step = it[index];
      if (!step) return state;

      const prevObj: StepSections =
        step.notes && typeof step.notes === 'object' ? { ...(step.notes as StepSections) } : {};

      prevObj[key] = value ?? '';
      it[index] = { ...step, notes: prevObj };

      return { itinerary: it };
    }),

  appendToSection: (index, key, line) =>
    set((state) => {
      const it = [...state.itinerary];
      const step = it[index];
      if (!step) return state;

      const prevObj: StepSections =
        step.notes && typeof step.notes === 'object' ? { ...(step.notes as StepSections) } : {};

      const prevText = String(prevObj[key] ?? '').trim();
      const nextText = [prevText, line].filter(Boolean).join('\n');

      prevObj[key] = nextText;
      it[index] = { ...step, notes: prevObj };

      return { itinerary: it };
    }),

  /* ——— Routage & métriques ——— */

  setDistanceDuration: (index, distanceKm, durationMin) =>
    set((state) => {
      const it = [...state.itinerary];
      if (!it[index]) return state;

      it[index] = { ...it[index], distanceKm, durationMin };
      return { itinerary: it };
    }),

  setRouteShape: (shape) => set({ routeShape: [...shape] }),

  /* ——— Photos multiples ——— */

  addPhoto: (index, photo) =>
    set((state) => {
      const it = [...state.itinerary];
      if (!it[index]) return state;

      const photos = [...(it[index].photos ?? []), photo];
      it[index] = { ...it[index], photos };

      return { itinerary: it };
    }),

  removePhoto: (index, photoId) =>
    set((state) => {
      const it = [...state.itinerary];
      if (!it[index]) return state;

      const photos = (it[index].photos ?? []).filter((p) => p.id !== photoId);
      it[index] = { ...it[index], photos };

      return { itinerary: it };
    }),

  movePhoto: (index, from, to) =>
    set((state) => {
      const it = [...state.itinerary];
      const step = it[index];
      if (!step) return state;

      const photos = [...(step.photos ?? [])];
      if (from < 0 || to < 0 || from >= photos.length || to >= photos.length || from === to) {
        return state;
      }

      const [item] = photos.splice(from, 1);
      photos.splice(to, 0, item);

      it[index] = { ...step, photos };
      return { itinerary: it };
    }),

  setPhotoCaption: (index, photoId, caption) =>
    set((state) => {
      const it = [...state.itinerary];
      const step = it[index];
      if (!step) return state;

      const photos = (step.photos ?? []).map((p) => (p.id === photoId ? { ...p, caption } : p));

      it[index] = { ...step, photos };
      return { itinerary: it };
    }),
}));
