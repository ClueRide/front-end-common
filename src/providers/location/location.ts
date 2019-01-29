import {LatLon} from "../lat-lon/lat-lon";

export class Location {
  id: number;
  name: string;
  description: string;
  latLon: LatLon;

  /* GeoJSON representation for placement on a Map. */
  geoJson: {};

}
