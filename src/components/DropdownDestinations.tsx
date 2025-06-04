'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import DropdownPortal from './ui/DropdownPortal'; // ajuste le chemin si besoin
import { destinations } from '@/data/destinationsData'; // structure propre basée sur slug uniquement

export default function DropdownDestinations() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  // Calcule la position du menu déroulant
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [open]);

  // Ferme le menu si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#e11d48] hover:bg-[#e11d48]/10 px-2 py-2 rounded-md"
      >
        <span>Destinations</span>
        <ChevronDown size={18} />
      </button>

      {open && (
        <DropdownPortal>
          <div
            ref={menuRef}
            style={{
              position: 'absolute',
              top: position.top,
              left: position.left,
              zIndex: 9999,
            }}
            className="bg-white shadow-xl w-80 max-h-[80vh] overflow-y-auto rounded-lg p-4"
          >
            {destinations.map((region) => (
              <div key={region.slug} className="mb-4">
                <p className="font-semibold text-indigo-600 mb-1">{region.title}</p>
                <ul className="space-y-1 ml-4">
                  {region.articles.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="hover:underline hover:text-indigo-500 text-sm"
                        onClick={() => setOpen(false)}
                      >
                        {article.title}
                      </Link>
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
