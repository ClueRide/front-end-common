import {Component, Input} from '@angular/core';
import {Member} from "../../providers/profile/member";

/**
 * Depicts a given Member in a concise component.
 */
@Component({
  selector: 'member-chip',
  templateUrl: 'member-chip.html'
})
export class MemberChipComponent {

  @Input() member: Member;

  constructor() {
  }

}
