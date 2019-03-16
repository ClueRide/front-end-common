import {AuthState} from "./auth-state";
import Auth0Cordova from "@auth0/cordova";
import {AUTH_CONFIG} from "./auth0-variables";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {PlatformStateService} from "../platform-state/platform-state.service";
import {ProfileConfirmationService} from "../profile-confirmation-service/profile-confirmation-service";
import {REGISTRATION_TYPE} from "./registration-type";
import {RegStateService} from "../reg-state/reg-state.service";
import {Subject} from "rxjs/Subject";
import {TokenService} from "../token/token.service";
import {UserService} from "../user/user.service";
import {WebAuth} from "auth0-js";

let auth0Config = {};

let isAuthenticted: boolean = false;

auth0Config[REGISTRATION_TYPE.SOCIAL] = {
  // needed for auth0
  clientID: AUTH_CONFIG.clientID.social,

  // needed for auth0cordova
  clientId: AUTH_CONFIG.clientID.social,
  domain: AUTH_CONFIG.domain.social,
  packageIdentifier: 'com.clueride.client'  // Not obvious that this is used to build callback URL.
};

auth0Config[REGISTRATION_TYPE.PASSWORDLESS] = {
  // needed for auth0
  clientID: AUTH_CONFIG.clientID.passwordless,

  // needed for auth0cordova
  clientId: AUTH_CONFIG.clientID.passwordless,
  domain: AUTH_CONFIG.domain.passwordless,
  packageIdentifier: 'com.clueride.client'  // Not obvious that this is used to build callback URL.
};

@Injectable()
export class AuthService {

  constructor(
    public tokenService: TokenService,
    private regStateService: RegStateService,
    private userService: UserService,
    private platformStateService: PlatformStateService,
    private profileConfirmationService: ProfileConfirmationService,
  ) {
  }

  /**
   * Provides the state as checked against the backend.
   * @returns {boolean}
   */
  public isAuthenticated() {
    return isAuthenticted;
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
        this.getRegistrationState().subscribe(
          (authState) => {
            switch (authState) {

              case AuthState.REGISTERED:
                isAuthenticted = true;
                console.log("App is Registered on this device");
                resolve(false);
                break;

              case AuthState.UNREGISTERED:
                console.log("App is Unregistered on this device");
                resolve(true);
                break;

              case AuthState.EXPIRED:
                /* I don't think this case comes out of getRegistrationState() */
                console.log("Token is expired; attempting to renew");
                this.renew().then(
                  () => {
                    console.log("Successful Renew?");
                    resolve(false);
                  }
                ).catch(
                  () => {
                    console.log("Problem with Renew?");
                    resolve(true);
                  }
                );
                break;

              case AuthState.NO_NETWORK_CONNECTION:
                console.log("Unable to contact back-end");
            }
          }
        );
      }
    );
  }

  /**
   * Talks to the back-end to see if the Access Token is OK or expired.
   * Immediate return with UNREGISTERED if we don't have an Access Token.
   * @returns {AuthState}
   */
  public getRegistrationState(): Observable<AuthState> {
    let authStateSubject: Subject<AuthState> = new Subject<AuthState>();

    /* Absence of this token means we have never registered. */
    if (!this.tokenService.hasAccessToken()) {
      setTimeout(
        () => {
          authStateSubject.next(AuthState.UNREGISTERED);
        }, 1
      );
      return authStateSubject.asObservable();
    }

    this.regStateService.isRegistered().subscribe(
      (result) => {
        if (result) {
          console.log("Backend thinks we're registered.");
          authStateSubject.next(AuthState.REGISTERED);
        } else {
          console.log("Backend thinks we're not registered.");
          authStateSubject.next(AuthState.UNREGISTERED);
        }
      },
      () => {
        /* Problem. */
        console.log("Problem talking to the backend.");
        authStateSubject.next(AuthState.NO_NETWORK_CONNECTION);
      }
    );

    return authStateSubject.asObservable();
  }

  /**
   * The callback URL is built from the "packageIdentifier" that is set in the
   * Config object. However, we need to set this from the client rather than this
   * library function.
   *
   * NOTE: the scheme needs to also be configured in the 'customurlscheme' plugin and
   * on the Auth0 website's list of valid callback URLs.
   * @param scheme - matches the client's unique package identifier -- basically, which app is
   * calling Auth0.
   */
  public setUrlScheme(scheme: string) {
    auth0Config[REGISTRATION_TYPE.SOCIAL].packageIdentifier = scheme;
    auth0Config[REGISTRATION_TYPE.PASSWORDLESS].packageIdentifier = scheme;
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
      scope: 'openid profile email offline_access',
      audience: 'https://' + auth0Config[registrationType].domain + '/userinfo'
    };

    /**
     * Executes a PKCE to obtain Access Token for this session.
     * @param options tells what we want to retrieve from 3rd-party auth service.
     * @function what to do with the response from requesting an authentication.
     */
    client.authorize(
      options,
      (err, authResult) => {
        if(err) {
          throw err;
        }

        console.log("Auth Response: " + JSON.stringify(authResult));

        /* Place the details into the Token Service. */
        this.tokenService.setIdToken(authResult.idToken);
        this.tokenService.setAccessToken(authResult.accessToken);
        this.tokenService.setRegistrationType(registrationType);
        this.userService.initializeProfile();

        /* Signal we've got a profile that is not yet confirmed. */
        this.profileConfirmationService.receiveAuthorization();

      }
    );

  }

  /**
   * Attempt to obtain a new set of tokens for the expired token
   * this device currently holds.
   * TODO: Use the stored renewal token; this isn't a real renew yet.
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
              this.userService.initializeProfile();
              resolve(false);
            }
          }
        );

      }
    );
  }

  private logoutAuth0() {
    /** Messes up testing when we're running local. */
    if (this.platformStateService.runningLocal()) {
      return;
    }

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
    this.userService.initializeProfile();
  }

}
