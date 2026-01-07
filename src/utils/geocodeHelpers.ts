export type GeocodingDetail = {
  label?: string;
  place_name?: string;
  text?: string;
  name?: string;
  coordinates?: [number, number];
  center?: [number, number];
  lngLat?: [number, number];
  lon?: number;
  lat?: number;
  longitude?: number;
  latitude?: number;
};

// Helpers extraction geocode
export function extractCoords(detail: GeocodingDetail | undefined): [number, number] | null {
  if (!detail) return null;
  if (Array.isArray(detail.coordinates) && detail.coordinates.length === 2) {
    return detail.coordinates as [number, number];
  }
  if (Array.isArray(detail.center) && detail.center.length === 2) {
    return detail.center as [number, number];
  }
  if (Array.isArray(detail.lngLat) && detail.lngLat.length === 2) {
    return detail.lngLat as [number, number];
  }

  const lng =
    typeof detail.lon === 'number'
      ? detail.lon
      : typeof detail.longitude === 'number'
        ? detail.longitude
        : undefined;

  const lat =
    typeof detail.lat === 'number'
      ? detail.lat
      : typeof detail.latitude === 'number'
        ? detail.latitude
        : undefined;

  if (typeof lng === 'number' && typeof lat === 'number') return [lng, lat];
  return null;
}

export function extractLabel(detail: GeocodingDetail | undefined, fallback: string): string {
  if (!detail) return fallback;
  return detail.label ?? detail.place_name ?? detail.text ?? detail.name ?? fallback;
}

// Distance approx en km pour trouver l’étape la plus proche
export function haversineKm(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const [lng1, lat1] = a;
  const [lng2, lat2] = b;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const la1 = toRad(lat1);
  const la2 = toRad(lat2);

  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * c;
}
