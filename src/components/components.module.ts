import {ModuleWithProviders, NgModule} from '@angular/core';
import {IonicStorageModule} from "@ionic/storage";
import {RegistrationPageModule} from "../pages/registration/registration.module";
import {AuthService} from "../providers/auth/auth.service";

@NgModule({
  imports: [
    IonicStorageModule.forRoot({driverOrder:  ['localstorage', 'sqlite', 'indexeddb', 'websql']}),
    RegistrationPageModule,
  ],
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComponentsModule,
      providers: [
        AuthService
      ]
    }
  }
}
