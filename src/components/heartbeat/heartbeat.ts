import {Component, OnDestroy, OnInit} from '@angular/core';
import {Heartbeat, SseEventService} from "../../providers/sse-event/sse-event.service";
import {HeartbeatState} from "./heartbeat-state";
import {timer} from "rxjs/observable/timer";
import {Subject} from "rxjs";

/* Two seconds longer than the expected heartbeat interval. */
const TIMEOUT_INTERVAL_IN_SECONDS: number  = 12;

/**
 * Generated class for the HeartbeatComponent.
 */
@Component({
  selector: 'heartbeat',
  templateUrl: 'heartbeat.html'
})
export class HeartbeatComponent implements OnInit, OnDestroy {

  heartbeatState: HeartbeatState = HeartbeatState.RETRYING;
  private heartbeatSubject: Subject<Heartbeat>;

  /* Subscriptions */
  connectedSubscription;
  retryingSubscription;
  disconnectedSubscription;

  constructor(
    private sseService: SseEventService,
  ) {
    console.log('Hello HeartbeatComponent Component');
    this.heartbeatSubject = sseService.getHeartbeatSubject();
  }

  ngOnInit() {
    this.connectedSubscription =
      this.heartbeatSubject.asObservable()
        .map(event => event.state)
        .subscribe(this.maybeConnected);

    this.retryingSubscription =
      this.heartbeatSubject.asObservable()
        .map(event => event.state)
        .startWith(undefined)
        .switchMap(() => timer(TIMEOUT_INTERVAL_IN_SECONDS * 1000))
        .subscribe(this.retrying);

    this.disconnectedSubscription =
      this.heartbeatSubject.asObservable()
        .map(event => event.state)
        .startWith(undefined)
        .switchMap(() => timer(TIMEOUT_INTERVAL_IN_SECONDS * 2 * 1000))
        .subscribe(this.disconnected);
  }

  ngOnDestroy() {
    this.connectedSubscription.unsubscribe();
    this.retryingSubscription.unsubscribe();
    this.disconnectedSubscription.unsubscribe();
  }

  private maybeConnected = (state: HeartbeatState) => {
    this.heartbeatState = state;
    switch (state) {
      case HeartbeatState.CONNECTED:
        console.log("Network Heartbeat: CONNECTED");
        break;
      case HeartbeatState.DISCONNECTED:
        console.log("Network (error): DISCONNECTED");
        break;
      case HeartbeatState.RETRYING:
        console.log("Network (how do we get here): RETRYING");
        break;
    }

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
