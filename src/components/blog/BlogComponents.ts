import { FC } from 'react';
import BlogArticleAnseSaintJean from '../blogpost/BlogArticleAnseSaintJean';
import BlogArticleBaieSaintPaul from '../blogpost/BlogArticleBaieSaintPaul';
import BlogArticleBic from '../blogpost/BlogArticleBic';
import BlogArticleBromontGranby from '../blogpost/BlogArticleBromontGranby';
import BlogArticleCanyon from '../blogpost/BlogArticleCanyon';
import BlogArticleCarleton from '../blogpost/BlogArticleCarleton';
import BlogArticleEeyouIstchee from '../blogpost/BlogArticleEeyouIstchee';
import BlogArticleForillon from '../blogpost/BlogArticleForillon';
import BlogArticleGaspesie from '../blogpost/BlogArticleGaspesie';
import BlogArticleGrandBend from '../blogpost/BlogArticleGrandBend';
import BlogArticleHautesGorges from '../blogpost/BlogArticleHautesGorges';
import BlogArticleKamouraska from '../blogpost/BlogArticleKamouraska';
import BlogArticleKuururjuaq from '../blogpost/BlogArticleKuururjuaq';
import BlogArticleLevis from '../blogpost/BlogArticleLevis';
import BlogArticleLocationVR from '../blogpost/BlogArticleLocationVR';
import BlogArticleMagogOrford from '../blogpost/BlogArticleMagogOrford';
import BlogArticleMassif from '../blogpost/BlogArticleMassif';
import BlogArticleMingan from '../blogpost/BlogArticleMingan';
import BlogArticleMontmorency from '../blogpost/BlogArticleMontmorency';
import BlogArticleMontreal from '@/components/blogpost/BlogArticleMontreal';
import BlogArticleOrleans from '../blogpost/BlogArticleOrleans';
import BlogArticlePerce from '../blogpost/BlogArticlePerce';
import BlogArticlePortAuPersil from '../blogpost/BlogArticlePortAuPersil';
import BlogArticlePortCartier from '../blogpost/BlogArticlePortCartier';
import BlogArticlePortDover from '../blogpost/BlogArticlePortDover';
import BlogArticleQuebec from '../blogpost/BlogArticleQuebec';
import BlogArticleRiviereduLoup from '../blogpost/BlogArticleRiviereduLoup';
import BlogArticleSabrevois from '../blogpost/BlogArticleSabrevois';
import BlogArticleSandbanks from '../blogpost/BlogArticleSandbanks';
import BlogArticleSaubleBeach from '../blogpost/BlogArticleSaubleBeach';
import BlogArticleSeptIles from '../blogpost/BlogArticleSeptIles';
import BlogArticleSherbrooke from '../blogpost/BlogArticleSherbrooke';
import BlogArticleSingingSands from '../blogpost/BlogArticleSingingSands';
import BlogArticleTadoussac from '../blogpost/BlogArticleTadoussac';
import BlogArticleWasagaBeach from '../blogpost/BlogArticleWasagaBeach';

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
