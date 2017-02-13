import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

import { colors } from './chartcolors';

@Directive({
  selector: '[myColoredBorder]'
})
export class coloredBorderDirective {

  @Input('myColoredBorder') categoryId: string;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.el.nativeElement.style.border = +this.categoryId !== 0 ? "1px solid " + colors[+this.categoryId] : "1px solid #000";
  }

}
