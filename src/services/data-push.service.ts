import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { SQLiteService } from './sqlite.service';

@Injectable()
export class DataPushService {

  constructor(private sqlite: SQLiteService) {}

  pieDataSource = new Subject();

/*  pieData(cat, minDate, maxDate) = this.sqlite.getByCatAndDate(cat, minDate, maxDate)
      .then(response => this.data = response);*/

  //streaming sources
  pushCategoriesSource = new Subject<number>(); //sent catId, in order for client to decide wether it's data should be updated

  //streams
  pushCategories$ = this.pushCategoriesSource.asObservable();

  //push the stream
/*  pushCategories() {
    this.categoriesSource.next(true)
  }*/
}
