'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ExternalLink, Star, Sparkles } from 'lucide-react';
import type { HotelItem } from '@/types/hotel';

function getCategoryTone(category: string) {
  const value = category.toLowerCase();

  if (value.includes('spa') || value.includes('détente')) {
    return 'bg-rose-50 text-rose-800 ring-rose-200';
  }

  if (value.includes('famille') || value.includes('familial')) {
    return 'bg-emerald-50 text-emerald-800 ring-emerald-200';
  }

  if (value.includes('luxe') || value.includes('prestige')) {
    return 'bg-amber-50 text-amber-900 ring-amber-200';
  }

  if (value.includes('budget') || value.includes('économique')) {
    return 'bg-slate-100 text-slate-800 ring-slate-200';
  }

  return 'bg-indigo-50 text-indigo-800 ring-indigo-200';
}

export function HotelCard({ item }: { item: HotelItem }) {
  const tone = getCategoryTone(item.category);

  return (
    <article className="not-prose group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />

        <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 backdrop-blur-sm ${tone}`}
          >
            {item.category}
          </span>

          {item.ratingText ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-gray-900 ring-1 ring-gray-200 backdrop-blur-sm">
              <Star className="size-3.5 text-amber-500" />
              {item.ratingText}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="min-w-0">
          <h3 className="line-clamp-3 text-[1.28rem] font-extrabold leading-tight text-gray-900">
            {item.name}
          </h3>

          {item.location ? (
            <p className="mt-2 inline-flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="size-4 shrink-0" />
              <span>{item.location}</span>
            </p>
          ) : null}
        </div>

        {item.price ? (
          <div className="mt-4 rounded-xl bg-indigo-50/70 px-3 py-2 ring-1 ring-indigo-100">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Tarif indicatif
            </p>
            <p className="mt-1 text-sm font-extrabold text-indigo-900">{item.price}</p>
          </div>
        ) : null}

        <p className="mt-4 text-sm leading-7 text-gray-700">{item.description}</p>

        {item.perks && item.perks.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.perks.map((perk) => (
              <span
                key={perk}
                className="rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-gray-100"
              >
                {perk}
              </span>
            ))}
          </div>
        ) : null}

        {item.tags && item.tags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-100"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {item.extra ? (
          <div className="mt-4 rounded-xl bg-amber-50/70 px-3 py-2 ring-1 ring-amber-100">
            <p className="inline-flex items-start gap-2 text-sm leading-6 text-gray-700">
              <Sparkles className="mt-1 size-4 shrink-0 text-amber-600" />
              <span>
                <span className="font-semibold text-gray-900">Pourquoi on le recommande :</span>{' '}
                {item.extra}
              </span>
            </p>
          </div>
        ) : null}

        <div className="mt-6">
          <Link
            href={item.bookingUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-extrabold text-white no-underline shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            aria-label={`Voir les disponibilités pour ${item.name}`}
          >
            <span className="text-white">Voir les disponibilités</span>
            <ExternalLink className="size-4 shrink-0 text-white opacity-90" />
          </Link>
        </div>

        <p className="mt-3 text-xs leading-5 text-gray-500">
          Lien affilié — cela soutient GoQuébeCAN sans coût supplémentaire pour toi.
        </p>
      </div>
    </article>
  );
}
