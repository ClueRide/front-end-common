import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BASE_URL, HttpService} from "../http/http.service";
import {Badge} from "./badge";
import {Observable} from "rxjs/Observable";

/** Provides access to Badges by session. */
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
