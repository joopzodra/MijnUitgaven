import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';


@Injectable()
export class SQLiteService {

  win: any = window;
  db: any;

  constructor(private alertCtrl: AlertController) {
    if (this.win.sqlitePlugin) {
      this.db = this.win.sqlitePlugin.openDatabase({
        name: 'MijnUitgaven.sqlite',
        location: 'default',
        createFromLocation: 1
      });
      this.db.transaction(tr => {
        tr.executeSql("select * from posten;", [], function(ts, rs) {
          console.log('Got somehow a result: ' + rs.rows.item(0)['omschrijving']);
        });
      });

    } else {
      console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-ext in production!');
      this.db = this.win.openDatabase('MijnUitgaven', '1.0', 'database', 5 * 1024 * 1024);
    }
  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create(
      {
        title: message,
        buttons: ['OK']
      });

    alert.present();
  };

  /* Perform an arbitrary SQL operation on the database. Use this method
   * to have full control over the underlying database through SQL operations
   * like SELECT, INSERT, and UPDATE.*/
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


  //Get the value in the database identified by the given key.
  get(key: string): Promise<any> {
    return this.query('select key, value from kv where key = ? limit 1', [key]).then(data => {
      if (data.res.rows.length > 0) {
        return data.res.rows.item(0).value;
      }
    });
  }

  // Set the value in the database for the given key. Existing values will be overwritten.
  set(key: string, value: string): Promise<any> {
    return this.query('insert or replace into kv(key, value) values (?, ?)', [key, value]);
  }

  getJson(key: string): Promise<any> {
    return this.get(key).then(value => {
      try {
        return JSON.parse(value);
      } catch (e) {
        console.warn('Storage getJson(): unable to parse value for key', key, ' as JSON');
        throw e; // rethrowing exception so it can be handled with .catch()
      }
    });
  }

  setJson(key: string, value: any): Promise<any> {
    try {
      return this.set(key, JSON.stringify(value));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  // Remove the value in the database for the given key.
  remove(key: string): Promise<any> {
    return this.query('delete from kv where key = ?', [key]);
  }

  //Clear all keys/values of your database.
  clear(): Promise<any> {
    return this.query('delete from kv');
  }
}
