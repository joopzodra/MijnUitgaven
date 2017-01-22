import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

import { colors } from '../../assets/chartcolors';
import { ItemDetail } from '../itemdetail/itemdetail';
import { DbRowsJoined } from '../../datatypes/dbRowsJoined';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage implements OnInit {

  private data: DbRowsJoined[];
  private sortBy: string;
  private colorTable = colors;

  constructor(private navCtrl: NavController, private navParams: NavParams) { }

  ngOnInit() {
    this.sortBy = 'date';
    let catId = this.navParams.get('catId').toString();
    this.navParams.get('dataSource').subscribe(data => {
      this.data = data.filter(item => item.catId === +catId);
      this.data.sort(this.sortByDateThenAmount);
    });

  }

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

  itemSelected(item: DbRowsJoined) {
    let dataSource = this.navParams.get('dataSource');
    this.navCtrl.push(ItemDetail, { dataSource, entryId: item.entryId });
  }

}

//BEA = pinbetaling
//GEA = geldautomaat
