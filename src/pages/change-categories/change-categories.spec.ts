import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App, MenuController, NavController, Platform, Config, Keyboard, IonicModule, DomController, GestureController, Form } from 'ionic-angular'; //default testing components
import { AlertController } from 'ionic-angular';
import { Subject } from 'rxjs';

import { ConfigMock } from '../../mocks';
import { SQLiteService } from '../../services/sqlite.service';
import { categoriesCsv } from '../../helpers/dexie-db/categories-csv';
import { ChangeCategoriesPage } from './change-categories';

describe('ChangeCategoriesPage', () => {

  let comp: ChangeCategoriesPage;
  let fixture: ComponentFixture<ChangeCategoriesPage>;
  let sqlService: SQLiteService;

  let categories: { key: number, value: string }[] = categoriesCsv.split('\n')
    .slice(1)
    .map((row, i) => {
      return { key: i + 1, value: row };
    });

  class MockSQLiteService {

    categoryChangedSource = new Subject<number>();

    getCategories(): Promise<Object> {
      let catObj = {};
      categories.forEach(cat => catObj[cat.key] = cat.value)
      return new Promise((resolve, reject) => window.setTimeout(() => resolve(catObj), 100));
    }

    changeCategory(catId: number, category: string): void {
      let catToChange = categories.filter(cat => cat.key === catId)[0]
      catToChange.value = category;
    }

  }

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ChangeCategoriesPage],
      providers: [
        DomController,
        Form,
        AlertController,
        { provide: App, useClass: ConfigMock },
        { provide: Config, useClass: ConfigMock },
        { provide: Keyboard, useClass: ConfigMock },
        { provide: MenuController, useClass: ConfigMock },
        { provide: NavController, useClass: ConfigMock },
        { provide: Platform, useClass: ConfigMock },
        { provide: DomController, useFactory: ConfigMock },
        { provide: GestureController, useClass: ConfigMock },
        { provide: SQLiteService, useClass: MockSQLiteService }
      ],
      imports: [IonicModule],
    });

    fixture = TestBed.createComponent(ChangeCategoriesPage);
    comp = fixture.componentInstance;
    sqlService = fixture.debugElement.injector.get(SQLiteService);
  });

//no tests since testing the AlertControl, which is used inside the showPromptAlert method, is too complicated

});
