/**
 * Created by jett on 9/22/18.
 */

import {Inject, Injectable} from "@angular/core";
import {INVITES_REST} from "./invite.service.provider";
import {Invite} from "./invite";
import {Observable} from "rxjs/Observable";

@Injectable()
export class InviteService {

  constructor(
    @Inject(INVITES_REST) private resource
  ) {
  }

  /** Retrieves an ordered list of Invites for the current session. */
  myInvites(): Observable<Invite[]> {
    return this.resource.myInvites();
  }

  // TODO: endpoints supporting the maintenance of Invites

}
