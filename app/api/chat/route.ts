import { NextResponse } from 'next/server';
import { BLOG_SLUGS } from '@/data/blog-slugs';

// ---------- Types côté client ----------
type ChatMessage = {
  text: string;
  isUser: boolean;
  timestamp: string;
};

type ChatRequestBody = {
  messages: ChatMessage[];
};

// ---------- Types réponse assistant ----------
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

// ---------- Paramétrage ----------
const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
const PROJECT = process.env.OPENAI_PROJECT_ID ?? '';
const API_KEY = process.env.OPENAI_API_KEY ?? '';
const TEMPERATURE = Number.isFinite(Number(process.env.OPENAI_TEMPERATURE))
  ? Number(process.env.OPENAI_TEMPERATURE)
  : 0.5;

const MAX_MESSAGES = 20;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function normalizeText(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
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

    const slugsList = BLOG_SLUGS.join(', ');
    const routesList = SAFE_INTERNAL_ROUTES.join(', ');

    const systemMessage = {
      role: 'system' as const,
      content: `
Tu es l’assistant officiel du site GoQuébeCAN. Tu aides des voyageurs, y compris des utilisateurs débutants qui ne savent pas toujours par où commencer.

MISSION
- Guider avec simplicité, chaleur et clarté.
- Faire avancer l’utilisateur vers la prochaine bonne étape.
- Utiliser uniquement les contenus internes du site.
- Ne jamais inventer de destination, d’hôtel ou de producteur.
- Quand une destination n’est pas certaine, aider à choisir parmi les destinations présentes dans les articles du site.

STYLE
- Français naturel, rassurant, concret.
- Réponse brève mais utile.
- Pas de jargon.
- Pas de long paragraphe.
- Pas plus de 2 phrases avant les options.

PRIORITÉS DE GUIDAGE
1. Si l’utilisateur est perdu ou débutant -> rassurer + proposer une première étape simple.
2. Si une destination est détectée -> proposer article + vidéos + planificateur + producteurs.
3. Les producteurs locaux sont une composante importante de l’expérience GoQuébeCAN : quand c’est pertinent, les proposer naturellement comme découverte gourmande, humaine et locale.
4. Si l’utilisateur parle d’hôtel ou de réservation -> guider vers l’article de destination, les vidéos, le planificateur et, si pertinent, les producteurs proches pour enrichir le séjour.
5. Si l’utilisateur parle d’itinéraire -> pousser vers /planificateur puis proposer /producteurs comme complément utile.
6. Si l’utilisateur cherche de l’inspiration -> pousser vers destinations, producteurs, expériences, vidéos, offres.

PHILOSOPHIE DU SITE
- Valoriser les découvertes locales, les arrêts gourmands, les producteurs et le territoire.
- Quand cela apporte de la valeur, suggérer naturellement de visiter des producteurs proches d’une destination ou d’un itinéraire.

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
      max_tokens: 700,
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
      return NextResponse.json({ error: 'Erreur OpenAI', detail }, { status: 502 });
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
      return NextResponse.json({ error: 'Réponse OpenAI vide.' }, { status: 502 });
    }

    const jsonText = extractJsonFromText(content);
    if (!jsonText) {
      console.error('[OpenAI ERROR] JSON introuvable:', content);
      return NextResponse.json({ error: 'Réponse JSON introuvable.' }, { status: 502 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonText);
    } catch (error) {
      console.error('[OpenAI ERROR] JSON invalide:', error, jsonText);
      return NextResponse.json({ error: 'JSON invalide retourné par OpenAI.' }, { status: 502 });
    }

    if (!isAssistantPayload(parsed)) {
      console.error('[OpenAI ERROR] Payload inattendu:', parsed);
      return NextResponse.json({ error: 'Réponse assistant invalide.' }, { status: 502 });
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
