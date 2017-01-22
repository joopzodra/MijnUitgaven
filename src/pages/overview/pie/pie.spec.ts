import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { App, MenuController, NavController, Platform, Config, Keyboard, IonicModule, DomController, Form, GestureController } from 'ionic-angular';
import { ConfigMock, FormMock, NavMock, PlatformMock, MenuMock, DomControllerMock } from '../../../mocks';

import { Pie } from './pie';
import { MonthPipe } from '../../../pipes/date.pipe';
import { EuroPipe } from '../../../pipes/euro.pipe';
import { SQLiteService } from '../../../services/sqlite.service';
import { entriesCsv } from '../../../assets/entries-csv';
import { categoriesCsv } from '../../../assets/categories-csv';
import { DbRowsJoined } from '../../../datatypes/dbRowsJoined';


describe('Pie', () => {

  let comp: Pie;
  let fixture: ComponentFixture<Pie>;
  let sqlService: SQLiteService;

  class MockSQLiteService {

    entries = entriesCsv.split('\n')
      .map(row => row.split(';'))
      .slice(1, 200) //don't use the first row with labels
      .map(row => ({ entryId: row[0], date: row[1], amount: -row[2], payment_method: row[3], description: row[4], categoryId: row[5] }));

    categories: { key: number, value: string }[] = categoriesCsv.split('\n')
      .slice(1)
      .map((row, i) => {
        return { key: i + 1, value: row };
      });

    //always the same response; it doesn't test category and date, since this is tested in sqlite.service.spec
    getByCatAndDate(cat, minDate, maxDate): Promise<DbRowsJoined[]> {
      //simulate inner join entries and categories
      let arr = this.entries.map(entry => entry);
      arr.forEach(entry => {
        entry['catId'] = entry['categoryId'];
        entry['category'] = this.categories.filter(cat =>
          cat.key === +entry['catId'])[0].value;
      });

      return new Promise((resolve, reject) => window.setTimeout(() => resolve(arr), 100));
    }

    getCategories(): Promise<Object> {
      let catObj = {};
      this.categories.forEach(item => catObj[item.key] = item.value)
      return new Promise((resolve, reject) => window.setTimeout(() => resolve(catObj), 100));
    }
  }

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [Pie, MonthPipe, EuroPipe],
      providers: [
        Form,
        { provide: App, useClass: ConfigMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Keyboard, useClass: ConfigMock },
        { provide: GestureController, useClass: ConfigMock },
        { provide: MenuController, useClass: ConfigMock },
        { provide: NavController, useClass: NavMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: DomController, useClass: DomControllerMock },
        { provide: SQLiteService, useClass: MockSQLiteService }
      ],
      imports: [IonicModule],
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pie);
    comp = fixture.componentInstance;
    sqlService = fixture.debugElement.injector.get(SQLiteService);

  });

  it('mockSqlite methods are o.k.', done => {

    let entries = sqlService.getByCatAndDate('fake', new Date(), new Date()).then(res => {
      expect(res.length).toBeGreaterThan(10);
      expect(typeof res[0].category).toBe('string');
    });

    let cats = sqlService.getCategories().then(res => {
      expect(res[1]).toEqual('woonlasten');
      expect(res[18]).toEqual('overige');
    });

    Promise.all([entries, cats]).then(() => done());
  })

  it('on init paths array contains several elements and cats object is not empty', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(comp.paths.length).toBeGreaterThan(3);
      expect(Object.keys(comp.cats).length).toEqual(18);
    })
  }))

  it('on init there is an svg pie with a reasonable width and heigth with several slices', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const dePath = fixture.debugElement.nativeElement.querySelector('path');
      expect(dePath).not.toBe(null);
      const dePaths = fixture.debugElement.nativeElement.querySelectorAll('path');
      expect(dePaths.length).toBeGreaterThan(3);
      const deSvg = fixture.debugElement.nativeElement.querySelector('svg');
      expect(deSvg.clientWidth).toBeGreaterThan(50);
      expect(deSvg.clientHeight).toBeLessThan(1000);
    })
  }));

  /*
    it('should display 0 as initial value', () => {
      fixture.detectChanges();
      const h2 = fixture.debugElement.query(By.css('h2'));
      expect(h2.nativeElement.textContent).toEqual('Value: 0');
    });
  
    it('should increment the value', () => {
      fixture.componentInstance.onIncrementClick();
      fixture.detectChanges();
      const h2 = fixture.debugElement.query(By.css('h2'));
      expect(h2.nativeElement.textContent).toEqual('Value: 1');
    });
  
    it('should invoke onIncrementClick when the user clicks the increment button', () => {
      spyOn(fixture.componentInstance, 'onIncrementClick');
      const button = fixture.debugElement.query(By.css('.increment'));
      button.triggerEventHandler('click', {});
      expect(fixture.componentInstance.onIncrementClick).toHaveBeenCalled();
    });*/

});

