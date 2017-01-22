import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { OverviewPage } from '../pages/overview/overview';
import { Pie } from '../pages/overview/pie/pie';
import { Line } from '../pages/overview/line/line';
import { ListPage } from '../pages/list/list';
import { ItemDetail } from '../pages/itemdetail/itemdetail';

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
    ItemDetail,
    EuroPipe,
    DatePipe,
    MonthPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Terug'
    }),
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OverviewPage,    
    ListPage,
    ItemDetail
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  SQLiteService,
  ]   
})
export class AppModule {}
