// app/(map)/layout.tsx
import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Pas de fonts, pas de metadata, pas de ClientWrapper ici.
// RootLayout s’occupe déjà de tout ça.

export default function MapsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
