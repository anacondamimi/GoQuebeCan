'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, List } from 'lucide-react';

export type TocItem = { id: string; label: string };

function slugOk(id: string) {
  return /^[a-z0-9-]+$/i.test(id);
}

export default function TableOfContents({
  items,
  title = 'Sommaire',
  className = '',
  defaultOpen = false,
}: {
  items: TocItem[];
  title?: string;
  className?: string;
  defaultOpen?: boolean;
}) {
  const safeItems = useMemo(() => items.filter((i) => i?.id && i?.label && slugOk(i.id)), [items]);

  const [open, setOpen] = useState(defaultOpen);
  const [activeId, setActiveId] = useState<string>(safeItems[0]?.id ?? '');

  // Highlight section active (optionnel)
  useEffect(() => {
    if (safeItems.length === 0) return;

    const els = safeItems
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target && (visible.target as HTMLElement).id) {
          setActiveId((visible.target as HTMLElement).id);
        }
      },
      { threshold: [0.15, 0.25, 0.4], rootMargin: '-20% 0px -65% 0px' },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [safeItems]);

  function onClick(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    setOpen(false);
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  }

  if (safeItems.length === 0) return null;

  return (
    <div className={className}>
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 p-4"
          aria-expanded={open}
        >
          <span className="flex items-center gap-2 text-sm font-extrabold text-gray-900">
            <List className="size-4 text-indigo-600" />
            {title}
          </span>
          <ChevronDown
            className={`size-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open ? (
          <div className="px-2 pb-3">
            {safeItems.map((it) => {
              const active = it.id === activeId;
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => onClick(it.id)}
                  className={[
                    'w-full rounded-xl px-3 py-2 text-left text-sm transition',
                    active
                      ? 'bg-indigo-50 font-bold text-indigo-900'
                      : 'text-gray-700 hover:bg-gray-50',
                  ].join(' ')}
                >
                  {it.label}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
