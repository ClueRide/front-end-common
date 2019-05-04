import {Component, Input} from '@angular/core';
import {LocationType} from "../../providers/loc-type/loc-type";

/**
 * Presents the given Location Type as a chip.
 */
@Component({
  selector: 'loc-type-chip',
  templateUrl: 'loc-type-chip.html'
})
export class LocTypeChipComponent {

  /* Assigned by client of this component. */
  @Input() locType: LocationType;

  constructor() {}

}
