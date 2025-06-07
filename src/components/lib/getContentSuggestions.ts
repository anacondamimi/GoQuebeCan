// app/lib/getContentSuggestions.ts

interface Suggestion {
  destination: string;
  blogUrl: string;
  videoUrl: string;
  objectsUrl: string;
  plannerUrl: string;
}

const baseUrls = {
  blog: '/blog/',
  videos: '/videos',
  objects: '/objets',
  planner: '/planificateur',
};

const contentMap: Record<string, Suggestion> = {
  // Gaspésie
  gaspesie: {
    destination: 'Gaspésie',
    blogUrl: `${baseUrls.blog}gaspesie`,
    videoUrl: `${baseUrls.videos}#gaspesie`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  perce: {
    destination: 'Percé',
    blogUrl: `${baseUrls.blog}perce`,
    videoUrl: `${baseUrls.videos}#perce`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  carleton: {
    destination: 'Carleton',
    blogUrl: `${baseUrls.blog}carleton`,
    videoUrl: `${baseUrls.videos}#carleton`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  forillon: {
    destination: 'Forillon',
    blogUrl: `${baseUrls.blog}forillon`,
    videoUrl: `${baseUrls.videos}#forillon`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },

  // Charlevoix
  'baie-saint-paul': {
    destination: 'Baie-Saint-Paul',
    blogUrl: `${baseUrls.blog}baie-saint-paul`,
    videoUrl: `${baseUrls.videos}#baie-saint-paul`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  massif: {
    destination: 'Massif',
    blogUrl: `${baseUrls.blog}massif`,
    videoUrl: `${baseUrls.videos}#massif`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  'port-au-persil': {
    destination: 'Port-au-Persil',
    blogUrl: `${baseUrls.blog}port-au-persil`,
    videoUrl: `${baseUrls.videos}#port-au-persil`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  'hautes-gorges': {
    destination: 'Hautes-Gorges',
    blogUrl: `${baseUrls.blog}hautes-gorges`,
    videoUrl: `${baseUrls.videos}#hautes-gorges`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },

  // Côte-Nord
  'sept-iles': {
    destination: 'Sept-Îles',
    blogUrl: `${baseUrls.blog}sept-iles`,
    videoUrl: `${baseUrls.videos}#sept-iles`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  mingan: {
    destination: 'Mingan',
    blogUrl: `${baseUrls.blog}mingan`,
    videoUrl: `${baseUrls.videos}#mingan`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  'port-cartier': {
    destination: 'Port-Cartier',
    blogUrl: `${baseUrls.blog}port-cartier`,
    videoUrl: `${baseUrls.videos}#port-cartier`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  tadoussac: {
    destination: 'Tadoussac',
    blogUrl: `${baseUrls.blog}tadoussac`,
    videoUrl: `${baseUrls.videos}#tadoussac`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },

  // Cantons-de-l'Est
  'magog-orford': {
    destination: 'Magog-Orford',
    blogUrl: `${baseUrls.blog}magog-orford`,
    videoUrl: `${baseUrls.videos}#magog-orford`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  'bromont-granby': {
    destination: 'Bromont-Granby',
    blogUrl: `${baseUrls.blog}bromont-granby`,
    videoUrl: `${baseUrls.videos}#bromont-granby`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  sherbrooke: {
    destination: 'Sherbrooke',
    blogUrl: `${baseUrls.blog}sherbrooke`,
    videoUrl: `${baseUrls.videos}#sherbrooke`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },

  // Bas-Saint-Laurent
  bic: {
    destination: 'Bic',
    blogUrl: `${baseUrls.blog}bic`,
    videoUrl: `${baseUrls.videos}#bic`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  kamouraska: {
    destination: 'Kamouraska',
    blogUrl: `${baseUrls.blog}kamouraska`,
    videoUrl: `${baseUrls.videos}#kamouraska`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  'rivieredu-loup': {
    destination: 'Rivière-du-Loup',
    blogUrl: `${baseUrls.blog}rivieredu-loup`,
    videoUrl: `${baseUrls.videos}#rivieredu-loup`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },

  // Ville de Québec
  quebec: {
    destination: 'Ville de Québec',
    blogUrl: `${baseUrls.blog}quebec`,
    videoUrl: `${baseUrls.videos}#quebec`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  levis: {
    destination: 'Lévis',
    blogUrl: `${baseUrls.blog}levis`,
    videoUrl: `${baseUrls.videos}#levis`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  montmorency: {
    destination: 'Montmorency',
    blogUrl: `${baseUrls.blog}montmorency`,
    videoUrl: `${baseUrls.videos}#montmorency`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  orleans: {
    destination: 'Île d’Orléans',
    blogUrl: `${baseUrls.blog}orleans`,
    videoUrl: `${baseUrls.videos}#orleans`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },

  // Ontario
  'wasaga-beach': {
    destination: 'Wasaga Beach',
    blogUrl: `${baseUrls.blog}wasaga-beach`,
    videoUrl: `${baseUrls.videos}#wasaga-beach`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  'port-dover': {
    destination: 'Port Dover',
    blogUrl: `${baseUrls.blog}port-dover`,
    videoUrl: `${baseUrls.videos}#port-dover`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  'grand-bend': {
    destination: 'Grand Bend',
    blogUrl: `${baseUrls.blog}grand-bend`,
    videoUrl: `${baseUrls.videos}#grand-bend`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  'sauble-beach': {
    destination: 'Sauble Beach',
    blogUrl: `${baseUrls.blog}sauble-beach`,
    videoUrl: `${baseUrls.videos}#sauble-beach`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  sandbanks: {
    destination: 'Sandbanks',
    blogUrl: `${baseUrls.blog}sandbanks`,
    videoUrl: `${baseUrls.videos}#sandbanks`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  'singing-sands': {
    destination: 'Singing Sands',
    blogUrl: `${baseUrls.blog}singing-sands`,
    videoUrl: `${baseUrls.videos}#singing-sands`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },

  // Autres destinations
  'eeyou-istchee': {
    destination: 'Eeyou Istchee',
    blogUrl: `${baseUrls.blog}eeyou-istchee`,
    videoUrl: `${baseUrls.videos}#eeyou-istchee`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  kuururjuaq: {
    destination: 'Kuururjuaq',
    blogUrl: `${baseUrls.blog}kuururjuaq`,
    videoUrl: `${baseUrls.videos}#kuururjuaq`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  sabrevois: {
    destination: 'Sabrevois',
    blogUrl: `${baseUrls.blog}sabrevois`,
    videoUrl: `${baseUrls.videos}#sabrevois`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  canyon: {
    destination: 'Canyon',
    blogUrl: `${baseUrls.blog}canyon`,
    videoUrl: `${baseUrls.videos}#canyon`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
  'pourquoi-louer-un-vr-au-quebec-avec-authentik-canada': {
    destination: 'Voyager en VR',
    blogUrl: `${baseUrls.blog}pourquoi-louer-un-vr-au-quebec-avec-authentik-canada`,
    videoUrl: `${baseUrls.videos}#vr`,
    objectsUrl: baseUrls.objects,
    plannerUrl: baseUrls.planner,
  },
};

export function getContentSuggestions(slug: string): Suggestion | null {
  return contentMap[slug] || null;
}
