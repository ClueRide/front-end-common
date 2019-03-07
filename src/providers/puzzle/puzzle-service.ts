import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BASE_URL, HttpService} from "../http/http.service";
import {Location} from "../location/location";
import {LocationService} from "../location/location-service";
import {Puzzle} from "./puzzle";
// tslint:disable-next-line
import {Observable, Subject} from "rxjs";

/* Define structure for storing array of Puzzles per Location ID. */
interface PuzzlesPerLocationId {
  [locationId: number]: Puzzle[]
}

/** Caching service for the Puzzles and Answers associated with
 * each Location that is part of the Session's Course.
 * This data is static for the duration of the session.
 */
@Injectable()
export class PuzzleService {

  private cachedPuzzles: PuzzlesPerLocationId = {};
  private expectedLocationCount: number;
  private locationCount: number = 0;

  constructor(
    public http: HttpClient,
    private httpService: HttpService,
    private locationService: LocationService,
  ) {
    console.log('Hello PuzzleService');
  }

  /**
   * Returns Observable against the Puzzle REST API endpoint for
   * the given Location ID.
   * @param locationId unique identifier for the Location.
   */
  public getPuzzles(locationId: number): Observable<Puzzle[]> {
    return this.http.get<Puzzle[]>(
      BASE_URL + 'puzzle/location/' + locationId,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /* Build our cache of Puzzles per Location ID. */
  public loadSessionPuzzles(): Observable<any> {
    let puzzleSubject: Subject<boolean> = new Subject();
    let locationIds = this.locationService.getLocations();
    this.expectedLocationCount = locationIds.length;
    for (let locationIndex in locationIds) {
      let locationId = locationIds[locationIndex].id;

      this.getPuzzles(locationId).subscribe(
        (response) => {
          if (response && (<Array<any>>response).length > 0) {
            let locationId = response[0].locationId;
            this.cachedPuzzles[locationId] = <Puzzle[]> response;
          }
          this.locationCount++;
          if (this.locationCount == this.expectedLocationCount) {
            puzzleSubject.next(true);
          }
        }
      )
    }
    return puzzleSubject.asObservable();
  }

  /**
   * Returns cached puzzles for the given Location ID.
   * @param locationId unique identifier for the Location.
   */
  public getPuzzlesPerLocationId(locationId: number): Puzzle[] {
    return this.cachedPuzzles[locationId];
  }

  /** Provides an empty puzzle created by the Server. */
  public getBlankPuzzleForLocation(location: Location): Observable<Puzzle> {
    return this.http.post<Puzzle>(
      BASE_URL + "puzzle/blank",
      location,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /** After making changes, post the updates to the puzzle. */
  public savePuzzle(
    puzzle: Puzzle
  ): Observable<Puzzle> {
    return this.http.post<Puzzle>(
      BASE_URL + "puzzle",
      puzzle,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
