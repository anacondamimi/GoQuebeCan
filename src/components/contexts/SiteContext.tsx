'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from 'react';

// ✅ Type du message utilisé dans le chatbot
export interface Message {
  text: string;
  isUser: boolean;
  timestamp: string; // format ISO (compatible SSR/JSON)
}

// ✅ Interface du contexte global
interface SiteContextType {
  chatOpen: boolean;
  setChatOpen: Dispatch<SetStateAction<boolean>>;

  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;

  isTyping: boolean;
  setIsTyping: Dispatch<SetStateAction<boolean>>;
}

// ✅ Création du contexte
const SiteContext = createContext<SiteContextType | undefined>(undefined);

// ✅ Fournisseur global du contexte
export function SiteProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // ✅ 1. Charger les messages depuis localStorage (ou afficher message de bienvenue)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('goquebecan_messages');
    if (stored) {
      try {
        const parsed: Message[] = JSON.parse(stored);
        setMessages(parsed);
        return;
      } catch {
        console.warn('Impossible de lire les messages du localStorage.');
      }
    }

    // Aucun message → message de bienvenue
    setMessages([
      {
        text: '👋 Bonjour ! Je suis votre assistant voyage au Québec. Posez-moi vos questions : destinations, camping, hôtels, budget, famille…',
        isUser: false,
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  // ✅ 2. Sauvegarder automatiquement les 50 derniers messages
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      // Ne garder que les 50 plus récents
      const limited = messages.slice(-50);
      localStorage.setItem('goquebecan_messages', JSON.stringify(limited));

      // Si le tableau dépasse 50, on met à jour l’état pour purger les anciens
      if (limited.length !== messages.length) {
        setMessages(limited);
      }
    }
  }, [messages]);

  const value: SiteContextType = {
    chatOpen,
    setChatOpen,
    messages,
    setMessages,
    isTyping,
    setIsTyping,
  };

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

// ✅ Hook d'accès au contexte
export function useSite(): SiteContextType {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}
