// eslint-disable-next-line no-extend-native

import { DateUtil } from './date-util';
import { DateTime } from 'luxon';

// eslint-disable-next-line no-extend-native
Date.prototype.lessThanOrEqualToNow = function(): boolean {
  // you can use moment or anything else you prefer to format
  // the date here

  return DateUtil.lessThanOrEqualToNow(this);
};

Date.prototype.greaterThanOrEqualToNow = function(): boolean {
  // you can use moment or anything else you prefer to format
  // the date here

  return DateUtil.greaterThanOrEqualToNow(this);
};
// eslint-disable-next-line no-extend-native
Date.prototype.lessThanOrEqual = function(value: Date): boolean {
  // you can use moment or anything else you prefer to format
  // the date here
  return DateUtil.lessThanOrEqual(this, value);
};
// eslint-disable-next-line no-extend-native
Date.prototype.greaterThanNow = function(): boolean {
  // you can use moment or anything else you prefer to format
  // the date here
  return DateUtil.greaterThanNow(this);
};

// eslint-disable-next-line no-extend-native
Date.prototype.diffYears = function(fecha2: Date): number | undefined {
  return DateUtil.diffYears(this, fecha2);
};

// eslint-disable-next-line no-extend-native
Date.prototype.diffMonths = function(fecha2: Date): number | undefined {
  return DateUtil.diffMonths(this, fecha2);
};

// eslint-disable-next-line no-extend-native
Date.prototype.diffDays = function(fecha2: Date): number | undefined {
  return DateUtil.diffDays(this, fecha2);
};

// eslint-disable-next-line no-extend-native
Date.prototype.toFormat = function(format: string = 'dd/MM/yyyy'): string {
  return DateUtil.toFormat(this, format);
};

// eslint-disable-next-line no-extend-native
Date.prototype.withHour = function(hour: string): Date {
  const fecha = this.toFormat();
  const fechaHoraText = `${fecha} ${hour}`;
  return DateTime.fromFormat(fechaHoraText, 'dd/MM/yyyy HH:mm').toJSDate();
};

// Date.prototype.toDateTimePicker = function (): Date {
//   const fecha = this.toFormat('dd/MM/yyyy TT');
//   return DateTime.fromFormat(fecha, 'dd/MM/yyyy HH:mm').toJSDate();
// };

// eslint-disable-next-line no-extend-native
Date.prototype.greaterThanYears = function(years: number = 100): boolean {
  return DateUtil.greaterThanOrEqual(
    this,
    DateTime.now().minus({ years: years }).toJSDate(),
  );
};

// eslint-disable-next-line no-extend-native
Date.prototype.greaterThan1970 = function(): boolean {
  return DateUtil.greaterThan(
    this,
    DateTime.fromFormat('1970/12/31', 'yyyy/MM/dd').toJSDate(),
  );
};
// eslint-disable-next-line no-extend-native
Date.prototype.toDateOnlyString = function(): string {
  return DateUtil.toDateOnlyString(
    this);
};
