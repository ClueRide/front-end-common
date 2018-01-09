/**
 * Created by jett on 1/8/18.
 */
import {Injectable} from "@angular/core";
import {TokenService} from "../token/token.service";

/**
 * Knows about the profile portion of the JWT token obtained
 * from the Token Service.
 */
@Injectable()
export class ProfileService {

  constructor (
    private tokenService: TokenService
  ) {

  }

  public getPrincipal(): string {
    let payload = this.tokenService.getPayload();
    return payload.email;
  }

  public getUserImageUrl(): string {
    return this.tokenService.getPayload().picture;
  }

}
