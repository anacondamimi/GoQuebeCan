'use client';

import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Icon } from 'leaflet';
// ❌ plus de `import 'leaflet/dist/leaflet.css';` ici

import producersJson from '@/data/producers.json';
import {
  filterProducers,
  detectCategory,
  ALL_CATEGORIES,
  type Producer,
  type Coord,
  type ProducerCategory,
} from '@/utils/producersFilters';

type Props = {
  points?: Coord[];
  selectedCategories?: ProducerCategory[];
  onlyNearby?: boolean;
  thresholdKm?: number;
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

export default function ProducersMap(props: Props) {
  const {
    points = [],
    selectedCategories = ALL_CATEGORIES,
    onlyNearby = false,
    thresholdKm = 30,
    height = 420,
  } = props;

  const producers = useMemo(() => producersJson as unknown as Producer[], []);

  const list = useMemo(
    () =>
      filterProducers({
        producers,
        selectedCategories,
        onlyNearby,
        routePoints: points,
        thresholdKm,
      }),
    [producers, selectedCategories, onlyNearby, points, thresholdKm],
  );

  const center: [number, number] = useMemo(() => {
    if (points.length >= 1) return points[0];
    if (list.length >= 1) return [list[0].lat, list[0].lng];
    return [46.829, -71.254];
  }, [points, list]);

  return (
    <MapContainer center={center} zoom={7} scrollWheelZoom style={{ height, width: '100%' }}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.length >= 2 && <Polyline positions={points} />}

      {list.map((prod) => {
        const cat = detectCategory(prod);
        const icon = icons[cat] || icons.default;
        return (
          <Marker key={prod.id} position={[prod.lat, prod.lng]} icon={icon}>
            <Popup>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>{prod.name}</strong>
                  <br />
                  {prod.website ? (
                    <a
                      href={prod.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Site web
                    </a>
                  ) : (
                    <span className="italic text-gray-500">Aucun site web</span>
                  )}
                </div>

                {prod.relatedArticles && prod.relatedArticles.length > 0 && (
                  <div>
                    <strong>Articles liés :</strong>
                    <ul className="list-inside list-disc">
                      {prod.relatedArticles.map((slug, i) => (
                        <li key={i}>
                          <a
                            href={`/blog/${slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            {slug}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
