import { AllSeriesType, AxisConfig } from '@mui/x-charts';
import { MakeOptional } from '@mui/x-date-pickers/internals';

export interface AreaChartProps {
  series: AllSeriesType[];
  height?: number;
  xAxisProps: MakeOptional<AxisConfig, 'id'>[] | undefined;
  yAxisProps?: MakeOptional<AxisConfig, 'id'>[] | undefined;
}
