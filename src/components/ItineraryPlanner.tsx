"use client";
import React, { useState } from 'react';

import MapboxAutocomplete from './MapboxAutocomplete';
import MapWithRouting from './MapWithRouting';
import ProducersMap from './ProducersMapFiltrable';
import ItinerarySummary from './ItinerarySummary';
import { suggestNearbyProducers } from '@/utils/suggestNearbyProducers';
import { saveItinerary } from './lib/saveItinerary';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function ItineraryPlanner() {
  const [startInput, setStartInput] = useState('');
  const [endInput, setEndInput] = useState('');
  const [start, setStart] = useState<[number, number] | null>(null);
  const [end, setEnd] = useState<[number, number] | null>(null);
  const [stepInput, setStepInput] = useState('');
  const [tempSteps, setTempSteps] = useState<string[]>([]);
  const [steps, setSteps] = useState<{ id: string; name: string; coordinates: [number, number] }[]>(
    []
  );
  const [waypoints, setWaypoints] = useState<[number, number][]>([]);
  const [producerSuggestions, setProducerSuggestions] = useState<
    { stepIndex: number; producer: any; distance: number }[]
  >([]);
  const [formError, setFormError] = useState('');

  if (!MAPBOX_TOKEN) {
    return <div className="text-red-600">❌ MAPBOX_TOKEN manquant dans .env.local</div>;
  }

  const handleAddStep = () => {
    if (stepInput.trim()) {
      setTempSteps([...tempSteps, stepInput.trim()]);
      setStepInput('');
    }
  };

  const handleGeocodeAll = () => {
    if (!start || !end) {
      setFormError('Merci de remplir au minimum un point de départ et d’arrivée.');
      return;
    }
    setFormError('');

    const coords: [number, number][] = [];
    const itinerary: { id: string; name: string; coordinates: [number, number] }[] = [];

    coords.push(start);
    itinerary.push({ id: 'start', name: startInput || 'Départ', coordinates: start });

    for (const [index, city] of tempSteps.entries()) {
      itinerary.push({ id: `step-${index}`, name: city, coordinates: [0, 0] });
    }

    coords.push(end);
    itinerary.push({ id: 'end', name: endInput || 'Arrivée', coordinates: end });

    setWaypoints(coords.slice(1, coords.length - 1));
    setSteps(itinerary);
    setProducerSuggestions(suggestNearbyProducers(coords));
    saveItinerary(itinerary);
  };

  const handleClearItinerary = () => {
    localStorage.removeItem('itinerary');
    setStart(null);
    setEnd(null);
    setStartInput('');
    setEndInput('');
    setStepInput('');
    setTempSteps([]);
    setSteps([]);
    setWaypoints([]);
    setProducerSuggestions([]);
    alert('🗑️ Ton itinéraire a été effacé.');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-12">
      <h1 className="text-3xl font-bold text-center mb-6">🗺️ Planifie ton itinéraire</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        {formError && (
          <div className="bg-red-100 text-red-800 border border-red-300 rounded-md px-4 py-2 animate-shake">
            {formError}
          </div>
        )}

        <MapboxAutocomplete
          label="📍 Départ"
          placeholder="Ex : Montréal"
          token={MAPBOX_TOKEN}
          onSelect={(coords, label) => {
            setStart(coords);
            setStartInput(label);
          }}
        />

        <MapboxAutocomplete
          label="🏁 Arrivée"
          placeholder="Ex : Québec"
          token={MAPBOX_TOKEN}
          onSelect={(coords, label) => {
            setEnd(coords);
            setEndInput(label);
          }}
        />

        <div>
          <label className="block font-semibold mb-1">🚏 Étapes intermédiaires :</label>
          <div className="flex gap-2">
            <input
              value={stepInput}
              onChange={(e) => setStepInput(e.target.value)}
              className="border px-3 py-2 flex-1 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Ex : Trois-Rivières"
            />
            <button
              type="button"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleAddStep}
            >
              Ajouter
            </button>
          </div>
          {tempSteps.length > 0 && (
            <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
              {tempSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleGeocodeAll}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold"
        >
          Tracer l'itinéraire
        </button>
      </div>

      {start && end && <MapWithRouting points={[start, ...waypoints, end]} />}

      {producerSuggestions.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow space-y-2 mt-10">
          <h2 className="text-xl font-semibold mb-4">💡 Suggestions d’arrêts locaux</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {producerSuggestions.map(({ stepIndex, producer, distance }) => {
              const stepName = steps[stepIndex]?.name || `étape ${stepIndex + 1}`;
              return (
                <li key={`${producer.id}-${stepIndex}`}>
                  <strong>{producer.name}</strong> ({producer.type}) — à ~{distance.toFixed(1)} km
                  de {stepName}
                  {producer.website && (
                    <>
                      {' — '}
                      <a
                        href={producer.website}
                        className="text-indigo-600 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        site web
                      </a>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">🍓 Producteurs locaux</h2>
        <p className="text-gray-600 mb-4">
          Ajoute des haltes gourmandes à ton itinéraire : miel, vin, légumes, viande…
        </p>
        <ProducersMap points={steps.map((s) => s.coordinates)} />
      </div>

      <ItinerarySummary />

      <div className="text-center mt-10">
        <button
          onClick={handleClearItinerary}
          className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
        >
          🗑️ Effacer mon itinéraire
        </button>
      </div>
    </div>
  );
}
