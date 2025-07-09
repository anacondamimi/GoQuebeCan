'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/CookieBanner';
import BannerCarousel from '@/components/BannerCarousel';
import bannerTexts from './bannerTexts';

export default function LayoutWithBanner({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // ❗ Contenu dynamique de la bannière basé sur la route
  const bannerContent = bannerTexts[pathname] ?? {
    title: '',
    subtitle: '',
  };

  // ❗ Afficher la bannière uniquement si un titre est défini
  const showBanner = bannerContent.title !== '';

  // Optionnel : ces fonctions peuvent être définies ici si besoin
  const scrollToSection = (id: string) => {
    if (typeof document !== 'undefined') {
      const section = document.getElementById(id);

      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openChat = () => {
    if (typeof window !== 'undefined') {
      const chatEvent = new CustomEvent('openChat');
      window.dispatchEvent(chatEvent);
    }
  };

  return (
    <>
      <Navbar />
      {showBanner && (
        <BannerCarousel
          title={bannerContent.title}
          subtitle={bannerContent.subtitle}
          onScrollToSection={scrollToSection}
          onOpenChat={openChat}
        />
      )}
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}
