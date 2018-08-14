/**
 * Created by jett on 6/25/17.
 */
import {GeoLocService} from "./geo-loc";
import {DeviceGeoLocService} from "../device-geo-loc/device-geo-loc.service";
import {Subject} from "rxjs/Subject";
import {Geoposition} from "@ionic-native/geolocation";

let toTest : GeoLocService;
let deviceGeoLocService: DeviceGeoLocService;
let restangularService: any = {
  one: function () {
    return {
      get: function () {}
    }
  }
};

describe("Geo-Location", () => {

  beforeEach(() => {
    deviceGeoLocService = new DeviceGeoLocService();

    toTest = new GeoLocService(
      deviceGeoLocService,
      restangularService
    );

  });

  it("should be defined", () => {
    expect(toTest).toBeDefined();
  });

  describe("injections", () => {

    it("should be defined", () => {
      expect(deviceGeoLocService).toBeDefined();
    });

  });

  describe("Initialization", () => {

    it("should provide signal (and a position) when available for use", () => {
      /* setup data */
      let actual: Geoposition = undefined;
      let serviceReadySubject: Subject<Geoposition> = new Subject;
      let expected = GeoLocService.DEFAULT_GEOPOSITION;

      /* train mocks */
      spyOn(deviceGeoLocService, "checkGpsAvailability").and.returnValue(serviceReadySubject.asObservable());

      /* make call */
      toTest.notifyWhenReady().subscribe(
        (response) => {
          actual = response;
        },
        () => {
          // eat failure within test; we're checking the result
        }
      );

      /* verify results */
      expect(actual).not.toBeDefined();
      serviceReadySubject.next(expected);
      expect(actual).toBe(expected);

    });

  });

  describe("Resolving which location source to use", () => {

    it("should read from GPS when it is available", () => {
      /* train mocks */
      spyOn(deviceGeoLocService, "hasGPS").and.returnValue(true);

      /* make call */
      toTest.getPositionWatch();

      /* verify results */
      expect(toTest.isTethered()).toBeFalsy();

    });

    it("should read from Tethered when GPS unavailable", () => {
      /* train mocks */
      let positionSubject: Subject<any> = new Subject;
      spyOn(deviceGeoLocService, "hasGPS").and.returnValue(false);
      spyOn(restangularService, "one").and.returnValue({
        get: function() {
          return positionSubject;
        }
      });

      /* make call */
      toTest.getPositionWatch();

      /* verify results */
      expect(toTest.isTethered()).toBeTruthy();

    });

    it("should run tethered when overridden", () => {
      /* train mocks */
      let positionSubject: Subject<any> = new Subject;
      spyOn(deviceGeoLocService, "hasGPS").and.returnValue(true);
      spyOn(restangularService, "one").and.returnValue({
        get: function() {
          return positionSubject;
        }
      });

      /* make call */
      toTest.forceUsingTether();
      toTest.getPositionWatch();

      /* verify results */
      expect(toTest.isTethered()).toBeTruthy();

    });

    it("should not miss single unchanging point", () => {
      /* setup data */
      let expected = {lat: 33.78, lon: -84.38};
      let positionSubject: Subject<any> = new Subject;
      let actual: any;

      /* train mocks */
      spyOn(deviceGeoLocService, "checkGpsAvailability").and.returnValue(
        positionSubject.asObservable()
      );
      spyOn(restangularService, "one").and.returnValue({
        get: function() {
          return positionSubject;
        }
      });

      /* make call */
      toTest.notifyWhenReady().subscribe(
        (response) => {
              actual = response;
        }
      );
      positionSubject.next(expected);

      /* verify results */
      expect(actual).toBe(expected);

    });

    it("should give us Observable in any case", () => {
      /* train mocks */
      let positionSubject: Subject<any> = new Subject;
      spyOn(deviceGeoLocService, "checkGpsAvailability").and.returnValue(
        positionSubject.asObservable()
      );
      spyOn(restangularService, "one").and.returnValue({
        get: function() {
          return positionSubject;
        }
      });

      /* make call */
      let positionObservable = toTest.getPositionWatch();

      /* verify results */
      expect(positionObservable).toBeDefined();
      expect(positionObservable.subscribe).toBeDefined();
      positionObservable.subscribe((actual) => {
        expect(actual.timestamp).toBeDefined();
        expect(actual.timestamp).toBeFalsy();
      });
    });

  });

  describe("Notify when Ready", () => {

    it("should not return until device can be polled for position", () => {
      /* setup data */
      let positionSubject: Subject<any> = new Subject;
      let actual: any = undefined;

      /* train mocks */
      spyOn(deviceGeoLocService, "checkGpsAvailability").and.returnValue(
        positionSubject.asObservable()
      );

      /* make call */
      toTest.notifyWhenReady().subscribe(
        (response) => {
          actual = response;
        }
      );

      /* verify results */
      expect(actual).not.toBeDefined();
    });

    it("should return device position when GPS available", () => {
      /* setup data */
      let actual: any = undefined;
      let expected = {lat: 33.78, lon: -84.38};
      let positionSubject: Subject<any> = new Subject;

      /* train mocks */
      spyOn(deviceGeoLocService, "checkGpsAvailability").and.returnValue(
        positionSubject.asObservable()
      );

      /* make call */
      toTest.notifyWhenReady().subscribe(
        (response) => {
          actual = response;
        }
      );
      positionSubject.next(expected);

      /* verify results */
      expect(actual).toBe(expected);
    });

    it("should return default position when GPS not available", () => {
      /* setup data */
      let actual: any = undefined;
      let expected = GeoLocService.DEFAULT_GEOPOSITION;
      let positionSubject: Subject<any> = new Subject;

      /* train mocks */
      spyOn(deviceGeoLocService, "checkGpsAvailability").and.returnValue(
        positionSubject.asObservable()
      );

      /* make call */
      toTest.notifyWhenReady().subscribe(
        (response) => {
          actual = response;
        }
      );
      positionSubject.error("timeout looking for device position");

      /* verify results */
      expect(actual).toEqual(expected);

    });


    it("should return default position when device returns null", () => {
      /* setup data */
      let actual: any = undefined;
      let expected = GeoLocService.DEFAULT_GEOPOSITION;
      let positionSubject: Subject<any> = new Subject;

      /* train mocks */
      spyOn(deviceGeoLocService, "checkGpsAvailability").and.returnValue(
        positionSubject.asObservable()
      );

      /* make call */
      toTest.notifyWhenReady().subscribe(
        (response) => {
          actual = response;
        }
      );
      positionSubject.next(null);

      /* verify results */
      expect(actual).toEqual(expected);

    });

  });

  describe("Watching Tether", () => {

    it("should receive position information from Team's Guide (via server)", () => {

    });

  });

  describe("Watching internal GPS", () => {
    it("should receive position from device", () => {

    });
  });

  describe("Watch management", () => {

    it("should open a watch when starting", () => {

    });

    it("should close the watch when done", () => {

    });

  });

});
