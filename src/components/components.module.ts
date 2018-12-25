// tslint:disable-next-line
import {ModuleWithProviders, NgModule} from '@angular/core';
import {IonicStorageModule} from "@ionic/storage";
import {AuthService} from "../providers/auth/auth.service";
import {BadgeService} from "../providers/badge/badge.service";
import {ConfirmPageModule} from "../pages/confirm/confirm.module";
import {DeviceGeoLocService} from "../providers/device-geo-loc/device-geo-loc.service";
import {GeoLocService} from "../providers/geo-loc/geo-loc";
import {HttpService} from "../providers/http/http.service";
import {InviteService} from "../providers/invite/invite.service";
import {LatLonProvider} from "../providers/lat-lon/lat-lon";
import {ProfileService} from "../providers/profile/profile.service";
import {RegistrationPageModule} from "../pages/registration/registration.module";
import {RegStateService} from "../providers/reg-state/reg-state.service";
import {Resource} from "../providers/resources/resource";
import {RestangularModule} from "ngx-restangular";
import {RestangularConfigFactory} from "../providers/resources/resource.config";
import {TokenService} from "../providers/token/token.service";
import {UserService} from "../providers/user/user.service";

@NgModule({
  imports: [
    ConfirmPageModule,
    IonicStorageModule.forRoot({driverOrder:  ['localstorage', 'sqlite', 'indexeddb', 'websql']}),
    RegistrationPageModule,
    RestangularModule.forRoot(RestangularConfigFactory),
  ],
  providers: [
    Resource
  ]
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComponentsModule,
      providers: [
        AuthService,
        BadgeService,
        DeviceGeoLocService,
        GeoLocService,
        HttpService,
        InviteService,
        LatLonProvider,
        ProfileService,
        RegStateService,
        TokenService,
        UserService,
      ]
    }
  }
}
