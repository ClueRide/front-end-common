import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Holds status of the Platform.
 */
@Injectable()
export class PlatformStateService {

  constructor(public http: HttpClient) {
    console.log('Hello PlatformStateService Provider');
  }

  /**
   * Looks at the current server location to tell if we're testing or not.
   * @returns {boolean}
   */
  public runningLocal() {
    return (
      /* TODO: Probably want to make this a configurable string. */
      window.location.toString().indexOf('http://localhost:8100') === 0
    );
  }

}
