import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as d3 from 'd3-selection';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';
import * as d3Time from 'd3-time';
import * as d3TimeFormat from 'd3-time-format';
import * as d3Array from "d3-array";

import { ListPage } from '../../list/list';

@Component({
  selector: 'line-chart',
  templateUrl: 'line.html',
  styles: [`
  path {
    fill: none;
    stroke: steelblue;
    stroke-width: 2;
  }
  .xAxis line, .yAxis line {
    stroke:#000;
  }
  .xAxis text {
    text-anchor: middle;
  }
  .yAxis text {
    text-anchor: end;
  }
  `]
})
export class OverviewLine {

  data = [8, 15, 16, 23, 42, 14, 8, 15, 16, 23, 42, 14 ];
  colors = ['#A60F2B', '#648C85', '#B3F2C9', '#528C18', '#C3F25C'];

  dataContainer: d3.Selection<d3.BaseType, {}, null, undefined>;
  paths: {d: string, fill: string}[] = [];
  //@Input() private data: Array<any>;

  margin = { top: 20, bottom: 25, left: 30, right: 20};
  width = 500;
  height = 300;

  timeRange: Date[];
  dataObjects: any; //a specific typing results in conflicting d3 typing rules
  linePath: string;
  circles: {cx: number, cy: number, r: number }[] = [];

  xTicksPaths: {x1: number, y1: number, x2: number, y2: number}[] = [];
  xLabels: {text: string, x: number, y: number}[] = [];
  yTicksPaths: {x1: number, y1: number, x2: number, y2: number}[] = [];
  yLabels: {text: string, x: number, y: number}[] = [];

  constructor(public navCtrl: NavController) { }

  toList() {
    this.navCtrl.push(ListPage);
  }

  ngOnInit() {
    this.getTimeRange();
    this.constructDataObjects();
    this.drawDetachedChart();
    this.setPathAttr();
    this.setCircleAttr();
  }

  getTimeRange() {
    let start = new Date(2015, 0, 18);
    let end = d3Time.timeYear.offset(start, 1);
    let timeRange = d3Time.timeMonth.range(d3Time.timeMonth(start), d3Time.timeMonth.ceil(end));
    this.timeRange = timeRange;   
  }

  constructDataObjects() {
    this.dataObjects = this.data.map((d, i) => ({date: this.timeRange[i], value: d}));
  }

  //We want the line and x-axis ticks not to start from the y-axis, but shifted half a month width the right  
  shiftX(x) {
    return (x(this.dataObjects[1]['date']) - x(this.dataObjects[0]['date'])) / 2;
  }

  drawDetachedChart() {    

    let x = d3Scale.scaleTime()
    .domain([this.timeRange[0], this.timeRange[this.timeRange.length-1]])
    .range([0, this.width]);
    
    let y = d3Scale.scaleLinear()
    .domain([0, d3Array.max(this.data)])
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
    let elements = this.dataContainer.selectAll('customCircle'); console.log(elements)
    let that = this;

    elements.each(function(d, i) {
      var node = d3.select(this);
      that.circles[i] = {cx: +node.attr('cx'), cy: +node.attr('cy'), r: +node.attr('r')}
    })
  }

  xAxis(x, shiftX) {
    let tickCount = this.dataObjects.length;
    let tickSize = 6;
    let tickPadding = 15;
    let ticks = x.ticks(tickCount).slice(0, -1); //don't use last tick because we will shift ticks to the right;
    ticks.forEach((d,i) => this.xTicksPaths[i] = {x1: x(d) + shiftX, y1: this.height, x2: x(d) + shiftX, y2: this.height + tickSize});
    ticks.forEach((d,i) => this.xLabels[i] = {text: this.timeRange[i].getMonth().toString(), x: x(d) + shiftX, y: this.height + tickSize + tickPadding});
  }

  yAxis(y) {
    let tickCount = 6;
    let tickSize = 6;
    let tickPadding = 7;
    let baselineShift = 3
    let ticks = y.ticks(tickCount)
    ticks.forEach((d,i) => this.yTicksPaths[i] = {x1: -tickSize, y1: y(d), x2: 0, y2: y(d)});
    ticks.forEach((d,i) => this.yLabels[i] = {text: d.toString(), x: -tickSize - tickPadding, y: y(d) + baselineShift});
  }

}
