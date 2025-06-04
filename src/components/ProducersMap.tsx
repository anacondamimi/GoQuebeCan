'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import producers from '../data/producers.json';

// Icônes par type
const icons: Record<string, Icon> = {
  farm: new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/415/415733.png',
    iconSize: [25, 25],
  }),
  winery: new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/3468/3468350.png',
    iconSize: [25, 25],
  }),
  cheese: new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/135/135620.png',
    iconSize: [25, 25],
  }),
  default: new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
    iconSize: [25, 25],
  }),
};

export default function ProducersMap() {
  const [center, setCenter] = useState<[number, number]>([46.8, -71.2]);

  useEffect(() => {
    if (producers.length > 0) {
      setCenter([producers[0].lat, producers[0].lng]);
    }
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {producers.map((prod) => (
        <Marker
          key={prod.id}
          position={[prod.lat, prod.lng]}
          icon={icons[prod.type] || icons.default}
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
  );
}
