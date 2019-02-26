import {HttpClient} from '@angular/common/http';
import {EventSourcePolyfill, OnMessageEvent} from "ng-event-source";
import {Injectable} from '@angular/core';
import {HeartbeatState} from "../../components/heartbeat/heartbeat-state";
import {HttpService, SSE_EVENT_BASE_URL} from "../http/http.service";
import {TokenService} from "../token/token.service";
import {Subject} from "rxjs";

export class Heartbeat {
  event: any;
  lastId: string;
  state: HeartbeatState;
}

/**
 * Handles subscriptions to the SSE Server.
 *
 * Further details on the Wiki: http://bikehighways.wikidot.com/server-sent-events.
*/
@Injectable()
export class SseEventService {

  private eventSource: EventSourcePolyfill;
  /* Lazy init. */
  static heartbeatSubject: Subject<Heartbeat> = null;

  constructor(
    public http: HttpClient,
    public httpService: HttpService,
    private tokenService: TokenService,
  ) {
    console.log('Hello SseEventService Provider');
  }

  public getHeartbeatSubject(): Subject<Heartbeat> {
    if (SseEventService.heartbeatSubject == null) {
      SseEventService.heartbeatSubject = this.initializeHeartbeatSubscription();
    }
    return SseEventService.heartbeatSubject;
  }

  /**
   * Invoked when clients are prepared to pay attention to the Heartbeat events.
   * OnMessage and Error events are turned into marbles in a Heartbeat Observable.
   */
  initializeHeartbeatSubscription(): Subject<Heartbeat> {
    let bearerToken = this.tokenService.getBearerToken();
    let heartbeatSubject: Subject<Heartbeat> = new Subject<Heartbeat>();

    console.log("Opening Event Source");
    this.eventSource = new EventSourcePolyfill(
      SSE_EVENT_BASE_URL + "heartbeat",
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      }
    );

    this.eventSource.onopen = (
      (openEvent) => {
        console.log("SSE Heartbeat Open: " + JSON.stringify(openEvent))
      }
    );

    this.eventSource.onmessage = (
      (messageEvent: any) => {
        console.log("SSE Heartbeat On Message Event: " + JSON.stringify(messageEvent));
        let heartbeat = new Heartbeat();
        heartbeat.event = messageEvent;
        heartbeat.lastId = messageEvent.lastEventId;
        heartbeat.state = HeartbeatState.CONNECTED;
        heartbeatSubject.next(heartbeat);
      }
    );

    this.eventSource.onerror = (
      (error) => {
        console.log("SSE Heartbeat Error: " + JSON.stringify(error));
        let heartbeat = new Heartbeat();
        heartbeat.event = error;
        heartbeat.state = HeartbeatState.DISCONNECTED;
        heartbeatSubject.next(heartbeat);
      }
    );

    return heartbeatSubject;
  }

}
