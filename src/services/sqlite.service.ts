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
      this.db.transaction(tx => {
        tx.executeSql('SELECT * FROM posten;', [], function(ts, rs) {
          console.log('Got somehow a result: ' + rs.rows.item(0)['omschrijving']);
        });
      });

    } else {
      console.warn('Storage: SQLite plugin not installed, falling back to WebSQL.');
      let csv: string = require('../assets/mijnuitgaven-csv');
      let data = csv.split('\n').map(row => row.split(';')).slice(1); //don't use the first row with labels
      this.db = this.win.openDatabase('MijnUitgaven', '1.0', 'database MijnUitgaven', 2 * 1024 * 1024);
      this.db.transaction(tx => {
        //tx.executeSql('DELETE FROM posten');
        tx.executeSql('CREATE TABLE IF NOT EXISTS posten (id INTEGER PRIMARY KEY UNIQUE, datum TEXT, bedrag REAL, betaalwijze TEXT, omschrijving TEXT)');
        data.slice(0,20).forEach(row => {
          tx.executeSql('INSERT INTO posten (id, datum, bedrag, betaalwijze, omschrijving) VALUES (?,?,?,?,?)', [row[0], row[1], row[2], row[3], row[4]], null/*, (tx, err) => console.log(err)*/);
        })
      });
    }
  }

  query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.db.transaction((tx) => {
          tx.executeSql(query, params,
            (tx, res) => resolve({ tx: tx, res: res }),
            (tx, err) => reject({ tx: tx, err: err }));
        },
          (err) => reject({ err: err }));
      } catch (err) {
        reject({ err: err });
      }
    });
  }

}
