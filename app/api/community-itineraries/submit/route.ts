import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

type CommunityStepRole = 'start' | 'via' | 'end';

type CommunityStep = {
  id: string;
  name: string;
  role: CommunityStepRole;
  lat: number;
  lng: number;
  notes?:
    | {
        hotel?: string;
        restaurant?: string;
        activites?: string;
        producteurs?: string;
        autres?: string;
      }
    | string
    | null;
};

type SubmitPayload = {
  title: string;
  summary: string;
  authorName?: string;
  authorEmail?: string;
  consent: boolean;
  steps: CommunityStep[];
};

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isValidStep(step: unknown): step is CommunityStep {
  if (!step || typeof step !== 'object') return false;

  const s = step as Record<string, unknown>;

  return (
    typeof s.id === 'string' &&
    typeof s.name === 'string' &&
    (s.role === 'start' || s.role === 'via' || s.role === 'end') &&
    isFiniteNumber(s.lat) &&
    isFiniteNumber(s.lng)
  );
}

function validatePayload(payload: SubmitPayload): string | null {
  if (!payload.title?.trim()) return 'Le titre est requis.';
  if (payload.title.trim().length < 5) return 'Le titre est trop court.';
  if (!payload.summary?.trim()) return 'La description est requise.';
  if (payload.summary.trim().length < 10)
    return 'Veuillez décrire en quelques mots votre itinéraire.';
  if (!payload.consent) return "L'autorisation de publication est requise.";

  if (!Array.isArray(payload.steps) || payload.steps.length < 2) {
    return "L'itinéraire doit contenir au moins 2 étapes.";
  }

  if (!payload.steps.every(isValidStep)) {
    return "Certaines étapes de l'itinéraire sont invalides.";
  }

  if (payload.authorEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.authorEmail.trim())) {
    return "L'adresse email est invalide.";
  }

  return null;
}

function guessRegionFromSteps(steps: CommunityStep[]): string | null {
  const names = steps.map((step) => step.name.toLowerCase());

  if (names.some((n) => n.includes('charlevoix'))) return 'Charlevoix';
  if (names.some((n) => n.includes('gaspésie') || n.includes('gaspesie'))) return 'Gaspésie';
  if (names.some((n) => n.includes('montréal') || n.includes('montreal'))) {
    return 'Montréal et sa région';
  }
  if (names.some((n) => n.includes('québec') || n.includes('quebec'))) {
    return 'Ville de Québec et sa région';
  }

  return null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendAdminEmailWithMailjet(params: {
  title: string;
  summary: string;
  authorName?: string;
  authorEmail?: string;
  stepCount: number;
  itineraryId: string;
  slug: string;
}) {
  const apiKey = process.env.MAILJET_API_KEY;
  const apiSecret = process.env.MAILJET_API_SECRET;
  const senderEmail = process.env.SENDER_EMAIL;
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SENDER_EMAIL;

  if (!apiKey || !apiSecret || !senderEmail || !adminEmail) {
    console.warn(
      '[community-itineraries/submit] Mailjet non configuré complètement. Email non envoyé.',
    );
    return;
  }

  const basicAuth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');

  const safeTitle = escapeHtml(params.title);
  const safeSummary = escapeHtml(params.summary).replace(/\n/g, '<br>');
  const safeAuthorName = escapeHtml(params.authorName || 'Non renseigné');
  const safeAuthorEmail = escapeHtml(params.authorEmail || 'Non renseigné');
  const safeSlug = escapeHtml(params.slug);

  const htmlPart = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111827; line-height: 1.5;">
      <h2 style="margin-bottom: 16px;">Nouvel itinéraire communauté à valider</h2>
      <p><strong>ID :</strong> ${escapeHtml(params.itineraryId)}</p>
      <p><strong>Titre :</strong> ${safeTitle}</p>
      <p><strong>Slug :</strong> ${safeSlug}</p>
      <p><strong>Auteur :</strong> ${safeAuthorName}</p>
      <p><strong>Email :</strong> ${safeAuthorEmail}</p>
      <p><strong>Nombre d'étapes :</strong> ${params.stepCount}</p>
      <div style="margin-top: 16px;">
        <strong>Résumé :</strong>
        <div style="margin-top: 8px; padding: 12px; background: #f9fafb; border-radius: 8px;">
          ${safeSummary}
        </div>
      </div>
    </div>
  `;

  const textPart = [
    'Nouvel itinéraire communauté à valider',
    '',
    `ID : ${params.itineraryId}`,
    `Titre : ${params.title}`,
    `Slug : ${params.slug}`,
    `Auteur : ${params.authorName || 'Non renseigné'}`,
    `Email : ${params.authorEmail || 'Non renseigné'}`,
    `Nombre d'étapes : ${params.stepCount}`,
    '',
    'Résumé :',
    params.summary,
  ].join('\n');

  const response = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Messages: [
        {
          From: {
            Email: senderEmail,
            Name: 'GoQuébeCAN',
          },
          To: [
            {
              Email: adminEmail,
              Name: 'Admin GoQuébeCAN',
            },
          ],
          Subject: 'Nouvel itinéraire à valider sur GoQuébeCAN',
          TextPart: textPart,
          HTMLPart: htmlPart,
        },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Mailjet error ${response.status}: ${body}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as SubmitPayload;

    const validationError = validatePayload(payload);
    if (validationError) {
      return NextResponse.json({ ok: false, error: validationError }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { ok: false, error: 'Configuration Supabase incomplète côté serveur.' },
        { status: 500 },
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const cleanTitle = payload.title.trim();
    const cleanSummary = payload.summary.trim();
    const cleanAuthorName = payload.authorName?.trim() || null;
    const cleanAuthorEmail = payload.authorEmail?.trim() || null;

    const insertPayload = {
      title: cleanTitle,
      summary: cleanSummary,
      author_name: cleanAuthorName,
      author_email: cleanAuthorEmail,
      status: 'pending',
      steps_json: payload.steps,
      step_count: payload.steps.length,
      region: guessRegionFromSteps(payload.steps),
      duration_days: null,
      cover_image_url: null,
      pdf_url: null,
    };

    const { data, error } = await supabase
      .from('community_itineraries')
      .insert([insertPayload])
      .select('id, slug')
      .single();

    if (error) {
      return NextResponse.json(
        { ok: false, error: `Insertion impossible : ${error.message}` },
        { status: 500 },
      );
    }

    const inserted = data as { id: string; slug: string | null };

    try {
      await sendAdminEmailWithMailjet({
        title: insertPayload.title,
        summary: insertPayload.summary,
        authorName: insertPayload.author_name ?? undefined,
        authorEmail: insertPayload.author_email ?? undefined,
        stepCount: insertPayload.step_count,
        itineraryId: inserted.id,
        slug: inserted.slug ?? 'slug-non-genere',
      });
    } catch (mailError) {
      console.error('[community-itineraries/submit] Mailjet error:', mailError);
    }

    return NextResponse.json({
      ok: true,
      itineraryId: inserted.id,
      slug: inserted.slug ?? null,
      status: 'pending',
      message:
        'Merci, votre itinéraire a bien été envoyé. Il apparaîtra avec le statut “En cours de validation”.',
    });
  } catch (error) {
    console.error('[community-itineraries/submit] unexpected error:', error);

    return NextResponse.json(
      { ok: false, error: 'Erreur inattendue côté serveur.' },
      { status: 500 },
    );
  }
}
