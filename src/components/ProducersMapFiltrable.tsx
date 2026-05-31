'use client';

import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';

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

type ProducerWithRegion = Producer & {
  region?: string;
  city?: string | null;
  county?: string | null;
};

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
  const [selectedCategories, setSelectedCategories] = useState<ProducerCategory[]>(ALL_CATEGORIES);
  const [onlyNearby, setOnlyNearby] = useState<boolean>(points.length >= 2 ? defaultNearby : false);
  const [selectedRegion, setSelectedRegion] = useState<string>('Toutes');

  const producers = useMemo(() => producersJson as unknown as ProducerWithRegion[], []);

  const regions = useMemo(() => {
    return [
      'Toutes',
      ...Array.from(
        new Set(
          producers
            .map((producer) => producer.region)
            .filter((region): region is string => Boolean(region)),
        ),
      ).sort(),
    ];
  }, [producers]);

  const regionCounts = useMemo(() => {
    return producers.reduce<Record<string, number>>((acc, producer) => {
      const region = producer.region || 'À classer';
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {});
  }, [producers]);

  const list = useMemo(() => {
    const filteredByTypeAndRoute = filterProducers({
      producers,
      selectedCategories,
      onlyNearby,
      routePoints: points,
      thresholdKm: 30,
    }) as ProducerWithRegion[];

    if (selectedRegion === 'Toutes') {
      return filteredByTypeAndRoute;
    }

    return filteredByTypeAndRoute.filter((producer) => producer.region === selectedRegion);
  }, [producers, selectedCategories, onlyNearby, points, selectedRegion]);

  const center: LatLngExpression = useMemo(() => {
    if (points.length >= 1) return points[0];
    if (list.length >= 1) return [list[0].lat, list[0].lng];
    return [46.829, -71.254];
  }, [points, list]);

  const toggleCategory = (cat: ProducerCategory) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <label htmlFor="region-filter" className="mb-2 block text-sm font-semibold text-gray-800">
          Filtrer par région
        </label>

        <select
          id="region-filter"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-800"
        >
          {regions.map((region) => (
            <option key={region} value={region}>
              {region === 'Toutes'
                ? `Toutes les régions (${producers.length})`
                : `${region} (${regionCounts[region] || 0})`}
            </option>
          ))}
        </select>
      </div>

      <ProducerTypeFilter selected={selectedCategories} onToggle={toggleCategory} />

      <p className="text-sm text-gray-600">
        {list.length} producteur{list.length > 1 ? 's' : ''} affiché{list.length > 1 ? 's' : ''}
      </p>

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

                  {p.region && <div className="text-gray-600">Région : {p.region}</div>}

                  {p.city && <div className="text-gray-500">Ville : {p.city}</div>}

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
