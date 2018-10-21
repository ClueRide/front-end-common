/**
 * Created by jett on 1/20/18.
 */
import {TestBed} from "@angular/core/testing";
import {TokenService} from "./token.service";
import {Platform} from "ionic-angular";
import {ComponentsModule} from "../../components/components.module";
import {STORAGE_KEYS} from "../storage-keys";
import {BddMockToken} from "./bddMockToken";
import {ProfileService} from "../profile/profile.service";
import {SecureStorageMock} from "@ionic-native-mocks/secure-storage";
import {SecureStorage} from "@ionic-native/secure-storage";
import {REGISTRATION_TYPE} from "../auth/registration-type";

let toTest: TokenService;
let bddMockToken: BddMockToken = new BddMockToken;

describe('Services: TokenService', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        ComponentsModule,
        ProfileService,
        {
          provide: SecureStorage,
          useClass: SecureStorageMock,
          deps: [SecureStorageMock]
        },
        SecureStorageMock,
        TokenService,
        Platform
      ],
      imports: [
      ]
    }).compileComponents();

    toTest = TestBed.get(TokenService);
    window.localStorage.clear();
  });

  it("should be defined", () => {
    expect(toTest).toBeDefined();
  });

  describe("bddRegister", () => {

    it("should place valid ID token into storage", () => {
      /* make call */
      toTest.bddRegister();

      /* verify results */
      expect(window.localStorage.getItem(STORAGE_KEYS.jwtToken)).toContain(bddMockToken.idToken);
    });

    it("should place valid access token into storage", () => {
      /* make call */
      toTest.bddRegister();

      /* verify results */
      expect(window.localStorage.getItem(STORAGE_KEYS.accessToken)).toContain(bddMockToken.accessToken);
    });

    it("should place valid profile object into storage", () => {
      /* make call */
      toTest.bddRegister();

      /* verify results */
      let profile = JSON.parse(window.localStorage.getItem(STORAGE_KEYS.profile));
      expect(profile.email).toEqual(bddMockToken.profile.email);
      expect(profile.picture).toEqual(bddMockToken.profile.picture);
    });

    it("should place valid expiration time into storage", () => {
      /* make call */
      toTest.bddRegister();

      /* verify results */
      expect(window.localStorage.getItem(STORAGE_KEYS.expiresAt)).not.toBeNull();
    });

  });

  describe("setIdToken", () => {

    it("should place the ID token into storage", () => {
      /* make call */
      toTest.setIdToken(bddMockToken.idToken);

      /* verify results */
      expect(window.localStorage.getItem(STORAGE_KEYS.jwtToken)).toContain(bddMockToken.idToken);
      expect(toTest.getBearerToken()).toContain(bddMockToken.idToken);
    });

    it("should decode the Payload", () => {
      /* make call */
      toTest.setIdToken(bddMockToken.idToken);

      /* verify results */
      expect(toTest.payload.email).toBeDefined();
    });

    it("should place profile data into storage", () => {
      /* make call */
      toTest.setIdToken(bddMockToken.idToken);

      /* verify results */
      expect(window.localStorage.getItem(STORAGE_KEYS.profile)).toContain("Bike Angel");
    });

    it("should place the expiresAt timestamp into storage", () => {
      /* make call */
      toTest.setIdToken(bddMockToken.idToken);

      /* verify results */
      expect(toTest.getExpiresAtMilliseconds()).toBeGreaterThan(150000000000);

    });

  });

  describe("decodePayload", () => {
    it("should throw exception for null token", () => {
      expect(toTest.decodePayload.bind(null, null)).toThrowError("passed token is not populated");
    });

    it("should throw exception for empty token", () => {
      expect(toTest.decodePayload.bind(null, "")).toThrowError("passed token is not populated");
    });

    it("should throw exception for malformed token", () => {
      expect(toTest.decodePayload.bind(null, "part1.part2")).toThrowError("JWT must have 3 parts");
    });

    it("should throw exception for inability to parse payload portion of token", () => {
      expect(toTest.decodePayload.bind(null, "part1..part3")).toThrowError();
    });

  });

  describe("setAccessToken", () => {
      it("should place the access token into storage", () => {
        /* make call */
        toTest.setAccessToken(bddMockToken.accessToken);

        /* verify results */
        expect(window.localStorage.getItem(STORAGE_KEYS.accessToken)).toContain(bddMockToken.accessToken);
      });
  });

  describe("setRegistrationType", () => {

    it("should record the given registration type", () => {
      /* make call */
      toTest.setRegistrationType(REGISTRATION_TYPE.SOCIAL);

      /* verify results */
      window.localStorage.getItem(STORAGE_KEYS.registrationType);
    });

  });

  describe("getRegistrationType", () => {

    it("should retrieve the correct value", () => {
      /* setup data */
      let expected: string = REGISTRATION_TYPE.SOCIAL;
      toTest.setRegistrationType(expected);

      /* make call */
      let actual = toTest.getRegistrationType();

      /* verify results */
      expect(actual).toEqual(expected);
    });

  });

  describe("clear", () => {

    it("should remove any stored values", () => {
      /* setup data */
      toTest.bddRegister();

      /* make call */
      toTest.clearToken();

      /* verify results */
      expect(window.localStorage.getItem(STORAGE_KEYS.jwtToken)).toBeNull();
      expect(window.localStorage.getItem(STORAGE_KEYS.accessToken)).toBeNull();
      expect(window.localStorage.getItem(STORAGE_KEYS.profile)).toBeNull();
      expect(window.localStorage.getItem(STORAGE_KEYS.expiresAt)).toBeNull();
    });

  });

});
