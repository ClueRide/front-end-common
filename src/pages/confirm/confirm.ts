import {Component} from "@angular/core";
import {IonicPage, NavController} from "ionic-angular";
import {AuthService} from "../../providers/auth/auth.service";
// tslint:disable-next-line
import {Title} from "@angular/platform-browser";
import {ProfileConfirmationService} from "../../providers/profile-confirmation-service/profile-confirmation-service";
import {ProfileService} from "../../providers/profile/profile.service";

/**
 * Generated class for the ConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {

  constructor(
    public auth: AuthService,
    public profileConfirmationService: ProfileConfirmationService,
    public profile: ProfileService,
    public navCtrl: NavController,
    public titleService: Title,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Confirm Email");
    this.profile.loadMemberProfile();
  }

  private returnToRegistrationPage(): Promise<any> {
    return this.navCtrl.pop();
  }

  public useThisEmail() {
    console.log("Use this Email");
    this.profileConfirmationService.confirm(
      {
        authenticated: true,
        confirmed: true
      }
    );
  }

  public chooseDifferentEmail() {
    console.log("Choose different Email");
    this.auth.logout();
    this.returnToRegistrationPage()
      .then()
      .catch();
  }

}
