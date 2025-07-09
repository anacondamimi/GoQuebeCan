import * as L from 'leaflet';

declare module 'leaflet' {
  namespace Routing {
    interface RoutingOptions {
      waypoints?: L.LatLng[];
      router?: any;
      plan?: any;
      routeWhileDragging?: boolean;
      createMarker?: () => L.Marker | null;
      show?: boolean;
    }

    class RoutingControl extends L.Control {
      constructor(options?: RoutingOptions);
      on(event: string, callback: (e: any) => void): this;
      getPlan(): any;
      setWaypoints(waypoints: L.LatLng[]): void;
    }

    function control(options?: RoutingOptions): RoutingControl;

    // ✅ AJOUTER CECI :
    function mapbox(accessToken: string, options?: any): any;
  }
}
