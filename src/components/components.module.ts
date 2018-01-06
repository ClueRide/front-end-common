import {ModuleWithProviders, NgModule} from '@angular/core';
import {TokenService} from "../providers/token-service/token-service";
import {IonicStorageModule} from "@ionic/storage";
import {RegistrationPageModule} from "../pages/registration/registration.module";

@NgModule({
  imports: [
    IonicStorageModule.forRoot({driverOrder:  ['localstorage', 'sqlite', 'indexeddb', 'websql']}),
    RegistrationPageModule
  ],
})
export class ComponentsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ComponentsModule,
      providers: [ TokenService ]
    }
  }
}
