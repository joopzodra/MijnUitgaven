import Dexie from 'dexie';
import { Subject } from 'rxjs';

import { entriesCsv } from './entries-csv';
import { categoriesCsv } from './categories-csv';

interface IEntry {
  entryId?: number; // Primary key. Optional (autoincremented)
  date: number;
  amount: number;
  payment_method: string;
  description: string;
  categoryId: number
}

interface ICategory {
  catId: number; // Primary key. Optional (autoincremented)
  category: string
}

//NB. If you want to start with a fresh database, clear the browser data before running the app

export class DexieDb extends Dexie {

  entryChangedSource = new Subject<{ date: string, categoryId: number }>();
  categoryChangedSource = new Subject<number>();

  private data = entriesCsv.split('\n')
    .map(row => row.split(';')).slice(1) //don't use the first row with labels
    .map(row => ({ date: +row[1], amount: +row[2], payment_method: row[3], description: row[4], categoryId: +row[5] }));

  private cats = categoriesCsv.split('\n')
    .map(row => row.split(';')).slice(1) //don't use the first row with labels
    .map(cat => ({ catId: +cat[0], category: cat[1] }));

  entries: Dexie.Table<IEntry, number>;
  categories: Dexie.Table<ICategory, number>;

  constructor() {
    super('MijnUitgaven');
    this.version(1).stores({
      entries: '++entryId, date, amount, payment_method, description, categoryId',
      categories: 'catId, category'
    });

    this.on('populate', () => {
      this.entries.bulkAdd(this.data);
      this.categories.bulkAdd(this.cats);
    });
  }

  getByCatAndDate(cat, minDate: number, maxDate: number) {

    if (typeof cat === 'number') {

      return this.entries.where('date').between(minDate, maxDate)
      .filter(entry => entry.categoryId === cat)
      .toArray()
      .catch(err => console.log(err))
    }

    return this.entries.where('date').between(minDate, maxDate).toArray()
    .catch(err => console.log(err));
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
    })
    .catch(err => console.log(err));
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

}
