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

// Types uniques de producteurs
const ALL_PRODUCER_TYPES: string[] = Array.from(
  new Set(
    producersList
      .map((p) => p.type)
      .filter((t): t is string => typeof t === 'string' && t.trim().length > 0),
  ),
);

// 🗺️ Carte
const MapWithRouting = dynamic(() => import('@/components/MapWithRouting'), {
  ssr: false,
});

// 📄 Résumé
const ItinerarySummary = dynamic(() => import('@/components/ItinerarySummary'), { ssr: false });

type StepTuple = {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
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

function sameCoords(a: [number, number] | null, b: [number, number] | null): boolean {
  if (!a || !b) return false;
  return a[0] === b[0] && a[1] === b[1];
}

function sameStepCoords(a: [number, number], b: [number, number]): boolean {
  return a[0] === b[0] && a[1] === b[1];
}

export default function ItineraryPlanner() {
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';
  console.log('MAPBOX TOKEN chargé ?', !!MAPBOX_TOKEN, MAPBOX_TOKEN?.slice(0, 10));
  // Champs texte
  const [startInput, setStartInput] = useState('');
  const [endInput, setEndInput] = useState('');

  // Coordonnées sélectionnées
  const [start, setStart] = useState<[number, number] | null>(null);
  const [end, setEnd] = useState<[number, number] | null>(null);
  const [tempSteps, setTempSteps] = useState<StepTuple[]>([]);
  const [steps, setSteps] = useState<StepTuple[]>([]);

  // États UI
  const [formError, setFormError] = useState('');
  const [geoError, setGeoError] = useState('');
  const [geoLoading, setGeoLoading] = useState(false);
  const [userProximity, setUserProximity] = useState<[number, number] | null>(null);

  // Filtres producteurs
  const [selectedTypes, setSelectedTypes] = useState<string[]>(ALL_PRODUCER_TYPES);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Store
  const prevItinerary = useItineraryStore((s) => s.itinerary) as any[];
  const setItinerary = useItineraryStore((s) => s.setItinerary);

  const canTrace = !!start && !!end && !!startInput.trim() && !!endInput.trim();

  // 📍 Géolocalisation -> remplit le départ
  const handleGeoFillStart = () => {
    if (typeof window === 'undefined') return;

    setGeoError('');
    setFormError('');

    if (!MAPBOX_TOKEN) {
      setGeoError('La détection automatique est indisponible pour le moment.');
      return;
    }

    if (!('geolocation' in navigator)) {
      setGeoError("La géolocalisation n'est pas disponible sur ce navigateur.");
      return;
    }

    setGeoLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          setUserProximity([lng, lat]);

          const url =
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json` +
            `?access_token=${MAPBOX_TOKEN}` +
            '&country=CA' +
            '&language=fr' +
            '&types=address,place,locality,postcode,region,district' +
            '&limit=1';

          const res = await fetch(url, { cache: 'no-store' });

          if (!res.ok) {
            throw new Error(`Mapbox ${res.status}`);
          }

          const data = await res.json();
          const feature = data?.features?.[0];

          const label = feature?.place_name || feature?.text || 'Ma position actuelle';

          const coords: [number, number] = [lng, lat];

          setStart(coords);
          setStartInput(label);
          setFormError('');
          setGeoError('');
        } catch (error) {
          console.error(error);

          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          setUserProximity([lng, lat]);
          setStart([lng, lat]);
          setStartInput('Ma position actuelle');
          setGeoError(
            "Ta position a été détectée, mais l'adresse précise n'a pas pu être affichée.",
          );
        } finally {
          setGeoLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setGeoLoading(false);

        switch (err.code) {
          case err.PERMISSION_DENIED:
            setGeoError(
              "L'accès à la position a été refusé. Autorise la localisation dans ton navigateur pour utiliser cette fonction.",
            );
            break;
          case err.POSITION_UNAVAILABLE:
            setGeoError(
              "La position n'a pas pu être détectée. Essaie à nouveau ou entre ta ville manuellement.",
            );
            break;
          case err.TIMEOUT:
            setGeoError(
              'La détection a pris trop de temps. Réessaie ou entre ta ville manuellement.',
            );
            break;
          default:
            setGeoError("Impossible d'obtenir la position. Vérifie les permissions du navigateur.");
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  };

  // 🔗 Réception des événements envoyés par MapboxAutocomplete
  useEffect(() => {
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
      setGeoError('');
    };

    const handleEnd = (evt: Event) => {
      const custom = evt as CustomEvent<GeocodingDetail>;
      const detail = custom.detail;
      const coords = extractCoords(detail);
      if (!coords) return;

      setEnd(coords);
      setEndInput(extractLabel(detail, 'Arrivée'));
      setFormError('');
      setGeoError('');
    };

    const handleStep = (evt: Event) => {
      const custom = evt as CustomEvent<GeocodingDetail>;
      const detail = custom.detail;
      const coords = extractCoords(detail);
      if (!coords) return;

      const name = extractLabel(detail, 'Étape intermédiaire');

      if (sameCoords(start, coords)) {
        setFormError('Cette étape correspond déjà au point de départ.');
        return;
      }

      if (sameCoords(end, coords)) {
        setFormError("Cette étape correspond déjà au point d'arrivée.");
        return;
      }

      setTempSteps((prev) => {
        const alreadyExists = prev.some(
          (step) => step.name === name && sameStepCoords(step.coordinates, coords),
        );

        if (alreadyExists) {
          setFormError('Cette étape est déjà présente dans ton itinéraire.');
          return prev;
        }

        setFormError('');
        setGeoError('');

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
  }, [MAPBOX_TOKEN, start, end]);

  // Format Leaflet
  const leafletItinerary = useMemo(
    () =>
      steps.map((s) => ({
        lat: s.coordinates[1],
        lng: s.coordinates[0],
        title: s.name,
      })),
    [steps],
  );

  const routePoints = useMemo<[number, number][]>(() => {
    return steps.map((s) => [s.coordinates[1], s.coordinates[0]] as [number, number]);
  }, [steps]);

  const producersOnRouteAll = useMemo<Producer[]>(() => {
    if (!steps.length) return producersList;

    return producersList.filter((p) => {
      return !steps.some((s) => s.coordinates[0] === p.lng && s.coordinates[1] === p.lat);
    });
  }, [steps]);

  const producersOnRoute = useMemo<Producer[]>(() => {
    if (!selectedTypes.length) return [];
    return producersOnRouteAll.filter((p) => (p.type ? selectedTypes.includes(p.type) : false));
  }, [producersOnRouteAll, selectedTypes]);

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

    setItinerary(merged as any);

    saveItinerary(
      newSteps.map((s, i, arr) => ({
        id: i === 0 ? 'start' : i === arr.length - 1 ? 'end' : `step-${i}`,
        name: s.name ?? '',
        coordinates: [s.coordinates[0], s.coordinates[1]] as [number, number],
      })),
    );
  };

  const handleGeocodeAll = () => {
    if (!start || !end || !startInput.trim() || !endInput.trim()) {
      setFormError("Merci de remplir un point de départ et un point d'arrivée valides.");
      return;
    }

    if (sameCoords(start, end)) {
      setFormError("Le point de départ et le point d'arrivée ne peuvent pas être identiques.");
      return;
    }

    setFormError('');
    setGeoError('');

    const itinerary: StepTuple[] = [
      {
        id: 'start',
        name: startInput || 'Départ',
        coordinates: start,
      },
      ...tempSteps,
      {
        id: 'end',
        name: endInput || 'Arrivée',
        coordinates: end,
      },
    ];

    applyNewSteps(itinerary);
  };

  const handleClearItinerary = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.removeItem('itinerary');
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
    setFormError('');
    setGeoError('');
  };

  const handleClearIntermediateSteps = () => {
    setTempSteps([]);
    setFormError('');
  };

  const handleSwapPoints = () => {
    const tempCoords = start;
    const tempLabel = startInput;

    setStart(end);
    setStartInput(endInput);
    setEnd(tempCoords);
    setEndInput(tempLabel);
    setFormError('');
    setGeoError('');
  };

  const handleAddProducerAfterNearest = (producer: Producer) => {
    if (!steps.length) {
      setFormError('Commence par créer un itinéraire avant d’ajouter un producteur.');
      return;
    }

    const alreadyExists = steps.some(
      (s) => s.coordinates[0] === producer.lng && s.coordinates[1] === producer.lat,
    );

    if (alreadyExists) {
      setFormError('Ce producteur est déjà présent dans ton itinéraire.');
      return;
    }

    const prodCoords: [number, number] = [producer.lng, producer.lat];

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
    setFormError('');
    applyNewSteps(newSteps);
  };

  const handleAddProducerAtEnd = (producer: Producer) => {
    if (!steps.length) {
      setFormError('Commence par créer un itinéraire avant d’ajouter un producteur.');
      return;
    }

    const alreadyExists = steps.some(
      (s) => s.coordinates[0] === producer.lng && s.coordinates[1] === producer.lat,
    );

    if (alreadyExists) {
      setFormError('Ce producteur est déjà présent dans ton itinéraire.');
      return;
    }

    const prodCoords: [number, number] = [producer.lng, producer.lat];

    const newStep: StepTuple = {
      id: `prod-${producer.id ?? producer.name}-${Date.now()}`,
      name: producer.name ?? 'Arrêt local',
      coordinates: prodCoords,
    };

    let insertIndex = steps.length;
    if (steps.length >= 2) {
      insertIndex = steps.length - 1;
    }

    const newSteps = [...steps.slice(0, insertIndex), newStep, ...steps.slice(insertIndex)];
    setFormError('');
    applyNewSteps(newSteps);
  };

  const handleDeleteStep = (index: number) => {
    if (index < 0 || index >= steps.length) return;
    const newSteps = steps.filter((_, i) => i !== index);
    applyNewSteps(newSteps);
    setIsModalOpen(false);
    setSelectedIndex(null);
  };

  const handleAddProducerToNotes = (producer: Producer) => {
    console.log('TODO: ajouter aux notes', producer);
    setFormError(
      `Le producteur ${producer.name} a bien été détecté. La liaison avec les notes reste à finaliser.`,
    );
  };

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

      {!MAPBOX_TOKEN && (
        <div className="rounded-md border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          La recherche de lieux est temporairement indisponible.
        </div>
      )}

      <div className="space-y-6 rounded-lg bg-white p-6 shadow">
        {(formError || geoError) && (
          <div className="space-y-2">
            {formError && (
              <div className="animate-shake rounded-md border border-red-300 bg-red-100 px-4 py-2 text-red-800">
                {formError}
              </div>
            )}
            {geoError && (
              <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-2 text-amber-800">
                {geoError}
              </div>
            )}
          </div>
        )}

        <MapboxAutocomplete
          label="📍 Départ"
          placeholder={geoLoading ? 'Détection de votre position...' : 'Ex : Montréal'}
          token={MAPBOX_TOKEN}
          eventChannel="select:start"
          onGeoClick={handleGeoFillStart}
          proximity={userProximity}
        />
        {start && <p className="mt-1 text-sm text-green-600">✅ {startInput} sélectionné</p>}

        <MapboxAutocomplete
          label="🏁 Arrivée"
          placeholder="Ex : Québec"
          token={MAPBOX_TOKEN}
          eventChannel="select:end"
          proximity={userProximity}
        />
        {end && <p className="mt-1 text-sm text-green-600">✅ {endInput} sélectionné</p>}

        <div className="text-center">
          <button onClick={handleSwapPoints} className="text-blue-500 underline">
            🔄 Inverser départ et arrivée
          </button>
        </div>

        <div>
          <MapboxAutocomplete
            label="🚏 Étape intermédiaire"
            placeholder="Ex : Trois-Rivières"
            token={MAPBOX_TOKEN}
            eventChannel="select:step"
            proximity={userProximity}
          />

          {tempSteps.length > 0 && (
            <div className="mt-3 space-y-3">
              <ul className="space-y-2 text-sm text-gray-700">
                {tempSteps.map((step) => (
                  <li
                    key={step.id}
                    className="flex items-center justify-between gap-3 rounded border px-3 py-2"
                  >
                    <span>{step.name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setTempSteps((prev) => prev.filter((s) => s.id !== step.id));
                        setFormError('');
                      }}
                      className="rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
                    >
                      Retirer
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleClearIntermediateSteps}
                  className="rounded border px-3 py-2 text-sm hover:bg-gray-50"
                >
                  Effacer les étapes intermédiaires
                </button>
              </div>
            </div>
          )}
        </div>

        {(startInput || endInput || tempSteps.length > 0) && (
          <div className="rounded-md border bg-gray-50 px-4 py-3 text-sm text-gray-700">
            <p className="font-semibold text-gray-900">Aperçu de ton trajet</p>
            {startInput && <p>Départ : {startInput}</p>}
            {tempSteps.length > 0 && <p>Étapes : {tempSteps.map((s) => s.name).join(' → ')}</p>}
            {endInput && <p>Arrivée : {endInput}</p>}
          </div>
        )}

        <button
          onClick={handleGeocodeAll}
          disabled={!canTrace}
          className={`w-full rounded-lg py-2 font-semibold text-white ${
            canTrace ? 'bg-green-600 hover:bg-green-700' : 'cursor-not-allowed bg-gray-400'
          }`}
        >
          {geoLoading ? 'Détection en cours...' : "Tracer l'itinéraire"}
        </button>
      </div>

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
                    📝 Compléter l'étape
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      )}

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

      <StepModal
        isOpen={isModalOpen}
        stepIndex={selectedIndex ?? -1}
        onClose={() => setIsModalOpen(false)}
        onDeleteStep={handleDeleteStep}
      />
    </div>
  );
}
