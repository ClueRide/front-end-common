import {AuthService} from "../../providers/auth/auth.service";
import {Component} from '@angular/core';
import {
  ConfirmationListener,
  ConfirmationState
} from "../../providers/profile-confirmation-service/profile-confirmation-service";
import {ConfirmPage} from "../confirm/confirm";
import {IonicPage, NavController} from 'ionic-angular';
import {ProfileConfirmationService} from "../../providers/profile-confirmation-service/profile-confirmation-service";
import {Title} from "@angular/platform-browser";

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
    public profile: ProfileConfirmationService,
    public navCtrl: NavController,
    public titleService: Title,
  ) {
    /** Add ourselves to the list of profile listeners. */
    profile.listeners.push(this);
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Registration");
  }

  public canWeSwitch(confirmationState: ConfirmationState) {
    if (confirmationState.authenticated && !confirmationState.confirmed) {
      this.navCtrl.push(ConfirmPage)
        .then()
        .catch();
    }
  }

}

