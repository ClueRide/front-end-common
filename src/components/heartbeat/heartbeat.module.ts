import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HeartbeatComponent} from "./heartbeat";

@NgModule({
  declarations: [
    HeartbeatComponent,
  ],
  imports: [
    IonicPageModule.forChild(HeartbeatComponent),
  ],
  exports: [
    HeartbeatComponent
  ],
})
export class HeartbeatComponentModule {}
