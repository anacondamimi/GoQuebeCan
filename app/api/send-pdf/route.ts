import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo
async function sendAdminNotificationEmail({
  name,
  email,
  title,
  message,
  pdfUrl,
}: {
  name: string;
  email: string;
  title: string;
  message: string;
  pdfUrl: string;
}) {
  const apiKey = process.env.MAILJET_API_KEY;
  const apiSecret = process.env.MAILJET_API_SECRET;
  const senderEmail = process.env.SENDER_EMAIL;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!apiKey || !apiSecret || !senderEmail || !adminEmail) {
    throw new Error('Variables Mailjet manquantes.');
  }

  const response = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
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
          Subject: 'Nouvel itinéraire PDF à valider',
          TextPart:
            'Un nouvel itinéraire PDF a été envoyé.\n\n' +
            `Nom: ${name}\n` +
            `Email: ${email}\n` +
            `Titre: ${title}\n` +
            `Message: ${message || 'Aucun message'}\n` +
            `PDF: ${pdfUrl}\n`,
          HTMLPart: `
            <h3>Nouvel itinéraire PDF à valider</h3>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Titre :</strong> ${title}</p>
            <p><strong>Message :</strong> ${message || 'Aucun message'}</p>
            <p><strong>PDF :</strong> <a href="${pdfUrl}" target="_blank" rel="noopener noreferrer">Ouvrir le PDF</a></p>
          `,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur Mailjet: ${errorText}`);
  }
}
function sanitizeFileName(fileName: string) {
  return fileName.replace(/[^\w.-]/g, '_');
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get('file');
    const rawName = formData.get('name');
    const rawEmail = formData.get('email');
    const rawTitle = formData.get('title');
    const rawMessage = formData.get('message');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Fichier PDF manquant.' }, { status: 400 });
    }

    const name = typeof rawName === 'string' ? rawName.trim() : '';
    const email = typeof rawEmail === 'string' ? rawEmail.trim() : '';
    const title = typeof rawTitle === 'string' ? rawTitle.trim() : '';
    const message = typeof rawMessage === 'string' ? rawMessage.trim() : '';

    if (!name || !email || !title) {
      return NextResponse.json(
        { error: 'Nom, email et titre sont obligatoires.' },
        { status: 400 },
      );
    }

    if (file.size === 0) {
      return NextResponse.json({ error: 'Le fichier est vide.' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'PDF uniquement.' }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Le fichier dépasse la limite de 10 Mo.' },
        { status: 400 },
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ error: 'Variables Supabase manquantes.' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const safeFileName = sanitizeFileName(file.name);
    const filePath = `${Date.now()}-${safeFileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from('community-pdfs')
      .upload(filePath, fileBuffer, {
        contentType: 'application/pdf',
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: `Upload impossible : ${uploadError.message}` },
        { status: 500 },
      );
    }

    const { data: publicUrlData } = supabase.storage.from('community-pdfs').getPublicUrl(filePath);

    const summary =
      message.length >= 10
        ? message
        : `Itinéraire PDF partagé par ${name} pour la communauté GoQuébeCAN.`;

    const { error: insertError } = await supabase.from('community_itineraries').insert({
      title,
      summary,
      author_name: name,
      submitter_name: name,
      submitter_email: email,
      message: message || null,
      pdf_url: publicUrlData.publicUrl,
      source_type: 'external_pdf',
      status: 'pending',
      is_approved: false,
      is_email_verified: false,
      steps_json: [],
    });

    if (insertError) {
      await supabase.storage.from('community-pdfs').remove([filePath]);

      return NextResponse.json(
        { error: `Insertion impossible : ${insertError.message}` },
        { status: 500 },
      );
    }
    try {
      await sendAdminNotificationEmail({
        name,
        email,
        title,
        message,
        pdfUrl: publicUrlData.publicUrl,
      });
    } catch (mailError) {
      console.error('[send-pdf] email admin non envoyé', mailError);
    }
    return NextResponse.json({
      success: true,
      message: 'PDF envoyé avec succès et en attente de validation.',
    });
  } catch (error) {
    console.error('[send-pdf] erreur serveur', error);

    return NextResponse.json({ error: 'Erreur serveur lors de l’envoi du PDF.' }, { status: 500 });
  }
}
