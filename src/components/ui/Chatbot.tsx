'use client';
import React, { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MessageSquare, X, Send } from 'lucide-react';
import { useSite } from '@/components/contexts/SiteContext';
import { suggestNearbyProducers } from '@/utils/suggestNearbyProducers';
import { getContentSuggestions } from '@/components/lib/getContentSuggestions';

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
  const [nearbyProducers, setNearbyProducers] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll auto vers le dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Ouvre le chat automatiquement au premier appel
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      if (!autoOpened) {
        setMessages((prev) => [
          ...prev,
          {
            text: '💬 En quoi puis-je vous aider aujourd’hui ?',
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

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const userText = input.toLowerCase();

    // Cas particulier Montréal → Tadoussac
    if (userText.includes('montréal') && userText.includes('tadoussac')) {
      const startPoint: [number, number] = [45.5017, -73.5673];
      const endPoint: [number, number] = [48.1394, -69.6866];
      setStart(startPoint);
      setEnd(endPoint);
      const nearby = suggestNearbyProducers([startPoint, endPoint], 10);
      setNearbyProducers(nearby);

      setMessages((prev) => [
        ...prev,
        {
          text: `🗺️ Voici le trajet entre Montréal et Tadoussac avec des producteurs locaux à découvrir 🍇🧀`,
          isUser: false,
          timestamp: new Date(),
        },
      ]);

      setIsTyping(false);
      return;
    }

    // Suggestions basées sur une destination
    const slug = extractDestinationSlug(userText);
    const suggestion = getContentSuggestions(slug);
    if (suggestion) {
      setMessages((prev) => [
        ...prev,
        {
          text: `✨ Voici des suggestions pour ${suggestion.destination} :

📘 [Lire l’article](${suggestion.blogUrl})
🎥 [Voir les vidéos](${suggestion.videoUrl})
🎒 [Objets utiles](${suggestion.objectsUrl})
🗺️ [Planifier l’itinéraire](${suggestion.plannerUrl})`,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
      return;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          text: data.message || 'Je n’ai pas compris, pouvez-vous reformuler ?',
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Erreur requête API:', error);
      setMessages((prev) => [
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
            <button onClick={() => setIsOpen(false)}>
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
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-1 whitespace-pre-wrap">{children}</p>,
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
                  )}
                  <p className="text-xs text-right text-gray-400">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
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

          {/* Carte + producteurs */}
          {start && end && (
            <div className="p-4 border-t bg-white">
              <MapWithRouting points={[start, end]} producers={nearbyProducers} />
            </div>
          )}

          {nearbyProducers.length > 0 && (
            <div className="p-4 border-t bg-white max-h-48 overflow-y-auto">
              <p className="text-sm font-medium mb-2">🥬 Producteurs à proximité :</p>
              <ul className="text-sm list-disc pl-5 space-y-1">
                {nearbyProducers.map((p, i) => (
                  <li key={i}>
                    {p.name} ({p.type || 'Producteur'})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t bg-white flex gap-2 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez une question..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              disabled={isTyping}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
              disabled={isTyping}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function extractDestinationSlug(text: string): string {
  const slugs = [
    'gaspesie',
    'perce',
    'carleton',
    'forillon',
    'baie-saint-paul',
    'massif',
    'port-au-persil',
    'hautes-gorges',
    'sept-iles',
    'mingan',
    'port-cartier',
    'tadoussac',
    'magog-orford',
    'bromont-granby',
    'sherbrooke',
    'bic',
    'kamouraska',
    'rivieredu-loup',
    'quebec',
    'levis',
    'montmorency',
    'orleans',
    'wasaga-beach',
    'port-dover',
    'grand-bend',
    'sauble-beach',
    'sandbanks',
    'singing-sands',
    'eeyou-istchee',
    'kuururjuaq',
    'sabrevois',
    'canyon',
    'pourquoi-louer-un-vr-au-quebec-avec-authentik-canada',
  ];
  return slugs.find((slug) => text.includes(slug)) || '';
}
