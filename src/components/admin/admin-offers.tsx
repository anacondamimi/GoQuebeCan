'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Offer, OfferCategory } from '@/types/offer';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

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

export default function AdminOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [form, setForm] = useState<Offer>(emptyOffer);

  /** Gère les changements de champ texte, select et textarea */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    if (name === 'imageSrc') {
      setForm((prev) => ({ ...prev, image: { ...prev.image, src: value } }));
    } else if (name === 'imageAlt') {
      setForm((prev) => ({ ...prev, image: { ...prev.image, alt: value } }));
    } else if (name === 'categories') {
      setForm((prev) => ({
        ...prev,
        categories: [value as OfferCategory],
      }));
    } else if (name === 'priceFrom') {
      setForm((prev) => ({
        ...prev,
        priceFrom: Number(value) || undefined,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  /** Ajoute une nouvelle offre */
  const addOffer = () => {
    const isComplete = form.title.trim() && form.image.src.trim() && form.url.trim();

    if (!isComplete) {
      alert('⚠️ Merci de remplir au minimum le titre, l’image et le lien.');
      return;
    }

    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const offerToAdd: Offer = {
      ...form,
      id: uuidv4(),
      slug,
      published: true,
    };

    setOffers((prev) => [...prev, offerToAdd]);
    setForm(emptyOffer);
    alert('✅ Offre ajoutée avec succès !');
  };

  /** Copie le JSON dans le presse-papiers */
  const copyToClipboard = async () => {
    try {
      const json = JSON.stringify(offers, null, 2);
      await navigator.clipboard.writeText(json);
      alert('📋 JSON copié dans le presse-papiers');
    } catch {
      alert('❌ Erreur de copie.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md">
      <H1 className="mb-6 text-center text-2xl font-bold">🛠️ Admin — Créer une offre spéciale</H1>

      {/* Champs principaux */}
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
        name="priceFrom"
        type="number"
        placeholder="Prix à partir de (ex: 79.99)"
        value={form.priceFrom ?? ''}
        onChange={handleChange}
        className="input input-bordered mb-3 w-full"
      />

      <input
        name="url"
        placeholder="Lien vers l'offre"
        value={form.url}
        onChange={handleChange}
        className="input input-bordered mb-3 w-full"
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          name="imageSrc"
          placeholder="URL de l’image"
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
          <img
            src={form.image.src}
            alt={form.image.alt || 'Aperçu'}
            className="mx-auto h-28 w-48 rounded object-cover shadow-sm"
          />
        </div>
      )}

      <select
        name="categories"
        value={form.categories?.[0] || ''}
        onChange={handleChange}
        className="input input-bordered mt-4 w-full"
      >
        <option value="">Catégorie</option>
        <option value="hotel">Hôtel</option>
        <option value="forfait">Forfait</option>
        <option value="activite">Activité</option>
        <option value="transport">Transport</option>
        <option value="train">Train</option>
        <option value="autre">Autre</option>
      </select>

      <div className="mt-6 flex justify-center gap-3">
        <button
          onClick={addOffer}
          className="btn btn-primary rounded-lg px-6 py-2 shadow hover:opacity-90"
        >
          ➕ Ajouter
        </button>
        <button
          onClick={copyToClipboard}
          className="btn btn-secondary rounded-lg px-6 py-2 shadow hover:opacity-90"
        >
          📋 Copier JSON
        </button>
      </div>

      {offers.length > 0 && (
        <div className="mt-6">
          <H2 className="mb-2 text-lg font-semibold">Aperçu JSON :</H2>
          <pre className="overflow-x-auto whitespace-pre-wrap rounded bg-gray-100 p-4 text-sm">
            {JSON.stringify(offers, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
