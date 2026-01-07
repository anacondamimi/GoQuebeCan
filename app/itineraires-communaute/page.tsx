// app/itineraires-communaute/page.tsx
import Image from 'next/image';
import { getServerSupabase } from '@/lib/supabase-server';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';
import H3 from '@/components/typography/H3';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // ou: export const revalidate = 0;

type CommunityPdf = {
  id: string;
  titre: string;
  lien_pdf: string;
  image_url?: string;
  auteur?: string;
};

export default async function CommunautéPage() {
  const supabase = getServerSupabase();

  const { data: pdfs, error } = await supabase
    .from('community_pdfs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    // Message doux côté UI + log serveur implicite
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <H1 className="mb-6 text-3xl font-bold">📄 Itinéraires de la communauté</H1>
        <p className="rounded border border-red-200 bg-red-50 p-4 text-red-700">
          Oups, impossible de charger les itinéraires pour le moment.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <H2 className="mb-6 text-3xl font-bold">📄 Itinéraires de la communauté</H2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {pdfs?.map((pdf: CommunityPdf) => (
          <div key={pdf.id} className="rounded border bg-white p-4 shadow">
            {pdf.image_url && (
              <Image
                src={pdf.image_url}
                alt={pdf.titre}
                className="mb-3 rounded"
                width={800}
                height={600}
                // unoptimized // ← dé-commente si l’hôte d’images n’est pas whitelisté
              />
            )}
            <H3 className="text-lg font-semibold">{pdf.titre}</H3>
            {pdf.auteur && <p className="text-sm text-gray-500">par {pdf.auteur}</p>}
            <a
              href={pdf.lien_pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-indigo-600 underline"
            >
              📥 Télécharger
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
