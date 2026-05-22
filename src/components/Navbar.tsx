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
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

// ─────────────────────────────────────────────────────────────
// Accordion mobile
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
        className="flex w-full items-center justify-between rounded-md p-2 text-left font-medium text-gray-700 hover:bg-[#e11d48]/10 hover:text-[#e11d48]"
        aria-expanded={open}
      >
        <span className="text-sm">{title}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {open && (
        <div className="space-y-2 pl-4 pt-2">
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

// ─────────────────────────────────────────────────────────────
// Navbar
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Effet scroll (fond + blur)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloque le scroll quand menu mobile ouvert
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[999] transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 shadow-md backdrop-blur-md'
          : 'bg-white/80 shadow-sm backdrop-blur-sm'
      }`}
    >
      <div className="ml-0 mr-auto max-w-[95%] px-2 sm:px-4 lg:px-6">
        <div className="flex h-16 w-full items-center justify-between">
          {/* Logo */}
          <Link href="/" aria-label="Accueil" className="shrink-0">
            <div className="relative size-12">
              <Image
                src="/logo2.avif"
                alt="Logo GoQuébeCan"
                fill
                unoptimized
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Menu Desktop */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
            {/* Découvrir */}
            <DropdownMenu
              title="Découvrir"
              icon={<ChevronDown size={16} />}
              items={[
                { label: '🌄 Destinations', component: <DestinationsMegaMenu /> },
                { label: '🌿 Vivre une expérience', href: '/experiences' },
                { label: '🚐 Le Canada en VR', href: '/blog/location-vr' },
                { label: '🧀 Producteurs du Québec', href: '/producteurs' },
                { label: '⛺ Camping', href: '/camping' },
              ]}
            />

            {/* Préparer son voyage */}
            <DropdownMenu
              title={
                <span className="whitespace-nowrap">
                  <span className="hidden lg:inline">Préparer&nbsp;son&nbsp;voyage</span>
                  <span className="inline lg:hidden">Préparer</span>
                </span>
              }
              icon={<MapIcon style={{ color: '#e11d48', fontSize: 20 }} />}
              items={[
                { label: '🗺️ Planifier son itinéraire', href: '/planificateur' },
                { label: '🧳 Produits de voyage', component: <DropdownObjetsMenu /> },
                { label: '📹 Vidéos', href: '/videos' },
                { label: '✈️ Vols', href: '/vols' },
              ]}
            />
            {/* Communauté */}
            <DropdownMenu
              title="Communauté"
              icon={<GroupsIcon style={{ color: '#8b5cf6', fontSize: 20 }} />}
              items={[
                { href: '/itineraires-communaute', label: '🗂️ Itinéraires' },
                { href: '/contact', label: '📧 Contact' },
              ]}
            />
            {/* coups de coeur du mois (CTA) */}
            <Link
              href="/coups-de-coeur"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
              aria-label="Voir le coup de cœur du mois GoQuébeCan"
            >
              <span aria-hidden>❤️</span>
              <span className="whitespace-nowrap">Coup de cœur</span>
            </Link>
            {/* Économiser (CTA) */}
            <Link
              href="/offres"
              className="group inline-flex items-center gap-2 rounded-xl bg-orange-500 px-3 py-2 font-semibold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600"
              aria-label="Voir les offres spéciales pour économiser"
            >
              <span className="inline-flex items-center gap-2">
                <CardGiftcardIcon style={{ fontSize: 18 }} />
                Économiser
              </span>
              <span className="ml-1 rounded-md bg-white/20 px-2 py-0.5 text-xs font-bold tracking-wide group-hover:bg-white/25">
                Nouveau
              </span>
            </Link>
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md p-2 text-gray-700 transition-transform duration-200 hover:text-[#e11d48]"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay cliquable pour fermer */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-200 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden
      />

      {/* Menu Mobile */}
      <div
        id="mobile-menu"
        className={`fixed left-0 top-16 z-50 w-full origin-top transition-transform duration-300 ease-in-out md:hidden${
          isMenuOpen ? 'scale-y-100 opacity-100' : 'pointer-events-none scale-y-0 opacity-0'
        }`}
      >
        <div className="space-y-4 rounded-b-xl bg-white px-4 pb-3 pt-2 shadow-lg">
          <AccordionSection
            title="Découvrir le Québec"
            items={[
              { label: '🌄 Destinations', component: <DropdownDestinations /> },
              { label: '🌿 Vivre une expérience', href: '/experiences' },
              { label: '🧀 Producteurs du Québec', href: '/producteurs' },
              { label: '⛺ Camping', href: '/camping' },
              { label: '🚐 Le Canada en VR', href: '/blog/location-vr' },
            ]}
            onClose={() => setIsMenuOpen(false)}
          />
          {/* ✅ Coup de cœur (top-level, au-dessus des accordéons) */}
          <Link
            href="/coups-de-coeur"
            onClick={() => setIsMenuOpen(false)}
            className="inline-flex w-full items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
            aria-label="Voir le coup de cœur du mois GoQuébeCan"
          >
            <span aria-hidden>❤️</span>
            <span className="whitespace-nowrap">Coup de cœur</span>
          </Link>

          <AccordionSection
            title="Préparer son voyage"
            items={[
              { label: '🗺️ Planifier son itinéraire', href: '/planificateur' },
              { label: '🎒 Objets utiles', component: <DropdownObjetsMobile /> },
              { label: '📹 Vidéos', href: '/videos' },
              { label: '✈️ Vols', href: '/vols' },
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

          {/* ✅ Nouvelle section mobile : Économiser */}
          <AccordionSection
            title="Économiser"
            items={[
              {
                label: '',
                component: (
                  <Link
                    href="/offres"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full rounded-lg bg-orange-500 py-3 text-center font-semibold text-white shadow-md shadow-orange-500/20 hover:bg-orange-600"
                    aria-label="Voir les offres spéciales"
                  >
                    🔥 Offres spéciales
                    <span className="badge-pulse ml-1 rounded-md bg-white/20 px-2 py-0.5 text-xs font-bold tracking-wide group-hover:bg-white/25">
                      Nouveau
                    </span>
                  </Link>
                ),
              },
            ]}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
}
