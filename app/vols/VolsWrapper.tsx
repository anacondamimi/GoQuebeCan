// app/vols/VolsWrapper.tsx
import VolsClient from './VolsClient';

export default function VolsWrapper() {
  // ✅ On garde VolsClient en "use client", mais on ne bloque plus le SSR.
  return <VolsClient />;
}
