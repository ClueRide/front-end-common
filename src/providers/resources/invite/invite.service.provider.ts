/**
 * Created by jett on 9/22/18.
 */
import {InjectionToken} from "@angular/core";
import {Restangular} from "ngx-restangular";
import {Resource} from "../resource";

export const INVITES_REST = new InjectionToken<string>('InviteResource');

/** Endpoint definition for retrieving my invitations. */
const MY_INVITES =
  {
    resourceName: 'invite',
    name: 'myInvites',
    httpMethod: 'get',
    path: '',
  };

// TODO: endpoints supporting the maintenance of Invites

function RestFactory(
  restangular: Restangular,
  crResource: Resource,
) {
  /* Configure this particular resource to capture the Authorization header. */
  restangular.withConfig(
    (configurer) => {
      crResource.defineMethod(configurer, MY_INVITES);
    }
  );

  /* The path for this API endpoint */
  return restangular.service('invite');
}

export let InviteServiceProvider =
  { provide: INVITES_REST,
    useFactory: RestFactory,
    deps: [Restangular,Resource]
  };
