import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

}
