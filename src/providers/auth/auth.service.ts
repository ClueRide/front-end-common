import {Injectable} from "@angular/core";

import Auth0Cordova from "@auth0/cordova";
import {AUTH_CONFIG} from "./auth0-variables";
import {TokenService} from "../token/token.service";

const auth0SocialConfig = {
  // needed for auth0
  clientID: AUTH_CONFIG.clientID.social,

  // needed for auth0cordova
  clientId: AUTH_CONFIG.clientID.social,
  domain: AUTH_CONFIG.domain.social,
  packageIdentifier: 'com.clueride'
};

const auth0PasswordlessConfig = {
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
   * Allows steering front-end logic based on whether this device's JWT token will still be accepted
   * by the server.
   * @returns {boolean} True if the associated token is expected to be accepted.
   */
  public isAuthenticated() {
    const expiresAt = this.tokenService.getExpiresAtMilliseconds();
    return Date.now() < expiresAt;
  }

  /**
   * Called when the user wishes to register using an email
   * account associated with their existing Social Media account.
   */
  public registerSocial() {
    this.register(auth0SocialConfig);
  }

  /**
   * Called when the user wishes to register using an email
   * account provided by user and confirmed via Auth0.
   */
  public registerPasswordless() {
    this.register(auth0PasswordlessConfig);
  }

  public register(auth0Config) {
    const client = new Auth0Cordova(auth0Config);
    const options = {
      scope: 'openid profile email'
    };

    client.authorize(options, (err, authResult) => {
      if(err) {
        throw err;
      }

      this.tokenService.setIdToken(authResult.idToken);
      this.tokenService.setAccessToken(authResult.accessToken);
    });
  }

  public logout() {
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
