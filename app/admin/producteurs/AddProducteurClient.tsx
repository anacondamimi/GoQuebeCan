'use client';

import React, { useEffect, useId, useMemo, useState } from 'react';
import H2 from '@/components/typography/H2';
import { supabaseBrowser as supabase } from '@/lib/supabase-browser';

type ProducteurForm = {
  nom: string;
  email: string; // optionnel
  type: string; // optionnel
  description: string;
  site_web: string; // optionnel
  localisation: string; // optionnel
};

type ProducteurRow = {
  id: string;
  nom: string | null;
  email: string | null;
  type: string | null;
  description: string | null;
  site_web: string | null;
  localisation: string | null;
  created_at?: string | null;
};

function isNonEmpty(v: string): boolean {
  return v.trim().length > 0;
}
function isEmail(v: string): boolean {
  if (v.trim() === '') return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isUrl(v: string): boolean {
  if (v.trim() === '') return true;
  return /^https?:\/\/[^\s.]+\.[^\s]+/i.test(v.trim());
}
function normalizeUrl(v: string): string {
  const s = v.trim();
  if (s === '' || /^https?:\/\//i.test(s)) return s;
  return `https://${s}`;
}

const emptyForm: ProducteurForm = {
  nom: '',
  email: '',
  type: '',
  description: '',
  site_web: '',
  localisation: '',
};

export default function AddProducteurClient() {
  const [form, setForm] = useState<ProducteurForm>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState<{ type: 'ok' | 'warn' | 'err'; msg: string } | null>(null);

  const [items, setItems] = useState<ProducteurRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  // Ids labels/aria
  const nomId = useId();
  const emailId = useId();
  const typeId = useId();
  const siteId = useId();
  const locId = useId();
  const descId = useId();

  const derived = useMemo(() => {
    const normalizedSite = normalizeUrl(form.site_web);
    const fieldsOk =
      isNonEmpty(form.nom) &&
      isNonEmpty(form.description) &&
      isEmail(form.email) &&
      isUrl(normalizedSite);
    return { normalizedSite, fieldsOk };
  }, [form]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter((p) => {
      const hay = [
        p.nom ?? '',
        p.type ?? '',
        p.localisation ?? '',
        p.email ?? '',
        p.site_web ?? '',
        p.description ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [items, query]);

  const handleChange =
    (key: keyof ProducteurForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { value } = e.target;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const loadProducteurs = async () => {
    setIsLoading(true);
    try {
      // Si ta table n'a pas created_at, supprime l'order() et le champ dans ProducteurRow.
      const { data, error } = await supabase
        .from('producteurs')
        .select('id, nom, email, type, description, site_web, localisation, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        setStatus({ type: 'err', msg: `❌ Chargement impossible: ${error.message}` });
        return;
      }
      setItems((data as ProducteurRow[]) ?? []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erreur inattendue';
      setStatus({ type: 'err', msg: `❌ ${msg}` });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadProducteurs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = () => {
    if (!isNonEmpty(form.nom)) return 'Le nom est requis.';
    if (!isNonEmpty(form.description)) return 'La description est requise.';
    if (!isEmail(form.email)) return "L'email ne semble pas valide.";
    if (!isUrl(derived.normalizedSite)) return "L'URL du site web n'est pas valide.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus(null);

    const err = validate();
    if (err) {
      setStatus({ type: 'warn', msg: `⚠️ ${err}` });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        nom: form.nom.trim(),
        email: form.email.trim() || null,
        type: form.type.trim() || null,
        description: form.description.trim(),
        site_web: derived.normalizedSite.trim() || null,
        localisation: form.localisation.trim() || null,
      };

      const { error } = await supabase.from('producteurs').insert([payload]);

      if (error) {
        setStatus({ type: 'err', msg: `❌ ${error.message || 'Erreur Supabase.'}` });
        return;
      }

      setStatus({ type: 'ok', msg: '✅ Producteur ajouté.' });
      setForm(emptyForm);
      await loadProducteurs();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Une erreur inattendue s'est produite.";
      setStatus({ type: 'err', msg: `❌ ${msg}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeProducteur = async (id: string, nom?: string | null) => {
    const ok = confirm(`Supprimer le producteur${nom ? ` "${nom}"` : ''} ?`);
    if (!ok) return;

    setStatus(null);
    try {
      const { error } = await supabase.from('producteurs').delete().eq('id', id);
      if (error) {
        setStatus({ type: 'err', msg: `❌ Suppression impossible: ${error.message}` });
        return;
      }
      setStatus({ type: 'ok', msg: '🗑️ Producteur supprimé.' });
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erreur inattendue';
      setStatus({ type: 'err', msg: `❌ ${msg}` });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* FORM */}
      <form
        onSubmit={(ev) => void handleSubmit(ev)}
        className="space-y-4 rounded-xl border bg-white p-6 shadow"
        noValidate
      >
        <H2 className="text-xl font-bold">➕ Ajouter un producteur</H2>

        {status && (
          <div
            className={`rounded-lg p-3 text-sm ${
              status.type === 'ok'
                ? 'bg-green-50 text-green-800'
                : status.type === 'warn'
                  ? 'bg-yellow-50 text-yellow-800'
                  : 'bg-red-50 text-red-800'
            }`}
            aria-live="polite"
          >
            {status.msg}
          </div>
        )}

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
          {form.site_web.trim() !== '' && derived.normalizedSite !== form.site_web.trim() && (
            <p className="mt-1 text-xs text-gray-600">Auto-corrigé: {derived.normalizedSite}</p>
          )}
        </div>

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
            rows={4}
            required
            className="w-full rounded border p-2"
            aria-invalid={form.description !== '' && !isNonEmpty(form.description)}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting || !derived.fieldsOk}
            className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {isSubmitting ? 'Enregistrement…' : 'Ajouter'}
          </button>

          <button
            type="button"
            onClick={() => {
              setForm(emptyForm);
              setStatus(null);
            }}
            className="rounded border px-4 py-2 hover:bg-gray-50"
          >
            Réinitialiser
          </button>

          <button
            type="button"
            onClick={() => void loadProducteurs()}
            className="rounded border px-4 py-2 hover:bg-gray-50"
            disabled={isLoading}
          >
            {isLoading ? 'Chargement…' : 'Rafraîchir'}
          </button>
        </div>
      </form>

      {/* LIST */}
      <div className="rounded-xl border bg-white p-6 shadow">
        <div className="mb-3 flex items-center justify-between gap-3">
          <H2 className="text-xl font-bold">📋 Producteurs</H2>
          <span className="text-sm text-gray-600">
            {filtered.length} / {items.length}
          </span>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher (nom, type, ville, email...)"
          className="mb-4 w-full rounded border p-2"
        />

        {isLoading ? (
          <p className="text-sm text-gray-600">Chargement…</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-600">Aucun producteur trouvé.</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => (
              <div key={p.id} className="rounded-lg border p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold">{p.nom ?? '(Sans nom)'}</p>
                    <p className="mt-1 text-xs text-gray-600">
                      {p.type ? `${p.type} • ` : ''}
                      {p.localisation ?? ''}
                    </p>
                    {p.site_web ? (
                      <p className="mt-1 break-all text-xs text-gray-600">{p.site_web}</p>
                    ) : null}
                    {p.email ? <p className="mt-1 text-xs text-gray-600">{p.email}</p> : null}
                  </div>

                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => void removeProducteur(p.id, p.nom)}
                      className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {p.description ? (
                  <p className="mt-2 text-sm text-gray-700">{p.description}</p>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
