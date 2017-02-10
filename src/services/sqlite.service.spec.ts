import { Platform } from 'ionic-angular';

import { SQLiteService } from './sqlite.service';
/*import { entriesCsv } from '../helpers/dexie-db/entries-csv';
import { categoriesCsv } from '../helpers/dexie-db/categories-csv';*/

describe('SQLiteService', () => {

  let service: SQLiteService;

/*  let data = entriesCsv.split('\n').map(row => row.split(';')).slice(1); //don't use the first row with labels
  let cats = categoriesCsv.split('\n').slice(1);*/

  let originalTimeout;

  beforeEach((done) => {

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    let platform = { ready: () => Promise.resolve('true') };
    service = new SQLiteService(platform as Platform);
    let db = window.setInterval(() => {
      if (service.db) {
        clearInterval(db);
        done();
      }
    }, 100)
  });

    afterEach(function() {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

  //These tests for teh query method of SQLiteService where used in an earlier version of the app, when a WebSql database was used in the browser. Now with Dexie / Indexed DB these tests can't be used.

  /*  describe('query method', () => {
  
      it('can get multiple rows from database', done => {
        let query = 'SELECT * FROM entries';
        service.query(query, []).then(response => {
          expect(response.res.rows.length).toBe(521);
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
        let query3 = 'SELECT * FROM entries WHERE entryId=522'
        service.query(query1, [])
          .then(() => service.query(query2, []))
          .then(response => { expect(response.res.rows.length).toBe(522); return response })
          .then(() => service.query(query3, []))
          .then(response => {
            expect(response.res.rows.item(0).description).toBe('feestelijkheden');
            done();
          });
  
      });
  
      it('starts each test with a fresh database', done => {
        let query = 'SELECT * FROM entries';
        service.query(query, []).then(response => {
          expect(response.res.rows.length).toBe(521);
          done();
        });
      });
  
    });*/

  //Indexed DB doesn't work as expected. Only simple queries get a quick response. Therefore skip these tests

  /*  it('getByCatAndDate returns the expected category', done => {
      service.getByCatAndDate(2, new Date(2015, 4, 30), new Date(2015, 5, 30)).then(response => {
        expect(response.length).toBeGreaterThan(0);
        expect(response[0].category).toBe('boodschappen');
        done();
      });
    });
  
    it('getByCatAndDate returns entries with the expected date', done => {
  
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
    });*/


  it('getCategories returns an object with categories', done => {
    service.getCategories().then(response => {
      expect(response[1]).toBe('woonlasten');
      done();
    });
  });

  it('getItem the expected item', done => {
    service.getItem(1).then(item => {
      expect(item.description).toBe('Haan ALMERE');
      expect(item.categoryId).toBe(4);
      done();
    });
  })


  /*  describe('changeEntry method', () => {
  
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
    });*/

});
