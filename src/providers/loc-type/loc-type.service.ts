import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LocationType} from "./loc-type";
// tslint:disable-next-line
import {Observable, Subject} from "rxjs";
import {BASE_URL, HttpService} from "../http/http.service";

@Injectable()
export class LocTypeService {

  static locationTypeCache: LocationType[] = [];

  constructor(
    public http: HttpClient,
    private httpService: HttpService,
  ) {

  }

  /**
   * Builds cached map of LocationTypeID -> LocationType from resource, but
   * only if we haven't already populated the cache.
   */
  public initializeCache(): Observable<boolean> {
    let cacheFilledSubject: Subject<boolean> = new Subject<boolean>();

    if (LocTypeService.locationTypeCache.length == 0) {
      this.http.get<LocationType[]>(
        BASE_URL + 'location/types',
        {headers: this.httpService.getAuthHeaders()}
      ).subscribe(
        (response) =>  {
          response.forEach(locType => {
            LocTypeService.locationTypeCache[locType.id] = locType;
          });
          console.log("Loc Type Cache filled. total: " + LocTypeService.locationTypeCache.length);
          cacheFilledSubject.next(true);
        }
      );
    } else {
      cacheFilledSubject.next(true);
    }

    return cacheFilledSubject.asObservable();
  }

  public allLocationTypes(): Array<LocationType> {
    return LocTypeService.locationTypeCache;
  }

  public getById(id: number): LocationType {
    return LocTypeService.locationTypeCache[id];
  }

}
