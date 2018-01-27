/**
 * Created by jett on 1/8/18.
 */
import {Injectable} from "@angular/core";

/**
 * Knows about the profile portion of the JWT token obtained
 * from the Token Service.
 */
@Injectable()
export class ProfileService {
  confirmed: boolean = false;
  listeners: ConfirmationListener[] = [];
  profile: any;

  constructor (
  ) {
  }

  public getPrincipal(): string {
    if (this.profile) {
      return this.profile.email;
    }
    return "";
  }

  public getUserImageUrl(): string {
    if (this.profile) {
      return this.profile.picture;
    }
    return "";
  }

  public setProfile(profile) {
    this.profile = profile;
  }

  public isConfirmed(): boolean {
    return this.confirmed;
  }

  public confirm(confirmationState: ConfirmationState) {
    this.confirmed = confirmationState.confirmed;
    for (let listener of this.listeners) {
      listener.canWeSwitch(confirmationState);
    }
  }

}

export interface ConfirmationListener {
  canWeSwitch: (event: any) => any
}

export class ConfirmationState {
  authenticated: boolean = false;
  confirmed: boolean = false;
}
