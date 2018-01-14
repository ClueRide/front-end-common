interface AuthConfig {
  clientID: {
    social: string,
    passwordless: string
  };
  domain: {
    social: string,
    passwordless: string
  };
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: {
    social: 'ZztcBTDcglTr10lyuLoq8Zy57EW4HXTZ',
    passwordless: 't6RcrSkjxxFfI0JCMsEifO8QJ72YBcDY'
  },
  domain: {
    social: 'clueride-social.auth0.com',
    passwordless: 'clueride.auth0.com'
  },
  callbackURL: 'com.clueride://clueride.auth0.com/cordova/com.clueride/callback'
};
