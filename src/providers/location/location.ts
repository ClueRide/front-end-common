import {LatLon} from "../lat-lon/lat-lon";

export interface Image {
  id: number;
  url: string;
}

export class Location {
  id: number;
  name: string;
  description: string;
  latLon: LatLon;
  featuredImage: Image;

  /* GeoJSON representation for placement on a Map. */
  geoJson: {};

}
