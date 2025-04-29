import * as yup from 'yup';

export function beforeEqualNow(this: yup.DateSchema, msg?: string) {
  return this.test({
    name: 'beforeEqualNow',
    message: msg ? msg : 'Fecha y hora no puede ser mayor a la actual.',
    test: value => (value ? value.lessThanOrEqualToNow() : true),
  });
}
