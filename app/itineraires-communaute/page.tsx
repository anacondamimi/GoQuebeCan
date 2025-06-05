import { supabase } from '@/components/lib/supabase'; // ✅ corrigé

export default async function CommunautéPage() {
  const { data: pdfs, } = await supabase.from('community_pdfs').select('*');

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">📄 Itinéraires de la communauté</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {pdfs?.map(
          (pdf: {
            id: string;
            titre: string;
            lien_pdf: string;
            image_url?: string;
            auteur?: string;
          }) => (
            <div key={pdf.id} className="border p-4 rounded shadow bg-white">
              {pdf.image_url && (
                <img src={pdf.image_url} alt={pdf.titre} className="rounded mb-3" />
              )}
              <h3 className="font-semibold text-lg">{pdf.titre}</h3>
              {pdf.auteur && <p className="text-sm text-gray-500">par {pdf.auteur}</p>}
              <a
                href={pdf.lien_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 underline block mt-2"
              >
                📥 Télécharger
              </a>
            </div>
          )
        )}
      </div>
    </main>
  );
}
