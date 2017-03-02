import { Component, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';

import { colors } from '../../helpers/chartcolors';
import { SQLiteService } from '../../services/sqlite.service';

@Component({
  selector: 'page-change-categories',
  templateUrl: 'change-categories.html'
})

export class ChangeCategoriesPage implements OnInit {

  private colorTable: { [x: number]: string } = colors;
  private categories: { key: number, value: string }[];
  private catNames: string[];

  constructor(private sqlite: SQLiteService, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.refreshCategories();

    this.sqlite.categoryChangedSource.subscribe(catId => {
      this.refreshCategories();
    },
      error => console.log('error: ' + error.message)
    );
  }

  private refreshCategories() {

    this.sqlite.getCategories()
      .then(categories => {
        this.categories = [];
        this.catNames = [];
        //categories[0] is 'nog te rubriceren', so we start with 1 and categories[1]
        for (let i = 1; i <= Object.keys(categories).length; i++) {
          this.categories.push({ key: i, value: categories[i] });
          this.catNames.push(categories[i]);
        }
      });
  }

  private showPromptAlert(catId) {

    let categoryObject = this.categories.filter(catObj => catObj.key === catId)[0]
    let prompt = this.alertCtrl.create({
      title: 'Wijzig rubrieksnaam',
      message: 'Verander ' + categoryObject.value + ' in:',
      inputs: [
        {
          name: 'category',
          placeholder: categoryObject.value
        },
      ],
      buttons: [
        {
          text: 'Annuleer'
        },
        {
          text: 'Opslaan',
          handler: (data: { category: string }) => {

            let categoryTrimmed = data.category.trim();

            if (data.category === '' || categoryTrimmed === categoryObject.value) {
              return true;
            }

            if (categoryTrimmed === '') {
              prompt.setMessage('Vul een rubrieksnaam in!');
              this.addWarningClass();
              return false;
            } else if (this.catNames.indexOf(categoryTrimmed) >= 0) {
              prompt.setMessage('Er bestaat al een rubriek met de naam die je opgeeft. Vul een andere naam in.');
              this.addWarningClass();
              return false;
            } else {
              this.sqlite.changeCategory(categoryObject.key, categoryTrimmed);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  private addWarningClass() {
    let alertMessage = document.getElementsByClassName('alert-message').item(0);
    alertMessage.className = alertMessage.className + ' warning';
  };

}
