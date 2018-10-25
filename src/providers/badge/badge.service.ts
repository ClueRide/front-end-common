import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BASE_URL, HttpService} from "../http/http.service";
import {Badge} from "./badge";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the BadgeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BadgeService {

  constructor(
    public http: HttpClient,
    private httpService: HttpService,
  ) {
    console.log('Hello BadgeService Provider');
  }

  public getList(): Observable<Badge[]> {
    return this.http.get<Badge[]>(
      BASE_URL + 'badge',
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
