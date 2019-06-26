import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BadgesPerLevelComponent} from "./badges-per-level";

@NgModule({
  declarations: [
    BadgesPerLevelComponent,
  ],
  imports: [
    IonicPageModule.forChild(BadgesPerLevelComponent),
  ],
  exports: [
    BadgesPerLevelComponent
  ],
})
export class BadgesPerLevelModule {}
