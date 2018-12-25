import {AuthService} from "./auth.service";
import {inject, TestBed} from "@angular/core/testing";
import {ComponentsModule} from "../../components/components.module";
import {TokenService} from "../token/token.service";
import {Platform} from "ionic-angular";
import {ProfileService} from "../profile/profile.service";
import {AuthState} from "./auth-state";
import {SecureStorage} from "@ionic-native/secure-storage";
import {SecureStorageMock} from "@ionic-native-mocks/secure-storage";
import {RegStateService} from "../reg-state/reg-state.service";
import {HttpService} from "../http/http.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {UserService} from "../user/user.service";
/**
 * Created by jett on 2/5/18.
 */

let toTest: AuthService;
let tokenService: TokenService;

describe("Services: AuthService", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        ComponentsModule,
        HttpService,
        ProfileService,
        {
          provide: SecureStorage,
          useClass: SecureStorageMock,
          deps: [SecureStorageMock]
        },
        RegStateService,
        SecureStorageMock,
        TokenService,
        UserService,
        Platform
      ],
      imports: [
        HttpClientTestingModule
      ]
    }).compileComponents();

    toTest = TestBed.get(AuthService);
    tokenService = TestBed.get(TokenService);
    window.localStorage.clear();
  });

  it("should be defined", () => {
    expect(toTest).toBeDefined();
  });

  describe("checkRegistrationRequired", () => {

    it("should resolve true when unregistered",
      inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {

          /* make call */
          let actualPromise = toTest.checkRegistrationRequired();

          /* verify results */
          actualPromise.then(
            (actual) => {
              expect(actual).toBeTruthy();
            }
          );
        }
      )
    );

    it("should resolve false when registered",
      inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {

          /* setup data */
          tokenService.bddRegister();

          /* make call */
          let actualPromise = toTest.checkRegistrationRequired();

          /* Set HTTP expectations. */
          const requestExpectation = httpMock.expectOne("https://player.clueride.com/rest/access/state");
          expect(requestExpectation.request.method).toEqual('GET');

          /* Mock the HTTP response. */
          requestExpectation.flush(
            "true",
            {
              status: 200,
              statusText: 'OK'
            }
          );

          /* verify results */
          actualPromise.then(
            (actual) => {
              expect(actual).toBeFalsy();
              // done();
            }
          );

        }
      )
    );

  });

  describe("getRegistrationState", () => {

    it("should return UNREGISTERED when tokens are empty",
      inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
          /* setup data */
          let actual = {};

          /* make call */
          toTest.getRegistrationState().subscribe(
            (result) => {
              actual = result;
              /* verify results */
              expect(actual).toEqual(AuthState.UNREGISTERED);
            }
          );
        }
      )
    );

    it("should return REGISTERED when tokens are valid and current",
      inject(
        [HttpTestingController],
        (httpMock: HttpTestingController) => {
          /* setup data */
          tokenService.bddRegister();
          let actual = {};

          /* make call */
          toTest.getRegistrationState().subscribe(
            (result) => {
              actual = result;
            }
          );

          /* Set HTTP expectations. */
          const requestExpectation = httpMock.expectOne("https://player.clueride.com/rest/access/state");
          expect(requestExpectation.request.method).toEqual('GET');

          /* Mock the HTTP response. */
          requestExpectation.flush(
            "true",
            {
              status: 200,
              statusText: 'OK'
            }
          );

          /* verify results */
          expect(actual).toEqual(AuthState.REGISTERED);
        }
      )
    );

  });

  describe("registerSocial", () => {

    it("should register the device", () => {
      /* make call */
      // toTest.registerSocial();
    });

  });

});
