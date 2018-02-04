/**
 * Created by jett on 1/8/18.
 */

export class BddMockToken {
  /* This string is obtained by logging in using the test account and then picking out
   * from browser storage the id_token's value */
  idToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnaXZlbl9uYW1lIjoiQmlrZSIsImZhbWlseV9uYW1lIjoiQW5nZWwiLCJuaWNrbmFtZSI6ImJpa2VhbmdlbC5hdGwiLCJuYW1lIjoiQmlrZSBBbmdlbCIsInBpY3R1cmUiOiJodHRwczovL2xoNi5nb29nbGV1c2VyY29udGVudC5jb20vLXNiWEpZY08yRUJZL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFjLzg2alBpWFZzLVpFL3Bob3RvLmpwZyIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMTgtMDItMDNUMjE6NDQ6MTIuNTgyWiIsImVtYWlsIjoiYmlrZWFuZ2VsLmF0bEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9jbHVlcmlkZS1zb2NpYWwuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1NjQ2NTYxMzY1MzU0NDk1MzYwIiwiYXVkIjoiWnp0Y0JURGNnbFRyMTBseXVMb3E4Wnk1N0VXNEhYVFoiLCJpYXQiOjE1MTc2OTQyNTMsImV4cCI6MTUxODU1ODI1M30.tkj72woeNR-UhAgjHU_kZENyt2Uojd9w6HR-IDTPJrE";
  accessToken: string = "don't care";
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
