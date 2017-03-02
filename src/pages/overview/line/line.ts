import { Component, Input, OnChanges } from '@angular/core';
import { Platform } from 'ionic-angular';
import * as d3 from 'd3-selection';
import * as d3Shape from 'd3-shape';
import * as d3Collection from 'd3-collection';
import * as d3Array from 'd3-array';
import * as d3Format from 'd3-format';
import * as d3Scale from 'd3-scale';
import { BehaviorSubject } from 'rxjs';

import { SQLiteService } from '../../../services/sqlite.service';
/*import { colors } from '../../../helpers/chartcolors';*/
import { IEntry } from '../../../datatypes/i-entry';

@Component({
  selector: 'line-chart',
  templateUrl: 'line.html'
})
export class Line {

  // In Ionic datetime string is 1-based: january = 1, february = 2, etc.
  // Ionic datetime string format: "2016-04"
  @Input() yearmonth: string;

  private dataSource = new BehaviorSubject<IEntry[]>([]);
  private allCats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]; //the database contains 18 categories

  private margin = { top: 20, bottom: 25, left: 60, right: 20 };
  private width = 500;
  private height = 300;

  private dataContainer: d3.Selection<d3.BaseType, {}, null, undefined>;
  private //paths: { d: string, fill: string }[] = [];

  private timeRange: { yearMonth: string, monthName: string, year: string }[];
  private dataObjects: any; //a specific typing results in conflicting d3 typing rules
  private linePath: string;
  private circles: { cx: number, cy: number, r: number }[] = [];

  private xTicksPaths: { x1: number, y1: number, x2: number, y2: number }[] = [];
  private xLabels: { text: string, x: number, y: number }[] = [];
  private yTicksPaths: { x1: number, y1: number, x2: number, y2: number }[] = [];
  private yLabels: { text: string, x: number, y: number }[] = [];

  constructor(private platform: Platform, private sqlite: SQLiteService) { }

  ngOnChanges(changes) {

    if (changes.yearmonth.currentValue) {

      this.timeRange = this.sixMonthArray(this.yearmonth);

      this.platform.ready().then(() => {

        this.getData(this.allCats, this.yearmonth)
          .then(() => {
            this.drawDetachedChart();
            this.setPathAttr();
            this.setCircleAttr();
          })
          .catch(err => console.log(err));
      });
    }
  }

  private sixMonthArray(yearmonth) {

    let yearAndMonth = yearmonth.split('-');
    let yearString = yearAndMonth[0];
    let monthString = yearAndMonth[1];
    let month = +monthString;
    let year = +yearString;

    function monthToName(month: number): string {
      return ['jan', 'feb', 'mrt', 'apr', 'mei', 'juni', 'juli', 'aug', 'sept', 'okt', 'nov', 'dec'].filter((d, i) => i + 1 === month)[0]
    }

    let monthArray = [{ yearMonth: yearString + monthString, monthName: monthToName(month), year: yearString }];

    [1, 2, 3, 4, 5].forEach(n => {
      let mon = n < month ? month - n : 12 - n + month;
      let y = n < month ? year : year - 1;
      let yearMonthString = y.toString() + d3Format.format('02')(mon);
      monthArray.unshift({ yearMonth: yearMonthString, monthName: monthToName(mon), year: y.toString() });
    })

    return monthArray
  }

  private getData(cat: number | number[], yearmonth: string) {

    let minDate = this.timeRange[0].yearMonth + '01';
    let maxDate = this.timeRange[this.timeRange.length - 1].yearMonth + '32'; //we want to search till the end of the maxDate month; databases search dates lower than maxdate, so lower than something like "20160432"

    let data = this.sqlite.getByCatAndDate(cat, +minDate, +maxDate)
      .then(response => {
        this.dataSource.next(response);
        return response;
      });

    let rolledUpData = [];

    return data.then(data => {


      let rolledUpData = d3Collection.nest()
        .key(entry => entry['date'].toString().slice(0, 6))
        .rollup(arrayCategoryEntry => <any>d3Array.sum(arrayCategoryEntry.map(obj => obj['amount'])))
        .entries(data);

      return this.dataObjects = this.timeRange.map((date,i) => {
        let monthRolledUp = rolledUpData.filter(data => data.key === date.yearMonth)[0];
        return monthRolledUp ? {date: monthRolledUp.key, value: monthRolledUp.value} : {date: date.yearMonth, value: 0}; 
      });
    });
  }

  //We want the line and x-axis ticks not to start from the y-axis, but shifted half a month width the right  
  private shiftX(x) {
    return (x(this.dataObjects[1]['date']) - x(this.dataObjects[0]['date'])) / 2;
  }

  private drawDetachedChart() {

    let x = d3Scale.scaleBand()
      .domain(this.timeRange.map((m) => m.yearMonth))
      .rangeRound([0, this.width]);

    let values = this.dataObjects.map(d => d.value);
    let y = d3Scale.scaleLinear()
      .domain([0, d3Array.max(values)])
      .nice()
      .range([this.height, 0]);

    let shiftX = this.shiftX(x);

    this.dataContainer = d3.select(document.createElement('detachedContainer'));

    let line = d3Shape.line()
      .curve(d3Shape.curveCardinal.tension(0.5))
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

  private setPathAttr() {
    let elements = this.dataContainer.selectAll('customLine');
    let that = this;

    elements.each(function(d, i) {
      var node = d3.select(this);
      that.linePath = node.attr('d');
    })
  }

  private setCircleAttr() {
    let elements = this.dataContainer.selectAll('customCircle');
    let that = this;

    elements.each(function(d, i) {
      var node = d3.select(this);
      that.circles[i] = { cx: +node.attr('cx'), cy: +node.attr('cy'), r: +node.attr('r') }
    })
  }

  private xAxis(x, shiftX) {
    let tickSize = 6;
    let tickPadding = 15;
    let ticks = this.timeRange; //don't use last tick because we will shift ticks to the right;
    this.xTicksPaths = [];
    this.xLabels = [];
    ticks.forEach((d, i) => this.xTicksPaths[i] = { x1: x(d.yearMonth) + shiftX, y1: this.height, x2: x(d.yearMonth) + shiftX, y2: this.height + tickSize });
    ticks.forEach((d, i) => this.xLabels[i] = { text: d.monthName, x: x(d.yearMonth) + shiftX, y: this.height + tickSize + tickPadding });
  }

  private yAxis(y) {
    let tickCount = 6;
    let tickSize = 6;
    let tickPadding = 7;
    let baselineShift = 3;
    let ticks = y.ticks(tickCount);
    this.yTicksPaths = [];
    this.yLabels = [];
    ticks.forEach((d, i) => this.yTicksPaths[i] = { x1: 0, y1: y(d), x2: this.width, y2: y(d) });
    ticks.forEach((d, i) => this.yLabels[i] = { text: '€ ' + d.toString(), x: -tickSize - tickPadding, y: y(d) + baselineShift });
  }

}
