import { Pipe, PipeTransform } from '@angular/core';

import * as d3TimeFormat from 'd3-time-format';

@Pipe({name: 'date'})
export class DatePipe implements PipeTransform {

  nl = d3TimeFormat.timeFormatLocale({
    dateTime: '%e %B %Y',
    date: '%e %B %Y',
    time: '%H %M',
    periods: ['AM', 'PM'],
    days: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
    shortDays: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
    months: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
    shortMonths: ['jan', 'feb', 'mrt', 'apr', 'mei', 'juni', 'juli', 'aug', 'sept', 'okt', 'nov', 'dec']
  });

  transform(value: string): string {

    let year = +value.slice(0, 4);
    let month = +value.slice(4,6) - 1;
    let day = +value.slice(6);
    let date = new Date(year, month, day);
    return this.nl.format('%e %B %Y') (date);
  };

}
