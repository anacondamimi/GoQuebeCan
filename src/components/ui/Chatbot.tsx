'use client';

import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChatbotCTAButtons from '@/components/ChatbotCTAButtons';
import { MessageSquare, X, Send } from 'lucide-react';
import { useSite, Message } from '@/components/contexts/SiteContext';
import { getContentSuggestions } from '@/components/lib/getContentSuggestions';
import { suggestNearbyProducers } from '@/utils/suggestNearbyProducers';
import type { Suggestion } from '@/utils/suggestNearbyProducers';
import type { Producer } from '@/types/Producer';

import producersData from '@/data/producers.json'; // ✅ AJOUTÉ
const producersList: Producer[] = producersData as Producer[]; // ✅ AJOUTÉ

import { BLOG_SLUGS } from '@/data/blog-slugs';

const MapWithRouting = dynamic(() => import('@/components/MapWithRouting'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>,
});

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
  const [start, setStart] = useState<[number, number] | null>(null);
  const [end, setEnd] = useState<[number, number] | null>(null);
  const [autoOpened, setAutoOpened] = useState(false);
  const [nearbyProducers, setNearbyProducers] = useState<Suggestion[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll auto vers le dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Ouvre le chat automatiquement au premier appel
  useEffect(() => {
    if (typeof window === 'undefined') return; // ✅ Corrige l'erreur SSR

    const handleOpenChat = () => {
      setIsOpen(true);
      if (!autoOpened) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            text: `💬 Bonjour 👋, je peux vous aider à :

✅ Tracer votre itinéraire (camping, hôtels, vanlife)
✅ Découvrir des producteurs locaux sur votre trajet
✅ Voir nos articles et vidéos selon votre destination
✅ Préparer votre voyage avec les objets indispensables

Posez-moi une question pour commencer !`,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        ]);
        setAutoOpened(true);
      }
    };

    window.addEventListener('openChat', handleOpenChat);
    return () => window.removeEventListener('openChat', handleOpenChat);
  }, [autoOpened, setIsOpen, setMessages]);

  // Normalisation: minuscules, sans accents
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  // Fonction pour extraire le slug de destination
  const extractDestinationSlug = (text: string): string => {
    const normText = normalize(text);

    // On préfère les slugs les plus longs (évite les faux positifs partiels)
    const byLengthDesc = [...BLOG_SLUGS].sort((a, b) => b.length - a.length);

    for (const slug of byLengthDesc) {
      // On tolère espace/tiret dans le texte utilisateur
      const slugPattern = normalize(slug).replace(/-/g, '[-\\s]?');
      const re = new RegExp(`(?:^|[^a-z0-9])${slugPattern}(?:[^a-z0-9]|$)`);
      if (re.test(normText)) return slug;
    }
    return '';
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    const currentInput = input; // Sauvegarder l'input avant de le réinitialiser
    setInput('');
    setIsTyping(true);

    const userText = currentInput.toLowerCase();
    // 🎯 Activation de la carte et des producteurs si l'utilisateur mentionne "tadoussac"
    if (userText.includes('tadoussac')) {
      // Montréal
      setStart([45.5017, -73.5673]);
      // Tadoussac
      setEnd([48.1446, -69.7174]);

      try {
        const waypoint: [number, number][] = [[48.1446, -69.7174]];
        const suggested = suggestNearbyProducers(producersList, waypoint);
        setNearbyProducers(suggested);
      } catch (error) {
        console.error('Erreur lors de la récupération des producteurs :', error);
      }

      setMessages((prev: Message[]) => [
        ...prev,
        {
          text: `🗺️ Voici l'itinéraire tracé vers Tadoussac avec les producteurs locaux affichés ci-dessous.

Vous pouvez visualiser l'itinéraire et explorer les producteurs locaux recommandés directement ci-dessous.`,
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsTyping(false);
      return;
    }

    try {
      // 📍 1️⃣ Détection d'intention de voyage
      if (
        userText.includes('tadoussac') ||
        userText.includes('gaspésie') ||
        userText.includes('québec') ||
        userText.includes('destination') ||
        userText.includes('voyage') ||
        userText.includes('itinéraire')
      ) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            text: `🗺️ Vous souhaitez planifier un itinéraire vers cette destination avec notre carte interactive ?

Notre planificateur affichera automatiquement le tracé, les étapes, **et les producteurs locaux à proximité** pour vous permettre de découvrir des produits québécois pendant votre voyage.

🚗 **Voyagez-vous en voiture ?** Nous avons également une liste d'objets indispensables pour optimiser vos trajets.

👉 **Cliquez ci-dessous pour commencer à planifier votre itinéraire :**

- [🗺️ Planifier l'itinéraire](/planificateur)
- [⚡ Objets pour voyage en voiture](/objets)
- [🎒 Découvrir les objets utiles](/objets-utiles)`,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        ]);
        setIsTyping(false);
        return;
      }

      // 📘 2️⃣ Suggestions basées sur le slug d'article
      const slug = extractDestinationSlug(userText);
      const suggestion = getContentSuggestions(slug);
      if (suggestion) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            text: `✨ Voici des suggestions pour **${suggestion.destination}** :

📘 [Lire l'article](${suggestion.blogUrl})
🎥 [Voir les vidéos](${suggestion.videoUrl})
🎒 [Objets utiles](${suggestion.objectsUrl})
🗺️ [Planifier l'itinéraire](${suggestion.plannerUrl})`,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        ]);
        setIsTyping(false);
        return;
      }

      // 🧠 3️⃣ Sinon, fallback vers l'API de chat
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
      const data = await res.json();

      setMessages((prev: Message[]) => [
        ...prev,
        {
          text: data.message || "Je n'ai pas compris, pouvez-vous reformuler ?",
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Erreur requête API:', error);
      setMessages((prev: Message[]) => [
        ...prev,
        {
          text: '❌ Erreur réseau. Réessayez plus tard.',
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-indigo-600 p-4 text-white shadow-lg transition hover:bg-indigo-700"
          aria-label="Ouvrir le chat"
        >
          <MessageSquare className="size-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 flex w-full animate-slide-up flex-col rounded-t-xl bg-white shadow-2xl sm:bottom-6 sm:right-6 sm:w-96 sm:rounded-xl">
          {/* Header */}
          <div className="flex items-center justify-between rounded-t-xl bg-indigo-600 p-4 text-white">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-5" />
              <span className="font-semibold">Assistant Voyage</span>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Fermer le chat">
              <X className="size-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 grow overflow-y-auto bg-gray-50 p-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} mb-2`}>
                <div
                  className={`max-w-[85%] rounded-2xl p-3 ${
                    msg.isUser
                      ? 'rounded-br-none bg-indigo-600 text-white'
                      : 'rounded-bl-none bg-white text-gray-800 shadow'
                  }`}
                >
                  {msg.isUser ? (
                    <p className="mb-1 whitespace-pre-wrap">{msg.text}</p>
                  ) : (
                    <>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ children }) => (
                            <p className="mb-1 whitespace-pre-wrap">{children}</p>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>

                      {/* ✅ CTA visuel après le dernier message bot */}
                      {i === messages.length - 1 && (
                        <>
                          <ChatbotCTAButtons />
                          <p className="text-right text-xs text-gray-400">
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl bg-white p-3 text-gray-800 shadow">
                  <div className="flex animate-pulse gap-1">
                    <div className="size-2 rounded-full bg-gray-400"></div>
                    <div className="size-2 rounded-full bg-gray-400"></div>
                    <div className="size-2 rounded-full bg-gray-400"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 🗺️ Carte interactive */}
          {start && end && (
            <div className="border-t bg-white p-4">
              <MapWithRouting
                itinerary={[]}
                routePoints={[start, end].filter(Boolean) as [number, number][]}
                producersOnRoute={producersList}
                addAfterNearest={() => {}}
                addAtEnd={() => {}}
                addToNearestNotes={() => {}}
                setSelectedIndex={() => {}}
                setIsModalOpen={() => {}}
              />
            </div>
          )}

          {/* 🥬 Liste des producteurs */}
          {nearbyProducers.length > 0 && (
            <div className="max-h-48 overflow-y-auto border-t bg-white p-4">
              <p className="mb-2 text-sm font-medium">🥬 Producteurs à proximité :</p>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {nearbyProducers.map(({ producer, distance }, i) => (
                  <li key={i}>
                    {producer.name} ({producer.type || 'Producteur'}) – {distance.toFixed(1)} km
                    {producer.website && (
                      <>
                        {' — '}
                        <a
                          href={producer.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          Site
                        </a>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ✏️ Input utilisateur */}
          <form onSubmit={handleSend} className="flex items-center gap-2 border-t bg-white p-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez une question..."
              className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 p-2 text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isTyping || !input.trim()}
              aria-label="Envoyer le message"
            >
              <Send className="size-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
