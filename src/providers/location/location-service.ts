import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Location} from './location';
import {BASE_URL, HttpService} from "../http/http.service";
import {Observable, Subject} from "rxjs";
import {OutingService} from "../outing/outing.service";

/** Caching service for the Locations associated with the session's Course.
 * This data is static for the duration of the session.
 *
 * All data is retrieved from server upon instantiation of the service.
 * There are two types of data:
 * <ul>
 * <li>GeoJSON data for placement on the map.
 * <li>Human readable information to populate the Location page
 * with images and links.
 * </ul>
 *
 * Puzzles are associated with a Location and are retrieved
 * by asking the PuzzleService passing the Location ID.
 */
@Injectable()
export class LocationService {

  private cachedLocations: Location[] = [];
  private currentLocationId: number = -1;

  constructor(
    public http: HttpClient,
    private httpService: HttpService,
    private outingService: OutingService,
  ) {
    if (this.cachedLocations.length == 0) {
      console.log('Hello LocationService - Cache Empty');
    } else {
      console.log('Hello LocationService - Cache Filled');
    }
  }

  /**
   * Retrieves the list of fully-populated locations for the
   * session. This includes both GeoJSON and form data.
   */
  public loadSessionLocations(): Observable<boolean> {
    /* Perhaps questionable: coupling with the timing of the OutingService. */
    this.currentLocationId = this.outingService.getStartingLocationId();
    let locationSubject: Subject<boolean> = new Subject();
    this.http.get(
      BASE_URL + 'location/active',
      {headers: this.httpService.getAuthHeaders()}
    ).subscribe(
      (response) => {
        this.cachedLocations = <Location[]> response;
        locationSubject.next(true);
      }
    );
    return locationSubject.asObservable();
  }

  /**
   * Return a list of the Locations we have unlocked or are about to arrive at next.
   */
  public getVisibleLocations(lastLocationIndex: number): Location[] {
    let currentIndex = lastLocationIndex + 1;
    this.currentLocationId = this.cachedLocations[currentIndex].id;
    /* 2 is added to a) adjust to one-based index and b) show the end of the path, not just the start. */
    return this.cachedLocations.slice(0, lastLocationIndex+2);
  }

  /**
   * All Locations for the session's Course.
   * These locations are cached at the beginning of the session.
   * */
  getLocations() {
    return this.cachedLocations;
  }

  /**
   * This knows where we are based on the requests for the Visible Locations.
   * TODO: Consider making this more independent.
   */
  getCurrentLocationId(): number {
    return this.currentLocationId;
  }

}
