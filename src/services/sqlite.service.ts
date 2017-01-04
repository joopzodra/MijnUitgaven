import { Injectable } from '@angular/core';

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
      console.warn('Storage: SQLite plugin not installed, falling back to WebSQL.');
      let csv: string = require('../assets/mijnuitgaven-csv');
      let data = csv.split('\n').map(row => row.split(';')).slice(1); //don't use the first row with labels
      this.db = this.win.openDatabase('MijnUitgaven', '1.0', 'database MijnUitgaven', 2 * 1024 * 1024);
      this.db.transaction(tx => {
        //tx.executeSql('DELETE FROM entries');
        tx.executeSql('CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY UNIQUE, date TEXT, amount REAL, payment_method TEXT, description TEXT, category TEXT, subcategory TEXT)', [], null, /*(tx, err) => console.log(err.message)*/);
        data.forEach(row => {
          tx.executeSql('INSERT INTO entries (id, date, amount, payment_method, description, category, subcategory) VALUES (?,?,?,?,?,?,?)', [row[0], row[1], row[2], row[3], row[4], row[5], row[6]], null, /*(tx, err) => console.log(err.message)*/);
        })
      });
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

  getCategory(cat: string): Promise<any> {
    let query = 'SELECT * FROM entries WHERE category="' +  cat + '" ORDER BY date DESC';
    return this.query(query);
  }

}

