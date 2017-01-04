import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { App, MenuController, NavController, Platform, Config, Keyboard, IonicModule, DomController, GestureController, Form } from 'ionic-angular'; //default testing components
import { NavParams } from 'ionic-angular';
import { ConfigMock } from '../../mocks';

import { ListPage } from './list';
import { EuroPipe } from '../../pipes/euro.pipe';
import { DatePipe } from '../../pipes/date.pipe';
import { SQLiteService } from '../../services/sqlite.service';

describe('ListPage', () => {

  let comp: ListPage;
  let fixture: ComponentFixture<ListPage>;
  let sqlService: SQLiteService;
  let spy;

  class MockNavParams {
    data = { category: 'boodschappen' };
    get(params) {
      return this.data[params];
    }
  }

  class MockSQLiteService {
    private csv: string = require('../../assets/mijnuitgaven-csv');
    private data = this.csv.split('\n')
      .map(row => row.split(';'))
      .slice(1, 20) //don't use the first row with labels
      .map(row => ({ id: row[0], date: row[1], amount: -row[2], payment_method: row[3], description: row[4], category: row[5], subcategory: row[6] }));

    getCategory(cat: string): Promise<any> {
      let result = this.data.filter(row => row.category == cat);
      let stubSqlResponse = { res: { rows: { item: i => result[i], length: result.length } } };
      return new Promise((resolve, reject) => window.setTimeout(() => resolve(stubSqlResponse), 100));
    }
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ListPage, EuroPipe, DatePipe],
      providers: [
        DomController,
        Form,
        { provide: App, useClass: ConfigMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Keyboard, useClass: ConfigMock },
        { provide: MenuController, useClass: ConfigMock },
        { provide: NavController, useClass: ConfigMock },
        { provide: Platform, useClass: ConfigMock },
        { provide: DomController, useFactory: ConfigMock },
        { provide: GestureController, useClass: ConfigMock },
        { provide: NavParams, useClass: MockNavParams },
        { provide: SQLiteService, useClass: MockSQLiteService }
      ],
      imports: [IonicModule],
    });

    fixture = TestBed.createComponent(ListPage);
    comp = fixture.componentInstance;
    sqlService = fixture.debugElement.injector.get(SQLiteService);
    spy = spyOn(sqlService, 'getCategory').and.callThrough();

  });

  it('getCategory is called', () => {
    fixture.detectChanges();
    expect(spy.calls.any()).toBe(true);

  });

  it('results array should contain 1 or more elements', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(comp.results.length).toBeGreaterThan(0);
    })
  }));

  it('should show list items', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let deArray = fixture.debugElement.queryAll(By.css('ion-item'));
      expect(deArray.length).toBeGreaterThan(0);
    })
  }));

  it('sorts by date', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      for (let i = 0; i < comp.results.length - 1; i++ ) {
        expect(comp.results[i].date).toBeGreaterThanOrEqual(comp.results[i + 1].date)
      }
    })
  }));

  it('sorts by amount when amount is selected', async(() => {
    fixture.detectChanges();
    comp.sortBy = 'amount';
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      for (let i = 0; i < comp.results.length - 1; i++ ) {
        expect(comp.results[i].amount).toBeGreaterThanOrEqual(comp.results[i+1].amount)
      }
    })
  }));


});
