import { NumberUtil } from '@common/formats/numberUtil';
import { CurrencyFormatter } from '../types/pie-props';

export const formatCurrency = (
  value: number,
  formatter?: CurrencyFormatter,
): string => {
  switch (formatter) {
    case 'lempira':
      return NumberUtil.lempirasFormat(value) as string;
    case 'dolar':
      return NumberUtil.dollarFormat(value) as string;
    default:
      return value.toString();
  }
};
