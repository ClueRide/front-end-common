import {HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {TokenService} from "../token/token.service";

/**
 * Provides utility constructs for HttpClient calls.
 */
export const BASE_URL: String = 'https://player.clueride.com/rest/';
export const SSE_EVENT_BASE_URL: String = 'http://sse.clueride.com/';

@Injectable()
export class HttpService {

  constructor(
    private tokenService: TokenService,
  ) {
    console.log('Hello HttpService Provider');
  }

  public getAuthHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append(
        'Authorization',
        'Bearer ' + this.tokenService.getBearerToken()
      );
  }

}
