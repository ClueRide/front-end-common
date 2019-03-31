// tslint:disable-next-line
import {ModuleWithProviders, NgModule} from '@angular/core';
import {IonicStorageModule} from "@ionic/storage";

import {AttractionService} from "../providers/attraction/attraction-service";
import {AuthService} from "../providers/auth/auth.service";
import {BadgeService} from "../providers/badge/badge.service";
import {ConfirmPageModule} from "../pages/confirm/confirm.module";
import {CourseService} from "../providers/course/course-service";
import {DeviceGeoLocService} from "../providers/device-geo-loc/device-geo-loc.service";
import {EdgeService} from "../providers/edge/edge.service";
import {GeoLocService} from "../providers/geo-loc/geo-loc";
import {HttpService} from "../providers/http/http.service";
import {InviteService} from "../providers/invite/invite.service";
import {LatLonProvider} from "../providers/lat-lon/lat-lon";
import {LocationService} from "../providers/location/location-service";
import {OutingService} from "../providers/outing/outing.service";
import {PathService} from "../providers/path/path.service";
import {PlatformStateService} from "../providers/platform-state/platform-state.service";
import {ProfileService} from "../providers/profile/profile.service";
import {ProfileConfirmationService} from "../providers/profile-confirmation-service/profile-confirmation-service";
import {PuzzleService} from "../providers/puzzle/puzzle-service";
import {RegistrationPageModule} from "../pages/registration/registration.module";
import {RegStateService} from "../providers/reg-state/reg-state.service";
import {SseEventService} from "../providers/sse-event/sse-event.service";
import {TeamService} from "../providers/team/team-service";
import {TokenService} from "../providers/token/token.service";
import {UserService} from "../providers/user/user.service";

@NgModule({
  imports: [
    ConfirmPageModule,
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
        AuthService,
        BadgeService,
        CourseService,
        DeviceGeoLocService,
        EdgeService,
        GeoLocService,
        HttpService,
        InviteService,
        LatLonProvider,
        LocationService,
        OutingService,
        PathService,
        PlatformStateService,
        ProfileService,
        ProfileConfirmationService,
        PuzzleService,
        RegStateService,
        SseEventService,
        TeamService,
        TokenService,
        UserService,
      ]
    }
  }

}
