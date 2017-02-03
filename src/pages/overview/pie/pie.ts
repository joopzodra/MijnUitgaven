import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import * as d3 from 'd3-selection';
import * as d3Shape from 'd3-shape';
import * as d3Time from 'd3-time';
import * as d3Collection from 'd3-collection';
import * as d3Array from 'd3-array';
import * as d3Format from 'd3-format';
import { BehaviorSubject } from 'rxjs';

import { SQLiteService } from '../../../services/sqlite.service';
import { colors } from '../../../helpers/chartcolors';
import { ListPage } from '../../list/list';
import { DbRowsJoined } from '../../../datatypes/dbRowsJoined';

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

  private dataSource = new BehaviorSubject<DbRowsJoined[]>([]);
  private rolledUpData: { key: string, value: number }[];
  private monthTotal: number;
  private allCats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]; //the database contains 18 categories

  private margin = { top: 20, bottom: 20, left: 20, right: 20 };
  private width = 500;
  private height = 500;
  private radius = Math.min(this.width, this.height) / 2;
  private detachedContainer: d3.Selection<d3.BaseType, {}, null, undefined>;

  private colorTable = colors;

  public paths: { d: string, fill: string }[] = [];
  public cats: {};
  public catsSource = new BehaviorSubject<{ [x: number]: string }>({});

  constructor(private navCtrl: NavController, private sqlite: SQLiteService, private platform: Platform) { }

  ngOnInit() {

    this.platform.ready().then(() => {

      this.month = this.ionicPreviousMonth;
      this.refreshDataAndPie(this.month);
      this.refreshCategories();

      this.sqlite.entryChangedSource.subscribe(message => {
        if (this.month === [message.date.slice(0, 4), message.date.slice(4, 6)].join('-')) {
          this.refreshDataAndPie(this.month);
        }
      },
        error => console.log('error: ' + error.message)
      );

      this.sqlite.categoryChangedSource.subscribe(catId => this.refreshCategories(),
        error => console.log('error: ' + error.message)
      );
    });

  }

  refreshDataAndPie(month) {
    this.getData(this.allCats, month)
      .then(() => {
        this.createDetachedPie();
        this.setPathsData();
      });
  }

  refreshCategories() {
    this.sqlite.getCategories().then(cats => {
      this.catsSource.next(cats);
      //when cats changes, also DbRowsJoined changes, so data needs to be refreshed because the changed category names are used in listpag
      this.refreshDataAndPie(this.month);
    });
  }

  //cat must be string in format like '(1)' or '(3,6,8,9)' etc.
  getData(cat: number | number[], month: string) {

    let minDate = new Date(Date.UTC(+month.split('-')[0], +month.split('-')[1] - 1)); //minus 1 because Date object is 0-based
    let maxDate = d3Time.timeMonth.offset(minDate, 1);

    let data = this.sqlite.getByCatAndDate(cat, minDate, maxDate)
      .then(response => {
        this.dataSource.next(response);
        return response;
      });

    return data.then(data => {
      return this.rolledUpData = d3Collection.nest()
        .key(dbRowsJoined => dbRowsJoined['categoryId'])
        .rollup(arrayCategoryDbRowsJoined => <any>d3Array.sum(arrayCategoryDbRowsJoined.map(obj => -obj['amount'])))//row[2] negative because amount is negative and in the list we want to work with positive values
        //.rollup(function(leaves) { return {"length": leaves.length, "total_time": d3.sum(leaves, function(d) {return parseFloat(d.time);})} })
        .entries(data)
        .sort((a, b) => d3Array.descending(a.value, b.value));
    })
      .then(rolledUpData => this.monthTotal = rolledUpData.reduce((a, b) => a + b.value, 0));
  }

  createDetachedPie() {

    let dataKeys = this.rolledUpData.map(dataObj => dataObj.key);
    let dataValues = this.rolledUpData.map(dataObj => dataObj.value);

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

    elements.each(function(data, i) {
      var node = d3.select(this);

      that.paths[i] = { d: node.attr('d'), fill: node.attr('fill') };
    })
  }

  toList(catId) {
    let dataSource = this.dataSource;
    let catsSource = this.catsSource;
    this.navCtrl.push(ListPage, { dataSource, catId, catsSource, month: this.month })
      .catch(err => console.log(err));
  }
}
