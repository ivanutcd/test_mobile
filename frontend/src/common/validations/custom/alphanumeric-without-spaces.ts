import * as yup from 'yup';
import { AlphanumericWithoutSpaces } from '@common/validations/regular-expression.ts';

export function alphanumericWithoutSpaces(
  this: yup.StringSchema,
  msg?: string,
) {
  return this.matches(
    AlphanumericWithoutSpaces.expression,
    msg ? msg : AlphanumericWithoutSpaces.message,
  );
}
