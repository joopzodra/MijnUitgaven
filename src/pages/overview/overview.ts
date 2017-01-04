import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ListPage } from '../list/list';
import { DbTestPage } from '../dbtest/dbtest';

@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})
export class OverviewPage {

  constructor(public navCtrl: NavController) {

  }

  toList() {
    this.navCtrl.push(ListPage, {category: 'woonlasten'});
  }

}
