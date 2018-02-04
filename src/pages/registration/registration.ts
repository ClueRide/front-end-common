import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AuthService} from "../../providers/auth/auth.service";
import {ProfileService, ConfirmationListener, ConfirmationState} from "../../providers/profile/profile.service";
import {ConfirmPage} from "../confirm/confirm";

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage implements ConfirmationListener {

  constructor(
    public auth: AuthService,
    public profile: ProfileService,
    public navCtrl: NavController
  ) {
    profile.listeners.push(this);
  }

  public canWeSwitch(confirmationState: ConfirmationState) {
    if (confirmationState.authenticated && !confirmationState.confirmed) {
      this.navCtrl.push(ConfirmPage)
        .then()
        .catch();
    }

    if (confirmationState.authenticated && confirmationState.confirmed) {
      this.navCtrl.pop()
        .then()
        .catch();
    }
  }

}

