export type HotelItem = {
  id: string;

  name: string;

  category: string;

  location?: string;

  description: string;

  price?: string;

  image: {
    src: string;
    alt: string;
  };

  bookingUrl: string;

  ratingText?: string;

  ratingNumber?: number;

  perks?: string[];

  tags?: string[];

  extra?: string;

  variant?: 'standard' | 'compact';

  affiliate?: 'booking' | 'expedia';
};
