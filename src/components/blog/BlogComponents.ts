import { FC } from 'react';
import BlogArticleAnseSaintJean from '@/components//blogpost/BlogArticleAnseSaintJean';
import BlogArticleBaieSaintPaul from '@/components//blogpost/BlogArticleBaieSaintPaul';
import BlogArticleBic from '@/components//blogpost/BlogArticleBic';
import BlogArticleBromontGranby from '@/components//blogpost/BlogArticleBromontGranby';
import BlogArticleCanyon from '@/components//blogpost/BlogArticleCanyon';
import BlogArticleCarleton from '@/components//blogpost/BlogArticleCarleton';
import BlogArticleEeyouIstchee from '@/components//blogpost/BlogArticleEeyouIstchee';
import BlogArticleForillon from '@/components//blogpost/BlogArticleForillon';
import BlogArticleGaspesie from '@/components//blogpost/BlogArticleGaspesie';
import BlogArticleGrandBend from '@/components//blogpost/BlogArticleGrandBend';
import BlogArticleHautesGorges from '@/components//blogpost/BlogArticleHautesGorges';
import BlogArticleKamouraska from '@/components//blogpost/BlogArticleKamouraska';
import BlogArticleKuururjuaq from '@/components//blogpost/BlogArticleKuururjuaq';
import BlogArticleLevis from '@/components//blogpost/BlogArticleLevis';
import BlogArticleLocationVR from '@/components//blogpost/BlogArticleLocationVR';
import BlogArticleMagogOrford from '@/components//blogpost/BlogArticleMagogOrford';
import BlogArticleMassif from '@/components//blogpost/BlogArticleMassif';
import BlogArticleMingan from '@/components//blogpost/BlogArticleMingan';
import BlogArticleMontmorency from '@/components//blogpost/BlogArticleMontmorency';
import BlogArticleMontreal from '@/components/blogpost/BlogArticleMontreal';
import BlogArticleOrleans from '@/components//blogpost/BlogArticleOrleans';
import BlogArticlePerce from '@/components//blogpost/BlogArticlePerce';
import BlogArticlePortAuPersil from '@/components//blogpost/BlogArticlePortAuPersil';
import BlogArticlePortCartier from '@/components//blogpost/BlogArticlePortCartier';
import BlogArticlePortDover from '@/components//blogpost/BlogArticlePortDover';
import BlogArticleQuebec from '@/components//blogpost/BlogArticleQuebec';
import BlogArticleRiviereduLoup from '@/components//blogpost/BlogArticleRiviereduLoup';
import BlogArticleSabrevois from '@/components//blogpost/BlogArticleSabrevois';
import BlogArticleSandbanks from '@/components//blogpost/BlogArticleSandbanks';
import BlogArticleSaubleBeach from '@/components//blogpost/BlogArticleSaubleBeach';
import BlogArticleSeptIles from '@/components//blogpost/BlogArticleSeptIles';
import BlogArticleSherbrooke from '@/components//blogpost/BlogArticleSherbrooke';
import BlogArticleSingingSands from '@/components//blogpost/BlogArticleSingingSands';
import BlogArticleTadoussac from '@/components//blogpost/BlogArticleTadoussac';
import BlogArticleWasagaBeach from '@/components//blogpost/BlogArticleWasagaBeach';
import BlogArticleWaterParks from '@/components//blogpost/BlogArticleWaterParks';
// On déclare que chaque slug (string) pointe vers un FunctionComponent React
const componentMap: Record<string, FC> = {
  quebec: BlogArticleQuebec,
  blog_article_montreal: BlogArticleMontreal,
  levis: BlogArticleLevis,
  montmorency: BlogArticleMontmorency,
  orleans: BlogArticleOrleans,
  tadoussac: BlogArticleTadoussac,
  perce: BlogArticlePerce,
  'magog-orford': BlogArticleMagogOrford,
  'wasaga-beach': BlogArticleWasagaBeach,
  'eeyou-istchee': BlogArticleEeyouIstchee,
  forillon: BlogArticleForillon,
  carleton: BlogArticleCarleton,
  'hautes-gorges': BlogArticleHautesGorges,
  massif: BlogArticleMassif,
  'parc-aquatique': BlogArticleWaterParks,
  'bromont-granby': BlogArticleBromontGranby,
  sherbrooke: BlogArticleSherbrooke,
  'riviere-du-loup': BlogArticleRiviereduLoup,
  kamouraska: BlogArticleKamouraska,
  mingan: BlogArticleMingan,
  'sept-iles': BlogArticleSeptIles,
  'port-cartier': BlogArticlePortCartier,
  'sauble-beach': BlogArticleSaubleBeach,
  sandbanks: BlogArticleSandbanks,
  'grand-bend': BlogArticleGrandBend,
  'port-dover': BlogArticlePortDover,
  'singing-sands': BlogArticleSingingSands,
  bic: BlogArticleBic,
  kuururjuaq: BlogArticleKuururjuaq,
  'anse-saint-jean': BlogArticleAnseSaintJean,
  canyon: BlogArticleCanyon,
  sabrevois: BlogArticleSabrevois,

  // Clés ajoutées manquantes
  'baie-saint-paul': BlogArticleBaieSaintPaul,
  gaspesie: BlogArticleGaspesie,
  'port-au-persil': BlogArticlePortAuPersil,
  'location-vr': BlogArticleLocationVR,
};

export default componentMap;
