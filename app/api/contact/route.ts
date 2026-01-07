// 📂 app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { postWebhook } from '@/lib/webhook';

export const runtime = 'nodejs'; // ✅ remet le mode Node standard

// ---------- Types ----------
type ContactType = 'contact' | 'producteur' | 'itineraire';

type RecaptchaVerifyOK = {
  success: true;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
};
type RecaptchaVerifyErr = {
  success: false;
  // on n'a pas besoin d'un type littéral pour la clé; on la lira via bracket-notation
  // "error-codes"?: string[];
};
type RecaptchaVerifyResp = RecaptchaVerifyOK | RecaptchaVerifyErr;

// ---------- Utils ----------
function isRecord(u: unknown): u is Record<string, unknown> {
  return typeof u === 'object' && u !== null;
}
function asString(u: unknown): string | null {
  return typeof u === 'string' ? u : null;
}
function sanitize(s: string, max = 4000): string {
  return s.trim().slice(0, max);
}
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function nowIso(): string {
  return new Date().toISOString();
}

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 4000;

// ---------- reCAPTCHA ----------
async function verifyRecaptcha(params: {
  token: string;
  remoteip?: string;
}): Promise<RecaptchaVerifyResp> {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) {
    return { success: false }; // pas configuré → on ne valide pas
  }

  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', params.token);
  if (params.remoteip) body.set('remoteip', params.remoteip);

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const dataU: unknown = await res.json();
  if (!isRecord(dataU)) return { success: false };

  if (dataU.success === true) {
    return {
      success: true,
      score: typeof dataU.score === 'number' ? dataU.score : undefined,
      action: asString(dataU.action) ?? undefined,
      challenge_ts: asString(dataU.challenge_ts) ?? undefined,
      hostname: asString(dataU.hostname) ?? undefined,
    };
  }

  // On pourrait lire dataU['error-codes'] ici si besoin pour log
  return { success: false };
}

// ---------- Handler ----------
export async function POST(req: Request) {
  try {
    const raw: unknown = await req.json();
    if (!isRecord(raw)) {
      return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
    }

    const nom = sanitize(asString(raw.nom) ?? '', MAX_NAME);
    const email = sanitize((asString(raw.email) ?? '').toLowerCase(), MAX_EMAIL);
    const message = sanitize(asString(raw.message) ?? '', MAX_MESSAGE);
    const typeRaw = asString(raw.type) ?? '';
    const type: ContactType =
      typeRaw === 'producteur' || typeRaw === 'itineraire' ? typeRaw : 'contact';
    const honey = asString(raw.honey) ?? '';
    const token = asString(raw.token) ?? '';

    // Honeypot : si rempli -> “succès silencieux”
    if (honey) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Champs requis + taille
    if (!nom || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs (nom, email, message) sont obligatoires.' },
        { status: 400 },
      );
    }
    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Adresse email invalide.' }, { status: 400 });
    }
    if (nom.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
      return NextResponse.json({ error: 'Contenu trop long.' }, { status: 413 });
    }

    // Contexte (edge-safe)
    const ua = req.headers.get('user-agent') ?? '';
    const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0]?.trim() ?? '';

    // reCAPTCHA si configuré
    if (process.env.RECAPTCHA_SECRET) {
      if (!token) {
        return NextResponse.json({ error: 'reCAPTCHA requis.' }, { status: 400 });
      }
      const verif = await verifyRecaptcha({ token, remoteip: ip || undefined });
      if (!verif.success || (typeof verif.score === 'number' && verif.score < 0.3)) {
        return NextResponse.json({ error: 'Vérification reCAPTCHA échouée.' }, { status: 400 });
      }
    }

    const receivedAt = nowIso();

    // 🔔 Slack webhook (utilise SLACK_WEBHOOK_URL depuis src/lib/webhook.ts)
    await postWebhook({
      text: '📬 Nouveau message de contact',
      fields: {
        Nom: nom,
        Email: email,
        Type: type,
        Message: message,
        IP: ip || 'n/a',
        UA: ua.slice(0, 120),
        Reçu: receivedAt,
      },
    });

    console.info('[contact] ok', { type, receivedAt });

    return NextResponse.json(
      { success: true, receivedAt },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Erreur inconnue';
    console.error('[contact] error', msg);
    return NextResponse.json(
      { error: 'Erreur interne du serveur. Merci de réessayer plus tard.' },
      { status: 500 },
    );
  }
}
