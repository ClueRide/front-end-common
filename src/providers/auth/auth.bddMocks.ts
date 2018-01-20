/**
 * Created by jett on 1/8/18.
 */

export class AuthBddMock {
  /* This string is obtained by logging in using the test account and then picking out
   * from browser storage the id_token's value */
  idToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnaXZlbl9uYW1lIjoiQmlrZSIsImZhbWlseV9uYW1lIjoiQW5nZWwiLCJuaWNrbmFtZSI6ImJpa2VhbmdlbC5hdGwiLCJuYW1lIjoiQmlrZSBBbmdlbCIsInBpY3R1cmUiOiJodHRwczovL2xoNi5nb29nbGV1c2VyY29udGVudC5jb20vLXNiWEpZY08yRUJZL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFjLzg2alBpWFZzLVpFL3Bob3RvLmpwZyIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMTgtMDEtMTlUMjM6NTQ6MzkuNTQ2WiIsImVtYWlsIjoiYmlrZWFuZ2VsLmF0bEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9jbHVlcmlkZS1zb2NpYWwuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1NjQ2NTYxMzY1MzU0NDk1MzYwIiwiYXVkIjoiWnp0Y0JURGNnbFRyMTBseXVMb3E4Wnk1N0VXNEhYVFoiLCJpYXQiOjE1MTY0MDYwODAsImV4cCI6MTUxNzI3MDA4MH0.N76RMiFQR_yL03VhGCO7W3WLvT2XNaDC73TV6T1hlBQ";
  accessToken: string = "don't care";
  expiresAt: string = JSON.stringify((86400 * 1000) + new Date().getTime());
  profile: string = "don't access directly";
}
