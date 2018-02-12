import {Injectable} from "@angular/core";

import {WebAuth} from "auth0-js";
import Auth0Cordova from "@auth0/cordova";
import {AUTH_CONFIG} from "./auth0-variables";
import {TokenService} from "../token/token.service";
import {AuthState} from "./auth-state";
import {REGISTRATION_TYPE} from "./registration-type";

let auth0Config = {};

auth0Config[REGISTRATION_TYPE.SOCIAL] = {
  // needed for auth0
  clientID: AUTH_CONFIG.clientID.social,

    // needed for auth0cordova
  clientId: AUTH_CONFIG.clientID.social,
  domain: AUTH_CONFIG.domain.social,
  packageIdentifier: 'com.clueride'
};

auth0Config[REGISTRATION_TYPE.PASSWORDLESS] = {
  // needed for auth0
  clientID: AUTH_CONFIG.clientID.passwordless,

  // needed for auth0cordova
  clientId: AUTH_CONFIG.clientID.passwordless,
  domain: AUTH_CONFIG.domain.passwordless,
  packageIdentifier: 'com.clueride'
};

@Injectable()
export class AuthService {

  constructor(
    public tokenService: TokenService,
  ) {
  }

  /**
   * Uses the registration state to tell if the device has been
   * registered for this app and allow the caller to present a
   * different page if registration is required.
   *
   * This returns a promise because in the case where we try to
   * renew the token for a registered device, there is the
   * possibility that the caller would use an expired token instead
   * of the one obtained via an asynchronous renewal performed within
   * this call.
   * @returns {Promise<boolean>} true if registration is needed.
   */
  public checkRegistrationRequired(): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        switch (this.getRegistrationState()) {
          case AuthState.REGISTERED:
            console.log("App is Registered on this device");
            resolve(false);
            break;
          case AuthState.UNREGISTERED:
            console.log("App is Unregistered on this device");
            resolve(true);
            break;
          case AuthState.EXPIRED:
            console.log("Token is expired; attempting to renew");
            this.renew().then(
              () => {
                resolve(false);
              }
            ).catch(
              () => {
                resolve(true);
              }
            );
            break;
        }
      }
    );
  }

  /**
   * Allows steering front-end logic based on whether this device's JWT token will still be accepted
   * by the server.
   * @returns {boolean} True if the associated token is expected to be accepted.
   */
  public isAuthenticated() {
    const expiresAt = this.tokenService.getExpiresAtMilliseconds();
    return Date.now() < expiresAt;
  }

  public getRegistrationState(): AuthState {
    let ninetyDays = 86400 * 1000 * 90;
    if (this.isAuthenticated()) {
      return AuthState.REGISTERED;
    }
    if (this.tokenService.getExpiresAtMilliseconds() + ninetyDays > Date.now()) {
      return AuthState.EXPIRED;
    }
    return AuthState.UNREGISTERED;
  }

  /**
   * Called when the user wishes to register using an email
   * account associated with their existing Social Media account.
   */
  public registerSocial() {
    this.logout();    // Clears previous info in case we're changing account
    this.register(REGISTRATION_TYPE.SOCIAL);
  }

  /**
   * Called when the user wishes to register using an email
   * account provided by user and confirmed via Auth0.
   */
  public registerPasswordless() {
    this.logout();    // Clears previous info in case we're changing account
    this.register(REGISTRATION_TYPE.PASSWORDLESS);
  }

  private register(registrationType: string) {
    const client = new Auth0Cordova(auth0Config[registrationType]);
    const options = {
      scope: 'openid profile email'
    };

    client.authorize(options, (err, authResult) => {
      if(err) {
        throw err;
      }

      this.tokenService.setIdToken(authResult.idToken);
      this.tokenService.setAccessToken(authResult.accessToken);
      this.tokenService.setRegistrationType(registrationType);
    });
  }

  /**
   * Attempt to obtain a new set of tokens for the expired token
   * this device currently holds.
   */
  public renew() {
    let registrationType: string = this.tokenService.getRegistrationType();
    return new Promise(
      (resolve, reject) => {

        let client = new Auth0Cordova(auth0Config[registrationType]);
        let options = {
          scope: 'openid profile email',
        };

        client.authorize(options,
          (err, authResult) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              this.tokenService.setIdToken(authResult.idToken);
              this.tokenService.setAccessToken(authResult.accessToken);
              resolve(false);
            }
          }
        );

      }
    );
  }

  private logoutAuth0() {
    let registrationType: string = this.tokenService.getRegistrationType();
    /* no need to call auth0 if we don't know what type. */
    if (registrationType) {

      /* Tell Auth0 we're done with this account */
      let domain = auth0Config[registrationType].domain;
      let clientId = auth0Config[registrationType].clientID;

      let webAuth = new WebAuth({
        domain: domain,
        clientID: clientId,
      });
      webAuth.logout({
        client_iD: clientId,
      });
    }
  }

  public logout() {
    this.logoutAuth0();
    /* Clear local storage for tokens. */
    this.tokenService.clearToken();
  }

  /**
   * This function is called when performing BDD testing instead of the
   * regular login which natively calls out to internal browser to
   * retrieve the Auth0 site -- and thus cannot be tested using BDD tools.
   *
   * This simply stuffs a set of tokens where they are expected.
   */
  public bddLogin() {
    this.tokenService.bddRegister();
  }

  /**
   * Looks at the current server location to tell if we're testing or not.
   * TODO: Unsure if this should stay here or go someplace else.
   * @returns {boolean}
   */
  public runningLocal() {
    return (
      window.location.toString().indexOf('http://localhost:8100') === 0
    );
  }

}
