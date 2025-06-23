'use client';
import React from 'react';

import { useState } from 'react';
import { supabase } from '@/components/lib/supabase';

export default function AddProducteur() {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    type: '',
    description: '',
    site_web: '',
    localisation: '',
  });

  const [confirmation, setConfirmation] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('producteurs').insert([form]);

    if (error) setConfirmation("❌ Erreur lors de l'ajout");
    else {
      setConfirmation('✅ Producteur ajouté !');
      setForm({ nom: '', email: '', type: '', description: '', site_web: '', localisation: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-white shadow mb-8">
      <h2 className="text-xl font-bold">➕ Ajouter un producteur</h2>
      <input
        name="nom"
        placeholder="Nom du producteur"
        value={form.nom}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="type"
        placeholder="Type (ferme, microbrasserie…)"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="site_web"
        placeholder="Site web (URL)"
        value={form.site_web}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        name="localisation"
        placeholder="Localisation (ville, région…)"
        value={form.localisation}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Description courte"
        value={form.description}
        onChange={handleChange}
        rows={3}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
        Ajouter
      </button>
      {confirmation && <p className="text-green-600">{confirmation}</p>}
    </form>
  );
}
