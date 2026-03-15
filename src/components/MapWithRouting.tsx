'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import 'leaflet-routing-machine';
import type { Producer } from '@/types/Producer';

// 🧩 Types
export interface StepData {
  lat: number;
  lng: number;
  title?: string;
  distanceKm?: number;
  durationMin?: number;
}

interface RouteSummary {
  distanceKm: number;
  durationMin: number;
}

type ProducerWithDistance = Producer & {
  __distanceKm?: number;
};

interface MapWithRoutingProps {
  itinerary?: StepData[];
  /** Points [lat, lng] pour centrer / fallback polyline */
  routePoints?: [number, number][];
  producersOnRoute?: Producer[];
  addAfterNearest?: (p: Producer) => void;
  addAtEnd?: (p: Producer) => void;
  addToNearestNotes?: (p: Producer) => void;
  setSelectedIndex?: (i: number) => void;
  setIsModalOpen?: (b: boolean) => void;
}

// 🔧 Patch de sécurité pour éviter l'erreur "Cannot read properties of null (reading 'removeLayer')"
if (typeof window !== 'undefined' && (L as any).Routing && (L as any).Routing.Control) {
  const proto = (L as any).Routing.Control.prototype as any;
  if (!proto.__clearLinesPatched) {
    const originalClearLines = proto._clearLines;
    proto._clearLines = function patchedClearLines() {
      if (!this._map) return;
      return originalClearLines.call(this);
    };
    proto.__clearLinesPatched = true;
  }
}

// 🗺️ Recalage de la taille de la carte
function InvalidateMapSizeOnLoad() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => clearTimeout(timer);
  }, [map]);

  return null;
}

// 🧭 Recentrer la carte sur les points connus si besoin
function FitBoundsToRoute({
  itinerary,
  routePoints,
}: {
  itinerary: StepData[];
  routePoints: [number, number][];
}) {
  const map = useMap();

  useEffect(() => {
    const points =
      itinerary.length >= 2
        ? itinerary.map((step) => L.latLng(step.lat, step.lng))
        : routePoints.length >= 2
          ? routePoints.map(([lat, lng]) => L.latLng(lat, lng))
          : [];

    if (points.length < 2) return;

    const bounds = L.latLngBounds(points);
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, itinerary, routePoints]);

  return null;
}

// 🧭 Composant RoutingMachine pour tracer la route
function RoutingMachine({
  sig,
  onRouteSummary,
}: {
  sig?: L.LatLng[] | null;
  onRouteSummary?: (summary: RouteSummary | null) => void;
}) {
  const map = useMap();
  const controlRef = useRef<any | null>(null);

  useEffect(() => {
    if (!map) return;

    if (!controlRef.current) {
      controlRef.current = L.Routing.control({
        waypoints: [],
        lineOptions: {
          styles: [{ color: '#2563eb', weight: 5, opacity: 0.9 }],
        },
        addWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        draggableWaypoints: false,
        routeWhileDragging: false,
        show: false,
        createMarker: () => null,
      } as unknown as L.Routing.RoutingOptions).addTo(map);

      controlRef.current.on('routesfound', (e: any) => {
        const route = e?.routes?.[0];
        const summary = route?.summary;

        if (!summary) {
          onRouteSummary?.(null);
          return;
        }

        onRouteSummary?.({
          distanceKm: summary.totalDistance / 1000,
          durationMin: summary.totalTime / 60,
        });
      });

      controlRef.current.on('routingerror', (e: any) => {
        console.warn('Erreur de routing:', e);
        onRouteSummary?.(null);
      });
    }

    return () => {
      if (controlRef.current) {
        try {
          controlRef.current.off('routesfound');
          controlRef.current.off('routingerror');
          map.removeControl(controlRef.current);
        } catch (e) {
          console.warn('Erreur lors du retrait du routing control', e);
        }
        controlRef.current = null;
      }
    };
  }, [map, onRouteSummary]);

  useEffect(() => {
    if (!controlRef.current) return;

    if (!sig || sig.length < 2) {
      controlRef.current.setWaypoints([]);
      onRouteSummary?.(null);
      return;
    }

    controlRef.current.setWaypoints(sig);
  }, [sig, onRouteSummary]);

  return null;
}

// 🧠 Helpers
const minutesToHhmm = (min: number) => {
  const safeMin = Math.max(0, min);
  const h = Math.floor(safeMin / 60);
  const m = Math.round(safeMin % 60);

  if (h <= 0) return `${m} min`;
  return `${h} h ${m.toString().padStart(2, '0')}`;
};

const roleLabel = (i: number, len: number) => {
  if (i === 0) return 'Départ';
  if (i === len - 1) return 'Arrivée';
  return `Étape ${i}`;
};

const formatDistance = (km: number) => `${km.toFixed(1)} km`;

const getArrivalTimeLabel = (durationMin: number) => {
  const now = new Date();
  const arrival = new Date(now.getTime() + durationMin * 60 * 1000);

  return arrival.toLocaleTimeString('fr-CA', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const getRecommendedPauses = (durationMin: number) => {
  if (durationMin < 120) return 0;
  if (durationMin < 240) return 1;
  if (durationMin < 420) return 2;
  if (durationMin < 600) return 3;
  return 4;
};

const getTripTone = (distanceKm: number, durationMin: number) => {
  if (distanceKm < 80 || durationMin < 75) {
    return 'Un trajet doux et facile, parfait pour une escapade simple et agréable.';
  }
  if (distanceKm < 250 || durationMin < 180) {
    return 'Une belle portion de route, idéale pour découvrir la région à votre rythme.';
  }
  if (distanceKm < 600 || durationMin < 420) {
    return 'Un vrai trajet de road trip, avec de belles occasions d’arrêts et de découvertes.';
  }
  return 'Un grand voyage se prépare, avec cette belle sensation de partir loin et de vivre quelque chose de marquant.';
};

const getDriveWithBreaksLabel = (durationMin: number) => {
  const pauses = getRecommendedPauses(durationMin);
  const extraMin = pauses * 20;
  return minutesToHhmm(durationMin + extraMin);
};

function getDistanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 🐝 Icônes producteurs
const icons: Record<string, Icon> = {
  cidrerie: new Icon({ iconUrl: '/icons/apple.png', iconSize: [28, 28] }),
  vignoble: new Icon({ iconUrl: '/icons/grapes.png', iconSize: [28, 28] }),
  fromage: new Icon({ iconUrl: '/icons/fromage.png', iconSize: [28, 28] }),
  petitfruit: new Icon({ iconUrl: '/icons/berry.png', iconSize: [28, 28] }),
  microbrasserie: new Icon({ iconUrl: '/icons/microbrasserie.png', iconSize: [28, 28] }),
  miel: new Icon({ iconUrl: '/icons/miel.png', iconSize: [28, 28] }),
  ferme: new Icon({ iconUrl: '/icons/ferme.png', iconSize: [28, 28] }),
  default: new Icon({ iconUrl: '/icons/ferme.png', iconSize: [28, 28] }),
};

function getProducerIcon(type?: string | null) {
  if (!type) return icons.default;
  return icons[type] || icons.default;
}

const MapWithRouting: React.FC<MapWithRoutingProps> = ({
  itinerary = [],
  routePoints = [],
  producersOnRoute = [],
  addAfterNearest,
  addAtEnd,
  addToNearestNotes,
  setSelectedIndex,
  setIsModalOpen,
}) => {
  const [routeSummary, setRouteSummary] = useState<RouteSummary | null>(null);

  const center: [number, number] =
    routePoints.length > 0 ? routePoints[0] : ([48.8566, -71.0] as [number, number]);

  const routingWaypoints = useMemo(() => {
    if (!itinerary || itinerary.length < 2) return null;
    return itinerary.map((step) => L.latLng(step.lat, step.lng));
  }, [itinerary]);

  const itineraryLabel = useMemo(() => {
    if (itinerary.length < 2) return null;
    const start = itinerary[0]?.title?.trim() || 'Départ';
    const end = itinerary[itinerary.length - 1]?.title?.trim() || 'Arrivée';
    return `${start} → ${end}`;
  }, [itinerary]);

  const recommendedPauses = routeSummary ? getRecommendedPauses(routeSummary.durationMin) : 0;

  const fallbackSummary = useMemo(() => {
    const validSegments = itinerary.filter(
      (step) =>
        typeof step.distanceKm === 'number' &&
        typeof step.durationMin === 'number' &&
        ((step.distanceKm ?? 0) > 0 || (step.durationMin ?? 0) > 0),
    );

    if (!validSegments.length) return null;

    const distanceKm = validSegments.reduce((sum, step) => sum + (step.distanceKm ?? 0), 0);
    const durationMin = validSegments.reduce((sum, step) => sum + (step.durationMin ?? 0), 0);

    if (distanceKm <= 0 && durationMin <= 0) return null;

    return { distanceKm, durationMin };
  }, [itinerary]);

  const displayedSummary = routeSummary ?? fallbackSummary;

  const nearestArrivalProducers = useMemo<ProducerWithDistance[]>(() => {
    if (!producersOnRoute.length || !itinerary.length) return [];

    const arrivalStep = itinerary[itinerary.length - 1];
    if (!arrivalStep) return [];

    return [...producersOnRoute]
      .map((producer) => ({
        ...producer,
        __distanceKm: getDistanceKm(arrivalStep.lat, arrivalStep.lng, producer.lat, producer.lng),
      }))
      .sort((a, b) => (a.__distanceKm ?? Infinity) - (b.__distanceKm ?? Infinity))
      .slice(0, 3);
  }, [producersOnRoute, itinerary]);

  return (
    <div className="space-y-5">
      <MapContainer center={center} zoom={6} scrollWheelZoom className="z-0 h-[600px] w-full">
        <>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap contributors &copy; CARTO"
          />

          <InvalidateMapSizeOnLoad />
          <FitBoundsToRoute itinerary={itinerary} routePoints={routePoints} />

          {itinerary.map((step, index) => (
            <Marker
              key={`${index}-${step.lat}-${step.lng}`}
              position={[step.lat, step.lng]}
              zIndexOffset={1000}
              eventHandlers={
                setSelectedIndex && setIsModalOpen
                  ? {
                      click: () => {
                        setSelectedIndex(index);
                        setIsModalOpen(true);
                      },
                    }
                  : undefined
              }
            >
              <Popup>
                <div className="space-y-1 text-sm">
                  <div className="font-semibold text-gray-800">
                    {roleLabel(index, itinerary.length)}
                  </div>

                  {step.title && <div className="text-gray-700">{step.title}</div>}

                  {typeof step.distanceKm === 'number' &&
                    typeof step.durationMin === 'number' &&
                    (step.distanceKm > 0 || step.durationMin > 0) && (
                      <div className="text-gray-600">
                        Vers l’étape suivante : <strong>{step.distanceKm.toFixed(1)} km</strong> •{' '}
                        <strong>{minutesToHhmm(step.durationMin)}</strong>
                      </div>
                    )}
                </div>
              </Popup>
            </Marker>
          ))}

          {routingWaypoints && (
            <RoutingMachine sig={routingWaypoints} onRouteSummary={setRouteSummary} />
          )}

          {!routingWaypoints && routePoints.length >= 2 && (
            <Polyline
              positions={routePoints}
              pathOptions={{ color: '#2563eb', weight: 5, opacity: 0.9 }}
            />
          )}

          {producersOnRoute.map((p, i) => {
            const href =
              p.website && typeof p.website === 'string'
                ? p.website.startsWith('http')
                  ? p.website
                  : `https://${p.website}`
                : null;

            return (
              <Marker
                key={`prod-${i}-${p.name ?? i}`}
                position={[p.lat, p.lng]}
                icon={getProducerIcon(p.type)}
                zIndexOffset={500}
              >
                <Popup>
                  <div className="w-64 space-y-2 text-sm">
                    <div className="font-semibold text-gray-800">{p.name ?? 'Producteur'}</div>
                    {p.type && <div className="text-gray-600">{p.type}</div>}

                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-blue-600 underline"
                      >
                        Voir le site web
                      </a>
                    ) : (
                      <p className="text-gray-500">Aucun site web disponible</p>
                    )}

                    <div className="mt-2 flex flex-col gap-1">
                      {addAfterNearest && (
                        <button
                          type="button"
                          onClick={() => addAfterNearest(p)}
                          className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700"
                        >
                          ➕ Ajouter comme étape après la plus proche
                        </button>
                      )}

                      {addAtEnd && (
                        <button
                          type="button"
                          onClick={() => addAtEnd(p)}
                          className="rounded bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-700"
                        >
                          ➕ Ajouter en fin d’itinéraire
                        </button>
                      )}

                      {addToNearestNotes && (
                        <button
                          type="button"
                          onClick={() => addToNearestNotes(p)}
                          className="rounded bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                        >
                          ➕ Ajouter aux notes
                        </button>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </>
      </MapContainer>

      {displayedSummary && (
        <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="space-y-1">
              <p className="text-base font-semibold text-slate-900">
                {itineraryLabel || 'Votre itinéraire'}
              </p>
              <p className="text-sm text-slate-600">
                {getTripTone(displayedSummary.distanceKm, displayedSummary.durationMin)}
              </p>
            </div>

            <div className="rounded-xl bg-sky-50 px-3 py-2 text-sm text-sky-900">
              <span className="font-semibold">Étapes :</span> {Math.max(itinerary.length, 2)}
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Distance</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {formatDistance(displayedSummary.distanceKm)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Durée</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {minutesToHhmm(displayedSummary.durationMin)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Arrivée estimée
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {getArrivalTimeLabel(displayedSummary.durationMin)}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Pauses suggérées
              </p>
              <p className="mt-1 text-lg font-semibold text-slate-900">{recommendedPauses}</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-3 text-sm text-amber-900">
            <span className="font-semibold">Conseil route :</span>{' '}
            {recommendedPauses > 0
              ? `prévoyez environ ${recommendedPauses} pause${recommendedPauses > 1 ? 's' : ''} pour voyager plus confortablement. Avec pauses, comptez environ ${getDriveWithBreaksLabel(displayedSummary.durationMin)}.`
              : 'ce trajet reste assez court et peut se faire facilement sans longue pause.'}
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Étapes du voyage</h3>
              <p className="text-sm text-slate-600">
                Visualisez rapidement votre parcours et ouvrez une étape pour la modifier.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
              {itinerary.length} étape{itinerary.length > 1 ? 's' : ''}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {itinerary.length > 0 ? (
              itinerary.map((step, index) => (
                <button
                  key={`step-card-${index}-${step.lat}-${step.lng}`}
                  type="button"
                  onClick={() => {
                    if (setSelectedIndex && setIsModalOpen) {
                      setSelectedIndex(index);
                      setIsModalOpen(true);
                    }
                  }}
                  className="w-full rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left transition hover:border-sky-200 hover:bg-sky-50"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        {roleLabel(index, itinerary.length)}
                      </p>
                      <p className="text-sm font-semibold text-slate-900">
                        {step.title?.trim() || `Point ${index + 1}`}
                      </p>
                      <p className="text-xs text-slate-500">
                        {step.lat.toFixed(5)}, {step.lng.toFixed(5)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs">
                      {typeof step.distanceKm === 'number' && step.distanceKm > 0 && (
                        <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-700">
                          {step.distanceKm.toFixed(1)} km
                        </span>
                      )}
                      {typeof step.durationMin === 'number' && step.durationMin > 0 && (
                        <span className="rounded-full bg-white px-3 py-1 font-medium text-slate-700">
                          {minutesToHhmm(step.durationMin)}
                        </span>
                      )}
                      {setSelectedIndex && setIsModalOpen && (
                        <span className="rounded-full bg-sky-100 px-3 py-1 font-medium text-sky-800">
                          Ouvrir
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                Aucune étape n’est encore affichée.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">Actions rapides</h3>
            <p className="mt-1 text-sm text-slate-600">
              Quelques raccourcis utiles pour enrichir votre road trip.
            </p>

            <div className="mt-4 grid gap-3">
              <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-3">
                <p className="text-sm font-semibold text-indigo-900">Conseil</p>
                <p className="mt-1 text-sm text-indigo-800">
                  Cliquez sur une étape de la carte ou dans la liste pour ouvrir sa fiche.
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
                <p className="text-sm font-semibold text-emerald-900">Idée voyage</p>
                <p className="mt-1 text-sm text-emerald-800">
                  Ajoutez un producteur local ou une halte gourmande pour rendre le trajet encore
                  plus vivant.
                </p>
              </div>

              <div className="rounded-xl border border-amber-100 bg-amber-50 p-3">
                <p className="text-sm font-semibold text-amber-900">Bon réflexe</p>
                <p className="mt-1 text-sm text-amber-800">
                  Pour les plus longs trajets, répartissez la journée avec de vraies pauses.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <h3 className="text-base font-semibold text-slate-900">
              3 producteurs proches de l’arrivée
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {nearestArrivalProducers.length > 0
                ? 'Voici les producteurs les plus proches de votre destination finale.'
                : 'Aucun producteur proche de l’arrivée pour le moment.'}
            </p>

            <div className="mt-4 space-y-3">
              {nearestArrivalProducers.length > 0 ? (
                nearestArrivalProducers.map((p, i) => {
                  const href =
                    p.website && typeof p.website === 'string'
                      ? p.website.startsWith('http')
                        ? p.website
                        : `https://${p.website}`
                      : null;

                  return (
                    <div
                      key={`nearest-arrival-producer-${i}-${p.name ?? i}`}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-3"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-900">
                          {p.name ?? 'Producteur'}
                        </p>

                        {p.type && <p className="text-xs text-slate-600">{p.type}</p>}

                        {typeof p.__distanceKm === 'number' && (
                          <p className="text-xs text-slate-500">
                            À environ {p.__distanceKm.toFixed(1)} km de l’arrivée
                          </p>
                        )}
                      </div>

                      <div className="mt-3 flex flex-col gap-2">
                        {href && (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-white px-3 py-2 text-center text-sm font-medium text-blue-700 transition hover:bg-blue-50"
                          >
                            Voir le site
                          </a>
                        )}

                        {addAfterNearest && (
                          <button
                            type="button"
                            onClick={() => addAfterNearest(p)}
                            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                          >
                            Ajouter après l’étape proche
                          </button>
                        )}

                        {addAtEnd && (
                          <button
                            type="button"
                            onClick={() => addAtEnd(p)}
                            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                          >
                            Ajouter en fin d’itinéraire
                          </button>
                        )}

                        {addToNearestNotes && (
                          <button
                            type="button"
                            onClick={() => addToNearestNotes(p)}
                            className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                          >
                            Ajouter aux notes
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  Activez vos points d’intérêt ou approchez-vous d’une zone couverte pour voir des
                  suggestions locales.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapWithRouting;
