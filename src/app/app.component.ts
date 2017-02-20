import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen, } from 'ionic-native';

import { OverviewPage } from '../pages/overview/overview';
import { ChangeCategoriesPage } from '../pages/change-categories/change-categories';
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = OverviewPage;

  //see Ionic docs, Navigating from the Root component: https://ionicframework.com/docs/v2/api/navigation/NavController/
  @ViewChild('content') navCtrl: NavController;

  constructor(private platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {

    //Don't stack menu pages
    let previousPage = this.navCtrl.last().instance.constructor.name;
    if (previousPage === 'ChangeCategoriesPage' || previousPage === 'AboutPage') {
      this.navCtrl.pop();
    }

    if (page === 'changeCategories') {
      this.navCtrl.push(ChangeCategoriesPage);
    }
    if (page === 'about') {
      this.navCtrl.push(AboutPage);
    }
  }
}