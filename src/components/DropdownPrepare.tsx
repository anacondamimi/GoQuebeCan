'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import DropdownPortal from './ui/DropdownPortal';

export default function DropdownPrepare() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    }
  }, [open]);

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
    const handleKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const items = [
    { label: 'Planifier son itinéraire', href: '/planificateur' },
    { label: 'Objets utiles', href: '/objets' },
    { label: 'Vidéos inspirantes', href: '/videos' },
    { label: 'Vols', href: '/vols' },
    { label: 'Le Canada en VR', href: '/blog/location-vr' },
  ];

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md p-2 text-sm text-gray-700 hover:bg-[#e11d48]/10 hover:text-[#e11d48]"
      >
        Préparer son voyage <ChevronDown size={18} />
      </button>

      {open && (
        <DropdownPortal>
          <div
            ref={menuRef}
            role="menu"
            style={{ position: 'absolute', top: position.top, left: position.left, zIndex: 9999 }}
            className="w-64 rounded-lg bg-white p-4 shadow-xl"
          >
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-sm text-gray-700 hover:text-indigo-600 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </DropdownPortal>
      )}
    </>
  );
}
