/**
 * Created by jett on 1/8/18.
 */
import {Injectable} from "@angular/core";
import {TokenService} from "../token/token.service";

/**
 * Knows about the profile portion of the JWT token obtained
 * from the Token Service.
 */
@Injectable()
export class ProfileService {
  confirmed: boolean = false;
  listeners: ConfirmationListener[] = [];

  constructor (
    private tokenService: TokenService
  ) {

  }

  public getPrincipal(): string {
    let payload = this.tokenService.getPayload();
    if (payload) {
      return payload.email;
    }
    return "";
  }

  public getUserImageUrl(): string {
    let payload = this.tokenService.getPayload();
    if (payload) {
      return payload.picture;
    }
    return "";
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
