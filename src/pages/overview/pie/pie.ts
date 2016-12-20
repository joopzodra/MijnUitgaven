import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as d3 from 'd3-selection';
import * as d3Shape from 'd3-shape';
import * as d3Scale from 'd3-scale';

import { ListPage } from '../../list/list';

@Component({
  selector: 'pie-chart',
  templateUrl: 'pie.html'
})
export class OverviewPie {

  margin = { top: 20, bottom: 20, left: 20, right: 20};
  width = 500;
  height = 300;
  radius = Math.min(this.width, this.height) / 2;
  //@Input() private data: Array<any>;
  data = [8, 15, 16, 23, 42];
  colors = ['#A60F2B', '#648C85', '#B3F2C9', '#528C18', '#C3F25C'];
  dataContainer: d3.Selection<d3.BaseType, {}, null, undefined>;
  paths: {d: string, fill: string}[] = [];

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
    this.drawCustomPie();
    this.setPathsData();
  }

  toList() {
    this.navCtrl.push(ListPage);
  }

  drawCustomPie() {
    let arcs = d3Shape.pie()(this.data);
    let arc = d3Shape.arc()
    .innerRadius(0)
    .outerRadius(this.radius);

    let detachedContainer = document.createElement('customContainer');
    this.dataContainer = d3.select(detachedContainer);

    let path = this.dataContainer.selectAll('customPie')
    .data(arcs)
    .enter()
    .append('customPie')
    .attr('class', 'path')
    .attr('d', <any>arc)
    .attr('fill', (d, i) => this.colors[i]);
  }

  setPathsData() {
    let elements = this.dataContainer.selectAll('customPie');
    let that = this;

    elements.each(function(d, i) { 
      var node = d3.select(this);

      that.paths[i]= {d: node.attr('d'), fill: node.attr('fill')};
    })
  }

}
