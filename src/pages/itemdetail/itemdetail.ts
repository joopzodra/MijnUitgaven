import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SQLiteService } from '../../services/sqlite.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'itemdetail',
  templateUrl: 'itemdetail.html'
})

export class ItemDetail implements OnInit {

  item = this.navParams.data;
  category;
  categories: string[];

  constructor(private navCtrl: NavController, private navParams: NavParams, private sqlite: SQLiteService, private categoriesService: CategoriesService ) { }

  ngOnInit() {
     this.category = this.item.category;
     this.categories = this.categoriesService.categories;
  }

  changeCategory(cat) { console.log(cat)
    this.category = cat;
  }
}