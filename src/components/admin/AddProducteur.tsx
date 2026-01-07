'use client';

import React, { useId, useMemo, useState } from 'react';
import H2 from '@/components/typography/H2';
import { supabaseBrowser as supabase } from '@/lib/supabase-browser';

type ProducteurForm = {
  nom: string;
  email: string; // optionnel côté UI, mais on stocke une string (évent. vide)
  type: string; // ex: ferme, microbrasserie…
  description: string;
  site_web: string; // URL optionnelle
  localisation: string; // ville, région…
};

function isNonEmpty(v: string): boolean {
  return v.trim().length > 0;
}
function isEmail(v: string): boolean {
  if (v.trim() === '') return true; // email facultatif
  // validation simple, efficace
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isUrl(v: string): boolean {
  if (v.trim() === '') return true; // URL facultative
  return /^https?:\/\/[^\s.]+\.[^\s]+/i.test(v.trim());
}
function normalizeUrl(v: string): string {
  const s = v.trim();
  if (s === '' || /^https?:\/\//i.test(s)) return s;
  return `https://${s}`; // si l'utilisateur oublie le protocole
}

export default function AddProducteur() {
  const [form, setForm] = useState<ProducteurForm>({
    nom: '',
    email: '',
    type: '',
    description: '',
    site_web: '',
    localisation: '',
  });
  const [confirmation, setConfirmation] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ids pour labels/aria
  const nomId = useId();
  const emailId = useId();
  const typeId = useId();
  const siteId = useId();
  const locId = useId();
  const descId = useId();

  // dérivés + validation légère
  const derived = useMemo(() => {
    const normalizedSite = normalizeUrl(form.site_web);
    const fieldsOk =
      isNonEmpty(form.nom) &&
      isNonEmpty(form.description) &&
      isEmail(form.email) &&
      isUrl(normalizedSite);
    return { normalizedSite, fieldsOk };
  }, [form]);

  const handleChange =
    (key: keyof ProducteurForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { value } = e.target;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setConfirmation('');
    setErrorMessage('');

    if (!derived.fieldsOk) {
      setConfirmation('❌ Erreur');
      setErrorMessage('Veuillez vérifier les champs requis, l’email et l’URL éventuelle.');
      return;
    }

    setIsSubmitting(true);
    try {
      // on prépare un payload propre (pas de mutation de state)
      const payload = {
        nom: form.nom.trim(),
        email: form.email.trim() || null,
        type: form.type.trim() || null,
        description: form.description.trim(),
        site_web: derived.normalizedSite.trim() || null,
        localisation: form.localisation.trim() || null,
      };

      // Si tu as les types Supabase générés, tu peux remplacer par un `satisfies Insert`
      const { error } = await supabase.from('producteurs').insert([payload]);

      if (error) {
        setConfirmation('❌ Erreur');
        setErrorMessage(error.message || 'Erreur Supabase inconnue.');
        return;
      }

      setConfirmation('✅ Producteur ajouté !');
      setForm({
        nom: '',
        email: '',
        type: '',
        description: '',
        site_web: '',
        localisation: '',
      });
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
      className="max-w-lg space-y-4 rounded-xl border bg-white p-6 shadow"
      noValidate
    >
      <H2 className="text-xl font-bold">➕ Ajouter un producteur</H2>

      {/* Nom (requis) */}
      <div>
        <label htmlFor={nomId} className="mb-1 block text-sm font-medium">
          Nom du producteur *
        </label>
        <input
          id={nomId}
          name="nom"
          placeholder="Nom du producteur"
          value={form.nom}
          onChange={handleChange('nom')}
          required
          className="w-full rounded border p-2"
          aria-invalid={form.nom !== '' && !isNonEmpty(form.nom)}
        />
      </div>

      {/* Email (optionnel) */}
      <div>
        <label htmlFor={emailId} className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          placeholder="contact@exemple.com"
          value={form.email}
          onChange={handleChange('email')}
          className="w-full rounded border p-2"
          aria-invalid={form.email !== '' && !isEmail(form.email)}
        />
      </div>

      {/* Type (optionnel) */}
      <div>
        <label htmlFor={typeId} className="mb-1 block text-sm font-medium">
          Type (ferme, microbrasserie…)
        </label>
        <input
          id={typeId}
          name="type"
          placeholder="ferme, microbrasserie…"
          value={form.type}
          onChange={handleChange('type')}
          className="w-full rounded border p-2"
        />
      </div>

      {/* Site web (optionnel, URL) */}
      <div>
        <label htmlFor={siteId} className="mb-1 block text-sm font-medium">
          Site web (URL)
        </label>
        <input
          id={siteId}
          name="site_web"
          placeholder="https://exemple.com"
          value={form.site_web}
          onChange={handleChange('site_web')}
          className="w-full rounded border p-2"
          aria-invalid={form.site_web !== '' && !isUrl(normalizeUrl(form.site_web))}
        />
      </div>

      {/* Localisation (optionnel) */}
      <div>
        <label htmlFor={locId} className="mb-1 block text-sm font-medium">
          Localisation (ville, région…)
        </label>
        <input
          id={locId}
          name="localisation"
          placeholder="Québec, Bas-Saint-Laurent…"
          value={form.localisation}
          onChange={handleChange('localisation')}
          className="w-full rounded border p-2"
        />
      </div>

      {/* Description (requise) */}
      <div>
        <label htmlFor={descId} className="mb-1 block text-sm font-medium">
          Description courte *
        </label>
        <textarea
          id={descId}
          name="description"
          placeholder="Quelques mots sur l’activité, les produits, etc."
          value={form.description}
          onChange={handleChange('description')}
          rows={3}
          required
          className="w-full rounded border p-2"
          aria-invalid={form.description !== '' && !isNonEmpty(form.description)}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !derived.fieldsOk}
        className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
      >
        {isSubmitting ? 'Enregistrement…' : 'Ajouter'}
      </button>

      {(confirmation || errorMessage) && (
        <p
          className={`mt-2 text-sm ${
            confirmation.startsWith('✅') ? 'text-green-700' : 'text-red-700'
          }`}
          aria-live="polite"
        >
          {confirmation} {errorMessage && `: ${errorMessage}`}
        </p>
      )}
    </form>
  );
}
