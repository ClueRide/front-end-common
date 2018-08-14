import {DeviceGeoLocService} from "./device-geo-loc.service";
import {Observable} from "rxjs/Observable";

let toTest: DeviceGeoLocService;

describe("Device Geo-Loc Service", () => {

  beforeEach(() => {
    toTest = new DeviceGeoLocService();
  });

  it("should be defined", () => {
      expect(toTest).toBeDefined();
  });

  describe("checkGpsAvailability", () => {

    it("should be defined", () => {
      expect(toTest.checkGpsAvailability).toBeDefined();
    });

    it("should return position when GPS available", () => {
      /* setup data */
      let expected = {lat: 33.78, lon: -84.38};
      let actual: any;

      /* train mocks */
      spyOn(navigator.geolocation, "getCurrentPosition").and.returnValue(
        Observable.of(expected)
      );

      /* make call */
      toTest.checkGpsAvailability().subscribe(
        (response) => {
          /* verify results */
          actual = response;
          expect(actual).toBe(expected);
        }
      );

    });

    it("should indicate GPS available when it is available", () => {
      /* setup data */
      let expected = {lat: 33.78, lon: -84.38};

      /* train mocks */
      spyOn(navigator.geolocation, "getCurrentPosition").and.returnValue(
        Observable.of(expected)
      );

      /* make call */
      toTest.checkGpsAvailability().subscribe(
        () => {
          /* verify results */
          expect(toTest.hasGPS()).toBe(true);
        }
      );

    });

    it("should indicate no GPS when it isn't available", () => {
      /* make call */
      toTest.checkGpsAvailability().subscribe(
        () => {
          /* verify results */
          expect(toTest.hasGPS()).toBe(false);
        }
      );

    });

  });

});
