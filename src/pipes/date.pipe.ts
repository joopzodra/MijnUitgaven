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

    if (!value) return;

    let year = +value.toString().slice(0, 4);
    let month = +value.toString().slice(4,6) - 1;
    let day = +value.toString().slice(6);
    let date = new Date(year, month, day);
    return this.nl.format('%e %B %Y') (date);
  };
}

@Pipe({name: 'month'})
export class MonthPipe implements PipeTransform {

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

    if (!value) return;

    let year = +value.split('-')[0];
    let month = +value.split('-')[1] - 1; //Ionic datetime string is 1-based but Date object is 0-based
    let yearMonth = new Date(year, month);
    return this.nl.format('%B %Y') (yearMonth);
  };
}