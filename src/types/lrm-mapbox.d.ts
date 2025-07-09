import * as L from 'leaflet';

declare module 'leaflet-routing-machine' {
  namespace Routing {
    function mapbox(accessToken: string, options?: any): any;
  }
}
