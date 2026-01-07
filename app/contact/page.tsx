'use client';

import React, { useCallback, useState } from 'react';
import { saveContact, type ContactForm } from '@/components/lib/saveContact';
import H1 from '@/components/typography/H1';

type UiContactForm = ContactForm & {
  honey?: string; // honeypot anti-bot (champ caché)
  token?: string; // reCAPTCHA v3 (si tu l’actives plus tard)
};

export default function ContactPage() {
  const [form, setForm] = useState<UiContactForm>({
    nom: '',
    email: '',
    message: '',
    type: 'contact',
    honey: '',
    token: '',
  });
  const [confirmation, setConfirmation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper type-safe pour maj d’un champ
  const setField = useCallback(<K extends keyof UiContactForm>(key: K, value: UiContactForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setConfirmation('');

    try {
      // On n’envoie au backend QUE les champs du ContactForm
      const { nom, email, message, type } = form;
      const result = await saveContact({ nom, email, message, type });

      if (result.success) {
        setConfirmation('✅ Merci ! Votre message a bien été envoyé.');
        setForm({ nom: '', email: '', message: '', type: 'contact', honey: '', token: '' });
      } else {
        setConfirmation(result.error ?? "❌ Une erreur s'est produite. Merci de réessayer.");
      }
    } catch {
      setConfirmation('❌ Erreur réseau. Merci de réessayer dans un instant.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-20">
      <div className="w-full max-w-xl rounded-lg border bg-white p-8 text-center shadow-lg">
        <H1 className="mb-4 text-3xl font-bold text-indigo-700">📬 Contact</H1>

        <p className="mb-6 text-gray-600">
          Vous êtes producteur local, voyageur, ou souhaitez partager un itinéraire ? Remplissez ce
          formulaire, nous vous répondrons rapidement.
        </p>

        {/* Messages contextuels */}
        {form.type === 'itineraire' && (
          <div className="mb-4 rounded border border-yellow-400 bg-yellow-100 p-3 text-left text-sm text-yellow-700">
            🧭 <strong>Vous souhaitez partager un itinéraire ?</strong>
            <br />
            Merci de remplir ce formulaire puis d’envoyer votre PDF à :{' '}
            <span className="font-medium text-indigo-700">contact@goquebecan.com</span>
          </div>
        )}

        {form.type === 'producteur' && (
          <div className="mb-4 rounded border border-blue-400 bg-blue-50 p-3 text-left text-sm text-blue-700">
            🏞️ <strong>Vous êtes un producteur local ?</strong>
            <br />
            Envoyez une ou plusieurs photos de votre ferme à :{' '}
            <span className="font-medium text-indigo-700">contact@goquebecan.com</span>
          </div>
        )}

        <form
          onSubmit={(e) => {
            void handleSubmit(e);
          }}
          className="space-y-4 text-left"
        >
          {/* Honeypot invisible (anti-bot) */}
          <input
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
            name="website"
            value={form.honey}
            onChange={(e) => setField('honey', e.target.value)}
          />

          <label className="block">
            <span className="sr-only">Type de message</span>
            <select
              name="type"
              value={form.type}
              onChange={(e) => setField('type', e.target.value as UiContactForm['type'])}
              className="w-full rounded border border-gray-300 p-2"
            >
              <option value="contact">📩 Contacter l'équipe</option>
              <option value="producteur">🏞️ Je suis un producteur local</option>
              <option value="itineraire">🧭 Partager un itinéraire de voyage</option>
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Votre nom</span>
            <input
              type="text"
              name="nom"
              placeholder="Votre nom"
              value={form.nom}
              onChange={(e) => setField('nom', e.target.value)}
              required
              autoComplete="name"
              className="w-full rounded border border-gray-300 p-2"
            />
          </label>

          <label className="block">
            <span className="sr-only">Votre adresse email</span>
            <input
              type="email"
              name="email"
              placeholder="Votre adresse email"
              value={form.email}
              onChange={(e) => setField('email', e.target.value)}
              required
              autoComplete="email"
              inputMode="email"
              className="w-full rounded border border-gray-300 p-2"
            />
          </label>

          <label className="block">
            <span className="sr-only">Votre message</span>
            <textarea
              name="message"
              placeholder={
                form.type === 'itineraire'
                  ? 'Décrivez brièvement votre itinéraire : région, durée, thèmes, etc.'
                  : form.type === 'producteur'
                    ? 'Décrivez votre activité (type de production, localisation, etc.)'
                    : 'Votre message'
              }
              value={form.message}
              onChange={(e) => setField('message', e.target.value)}
              required
              rows={4}
              className="w-full rounded border border-gray-300 p-2"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {isSubmitting ? 'Envoi…' : 'Envoyer'}
          </button>

          {/* annonce visuelle & screen readers */}
          <p className="mt-2 min-h-5 text-sm" aria-live="polite">
            {confirmation}
          </p>
        </form>
      </div>
    </main>
  );
}
