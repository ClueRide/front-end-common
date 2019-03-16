import {AuthService} from "../../providers/auth/auth.service";
import {Component} from '@angular/core';
import {ConfirmPage} from "../confirm/confirm";
import {IonicPage, NavController} from 'ionic-angular';
import {PlatformStateService} from "../../providers/platform-state/platform-state.service";
import {ProfileConfirmationService} from "../../providers/profile-confirmation-service/profile-confirmation-service";
// tslint:disable-next-line
import {Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";

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
export class RegistrationPage {
  private confirmationStateSubscription: Subscription;

  constructor(
    public auth: AuthService,
    public platformState: PlatformStateService,
    public profileConfirmationService: ProfileConfirmationService,
    public navCtrl: NavController,
    public titleService: Title,
  ) {
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Registration");

    /** Add ourselves to the list of profile listeners. */
    this.confirmationStateSubscription = this.profileConfirmationService.confirmationState$.subscribe(
      (confirmationState) =>    {
        if (confirmationState.authenticated && !confirmationState.confirmed) {
          console.log("Have Authentication, but email is not yet confirmed");
          this.navCtrl.push(ConfirmPage)
            .then()
            .catch();
        } else {
          console.log("Confirmation State: " + JSON.stringify(confirmationState));
        }
      }
    );
  }

  ionViewWillLeave() {
    this.confirmationStateSubscription.unsubscribe();
  }

}

