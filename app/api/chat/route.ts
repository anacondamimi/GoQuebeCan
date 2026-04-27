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
  | 'general';

type AssistantLink = {
  label: string;
  href: string;
};

type AssistantPayload = {
  message: string;
  intent: AssistantIntent;
  links: AssistantLink[];
  nextQuestion: string | null;
  detectedDestination?: string;
  detectedDurationDays?: number;
  detectedOrigin?: string;
};

type KnowledgeArticle = {
  slug?: string;
  title?: string;
  description?: string;
  url?: string;
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
  : 0.45;

const MAX_MESSAGES = 20;
const MAX_CONTEXT_ARTICLES = 5;
const MAX_CONTEXT_PRODUCERS = 20;

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
      cachedKnowledgeBase = {
        articles: parsed as KnowledgeArticle[],
        producers: [],
      };
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

    cachedKnowledgeBase = { articles: [], producers: [] };
    return cachedKnowledgeBase;
  } catch (error) {
    console.error('[KB ERROR] Impossible de charger ai-knowledge-base.json:', error);
    cachedKnowledgeBase = { articles: [], producers: [] };
    return cachedKnowledgeBase;
  }
}

function scoreTextAgainstQuery(text: string, queryTokens: string[]) {
  const norm = normalizeText(text);
  if (!norm || queryTokens.length === 0) return 0;

  let score = 0;

  for (const token of queryTokens) {
    if (norm.includes(token)) {
      score += 5; // base
    }

    // 🔥 boost métier (clé)
    if (
      token.includes('fromage') ||
      token.includes('fromagerie') ||
      token.includes('cidre') ||
      token.includes('cidrerie') ||
      token.includes('biere') ||
      token.includes('brasserie') ||
      token.includes('vin') ||
      token.includes('vignoble')
    ) {
      if (norm.includes(token)) {
        score += 10;
      }
    }

    // 🔥 boost localisation approx (clé)
    if (
      token.includes('tadoussac') ||
      token.includes('gaspesie') ||
      token.includes('charlevoix') ||
      token.includes('cote nord')
    ) {
      if (norm.includes(token)) {
        score += 6;
      }
    }
  }

  return score;
}

function getArticleSearchText(article: KnowledgeArticle) {
  return [
    article.slug,
    article.title,
    article.description,
    article.url,
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
  ]
    .filter(Boolean)
    .join(' ');
}

function searchKnowledgeBase(messages: ChatMessage[], detectedSlug?: string) {
  const kb = loadKnowledgeBase();
  const fullText = messages.map((m) => m.text).join(' ');
  const queryTokens = tokenize(fullText);

  const articleResults = (kb.articles ?? [])
    .map((article) => ({
      item: article,
      score: scoreTextAgainstQuery(getArticleSearchText(article), queryTokens),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, MAX_CONTEXT_ARTICLES)
    .map((result) => result.item);

  const producerResults = (kb.producers ?? [])
    .map((producer) => {
      let score = scoreTextAgainstQuery(getProducerSearchText(producer), queryTokens);

      const relatedArticles = Array.isArray((producer as any).relatedArticles)
        ? ((producer as any).relatedArticles as string[])
        : [];

      if (detectedSlug && relatedArticles.includes(detectedSlug)) {
        score += 25;
      }

      const type = normalizeText(getProducerType(producer));

      if (
        queryTokens.some((token) => ['fromagerie', 'fromage', 'fromageries'].includes(token)) &&
        (type.includes('fromage') || type.includes('fromagerie'))
      ) {
        score += 25;
      }

      if (
        queryTokens.some((token) =>
          ['microbrasserie', 'brasserie', 'biere', 'bière'].includes(token),
        ) &&
        (type.includes('brasserie') || type.includes('biere'))
      ) {
        score += 25;
      }

      if (
        queryTokens.some((token) => ['cidrerie', 'cidre'].includes(token)) &&
        type.includes('cidre')
      ) {
        score += 25;
      }

      if (
        queryTokens.some((token) => ['vignoble', 'vin', 'vins'].includes(token)) &&
        (type.includes('vignoble') || type.includes('vin'))
      ) {
        score += 25;
      }

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

function buildKnowledgeContext(results: ReturnType<typeof searchKnowledgeBase>) {
  const articleLines = results.articles.map((article) => {
    const slug = article.slug || article.url?.replace('/blog/', '') || '';
    const href = slug ? `/blog/${slug}` : article.url || '/blog';
    const keywords = Array.isArray(article.keywords) ? article.keywords.slice(0, 6).join(', ') : '';
    return `- ${article.title || slug || 'Article'} | URL: ${href} | Description: ${
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

  return `
BASE DE CONNAISSANCE GOQUÉBECAN
- Articles disponibles dans la base: ${results.totalArticles}
- Producteurs disponibles dans la base: ${results.totalProducers}

ARTICLES PERTINENTS TROUVÉS:
${articleLines.length ? articleLines.join('\n') : '- Aucun article précis trouvé pour cette demande.'}

PRODUCTEURS PERTINENTS TROUVÉS:
${producerLines.length ? producerLines.join('\n') : '- Aucun producteur précis trouvé pour cette demande.'}

RÈGLES BASE IA:
- Utilise seulement les articles et producteurs listés ci-dessus quand tu nommes précisément quelque chose.
- Si aucun producteur précis n’est trouvé, ne donne pas de nom inventé.
- Tu peux proposer la page /producteurs pour explorer tous les producteurs.
- Tu peux proposer /planificateur pour créer un itinéraire.
`.trim();
}

function extractJsonFromText(input: string): string | null {
  const trimmed = input.trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) return trimmed;

  const match = trimmed.match(/\{[\s\S]*\}/);
  return match ? match[0] : null;
}

function isAssistantPayload(v: unknown): v is AssistantPayload {
  if (!isRecord(v)) return false;
  if (typeof v.message !== 'string') return false;
  if (typeof v.intent !== 'string') return false;
  if (!Array.isArray(v.links)) return false;
  if (!(v.nextQuestion === null || typeof v.nextQuestion === 'string')) return false;

  return v.links.every(
    (link) =>
      isRecord(link) &&
      typeof link.label === 'string' &&
      typeof link.href === 'string' &&
      link.href.startsWith('/'),
  );
}

function extractDurationDays(messages: ChatMessage[]): number | undefined {
  const fullText = messages.map((m) => m.text).join(' ');
  const norm = normalizeText(fullText);

  const match = norm.match(/\b(\d{1,2})\s?(jour|jours|j)\b/);
  if (!match) return undefined;

  const days = Number(match[1]);
  return Number.isFinite(days) ? days : undefined;
}

function extractOrigin(messages: ChatMessage[]): string | undefined {
  const fullText = messages.map((m) => m.text).join(' ');

  const patterns = [
    /\bdepart de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bdépart de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bon part de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bje pars de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bnous partons de ([a-zA-ZÀ-ÿ' -]+)/i,
  ];

  for (const pattern of patterns) {
    const match = fullText.match(pattern);
    if (match?.[1]) return match[1].trim();
  }

  return undefined;
}

function extractSlugFromMessages(messages: ChatMessage[]): string | undefined {
  const fullText = messages.map((m) => m.text).join(' ');
  const norm = normalizeText(fullText);

  const sorted = [...BLOG_SLUGS].sort((a, b) => b.length - a.length);

  for (const slug of sorted) {
    const slugNorm = normalizeText(slug);
    const pattern = slugNorm.replace(/-/g, '[-\\s]?');
    const re = new RegExp(`(?:^|[^a-z0-9])${pattern}(?:[^a-z0-9]|$)`);
    if (re.test(norm)) return slug;
  }

  return undefined;
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

function buildMarkdownFromPayload(payload: AssistantPayload): string {
  const lines: string[] = [payload.message.trim()];

  if (payload.links.length > 0) {
    lines.push('', '**Vous choisissez :**');
    for (const link of payload.links) {
      lines.push(`- [${link.label}](${link.href})`);
    }
  }

  if (payload.nextQuestion) {
    lines.push('', payload.nextQuestion.trim());
  }

  return lines.join('\n');
}

function fallbackPayload(
  detectedSlug?: string,
  detectedDurationDays?: number,
  detectedOrigin?: string,
): AssistantPayload {
  const links: AssistantLink[] = detectedSlug
    ? [
        { label: '📘 Lire l’article', href: `/blog/${detectedSlug}` },
        { label: '🎥 Voir les vidéos', href: INTERNAL_ROUTES.videos },
        { label: '🗺️ Ouvrir le planificateur', href: INTERNAL_ROUTES.planner },
        { label: '🧺 Producteurs locaux', href: INTERNAL_ROUTES.producteurs },
      ]
    : [
        { label: '📍 Explorer les destinations', href: INTERNAL_ROUTES.destinations },
        { label: '🗺️ Ouvrir le planificateur', href: INTERNAL_ROUTES.planner },
        { label: '🧺 Producteurs locaux', href: INTERNAL_ROUTES.producteurs },
        { label: '🎥 Vidéos', href: INTERNAL_ROUTES.videos },
      ];

  return {
    message: detectedSlug
      ? `Parfait, je peux vous aider à préparer ${detectedSlug} avec les contenus du site, les vidéos, le planificateur et les producteurs locaux.`
      : 'Je peux vous guider simplement selon votre style de voyage, votre destination ou le nombre de jours disponibles.',
    intent: detectedSlug ? 'destination' : 'general',
    links,
    nextQuestion: detectedSlug
      ? 'Vous partez d’où et pour combien de jours ?'
      : 'Vous cherchez plutôt nature, famille, gourmand/local ou road trip ?',
    detectedDestination: detectedSlug,
    detectedDurationDays,
    detectedOrigin,
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

    const detectedSlug = extractSlugFromMessages(limited);
    const detectedDurationDays = extractDurationDays(limited);
    const detectedOrigin = extractOrigin(limited);

    const kbResults = searchKnowledgeBase(limited, detectedSlug);
    const kbContext = buildKnowledgeContext(kbResults);

    const slugsList = BLOG_SLUGS.join(', ');
    const routesList = SAFE_INTERNAL_ROUTES.join(', ');

    const systemMessage = {
      role: 'system' as const,
      content: `
${kbContext}

Tu es l’assistant officiel du site GoQuébeCAN. Tu aides des voyageurs, y compris des utilisateurs débutants qui ne savent pas toujours par où commencer.

MISSION
- Guider avec simplicité, chaleur et clarté.
- Faire avancer l’utilisateur vers la prochaine bonne étape.
- Utiliser uniquement les contenus internes du site.
- Ne jamais inventer de destination, d’hôtel ou de producteur.
- Quand une destination n’est pas certaine, aider à choisir parmi les destinations présentes dans les articles du site.
- Quand des producteurs pertinents sont listés dans la base IA, tu peux les nommer.
- Quand aucun producteur précis n’est listé, propose plutôt la page /producteurs.

STYLE
- Français naturel, rassurant, concret.
- Réponse brève mais utile.
- Pas de jargon.
- Pas de long paragraphe.
- Pas plus de 2 phrases avant les options.

PRIORITÉS DE GUIDAGE
1. Si l’utilisateur est perdu ou débutant -> rassurer + proposer une première étape simple.
2. Si une destination est détectée -> proposer article + vidéos + planificateur + producteurs.
3. Les producteurs locaux sont importants : propose-les naturellement quand c’est pertinent.
4. Si l’utilisateur parle d’hôtel ou de réservation -> guider vers l’article de destination, les vidéos, le planificateur et les producteurs.
5. Si l’utilisateur parle d’itinéraire -> pousser vers /planificateur puis proposer /producteurs.
6. Si l’utilisateur cherche de l’inspiration -> pousser vers destinations, producteurs, expériences, vidéos, offres.

ROUTES AUTORISÉES
Tu dois utiliser uniquement ces routes:
${routesList}

ROUTE BLOG AUTORISÉE
Tu peux utiliser /blog/<slug> uniquement si le slug est dans cette liste:
${slugsList}

FORMAT DE SORTIE OBLIGATOIRE
Réponds uniquement en JSON valide, sans texte autour, avec cette structure exacte:
{
  "message": "string",
  "intent": "idea | destination | hotel | article | videos | planner | producers | beginner | general",
  "links": [
    { "label": "string", "href": "/route-valide" }
  ],
  "nextQuestion": "string ou null",
  "detectedDestination": "slug ou undefined",
  "detectedDurationDays": number ou undefined,
  "detectedOrigin": "string ou undefined"
}

CONTRAINTES
- 2 à 4 liens maximum.
- Toujours des liens internes.
- Toujours une prochaine question utile quand ça aide.
- Si une destination est connue, privilégie /blog/<slug>, /videos, /planificateur, /producteurs.
- Si l’utilisateur semble novice, pose une seule question à la fois.
- Si l’utilisateur demande un hôtel sans destination claire, n’invente rien et aide à préciser.
- detectedDestination doit être un slug valide si détecté.
- detectedDurationDays = ${detectedDurationDays ?? 'undefined'}
- detectedOrigin = ${detectedOrigin ? JSON.stringify(detectedOrigin) : 'undefined'}
- destination déjà repérée dans l’échange = ${detectedSlug ? JSON.stringify(detectedSlug) : 'undefined'}
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
      max_tokens: 850,
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
      const detail = isRecord(dataU) ? dataU : { message: 'Réponse OpenAI non conforme.' };
      console.error('[OpenAI ERROR]', detail);

      const fallback = fallbackPayload(detectedSlug, detectedDurationDays, detectedOrigin);
      return NextResponse.json({
        ...fallback,
        markdown: buildMarkdownFromPayload(fallback),
      });
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
      const fallback = fallbackPayload(detectedSlug, detectedDurationDays, detectedOrigin);
      return NextResponse.json({
        ...fallback,
        markdown: buildMarkdownFromPayload(fallback),
      });
    }

    const jsonText = extractJsonFromText(content);

    if (!jsonText) {
      console.error('[OpenAI ERROR] JSON introuvable:', content);
      const fallback = fallbackPayload(detectedSlug, detectedDurationDays, detectedOrigin);
      return NextResponse.json({
        ...fallback,
        markdown: buildMarkdownFromPayload(fallback),
      });
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(jsonText);
    } catch (error) {
      console.error('[OpenAI ERROR] JSON invalide:', error, jsonText);
      const fallback = fallbackPayload(detectedSlug, detectedDurationDays, detectedOrigin);
      return NextResponse.json({
        ...fallback,
        markdown: buildMarkdownFromPayload(fallback),
      });
    }

    if (!isAssistantPayload(parsed)) {
      console.error('[OpenAI ERROR] Payload inattendu:', parsed);
      const fallback = fallbackPayload(detectedSlug, detectedDurationDays, detectedOrigin);
      return NextResponse.json({
        ...fallback,
        markdown: buildMarkdownFromPayload(fallback),
      });
    }

    const safeLinks = parsed.links.filter((link) =>
      validateInternalHref(link.href, SAFE_INTERNAL_ROUTES),
    );

    const safePayload: AssistantPayload = {
      ...parsed,
      links: safeLinks.slice(0, 4),
      detectedDestination:
        typeof parsed.detectedDestination === 'string' &&
        BLOG_SLUGS.includes(parsed.detectedDestination as (typeof BLOG_SLUGS)[number])
          ? parsed.detectedDestination
          : detectedSlug,
      detectedDurationDays:
        typeof parsed.detectedDurationDays === 'number'
          ? parsed.detectedDurationDays
          : detectedDurationDays,
      detectedOrigin:
        typeof parsed.detectedOrigin === 'string' ? parsed.detectedOrigin : detectedOrigin,
    };

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
