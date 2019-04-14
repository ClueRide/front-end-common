/**
 * Created by jett on 1/8/18.
 */
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL, HttpService} from "../http/http.service";
import {Member} from "./member";
// tslint:disable-next-line
import {Observable} from "rxjs";

/**
 * Knows about the email address and image URL from (back-end) principal service.
 * This data should be loaded from the Current Active Member REST endpoint shortly after
 * the session is established.
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
    private httpService: HttpService
  ) {
  }

  /**
   * Client's call this to obtain the session's profile for caching.
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

}



