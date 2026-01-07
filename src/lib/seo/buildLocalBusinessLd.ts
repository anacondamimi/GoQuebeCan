export function buildLocalBusinessLd({
  name,
  url,
  image,
  telephone,
  address,
  latitude,
  longitude,
  openingHours = [],
  priceRange,
}: {
  name: string;
  url: string;
  image?: string;
  telephone?: string;
  address?: { streetAddress?: string; addressLocality?: string; postalCode?: string };
  latitude?: number;
  longitude?: number;
  openingHours?: string[];
  priceRange?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    url,
    ...(image ? { image: [image] } : {}),
    ...(telephone ? { telephone } : {}),
    ...(priceRange ? { priceRange } : {}),
    ...(address ? { address: { '@type': 'PostalAddress', ...address } } : {}),
    ...(latitude && longitude ? { geo: { '@type': 'GeoCoordinates', latitude, longitude } } : {}),
    ...(openingHours.length ? { openingHours } : {}),
  };
}
