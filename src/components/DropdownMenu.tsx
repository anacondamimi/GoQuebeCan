'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  /** Libellé affiché dans la liste du dropdown */
  label: string | React.ReactNode;
  /** Lien direct (si présent) */
  href?: string;
  /** Méga menu rendu à l'ouverture de l'item (si présent) */
  component?: React.ReactNode;
}

interface DropdownMenuProps {
  title: React.ReactNode;
  icon?: React.ReactNode;
  items: MenuItem[];
}

/**
 * DropdownMenu — comportement HYBRIDE.
 * - Souris : survol du bouton => ouvre le panneau (comme avant).
 * - Tactile / clavier : clic sur le bouton => ouvre/ferme ; Escape ferme ;
 *   clic-extérieur ferme ; flèches ↑/↓ naviguent, Enter active.
 * - Un item avec `component` ouvre son méga-menu adjacent (survol OU focus/clic).
 *
 * Délai de fermeture au survol pour ne pas frustrer la souris lors du trajet
 * bouton → panneau → méga-menu.
 */
export default function DropdownMenu({ title, icon, items }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  /** Index de l'item ayant le focus clavier (pour ↑/↓). */
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | HTMLButtonElement | null>>([]);
  /** Timer de fermeture différée (souris). */
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const doClose = useCallback(() => {
    setOpen(false);
    setActiveIndex(null);
    setFocusedIndex(-1);
  }, []);

  // ── Souris : ouverture immédiate, fermeture différée ────────────────
  const handleMouseEnter = () => {
    clearCloseTimer();
    setOpen(true);
  };
  const handleMouseLeave = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(doClose, 150);
  };

  // ── Clic bouton : toggle (tactile / clavier) ────────────────────────
  const handleButtonClick = () => {
    clearCloseTimer();
    setOpen((prev) => !prev);
  };

  // ── Escape + clic-extérieur ─────────────────────────────────────────
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        doClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        doClose();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [doClose]);

  // Nettoyage du timer au démontage
  useEffect(() => () => clearCloseTimer(), []);

  // Focus programmatique quand on navigue au clavier
  useEffect(() => {
    if (open && focusedIndex >= 0) {
      itemRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex, open]);

  // ── Navigation clavier dans la liste ────────────────────────────────
  const onListKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setFocusedIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setFocusedIndex(items.length - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={handleButtonClick}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:text-[#e11d48]"
      >
        {icon}
        <span>{title}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-[999] mt-2 min-w-[260px] -translate-x-1/2 rounded-xl bg-white p-4 shadow-xl"
          >
            <ul className="relative space-y-2" role="menu" onKeyDown={onListKeyDown}>
              {items.map((item, i) => {
                const hasComponent = Boolean(item.component);
                const isActive = activeIndex === i;

                return (
                  <li
                    key={`dm-item-${i}`}
                    onMouseEnter={() => hasComponent && setActiveIndex(i)}
                    onMouseLeave={() =>
                      hasComponent && setActiveIndex((prev) => (prev === i ? null : prev))
                    }
                    className="relative"
                    role="none"
                  >
                    {item.href ? (
                      <Link
                        ref={(el) => {
                          itemRefs.current[i] = el;
                        }}
                        href={item.href}
                        role="menuitem"
                        tabIndex={focusedIndex === i ? 0 : -1}
                        onClick={doClose}
                        className="block rounded-md px-1 py-1 text-sm text-gray-700 outline-none hover:text-[#e11d48] focus-visible:ring-2 focus-visible:ring-[#e11d48]/40"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        ref={(el) => {
                          itemRefs.current[i] = el;
                        }}
                        type="button"
                        role="menuitem"
                        aria-haspopup={hasComponent || undefined}
                        aria-expanded={hasComponent ? isActive : undefined}
                        tabIndex={focusedIndex === i ? 0 : -1}
                        onClick={() =>
                          hasComponent && setActiveIndex((prev) => (prev === i ? null : i))
                        }
                        onFocus={() => hasComponent && setActiveIndex(i)}
                        className={`block w-full rounded-md px-1 py-1 text-left text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#e11d48]/40 ${
                          hasComponent
                            ? 'cursor-pointer text-gray-700 hover:text-[#e11d48]'
                            : 'cursor-default text-gray-500'
                        }`}
                      >
                        {item.label}
                      </button>
                    )}

                    {/* Méga menu adjacent */}
                    <AnimatePresence>
                      {hasComponent && isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-full top-0 z-[1000] ml-4"
                        >
                          {item.component}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
