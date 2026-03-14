import type { HotelItem } from '@/types/hotel';

export const HOTEL_CATALOG: Record<string, HotelItem> = {
  riotel_perce: {
    id: 'riotel_perce',
    name: 'Riotel Percé',
    category: 'Vue sur mer',
    location: 'Percé',
    description: 'Vue imprenable sur le Rocher Percé — parfait pour te réveiller “carte postale”.',
    price: 'À partir de 199$/nuit',
    bookingUrl: 'https://www.booking.com/hotel/ca/riotel-perce.fr.html',
    image: {
      src: '/images/destinations/hotels/riohotel-perce.avif',
      alt: 'Riotel Percé à Percé — hébergement recommandé',
    },
    extra: 'Top si tu veux tout faire à pied (promenade, restos, coucher de soleil).',
    tags: ['Vue', 'À pied', 'Coucher de soleil'],
  },
  hotel_normandie_perce: {
    id: 'hotel_normandie_perce',
    name: 'Hôtel La Normandie',
    category: 'Charme',
    location: 'Percé',
    description:
      'Au cœur du village — pratique pour vivre Percé le soir sans reprendre la voiture.',
    price: 'À partir de 169$/nuit',
    bookingUrl: 'booking_hotel_normandie_perce',
    image: {
      src: '/images/destinations/hotels/hotel-normandie.avif',
      alt: 'Hôtel La Normandie à Percé — hébergement recommandé',
    },
    extra: 'Parfait pour un séjour “petit café + balade + ambiance village”.',
    tags: ['Village', 'Charme'],
  },

  au_pic_de_l_aurore: {
    id: 'au_pic_de_l_aurore',
    name: "Au Pic de l'Aurore",
    category: 'Vue panoramique',
    location: 'Percé',
    description: 'Surplombe la baie — tu te couches avec la lumière sur l’eau.',
    price: 'À partir de 189$/nuit',
    bookingUrl: 'booking_au_pic_de_l_aurore',
    image: {
      src: '/images/destinations/hotels/au-pic-de-l-aurore.avif',
      alt: "Au Pic de l'Aurore à Percé — hébergement recommandé",
    },
    extra: 'Excellent si tu veux un spot calme + vues fortes sans effort.',
    tags: ['Panorama', 'Calme'],
  },
};

export function pickHotels(ids: string[]): HotelItem[] {
  return ids.map((id) => HOTEL_CATALOG[id]).filter(Boolean);
}
