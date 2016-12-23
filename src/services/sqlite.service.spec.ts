//import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//import { By } from '@angular/platform-browser';
//import { App, MenuController, NavController, Platform, Config, Keyboard, IonicModule, DomController } from 'ionic-angular';
//import { ConfigMock } from '../../mocks';

import { SQLiteService } from './sqlite.service';

describe('SQLiteService', () => {

  let service = new SQLiteService();
  let win: any = window;

  let csv: string = require('../assets/mijnuitgaven-csv');
  let data = csv.split('\n').map(row => row.split(';')).slice(1, 21); //don't use the first row with labels
  service.db = win.openDatabase('MijnUitgavenTestDB', '1.0', 'Test database MijnUitgaven', 2 * 1024 * 1024);
  service.db.transaction(tx => {
    //tx.executeSql('DELETE FROM posten');
    tx.executeSql('CREATE TABLE IF NOT EXISTS posten (id INTEGER PRIMARY KEY UNIQUE, datum TEXT, bedrag REAL, betaalwijze TEXT, omschrijving TEXT)');
    data.forEach(row => {
      tx.executeSql('INSERT INTO posten (id, datum, bedrag, betaalwijze, omschrijving) VALUES (?,?,?,?,?)', [row[0], row[1], row[2], row[3], row[4]], null, (tx, err) => console.log(err));
    })
  });

  it('gets query from database', done => {
    let query = 'SELECT * FROM posten'
    service.query(query, []).then(respons => {
      expect(respons.res.rows.item(0).betaalwijze).toBe('BANK');
      done();
    });
  });

  it('test length', done => {
    let query = 'SELECT * FROM posten'
    service.query(query, []).then(respons => {
      expect(respons.res.rows.length).toBe(20);
      done();
    });
  });

});
