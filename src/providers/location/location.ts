import {Injectable} from "@angular/core";
import {LatLon} from "../lat-lon/lat-lon";

/**
 * Created by jett on 7/10/17.
 */
export interface Image {
  id: number;
  url: string;
}

@Injectable()
export class Location {

  id: number;
  nodeId: number;   // Provides Lat/Lon
  latLon: LatLon;
  name?: string;
  description?: string;
  locationGroupId?: number;
  locationTypeName?: string;
  locationTypeIconName?: string;
  locationTypeId: number;
  featuredImageUrl?: string;
  featuredImage: Image;
  establishmentId?: number;
  readinessLevel: string;

}


