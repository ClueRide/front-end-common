import {AuthService} from "./auth.service";
import {TestBed} from "@angular/core/testing";
import {ComponentsModule} from "../../components/components.module";
import {TokenService} from "../token/token.service";
import {Platform} from "ionic-angular";
import {ProfileService} from "../profile/profile.service";
import {AuthState} from "./auth-state";
import {STORAGE_KEYS} from "../storage-keys";
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
        ProfileService,
        TokenService,
        Platform
      ],
      imports: [
      ]
    }).compileComponents();

    toTest = TestBed.get(AuthService);
    tokenService = TestBed.get(TokenService);
    window.localStorage.clear();
  });

  it("should be defined", () => {
    expect(toTest).toBeDefined();
  });

  describe("getRegistrationState", () => {

    it("should return UNREGISTERED when tokens are empty", () => {
      /* make call */
      let actual = toTest.getRegistrationState();

      /* verify results */
      expect(actual).toEqual(AuthState.UNREGISTERED);
    });

    it("should return REGISTERED when tokens are valid and current", () => {
      /* setup data */
      tokenService.bddRegister();

      /* make call */
      let actual = toTest.getRegistrationState();

      /* verify results */
      expect(actual).toEqual(AuthState.REGISTERED);
    });

    it("should return EXPIRED when tokens are expired but are no more than 90 days old", () => {
      /* setup data */
      tokenService.bddRegister();
      let eightyNineDays = 86400 * 1000 * 89;
      let oldExpiration = Date.now() - eightyNineDays;
      window.localStorage.setItem(STORAGE_KEYS.expiresAt, JSON.stringify(oldExpiration));

      /* make call */
      let actual = toTest.getRegistrationState();

      /* verify results */
      expect(actual).toEqual(AuthState.EXPIRED);
    });

  });

  describe("registerSocial", () => {

    it("should register the device", () => {
      /* make call */
      // toTest.registerSocial();
    });

  });

});
