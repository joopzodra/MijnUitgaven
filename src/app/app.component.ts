import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { OverviewPage } from '../pages/overview/overview';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = OverviewPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
