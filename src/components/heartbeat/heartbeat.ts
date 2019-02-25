import {Component, OnInit} from '@angular/core';
import {Heartbeat, SseEventService} from "../../providers/sse-event/sse-event.service";
import {timer} from "rxjs/observable/timer";
import {Subject} from "rxjs";

export enum HeartbeatState {
  RETRYING,
  CONNECTED,
  DISCONNECTED,
}

/* Two seconds longer than the expected heartbeat interval. */
const TIMEOUT_INTERVAL_IN_SECONDS: number  = 12;

/**
 * Generated class for the HeartbeatComponent.
 */
@Component({
  selector: 'heartbeat',
  templateUrl: 'heartbeat.html'
})
export class HeartbeatComponent implements OnInit {

  heartbeatState: HeartbeatState;
  private heartbeatSubject: Subject<Heartbeat>;

  constructor(
    private sseService: SseEventService,
  ) {
    console.log('Hello HeartbeatComponent Component');
    this.heartbeatState = HeartbeatState.RETRYING;
    this.heartbeatSubject = sseService.getHeartbeatSubject();
  }

  ngOnInit() {
    // TODO: Resource leak because this will setup the subscriptions on each entry to this page.
    this.heartbeatSubject.asObservable()
      .subscribe(this.connected);

    this.heartbeatSubject.asObservable()
      .startWith(undefined)
      .switchMap(() => timer(TIMEOUT_INTERVAL_IN_SECONDS * 1000))
      .subscribe(this.retrying);

    this.heartbeatSubject.asObservable()
      .startWith(undefined)
      .switchMap(() => timer(TIMEOUT_INTERVAL_IN_SECONDS * 2 * 1000))
      .subscribe(this.disconnected);
  }

  private connected = () => {
    console.log("Network Heartbeat: CONNECTED");
    this.heartbeatState = HeartbeatState.CONNECTED;
  };

  private retrying = () => {
    console.log("Network Heartbeat: RETRYING");
    this.heartbeatState = HeartbeatState.RETRYING;
  };

  private disconnected = () => {
    console.log("Network Heartbeat: DISCONNECTED");
    this.heartbeatState = HeartbeatState.DISCONNECTED;
  };

  public isConnected() {
    return this.heartbeatState === HeartbeatState.CONNECTED;
  }

  public isDisconnected() {
    return this.heartbeatState === HeartbeatState.DISCONNECTED;
  }

  public isRetrying() {
    return this.heartbeatState === HeartbeatState.RETRYING;
  }

}
