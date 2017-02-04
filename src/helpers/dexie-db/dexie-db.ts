import Dexie from 'dexie';
import { Subject } from 'rxjs';

import { entriesCsv } from './entries-csv';
import { categoriesCsv } from './categories-csv';

//NB. If you want to start with a fresh database, clear the browser data before running the app


export class DexieDb extends Dexie {

  entryChangedSource = new Subject<{ date: string, categoryId: number }>();
  categoryChangedSource = new Subject<number>();

  private data = entriesCsv.split('\n')
    .map(row => row.split(';')).slice(1) //don't use the first row with labels
    .map(row => ({ date: row[1], amount: +row[2], payment_method: row[3], description: row[4], categoryId: +row[5] }));

  private cats = categoriesCsv.split('\n').slice(1) //don't use the first row with labels
    .map(cat => ({ category: cat }));

  entries: Dexie.Table<Entry, number>;
  categories: Dexie.Table<Category, number>;

  constructor() {
    super('MijnUitgaven');
    this.version(1).stores({
      entries: '++entryId, date, amount, payment_method, description, categoryId',
      categories: '++catId, category'
    });

    this.on('populate', () => {
      this.entries.bulkAdd(this.data);
      this.categories.bulkAdd(this.cats);
    });
  }

  getByCatAndDate(cat, minDate: Date, maxDate: Date) {

    if (typeof cat === 'number') {
      cat = [cat];
    }

    let min = this.dateToString(minDate);
    let max = this.dateToString(maxDate);

    return this.entries.where('date').between(min, max).filter(entry => cat.indexOf(entry.categoryId) !== -1).toArray(entries => {
      return Promise.all(entries.map(entry => {
        return this.categories.where('catId').equals(entry.categoryId).toArray()
          .then(result => {
            entry['catId'] = result[0].catId;
            entry['category'] = result[0].category;
            return entry;
          });
      }));
    });
  }

  getCategories() {

    return this.categories.where('catId').aboveOrEqual(0).toArray().then(res => {
      let catObj = {};
      let length = res.length;
      for (let i = 0; i < length; i++) {
        let item = res[i];
        catObj[item.catId] = item.category;
      }
      return catObj
    });
  }

  getItem(entryId) {

    return this.entries.where('entryId').equals(entryId).first(entry => {
      return this.categories.where('catId').equals(entry.categoryId).first(cat => {
        entry['catId'] = cat.catId;
        entry['category'] = cat.category;
        return entry;
      });
    });
  }

  changeEntry(entryId: number, date: string, description: string, categoryId: number): void {

    this.entries.update(entryId, { description: description, categoryId: categoryId })
      .then(response => {
        this.entryChangedSource.next({ date: date, categoryId: categoryId });
        //return response;
      });
  }

  changeCategory(catId: number, category: string): void {

    this.categories.update(catId, { category: category })
      .then(response => this.categoryChangedSource.next(catId));
  }

  dateToString(date: Date) {
    let iso = date.toISOString();
    return iso.slice(0, 4) + iso.slice(5, 7) + iso.slice(8, 10);
  }

}

export interface Entry {
  entryId?: number; // Primary key. Optional (autoincremented)
  date: string;
  amount: number;
  payment_method: string;
  description: string;
  categoryId: number
}

export interface Category {
  catId?: number; // Primary key. Optional (autoincremented)
  category: string
}
