import * as yup from 'yup';

export function greaterThan1970(this: yup.DateSchema, msg?: string) {
  return this.test({
    name: 'greaterThanYears',
    message: msg ? msg : `La fecha debe ser mayor a 1970`,
    test: value => (value ? value.greaterThan1970() : true),
  });
}
