import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { entriesCsv } from '../assets/entries-csv';
import { categoriesCsv } from '../assets/categories-csv';
import { DbRowsJoined } from '../datatypes/dbRowsJoined';

/*
* NB cat and cats is used as shorthand for category respectively categories
*/

@Injectable()
export class SQLiteService {

  win: any = window;
  db: any;

  constructor() {
    if (this.win.sqlitePlugin) {
      this.db = this.win.sqlitePlugin.openDatabase({
        name: 'MijnUitgaven.sqlite',
        location: 'default',
        createFromLocation: 1
      });
    } else {
      this.createWebSqlDatabase(); //for development in browser only only
    }
  }

  query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      return this.db.transaction((tx) => {
        return tx.executeSql(query, params,
          (tx, res) => resolve({ tx: tx, res: res }),
          (tx, err) => console.log(err.message));
      });
    })
      .catch(err => console.log(err.message));
  }

  getByCatAndDate(cat: string, minDate: Date, maxDate: Date): Promise<DbRowsJoined[]> {

    let min = this.dateToString(minDate);
    let max = this.dateToString(maxDate);

    let query = ['SELECT * FROM entries INNER JOIN categories ON entries.categoryId=categories.catId WHERE entries.categoryId IN ', cat, ' AND entries.date>=', min, ' AND entries.date<=', max].join('');

    return this.query(query)
      .then(sqlResponse => this.sqlResponseToArray(sqlResponse));
  }

  getCategories() {

    let query = 'SELECT * FROM categories';
    
    return this.query(query)
      .then(sqlResponse => {
        let catObj = {};
        let length = sqlResponse.res.rows.length;
      for (let i = 0; i < length; i++) {
        let item = sqlResponse.res.rows.item(i);
        catObj[item.catId] = item.category;
      }
      return catObj;        
      })
  }

  changeEntryCategory(cat: string, subcat: string, id: number) {
    console.log(cat, id);
  }

  private stringToDate(dateString: string) {
    return new Date(+dateString.slice(0, 4), +dateString.slice(4, 6) - 1, +dateString.slice(6));
  }

  private dateToString(date: Date) {
    let iso = date.toISOString();
    return iso.slice(0, 4) + iso.slice(5, 7) + iso.slice(8, 10);
  }

  private sqlResponseToArray(sqlResponse) {
    let arr = [];
    let length = sqlResponse.res.rows.length;
    for (let i = 0; i < length; i++) {
      arr.push(sqlResponse.res.rows.item(i));
    }
    return arr;
  }

  //NB. If you want to start with a fresh database, clear the browser data before running the app
  private createWebSqlDatabase() {

    console.warn('Storage: SQLite plugin not installed, falling back to WebSQL.');

    let data = entriesCsv.split('\n').map(row => row.split(';')).slice(1); //don't use the first row with labels
    let cats = categoriesCsv.split('\n').slice(1);

    this.db = this.win.openDatabase('MijnUitgaven', '1.0', 'database MijnUitgaven', 2 * 1024 * 1024);
    this.db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS entries (entriesId INTEGER PRIMARY KEY, date TEXT, amount REAL, payment_method TEXT, description TEXT, categoryId INTEGER)', [], null, /*(tx, err) => console.log(err.message)*/);
      data.forEach(row => {
        tx.executeSql('INSERT INTO entries (entriesId, date, amount, payment_method, description, categoryId) VALUES (?,?,?,?,?,?)', [row[0], row[1], -row[2], row[3], row[4], row[5]], null, /*(tx, err) => console.log(err.message)*/); //row[2] negative because amount is negative and in the list we want to work with positive values
      });
      tx.executeSql('CREATE TABLE IF NOT EXISTS categories (catId INTEGER PRIMARY KEY, category TEXT)');
      cats.forEach(row => {
        tx.executeSql('INSERT INTO categories (category) VALUES (?)', [row], null, /*(tx, err) => console.log(err.message)*/);
      });
    });
  }

}
