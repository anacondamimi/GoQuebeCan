// types/leaflet-routing-machine.d.ts
// Typages robustes pour leaflet-routing-machine, sans `any`.
// Couvre: RoutingControl, RoutingOptions, Plan, événements `routesfound`/`routingerror`,
// et le routeur Mapbox. Compatible Leaflet 1.x, TypeScript strict.

import * as L from 'leaflet';

// Assure au compilateur que le module d'effets existe (import 'leaflet-routing-machine')
declare module 'leaflet-routing-machine' {}

/**
 * Extension du module 'leaflet' pour ajouter l'espace de noms Routing
 */
declare module 'leaflet' {
  namespace Routing {
    /** Résumé d’un itinéraire */
    interface RouteSummary {
      /** distance totale en mètres */
      totalDistance: number;
      /** durée totale en secondes */
      totalTime: number;
    }

    /** Un itinéraire calculé (LRM peut fournir plusieurs alternatives) */
    interface CalculatedRoute {
      summary: RouteSummary;
      // D'autres champs existent (coordinates, instructions, etc.) mais ne sont
      // pas nécessaires pour la plupart des cas d'usage courants.
    }

    /** Événement émis quand des routes sont trouvées */
    interface RoutingFoundEvent extends L.LeafletEvent {
      routes: CalculatedRoute[];
    }

    /** Événement émis en cas d’erreur de calcul */
    interface RoutingErrorEvent extends L.LeafletEvent {
      /** Erreur éventuellement fournie par le routeur sous-jacent */
      error?: unknown;
      /** Code/état renvoyé par le service (si applicable) */
      status?: number | string;
      /** Message lisible (si présent) */
      message?: string;
    }

    /** Waypoint que LRM accepte en entrée */
    type WaypointInput = L.LatLng | L.LatLngLiteral;

    /** Plan associé à un RoutingControl (gère les waypoints) */
    interface Plan {
      setWaypoints(waypoints: WaypointInput[]): void;
      getWaypoints(): L.LatLng[];
      /** Optionnel selon implémentation : setter de géocodeur, etc. */
      // setGeocoder?(g: unknown): void;
    }

    /** Options de style pour la polyligne de l’itinéraire */
    interface LineOptions {
      styles?: Array<L.PathOptions & { className?: string }>;
      extendToWaypoints?: boolean;
      missingRouteTolerance?: number;
    }

    /** Options Routeur Mapbox */
    interface MapboxRouterOptions {
      profile?: 'mapbox/driving' | 'mapbox/walking' | 'mapbox/cycling';
      language?: string;
      /** true pour éviter les ferries, etc. selon l’API Mapbox (facultatif) */
      urlParameters?: Record<string, string | number | boolean>;
      serviceUrl?: string; // ex: 'https://api.mapbox.com/directions/v5'
    }

    /** Options principales du contrôle de routage */
    interface RoutingOptions {
      waypoints?: WaypointInput[];
      router?: unknown; // instance renvoyée par L.Routing.mapbox(...)
      plan?: Plan | unknown;
      routeWhileDragging?: boolean;
      show?: boolean;
      createMarker?: null | ((i: number, waypoint: L.LatLng, n: number) => L.Marker | null);
      lineOptions?: LineOptions;
      addWaypoints?: boolean;
      /**
       * Ajuste automatiquement la vue pour contenir la route sélectionnée.
       * (option pratique, absente des d.ts officiels)
       */
      fitSelectedRoutes?: boolean;
      /** Timeout, alternatives, etc. — non requis ici, mais extensible */
      // alternatives?: number | boolean;
      // draggableWaypoints?: boolean;
    }

    /** Contrôle principal de LRM */
    interface RoutingControl extends L.Control {
      /** Récupère le plan (pour setWaypoints sans recréer le contrôle) */
      getPlan(): Plan;

      /** Écouteurs d’événements typés */
      on(type: 'routesfound', fn: (e: RoutingFoundEvent) => void): this;
      on(type: 'routingerror', fn: (e: RoutingErrorEvent) => void): this;

      /** Surcharges génériques Leaflet (pour d’autres events) */
      on(type: string, fn: (e: L.LeafletEvent) => void): this;
      off(type?: string, fn?: (e: L.LeafletEvent) => void): this;
    }

    /** Fabrique un contrôle de routage */
    function control(options?: RoutingOptions): RoutingControl;

    /**
     * Routeur Mapbox : fournit un routeur utilisable dans `RoutingOptions.router`.
     * @param accessToken Token public Mapbox
     * @param options Options Mapbox (profil, langue, etc.)
     */
    function mapbox(accessToken: string, options?: MapboxRouterOptions): unknown;
  }
}
