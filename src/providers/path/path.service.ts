import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BASE_URL, HttpService} from "../http/http.service";
// tslint:disable-next-line
import {Observable, Subscription} from "rxjs";
import {Path} from "./path";
import {CourseService} from "../course/course-service";
import {Course} from "../course/course";

/** Provides and caches Path Geometry and details. */
@Injectable()
export class PathService {

  cachedCourse: Course;
  cachedPathGeoJson: Path[] = [];
  observable: Observable<any>;
  private courseSubscription: Subscription;
  indexBeingRetrieved: number;

  constructor(
    public http: HttpClient,
    private httpService: HttpService,
    private courseService: CourseService,
  ) {
    console.log('Hello PathProvider Provider');
    this.initCourseSubscription();
  }

  /* Bring in the Course which we'll want to hold onto. */
  private initCourseSubscription() {
    this.courseSubscription = this.courseService.getSessionCourse().subscribe(
      (course) => {
        this.cachedCourse = course;
      }
    );
  }

  public getPathGeoJsonByIndex(index: number): Observable<Path> {
    this.indexBeingRetrieved = index;
    if (this.cachedPathGeoJson.length > index) {
      return Observable.of(this.cachedPathGeoJson[index]);
    }
    let pathId = this.cachedCourse.pathIds[index];
    return this.getPathGeoJson(pathId);
  }

  public getPathGeoJson(pathId: number): Observable<Path> {
    this.observable = this.http.get<Path>(
      BASE_URL + 'path/geojson/' + pathId,
      {
        headers: this.httpService.getAuthHeaders(),
        observe: 'response'
      }
    ).map(response => {
      this.observable = null;
      if (response.status === 200) {
        this.cachedPathGeoJson.push(response.body);
        return response.body;
      } else {
        return 'Request failed with status ' + response.status;
      }
    }).share();
    return this.observable;
  }

  ngOnDestroy() {
    this.courseSubscription.unsubscribe();
  }

}
