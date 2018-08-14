import {Geoposition} from "@ionic-native/geolocation";
import {Subject} from "rxjs/Subject";
// tslint:disable-next-line
import {Restangular} from "ngx-restangular";
import {DeviceGeoLocService} from "../device-geo-loc/device-geo-loc.service";
import {isDefined} from "ionic-angular/util/util";
import {LatLon} from "../lat-lon/lat-lon";
import {Injectable} from "@angular/core";
import {ObservableGeoposition} from "../../components/ObservableGeoposition";

function buildGeoPositionFromLatLon(latLon: LatLon): Geoposition {
  return {
    coords: {
      latitude: latLon.lat,
      longitude: latLon.lon,
      accuracy: 0.0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    },
    timestamp: null
  };
}

@Injectable()
export class GeoLocService {

  /** A Subject for Tethered Position; only instantiated if needed. */
  private tetheredPosition: Subject<Geoposition>;

  private restangularService: Restangular;
  private forceTether: boolean;
  private keepScheduling: boolean = false;
  static DEFAULT_GEOPOSITION: Geoposition = {
    coords: {
      latitude: 33.76,
      longitude: -84.38,
      accuracy: 0.0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    },
    timestamp: null
  };

  constructor(
    private deviceGeoLocService: DeviceGeoLocService,
    private restangular: Restangular
  ) {
    this.restangularService = restangular;
  }

  /**
   * This component needs some time after the platform is ready to
   * check the availability of the GPS -- and possibly confirm with
   * the user if the GPS may be used -- before allowing the use of
   * the position sources. The observable returned by this function
   * will provide an async response once the checks are completed and
   * this service is ready for use.
   * @returns {ObservableGeoposition}
   */
  public notifyWhenReady(): ObservableGeoposition {
    let serviceReady: Subject<Geoposition> = new Subject;
    this.deviceGeoLocService.checkGpsAvailability().subscribe(
      (response) => {
        if (response) {
          serviceReady.next(response);
        } else {
          serviceReady.next(GeoLocService.DEFAULT_GEOPOSITION);
        }
      },
      () => {
        serviceReady.next(GeoLocService.DEFAULT_GEOPOSITION);
      }
    );
    return serviceReady.asObservable();
  }

  /**
   * Set this true if we want to always use the tether even if GPS
   * is available.
   */
  public forceUsingTether() {
    this.forceTether = true;
  }

  public useGpsWhenAvailable() {
    this.forceTether = false;
  }

  public isTethered(): boolean {
    return isDefined(this.tetheredPosition);
  }
  /* Turn off watching the position -- however we're picking it up. */

  public clearWatch() {
    if (this.isTethered()) {
      this.stopMonitoringTether();
    } else {
      this.deviceGeoLocService.clearWatch();
    }
  }

  /**
   * Returns an observable that gives the current position when updated.
   * This will be sourced by one of two things:
   * <ul>
   *     <li>Observable against the native location of the device this is running on, or if it fails,
   *     <li>A tethered value that comes from the server for the user's session, or if it fails, a fake value.
   * </ul>
   */
  getPositionWatch(): ObservableGeoposition {
    if (this.forceTether) {
      console.log("Forced Tether");
      return this.getTetheredPosition();
    } else {
      if (this.deviceGeoLocService.hasGPS()) {
        console.log("Able to use GPS");
        let devicePositionSubject: Subject<Geoposition> = this.deviceGeoLocService.getWatch();
        return devicePositionSubject.asObservable();
      } else {
        console.log("Unable to use GPS -- tethering");
        return this.getTetheredPosition();
      }
    }
  }

  private getTetheredPosition(): ObservableGeoposition {
    if (!isDefined(this.tetheredPosition)) {
      this.tetheredPosition = new Subject();
      this.keepScheduling = true;
      this.startMonitoringTether();
    }
    return this.tetheredPosition.asObservable();
  }

  private startMonitoringTether(): void {
    let monitorPromise = this.restangular.one("tether/dev").get().toPromise();
    monitorPromise.then(
      (latLon) => {
        let geoPosition = buildGeoPositionFromLatLon(latLon);
        this.tetheredPosition.next(geoPosition);
        if (this.keepScheduling) {
          setTimeout(() => {this.startMonitoringTether()}, 1500);
        }
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  private stopMonitoringTether() {
    this.keepScheduling = false;
  }

}
