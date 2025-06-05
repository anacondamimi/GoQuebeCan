'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
require('leaflet-routing-machine'); // important : ne pas utiliser "import" ici
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

interface Props {
  points: [number, number][]; // [start, ...steps, end]
  producers?: { name: string; lat: number; lng: number; type?: string }[];
}

export default function MapWithRouting({ points, producers = [] }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const routingRef = useRef<any>(null);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);

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

  const producerIcon = new L.Icon({
    iconUrl: '/icons/farm.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -30],
  });

  return (
    <div className="my-6">
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

          {producers.map((p, idx) => (
            <Marker key={`prod-${idx}`} position={[p.lat, p.lng]} icon={producerIcon}>
              <Popup>
                <strong>{p.name}</strong>
                <br />
                {p.type || 'Producteur'}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {distanceKm && (
        <p className="text-center mt-4 text-lg font-medium">Distance totale : {distanceKm} km</p>
      )}
    </div>
  );
}
