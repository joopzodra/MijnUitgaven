import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { OverviewPage } from '../pages/overview/overview';
import { OverviewPie } from '../pages/overview/pie/pie';
import { OverviewLine } from '../pages/overview/line/line';
import { ListPage } from '../pages/list/list';
import { DbTestPage } from '../pages/dbtest/dbtest';
import { SQLiteService } from '../services/sqlite.service';

@NgModule({
  declarations: [
    MyApp,
    OverviewPage,
    OverviewPie,
    OverviewLine,
    ListPage,
    DbTestPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OverviewPage,    
    ListPage,
    DbTestPage
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  SQLiteService
  ]
})
export class AppModule {}
