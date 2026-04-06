'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/offers', label: 'Offres' },
    { href: '/admin/producteurs', label: 'Producteurs' },
    { href: '/admin/community-itineraries', label: 'Communauté' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="rounded px-2 py-1 text-sm font-semibold hover:bg-gray-100">
              ← Site public
            </Link>
            <span className="text-sm text-gray-600">Espace Admin</span>
          </div>
        </div>

        <nav className="border-t bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 py-2">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded px-3 py-1 text-sm ${
                    active ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-gray-600">
          GoQuébeCan • Admin — mode test local
        </div>
      </footer>
    </div>
  );
}
