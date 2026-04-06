import { NextResponse } from 'next/server';
import { postWebhook } from '@/lib/webhook';
import mailjet from 'node-mailjet';

export const runtime = 'nodejs';

// 🔹 CONFIG MAILJET
const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY || '',
  process.env.MAILJET_API_SECRET || '',
);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@goquebecan.com';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'contact@goquebecan.com';

// 🔹 TYPES
type ContactType = 'contact' | 'producteur' | 'itineraire';

// 🔹 UTILS
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

// 🔹 MAIN
export async function POST(req: Request) {
  try {
    const raw: unknown = await req.json();

    if (!isRecord(raw)) {
      return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
    }

    const nom = sanitize(asString(raw.nom) ?? '');
    const email = sanitize((asString(raw.email) ?? '').toLowerCase());
    const message = sanitize(asString(raw.message) ?? '');
    const typeRaw = asString(raw.type) ?? '';

    const type: ContactType =
      typeRaw === 'producteur' || typeRaw === 'itineraire' ? typeRaw : 'contact';

    if (!nom || !email || !message) {
      return NextResponse.json({ error: 'Tous les champs sont obligatoires.' }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }

    const receivedAt = new Date().toISOString();

    // 🔹 1. WEBHOOK (Slack / logs)
    await postWebhook({
      text: '📬 Nouveau message de contact',
      fields: {
        Nom: nom,
        Email: email,
        Type: type,
        Message: message,
        Reçu: receivedAt,
      },
    });

    // 🔹 2. EMAIL MAILJET (🔥 LA PIÈCE MANQUANTE)
    await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: SENDER_EMAIL,
            Name: 'GoQuebeCan',
          },
          To: [
            {
              Email: ADMIN_EMAIL,
              Name: 'Admin',
            },
          ],
          Subject: `📬 Nouveau message (${type})`,
          TextPart: `
Nom: ${nom}
Email: ${email}
Type: ${type}

Message:
${message}
          `,
          HTMLPart: `
            <h3>Nouveau message de contact</h3>
            <p><strong>Nom :</strong> ${nom}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Type :</strong> ${type}</p>
            <p><strong>Message :</strong><br/>${message}</p>
          `,
        },
      ],
    });

    console.info('[contact] email envoyé');

    return NextResponse.json({ success: true, receivedAt });
  } catch (err: unknown) {
    console.error('[contact] error', err);

    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 });
  }
}
