import {NgModule} from "@angular/core";
import {LocTypeChipComponent} from "./loc-type-chip.component";
import {IonicPageModule} from "ionic-angular";

@NgModule({
  declarations: [
    LocTypeChipComponent,
  ] ,
  imports: [
    IonicPageModule.forChild(LocTypeChipComponent),
  ],
  exports: [
    LocTypeChipComponent
  ]
})
export class LocTypeChipModule {}
