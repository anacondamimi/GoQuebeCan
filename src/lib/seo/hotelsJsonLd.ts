import type { HotelItem } from '@/types/hotel';
import { bookingAwin } from '@/lib/awin';

export function hotelsItemListJsonLd(items: HotelItem[], pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListOrder: 'http://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    url: pageUrl,
    itemListElement: items.map((h, i) => {
      const url = h.bookingUrl
        ? h.bookingUrl.includes('awin1.com')
          ? h.bookingUrl
          : bookingAwin(h.bookingUrl)
        : pageUrl;

      return {
        '@type': 'ListItem',
        position: i + 1,
        name: h.name,
        url,
      };
    }),
  };
}
