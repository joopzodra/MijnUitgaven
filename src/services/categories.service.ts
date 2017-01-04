import { Injectable } from '@angular/core';

import { SQLiteService } from './sqlite.service';

@Injectable()
export class CategoriesService {

  categories = [];
  subcategories: any[];

  constructor(private sqliteService: SQLiteService ) {
    let query = 'SELECT DISTINCT category FROM entries';
    this.sqliteService.query(query).then(results => this.setResults(results));
  }

  setResults(sqlResponse): void {
      let length = sqlResponse.res.rows.length;
      for (let i = 1; i < length; i++) {
        this.categories.push(sqlResponse.res.rows.item(i).category);
      }
      console.log(this.categories)
  }

}