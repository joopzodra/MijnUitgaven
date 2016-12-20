import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { OverviewPage } from '../pages/overview/overview';
import { OverviewPie } from '../pages/overview/pie/pie';
import { OverviewLine } from '../pages/overview/line/line';
import { ListPage } from '../pages/list/list';

@NgModule({
  declarations: [
    MyApp,
    OverviewPage,
    OverviewPie,
    OverviewLine,
    ListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OverviewPage,    
    ListPage
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  Storage
  ]
})
export class AppModule {}
