import {Injectable} from "@angular/core";
import {TokenService} from "../token/token.service";
/**
 * Created by jett on 9/24/17.
 */

@Injectable()
export class Resource {

  constructor(
    private tokenService: TokenService
  ) {
  }

  public addTokenRequestInterceptor(configurer) {
    configurer.addFullRequestInterceptor(
      (element, operation, path, url, headers, params) => {
        let bearerToken = this.tokenService.getBearerToken();

        return {
          headers: Object.assign({}, headers, {Authorization: `Bearer ${bearerToken}`})
        };
      }
    );
  }

  public defineMethod(configurer, methodConfig) {
    this.addTokenRequestInterceptor(configurer);
    configurer.addElementTransformer(methodConfig.resourceName, true,
      (resource) => {
        resource.addRestangularMethod(
          methodConfig.name,
          methodConfig.httpMethod,
          methodConfig.path,
          methodConfig.object,
          methodConfig.headers
        );
        return resource;
      }
    );
  }

}

