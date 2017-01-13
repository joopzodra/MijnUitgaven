import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataPushService {

  //streaming sources
  pushCategoriesSource = new Subject<number>(); //sent catId, in order for client to decide wether it's data should be updated

  //streams
  pushCategories$ = this.pushCategoriesSource.asObservable();

  //push the stream
/*  pushCategories() {
    this.categoriesSource.next(true)
  }*/
}
