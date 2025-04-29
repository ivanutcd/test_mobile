import * as yup from 'yup';

export function afterNow(this: yup.DateSchema, msg?: string) {
  return this.test({
    name: 'afterNow',
    message: msg ? msg : 'Fecha tiene que se mayor a la fecha actual',
    test: value => (value ? value.greaterThanNow() : true),
  });
}

