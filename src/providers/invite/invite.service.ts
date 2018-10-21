/**
 * Created by jett on 9/22/18.
 */

import {Injectable} from "@angular/core";
import {Invite} from "./invite";
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenService} from "../token/token.service";

const baseUrl: String = 'https://player-test.clueride.com/rest/';

@Injectable()
export class InviteService {
  private commonHeaders: HttpHeaders;

  constructor(
    private http: HttpClient,
    tokenService: TokenService
  ) {
    this.commonHeaders = new HttpHeaders();
    this.commonHeaders = this.commonHeaders.append(
      'Authorization',
      'Bearer ' + tokenService.getBearerToken()
    );
  }

  /** Retrieves an ordered list of Invites for the current session. */
  myInvites(): Observable<Invite[]> {
    let headers = this.commonHeaders;
    return this.http.get<Invite[]>(
      baseUrl + 'invite',
      {headers: headers}
    );
  }

  /** For the provided invite, tells the server the client is accepting the invite. */
  accept(inviteId: number): Observable<Invite> {
    let headers = this.commonHeaders;
    return this.http.get<Invite>(
      baseUrl + 'invite/accept/' + inviteId,
      {
        headers: headers
      }
    );
  }

  /** For the provided invite, tells the server the client is declining the invite. */
  decline(inviteId: number): Observable<Invite> {
    let headers = this.commonHeaders;
    return this.http.get<Invite>(
      baseUrl + 'invite/decline/' + inviteId,
      {
        headers: headers
      }
    );
  }

  // TODO: endpoints supporting the maintenance of Invites

}
