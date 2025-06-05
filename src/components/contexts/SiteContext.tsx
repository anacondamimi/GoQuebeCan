'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// ✅ Type du message utilisé dans le chatbot
export interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// ✅ Interface du contexte partagé à toute l'app
interface SiteContextType {
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;

  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;

  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
}

// ✅ Création du contexte
const SiteContext = createContext<SiteContextType | undefined>(undefined);

// ✅ Fournisseur du contexte
export function SiteProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      text: '👋 Bonjour ! Je suis votre assistant voyage au Québec. Posez-moi vos questions : destinations, camping, hôtels, budget, famille…',
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  return (
    <SiteContext.Provider
      value={{
        chatOpen,
        setChatOpen,
        messages,
        setMessages,
        isTyping,
        setIsTyping,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

// ✅ Hook pour utiliser le contexte
export function useSite(): SiteContextType {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
}
