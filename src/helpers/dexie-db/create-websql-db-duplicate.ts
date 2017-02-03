import { entriesCsv } from './entries-csv';
import { categoriesCsv } from './categories-csv';

//NB. If you want to start with a fresh database, clear the browser data before running the app

let createWebSqlDb = function() {

  console.warn('Storage: SQLite plugin not installed, falling back to WebSQL.');

  let data = entriesCsv.split('\n').map(row => row.split(';')).slice(1); //don't use the first row with labels
  let cats = categoriesCsv.split('\n').slice(1);

  let db: any = null;
  let win: any = window;

  db = win.openDatabase('MijnUitgaven', '1.0', 'database MijnUitgaven', 2 * 1024 * 1024);
  db.transaction(tx => {
    tx.executeSql('DROP TABLE IF EXISTS entries');
    tx.executeSql('DROP TABLE IF EXISTS categories');
    tx.executeSql('CREATE TABLE IF NOT EXISTS entries (entryId INTEGER PRIMARY KEY, date TEXT, amount REAL, payment_method TEXT, description TEXT, categoryId INTEGER)', [], null, /*(tx, err) => console.log(err.message)*/);
    data.forEach(row => {
      tx.executeSql('INSERT INTO entries (entryId, date, amount, payment_method, description, categoryId) VALUES (?,?,?,?,?,?)', [row[0], row[1], row[2], row[3], row[4], row[5]], null, /*(tx, err) => console.log(err.message)*/);
    });
    tx.executeSql('CREATE TABLE IF NOT EXISTS categories (catId INTEGER PRIMARY KEY, category TEXT)');
    cats.forEach(row => {
      tx.executeSql('INSERT INTO categories (category) VALUES (?)', [row], null, /*(tx, err) => console.log(err.message)*/);
    });
  }, (err) => console.log('transaction error:', err.message), () => console.log('database populated'));

  return db;
}

export { createWebSqlDb };