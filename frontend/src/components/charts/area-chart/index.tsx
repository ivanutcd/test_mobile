import { AreaPlot, LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { AreaChartProps } from './types/chart';
import {
  ChartsLegend,
  ChartsTooltip,
  ChartsXAxis,
  ChartsYAxis,
  ResponsiveChartContainer,
} from '@mui/x-charts';
import { defaultPalette } from '../color-palette';
import themeVars from '../../../assets/scss/_themes-vars.module.scss';

const AreaChart = ({
  xAxisProps,
  yAxisProps,
  series,
  height,
}: AreaChartProps) => {
  return (
    <ResponsiveChartContainer
      xAxis={xAxisProps}
      yAxis={yAxisProps}
      series={series}
      height={height}
      colors={defaultPalette}
      sx={{
        margin: 2,
        //change left yAxis label styles
        '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
          strokeWidth: '0.7',
          fill: themeVars.grey550,
          fontFamily: 'TT Norms Pro, sans-serif',
        },

        // change bottom label styles
        '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
          strokeWidth: '0.7',
          fill: themeVars.grey550,
          fontFamily: 'TT Norms Pro, sans-serif',
        },
      }}
    >
      <LinePlot />
      <AreaPlot />
      <ChartsXAxis disableLine />
      <ChartsYAxis disableLine />
      <MarkPlot />
      <ChartsLegend
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'left' },
            labelStyle: { fill: themeVars.grey550 },
            padding: -12,
            itemMarkWidth: 16,

            itemMarkHeight: 16,
            itemGap: 25,
          },
        }}
      />
      <ChartsTooltip />
    </ResponsiveChartContainer>
  );
};

export default AreaChart;
