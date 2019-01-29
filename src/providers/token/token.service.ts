import {Injectable} from "@angular/core";
import {STORAGE_KEYS} from "../storage-keys";
import {BddMockToken} from "./bddMockToken";
import {ProfileConfirmationService} from "../profile-confirmation-service/profile-confirmation-service";
import {REGISTRATION_TYPE} from "../auth/registration-type";

/**
 * Provides functionality for working with the app's JWT token
 * that was obtained using the AuthService and stored locally.
 */
@Injectable()
export class TokenService {

  payload;
  token: string;

  constructor(
    private profileConfirmationService: ProfileConfirmationService
  ) {
    this.payload = JSON.parse(
      window.localStorage.getItem(STORAGE_KEYS.profile)
    );
  }

  /**
   * Retrieves the token to be presented whenever restricted resources are requested.
   * @returns {string}
   */
  public getBearerToken(): string {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEYS.accessToken))
  }

  public hasAccessToken(): boolean {
    let token = window.localStorage.getItem(STORAGE_KEYS.accessToken);
    return (token && token.length > 0);
  }

  decodePayload(fullToken: string): any {
    if (!fullToken) {
      throw new Error("passed token is not populated");
    }
    let parts = fullToken.split('.');
    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }
    /* throws exception if problem decoding. */
    let decoded = atob(parts[1]);
    return JSON.parse(decoded);
  }

  setExpiresAtFromPayload(payloadExpAttribute: string): void {
    let expiresAtMilliseconds = JSON.parse(payloadExpAttribute) * 1000;
    window.localStorage.setItem(
      STORAGE_KEYS.expiresAt,
      JSON.stringify(expiresAtMilliseconds)
    );
  }

  /**
   * Removes all credential information from the Store.
   * @returns {Promise<null>}
   */
  public clearToken() {
    window.localStorage.removeItem(STORAGE_KEYS.profile);
    window.localStorage.removeItem(STORAGE_KEYS.accessToken);
    window.localStorage.removeItem(STORAGE_KEYS.jwtToken);
    window.localStorage.removeItem(STORAGE_KEYS.expiresAt);
    window.localStorage.removeItem(STORAGE_KEYS.registrationType);
  }

  public getExpiresAtMilliseconds(): number {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEYS.expiresAt));
  }

  private setStorageVariable(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  public setIdToken(token) {
    this.payload = this.decodePayload(token);
    this.setStorageVariable(
      STORAGE_KEYS.profile,
      this.payload
    );

    this.setExpiresAtFromPayload(this.payload.exp);

    this.profileConfirmationService.confirm(
      {
        authenticated: true,
        confirmed: false
      }
    );

    this.setStorageVariable(STORAGE_KEYS.jwtToken, token);
  }

  public setAccessToken(token) {
    this.setStorageVariable(STORAGE_KEYS.accessToken, token);

    this.profileConfirmationService.confirm(
      {
        authenticated: true,
        confirmed: false
      }
    );

  }

  public getRegistrationType(): string {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEYS.registrationType));
  }

  public setRegistrationType(registrationType: string) {
    this.setStorageVariable(
      STORAGE_KEYS.registrationType,
      registrationType
    );
  }

  /**
   * This function is called when performing BDD testing instead of the
   * regular login which natively calls out to internal browser to
   * retrieve the Auth0 site -- and thus cannot be tested using BDD tools.
   *
   * This simply stuffs a set of tokens where they are expected.
   * Much of the data is based on the JWT token which carries profile data.
   */
  public bddRegister() {
    let bddMockToken: BddMockToken = new BddMockToken;
    /* Record the token we'll use for testing. */
    this.setAccessToken(bddMockToken.accessToken);
    this.setRegistrationType(REGISTRATION_TYPE.SOCIAL);
  }

}
