import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule }   from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SQLite } from 'ionic-native';

import { MyApp } from './app.component';
import { OverviewPage } from '../pages/overview/overview';
import { Pie } from '../pages/overview/pie/pie';
import { Line } from '../pages/overview/line/line';
import { ListPage } from '../pages/list/list';
import { EntryComp } from '../pages/entry/entry';
import { ChangeCategoriesPage } from '../pages/change-categories/change-categories';
import { AboutPage } from '../pages/about/about';
import { ColoredBorderDirective } from '../helpers/colored-border.directive';

import { EuroPipe } from '../pipes/euro.pipe';
import { DatePipe } from '../pipes/date.pipe';
import { MonthPipe } from '../pipes/date.pipe';

import { SQLiteService } from '../services/sqlite.service';

@NgModule({
  declarations: [
    MyApp,
    OverviewPage,
    Pie,
    Line,
    ListPage,
    EntryComp,
    ChangeCategoriesPage,
    EuroPipe,
    DatePipe,
    MonthPipe,
    AboutPage,
    ColoredBorderDirective
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Terug'
    }),
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OverviewPage,    
    ListPage,
    EntryComp,
    ChangeCategoriesPage,
    AboutPage
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  SQLiteService,
  SQLite
  ]   
})
export class AppModule {}
