export interface CampingData {
  title: string;
  location: string;
  description: string;
  image: string;
  price: string;
  bestFor: string;
  facilities: string[];
  activities: string[];
  season: string;
  capacity: string;
  coordinates?: [number, number];
}
