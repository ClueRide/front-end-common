// tslint:disable-next-line
import {ModuleWithProviders, NgModule} from '@angular/core';
import {IonicStorageModule} from "@ionic/storage";

import {AttractionService} from "../providers/attraction/attraction-service";
import {Auth0ConfigService} from "../providers/auth0Config/Auth0ConfigService";
import {BadgeService} from "../providers/badge/badge.service";
import {BadgeProgressService} from "../providers/badge-progress/badge-progress.service";
import {ConfirmPageModule} from "../pages/confirm/confirm.module";
import {CourseService} from "../providers/course/course-service";
import {DeviceGeoLocService} from "../providers/device-geo-loc/device-geo-loc.service";
import {EdgeService} from "../providers/edge/edge.service";
import {GeoLocService} from "../providers/geo-loc/geo-loc";
import {HttpClientModule} from "@angular/common/http";
import {HttpService} from "../providers/http/http.service";
import {InviteService} from "../providers/invite/invite.service";
import {LatLonProvider} from "../providers/lat-lon/lat-lon";
import {LocationService} from "../providers/location/location-service";
import {LocTypeService} from "../providers/loc-type/loc-type.service";
import {MemberService} from "../providers/member/member.service";
import {OutingService} from "../providers/outing/outing.service";
import {PathService} from "../providers/path/path.service";
import {PlatformStateService} from "../providers/platform-state/platform-state.service";
import {ProfileService} from "../providers/profile/profile.service";
import {PuzzleService} from "../providers/puzzle/puzzle-service";
import {RegistrationPageModule} from "../pages/registration/registration.module";
import {RegStateService} from "../providers/reg-state/reg-state.service";
import {RenewalService} from "../providers/renewal/renewal.service";
import {SseEventService} from "../providers/sse-event/sse-event.service";
import {TeamService} from "../providers/team/team-service";
import {TokenService} from "../providers/token/token.service";

@NgModule({
  imports: [
    ConfirmPageModule,
    HttpClientModule,
    IonicStorageModule.forRoot({driverOrder:  ['localstorage', 'sqlite', 'indexeddb', 'websql']}),
    RegistrationPageModule,
  ],
})

export class ComponentsModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComponentsModule,
      providers: [
        AttractionService,
        Auth0ConfigService,
        BadgeService,
        BadgeProgressService,
        CourseService,
        DeviceGeoLocService,
        EdgeService,
        GeoLocService,
        HttpService,
        InviteService,
        LatLonProvider,
        LocationService,
        LocTypeService,
        MemberService,
        OutingService,
        PathService,
        PlatformStateService,
        ProfileService,
        PuzzleService,
        RegStateService,
        RegistrationPageModule,
        RenewalService,
        SseEventService,
        TeamService,
        TokenService,
      ]
    }
  }

}
