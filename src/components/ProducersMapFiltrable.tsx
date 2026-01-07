'use client';

import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
// ❌ plus de `import 'leaflet/dist/leaflet.css';` ici

import producersJson from '@/data/producers.json';
import ProducerTypeFilter from './ProducerTypeFilter';
import {
  filterProducers,
  detectCategory,
  ALL_CATEGORIES,
  type Coord,
  type Producer,
  type ProducerCategory,
} from '@/utils/producersFilters';

type Props = {
  points?: Coord[];
  defaultNearby?: boolean;
  height?: number;
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

export default function ProducersMapFiltrable({
  points = [],
  defaultNearby = false,
  height = 420,
}: Props) {
  // ✅ state typé correctement
  const [selectedCategories, setSelectedCategories] = useState<ProducerCategory[]>(ALL_CATEGORIES);
  const [onlyNearby, setOnlyNearby] = useState<boolean>(points.length >= 2 ? defaultNearby : false);

  const producers = useMemo(() => producersJson as unknown as Producer[], []);

  const list = useMemo(
    () =>
      filterProducers({
        producers,
        selectedCategories,
        onlyNearby,
        routePoints: points,
        thresholdKm: 30,
      }),
    [producers, selectedCategories, onlyNearby, points],
  );

  // ✅ plus de "as any" : on tape center en LatLngExpression
  const center: LatLngExpression = useMemo(() => {
    if (points.length >= 1) return points[0];
    if (list.length >= 1) return [list[0].lat, list[0].lng];
    return [46.829, -71.254]; // Québec
  }, [points, list]);

  const toggleCategory = (cat: ProducerCategory) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );

  return (
    <div className="space-y-4">
      <ProducerTypeFilter selected={selectedCategories} onToggle={toggleCategory} />

      {points.length >= 2 && (
        <button
          onClick={() => setOnlyNearby((v) => !v)}
          className="rounded bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
          type="button"
        >
          {onlyNearby ? '🔄 Tous les producteurs' : '📍 Proches de l’itinéraire'}
        </button>
      )}

      <MapContainer center={center} zoom={7} scrollWheelZoom style={{ height, width: '100%' }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {points.length >= 2 && <Polyline positions={points} />}

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
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
