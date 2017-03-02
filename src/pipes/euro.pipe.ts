import { Pipe, PipeTransform } from '@angular/core';

import * as d3Format from 'd3-format';

@Pipe({ name: 'euro' })
export class EuroPipe implements PipeTransform {

  nl = d3Format.formatLocale({
    decimal: ',',
    thousands: '.',
    grouping: [3],
    currency: ['€ ', '']
  });

  public transform(value: number): string {
    return this.nl.format("$.2f")(value);
  }

}
