interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'd3bsa3YiIVKeUQZI98n0258d7fXW64j7',
  domain: 'clueride.auth0.com',
  callbackURL: 'com.clueride://clueride.auth0.com/cordova/com.clueride/callback'
};
