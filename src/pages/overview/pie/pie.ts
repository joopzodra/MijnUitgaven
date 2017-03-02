import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import * as d3 from 'd3-selection';
import * as d3Shape from 'd3-shape';
import * as d3Collection from 'd3-collection';
import * as d3Array from 'd3-array';
import * as d3Format from 'd3-format';
import { BehaviorSubject } from 'rxjs';

import { SQLiteService } from '../../../services/sqlite.service';
import { colors } from '../../../helpers/chartcolors';
import { ListPage } from '../../list/list';
import { IEntry } from '../../../datatypes/i-entry';

/*
* NB cat and cats is used as shorthand for category respectively categories
*/

@Component({
  selector: 'pie-chart',
  templateUrl: 'pie.html'
})

export class Pie {

  private currentDate = new Date(2016, 4, 31, 12);
  private currentMonth: string = d3Format.format('02')(this.currentDate.getMonth() + 1);
  private currentYear: string = this.currentDate.getFullYear().toString();

  // In Ionic datetime string is 1-based: january = 1, february = 2, etc.
  // Ionic datetime string format: "2016-04"
  // d3.format("02")(4) fills space up to 2 digits using leading zero's (it returns a string)
  private yearmonth: string = [this.currentYear, this.currentMonth].join('-'); //Ionic datetime string
  @Output() yearMonthMessage = new EventEmitter<string>();

  private dataSource = new BehaviorSubject<IEntry[]>([]);
  private rolledUpData: { key: string, value: number }[];
  private monthTotal: number;
  private allCats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]; //the database contains 18 categories

  private margin = { top: 20, bottom: 20, left: 20, right: 20 };
  private width = 500;
  private height = 500;
  private radius = Math.min(this.width, this.height) / 2;
  private detachedContainer: d3.Selection<d3.BaseType, {}, null, undefined>;

  private colorTable = colors;

  public paths: { d: string, fill: string, stroke: string }[] = [];
  public cats: {};
  public catsSource = new BehaviorSubject<{ [x: number]: string }>({});

  constructor(private navCtrl: NavController, private sqlite: SQLiteService, private platform: Platform) { }

  ngOnInit() {

    this.platform.ready().then(() => {

      this.refreshCategories();
      //this.refreshDataAndPie(this.month); //refreshCategories() already called refreshDataAndPie

      this.sqlite.entryChangedSource.subscribe(message => {
        if (this.yearmonth === [message.date.toString().slice(0, 4), message.date.toString().slice(4, 6)].join('-')) {
          this.refreshDataAndPie(this.yearmonth);
        }
      },
        error => console.log('error: ' + error.message)
      );

      this.sqlite.categoryChangedSource.subscribe(catId => this.refreshCategories(),
        error => console.log('error: ' + error.message)
      );
    });

  }

  private refreshDataAndPie(month) {

    this.yearMonthMessage.emit(month);

    this.getData(this.allCats, month)
      .then(() => {
        this.createDetachedPie();
        this.setPathsData();
      });
  }

  private refreshCategories() {
    this.sqlite.getCategories().then(cats => {
      this.catsSource.next(cats);
      //when cats changes, also IEntries changes, so data needs to be refreshed because the changed category names are used in listpag
      this.refreshDataAndPie(this.yearmonth);
    });
  }

  private getData(cat: number | number[], yearmonth: string) {

    let yearAndMonth = yearmonth.split('-');

    let minDate = yearAndMonth[0] + yearAndMonth[1] + '01';
    let maxDateYear = yearAndMonth[1] !== '12' ? yearAndMonth[0] : (+yearAndMonth[0] + 1).toString();
    let maxDateMonth = yearAndMonth[1] !== '12' ? d3Format.format('02')(+yearAndMonth[1] + 1) : '01'
    let maxDate = maxDateYear + maxDateMonth + '01';

    let data = this.sqlite.getByCatAndDate(cat, +minDate, +maxDate)
      .then(response => {
        this.dataSource.next(response);
        return response;
      });

    return data.then(data => {
      return this.rolledUpData = d3Collection.nest()
        .key(entry => entry['categoryId'])
        .rollup(arrayCategoryEntry => <any>d3Array.sum(arrayCategoryEntry.map(obj => obj['amount'])))
        .entries(data)
        .sort((a, b) => d3Array.descending(a.value, b.value));
    })
      .then(rolledUpData => this.monthTotal = rolledUpData.reduce((a, b) => a + b.value, 0));
  }

  private createDetachedPie() {

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
      .attr('fill', (d, i) => colors[dataKeys[i]])
      .attr('stroke', (d, i) => {return dataKeys[i] !== "0" ? colors[dataKeys[i]] : "#000"});
  }

  private setPathsData() {
    let elements = this.detachedContainer.selectAll('customPie');
    let that = this;
    that.paths = [];

    elements.each(function(data, i) {
      var node = d3.select(this);

      that.paths[i] = { d: node.attr('d'), fill: node.attr('fill'), stroke: node.attr('stroke') };
    })
  }

  private toList(catId) {
    let dataSource = this.dataSource;
    let catsSource = this.catsSource;
    this.navCtrl.push(ListPage, { dataSource, catId, catsSource, month: this.yearmonth })
      .catch(err => console.log(err));
  }

}
