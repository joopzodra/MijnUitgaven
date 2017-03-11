import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App, MenuController, NavController, Platform, Config, Keyboard, IonicModule, DomController, GestureController, Form } from 'ionic-angular'; //default testing components
import { By } from '@angular/platform-browser';
import { NavParams, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { ConfigMock } from '../../mocks';
import { EntryComp } from './entry';
import { EuroPipe } from '../../pipes/euro.pipe';
import { DatePipe } from '../../pipes/date.pipe';
import { SQLiteService } from '../../services/sqlite.service';
import { categoriesCsv } from '../../helpers/dexie-db/categories-csv';
import { IEntry } from '../../datatypes/i-entry';
import { ColoredBorderDirective } from '../../helpers/colored-border.directive';

describe('Entry page', () => {

  let comp: EntryComp;
  let fixture: ComponentFixture<EntryComp>;
  let sqlService: SQLiteService;

  let entry: IEntry = { entryId: 2, date: 20150505, description: 'test', amount: 220.2, categoryId: 1, payment_method: 'test' };

  let categories: { key: number, value: string }[] = categoriesCsv.split('\n')
    .slice(1)
    .map((row, i) => {
      return { key: i + 1, value: row };
    });

  class MockNavParams {
    get(entryId) {
      return 2;
    }
  }

  class MockSQLiteService {

    categoryChangedSource = new Subject<number>();

    getEntry(){
      return Promise.resolve(entry);
    }

    getCategories(): Promise<Object> {
      let catObj = {};
      categories.forEach(item => catObj[item.key] = item.value)
      return new Promise((resolve, reject) => window.setTimeout(() => resolve(catObj), 100));
    }
  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [EntryComp, EuroPipe, DatePipe, ColoredBorderDirective],
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

    fixture = TestBed.createComponent(EntryComp);
    comp = fixture.componentInstance;
    sqlService = fixture.debugElement.injector.get(SQLiteService);
  });

  it('shows item', done => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let de = fixture.debugElement.query(By.css('.entry-amount'));
      expect(de.nativeElement.textContent).toBe("€ 220,20");
    })
      .then(done);
  });

  it('entryForm contains correct properties', done => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let form = comp['entryForm'];
      expect(form.get('amount').value).toBe('220.20');
      expect(form.get('date').value).toBe('2015-05-05');
      expect(form.get('categoryId').value).toBe(1);
    })
      .then(done);
  });    

});
