import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ListPage } from '../list/list';
import { SQLiteService } from '../../services/sqlite.service';

@Component({
  selector: 'itemdetail',
  templateUrl: 'itemdetail.html'
})

export class ItemDetail implements OnInit {

  item = this.navParams.data;
  category: string;
  subcategory: string;
  categories: Promise<string[]>;

  constructor(private navCtrl: NavController, private navParams: NavParams, private sqlite: SQLiteService, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.category = this.item.category;
  }
 
  catChange() {
    this.sqlite.changeEntryCategory(this.category, this.subcategory, this.item.id )
    //this.navCtrl.push(ListPage, {category: this.category});
  }

  catCancel() {

  }

  renameCategory(cat) {
    console.log(cat)
    this.category = cat;
  }

  addCategory(cat) {

  }

  renameSubcategory(subcat) {

  }

  addSubcategory(subcat) {

  }

}