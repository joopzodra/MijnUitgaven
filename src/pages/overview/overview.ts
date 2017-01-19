import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ListPage } from '../list/list';


@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html'
})

export class OverviewPage {

  minDate = new Date(2015,9,30);
  maxDate = new Date(2016, 5, 1);

  constructor(public navCtrl: NavController) { }




  toList(cat, minDate, maxDate) {
    this.navCtrl.push(ListPage, {category: cat, minDate: minDate, maxDate: maxDate});
  }

}
