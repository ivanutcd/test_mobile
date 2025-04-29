import * as yup from 'yup';

export function moneyNotEmpty(this: yup.ObjectSchema<any>, msg: string) {
  return this.test({
    name: 'moneyNotEmpty',
    message: msg,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    test: _ => false,
  });
}
