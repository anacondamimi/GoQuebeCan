'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import DropdownPortal from './ui/DropdownPortal';
import type { Article, Region } from '@/types/articles';
import { destinations } from '@/data/destinationsData';

export default function DropdownDestinations() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Calcule la position du menu déroulant
  // Calcule la position du menu déroulant
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [open]);

  // Ferme le menu si clic en dehors ou ESC
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-2 rounded-md p-2 text-sm text-gray-700 hover:bg-[#e11d48]/10 hover:text-[#e11d48]"
      >
        <span>Destinations</span>
        <ChevronDown size={18} />
      </button>

      {open && (
        <DropdownPortal>
          <div
            ref={menuRef}
            role="menu"
            style={{ position: 'absolute', top: position.top, left: position.left, zIndex: 9999 }}
            className="max-h-[80vh] w-80 overflow-y-auto rounded-lg bg-white p-4 shadow-xl"
          >
            {destinations.map((region: Region) => (
              <div key={region.slug} className="mb-4">
                <p className="mb-1 font-semibold text-indigo-600">{region.title}</p>
                <ul className="ml-4 space-y-1">
                  {region.articles.map((article: Article) => (
                    <li key={article.slug}>
                      {article.published === false ? (
                        <span
                          className="cursor-not-allowed text-sm italic text-gray-400"
                          title="Article en cours de rédaction"
                          aria-disabled="true"
                        >
                          {article.title} (en cours)
                        </span>
                      ) : (
                        <Link
                          href={`/blog/${article.slug}`}
                          className="text-sm hover:text-indigo-500 hover:underline"
                        >
                          {article.title}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DropdownPortal>
      )}
    </>
  );
}
