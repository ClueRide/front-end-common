/**
 * Created by jett on 9/22/18.
 */

import {Injectable} from "@angular/core";
import {Invite} from "./invite";
import {HttpClient} from "@angular/common/http";
import {BASE_URL, HttpService} from "../http/http.service";
import {Observable} from "rxjs/Observable";


@Injectable()
export class InviteService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
  ) {
  }

  /** Retrieves an ordered list of Invites for the current session. */
  myInvites(): Observable<Invite[]> {
    return this.http.get<Invite[]>(
      BASE_URL + 'invite',
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /** For the provided invite, tells the server the client is accepting the invite. */
  accept(inviteId: number): Observable<Invite> {
    return this.http.get<Invite>(
      BASE_URL + 'invite/accept/' + inviteId,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /** For the provided invite, tells the server the client is declining the invite. */
  decline(inviteId: number): Observable<Invite> {
    return this.http.get<Invite>(
      BASE_URL + 'invite/decline/' + inviteId,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  // TODO: endpoints supporting the maintenance of Invites

}
