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
import { BLOG_SLUGS } from '@/data/blog-slugs';

const producersList: Producer[] = producersData as Producer[];

type AssistantApiResponse = {
  message?: string;
  markdown?: string;
  intent?:
    | 'idea'
    | 'destination'
    | 'hotel'
    | 'article'
    | 'videos'
    | 'planner'
    | 'producers'
    | 'beginner'
    | 'general';
  links?: Array<{ label: string; href: string }>;
  nextQuestion?: string | null;
  detectedDestination?: string;
  detectedDurationDays?: number;
  detectedOrigin?: string;
};

type TravelAssistantState = {
  stage: 'welcome' | 'discovery' | 'destination' | 'lodging' | 'planner' | 'producers' | 'general';
  destination?: string;
  origin?: string;
  durationDays?: number;
  dateText?: string;
  travelersText?: string;
  travelStyle?: string;
};

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

function isHotelBookingIntent(normText: string) {
  return /\b(reserver|réserver|hotel|hôtel|hebergement|hébergement|ou dormir|où dormir|chambre|booking)\b/.test(
    normText,
  );
}

function isBeginnerIntent(normText: string) {
  return (
    normText.includes('je ne sais pas') ||
    normText.includes('je suis perdu') ||
    normText.includes('aide moi') ||
    normText.includes('aide-moi') ||
    normText.includes('premieres vacances') ||
    normText.includes('premières vacances') ||
    normText.includes("je n'ai jamais") ||
    normText.includes('je ne sais pas par ou commencer') ||
    normText.includes('je ne sais pas par où commencer')
  );
}

function isVideosIntent(normText: string) {
  return /\b(video|vidéo|videos|vidéos|youtube)\b/.test(normText);
}

function isProducerIntent(normText: string) {
  return /\b(producteur|producteurs|ferme|fromagerie|cidrerie|microbrasserie|marche local|marché local)\b/.test(
    normText,
  );
}

function hasInternalLinksMarkdown(text: string) {
  return /\]\(\/[a-z0-9#/-]+/i.test(text);
}

function detectTravelTypeSlug(normText: string): string {
  const has = (re: RegExp) => re.test(normText);

  if (has(/\bcamping\b/) || has(/\btente\b/) || has(/\bcaravane\b/) || has(/\bvanlife\b/)) {
    return 'voyage-camping';
  }

  if (
    has(/\bavion\b/) ||
    has(/\baeroport\b/) ||
    has(/\baéroport\b/) ||
    has(/\bvols?\b/) ||
    has(/\bvalise\b/)
  ) {
    return 'voyage-avion';
  }

  if (
    has(/\bvoiture\b/) ||
    has(/\broad\s?trip\b/) ||
    has(/\bitineraire\b/) ||
    has(/\bitinéraire\b/) ||
    has(/\broute\b/)
  ) {
    return 'voyage-voiture';
  }

  if (
    has(/\bh[ôo]tel\b/) ||
    has(/\bhebergement\b/) ||
    has(/\bhébergement\b/) ||
    has(/\bchambre\b/)
  ) {
    return 'voyage-hotel';
  }

  return '';
}

function extractSlugFromText(input: string): string {
  const norm = normalizeText(input);
  const sorted = [...BLOG_SLUGS].sort((a, b) => b.length - a.length);

  for (const slug of sorted) {
    const slugNorm = normalizeText(slug);
    const pattern = slugNorm.replace(/-/g, '[-\\s]?');
    const re = new RegExp(`(?:^|[^a-z0-9])${pattern}(?:[^a-z0-9]|$)`);
    if (re.test(norm)) return slug;
  }

  return '';
}

function extractDurationDays(input: string): number | undefined {
  const norm = normalizeText(input);
  const match = norm.match(/\b(\d{1,2})\s?(jour|jours|j)\b/);
  if (!match) return undefined;

  const days = Number(match[1]);
  return Number.isFinite(days) ? days : undefined;
}

function extractOrigin(input: string): string | undefined {
  const patterns = [
    /\bdepart de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bon part de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bje pars de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bnous partons de ([a-zA-ZÀ-ÿ' -]+)/i,
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match?.[1]) return match[1].trim();
  }

  return undefined;
}

function extractTravelersText(input: string): string | undefined {
  const norm = normalizeText(input);

  const simplePatterns = [
    /\b(\d+)\s?(adulte|adultes)\b/i,
    /\b(\d+)\s?(enfant|enfants)\b/i,
    /\b(\d+)\s?(personne|personnes)\b/i,
    /\ben famille\b/i,
    /\ben couple\b/i,
    /\bentre amis\b/i,
    /\bavec les enfants\b/i,
  ];

  const hits = simplePatterns
    .map((pattern) => input.match(pattern)?.[0])
    .filter((v): v is string => typeof v === 'string' && v.trim().length > 0);

  if (hits.length > 0) return hits.join(', ');
  if (norm.includes('famille')) return 'famille';
  if (norm.includes('couple')) return 'couple';

  return undefined;
}

function extractTravelStyle(input: string): string | undefined {
  const norm = normalizeText(input);
  const found: string[] = [];

  if (norm.includes('nature')) found.push('nature');
  if (norm.includes('famille')) found.push('famille');
  if (norm.includes('gourmand')) found.push('gourmand');
  if (norm.includes('romantique')) found.push('romantique');
  if (norm.includes('detente') || norm.includes('détente')) found.push('détente');
  if (norm.includes('road trip') || norm.includes('roadtrip')) found.push('road trip');
  if (norm.includes('bord de l eau') || norm.includes("bord de l'eau")) found.push('bord de l’eau');

  return found.length > 0 ? found.join(', ') : undefined;
}

function getLastMessages(all: Message[], userMessage: Message, limit = 8) {
  const merged = [...all, userMessage];
  return merged.slice(Math.max(0, merged.length - limit));
}

function buildMarkdownFromApiResponse(data: AssistantApiResponse): string {
  if (data.markdown && data.markdown.trim()) return data.markdown.trim();

  const lines: string[] = [];
  if (data.message) lines.push(data.message.trim());

  if (data.links && data.links.length > 0) {
    lines.push('', '**Vous choisissez :**');
    for (const link of data.links) {
      lines.push(`- [${link.label}](${link.href})`);
    }
  }

  if (data.nextQuestion) {
    lines.push('', data.nextQuestion.trim());
  }

  return lines.join('\n').trim();
}

const INTERNAL_ROUTES = {
  destinations: '/#destinations-populaires',
  blog: '/blog',
  planner: '/planificateur',
  producteurs: '/producteurs',
  coupsDeCoeur: '/coups-de-coeur',
  offres: '/offres',
  videos: '/videos',
  vols: '/vols',
  vr: '/blog/location-vr',
  camping: '/camping',
  experiences: '/experiences',
  voyageVoiture: '/blog/voyage-voiture',
  voyageHotel: '/blog/voyage-hotel',
  voyageCamping: '/blog/voyage-camping',
  voyageAvion: '/blog/voyage-avion',
} as const;

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
  const [assistantState, setAssistantState] = useState<TravelAssistantState>({
    stage: 'welcome',
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const lastBotMessage = [...messages].reverse().find((m) => !m.isUser);
  const showStaticCtas = !lastBotMessage || !hasInternalLinksMarkdown(lastBotMessage.text);

  useEffect(() => {
    if (!isOpen) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    const onOpenChat = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    };

    window.addEventListener('openChat', onOpenChat);
    return () => window.removeEventListener('openChat', onOpenChat);
  }, [setIsOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const currentInput = input.trim();
    setInput('');
    setNearbyProducers([]);

    const userMessage: Message = {
      text: currentInput,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setIsTyping(true);

    const normText = normalizeText(currentInput);
    const detectedSlug = extractSlugFromText(currentInput);
    const detectedDuration = extractDurationDays(currentInput);
    const detectedOrigin = extractOrigin(currentInput);
    const detectedTravelers = extractTravelersText(currentInput);
    const detectedStyle = extractTravelStyle(currentInput);

    setAssistantState((prev) => ({
      ...prev,
      destination: detectedSlug || prev.destination,
      durationDays: detectedDuration ?? prev.durationDays,
      origin: detectedOrigin ?? prev.origin,
      travelersText: detectedTravelers ?? prev.travelersText,
      travelStyle: detectedStyle ?? prev.travelStyle,
      stage: detectedSlug
        ? 'destination'
        : isHotelBookingIntent(normText)
          ? 'lodging'
          : isItineraryIntent(normText)
            ? 'planner'
            : isProducerIntent(normText)
              ? 'producers'
              : isNeedIdeaIntent(normText) || isBeginnerIntent(normText)
                ? 'discovery'
                : prev.stage,
    }));

    try {
      if (detectedSlug) {
        try {
          const suggestion = getContentSuggestions(detectedSlug);
          const blogUrl = suggestion?.blogUrl ?? `/blog/${detectedSlug}`;
          const videoUrl = suggestion?.videoUrl ?? INTERNAL_ROUTES.videos;
          const prepUrl =
            suggestion?.objectsUrl ??
            (isHotelBookingIntent(normText)
              ? INTERNAL_ROUTES.voyageHotel
              : isItineraryIntent(normText)
                ? INTERNAL_ROUTES.voyageVoiture
                : INTERNAL_ROUTES.voyageVoiture);
          const plannerUrl = suggestion?.plannerUrl ?? INTERNAL_ROUTES.planner;
          const destinationLabel = suggestion?.destination ?? detectedSlug;

          let extraQuestion =
            'Pour aller un peu plus loin : vous partez d’où et pour combien de jours ?';

          if (isHotelBookingIntent(normText)) {
            extraQuestion =
              'Pour bien vous orienter côté hébergement : vous cherchez plutôt pratique, romantique ou familial ?';
          } else if (isItineraryIntent(normText)) {
            extraQuestion =
              'Pour que je vous guide mieux : vous partez d’où et vous avez combien de jours ?';
          } else if (isVideosIntent(normText)) {
            extraQuestion = 'Vous voulez surtout vous inspirer, ou préparer un vrai itinéraire ?';
          }

          if (detectedSlug === 'tadoussac') {
            try {
              const waypoint: [number, number][] = [[48.1446, -69.7174]];
              const suggested = suggestNearbyProducers(producersList, waypoint);
              setNearbyProducers(suggested);
            } catch (error) {
              console.error('Erreur lors de la récupération des producteurs :', error);
            }
          }

          const hotelLine = isHotelBookingIntent(normText)
            ? '\n\nAvant de réserver, le plus utile est de voir rapidement l’ambiance de la destination puis de préparer votre parcours pour éviter de choisir un hôtel mal placé.'
            : '';

          setMessages((prev: Message[]) => [
            ...prev,
            {
              text: `Parfait. Pour **${destinationLabel}**, je peux vous aider à découvrir les incontournables, préparer votre parcours et repérer aussi des **producteurs locaux** pour rendre le voyage plus vivant et gourmand.${hotelLine}

**Vous choisissez :**
- [📘 Lire l'article](${blogUrl})
- [🎥 Voir les vidéos](${videoUrl})
- [🗺️ Ouvrir le planificateur](${plannerUrl})
- [🧺 Producteurs locaux](${INTERNAL_ROUTES.producteurs})
- [🚗 Préparer le voyage](${prepUrl})
- [💛 Coups de cœur du mois](${INTERNAL_ROUTES.coupsDeCoeur})

${extraQuestion}`,
              isUser: false,
              timestamp: new Date().toISOString(),
            },
          ]);

          setIsTyping(false);
          return;
        } catch (error) {
          console.error('Erreur suggestion destination:', error);
        }
      }

      const travelTypeSlug = detectTravelTypeSlug(normText);
      if (travelTypeSlug && BLOG_SLUGS.includes(travelTypeSlug as (typeof BLOG_SLUGS)[number])) {
        const guideUrl = `/blog/${travelTypeSlug}`;

        setMessages((prev: Message[]) => [
          ...prev,
          {
            text: `Très bon angle. Je peux vous aider à préparer ce type de voyage de façon simple, sans vous noyer dans trop d’options.

**Vous choisissez :**
- [📘 Guide complet](${guideUrl})
- [💛 Coups de cœur du mois](${INTERNAL_ROUTES.coupsDeCoeur})
- [🎥 Vidéos](${INTERNAL_ROUTES.videos})
- [🗺️ Ouvrir le planificateur](${INTERNAL_ROUTES.planner})

Vous cherchez plutôt un voyage **relax**, **famille**, ou **bien rempli** avec plusieurs arrêts ?`,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        ]);

        setIsTyping(false);
        return;
      }

      if (isBeginnerIntent(normText)) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            text: `Pas de souci, on va faire ça simplement, étape par étape. Je peux vous aider à choisir une destination, voir l’ambiance, puis préparer un parcours clair.

**Vous choisissez un départ simple :**
- [📍 Explorer les destinations](${INTERNAL_ROUTES.destinations})
- [🧺 Producteurs locaux](${INTERNAL_ROUTES.producteurs})
- [🎥 Vidéos pour s’inspirer](${INTERNAL_ROUTES.videos})
- [💛 Coups de cœur du mois](${INTERNAL_ROUTES.coupsDeCoeur})

Première question : vous partez plutôt en **couple**, **en famille** ou **entre amis** ?`,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        ]);

        setIsTyping(false);
        return;
      }

      if (isNeedIdeaIntent(normText)) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            text: `Je peux vous aider à trouver une destination qui vous ressemble, sans compliquer les choses. Et si vous aimez découvrir le territoire autrement, on peut aussi intégrer des **producteurs locaux** proches de votre future destination.

**Vous choisissez un point de départ :**
- [📍 Explorer les destinations](${INTERNAL_ROUTES.destinations})
- [🧺 Découvrir les producteurs locaux](${INTERNAL_ROUTES.producteurs})
- [🎥 Vidéos pour s’inspirer](${INTERNAL_ROUTES.videos})
- [💛 Coups de cœur du mois](${INTERNAL_ROUTES.coupsDeCoeur})

Vous cherchez plutôt **nature**, **famille**, **gourmand/local** ou **route panoramique** ?`,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        ]);

        setIsTyping(false);
        return;
      }

      if (isHotelBookingIntent(normText) && !detectedSlug && !assistantState.destination) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            text: `Oui, je peux vous aider à préparer la réservation d’un hôtel, mais le plus important d’abord est de viser la bonne destination et le bon secteur.

**Vous choisissez :**
- [📍 Explorer les destinations](${INTERNAL_ROUTES.destinations})
- [🎥 Voir les vidéos](${INTERNAL_ROUTES.videos})
- [🗺️ Ouvrir le planificateur](${INTERNAL_ROUTES.planner})

Pour que je vous oriente correctement : vous avez déjà une destination en tête, ou vous voulez que je vous en suggère ?`,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        ]);

        setIsTyping(false);
        return;
      }

      if (isVideosIntent(normText)) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            text: `Bonne idée. Les vidéos sont parfaites pour se projeter avant de choisir une destination ou un parcours.

**Vous choisissez :**
- [🎥 Voir les vidéos](${INTERNAL_ROUTES.videos})
- [📍 Explorer les destinations](${INTERNAL_ROUTES.destinations})
- [🗺️ Ouvrir le planificateur](${INTERNAL_ROUTES.planner})

Vous voulez des vidéos pour une destination précise, ou juste pour trouver l’inspiration ?`,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        ]);

        setIsTyping(false);
        return;
      }

      if (isProducerIntent(normText)) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            text: `Très bon choix. Les producteurs locaux rendent souvent le voyage beaucoup plus vivant et gourmand.

**Vous choisissez :**
- [🧺 Voir les producteurs locaux](${INTERNAL_ROUTES.producteurs})
- [🗺️ Ouvrir le planificateur](${INTERNAL_ROUTES.planner})
- [📍 Explorer les destinations](${INTERNAL_ROUTES.destinations})

Vous avez déjà une destination en tête pour que je vous oriente vers le bon secteur ?`,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        ]);

        setIsTyping(false);
        return;
      }

      if (isItineraryIntent(normText)) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            text: `Je peux vous aider à construire un parcours simple et agréable, même si tout n’est pas encore défini. Et si vous le souhaitez, on peut aussi y ajouter des **producteurs locaux** pour faire de vraies belles haltes en route.

**Vous choisissez :**
- [🗺️ Ouvrir le planificateur](${INTERNAL_ROUTES.planner})
- [🧺 Voir les producteurs locaux](${INTERNAL_ROUTES.producteurs})
- [📍 Explorer les destinations](${INTERNAL_ROUTES.destinations})
- [🎥 Vidéos](${INTERNAL_ROUTES.videos})

Pour que je vise juste : vous partez d’où et vous avez combien de jours ?`,
            isUser: false,
            timestamp: new Date().toISOString(),
          },
        ]);

        setIsTyping(false);
        return;
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: getLastMessages(messages, userMessage, 8) }),
      });

      if (!res.ok) throw new Error(`Erreur API: ${res.status}`);

      const data: AssistantApiResponse = await res.json();
      const finalMarkdown =
        buildMarkdownFromApiResponse(data) ||
        "Je n'ai pas compris, peux-tu reformuler avec une destination, un nombre de jours ou un style de voyage ?";

      if (data.detectedDestination || data.detectedDurationDays || data.detectedOrigin) {
        setAssistantState((prev) => ({
          ...prev,
          destination: data.detectedDestination ?? prev.destination,
          durationDays: data.detectedDurationDays ?? prev.durationDays,
          origin: data.detectedOrigin ?? prev.origin,
          stage:
            data.intent === 'hotel'
              ? 'lodging'
              : data.intent === 'planner'
                ? 'planner'
                : data.intent === 'producers'
                  ? 'producers'
                  : data.intent === 'destination'
                    ? 'destination'
                    : data.intent === 'idea' || data.intent === 'beginner'
                      ? 'discovery'
                      : prev.stage,
        }));
      }

      if (data.detectedDestination === 'tadoussac' || assistantState.destination === 'tadoussac') {
        try {
          const waypoint: [number, number][] = [[48.1446, -69.7174]];
          const suggested = suggestNearbyProducers(producersList, waypoint);
          setNearbyProducers(suggested);
        } catch (error) {
          console.error('Erreur lors de la récupération des producteurs :', error);
        }
      }

      setMessages((prev: Message[]) => [
        ...prev,
        {
          text: finalMarkdown,
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
          text: `Je sens un petit accroc technique. Pour repartir simplement, dites-moi juste :
- une **destination**
- ou un **nombre de jours**
- ou votre **style de voyage**

Exemple : **"3 jours en famille au départ de Montréal"**.`,
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ]);
      setIsTyping(false);
    }
  };

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
        <div>
          <div className="font-semibold">Assistant GoQuébeCAN</div>
          {assistantState.destination || assistantState.durationDays || assistantState.origin ? (
            <div className="mt-1 text-xs text-gray-500">
              {assistantState.destination ? `Destination: ${assistantState.destination}` : ''}
              {assistantState.destination && assistantState.durationDays ? ' · ' : ''}
              {assistantState.durationDays ? `${assistantState.durationDays} jours` : ''}
              {(assistantState.destination || assistantState.durationDays) && assistantState.origin
                ? ' · '
                : ''}
              {assistantState.origin ? `Départ: ${assistantState.origin}` : ''}
            </div>
          ) : null}
        </div>

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
              <a className="underline" href={INTERNAL_ROUTES.producteurs}>
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
          placeholder="Ex: 3 jours en famille au départ de Montréal"
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
