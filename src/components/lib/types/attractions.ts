export interface Attraction {
  id: string;
  name: string;
  lat: number;
  lng: number;
  image?: string;
  excerpt?: string;
  slug?: string;
}

export interface Region {
  name: string;
  attractions: Attraction[];
}
