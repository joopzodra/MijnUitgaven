import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class SQLiteService {

  win: any = window;
  db: any;

  constructor(private http: Http) {
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
      console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-ext in production!');
      let csv: string = require('../assets/mijnuitgaven-csv');
      let data = csv.split('\n').map(row => row.split(';')).slice(1); //don't use the first row with labels
      this.db = this.win.openDatabase('MijnUitgaven', '1.0', 'database MijnUitgaven', 2 * 1024 * 1024);
      this.db.transaction(tx => {
        //tx.executeSql('drop table posten')
        tx.executeSql('CREATE TABLE IF NOT EXISTS posten (id INTEGER PRIMARY KEY, datum TEXT, bedrag REAL, betaalwijze TEXT, omschrijving TEXT)');
        tx.executeSql('INSERT INTO posten (datum, bedrag, betaalwijze, omschrijving) VALUES ("2010001", 75.25, "PIN", "Mijn betaling hihaho")', null, (tx, res) => console.log(res), (tx, err) => console.log(err));
        tx.executeSql('INSERT INTO posten (datum, bedrag, betaalwijze, omschrijving) VALUES ("1930", 75.25, "KAS", "Mijn betaling mu")', null, (tx, res) => console.log(res), (tx, err) => console.log(err));

      });
    }
  }

  query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.db.transaction((tx: any) => {
          tx.executeSql(query, params,
            (tx: any, res: any) => resolve({ tx: tx, res: res }),
            (tx: any, err: any) => reject({ tx: tx, err: err }));
        },
          (err: any) => reject({ err: err }));
      } catch (err) {
        reject({ err: err });
      }
    });
  }

}
