import {InjectionToken} from "@angular/core";
import {Restangular} from "ngx-restangular/dist/esm/src";
import {Resource} from "../resource";

export const BADGES_REST = new InjectionToken<string>('BadgeResource');

const BADGE =
  {
    resourceName: 'badge',
    name: 'getList',
    httpMethod: 'get',
    path: '',
  };

function RestFactory(
  restangular: Restangular,
  crResource: Resource,
) {
  /* Configure this particular resource to capture the Authorization header. */
  restangular.withConfig(
    (configurer) => {
      crResource.defineMethod(configurer, BADGE);
    }
  );

  /* The path for this API endpoint */
  return restangular.service('badge');
}

export let BadgeServiceProvider =
  { provide: BADGES_REST,
    useFactory: RestFactory,
    deps: [Restangular,Resource]
  };
