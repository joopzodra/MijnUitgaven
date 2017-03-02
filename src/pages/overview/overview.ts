import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EntryComp } from '../entry/entry';

@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})

export class OverviewPage {

  private yearmonth: string;

  constructor(public navCtrl: NavController) { }

  private yearMonthMessageHandler(event) {
    this.yearmonth = event;
  }

  private addEntry() {
    this.navCtrl.push(EntryComp, { entryId: null });
  }
}
