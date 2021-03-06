import {Attraction} from "./attraction";
import {HttpClient} from '@angular/common/http';
import {BASE_URL, HttpService} from "../http/http.service";
import {Injectable} from '@angular/core';
import {OutingService} from "../outing/outing.service";
// tslint:disable-next-line
import {Observable, Subject} from "rxjs";
import {from} from "rxjs/observable/from";

interface AttractionMap {
  [index: number]: Attraction;
}

/**
 * This provides for the Attractions which can be sequenced into a Course.
 * Separate from the Location Service (which handles the broader sense of Location for editing).
 * This is being kept in the FEC project since it may be shared with the
 * front-end client that assembles Courses.
 *
 * This caches the Attractions for a given session since it remains static
 * for the duration of the session.
 *
 * All data is retrieved from server upon instantiation of the service.
 * There are two types of data:
 * <ul>
 * <li>GeoJSON data for placement on the map.
 * <li>Human readable information to populate the Location/Attraction page
 * with images and links.
 * </ul>
 *
 * Puzzles are associated with an Attraction and are retrieved
 * by asking the PuzzleService passing the Attraction ID.
 */
@Injectable()
export class AttractionService {
  private cachedAttractions: Attraction[] = [];

  private attractionMap: AttractionMap = {};
  private currentAttractionId: number = -1;

  constructor(
    public http: HttpClient,
    public httpService: HttpService,
    private outingService: OutingService,
  ) {
    if (this.cachedAttractions.length == 0) {
      console.log('Hello AttractionService - Cache Empty');
    } else {
      console.log('Hello AttractionService - Cache Filled');
    }
  }

  /**
   * Retrieves the list of fully-populated attractions for the
   * session. This includes both GeoJSON and form data.
   */
  public loadSessionAttractions(): Observable<boolean> {
    /* Perhaps questionable: coupling with the timing of the OutingService. */
    this.currentAttractionId = this.outingService.getStartingLocationId();
    let attractionSubject: Subject<boolean> = new Subject();
    this.http.get(
      BASE_URL + 'location/active',
      {headers: this.httpService.getAuthHeaders()}
    ).subscribe(
      (response) => {
        this.cachedAttractions = <Attraction[]> response;
        this.loadAttractionMap();
        attractionSubject.next(true);
      }
    );
    return attractionSubject.asObservable();
  }

  private loadAttractionMap(): any {
    for (let index in this.cachedAttractions) {
      let attraction = this.cachedAttractions[index];
      let id = attraction.id;
      this.attractionMap[id] = attraction;
    }
  }

  /**
   * Return a list of the Attractions we have unlocked or are about to arrive at next.
   *
   * This also sets flags on the attractions that indicate which is the current attraction
   * and which is the next attraction.
   */
  public getVisibleAttractions(lastAttractionIndex: number): Attraction[] {
    let currentIndex = lastAttractionIndex + 1;
    this.currentAttractionId = this.cachedAttractions[currentIndex].id;

    return this.classifyVisibleAttractions(
      /* 2 is added to a) adjust to one-based index and b) show the end of the path, not just the start. */
      this.cachedAttractions.slice(0, lastAttractionIndex+2)
    );

  }

  public classifyVisibleAttractions(visibleAttractions: Attraction[]): Attraction[] {
    const lastAttractionIndex: number = visibleAttractions.length;
    from(visibleAttractions)
      .subscribe(
        (attraction: Attraction) => {
          attraction.isCurrent = false;
          attraction.isLast = false;
        }
      );

    if (lastAttractionIndex == 1) {
      visibleAttractions[0].isCurrent = true;
    } else {
      visibleAttractions[lastAttractionIndex - 1].isLast = true;
      visibleAttractions[lastAttractionIndex - 2].isCurrent = true;
    }

    return visibleAttractions;
  }

  /**
   * All Attractions for the session's Course.
   * These attractions are cached at the beginning of the session.
   * */
  getAttractions() {
    return this.cachedAttractions;
  }

  /**
   * This knows where we are based on the requests for the Visible Attractions.
   * TODO: Consider making this more independent.
   */
  getCurrentAttractionId(): number {
    return this.currentAttractionId;
  }

  getAttraction(id: any) {
    return this.attractionMap[id];
  }

}
