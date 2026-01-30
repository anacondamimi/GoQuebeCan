'use client';

import React, { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChatbotCTAButtons from '@/components/ChatbotCTAButtons';
import { MessageSquare, X, Send } from 'lucide-react';
import { useSite, Message } from '@/components/contexts/SiteContext';
import { getContentSuggestions } from '@/components/lib/getContentSuggestions';
import { suggestNearbyProducers } from '@/utils/suggestNearbyProducers';
import type { Suggestion } from '@/utils/suggestNearbyProducers';
import type { Producer } from '@/types/Producer';

import producersData from '@/data/producers.json';
const producersList: Producer[] = producersData as Producer[];

import { BLOG_SLUGS } from '@/data/blog-slugs';

/** -----------------------
 * Helpers
 * ----------------------*/

function normalizeText(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function isNeedIdeaIntent(normText: string) {
  // L'utilisateur ne sait pas où partir / cherche des idées
  return (
    normText.includes('ou partir') ||
    normText.includes('où partir') ||
    normText.includes('idee') ||
    normText.includes('idée') ||
    normText.includes('inspiration') ||
    normText.includes('je ne sais pas') ||
    normText.includes('pas sur') ||
    normText.includes('pas sûr') ||
    normText.includes('suggestion') ||
    normText.includes('recommande') ||
    normText.includes('recommandes')
  );
}

function isItineraryIntent(normText: string) {
  return (
    /\b(itineraire|itinéraire|planifier|parcours|road\s?trip|boucle|trajet)\b/.test(normText) ||
    /\b(\d+)\s?(j|jours)\b/.test(normText)
  );
}

function hasInternalLinksMarkdown(text: string) {
  // détecte au moins un lien interne type: ](/planificateur)
  return /\]\(\/[a-z0-9#/-]+/i.test(text);
}

function detectTravelTypeSlug(normText: string): string {
  const has = (re: RegExp) => re.test(normText);

  // camping
  if (has(/\bcamping\b/) || has(/\btente\b/) || has(/\bcaravane\b/) || has(/\bvanlife\b/)) {
    return 'voyage-camping';
  }

  // avion
  if (has(/\bavion\b/) || has(/\baeroport\b/) || has(/\bvols?\b/) || has(/\bvalise\b/)) {
    return 'voyage-avion';
  }

  // voiture / itinéraire
  if (has(/\bvoiture\b/) || has(/\broad\s?trip\b/) || has(/\bitineraire\b/) || has(/\broute\b/)) {
    return 'voyage-voiture';
  }

  // hôtel
  if (has(/\bh[ôo]tel\b/) || has(/\bhebergement\b/) || has(/\bchambre\b/)) {
    return 'voyage-hotel';
  }

  return '';
}

function extractSlugFromText(input: string): string {
  const norm = normalizeText(input);

  // Prioriser les slugs longs pour éviter les faux positifs
  const sorted = [...BLOG_SLUGS].sort((a, b) => b.length - a.length);

  for (const slug of sorted) {
    const slugNorm = normalizeText(slug);
    // autoriser " " ou "-" à la place des "-"
    const pattern = slugNorm.replace(/-/g, '[-\\s]?');
    const re = new RegExp(`(?:^|[^a-z0-9])${pattern}(?:[^a-z0-9]|$)`);
    if (re.test(norm)) return slug;
  }

  return '';
}

function getLastMessages(all: Message[], userMessage: Message, limit = 8) {
  // Envoie seulement les derniers messages pour éviter payload énorme
  const merged = [...all, userMessage];
  return merged.slice(Math.max(0, merged.length - limit));
}

export default function Chatbot() {
  const {
    chatOpen: isOpen,
    setChatOpen: setIsOpen,
    messages,
    setMessages,
    isTyping,
    setIsTyping,
  } = useSite();

  const [input, setInput] = useState('');
  const [nearbyProducers, setNearbyProducers] = useState<Suggestion[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const lastBotMessage = [...messages].reverse().find((m) => !m.isUser);
  const showStaticCtas = !lastBotMessage || !hasInternalLinksMarkdown(lastBotMessage.text);

  /** Auto-scroll en bas quand chat ouvert */
  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  /** ✅ Ouvrir le chat via un event global (depuis ton bouton banner) */
  useEffect(() => {
    const onOpenChat = () => {
      setIsOpen(true);
      // focus doux pour que l'utilisateur puisse écrire direct
      setTimeout(() => inputRef.current?.focus(), 50);
    };

    window.addEventListener('openChat', onOpenChat);
    return () => window.removeEventListener('openChat', onOpenChat);
  }, [setIsOpen]);

  /** Focus quand on ouvre le chat via le bouton flottant */
  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const currentInput = input;
    setInput('');
    setNearbyProducers([]); // reset suggestions quand nouvel échange

    const userMessage: Message = {
      text: currentInput,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setIsTyping(true);

    const normText = normalizeText(currentInput);

    // 🎯 Démo "Tadoussac" (sans carte dans le chatbot — on reste léger)
    if (normText.includes('tadoussac')) {
      try {
        // waypoint format attendu par ton helper
        const waypoint: [number, number][] = [[48.1446, -69.7174]];
        const suggested = suggestNearbyProducers(producersList, waypoint);
        setNearbyProducers(suggested);
      } catch (error) {
        console.error('Erreur lors de la récupération des producteurs :', error);
      }

      setMessages((prev: Message[]) => [
        ...prev,
        {
          text: `🧭 Tadoussac, excellent choix — ça sent déjà l’air salin et les paysages grandioses.

**Vous choisissez la suite :**
- [🗺️ Ouvrir le planificateur](/planificateur)
- [📘 Lire l'article Tadoussac](/blog/tadoussac)
- [🎥 Voir les vidéos](/videos)
- [🧺 Voir les producteurs](/producteurs)

Petite question pour personnaliser : vous partez d’où et à quelle période ?`,
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ]);

      setIsTyping(false);
      return;
    }

    try {
      // ✅ 1) Destination (slug blog) détectée → suggestions / choix
      const detectedSlug = extractSlugFromText(currentInput);
      if (detectedSlug) {
        const suggestion = getContentSuggestions(detectedSlug);

        // IMPORTANT: ton helper renvoie blogUrl (pas articleUrl)
        const blogUrl = suggestion?.blogUrl ?? `/blog/${detectedSlug}`;
        const videoUrl = suggestion?.videoUrl ?? '/videos';
        const objectsUrl = suggestion?.objectsUrl ?? '/objets';
        const plannerUrl = suggestion?.plannerUrl ?? '/planificateur';
        const destinationLabel = suggestion?.destination ?? detectedSlug;

        setMessages((prev: Message[]) => [
          ...prev,
          {
            text: `Parfait. Pour **${destinationLabel}**, je vous propose plusieurs chemins — à vous de choisir.

**Vous choisissez :**
- [🗺️ Ouvrir le planificateur](${plannerUrl})
- [📘 Lire l'article](${blogUrl})
- [🎥 Voir les vidéos](${videoUrl})
- [🧺 Producteurs locaux](/producteurs)
- [🎒 Objets utiles](${objectsUrl})

Pour affiner sans compliquer : vous partez d’où, et vous visez quelle période (mois/saison) ?`,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        ]);

        setIsTyping(false);
        return;
      }

      // ✅ 2) Type de voyage détecté (voyage-*) → guide + objets
      const travelTypeSlug = detectTravelTypeSlug(normText);
      if (travelTypeSlug && BLOG_SLUGS.includes(travelTypeSlug as any)) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            text: `Très bon angle. Je peux vous aider à préparer ce type de voyage de façon simple et efficace.

**Vous choisissez :**
- [📘 Guide complet](/blog/${travelTypeSlug})
- [🎒 Objets utiles](/objets)
- [🎥 Vidéos](/videos)
- [🗺️ Ouvrir le planificateur](/planificateur)

Vous cherchez plutôt un voyage **relax** ou **bien rempli** (beaucoup d’activités) ?`,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        ]);

        setIsTyping(false);
        return;
      }

      // ✅ 3) “Je ne sais pas où partir” → inspirations d’abord
      if (isNeedIdeaIntent(normText)) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            text: `Je vous comprends — choisir, c’est souvent le plus difficile… mais on va rendre ça agréable.

**Vous choisissez un point de départ :**
- [📍 Explorer les destinations](/destinations)
- [✨ Expériences à vivre](/experiences)
- [🎥 Vidéos pour s’inspirer](/videos)
- [💰 Offres spéciales](/offres)

Dites-moi juste : vous cherchez plutôt **nature**, **route panoramique**, **famille**, ou **gourmand/local** ?`,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        ]);

        setIsTyping(false);
        return;
      }

      // ✅ 4) Itinéraire demandé mais destination pas claire
      if (isItineraryIntent(normText)) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            text: `Je peux vous proposer un itinéraire même si la destination n’est pas encore 100% fixée.

**Vous choisissez :**
- [🗺️ Ouvrir le planificateur](/planificateur)
- [📍 Destinations](/destinations)
- [🎥 Vidéos](/videos)
- [📘 Blog](/blog)

Pour que je vise juste : vous partez d’où (ex: Montréal) et vous avez combien de jours ?`,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        ]);

        setIsTyping(false);
        return;
      }

      // ✅ 5) Sinon → fallback vers l'API de chat (avec historique limité)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: getLastMessages(messages, userMessage, 8) }),
      });

      if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
      const data = await res.json();

      setMessages((prev: Message[]) => [
        ...prev,
        {
          text: data.message || "Je n'ai pas compris, peux-tu reformuler ?",
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsTyping(false);
    } catch (err) {
      console.error('Erreur chatbot:', err);
      setMessages((prev: Message[]) => [
        ...prev,
        {
          text: 'Je sens un petit accroc technique. Réessayez, ou dites-moi : **destination + nombre de jours** (ex: "Gaspésie 7 jours").',
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsTyping(false);
    }
  };

  // UI minimisée (bouton flottant)
  if (!isOpen) {
    return (
      <button
        aria-label="Ouvrir le chatbot"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg"
      >
        <MessageSquare className="size-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[520px] w-[360px] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b bg-white p-3">
        <div className="font-semibold">Assistant GoQuébeCAN</div>
        <button
          aria-label="Fermer"
          onClick={() => setIsOpen(false)}
          className="rounded p-2 hover:bg-gray-100"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-3">
        {messages.map((msg: Message, i: number) => (
          <div
            key={`${msg.timestamp}-${i}`}
            className={`mb-3 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                msg.isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              {msg.isUser ? (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              ) : (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="mb-3 flex justify-start">
            <div className="rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-700">
              Je réfléchis…
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
        <ChatbotCTAButtons visible={showStaticCtas} />

        {/* 🥬 Liste des producteurs (optionnel, léger) */}
        {nearbyProducers.length > 0 && (
          <div className="mt-3 max-h-48 overflow-y-auto rounded-xl border bg-white p-4">
            <p className="mb-2 font-semibold">Producteurs recommandés</p>
            <ul className="list-disc pl-5 text-sm">
              {nearbyProducers.map((p, idx) => {
                const anyP = p as unknown as Record<string, unknown>;

                const label =
                  (typeof anyP.name === 'string' && anyP.name) ||
                  (typeof anyP.title === 'string' && anyP.title) ||
                  (typeof anyP.label === 'string' && anyP.label) ||
                  (typeof anyP.company === 'string' && anyP.company) ||
                  'Producteur';

                const kind =
                  (typeof anyP.type === 'string' && anyP.type) ||
                  (typeof anyP.category === 'string' && anyP.category) ||
                  (typeof anyP.kind === 'string' && anyP.kind) ||
                  '';

                const distance =
                  typeof anyP.distanceKm === 'number'
                    ? `${anyP.distanceKm.toFixed(1)} km`
                    : typeof anyP.distance === 'number'
                      ? `${anyP.distance.toFixed(1)} km`
                      : '';

                return (
                  <li key={`${label}-${idx}`}>
                    {label}
                    {kind ? ` — ${kind}` : ''}
                    {distance ? ` (${distance})` : ''}
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 text-sm">
              <a className="underline" href="/producteurs">
                Voir tous les producteurs
              </a>
            </div>
          </div>
        )}

        <div className="mt-3">
          <ChatbotCTAButtons />
        </div>
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 border-t p-3">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Ex: Itinéraire 7 jours Gaspésie, avec producteurs…"
        />
        <button
          type="submit"
          className="rounded-xl bg-blue-600 p-2 text-white shadow hover:bg-blue-700"
          aria-label="Envoyer"
        >
          <Send className="size-5" />
        </button>
      </form>
    </div>
  );
}
