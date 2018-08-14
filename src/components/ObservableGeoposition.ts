import {Observable} from "rxjs/Observable";
import {Geoposition} from "@ionic-native/geolocation";
/**
 * Created by jett on 8/13/18.
 */

export interface ObservableGeoposition extends Observable<Geoposition> {}
