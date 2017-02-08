import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import * as d3 from 'd3-selection';
import * as d3Shape from 'd3-shape';
import * as d3Time from 'd3-time';
import * as d3Collection from 'd3-collection';
import * as d3Array from 'd3-array';
import * as d3Format from 'd3-format';
import * as d3Scale from 'd3-scale';
import { BehaviorSubject } from 'rxjs';

import { SQLiteService } from '../../../services/sqlite.service';
import { colors } from '../../../helpers/chartcolors';
import { ListPage } from '../../list/list';
import { DbRowsJoined } from '../../../datatypes/dbRowsJoined';

@Component({
  selector: 'line-chart',
  templateUrl: 'line.html'
})
export class Line {

  private currentDate = new Date(2016, 4, 31);
  private previousMonth: string = this.currentDate.getMonth() !== 0 ? d3Format.format('02')(this.currentDate.getMonth()) : '12';
  private previousMonthYear: string = this.currentDate.getMonth() !== 0 ? this.currentDate.getFullYear().toString() : (this.currentDate.getFullYear() - 1).toString();

  // In Ionic datetime string is 1-based: january = 1, february = 2, etc.
  // Ionic datetime string format: "2016-04"
  // d3.format("02")(4) fills space up to 2 digits using leading zero's (it returns a string)
  private yearmonth: string = [this.previousMonthYear, this.previousMonth].join('-'); //Ionic datetime string

  private dataSource = new BehaviorSubject<DbRowsJoined[]>([]);
  private rolledUpData: any[];
  private monthTotal: number;
  private allCats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]; //the database contains 18 categories

  margin = { top: 20, bottom: 25, left: 60, right: 20 };
  width = 500;
  height = 300;
  private detachedContainer: d3.Selection<d3.BaseType, {}, null, undefined>;

  private colorTable = colors;

  data = [8, 15, 16, 23, 42, 14, 8, 15, 16, 23, 42, 14];

  dataContainer: d3.Selection<d3.BaseType, {}, null, undefined>;
  //paths: { d: string, fill: string }[] = [];

  timeRange: string[];
  dataObjects: any; //a specific typing results in conflicting d3 typing rules
  linePath: string;
  circles: { cx: number, cy: number, r: number }[] = [];

  xTicksPaths: { x1: number, y1: number, x2: number, y2: number }[] = [];
  xLabels: { text: string, x: number, y: number }[] = [];
  yTicksPaths: { x1: number, y1: number, x2: number, y2: number }[] = [];
  yLabels: { text: string, x: number, y: number }[] = [];

  show = false;

  constructor(private navCtrl: NavController, private platform: Platform, private sqlite: SQLiteService) { }

  toList() {
    this.navCtrl.push(ListPage);
  }

  ngOnInit() {

    this.timeRange = this.getSixMonthArray(this.yearmonth);

    this.platform.ready().then(() => {

      this.getData(this.allCats, this.yearmonth)
        .then(() => {
          this.drawDetachedChart();
          this.setPathAttr();
          this.setCircleAttr();
          this.show = true; console.log(this.dataObjects)

        })
        .catch(err => console.log(err));
    });
  }

  getSixMonthArray(yearmonth) {

    let yearAndMonth = yearmonth.split('-');
    let year = yearAndMonth[0];
    let month = yearAndMonth[1];
    let monthArray = [year + month];
    month = +month;
    year = +year;

    let i = 0
    while (i < 5) {
      if (month !== 1) {
        month = month - 1;
        let previousMonth = d3Format.format('02')(month);
        monthArray.unshift(year.toString() + previousMonth);
        i++;
      }
      else {
        month = 12;
        year = year - 1;
        monthArray.unshift(year.toString() + month.toString());
        i++;
      }
    }

    return monthArray
  }

  getData(cat: number | number[], yearmonth: string) {

    let minDate = this.timeRange[0] + '01';
    let maxDate = this.timeRange[this.timeRange.length - 1] + '32'; //we want to search till the end of the maxDate month; databases search dates lower than maxdate, so lower than something like "20160432"

    let data = this.sqlite.getByCatAndDate(cat, minDate, maxDate)
      .then(response => {
        this.dataSource.next(response);
        return response;
      });

    return data.then(data => {
      let rolledUpData = d3Collection.nest()
        .key(dbRowsJoined => dbRowsJoined['date'].slice(0, 6))
        .rollup(arrayCategoryDbRowsJoined => <any>d3Array.sum(arrayCategoryDbRowsJoined.map(obj => -obj['amount'])))
        .entries(data);

      return this.dataObjects = rolledUpData.map((d, i) => ({ date: this.timeRange[i], value: d.value }))
    })
  }

  //We want the line and x-axis ticks not to start from the y-axis, but shifted half a month width the right  
  shiftX(x) {
    return (x(this.dataObjects[1]['date']) - x(this.dataObjects[0]['date'])) / 2;
  }

  drawDetachedChart() {

    let x = d3Scale.scaleBand()
      .domain(this.timeRange)
      .rangeRound([0, this.width]);

    let values = this.dataObjects.map(d => d.value);
    let y = d3Scale.scaleLinear()
      .domain([0, d3Array.max(values)])
      .range([this.height, 0]);

    let shiftX = this.shiftX(x);

    let detachedContainer = document.createElement('detachedContainer');
    this.dataContainer = d3.select(detachedContainer);

    //line
    let line = d3Shape.line()
      .x(d => x(d['date']) + shiftX)
      .y(d => y(d['value']));

    this.dataContainer
      .append('customLine')
      .attr('d', line(this.dataObjects));

    //cirles
    this.dataContainer.selectAll('customCircle')
      .data(this.dataObjects)
      .enter()
      .append('customCircle')
      .attr('cx', d => x(d['date']) + shiftX)
      .attr('cy', d => y(d['value']))
      .attr('r', 8);


    this.xAxis(x, shiftX);
    this.yAxis(y);
  }

  setPathAttr() {
    let elements = this.dataContainer.selectAll('customLine');
    let that = this;

    elements.each(function(d, i) {
      var node = d3.select(this);
      that.linePath = node.attr('d');
    })
  }

  setCircleAttr() {
    let elements = this.dataContainer.selectAll('customCircle');
    let that = this;

    elements.each(function(d, i) {
      var node = d3.select(this);
      that.circles[i] = { cx: +node.attr('cx'), cy: +node.attr('cy'), r: +node.attr('r') }
    })
  }

  xAxis(x, shiftX) {
    let tickCount = this.dataObjects.length;
    let tickSize = 6;
    let tickPadding = 15;
    let ticks = this.timeRange; //don't use last tick because we will shift ticks to the right;
    ticks.forEach((d, i) => this.xTicksPaths[i] = { x1: x(d) + shiftX, y1: this.height, x2: x(d) + shiftX, y2: this.height + tickSize });
    ticks.forEach((d, i) => this.xLabels[i] = { text: d, x: x(d) + shiftX, y: this.height + tickSize + tickPadding });
  }

  yAxis(y) {
    let tickCount = 6;
    let tickSize = 6;
    let tickPadding = 7;
    let baselineShift = 3
    let ticks = y.ticks(tickCount)
    ticks.forEach((d, i) => this.yTicksPaths[i] = { x1: -tickSize, y1: y(d), x2: 0, y2: y(d) });
    ticks.forEach((d, i) => this.yLabels[i] = { text: d.toString(), x: -tickSize - tickPadding, y: y(d) + baselineShift });
  }

}
