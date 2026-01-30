'use client';

import React, { useEffect, useMemo, useState } from 'react';
import H2 from '@/components/typography/H2';
import { supabaseBrowser as supabase } from '@/lib/supabase-browser';

type PdfForm = {
  title: string;
  drive_url: string;
  description: string;
};

type PdfRow = {
  id: string;
  title: string | null;
  drive_url: string | null;
  description: string | null;
  created_at?: string | null;
};

const emptyForm: PdfForm = {
  title: '',
  drive_url: '',
  description: '',
};

// Accepte http(s) et drive
function isHttpUrl(u: string) {
  try {
    const url = new URL(u);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// Convertit un lien Google Drive "view" en lien direct "uc?export=download&id=..."
function normalizeDriveUrl(input: string): string {
  const s = input.trim();
  if (!s) return s;

  // Déjà un lien direct
  if (s.includes('uc?export=download')) return s;

  // Forme: https://drive.google.com/file/d/<ID>/view?...
  const m1 = s.match(/drive\.google\.com\/file\/d\/([^/]+)\//i);
  if (m1?.[1]) return `https://drive.google.com/uc?export=download&id=${m1[1]}`;

  // Forme: https://drive.google.com/open?id=<ID>
  const m2 = s.match(/[?&]id=([^&]+)/i);
  if (m2?.[1] && s.includes('drive.google.com')) {
    return `https://drive.google.com/uc?export=download&id=${m2[1]}`;
  }

  // Sinon, on retourne tel quel (peut être un lien pdf direct)
  return s;
}

function looksLikePdfUrl(u: string) {
  // tolérant: soit ça finit par .pdf, soit drive
  const s = u.toLowerCase();
  return s.includes('drive.google.com') || s.includes('.pdf') || s.includes('uc?export=download');
}

export default function AddCommunityPDFClient() {
  const [form, setForm] = useState<PdfForm>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status, setStatus] = useState<{ type: 'ok' | 'warn' | 'err'; msg: string } | null>(null);

  const [items, setItems] = useState<PdfRow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  const normalizedUrl = useMemo(() => normalizeDriveUrl(form.drive_url), [form.drive_url]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((p) => {
      const hay = [p.title ?? '', p.description ?? '', p.drive_url ?? ''].join(' ').toLowerCase();
      return hay.includes(q);
    });
  }, [items, query]);

  const loadPdfs = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('community_pdfs')
        .select('id, title, drive_url, description, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        setStatus({ type: 'err', msg: `❌ Chargement impossible: ${error.message}` });
        return;
      }
      setItems((data as PdfRow[]) ?? []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erreur inattendue';
      setStatus({ type: 'err', msg: `❌ ${msg}` });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPdfs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = () => {
    if (!form.title.trim()) return 'Le titre est requis.';
    if (!form.drive_url.trim()) return 'Le lien PDF est requis.';
    if (!isHttpUrl(normalizedUrl)) return 'Le lien doit être une URL valide (http/https).';
    if (!looksLikePdfUrl(normalizedUrl))
      return 'Le lien ne ressemble pas à un PDF (ou Google Drive).';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        title: form.title.trim(),
        drive_url: normalizedUrl.trim(),
        description: form.description.trim() || null,
      };

      const { error } = await supabase.from('community_pdfs').insert([payload]);
      if (error) {
        setStatus({ type: 'err', msg: `❌ ${error.message}` });
        return;
      }

      setStatus({ type: 'ok', msg: '✅ PDF ajouté.' });
      setForm(emptyForm);
      await loadPdfs();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erreur inattendue';
      setStatus({ type: 'err', msg: `❌ ${msg}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removePdf = async (id: string, title?: string | null) => {
    const ok = confirm(`Supprimer le PDF${title ? ` "${title}"` : ''} ?`);
    if (!ok) return;

    setStatus(null);
    try {
      const { error } = await supabase.from('community_pdfs').delete().eq('id', id);
      if (error) {
        setStatus({ type: 'err', msg: `❌ Suppression impossible: ${error.message}` });
        return;
      }
      setStatus({ type: 'ok', msg: '🗑️ PDF supprimé.' });
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
        className="rounded-xl border bg-white p-6 shadow"
      >
        <H2 className="text-xl font-bold">➕ Ajouter un PDF communauté</H2>

        {status && (
          <div
            className={`mt-4 rounded-lg p-3 text-sm ${
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

        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor="Titre" className="mb-1 block text-sm font-medium">
              Titre *
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="w-full rounded border p-2"
              placeholder="Itinéraire : Charlevoix en 3 jours"
              required
            />
          </div>

          <div>
            <label htmlFor="Lien PDF" className="mb-1 block text-sm font-medium">
              Lien PDF (Drive ou URL directe) *
            </label>
            <input
              value={form.drive_url}
              onChange={(e) => setForm((p) => ({ ...p, drive_url: e.target.value }))}
              className="w-full rounded border p-2"
              placeholder="https://drive.google.com/file/d/.../view"
              required
            />
            {form.drive_url.trim() !== '' && normalizedUrl !== form.drive_url.trim() && (
              <p className="mt-1 text-xs text-gray-600">Normalisé: {normalizedUrl}</p>
            )}
          </div>

          <div>
            <label htmlFor="Description" className="mb-1 block text-sm font-medium">
              Description (facultatif)
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              className="w-full rounded border p-2"
              rows={4}
              placeholder="Infos sur le parcours, durée, région, conseils…"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
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
            onClick={() => void loadPdfs()}
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
          <H2 className="text-xl font-bold">📋 PDFs enregistrés</H2>
          <span className="text-sm text-gray-600">
            {filtered.length} / {items.length}
          </span>
        </div>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher (titre, description...)"
          className="mb-4 w-full rounded border p-2"
        />

        {isLoading ? (
          <p className="text-sm text-gray-600">Chargement…</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-600">Aucun PDF trouvé.</p>
        ) : (
          <div className="space-y-3">
            {filtered.map((p) => (
              <div key={p.id} className="rounded-lg border p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold">{p.title ?? '(Sans titre)'}</p>
                    {p.description ? (
                      <p className="mt-1 text-sm text-gray-700">{p.description}</p>
                    ) : null}
                    {p.drive_url ? (
                      <a
                        href={p.drive_url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 block break-all text-xs text-indigo-700 underline"
                      >
                        Ouvrir le PDF
                      </a>
                    ) : null}
                  </div>

                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => void removePdf(p.id, p.title)}
                      className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
