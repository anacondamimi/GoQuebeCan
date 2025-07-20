'use client';

import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChatbotCTAButtons from '@/components/ChatbotCTAButtons';
import { MessageSquare, X, Send } from 'lucide-react';
import { useSite } from '@/components/contexts/SiteContext';
import { getContentSuggestions } from '@/components/lib/getContentSuggestions';
import { suggestNearbyProducers } from '@/utils/suggestNearbyProducers';
import type { Suggestion } from '@/utils/suggestNearbyProducers';
import type { Producer } from '@/types/Producer';

import producersData from '@/data/producers.json'; // ✅ AJOUTÉ
const producersList: Producer[] = producersData as Producer[]; // ✅ AJOUTÉ

import { slugs } from '@/app/blog/componentMap';

const MapWithRouting = dynamic(() => import('@/components/MapWithRouting'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>,
});

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
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
            timestamp: new Date(),
          },
        ]);
        setAutoOpened(true);
      }
    };

    window.addEventListener('openChat', handleOpenChat);
    return () => window.removeEventListener('openChat', handleOpenChat);
  }, [autoOpened, setIsOpen, setMessages]);

  // Fonction pour extraire le slug de destination
  const extractDestinationSlug = (text: string): string => {
    const lowerText = text.toLowerCase();
    return slugs.find((slug: string) => lowerText.includes(slug)) || '';
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date(),
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
          timestamp: new Date(),
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

🚗 **Voyagez-vous en voiture électrique ?** Nous avons également une liste d'objets indispensables pour optimiser vos trajets en EV.

👉 **Cliquez ci-dessous pour commencer à planifier votre itinéraire :**

- [🗺️ Planifier l'itinéraire](/planificateur)
- [⚡ Objets pour voiture électrique](/objets-utiles#voiture-electrique)
- [🎒 Découvrir les objets utiles](/objets-utiles)`,
            isUser: false,
            timestamp: new Date(),
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
            timestamp: new Date(),
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
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Erreur requête API:', error);
      setMessages((prev: Message[]) => [
        ...prev,
        {
          text: '❌ Erreur réseau. Réessayez plus tard.',
          isUser: false,
          timestamp: new Date(),
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
          className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition z-50"
          aria-label="Ouvrir le chat"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-96 bg-white rounded-t-xl sm:rounded-xl shadow-2xl z-50 flex flex-col animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between bg-indigo-600 text-white p-4 rounded-t-xl">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span className="font-semibold">Assistant Voyage</span>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Fermer le chat">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} mb-2`}>
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.isUser
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow'
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
                          <p className="text-xs text-right text-gray-400">
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
                <div className="bg-white text-gray-800 p-3 rounded-2xl shadow max-w-[85%]">
                  <div className="flex gap-1 animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 🗺️ Carte interactive */}
          {start && end && (
            <div className="p-4 border-t bg-white">
              <MapWithRouting
                points={[start, end]}
                producers={nearbyProducers.map((p) => p.producer)}
              />
            </div>
          )}

          {/* 🥬 Liste des producteurs */}
          {nearbyProducers.length > 0 && (
            <div className="p-4 border-t bg-white max-h-48 overflow-y-auto">
              <p className="text-sm font-medium mb-2">🥬 Producteurs à proximité :</p>
              <ul className="text-sm list-disc pl-5 space-y-1">
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
          <form onSubmit={handleSend} className="p-4 border-t bg-white flex gap-2 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez une question..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={isTyping || !input.trim()}
              aria-label="Envoyer le message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
