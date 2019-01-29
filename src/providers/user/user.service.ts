/**
 * Created by jett on 12/23/18.
 */
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BASE_URL, HttpService} from "../http/http.service";

/* TODO: This may be deprecated; I think we want to use the Member instance
 * that is accessed using the ProfileService. */
@Injectable()
export class UserService {

  constructor(
    public http: HttpClient,
    private httpService: HttpService,
  ) {
  }

  /**
   * Makes a call out to the backend to retrieve our current Principal.
   * This depends on the Access Token having been populated.
   */
  public initializeProfile(): Observable<any> {
    let observable = this.http.get<any>(
      BASE_URL + 'user/current',
      {headers: this.httpService.getAuthHeaders()}
    );
    observable.subscribe(
      (response) => {
        // this.profileService.setProfile(response);
      }
    );
    return observable;
  }

}
