'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X, MessageSquare } from 'lucide-react';

interface HeaderProps {
  /** Si tu veux plus tard configurer les IDs des sections, tu pourras ajouter des props sérialisables ici. */
}

export const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Détection du défilement (uniquement pour l'apparence)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // état initial

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const scrollToSection = (sectionId: string) => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById(sectionId);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openChat = () => {
    if (typeof window === 'undefined') return;

    // Événement global : ton composant Chatbot peut écouter cet évènement
    window.dispatchEvent(new CustomEvent('open-chat'));
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white py-2 shadow-md' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <span className={`text-xl font-bold ${isScrolled ? 'text-indigo-600' : 'text-white'}`}>
            Camping Guide
          </span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden items-center space-x-6 md:flex">
          <button
            onClick={() => scrollToSection('features')}
            className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-indigo-500`}
          >
            Fonctionnalités
          </button>
          <button
            onClick={() => scrollToSection('planification')}
            className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-indigo-500`}
          >
            Planification
          </button>
          <button
            onClick={() => scrollToSection('destinations')}
            className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-indigo-500`}
          >
            Destinations
          </button>
          <button
            onClick={() => scrollToSection('carte_interactive')}
            className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-indigo-500`}
          >
            Carte
          </button>
          <button
            onClick={() => scrollToSection('objets_utiles')}
            className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-indigo-500`}
          >
            Équipement
          </button>
          <button
            onClick={openChat}
            className={`flex items-center gap-2 ${
              isScrolled ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'
            } rounded-lg px-4 py-2`}
          >
            <MessageSquare size={18} />
            <span>Chat</span>
          </button>
        </nav>

        {/* Bouton Menu Mobile */}
        <button
          className={`md:hidden ${isScrolled ? 'text-gray-800' : 'text-white'}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-full bg-white py-4 shadow-md md:hidden">
          <div className="container mx-auto flex flex-col space-y-4 px-4">
            <button
              onClick={() => {
                scrollToSection('features');
                toggleMenu();
              }}
              className="py-2 text-left text-gray-700 hover:text-indigo-600"
            >
              Fonctionnalités
            </button>
            <button
              onClick={() => {
                scrollToSection('planification');
                toggleMenu();
              }}
              className="py-2 text-left text-gray-700 hover:text-indigo-600"
            >
              Planification
            </button>
            <button
              onClick={() => {
                scrollToSection('destinations');
                toggleMenu();
              }}
              className="py-2 text-left text-gray-700 hover:text-indigo-600"
            >
              Destinations
            </button>
            <button
              onClick={() => {
                scrollToSection('carte_interactive');
                toggleMenu();
              }}
              className="py-2 text-left text-gray-700 hover:text-indigo-600"
            >
              Carte
            </button>
            <button
              onClick={() => {
                scrollToSection('objets_utiles');
                toggleMenu();
              }}
              className="py-2 text-left text-gray-700 hover:text-indigo-600"
            >
              Équipement
            </button>
            <button
              onClick={() => {
                openChat();
                toggleMenu();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white"
            >
              <MessageSquare size={18} />
              <span>Chat</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
