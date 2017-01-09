import { Injectable } from '@angular/core';

import { SQLiteService } from './sqlite.service';

@Injectable()
export class CategoriesService {

  categories: Promise<{ cat: string, subcats: string[] }[]>;

  constructor(private sqliteService: SQLiteService) {

    let query1 = 'SELECT DISTINCT category FROM entries';
    let query2 = 'SELECT DISTINCT subcategory FROM entries WHERE category=?';
    let categories: string[];

    this.categories = this.sqliteService.query(query1)
      .then(sqlResponse => {
        return categories = this.setCategories(sqlResponse);
      })
      .then((categories) => {
        return Promise.all(categories.map((cat) => this.sqliteService.query(query2, [cat])))
      })
      .then(sqlResponse => {
        return sqlResponse.map((subcats, i) => ({ cat: categories[i], subcats: this.setSubcategories(subcats)}))
      });
  }

  private setCategories(sqlResponse): string[] {
    let length = sqlResponse.res.rows.length;
    let categories = [];
    for (let i = 0; i < length; i++) {
      categories.push(sqlResponse.res.rows.item(i).category);
    }
    return categories = categories.filter(cat => cat !== '');
  }

  private setSubcategories(sqlResponse): string[] {
    let length = sqlResponse.res.rows.length;
    let subcats = [];
    for (let i = 0; i < length; i++) {
      subcats.push(sqlResponse.res.rows.item(i).subcategory);
    }
    return subcats = subcats.map(subcat => subcat !== '' ? subcat : '– –')
  }

}