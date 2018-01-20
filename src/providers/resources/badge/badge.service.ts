import {Inject, Injectable} from "@angular/core";
import {BADGES_REST} from "./badge.service.provider";
import {Badge} from "./badge";
import {Observable} from "rxjs/Observable";
/**
 * Created by jett on 7/22/17.
 */

@Injectable()
export class BadgeService {

  constructor(
    @Inject(BADGES_REST) private resource
  ) {
  }

  getList(): Observable<Badge[]> {
    return this.resource.getList();
  }

}
