import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {TokenService} from "../token/token.service";

/*
  Generated class for the HttpService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export const BASE_URL: String = 'https://player.clueride.com/rest/';

@Injectable()
export class HttpService {

  constructor(
    public http: HttpClient,
    private tokenService: TokenService,
  ) {
    console.log('Hello HttpService Provider');
  }

  public getAuthHeaders(): HttpHeaders {
    let commonHeaders = new HttpHeaders();
    commonHeaders = commonHeaders.append(
      'Authorization',
      'Bearer ' + this.tokenService.getBearerToken()
    );
    return commonHeaders;
  }

}
