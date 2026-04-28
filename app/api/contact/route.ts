// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { postWebhook } from '@/lib/webhook';
import mailjet from 'node-mailjet';

export const runtime = 'nodejs';

const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY || '',
  process.env.MAILJET_API_SECRET || '',
);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'contact@goquebecan.com';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'contact@goquebecan.com';

type ContactType = 'contact' | 'producteur' | 'itineraire';

function isRecord(u: unknown): u is Record<string, unknown> {
  return typeof u === 'object' && u !== null;
}

function asString(u: unknown): string | null {
  return typeof u === 'string' ? u : null;
}

function sanitize(s: string, max = 4000): string {
  return s.trim().slice(0, max);
}

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function verifyRecaptcha(token: string | null, expectedAction = 'contact') {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  if (!token) {
    console.warn('[recaptcha] token manquant');
    return false;
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    console.error('[recaptcha] RECAPTCHA_SECRET_KEY manquante');
    return false;
  }

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    });

    const data = await res.json();

    console.info('[recaptcha]', {
      success: data.success,
      score: data.score,
      action: data.action,
      errors: data['error-codes'],
    });

    return (
      data.success === true &&
      data.action === expectedAction &&
      typeof data.score === 'number' &&
      data.score >= 0.5
    );
  } catch (error) {
    console.error('[recaptcha] erreur vérification', error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const raw: unknown = await req.json();

    if (!isRecord(raw)) {
      return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
    }

    const nom = sanitize(asString(raw.nom) ?? '', 120);
    const email = sanitize((asString(raw.email) ?? '').toLowerCase(), 180);
    const message = sanitize(asString(raw.message) ?? '', 4000);
    const typeRaw = asString(raw.type) ?? '';
    const token = asString(raw.token);
    const honey = sanitize(asString(raw.honey) ?? '', 200);

    const type: ContactType =
      typeRaw === 'producteur' || typeRaw === 'itineraire' ? typeRaw : 'contact';

    if (honey) {
      return NextResponse.json({ success: true });
    }

    if (!nom || !email || !message) {
      return NextResponse.json({ error: 'Tous les champs sont obligatoires.' }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }

    const captchaOk = await verifyRecaptcha(token, 'contact');

    if (!captchaOk) {
      return NextResponse.json({ error: 'Validation reCAPTCHA refusée.' }, { status: 403 });
    }

    const receivedAt = new Date().toISOString();

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

    await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: SENDER_EMAIL,
            Name: 'GoQuébeCan',
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
            <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
            <p><strong>Email :</strong> ${escapeHtml(email)}</p>
            <p><strong>Type :</strong> ${escapeHtml(type)}</p>
            <p><strong>Message :</strong><br/>${escapeHtml(message).replaceAll('\n', '<br/>')}</p>
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
