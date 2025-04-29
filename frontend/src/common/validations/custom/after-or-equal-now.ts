import * as yup from 'yup';

export function afterOrEqualNow(this: yup.DateSchema, msg?: string) {
  return this.test({
    name: 'afterNow',
    message: msg ? msg : 'Fecha tiene que se mayor o igual a la fecha actual',
    test: value => (value ? value.greaterThanOrEqualToNow() : true),
  });
}
