import {Component} from "@angular/core";
import {IonicPage, NavController} from "ionic-angular";
import {ProfileService} from "../../providers/profile/profile.service";
import {AuthService} from "../../providers/auth/auth.service";
import {Title} from "@angular/platform-browser";

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
  localProfile: ProfileService;

  constructor(
    public auth: AuthService,
    public profile: ProfileService,
    public navCtrl: NavController,
    public titleService: Title,
  ) {
    this.localProfile = profile;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Confirm Email");
  }

  private returnToRegistrationPage(): Promise<any> {
    return this.navCtrl.pop();
  }

  public useThisEmail() {
    console.log("Use this Email");
    this.profile.confirm(
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
