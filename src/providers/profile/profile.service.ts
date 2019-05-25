/**
 * Created by jett on 1/8/18.
 */
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL, HttpService} from "../http/http.service";
import {Member} from "./member";
// tslint:disable-next-line
import {Observable} from "rxjs";
import {TokenService} from "../token/token.service";

/**
 * Responsible for the Member's Profile.
 *
 * Initially, this comes from a JWT token and is used to present the profile to the
 * user for confirmation. Once confirmed, the profile can be cross-checked with the
 * backend -- once the corresponding *active* Access Token has been established with
 * the backend.
 */
@Injectable()
export class ProfileService {

  member: Member = {
    id: null,
    displayName: "loading ...",
    firstName: "",
    lastName: "",
    phone: "",
    imageUrl: "",
    email: "",
    emailAddress: "",
  };

  constructor (
    public http: HttpClient,
    private httpService: HttpService,
    private tokenService: TokenService,
  ) {
  }

  /**
   * Client's call this to obtain the session's profile for caching.
   *
   * This depends on an Active Access Token.
   */
  public loadMemberProfile(): Observable<Member> {
    return this.http.get<Member>(
      BASE_URL + 'member/active',
      {headers: this.httpService.getAuthHeaders()},
    ).do(
      (response) => {
        this.member = response;
        console.log("Logged in as " + this.member.displayName);
        console.log("Email " + this.member.email);
        console.log("Email Address " + this.member.emailAddress);
        console.log("getPrincipal() " + this.getPrincipal());
      }
    )
      .share();
  }

  /**
   * Turns a JWT-based token from 3rd-party auth service into our Member representation.
   *
   * @param jwtToken
   */
  public fromJwt(jwtToken: string): Member {
    let jwtProfile = this.tokenService.decodePayload(jwtToken);
    this.member = new Member();
    this.member.displayName = jwtProfile.name;
    this.member.firstName = jwtProfile.given_name;
    this.member.lastName = jwtProfile.family_name;
    this.member.email = jwtProfile.email;
    this.member.emailAddress = jwtProfile.email;
    this.member.imageUrl = jwtProfile.picture;
    return this.member;
  }

  public getPrincipal(): string {
    if (this.member) {
      if (this.member.email && this.member.email.length > 0) {
        return this.member.email;
      } else if (this.member.emailAddress) {
        return this.member.emailAddress;
      }
    }
    return "";
  }

  public getGivenName(): string {
    if (this.member) {
      return this.member.lastName;
    }
    return "";
  }

  public getDisplayName(): string {
    if (this.member) {
      return this.member.displayName;
    }
    return "";
  }

  public getUserImageUrl(): string {
    if (this.member) {
      return this.member.imageUrl;
    }
    return "";
  }

  /* Provides the ID of the profile, the Member ID. */
  public getCurrentMemberId() {
    return this.member.id;
  }

  // TODO: Implement this and return an Observable.
  public crossCheckProfile(): void {
      console.log("Talking to the backend to crosscheck the User Profile");
  }

}



