import * as yup from 'yup';
import { OnlyLettersWithSpaces } from '@common/validations/regular-expression.ts';

export function onlyLettersWithSpaces(this: yup.StringSchema, msg?: string) {
  return this.matches(
    OnlyLettersWithSpaces.expression,
    msg ? msg : OnlyLettersWithSpaces.message,
  );
}
