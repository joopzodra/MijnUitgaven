import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as d3 from 'd3-selection';
import * as d3Shape from 'd3-shape';
import * as d3Time from 'd3-time';
import * as d3Collection from 'd3-collection';
import * as d3Array from 'd3-array';
import * as d3Format from 'd3-format';

import { SQLiteService } from '../../../services/sqlite.service';
import { DataPushService } from '../../../services/data-push.service';
import { colors } from '../../../assets/chartcolors';

/*
* NB cat and cats is used as shorthand for category respectively categories
*/

@Component({
  selector: 'pie-chart',
  templateUrl: 'pie.html'
})

export class Pie {

  private currentDate = new Date(2016, 4, 31);
  private previousMonth = this.currentDate.getMonth() !== 0 ? d3Format.format('02')(this.currentDate.getMonth()) : '12';
  private previousMonthYear = this.currentDate.getMonth() !== 0 ? this.currentDate.getFullYear() : this.currentDate.getFullYear() - 1;
  private ionicPreviousMonth = [this.previousMonthYear.toString(), this.previousMonth].join('-');
  // In Ionic datetime string is 1-based: january = 1, february = 2, etc.
  // Ionic datetime string format: "2016-04"
  // d3.format("02")(4) fills space up to 2 digits using leading zero's (it returns a string)

  private month: string //Ionic datetime string

  private data: { key: string, value: number }[];
  private allCats = '(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19)'; //the database contains 18 categories

  private margin = { top: 20, bottom: 20, left: 20, right: 20 };
  private width = 500;
  private height = 500;
  private radius = Math.min(this.width, this.height) / 2;
  private detachedContainer: d3.Selection<d3.BaseType, {}, null, undefined>;
  paths: { d: string, fill: string }[] = [];
  cats: {};
  private colorTable = colors;

  private pushCategories: Subscription;


  constructor(private sqlite: SQLiteService, private dataPush: DataPushService) { }

  ngOnInit() {
    this.month = this.ionicPreviousMonth;
    this.refreshPie(this.month);
    this.sqlite.getCategories().then(cats => this.cats = cats);


    this.dataPush.pushCategories$.subscribe(() => {
      this.sqlite.getCategories().then(cats => this.cats = cats);

      console.log('de lijst verversen');

    })
  }

  refreshPie(month) {
    this.getData(this.allCats, month)
      .then(() => {
        this.createDetachedPie();
        this.setPathsData();
      });
  }

  //cat must be string in format like '(1)' or '(3,6,8,9)' etc.
  getData(cat, month): Promise<{ key: string, value: number }[]> {

    let minDate = new Date(+month.split('-')[0], +month.split('-')[1] - 1); //minus 1 because Date object is 0-based
    let maxDate = d3Time.timeMonth.offset(minDate, 1);

    return this.sqlite.getByCatAndDate(cat, minDate, maxDate)
      .then(response => {
        return this.data = d3Collection.nest()
          .key(dbRowsJoined => dbRowsJoined['categoryId'])
          .rollup(arrayCategoryDbRowsJoined => <any>d3Array.sum(arrayCategoryDbRowsJoined.map(obj => obj['amount'])))
          .entries(response)
          .sort((a, b) => d3Array.descending(a.value, b.value));
      });
  }

//TEMP >>> weghalen straks
  refreshCategories(){
    this.dataPush.pushCategoriesSource.next(1);
  }

  createDetachedPie() {

    let dataKeys = this.data.map(dataObj => dataObj.key);
    let dataValues = this.data.map(dataObj => dataObj.value);

    let arcs = d3Shape.pie()(dataValues);
    let arc = d3Shape.arc()
      .innerRadius(60)
      .outerRadius(this.radius);

    this.detachedContainer = d3.select(document.createElement('detachedContainer'));

    this.detachedContainer.selectAll('customPie')
      .data(arcs)
      .enter()
      .append('customPie')
      .attr('class', 'path')
      .attr('d', <any>arc)
      .attr('fill', (d, i) => colors[dataKeys[i]]);
  }

  setPathsData() {
    let elements = this.detachedContainer.selectAll('customPie');
    let that = this;
    that.paths = [];

    elements.each(function(d, i) {
      var node = d3.select(this);

      that.paths[i] = { d: node.attr('d'), fill: node.attr('fill') };
    })
  }

}
