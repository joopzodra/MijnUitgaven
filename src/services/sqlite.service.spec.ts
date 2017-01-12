import { SQLiteService } from './sqlite.service';

import { entriesCsv } from '../assets/entries-csv';
import { categoriesCsv } from '../assets/categories-csv';

describe('SQLiteService', () => {

  let service: SQLiteService;

  beforeEach((done) => {
    service = new SQLiteService();
    let data = entriesCsv.split('\n').map(row => row.split(';')).slice(1); //don't use the first row with labels
    let cats = categoriesCsv.split('\n').slice(1);

    service.db = service.win.openDatabase('MijnUitgaven', '1.0', 'database MijnUitgaven', 2 * 1024 * 1024);
    service.db.transaction(tx => {
      tx.executeSql('DELETE FROM entries');
      tx.executeSql('CREATE TABLE IF NOT EXISTS entries (entriesId INTEGER PRIMARY KEY, date TEXT, amount REAL, payment_method TEXT, description TEXT, categoryId INTEGER)', [], null, (tx, err) => console.log(err.message));
      data.slice(0, 20).forEach(row => {
        tx.executeSql('INSERT INTO entries (entriesId, date, amount, payment_method, description, categoryId) VALUES (?,?,?,?,?,?)', [row[0], row[1], -row[2], row[3], row[4], row[5]], //row[2] negative because amount is negative and in the list we want to work with positive values
          done(), (tx, err) => console.log(err.message));
      });
      tx.executeSql('CREATE TABLE IF NOT EXISTS categories (catId INTEGER PRIMARY KEY, category TEXT)');
      cats.forEach(row => {
        tx.executeSql('INSERT INTO categories (category) VALUES (?)', [row], null, /*(tx, err) => console.log(err.message)*/);
      });
    });
  });

  describe('query method', () => {

    it('can get multiple rows from database', done => {
      let query = 'SELECT * FROM entries'
      service.query(query, []).then(response => {
        expect(response.res.rows.length).toBe(20);
        done();
      });
    });

    it('and rows have expected value', done => {
      let query = 'SELECT * FROM entries'
      service.query(query, []).then(response => {
        expect(response.res.rows.item(0).payment_method).toBe('BEA');
        done();
      });
    });

    it('can insert a new row in the database', done => {
      let query1 = 'INSERT INTO entries (date, amount, payment_method, description, category) VALUES ("20161229", 250, "PIN", "feestelijkheden", "extra")';
      let query2 = 'SELECT * FROM entries';
      let query3 = 'SELECT * FROM entries WHERE id=21'
      service.query(query1, [])
        .then(() => service.query(query2, []))
        .then(response => expect(response.res.rows.length).toBe(21))
        .then(() => service.query(query3, []))
        .then(response => {
          expect(response.res.rows.item(0).description).toBe('feestelijkheden');
          done();
        });
    });

    it('starts each test with a fresh database', done => {
      let query = 'SELECT * FROM entries'
      service.query(query, []).then(response => {
        expect(response.res.rows.length).toBe(20);
        done();
      });
    });

  })

/*  describe('getCategory method', () => {

    it('returns the right category', done => {
      service.getCategory('boodschappen').then(response => {
        expect(response.res.rows.length).toBeGreaterThan(0);
        expect(response.res.rows.item(0).category).toBe('boodschappen')
        done();
      })
    });
  });*/

});
