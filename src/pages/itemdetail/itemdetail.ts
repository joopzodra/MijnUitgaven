import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ListPage } from '../list/list';
import { SQLiteService } from '../../services/sqlite.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'itemdetail',
  templateUrl: 'itemdetail.html'
})

export class ItemDetail implements OnInit {

  item = this.navParams.data;
  category: string;
  subcategory: string;
  categories: Promise<string[]>;
  subcategories: Promise<{cat: string, subcats: string[]}[]>;

  constructor(private navCtrl: NavController, private navParams: NavParams, private sqlite: SQLiteService, private categoriesService: CategoriesService, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.category = this.item.category;
    this.categories = this.categoriesService.categories;
    this.subcategory = this.item.subcategory;
    //this.subcategories = this.categoriesService.subcategories
/*      .then(subcatObjects => subcatObjects.filter(subcatObj => subcatObj.cat === this.category)[0].subcats)
      .catch(err => console.log(err));*/
  }
 
  getSubcats(catg) {
    this.subcategories.then(subcatObjects => subcatObjects.filter(subcatObj => subcatObj.cat === catg)[0].subcats)
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