// 📂 app/api/chat/route.ts
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

// ---------- Paramétrage ----------
const MODEL = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
const PROJECT = process.env.OPENAI_PROJECT_ID ?? '';
const API_KEY = process.env.OPENAI_API_KEY ?? '';
const TEMPERATURE = Number.isFinite(Number(process.env.OPENAI_TEMPERATURE))
  ? Number(process.env.OPENAI_TEMPERATURE)
  : 0.6;

const MAX_MESSAGES = 20;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

// Schéma minimal attendu (chat.completions)
type OpenAIResponse = {
  choices?: Array<{
    message?: { content?: string };
  }>;
};

function isOpenAIResponse(v: unknown): v is OpenAIResponse {
  return isRecord(v) && Array.isArray(v.choices);
}

function extractOpenAIReply(v: OpenAIResponse): string | null {
  const content = v.choices?.[0]?.message?.content;
  return typeof content === 'string' ? content.trim() : null;
}

const SAFE_INTERNAL_ROUTES = [
  '/#destinations-populaires',
  '/blog', // page index si tu l'as; sinon le bot ne l'utilisera pas comme priorité
  '/planificateur',
  '/producteurs',
  '/#objets',
  '/offres',
  '/videos',
  '/vols',
  '/blog/location-vr',
  '/camping',
  '/experiences',
] as const;

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

    // 1) Limiter l’historique
    const limited = body.messages.slice(-MAX_MESSAGES);

    // 2) Prompt système (guidage + choix + liens valides)
    const slugsList = BLOG_SLUGS.join(', ');
    const routesList = SAFE_INTERNAL_ROUTES.join(', ');

    const systemMessage = {
      role: 'system' as const,
      content: `
Tu es l’assistant officiel du site GoQuébeCAN (Québec/Canada), orienté aide et inspiration.

OBJECTIF
- Aider rapidement (débutants) et rester utile aux voyageurs expérimentés.
- Toujours proposer des options (laisser le choix), sans forcer une redirection.

RÈGLES DE RÉPONSE (obligatoires)
1) Donne d’abord une réponse utile et courte (4 à 8 lignes).
2) Propose ensuite 2 à 4 options sous forme de liens internes Markdown (liste à puces).
3) Termine par 1 question maximum pour personnaliser (ex: ville de départ + période, ou style du voyage).

LIENS INTERNES AUTORISÉS
- Tu ne dois utiliser QUE ces routes: ${routesList}
- Pour le blog, tu as le droit d’écrire /blog/<slug> UNIQUEMENT si <slug> est dans la liste autorisée ci-dessous.
- Sinon, propose /destinations ou demande la destination.

SLUGS BLOG AUTORISÉS (/blog/<slug>)
${slugsList}

BONNES PRATIQUES DE CONTENU
- Itinéraire: si l’utilisateur demande X jours + destination claire, propose une version par défaut (jour 1 à jour X) puis pose 1 question pour affiner.
- Producteurs: ne cite pas de noms inventés. Oriente vers /producteurs et demande le départ/période si nécessaire.
- Style: chaleureux, simple, rassurant, concret. Pas de blabla.

EXEMPLES D’OPTIONS (à adapter)
- [🗺️ Planifier l’itinéraire](/planificateur)
- [📘 Lire l’article](/blog/<slug-valide>)
- [🎥 Voir les vidéos](/videos)
- [📍 Explorer les destinations](/destinations)
- [🧺 Producteurs locaux](/producteurs)
- [🎒 Objets utiles](/objets)
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
      max_tokens: 900,
      messages: openAiMessages,
    } as const;

    // 3) Appel OpenAI avec timeout
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

    if (!isOpenAIResponse(dataU)) {
      console.error('[OpenAI ERROR] Schéma de réponse inattendu:', dataU);
      return NextResponse.json({ error: 'Réponse OpenAI inattendue' }, { status: 502 });
    }

    const reply = extractOpenAIReply(dataU) ?? 'Je n’ai pas compris, peux-tu reformuler ?';
    return NextResponse.json({ message: reply });
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
