import {Injectable} from "@angular/core";

/*
  Generated class for the LatLonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LatLonProvider {

  constructor() {
    return new LatLon;
  }

}

/**
 * How we place this on the Map.
 */
export class LatLon {
  id: number;
  // May want one of the geographical types understood by leaflet
  lat: number;
  lon: number;
  lng: number;
}
