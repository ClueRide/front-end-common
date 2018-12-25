import {BASE_URL, HttpService} from "../http/http.service";
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the RegStateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
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
