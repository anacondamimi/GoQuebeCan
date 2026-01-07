// src/utils/producersFilters.ts
export type Coord = [number, number];

export interface Producer {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type?: string;
  address?: string;
  website?: string;
  relatedArticles?: string[]; // <-- pour virer le any dans les Popups
}

export type ProducerCategory =
  | 'cidrerie'
  | 'vignoble'
  | 'fromage'
  | 'petitfruit'
  | 'microbrasserie'
  | 'miel'
  | 'ferme'
  | 'default';

export const ALL_CATEGORIES: ProducerCategory[] = [
  'cidrerie',
  'vignoble',
  'fromage',
  'petitfruit',
  'microbrasserie',
  'miel',
  'ferme',
];

export function detectCategory(p: Producer): ProducerCategory {
  const raw = `${p.name ?? ''} ${p.type ?? ''}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

  // correspondances directes par champ "type"/"category"
  const direct = (p.type ?? '').toLowerCase();
  switch (direct) {
    case 'cidrerie':
    case 'apple':
    case 'cider':
      return 'cidrerie';
    case 'vignoble':
    case 'wine':
    case 'grape':
      return 'vignoble';
    case 'fromage':
    case 'fromagerie':
      return 'fromage';
    case 'petitfruit':
    case 'berry':
      return 'petitfruit';
    case 'brewery':
    case 'brasserie':
    case 'microbrasserie':
      return 'microbrasserie';
    case 'miel':
    case 'honey':
    case 'apiculture':
      return 'miel';
    case 'ferme':
      return 'ferme';
  }

  // heuristiques FR/EN (inclut variantes courantes)
  if (/(cidre|cider|pomm|verger|cidrerie)\b/.test(raw)) return 'cidrerie';
  if (/(vignoble|vignoble|wine|raisin|grape)\b/.test(raw)) return 'vignoble';
  if (/(fromage|fromager|fromage)\b/.test(raw)) return 'fromage';
  if (
    /(bleuet|bleuetiere|camerise|baie|berries?|framboise|fraise|petits?[-\s]?fruits?)\b/.test(raw)
  )
    return 'petitfruit';
  if (/(biere|brasserie|microbrasserie|microbrasserie|brewery)\b/.test(raw))
    return 'microbrasserie';
  if (/(miel|honey|apiculture|miellerie|abeille|hydromel|mead)\b/.test(raw)) return 'miel';
  if (/(ferme|ferme|elevage|mara(ich|î)er|agrotourisme)\b/.test(raw)) return 'ferme';

  return 'default';
}

// ---- distances ----
export function haversineKm(a: Coord, b: Coord): number {
  const [lat1, lon1] = a,
    [lat2, lon2] = b;
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const s1 = Math.sin(dLat / 2),
    s2 = Math.sin(dLon / 2);
  const A = s1 * s1 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * s2 * s2;
  return 2 * R * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A));
}

function pointToSegmentKm(p: Coord, a: Coord, b: Coord): number {
  const lat0 = (((a[0] + b[0]) / 2) * Math.PI) / 180;
  const ax = a[1] * Math.cos(lat0),
    ay = a[0];
  const bx = b[1] * Math.cos(lat0),
    by = b[0];
  const px = p[1] * Math.cos(lat0),
    py = p[0];
  const ABx = bx - ax,
    ABy = by - ay;
  const APx = px - ax,
    APy = py - ay;
  const ab2 = ABx * ABx + ABy * ABy || 1;
  let t = (APx * ABx + APy * ABy) / ab2;
  t = Math.max(0, Math.min(1, t));
  const projLat = ay + t * ABy;
  const projLon = (ax + t * ABx) / Math.cos(lat0);
  return haversineKm(p, [projLat, projLon]);
}

export function distanceToPolylineKm(p: Coord, line: Coord[]): number {
  if (!Array.isArray(line) || line.length < 2) return Infinity;
  let best = Infinity;
  for (let i = 0; i < line.length - 1; i++) {
    const d = pointToSegmentKm(p, line[i], line[i + 1]);
    if (d < best) best = d;
  }
  return best;
}

// ---- filtre combiné ----
export type FilterArgs = {
  producers: Producer[];
  selectedCategories?: ProducerCategory[];
  onlyNearby?: boolean;
  routePoints?: Coord[];
  thresholdKm?: number;
};
export function filterProducers({
  producers,
  selectedCategories = [],
  onlyNearby = false,
  routePoints = [],
  thresholdKm = 30,
}: FilterArgs): Producer[] {
  let list = producers.filter(
    (p) => Number.isFinite(p.lat) && Number.isFinite(p.lng) && p.id && p.name,
  );

  // "Toutes" sélectionnées => pas de filtre catégorie
  const sel = new Set(selectedCategories);
  const isAllSelected = selectedCategories.length > 0 && ALL_CATEGORIES.every((c) => sel.has(c));

  if (!isAllSelected && selectedCategories.length > 0) {
    list = list.filter((p) => sel.has(detectCategory(p)));
  }

  if (onlyNearby && routePoints.length >= 2) {
    list = list.filter((p) => distanceToPolylineKm([p.lat, p.lng], routePoints) <= thresholdKm);
  }

  return list;
}
