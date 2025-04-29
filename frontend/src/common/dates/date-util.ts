import { DateTime } from 'luxon';

export class DateUtil {
  static readonly dateFormat = 'dd/MM/yyyy';

  static lessThan(source: Date, valueToCompare: Date): boolean {
    return DateTime.fromJSDate(source) < DateTime.fromJSDate(valueToCompare);
  }

  static lessThanOrEqual(source: Date, valueToCompare: Date): boolean {
    return DateTime.fromJSDate(source) <= DateTime.fromJSDate(valueToCompare);
  }

  static lessThanOrEqualToNow(value: Date): boolean {
    const fechaHoy = DateTime.now();
    return DateTime.fromJSDate(value) <= fechaHoy;
  }

  //GREATER
  static greaterThan(source: Date, valueToCompare: Date): boolean {
    return DateTime.fromJSDate(source) > DateTime.fromJSDate(valueToCompare);
  }

  static greaterThanOrEqual(source: Date, valueToCompare: Date): boolean {
    return DateTime.fromJSDate(source) >= DateTime.fromJSDate(valueToCompare);
  }

  static greaterThanOrEqualToNow(value: Date): boolean {
    const fechaHoy = DateTime.now();
    return DateTime.fromJSDate(value) >= fechaHoy.minus({ days: 1 });
  }

  static greaterThanNow(value: Date): boolean {
    const fechaHoy = DateTime.now();
    return DateTime.fromJSDate(value) > fechaHoy;
  }

  //Formater

  static toISOString(date: Date) {
    return DateTime.fromJSDate(date).toISO();
  }

  static toString(date: Date) {
    return DateTime.fromJSDate(date).toFormat(this.dateFormat);
  }

  static toFormat(date?: Date, format?: string) {
    if (!date) {
      return '';
    }
    return DateTime.fromJSDate(date).toFormat(format ?? DateUtil.dateFormat);
  }

  static toDateOnlyString(date: Date) {
    return DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
  }

  //Other

  static Now(): Date {
    return DateTime.now().toJSDate();
  }

  static diffYears(fecha1: Date, fecha2: Date): number | undefined {
    return DateTime.fromISO(fecha1.toISOString())
      .diff(DateTime.fromISO(fecha2.toISOString()), 'years')
      .toObject().years;
  }

  static diffMonths(fecha1: Date, fecha2: Date): number | undefined {
    return DateTime.fromISO(fecha1.toISOString())
      .diff(DateTime.fromISO(fecha2.toISOString()), 'months')
      .toObject().months;
  }

  static diffDays(fecha1: Date, fecha2: Date): number | undefined {
    return DateTime.fromISO(fecha1.toISOString())
      .diff(DateTime.fromISO(fecha2.toISOString()), 'days')
      .toObject().days;
  }
}
