import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ConfirmationState} from "./confirmation-state";
// tslint:disable-next-line
import {Subject, Observable} from "rxjs";

/**
 * Service for confirming the user agrees to use a certain email address.
 */
@Injectable()
export class ProfileConfirmationService {
  public confirmationSubject: Subject<ConfirmationState>;
  public confirmationState$: Observable<ConfirmationState>;
  confirmed: boolean = false;

  constructor(
    public http: HttpClient
  ) {
    console.log('Hello ProfileConfirmationServiceProvider Provider');
    this.confirmationSubject = new Subject<ConfirmationState>();
    this.confirmationState$ = this.confirmationSubject.asObservable();
  }

  public confirm(confirmationState: ConfirmationState) {
    this.confirmed = confirmationState.confirmed;
    this.confirmationSubject.next(confirmationState);
  }

  public isConfirmed(): boolean {
    return this.confirmed;
  }

  /**
   * Trigger the event indicating we've authenticated, but not yet confirmed.
   * @deprecated Use the RegState event instead.
   */
  receiveAuthorization() {
    this.confirmationSubject.next(
      {
        confirmed: false,
        authenticated: true,
      }
    );
  }

}

