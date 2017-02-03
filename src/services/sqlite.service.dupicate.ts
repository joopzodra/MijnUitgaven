import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Platform } from 'ionic-angular';

//import { createWebSqlDb } from '../helpers/dexie-db/create-websql-db';
import { DbRowsJoined } from '../datatypes/dbRowsJoined';

/*
* NB cat and cats is used as shorthand for category respectively categories
*/

@Injectable()
export class SQLiteService {

  win: any = window;
  db: any = null;
  entryChangedSource = new Subject<{ date: string, categoryId: number }>();
  categoryChangedSource = new Subject<number>();

  constructor(private platform: Platform) {

    this.platform.ready().then(() => {

      if (this.win.sqlitePlugin) {
        this.db = this.win.sqlitePlugin.openDatabase({
          name: 'MijnUitgaven.sqlite',
          location: 'default',
          createFromLocation: 1
        });
      } else {
        //this.db = createWebSqlDb(); //for development only
      }
    });
  }

  query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) =>
      this.db.transaction((tx) =>
        tx.executeSql(query, params, (tx, res) => resolve({ tx: tx, res: res }), (tx, err) => reject(err))
      ))
      .catch(err => console.log(err.message));
  }

  getByCatAndDate(cat: number | number[], minDate: Date, maxDate: Date): Promise<DbRowsJoined[]> {

    if (typeof cat === 'number') {
      cat = [cat];
    }

    let catINString = '(' + cat.join(',') + ')';

    let min = this.dateToString(minDate);
    let max = this.dateToString(maxDate);

    let query = ['SELECT * FROM entries INNER JOIN categories ON entries.categoryId=categories.catId WHERE entries.categoryId IN ', catINString, ' AND entries.date>=', min, ' AND entries.date<=', max].join('');

    return this.query(query)
      .then(sqlResponse => this.sqlResponseToArray(sqlResponse));
  }

  getCategories(): Promise<{ [x: number]: string }> {

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

  changeEntry(entryId: number, date: string, description: string, categoryId: number): void {

    let query = ['UPDATE entries SET description="', description, '", categoryId=', categoryId, ' WHERE entryId=', entryId].join('');
    this.query(query)
      .then(sqlResponse => {
        this.entryChangedSource.next({ date: date, categoryId: categoryId });
        return sqlResponse;
      });
  }

  changeCategory(catId: number, category: string): void {

    let query = ['UPDATE categories SET category="', category, '" WHERE catId=', catId].join('');
    this.query(query)
      .then(sqlResponse => this.categoryChangedSource.next(catId));
  }

/*  private stringToDate(dateString: string) {
    return new Date(+dateString.slice(0, 4), +dateString.slice(4, 6) - 1, +dateString.slice(6));
  }*/

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

}
