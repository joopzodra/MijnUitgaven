import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { colors } from '../../assets/chartcolors';
import { ItemDetail } from '../itemdetail/itemdetail';
import { DbRowsJoined } from '../../datatypes/dbRowsJoined';
import { DataPushService } from '../../../services/data-push.service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage implements OnInit {

  private data: DbRowsJoined[];
  private catId: string;
  private sortBy: string;
  private colorTable = colors;
  private pushCategories: Subscription;


  constructor(private navCtrl: NavController, private navParams: NavParams ) { }

  ngOnInit() {
    this.sortBy = 'date';
    this.catId = this.navParams.get('catId').toString();
    this.data = this.navParams.get('catData');
    this.data.sort(this.sortByDateThenAmount);
  }

/*  requestStreamCatAndDate(category, minDate, maxDate): void {
    this.sqlite.requestStreamCatAndDate(category, minDate, maxDate);
  }*/


  sort() {
      if (this.sortBy === 'date') {
        this.data.sort(this.sortByDateThenAmount);
      }
      if (this.sortBy === 'amount') {
        this.data.sort(this.sortByAmountThenDate);
      }
  }

  sortByDateThenAmount(a: DbRowsJoined, b: DbRowsJoined) {

    return a.date < b.date ? 1 : a.date > b.date ? -1 :
      a.amount < b.amount ? 1 : a.amount > b.amount ? -1 : 0;
  }

  sortByAmountThenDate(a: DbRowsJoined, b: DbRowsJoined) {

    return a.amount < b.amount ? -1 : a.amount > b.amount ? 1 :
        a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  }

  itemSelected(result) {
    this.navCtrl.push(ItemDetail, result);
  }

}

//BEA = pinbetaling
//GEA = geldautomaat
