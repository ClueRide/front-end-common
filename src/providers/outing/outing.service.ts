import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BASE_URL, HttpService} from "../http/http.service";
import {Observable} from "rxjs/Observable";
import {OutingView} from "./outing-view";

/**
 * Service for retrieving Outing Details.
 */
@Injectable()
export class OutingService {

  /* TODO: FEC-8 Outing "Resource"
   * Example: https://fullstack-developer.academy/caching-http-requests-with-angular/
   * Consider that an outing only changes as the invitation is accepted and can be held within
   * the Outing Service.
   */
  constructor(
    public http: HttpClient,
    private httpService: HttpService,
  ) {
    console.log('Hello OutingProvider Provider');
  }

  public get(id: number): Observable<OutingView> {
    return this.http.get<OutingView> (
      BASE_URL + 'outing/view/' + id,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
