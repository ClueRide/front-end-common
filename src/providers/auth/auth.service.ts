import {Injectable, NgZone} from "@angular/core";

import Auth0Cordova from "@auth0/cordova";
import Auth0 from "auth0-js";
import {AUTH_CONFIG} from "./auth0-variables";
import {STORAGE_KEYS} from "../storage-keys";
import {TokenService} from "../token/token.service";
import {AuthBddMock} from "./auth.bddMocks";

const auth0Config = {
  // needed for auth0
  clientID: AUTH_CONFIG.clientID,

  // needed for auth0cordova
  clientId: AUTH_CONFIG.clientID,
  domain: AUTH_CONFIG.domain,
  // callbackURL: location.href,
  packageIdentifier: 'com.clueride'
};

@Injectable()
export class AuthService {
  auth0 = new Auth0.WebAuth(auth0Config);
  accessToken: string;
  idToken: string;
  user: any;

  constructor(
    public tokenService: TokenService,
    public zone: NgZone
  ) {
    this.user = this.getStorageVariable(STORAGE_KEYS.profile);
    this.idToken = this.getStorageVariable(STORAGE_KEYS.jwtToken);
  }

  private getStorageVariable(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }

  private setStorageVariable(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  private setIdToken(token) {
    this.idToken = token;
    this.setStorageVariable(STORAGE_KEYS.jwtToken, token);
  }

  private setAccessToken(token) {
    this.accessToken = token;
    this.setStorageVariable(STORAGE_KEYS.accessToken, token);
  }

  public isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem(STORAGE_KEYS.expiresAt));
    return Date.now() < expiresAt;
  }

  /**
   * This function is called when performing BDD testing instead of the
   * regular login which natively calls out to internal browser to
   * retrieve the Auth0 site -- and thus cannot be tested using BDD tools.
   *
   * This simply stuffs a set of tokens where they are expected.
   */
  public bddLogin() {
    let authBddMock: AuthBddMock = new AuthBddMock;
    this.setIdToken(authBddMock.idToken);
    this.setAccessToken(authBddMock.accessToken);
    this.setStorageVariable(STORAGE_KEYS.expiresAt, authBddMock.expiresAt);
    this.setStorageVariable(STORAGE_KEYS.profile, authBddMock.profile);
  }

  public login() {
    const client = new Auth0Cordova(auth0Config);

    const options = {
      scope: 'openid profile email offline_access'
    };

    client.authorize(options, (err, authResult) => {
      if(err) {
        throw err;
      }

      this.setIdToken(authResult.idToken);
      this.setAccessToken(authResult.accessToken);

      let payload = this.tokenService.decodePayload(authResult.idToken);
      for (let key in payload) {
        if (payload.hasOwnProperty(key)) {
          console.log("payload." + key + ": " + payload[key]);
        }
      }

      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      this.setStorageVariable(STORAGE_KEYS.expiresAt, expiresAt);

      this.auth0.client.userInfo(this.accessToken, (err, profile) => {
        if(err) {
          throw err;
        }

        for (let key in profile) {
          if (profile.hasOwnProperty(key)) {
            console.log("profile." + key + ": " + profile[key]);
          }
        }

        profile.user_metadata = profile.user_metadata || {};
        this.setStorageVariable(STORAGE_KEYS.profile, profile);
        this.zone.run(() => {
          this.user = profile;
        });
      });
    });
  }

  public logout() {
    window.localStorage.removeItem(STORAGE_KEYS.profile);
    window.localStorage.removeItem(STORAGE_KEYS.accessToken);
    window.localStorage.removeItem(STORAGE_KEYS.jwtToken);
    window.localStorage.removeItem(STORAGE_KEYS.expiresAt);

    this.idToken = null;
    this.accessToken = null;
    this.user = null;
  }

}
