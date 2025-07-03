'use client';
import React, { useState } from 'react';

export default function AdminDashboard() {
  const [asin, setAsin] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [file, setFile] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(`✅ Produit ${asin} ajouté dans ${file} (simulé)`);
    setAsin('');
    setCategory('');
    setFile('');
  };

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">🛠️ Dashboard Admin</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="ASIN"
          value={asin}
          onChange={(e) => setAsin(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Nom du fichier JSON"
          value={file}
          onChange={(e) => setFile(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Ajouter Produit
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </main>
  );
}
