"use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import producers from '@/data/producers.json';
import ProducerTypeFilter from './ProducerTypeFilter';

interface ProducersMapProps {
  points: [number, number][];
}

type Coord = [number, number];

function haversineDistance(coord1: Coord, coord2: Coord): number {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function detectCategory(prod: any): string {
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
  return 'default';
}

const icons: Record<string, Icon> = {
  apple: new Icon({ iconUrl: '/icons/apple.png', iconSize: [28, 28] }),
  grape: new Icon({ iconUrl: '/icons/grapes.png', iconSize: [28, 28] }),
  cheese: new Icon({ iconUrl: '/icons/cheese.png', iconSize: [28, 28] }),
  berry: new Icon({ iconUrl: '/icons/berry.png', iconSize: [28, 28] }),
  beer: new Icon({ iconUrl: '/icons/beer.png', iconSize: [28, 28] }),
  default: new Icon({ iconUrl: '/icons/farm.png', iconSize: [28, 28] }),
};

export default function ProducersMap({ points }: ProducersMapProps) {
  const [filtered, setFiltered] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'apple',
    'grape',
    'cheese',
    'berry',
    'beer',
  ]);
  const [filteredProducers, setFilteredProducers] = useState(producers);

  useEffect(() => {
    let result = producers;

    if (filtered && points.length > 0) {
      result = producers.filter((prod) =>
        points.some((pt) => haversineDistance(pt, [prod.lat, prod.lng]) < 30)
      );
    }

    result = result.filter((prod) => selectedCategories.includes(detectCategory(prod)));
    setFilteredProducers(result);
  }, [filtered, points, selectedCategories]);

  const center: Coord =
    points.length > 0
      ? points[0]
      : producers.length > 0
        ? [producers[0].lat, producers[0].lng]
        : [46.8, -71.2];

  const handleToggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <div className="space-y-4">
      <ProducerTypeFilter selected={selectedCategories} onToggle={handleToggleCategory} />

      <button
        onClick={() => setFiltered((prev) => !prev)}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        {filtered ? '🔄 Afficher tous les producteurs' : '📍 Producteurs proches de l’itinéraire'}
      </button>

      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredProducers.map((prod) => (
          <Marker
            key={prod.id}
            position={[prod.lat, prod.lng]}
            icon={icons[detectCategory(prod)] || icons.default}
          >
            <Popup>
              <strong>{prod.name}</strong>
              <br />
              {prod.website ? (
                <a
                  href={prod.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  site web
                </a>
              ) : (
                <span className="text-gray-500 italic">Aucun site web</span>
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
