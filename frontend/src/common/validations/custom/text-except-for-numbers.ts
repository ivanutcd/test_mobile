import * as yup from 'yup';
import { TextExceptForNumbers } from '@common/validations/regular-expression.ts';

export function textExceptForNumbers(this: yup.StringSchema, msg?: string) {
  return this.matches(
    TextExceptForNumbers.expression,
    msg ? msg : TextExceptForNumbers.message,
  );
}
