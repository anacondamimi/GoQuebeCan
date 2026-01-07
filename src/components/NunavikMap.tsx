'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
// ❌ plus de `import 'leaflet/dist/leaflet.css';` ici

const KML_PATH = '/kml/nunavik_exploration.kml';

const goquebecanIcon = L.icon({
  iconUrl: '/favicon.avif',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -30],
});

interface Place {
  name: string;
  lat: number;
  lng: number;
}

export default function NunavikMap() {
  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const [places, setPlaces] = useState<Place[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!mapDivRef.current) return;
    if (mapRef.current) return;

    // init carte
    const map = L.map(mapDivRef.current).setView([58.099, -68.418], 5);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap | GoQuébeCAN',
    }).addTo(map);

    // marker Kuujjuaq (toujours présent)
    L.marker([58.099, -68.418], { icon: goquebecanIcon })
      .addTo(map)
      .bindPopup('<b>Kuujjuaq</b><br/>Bienvenue au Nunavik 🧭');

    // charge le KML et ajoute les autres points
    fetch(KML_PATH)
      .then((r) => (r.ok ? r.text() : Promise.reject('Erreur réseau')))
      .then((kmlText) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(kmlText, 'text/xml');
        const placemarks = xml.getElementsByTagName('Placemark');

        const parsed: Place[] = [];
        const markers: L.Marker[] = [];

        for (let i = 0; i < placemarks.length; i++) {
          const coordsNode = placemarks[i].getElementsByTagName('coordinates')[0];
          const nameNode = placemarks[i].getElementsByTagName('name')[0];
          if (!coordsNode) continue;

          const [lng, lat] = coordsNode.textContent!.trim().split(',').map(Number);
          if (isNaN(lat) || isNaN(lng)) continue;

          const name = nameNode?.textContent?.trim() || `Point ${i + 1}`;

          parsed.push({ name, lat, lng });

          const m = L.marker([lat, lng], { icon: goquebecanIcon })
            .addTo(map)
            .bindPopup(`<b>${name}</b><br/>Nunavik 🧭`);
          markers.push(m);
        }

        if (markers.length > 0) {
          const group = L.featureGroup(markers);
          map.fitBounds(group.getBounds().pad(0.4));
        }

        setPlaces(parsed);
      })
      .catch((err) => {
        console.error('Erreur KML:', err);
      });
  }, []);

  const focusOn = (p: Place) => {
    if (!mapRef.current) return;
    mapRef.current.setView([p.lat, p.lng], 8);
    setSelected(p.name);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* Colonne carte */}
      <div className="flex-1 overflow-hidden rounded-2xl border border-gray-300 shadow-lg">
        <div ref={mapDivRef} className="h-[60vh] w-full bg-slate-200 md:h-[70vh]" />
      </div>

      {/* Colonne liste / légende */}
      <aside className="flex max-h-[60vh] flex-col rounded-2xl border border-gray-200 bg-white shadow-md md:max-h-[70vh] md:w-1/3">
        <div className="rounded-t-2xl bg-slate-900 p-3 text-sm font-semibold text-white">
          Communautés du Nunavik
        </div>

        <div className="flex-1 overflow-y-auto text-sm">
          {places.length === 0 ? (
            <div className="p-4 text-xs italic text-slate-500">Chargement des points...</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {places.map((p) => (
                <li
                  key={p.name + p.lat + p.lng}
                  className={`px-4 py-2 ${
                    selected === p.name ? 'bg-blue-100 font-semibold text-blue-800' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => focusOn(p)}
                    className="w-full rounded-md px-1 py-0.5 text-left hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    aria-pressed={selected === p.name}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-gray-200 px-3 py-2 text-[11px] text-slate-500">
          Cliquez pour centrer la carte. Données : GoQuébeCAN.
        </div>
      </aside>
    </div>
  );
}
