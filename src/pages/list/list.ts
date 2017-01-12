import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { SQLiteService } from '../../services/sqlite.service';
import { ItemDetail } from '../itemdetail/itemdetail';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {

  results = [];
  sortBy: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, public sqlite: SQLiteService ) { }

  ngOnInit(): void {
    let category = this.navParams.get('category');
    let minDate = this.navParams.get('minDate');
    let maxDate = this.navParams.get('maxDate');
    this.getByCatAndDate(category, minDate, maxDate);
    this.sortBy = 'date';
  }

  getByCatAndDate(category, minDate, maxDate): Promise<any> {
    return this.sqlite.getByCatAndDate(category, minDate, maxDate)
    .then(response => this.results = this.sort(response));
  }

/*  requestStreamCatAndDate(category, minDate, maxDate): void {
    this.sqlite.requestStreamCatAndDate(category, minDate, maxDate);
  }*/

  setResults(sqlResponse): void {
      let length = sqlResponse.res.rows.length;
      for (let i = 0; i < length; i++) {
        this.results.push(sqlResponse.res.rows.item(i));
      };
  }

  sort(arr) {
    return arr.sort((a, b) => b[this.sortBy] - a[this.sortBy]);
  }

  itemSelected(result) {
    this.navCtrl.push(ItemDetail, result);
  }

}

//BEA = pinbetaling
//GEA = geldautomaat