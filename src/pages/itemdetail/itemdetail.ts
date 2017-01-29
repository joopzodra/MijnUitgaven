import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { SQLiteService } from '../../services/sqlite.service';
import { DbRowsJoined } from '../../datatypes/dbRowsJoined';
import { colors } from '../../assets/chartcolors';

@Component({
  selector: 'itemdetail',
  templateUrl: 'itemdetail.html'
})

export class ItemDetail implements OnInit {

  item: DbRowsJoined;
  private categories: { [x: number]: string };
  private catKeys: string[];
  private colorTable = colors;
  storedCatId: number;
  storedDescription: string;
  private saved = true;

  constructor(private navCtrl: NavController, private navParams: NavParams, private sqlite: SQLiteService, private alertCtrl: AlertController) { }

  ngOnInit() {

    let entryId = this.navParams.get('entryId');
    this.navParams.get('dataSource').subscribe(data => {
      this.item = data.filter(item => item.entryId === +entryId)[0];
      this.storedCatId = this.item.catId;
      this.storedDescription = this.item.description;
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
        this.catKeys = Object.keys(catObj)
      });
  }

  private onSubmit(form: NgForm) {
    this.sqlite.changeEntry(this.item.entryId, this.item.date, this.item.description, this.item.catId);
    form.resetForm({ itemCatId: this.item.catId, itemDescription: this.item.description });
    this.saved = true;
  }

  private cancel(form: NgForm) {
    form.resetForm({ itemCatId: this.storedCatId, itemDescription: this.storedDescription });
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
