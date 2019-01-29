/**
 * Created by jett on 1/8/18.
 */
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL, HttpService} from "../http/http.service";
import {Member} from "./member";

/**
 * Knows about the email address and image URL from (back-end) principal service.
 * This data should be loaded from the Current Active Member REST endpoint shortly after
 * the session is established.
 */
@Injectable()
export class ProfileService {

  profile: Member = {
    id: null,
    displayName: "loading ...",
    firstName: "",
    lastName: "",
    phone: "",
    imageUrl: "",
    emailAddress: ""
  };

  constructor (
    public http: HttpClient,
    private httpService: HttpService
  ) {
  }

  /**
   * Client's call this to obtain the session's profile for caching.
   */
  public loadMemberProfile() {
    this.http.get(
      BASE_URL + 'member/active',
      {headers: this.httpService.getAuthHeaders()},
    ).subscribe(
      (response) => {
        this.profile = <Member>response;
        console.log("Logged in as " + this.profile.displayName);
      }
    );
  }

  public getPrincipal(): string {
    if (this.profile) {
      if (this.profile.emailAddress) {
        return this.profile.emailAddress;
      }
    }
    return "";
  }

  public getGivenName(): string {
    if (this.profile) {
      return this.profile.lastName;
    }
    return "";
  }

  public getDisplayName(): string {
    if (this.profile) {
      return this.profile.displayName;
    }
    return "";
  }

  public getUserImageUrl(): string {
    if (this.profile) {
      return this.profile.imageUrl;
    }
    return "";
  }

  /* Provides the ID of the profile, the Member ID. */
  public getCurrentMemberId() {
    return this.profile.id;
  }

}



