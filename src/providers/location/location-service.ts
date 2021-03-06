import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Location} from './location';
import {BASE_URL, HttpService} from "../http/http.service";
// tslint:disable-next-line
import {Observable} from "rxjs";
import {LatLon} from "../lat-lon/lat-lon";

/**
 * Support for creating and editing locations within the Location Editor.
 */
@Injectable()
export class LocationService {

  constructor(
    public http: HttpClient,
    private httpService: HttpService,
  ) {
  }

  /**
   * Create a new Location on the back-end given the coordinates.
   * @param latLon where we want to place a new Location.
   */
  proposeLocation(latLon: LatLon): Observable<Location> {
    return this.http.post<Location>(
      BASE_URL + 'location/propose?lat=' + latLon.lat + '&lon=' + latLon.lon,
      {},
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /**
   * For Location Editor, retrieve set of Locations nearest the given position.
   * @param latLon holds coordinates where we'd like to view the map of nearby locations.
   */
  nearest(latLon: LatLon): Observable<Location[]> {
    /* self-closing subscription. */
    return this.http.get<Location[]>(
      BASE_URL + 'location/nearest-marker?lat=' + latLon.lat + '&lon=' + latLon.lon,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /**
   * Updates to a Location are sent to the server, and once complete,
   * the updated Location is returned as the marble of this Observable.
   * @param location to be updated.
   */
  update(location: Location): Observable<Location> {
    return this.http.post<Location>(
      BASE_URL + 'location/update',
      location,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /**
   * Removing featured images is a request against the location.
   * @param locationId
   */
  removeFeaturedImage(locationId: number): Observable<Location> {
    return this.http.delete<Location>(
      BASE_URL + 'location/featured?id=' + locationId,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
