import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Course} from "./course";
import {BASE_URL, HttpService} from "../http/http.service";
import {Observable} from "rxjs";

/** Caching service for the Course associated with the current session.
 * This data is static for the duration of the session.
*/
@Injectable()
export class CourseService {

  /* Defined once we have received valid data and we haven't been asked to refresh. */
  private cachedCourse: Course;
  /* Defined only during the async window after request and before response. */
  private observable: Observable<any>;

  constructor(
    public http: HttpClient,
    private httpService: HttpService,
  ) {
    console.log('Hello CourseService');
  }

  public getSessionCourse(): Observable<Course> {
    if (this.cachedCourse) {
      return Observable.of(this.cachedCourse);
    } else if (this.observable) {
      return this.observable;
    } else {
      this.observable = this.http.get(
        BASE_URL + 'course/active',
        {
          headers: this.httpService.getAuthHeaders(),
          observe: 'response'
        }
      ).map(response => {
        /* Reset this to indicate response is received. */
        this.observable = null;
        if (response.status === 200) {
          this.cachedCourse = <Course> response.body;
          return this.cachedCourse;
        } else {
          return 'Request failed with status ' + response.status;
        }
      }).share();
      return this.observable;
    }
  }

}
