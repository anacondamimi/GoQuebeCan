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
  hotel_mirage_perce: {
    id: 'hotel_mirage_perce',
    name: 'Hôtel Le Mirage',
    category: 'Vue sur le Rocher Percé',
    location: 'Percé',
    description:
      'Hôtel emblématique de Percé avec une vue spectaculaire sur le Rocher Percé et l’Île Bonaventure. Idéal pour un séjour mémorable en Gaspésie.',
    price: 'À partir de 189$/nuit',
    bookingUrl: 'https://www.booking.com/hotel/ca/ha-tel-le-mirage.fr.html',
    image: {
      src: '/images/destinations/hotels/hotel-mirage.avif',
      alt: 'Hôtel Le Mirage à Percé avec vue sur le Rocher Percé',
    },
    extra:
      'Un des meilleurs choix à Percé pour la vue. Parfait pour un séjour romantique ou pour profiter pleinement du paysage sans bouger.',
    tags: ['Percé', 'Vue', 'Rocher Percé', 'Incontournable'],
  },

  hotel_les_trois_soeurs_perce: {
    id: 'hotel_les_trois_soeurs_perce',
    name: 'Hôtel Les Trois Sœurs',
    category: 'Vue mer et Rocher Percé',
    location: 'Percé',
    description:
      'Hébergement bien situé à Percé, idéal pour profiter du village, de la mer et des vues sur le Rocher Percé sans multiplier les déplacements.',
    price: 'À partir de 179$/nuit',
    bookingUrl: 'https://www.booking.com/hotel/ca/les-trois-soeur.fr.html',
    image: {
      src: '/images/destinations/hotels/hotel-trois-soeurs.avif',
      alt: 'Hôtel Les Trois Sœurs à Percé avec vue sur la mer et le Rocher Percé',
    },
    extra:
      'Très bon choix pour un séjour à Percé si tu veux rester proche du cœur du village, des restaurants et des départs d’excursions.',
    tags: ['Percé', 'Vue mer', 'Rocher Percé', 'Village'],
  },
};

export function pickHotels(ids: string[]): HotelItem[] {
  return ids.map((id) => HOTEL_CATALOG[id]).filter(Boolean);
}
