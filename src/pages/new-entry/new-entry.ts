import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { SQLiteService } from '../../services/sqlite.service';
import { IEntry } from '../../datatypes/i-entry';
import { colors } from '../../helpers/chartcolors';

@Component({
  selector: 'new-entry',
  templateUrl: 'new-entry.html'
})

export class NewEntry {

  entry: IEntry;
  private categories: { [x: number]: string };
  private catKeys: string[];
  private colorTable = colors;
  private saved = true;

  newEntryForm: NgForm;
  @ViewChild('newEntryForm') currentForm: NgForm;

  constructor(private navParams: NavParams, private sqlite: SQLiteService, private alertCtrl: AlertController) { }

  ngOnInit() {

    this.entry = {entryId: null, date: null, amount: null, payment_method: null, description: null, categoryId: null}

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
    this.sqlite.changeEntry(this.entry.entryId, this.entry.date, this.entry.description, +this.entry.categoryId);
    form.resetForm({ entryCatId: this.entry.categoryId, entryDescription: this.entry.description });
    this.saved = true;
  }

  private cancel(form: NgForm) {
    form.resetForm();
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

ngAfterViewChecked() {
  this.formChanged();
}

formChanged() {
  if (this.currentForm === this.newEntryForm) { return; }
  this.newEntryForm = this.currentForm;
  if (this.newEntryForm) {
    this.newEntryForm.valueChanges
      .subscribe(data => console.log(data));
  }
}

}