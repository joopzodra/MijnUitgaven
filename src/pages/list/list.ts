import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SQLiteService } from '../../services/sqlite.service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {

  results = [];

  constructor(private navCtrl: NavController, private navParams: NavParams, public sqlite: SQLiteService ) { }

  ngOnInit() {
    let category = this.navParams.get('category');
    this.getCategory(category);
  }

  getCategory(cat): Promise<any> {
    return this.sqlite.getCategory(cat)
    .then(response => this.setResults(response));
  }

  setResults(sqlResponse): any[] {
      let length = sqlResponse.res.rows.length;
      for (let i = 1; i < length; i++) {
        this.results.push(sqlResponse.res.rows.item(i));
      }
      return this.results;
  }

}

//BEA = pinbetaling
//GEA = geldautomaat