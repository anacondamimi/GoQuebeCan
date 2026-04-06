'use client';

import { useState } from 'react';

type ApiResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo

export default function SubmitPdfForm() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const file = formData.get('file');
    const name = formData.get('name');
    const email = formData.get('email');
    const title = formData.get('title');

    if (typeof name !== 'string' || !name.trim()) {
      setLoading(false);
      setErrorMessage('Veuillez indiquer votre nom ou prénom.');
      return;
    }

    if (typeof email !== 'string' || !email.trim()) {
      setLoading(false);
      setErrorMessage('Veuillez indiquer votre email.');
      return;
    }

    if (typeof title !== 'string' || !title.trim()) {
      setLoading(false);
      setErrorMessage('Veuillez indiquer un titre pour l’itinéraire.');
      return;
    }

    if (!(file instanceof File) || file.size === 0) {
      setLoading(false);
      setErrorMessage('Veuillez sélectionner un fichier PDF.');
      return;
    }

    if (file.type !== 'application/pdf') {
      setLoading(false);
      setErrorMessage('Seuls les fichiers PDF sont acceptés.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setLoading(false);
      setErrorMessage('Le fichier dépasse la limite de 10 Mo.');
      return;
    }

    try {
      const res = await fetch('/api/send-pdf', {
        method: 'POST',
        body: formData,
      });

      let data: ApiResponse | null = null;

      try {
        data = (await res.json()) as ApiResponse;
      } catch {
        data = null;
      }

      if (!res.ok) {
        setErrorMessage(data?.error || 'Une erreur est survenue lors de l’envoi.');
        return;
      }

      setSuccessMessage(
        data?.message || 'Merci, votre PDF a bien été envoyé et sera vérifié avant publication.',
      );
      form.reset();
    } catch {
      setErrorMessage('Erreur réseau ou serveur. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Partager un itinéraire en PDF</h2>
        <p className="mt-2 text-sm text-slate-600">
          Vous avez déjà créé votre itinéraire ailleurs ? Envoyez votre PDF ici. Il sera vérifié
          avant publication.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
            Votre prénom ou nom
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
            placeholder="Ex. Mathieu"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Votre email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
            placeholder="exemple@email.com"
          />
        </div>

        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
            Titre de l’itinéraire
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
            placeholder="Ex. Vacances Côte-Nord 7 jours"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-700">
            Petit message (optionnel)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
            placeholder="Ex. Un super itinéraire pour l’été, avec beaux points de vue et arrêts faciles."
          />
        </div>

        <div>
          <label htmlFor="file" className="mb-1 block text-sm font-medium text-slate-700">
            Fichier PDF
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept="application/pdf,.pdf"
            required
            className="block w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
          />
          <p className="mt-1 text-xs text-slate-500">
            Format accepté : PDF uniquement, maximum 10 Mo.
          </p>
        </div>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {successMessage ? (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Envoi en cours...' : 'Partager mon PDF'}
        </button>
      </form>
    </section>
  );
}
