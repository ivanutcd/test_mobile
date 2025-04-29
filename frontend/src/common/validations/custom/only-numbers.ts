import * as yup from 'yup';
import { OnlyNumbers } from '@common/validations/regular-expression.ts';

export function onlyNumbers(this: yup.StringSchema, msg?: string) {
  return this.matches(OnlyNumbers.expression, msg ? msg : OnlyNumbers.message);
}
