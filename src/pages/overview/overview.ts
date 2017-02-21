import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewEntry } from '../new-entry/new-entry';

@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})

export class OverviewPage {

  yearmonth: string;

  constructor(public navCtrl: NavController) { }

  yearMonthMessageHandler(event) {
    this.yearmonth = event;
  }

  addEntry() {
    this.navCtrl.push(NewEntry);
  }
}
