'use client';

import React, { useRef, useEffect, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ChatbotCTAButtons from '@/components/ChatbotCTAButtons';
import {
  MessageSquare,
  X,
  Send,
  MapPinned,
  Users,
  CalendarDays,
  Route,
  Wheat,
  Sparkles,
} from 'lucide-react';
import { useSite, Message } from '@/components/contexts/SiteContext';
import { BLOG_SLUGS } from '@/data/blog-slugs';

type AssistantIntent =
  | 'idea'
  | 'destination'
  | 'hotel'
  | 'article'
  | 'videos'
  | 'planner'
  | 'producers'
  | 'beginner'
  | 'compare'
  | 'roadtrip'
  | 'general';

type TravelerProfile = {
  origin?: string;
  destination?: string;
  durationDays?: number;
  dateText?: string;
  season?: 'printemps' | 'ete' | 'automne' | 'hiver' | 'unknown';
  travelersText?: string;
  withKids?: boolean;
  travelStyle?: string;
  budget?: 'petit' | 'moyen' | 'haut' | 'unknown';
  pace?: 'relax' | 'equilibre' | 'intense' | 'unknown';
  transport?: 'auto' | 'vr' | 'moto' | 'avion' | 'unknown';
  interests?: string[];
  likesLocalFood?: boolean;
  avoidsCrowds?: boolean;
  needsLodging?: boolean;
};

type SuggestedItineraryDay = {
  day: number;
  title: string;
  description: string;
  relatedSlug?: string;
};

type AssistantProducer = {
  name: string;
  type?: string;
  city?: string;
  region?: string;
  reason?: string;
};

type AssistantApiResponse = {
  message?: string;
  markdown?: string;
  intent?: AssistantIntent;
  travelerProfile?: TravelerProfile;
  recommendationSummary?: string;
  suggestedItinerary?: SuggestedItineraryDay[];
  producers?: AssistantProducer[];
  links?: Array<{ label: string; href: string }>;
  nextQuestion?: string | null;
  detectedDestination?: string;
  detectedDurationDays?: number;
  detectedOrigin?: string;
};

type TravelAssistantState = {
  stage: 'welcome' | 'discovery' | 'destination' | 'lodging' | 'planner' | 'producers' | 'general';
  profile: TravelerProfile;
  lastIntent?: AssistantIntent;
  suggestedItinerary: SuggestedItineraryDay[];
  producers: AssistantProducer[];
};

const INITIAL_ASSISTANT_STATE: TravelAssistantState = {
  stage: 'welcome',
  profile: {},
  suggestedItinerary: [],
  producers: [],
};

const INTERNAL_ROUTES = {
  destinations: '/#destinations-populaires',
  blog: '/blog',
  planner: '/planificateur',
  producteurs: '/producteurs',
  coupsDeCoeur: '/coups-de-coeur',
  offres: '/offres',
  videos: '/videos',
  voyageVoiture: '/blog/voyage-voiture',
  voyageHotel: '/blog/voyage-hotel',
  voyageCamping: '/blog/voyage-camping',
  voyageAvion: '/blog/voyage-avion',
} as const;

function normalizeText(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasInternalLinksMarkdown(text: string) {
  return /\]\(\/[a-z0-9#/-]+/i.test(text);
}

function getLastMessages(all: Message[], userMessage: Message, limit = 10) {
  const merged = [...all, userMessage];
  return merged.slice(Math.max(0, merged.length - limit));
}

function buildMarkdownFromApiResponse(data: AssistantApiResponse): string {
  if (data.markdown && data.markdown.trim()) return data.markdown.trim();

  const lines: string[] = [];
  if (data.message) lines.push(data.message.trim());
  if (data.recommendationSummary) lines.push('', data.recommendationSummary.trim());



  if (data.producers && data.producers.length > 0) {
    lines.push('', '**Haltes locales possibles :**');
    for (const producer of data.producers.slice(0, 4)) {
      const meta = [producer.type, producer.city || producer.region].filter(Boolean).join(' · ');
      lines.push(
        `- **${producer.name}**${meta ? ` — ${meta}` : ''}${producer.reason ? ` : ${producer.reason}` : ''}`,
      );
    }
  }

  if (data.links && data.links.length > 0) {
    lines.push('', '**Vous choisissez :**');
    for (const link of data.links.slice(0, 4)) {
      lines.push(`- [${link.label}](${link.href})`);
    }
  }

  if (data.nextQuestion) lines.push('', data.nextQuestion.trim());
  return lines.join('\n').trim();
}

function compactDestinationLabel(slug?: string) {
  if (!slug) return '';
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function mergeProfile(prev: TravelerProfile, next?: TravelerProfile): TravelerProfile {
  if (!next) return prev;

  const mergedInterests = Array.from(
    new Set([...(prev.interests ?? []), ...(Array.isArray(next.interests) ? next.interests : [])]),
  );

  return {
    ...prev,
    ...next,
    interests: mergedInterests,
  };
}

function inferLocalProfile(input: string, previousProfile: TravelerProfile): TravelerProfile {
  const norm = normalizeText(input);
  const profile: TravelerProfile = { ...previousProfile };

  const duration = norm.match(/\b(\d{1,2})\s?(jour|jours|j)\b/);
  if (duration) profile.durationDays = Number(duration[1]);

  const originPatterns = [
    /\bdépart de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bdepart de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bon part de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bje pars de ([a-zA-ZÀ-ÿ' -]+)/i,
    /\bnous partons de ([a-zA-ZÀ-ÿ' -]+)/i,
  ];

  for (const pattern of originPatterns) {
    const match = input.match(pattern);
    if (match?.[1]) {
      profile.origin = match[1].trim().replace(/[?.!,;:]+$/g, '');
      break;
    }
  }

  const sortedSlugs = [...BLOG_SLUGS].sort((a, b) => b.length - a.length);
  for (const slug of sortedSlugs) {
    const slugNorm = normalizeText(slug);
    const pattern = slugNorm.replace(/-/g, '[-\\s]?');
    const re = new RegExp(`(?:^|[^a-z0-9])${pattern}(?:[^a-z0-9]|$)`);
    if (re.test(norm)) {
      profile.destination = slug;
      break;
    }
  }

  const interests = new Set(profile.interests ?? []);
  if (norm.includes('nature') || norm.includes('plein air')) interests.add('nature');
  if (norm.includes('producteur') || norm.includes('local') || norm.includes('gourmand'))
    interests.add('producteurs locaux');
  if (norm.includes('hotel') || norm.includes('hebergement')) interests.add('hébergement');
  if (norm.includes('camping')) interests.add('camping');
  if (norm.includes('video') || norm.includes('youtube')) interests.add('vidéos');
  profile.interests = Array.from(interests);

  if (norm.includes('famille') || norm.includes('enfant')) {
    profile.withKids = true;
    profile.travelersText = profile.travelersText ?? 'famille';
  }

  if (norm.includes('couple')) profile.travelersText = profile.travelersText ?? 'couple';
  if (
    norm.includes('eviter la foule') ||
    norm.includes('pas trop touristique') ||
    norm.includes('tranquille')
  ) {
    profile.avoidsCrowds = true;
    profile.pace = profile.pace ?? 'relax';
  }
  if (norm.includes('relax') || norm.includes('repos')) profile.pace = 'relax';
  if (norm.includes('intense') || norm.includes('beaucoup de choses')) profile.pace = 'intense';
  if (norm.includes('pas cher') || norm.includes('petit budget')) profile.budget = 'petit';
  if (
    norm.includes('hotel') ||
    norm.includes('hebergement') ||
    norm.includes('ou dormir') ||
    norm.includes('où dormir')
  ) {
    profile.needsLodging = true;
  }
  if (
    norm.includes('producteur') ||
    norm.includes('fromage') ||
    norm.includes('cidre') ||
    norm.includes('biere')
  ) {
    profile.likesLocalFood = true;
  }

  return profile;
}

function getStageFromIntent(intent?: AssistantIntent): TravelAssistantState['stage'] {
  if (intent === 'hotel') return 'lodging';
  if (intent === 'planner' || intent === 'roadtrip') return 'planner';
  if (intent === 'producers') return 'producers';
  if (intent === 'destination' || intent === 'article') return 'destination';
  if (intent === 'idea' || intent === 'beginner' || intent === 'compare') return 'discovery';
  return 'general';
}

function ProfileChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border bg-white px-2 py-1 text-xs text-gray-700 shadow-sm">
      {icon}
      {label}
    </span>
  );
}

function TravelerProfilePanel({ profile }: { profile: TravelerProfile }) {
  const chips = useMemo(() => {
    const result: Array<{ key: string; icon: React.ReactNode; label: string }> = [];

    if (profile.origin) {
      result.push({
        key: 'origin',
        icon: <MapPinned className="size-3" />,
        label: `Départ : ${profile.origin}`,
      });
    }
    if (profile.destination) {
      result.push({
        key: 'destination',
        icon: <Route className="size-3" />,
        label: `Destination : ${compactDestinationLabel(profile.destination)}`,
      });
    }
    if (profile.durationDays) {
      result.push({
        key: 'duration',
        icon: <CalendarDays className="size-3" />,
        label: `${profile.durationDays} jours`,
      });
    }
    if (profile.travelersText) {
      result.push({
        key: 'travelers',
        icon: <Users className="size-3" />,
        label: profile.travelersText,
      });
    }
    if (profile.likesLocalFood) {
      result.push({ key: 'local', icon: <Wheat className="size-3" />, label: 'Local / gourmand' });
    }
    if (profile.avoidsCrowds) {
      result.push({ key: 'crowds', icon: <Sparkles className="size-3" />, label: 'Tranquille' });
    }
    if (profile.pace && profile.pace !== 'unknown') {
      result.push({
        key: 'pace',
        icon: <Sparkles className="size-3" />,
        label: `Rythme : ${profile.pace}`,
      });
    }

    return result;
  }, [profile]);

  if (chips.length === 0) return null;

  return (
    <div className="border-b bg-blue-50/60 p-3">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-800">
        Profil du voyage
      </div>
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <ProfileChip key={chip.key} icon={chip.icon} label={chip.label} />
        ))}
      </div>
    </div>
  );
}

function ItineraryPreview({ days }: { days: SuggestedItineraryDay[] }) {
  if (!days.length) return null;

  return (
    <div className="mt-3 rounded-xl border bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
        <Route className="size-4 text-blue-600" />
        Parcours proposé
      </div>
      <div className="space-y-2">
        {days.slice(0, 5).map((day) => (
          <div
            key={`${day.day}-${day.title}`}
            className="rounded-lg bg-gray-50 p-2 text-xs text-gray-700"
          >
            <div className="font-semibold text-gray-900">
              Jour {day.day} — {day.title}
            </div>
            <div className="mt-1 leading-relaxed">{day.description}</div>
            {day.relatedSlug &&
            BLOG_SLUGS.includes(day.relatedSlug as (typeof BLOG_SLUGS)[number]) ? (
              <a
                href={`/blog/${day.relatedSlug}`}
                className="mt-1 inline-block text-blue-700 underline"
              >
                Lire l’article lié
              </a>
            ) : null}
          </div>
        ))}
      </div>
      <a
        href={INTERNAL_ROUTES.planner}
        className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700"
      >
        Ouvrir le planificateur
      </a>
    </div>
  );
}

function ProducersPreview({ producers }: { producers: AssistantProducer[] }) {
  if (!producers.length) return null;

  return (
    <div className="mt-3 rounded-xl border bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
        <Wheat className="size-4 text-amber-600" />
        Haltes locales suggérées
      </div>
      <ul className="space-y-2 text-xs text-gray-700">
        {producers.slice(0, 4).map((producer, index) => {
          const meta = [producer.type, producer.city || producer.region]
            .filter(Boolean)
            .join(' · ');
          return (
            <li key={`${producer.name}-${index}`} className="rounded-lg bg-gray-50 p-2">
              <div className="font-semibold text-gray-900">{producer.name}</div>
              {meta ? <div className="text-gray-500">{meta}</div> : null}
              {producer.reason ? (
                <div className="mt-1 leading-relaxed">{producer.reason}</div>
              ) : null}
            </li>
          );
        })}
      </ul>
      <a
        href={INTERNAL_ROUTES.producteurs}
        className="mt-3 inline-block text-xs font-semibold text-blue-700 underline"
      >
        Voir tous les producteurs locaux
      </a>
    </div>
  );
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
  const [assistantState, setAssistantState] =
    useState<TravelAssistantState>(INITIAL_ASSISTANT_STATE);
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
useEffect(() => {
  const saved = localStorage.getItem('goquebecan-assistant-state');
  if (!saved) return;

  try {
    setAssistantState(JSON.parse(saved));
  } catch {
    localStorage.removeItem('goquebecan-assistant-state');
  }
}, []);
  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const currentInput = input.trim();
    setInput('');

    const userMessage: Message = {
      text: currentInput,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    const localProfile = inferLocalProfile(currentInput, assistantState.profile);

    setAssistantState((prev) => ({
      ...prev,
      profile: localProfile,
    }));

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: getLastMessages(messages, userMessage, 10),
          profile: localProfile,
        }),
      });

      if (!res.ok) throw new Error(`Erreur API: ${res.status}`);

      const data: AssistantApiResponse = await res.json();
      const finalMarkdown =
        buildMarkdownFromApiResponse(data) ||
        "Je n'ai pas assez d'informations pour vous guider correctement. Dites-moi votre point de départ, votre durée ou votre style de voyage.";

      const mergedProfile = mergeProfile(localProfile, data.travelerProfile);

      if (data.detectedDestination) mergedProfile.destination = data.detectedDestination;
      if (typeof data.detectedDurationDays === 'number')
        mergedProfile.durationDays = data.detectedDurationDays;
      if (data.detectedOrigin) mergedProfile.origin = data.detectedOrigin;

      setAssistantState((prev) => ({
        ...prev,
        stage: getStageFromIntent(data.intent),
        lastIntent: data.intent,
        profile: mergedProfile,
        suggestedItinerary: Array.isArray(data.suggestedItinerary) ? data.suggestedItinerary : [],
        producers: Array.isArray(data.producers) ? data.producers : [],
      }));

      setMessages((prev: Message[]) => [
        ...prev,
        {
          text: finalMarkdown,
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      console.error('Erreur chatbot:', err);
      setMessages((prev: Message[]) => [
        ...prev,
        {
          text: 'Je sens un petit accroc technique, mais on peut repartir simplement.\n\nDites-moi par exemple : **"4 jours en famille au départ de Montréal, nature et producteurs locaux"**.',
          isUser: false,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        aria-label="Ouvrir l’assistant de voyage"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg hover:bg-blue-700"
      >
        <MessageSquare className="size-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[620px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b bg-white p-3">
        <div>
          <div className="font-semibold">Assistant GoQuébeCAN</div>
          <div className="mt-1 text-xs text-gray-500">Conseiller de voyage intelligent</div>
        </div>

        <button
          aria-label="Fermer"
          onClick={() => setIsOpen(false)}
          className="rounded p-2 hover:bg-gray-100"
        >
          <X className="size-5" />
        </button>
      </div>

      <TravelerProfilePanel profile={assistantState.profile} />

      <div className="flex-1 overflow-auto p-3">
        {messages.length === 0 ? (
          <div className="mb-3 rounded-2xl bg-blue-50 p-3 text-sm text-gray-800">
            Bonjour, je peux vous aider à choisir une destination, construire un itinéraire, trouver
            des producteurs locaux ou préparer un voyage selon votre départ, votre durée et votre
            style.
            <div className="mt-2 text-xs text-gray-600">
              Exemple :{' '}
              <strong>
                4 jours en famille au départ de Montréal, nature et producteurs locaux
              </strong>
            </div>
          </div>
        ) : null}

        {messages.map((msg: Message, i: number) => (
          <div
            key={`${msg.timestamp}-${i}`}
            className={`mb-3 flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
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
              Je prépare une réponse personnalisée…
            </div>
          </div>
        )}

        <ItineraryPreview days={assistantState.suggestedItinerary} />
        <ProducersPreview producers={assistantState.producers} />

        <div ref={messagesEndRef} />
        <ChatbotCTAButtons visible={showStaticCtas && messages.length > 0} />
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 border-t p-3">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Ex: 4 jours nature au départ de Montréal"
          autoComplete="off"
          name="goquebecan-travel-assistant-input"
          id="goquebecan-travel-assistant-input"
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
