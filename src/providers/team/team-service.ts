import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BASE_URL, HttpService} from "../http/http.service";
import {Team} from "./team";
import {Observable} from "rxjs";

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

  /**
   * Retrieves the list of most recent teams.
   */
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(
      BASE_URL + 'team',
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /**
   * Posts the given string as the name of a new team to be created and
   * returns an Observable which returns the newly created team along with
   * its assigned ID.
   * @param name of the team to create.
   */
  createTeam(name: string): Observable<Team> {
    return this.http.post<Team>(
      BASE_URL + 'team',
      {
        "name": name
      },
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
