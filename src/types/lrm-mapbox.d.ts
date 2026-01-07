/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */

// On utilise une importation **de type**
import type * as Leaflet from 'leaflet';

declare module 'leaflet-routing-machine' {
  // Exemple d’export typé pour “marquer l’usage” de Leaflet
  // (adapte à tes besoins réels si tu consommes l’API)
  export interface RoutingControl extends Leaflet.Control {}
  export function someFactory(map: Leaflet.Map): RoutingControl;
}
