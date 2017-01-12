/*import { async } from '@angular/core/testing';

import { CategoriesService } from './categories.service';
import { SQLiteService } from './sqlite.service';

describe('CategoriesService', () => {

  class MockSQLiteService {
    win;
    db;
    private csv: string = require('../assets/mijnuitgaven-csv');
    private data = this.csv.split('\n')
      .map(row => row.split(';'))
      .slice(1, 500) //don't use the first row with labels
      .map(row => ({ id: row[0], date: row[1], amount: -row[2], payment_method: row[3], description: row[4], category: row[5], subcategory: row[6] }));

    getCategory(cat: string): Promise<any> {
      return new Promise(() => { });
    }

    changeEntryCategory(cat, subcat, id) { }

    query(query: string, params: any[] = []): Promise<any> {

      if (query === 'SELECT DISTINCT category FROM entries') {

        let result = this.data.map(row => row.category);

        let resultSet = new Set(result);
        let resultArray = Array.from(resultSet);
        let stubSqlResponse = { res: { rows: { item: i => ({ category: resultArray[i] }), length: resultArray.length } } };//key is category!
        return new Promise((resolve, reject) => resolve(stubSqlResponse));
      }

      if (query === 'SELECT DISTINCT subcategory FROM entries WHERE category=?') {
        let result = this.data
          .filter(row => row.category === params[0])
          .map(row => row.subcategory); 

        let resultSet = new Set(result);
        let resultArray = Array.from(resultSet);
        let stubSqlResponse = { res: { rows: { item: i => ({ subcategory: resultArray[i] }), length: resultArray.length } } };//key is subcategory!
        return new Promise((resolve, reject) => resolve(stubSqlResponse));
      }
    }
  }

  let service: CategoriesService;

  beforeEach(async(() => {
    let sqlService: SQLiteService = new MockSQLiteService();
    service = new CategoriesService(sqlService);
  }));

  it('categories Promise returns categories object', () => {
    service.categories.then(categories => {
      expect(categories.length).toBeGreaterThan(0);
      expect(typeof categories[0].cat).toBe('string');
    })
  })

  it('a category object contains a subcats property which contains subcategories', () => {
    service.categories.then(categories => { console.log(categories[0].subcats)
      expect(categories[0].subcats.length).toBeGreaterThan(0);
      expect(typeof categories[0].subcats[0]).toBe('string');
    })
  })

});*/