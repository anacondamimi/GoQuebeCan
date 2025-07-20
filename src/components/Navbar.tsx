'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Dropdowns
import DropdownMenu from '@/components/DropdownMenu';
import DestinationsMegaMenu from '@/components/DestinationsMegaMenu';
import DropdownObjetsMenu from '@/components/DropdownObjetsMenu';
import DropdownDestinations from '@/components/DropdownDestinations';
import DropdownObjetsMobile from '@/components/DropdownObjetsMobile';

// Icons
import MapIcon from '@mui/icons-material/Map';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// 📌 Accordion pour le menu mobile
function AccordionSection({
  title,
  items,
  onClose,
}: {
  title: string;
  items: { label: string; href?: string; component?: React.ReactNode }[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 pb-2">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-2 py-2 text-left font-medium text-gray-700 hover:text-[#e11d48] hover:bg-[#e11d48]/10 rounded-md"
      >
        <span className="text-sm">{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {open && (
        <div className="pl-4 pt-2 space-y-2">
          {items.map((item, idx) => (
            <div key={idx}>
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block text-sm text-gray-600 hover:text-[#e11d48]"
                >
                  {item.label}
                </Link>
              ) : (
                item.component
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 📌 Navbar principale
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => setScrolled(window.scrollY > 10);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-white shadow-sm'
      }`}
    >
      <div className="max-w-[95%] ml-0 mr-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <Link href="/" aria-label="Accueil" className="flex-shrink-0">
            <Image
              src="/logo.avif"
              alt="Logo GoQuébeCan"
              width={48}
              height={48}
              unoptimized
              priority
              className="object-contain"
            />
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            {/* Famille 1 - Découvrir */}
            <DropdownMenu
              title="Découvrir"
              icon={<ChevronDown size={16} />}
              items={[
                {
                  label: '🌄 Destinations',
                  component: <DestinationsMegaMenu />,
                },
                {
                  label: '🌿 Vivre une expérience',
                  href: '/experiences',
                },
                {
                  label: '🧀 Producteurs du Québec',
                  href: '/producteurs',
                },
                {
                  label: '⛺ Camping',
                  href: '/camping',
                },
              ]}
            />
            {/* Famille 2 - Préparer son voyage */}
            <DropdownMenu
              title="Préparer son voyage"
              icon={<MapIcon style={{ color: '#e11d48', fontSize: 20 }} />}
              items={[
                {
                  label: '🗺️ Planifier son itinéraire',
                  href: '/planificateur',
                },
                {
                  label: '🧳 Produits de voyage',
                  component: <DropdownObjetsMenu />, // <-- méga menu produits
                },
                {
                  label: '📹 Vidéos',
                  href: '/videos',
                },
                {
                  label: '✈️ Vols',
                  href: '/vols',
                },
                {
                  label: '🚐 Le Canada en VR',
                  href: '/blog/location-vr',
                },
              ]}
            />
            {/* Famille 3 - Communauté */}
            <DropdownMenu
              title="Communauté"
              icon={<GroupsIcon style={{ color: '#8b5cf6', fontSize: 20 }} />}
              items={[
                { href: '/itineraires-communaute', label: '🗂️ Itinéraires' },
                { href: '/contact', label: '📧 Contact' },
              ]}
            />
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#e11d48] transition-transform duration-200"
              aria-label="Menu"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={`md:hidden transform transition-transform duration-300 ease-in-out origin-top ${
          isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-3 bg-white shadow-lg rounded-b-xl space-y-4">
          <AccordionSection
            title="Découvrir le Québec"
            items={[
              { label: '🌄 Destinations', component: <DropdownDestinations /> },
              { label: '🌿 Vivre une expérience', href: '/experiences' },
              { label: '🧀 Producteurs du Québec', href: '/producteurs' },
              { label: '⛺ Camping', href: '/camping' },
            ]}
            onClose={() => setIsMenuOpen(false)}
          />

          <AccordionSection
            title="Préparer son voyage"
            items={[
              { label: '🗺️ Planifier son itinéraire', href: '/planificateur' },
              { label: '🎒 Objets utiles', component: <DropdownObjetsMobile /> },
              { label: '📹 Vidéos', href: '/videos' },
              { label: '✈️ Vols', href: '/vols' },
              { label: '🚐 Le Canada en VR', href: '/blog/location-vr' },
            ]}
            onClose={() => setIsMenuOpen(false)}
          />

          <AccordionSection
            title="Communauté"
            items={[
              { label: '🧭 Itinéraires de la communauté', href: '/itineraires-communaute' },
              { label: '📬 Contact', href: '/contact' },
            ]}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
}
