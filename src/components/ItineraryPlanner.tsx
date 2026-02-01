'use client';

import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import MapboxAutocomplete from '@/components/MapboxAutocomplete';
import { useItineraryStore } from '@/store/useItineraryStore';
import { saveItinerary } from '@/utils/itineraryStorage.client';
import producersData from '@/data/producers.json';
import type { Producer } from '@/types/Producer';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import { extractCoords, extractLabel, haversineKm } from '@/utils/geocodeHelpers';

import StepModal from '@/components/StepModal';

// 🧩 Données producteurs
const producersList: Producer[] = producersData as Producer[];

// Types uniques de producteurs (cidrerie, miel, bière, etc.)
const ALL_PRODUCER_TYPES: string[] = Array.from(
  new Set(
    producersList
      .map((p) => p.type)
      .filter((t): t is string => typeof t === 'string' && t.trim().length > 0),
  ),
);

// 🗺️ Carte (Leaflet + LRM)
const MapWithRouting = dynamic(() => import('@/components/MapWithRouting'), {
  ssr: false,
});

// 📄 Résumé (render client)
const ItinerarySummary = dynamic(() => import('@/components/ItinerarySummary'), { ssr: false });

// === Types internes ===

type StepTuple = {
  id: string;
  name: string;
  /** Coordonnées Mapbox: [lng, lat] */
  coordinates: [number, number];
};

type GeocodingDetail = {
  label?: string;
  place_name?: string;
  text?: string;
  name?: string;
  coordinates?: [number, number];
  center?: [number, number];
  lngLat?: [number, number];
  lon?: number;
  lat?: number;
  longitude?: number;
  latitude?: number;
};

// Libellé humain pour les filtres
function typeLabel(type: string): string {
  switch (type) {
    case 'cidrerie':
      return 'Cidreries';
    case 'vignoble':
      return 'Vignobles';
    case 'fromage':
      return 'Fromageries';
    case 'microbrasserie':
      return 'Microbrasseries';
    case 'miel':
    case 'apiculteur':
      return 'Miel';
    case 'petitfruit':
      return 'Petits fruits';
    case 'ferme':
      return 'Fermes';
    default:
      return type;
  }
}

export default function ItineraryPlanner() {
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';

  // Champs de saisie texte (pour affichage)
  const [startInput, setStartInput] = useState('');
  const [endInput, setEndInput] = useState('');

  // Coords sélectionnées via Mapbox ([lng, lat])
  const [start, setStart] = useState<[number, number] | null>(null);
  const [end, setEnd] = useState<[number, number] | null>(null);
  const [tempSteps, setTempSteps] = useState<StepTuple[]>([]);

  // Itinéraire validé (étapes)
  const [steps, setSteps] = useState<StepTuple[]>([]);

  // Erreur formulaire
  const [formError, setFormError] = useState('');

  // Filtres producteurs (types sélectionnés)
  const [selectedTypes, setSelectedTypes] = useState<string[]>(ALL_PRODUCER_TYPES);

  // Modal d’édition d’étape
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // 🔗 Réception des événements envoyés par MapboxAutocomplete
  useEffect(() => {
    // IMPORTANT : on empêche juste l'effet de tourner si token absent
    if (!MAPBOX_TOKEN) return;
    if (typeof window === 'undefined') return;

    const handleStart = (evt: Event) => {
      const custom = evt as CustomEvent<GeocodingDetail>;
      const detail = custom.detail;
      const coords = extractCoords(detail);
      if (!coords) return;

      setStart(coords);
      setStartInput(extractLabel(detail, 'Départ'));
      setFormError('');
    };

    const handleEnd = (evt: Event) => {
      const custom = evt as CustomEvent<GeocodingDetail>;
      const detail = custom.detail;
      const coords = extractCoords(detail);
      if (!coords) return;

      setEnd(coords);
      setEndInput(extractLabel(detail, 'Arrivée'));
      setFormError('');
    };

    const handleStep = (evt: Event) => {
      const custom = evt as CustomEvent<GeocodingDetail>;
      const detail = custom.detail;
      const coords = extractCoords(detail);
      if (!coords) return;

      const name = extractLabel(detail, 'Étape intermédiaire');

      setTempSteps((prev) => {
        const last = prev[prev.length - 1];
        if (
          last &&
          last.name === name &&
          last.coordinates[0] === coords[0] &&
          last.coordinates[1] === coords[1]
        ) {
          return prev;
        }

        return [
          ...prev,
          {
            id: `step-${Date.now()}-${prev.length}`,
            name,
            coordinates: coords,
          },
        ];
      });
    };

    window.addEventListener('select:start', handleStart as EventListener);
    window.addEventListener('select:end', handleEnd as EventListener);
    window.addEventListener('select:step', handleStep as EventListener);

    return () => {
      window.removeEventListener('select:start', handleStart as EventListener);
      window.removeEventListener('select:end', handleEnd as EventListener);
      window.removeEventListener('select:step', handleStep as EventListener);
    };
  }, [MAPBOX_TOKEN]);

  // ✅ Lire le store Zustand au top-level (TOUJOURS avant tout return conditionnel)
  const prevItinerary = useItineraryStore((s) => s.itinerary) as any[];
  const setItinerary = useItineraryStore((s) => s.setItinerary);

  // Itinéraire au format Leaflet (lat/lng)
  const leafletItinerary = useMemo(
    () =>
      steps.map((s) => ({
        lat: s.coordinates[1],
        lng: s.coordinates[0],
        title: s.name,
      })),
    [steps],
  );

  // Points pour centrer / fallback polyline [lat, lng]
  const routePoints = useMemo<[number, number][]>(() => {
    return steps.map((s) => [s.coordinates[1], s.coordinates[0]] as [number, number]);
  }, [steps]);

  // Tous les producteurs encore disponibles (on retire ceux déjà choisis comme étapes)
  const producersOnRouteAll = useMemo<Producer[]>(() => {
    if (!steps.length) return producersList;

    return producersList.filter((p) => {
      return !steps.some((s) => s.coordinates[0] === p.lng && s.coordinates[1] === p.lat);
    });
  }, [steps]);

  // Producteurs filtrés par type sélectionné
  const producersOnRoute = useMemo<Producer[]>(() => {
    if (!selectedTypes.length) return [];
    return producersOnRouteAll.filter((p) => (p.type ? selectedTypes.includes(p.type) : false));
  }, [producersOnRouteAll, selectedTypes]);

  // 💡 Appliquer un nouvel ensemble de steps
  //    → conserve les notes / rating / photo des étapes déjà existantes
  const applyNewSteps = (newSteps: StepTuple[]) => {
    setSteps(newSteps);

    const merged = newSteps.map((s) => {
      const lat = s.coordinates[1];
      const lng = s.coordinates[0];

      const match = prevItinerary.find(
        (st) =>
          typeof st.lat === 'number' &&
          typeof st.lng === 'number' &&
          Math.abs(st.lat - lat) < 1e-6 &&
          Math.abs(st.lng - lng) < 1e-6 &&
          (st.title === s.name || !st.title || !s.name),
      );

      if (match) {
        return {
          ...match,
          lat,
          lng,
          title: s.name,
        };
      }

      return { lat, lng, title: s.name };
    });

    // ✅ Mise à jour store global
    setItinerary(merged as any);

    // Sauvegarde locale (pour recharger plus tard)
    saveItinerary(
      newSteps.map((s, i, arr) => ({
        id: i === 0 ? 'start' : i === arr.length - 1 ? 'end' : `step-${i}`,
        name: s.name ?? '',
        coordinates: [s.coordinates[0], s.coordinates[1]] as [number, number], // [lng, lat]
      })),
    );
  };

  // 🚀 Création de l’itinéraire initial
  const handleGeocodeAll = () => {
    if (!start || !end || !startInput.trim() || !endInput.trim()) {
      setFormError("Merci de remplir un point de départ et un point d'arrivée valides.");
      return;
    }
    setFormError('');

    const itinerary: StepTuple[] = [];

    // Départ
    itinerary.push({
      id: 'start',
      name: startInput || 'Départ',
      coordinates: start, // [lng, lat]
    });

    // Étapes intermédiaires choisies
    for (const step of tempSteps) {
      itinerary.push(step);
    }

    // Arrivée
    itinerary.push({
      id: 'end',
      name: endInput || 'Arrivée',
      coordinates: end, // [lng, lat]
    });

    applyNewSteps(itinerary);
  };

  // 🧹 Effacer l’itinéraire
  const handleClearItinerary = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.removeItem('itinerary');
        alert('🗑️ Ton itinéraire a été effacé.');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
    setStart(null);
    setEnd(null);
    setStartInput('');
    setEndInput('');
    setTempSteps([]);
    setSteps([]);
    setItinerary([] as any);
    setIsModalOpen(false);
    setSelectedIndex(null);
  };

  // 🔄 Inverser départ / arrivée
  const handleSwapPoints = () => {
    const tempCoords = start;
    const tempLabel = startInput;

    setStart(end);
    setStartInput(endInput);
    setEnd(tempCoords);
    setEndInput(tempLabel);
  };

  // ➕ Ajouter un producteur comme étape après l’étape la plus proche
  const handleAddProducerAfterNearest = (producer: Producer) => {
    if (!steps.length) {
      alert('Commence par créer un itinéraire avant d’y ajouter un producteur 🙂');
      return;
    }

    const prodCoords: [number, number] = [producer.lng, producer.lat]; // [lng, lat]

    let bestIndex = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    steps.forEach((step, i) => {
      const d = haversineKm(step.coordinates, prodCoords);
      if (d < bestDist) {
        bestDist = d;
        bestIndex = i;
      }
    });

    const newStep: StepTuple = {
      id: `prod-${producer.id ?? producer.name}-${Date.now()}`,
      name: producer.name ?? 'Arrêt local',
      coordinates: prodCoords,
    };

    const newSteps = [...steps.slice(0, bestIndex + 1), newStep, ...steps.slice(bestIndex + 1)];
    applyNewSteps(newSteps);
  };

  // ➕ Ajouter un producteur en fin d’itinéraire (juste avant l’arrivée)
  const handleAddProducerAtEnd = (producer: Producer) => {
    if (!steps.length) {
      alert('Commence par créer un itinéraire avant d’y ajouter un producteur 🙂');
      return;
    }

    const prodCoords: [number, number] = [producer.lng, producer.lat];

    const newStep: StepTuple = {
      id: `prod-${producer.id ?? producer.name}-${Date.now()}`,
      name: producer.name ?? 'Arrêt local',
      coordinates: prodCoords,
    };

    let insertIndex = steps.length; // par défaut à la fin
    if (steps.length >= 2) {
      // on insère avant la dernière étape si on considère que c’est l’arrivée
      insertIndex = steps.length - 1;
    }

    const newSteps = [...steps.slice(0, insertIndex), newStep, ...steps.slice(insertIndex)];
    applyNewSteps(newSteps);
  };

  // ➖ Supprimer une étape (utile surtout pour les étapes producteurs)
  const handleDeleteStep = (index: number) => {
    if (index < 0 || index >= steps.length) return;
    const newSteps = steps.filter((_, i) => i !== index);
    applyNewSteps(newSteps);
    setIsModalOpen(false);
    setSelectedIndex(null);
  };

  // ➕ Ajouter un producteur dans les notes de l’étape la plus proche
  const handleAddProducerToNotes = (producer: Producer) => {
    console.log('TODO: ajouter aux notes', producer);
    alert(
      `Fonction “ajouter aux notes” à finaliser, mais le producteur ${producer.name} est bien détecté 👍`,
    );
  };

  // 🎛️ Gestion filtres producteurs
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const selectAllTypes = () => setSelectedTypes(ALL_PRODUCER_TYPES);
  const clearTypes = () => setSelectedTypes([]);

  return (
    <div className="mx-auto max-w-4xl space-y-12 py-10">
      <H1 className="mb-6 text-center">
        🗺️ Planifie ton itinéraire et découvre les producteurs locaux
      </H1>

      {/* ⚙️ Formulaire de création d’itinéraire */}
      <div className="space-y-6 rounded-lg bg-white p-6 shadow">
        {formError && (
          <div className="animate-shake rounded-md border border-red-300 bg-red-100 px-4 py-2 text-red-800">
            {formError}
          </div>
        )}

        {/* 📍 Départ */}
        <MapboxAutocomplete
          label="📍 Départ"
          placeholder="Ex : Montréal"
          token={MAPBOX_TOKEN}
          eventChannel="select:start"
        />
        {start && <p className="mt-1 text-sm text-green-600">✅ {startInput} sélectionné</p>}

        {/* 🏁 Arrivée */}
        <MapboxAutocomplete
          label="🏁 Arrivée"
          placeholder="Ex : Québec"
          token={MAPBOX_TOKEN}
          eventChannel="select:end"
        />
        {end && <p className="mt-1 text-sm text-green-600">✅ {endInput} sélectionné</p>}

        <div className="text-center">
          <button onClick={handleSwapPoints} className="text-blue-500 underline">
            🔄 Inverser départ et arrivée
          </button>
        </div>

        {/* 🚏 Étapes intermédiaires */}
        <div>
          <MapboxAutocomplete
            label="🚏 Étape intermédiaire"
            placeholder="Ex : Trois-Rivières"
            token={MAPBOX_TOKEN}
            eventChannel="select:step"
          />

          {tempSteps.length > 0 && (
            <ul className="mt-2 list-inside list-disc text-sm text-gray-700">
              {tempSteps.map((step) => (
                <li key={step.id}>{step.name}</li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleGeocodeAll}
          className="w-full rounded-lg bg-green-600 py-2 font-semibold text-white hover:bg-green-700"
        >
          Tracer l&apos;itinéraire
        </button>
      </div>

      {/* 🎛️ Filtres producteurs (comme /producteurs) */}
      <div className="space-y-2 rounded-lg bg-white p-4 shadow">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-sm font-semibold text-gray-800">
            Filtres producteurs le long de ton itinéraire
          </span>
          <div className="flex gap-2 text-xs">
            <button
              type="button"
              onClick={selectAllTypes}
              className="rounded-full border px-2 py-1 hover:bg-gray-50"
            >
              Tout
            </button>
            <button
              type="button"
              onClick={clearTypes}
              className="rounded-full border px-2 py-1 hover:bg-gray-50"
            >
              Aucun
            </button>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {ALL_PRODUCER_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => toggleType(type)}
              className={`rounded-full px-3 py-1 text-xs sm:text-sm ${
                selectedTypes.includes(type)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {typeLabel(type)}
            </button>
          ))}
        </div>
      </div>

      {/* 🗺️ Carte avec route + producteurs */}
      <MapWithRouting
        itinerary={leafletItinerary}
        routePoints={routePoints}
        producersOnRoute={producersOnRoute}
        addAfterNearest={handleAddProducerAfterNearest}
        addAtEnd={handleAddProducerAtEnd}
        addToNearestNotes={handleAddProducerToNotes}
        setSelectedIndex={setSelectedIndex}
        setIsModalOpen={setIsModalOpen}
      />

      {/* 📍 Liste des étapes avec accès direct au modal */}
      {steps.length > 0 && (
        <div className="mt-6 rounded-lg bg-white p-4 shadow">
          <H2 className="mb-3 text-lg font-semibold">📍 Étapes de ton itinéraire</H2>
          <ol className="space-y-2 text-sm">
            {steps.map((s, i) => {
              let role = 'Étape intermédiaire';
              if (i === 0) role = 'Départ';
              else if (i === steps.length - 1) role = 'Arrivée';

              return (
                <li
                  key={s.id ?? `${i}-${s.name}`}
                  className="flex items-center justify-between gap-3 rounded border px-3 py-2"
                >
                  <div>
                    <div className="font-medium">
                      {role} — {s.name}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIndex(i);
                      setIsModalOpen(true);
                    }}
                    className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
                  >
                    📝 Ouvrir la description de l'étape
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      )}

      {/* 📄 Résumé + bouton pour effacer */}
      {steps.length >= 2 && (
        <>
          <ItinerarySummary />
          <div className="mt-10 text-center">
            <button
              onClick={handleClearItinerary}
              className="rounded bg-red-100 px-4 py-2 text-red-700 transition hover:bg-red-200"
            >
              🗑️ Effacer mon itinéraire
            </button>
          </div>
        </>
      )}

      {/* 🪟 Modal étape (ville ou producteur) */}
      <StepModal
        isOpen={isModalOpen && selectedIndex !== null}
        stepIndex={selectedIndex ?? 0}
        onClose={() => setIsModalOpen(false)}
        onDeleteStep={handleDeleteStep}
      />
    </div>
  );
}
