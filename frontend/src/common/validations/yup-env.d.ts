/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectSchema, DateSchema } from 'yup';
import { afterOrEqualNow } from '@common/validations/custom/after-or-equal-now.ts';
declare module 'yup' {
  interface ObjectSchema<
    TType extends Maybe<object> = object | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    moneyNotEmpty(this: ObjectSchema<T>, msg: string): ObjectSchema<T>;
  }

  // interface DateSchema<
  //   TType extends Maybe<Date> = Date | undefined,
  //   TContext extends AnyObject = AnyObject,
  //   TOut extends TType = TType,
  // > extends yup.BaseSchema<TType, TContext, TOut> {
  //   beforeEqualNow(this: DateSchema, msg?: string): DateSchema;
  // }

  interface DateSchema<
    TType extends Maybe<Date>,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    beforeEqualNow(
      this: DateSchema<TType | null, TContext>,
      msg?: string,
    ): DateSchema;
    afterNow(
      this: DateSchema<TType | null, TContext>,
      msg?: string,
    ): DateSchema;
    afterOrEqualNow(
      this: DateSchema<TType | null, TContext>,
      msg?: string,
    ): DateSchema;
    allowNull(this: DateSchema<TType | null, TContext>): DateSchema;
    greaterThanYears(
      this: DateSchema<TType | null, TContext>,
      msg?: string,
      years?: number,
    ): DateSchema;
    greaterThan1970(this: DateSchema<TType | null, TContext>, msg?: string);
    rangeDays(
      this: DateSchema<TType | null, TContext>,
      fieldDate: string,
      msg?: string,
      days?: number,
    );
  }
  interface StringSchema<
    TType extends Maybe<string> = string,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    alphanumericWithoutSpaces(
      this: yup.StringSchema,
      msg?: string,
    ): yup.StringSchema<string | undefined, AnyObject, string | undefined>;
    onlyLettersWithSpaces(
      this: yup.StringSchema,
      msg?: string,
    ): yup.StringSchema<string | undefined, AnyObject, string | undefined>;
    onlyNumbers(
      this: yup.StringSchema,
      msg?: string,
    ): yup.StringSchema<string | undefined, AnyObject, string | undefined>;
    textExceptForNumbers(
      this: yup.StringSchema,
      msg?: string,
    ): yup.StringSchema<string | undefined, AnyObject, string | undefined>;
  }

  interface NumberSchema<
    TType extends Maybe<number> = number | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    emptyAsUndefined(): NumberSchema<TType, TContext>;
  }
}
