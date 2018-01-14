/**
 * Created by jett on 1/8/18.
 */

export class AuthBddMock {

  idToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlEwTkZORGd6TnpSRE5UTTNOek0zUlRjNVJFSkZSREpFTlVZMlFUSkROVU5GUkVWRE9UQTJOQSJ9.eyJnaXZlbl9uYW1lIjoiSmV0dCIsImZhbWlseV9uYW1lIjoiTWFya3MiLCJuaWNrbmFtZSI6ImpldHRtYXJrcyIsIm5hbWUiOiJKZXR0IE1hcmtzIiwicGljdHVyZSI6Imh0dHBzOi8vbGg2Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tN0pyS3lPY2JCa3MvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQm8vR1BISG9XWXBLN2svcGhvdG8uanBnIiwiZ2VuZGVyIjoibWFsZSIsImxvY2FsZSI6ImVuIiwidXBkYXRlZF9hdCI6IjIwMTgtMDEtMTBUMDE6NDM6MjYuMjM0WiIsImVtYWlsIjoiamV0dG1hcmtzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2NsdWVyaWRlLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwOTU5MjcyMDQxNjA5MTkxMjUyNSIsImF1ZCI6ImQzYnNhM1lpSVZLZVVRWkk5OG4wMjU4ZDdmWFc2NGo3IiwiaWF0IjoxNTE1NTQ4NjA3LCJleHAiOjE1MTU1ODQ2MDd9.aLl4I6PREUIeT3iMs3y8fYAAvh_qqGao9Hw7xIAKLctZeyllgZciDGbsRLK6bEE26TDfs5VhCIVW1jHxQq1o-zlPcAFes4T7jyw9jRAq6DzHRYk69-5gwKlp8Rg0KpqYK6LHsRs2mj-5enT6ia4rkI2ki-fNtmRRa_v3vH1t1gxiaCgm4oWHFgBHD9LqaOSa6tPURr58wrmkWTnwmQr4v0tyoVILzbX7HRYLTnDMbXaJrdfh-b5V97wNxzMo_Up8rfBtfJfi7YV4oe8OQmztSZuM22EGS1U5hVJ_Gbq8rXXvEUrDQp-Flvc1-cjqQe_0BRIZ-5nSI_ysXlotJ9Xg3A";
  accessToken: string = "don't care";
  expiresAt: string = JSON.stringify((3600 * 1000) + new Date().getTime());
  profile: string = "don't access directly";
}
