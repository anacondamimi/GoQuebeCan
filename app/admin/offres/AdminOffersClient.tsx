'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Offer, OfferCategory } from '@/types/offer';
import H2 from '@/components/typography/H2';

const STORAGE_KEY = 'goquebecan_admin_offers_v1';

const CATEGORY_OPTIONS: { value: OfferCategory; label: string }[] = [
  { value: 'hotel', label: 'Hôtel' },
  { value: 'forfait', label: 'Forfait' },
  { value: 'activite', label: 'Activité' },
  { value: 'transport', label: 'Transport' },
  { value: 'train', label: 'Train' },
  { value: 'autre', label: 'Autre' },
];

/** Modèle vide conforme au type Offer */
const emptyOffer: Offer = {
  id: '',
  title: '',
  slug: '',
  description: '',
  image: {
    src: '',
    alt: '',
    provider: 'generic',
  },
  priceFrom: undefined,
  currency: 'CAD',
  categories: ['autre'],
  vendor: '',
  url: '',
  published: true,
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isHttpUrl(u: string) {
  try {
    const url = new URL(u);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function makeUniqueSlug(base: string, existing: Set<string>) {
  if (!existing.has(base)) return base;
  let i = 2;
  while (existing.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}

export default function AdminOffersClient() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [form, setForm] = useState<Offer>(emptyOffer);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState<{ type: 'ok' | 'warn' | 'err'; msg: string } | null>(null);

  // Load saved offers
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Offer[];
      if (Array.isArray(parsed)) setOffers(parsed);
    } catch {
      // ignore
    }
  }, []);

  // Save offers
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
    } catch {
      // ignore
    }
  }, [offers]);

  const offersBySlug = useMemo(() => {
    const set = new Set<string>();
    for (const o of offers) if (o.slug) set.add(o.slug);
    return set;
  }, [offers]);

  const resetForm = () => {
    setForm(emptyOffer);
    setEditingId(null);
  };

  /** Gère les changements de champ texte, select et textarea */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    if (name === 'imageSrc') {
      setForm((prev) => ({ ...prev, image: { ...prev.image, src: value } }));
      return;
    }

    if (name === 'imageAlt') {
      setForm((prev) => ({ ...prev, image: { ...prev.image, alt: value } }));
      return;
    }

    if (name === 'categories') {
      setForm((prev) => ({ ...prev, categories: [value as OfferCategory] }));
      return;
    }

    if (name === 'priceFrom') {
      const n = Number(value);
      setForm((prev) => ({ ...prev, priceFrom: Number.isFinite(n) && n > 0 ? n : undefined }));
      return;
    }

    if (name === 'published' && type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, published: checked }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (o: Offer) => {
    if (!o.title.trim()) return 'Merci de saisir un titre.';
    if (!o.image?.src?.trim()) return "Merci d'ajouter une image (URL).";
    if (!o.url.trim()) return "Merci d'ajouter un lien (URL).";
    if (!isHttpUrl(o.url.trim())) return 'Le lien doit être une URL valide (http/https).';
    if (o.image.src.trim() && !isHttpUrl(o.image.src.trim()))
      return "L'URL de l'image doit être http/https.";
    return null;
  };

  /** Ajoute ou met à jour une offre */
  const upsertOffer = () => {
    setStatus(null);

    const err = validate(form);
    if (err) {
      setStatus({ type: 'warn', msg: `⚠️ ${err}` });
      return;
    }

    const baseSlug = slugify(form.title);
    const slugs = new Set(offersBySlug);

    // si édition, on retire le slug actuel de l’ensemble pour éviter le faux doublon
    if (editingId) {
      const current = offers.find((o) => o.id === editingId);
      if (current?.slug) slugs.delete(current.slug);
    }

    const slug = makeUniqueSlug(baseSlug || 'offre', slugs);

    if (editingId) {
      const next: Offer = { ...form, id: editingId, slug };
      setOffers((prev) => prev.map((o) => (o.id === editingId ? next : o)));
      setStatus({ type: 'ok', msg: '✅ Offre mise à jour.' });
      resetForm();
      return;
    }

    const offerToAdd: Offer = {
      ...form,
      id: uuidv4(),
      slug,
      published: form.published ?? true,
    };

    setOffers((prev) => [...prev, offerToAdd]);
    setStatus({ type: 'ok', msg: '✅ Offre ajoutée.' });
    resetForm();
  };

  const editOffer = (id: string) => {
    const o = offers.find((x) => x.id === id);
    if (!o) return;
    setEditingId(id);
    setForm(o);
    setStatus({ type: 'ok', msg: '✏️ Mode édition activé.' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeOffer = (id: string) => {
    const o = offers.find((x) => x.id === id);
    if (!o) return;
    const ok = confirm(`Supprimer l’offre "${o.title}" ?`);
    if (!ok) return;
    setOffers((prev) => prev.filter((x) => x.id !== id));
    if (editingId === id) resetForm();
    setStatus({ type: 'ok', msg: '🗑️ Offre supprimée.' });
  };

  const clearAll = () => {
    const ok = confirm('Tout effacer (localStorage inclus) ?');
    if (!ok) return;

    setOffers([]);
    resetForm();

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Impossible de nettoyer le localStorage', error);
    }

    setStatus({ type: 'ok', msg: '🧼 Tout a été effacé.' });
  };

  /** Copie le JSON dans le presse-papiers */
  const copyJson = async () => {
    try {
      const json = JSON.stringify(offers, null, 2);
      await navigator.clipboard.writeText(json);
      setStatus({ type: 'ok', msg: '📋 JSON copié.' });
    } catch {
      setStatus({ type: 'err', msg: '❌ Erreur de copie.' });
    }
  };

  /** Copie un snippet prêt à coller dans offers.ts */
  const copyOffersSnippet = async () => {
    try {
      const snippet =
        "import type { Offer } from '@/types/offer';\n\n" +
        `export const OFFERS: Offer[] = ${JSON.stringify(offers, null, 2)};\n`;
      await navigator.clipboard.writeText(snippet);
      setStatus({ type: 'ok', msg: '📄 Snippet offers.ts copié (prêt à coller).' });
    } catch {
      setStatus({ type: 'err', msg: '❌ Erreur de copie.' });
    }
  };

  const previewJson = useMemo(() => JSON.stringify(offers, null, 2), [offers]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* FORM */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">
            {editingId ? '✏️ Modifier une offre' : '➕ Créer une offre'}
          </h2>

          <label className="flex items-center gap-2 text-sm">
            <input
              name="published"
              type="checkbox"
              checked={!!form.published}
              onChange={handleChange}
            />
            Publiée
          </label>
        </div>

        {status && (
          <div
            className={`mb-4 rounded-lg p-3 text-sm ${
              status.type === 'ok'
                ? 'bg-green-50 text-green-800'
                : status.type === 'warn'
                  ? 'bg-yellow-50 text-yellow-800'
                  : 'bg-red-50 text-red-800'
            }`}
          >
            {status.msg}
          </div>
        )}

        <input
          name="title"
          placeholder="Titre de l'offre"
          value={form.title}
          onChange={handleChange}
          className="input input-bordered mb-3 w-full"
        />

        <textarea
          name="description"
          placeholder="Description (facultative)"
          value={form.description || ''}
          onChange={handleChange}
          className="input input-bordered mb-3 h-24 w-full resize-none"
        />

        <input
          name="vendor"
          placeholder="Vendeur / marque (facultatif)"
          value={form.vendor || ''}
          onChange={handleChange}
          className="input input-bordered mb-3 w-full"
        />

        <input
          name="priceFrom"
          type="number"
          placeholder="Prix à partir de (ex: 79.99)"
          value={form.priceFrom ?? ''}
          onChange={handleChange}
          className="input input-bordered mb-3 w-full"
        />

        <input
          name="url"
          placeholder="Lien vers l'offre (https://...)"
          value={form.url}
          onChange={handleChange}
          className="input input-bordered mb-3 w-full"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            name="imageSrc"
            placeholder="URL de l’image (https://...)"
            value={form.image.src}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            name="imageAlt"
            placeholder="Texte alternatif (SEO)"
            value={form.image.alt}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        {form.image.src && (
          <div className="mt-4 text-center">
            {/* (Si tu veux passer en next/image plus tard, on peut) */}
            <img
              src={form.image.src}
              alt={form.image.alt || 'Aperçu'}
              className="mx-auto h-28 w-48 rounded object-cover shadow-sm"
            />
          </div>
        )}

        <select
          name="categories"
          value={form.categories?.[0] || 'autre'}
          onChange={handleChange}
          className="input input-bordered mt-4 w-full"
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={upsertOffer}
            className="btn btn-primary rounded-lg px-6 py-2 shadow hover:opacity-90"
          >
            {editingId ? '✅ Mettre à jour' : '➕ Ajouter'}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="btn btn-outline rounded-lg px-6 py-2 shadow hover:opacity-90"
            >
              ↩️ Annuler
            </button>
          )}

          <button
            onClick={copyJson}
            className="btn btn-secondary rounded-lg px-6 py-2 shadow hover:opacity-90"
          >
            📋 Copier JSON
          </button>

          <button
            onClick={copyOffersSnippet}
            className="btn btn-accent rounded-lg px-6 py-2 shadow hover:opacity-90"
          >
            📄 Copier snippet offers.ts
          </button>

          <button
            onClick={clearAll}
            className="btn btn-ghost rounded-lg px-6 py-2 hover:opacity-90"
          >
            🧼 Tout effacer
          </button>
        </div>
      </div>

      {/* LIST + PREVIEW */}
      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-3 flex items-center justify-between">
          <H2 className="text-lg font-semibold">Offres enregistrées</H2>
          <span className="text-sm text-gray-600">{offers.length} offre(s)</span>
        </div>

        {offers.length === 0 ? (
          <p className="text-sm text-gray-600">
            Rien pour le moment. Crée une offre à gauche — et tu vas sentir ton site devenir plus
            vivant 👌
          </p>
        ) : (
          <div className="space-y-3">
            {offers.map((o) => (
              <div key={o.id} className="rounded-lg border p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{o.title}</p>
                      {!o.published && (
                        <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                          Non publiée
                        </span>
                      )}
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
                        {o.categories?.[0] || 'autre'}
                      </span>
                    </div>
                    <p className="mt-1 break-all text-xs text-gray-600">/{o.slug}</p>
                    {o.priceFrom ? (
                      <p className="mt-1 text-sm">
                        À partir de{' '}
                        <span className="font-semibold">
                          {o.priceFrom} {o.currency || 'CAD'}
                        </span>
                      </p>
                    ) : null}
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button onClick={() => editOffer(o.id)} className="btn btn-outline btn-sm">
                      ✏️
                    </button>
                    <button onClick={() => removeOffer(o.id)} className="btn btn-outline btn-sm">
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {offers.length > 0 && (
          <div className="mt-6">
            <H2 className="mb-2 text-lg font-semibold">Aperçu JSON</H2>
            <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded bg-gray-100 p-4 text-sm">
              {previewJson}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
