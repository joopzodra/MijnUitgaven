import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { App, MenuController, NavController, Platform, Config, Keyboard, IonicModule, DomController, GestureController, Form } from 'ionic-angular'; //default testing components
import { NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { ConfigMock } from '../../mocks';
import { ListPage } from './list';
import { EuroPipe } from '../../pipes/euro.pipe';
import { DatePipe, MonthPipe } from '../../pipes/date.pipe';
import { entriesCsv } from '../../helpers/dexie-db/entries-csv';
import { categoriesCsv } from '../../helpers/dexie-db/categories-csv';
import { IEntry } from '../../datatypes/i-entry';
import { ColoredBorderDirective } from '../../helpers/colored-border.directive';

describe('ListPage', () => {

  let comp: ListPage;
  let fixture: ComponentFixture<ListPage>;

  let entries: { entryId: number, date: string, amount: number, payment_method: string, description: string, categoryId: number }[] = entriesCsv.split('\n')
    .map(row => row.split(';'))
    .slice(1, 51) //don't use the first row with labels
    //entriesCsv is string, split returns strings, so convert entryId, amount and categoryId to numbers
    .map(row => ({ entryId: +row[0], date: row[1], amount: -row[2], payment_method: row[3], description: row[4], categoryId: +row[5] }));

  let categories: { key: number, value: string }[] = categoriesCsv.split('\n')
    .slice(1)
    .map((row, i) => {
      return { key: i + 1, value: row };
    });

  //fixed response; stub for SQLiteService.getByCatAndDate, for use in MockNavParams
  function getByCatAndDate(cat: number | number[], minDate: Date, maxDate: Date): Promise<IEntry[]> {
    //simulate inner join entries and categories
    let arr = entries.map(entry => entry);
    arr.forEach(entry => {
      entry['catId'] = entry['categoryId'];
      entry['category'] = categories.filter(cat =>
        cat.key === +entry['catId'])[0].value;
    });
    return new Promise((resolve, reject) => window.setTimeout(() => resolve(arr), 100));
  }

  class MockNavParams {
    dataSource = Observable.fromPromise(getByCatAndDate(1, new Date(), new Date()));
    catsSource = Observable.fromPromise(new Promise((resolve, reject) => window.setTimeout(() => resolve(categories), 100)))
    data = { dataSource: this.dataSource, catsSource: this.catsSource, catId: 2 };
    get(params) {
      return this.data[params];
    }
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ListPage, EuroPipe, DatePipe, MonthPipe, ColoredBorderDirective],
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
        { provide: NavParams, useClass: MockNavParams }
      ],
      imports: [IonicModule],
    });

    fixture = TestBed.createComponent(ListPage);
    comp = fixture.componentInstance;
  });

  it('shows items list', done => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let deArray = fixture.debugElement.queryAll(By.css('.list-cat'));
      expect(deArray.length).toBeGreaterThan(10);
    })
      .then(done);
  });

  it('sorts item by date respectively by amount', done => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      comp.sortBy = 'date';
      comp.sort();
      for (let i = 0; i < comp.data.length - 1; i++) {
        expect(+comp.data[i].date).toBeGreaterThanOrEqual(+comp.data[i + 1].date);
      }
        comp.sortBy = 'amount';
        comp.sort();
        for (let i = 0; i < comp.data.length - 1; i++) {
          //reversed because of negative amounts (sign is only reversed in html-template)
          expect(comp.data[i + 1].amount).toBeGreaterThanOrEqual(comp.data[i].amount)
        }      
    })
    .then(done);
  });

});
