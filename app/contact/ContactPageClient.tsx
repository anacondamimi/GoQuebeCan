'use client';

import React, { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { Handshake, Mail, MapPinned, Send, Sparkles, Wheat, Route } from 'lucide-react';

import { saveContact, type ContactForm } from '@/components/lib/saveContact';
import BrandName from '@/components/brand/BrandName';
import H1 from '@/components/typography/H1';
import H2 from '@/components/typography/H2';

type ContactType = ContactForm['type'] | 'partenaire';

type UiContactForm = Omit<ContactForm, 'type'> & {
  type: ContactType;
  honey?: string;
};

const contactCards = [
  {
    title: 'Partenariat long terme',
    text: 'Producteurs, hébergements, offices touristiques ou entreprises locales : construisons une collaboration sérieuse.',
    icon: Handshake,
  },
  {
    title: 'Producteurs locaux',
    text: 'Ajoutez votre activité au réseau GoQuébeCAN et donnez envie aux voyageurs de faire un arrêt chez vous.',
    icon: Wheat,
  },
  {
    title: 'Itinéraires de voyage',
    text: 'Partagez vos idées de road trip, vos coups de cœur et vos expériences au Québec.',
    icon: Route,
  },
];

export default function ContactPageClient() {
  const [form, setForm] = useState<UiContactForm>({
    nom: '',
    email: '',
    message: '',
    type: 'contact',
    honey: '',
  });

  const [confirmation, setConfirmation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setField = useCallback(<K extends keyof UiContactForm>(key: K, value: UiContactForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const contextualMessage = useMemo(() => {
    if (form.type === 'partenaire') {
      return {
        icon: '🤝',
        title: 'Vous souhaitez devenir partenaire ?',
        text: 'Présentez votre entreprise, votre région, votre site web et le type de collaboration souhaité. Nous privilégions les partenariats sérieux, humains et durables.',
        className: 'border-emerald-300 bg-emerald-50 text-emerald-800',
      };
    }

    if (form.type === 'itineraire') {
      return {
        icon: '🧭',
        title: 'Vous souhaitez partager un itinéraire ?',
        text: 'Décrivez votre parcours, la région, la durée et les points forts. Si vous avez un PDF, vous pourrez aussi l’envoyer à contact@goquebecan.com.',
        className: 'border-yellow-300 bg-yellow-50 text-yellow-800',
      };
    }

    if (form.type === 'producteur') {
      return {
        icon: '🏞️',
        title: 'Vous êtes un producteur local ?',
        text: 'Présentez votre activité, votre localisation, vos produits et ce qui rend votre lieu intéressant pour les voyageurs.',
        className: 'border-blue-300 bg-blue-50 text-blue-800',
      };
    }

    return {
      icon: '📩',
      title: 'Une question ou une suggestion ?',
      text: 'Écrivez-nous simplement. GoQuébeCan est en développement constant pour mieux aider les voyageurs à découvrir le Québec.',
      className: 'border-indigo-200 bg-indigo-50 text-indigo-800',
    };
  }, [form.type]);

  const messagePlaceholder = useMemo(() => {
    if (form.type === 'partenaire') {
      return 'Présentez votre entreprise, votre région, votre site web, vos objectifs et le type de partenariat souhaité.';
    }

    if (form.type === 'itineraire') {
      return 'Décrivez brièvement votre itinéraire : région, durée, étapes, thèmes, conseils, etc.';
    }

    if (form.type === 'producteur') {
      return 'Décrivez votre activité : type de production, localisation, saison, site web, photos disponibles, etc.';
    }

    return 'Votre message';
  }, [form.type]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (isSubmitting) return;

    if (form.honey) {
      setConfirmation('Votre message a bien été envoyé.');
      return;
    }

    setIsSubmitting(true);
    setConfirmation('');

    try {
      const { nom, email, message, type } = form;

      const finalMessage =
        type === 'partenaire' ? `[Demande de partenariat]\n\n${message}` : message;

      const result = await saveContact({
        nom,
        email,
        message: finalMessage,
        type: type === 'partenaire' ? 'contact' : (type as ContactForm['type']),
      });

      if (result.success) {
        setConfirmation('✅ Merci ! Votre message a bien été envoyé.');
        setForm({
          nom: '',
          email: '',
          message: '',
          type: 'contact',
          honey: '',
        });
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
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Sparkles size={16} />
              Contact & partenariats
            </div>

            <H1>Contactez GoQuébeCAN</H1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral">
              Une question, une proposition, un itinéraire à partager ou une envie de devenir
              partenaire ? <BrandName /> souhaite créer des liens durables avec les voyageurs, les
              producteurs locaux et les acteurs touristiques du Québec.
            </p>

            <div className="mt-6 flex items-center gap-3 rounded-3xl border border-gray-200 bg-white p-5 shadow-card">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MapPinned size={22} />
              </div>
              <div>
                <p className="font-semibold text-secondary">
                  Une plateforme pensée pour le Québec authentique
                </p>
                <p className="mt-1 text-sm text-neutral">
                  Régions, producteurs locaux, road trips, expériences humaines et tourisme durable.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {contactCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
                  >
                    <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                    <h2 className="text-sm font-bold text-secondary">{card.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-neutral">{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-4xl border border-gray-200 bg-white p-6 shadow-card md:p-8">
              <div className="mb-6">
                <BrandName className="text-xl" />
                <H2 className="mt-4">Écrivez-nous</H2>
                <p className="mt-3 text-sm leading-relaxed text-neutral">
                  Sélectionnez le type de demande afin que votre message soit mieux orienté.
                </p>
              </div>

              <div
                className={`mb-5 rounded-2xl border p-4 text-left text-sm ${contextualMessage.className}`}
              >
                <p className="font-semibold">
                  {contextualMessage.icon} {contextualMessage.title}
                </p>
                <p className="mt-1 leading-relaxed">{contextualMessage.text}</p>
              </div>

              <form
                onSubmit={(e) => {
                  void handleSubmit(e);
                }}
                className="space-y-4"
              >
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
                  <span className="mb-1 block text-sm font-semibold text-secondary">
                    Type de demande
                  </span>
                  <select
                    name="type"
                    value={form.type}
                    onChange={(e) => setField('type', e.target.value as ContactType)}
                    className="w-full rounded-2xl border border-gray-300 bg-white p-3 text-sm text-neutral outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="contact">📩 Contacter l’équipe</option>
                    <option value="partenaire">🤝 Devenir partenaire</option>
                    <option value="producteur">🏞️ Je suis un producteur local</option>
                    <option value="itineraire">🧭 Partager un itinéraire de voyage</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-secondary">Votre nom</span>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Votre nom"
                    value={form.nom}
                    onChange={(e) => setField('nom', e.target.value)}
                    required
                    autoComplete="name"
                    className="w-full rounded-2xl border border-gray-300 p-3 text-sm text-neutral outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-secondary">
                    Votre adresse email
                  </span>
                  <input
                    type="email"
                    name="email"
                    placeholder="votre@email.com"
                    value={form.email}
                    onChange={(e) => setField('email', e.target.value)}
                    required
                    autoComplete="email"
                    inputMode="email"
                    className="w-full rounded-2xl border border-gray-300 p-3 text-sm text-neutral outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-secondary">
                    Votre message
                  </span>
                  <textarea
                    name="message"
                    placeholder={messagePlaceholder}
                    value={form.message}
                    onChange={(e) => setField('message', e.target.value)}
                    required
                    rows={6}
                    className="w-full resize-none rounded-2xl border border-gray-300 p-3 text-sm text-neutral outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send size={16} />
                  {isSubmitting ? 'Envoi en cours…' : 'Envoyer le message'}
                </button>

                <p className="min-h-5 text-center text-sm font-medium" aria-live="polite">
                  {confirmation}
                </p>
              </form>

              <div className="mt-6 rounded-2xl bg-primary/5 p-4 text-sm text-neutral">
                <p>
                  Pour mieux comprendre l’esprit de la plateforme, vous pouvez aussi visiter la page{' '}
                  <Link href="/devenir-partenaire" className="font-semibold text-primary underline">
                    Devenir partenaire
                  </Link>
                  .
                </p>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-neutral">
                <Mail size={16} className="text-primary" />
                <span>contact@goquebecan.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
