import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
    this.getCategory(category);
    this.sortBy = 'date';
  }

  getCategory(cat): Promise<any> {
    return this.sqlite.getCategory(cat)
    .then(response => this.setResults(response));
  }

  setResults(sqlResponse): void {
      let length = sqlResponse.res.rows.length;
      for (let i = 0; i < length; i++) {
        this.results.push(sqlResponse.res.rows.item(i));
      }
      this.sort();
  }

  sort(): void {
    this.results.sort((a, b) => b[this.sortBy] - a[this.sortBy]);
  }

  itemSelected(result) {
    this.navCtrl.push(ItemDetail, result);
  }

}

//BEA = pinbetaling
//GEA = geldautomaat