import {BehaviorSubject, Observable} from "rxjs";
import {RegState} from "../reg-state/reg-state";
import {Injectable} from "@angular/core";
import {RegStateKey} from "../reg-state/reg-state-key";

/* TODO: Temporary Stub. */
@Injectable()
export class RenewalService {

  constructor() {}

  public renew(): Observable<RegState> {
    console.log("Renewing expired token");
    return new BehaviorSubject<RegState>(
      new RegState(RegStateKey.ACTIVE, "Renewed")
    ).asObservable();
  }

}
