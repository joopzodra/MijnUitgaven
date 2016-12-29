import { SQLiteService } from './sqlite.service';

describe('SQLiteService', () => {

  let service = new SQLiteService();
  let win: any = window;

  let csv: string = require('../assets/mijnuitgaven-csv');
  let data = csv.split('\n').map(row => row.split(';')).slice(1, 21); //don't use the first row with labels
  service.db = win.openDatabase('MijnUitgavenTestDB', '1.0', 'Test database MijnUitgaven', 2 * 1024 * 1024);
  service.db.transaction(tx => {
    //tx.executeSql('DELETE FROM entries');
    tx.executeSql('CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY UNIQUE, date TEXT, amount REAL, payment_method TEXT, description TEXT, category TEXT, subcategory TEXT)', [], null, (tx, err) => console.log(err));
    data.slice(0, 20).forEach(row => {
      tx.executeSql('INSERT INTO entries (id, date, amount, payment_method, description, category, subcategory) VALUES (?,?,?,?,?,?,?)', [row[0], row[1], row[2], row[3], row[4], row[5], row[6]], null, (tx, err) => console.log(err));
    })
  });

  it('gets query from database', done => {
    let query = 'SELECT * FROM entries'
    service.query(query, []).then(respons => {
      expect(respons.res.rows.item(0).payment_method).toBe('BANK');
      done();
    });
  });

  it('test length', done => {
    let query = 'SELECT * FROM entries'
    service.query(query, []).then(respons => {
      expect(respons.res.rows.length).toBe(20);
      done();
    });
  });

});
