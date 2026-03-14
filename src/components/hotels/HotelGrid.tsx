import type { HotelItem } from '@/types/hotel';
import { HotelCard } from './HotelCard';

type HotelGridProps = {
  items: HotelItem[];
  maxItems?: number;
  emptyMessage?: string;
};

export function HotelGrid({
  items,
  maxItems,
  emptyMessage = 'Les hébergements recommandés seront ajoutés bientôt pour cette destination.',
}: HotelGridProps) {
  const visibleItems = typeof maxItems === 'number' ? items.slice(0, maxItems) : items;

  if (!items?.length) {
    return (
      <section
        aria-label="Hébergements recommandés"
        className="not-prose rounded-3xl bg-gradient-to-b from-slate-50 via-white to-white p-5 sm:p-8"
      >
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-5 text-sm text-gray-600">
          {emptyMessage}
        </div>
      </section>
    );
  }

  return (
    <section
      aria-label="Hébergements recommandés"
      className="not-prose rounded-3xl bg-gradient-to-b from-slate-50 via-white to-white p-5 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visibleItems.map((hotel) => (
          <HotelCard key={hotel.id} item={hotel} />
        ))}
      </div>
    </section>
  );
}
