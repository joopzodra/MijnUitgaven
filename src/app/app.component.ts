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

  public rootPage = OverviewPage;

  //see Ionic docs, Navigating from the Root component: https://ionicframework.com/docs/v2/api/navigation/NavController/
  @ViewChild('content') navCtrl: NavController;

  constructor(private platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  private openPage(page) {

    let nextPage;

    if (page === 'changeCategories') {
      nextPage = ChangeCategoriesPage;
    }
    if (page === 'about') {
      nextPage = AboutPage;
    }

    this.navCtrl.push(nextPage, {page})
      .then(() => {        
        //Don't stack menu pages
        const previousPage = this.navCtrl.getPrevious();
        if (previousPage.data.page === 'changeCategories' || previousPage.data.page === 'about') {
          this.navCtrl.removeView(previousPage)
        }
      });

  }
}