// tslint:disable-next-line
import {ModuleWithProviders, NgModule} from '@angular/core';
import {IonicStorageModule} from "@ionic/storage";
import {AuthService} from "../providers/auth/auth.service";
import {BadgeService} from "../providers/resources/badge/badge.service";
import {BadgeServiceProvider} from "../providers/resources/badge/badge.service.provider";
import {ConfirmPageModule} from "../pages/confirm/confirm.module";
import {ProfileService} from "../providers/profile/profile.service";
import {RegistrationPageModule} from "../pages/registration/registration.module";
import {Resource} from "../providers/resources/resource";
import {RestangularModule} from "ngx-restangular";
import {RestangularConfigFactory} from "../providers/resources/resource.config";
import {TokenService} from "../providers/token/token.service";

@NgModule({
  imports: [
    ConfirmPageModule,
    IonicStorageModule.forRoot({driverOrder:  ['localstorage', 'sqlite', 'indexeddb', 'websql']}),
    RegistrationPageModule,
    RestangularModule.forRoot(RestangularConfigFactory),
  ],
  providers: [
    BadgeServiceProvider,
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
        ProfileService,
        TokenService
      ]
    }
  }
}
