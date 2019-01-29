import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BASE_URL, HttpService} from "../http/http.service";
import {Team} from "./team";

/** Caching service for the Team associated with this Session.
 * This data is static for the duration of the session.
 */
@Injectable()
export class TeamService {

  cachedTeam: Team;

  constructor(
    public http: HttpClient,
    private httpService: HttpService,
  ) {
    console.log('Hello TeamService');
  }

  public loadTeam(teamId: number) {
    this.http.get(
      BASE_URL + 'team/' + teamId,
      {headers: this.httpService.getAuthHeaders()}
    ).subscribe(
      (response) => {
        this.cachedTeam = <Team> response;
      }
    );
  }

  public getTeam(): Team {
    return this.cachedTeam;
  }

}
