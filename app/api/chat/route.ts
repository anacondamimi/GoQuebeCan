import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import { BLOG_SLUGS } from '@/data/blog-slugs';

type ChatMessage = {
  text: string;
  isUser: boolean;
  timestamp: string;
};

type ChatRequestBody = {
  messages: ChatMessage[];
  profile?: Partial<TravelerProfile>;
};

type AssistantIntent =
  | 'idea'
  | 'destination'
  | 'hotel'
  | 'article'
  | 'videos'
  | 'planner'
  | 'producers'
  | 'beginner'
  | 'compare'
  | 'roadtrip'
  | 'general';

type AssistantLink = {
  label: string;
  href: string;
};

type TravelerProfile = {
  origin?: string;
  destination?: string;
  durationDays?: number;
  dateText?: string;
  season?: 'printemps' | 'ete' | 'automne' | 'hiver' | 'unknown';
  travelersText?: string;
  withKids?: boolean;
  travelStyle?: string;
  budget?: 'petit' | 'moyen' | 'haut' | 'unknown';
  pace?: 'relax' | 'equilibre' | 'intense' | 'unknown';
  transport?: 'auto' | 'vr' | 'moto' | 'avion' | 'unknown';
  interests?: string[];
  likesLocalFood?: boolean;
  avoidsCrowds?: boolean;
  needsLodging?: boolean;
};

type AssistantAction =
  | {
      type: 'none';
    }
  | {
      type: 'ask_followup';
      missing: Array<keyof TravelerProfile>;
    }
  | {
      type: 'open_route';
      href: string;
    }
  | {
      type: 'build_itinerary';
      origin?: string;
      durationDays?: number;
      suggestedStops: Array<{ slug: string; label: string; reason: string }>;
    };

type AssistantPayload = {
  message: string;
  intent: AssistantIntent;
  travelerProfile: TravelerProfile;
  recommendationSummary?: string;
  suggestedItinerary?: Array<{
    day: number;
    title: string;
    description: string;
    relatedSlug?: string;
  }>;
  producers?: Array<{
    name: string;
    type?: string;
    city?: string;
    region?: string;
    reason?: string;
  }>;
  links: AssistantLink[];
  nextQuestion: string | null;
  action: AssistantAction;
  detectedDestination?: string;
  detectedDurationDays?: number;
  detectedOrigin?: string;
};

type KnowledgeArticle = {
  slug?: string;
  title?: string;
  description?: string;
  url?: string;
  region?: string;
  city?: string;
  keywords?: string[];
  sections?: unknown[];
  internalLinks?: Array<{ label?: string; href?: string } | string>;
};

type KnowledgeProducer = {
  id?: string;
  slug?: string;
  name?: string;
  nom?: string;
  title?: string;
  type?: string;
  category?: string;
  region?: string;
  city?: string;
  ville?: string;
  description?: string;
  address?: string;
  website?: string;
  latitude?: number | string | null;
  longitude?: number | string | null;
  relatedArticles?: string[];
  lat?: number | string | null;
  lng?: number | string | null;
};

type KnowledgeBase = {
  generatedAt?: string;
  articles?: KnowledgeArticle[];
  producers?: KnowledgeProducer[];
};

const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
const PROJECT = process.env.OPENAI_PROJECT_ID ?? '';
const API_KEY = process.env.OPENAI_API_KEY ?? '';
const TEMPERATURE = Number.isFinite(Number(process.env.OPENAI_TEMPERATURE))
  ? Number(process.env.OPENAI_TEMPERATURE)
  : 0.35;

const MAX_MESSAGES = 20;
const MAX_CONTEXT_ARTICLES = 8;
const MAX_CONTEXT_PRODUCERS = 16;
const KB_PATH = path.join(process.cwd(), 'public', 'ai-knowledge-base.json');

const INTERNAL_ROUTES = {
  destinations: '/#destinations-populaires',
  blog: '/blog',
  planner: '/planificateur',
  producteurs: '/producteurs',
  coupsDeCoeur: '/coups-de-coeur',
  offres: '/offres',
  videos: '/videos',
  vols: '/vols',
  vr: '/blog/location-vr',
  camping: '/camping',
  experiences: '/experiences',
  voyageVoiture: '/blog/voyage-voiture',
  voyageHotel: '/blog/voyage-hotel',
  voyageCamping: '/blog/voyage-camping',
  voyageAvion: '/blog/voyage-avion',
} as const;

const SAFE_INTERNAL_ROUTES = Object.values(INTERNAL_ROUTES);
let cachedKnowledgeBase: KnowledgeBase | null = null;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function normalizeText(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(input: string) {
  return normalizeText(input)
    .split(' ')
    .filter((word) => word.length >= 3);
}

function loadKnowledgeBase(): KnowledgeBase {
  if (cachedKnowledgeBase) return cachedKnowledgeBase;

  try {
    const raw = fs.readFileSync(KB_PATH, 'utf-8');
    const parsed: unknown = JSON.parse(raw);

    if (Array.isArray(parsed)) {
      cachedKnowledgeBase = { articles: parsed as KnowledgeArticle[], producers: [] };
      return cachedKnowledgeBase;
    }

    if (isRecord(parsed)) {
      cachedKnowledgeBase = {
        generatedAt: typeof parsed.generatedAt === 'string' ? parsed.generatedAt : undefined,
        articles: Array.isArray(parsed.articles) ? (parsed.articles as KnowledgeArticle[]) : [],
        producers: Array.isArray(parsed.producers) ? (parsed.producers as KnowledgeProducer[]) : [],
      };
      return cachedKnowledgeBase;
    }
  } catch (error) {
    console.error('[KB ERROR] Impossible de charger ai-knowledge-base.json:', error);
  }

  cachedKnowledgeBase = { articles: [], producers: [] };
  return cachedKnowledgeBase;
}

function getArticleSearchText(article: KnowledgeArticle) {
  return [
    article.slug,
    article.title,
    article.description,
    article.url,
    article.region,
    article.city,
    ...(Array.isArray(article.keywords) ? article.keywords : []),
    ...(Array.isArray(article.sections)
      ? article.sections.map((section) =>
          typeof section === 'string' ? section : JSON.stringify(section),
        )
      : []),
  ]
    .filter(Boolean)
    .join(' ');
}

function getProducerName(producer: KnowledgeProducer) {
  return (
    producer.name || producer.nom || producer.title || producer.id || producer.slug || 'Producteur'
  );
}

function getProducerCity(producer: KnowledgeProducer) {
  return producer.city || producer.ville || '';
}

function getProducerType(producer: KnowledgeProducer) {
  return producer.type || producer.category || '';
}

function getProducerSearchText(producer: KnowledgeProducer) {
  return [
    producer.id,
    producer.slug,
    producer.name,
    producer.nom,
    producer.title,
    producer.type,
    producer.category,
    producer.region,
    producer.city,
    producer.ville,
    producer.description,
    producer.address,
    ...(Array.isArray(producer.relatedArticles) ? producer.relatedArticles : []),
  ]
    .filter(Boolean)
    .join(' ');
}

function scoreTextAgainstQuery(text: string, queryTokens: string[]) {
  const norm = normalizeText(text);
  if (!norm || queryTokens.length === 0) return 0;

  let score = 0;
  for (const token of queryTokens) {
    if (norm.includes(token)) score += 5;

    if (
      [
        'famille',
        'enfant',
        'nature',
        'plage',
        'gourmand',
        'local',
        'producteur',
        'fromage',
        'cidre',
        'biere',
        'vignoble',
        'hotel',
        'camping',
        'vr',
        'route',
        'roadtrip',
      ].some((boost) => token.includes(boost)) &&
      norm.includes(token)
    ) {
      score += 10;
    }
  }

  return score;
}

function extractSlugFromText(input: string): string | undefined {
  const norm = normalizeText(input);
  const sorted = [...BLOG_SLUGS].sort((a, b) => b.length - a.length);

  for (const slug of sorted) {
    const slugNorm = normalizeText(slug);
    const pattern = slugNorm.replace(/-/g, '[-\\s]?');
    const re = new RegExp(`(?:^|[^a-z0-9])${pattern}(?:[^a-z0-9]|$)`);
    if (re.test(norm)) return slug;
  }

  return undefined;
}

function extractDurationDaysFromText(input: string): number | undefined {
  const norm = normalizeText(input);
  const match = norm.match(/\b(\d{1,2})\s?(jour|jours|j)\b/);
  if (!match) return undefined;

  const days = Number(match[1]);
  return Number.isFinite(days) && days > 0 ? days : undefined;
}

function extractOriginFromText(input: string): string | undefined {
  const patterns = [
    /\bdépart de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bdepart de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bon part de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bje pars de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bnous partons de ([a-zA-ZÀ-ÿ' -]+)/i,
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match?.[1]) return match[1].trim().replace(/[?.!,;:]+$/g, '');
  }

  return undefined;
}

function extractProfile(
  messages: ChatMessage[],
  previousProfile?: Partial<TravelerProfile>,
): TravelerProfile {
  const fullText = messages.map((m) => m.text).join(' ');
  const norm = normalizeText(fullText);
  const destination = extractSlugFromText(fullText) ?? previousProfile?.destination;
  const durationDays = extractDurationDaysFromText(fullText) ?? previousProfile?.durationDays;
  const origin = extractOriginFromText(fullText) ?? previousProfile?.origin;

  const interests: string[] = Array.isArray(previousProfile?.interests)
    ? [...previousProfile.interests]
    : [];

  const addInterest = (value: string, condition: boolean) => {
    if (condition && !interests.includes(value)) interests.push(value);
  };

  addInterest('nature', norm.includes('nature') || norm.includes('plein air'));
  addInterest(
    'producteurs locaux',
    norm.includes('producteur') || norm.includes('local') || norm.includes('gourmand'),
  );
  addInterest('plage', norm.includes('plage') || norm.includes('baignade'));
  addInterest('villages', norm.includes('village'));
  addInterest('videos', norm.includes('video') || norm.includes('youtube'));
  addInterest(
    'hotel',
    norm.includes('hotel') || norm.includes('hebergement') || norm.includes('chambre'),
  );
  addInterest('camping', norm.includes('camping') || norm.includes('tente'));
  addInterest('vr', norm.includes('vr') || norm.includes('motorise') || norm.includes('motorisé'));

  let budget = previousProfile?.budget ?? 'unknown';
  if (
    norm.includes('pas cher') ||
    norm.includes('economique') ||
    norm.includes('économique') ||
    norm.includes('petit budget')
  )
    budget = 'petit';
  if (norm.includes('confort') || norm.includes('bon hotel') || norm.includes('bel hotel'))
    budget = 'moyen';
  if (norm.includes('luxe') || norm.includes('haut de gamme')) budget = 'haut';

  let pace = previousProfile?.pace ?? 'unknown';
  if (norm.includes('relax') || norm.includes('tranquille') || norm.includes('repos'))
    pace = 'relax';
  if (norm.includes('beaucoup') || norm.includes('max') || norm.includes('intense'))
    pace = 'intense';
  if (norm.includes('equilibre') || norm.includes('équilibre')) pace = 'equilibre';

  let transport = previousProfile?.transport ?? 'unknown';
  if (norm.includes('voiture') || norm.includes('auto')) transport = 'auto';
  if (norm.includes('vr') || norm.includes('motorise') || norm.includes('motorisé'))
    transport = 'vr';
  if (norm.includes('moto')) transport = 'moto';
  if (norm.includes('avion') || norm.includes('vol')) transport = 'avion';

  let season = previousProfile?.season ?? 'unknown';
  if (
    norm.includes('ete') ||
    norm.includes('été') ||
    norm.includes('juillet') ||
    norm.includes('aout') ||
    norm.includes('août')
  )
    season = 'ete';
  if (norm.includes('automne') || norm.includes('octobre') || norm.includes('septembre'))
    season = 'automne';
  if (
    norm.includes('hiver') ||
    norm.includes('decembre') ||
    norm.includes('décembre') ||
    norm.includes('janvier') ||
    norm.includes('fevrier') ||
    norm.includes('février')
  )
    season = 'hiver';
  if (norm.includes('printemps') || norm.includes('mai') || norm.includes('juin'))
    season = 'printemps';

  return {
    ...previousProfile,
    origin,
    destination,
    durationDays,
    season,
    budget,
    pace,
    transport,
    interests,
    withKids:
      previousProfile?.withKids ??
      (norm.includes('enfant') || norm.includes('famille') || norm.includes('ado')),
    travelersText:
      previousProfile?.travelersText ??
      (norm.includes('famille') ? 'famille' : norm.includes('couple') ? 'couple' : undefined),
    travelStyle: previousProfile?.travelStyle,
    likesLocalFood:
      previousProfile?.likesLocalFood ??
      (norm.includes('producteur') ||
        norm.includes('local') ||
        norm.includes('gourmand') ||
        norm.includes('fromage') ||
        norm.includes('cidre') ||
        norm.includes('biere')),
    avoidsCrowds:
      previousProfile?.avoidsCrowds ??
      (norm.includes('eviter la foule') ||
        norm.includes('éviter la foule') ||
        norm.includes('pas trop touristique') ||
        norm.includes('tranquille')),
    needsLodging:
      previousProfile?.needsLodging ??
      (norm.includes('hotel') ||
        norm.includes('hebergement') ||
        norm.includes('où dormir') ||
        norm.includes('ou dormir')),
  };
}

function searchKnowledgeBase(messages: ChatMessage[], profile: TravelerProfile) {
  const kb = loadKnowledgeBase();
  const fullText = messages.map((m) => m.text).join(' ');
  const queryTokens = tokenize(
    [
      fullText,
      profile.destination,
      profile.origin,
      profile.travelersText,
      profile.interests?.join(' '),
      profile.likesLocalFood
        ? 'producteurs locaux gourmand fromagerie cidrerie microbrasserie vignoble'
        : '',
      profile.avoidsCrowds ? 'tranquille nature village moins touristique' : '',
    ]
      .filter(Boolean)
      .join(' '),
  );

  const articleResults = (kb.articles ?? [])
    .map((article) => {
      let score = scoreTextAgainstQuery(getArticleSearchText(article), queryTokens);
      if (profile.destination && article.slug === profile.destination) score += 100;
      if (profile.withKids && normalizeText(getArticleSearchText(article)).includes('famille'))
        score += 15;
      if (
        profile.avoidsCrowds &&
        normalizeText(getArticleSearchText(article)).includes('tranquille')
      )
        score += 12;
      return { item: article, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_CONTEXT_ARTICLES)
    .map((result) => result.item);

  const producerResults = (kb.producers ?? [])
    .map((producer) => {
      let score = scoreTextAgainstQuery(getProducerSearchText(producer), queryTokens);
      const relatedArticles = Array.isArray(producer.relatedArticles)
        ? producer.relatedArticles
        : [];
      if (profile.destination && relatedArticles.includes(profile.destination)) score += 40;
      if (profile.likesLocalFood) score += 8;
      return { item: producer, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_CONTEXT_PRODUCERS)
    .map((result) => result.item);

  return {
    articles: articleResults,
    producers: producerResults,
    totalArticles: kb.articles?.length ?? 0,
    totalProducers: kb.producers?.length ?? 0,
  };
}

function buildRecommendationSeeds(
  results: ReturnType<typeof searchKnowledgeBase>,
  profile: TravelerProfile,
) {
  const stops = results.articles
    .map((article) => ({
      slug: article.slug || article.url?.replace('/blog/', '') || '',
      title: article.title || article.slug || 'Destination',
      description: article.description || '',
      reason:
        article.slug === profile.destination
          ? 'destination demandée par l’utilisateur'
          : profile.avoidsCrowds
            ? 'peut convenir à un voyage plus tranquille selon le contenu disponible'
            : 'correspond aux mots-clés et au style du voyage',
    }))
    .filter((item) => item.slug && BLOG_SLUGS.includes(item.slug as (typeof BLOG_SLUGS)[number]));

  return stops.slice(0, 6);
}

function buildKnowledgeContext(
  results: ReturnType<typeof searchKnowledgeBase>,
  profile: TravelerProfile,
) {
  const articleLines = results.articles.map((article) => {
    const slug = article.slug || article.url?.replace('/blog/', '') || '';
    const href = slug ? `/blog/${slug}` : article.url || '/blog';
    const keywords = Array.isArray(article.keywords) ? article.keywords.slice(0, 8).join(', ') : '';
    return `- ${article.title || slug || 'Article'} | Slug: ${slug} | URL: ${href} | Description: ${
      article.description || ''
    } | Mots-clés: ${keywords}`;
  });

  const producerLines = results.producers.map((producer) => {
    const name = getProducerName(producer);
    const city = getProducerCity(producer);
    const type = getProducerType(producer);
    const region = producer.region || '';
    return `- ${name} | Type: ${type || 'non précisé'} | Ville: ${city || 'non précisée'} | Région: ${
      region || 'non précisée'
    } | Description: ${producer.description || ''}`;
  });

  const seeds = buildRecommendationSeeds(results, profile);
  const seedLines = seeds.map(
    (seed) => `- ${seed.title} | Slug: ${seed.slug} | Pourquoi: ${seed.reason}`,
  );

  return `
PROFIL VOYAGEUR TEMPORAIRE
${JSON.stringify(profile, null, 2)}

BASE DE CONNAISSANCE GOQUÉBECAN
- Articles disponibles dans la base: ${results.totalArticles}
- Producteurs disponibles dans la base: ${results.totalProducers}

ARTICLES PERTINENTS TROUVÉS
${articleLines.length ? articleLines.join('\n') : '- Aucun article précis trouvé pour cette demande.'}

PRODUCTEURS PERTINENTS TROUVÉS
${producerLines.length ? producerLines.join('\n') : '- Aucun producteur précis trouvé pour cette demande.'}

DESTINATIONS CANDIDATES POUR RECOMMANDATION
${seedLines.length ? seedLines.join('\n') : '- Aucune destination candidate précise.'}

RÈGLES BASE IA
- Utilise seulement les articles et producteurs listés ci-dessus quand tu nommes précisément quelque chose.
- Si aucun producteur précis n’est trouvé, ne donne pas de nom inventé.
- Tu peux proposer /producteurs pour explorer tous les producteurs.
- Tu peux proposer /planificateur pour créer un itinéraire.
`.trim();
}

function extractJsonFromText(input: string): string | null {
  const trimmed = input.trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) return trimmed;
  const match = trimmed.match(/\{[\s\S]*\}/);
  return match ? match[0] : null;
}

function validateInternalHref(href: string, allowedRoutes: readonly string[]): boolean {
  if (!href.startsWith('/')) return false;
  if (allowedRoutes.includes(href as (typeof allowedRoutes)[number])) return true;

  if (href.startsWith('/blog/')) {
    const slug = href.replace('/blog/', '').trim();
    return BLOG_SLUGS.includes(slug as (typeof BLOG_SLUGS)[number]);
  }

  return false;
}

function isAssistantPayload(v: unknown): v is AssistantPayload {
  if (!isRecord(v)) return false;
  if (typeof v.message !== 'string') return false;
  if (typeof v.intent !== 'string') return false;

  if (v.travelerProfile !== undefined && !isRecord(v.travelerProfile)) return false;
  if (v.links !== undefined && !Array.isArray(v.links)) return false;
  if (
    !(v.nextQuestion === undefined || v.nextQuestion === null || typeof v.nextQuestion === 'string')
  ) {
    return false;
  }

  if (Array.isArray(v.links)) {
    return v.links.every(
      (link) =>
        isRecord(link) &&
        typeof link.label === 'string' &&
        typeof link.href === 'string' &&
        link.href.startsWith('/'),
    );
  }

  return true;
}

function buildMarkdownFromPayload(payload: AssistantPayload): string {
  const lines: string[] = [payload.message.trim()];

  if (payload.recommendationSummary) {
    lines.push('', payload.recommendationSummary.trim());
  }

  if (payload.suggestedItinerary && payload.suggestedItinerary.length > 0) {
    lines.push('', '**Idée de parcours :**');
    for (const day of payload.suggestedItinerary.slice(0, 5)) {
      lines.push(`- **Jour ${day.day} — ${day.title}** : ${day.description}`);
    }
  }

  if (payload.producers && payload.producers.length > 0) {
    lines.push('', '**Haltes locales possibles :**');
    for (const producer of payload.producers.slice(0, 4)) {
      const meta = [producer.type, producer.city || producer.region].filter(Boolean).join(' · ');
      lines.push(
        `- **${producer.name}**${meta ? ` — ${meta}` : ''}${producer.reason ? ` : ${producer.reason}` : ''}`,
      );
    }
  }
if (
  payload.travelerProfile.likesLocalFood &&
  (!payload.producers || payload.producers.length === 0)
) {
  lines.push(
    '',
    '**Producteurs locaux :** je n’ai pas encore assez de producteurs précis liés à cette destination dans la base actuelle, mais je peux vous orienter vers les meilleures haltes gourmandes et producteurs locaux disponibles sur le site.',
  );
}

if (payload.links.length > 0) {
  lines.push('', '**Vous choisissez :**');
  for (const link of payload.links.slice(0, 4)) {
    lines.push(`- [${link.label}](${link.href})`);
  }
}
  if (payload.links.length > 0) {
    lines.push('', '**Vous choisissez :**');
    for (const link of payload.links.slice(0, 4)) {
      lines.push(`- [${link.label}](${link.href})`);
    }
  }

  if (payload.nextQuestion) {
    lines.push('', payload.nextQuestion.trim());
  }

  return lines.join('\n');
}

function fallbackPayload(profile: TravelerProfile): AssistantPayload {
  const detectedSlug = profile.destination;
  const links: AssistantLink[] = detectedSlug
    ? [
        { label: '📘 Lire l’article', href: `/blog/${detectedSlug}` },
        { label: '🗺️ Ouvrir le planificateur', href: INTERNAL_ROUTES.planner },
        { label: '🧺 Producteurs locaux', href: INTERNAL_ROUTES.producteurs },
        { label: '🎥 Voir les vidéos', href: INTERNAL_ROUTES.videos },
      ]
    : [
        { label: '📍 Explorer les destinations', href: INTERNAL_ROUTES.destinations },
        { label: '🗺️ Ouvrir le planificateur', href: INTERNAL_ROUTES.planner },
        { label: '🧺 Producteurs locaux', href: INTERNAL_ROUTES.producteurs },
        { label: '🎥 Vidéos', href: INTERNAL_ROUTES.videos },
      ];

  return {
    message: detectedSlug
      ? `Je peux vous aider à préparer ${detectedSlug} selon votre départ, votre durée et votre style de voyage.`
      : 'Je peux vous guider comme un vrai conseiller de voyage : destination, durée, rythme, producteurs locaux et parcours.',
    intent: detectedSlug ? 'destination' : 'general',
    travelerProfile: profile,
    links,
    nextQuestion: detectedSlug
      ? 'Vous partez d’où et vous avez combien de jours ?'
      : 'Vous partez d’où, et vous cherchez plutôt nature, famille, gourmand/local ou route panoramique ?',
    action: {
      type: 'ask_followup',
      missing: detectedSlug
        ? ['origin', 'durationDays']
        : ['origin', 'durationDays', 'travelStyle'],
    },
    detectedDestination: detectedSlug,
    detectedDurationDays: profile.durationDays,
    detectedOrigin: profile.origin,
  };
}

export async function POST(req: Request) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY manquant dans les variables d’environnement.' },
        { status: 500 },
      );
    }

    const bodyU: unknown = await req.json();
    if (!isRecord(bodyU) || !Array.isArray(bodyU.messages)) {
      return NextResponse.json({ error: 'Body invalide (messages requis).' }, { status: 400 });
    }

    const body = bodyU as ChatRequestBody;
    const limited = body.messages.slice(-MAX_MESSAGES);
    const profile = extractProfile(limited, body.profile);
    const kbResults = searchKnowledgeBase(limited, profile);
    const kbContext = buildKnowledgeContext(kbResults, profile);

    const slugsList = BLOG_SLUGS.join(', ');
    const routesList = SAFE_INTERNAL_ROUTES.join(', ');

    const systemMessage = {
      role: 'system' as const,
      content: `
${kbContext}

Tu es l’assistant officiel de GoQuébeCAN. Tu n’es pas un menu de liens. Tu es un conseiller de voyage intelligent pour le Québec et le Canada.

MISSION MASTER
- Comprendre la situation du voyageur.
- Construire une recommandation utile, concrète et personnalisée.
- Poser la prochaine bonne question, pas une liste de questions.
- Conseiller avec prudence quand le trajet semble trop ambitieux.
- Transformer les contenus du site en conseils pratiques.
- Utiliser les producteurs locaux comme valeur distinctive quand c’est pertinent.
- Si l’utilisateur mentionne les producteurs locaux, le local, les fermes, fromageries, cidreries, microbrasseries ou le gourmand, tu dois obligatoirement inclure une section producers si des producteurs pertinents sont fournis dans la base.
- Si aucun producteur précis n’est fourni dans la base, tu dois le dire clairement et proposer /producteurs, sans inventer de noms.

COMPORTEMENT ATTENDU
- Si l’utilisateur donne une durée et un départ, propose une vraie idée de parcours.
- Si l’utilisateur est flou, propose 2 ou 3 directions possibles et pose une seule question.
- Si l’utilisateur veut éviter la foule, privilégie les options tranquilles présentes dans la base.
- Si l’utilisateur voyage avec enfants, évite les parcours trop lourds.
- Si l’utilisateur veut réserver un hôtel, commence par l’aider à choisir le bon secteur.
- Si la demande est irréaliste, dis-le gentiment et propose une alternative.
- Ne jamais inventer un hôtel, une destination ou un producteur absent de la base fournie.
- Si une destination est détectée, propose aussi les vidéos quand c’est pertinent avec le lien /videos.
- Si l’utilisateur prépare un itinéraire, une route ou un séjour de plusieurs jours, mets en valeur les producteurs locaux comme haltes intéressantes le long du trajet.
- Les producteurs locaux doivent être présentés comme une façon de rendre le voyage plus authentique : fromageries, fermes, cidreries, microbrasseries, marchés locaux, selon ce qui existe dans la base.

STYLE
- Français naturel, chaleureux et très concret.
- Ton humain, rassurant, professionnel.
- Réponse courte, mais réellement utile.
- Pas plus de 3 phrases avant les blocs structurés.
- Évite les formules répétitives comme “Parfait, vous choisissez” à chaque réponse.

ROUTES AUTORISÉES
${routesList}

ROUTE BLOG AUTORISÉE
Tu peux utiliser /blog/<slug> uniquement si le slug est dans cette liste:
${slugsList}

FORMAT JSON STRICT
Réponds uniquement en JSON valide, sans texte autour, avec cette structure exacte:
{
  "message": "string",
  "intent": "idea | destination | hotel | article | videos | planner | producers | beginner | compare | roadtrip | general",
  "travelerProfile": {
    "origin": "string ou undefined",
    "destination": "slug ou undefined",
    "durationDays": number ou undefined,
    "dateText": "string ou undefined",
    "season": "printemps | ete | automne | hiver | unknown",
    "travelersText": "string ou undefined",
    "withKids": boolean ou undefined,
    "travelStyle": "string ou undefined",
    "budget": "petit | moyen | haut | unknown",
    "pace": "relax | equilibre | intense | unknown",
    "transport": "auto | vr | moto | avion | unknown",
    "interests": ["string"],
    "likesLocalFood": boolean ou undefined,
    "avoidsCrowds": boolean ou undefined,
    "needsLodging": boolean ou undefined
  },
  "recommendationSummary": "string ou undefined",
  "suggestedItinerary": [
    { "day": number, "title": "string", "description": "string", "relatedSlug": "slug ou undefined" }
  ],
  "producers": [
    { "name": "string", "type": "string", "city": "string", "region": "string", "reason": "string" }
  ],
  "links": [
    { "label": "string", "href": "/route-valide" }
  ],
  "nextQuestion": "string ou null",
  "action": {
    "type": "none | ask_followup | open_route | build_itinerary",
    "missing": ["origin", "durationDays", "travelStyle"] ou undefined,
    "href": "/route" ou undefined,
    "origin": "string ou undefined",
    "durationDays": number ou undefined,
    "suggestedStops": [{ "slug": "string", "label": "string", "reason": "string" }] ou undefined
  },
  "detectedDestination": "slug ou undefined",
  "detectedDurationDays": number ou undefined,
  "detectedOrigin": "string ou undefined"
}

CONTRAINTES TECHNIQUES
- 2 à 4 liens maximum.
- Tous les liens doivent être internes et valides.
- Les slugs doivent venir uniquement de la liste autorisée.
- Les producteurs nommés doivent venir uniquement de la section PRODUCTEURS PERTINENTS TROUVÉS.
- Si tu proposes un parcours, il doit rester réaliste pour la durée indiquée.
- Ne propose jamais un relatedSlug si ce slug n’est pas dans la liste BLOG_SLUGS autorisée.
- Si une étape n’a pas d’article précis, laisse relatedSlug vide ou undefined.
- Pour les plages de l’Ontario, privilégie uniquement les articles réellement présents dans la base. Ne crée pas d’étapes génériques comme Toronto si aucun article pertinent n’est fourni.
- Les étapes d'itinéraire doivent être construites à partir des articles disponibles dans la base de connaissances.
- Une étape sans article est autorisée, mais ne doit pas générer de lien.
- Quand une destination possède des vidéos ou que l’utilisateur cherche de l’inspiration visuelle, ajoute un lien vers /videos.
- Quand tu mentionnes les producteurs locaux, ajoute soit /producteurs, soit /planificateur, idéalement les deux si l’utilisateur construit un itinéraire.
- Ne promets pas une vidéo précise si elle n’est pas présente dans la base de connaissances. Propose plutôt la page /videos.
`.trim(),
    };

    const openAiMessages = [
      systemMessage,
      ...limited.map((m) => ({
        role: m.isUser ? ('user' as const) : ('assistant' as const),
        content: m.text,
      })),
    ];

    const payload = {
      model: MODEL,
      temperature: TEMPERATURE,
      max_tokens: 1200,
      messages: openAiMessages,
      response_format: { type: 'json_object' },
    } as const;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000);

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        ...(PROJECT ? { 'OpenAI-Project': PROJECT } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    const dataU: unknown = await res.json();

    if (!res.ok) {
      console.error(
        '[OpenAI ERROR]',
        isRecord(dataU) ? dataU : { message: 'Réponse OpenAI non conforme.' },
      );
      const fallback = fallbackPayload(profile);
      return NextResponse.json({ ...fallback, markdown: buildMarkdownFromPayload(fallback) });
    }

    const content =
      isRecord(dataU) &&
      Array.isArray(dataU.choices) &&
      isRecord(dataU.choices[0]) &&
      isRecord(dataU.choices[0].message) &&
      typeof dataU.choices[0].message.content === 'string'
        ? dataU.choices[0].message.content
        : null;

    if (!content) {
      const fallback = fallbackPayload(profile);
      return NextResponse.json({ ...fallback, markdown: buildMarkdownFromPayload(fallback) });
    }

    const jsonText = extractJsonFromText(content);
    if (!jsonText) {
      console.error('[OpenAI ERROR] JSON introuvable:', content);
      const fallback = fallbackPayload(profile);
      return NextResponse.json({ ...fallback, markdown: buildMarkdownFromPayload(fallback) });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText);
    } catch (error) {
      console.error('[OpenAI ERROR] JSON invalide:', error, jsonText);
      const fallback = fallbackPayload(profile);
      return NextResponse.json({ ...fallback, markdown: buildMarkdownFromPayload(fallback) });
    }

    if (!isAssistantPayload(parsed)) {
      console.error('[OpenAI ERROR] Payload inattendu:', parsed);
      const fallback = fallbackPayload(profile);
      return NextResponse.json({ ...fallback, markdown: buildMarkdownFromPayload(fallback) });
    }

    const rawLinks = Array.isArray(parsed.links) ? parsed.links : [];

    const safeLinks = rawLinks
      .filter((link) => validateInternalHref(link.href, SAFE_INTERNAL_ROUTES))
      .slice(0, 4);

    const safeDestination =
      typeof parsed.detectedDestination === 'string' &&
      BLOG_SLUGS.includes(parsed.detectedDestination as (typeof BLOG_SLUGS)[number])
        ? parsed.detectedDestination
        : profile.destination;

    const safeProfile: TravelerProfile = {
      ...profile,
      ...parsed.travelerProfile,
      destination:
        typeof parsed.travelerProfile.destination === 'string' &&
        BLOG_SLUGS.includes(parsed.travelerProfile.destination as (typeof BLOG_SLUGS)[number])
          ? parsed.travelerProfile.destination
          : safeDestination,
    };
    const safePayload: AssistantPayload = {
      ...parsed,
      travelerProfile: safeProfile,
      links:
        safeLinks.length > 0
          ? safeLinks
          : safeDestination
            ? [
                { label: '📘 Lire l’article', href: `/blog/${safeDestination}` },
                { label: '🗺️ Ouvrir le planificateur', href: INTERNAL_ROUTES.planner },
                { label: '🧺 Producteurs locaux', href: INTERNAL_ROUTES.producteurs },
              ]
            : [
                { label: '📍 Explorer les destinations', href: INTERNAL_ROUTES.destinations },
                { label: '🗺️ Ouvrir le planificateur', href: INTERNAL_ROUTES.planner },
                { label: '🧺 Producteurs locaux', href: INTERNAL_ROUTES.producteurs },
              ],
      action: isRecord(parsed.action) ? (parsed.action as AssistantAction) : { type: 'none' },
      detectedDestination: safeDestination,
      detectedDurationDays:
        typeof parsed.detectedDurationDays === 'number'
          ? parsed.detectedDurationDays
          : profile.durationDays,
      detectedOrigin:
        typeof parsed.detectedOrigin === 'string' ? parsed.detectedOrigin : profile.origin,
    };

    if (!safePayload.nextQuestion) {
      if (safeProfile.likesLocalFood) {
        safePayload.nextQuestion =
          'Voulez-vous que je vous propose un parcours plus gourmand avec des producteurs locaux à intégrer entre chaque étape ?';
      } else if (safeProfile.durationDays && safeProfile.origin) {
        safePayload.nextQuestion = 'Voulez-vous un rythme plutôt relax, équilibré ou bien rempli ?';
      } else {
        safePayload.nextQuestion =
          'Vous partez d’où et vous aimez plutôt nature, villages, producteurs locaux ou activités familiales ?';
      }
    }

    return NextResponse.json({
      ...safePayload,
      markdown: buildMarkdownFromPayload(safePayload),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur inconnue';

    if (msg.includes('The operation was aborted')) {
      return NextResponse.json(
        { error: 'Timeout OpenAI — réessaie dans un instant.' },
        { status: 504 },
      );
    }

    console.error('[SERVER ERROR]', msg);
    return NextResponse.json({ error: 'Erreur serveur ou OpenAI' }, { status: 500 });
  }
}
