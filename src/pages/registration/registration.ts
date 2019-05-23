import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {PlatformStateService} from "../../providers/platform-state/platform-state.service";
import {Title} from "@angular/platform-browser";
import {RegStateService} from "../../providers/reg-state/reg-state.service";

/**
 * Presents the registration choices to the user.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  constructor(
    private regState: RegStateService,
    private platformState: PlatformStateService,
    private titleService: Title,
  ) {
    console.log("RegistrationPage constructor");
  }

  ionViewDidEnter() {
    this.titleService.setTitle("Registration");
  }

  /**
   * Accepts user choice of registering via Social Media and delegates to RegStateService.
   *
   * This choice is preferred because we can pickup an image for the user.
   */
  public registerSocial(): void {
    this.regState.registerSocial();
  }

  /**
   * Accepts user choice of registering via Email and delegates to RegStateService.
   */
  public registerEmail(): void {
    this.regState.registerPasswordless();
  }

  // TODO: Are we ready to break the BDD Register button?
  public shouldHideBDD(): boolean {
    return this.platformState.isNativeMode();
  }

}

