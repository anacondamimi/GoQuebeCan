'use client';

import React, { useId, useMemo, useState } from 'react';
import H2 from '@/components/typography/H2';
import { supabaseBrowser as supabase } from '@/lib/supabase-browser';

type CommunityPdfForm = {
  titre: string;
  lien_pdf: string;
  image_url?: string;
  auteur: string;
};

function normalizeGoogleDriveLink(url: string): string {
  // formats acceptés :
  // - https://drive.google.com/file/d/<ID>/view?usp=sharing
  // - https://drive.google.com/open?id=<ID>
  // - https://drive.google.com/uc?export=download&id=<ID>
  const idFromFile = /drive\.google\.com\/file\/d\/([^/]+)/i.exec(url)?.[1];
  const idFromOpen = /drive\.google\.com\/open\?id=([^&]+)/i.exec(url)?.[1];
  const idFromUc = /drive\.google\.com\/uc\?[^#]*\bid=([^&]+)/i.exec(url)?.[1];
  const id = idFromFile ?? idFromOpen ?? idFromUc;

  return id ? `https://drive.google.com/uc?export=download&id=${id}` : url;
}

function isNonEmpty(v: string): boolean {
  return v.trim().length > 0;
}

function isProbablyUrl(v: string): boolean {
  // on reste permissif : http(s):// + au moins un point
  return /^https?:\/\/[^ ]+\.[^ ]+/.test(v.trim());
}

export default function AddCommunityPDF() {
  const [form, setForm] = useState<CommunityPdfForm>({
    titre: '',
    lien_pdf: '',
    image_url: '',
    auteur: '',
  });
  const [confirmation, setConfirmation] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titreId = useId();
  const lienId = useId();
  const imgId = useId();
  const auteurId = useId();

  const derived = useMemo(() => {
    const normalizedLink = normalizeGoogleDriveLink(form.lien_pdf);
    const fieldsOk =
      isNonEmpty(form.titre) &&
      isNonEmpty(form.auteur) &&
      isNonEmpty(form.lien_pdf) &&
      isProbablyUrl(normalizedLink);
    return { normalizedLink, fieldsOk };
  }, [form]);

  const handleChange =
    (key: keyof CommunityPdfForm) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setConfirmation('');
    setErrorMessage('');

    if (!derived.fieldsOk) {
      setConfirmation('❌ Erreur');
      setErrorMessage('Veuillez remplir les champs obligatoires et fournir une URL valide.');
      return;
    }

    setIsSubmitting(true);
    try {
      // On prépare l’objet à insérer (sans muter le state)
      const payload = {
        titre: form.titre.trim(),
        lien_pdf: derived.normalizedLink.trim(),
        image_url: form.image_url?.trim() || null,
        auteur: form.auteur.trim(),
      };

      // ⚠️ si tu as généré les types avec supabase (Database), tape ici :
      // const { error } = await supabase.from('community_pdfs').insert([payload satisfies Database['public']['Tables']['community_pdfs']['Insert']]);
      const { error } = await supabase.from('community_pdfs').insert([payload]);

      if (error) {
        setConfirmation('❌ Erreur');
        setErrorMessage(error.message || 'Erreur Supabase inconnue.');
        return;
      }

      setConfirmation('✅ PDF ajouté');
      setErrorMessage('');
      setForm({ titre: '', lien_pdf: '', image_url: '', auteur: '' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Une erreur inattendue s'est produite.";
      setConfirmation('❌ Erreur');
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)} // évite no-misused-promises
      className="mx-auto max-w-lg space-y-4 rounded-xl border bg-white p-6 shadow-md"
      noValidate
    >
      <H2 className="text-center text-2xl font-bold text-indigo-700">Ajouter un itinéraire PDF</H2>

      {/* Titre */}
      <div>
        <label htmlFor={titreId} className="mb-1 block text-sm font-medium">
          Titre *
        </label>
        <input
          id={titreId}
          name="titre"
          placeholder="Titre *"
          value={form.titre}
          onChange={handleChange('titre')}
          required
          className="w-full rounded border p-2"
          aria-invalid={form.titre !== '' && !isNonEmpty(form.titre)}
        />
      </div>

      {/* Lien PDF */}
      <div>
        <label htmlFor={lienId} className="mb-1 block text-sm font-medium">
          Lien vers le PDF (Google Drive accepté) *
        </label>
        <input
          id={lienId}
          name="lien_pdf"
          placeholder="https://..."
          value={form.lien_pdf}
          onChange={handleChange('lien_pdf')}
          required
          className="w-full rounded border p-2"
          aria-invalid={form.lien_pdf !== '' && !isProbablyUrl(derived.normalizedLink)}
        />
        {/* petit aperçu du lien normalisé si c'est du Drive */}
        {form.lien_pdf.includes('drive.google.com') && (
          <p className="mt-1 break-all text-xs text-gray-500">
            Lien de téléchargement détecté :{' '}
            <span className="underline">{derived.normalizedLink}</span>
          </p>
        )}
      </div>

      {/* Image (optionnelle) */}
      <div>
        <label htmlFor={imgId} className="mb-1 block text-sm font-medium">
          Image (URL)
        </label>
        <input
          id={imgId}
          name="image_url"
          placeholder="https://exemple.com/image.jpg"
          value={form.image_url}
          onChange={handleChange('image_url')}
          className="w-full rounded border p-2"
          aria-invalid={
            !!form.image_url && form.image_url.trim() !== '' && !isProbablyUrl(form.image_url)
          }
        />
      </div>

      {/* Auteur */}
      <div>
        <label htmlFor={auteurId} className="mb-1 block text-sm font-medium">
          Auteur *
        </label>
        <input
          id={auteurId}
          name="auteur"
          placeholder="Auteur *"
          value={form.auteur}
          onChange={handleChange('auteur')}
          required
          className="w-full rounded border p-2"
          aria-invalid={form.auteur !== '' && !isNonEmpty(form.auteur)}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !derived.fieldsOk}
        className="w-full rounded bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
      >
        {isSubmitting ? 'Enregistrement…' : 'Enregistrer'}
      </button>

      {(confirmation || errorMessage) && (
        <div
          className={`mt-4 rounded p-2 text-center font-semibold ${
            confirmation.startsWith('✅')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
          aria-live="polite"
        >
          {confirmation} {errorMessage && `: ${errorMessage}`}
        </div>
      )}
    </form>
  );
}
