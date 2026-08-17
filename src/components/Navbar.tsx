'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Dropdown desktop générique
import DropdownMenu from '@/components/DropdownMenu';

// Source unique + résolveurs de slots
import { NAV_SECTIONS, NAV_CTAS, type NavItem } from '@/config/navConfig';
import { resolveDesktopSlot } from '@/config/componentSlots.desktop';
import { resolveMobileSlot } from '@/config/componentSlots.mobile';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

// ─────────────────────────────────────────────────────────────
// Résolution des items d'une section pour DropdownMenu (desktop)
// Transforme les `slot` en composants desktop.
function toDesktopItems(items: NavItem[]) {
  return items.map((item) =>
    item.slot
      ? { label: item.label, component: resolveDesktopSlot(item.slot) }
      : { label: item.label, href: item.href },
  );
}

// ─────────────────────────────────────────────────────────────
// Accordion mobile
function AccordionSection({
  title,
  href,
  items,
  onClose,
}: {
  title: string;
  href?: string;
  items: NavItem[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 pb-2">
      <div className="flex w-full items-center justify-between">
        {/* Titre : cliquable vers le hub si href fourni, sinon simple libellé */}
        {href ? (
          <Link
            href={href}
            onClick={onClose}
            className="flex-1 rounded-md p-2 text-left text-sm font-medium text-gray-700 hover:bg-[#e11d48]/10 hover:text-[#e11d48]"
          >
            {title}
          </Link>
        ) : (
          <span className="flex-1 p-2 text-left text-sm font-medium text-gray-700">{title}</span>
        )}

        {/* Chevron : ne déplie/replie que l'accordéon */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-gray-500 hover:bg-[#e11d48]/10 hover:text-[#e11d48]"
          aria-expanded={open}
          aria-label={open ? `Replier ${title}` : `Déplier ${title}`}
        >
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {open && (
        <div className="space-y-1 pl-4 pt-1">
          {items.map((item, idx) => (
            <div key={idx}>
              {item.slot ? (
                resolveMobileSlot(item.slot)
              ) : (
                <Link
                  href={item.href ?? '#'}
                  onClick={onClose}
                  className="block rounded-md px-2 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#e11d48]"
                >
                  {item.label}
                </Link>
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
            {NAV_SECTIONS.map((section) => (
              <DropdownMenu
                key={section.title}
                title={section.title}
                icon={section.icon}
                items={toDesktopItems(section.items)}
              />
            ))}

            {/* CTA top-level */}
            {NAV_CTAS.map((cta) =>
              cta.variant === 'solid' ? (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="group inline-flex items-center gap-2 rounded-xl bg-orange-500 px-3 py-2 font-semibold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600"
                  aria-label={cta.ariaLabel}
                >
                  <span className="inline-flex items-center gap-2">
                    <CardGiftcardIcon style={{ fontSize: 18 }} />
                    {cta.label}
                  </span>
                  {cta.badge && (
                    <span className="ml-1 rounded-md bg-white/20 px-2 py-0.5 text-xs font-bold tracking-wide group-hover:bg-white/25">
                      {cta.badge}
                    </span>
                  )}
                </Link>
              ) : (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                  aria-label={cta.ariaLabel}
                >
                  {cta.emoji && <span aria-hidden>{cta.emoji}</span>}
                  <span className="whitespace-nowrap">{cta.label}</span>
                </Link>
              ),
            )}
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
        className={`fixed left-0 top-16 z-50 max-h-[calc(100vh-4rem)] w-full origin-top overflow-y-auto transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'scale-y-100 opacity-100' : 'pointer-events-none scale-y-0 opacity-0'
        }`}
      >
        <div className="space-y-3 rounded-b-xl bg-white px-4 pb-4 pt-2 shadow-lg">
          {NAV_SECTIONS.map((section) => (
            <AccordionSection
              key={section.title}
              title={section.title}
              href={section.href}
              items={section.items}
              onClose={() => setIsMenuOpen(false)}
            />
          ))}

          {/* CTA top-level mobile */}
          {NAV_CTAS.map((cta) =>
            cta.variant === 'solid' ? (
              <Link
                key={cta.href}
                href={cta.href}
                onClick={() => setIsMenuOpen(false)}
                className="group block w-full rounded-lg bg-orange-500 py-3 text-center font-semibold text-white shadow-md shadow-orange-500/20 hover:bg-orange-600"
                aria-label={cta.ariaLabel}
              >
                🔥 {cta.label}
                {cta.badge && (
                  <span className="ml-1 rounded-md bg-white/20 px-2 py-0.5 text-xs font-bold tracking-wide group-hover:bg-white/25">
                    {cta.badge}
                  </span>
                )}
              </Link>
            ) : (
              <Link
                key={cta.href}
                href={cta.href}
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex w-full items-center gap-2 whitespace-nowrap rounded-lg px-3 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                aria-label={cta.ariaLabel}
              >
                {cta.emoji && <span aria-hidden>{cta.emoji}</span>}
                <span className="whitespace-nowrap">{cta.label}</span>
              </Link>
            ),
          )}
        </div>
      </div>
    </nav>
  );
}
