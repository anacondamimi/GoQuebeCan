'use client';

import React, { useEffect, useMemo, useRef } from 'react';
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
    setTimeout(() => {
      map.invalidateSize();
    }, 300);
  }, [map]);
  return null;
}

// 🧭 Composant RoutingMachine pour tracer la route
function RoutingMachine({ sig }: { sig?: L.LatLng[] | null }) {
  const map = useMap();
  const controlRef = useRef<any | null>(null);

  // Création / destruction du contrôle une seule fois (par instance de map)
  useEffect(() => {
    if (!map) return;

    if (!controlRef.current) {
      controlRef.current = L.Routing.control({
        waypoints: [], // ✅ on laisse le 2e effet gérer les waypoints
        lineOptions: {
          styles: [{ color: '#2563eb', weight: 5, opacity: 0.9 }],
        },
        addWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        draggableWaypoints: false,
      } as unknown as L.Routing.RoutingOptions).addTo(map);
    }

    return () => {
      if (controlRef.current) {
        try {
          map.removeControl(controlRef.current);
        } catch (e) {
          console.warn('Erreur lors du retrait du routing control', e);
        }
        controlRef.current = null;
      }
    };
  }, [map]);

  // Mise à jour des waypoints quand sig change
  useEffect(() => {
    if (!controlRef.current) return;

    if (!sig || sig.length < 2) {
      controlRef.current.setWaypoints([]);
      return;
    }

    controlRef.current.setWaypoints(sig);
  }, [sig]);

  return null;
}

// 🧠 Helpers
const minutesToHhmm = (min: number) => {
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return `${h}h${m.toString().padStart(2, '0')}`;
};

const roleLabel = (i: number, len: number) => {
  if (i === 0) return 'Départ';
  if (i === len - 1) return 'Arrivée';
  return `Étape ${i}`;
};

// 🐝 Icônes producteurs (mêmes que sur /producteurs)
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
  const center: [number, number] =
    routePoints.length > 0 ? routePoints[0] : ([48.8566, -71.0] as [number, number]);

  // Waypoints pour le routing (vraie route)
  const routingWaypoints = useMemo(() => {
    if (!itinerary || itinerary.length < 2) return null;
    return itinerary.map((step) => L.latLng(step.lat, step.lng));
  }, [itinerary]);

  return (
    <MapContainer center={center} zoom={6} scrollWheelZoom className="z-0 h-[600px] w-full">
      <>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        <InvalidateMapSizeOnLoad />

        {/* Étapes de l’itinéraire */}
        {itinerary.map((step, index) => (
          <Marker
            key={`${index}-${step.lat}-${step.lng}`}
            position={[step.lat, step.lng]}
            // On met les étapes au-dessus pour que le clic passe bien
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

        {/* Tracé / Routing */}
        {routingWaypoints && <RoutingMachine sig={routingWaypoints} />}
        {!routingWaypoints && routePoints.length >= 2 && (
          <Polyline
            positions={routePoints}
            pathOptions={{ color: '#2563eb', weight: 5, opacity: 0.9 }}
          />
        )}

        {/* Producteurs avec icônes custom */}
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
  );
};

export default MapWithRouting;
