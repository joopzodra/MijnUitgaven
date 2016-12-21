import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SQLiteService } from '../../services/sqlite.service';

@Component({
  selector: 'page-dbtest',
  templateUrl: 'dbtest.html'
})
export class DbTestPage {

  people: string[] = [];

  constructor(public navCtrl: NavController, public sqlite: SQLiteService ) {
    
  }

  addName() {
    this.sqlite.set('joop', 'jooprosier');
  }

  getName() {
    this.sqlite.get('joop')
    .then(v => this.people.push(v));    
  }

}
