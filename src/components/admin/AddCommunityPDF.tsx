'use client';
import React from 'react';

import { useState } from 'react';
import { supabase } from '@/components/lib/supabase'; // ✅ corrigé

export default function AddCommunityPDF() {
  const [form, setForm] = useState({
    titre: '',
    lien_pdf: '',
    image_url: '',
    auteur: '',
  });
  const [confirmation, setConfirmation] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('community_pdfs').insert([form]);

    if (error) setConfirmation('❌ Erreur');
    else {
      setConfirmation('✅ PDF ajouté');
      setForm({ titre: '', lien_pdf: '', image_url: '', auteur: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 border rounded-lg bg-white shadow">
      <h2 className="text-xl font-bold">Ajouter un itinéraire PDF</h2>
      <input
        name="titre"
        placeholder="Titre"
        value={form.titre}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="lien_pdf"
        placeholder="Lien vers le PDF"
        value={form.lien_pdf}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="image_url"
        placeholder="Image (URL)"
        value={form.image_url}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="auteur"
        placeholder="Auteur"
        value={form.auteur}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Enregistrer
      </button>
      {confirmation && <p className="text-green-600">{confirmation}</p>}
    </form>
  );
}
