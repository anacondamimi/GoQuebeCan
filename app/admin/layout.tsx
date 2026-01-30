// app/admin/layout.tsx
'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabaseBrowser as supabase } from '@/lib/supabase-browser';

type GateState = 'loading' | 'allowed' | 'denied';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [gate, setGate] = useState<GateState>('loading');
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const links = useMemo(
    () => [
      { href: '/admin', label: 'Dashboard' },
      { href: '/admin/offers', label: 'Offres' },
      { href: '/admin/producteurs', label: 'Producteurs' },
      { href: '/admin/community-pdf', label: 'PDFs' },
    ],
    [],
  );

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        const user = data?.user ?? null;

        if (!mounted) return;

        // ✅ pas connecté
        if (error || !user) {
          setGate('denied');
          router.replace('/?from=' + encodeURIComponent(pathname || '/admin'));
          return;
        }

        // ✅ connecté
        setUserEmail(user.email ?? null);

        // ✅ OPTION ROLE (si tu utilises user_metadata.role = "admin")
        // Si tu n'as pas encore de rôles, commente ce bloc.
        const role = (user.user_metadata as any)?.role;
        if (role && role !== 'admin') {
          setGate('denied');
          router.replace('/');
          return;
        }

        setGate('allowed');
      } catch {
        if (!mounted) return;
        setGate('denied');
        router.replace('/');
      }
    })();

    return () => {
      mounted = false;
    };
  }, [router, pathname]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  if (gate === 'loading') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-xl border bg-white p-6 shadow">
          <p className="text-sm text-gray-600">Vérification des accès…</p>
        </div>
      </div>
    );
  }

  // On renvoie rien : le router.replace() va changer la page
  if (gate === 'denied') return null;

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

          <div className="flex items-center gap-3">
            {userEmail ? (
              <span className="hidden text-xs text-gray-600 sm:block">{userEmail}</span>
            ) : null}
            <button
              onClick={() => void signOut()}
              className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
            >
              Déconnexion
            </button>
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
          GoQuébeCan • Admin — accès restreint
        </div>
      </footer>
    </div>
  );
}
