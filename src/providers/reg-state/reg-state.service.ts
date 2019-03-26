import {BASE_URL, HttpService} from "../http/http.service";
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

/**
 * Provides access to Registration State endpoint.
 *
 * By passing this client's Auth Headers, the back-end
 * is able to check that token and decide whether or
 * not this device has completed the registration.
 */
@Injectable()
export class RegStateService {

  constructor(
    public http: HttpClient,
    private httpService: HttpService,
  ) {
    console.log('Hello RegStateProvider Provider');
  }

  public isRegistered(): Observable<boolean> {
    return this.http.get<boolean>(
      BASE_URL + 'access/state',
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
