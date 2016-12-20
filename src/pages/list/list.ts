import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  constructor(public navCtrl: NavController) {
    
  }

  value = 0;

  onIncrementClick() {
    this.value = Math.min(100, ++this.value);
  }

  onDecrementClick() {
    this.value = Math.max(-100, --this.value);
  }

}
