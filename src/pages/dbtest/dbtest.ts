import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SQLiteService } from '../../services/sqlite.service';

@Component({
  selector: 'page-dbtest',
  templateUrl: 'dbtest.html'
})
export class DbTestPage {

  results = [];

  constructor(public navCtrl: NavController, public sqlite: SQLiteService ) { }

  ngOnInit() {

    let query = 'SELECT * FROM entries';
    this.sqlite.query(query)
    .then(respons => {
      let length = respons.res.rows.length;
      for (let i = 1; i < length; i++) {
        this.results.push(respons.res.rows.item(i));
      }
    });    
  }

}
