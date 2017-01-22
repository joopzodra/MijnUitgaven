import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { ListPage } from '../list/list';
import { SQLiteService } from '../../services/sqlite.service';
import { DbRowsJoined } from '../../datatypes/dbRowsJoined';
import { colors } from '../../assets/chartcolors';

@Component({
  selector: 'itemdetail',
  templateUrl: 'itemdetail.html'
})

export class ItemDetail implements OnInit {

  private item: DbRowsJoined;
  private categories: {[x: number]: string};
  private catKeys: string[];
  private colorTable = colors;
  private storedCatId: number;
  private storedDescription: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private sqlite: SQLiteService, public alertCtrl: AlertController) { }

  ngOnInit() {

    let entryId = this.navParams.get('entryId');
    this.navParams.get('dataSource').subscribe(data => {
      this.item = data.filter(item => item.entryId === +entryId)[0];
      this.storedCatId = this.item.catId;
      this.storedDescription = this.item.description;
    });

    this.sqlite.getCategories()
      .then(catObj => {
        this.categories = catObj;
        this.catKeys = Object.keys(catObj)
      });
  }

  onSubmit(form) {
    this.sqlite.changeEntry(this.item.entryId, this.item.date, this.item.description, this.item.catId);
    form.resetForm({itemCatId: this.item.catId, itemDescription: this.item.description});     
  }

  cancel(form) {
    form.resetForm({itemCatId: this.storedCatId, itemDescription: this.storedDescription});    
  }

}