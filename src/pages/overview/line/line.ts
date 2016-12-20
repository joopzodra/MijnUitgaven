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
  .xAxis line {
    stroke:#000;
  }
  .xAxis text {
    text-anchor: middle;
    dominant-baseline: hanging;
  }
  `]
})
export class OverviewLine {

  data = [8, 15, 16, 23, 42, 14, 8, 15, 16, 23, 42, 14, 0 ];
  //data = [8, 15, 16, 23, 42];
  colors = ['#A60F2B', '#648C85', '#B3F2C9', '#528C18', '#C3F25C'];

  dataContainer: d3.Selection<d3.BaseType, {}, null, undefined>;
  paths: {d: string, fill: string}[] = [];
  //@Input() private data: Array<any>;

  margin = { top: 20, bottom: 20, left: 20, right: 20};
  width = 500;
  height = 500;

  timeRange: Date[];
  dataObjects: any; //specific typing results in conflicting d3 typing rules
  linePath: string;
  xTicksPaths: {x1: number, y1: number, x2: number, y2: number}[] = [];
  xLabels: {text: string, x: number, y: number}[] = [];
  yTicksPaths: {x1: number, y1: number, x2: number, y2: number}[] = [];

  constructor(public navCtrl: NavController) { }

  toList() {
    this.navCtrl.push(ListPage);
  }

  ngOnInit() {
    this.getTimeRange();
    this.constructDataObjects();
    this.drawDetachedChart();
    this.setPathData();
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

  drawDetachedChart() {

    let x = d3Scale.scaleTime()
    .domain([this.timeRange[0], this.timeRange[this.timeRange.length-1]])
    .range([0, this.width]);
    
    let y = d3Scale.scaleLinear()
    .domain([0, d3Array.max(this.data)])
    .range([this.height, 0])

    let line = d3Shape.line()
    .x(d => x(d['date']))
    .y(d => y(d['value']));

    let detachedContainer = document.createElement('detachedContainer');
    this.dataContainer = d3.select(detachedContainer);

    let path = this.dataContainer
    .append('customLine')
    .attr('class', 'path')
    .attr('d', line(this.dataObjects));

    this.xAxis(x);
  }

  setPathData() {
    let elements = this.dataContainer.selectAll('customLine.path');
    let that = this;

    elements.each(function(d, i) { 
      var node = d3.select(this);
      that.linePath = node.attr('d');
    })
  }

  xAxis(x) {
    let tickCount = this.dataObjects.length;
    let tickSize = 6;
    let ticks = x.ticks(tickCount);
    ticks.forEach((d,i) => this.xTicksPaths[i] = {x1: x(d), y1: this.height, x2: x(d), y2: this.height + tickSize});
    ticks.forEach((d,i) => this.xLabels[i] = {text: this.timeRange[i].getMonth().toString(), x: <number>x(d), y: this.height + tickSize});
    console.log(this.xLabels)
  }

}
