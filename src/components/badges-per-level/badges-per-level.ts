import { Component } from '@angular/core';

/**
 * Generated class for the BadgesPerLevelComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'badges-per-level',
  templateUrl: 'badges-per-level.html'
})
export class BadgesPerLevelComponent {
  count = {
    aware: 3,
    adept: 1,
    advocate: 0,
    angel: 0
  };

  constructor() {
    console.log('Hello BadgesPerLevelComponent Component');
  }

}
