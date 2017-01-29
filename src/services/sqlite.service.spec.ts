import { SQLiteService } from './sqlite.service';

import { entriesCsv } from '../assets/entries-csv';
import { categoriesCsv } from '../assets/categories-csv';

describe('SQLiteService', () => {

  let service: SQLiteService;

  let data = entriesCsv.split('\n').map(row => row.split(';')).slice(1); //don't use the first row with labels
  let cats = categoriesCsv.split('\n').slice(1);

  beforeEach((done) => {

    service = new SQLiteService();

    service.db = service.win.openDatabase('MijnUitgaven', '1.0', 'database MijnUitgaven', 2 * 1024 * 1024);
    service.db.transaction(tx => {
      tx.executeSql('DROP TABLE entries');
      tx.executeSql('CREATE TABLE entries (entryId INTEGER PRIMARY KEY, date TEXT, amount REAL, payment_method TEXT, description TEXT, categoryId INTEGER)', null, null, (tx, err) => console.log(err.message));

      data.slice(0, 150).forEach(row => {
        tx.executeSql('INSERT INTO entries (entryId, date, amount, payment_method, description, categoryId) VALUES (?,?,?,?,?,?)', [row[0], row[1], row[2], row[3], row[4], row[5]],
          null, (tx, err) => console.log(err.message));
      });

      tx.executeSql('DROP TABLE categories');
      tx.executeSql('CREATE TABLE categories (catId INTEGER PRIMARY KEY, category TEXT)');
      cats.forEach(row => {
        tx.executeSql('INSERT INTO categories (category) VALUES (?)', [row], null, (tx, err) => console.log(err.message));
      });
    }, () => { console.log('error service.db.transaction') }, done);
  });

  describe('query method', () => {

    it('can get multiple rows from database', done => {
      let query = 'SELECT * FROM entries';
      service.query(query, []).then(response => {
        expect(response.res.rows.length).toBe(150);
        done();
      });
    });

    it('and rows have expected value', done => {
      let query = 'SELECT * FROM entries';
      service.query(query, []).then(response => {
        expect(response.res.rows.item(0).payment_method).toBe('BEA');
        done();
      });
    });

    it('can insert a new row in the database', done => {
      let query1 = 'INSERT INTO entries (date, amount, payment_method, description, categoryId) VALUES ("20161229", 250, "BEA", "feestelijkheden", 1)';
      let query2 = 'SELECT * FROM entries';
      let query3 = 'SELECT * FROM entries WHERE entryId=151'
      service.query(query1, [])
        .then(() => service.query(query2, []))
        .then(response => { expect(response.res.rows.length).toBe(151); return response })
        .then(() => service.query(query3, []))
        .then(response => {
          expect(response.res.rows.item(0).description).toBe('feestelijkheden');
          done();
        });

    });

    it('starts each test with a fresh database', done => {
      let query = 'SELECT * FROM entries';
      service.query(query, []).then(response => {
        expect(response.res.rows.length).toBe(150);
        done();
      });
    });

  });

  describe('getByCatAndDate method', () => {

    it('returns the expected category', done => {
      service.getByCatAndDate(2, new Date(2015, 4, 30), new Date(2015, 5, 30)).then(response => {
        expect(response.length).toBeGreaterThan(0);
        expect(response[0].category).toBe('boodschappen')
        done();
      });
    });

    it('returns entries with the expected date', done => {

      function splitDate(yearMonthDay: string) {
        let year = yearMonthDay.slice(0, 4);
        let month = yearMonthDay.slice(4, 6);
        let day = yearMonthDay.slice(6);
        return [year, month, day]
      }

      service.getByCatAndDate(2, new Date(2015, 6, 1), new Date(2015, 6, 31)).then(response => {
        expect(splitDate(response[0].date)[0]).toBe('2015');
        expect(splitDate(response[0].date)[1]).toBe('07');
        expect(splitDate(response[response.length - 1].date)[0]).toBe('2015');
        expect(splitDate(response[response.length - 1].date)[1]).toBe('07');
        done();
      });
    });

  });

  describe('getCategory method', () => {

    it('returns an object with categories', done => {
      service.getCategories().then(response => {
        expect(response[1]).toBe('woonlasten');
        done();
      });
    });

  });

  describe('changeEntry method', () => {

    it('changes an entry as expected', done => {

      let query = 'SELECT * FROM entries WHERE entryId=1';
      service.query(query)
        .then(response => {
          expect(response.res.rows.item(0).categoryId).toBe(4);
          expect(response.res.rows.item(0).description).toBe('Haan ALMERE');
          return response;
        })
        .then(() => service.changeEntry(1, '20150530', 'test', 18))
        .then(() => service.query(query))
        .then(response => {
          expect(response.res.rows.item(0).categoryId).toBe(18);
          expect(response.res.rows.item(0).description).toBe('test');
          return response;
        })
        .then(done);
    });
  });

  describe('changeCategory method', () => {

    it('changes an category as expected', done => {

      let query = 'SELECT * FROM categories WHERE catId=1';
      service.query(query)
        .then(response => {
          expect(response.res.rows.item(0).catId).toBe(1);
          expect(response.res.rows.item(0).category).toBe('woonlasten');
          return response;
        })
        .then(() => service.changeCategory(1, 'wonen'))
        .then(() => service.query(query))
        .then(response => {
          expect(response.res.rows.item(0).catId).toBe(1);
          expect(response.res.rows.item(0).category).toBe('wonen');
          return response;
        })
        .then(done);
    });
  });

});
