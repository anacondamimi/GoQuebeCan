'use client';

import React, { useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import producersData from '@/data/producers.json';
import {
  useItineraryStore,
  makeStepFromProducer,
  type StepSections,
} from '@/store/useItineraryStore';
import {
  filterProducers,
  detectCategory,
  type Coord,
  type Producer,
  type ProducerCategory,
} from '@/utils/producersFilters';

type Props = {
  routePoints: Coord[];
  selectedCategories: ProducerCategory[];
  onlyNearby: boolean;
  thresholdKm?: number;
};

const icons: Record<ProducerCategory | 'default', Icon> = {
  cidrerie: new Icon({ iconUrl: '/icons/apple.png', iconSize: [28, 28] }),
  vignoble: new Icon({ iconUrl: '/icons/grapes.png', iconSize: [28, 28] }),
  fromage: new Icon({ iconUrl: '/icons/fromage.png', iconSize: [28, 28] }),
  petitfruit: new Icon({ iconUrl: '/icons/berry.png', iconSize: [28, 28] }),
  microbrasserie: new Icon({ iconUrl: '/icons/microbrasserie.png', iconSize: [28, 28] }),
  miel: new Icon({ iconUrl: '/icons/miel.png', iconSize: [28, 28] }),
  ferme: new Icon({ iconUrl: '/icons/ferme.png', iconSize: [28, 28] }),
  default: new Icon({ iconUrl: '/icons/ferme.png', iconSize: [28, 28] }),
};

function getNearestStepIndex(
  itinerary: ReadonlyArray<{ lat?: number; lng?: number }>,
  lat: number,
  lng: number,
): number {
  let best = 0;
  let bestD = Number.POSITIVE_INFINITY;
  for (let i = 0; i < itinerary.length; i++) {
    const a = itinerary[i];
    const dx = typeof a.lat === 'number' ? a.lat - lat : 9999;
    const dy = typeof a.lng === 'number' ? a.lng - lng : 9999;
    const d = dx * dx + dy * dy;
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}

export default function ProducersOnRouteLayer({
  routePoints,
  selectedCategories,
  onlyNearby,
  thresholdKm = 30,
}: Props) {
  // source des producteurs
  const producers = useMemo<Producer[]>(() => producersData as Producer[], []);

  // filtrage (autour de la route + catégories)
  const list = useMemo(
    () =>
      filterProducers({
        producers,
        selectedCategories,
        onlyNearby,
        routePoints,
        thresholdKm,
      }),
    [producers, selectedCategories, onlyNearby, routePoints, thresholdKm],
  );

  // 1) Ajouter après l’étape la plus proche (sans dépasser l’Arrivée)
  const addAfterNearest = (p: Producer) => {
    const { itinerary, addStepAt } = useItineraryStore.getState();
    const idx = getNearestStepIndex(itinerary, p.lat, p.lng);
    const insertAt = Math.min(Math.max(1, idx + 1), Math.max(1, itinerary.length - 1));
    addStepAt(insertAt, makeStepFromProducer({ id: p.id, name: p.name, lat: p.lat, lng: p.lng }));
  };

  // 2) Ajouter juste avant l’Arrivée
  const addBeforeArrival = (p: Producer) => {
    const { itinerary, addStepAt } = useItineraryStore.getState();
    const insertAt = Math.max(1, itinerary.length - 1);
    addStepAt(insertAt, makeStepFromProducer({ id: p.id, name: p.name, lat: p.lat, lng: p.lng }));
  };

  // 3) Ajouter aux notes (section "producteurs") de l’étape la plus proche
  const addToNearestNotes = (p: Producer) => {
    const { itinerary, appendToSection } = useItineraryStore.getState();
    if (!Array.isArray(itinerary) || itinerary.length === 0) return;

    const idx = getNearestStepIndex(itinerary, p.lat, p.lng);
    const parts = [
      `• ${p.name}`,
      p.type ? `(${p.type})` : '',
      p.address ? `– ${p.address}` : '',
      p.website ? `– ${p.website}` : '',
    ].filter(Boolean);
    const text = parts.join(' ');

    const SECTION: keyof StepSections = 'producteurs';
    appendToSection(idx, SECTION, text);
  };

  return (
    <React.Fragment>
      {list.map((p) => {
        const cat = detectCategory(p);
        const icon = icons[cat] || icons.default;
        return (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
            <Popup>
              <div className="w-64 space-y-2 text-sm">
                <div className="font-semibold">{p.name}</div>
                {p.type && <div className="text-gray-600">{p.type}</div>}
                {p.website ? (
                  <a
                    href={p.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    site web
                  </a>
                ) : (
                  <span className="italic text-gray-500">Aucun site web</span>
                )}

                <div className="mt-2 grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    onClick={() => addAfterNearest(p)}
                    className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
                  >
                    ➕ Nouvelle étape (après la plus proche)
                  </button>
                  <button
                    type="button"
                    onClick={() => addBeforeArrival(p)}
                    className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
                  >
                    ➕ Ajouter avant l’arrivée
                  </button>
                  <button
                    type="button"
                    onClick={() => addToNearestNotes(p)}
                    className="rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
                  >
                    ➕ Ajouter aux notes (étape la plus proche)
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </React.Fragment>
  );
}
