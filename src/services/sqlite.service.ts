import {Injectable} from "@angular/core";
/*import {SQLite} from "ionic-native";
*/
const DB_NAME: string = '__MijnUitgavenApp';
const win: any = window;

@Injectable()
export class SQLiteService {
  private _db: any;

  constructor() {
    if (win.sqlitePlugin) {
      //let db = new SQLite();
      this._db = win.sqlitePlugin.openDatabase({
        name: DB_NAME,
        location: 'default'
      });
    } else {
      console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
      this._db = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
    }
    this._tryInit();
  }

  // Initialize the DB with our required tables
  _tryInit() {
    this.query('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)').catch(err => {
      console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
    });
  }


  /* Perform an arbitrary SQL operation on the database. Use this method
   * to have full control over the underlying database through SQL operations
   * like SELECT, INSERT, and UPDATE.*/
  query(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this._db.transaction((tx: any) => {
            tx.executeSql(query, params,
              (tx: any, res: any) => resolve({tx: tx, res: res}),
              (tx: any, err: any) => reject({tx: tx, err: err}));
          },
          (err: any) => reject({err: err}));
      } catch (err) {
        reject({err: err});
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
