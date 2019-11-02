import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BASE_URL, HttpService} from "../http/http.service";
import {Member} from "../profile/member";
// tslint:disable-next-line
import {Observable} from "rxjs";

/**
 * Provides access to the Member Service API.
 */
@Injectable()
export class MemberService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
  ) {
    console.log('Hello MemberService');
  }

  /**
   * Given the pattern string, return users that match the string.
   * @param pattern
   */
  fetchMatchingMembers(pattern: string): Observable<Member[]> {
    return this.http.get<Member[]>(
      BASE_URL + 'member/matching?pattern=' + pattern,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

  /**
   * Invoked when the user has confirmed the email address
   * they want to use.
   * This is also a signal that registration is successful.
   * @param member
   */
  crossCheckMember(member: Member): Observable<Member> {
    return this.http.post<Member>(
      BASE_URL + 'member/cross-check',
      member,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
