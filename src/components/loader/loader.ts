// tslint:disable-next-line
import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController} from "ionic-angular";

/**
 * Generated class for the LoaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'loader',
  templateUrl: 'loader.html'
})
export class LoaderComponent implements OnInit, OnDestroy {

  private loading: any;

  constructor(
    private loadingController: LoadingController
  ) {
    console.log('Hello LoaderComponent Component');
  }

  ngOnInit(): void {
    this.loading = this.loadingController.create(
      {
        spinner: 'crescent',
        content: 'Buckling my helmet'
      }
    );

    this.loading.present();
  }

  ngOnDestroy(): void {
    this.loading.dismiss();
  }

}
