'use client';

import { useState } from 'react';
import { saveFeedback } from '@/components/lib/saveFeedback';

export default function ContactPage() {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    message: '',
    type: 'contact',
  });

  const [confirmation, setConfirmation] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await saveFeedback(form);

    if (error) {
      setConfirmation("❌ Une erreur s'est produite. Merci de réessayer.");
    } else {
      setConfirmation('✅ Merci ! Votre message a bien été envoyé.');
      setForm({ nom: '', email: '', message: '', type: 'contact' });
    }
  };

  return (
    <main className="min-h-screen px-4 py-20 bg-gray-50 flex items-center justify-center">
      <div className="max-w-xl bg-white p-8 rounded-lg shadow-lg text-center border w-full">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">📬 Contact</h1>

        <p className="mb-6 text-gray-600">
          Vous êtes producteur local, voyageur, ou souhaitez partager un itinéraire ?  
          Remplissez ce formulaire, nous vous répondrons rapidement.
        </p>

        {/* Message spécifique si type = itineraire */}
        {form.type === 'itineraire' && (
          <div className="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-700 p-3 rounded text-sm text-left">
            🧭 <strong>Vous souhaitez partager un itinéraire ?</strong><br />
            Merci de remplir ce formulaire puis d’envoyer votre PDF à :<br />
            <span className="text-indigo-700 font-medium">📧 contact@goquebecan.com</span>
          </div>
        )}

        {/* Message spécifique si type = producteur */}
        {form.type === 'producteur' && (
          <div className="mb-4 bg-blue-50 border border-blue-400 text-blue-700 p-3 rounded text-sm text-left">
            🏞️ <strong>Vous êtes un producteur local ?</strong><br />
            Merci de remplir ce formulaire puis d’envoyer une ou plusieurs photos de votre ferme à :<br />
            <span className="text-indigo-700 font-medium">📧 contact@goquebecan.com</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="contact">📩 Contacter l'équipe</option>
            <option value="producteur">🏞️ Je suis un producteur local</option>
            <option value="itineraire">🧭 Partager un itinéraire de voyage</option>
          </select>

          <input
            type="text"
            name="nom"
            placeholder="Votre nom"
            value={form.nom}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Votre adresse email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <textarea
            name="message"
            placeholder={
              form.type === 'itineraire'
                ? "Décrivez brièvement votre itinéraire : région, durée, thèmes, etc."
                : form.type === 'producteur'
                ? "Décrivez votre activité (type de production, localisation, etc.)"
                : "Votre message"
            }
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Envoyer
          </button>
        </form>

        {confirmation && (
          <p className="mt-4 text-sm text-green-600">{confirmation}</p>
        )}
      </div>
    </main>
  );
}
