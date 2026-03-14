'use client';

import React from 'react';
import { ExternalLink, Clock, Sparkles } from 'lucide-react';
import { SmartMapButton } from '@/components/geo/SmartMapButton';

export type RestaurantPremium = {
  name: string;
  city?: string;
  type: string;
  speciality: string;
  price: string;
  mustTry: string;
  schedule: string;
  mapUrl?: string;
  reserveUrl?: string;
  vibe?: string;
  tip?: string;
};

type RestaurantPremiumGridProps = {
  items: RestaurantPremium[];
};

function priceTone(price: string) {
  if (price.includes('$$$$')) {
    return { label: 'Expérience', cls: 'bg-amber-50 text-amber-900 ring-amber-200' };
  }
  if (price.includes('$$$')) {
    return { label: 'Gourmand', cls: 'bg-indigo-50 text-indigo-900 ring-indigo-200' };
  }
  if (price.includes('$$')) {
    return { label: 'Convivial', cls: 'bg-emerald-50 text-emerald-900 ring-emerald-200' };
  }
  return { label: 'Accessible', cls: 'bg-gray-100 text-gray-800 ring-gray-200' };
}

function MapCta({ restaurant }: { restaurant: RestaurantPremium }) {
  if (restaurant.mapUrl) {
    return (
      <a
        href={restaurant.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-extrabold text-white no-underline shadow-sm transition hover:bg-indigo-700"
        aria-label={`Voir ${restaurant.name} sur la carte`}
      >
        <span>Voir sur la carte</span>
      </a>
    );
  }

  const place = {
    name: restaurant.name,
    city: restaurant.city ?? '',
  };

  return <SmartMapButton className="w-full" place={place} />;
}

function ReserveCta({ restaurant }: { restaurant: RestaurantPremium }) {
  if (!restaurant.reserveUrl) return null;

  return (
    <a
      href={restaurant.reserveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-3 text-sm font-extrabold text-indigo-700 no-underline shadow-sm transition hover:bg-indigo-50"
      aria-label={`Réserver au restaurant ${restaurant.name}`}
    >
      <span>Réserver</span>
      <ExternalLink className="size-4 shrink-0 opacity-80" />
    </a>
  );
}

function Actions({ restaurant }: { restaurant: RestaurantPremium }) {
  const hasReserve = Boolean(restaurant.reserveUrl);

  return (
    <div className={hasReserve ? 'mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2' : 'mt-5'}>
      <MapCta restaurant={restaurant} />
      {hasReserve ? <ReserveCta restaurant={restaurant} /> : null}
    </div>
  );
}

function RestaurantCard({
  restaurant,
  featured = false,
}: {
  restaurant: RestaurantPremium;
  featured?: boolean;
}) {
  const p = priceTone(restaurant.price);

  return (
    <article
      className={[
        'not-prose overflow-hidden rounded-3xl border bg-white shadow-sm transition',
        'hover:-translate-y-0.5 hover:shadow-md',
        featured
          ? 'border-indigo-100 ring-1 ring-indigo-100'
          : 'border-gray-100 ring-1 ring-gray-100',
      ].join(' ')}
    >
      <div className="min-w-0 p-5 sm:p-6 lg:p-7">
        {featured ? (
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-indigo-600 px-3 py-1 text-xs font-extrabold text-white shadow-sm">
              Coup de cœur
            </span>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-gray-50 px-3 py-1 text-xs font-bold text-gray-700 ring-1 ring-gray-100">
            {restaurant.type}
          </span>

          <span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${p.cls}`}>
            {p.label}
          </span>

          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-extrabold text-indigo-700 ring-1 ring-indigo-100">
            {restaurant.price}
          </span>

          {restaurant.city ? (
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-500 ring-1 ring-gray-200">
              {restaurant.city}
            </span>
          ) : null}
        </div>

        <div className="mt-3">
          <h3 className="text-xl font-extrabold leading-tight text-gray-900 sm:text-2xl">
            {restaurant.name}
          </h3>
        </div>

        <div className="mt-4 space-y-3">
          <p className="text-sm leading-6 text-gray-700 sm:text-[15px]">
            <span className="font-semibold text-gray-900">Spécialité :</span>{' '}
            {restaurant.speciality}
          </p>

          <div className="rounded-2xl bg-indigo-50/60 p-3.5 ring-1 ring-indigo-100">
            <p className="flex items-start gap-3 text-sm leading-6 text-gray-800 sm:text-[15px]">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-indigo-600" />
              <span>
                <span className="font-semibold text-gray-900">À essayer :</span>{' '}
                {restaurant.mustTry}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 sm:text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5 ring-1 ring-gray-100">
              <Clock className="size-4 shrink-0" />
              {restaurant.schedule}
            </span>

            {restaurant.vibe ? (
              <span className="rounded-full bg-gray-50 px-3 py-1.5 font-semibold text-gray-700 ring-1 ring-gray-100">
                {restaurant.vibe}
              </span>
            ) : null}
          </div>

          {restaurant.tip ? (
            <div className="rounded-2xl bg-amber-50 p-3.5 ring-1 ring-amber-100">
              <p className="text-sm leading-6 text-amber-900 sm:text-[15px]">
                <span className="font-extrabold">Conseil :</span> {restaurant.tip}
              </p>
            </div>
          ) : null}
        </div>

        <Actions restaurant={restaurant} />
      </div>
    </article>
  );
}

export function RestaurantPremiumGrid({ items }: RestaurantPremiumGridProps) {
  if (!items?.length) return null;

  return (
    <section
      aria-label="Restaurants recommandés"
      className="not-prose rounded-3xl bg-gradient-to-b from-indigo-50/60 via-white to-white p-5 sm:p-8"
    >
      <div className="space-y-5">
        {items.map((restaurant, index) => (
          <RestaurantCard
            key={`${restaurant.name}-${restaurant.city ?? 'sans-ville'}-${restaurant.mustTry}-${index}`}
            restaurant={restaurant}
            featured={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
