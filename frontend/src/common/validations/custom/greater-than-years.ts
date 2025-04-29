import * as yup from 'yup';

export function greaterThanYears(
  this: yup.DateSchema,
  msg?: string,
  years: number = 100,
) {
  return this.test({
    name: 'greaterThanYears',
    message: msg
      ? msg
      : `Fecha supera la cantidad de ${years} años con respecto a la actual`,
    test: value => (value ? value.greaterThanYears(years) : true),
  });
}
