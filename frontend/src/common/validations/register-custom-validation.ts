import { beforeEqualNow } from './custom/before-equal-now.ts';
import { moneyNotEmpty } from './custom/money-not-empty.ts';
import { allowNull } from '@common/validations/custom/allow-null.ts';
import { afterNow } from '@common/validations/custom/after-now.ts';
import { alphanumericWithoutSpaces } from '@common/validations/custom/alphanumeric-without-spaces.ts';
import { onlyLettersWithSpaces } from '@common/validations/custom/only-letters-with-spaces.ts';
import { onlyNumbers } from '@common/validations/custom/only-numbers.ts';
import { greaterThanYears } from '@common/validations/custom/greater-than-years.ts';
import { greaterThan1970 } from '@common/validations/custom/greater-than-1970.ts';
import { rangeDays } from '@common/validations/custom/range-days.ts';
import { textExceptForNumbers } from '@common/validations/custom/text-except-for-numbers.ts';
import { afterOrEqualNow } from '@common/validations/custom/after-or-equal-now.ts';

export const registerCustomValidations = (yup: any) => {
  yup.addMethod(yup.object, 'moneyNotEmpty', moneyNotEmpty);
  yup.addMethod(yup.date, 'beforeEqualNow', beforeEqualNow);
  yup.addMethod(yup.date, 'allowNull', allowNull as any);

  yup.addMethod(yup.date, 'afterNow', afterNow);
  yup.addMethod(yup.date, 'afterOrEqualNow', afterOrEqualNow);
  yup.addMethod(
    yup.string,
    'alphanumericWithoutSpaces',
    alphanumericWithoutSpaces,
  );
  yup.addMethod(yup.string, 'onlyLettersWithSpaces', onlyLettersWithSpaces);
  yup.addMethod(yup.string, 'onlyNumbers', onlyNumbers);
  yup.addMethod(yup.date, 'greaterThanYears', greaterThanYears);
  yup.addMethod(yup.date, 'greaterThan1970', greaterThan1970);
  yup.addMethod(yup.date, 'rangeDays', rangeDays);
  yup.addMethod(yup.string, 'textExceptForNumbers', textExceptForNumbers);
};
