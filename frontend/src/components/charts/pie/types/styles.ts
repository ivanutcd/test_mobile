import { DataChart } from '@components/charts/pie/types/dataChart.ts';
import { HighlightScope } from '@mui/x-charts';

export type DefaultizedPieValueType = DataChart & {
  color: string;
  formattedValue: string;
};

export interface Styles {
  innerRadius?: number | string;
  outerRadius?: number | string;
  paddingAngle?: number;
  cornerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  cx?: number | string;
  cy?: number | string;
  arcLabel?:
    | 'formattedValue'
    | 'label'
    | 'value'
    | ((item: DefaultizedPieValueType) => string);
  faded?: FadedProps;
  highlightScope: Partial<HighlightScope>;
}

interface FadedProps {
  innerRadius: number;
  additionalRadius: number;
  color: string;
}
