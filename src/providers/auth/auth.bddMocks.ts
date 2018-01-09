/**
 * Created by jett on 1/8/18.
 */

export class AuthBddMock {
  idToken: string = "eyJhbGciOiJIUzI1NiIsImJhZGdlcyI6WyJMT0NBVElPTl9FRElUT1IiXSwiZW1haWwiOiJndWVzdC5kdW1teUBjbHVlcmlkZS5jb20iLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJjbHVlcmlkZS5jb20iLCJqdGkiOiJ2NGY1MDBvNWw0dHB1N2I4NXNtc2RlNjdlOCJ9.mknl-JguS5TbT-HJ0-2zotOWEVkXF_JstFiXPIZvPQ8";
  accessToken: string = "don't care";
  expiresAt: string = JSON.stringify((3600 * 1000) + new Date().getTime());
  profile: string = "don't access directly";
}
