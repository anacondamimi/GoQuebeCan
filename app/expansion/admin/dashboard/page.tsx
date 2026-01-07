'use client';
import React, { useId, useMemo, useState } from 'react';
import H1 from '@/components/typography/H1';

type AdminForm = {
  asin: string;
  category: string;
  file: string; // ex: produits.json
};

function isValidASIN(v: string): boolean {
  // ASIN classique = 10 caractères alphanum (souvent A-Z0-9). On tolère maj/min.
  return /^[A-Z0-9]{10}$/i.test(v.trim());
}

function isValidJsonFilename(v: string): boolean {
  // doit finir par .json (ex: produits.json)
  return /^[\w\-./]+\.json$/i.test(v.trim());
}

export default function AdminDashboard() {
  const [form, setForm] = useState<AdminForm>({ asin: '', category: '', file: '' });
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const asinId = useId();
  const catId = useId();
  const fileId = useId();

  const isFormValid = useMemo(() => {
    return (
      isValidASIN(form.asin) && form.category.trim().length > 0 && isValidJsonFilename(form.file)
    );
  }, [form]);

  const handleChange =
    (key: keyof AdminForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
      const { value } = e.target;
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!isFormValid) {
      setStatus('error');
      setMessage('❌ Formulaire invalide. Vérifie l’ASIN et le nom du fichier (.json).');
      return;
    }

    // 👉 ici tu brancheras ton vrai appel API / action serveur
    setStatus('success');
    setMessage(`✅ Produit ${form.asin} ajouté dans ${form.file} (simulé)`);

    // reset
    setForm({ asin: '', category: '', file: '' });
  };

  return (
    <main className="mx-auto max-w-md p-6">
      <H1 className="mb-4 text-center text-2xl font-bold">🛠️ Dashboard Admin</H1>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* ASIN */}
        <div>
          <label htmlFor={asinId} className="mb-1 block text-sm font-medium">
            ASIN
          </label>
          <input
            id={asinId}
            type="text"
            placeholder="Ex: B08N5WRWNW"
            value={form.asin}
            onChange={(e) => setForm((p) => ({ ...p, asin: e.target.value.toUpperCase() }))}
            required
            pattern="[A-Za-z0-9]{10}"
            maxLength={10}
            inputMode="text" // ✅ au lieu de "latin"
            autoCapitalize="characters"
            className="w-full rounded border p-2"
            aria-invalid={form.asin !== '' && !/^[A-Z0-9]{10}$/.test(form.asin)}
          />
          <p id={`${asinId}-hint`} className="mt-1 text-xs text-gray-500">
            10 caractères alphanumériques.
          </p>
        </div>

        {/* Catégorie */}
        <div>
          <label htmlFor={catId} className="mb-1 block text-sm font-medium">
            Catégorie
          </label>
          <input
            id={catId}
            type="text"
            placeholder="Catégorie (ex: camping)"
            value={form.category}
            onChange={handleChange('category')}
            required
            className="w-full rounded border p-2"
          />
        </div>

        {/* Fichier JSON */}
        <div>
          <label htmlFor={fileId} className="mb-1 block text-sm font-medium">
            Nom du fichier JSON
          </label>
          <input
            id={fileId}
            type="text"
            placeholder="produits.json"
            value={form.file}
            onChange={handleChange('file')}
            required
            pattern="^[\w\-./]+\.json$"
            className="w-full rounded border p-2"
            aria-invalid={form.file !== '' && !isValidJsonFilename(form.file)}
            aria-describedby={`${fileId}-hint`}
          />
          <p id={`${fileId}-hint`} className="mt-1 text-xs text-gray-500">
            Doit se terminer par <code>.json</code>.
          </p>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          Ajouter Produit
        </button>

        <p
          className={`mt-4 min-h-5 text-center text-sm ${
            status === 'success' ? 'text-green-700' : status === 'error' ? 'text-red-700' : ''
          }`}
          aria-live="polite"
        >
          {message}
        </p>
      </form>
    </main>
  );
}
