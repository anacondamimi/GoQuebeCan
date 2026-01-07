'use client';

import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
// ❌ plus de `import 'leaflet/dist/leaflet.css';` ici
import ProducerPopup from '@/components/ProducerPopup';
import producers from '@/data/producers.json';

const icons: Record<string, Icon> = {
  cidrerie: new Icon({ iconUrl: '/icons/apple.png', iconSize: [28, 28] }),
  petitfruit: new Icon({ iconUrl: '/icons/berry.png', iconSize: [28, 28] }),
  miel: new Icon({ iconUrl: '/icons/miel.png', iconSize: [28, 28] }),
  vignoble: new Icon({ iconUrl: '/icons/grapes.png', iconSize: [28, 28] }),
  fromage: new Icon({ iconUrl: '/icons/fromage.png', iconSize: [28, 28] }),
  microbrasserie: new Icon({ iconUrl: '/icons/microbrasserie.png', iconSize: [28, 28] }),
  ferme: new Icon({ iconUrl: '/icons/ferme.png', iconSize: [28, 28] }),
  default: new Icon({ iconUrl: '/icons/ferme.png', iconSize: [28, 28] }),
};

export default function ProducersMapGlobal() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    'cidrerie',
    'vignoble',
    'fromage',
    'microbrasserie',
    'miel',
    'petitfruit',
    'ferme',
  ]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {['cidrerie', 'vignoble', 'fromage', 'miel', 'petitfruit', 'microbrasserie', 'ferme'].map(
          (type) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`rounded-full px-3 py-1 text-sm ${selectedTypes.includes(type) ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {type}
            </button>
          ),
        )}
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
                <ProducerPopup prod={prod} />
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
