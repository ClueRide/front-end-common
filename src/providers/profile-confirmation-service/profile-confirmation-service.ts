import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Service for confirming the user agrees to use a certain email address.
 */
@Injectable()
export class ProfileConfirmationService {
  confirmed: boolean = false;
  public listeners: ConfirmationListener[] = [];

  constructor(public http: HttpClient) {
    console.log('Hello ProfileConfirmationServiceProvider Provider');
  }

  public confirm(confirmationState: ConfirmationState) {
    this.confirmed = confirmationState.confirmed;
    for (let listener of this.listeners) {
      listener.canWeSwitch(confirmationState);
    }
  }

  public isConfirmed(): boolean {
    return this.confirmed;
  }

}

export interface ConfirmationListener {
  canWeSwitch: (event: any) => any
}

export class ConfirmationState {
  authenticated: boolean = false;
  confirmed: boolean = false;
}
