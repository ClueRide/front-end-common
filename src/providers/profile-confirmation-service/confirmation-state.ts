/**
 * This is the event which notifies observers of changes to the confirmation state
 * as well as authentication.
 *
 * After authentication against a particular service, the user is given a chance to
 * decide whether to proceed with device registration using the email address given
 * in the profile, or to start over and try with another profile. This tells us
 * whether the user agrees to use the current email or not.
 */
export class ConfirmationState {
  authenticated: boolean = false;
  confirmed: boolean = false;
}
