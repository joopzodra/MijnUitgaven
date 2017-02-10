import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { SQLiteService } from '../../services/sqlite.service';
import { IEntry } from '../../datatypes/i-entry';
import { colors } from '../../helpers/chartcolors';

@Component({
  selector: 'itemdetail',
  templateUrl: 'itemdetail.html'
})

export class ItemDetail implements OnInit {

  item: IEntry;
  private categories: { [x: number]: string };
  private catKeys: string[];
  private colorTable = colors;
  storedCategoryId: number;
  storedDescription: string;
  private saved = true;

  constructor(private navCtrl: NavController, private navParams: NavParams, private sqlite: SQLiteService, private alertCtrl: AlertController) { }

  ngOnInit() {

    let entryId = +this.navParams.get('entryId');
    this.sqlite.getItem(entryId)
      .then(item => {
        this.item = item;
        this.storedCategoryId = item.categoryId;
        this.storedDescription = item.description;
      });

    this.refreshCategories();

    this.sqlite.categoryChangedSource.subscribe(catId => this.refreshCategories(),
      error => console.log('error: ' + error.message)
    );
  }

  refreshCategories() {

    this.sqlite.getCategories()
      .then(catObj => {
        this.categories = catObj;
        this.catKeys = Object.keys(catObj);
      });
  }

  private onSubmit(form: NgForm) {
    this.sqlite.changeEntry(this.item.entryId, this.item.date, this.item.description, +this.item.categoryId);
    form.resetForm({ itemCatId: this.item.categoryId, itemDescription: this.item.description });
    this.saved = true;
  }

  private cancel(form: NgForm) {
    form.resetForm({ itemCatId: this.storedCategoryId, itemDescription: this.storedDescription });
    this.saved = true;
  }

  private changed() {
    this.saved = false;
  }

  private ionViewCanLeave(): boolean {
    if (!this.saved) {
      this.showAlert();
      return false;
    } else {
      return true;
    }
  }

  private showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Wijzigingen opslaan of annuleren',
      subTitle: 'Je moet eerst je wijzigingen in deze uitgave opslaan of annuleren voordat je terug kunt.',
      buttons: ['OK']
    });
    alert.present();
  }

  private menuAlert() {
    if (!this.saved) {
      this.showAlert();
    }
  }

}
