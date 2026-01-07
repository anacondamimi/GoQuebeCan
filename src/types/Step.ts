export interface StepData {
  lat: number;
  lng: number;
  notes: {
    [key: string]: string;
  };
  photo?: string;
  rating?: number;
  checklist?: string[];
  distanceFromPrevious?: number;
  durationFromPrevious?: number;
  distanceKm?: number;
}
