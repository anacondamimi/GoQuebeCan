'use client';
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import Link from 'next/link';
import destinations from '@/data/destinations.json';

interface Producer {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type?: string;
  website?: string;
}

interface Props {
  points: [number, number][];
  onAddDestinationStep?: (name: string, coords: [number, number]) => void;
  producers?: Producer[]; // ✅ Ajouté pour accepter les producteurs dynamiques
}

export default function MapWithRouting({ points, onAddDestinationStep, producers = [] }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const routingRef = useRef<any>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'apple',
    'grape',
    'cheese',
    'berry',
    'beer',
  ]);
  const [showProducers, setShowProducers] = useState(true);

  const categoryIcons: Record<string, Icon> = {
    apple: new Icon({ iconUrl: '/icons/apple.png', iconSize: [28, 28] }),
    grape: new Icon({ iconUrl: '/icons/grapes.png', iconSize: [28, 28] }),
    cheese: new Icon({ iconUrl: '/icons/cheese.png', iconSize: [28, 28] }),
    berry: new Icon({ iconUrl: '/icons/berry.png', iconSize: [28, 28] }),
    beer: new Icon({ iconUrl: '/icons/beer.png', iconSize: [28, 28] }),
    farm: new Icon({ iconUrl: '/icons/farm.png', iconSize: [28, 28] }),
    default: new Icon({ iconUrl: '/icons/farm.png', iconSize: [28, 28] }),
  };

  function detectCategory(prod: Producer): string {
    const name = prod.name?.toLowerCase() || '';
    const type = prod.type?.toLowerCase() || '';

    if (name.includes('cidre') || name.includes('pom') || type.includes('cidrerie')) return 'apple';
    if (name.includes('vignoble') || name.includes('raisin') || type.includes('winery'))
      return 'grape';
    if (name.includes('fromage') || type.includes('cheese')) return 'cheese';
    if (name.includes('bleuet') || name.includes('camerise') || name.includes('fruit'))
      return 'berry';
    if (name.includes('bière') || name.includes('microbrasserie') || type.includes('brewery'))
      return 'beer';
    if (type.includes('farm') || name.includes('ferme') || name.includes('boucherie'))
      return 'farm';
    return 'default';
  }

  const questionIcon = new L.DivIcon({
    html: '<div style="background:#facc15;color:black;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold">?</div>',
    className: 'custom-question-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  useEffect(() => {
    if (!mapRef.current || points.length < 2) return;

    if (routingRef.current) {
      mapRef.current.removeControl(routingRef.current);
    }

    const waypoints = points.map((p) => L.latLng(p[0], p[1]));

    const routingControl = (L as any).Routing.control({
      waypoints,
      routeWhileDragging: false,
      show: false,
      createMarker: () => null,
    });

    routingControl.on('routesfound', (e: any) => {
      const route = e.routes[0];
      const distanceMeters = route.summary.totalDistance;
      setDistanceKm(parseFloat((distanceMeters / 1000).toFixed(1)));
    });

    routingControl.addTo(mapRef.current);
    routingRef.current = routingControl;
  }, [points]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="my-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {['apple', 'grape', 'cheese', 'berry', 'beer', 'farm'].map((cat) => (
          <button
            key={cat}
            onClick={() => toggleCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${selectedCategories.includes(cat) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {cat === 'apple'
              ? '🍎 Pomme'
              : cat === 'grape'
                ? '🍇 Raisin'
                : cat === 'cheese'
                  ? '🧀 Fromage'
                  : cat === 'berry'
                    ? '🫐 Fruits'
                    : cat === 'beer'
                      ? '🍺 Bière'
                      : '🥩 Ferme'}
          </button>
        ))}
        <button
          onClick={() => setShowProducers((prev) => !prev)}
          className="px-3 py-1.5 rounded-full text-sm font-medium bg-yellow-200 text-gray-800 hover:bg-yellow-300"
        >
          {showProducers ? '👁️ Masquer producteurs' : '👁️ Afficher producteurs'}
        </button>
      </div>

      <div style={{ height: '500px', width: '100%' }} id="map-section">
        <MapContainer
          center={points[0] || [46.8139, -71.208]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          ref={(map) => {
            if (map) mapRef.current = map;
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {points.map((pos, idx) => (
            <Marker key={`step-${idx}`} position={pos}>
              <Popup>
                {idx === 0 ? 'Départ' : idx === points.length - 1 ? 'Arrivée' : `Étape ${idx}`}
              </Popup>
            </Marker>
          ))}

          {showProducers &&
            producers
              .filter((p) => selectedCategories.includes(detectCategory(p)))
              .map((p, idx) => (
                <Marker
                  key={`prod-${idx}`}
                  position={[p.lat, p.lng]}
                  icon={categoryIcons[detectCategory(p)] || categoryIcons.default}
                >
                  <Popup>
                    <strong>{p.name}</strong>
                    <br />
                    {p.type || 'Producteur'}
                    <br />
                    {p.website && (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        site web
                      </a>
                    )}
                  </Popup>
                </Marker>
              ))}

          {destinations.map(
            (d, idx) =>
              typeof d.lat === 'number' &&
              typeof d.lng === 'number' && (
                <Marker key={`dest-${idx}`} position={[d.lat, d.lng]} icon={questionIcon}>
                  <Popup>
                    <div className="text-sm space-y-2">
                      <div>
                        <strong>{d.ville}</strong>
                        <br />
                        <Link href={`/blog/${d.slug}`} className="text-blue-600 underline">
                          Lire l'article
                        </Link>
                      </div>
                      <div>
                        <button
                          onClick={() => {
                            const coords: [number, number] = [d.lat, d.lng];
                            if (mapRef.current) mapRef.current.setView(coords, 8);
                            onAddDestinationStep?.(d.ville, coords);
                          }}
                          className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          ✅ Ajouter à l’itinéraire
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )
          )}
        </MapContainer>
      </div>

      {distanceKm && (
        <p className="text-center mt-4 text-lg font-medium">Distance totale : {distanceKm} km</p>
      )}
    </div>
  );
}
