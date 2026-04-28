'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { supabaseBrowser as supabase } from '@/lib/supabase-browser';

type CommunityItinerary = {
  id: string;
  title: string;
  summary: string;
  author_name: string | null;
  author_email: string | null;
  status: 'pending' | 'approved' | 'rejected';
  step_count: number | null;
  region: string | null;
  slug: string | null;
  created_at: string | null;
  approved_at: string | null;
  rejected_at: string | null;
  pdf_url: string | null;
};

type StatusFilter = 'all' | 'pending' | 'approved' | 'rejected';
type ContentFilter = 'all' | 'classic' | 'pdf';

function formatDate(value: string | null): string {
  if (!value) return '—';

  try {
    return new Date(value).toLocaleString('fr-CA', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } catch {
    return value;
  }
}

export default function AdminCommunityItinerariesClient() {
  const [items, setItems] = useState<CommunityItinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [contentFilter, setContentFilter] = useState<ContentFilter>('all');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const loadItems = async () => {
    setLoading(true);
    setStatusMsg(null);

    const { data, error } = await supabase
      .from('community_itineraries')
      .select(
        `
  id,
  title,
  summary,
  author_name,
  author_email,
  status,
  step_count,
  region,
  slug,
  created_at,
  approved_at,
  rejected_at,
  pdf_url
`,
      )
      .order('created_at', { ascending: false });

    if (error) {
      setStatusMsg(`Chargement impossible : ${error.message}`);
      setItems([]);
      setLoading(false);
      return;
    }

    setItems((data as CommunityItinerary[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    void loadItems();
  }, []);

  const filteredItems = useMemo(() => {
    let result = items;

    if (filter !== 'all') {
      result = result.filter((item) => item.status === filter);
    }

    if (contentFilter === 'pdf') {
      result = result.filter((item) => Boolean(item.pdf_url));
    } else if (contentFilter === 'classic') {
      result = result.filter((item) => !item.pdf_url);
    }

    return result;
  }, [items, filter, contentFilter]);

  const counts = useMemo(() => {
    const total = items.length;
    const pending = items.filter((item) => item.status === 'pending').length;
    const approved = items.filter((item) => item.status === 'approved').length;
    const rejected = items.filter((item) => item.status === 'rejected').length;
    const pdf = items.filter((item) => Boolean(item.pdf_url)).length;
    const classic = items.filter((item) => !item.pdf_url).length;

    return { total, pending, approved, rejected, pdf, classic };
  }, [items]);

  const handleApprove = async (id: string) => {
    try {
      setBusyId(id);
      setStatusMsg(null);

      const res = await fetch('/api/community-itineraries/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };

      if (!res.ok || !data.ok) {
        setStatusMsg(data.error || 'Validation impossible.');
        return;
      }

      setStatusMsg('Contenu validé avec succès.');
      await loadItems();
    } catch {
      setStatusMsg('Erreur réseau pendant la validation.');
    } finally {
      setBusyId(null);
    }
  };

  const handleReject = async (id: string) => {
    const validationNote = window.prompt('Motif du refus (facultatif) :') || '';

    try {
      setBusyId(id);
      setStatusMsg(null);

      const res = await fetch('/api/community-itineraries/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, validationNote }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };

      if (!res.ok || !data.ok) {
        setStatusMsg(data.error || 'Refus impossible.');
        return;
      }

      setStatusMsg('Contenu refusé.');
      await loadItems();
    } catch {
      setStatusMsg('Erreur réseau pendant le refus.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{counts.total}</p>
        </div>

        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">En attente</p>
          <p className="mt-1 text-2xl font-semibold text-amber-600">{counts.pending}</p>
        </div>

        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Validés</p>
          <p className="mt-1 text-2xl font-semibold text-green-600">{counts.approved}</p>
        </div>

        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Refusés</p>
          <p className="mt-1 text-2xl font-semibold text-red-600">{counts.rejected}</p>
        </div>

        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">PDF externes</p>
          <p className="mt-1 text-2xl font-semibold text-blue-600">{counts.pdf}</p>
        </div>

        <div className="rounded-2xl border bg-white p-4 shadow-sm">
          <p className="text-sm text-gray-500">Itinéraires classiques</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{counts.classic}</p>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div>
              <label
                htmlFor="filter-status"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Statut
              </label>
              <select
                id="filter-status"
                value={filter}
                onChange={(e) => setFilter(e.target.value as StatusFilter)}
                className="rounded-xl border px-3 py-2 text-sm"
              >
                <option value="pending">En attente</option>
                <option value="approved">Validés</option>
                <option value="rejected">Refusés</option>
                <option value="all">Tous</option>
              </select>
            </div>

            <div>
              <label htmlFor="filter-type" className="mb-1 block text-sm font-medium text-gray-700">
                Type
              </label>
              <select
                id="filter-type"
                value={contentFilter}
                onChange={(e) => setContentFilter(e.target.value as ContentFilter)}
                className="rounded-xl border px-3 py-2 text-sm"
              >
                <option value="all">Tous</option>
                <option value="classic">Itinéraires classiques</option>
                <option value="pdf">PDF externes</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={() => void loadItems()}
            className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Rafraîchir
          </button>
        </div>
      </section>

      {statusMsg && (
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
          {statusMsg}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-600">Chargement…</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-gray-700">Aucun contenu trouvé pour ce filtre.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredItems.map((item) => {
            const isPdf = Boolean(item.pdf_url);
            const publicUrl = item.slug ? `/partage/${item.slug}` : null;

            return (
              <article key={item.id} className="rounded-2xl border bg-white p-5 shadow-sm">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {item.title || 'Sans titre'}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : item.status === 'rejected'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {item.status === 'pending'
                          ? 'En attente'
                          : item.status === 'approved'
                            ? 'Validé'
                            : 'Refusé'}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          isPdf ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {isPdf ? 'PDF externe' : 'Itinéraire classique'}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500">
                      {item.pdf_url ? 'PDF externe' : 'Itinéraire classique'}
                      {item.region ? ` • ${item.region}` : ''}
                      {item.step_count ? ` • ${item.step_count} étape(s)` : ''}
                    </p>
                  </div>

                  <div className="text-right text-sm text-gray-500">
                    {item.slug ? <p>Slug : /partage/{item.slug}</p> : <p>Slug non généré</p>}
                    <p>Créé le : {formatDate(item.created_at)}</p>
                    {item.approved_at && <p>Validé le : {formatDate(item.approved_at)}</p>}
                    {item.rejected_at && <p>Refusé le : {formatDate(item.rejected_at)}</p>}
                  </div>
                </div>

                <div className="mb-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="mb-2 text-sm font-semibold text-gray-800">Résumé</p>
                    <p className="text-sm text-gray-700">
                      {item.summary?.trim() || 'Aucun résumé fourni.'}
                    </p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="mb-2 text-sm font-semibold text-gray-800">Informations auteur</p>
                    <div className="space-y-1 text-sm text-gray-700">
                      <p>Auteur : {item.author_name || 'Non renseigné'}</p>
                      <p>Email : {item.author_email || 'Non renseigné'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {item.status !== 'approved' && (
                    <button
                      type="button"
                      onClick={() => void handleApprove(item.id)}
                      disabled={busyId === item.id}
                      className="rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
                    >
                      {busyId === item.id ? 'Validation…' : 'Valider'}
                    </button>
                  )}

                  {item.status !== 'rejected' && (
                    <button
                      type="button"
                      onClick={() => void handleReject(item.id)}
                      disabled={busyId === item.id}
                      className="rounded-xl border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
                    >
                      {busyId === item.id ? 'Traitement…' : 'Refuser'}
                    </button>
                  )}

                  {isPdf && item.pdf_url && (
                    <a
                      href={item.pdf_url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Ouvrir le PDF
                    </a>
                  )}

                  {publicUrl && item.status === 'approved' && (
                    <a
                      href={publicUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Voir la page publique
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
