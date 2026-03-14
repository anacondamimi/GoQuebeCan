export type PlaceRef = {
  name: string;
  city?: string;
  region?: string; // ex: "Québec"
  country?: string; // ex: "Canada"
  address?: string;
  slug?: string; // futur: /lieu/xxx
};

export type MapProvider = 'google' | 'apple' | 'waze' | 'internal';

function buildQuery(p: PlaceRef) {
  const parts = [p.name, p.address, p.city, p.region ?? 'Québec', p.country ?? 'Canada'].filter(
    Boolean,
  );
  return parts.join(', ');
}

export function placeLink(p: PlaceRef, provider: MapProvider) {
  const q = buildQuery(p);

  if (provider === 'google') {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  }
  if (provider === 'apple') {
    return `https://maps.apple.com/?q=${encodeURIComponent(q)}`;
  }
  if (provider === 'waze') {
    return `https://waze.com/ul?q=${encodeURIComponent(q)}`;
  }
  if (provider === 'internal') {
    if (p.slug) return `/lieu/${p.slug}`;
    return `/planificateur?search=${encodeURIComponent(q)}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
