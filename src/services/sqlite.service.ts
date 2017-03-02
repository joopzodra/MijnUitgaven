import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Platform } from 'ionic-angular';

import { DexieDb } from '../helpers/dexie-db/dexie-db';
import { IEntry } from '../datatypes/i-entry';

/*
* NB cat and cats is used as shorthand for category respectively categories
*/

@Injectable()
export class SQLiteService {

  private win: any = window;
  private db;
  public entryChangedSource = new Subject<{ date: string, categoryId: number }>();
  public categoryChangedSource = new Subject<number>();

  constructor(private platform: Platform) {

    /*Although this app is designed for mobile devices, we also want to demonstrate it in a browser. In the browser we need an prepopulated Dexie (Indexed DB) database instead of the mobile native sqlite. We set it up in src/helpers/dexie-db/dexie-db,instantiate it here, and bind the dexie db methods to this.db instead of the SQLite-methods */
    if (!platform.is('cordova')) {
      this.db = new DexieDb();
      this.getByCatAndDate = this.db.getByCatAndDate.bind(this.db);
      this.getCategories = this.db.getCategories.bind(this.db);
      this.getEntry = this.db.getEntry.bind(this.db);
      this.changeEntry = this.db.changeEntry.bind(this.db);
      this.changeCategory = this.db.changeCategory.bind(this.db);
      this.deleteEntry = this.db.deleteEntry.bind(this.db);
      this.newEntry = this.db.newEntry.bind(this.db);
      this.entryChangedSource = this.db.entryChangedSource;
      this.categoryChangedSource = this.db.categoryChangedSource;

    } else {

      platform.ready().then(() => {

        if (this.win.sqlitePlugin) {
          this.db = this.win.sqlitePlugin.openDatabase({
            name: 'MijnUitgaven.sqlite',
            location: 'default',
            createFromLocation: 1
          });
        }
      });
    }
  }

  private query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) =>
      this.db.transaction((tx) =>
        tx.executeSql(query, params, (tx, res) => resolve({ tx: tx, res: res }), (tx, err) => reject(err))
      ))
      .catch(err => console.log(err.message));
  }

  private sqlResponseToArray(sqlResponse) {
    let arr = [];
    let length = sqlResponse.res.rows.length;
    for (let i = 0; i < length; i++) {
      arr.push(sqlResponse.res.rows.item(i));
    }
    return arr;
  }

  public getByCatAndDate(cat, minDate: number, maxDate: number): Promise<IEntry[]> {

    let query;

    if (typeof cat === 'number') {
      query = ['SELECT * FROM entries WHERE categoryId=', cat, ' AND date>=', minDate, ' AND date<', maxDate].join('');
    } else {
      query = ['SELECT * FROM entries WHERE date>=', minDate, ' AND date<', maxDate].join('');
    }

    return this.query(query)
      .then(sqlResponse => this.sqlResponseToArray(sqlResponse));
  }

  public getCategories(): Promise<{ [x: number]: string }> {

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
      });
  }

  public getEntry(entryId): Promise<IEntry> {

    let query = ['SELECT * FROM entries INNER JOIN categories ON entries.categoryId=categories.catId WHERE entries.entryId=', entryId].join('');
    return this.query(query)
      .then(sqlResponse => this.sqlResponseToArray(sqlResponse)[0]);
  }

  public changeEntry(entryId: number, date: number, amount: number, payment_method: string, description: string, categoryId: number): void {

    let query = ['UPDATE entries SET ', 'amount=', amount, ', date=', date, ', categoryId=', categoryId, ', description="', description, '", payment_method="', payment_method, '" WHERE entryId=', entryId].join('');
    this.query(query)
      .then(sqlResponse => this.entryChangedSource.next({ date: date.toString(), categoryId: categoryId }));
  }

  public deleteEntry(entryId, date, categoryId): Promise<string> {

    let query = 'DELETE FROM entries WHERE entryId=' + entryId;
    return this.query(query)
      .then(sqlResponse => this.entryChangedSource.next({ date: date.toString(), categoryId: categoryId }));
  }

  public newEntry(date: number, amount: number, payment_method: string, description: string, categoryId: number) {

    let query = ['INSERT INTO entries (date, amount, payment_method, description, categoryId) VALUES (', date, ',', amount, ',"', payment_method, '","', description, '",', categoryId, ')'].join('');
    
    return this.query(query)
      .then(sqlResponse => {
        this.entryChangedSource.next({ date: date.toString(), categoryId: categoryId });
        return sqlResponse.res.insertId;
      });    
  }

  public changeCategory(catId: number, category: string): void {

    let query = ['UPDATE categories SET category="', category, '" WHERE catId=', catId].join('');
    this.query(query)
      .then(sqlResponse => this.categoryChangedSource.next(catId));
  }

}
