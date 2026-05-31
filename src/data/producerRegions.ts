export const PRODUCER_REGIONS = [
  { slug: 'abitibi-temiscamingue', name: 'Abitibi-Témiscamingue' },
  { slug: 'bas-saint-laurent', name: 'Bas-Saint-Laurent' },
  { slug: 'cantons-de-lest', name: "Cantons-de-l'Est" },
  { slug: 'centre-du-quebec', name: 'Centre-du-Québec' },
  { slug: 'charlevoix', name: 'Charlevoix' },
  { slug: 'cote-nord', name: 'Côte-Nord' },
  { slug: 'gaspesie', name: 'Gaspésie' },
  { slug: 'lanaudiere', name: 'Lanaudière' },
  { slug: 'laurentides', name: 'Laurentides' },
  { slug: 'mauricie', name: 'Mauricie' },
  { slug: 'montreal', name: 'Montréal et sa région' },
  { slug: 'nord-du-quebec', name: 'Nord-du-Québec' },
  { slug: 'outaouais', name: 'Outaouais' },
  { slug: 'saguenay-lac-saint-jean', name: 'Saguenay–Lac-Saint-Jean' },
  { slug: 'ville-de-quebec', name: 'Ville de Québec et sa région' },
] as const;

export type ProducerRegion = (typeof PRODUCER_REGIONS)[number];
