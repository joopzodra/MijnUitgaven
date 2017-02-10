import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { colors } from '../../helpers/chartcolors';
import { ItemDetail } from '../itemdetail/itemdetail';
import { IEntry } from '../../datatypes/i-entry';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {

  data: IEntry[];
  sortBy: string;
  private catId: number;
  private categories: string[];
  private month: string;
  private monthTotal: number;
  private colorTable = colors;

  constructor(private navCtrl: NavController, private navParams: NavParams) { }

  ngOnInit() {
    this.sortBy = 'date';
    this.month = this.navParams.get('month');
    this.catId = this.navParams.get('catId').toString();
    this.navParams.get('dataSource').subscribe(data => {
      this.data = data.filter(item => item.categoryId === +this.catId);      
      this.data.sort(this.sortByDateThenAmount); 
      this.monthTotal = this.data.reduce((a, b) => a + b.amount, 0)
    });

    this.navParams.get('catsSource').subscribe(cats => this.categories = cats);
  }

  sort() {
    if (this.sortBy === 'date') {
      this.data.sort(this.sortByDateThenAmount);
    }
    if (this.sortBy === 'amount') {
      this.data.sort(this.sortByAmountThenDate);
    }
  }

  sortByDateThenAmount(a: IEntry, b: IEntry) {

    return a.date < b.date ? 1 : a.date > b.date ? -1 :
      a.amount < b.amount ? 1 : a.amount > b.amount ? -1 : 0;
  }

  sortByAmountThenDate(a: IEntry, b: IEntry) {

    return a.amount < b.amount ? -1 : a.amount > b.amount ? 1 :
      a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  }

  itemSelected(item: IEntry) {
    this.navCtrl.push(ItemDetail, { entryId: item.entryId })
    .catch(err => console.log(err));
  }

}

//BEA = pinbetaling
//GEA = geldautomaat
