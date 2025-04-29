import { DataChart } from '@components/charts/pie/types/dataChart.ts';
import { Styles } from '@components/charts/pie/types/styles.ts';
import { PieSize } from '@components/charts/pie/types/pie-size.ts';

export interface PieProps {
  data: DataChart[];
  styles?: Styles;
  size?: PieSize;
  title?: string;
  titleColor?: string;
  palette?: string[];
  hideToolTip?: boolean;
  currencyFormatter?: CurrencyFormatter;
}

export type CurrencyFormatter = 'lempira' | 'dolar';
