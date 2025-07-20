'use client';
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import producers from '@/data/producers.json';

const icons: Record<string, Icon> = {
  cidrerie: new Icon({ iconUrl: '/icons/apple.png', iconSize: [28, 28] }),
  winery: new Icon({ iconUrl: '/icons/grapes.png', iconSize: [28, 28] }),
  cheese: new Icon({ iconUrl: '/icons/cheese.png', iconSize: [28, 28] }),
  beer: new Icon({ iconUrl: '/icons/beer.png', iconSize: [28, 28] }),
  farm: new Icon({ iconUrl: '/icons/farm.png', iconSize: [28, 28] }),
  default: new Icon({ iconUrl: '/icons/farm.png', iconSize: [28, 28] }),
};

export default function ProducersMapGlobal() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    'cidrerie',
    'winery',
    'cheese',
    'beer',
    'farm',
  ]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {['cidrerie', 'winery', 'cheese', 'beer', 'farm'].map((type) => (
          <button
            key={type}
            onClick={() => toggleType(type)}
            className={`px-3 py-1 rounded-full text-sm ${selectedTypes.includes(type) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {type}
          </button>
        ))}
      </div>

      <MapContainer
        center={[46.8, -71.2]}
        zoom={6}
        style={{ height: '500px', width: '100%' }}
        scrollWheelZoom
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {producers
          .filter((prod) => selectedTypes.includes(prod.type))
          .map((prod) => (
            <Marker
              key={prod.id}
              position={[prod.lat, prod.lng]}
              icon={icons[prod.type] || icons.default}
            >
              <Popup>
                <strong>{prod.name}</strong>
                <br />
                {prod.website ? (
                  <a href={prod.website} target="_blank" rel="noopener noreferrer">
                    Site Web
                  </a>
                ) : (
                  'Aucun site disponible'
                )}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
