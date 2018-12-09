/**
 * Created by jett on 1/8/18.
 */

export class BddMockToken {
  // TODO: FEC-24 expiration review
  idToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnaXZlbl9uYW1lIjoiSmV0dCIsImZhbWlseV9uYW1lIjoiTWFya3MiLCJuaWNrbmFtZSI6ImpldHRtYXJrcyIsIm5hbWUiOiJKZXR0IE1hcmtzIiwicGljdHVyZSI6Imh0dHBzOi8vbGg2Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tN0pyS3lPY2JCa3MvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQm8vR1BISG9XWXBLN2svcGhvdG8uanBnIiwiZ2VuZGVyIjoibWFsZSIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMTgtMDktMjNUMjI6MzM6MDguODYwWiIsImVtYWlsIjoiamV0dG1hcmtzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2NsdWVyaWRlLXNvY2lhbC5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDk1OTI3MjA0MTYwOTE5MTI1MjUiLCJhdWQiOiJaenRjQlREY2dsVHIxMGx5dUxvcThaeTU3RVc0SFhUWiIsImlhdCI6MTUzNzc0MTk4OSwiZXhwIjoxNTM4NjA1OTg5fQ.jtDuDC8vXXND9qKuT_pcKVRdm4f2TxObkjJkmkZAaRc";
  /* This string should match the configured value for clueride.test.token. */
  accessToken: string = "Change this to your secret test token";
  // TODO: FEC-24 expiration review
  expiresAt: string = JSON.stringify((86400 * 1000) + new Date().getTime());
  profile: any = {
    given_name: "Bike",
    family_name: "Angel",
    name: "Bike Angel",
    picture: "https://lh6.googleusercontent.com/-sbXJYcO2EBY/AAAAAAAAAAI/AAAAAAAAAAc/86jPiXVs-ZE/photo.jpg",
    email: "bikeangel.atl@gmail.com",
    email_verified:true,
    iss: "https://clueride-social.auth0.com/ ",
    sub: "google-oauth2|115646561365354495360",
    aud: "ZztcBTDcglTr10lyuLoq8Zy57EW4HXTZ",
    iat:1516759671,
    exp:2117623671
  };
}
