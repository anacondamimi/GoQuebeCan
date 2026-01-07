// 📂 app/api/chat/route.ts
import { NextResponse } from 'next/server';

// Optionnel: exécuter sur l’Edge si tu veux un démarrage plus vif

// ---------- Types côté client ----------
type ChatMessage = {
  text: string; // contenu du message
  isUser: boolean; // true si l’utilisateur, false si l’assistant
  timestamp: string; // ISO string
};
type ChatRequestBody = {
  messages: ChatMessage[];
};

// ---------- Types minimalistes pour OpenAI ----------
type OpenAIChatMessage = { content?: string };
type OpenAIChoice = { message?: OpenAIChatMessage };
type OpenAIResponse = { choices?: OpenAIChoice[] };

// ---------- Type guards et utils sûrs ----------
function isRecord(u: unknown): u is Record<string, unknown> {
  return typeof u === 'object' && u !== null;
}
function isChatMessage(u: unknown): u is ChatMessage {
  return (
    isRecord(u) &&
    typeof u.text === 'string' &&
    typeof u.isUser === 'boolean' &&
    typeof u.timestamp === 'string'
  );
}
function isChatRequestBody(u: unknown): u is ChatRequestBody {
  return isRecord(u) && Array.isArray(u.messages) && u.messages.every(isChatMessage);
}
function isOpenAIResponse(u: unknown): u is OpenAIResponse {
  return isRecord(u) && Array.isArray(u.choices);
}
function extractOpenAIReply(u: OpenAIResponse): string | null {
  const first = u.choices?.[0];
  if (!first || !isRecord(first)) return null;
  const msg = first.message;
  return isRecord(msg) && typeof msg.content === 'string' ? msg.content : null;
}

// ---------- Paramétrage ----------
const MODEL = process.env.OPENAI_MODEL ?? 'gpt-3.5-turbo'; // mets ici un modèle récent si dispo
const PROJECT = process.env.OPENAI_PROJECT_ID ?? '';
const API_KEY = process.env.OPENAI_API_KEY ?? '';
const TEMPERATURE = Number.isFinite(Number(process.env.OPENAI_TEMPERATURE))
  ? Number(process.env.OPENAI_TEMPERATURE)
  : 0.7;

// Limites raisonnables pour éviter les abus / surprises de coûts
const MAX_HISTORY = 10; // derniers messages conservés
const MAX_TOTAL_INPUT_CHARS = 8000; // garde-fou rapide

export async function POST(req: Request) {
  try {
    // 1) Parse & validation
    const raw: unknown = await req.json();
    if (!isChatRequestBody(raw)) {
      return NextResponse.json(
        { error: 'Requête invalide : messages manquants ou mal formés.' },
        { status: 400 },
      );
    }
    if (!API_KEY || !PROJECT) {
      console.error('[API ERROR] OPENAI_API_KEY / OPENAI_PROJECT_ID manquant(s).');
      return NextResponse.json({ error: 'Configuration serveur incomplète.' }, { status: 500 });
    }

    // 2) Normalisation & limitations
    const limited = raw.messages.slice(-MAX_HISTORY).map((m) => ({
      ...m,
      text: m.text.trim(),
    }));

    const totalChars = limited.reduce((n, m) => n + m.text.length, 0);
    if (totalChars > MAX_TOTAL_INPUT_CHARS) {
      return NextResponse.json(
        { error: 'Entrée trop volumineuse. Réduis un peu le contexte 🫣' },
        { status: 400 },
      );
    }

    // 3) Construction du prompt pour OpenAI
    const systemMessage = {
      role: 'system' as const,
      content: `
Tu es un assistant voyage expert et chaleureux, spécialisé au Québec et au Canada.

🎯 Ta mission :
- Aider familles / campeurs / amoureux de nature & bouffe locale à organiser leur voyage.
- Proposer destinations, itinéraires, activités, bons plans.
- Mettre en avant les contenus du site : blog, vidéos, objets, planificateur.
- Si la destination correspond à un article connu (ex. "tadoussac", "banff", "gaspésie"), ajoute des liens **valables** en Markdown :
  📘 Article : [Voir l’article](/blog/NOM-DESTINATION)
  🎥 Vidéos : [Regarder les vidéos](/videos#NOM-DESTINATION)
  🧳 Objets utiles : [Voir la liste](/objets)
  🗺️ Planificateur : [Planifier mon voyage](/planificateur)
  🏨 Hôtels : [Hôtels à NOM](https://www.booking.com/searchresults.html?city=xxx.fr.html)

🗣️ Ton :
- Simple, amical, pro.
- Termine par une question utile :
  → “Tu préfères une étape plus sauvage ou plutôt gourmande ?”
  → “Tu as une région ou un budget en tête ?”

🛑 Ne donne jamais de lien qui ne mène à rien.
🗨️ Réponds uniquement en français. Émojis OK avec modération.
      `.trim(),
    };

    const openAiMessages: ReadonlyArray<{
      role: 'system' | 'user' | 'assistant';
      content: string;
    }> = [
      systemMessage,
      ...limited.map((m) => ({
        role: m.isUser ? ('user' as const) : ('assistant' as const),
        content: m.text,
      })),
    ];

    const body = {
      model: MODEL,
      temperature: TEMPERATURE,
      max_tokens: 800,
      messages: openAiMessages,
    } as const;

    // 4) Appel OpenAI avec timeout (AbortController)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25_000); // 25s max
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'OpenAI-Project': PROJECT,
      },
      body: JSON.stringify(body),
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
    // AbortError (timeout) → message plus clair
    if (msg.includes('The operation was aborted')) {
      return NextResponse.json(
        { error: 'Timeout OpenAI — réessaie dans un instant 🙏' },
        { status: 504 },
      );
    }
    console.error('[SERVER ERROR]', msg);
    return NextResponse.json({ error: 'Erreur serveur ou OpenAI' }, { status: 500 });
  }
}
