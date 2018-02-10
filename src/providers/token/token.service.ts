import {Injectable} from "@angular/core";
import {JwtHelper} from "angular2-jwt";
import {STORAGE_KEYS} from "../storage-keys";
import {BddMockToken} from "./bddMockToken";
import {ProfileService} from "../profile/profile.service";
import {SecureStorage, SecureStorageObject} from "@ionic-native/secure-storage";

/**
 * Provides functionality for working with the app's JWT token
 * that was obtained using the AuthService and stored locally.
 */
@Injectable()
export class TokenService {
  private jwtHelper: JwtHelper;

  payload;
  secureStorage: SecureStorage;
  secureStorageObject: SecureStorageObject;
  profileService: ProfileService;
  token: string;

  constructor(
    profileService: ProfileService,
    secureStorage: SecureStorage
  ) {
    this.jwtHelper = new JwtHelper();
    this.profileService = profileService;
    this.payload = JSON.parse(
      window.localStorage.getItem(STORAGE_KEYS.profile)
    );
    profileService.setProfile(this.payload);
    this.secureStorage = secureStorage;
  }

  /**
   * Allows clients to be assured the Storage has been setup
   * prior to using the storage.
   */
  init(): Promise<void> {
    let promise:Promise<void> = this.secureStorage.create('com.clueride').then(
      (ssObject: SecureStorageObject) => {
        this.secureStorageObject = ssObject;
      }
    ).catch(
      (err) => {
        console.log("creating secure storage: " + err);
      }
    );

    return promise;
  }

  /**
   * Retrieves the token to be presented whenever restricted resources are requested.
   * @returns {string}
   */
  public getBearerToken(): string {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEYS.jwtToken))
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
    let decoded = this.jwtHelper.urlBase64Decode(parts[1]);
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

    this.profileService.confirm(
      {
        authenticated: true,
        confirmed: false
      }
    );

    this.profileService.setProfile(this.payload);

    this.setStorageVariable(STORAGE_KEYS.jwtToken, token);
  }

  public setAccessToken(token) {
    this.setStorageVariable(STORAGE_KEYS.accessToken, token);
  }

  public setRenewalToken(token) {
    this.secureStorageObject.set(STORAGE_KEYS.renewalToken, token);
  }

  getRenewalToken() {
    return this.secureStorageObject.get(STORAGE_KEYS.renewalToken);
  }

  /**
   * This function is called when performing BDD testing instead of the
   * regular login which natively calls out to internal browser to
   * retrieve the Auth0 site -- and thus cannot be tested using BDD tools.
   *
   * This simply stuffs a set of tokens where they are expected.
   */
  public bddRegister() {
    let bddMockToken: BddMockToken = new BddMockToken;
    this.setIdToken(bddMockToken.idToken);
    this.setAccessToken(bddMockToken.accessToken);
    this.setStorageVariable(STORAGE_KEYS.expiresAt, bddMockToken.expiresAt);
    this.setStorageVariable(STORAGE_KEYS.profile, bddMockToken.profile);
  }
}
