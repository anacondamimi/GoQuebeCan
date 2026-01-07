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

// --- utils d'insertion d'étape ---

export type NewProducerStepInput = {
  id: string | number;
  name: string;
  lat: number;
  lng: number;
};

export function makeStepFromProducer(p: NewProducerStepInput): StepData {
  return {
    // ⬅️ le point clé : on met BIEN le nom du producteur ici
    name: p.name,
    producerId: p.id,
    kind: 'producer', // si StepData['kind'] existe dans ton type
    lat: p.lat,
    lng: p.lng,
    notes: {}, // sections vides—le modal les remplira
  } as StepData;
}
/* ===========================
   Types partagés (exportés)
   =========================== */

export interface StepPhoto {
  id: string;
  dataUrl: string; // image encodée (avif/webp/jpeg) en base64
  mime: string; // 'image/avif' | 'image/webp' | 'image/jpeg' | ...
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
}
export type StepKind = 'city' | 'producer';
/** Étape de l’itinéraire */
export interface StepData {
  name?: string; // nom canonique (ville/lieu/producteur)
  producerId?: string | number; // id du producteur (pour le reconnaître)
  lat: number;
  lng: number;
  title?: string; // nom du lieu (ex. “Montréal”)
  notes?: string | StepSections; // texte libre OU sections
  /** Distance/durée du tronçon i -> i+1 (remplis par le calcul de route) */
  distanceKm?: number;
  durationMin?: number;
  photos?: StepPhoto[];
  kind?: StepKind;
  // notes: soit objet typé (préféré), soit texte libre (legacy)

  // ✅ pour la carte “Détails” et le PDF
  photo?: string; // dataURL (ex: image/avif;base64,…)
  rating?: number; // 1..5
}

/** Forme de la polyline de l’itinéraire (pour filtrer les producteurs) */
export type RouteShape = Array<{ lat: number; lng: number }>;

/* ===========================
   État & actions du store
   =========================== */

interface ItineraryState {
  itinerary: StepData[];
  routeShape: RouteShape | null;

  // ——— Étapes (CRUD & réordonnancement)
  setItinerary: (steps: StepData[]) => void;
  addStepAtEnd: (step: StepData) => void;
  addStepAt: (index: number, step: StepData) => void;
  removeStep: (index: number) => void;
  moveStep: (from: number, to: number) => void;
  updateStep: (index: number, partial: Partial<StepData>) => void;
  setDeparture: (place: PlaceLike) => void;
  setArrival: (place: PlaceLike) => void;

  // ——— Notes (string ou sections)
  setNotesString: (index: number, text: string) => void;
  setNotesObject: (index: number, notes: StepSections) => void;
  setSection: <K extends keyof StepSections>(index: number, key: K, value: StepSections[K]) => void;
  appendToSection: <K extends keyof StepSections>(index: number, key: K, line: string) => void;

  // ——— Routage & métriques
  setDistanceDuration: (index: number, distanceKm: number, durationMin: number) => void;
  setRouteShape: (shape: RouteShape) => void;

  // ——— Photos (optionnel)
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

  addStepAtEnd: (step) => set((state) => ({ itinerary: [...state.itinerary, step] })),

  // Insère une étape entre Départ (index 0) et Arrivée (dernier index)
  // - index demandé est "clampé" dans [1, last]
  // - si index vise la fin, on insère juste avant l'Arrivée
  addStepAt: (index: number, step: StepData) =>
    set((state) => {
      const it = [...state.itinerary];
      if (it.length === 0) return state;

      const last = Math.max(1, it.length - 1); // dernier index autorisé d'insertion
      const pos = Math.min(Math.max(index, 1), last); // clamp → [1, last]
      it.splice(pos, 0, step);
      return { itinerary: it };
    }),

  // Supprime une étape "intermédiaire"
  // - protège Départ (0) et Arrivée (last)
  removeStep: (index: number) =>
    set((state) => {
      const len = state.itinerary.length;
      if (index <= 0 || index >= len - 1) return state; // protège 0 et last
      const it = [...state.itinerary];
      it.splice(index, 1);
      return { itinerary: it };
    }),

  // Déplace une étape "intermédiaire" vers une autre position autorisée
  // - protège Départ/Arrivée
  // - clamp la destination dans [1, last] après retrait de la source
  moveStep: (from: number, to: number) =>
    set((state) => {
      const len = state.itinerary.length;
      const last = len - 1;
      // interdit de bouger 0 ou last ; interdit les indices hors bornes
      if (from <= 0 || from >= last || to < 0 || to > last || from === to) {
        return state;
      }

      const it = [...state.itinerary];
      const [item] = it.splice(from, 1); // retire l'élément

      // longueur a changé, on recalcule la borne "last autorisé" (= avant l'Arrivée courante)
      const lastAfterRemoval = Math.max(1, it.length - 1);

      // si on déplace vers l'avant et que la source était avant la destination,
      // l'indice destination se décale d'une case après le retrait
      let dest = to;
      if (from < to) dest = to - 1;

      // clamp final dans [1, lastAfterRemoval]
      dest = Math.min(Math.max(dest, 1), lastAfterRemoval);

      it.splice(dest, 0, item);
      return { itinerary: it };
    }),

  // Départ : on écrit le "vrai nom" (Montréal, etc.)
  setDeparture: (place: PlaceLike) =>
    set((s) => {
      const arr = Array.isArray(s.itinerary) ? [...s.itinerary] : [];
      if (!arr[0])
        arr[0] = { lat: place.lat, lng: place.lng, notes: {} as StepSections } as StepData;
      arr[0] = {
        ...arr[0],
        lat: place.lat,
        lng: place.lng,
        name: extractPlaceName(place) || arr[0].name || 'Départ',
        // kind: 'city' as StepData['kind'], // décommente si tu utilises 'kind'
      };
      return { itinerary: arr };
    }),

  setArrival: (place: PlaceLike) =>
    set((s) => {
      const arr = Array.isArray(s.itinerary) ? [...s.itinerary] : [];
      const last = Math.max(0, arr.length - 1);
      if (!arr[last])
        arr[last] = { lat: place.lat, lng: place.lng, notes: {} as StepSections } as StepData;
      arr[last] = {
        ...arr[last],
        lat: place.lat,
        lng: place.lng,
        name: extractPlaceName(place) || arr[last].name || 'Arrivée',
        // kind: 'city' as StepData['kind'],
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
      // clone simple pour éviter les mutations
      const obj: StepSections = { ...notes };
      it[index] = { ...it[index], notes: obj };
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

      const prevText = (prevObj[key] ?? '').toString().trim();
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

  /* ——— Photos ——— */

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
