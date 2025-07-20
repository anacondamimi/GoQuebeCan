'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  /** Libellé affiché dans la liste du dropdown */
  label: string | React.ReactNode;
  /** Lien direct (si présent) */
  href?: string;
  /** Méga menu rendu au survol (si présent) */
  component?: React.ReactNode;
}

interface DropdownMenuProps {
  title: string;
  icon?: React.ReactNode;
  items: MenuItem[];
}

/**
 * DropdownMenu
 * - Survol du bouton => ouvre le panneau principal (liste d'items).
 * - Survol d'un item qui a `component` => affiche un méga menu adjacent.
 */
export default function DropdownMenu({ title, icon, items }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleEnterMenu = () => setOpen(true);
  const handleLeaveMenu = () => {
    setOpen(false);
    setActiveIndex(null);
  };

  const handleEnterItem = (i: number, hasComponent: boolean) => {
    if (hasComponent) setActiveIndex(i);
  };
  const handleLeaveItem = (i: number, hasComponent: boolean) => {
    if (hasComponent) setActiveIndex((prev) => (prev === i ? null : prev));
  };

  return (
    <div className="relative" onMouseEnter={handleEnterMenu} onMouseLeave={handleLeaveMenu}>
      <button
        type="button"
        className="flex items-center gap-2 text-gray-800 hover:text-[#e11d48] px-3 py-2 rounded-md text-base font-medium"
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
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-white shadow-xl rounded-xl p-4 z-[999] min-w-[260px]"
          >
            <ul className="space-y-2 relative">
              {items.map((item, i) => {
                const hasComponent = Boolean(item.component);
                const isActive = activeIndex === i;

                return (
                  <li
                    key={`dm-item-${i}`}
                    onMouseEnter={() => handleEnterItem(i, hasComponent)}
                    onMouseLeave={() => handleLeaveItem(i, hasComponent)}
                    className="relative"
                  >
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="block text-sm text-gray-700 hover:text-[#e11d48]"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span
                        className={`block text-sm ${
                          hasComponent
                            ? 'text-gray-700 hover:text-[#e11d48] cursor-pointer'
                            : 'text-gray-500 cursor-default'
                        }`}
                      >
                        {item.label}
                      </span>
                    )}

                    {/* Méga menu */}
                    <AnimatePresence>
                      {hasComponent && isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-0 left-full ml-4 z-[1000]"
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
