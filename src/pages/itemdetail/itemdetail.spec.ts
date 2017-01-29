import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App, MenuController, NavController, Platform, Config, Keyboard, IonicModule, DomController, GestureController, Form } from 'ionic-angular'; //default testing components
import { By } from '@angular/platform-browser';
import { NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { ConfigMock } from '../../mocks';
import { ItemDetail } from './itemdetail';
import { EuroPipe } from '../../pipes/euro.pipe';
import { DatePipe } from '../../pipes/date.pipe';
import { SQLiteService } from '../../services/sqlite.service';
import { categoriesCsv } from '../../assets/categories-csv';
import { DbRowsJoined } from '../../datatypes/dbRowsJoined';

describe('ItemDetail', () => {

  let comp: ItemDetail;
  let fixture: ComponentFixture<ItemDetail>;
  let sqlService: SQLiteService;

  let entry: DbRowsJoined = { entryId: 2, date: "20150505", catId: 1, description: 'test', amount: 220.2, category: 'test', categoryId: 1, payment_method: 'test' };

  let categories: { key: number, value: string }[] = categoriesCsv.split('\n')
    .slice(1)
    .map((row, i) => {
      return { key: i + 1, value: row };
    });

  //fixed response; stub for SQLiteService.getByCatAndDate, for use in MockNavParams
  function getByCatAndDate(cat: number | number[], minDate: Date, maxDate: Date): Promise<DbRowsJoined[]> {
    return new Promise((resolve, reject) => window.setTimeout(() => resolve([entry]), 100));
  }

  class MockNavParams {
    dataSource = Observable.fromPromise(getByCatAndDate(1, new Date(), new Date()));
    data = { dataSource: this.dataSource, entryId: 2 };
    get(params) {
      return this.data[params];
    }
  }

  class MockSQLiteService {

    categoryChangedSource = new Subject<number>();

    getCategories(): Promise<Object> {
      let catObj = {};
      categories.forEach(item => catObj[item.key] = item.value)
      return new Promise((resolve, reject) => window.setTimeout(() => resolve(catObj), 100));
    }

    changeEntry(entryId: number, date: string, description: string, categoryId: number): void { }
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ItemDetail, EuroPipe, DatePipe],
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
        { provide: SQLiteService, useClass: MockSQLiteService },
        { provide: AlertController, useClass: ConfigMock }
      ],
      imports: [IonicModule],
    });

    fixture = TestBed.createComponent(ItemDetail);
    comp = fixture.componentInstance;
    sqlService = fixture.debugElement.injector.get(SQLiteService);
  });

  it('shows item', done => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css('.itemdetail-amount'));
      expect(de.nativeElement.textContent).toBe("-€ 220,20");
    })
      .then(done);
  });

  it('stores initial values so they can be used when the user cancels his input actions', done => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(comp.storedDescription).toEqual(comp.item.description);
      expect(comp.storedCatId).toEqual(comp.item.catId);
      comp.item.catId = 2;
      comp.item.description = 'testtest';
      expect(comp.storedDescription).toBe('test');
      expect(comp.storedCatId).toBe(1);
    })
      .then(done);
  });

});
