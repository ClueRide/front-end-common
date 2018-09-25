// tslint:disable-next-line
import {ModuleWithProviders, NgModule} from '@angular/core';
import {IonicStorageModule} from "@ionic/storage";
import {AuthService} from "../providers/auth/auth.service";
import {BadgeService} from "../providers/resources/badge/badge.service";
import {BadgeServiceProvider} from "../providers/resources/badge/badge.service.provider";
import {ConfirmPageModule} from "../pages/confirm/confirm.module";
import {InviteService} from "../providers/resources/invite/invite.service";
import {InviteServiceProvider} from "../providers/resources/invite/invite.service.provider";
import {ProfileService} from "../providers/profile/profile.service";
import {RegistrationPageModule} from "../pages/registration/registration.module";
import {Resource} from "../providers/resources/resource";
import {RestangularModule} from "ngx-restangular";
import {RestangularConfigFactory} from "../providers/resources/resource.config";
import {TokenService} from "../providers/token/token.service";
import {GeoLocService} from "../providers/geo-loc/geo-loc";
import {DeviceGeoLocService} from "../providers/device-geo-loc/device-geo-loc.service";
import {LatLonProvider} from "../providers/lat-lon/lat-lon";

@NgModule({
  imports: [
    ConfirmPageModule,
    IonicStorageModule.forRoot({driverOrder:  ['localstorage', 'sqlite', 'indexeddb', 'websql']}),
    RegistrationPageModule,
    RestangularModule.forRoot(RestangularConfigFactory),
  ],
  providers: [
    BadgeServiceProvider,
    InviteServiceProvider,
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
        InviteService,
        LatLonProvider,
        ProfileService,
        TokenService
      ]
    }
  }
}
