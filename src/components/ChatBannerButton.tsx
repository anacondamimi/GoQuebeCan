'use client';

import { MessageSquareText } from 'lucide-react';

export default function ChatBannerButton() {
  const handleOpenChat = () => {
    // On déclenche l'événement global que Chatbot.tsx écoute déjà
    window.dispatchEvent(new Event('openChat'));
  };

  return (
    <button
      onClick={handleOpenChat}
      className="flex items-center gap-2 rounded-lg border border-white/85 px-4 py-2.5 text-[clamp(0.95rem,2.2vw,1.125rem)] font-semibold text-white shadow-md shadow-black/25 hover:bg-white hover:text-black sm:px-6 sm:py-3"
    >
      <MessageSquareText size={20} />
      Parler à notre assistant
    </button>
  );
}
