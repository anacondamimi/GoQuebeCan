// types/leaflet-routing-machine.d.ts
declare namespace L {
  namespace Routing {
    function control(options: any): any;

    class Control extends L.Control {
      getPlan(): any;
      setWaypoints(waypoints: L.LatLng[]): void;
    }
  }
}
