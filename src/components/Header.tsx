// components/Header.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, MessageSquare } from 'lucide-react';

// Définition du type HeaderProps
interface HeaderProps {
  onScrollToSection: (section: string) => void;
  onOpenChat: () => void;
}

export const Header = ({ onScrollToSection, onOpenChat }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Pour détecter le défilement (facultatif, uniquement pour l'apparence visuelle)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Puisque nous n'utilisons pas de défilement, vous pouvez simplement définir isScrolled à true
    // après un délai pour simuler le comportement, ou le supprimer complètement
    setTimeout(() => {
      setIsScrolled(true);
    }, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className={`text-xl font-bold ${isScrolled ? 'text-indigo-600' : 'text-white'}`}>
            Camping Guide
          </span>
        </Link>

        {/* Navigation sur Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => onScrollToSection('features')}
            className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-indigo-500`}
          >
            Fonctionnalités
          </button>
          <button
            onClick={() => onScrollToSection('planification')}
            className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-indigo-500`}
          >
            Planification
          </button>
          <button
            onClick={() => onScrollToSection('destinations')}
            className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-indigo-500`}
          >
            Destinations
          </button>
          <button
            onClick={() => onScrollToSection('carte_interactive')}
            className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-indigo-500`}
          >
            Carte
          </button>
          <button
            onClick={() => onScrollToSection('objets_utiles')}
            className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-indigo-500`}
          >
            Équipement
          </button>
          <button
            onClick={() => onOpenChat()}
            className={`flex items-center gap-2 ${
              isScrolled ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'
            } px-4 py-2 rounded-lg`}
          >
            <MessageSquare size={18} />
            <span>Chat</span>
          </button>
        </nav>

        {/* Bouton Menu pour Mobile */}
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
        <div className="absolute top-full left-0 right-0 bg-white shadow-md py-4 md:hidden">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <button
              onClick={() => {
                onScrollToSection('features');
                toggleMenu();
              }}
              className="text-gray-700 hover:text-indigo-600 text-left py-2"
            >
              Fonctionnalités
            </button>
            <button
              onClick={() => {
                onScrollToSection('planification');
                toggleMenu();
              }}
              className="text-gray-700 hover:text-indigo-600 text-left py-2"
            >
              Planification
            </button>
            <button
              onClick={() => {
                onScrollToSection('destinations');
                toggleMenu();
              }}
              className="text-gray-700 hover:text-indigo-600 text-left py-2"
            >
              Destinations
            </button>
            <button
              onClick={() => {
                onScrollToSection('carte_interactive');
                toggleMenu();
              }}
              className="text-gray-700 hover:text-indigo-600 text-left py-2"
            >
              Carte
            </button>
            <button
              onClick={() => {
                onScrollToSection('objets_utiles');
                toggleMenu();
              }}
              className="text-gray-700 hover:text-indigo-600 text-left py-2"
            >
              Équipement
            </button>
            <button
              onClick={() => {
                onOpenChat();
                toggleMenu();
              }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg w-full justify-center"
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
