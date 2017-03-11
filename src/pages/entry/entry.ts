import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as d3Format from 'd3-format';

import { SQLiteService } from '../../services/sqlite.service';
import { IEntry } from '../../datatypes/i-entry';
import { colors } from '../../helpers/chartcolors';

@Component({
  selector: 'entry',
  templateUrl: 'entry.html'
})

export class EntryComp implements OnInit {

  private currentDate = new Date(2016, 4, 31, 12);
  private entryId: number;
  private entry: IEntry;
  private categories: { [x: number]: string };
  private catKeys: string[];
  private colorTable = colors;
  private submitted = true;
  private paymentMethods = ['PIN-betaling', 'geldautomaat', 'iDEAL', 'doorlopende machtiging', 'acceptgiro', 'overboeking', 'bank'];
  private entryForm: FormGroup;
  private title: string;

  constructor(private fb: FormBuilder, private navParams: NavParams, private navCtrl: NavController, private sqlite: SQLiteService, private alertCtrl: AlertController) { }

  ngOnInit() {

    if (this.navParams.get('entryId')) {
      this.title = 'Wijzig gegevens';
      this.entryId = +this.navParams.get('entryId');
      this.sqlite.getEntry(this.entryId)
        .then(entry => {
          this.entry = entry;
          this.buildForm();
        });
    } else {
      this.title = 'Uitgave toevoegen';
      let isoDate = this.currentDate.toISOString();
      let date = +(isoDate.slice(0, 4) + isoDate.slice(5, 7) + isoDate.slice(8, 10))
      this.entry = { entryId: null, date: date, amount: undefined, payment_method: '', description: '', categoryId: null };
      this.buildForm();
    }

    this.refreshCategories();

    this.sqlite.categoryChangedSource.subscribe(catId => this.refreshCategories(),
      error => console.log('error: ' + error.message)
    );
  }

  private refreshCategories() {

    this.sqlite.getCategories()
      .then(catObj => {
        this.categories = catObj;
        this.catKeys = Object.keys(catObj);
      });
  }

  private ionicDate(date: number): string {
    if (!date) return;
    let str = date.toString();
    let year = str.slice(0, 4);
    let month = str.slice(4, 6);
    let day = str.slice(6);
    return [year, '-', month, '-', day].join('');
  }

  private numberDate(date: string | number): number {
    if (typeof date === 'number') {
      return date;
    }
    if (typeof date === 'string') {
      return +date.split('-').join('');
    }
  }

  private buildForm() {
    this.entryForm = this.fb.group({
      'amount': [
        (+this.entry.amount).toFixed(2), [
          Validators.required,
          Validators.pattern(/^\d+(\.\d{0,2})?$/)
        ]
      ],
      'date': [
        this.ionicDate(this.entry.date), [
          Validators.required
        ]
      ],
      'categoryId': [
        this.entry.categoryId, [
          Validators.required
        ]
      ],
      'description': [
        this.entry.description, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(350)
        ]
      ],
      'payment_method': [
        this.entry.payment_method, [
          Validators.required
        ]
      ]
    });

    this.entryForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  private onValueChanged(data?: any) {

    const form = this.entryForm;

    if (form.dirty) {
      this.submitted = false;
    }

    for (const field in this.formErrors) {

      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {

        const messages = this.validationMessages[field];

        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  private formErrors = {
    'amount': '',
    'description': ''
  };

  private validationMessages = {
    'amount': {
      'required': 'Je moet een bedrag invullen (cijfers, met eventueel een komma).',
      'pattern': 'Geef maximaal twee cijfers achter de komma.'

    },
    'description': {
      'required': 'Je moet een omschrijving geven.',
      'minlength': 'De omschrijving moet minstens 1 teken lang zijn.',
      'maxlength': 'De omschrijving mag niet langer dan 350 tekens zijn.',
    }
  };

  private onSubmit() {

    this.submitted = true;
    this.title = 'Wijzig gegevens';

    if (this.entryId) {
      this.sqlite.changeEntry(this.entryId, +this.entryForm.get('date').value.split('-').join(''), +this.entryForm.get('amount').value, this.entryForm.get('payment_method').value, this.entryForm.get('description').value, +this.entryForm.get('categoryId').value);
    } else {
      this.sqlite.newEntry(+this.entryForm.get('date').value.split('-').join(''), +this.entryForm.get('amount').value, this.entryForm.get('payment_method').value, this.entryForm.get('description').value, +this.entryForm.get('categoryId').value)
      .then(response => this.entryId = response);
    }
  }

  private cancel() {
    this.entryForm.reset({
      amount: this.entry.amount,
      date: this.entry.date,
      payment_method: this.entry.payment_method,
      description: this.entry.description,
      categoryId: this.entry.categoryId
    });

    this.submitted = true;
  }

  private ionViewCanLeave(): boolean {
    if (!this.submitted) {
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

  private showDeleteAlert() {

    let alert = this.alertCtrl.create({
      title: 'Uitgave verwijderen',
      subTitle: 'Deze uitgave verwijderen?',
      buttons: [
        {
          text: 'Annuleer',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.sqlite.deleteEntry(this.entryId, this.entry.date, this.entry.categoryId)
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  private addEntry() {
    /*const index = this.navCtrl.indexOf()*/
    this.navCtrl.push(EntryComp, { entryId: null })
      .then(() => {
        const previousPage = this.navCtrl.getPrevious();
        this.navCtrl.removeView(previousPage);
      });
  }

}
