import {Component} from "@angular/core";
import {IonicPage} from "ionic-angular";
// tslint:disable-next-line
import {Title} from "@angular/platform-browser";
import {RegStateService} from "../../providers/reg-state/reg-state.service";

/**
 * Responsible for presenting the user with their Profile and asking confirmation against that profile.
 */

@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {

  constructor(
    private regStateService: RegStateService,
    private titleService: Title,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Confirm Email");
  }

  public useThisEmail() {
    console.log("Use this Email");
    this.regStateService.confirm();
  }

  public chooseDifferentEmail() {
    console.log("Choose different Email");
    this.regStateService.retry();
  }

}
