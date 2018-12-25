import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {AuthService} from "../../providers/auth/auth.service";
import {ProfileService, ConfirmationListener, ConfirmationState} from "../../providers/profile/profile.service";
import {ConfirmPage} from "../confirm/confirm";
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
    public profile: ProfileService,
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

