import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BASE_URL, HttpService} from "../http/http.service";
import {Observable} from "rxjs";
import {Path} from "./path";

/** Provides access to Path Geometry and details. */
@Injectable()
export class PathService {

  constructor(
    public http: HttpClient,
    private httpService: HttpService,
  ) {
    console.log('Hello PathProvider Provider');
  }

  public getPathGeoJson(pathId: number): Observable<Path> {
    return this.http.get<Path>(
      BASE_URL + 'path/geojson/' + pathId,
      {headers: this.httpService.getAuthHeaders()}
    );
  }

}
