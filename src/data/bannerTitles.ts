// src/data/bannerTitles.ts
export function getBannerTitle(pathname: string): string | undefined {
  // Normalisation simple
  const p = pathname.replace(/\/+$/, '') || '/';

  // Exacts d'abord
  const exact: Record<string, string> = {
    '/': 'Découvrir le Québec',
    '/experiences': 'Vivre une expérience',
    '/producteurs': 'Découvrir les producteurs locaux',
    '/camping': 'Camping',
    '/videos': 'Vidéos',
    '/vols': 'Vols',
    '/planificateur': 'Planifier son itinéraire',
    '/offres': 'Offres spéciales',
  };
  if (exact[p]) return exact[p];

  // Préfixes (sections / détails)
  const startsWith: Array<[string, string]> = [
    ['/destinations', 'Destinations'],
    ['/blog/location-vr', 'Le Canada en VR'],
    ['/itineraires-communaute', 'Itinéraires de la communauté'],
    ['/blog', 'Le Blog'],
  ];
  const hit = startsWith.find(([prefix]) => p.startsWith(prefix));
  if (hit) return hit[1];

  // Fallback
  return 'Découvrir le Québec';
}
